import { GoogleGenAI } from '@google/genai';
import type { Problem, SkillNode } from '@/lib/content/schema';
import type { CpaStage } from '@/lib/db/schema';
import { parseVisualSpec } from '@/lib/visual/registry';
import type { VisualSpec } from '@/lib/visual/spec';
import { validateSpec, type SpecIssue } from '@/lib/visual/validate';
import { checkAnswer, type CheckResult } from './check';
import { buildLessonContext, SYSTEM_INSTRUCTION, type LessonContext } from './prompt';
import { buildTools, kindFromToolName } from './tools';

/**
 * The tutoring loop.
 *
 * Yields events as they happen so the UI can stream, and reports every side effect the turn
 * implies rather than performing it — persistence belongs to the caller, which keeps this
 * testable and stops a retry from double-writing evidence.
 *
 * There is deliberately no fallback path. The app this replaces answered API failures with
 * canned encouragement, which made an outage indistinguishable from a working tutor for
 * however long nobody looked closely. A failure here surfaces as a failure.
 */

export const TUTOR_MODEL = 'gemini-3.8-flash';

/** Cap on tool round trips in a single turn, so a confused model cannot loop forever. */
const MAX_TOOL_ROUNDS = 6;

export type TutorEvent =
  | { type: 'text'; delta: string }
  | { type: 'visual'; spec: VisualSpec }
  /** A figure the model proposed that failed validation. Surfaced for debugging, not to the student. */
  | { type: 'visual_rejected'; toolName: string; issues: SpecIssue[] }
  | { type: 'answer_checked'; problemId: string; response: string; result: CheckResult }
  | { type: 'stage_changed'; stage: CpaStage; reason: string }
  | { type: 'misconception'; code: string; evidence: string }
  | { type: 'done'; interactionId: string | null }
  | { type: 'error'; message: string };

export interface TurnInput {
  /** What the student typed. May be empty when they only attached an image. */
  text: string;
  /** Data URL of an attached photo, e.g. their handwritten working. */
  imageDataUrl?: string;
  /**
   * A figure the student rearranged on the canvas. Passed as a spec rather than as prose so
   * the tutor sees exactly what they built, down to the block widths.
   */
  studentSpec?: VisualSpec;
  /** Gemini's id for the previous turn, so the model keeps its own context server-side. */
  previousInteractionId?: string | null;
  skill: SkillNode;
  unitTitle: string;
  stage: CpaStage;
  problem?: Problem;
  hintsUsed: number;
  priorMisconceptionCodes: string[];
  /** Set when the lesson context should be resent — first turn, or after a stage change. */
  includeLessonContext: boolean;
}

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (client) return client;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is not set. The tutor cannot run without it — copy .env.example to ' +
        '.env.local and add a key from https://aistudio.google.com/apikey.',
    );
  }

  client = new GoogleGenAI({ apiKey });
  return client;
}

// ---------------------------------------------------------------------------

interface PendingCall {
  id: string;
  name: string;
  /** Arguments as given at step.start; may be empty when streamed. */
  seedArguments: Record<string, unknown>;
  /** Accumulated `arguments_delta` fragments. */
  argumentBuffer: string;
}

function resolveArguments(call: PendingCall): Record<string, unknown> {
  const buffered = call.argumentBuffer.trim();
  if (buffered.length === 0) return call.seedArguments;

  try {
    const parsed: unknown = JSON.parse(buffered);
    if (parsed && typeof parsed === 'object') return parsed as Record<string, unknown>;
  } catch {
    // Streamed fragments can arrive truncated if a turn is cut short. The seed is the
    // better guess in that case, and a malformed tool call is handled downstream anyway.
  }
  return call.seedArguments;
}

/** A tool's outcome, as it goes back to the model and as it surfaces to the caller. */
export interface ToolOutcome {
  /** Sent to the model as the function result. */
  payload: unknown;
  isError: boolean;
  events: TutorEvent[];
  /** Side effects for the caller to persist. */
  stageChange?: { stage: CpaStage; reason: string };
}

