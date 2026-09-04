import { IMPLEMENTED_KINDS, VISUAL_KINDS, jsonSchemaFor } from '@/lib/visual/registry';
import type { Problem, SkillNode } from '@/lib/content/schema';

/**
 * Tool declarations for the Interactions API.
 *
 * The render tools are generated from the visual registry, so the model is offered exactly
 * the figures the app can actually draw — no prompt edit is needed when a renderer lands,
 * and it is structurally impossible for the model to be told about one that does not exist.
 *
 * One tool per kind rather than a single `render_visual` with a union argument: Gemini's
 * schema support is an OpenAPI subset that handles discriminated unions poorly, and a flat
 * per-kind tool gives the model a much clearer choice.
 */

export interface ToolDeclaration {
  type: 'function';
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

export function renderToolName(kind: string): string {
  return `render_${kind}`;
}

export function kindFromToolName(name: string): string | null {
  return name.startsWith('render_') ? name.slice('render_'.length) : null;
}

function renderTools(): ToolDeclaration[] {
  return IMPLEMENTED_KINDS.map((kind) => {
    const info = VISUAL_KINDS.find((k) => k.kind === kind);
    const schema = jsonSchemaFor(kind);

    // `kind` is fixed by the tool name; asking the model to restate it wastes a field and
    // invites a mismatch. We add it back when reassembling the spec.
    const properties = { ...(schema['properties'] as Record<string, unknown>) };
    delete properties['kind'];
    const required = ((schema['required'] as string[]) ?? []).filter((r) => r !== 'kind');

    return {
      type: 'function' as const,
      name: renderToolName(kind),
      description: `Draw a ${kind.replace(/_/g, ' ')} on the student's canvas. ${info?.guidance ?? ''}`,
      parameters: { ...schema, properties, required },
    };
  });
}

const checkAnswerTool: ToolDeclaration = {
  type: 'function',
  name: 'check_answer',
  description:
    'Mark a value the student has committed to. This is the only way to learn whether they are ' +
    'right — you cannot determine it yourself. Say nothing about correctness before calling this. ' +
    'A result of "unparseable" means we could not read their response, not that they were wrong.',
  parameters: {
    type: 'object',
    properties: {
      problem_id: {
        type: 'string',
        description: 'The id of the problem being attempted, exactly as given in the lesson context.',
      },
      student_response: {
        type: 'string',
        description:
          'The value or values the student has committed to, in their own words and their own ' +
          'numbers. If their message also contains working or reasoning, pass only the answer ' +
          'they land on — "a = 8, c = 6", not the whole paragraph, because intermediate numbers ' +
          'in their working cannot be told apart from their answer. Never correct, complete or ' +
          'convert what they wrote: if they said 12, pass 12, even when you can see it should ' +
          'have been 21.',
      },
    },
    required: ['problem_id', 'student_response'],
  },
};

const advanceStageTool: ToolDeclaration = {
  type: 'function',
  name: 'advance_stage',
  description:
    'Move the lesson between the concrete, pictorial and abstract stages. Call this when the ' +
    'student has demonstrated readiness, not when you have run out of things to say about the ' +
    'current stage. Moving backwards is legitimate and often the right call when they are stuck.',
  parameters: {
    type: 'object',
    properties: {
      stage: { type: 'string', enum: ['concrete', 'pictorial', 'abstract'] },
      reason: {
        type: 'string',
        description: 'What the student did that showed they were ready. One sentence, for the record.',
      },
    },
    required: ['stage', 'reason'],
  },
};

function logMisconceptionTool(skill: SkillNode | undefined): ToolDeclaration {
  const codes = skill?.misconceptions.map((m) => m.code) ?? [];

  return {
    type: 'function',
    name: 'log_misconception',
    description:
      'Record that the student holds a specific, named wrong belief. Not for arithmetic slips or ' +
      'typos — only when the underlying understanding is wrong. This steers their future practice, ' +
      'so accuracy matters more than coverage.',
    parameters: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'One of the misconception codes listed for the current skill.',
          ...(codes.length > 0 ? { enum: codes } : {}),
        },
        evidence: {
          type: 'string',
          description: 'What the student said or did that shows this. Quote them where you can.',
        },
      },
      required: ['code', 'evidence'],
    },
  };
}

function giveHintTool(problem: Problem): ToolDeclaration {
  return {
    type: 'function',
    name: 'give_hint',
    description:
      'Reveal the next scaffolding hint for the current problem, and record that it was spent. ' +
      'Call this BEFORE you say anything that gives away what a hint contains - the count of hints ' +
      'used is what makes a later correct answer worth less, so an unrecorded hint flatters the ' +
      'student. Hints are spent strictly in order; the tool returns the text to work from. Do not ' +
      'read it out word for word - turn it into a question.',
    parameters: {
      type: 'object',
      properties: {
        hint_number: {
          type: 'integer',
          minimum: 1,
          maximum: problem.hints.length,
          description: 'Which hint, 1-based. Must be the next unspent one.',
        },
      },
      required: ['hint_number'],
    },
  };
}

/**
 * The full tool set for one turn. `log_misconception` is skill-scoped so its enum can be
 * narrowed to codes that actually apply, which stops the model inventing plausible-looking
 * ones that no problem references. `give_hint` exists only when the problem has hints.
 */
export function buildTools(skill: SkillNode | undefined, problem?: Problem): ToolDeclaration[] {
  const tools: ToolDeclaration[] = [...renderTools(), checkAnswerTool, advanceStageTool];

  // Offering the tool with no valid codes would invite invention.
  if (skill && skill.misconceptions.length > 0) {
    tools.push(logMisconceptionTool(skill));
  }

  if (problem && problem.hints.length > 0) {
    tools.push(giveHintTool(problem));
  }

  return tools;
}
