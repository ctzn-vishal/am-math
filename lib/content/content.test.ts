import { describe, it, expect } from 'vitest';
import {
  getPack,
  getSkill,
  prerequisiteChain,
  practiceProblemsForSkill,
  problemsForSkill,
  workedExampleForSkill,
  unitsInOrder,
  skillsOfUnit,
  unitOfSkill,
  checkPackIntegrity,
  curriculumPackSchema,
} from './index';
import { AUTHORED_UNITS, BANKED_UNITS } from '@/content/packs/dimensions-g8';
import { parseVisualSpec } from '@/lib/visual/registry';
import { validateSpec } from '@/lib/visual/validate';

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

  it('keeps each worked example out of the practice sequence', () => {
    for (const skill of pack.skills) {
      const example = workedExampleForSkill(skill.id);
      const practice = practiceProblemsForSkill(skill.id);
      expect(example, `${skill.id} needs a worked example`).toBeDefined();
      expect(practice.length, `${skill.id} needs practice after the example`).toBeGreaterThan(0);
      expect(practice.map((problem) => problem.id)).not.toContain(example?.id);
    }
  });
});

describe('authored units', () => {
  const authored = [...AUTHORED_UNITS];

  it('covers every unit of the course', () => {
    expect(authored.sort()).toEqual(getPack().units.map((u) => u.id).sort());
  });

  /**
   * The authoring standard, enforced rather than described. The tell for a mechanically
   * ported unit is that every skill in it shares one set of CPA notes, inherited from the
   * chapter — so an authored unit must not have that, and must carry the rest of what
   * `docs/` provides: a summary, real probes, and problems code can mark.
   */
  for (const unitId of AUTHORED_UNITS) {
    describe(unitId, () => {
      const skills = skillsOfUnit(unitId);

      it('has skills', () => {
        expect(skills.length).toBeGreaterThan(0);
      });

      it("gives each skill its own CPA notes rather than the unit's", () => {
        for (const stage of ['concrete', 'pictorial', 'abstract'] as const) {
          const notes = skills.map((s) => s.cpa[stage]);
          expect(new Set(notes).size, `${unitId} shares one ${stage} note across skills`).toBe(
            skills.length,
          );
        }
      });

      it('writes a summary for every skill', () => {
        for (const skill of skills) {
          expect(skill.summary.length, skill.id).toBeGreaterThan(30);
        }
      });

      it('carries misconceptions with a probe and a correction', () => {
        const all = skills.flatMap((s) => s.misconceptions);
        expect(all.length, `${unitId} has no misconceptions`).toBeGreaterThan(0);

        for (const m of all) {
          // A probe is a question that surfaces the error, not a restatement of it.
          expect(m.probe, m.code).toMatch(/\?/);
          expect(m.correction.length, m.code).toBeGreaterThan(40);
          // The generated port used `unit.mis-N`; authored codes name the error.
          expect(m.code, 'authored codes should be descriptive').not.toMatch(/\.mis-\d+$/);
        }
      });

      it('has at least one markable problem', () => {
        const problems = getPack().problems.filter((p) =>
          p.skillIds.some((id) => skills.some((s) => s.id === id)),
        );
        expect(problems.length, `${unitId} has no problems`).toBeGreaterThan(0);

        for (const problem of problems) {
          expect(problem.hints.length, problem.id).toBeGreaterThanOrEqual(2);
          expect(problem.solution.length, problem.id).toBeGreaterThan(40);
          expect(problem.misconceptionCodes.length, problem.id).toBeGreaterThan(0);
          // Every CPA stage gets its own prompt, or the tutor has nothing to work from
          // at whichever stage the student is on.
          for (const stage of ['concrete', 'pictorial', 'abstract'] as const) {
            expect(problem.cpaPrompts[stage].length, `${problem.id}.${stage}`).toBeGreaterThan(30);
          }
        }
      });
    });
  }

  it('keeps titles as plain text, since they appear where maths cannot be rendered', () => {
    const latex = /[$\\]/;
    for (const skill of getPack().skills) expect(skill.title, skill.id).not.toMatch(latex);
    for (const unit of getPack().units) expect(unit.title, unit.id).not.toMatch(latex);
  });

  it('gives every skill at least one problem it can be marked on', () => {
    for (const skill of getPack().skills) {
      expect(problemsForSkill(skill.id).length, `${skill.id} has no problems`).toBeGreaterThan(0);
    }
  });
});

/**
 * The problem-set architecture from docs/PROBLEM-SET-GUIDE.md §2 and §3, enforced. A skill
 * is not "covered" by one problem: it needs a fluency sequence (order is content), items
 * that hide the skill in an unfamiliar surface, items that must be formulated from a
 * context, and one diagnostic per misconception whose distractors are the misconception's
 * own output.
 */
