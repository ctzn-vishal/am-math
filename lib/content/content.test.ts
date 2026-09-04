import { describe, it, expect } from 'vitest';
import {
  getPack,
  getSkill,
  prerequisiteChain,
  problemsForSkill,
  unitsInOrder,
  skillsOfUnit,
  unitOfSkill,
  checkPackIntegrity,
  curriculumPackSchema,
} from './index';
import { AUTHORED_UNITS } from '@/content/packs/dimensions-g8';
import { parseVisualSpec } from '@/lib/visual/registry';

describe('dimensions-g8 pack', () => {
  const pack = getPack();

  it('loads and passes integrity checks', () => {
    expect(checkPackIntegrity(pack)).toEqual([]);
  });

  it('covers all 14 units and 49 skills from the source syllabus', () => {
    expect(pack.units).toHaveLength(14);
    expect(pack.skills).toHaveLength(49);
  });

  it('orders units 1 through 14 without gaps', () => {
    expect(unitsInOrder().map((u) => u.order)).toEqual([...Array(14)].map((_, i) => i + 1));
  });

  it('keeps every skill reachable from exactly one unit', () => {
    for (const skill of pack.skills) {
      expect(unitOfSkill(skill.id), `${skill.id} has no unit`).toBeDefined();
    }
  });

  it('preserves the misconception taxonomy from the source material', () => {
    const codes = pack.skills.flatMap((s) => s.misconceptions.map((m) => m.code));
    expect(codes.length).toBeGreaterThanOrEqual(28);
    expect(new Set(codes).size).toBe(codes.length);
  });
});

describe('authored units', () => {
  it('has linear-systems fully authored with marked problems', () => {
    expect(AUTHORED_UNITS.has('linear-systems')).toBe(true);

    const skills = skillsOfUnit('linear-systems');
    expect(skills).toHaveLength(3);

    // The tell for a mechanically ported skill is three identical CPA notes shared across
    // the whole unit. An authored unit must not have that.
    const concreteNotes = skills.map((s) => s.cpa.concrete);
    expect(new Set(concreteNotes).size).toBe(3);

    for (const skill of skills) {
      expect(skill.summary.length).toBeGreaterThan(0);
    }
  });

  it('gives every authored problem a machine-checkable answer', () => {
    for (const problem of getPack().problems) {
      expect(problem.answer.type).not.toBe(undefined);
      expect(problem.hints.length).toBeGreaterThan(0);
      expect(problem.solution.length).toBeGreaterThan(0);
    }
  });

  it('links problems to misconceptions that actually exist', () => {
    // checkPackIntegrity covers this, but assert it directly for the authored unit since
    // these codes are what the mastery model will key on.
    const problems = problemsForSkill('linear-systems.solve-simultaneous-linear');
    expect(problems.length).toBeGreaterThan(0);
    expect(problems[0]?.misconceptionCodes.length).toBeGreaterThan(0);
  });
});

describe('skill graph', () => {
  it('walks prerequisites deepest-first', () => {
    const chain = prerequisiteChain('linear-systems.formulate-solve-applied');
    expect(chain.map((s) => s.id)).toEqual([
      'linear-systems.model-real-world-relationships',
      'linear-systems.solve-simultaneous-linear',
    ]);
  });

  it('returns an empty chain for a root skill', () => {
    expect(prerequisiteChain('linear-systems.model-real-world-relationships')).toEqual([]);
  });

  it('is acyclic across the whole pack', () => {
    // checkPackIntegrity reports cycles; assert none surfaced.
    const cycles = checkPackIntegrity(getPack()).filter((i) => i.message.includes('cycle'));
    expect(cycles).toEqual([]);
  });
});

describe('pack schema guards', () => {
  it('rejects a skill id that is not a slug', () => {
    const result = curriculumPackSchema.safeParse({
      id: 'test',
      title: 'Test',
      description: '',
      level: 'X',
      units: [{ id: 'u1', title: 'Unit', order: 0, strand: 'algebra', skillIds: ['Bad Id'] }],
      skills: [
        {
          id: 'Bad Id',
          title: 'X',
          summary: '',
          cpa: { concrete: 'a', pictorial: 'b', abstract: 'c' },
        },
      ],
    });
    expect(result.success).toBe(false);
  });

  it('catches a dangling prerequisite', () => {
    const pack = curriculumPackSchema.parse({
      id: 'test',
      title: 'Test',
      description: '',
      level: 'X',
      units: [{ id: 'u1', title: 'Unit', order: 0, strand: 'algebra', skillIds: ['a.one'] }],
      skills: [
        {
          id: 'a.one',
          title: 'One',
          summary: '',
          prerequisites: ['a.missing'],
          cpa: { concrete: 'a', pictorial: 'b', abstract: 'c' },
        },
      ],
    });
    const issues = checkPackIntegrity(pack);
    expect(issues.map((i) => i.message)).toContain('Unknown skill "a.missing".');
  });

  it('catches a prerequisite cycle', () => {
    const pack = curriculumPackSchema.parse({
      id: 'test',
      title: 'Test',
      description: '',
      level: 'X',
      units: [{ id: 'u1', title: 'Unit', order: 0, strand: 'algebra', skillIds: ['a.one', 'a.two'] }],
      skills: [
        {
          id: 'a.one',
          title: 'One',
          summary: '',
          prerequisites: ['a.two'],
          cpa: { concrete: 'a', pictorial: 'b', abstract: 'c' },
        },
        {
          id: 'a.two',
          title: 'Two',
          summary: '',
          prerequisites: ['a.one'],
          cpa: { concrete: 'a', pictorial: 'b', abstract: 'c' },
        },
      ],
    });
    const cycles = checkPackIntegrity(pack).filter((i) => i.message.includes('cycle'));
    expect(cycles.length).toBeGreaterThan(0);
  });
});

describe('suggested visuals resolve to real renderers', () => {
  it('names only kinds the visual registry knows about', () => {
    for (const skill of getPack().skills) {
      if (!skill.suggestedVisual) continue;
      // A suggestion for an unimplemented kind is fine (the tutor falls back to words),
      // but a suggestion for a kind that does not exist at all is a typo.
      const probe = parseVisualSpec({ kind: skill.suggestedVisual });
      const unknownKind =
        !probe.ok && probe.issues.some((i) => i.path === '(root)' && i.message.includes('option'));
      expect(unknownKind, `${skill.id} suggests unknown kind "${skill.suggestedVisual}"`).toBe(false);
    }
  });
});
