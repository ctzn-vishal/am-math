import { notFound } from 'next/navigation';
import {
  getProblemProgress,
  getSessionContext,
  getTranscript,
  resolveLesson,
} from '@/lib/session/service';
import { openingMessage } from '@/lib/tutor/prompt';
import { workedExampleForSkill } from '@/lib/content';
import { visualSpecSchema, type VisualSpec } from '@/lib/visual/spec';
import { Lesson, type Message } from '@/components/Lesson';
import type { Answer } from '@/lib/content/schema';

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

  const example = workedExampleForSkill(skill.id);
  let problemBoundary = -1;
  for (let index = transcript.length - 1; index >= 0; index -= 1) {
    if (transcript[index]?.role === 'system' && transcript[index]?.text === `problem:${problem?.id}`) {
      problemBoundary = index;
      break;
    }
  }
  const activeTranscript = transcript.slice(problemBoundary + 1);

  // System turns of the form `check:<status>:<problemId>` are verdicts recorded by the
  // marking tool. They are attached to the tutor reply that follows, which is the message
  // that reacts to the verdict, so the transcript reads the way it did live.
  const messages: Message[] = [];
  let pendingVerdict: 'correct' | 'incorrect' | null = null;

  for (const turn of activeTranscript) {
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
      skillGoal={skill.summary}
      reference={{ ...skill.cpa, formulas: skill.formulas }}
      unitTitle={unitTitle}
      initialStage={context.stage}
      initialMessages={messages}
      initialHintsUsed={context.hintsUsed}
      hintCount={problem?.hints.length ?? 0}
      progress={progress}
      startInLesson={transcript.length === 0}
      {...(example
        ? {
            lessonExample: {
              statement: example.statement,
              solution: example.solution,
              visual: workedExampleVisual(skill.id, example.figure),
            },
          }
        : {})}
      {...(problem
        ? {
            problemStatement: problem.statement,
            problemId: problem.id,
            answerShape: answerShape(problem.answer),
          }
        : {})}
    />
  );
}

function workedExampleVisual(skillId: string, authored?: VisualSpec): VisualSpec | undefined {
  if (authored) return authored;

  if (skillId === 'exponents.index-laws-positive') {
    return {
      kind: 'bar_model',
      title: 'Two factors, then three more',
      caption:
        'The two groups join into one row of five equal factors. The base stays 3; only the factor count changes.',
      rows: [
        {
          id: 'factors',
          label: '3² × 3³',
          segments: [
            { id: 'a1', label: '×3', units: 1, value: 3, role: 'known' },
            { id: 'a2', label: '×3', units: 1, value: 3, role: 'known' },
            { id: 'b1', label: '×3', units: 1, value: 3, role: 'difference' },
            { id: 'b2', label: '×3', units: 1, value: 3, role: 'difference' },
            { id: 'b3', label: '×3', units: 1, value: 3, role: 'difference' },
          ],
          total: { label: '3⁵', value: 243 },
        },
      ],
    };
  }

  return undefined;
}

function answerShape(answer: Answer): string {
  switch (answer.type) {
    case 'number':
      return answer.unit ? `A number in ${answer.unit}` : 'A number';
    case 'coordinates':
      return 'A coordinate pair, such as (2, 5)';
    case 'set':
      return 'Values separated by commas';
    case 'expression':
      return 'An algebraic expression';
    case 'equation':
      return 'An equation';
    case 'choice':
      return 'Your own answer first';
    case 'exact':
      return 'A short exact answer';
  }
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
