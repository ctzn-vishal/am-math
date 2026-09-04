import { sql } from 'drizzle-orm';
import { index, integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * SQLite via libsql. A single student needs a file, not a cluster — and Drizzle keeps the
 * move to Postgres mechanical if this ever grows past that.
 *
 * The shape here is deliberately Postgres-compatible: no SQLite-only types, timestamps
 * stored as epoch milliseconds, JSON as text.
 */

const now = sql`(unixepoch() * 1000)`;

/**
 * One learner. Present even though the app currently serves one, because every table
 * below would otherwise need a migration the day a second student appears.
 */
export const students = sqliteTable('students', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  packId: text('pack_id').notNull(),
  createdAt: integer('created_at').notNull().default(now),
});

/** A continuous stretch of tutoring, usually one sitting on one skill. */
export const sessions = sqliteTable(
  'sessions',
  {
    id: text('id').primaryKey(),
    studentId: text('student_id')
      .notNull()
      .references(() => students.id, { onDelete: 'cascade' }),
    skillId: text('skill_id'),
    problemId: text('problem_id'),
    /**
     * Gemini's own interaction id for the last turn. Passing it as
     * `previous_interaction_id` lets the model keep its context server-side, so we send one
     * turn rather than replaying the transcript on every request.
     */
    lastInteractionId: text('last_interaction_id'),
    cpaStage: text('cpa_stage', { enum: ['concrete', 'pictorial', 'abstract'] })
      .notNull()
      .default('concrete'),
    startedAt: integer('started_at').notNull().default(now),
    endedAt: integer('ended_at'),
  },
  (t) => [index('sessions_student_idx').on(t.studentId, t.startedAt)],
);

/**
 * Every message, in order. Stored in full even though Gemini also retains the interaction,
 * because the transcript is ours: it survives the model's 55-day retention, and it is what
 * we replay when reconstructing a lesson or debugging a bad exchange.
 */
export const turns = sqliteTable(
  'turns',
  {
    id: text('id').primaryKey(),
    sessionId: text('session_id')
      .notNull()
      .references(() => sessions.id, { onDelete: 'cascade' }),
    role: text('role', { enum: ['student', 'tutor', 'system'] }).notNull(),
    text: text('text').notNull().default(''),
    /** A rendered VisualSpec, as JSON. Null for a plain text turn. */
    visualSpec: text('visual_spec'),
    /** Data URL of a photo the student attached, e.g. their handwritten working. */
    imageData: text('image_data'),
    createdAt: integer('created_at').notNull().default(now),
  },
  (t) => [index('turns_session_idx').on(t.sessionId, t.createdAt)],
);

/**
 * The evidence stream the mastery model reads. One row per answered attempt.
 *
 * `hintsUsed` matters as much as `correct`: a right answer after three hints is weaker
 * evidence than a right answer after none, and treating them the same is how self-graded
 * trackers end up flattering the student.
 */
export const attempts = sqliteTable(
  'attempts',
  {
    id: text('id').primaryKey(),
    studentId: text('student_id')
      .notNull()
      .references(() => students.id, { onDelete: 'cascade' }),
    sessionId: text('session_id').references(() => sessions.id, { onDelete: 'set null' }),
    skillId: text('skill_id').notNull(),
    problemId: text('problem_id'),
    correct: integer('correct', { mode: 'boolean' }).notNull(),
    hintsUsed: integer('hints_used').notNull().default(0),
    /** The stage the student was working at when they succeeded or failed. */
    cpaStage: text('cpa_stage', { enum: ['concrete', 'pictorial', 'abstract'] }).notNull(),
    /** Set when a specific misconception was identified, not merely a wrong answer. */
    misconceptionCode: text('misconception_code'),
    /** Milliseconds from problem shown to answer submitted. */
    elapsedMs: integer('elapsed_ms'),
    createdAt: integer('created_at').notNull().default(now),
  },
  (t) => [
    index('attempts_skill_idx').on(t.studentId, t.skillId, t.createdAt),
    index('attempts_misconception_idx').on(t.studentId, t.misconceptionCode),
  ],
);

/**
 * Current mastery estimate per skill: a Beta posterior, updated on each attempt.
 *
 * Derived state — `attempts` is the source of truth and this can always be rebuilt from
 * it. Materialised because "what should I work on next" is asked on every page load.
 */
export const skillState = sqliteTable(
  'skill_state',
  {
    studentId: text('student_id')
      .notNull()
      .references(() => students.id, { onDelete: 'cascade' }),
    skillId: text('skill_id').notNull(),
    /** Beta(alpha, beta). Priors are set by the mastery model, not here. */
    alpha: real('alpha').notNull(),
    beta: real('beta').notNull(),
    attemptCount: integer('attempt_count').notNull().default(0),
    lastSeenAt: integer('last_seen_at').notNull().default(now),
  },
  (t) => [index('skill_state_pk').on(t.studentId, t.skillId)],
);

export type Student = typeof students.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Turn = typeof turns.$inferSelect;
export type Attempt = typeof attempts.$inferSelect;
export type SkillState = typeof skillState.$inferSelect;

export type NewAttempt = typeof attempts.$inferInsert;
export type NewTurn = typeof turns.$inferInsert;
export type CpaStage = 'concrete' | 'pictorial' | 'abstract';
