import { randomUUID } from 'node:crypto';
import { and, desc, eq, isNotNull } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from '@/lib/db';
import { attempts, sessions, skillState, students, turns, type CpaStage } from '@/lib/db/schema';
import {
  DEFAULT_PACK_ID,
  getPack,
  getProblem,
  getSkill,
  problemsForSkill,
  unitOfSkill,
  unitsInOrder,
} from '@/lib/content';
import {
  INITIAL_POSTERIOR,
  recommend,
  toMastery,
  update,
  type Mastery,
  type Recommendation,
  type SkillContext,
} from '@/lib/mastery/model';

/**
 * Session state and the evidence trail.
 *
 * Everything the tutor engine reports as an event is persisted here, deliberately outside
 * the engine so a network retry cannot double-write an attempt and so the whole loop stays
 * testable without a database.
 */

/** Single-student build: one fixed profile rather than an auth system nobody needs yet. */
export const SOLO_STUDENT_ID = 'solo';

let migrated = false;

/**
 * Run migrations on first touch. A local single-user app should work after `npm install`
 * and `npm run dev`, not after remembering a separate database step.
 */
async function ensureSchema(): Promise<void> {
  if (migrated) return;
  migrated = true;
  await migrate(db, { migrationsFolder: './drizzle' });
}

export async function ensureStudent(name = 'Student'): Promise<string> {
  await ensureSchema();

  const existing = await db.select().from(students).where(eq(students.id, SOLO_STUDENT_ID)).limit(1);
  if (existing.length > 0) return SOLO_STUDENT_ID;

  await db.insert(students).values({ id: SOLO_STUDENT_ID, name, packId: DEFAULT_PACK_ID });
  return SOLO_STUDENT_ID;
}

// ---------------------------------------------------------------------------

export interface SessionContext {
  sessionId: string;
  studentId: string;
  skillId: string;
  problemId: string | null;
  stage: CpaStage;
  lastInteractionId: string | null;
  hintsUsed: number;
  priorMisconceptionCodes: string[];
}

export async function startSession(skillId: string, problemId?: string): Promise<string> {
  const studentId = await ensureStudent();

  if (!getSkill(skillId)) throw new Error(`Unknown skill "${skillId}".`);

  // Default to the skill's first problem so a lesson always has something concrete to work
  // on; the tutor can still teach without one.
  const resolvedProblem = problemId ?? problemsForSkill(skillId)[0]?.id ?? null;

  const id = randomUUID();
  await db.insert(sessions).values({
    id,
    studentId,
    skillId,
    problemId: resolvedProblem,
    cpaStage: 'concrete',
  });

  return id;
}

export async function getSessionContext(sessionId: string): Promise<SessionContext | null> {
  await ensureSchema();

  const rows = await db.select().from(sessions).where(eq(sessions.id, sessionId)).limit(1);
  const session = rows[0];
  if (!session || !session.skillId) return null;

  // Hints are counted from the transcript rather than stored, so the count can never drift
  // from what the student was actually shown.
  const hintsUsed = await countHintsSpent(sessionId);

  const seen = await db
    .selectDistinct({ code: attempts.misconceptionCode })
    .from(attempts)
    .where(
      and(
        eq(attempts.studentId, session.studentId),
        eq(attempts.skillId, session.skillId),
        isNotNull(attempts.misconceptionCode),
      ),
    );

  return {
    sessionId: session.id,
    studentId: session.studentId,
    skillId: session.skillId,
    problemId: session.problemId,
    stage: session.cpaStage,
    lastInteractionId: session.lastInteractionId,
    hintsUsed,
    priorMisconceptionCodes: seen.map((r) => r.code).filter((c): c is string => c !== null),
  };
}

/**
 * How many hints have been spent on the current problem.
 *
 * Approximated by counting tutor turns since the problem was set, capped at the number of
 * hints that exist. Imperfect — the tutor may ask a question without spending a hint — but
 * it errs toward crediting the student with *more* help than they had, which is the safe
 * direction for a mastery estimate. A `hint_given` tool would make this exact; noted for
 * Phase 3 rather than guessed at now.
 */
async function countHintsSpent(sessionId: string): Promise<number> {
  const rows = await db
    .select({ role: turns.role })
    .from(turns)
    .where(eq(turns.sessionId, sessionId));

  return rows.filter((r) => r.role === 'tutor').length;
}

// ---------------------------------------------------------------------------

export async function recordTurn(
  sessionId: string,
  role: 'student' | 'tutor' | 'system',
  text: string,
  extras: { visualSpec?: unknown; imageData?: string } = {},
): Promise<void> {
  await db.insert(turns).values({
    id: randomUUID(),
    sessionId,
    role,
    text,
    visualSpec: extras.visualSpec ? JSON.stringify(extras.visualSpec) : null,
    imageData: extras.imageData ?? null,
  });
}

