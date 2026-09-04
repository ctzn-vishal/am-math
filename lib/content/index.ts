import { dimensionsG8 } from '@/content/packs/dimensions-g8';
import {
  checkPackIntegrity,
  type CurriculumPack,
  type Problem,
  type SkillNode,
  type Unit,
} from './schema';

/**
 * Pack access. Everything downstream — the tutor, the mastery model, the UI — reads the
 * curriculum through here and never imports a pack directly, so swapping or adding a
 * curriculum is a one-line change in this file.
 */

const PACKS: Record<string, CurriculumPack> = {
  [dimensionsG8.id]: dimensionsG8,
};

export const DEFAULT_PACK_ID = dimensionsG8.id;

let integrityChecked = false;

/**
 * Fail loudly at startup rather than quietly at a lesson boundary. A dangling skill id
 * costs nothing to find here and is maddening to diagnose from a blank panel later.
 */
function assertIntegrity(): void {
  if (integrityChecked) return;
  integrityChecked = true;

  for (const pack of Object.values(PACKS)) {
    const issues = checkPackIntegrity(pack);
    if (issues.length > 0) {
      const detail = issues.map((i) => `  ${i.path}: ${i.message}`).join('\n');
      throw new Error(`Curriculum pack "${pack.id}" failed integrity checks:\n${detail}`);
    }
  }
}

export function getPack(packId: string = DEFAULT_PACK_ID): CurriculumPack {
  assertIntegrity();
  const pack = PACKS[packId];
  if (!pack) throw new Error(`Unknown curriculum pack "${packId}".`);
  return pack;
}

export function listPacks(): CurriculumPack[] {
  assertIntegrity();
  return Object.values(PACKS);
}

export function getSkill(skillId: string, packId?: string): SkillNode | undefined {
  return getPack(packId).skills.find((s) => s.id === skillId);
}

export function getUnit(unitId: string, packId?: string): Unit | undefined {
  return getPack(packId).units.find((u) => u.id === unitId);
}

export function getProblem(problemId: string, packId?: string): Problem | undefined {
  return getPack(packId).problems.find((p) => p.id === problemId);
}

export function problemsForSkill(skillId: string, packId?: string): Problem[] {
  return getPack(packId).problems.filter((p) => p.skillIds.includes(skillId));
}

export function unitsInOrder(packId?: string): Unit[] {
  return [...getPack(packId).units].sort((a, b) => a.order - b.order);
}

export function skillsOfUnit(unitId: string, packId?: string): SkillNode[] {
  const pack = getPack(packId);
  const unit = pack.units.find((u) => u.id === unitId);
  if (!unit) return [];
  return unit.skillIds
    .map((id) => pack.skills.find((s) => s.id === id))
    .filter((s): s is SkillNode => s !== undefined);
}

/** Find a skill's unit — needed to show the student where they are. */
export function unitOfSkill(skillId: string, packId?: string): Unit | undefined {
  return getPack(packId).units.find((u) => u.skillIds.includes(skillId));
}

/**
 * Prerequisites in teaching order, deepest first, excluding the skill itself.
 * Used to explain *why* a suggestion was made and to back off to firmer ground when a
 * student is struggling.
 */
export function prerequisiteChain(skillId: string, packId?: string): SkillNode[] {
  const pack = getPack(packId);
  const byId = new Map(pack.skills.map((s) => [s.id, s]));
  const out: SkillNode[] = [];
  const seen = new Set<string>([skillId]);

  const walk = (id: string): void => {
    const skill = byId.get(id);
    if (!skill) return;
    for (const prereq of skill.prerequisites) {
      if (seen.has(prereq)) continue;
      seen.add(prereq);
      walk(prereq);
      const node = byId.get(prereq);
      if (node) out.push(node);
    }
  };

  walk(skillId);
  return out;
}

export * from './schema';
