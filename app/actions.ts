'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getProblem } from '@/lib/content';
import {
  endSession,
  getProblemProgress,
  getSessionContext,
  recordTurn,
  startSession,
  switchProblem,
} from '@/lib/session/service';

/**
 * Begin a lesson on a skill and go to it. A server action rather than an API route because
 * the only caller is a form on the dashboard, and this keeps the session id off the wire.
 *
 * When the form names an existing session, resume it instead of opening a fresh one —
 * a student who closed the tab mid-problem should land back where they were.
 */
export async function beginLesson(formData: FormData): Promise<void> {
  const resume = formData.get('sessionId');
  if (typeof resume === 'string' && resume.length > 0) {
    redirect(`/lesson/${resume}`);
  }

  const skillId = String(formData.get('skillId') ?? '');
  if (!skillId) return;

  const problemId = formData.get('problemId');
  const sessionId = await startSession(
    skillId,
    typeof problemId === 'string' && problemId.length > 0 ? problemId : undefined,
  );

  redirect(`/lesson/${sessionId}`);
}

/**
 * Move the current session on to the next unsolved problem on the same skill.
 *
 * The transition is written into the transcript as a tutor line so the conversation reads
 * continuously, and the model is re-briefed on the next turn because the session's
 * `briefedProblemId` no longer matches.
 */
export async function nextProblem(formData: FormData): Promise<void> {
  const sessionId = String(formData.get('sessionId') ?? '');
  if (!sessionId) return;

  const context = await getSessionContext(sessionId);
  if (!context) return;

  const progress = await getProblemProgress(context);
  if (!progress.nextProblemId) return;

  const problem = getProblem(progress.nextProblemId);
  if (!problem) return;

  await switchProblem(sessionId, problem.id);
  await recordTurn(
    sessionId,
    'tutor',
    `On to the next one — it is on the left now. Same as before: read it, and tell me what is ` +
      `going on in it before you work anything out.`,
  );

  revalidatePath(`/lesson/${sessionId}`);
  redirect(`/lesson/${sessionId}`);
}

/** Close the session so the dashboard stops offering to resume it. */
export async function finishLesson(formData: FormData): Promise<void> {
  const sessionId = String(formData.get('sessionId') ?? '');
  if (sessionId) await endSession(sessionId);
  revalidatePath('/');
  redirect('/');
}
