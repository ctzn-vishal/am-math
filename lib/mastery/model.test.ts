import { describe, it, expect } from 'vitest';
import {
  INITIAL_POSTERIOR,
  update,
  decay,
  estimate,
  band,
  toMastery,
  recommend,
  type Mastery,
  type SkillContext,
} from './model';

const DAY = 24 * 60 * 60 * 1000;

describe('evidence weighting', () => {
  it('starts at even odds with no evidence', () => {
    expect(estimate(INITIAL_POSTERIOR)).toBe(0.5);
    expect(band(INITIAL_POSTERIOR, 0)).toBe('unseen');
  });

  it('credits an unaided correct answer more than a hinted one', () => {
    const unaided = update(INITIAL_POSTERIOR, { correct: true, hintsUsed: 0, cpaStage: 'abstract' });
    const hinted = update(INITIAL_POSTERIOR, { correct: true, hintsUsed: 3, cpaStage: 'abstract' });
    expect(estimate(unaided)).toBeGreaterThan(estimate(hinted));
  });

  it('treats a heavily hinted success as near-neutral evidence', () => {
    const hinted = update(INITIAL_POSTERIOR, { correct: true, hintsUsed: 3, cpaStage: 'abstract' });
    // 3 hints => a quarter credit, three quarters "needed help". Should barely move.
    expect(estimate(hinted)).toBeLessThan(0.55);
    expect(estimate(hinted)).toBeGreaterThan(0.4);
  });

  it('weights abstract success above concrete success', () => {
    const abstract = update(INITIAL_POSTERIOR, { correct: true, hintsUsed: 0, cpaStage: 'abstract' });
    const concrete = update(INITIAL_POSTERIOR, { correct: true, hintsUsed: 0, cpaStage: 'concrete' });
    expect(estimate(abstract)).toBeGreaterThan(estimate(concrete));
  });

  it('counts failure in full', () => {
    const after = update(INITIAL_POSTERIOR, { correct: false, hintsUsed: 0, cpaStage: 'abstract' });
    expect(after.alpha).toBe(INITIAL_POSTERIOR.alpha);
    expect(after.beta).toBe(INITIAL_POSTERIOR.beta + 1);
    expect(estimate(after)).toBeLessThan(0.5);
  });
});

describe('mastery bands', () => {
  it('does not call a single correct answer mastery', () => {
    const after = update(INITIAL_POSTERIOR, { correct: true, hintsUsed: 0, cpaStage: 'abstract' });
    expect(band(after, 1)).not.toBe('secure');
  });

  it('reaches secure after sustained unaided success', () => {
    let p = INITIAL_POSTERIOR;
    for (let i = 0; i < 8; i++) {
      p = update(p, { correct: true, hintsUsed: 0, cpaStage: 'abstract' });
    }
    expect(band(p, 8)).toBe('secure');
  });

  it('drops to developing after repeated failure', () => {
    let p = INITIAL_POSTERIOR;
    for (let i = 0; i < 4; i++) {
      p = update(p, { correct: false, hintsUsed: 0, cpaStage: 'pictorial' });
    }
    expect(band(p, 4)).toBe('developing');
  });
});

describe('decay', () => {
  it('leaves fresh evidence alone', () => {
    let p = INITIAL_POSTERIOR;
    for (let i = 0; i < 6; i++) p = update(p, { correct: true, hintsUsed: 0, cpaStage: 'abstract' });
    const fresh = decay(p, 0);
    expect(fresh.alpha).toBeCloseTo(p.alpha);
  });

  it('halves accumulated evidence over the half-life', () => {
    let p = INITIAL_POSTERIOR;
    for (let i = 0; i < 6; i++) p = update(p, { correct: true, hintsUsed: 0, cpaStage: 'abstract' });
    const gained = p.alpha - INITIAL_POSTERIOR.alpha;
    const faded = decay(p, 30 * DAY);
    expect(faded.alpha - INITIAL_POSTERIOR.alpha).toBeCloseTo(gained / 2, 5);
  });

  it('pulls a long-untouched skill back toward uncertainty', () => {
    let p = INITIAL_POSTERIOR;
    for (let i = 0; i < 8; i++) p = update(p, { correct: true, hintsUsed: 0, cpaStage: 'abstract' });
    const now = Date.now();
    const fresh = toMastery('s', p, 8, now, now);
    const stale = toMastery('s', p, 8, now - 180 * DAY, now);
    expect(fresh.band).toBe('secure');
    expect(stale.estimate).toBeLessThan(fresh.estimate);
    expect(stale.band).not.toBe('secure');
  });
});

describe('recommendations', () => {
  const skills: SkillContext[] = [
    { skillId: 'a', title: 'A', prerequisites: [], order: 1 },
    { skillId: 'b', title: 'B', prerequisites: ['a'], order: 2 },
    { skillId: 'c', title: 'C', prerequisites: ['b'], order: 3 },
  ];

  const mastery = (entries: Array<[string, Partial<Mastery>]>): Map<string, Mastery> =>
    new Map(
      entries.map(([id, m]) => [
        id,
        { skillId: id, estimate: 0.5, strength: 0, band: 'unseen', attemptCount: 0, ...m },
      ]),
    );

  it('starts at the first skill when nothing is known', () => {
    const recs = recommend(skills, new Map());
    expect(recs[0]?.skillId).toBe('a');
    expect(recs[0]?.reason).toBe('next-new');
  });

  it('will not recommend a skill whose prerequisite is not ready', () => {
    const recs = recommend(skills, mastery([['a', { band: 'developing', attemptCount: 3 }]]));
    expect(recs.map((r) => r.skillId)).not.toContain('b');
  });

  it('prioritises shoring up a shaky foundation over new material', () => {
    const recs = recommend(
      skills,
      mastery([
        ['a', { band: 'developing', attemptCount: 4, estimate: 0.4 }],
        ['b', { band: 'secure', attemptCount: 6, estimate: 0.9 }],
      ]),
    );
    expect(recs[0]?.skillId).toBe('a');
    expect(recs[0]?.reason).toBe('shaky');
  });

  it('unlocks the next skill once its prerequisite is approaching', () => {
    const recs = recommend(skills, mastery([['a', { band: 'approaching', attemptCount: 3, estimate: 0.7 }]]));
    expect(recs.map((r) => r.skillId)).toContain('b');
  });

  it('offers review only after urgent work is exhausted', () => {
    const recs = recommend(
      skills,
      mastery([
        ['a', { band: 'approaching', attemptCount: 5, estimate: 0.7 }],
        ['b', { band: 'secure', attemptCount: 8, estimate: 0.9 }],
        ['c', { band: 'secure', attemptCount: 8, estimate: 0.9 }],
      ]),
      3,
    );
    expect(recs.some((r) => r.reason === 'review' && r.skillId === 'a')).toBe(true);
  });

  it('respects the limit', () => {
    expect(recommend(skills, new Map(), 1)).toHaveLength(1);
  });

  it('never repeats a skill', () => {
    const recs = recommend(skills, mastery([['a', { band: 'developing', attemptCount: 3 }]]), 3);
    expect(new Set(recs.map((r) => r.skillId)).size).toBe(recs.length);
  });
});
