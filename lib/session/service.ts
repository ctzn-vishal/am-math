import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { and, count, desc, eq, isNotNull, isNull } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from '@/lib/db';
import { attempts, sessions, skillState, students, turns, type CpaStage } from '@/lib/db/schema';
import {
  DEFAULT_PACK_ID,
  getPack,
  getProblem,
  getSkill,
  practiceProblemsForSkill,
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

let migration: Promise<void> | null = null;

/**
 * Run migrations on first touch. A local single-user app should work after `npm install`
 * and `npm run dev`, not after remembering a separate database step.
 *
 * The in-flight promise is shared so concurrent first requests wait on one migration
 * rather than racing it, and it is dropped on failure so the next request tries again
 * instead of inheriting a "done" flag from an attempt that never finished. An earlier
 * version set the flag before awaiting, which turned a missing migrations folder on the
 * host into one error per cold start followed by silent success.
 */
async function ensureSchema(): Promise<void> {
  if (!migration) {
    migration = migrate(db, { migrationsFolder: path.join(process.cwd(), 'drizzle') }).catch(
      (error: unknown) => {
        migration = null;
        throw new Error(
          `Database migration failed: ${error instanceof Error ? error.message : String(error)}`,
        );
      },
    );
  }
  await migration;
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
  /** Hints revealed on the current problem, as counted by the `give_hint` tool. */
  hintsUsed: number;
  /** The problem the model was last given the full brief for. */
  briefedProblemId: string | null;
  priorMisconceptionCodes: string[];
}

export async function startSession(skillId: string, problemId?: string): Promise<string> {
  const studentId = await ensureStudent();

  if (!getSkill(skillId)) throw new Error(`Unknown skill "${skillId}".`);

  // Default to the skill's first problem so a lesson always has something concrete to work
  // on; the tutor can still teach without one.
  const resolvedProblem = problemId ?? practiceProblemsForSkill(skillId)[0]?.id ?? null;

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
    hintsUsed: session.hintsUsed,
    briefedProblemId: session.briefedProblemId,
    priorMisconceptionCodes: seen.map((r) => r.code).filter((c): c is string => c !== null),
  };
}

export async function recordHintGiven(sessionId: string, hintsUsed: number): Promise<void> {
  await db.update(sessions).set({ hintsUsed }).where(eq(sessions.id, sessionId));
}

/** Note that the model has now been briefed on this problem, so the next turn need not repeat it. */
export async function markBriefed(sessionId: string, problemId: string | null): Promise<void> {
  await db.update(sessions).set({ briefedProblemId: problemId ?? '' }).where(eq(sessions.id, sessionId));
}

/**
 * Move a session on to another problem on the same skill. The hint count restarts, and
 * leaving `briefedProblemId` untouched is what makes the next turn resend the brief.
 */
export async function switchProblem(sessionId: string, problemId: string): Promise<void> {
  await db
    .update(sessions)
    .set({
      problemId,
      hintsUsed: 0,
      briefedProblemId: null,
      lastInteractionId: null,
      cpaStage: 'concrete',
    })
    .where(eq(sessions.id, sessionId));
}

export async function endSession(sessionId: string): Promise<void> {
  await db.update(sessions).set({ endedAt: Date.now() }).where(eq(sessions.id, sessionId));
}

export interface ProblemProgress {
  /** 1-based position of the current problem among the skill's problems. */
  index: number;
  total: number;
  /** Problems answered correctly in this session. */
  solvedIds: string[];
  currentSolved: boolean;
  nextProblemId: string | null;
}

/** A lesson is a useful sitting, not the entire problem bank. */
export const LESSON_PROBLEM_TARGET = 5;

/**
 * Where the session is in the skill's problem bank. "Next" is the first problem not yet
 * solved in this session, in bank order, so a student who skips one is brought back to it.
 */
export async function getProblemProgress(context: SessionContext): Promise<ProblemProgress> {
  const problems = practiceProblemsForSkill(context.skillId);

  const solvedRows = await db
    .select({ problemId: attempts.problemId })
    .from(attempts)
    .where(and(eq(attempts.sessionId, context.sessionId), eq(attempts.correct, true)));
  const practiceIds = new Set(problems.map((problem) => problem.id));
  const solved = new Set(
    solvedRows
      .map((row) => row.problemId)
      .filter((problemId): problemId is string => problemId !== null && practiceIds.has(problemId)),
  );

  const index = problems.findIndex((p) => p.id === context.problemId);
  const lessonTotal = Math.min(LESSON_PROBLEM_TARGET, problems.length);
  const currentSolved = context.problemId !== null && solved.has(context.problemId);
  // While the current question is open, include it in the projected completion count. This
  // makes question five end the lesson as soon as it is marked, instead of offering a sixth.
  const completeAfterCurrent = solved.size + (currentSolved ? 0 : 1) >= lessonTotal;
  const next = completeAfterCurrent
    ? null
    : problems.find((p, i) => i > index && !solved.has(p.id)) ??
      problems.find((p) => p.id !== context.problemId && !solved.has(p.id)) ??
      null;

  return {
    index: problems.length > 0 ? Math.min(solved.size + (currentSolved ? 0 : 1), lessonTotal) : 0,
    total: lessonTotal,
    solvedIds: [...solved],
    currentSolved,
    nextProblemId: next?.id ?? null,
  };
}

export interface RecentSession {
  sessionId: string;
  skillId: string;
  stage: CpaStage;
  startedAt: number;
  turnCount: number;
}

/**
 * Lessons the student can pick back up: not ended, and with at least one exchange in them.
 * A session that was opened and abandoned before a word was typed is not worth resuming.
 */
export async function recentSessions(limit = 4, studentId = SOLO_STUDENT_ID): Promise<RecentSession[]> {
  await ensureSchema();

  const rows = await db
    .select({
      sessionId: sessions.id,
      skillId: sessions.skillId,
      stage: sessions.cpaStage,
      startedAt: sessions.startedAt,
      turnCount: count(turns.id),
    })
    .from(sessions)
    .leftJoin(turns, eq(turns.sessionId, sessions.id))
    .where(and(eq(sessions.studentId, studentId), isNull(sessions.endedAt)))
    .groupBy(sessions.id)
    .orderBy(desc(sessions.startedAt))
    .limit(limit * 4);

  return rows
    .filter((r): r is typeof r & { skillId: string } => r.skillId !== null && r.turnCount > 0)
    .slice(0, limit);
}

/** The most recent resumable session per skill, for the dashboard's Continue buttons. */
export async function openSessionsBySkill(studentId = SOLO_STUDENT_ID): Promise<Map<string, RecentSession>> {
  const recent = await recentSessions(50, studentId);
  const bySkill = new Map<string, RecentSession>();
  for (const session of recent) {
    if (!bySkill.has(session.skillId)) bySkill.set(session.skillId, session);
  }
  return bySkill;
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
