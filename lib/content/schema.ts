import { z } from 'zod';
import { visualSpecSchema, type VisualKind } from '@/lib/visual/spec';

/**
 * The content layer is keyed on **skill nodes**, not on chapters.
 *
 * A chapter is an artefact of one textbook's table of contents; a skill — "eliminate a
 * variable by scaling one equation" — outlives it. Units below are presentation only: a
 * different syllabus reorders them, splits them, or drops them, and the skill graph, the
 * problem bank and every scrap of mastery evidence survive intact.
 *
 * Dimensions Math Grade 8 is therefore a *pack* loaded against this schema, not the schema.
 */

const slug = z
  .string()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:[-.][a-z0-9]+)*$/, 'Use lowercase dot/hyphen slugs, e.g. "index-laws.product".');

/** LaTeX-bearing markdown. Inline math in $...$, display in $$...$$. */
const richText = z.string().min(1).max(4000);

// ---------------------------------------------------------------------------

export const misconceptionSchema = z.object({
  code: slug.describe('Stable identifier. Mastery evidence references this, so never renumber it.'),
  description: z.string().max(400).describe('What the student does wrong, stated as an observable action.'),
  probe: richText.describe(
    'The question that surfaces the error without naming it. Taken from the tutoring protocol — ' +
      'these are deliberately Socratic and should be used close to verbatim.',
  ),
  correction: richText.describe('The conceptual "why", for once the student has seen the contradiction.'),
});

export type Misconception = z.infer<typeof misconceptionSchema>;

// ---------------------------------------------------------------------------

export const skillNodeSchema = z.object({
  id: slug,
  title: z.string().min(2).max(120),
  summary: z.string().max(600),
  /** Skill ids that should be secure before this one is taught. Forms a DAG. */
  prerequisites: z.array(slug).max(12).default([]),
  cpa: z.object({
    concrete: richText.describe('Physical action or manipulative. What the student holds or does.'),
    pictorial: richText.describe('The drawing that carries the idea once the objects are gone.'),
    abstract: richText.describe('The symbolic statement, and what each symbol stood for.'),
  }),
  formulas: z.array(z.string().max(200)).max(12).default([]).describe('LaTeX, without delimiters.'),
  misconceptions: z.array(misconceptionSchema).max(8).default([]),
  suggestedVisual: z
    .string()
    .optional()
    .describe('VisualKind the tutor should reach for first when teaching this skill.'),
});

export type SkillNode = z.infer<typeof skillNodeSchema>;

/** As authored, before defaults. See `ProblemInput`. */
export type SkillNodeInput = z.input<typeof skillNodeSchema>;

// ---------------------------------------------------------------------------

/**
 * Answers are checked in code, not by the model. An LLM marking its own student's
 * arithmetic is a needless source of both false praise and false failure.
 */
export const expressionFormSchema = z
  .enum(['simplified', 'expanded', 'factorised', 'single-fraction'])
  .describe(
    'A structural requirement on top of equivalence. "expanded": no brackets. "factorised": a ' +
      'product of brackets with nothing left to add at the top level. "single-fraction": exactly ' +
      'one top-level division. "simplified": no longer than the reference, so a fraction with an ' +
      'uncancelled factor is caught.',
  );

export const answerSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('number'),
    value: z.number(),
    tolerance: z.number().min(0).default(0),
    unit: z.string().max(20).optional(),
    /**
     * Mark against the reference rounded to this many significant figures. The unrounded
     * value is also accepted, and the tutor is told "right but not rounded".
     */
    sigfigs: z.number().int().min(1).max(6).optional(),
  }),
  z.object({
    type: z.literal('coordinates'),
    x: z.number(),
    y: z.number(),
    tolerance: z.number().min(0).default(0),
  }),
  z.object({
    type: z.literal('set'),
    values: z.array(z.number()).min(1).max(10).describe('Unordered, e.g. the roots of a quadratic.'),
    tolerance: z.number().min(0).default(0),
  }),
  z.object({
    type: z.literal('exact'),
    value: z.string().max(200).describe('Compared after whitespace and case normalisation.'),
    /** Alternative spellings that are equally correct, e.g. "1/16" and "0.0625". */
    accepts: z.array(z.string().max(200)).max(8).default([]),
  }),
  /**
   * An algebraic expression, marked by equivalence: both sides are evaluated at several
   * random points and must agree everywhere. Any correct form passes the equivalence test;
   * `form` then adds a structural requirement so "right but not simplified" is its own outcome.
   */
  z.object({
    type: z.literal('expression'),
    value: z
      .string()
      .max(200)
      .describe('Plain algebra: `(x-3)/(2*x)`, `x^2+5x+6`, `sqrt(13)`. Implicit multiplication is fine.'),
    variables: z.array(z.string().regex(/^[a-zA-Z]$/)).min(1).max(4).default(['x']),
    form: expressionFormSchema.optional(),
  }),
  /**
   * An equation in the listed variables — a line, a curve, a rearranged formula. Marked by
   * comparing `lhs - rhs` up to a constant multiple, so `y = -x/2 + 5`, `2y = 10 - x` and
   * `x + 2y - 10 = 0` all pass. A bare expression is read as the right-hand side when `lhs`
   * is a single variable.
   */
  z.object({
    type: z.literal('equation'),
    lhs: z.string().max(100),
    rhs: z.string().max(200),
    variables: z.array(z.string().regex(/^[a-zA-Z]$/)).min(1).max(4).default(['x', 'y']),
  }),
  /**
   * A diagnostic item. Options carry their own misconception code so a wrong choice records
   * *which* wrong belief produced it. The student answers by letter or by restating the
   * option; either is mapped.
   */
  z.object({
    type: z.literal('choice'),
    correct: z.enum(['A', 'B', 'C', 'D']),
    options: z
      .array(
        z.object({
          label: z.enum(['A', 'B', 'C', 'D']),
          value: z.string().min(1).max(200).describe('The option as shown, LaTeX allowed.'),
          misconceptionCode: slug.optional().describe('The code whose output this distractor is.'),
        }),
      )
      .min(3)
      .max(4),
  }),
]);

