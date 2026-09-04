import type { CpaStage } from '@/lib/db/schema';

/**
 * Mastery as a Beta posterior per skill.
 *
 * Chosen over IRT because the item pool is far too small to calibrate difficulty
 * parameters, and over a raw percentage because a percentage cannot express the difference
 * between "wrong once" and "wrong nine times out of ten". Beta carries both the estimate
 * and our confidence in it, and it is simple enough to explain to a student.
 *
 * The evidence weighting is where the pedagogy lives:
 *
 *  - A right answer after three hints is not the same as a right answer after none. Hints
 *    split the evidence, crediting part of the success to the scaffolding.
 *  - Succeeding at the abstract stage says more about mastery than succeeding with the
 *    blocks still on the table, so later stages carry more weight.
 *  - Unused skills decay toward the prior, which is what makes old material resurface
 *    instead of being ticked off once and forgotten.
 */

/** Weakly informative. Centred at 0.5 so one lucky answer cannot read as mastery. */
export const PRIOR_ALPHA = 2;
export const PRIOR_BETA = 2;

/** How much a success at each stage counts. */
const STAGE_WEIGHT: Record<CpaStage, number> = {
  concrete: 0.6,
  pictorial: 0.8,
  abstract: 1.0,
};

/** Evidence loses half its weight over this long without practice. */
const DECAY_HALF_LIFE_MS = 30 * 24 * 60 * 60 * 1000;

export interface Posterior {
  alpha: number;
  beta: number;
}

export interface Evidence {
  correct: boolean;
  hintsUsed: number;
  cpaStage: CpaStage;
}

export type MasteryBand = 'unseen' | 'developing' | 'approaching' | 'secure';

export interface Mastery {
  skillId: string;
  /** Posterior mean: our best estimate of the chance they get the next one right. */
  estimate: number;
  /** Total evidence accumulated. Low means the estimate is a guess. */
  strength: number;
  band: MasteryBand;
  attemptCount: number;
}

export const INITIAL_POSTERIOR: Posterior = { alpha: PRIOR_ALPHA, beta: PRIOR_BETA };

/**
 * Fold one attempt into the posterior.
 *
 * A success after `h` hints contributes `1/(1+h)` to alpha and the remainder to beta: with
 * one hint the evidence splits evenly, with three it is mostly evidence that help was
 * needed. Failure is unambiguous and counts in full.
 */
export function update(prior: Posterior, evidence: Evidence): Posterior {
  const weight = STAGE_WEIGHT[evidence.cpaStage];

  if (!evidence.correct) {
    return { alpha: prior.alpha, beta: prior.beta + weight };
  }

  const hints = Math.max(0, evidence.hintsUsed);
  const credit = 1 / (1 + hints);

  return {
    alpha: prior.alpha + weight * credit,
    beta: prior.beta + weight * (1 - credit),
  };
}

/**
 * Pull a posterior back toward the prior to reflect time passed. Applied on read rather
 * than written into the row, so the stored evidence stays a faithful record of what
 * actually happened.
 */
export function decay(posterior: Posterior, elapsedMs: number): Posterior {
  if (elapsedMs <= 0) return posterior;

  const retained = Math.pow(0.5, elapsedMs / DECAY_HALF_LIFE_MS);

  return {
    alpha: PRIOR_ALPHA + (posterior.alpha - PRIOR_ALPHA) * retained,
    beta: PRIOR_BETA + (posterior.beta - PRIOR_BETA) * retained,
  };
}

export function estimate(posterior: Posterior): number {
  return posterior.alpha / (posterior.alpha + posterior.beta);
}

/** Evidence accumulated beyond the prior. Zero means we know nothing yet. */
export function strength(posterior: Posterior): number {
  return posterior.alpha + posterior.beta - PRIOR_ALPHA - PRIOR_BETA;
}

export function band(posterior: Posterior, attemptCount: number): MasteryBand {
  if (attemptCount === 0) return 'unseen';

  const p = estimate(posterior);
  const s = strength(posterior);

  // "Secure" requires both a high estimate and enough evidence to trust it. Without the
  // second condition a single correct answer would read as mastery.
  if (p >= 0.8 && s >= 2.5) return 'secure';
  if (p >= 0.6) return 'approaching';
  return 'developing';
}

export function toMastery(
  skillId: string,
  posterior: Posterior,
  attemptCount: number,
  lastSeenAt: number,
  now: number = Date.now(),
): Mastery {
  const decayed = attemptCount > 0 ? decay(posterior, now - lastSeenAt) : posterior;
  return {
    skillId,
    estimate: estimate(decayed),
    strength: strength(decayed),
    band: band(decayed, attemptCount),
    attemptCount,
  };
}

// ---------------------------------------------------------------------------

export interface Recommendation {
  skillId: string;
  reason: 'next-new' | 'shaky' | 'review' | 'blocked-prerequisite';
  /** Short, student-facing. Shown alongside the suggestion so it never feels arbitrary. */
  explanation: string;
}

export interface SkillContext {
  skillId: string;
  title: string;
  prerequisites: string[];
  /** Position in the curriculum, used only to break ties. */
  order: number;
}

/**
 * Choose what to work on next.
 *
 * Order of preference: shore up a prerequisite that is not holding, then continue with new
 * material that is unlocked, then revisit something that has decayed. A skill whose
 * prerequisites are shaky is never recommended directly — that is how students end up
 * failing at quadratics because their distribution is weak.
 */
export function recommend(
  skills: SkillContext[],
  mastery: Map<string, Mastery>,
  limit = 3,
): Recommendation[] {
  const masteryOf = (id: string): Mastery =>
    mastery.get(id) ?? {
      skillId: id,
      estimate: estimate(INITIAL_POSTERIOR),
      strength: 0,
      band: 'unseen',
      attemptCount: 0,
    };

  const isReady = (id: string): boolean => {
    const m = masteryOf(id);
    return m.band === 'secure' || m.band === 'approaching';
  };

  const out: Recommendation[] = [];
  const taken = new Set<string>();

  const push = (skillId: string, reason: Recommendation['reason'], explanation: string) => {
    if (taken.has(skillId) || out.length >= limit) return;
    taken.add(skillId);
    out.push({ skillId, reason, explanation });
  };

  const ordered = [...skills].sort((a, b) => a.order - b.order);

  // 1. Anything actively shaky, oldest material first — the foundations matter most.
  for (const skill of ordered) {
    const m = masteryOf(skill.skillId);
    if (m.band === 'developing') {
      push(skill.skillId, 'shaky', `This one is not holding yet, and it is worth being solid on.`);
    }
  }

  // 2. New material whose prerequisites are ready.
  for (const skill of ordered) {
    const m = masteryOf(skill.skillId);
    if (m.band !== 'unseen') continue;

    const unmet = skill.prerequisites.filter((p) => !isReady(p));
    if (unmet.length === 0) {
      push(skill.skillId, 'next-new', 'You have the groundwork for this — it is the natural next step.');
    }
  }

  // 3. Material that has faded. Only once nothing more urgent is outstanding.
  for (const skill of ordered) {
    const m = masteryOf(skill.skillId);
    if (m.band === 'approaching' && m.attemptCount > 0) {
      push(skill.skillId, 'review', 'You had this — a quick revisit will make it stick.');
    }
  }

  return out.slice(0, limit);
}