/** Exported for testing: this is where every tool's contract with the model is enforced. */
export function executeTool(
  name: string,
  args: Record<string, unknown>,
  input: TurnInput,
): ToolOutcome {
  const kind = kindFromToolName(name);

  if (kind !== null) {
    const outcome = parseVisualSpec({ ...args, kind });

    if (!outcome.ok) {
      // Handing the model the specific defect lets it correct the figure rather than
      // abandoning it and reverting to prose.
      return {
        payload: {
          rendered: false,
          errors: outcome.issues.map((i) => `${i.path}: ${i.message}`),
          note: 'The figure was not drawn. Fix these and call the tool again.',
        },
        isError: true,
        events: [{ type: 'visual_rejected', toolName: name, issues: outcome.issues }],
      };
    }

    return {
      payload: {
        rendered: true,
        ...(outcome.warnings.length > 0
          ? { warnings: outcome.warnings.map((w) => `${w.path}: ${w.message}`) }
          : {}),
      },
      isError: false,
      events: [{ type: 'visual', spec: outcome.spec }],
    };
  }

  if (name === 'check_answer') {
    const problemId = String(args['problem_id'] ?? '');
    const response = String(args['student_response'] ?? '');

    if (!input.problem || input.problem.id !== problemId) {
      return {
        payload: {
          error: `No active problem with id "${problemId}". The current problem is ` +
            `${input.problem ? `"${input.problem.id}"` : 'not set'}.`,
        },
        isError: true,
        events: [],
      };
    }

    const result = checkAnswer(response, input.problem.answer);

    return {
      payload:
        result.status === 'correct'
          ? { status: 'correct' }
          : result.status === 'incorrect'
            ? { status: 'incorrect', student_gave: result.got }
            : {
                status: 'unparseable',
                reason: result.reason,
                note:
                  'This is not a wrong answer. Ask the student to state their value plainly, ' +
                  'and do not record or imply that they were incorrect.',
              },
      isError: false,
      events: [{ type: 'answer_checked', problemId, response, result }],
    };
  }

  if (name === 'advance_stage') {
    const stage = String(args['stage'] ?? '') as CpaStage;
    const reason = String(args['reason'] ?? '');

    if (stage !== 'concrete' && stage !== 'pictorial' && stage !== 'abstract') {
      return { payload: { error: `Unknown stage "${stage}".` }, isError: true, events: [] };
    }

    return {
      payload: { stage },
      isError: false,
      events: [{ type: 'stage_changed', stage, reason }],
      stageChange: { stage, reason },
    };
  }

  if (name === 'log_misconception') {
    const code = String(args['code'] ?? '');
    const evidence = String(args['evidence'] ?? '');

    const known = input.skill.misconceptions.some((m) => m.code === code);
    if (!known) {
      return {
        payload: {
          error: `"${code}" is not a misconception listed for this skill. Valid codes: ` +
            `${input.skill.misconceptions.map((m) => m.code).join(', ') || '(none)'}.`,
        },
        isError: true,
        events: [],
      };
    }

    return {
      payload: { logged: true },
      isError: false,
      events: [{ type: 'misconception', code, evidence }],
    };
  }

  return { payload: { error: `Unknown tool "${name}".` }, isError: true, events: [] };
}

// ---------------------------------------------------------------------------

function buildInitialInput(input: TurnInput): unknown {
  const content: Array<Record<string, unknown>> = [];

  if (input.includeLessonContext) {
    content.push({ type: 'text', text: buildLessonContext(input as LessonContext) });
  }

  if (input.imageDataUrl) {
    const match = /^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/.exec(input.imageDataUrl);
    if (match) {
      content.push({ type: 'image', mime_type: match[1], data: match[2] });
    }
  }

  if (input.studentSpec) {
    const check = validateSpec(input.studentSpec);
    const problems = check.issues.filter((i) => i.severity === 'error');

    content.push({
      type: 'text',
      text: [
        'The student rearranged the figure on the canvas. This is exactly what it looks like now:',
        '',
        JSON.stringify(input.studentSpec),
        '',
        problems.length > 0
          ? 'It no longer holds together:\n' +
            problems.map((i) => `- ${i.message}`).join('\n') +
            '\n\nDo not simply correct it. Ask a question that makes them notice the ' +
            'inconsistency themselves — this is a good moment for them to learn what the ' +
            'scale of a bar model actually means.'
          : 'It is mathematically consistent. Respond to what they were trying to show.',
      ].join('\n'),
    });
  }

  if (input.text.trim().length > 0) {
    content.push({ type: 'text', text: input.text });
  }

  if (content.length === 0) {
    content.push({ type: 'text', text: '(the student sent an empty message)' });
  }

  return [{ type: 'user_input', content }];
}

