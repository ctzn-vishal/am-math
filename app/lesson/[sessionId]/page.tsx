import { notFound } from 'next/navigation';
import {
  getProblemProgress,
  getSessionContext,
  getTranscript,
  resolveLesson,
} from '@/lib/session/service';
import { openingMessage } from '@/lib/tutor/prompt';
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
  const [transcript, progress] = await Promise.all([
    getTranscript(sessionId),
    getProblemProgress(context),
  ]);

  // System turns of the form `check:<status>:<problemId>` are verdicts recorded by the
  // marking tool. They are attached to the tutor reply that follows, which is the message
  // that reacts to the verdict, so the transcript reads the way it did live.
  const messages: Message[] = [];
  let pendingVerdict: 'correct' | 'incorrect' | null = null;

  for (const turn of transcript) {
    if (turn.role === 'system') {
      const match = /^check:(correct|incorrect):/.exec(turn.text);
      if (match) pendingVerdict = match[1] as 'correct' | 'incorrect';
      continue;
    }

    const spec = parseStoredSpec(turn.visualSpec);
    const message: Message = {
      id: turn.id,
      role: turn.role === 'student' ? 'student' : 'tutor',
      text: turn.text,
      ...(turn.imageData ? { imageData: turn.imageData } : {}),
      ...(spec ? { spec } : {}),
    };

    if (turn.role === 'tutor' && pendingVerdict) {
      message.verdict = pendingVerdict;
      pendingVerdict = null;
    }

    messages.push(message);
  }

  // An empty transcript needs an opening. Written here rather than spent as a model turn:
  // the first thing on screen should be instant, and it is the same every time.
  if (messages.length === 0) {
    messages.push({ id: 'opening', role: 'tutor', text: openingMessage(skill, problem) });
  }

  // Keyed on the problem so a switch remounts the client component. Its transcript and
  // solved flag live in state seeded from props, and a soft navigation to the same URL
  // would otherwise keep the old state and show the previous problem's verdict.
  return (
    <Lesson
      key={`${sessionId}:${problem?.id ?? 'none'}`}
      sessionId={sessionId}
      skillTitle={skill.title}
      unitTitle={unitTitle}
      initialStage={context.stage}
      initialMessages={messages}
      initialHintsUsed={context.hintsUsed}
      hintCount={problem?.hints.length ?? 0}
      progress={progress}
      {...(problem ? { problemStatement: problem.statement, problemId: problem.id } : {})}
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
