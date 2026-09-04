import { curriculumPackSchema, type CurriculumPack } from '@/lib/content/schema';
import generated from './generated.json';
import { linearSystemsSkills, linearSystemsProblems } from './linear-systems';

/**
 * Assembles the pack: the mechanically ported skeleton, with hand-authored units laid over
 * the top. Overlaying rather than editing `generated.json` keeps the boundary between
 * "derived from the old app" and "actually written" visible at a glance — `AUTHORED_UNITS`
 * below is an honest progress bar for the Phase 2 authoring pass.
 */

/** Units that have had the full authoring pass: per-skill CPA notes, real probes, marked problems. */
export const AUTHORED_UNITS = new Set(['linear-systems']);

const authoredSkills = [...linearSystemsSkills];
const authoredProblems = [...linearSystemsProblems];

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