/**
 * Run one student turn to completion, including any tool round trips it triggers.
 */
export async function* runTurn(input: TurnInput): AsyncGenerator<TutorEvent> {
  let ai: GoogleGenAI;
  try {
    ai = getClient();
  } catch (error) {
    yield { type: 'error', message: error instanceof Error ? error.message : String(error) };
    return;
  }

  const tools = buildTools(input.skill);
  let nextInput: unknown = buildInitialInput(input);
  let previousInteractionId = input.previousInteractionId ?? undefined;
  let stage = input.stage;

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const calls = new Map<number, PendingCall>();
    let interactionId: string | null = null;
    let sawText = false;

    try {
      // The SDK's streaming param and SSE event types are not exported, so the request is
      // built structurally and the stream is read through a minimal local event shape. The
      // field names below track @google/genai's InteractionSSEEvent union; if that changes,
      // this reads undefined rather than failing loudly, so re-check it on SDK upgrades.
      const stream = (await ai.interactions.create({
        model: TUTOR_MODEL,
        input: nextInput,
        tools,
        stream: true,
        system_instruction: SYSTEM_INSTRUCTION,
        generation_config: { temperature: 0.7 },
        ...(previousInteractionId ? { previous_interaction_id: previousInteractionId } : {}),
      } as Parameters<typeof ai.interactions.create>[0])) as unknown as AsyncIterable<
        Record<string, unknown>
      >;

      for await (const event of stream) {
        const eventType = event['event_type'];

        if (eventType === 'interaction.created' || eventType === 'interaction.completed') {
          const interaction = event['interaction'] as { id?: string } | undefined;
          if (interaction?.id) interactionId = interaction.id;
          continue;
        }

        if (eventType === 'error') {
          const err = event['error'] as { message?: string } | undefined;
          yield { type: 'error', message: err?.message ?? 'The model reported an error.' };
          return;
        }

        if (eventType === 'step.start') {
          const step = event['step'] as Record<string, unknown> | undefined;
          if (step?.['type'] === 'function_call') {
            calls.set(event['index'] as number, {
              id: String(step['id'] ?? ''),
              name: String(step['name'] ?? ''),
              seedArguments: (step['arguments'] as Record<string, unknown>) ?? {},
              argumentBuffer: '',
            });
          }
          continue;
        }

        if (eventType === 'step.delta') {
          const delta = event['delta'] as Record<string, unknown> | undefined;

          if (delta?.['type'] === 'text') {
            const text = String(delta['text'] ?? '');
            if (text.length > 0) {
              sawText = true;
              yield { type: 'text', delta: text };
            }
            continue;
          }

          if (delta?.['type'] === 'arguments_delta') {
            const call = calls.get(event['index'] as number);
            if (call) call.argumentBuffer += String(delta['arguments'] ?? '');
          }
        }
      }
    } catch (error) {
      yield {
        type: 'error',
        message: error instanceof Error ? error.message : 'The tutor could not reach the model.',
      };
      return;
    }

    if (interactionId) previousInteractionId = interactionId;

    if (calls.size === 0) {
      if (!sawText) {
        yield { type: 'error', message: 'The model returned an empty reply.' };
        return;
      }
      yield { type: 'done', interactionId: previousInteractionId ?? null };
      return;
    }

    // Execute every call this round, then hand all the results back at once.
    const results: unknown[] = [];

    for (const call of calls.values()) {
      const args = resolveArguments(call);
      const outcome = executeTool(call.name, args, { ...input, stage });

      for (const event of outcome.events) yield event;
      if (outcome.stageChange) stage = outcome.stageChange.stage;

      results.push({
        type: 'function_result',
        name: call.name,
        call_id: call.id,
        is_error: outcome.isError,
        result: [{ type: 'text', text: JSON.stringify(outcome.payload) }],
      });
    }

    nextInput = results;
  }

  yield {
    type: 'error',
    message: `The tutor made ${MAX_TOOL_ROUNDS} tool calls without settling on a reply.`,
  };
}