export type Answer = z.infer<typeof answerSchema>;

// ---------------------------------------------------------------------------

export const tierSchema = z
  .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal('diagnostic')])
  .describe(
    '1 fluency (a variation sequence), 2 application (same skill, unfamiliar surface), 3 applied ' +
      '(must be formulated from a context), 4 challenge (reasoning, multi-skill, SSDD), or a ' +
      'diagnostic that detects one misconception.',
  );

export type Tier = z.infer<typeof tierSchema>;

export const problemSchema = z.object({
  id: slug,
  skillIds: z.array(slug).min(1).max(6),
  tier: tierSchema,
  /**
   * Membership of an ordered family: a tier-1 variation sequence (one thing changes per
   * item, so order is content) or an SSDD set (same surface, different deep structure).
   * The lesson follows `position` rather than bank order when this is set.
   */
  sequence: z
    .object({
      family: slug,
      position: z.number().int().min(1).max(20),
    })
    .optional(),
  /**
   * The Reflect–Expect prompt for a sequence item: what changed from the last item, and what
   * should that do to the answer? The tutor asks this *before* the student works the item.
   */
  expect: richText.optional(),
  statement: richText,
  answer: answerSchema,
  cpaPrompts: z.object({
    concrete: richText,
    pictorial: richText,
    abstract: richText,
  }),
  /** Progressive. Each reveals strictly more than the last; the tutor spends them one at a time. */
  hints: z.array(richText).max(6).default([]),
  solution: richText,
  /** Misconception codes this problem is known to provoke. A diagnostic lists the one it detects first. */
  misconceptionCodes: z.array(slug).max(6).default([]),
  /** A figure to show alongside the statement, validated like any tutor-drawn figure. */
  figure: visualSpecSchema.optional(),
});

export type Problem = z.infer<typeof problemSchema>;

/**
 * The shape a *pack author* writes, before the schema fills its defaults. Fields with a
 * default (`tolerance`, `accepts`, `hints`, `variables`, `misconceptionCodes`) may be
 * omitted, which is what an author naturally does — the pack is parsed once at load and
 * every consumer downstream sees the completed `Problem`.
 */
export type ProblemInput = z.input<typeof problemSchema>;

// ---------------------------------------------------------------------------

export const unitSchema = z.object({
  id: slug,
  title: z.string().min(2).max(160),
  order: z.number().int().min(0),
  /** Presentation grouping only. The graph in `prerequisites` is what actually sequences learning. */
  skillIds: z.array(slug).min(1).max(20),
  strand: z.enum(['algebra', 'geometry', 'graphs', 'mensuration', 'statistics', 'number']),
});

export type Unit = z.infer<typeof unitSchema>;

export const curriculumPackSchema = z.object({
  id: slug,
  title: z.string().min(2).max(160),
  description: z.string().max(600),
  /** Free-form. "Secondary 2", "Grade 8", "Year 9" — the pack's own vocabulary, not ours. */
  level: z.string().max(60),
  units: z.array(unitSchema).min(1),
  skills: z.array(skillNodeSchema).min(1),
  problems: z.array(problemSchema).default([]),
});

export type CurriculumPack = z.infer<typeof curriculumPackSchema>;

// ---------------------------------------------------------------------------

export interface PackIssue {
  path: string;
  message: string;
}

/**
 * Referential integrity across the pack. A dangling skill id would surface as a blank
 * lesson at the worst possible moment, so packs are checked once at load and never again.
 */
