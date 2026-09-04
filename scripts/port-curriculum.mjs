/**
 * One-shot port of the legacy `curriculumData.ts` chapter array into the skill-graph pack
 * format. Run once, review the output, then hand-edit the pack — this script is kept only
 * so the derivation is reproducible and auditable, not as part of the build.
 *
 *   node scripts/port-curriculum.mjs > content/packs/dimensions-g8/generated.json
 *
 * What it does NOT port: problems. The legacy records carry a prose `solutionSummary` but
 * no structured answer, and inventing one would give us a problem bank that cannot be
 * marked. Problems are authored by hand against `answerSchema` instead.
 */

import { SINGAPORE_MATH_CHAPTERS } from '../.keep/curriculumData.mjs';

/** Short, stable unit slugs. Hand-written: these are the spine every id hangs off. */
const UNIT_SLUGS = {
  1: 'exponents',
  2: 'linear-systems',
  3: 'expansion',
  4: 'quadratic-factorisation',
  5: 'algebraic-fractions',
  6: 'congruence',
  7: 'parallel-angles',
  8: 'function-graphs',
  9: 'practical-graphs',
  10: 'pythagoras',
  11: 'coordinate-geometry',
  12: 'mensuration',
  13: 'data-analysis',
  14: 'quadratic-methods',
};

const STRAND = {
  Algebra: 'algebra',
  Geometry: 'geometry',
  Graphs: 'graphs',
  Mensuration: 'mensuration',
  Statistics: 'statistics',
};

/** Words that carry no distinguishing weight in an objective. */
const STOP = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'by', 'for', 'from', 'in', 'into', 'is', 'its', 'of', 'on',
  'or', 'the', 'to', 'with', 'using', 'use', 'their', 'them', 'that', 'this', 'these', 'such',
  'including', 'given', 'between', 'when', 'where', 'which', 'both', 'any', 'all', 'other',
  'apply', 'perform', 'express', 'specified', 'various',
]);

function slugWords(text, count) {
  const words = text
    .toLowerCase()
    .replace(/\$[^$]*\$/g, ' ')          // drop inline LaTeX
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
  return words.slice(0, count).join('-') || 'skill';
}

/** Map a chapter's recommended tool onto a VisualKind, where one clearly fits. */
const VISUAL_BY_UNIT = {
  1: undefined,
  2: 'bar_model',
  3: 'area_grid',
  4: 'cross_frame',
  5: 'bar_model',
  6: 'angle_diagram',
  7: 'angle_diagram',
  8: 'coordinate_plane',
  9: 'coordinate_plane',
  10: 'solid_net',
  11: 'coordinate_plane',
  12: 'solid_net',
  13: 'stat_plot',
  14: 'cross_frame',
};

const units = [];
const skills = [];
const usedIds = new Set();

for (const chapter of SINGAPORE_MATH_CHAPTERS) {
  const unitSlug = UNIT_SLUGS[chapter.number];
  if (!unitSlug) throw new Error(`No slug for chapter ${chapter.number}`);

  const skillIds = [];

  chapter.objectives.forEach((objective, index) => {
    let base = slugWords(objective, 3);
    let id = `${unitSlug}.${base}`;
    let n = 2;
    while (usedIds.has(id)) id = `${unitSlug}.${base}-${n++}`;
    usedIds.add(id);
    skillIds.push(id);

    skills.push({
      id,
      title: objective,
      summary: '',
      // Within a unit, each objective builds on the previous. Cross-unit prerequisites are
      // a genuine authoring decision and are left for the hand pass.
      prerequisites: index === 0 ? [] : [skillIds[index - 1]],
      cpa: {
        // Inherited from the chapter: the legacy data holds CPA notes per chapter, not per
        // objective. Every skill in a unit therefore starts with the same three notes and
        // needs narrowing by hand.
        concrete: chapter.concreteNotes,
        pictorial: chapter.pictorialNotes,
        abstract: chapter.abstractNotes,
      },
      formulas: index === 0 ? chapter.coreFormulas : [],
      misconceptions: [],
      suggestedVisual: VISUAL_BY_UNIT[chapter.number],
      _needsAuthoring: true,
    });
  });

  units.push({
    id: unitSlug,
    title: chapter.title,
    order: chapter.number,
    strand: STRAND[chapter.category],
    skillIds,
  });
}

// Misconceptions live on the legacy problems. Attach each to the first skill of its unit so
// the taxonomy is not lost; the hand pass moves them to the skill they actually belong to.
for (const chapter of SINGAPORE_MATH_CHAPTERS) {
  const unitSlug = UNIT_SLUGS[chapter.number];
  const firstSkill = skills.find((s) => s.id.startsWith(`${unitSlug}.`));
  if (!firstSkill) continue;

  chapter.sampleProblems.forEach((problem, i) => {
    if (!problem.commonMisconception) return;
    firstSkill.misconceptions.push({
      code: `${unitSlug}.mis-${i + 1}`,
      description: problem.commonMisconception,
      probe: problem.scaffoldingHints[0] ?? 'What does each symbol here stand for?',
      correction: problem.abstractPrompt,
    });
  });
}

const pack = {
  id: 'dimensions-g8',
  title: 'Dimensions Math — Grade 8 / Secondary 2',
  description:
    'Singapore Secondary 2 mathematics, taught through the Concrete-Pictorial-Abstract sequence. ' +
    'Ported from the chapter outline in docs/, then authored unit by unit.',
  level: 'Secondary 2',
  units,
  skills,
  problems: [],
};

process.stdout.write(JSON.stringify(pack, null, 2));
