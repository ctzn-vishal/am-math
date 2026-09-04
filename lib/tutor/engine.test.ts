import { describe, it, expect } from 'vitest';
import { executeTool, type TurnInput } from './engine';
import { buildTools, renderToolName, kindFromToolName } from './tools';
import { buildLessonContext, SYSTEM_INSTRUCTION } from './prompt';
import { getSkill, getProblem } from '@/lib/content';
import { IMPLEMENTED_KINDS } from '@/lib/visual/registry';

const skill = getSkill('linear-systems.solve-simultaneous-linear');
const problem = getProblem('linear-systems.substitution-basic');

if (!skill || !problem) throw new Error('fixtures missing from the pack');

const baseInput: TurnInput = {
  text: '',
  skill,
  unitTitle: 'Linear Equations in Two Variables',
  stage: 'pictorial',
  problem,
  hintsUsed: 0,
  priorMisconceptionCodes: [],
  includeLessonContext: true,
};

const soundBarModel = {
  title: 'Substituting y',
  rows: [
    {
      id: 'r1',
      label: 'y',
      segments: [
        { id: 'a', label: 'x', units: 4, role: 'unknown' },
        { id: 'b', label: 'x', units: 4, role: 'unknown' },
        { id: 'c', label: '1', units: 1, value: 1 },
      ],
    },
  ],
};

describe('render tools', () => {
  it('draws a sound figure and reports success to the model', () => {
    const outcome = executeTool('render_bar_model', soundBarModel, baseInput);
    expect(outcome.isError).toBe(false);
    expect(outcome.events[0]?.type).toBe('visual');
    expect(outcome.payload).toMatchObject({ rendered: true });
  });

  it('refuses an unsound figure and hands the model the specific defect', () => {
    const outcome = executeTool(
      'render_bar_model',
      {
        rows: [
          {
            id: 'r1',
            label: 'Savings',
            segments: [
              { id: 'a', label: '10', units: 2, value: 10 },
              { id: 'b', label: '20', units: 3, value: 20 },
            ],
          },
        ],
      },
      baseInput,
    );

    expect(outcome.isError).toBe(true);
    expect(outcome.events[0]?.type).toBe('visual_rejected');

    const payload = outcome.payload as { rendered: boolean; errors: string[]; note: string };
    expect(payload.rendered).toBe(false);
    // Actionable, not just "invalid" — the model has to be able to fix it.
    expect(payload.errors[0]).toContain('Scale break');
    expect(payload.note).toContain('call the tool again');
  });

  it('refuses a kind that has no renderer', () => {
    const outcome = executeTool(
      'render_area_grid',
      { columns: ['x'], rows: ['x'], cells: ['x^2'] },
      baseInput,
    );
    expect(outcome.isError).toBe(true);
    expect(JSON.stringify(outcome.payload)).toContain('no renderer yet');
  });

  it('passes warnings through without blocking the render', () => {
    const outcome = executeTool(
      'render_bar_model',
      {
        rows: [
          {
            id: 'r1',
            label: 'A',
            segments: [{ id: 'a', label: '5', units: 5, value: 5 }],
            total: { label: 'total', value: 5 },
          },
        ],
      },
      baseInput,
    );
    expect(outcome.isError).toBe(false);
  });
});

describe('check_answer', () => {
  it('marks a correct answer', () => {
    const outcome = executeTool(
      'check_answer',
      { problem_id: problem.id, student_response: 'x = 2, y = 5' },
      baseInput,
    );
    expect(outcome.payload).toEqual({ status: 'correct' });
    expect(outcome.events[0]).toMatchObject({ type: 'answer_checked' });
  });

  it('marks a wrong answer and reports what they actually gave', () => {
    const outcome = executeTool(
      'check_answer',
      { problem_id: problem.id, student_response: '(5, 2)' },
      baseInput,
    );
    expect(outcome.payload).toMatchObject({ status: 'incorrect', student_gave: '(5, 2)' });
  });

  it('tells the model that unparseable is not a wrong answer', () => {
    const outcome = executeTool(
      'check_answer',
      { problem_id: problem.id, student_response: 'I substituted first' },
      baseInput,
    );
    const payload = outcome.payload as { status: string; note: string };
    expect(payload.status).toBe('unparseable');
    expect(payload.note).toContain('not a wrong answer');
    expect(outcome.isError).toBe(false);
  });

  it('rejects a check against a problem that is not active', () => {
    const outcome = executeTool(
      'check_answer',
      { problem_id: 'some.other.problem', student_response: '5' },
      baseInput,
    );
    expect(outcome.isError).toBe(true);
    expect(JSON.stringify(outcome.payload)).toContain('No active problem');
  });

  it('rejects a check when no problem is set at all', () => {
    const outcome = executeTool(
      'check_answer',
      { problem_id: problem.id, student_response: '5' },
      { ...baseInput, problem: undefined },
    );
    expect(outcome.isError).toBe(true);
  });
});