export function checkPackIntegrity(pack: CurriculumPack): PackIssue[] {
  const issues: PackIssue[] = [];

  const skillIds = new Set<string>();
  for (const [i, skill] of pack.skills.entries()) {
    if (skillIds.has(skill.id)) issues.push({ path: `skills[${i}]`, message: `Duplicate skill id "${skill.id}".` });
    skillIds.add(skill.id);
  }

  const misconceptionCodes = new Set<string>();
  for (const skill of pack.skills) {
    for (const m of skill.misconceptions) {
      if (misconceptionCodes.has(m.code)) {
        issues.push({ path: `skills.${skill.id}`, message: `Duplicate misconception code "${m.code}".` });
      }
      misconceptionCodes.add(m.code);
    }
  }

  for (const skill of pack.skills) {
    for (const prereq of skill.prerequisites) {
      if (!skillIds.has(prereq)) {
        issues.push({ path: `skills.${skill.id}.prerequisites`, message: `Unknown skill "${prereq}".` });
      }
    }
    if (skill.prerequisites.includes(skill.id)) {
      issues.push({ path: `skills.${skill.id}`, message: 'Skill is its own prerequisite.' });
    }
  }

  const unitIds = new Set<string>();
  for (const [i, unit] of pack.units.entries()) {
    if (unitIds.has(unit.id)) issues.push({ path: `units[${i}]`, message: `Duplicate unit id "${unit.id}".` });
    unitIds.add(unit.id);
    for (const id of unit.skillIds) {
      if (!skillIds.has(id)) {
        issues.push({ path: `units.${unit.id}.skillIds`, message: `Unknown skill "${id}".` });
      }
    }
  }

  const problemIds = new Set<string>();
  for (const [i, problem] of pack.problems.entries()) {
    if (problemIds.has(problem.id)) {
      issues.push({ path: `problems[${i}]`, message: `Duplicate problem id "${problem.id}".` });
    }
    problemIds.add(problem.id);
    for (const id of problem.skillIds) {
      if (!skillIds.has(id)) {
        issues.push({ path: `problems.${problem.id}.skillIds`, message: `Unknown skill "${id}".` });
      }
    }
    for (const code of problem.misconceptionCodes) {
      if (!misconceptionCodes.has(code)) {
        issues.push({
          path: `problems.${problem.id}.misconceptionCodes`,
          message: `Unknown misconception "${code}".`,
        });
      }
    }
  }

  const families = new Map<string, number[]>();
  for (const problem of pack.problems) {
    if (problem.tier === 'diagnostic') {
      if (problem.answer.type !== 'choice') {
        issues.push({ path: `problems.${problem.id}`, message: 'A diagnostic must have a choice answer.' });
      } else {
        for (const option of problem.answer.options) {
          if (option.misconceptionCode && !misconceptionCodes.has(option.misconceptionCode)) {
            issues.push({
              path: `problems.${problem.id}.answer.options`,
              message: `Unknown misconception "${option.misconceptionCode}".`,
            });
          }
        }
        const labels = problem.answer.options.map((o) => o.label);
        if (new Set(labels).size !== labels.length) {
          issues.push({ path: `problems.${problem.id}.answer.options`, message: 'Duplicate option label.' });
        }
        if (!labels.includes(problem.answer.correct)) {
          issues.push({
            path: `problems.${problem.id}.answer`,
            message: `Correct option "${problem.answer.correct}" is not among the options.`,
          });
        }
      }
    } else if (problem.answer.type === 'choice') {
      issues.push({ path: `problems.${problem.id}`, message: 'Only a diagnostic may have a choice answer.' });
    }
    if (problem.sequence) {
      const list = families.get(problem.sequence.family) ?? [];
      list.push(problem.sequence.position);
      families.set(problem.sequence.family, list);
    }
  }
  for (const [family, positions] of families) {
    const sorted = [...positions].sort((a, b) => a - b);
    const consecutive = sorted.every((p, i) => p === i + 1);
    if (!consecutive) {
      issues.push({
        path: `sequences.${family}`,
        message: `Positions must run 1..n without gaps or repeats; got ${sorted.join(', ')}.`,
      });
    }
  }

  issues.push(...findPrerequisiteCycles(pack));

  const orphans = [...skillIds].filter((id) => !pack.units.some((u) => u.skillIds.includes(id)));
  for (const id of orphans) {
    issues.push({ path: `skills.${id}`, message: `Skill belongs to no unit, so it is unreachable.` });
  }

  return issues;
}

/** A cycle in the prerequisite graph would make "what should I learn next" unanswerable. */
function findPrerequisiteCycles(pack: CurriculumPack): PackIssue[] {
  const byId = new Map(pack.skills.map((s) => [s.id, s]));
  const state = new Map<string, 'visiting' | 'done'>();
  const issues: PackIssue[] = [];

  const visit = (id: string, trail: string[]): void => {
    const status = state.get(id);
    if (status === 'done') return;
    if (status === 'visiting') {
      const start = trail.indexOf(id);
      issues.push({
        path: `skills.${id}`,
        message: `Prerequisite cycle: ${[...trail.slice(start), id].join(' -> ')}.`,
      });
      return;
    }
    state.set(id, 'visiting');
    for (const prereq of byId.get(id)?.prerequisites ?? []) {
      if (byId.has(prereq)) visit(prereq, [...trail, id]);
    }
    state.set(id, 'done');
  };

  for (const skill of pack.skills) visit(skill.id, []);
  return issues;
}

/** Narrow a pack's `suggestedVisual` strings to real VisualKinds at the point of use. */
export function suggestedVisualOf(skill: SkillNode): VisualKind | undefined {
  return skill.suggestedVisual as VisualKind | undefined;
}