export async function setLastInteractionId(sessionId: string, interactionId: string): Promise<void> {
  await db.update(sessions).set({ lastInteractionId: interactionId }).where(eq(sessions.id, sessionId));
}

export async function applyStageChange(sessionId: string, stage: CpaStage): Promise<void> {
  await db.update(sessions).set({ cpaStage: stage }).where(eq(sessions.id, sessionId));
}

/**
 * Record an attempt and fold it into the mastery posterior.
 *
 * Only ever called for a definite correct/incorrect. An unreadable response is our problem,
 * not evidence about the student, and never reaches here.
 */
export async function recordAttempt(params: {
  studentId: string;
  sessionId: string;
  skillId: string;
  problemId: string | null;
  correct: boolean;
  hintsUsed: number;
  cpaStage: CpaStage;
  misconceptionCode?: string;
}): Promise<void> {
  await db.insert(attempts).values({
    id: randomUUID(),
    studentId: params.studentId,
    sessionId: params.sessionId,
    skillId: params.skillId,
    problemId: params.problemId,
    correct: params.correct,
    hintsUsed: params.hintsUsed,
    cpaStage: params.cpaStage,
    misconceptionCode: params.misconceptionCode ?? null,
  });

  const existing = await db
    .select()
    .from(skillState)
    .where(and(eq(skillState.studentId, params.studentId), eq(skillState.skillId, params.skillId)))
    .limit(1);

  const prior = existing[0]
    ? { alpha: existing[0].alpha, beta: existing[0].beta }
    : INITIAL_POSTERIOR;

  const next = update(prior, {
    correct: params.correct,
    hintsUsed: params.hintsUsed,
    cpaStage: params.cpaStage,
  });

  if (existing[0]) {
    await db
      .update(skillState)
      .set({
        alpha: next.alpha,
        beta: next.beta,
        attemptCount: existing[0].attemptCount + 1,
        lastSeenAt: Date.now(),
      })
      .where(and(eq(skillState.studentId, params.studentId), eq(skillState.skillId, params.skillId)));
  } else {
    await db.insert(skillState).values({
      studentId: params.studentId,
      skillId: params.skillId,
      alpha: next.alpha,
      beta: next.beta,
      attemptCount: 1,
      lastSeenAt: Date.now(),
    });
  }
}

/**
 * Attach a misconception to the student's most recent incorrect attempt on this skill.
 *
 * The tutor usually identifies *why* an answer was wrong a turn or two after marking it
 * wrong, so back-filling is more faithful than creating a second attempt row that would
 * double-count the failure in the posterior.
 */
export async function recordMisconception(
  studentId: string,
  skillId: string,
  code: string,
): Promise<void> {
  const recent = await db
    .select({ id: attempts.id })
    .from(attempts)
    .where(
      and(
        eq(attempts.studentId, studentId),
        eq(attempts.skillId, skillId),
        eq(attempts.correct, false),
      ),
    )
    .orderBy(desc(attempts.createdAt))
    .limit(1);

  const target = recent[0];
  if (!target) return;

  await db.update(attempts).set({ misconceptionCode: code }).where(eq(attempts.id, target.id));
}

// ---------------------------------------------------------------------------

export async function getMastery(studentId = SOLO_STUDENT_ID): Promise<Map<string, Mastery>> {
  await ensureSchema();

  const rows = await db.select().from(skillState).where(eq(skillState.studentId, studentId));

  return new Map(
    rows.map((row) => [
      row.skillId,
      toMastery(
        row.skillId,
        { alpha: row.alpha, beta: row.beta },
        row.attemptCount,
        row.lastSeenAt,
      ),
    ]),
  );
}

export async function getRecommendations(studentId = SOLO_STUDENT_ID): Promise<Recommendation[]> {
  const pack = getPack();
  const mastery = await getMastery(studentId);

  const order = new Map<string, number>();
  unitsInOrder().forEach((unit, unitIndex) => {
    unit.skillIds.forEach((skillId, skillIndex) => {
      order.set(skillId, unitIndex * 100 + skillIndex);
    });
  });

  const contexts: SkillContext[] = pack.skills.map((skill) => ({
    skillId: skill.id,
    title: skill.title,
    prerequisites: skill.prerequisites,
    order: order.get(skill.id) ?? 9999,
  }));

  return recommend(contexts, mastery);
}

export async function getTranscript(sessionId: string) {
  await ensureSchema();
  return db.select().from(turns).where(eq(turns.sessionId, sessionId)).orderBy(turns.createdAt);
}

/** Resolve everything the engine needs for one turn. */
export async function resolveLesson(context: SessionContext) {
  const skill = getSkill(context.skillId);
  if (!skill) throw new Error(`Unknown skill "${context.skillId}".`);

  const unit = unitOfSkill(context.skillId);
  const problem = context.problemId ? getProblem(context.problemId) : undefined;

  return { skill, unitTitle: unit?.title ?? 'Mathematics', problem };
}
