import { NextResponse } from 'next/server';
import { visualSpecSchema } from '@/lib/visual/spec';
import { runTurn, type TutorEvent } from '@/lib/tutor/engine';
import { checkAnswer, type CheckResult } from '@/lib/tutor/check';
import { openingMessage } from '@/lib/tutor/prompt';
import type { TurnIntent } from '@/lib/tutor/prompt';
import type { Problem, SkillNode } from '@/lib/content/schema';
import {
  applyStageChange,
  getSessionContext,
  markBriefed,
  recordAttempt,
  recordHintGiven,
  recordMisconception,
  recordTurn,
  resolveLesson,
  setLastInteractionId,
} from '@/lib/session/service';

export const runtime = 'nodejs';
/** Tool round trips can take a while; the platform default would cut a long turn short. */
export const maxDuration = 60;

/**
 * One tutoring turn, streamed as newline-delimited JSON.
 *
 * NDJSON rather than SSE: the client is a `fetch` reader, not an EventSource, and every
 * event is already a discrete JSON object. One line, one event, no framing to invent.
 *
 * Side effects are applied here rather than in the engine, so a dropped connection cannot
 * leave half a turn's evidence written by a retry.
 */

interface TurnRequest {
  sessionId?: unknown;
  text?: unknown;
  imageDataUrl?: unknown;
  studentSpec?: unknown;
  intent?: unknown;
}

const MAX_TEXT = 4000;
/** ~4MB of base64, enough for a phone photo of a page of working. */
const MAX_IMAGE = 5_600_000;
const TURN_INTENTS = new Set<TurnIntent>(['ask', 'check', 'hint', 'support', 'canvas']);

/**
 * Access is gated in `proxy.ts`, which checks the unlock cookie on every route including
 * this one. There is deliberately no second check here: an earlier version compared a
 * header the client never sent, and only looked like it worked because its result object
 * was always truthy.
 */
