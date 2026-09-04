import { NextResponse } from 'next/server';
import { visualSpecSchema } from '@/lib/visual/spec';
import { runTurn, type TutorEvent } from '@/lib/tutor/engine';
import { openingMessage } from '@/lib/tutor/prompt';
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
}

const MAX_TEXT = 4000;
/** ~4MB of base64, enough for a phone photo of a page of working. */
const MAX_IMAGE = 5_600_000;

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

  const context = await getSessionContext(sessionId);
  if (!context) {
    return NextResponse.json({ error: 'Unknown session.' }, { status: 404 });
  }

  const { skill, unitTitle, problem } = await resolveLesson(context);

  await recordTurn(sessionId, 'student', text, {
    ...(imageDataUrl ? { imageData: imageDataUrl } : {}),
    ...(studentSpec ? { visualSpec: studentSpec } : {}),
  });

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
              if (event.result.status !== 'unparseable') {
                await recordAttempt({
                  studentId: context.studentId,
                  sessionId,
                  skillId: context.skillId,
                  problemId: event.problemId,
                  correct: event.result.status === 'correct',
                  hintsUsed,
                  cpaStage: stage,
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
