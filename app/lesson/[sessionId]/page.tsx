import { notFound } from 'next/navigation';
import { getSessionContext, getTranscript, resolveLesson } from '@/lib/session/service';
import { visualSpecSchema, type VisualSpec } from '@/lib/visual/spec';
import { Lesson, type Message } from '@/components/Lesson';

export const dynamic = 'force-dynamic';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  const context = await getSessionContext(sessionId);
  if (!context) notFound();

  const { skill, unitTitle, problem } = await resolveLesson(context);
  const transcript = await getTranscript(sessionId);

  const messages: Message[] = transcript
    .filter((turn) => turn.role !== 'system')
    .map((turn) => ({
      id: turn.id,
      role: turn.role === 'student' ? 'student' : 'tutor',
      text: turn.text,
      ...(turn.imageData ? { imageData: turn.imageData } : {}),
      ...(parseStoredSpec(turn.visualSpec) ? { spec: parseStoredSpec(turn.visualSpec)! } : {}),
    }));

  // An empty transcript needs an opening. Written here rather than spent as a model turn:
  // the first thing on screen should be instant, and it is the same every time.
  if (messages.length === 0) {
    messages.push({
      id: 'opening',
      role: 'tutor',
      text:
        `We're looking at **${skill.title.toLowerCase()}**.\n\n` +
        (problem
          ? `Have a read of the problem on the left. Before working anything out — what is ` +
            `actually going on in it? Describe it to me in your own words.`
          : `Where would you like to start? Tell me what you already know about this, ` +
            `even if it is not much.`),
    });
  }

  return (
    <Lesson
      sessionId={sessionId}
      skillTitle={skill.title}
      unitTitle={unitTitle}
      initialStage={context.stage}
      initialMessages={messages}
      {...(problem ? { problemStatement: problem.statement } : {})}
    />
  );
}

function parseStoredSpec(raw: string | null): VisualSpec | null {
  if (!raw) return null;
  try {
    const result = visualSpecSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