export async function POST(request: Request): Promise<Response> {
  let body: TurnRequest;
  try {
    body = (await request.json()) as TurnRequest;
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
  const text = typeof body.text === 'string' ? body.text.slice(0, MAX_TEXT) : '';
  const intent =
    typeof body.intent === 'string' && TURN_INTENTS.has(body.intent as TurnIntent)
      ? (body.intent as TurnIntent)
      : 'ask';
  const imageDataUrl =
    typeof body.imageDataUrl === 'string' && body.imageDataUrl.length <= MAX_IMAGE
      ? body.imageDataUrl
      : undefined;

  // Re-parsed rather than trusted: this arrives from the browser, where a student could
  // have sent anything. An unparseable figure is dropped, not passed to the model.
  const parsedSpec = body.studentSpec ? visualSpecSchema.safeParse(body.studentSpec) : null;
  const studentSpec = parsedSpec?.success ? parsedSpec.data : undefined;

  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required.' }, { status: 400 });
  }

  if (text.trim().length === 0 && !imageDataUrl && !studentSpec) {
    return NextResponse.json({ error: 'Nothing to send.' }, { status: 400 });
  }

  // Everything before the stream opens is reported as JSON, so a database or configuration
  // failure reaches the student as its actual message rather than as a bare 500 page.
  let context: Awaited<ReturnType<typeof getSessionContext>>;
  let lesson: Awaited<ReturnType<typeof resolveLesson>>;
  try {
    context = await getSessionContext(sessionId);
    if (!context) {
      return NextResponse.json({ error: 'Unknown session.' }, { status: 404 });
    }

    lesson = await resolveLesson(context);

    if (intent === 'check' && !lesson.problem) {
      return NextResponse.json({ error: 'There is no active problem to check.' }, { status: 409 });
    }
    if (
      intent === 'hint' &&
      (!lesson.problem || lesson.problem.hints.length === 0 || context.hintsUsed >= lesson.problem.hints.length)
    ) {
      return NextResponse.json({ error: 'There are no more hints for this problem.' }, { status: 409 });
    }

    await recordTurn(sessionId, 'student', text, {
      ...(imageDataUrl ? { imageData: imageDataUrl } : {}),
      ...(studentSpec ? { visualSpec: studentSpec } : {}),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'The turn could not be started.';
    console.error('[tutor] turn setup failed:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const { skill, unitTitle, problem } = lesson;

  // Submission must never depend on the language model deciding to call the marking tool.
  // Mark the exact answer in code first, persist it, and return useful feedback immediately.
  // The agent remains available for questions, explanations, hints, and visual coaching.
  if (intent === 'check' && problem) {
    const result = checkAnswer(text, problem.answer);

    if (result.status === 'correct' || result.status === 'incorrect') {
      await recordAttempt({
        studentId: context.studentId,
        sessionId,
        skillId: context.skillId,
        problemId: problem.id,
        correct: result.status === 'correct',
        hintsUsed: context.hintsUsed,
        cpaStage: context.stage,
        ...(result.status === 'incorrect' && result.misconceptionCode
          ? { misconceptionCode: result.misconceptionCode }
          : {}),
      });
      await recordTurn(sessionId, 'system', `check:${result.status}:${problem.id}`);
    }

    const reply = checkFeedback(result, problem, skill, context.stage);
    await recordTurn(sessionId, 'tutor', reply);
    return eventResponse([
      { type: 'answer_checked', problemId: problem.id, response: text, result },
      { type: 'text', delta: reply },
      { type: 'done', interactionId: context.lastInteractionId },
    ]);
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: TutorEvent) => {
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };

      // Accumulated so the whole reply lands in the transcript as one turn.
      let replyText = '';
      let lastSpec: unknown = null;
      let stage = context.stage;
      let hintsUsed = context.hintsUsed;

      // The full brief goes when the model has no context yet, or the problem has changed
      // since it was last briefed. Every other turn carries a one-line state update.
      const includeLessonContext =
        context.lastInteractionId === null || context.briefedProblemId !== (context.problemId ?? '');

      try {
        for await (const event of runTurn({
          text,
          intent,
          ...(imageDataUrl ? { imageDataUrl } : {}),
          ...(studentSpec ? { studentSpec } : {}),
          previousInteractionId: context.lastInteractionId,
          skill,
          unitTitle,
          stage,
          ...(problem ? { problem } : {}),
          hintsUsed,
          priorMisconceptionCodes: context.priorMisconceptionCodes,
          includeLessonContext,
          ...(includeLessonContext ? { openingMessage: openingMessage(skill, problem) } : {}),
        })) {
          send(event);

          switch (event.type) {
            case 'text':
              replyText += event.delta;
              break;

            case 'visual':
              lastSpec = event.spec;
              break;

            case 'stage_changed':
              stage = event.stage;
              await applyStageChange(sessionId, event.stage);
              break;

            case 'hint_given':
              hintsUsed = event.hintsUsed;
              await recordHintGiven(sessionId, hintsUsed);
              break;

            case 'answer_checked':
              // Only a definite verdict is evidence. "Unparseable" is our failure to read
              // them and must not touch the mastery estimate.
              // "Wrong form" is right but unfinished, and is not evidence either way.
              if (event.result.status === 'correct' || event.result.status === 'incorrect') {
                await recordAttempt({
                  studentId: context.studentId,
                  sessionId,
                  skillId: context.skillId,
                  problemId: event.problemId,
                  correct: event.result.status === 'correct',
                  hintsUsed,
                  cpaStage: stage,
                  // A diagnostic distractor names the misconception that produced it.
                  ...(event.result.status === 'incorrect' && event.result.misconceptionCode
                    ? { misconceptionCode: event.result.misconceptionCode }
                    : {}),
                });
                // A system turn so the verdict survives a reload of the transcript.
                await recordTurn(sessionId, 'system', `check:${event.result.status}:${event.problemId}`);
              }
              break;

            case 'misconception':
              await recordMisconception(context.studentId, context.skillId, event.code);
              break;

            case 'done':
              if (event.interactionId) await setLastInteractionId(sessionId, event.interactionId);
              if (includeLessonContext) await markBriefed(sessionId, context.problemId);
              break;
          }
        }

        if (replyText.trim().length > 0 || lastSpec) {
          await recordTurn(sessionId, 'tutor', replyText, lastSpec ? { visualSpec: lastSpec } : {});
        }
      } catch (error) {
        send({
          type: 'error',
          message: error instanceof Error ? error.message : 'The turn failed unexpectedly.',
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}

function eventResponse(events: TutorEvent[]): Response {
  const body = events.map((event) => JSON.stringify(event)).join('\n') + '\n';
  return new Response(body, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}

function checkFeedback(
  result: CheckResult,
  problem: Problem,
  skill: SkillNode,
  stage: 'concrete' | 'pictorial' | 'abstract',
): string {
  switch (result.status) {
    case 'correct':
      return result.note
        ? `Correct. ${result.note} Your method is ready for the next question.`
        : 'Correct. Your answer matches, and you can move on when you are ready.';
    case 'wrong-form':
      return `Your mathematics is equivalent, but the question asks for ${result.form} form. What is the one final change that puts it in that form?`;
    case 'unparseable':
      return 'I could not read a final answer there. Write only the value or expression you want checked, then submit it again.';
    case 'incorrect': {
      const misconception = result.misconceptionCode
        ? skill.misconceptions.find((item) => item.code === result.misconceptionCode)
        : undefined;
      const nextQuestion = misconception?.probe ?? problem.cpaPrompts[stage];
      return `Not yet — keep your approach and inspect the earliest useful step: ${nextQuestion}`;
    }
  }
}