describe('advance_stage', () => {
  it('reports the change as a side effect for the caller to persist', () => {
    const outcome = executeTool(
      'advance_stage',
      { stage: 'abstract', reason: 'Read the totals off the bars unprompted.' },
      baseInput,
    );
    expect(outcome.stageChange).toEqual({
      stage: 'abstract',
      reason: 'Read the totals off the bars unprompted.',
    });
    expect(outcome.events[0]).toMatchObject({ type: 'stage_changed', stage: 'abstract' });
  });

  it('allows moving backwards', () => {
    const outcome = executeTool(
      'advance_stage',
      { stage: 'concrete', reason: 'Lost the thread; going back to the balance.' },
      { ...baseInput, stage: 'abstract' },
    );
    expect(outcome.isError).toBe(false);
    expect(outcome.stageChange?.stage).toBe('concrete');
  });

  it('rejects an invented stage', () => {
    const outcome = executeTool('advance_stage', { stage: 'symbolic', reason: 'x' }, baseInput);
    expect(outcome.isError).toBe(true);
  });
});

describe('log_misconception', () => {
  it('accepts a code that belongs to the current skill', () => {
    const outcome = executeTool(
      'log_misconception',
      { code: 'linear-systems.partial-distribution', evidence: 'Wrote 3x + 4x + 1 = 16.' },
      baseInput,
    );
    expect(outcome.isError).toBe(false);
    expect(outcome.events[0]).toMatchObject({ type: 'misconception' });
  });

  it('rejects an invented code and lists the valid ones', () => {
    const outcome = executeTool(
      'log_misconception',
      { code: 'linear-systems.made-this-up', evidence: 'x' },
      baseInput,
    );
    expect(outcome.isError).toBe(true);
    expect(JSON.stringify(outcome.payload)).toContain('linear-systems.partial-distribution');
  });
});

describe('unknown tools', () => {
  it('are reported rather than silently ignored', () => {
    const outcome = executeTool('delete_everything', {}, baseInput);
    expect(outcome.isError).toBe(true);
  });
});

describe('tool declarations', () => {
  const tools = buildTools(skill);

  it('offers exactly the render tools that have renderers', () => {
    const renderNames = tools.map((t) => t.name).filter((n) => n.startsWith('render_'));
    expect(renderNames).toEqual(IMPLEMENTED_KINDS.map(renderToolName));
  });

  it('round-trips tool names to kinds', () => {
    for (const kind of IMPLEMENTED_KINDS) {
      expect(kindFromToolName(renderToolName(kind))).toBe(kind);
    }
    expect(kindFromToolName('check_answer')).toBeNull();
  });

  it('drops `kind` from render parameters since the tool name fixes it', () => {
    const tool = tools.find((t) => t.name === 'render_bar_model');
    const properties = tool?.parameters['properties'] as Record<string, unknown>;
    expect(properties['kind']).toBeUndefined();
    expect(properties['rows']).toBeDefined();
    expect(tool?.parameters['required']).not.toContain('kind');
  });

  it('narrows log_misconception to codes that exist for the skill', () => {
    const tool = tools.find((t) => t.name === 'log_misconception');
    const properties = tool?.parameters['properties'] as Record<string, { enum?: string[] }>;
    expect(properties['code']?.enum).toEqual(skill.misconceptions.map((m) => m.code));
  });

  it('omits log_misconception when the skill has no codes', () => {
    const bare = { ...skill, misconceptions: [] };
    expect(buildTools(bare).map((t) => t.name)).not.toContain('log_misconception');
  });
});

describe('prompt assembly', () => {
  it('states that correctness comes only from check_answer', () => {
    expect(SYSTEM_INSTRUCTION).toContain('ONLY way');
    expect(SYSTEM_INSTRUCTION).toContain('never claim to have');
  });

  it('names only implemented kinds as available', () => {
    expect(SYSTEM_INSTRUCTION).toContain('Available now: bar_model');
  });

  it('includes the skill, its misconception probes and the current problem', () => {
    const context = buildLessonContext({
      skill,
      unitTitle: 'Linear Equations in Two Variables',
      stage: 'pictorial',
      problem,
      hintsUsed: 1,
      priorMisconceptionCodes: ['linear-systems.partial-distribution'],
    });

    expect(context).toContain(skill.title);
    expect(context).toContain('linear-systems.partial-distribution');
    expect(context).toContain('this student has shown this before');
    expect(context).toContain(problem.statement);
  });

  it('marks spent hints so the tutor cannot skip ahead', () => {
    const context = buildLessonContext({
      skill,
      unitTitle: 'Unit',
      stage: 'pictorial',
      problem,
      hintsUsed: 2,
      priorMisconceptionCodes: [],
    });
    expect(context).toContain('2 already spent');
    expect(context).toContain('1. (spent)');
    expect(context).toContain('2. (spent)');
    expect(context).not.toContain('3. (spent)');
  });

  it('fences the worked solution as reference only', () => {
    const context = buildLessonContext({
      skill,
      unitTitle: 'Unit',
      stage: 'abstract',
      problem,
      hintsUsed: 0,
      priorMisconceptionCodes: [],
    });
    expect(context).toContain('for your reference only');
  });
});
