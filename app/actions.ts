'use server';

import { redirect } from 'next/navigation';
import { startSession } from '@/lib/session/service';

/**
 * Begin a lesson on a skill and go to it. A server action rather than an API route because
 * the only caller is a form on the dashboard, and this keeps the session id off the wire.
 */
export async function beginLesson(formData: FormData): Promise<void> {
  const skillId = String(formData.get('skillId') ?? '');
  if (!skillId) return;

  const problemId = formData.get('problemId');
  const sessionId = await startSession(
    skillId,
    typeof problemId === 'string' && problemId.length > 0 ? problemId : undefined,
  );

  redirect(`/lesson/${sessionId}`);
}
