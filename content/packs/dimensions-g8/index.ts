import { curriculumPackSchema, type CurriculumPack } from '@/lib/content/schema';
import generated from './generated.json';
import { exponentsSkills, exponentsProblems } from './exponents';
import { linearSystemsSkills, linearSystemsProblems } from './linear-systems';
import { expansionSkills, expansionProblems } from './expansion';
import {
  quadraticFactorisationSkills,
  quadraticFactorisationProblems,
} from './quadratic-factorisation';

/**
 * Assembles the pack: the mechanically ported skeleton, with hand-authored units laid over
 * the top. Overlaying rather than editing `generated.json` keeps the boundary between
 * "derived from the syllabus outline" and "actually written" visible at a glance —
 * `AUTHORED_UNITS` below is an honest progress bar for the authoring pass.
 *
 * Provenance of `generated.json`: derived once from the 14-chapter array in the previous
 * version of this app (`src/data/curriculumData.ts` at commit `d7e2ac3`, still on `main`),
 * which was itself written from the two source documents in `docs/`. One skill node per
 * chapter objective, CPA notes inherited per chapter, misconceptions lifted from the sample
 * problems. Problems were deliberately not ported: those records carry a prose solution and
 * no structured answer, and inventing one would give a bank that cannot be marked.
 *
 * Treat `generated.json` as authored content now, not as build output — edit it directly.
 * The one-shot script that produced it has been removed along with its input.
 */

/** Units that have had the full authoring pass: per-skill CPA notes, real probes, marked problems. */
export const AUTHORED_UNITS = new Set([
  'exponents',
  'linear-systems',
  'expansion',
  'quadratic-factorisation',
]);

const authoredSkills = [
  ...exponentsSkills,
  ...linearSystemsSkills,
  ...expansionSkills,
  ...quadraticFactorisationSkills,
];

const authoredProblems = [
  ...exponentsProblems,
  ...linearSystemsProblems,
  ...expansionProblems,
  ...quadraticFactorisationProblems,
];

const authoredSkillIds = new Set(authoredSkills.map((s) => s.id));

const raw = {
  ...generated,
  skills: [
    // Drop the generated stub wherever a hand-authored skill replaces it.
    ...generated.skills.filter((s) => !authoredSkillIds.has(s.id)),
    ...authoredSkills,
  ],
  problems: authoredProblems,
};

export const dimensionsG8: CurriculumPack = curriculumPackSchema.parse(raw);