describe('problem bank', () => {
  const pack = getPack();
  const codeToSkill = new Map(pack.skills.flatMap((s) => s.misconceptions.map((m) => [m.code, s.id])));

  for (const unitId of BANKED_UNITS) {
    describe(unitId, () => {
      const skills = skillsOfUnit(unitId);
      const skillIds = new Set(skills.map((s) => s.id));
      // A problem belongs to the unit of its FIRST skill — the one it is primarily evidence
      // for. A crossover item that also lists another unit's skill is held to the standard
      // under its own unit, not twice.
      const problems = pack.problems.filter((p) => skillIds.has(p.skillIds[0] ?? ''));

      for (const skill of skills) {
        describe(skill.id, () => {
          const mine = problemsForSkill(skill.id);
          const byTier = (tier: number | 'diagnostic') => mine.filter((p) => p.tier === tier);

          it('opens with a variation sequence of at least five items', () => {
            const tier1 = byTier(1).filter((p) => p.skillIds[0] === skill.id);
            expect(tier1.length, `${skill.id} has ${tier1.length} tier-1 items`).toBeGreaterThanOrEqual(5);
            const families = new Map<string, number>();
            for (const p of tier1) {
              expect(p.sequence, `${p.id} is tier 1 but not in a sequence`).toBeDefined();
              if (p.sequence) families.set(p.sequence.family, (families.get(p.sequence.family) ?? 0) + 1);
            }
            const longest = Math.max(...families.values());
            expect(longest, `${skill.id}: longest sequence has ${longest} items`).toBeGreaterThanOrEqual(5);
          });

          it('carries an expect prompt on every sequence item after the first', () => {
            for (const p of mine) {
              if (p.sequence && p.sequence.position > 1 && p.tier === 1) {
                expect(p.expect, `${p.id} has no expect prompt`).toBeDefined();
                expect(p.expect?.length ?? 0, p.id).toBeGreaterThan(20);
              }
            }
          });

          it('has application and applied items', () => {
            expect(byTier(2).length, `${skill.id} has no tier-2 items`).toBeGreaterThanOrEqual(2);
            expect(byTier(3).length, `${skill.id} has no tier-3 items`).toBeGreaterThanOrEqual(1);
          });

          it('has exactly one diagnostic per misconception code', () => {
            for (const m of skill.misconceptions) {
              const diagnostics = pack.problems.filter(
                (p) => p.tier === 'diagnostic' && p.misconceptionCodes[0] === m.code,
              );
              expect(diagnostics.length, `${m.code} has ${diagnostics.length} diagnostics`).toBe(1);
              const d = diagnostics[0]!;
              const answer = d.answer;
              expect(answer.type).toBe('choice');
              if (answer.type !== 'choice') return;
              const detecting = answer.options.filter((o) => o.misconceptionCode === m.code);
              expect(detecting.length, `${d.id}: one option must be the output of ${m.code}`).toBe(1);
              const correct = answer.options.find((o) => o.label === answer.correct);
              expect(correct?.misconceptionCode, `${d.id}: the correct option carries a code`).toBeUndefined();
              // Every distractor names the error it reveals (Barton rule 1).
              for (const o of answer.options) {
                if (o.label === answer.correct) continue;
                expect(o.misconceptionCode, `${d.id}: option ${o.label} reveals no named error`).toBeDefined();
                expect(codeToSkill.has(o.misconceptionCode ?? ''), `${d.id}: unknown code`).toBe(true);
              }
            }
          });
        });
      }

      it('has at least one challenge item', () => {
        expect(problems.filter((p) => p.tier === 4).length, `${unitId} has no tier-4 item`).toBeGreaterThan(0);
      });

      it('meets the per-problem authoring standard', () => {
        for (const problem of problems) {
          expect(problem.hints.length, problem.id).toBeGreaterThanOrEqual(2);
          expect(problem.solution.length, problem.id).toBeGreaterThan(40);
          expect(problem.misconceptionCodes.length, problem.id).toBeGreaterThan(0);
          for (const stage of ['concrete', 'pictorial', 'abstract'] as const) {
            expect(problem.cpaPrompts[stage].length, `${problem.id}.${stage}`).toBeGreaterThan(30);
          }
          if (problem.figure) {
            const issues = validateSpec(problem.figure).issues.filter((i) => i.severity === 'error');
            expect(issues, `${problem.id} figure: ${issues.map((i) => i.message).join('; ')}`).toEqual([]);
          }
        }
      });

      it('keeps problem ids unique to the unit', () => {
        // The first quadratic unit's earliest problems and codes use the short prefix.
        const prefixes = unitId === 'quadratic-factorisation' ? [unitId, 'quadratic'] : [unitId];
        for (const problem of problems) {
          const ok = prefixes.some((prefix) => problem.id.startsWith(`${prefix}.`));
          expect(ok, `${problem.id} should start with "${unitId}."`).toBe(true);
        }
      });
    });
  }

  it('orders a skill by tier, then sequence position, with diagnostics last', () => {
    for (const skill of pack.skills) {
      const order = problemsForSkill(skill.id).map((p) =>
        p.tier === 'diagnostic' ? 5 : p.tier,
      );
      const sorted = [...order].sort((a, b) => a - b);
      expect(order, skill.id).toEqual(sorted);
    }
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
