import { z } from 'zod';
import type { VisualKind } from '@/lib/visual/spec';

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

// ---------------------------------------------------------------------------

/**
 * Answers are checked in code, not by the model. An LLM marking its own student's
 * arithmetic is a needless source of both false praise and false failure.
 */
export const answerSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('number'),
    value: z.number(),
    tolerance: z.number().min(0).default(0),
    unit: z.string().max(20).optional(),
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
]);

export type Answer = z.infer<typeof answerSchema>;

// ---------------------------------------------------------------------------

export const problemSchema = z.object({
  id: slug,
  skillIds: z.array(slug).min(1).max(6),
  difficulty: z.enum(['basic', 'advanced', 'challenge']),
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
  /** Misconception codes this problem is known to provoke. */
  misconceptionCodes: z.array(slug).max(6).default([]),
});

export type Problem = z.infer<typeof problemSchema>;

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
