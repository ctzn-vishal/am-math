'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  CircleHelp,
  ClipboardCheck,
  Eye,
  ImagePlus,
  Lightbulb,
  Loader2,
  MessageCircle,
  X,
} from 'lucide-react';
import type { VisualSpec } from '@/lib/visual/spec';
import type { TutorEvent } from '@/lib/tutor/engine';
import type { CpaStage } from '@/lib/db/schema';
import type { ProblemProgress } from '@/lib/session/service';
import type { TurnIntent } from '@/lib/tutor/prompt';
import { validateSpec } from '@/lib/visual/validate';
import { finishLesson, nextProblem } from '@/app/actions';
import { VisualCanvas } from './visual/VisualCanvas';
import { MathText } from './MathText';
import { StageRail } from './StageRail';

/**
 * The lesson: a shared canvas and a conversation about it.
 *
 * The canvas is not decoration next to the chat — it is the thing being discussed. The
 * tutor puts figures there, the student rearranges them, and the rearrangement goes back as
 * the next message. That round trip is the whole point of the rebuild.
 */

export interface Message {
  id: string;
  role: 'student' | 'tutor';
  text: string;
  spec?: VisualSpec;
  imageData?: string;
  /** Set while a tutor message is still streaming in. */
  pending?: boolean;
  /** The marking tool's verdict on the answer this reply responds to. */
  verdict?: 'correct' | 'incorrect';
  /** Why this student message was sent; shown when it prevents ambiguity. */
  intent?: TurnIntent;
}

export interface LessonProps {
  sessionId: string;
  skillTitle: string;
  skillGoal: string;
  unitTitle: string;
  initialStage: CpaStage;
  initialMessages: Message[];
  initialHintsUsed: number;
  hintCount: number;
  progress: ProblemProgress;
  problemStatement?: string;
  problemId?: string;
  answerShape?: string;
  startInLesson: boolean;
  lessonExample?: {
    statement: string;
    solution: string;
    visual?: VisualSpec;
  };
  reference: {
    concrete: string;
    pictorial: string;
    abstract: string;
    formulas: string[];
  };
}

type LessonView = 'learn' | 'practice';

interface SendOptions {
  imageDataUrl?: string;
  studentSpec?: VisualSpec;
  intent?: TurnIntent;
}

export function Lesson({
  sessionId,
  skillTitle,
  skillGoal,
  unitTitle,
  initialStage,
  initialMessages,
  initialHintsUsed,
  hintCount,
  progress,
  problemStatement,
  problemId,
  answerShape,
  startInLesson,
  lessonExample,
  reference,
}: LessonProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [stage, setStage] = useState<CpaStage>(initialStage);
  const [hintsUsed, setHintsUsed] = useState(initialHintsUsed);
  const [solved, setSolved] = useState(progress.currentSolved);
  const [spec, setSpec] = useState<VisualSpec | null>(
    [...initialMessages].reverse().find((m) => m.spec)?.spec ?? null,
  );
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<LessonView>(startInLesson ? 'learn' : 'practice');

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const draftKey = `math-sage:draft:${sessionId}:${problemId ?? 'open'}`;

  useEffect(() => {
    const saved = window.localStorage.getItem(draftKey);
    if (saved) setInput(saved);
  }, [draftKey]);

  useEffect(() => {
    if (input) window.localStorage.setItem(draftKey, input);
    else window.localStorage.removeItem(draftKey);
  }, [draftKey, input]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, solved]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    scrollRef.current?.scrollTo({ top: 0 });
  }, [problemId]);

  // Hand focus back to the box once a reply has landed, so the next thought can be typed
  // without reaching for the mouse.
  useEffect(() => {
    if (!busy) textRef.current?.focus();
  }, [busy]);

  const send = useCallback(
    async (text: string, options: SendOptions = {}) => {
      const { imageDataUrl, studentSpec, intent = 'ask' } = options;
      if (busy) return;
      if (text.trim().length === 0 && !imageDataUrl && !studentSpec) return;

      setBusy(true);
      setError(null);
      setView('practice');

      const studentId = crypto.randomUUID();
      const tutorId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        {
          id: studentId,
          role: 'student',
          text,
          intent,
          ...(imageDataUrl ? { imageData: imageDataUrl } : {}),
          ...(studentSpec ? { spec: studentSpec } : {}),
        },
        { id: tutorId, role: 'tutor', text: '', pending: true },
      ]);

      try {
        const response = await fetch('/api/tutor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, text, imageDataUrl, studentSpec, intent }),
        });

        if (!response.ok || !response.body) {
          const detail = await response.json().catch(() => ({ error: response.statusText }));
          throw new Error(String(detail.error ?? 'The tutor could not be reached.'));
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        // NDJSON: one event per line, with the tail held back until its newline arrives.
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (line.trim().length === 0) continue;

            let event: TutorEvent;
            try {
              event = JSON.parse(line) as TutorEvent;
            } catch {
              continue;
            }

            switch (event.type) {
              case 'text':
                setMessages((prev) =>
                  prev.map((m) => (m.id === tutorId ? { ...m, text: m.text + event.delta } : m)),
                );
                break;

              case 'visual':
                setSpec(event.spec);
                setMessages((prev) =>
                  prev.map((m) => (m.id === tutorId ? { ...m, spec: event.spec } : m)),
                );
                break;

              case 'stage_changed':
                setStage(event.stage);
                break;

              case 'hint_given':
                setHintsUsed(event.hintsUsed);
                break;

              case 'answer_checked':
                if (event.result.status === 'correct' || event.result.status === 'incorrect') {
                  const verdict = event.result.status;
                  setMessages((prev) =>
                    prev.map((m) => (m.id === tutorId ? { ...m, verdict } : m)),
                  );
                  if (verdict === 'correct' && event.problemId === problemId) setSolved(true);
                }
                break;

              case 'error':
                setError(event.message);
                break;
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      } finally {
        setMessages((prev) =>
          prev
            .map((m) => (m.id === tutorId ? { ...m, pending: false } : m))
            // Drop the placeholder entirely if nothing ever arrived, so a failed turn does
            // not leave an empty bubble sitting in the transcript.
            .filter((m) => !(m.id === tutorId && m.text.trim().length === 0 && !m.spec)),
        );
        setBusy(false);
      }
    },
    [busy, sessionId, problemId],
  );

  const handleSubmit = (intent: Extract<TurnIntent, 'ask' | 'check'> = 'ask') => {
    const text = input.trim();
    if (text.length === 0 && !image) return;
    void send(text, { ...(image ? { imageDataUrl: image } : {}), intent });
    setInput('');
    setImage(null);
    if (textRef.current) textRef.current.style.height = 'auto';
  };

  /** Hand the tutor the figure itself, not a description of it. */
  const shareCanvas = () => {
    if (!spec) return;
    void send('Here is my version of the diagram.', { studentSpec: spec, intent: 'canvas' });
  };

  const requestHint = () => {
    if (busy || hintsUsed >= hintCount) return;
    void send('I would like the next hint.', { intent: 'hint' });
  };

  const requestSupport = (kind: 'smaller' | 'visual') => {
    const text =
      kind === 'smaller'
        ? 'Please make the current step smaller.'
        : 'Please show this relationship visually.';
    void send(text, { intent: 'support' });
  };

  /**
   * Whether the student's current arrangement still holds together. Shown, never enforced —
   * a bar model that has stopped agreeing with itself is worth noticing, and noticing it is
   * the lesson. Blocking the drag would remove the only way to find that out.
   */
  const inconsistency = useMemo(() => {
    if (!spec) return null;
    const errors = validateSpec(spec).issues.filter((i) => i.severity === 'error');
    return errors[0]?.message ?? null;
  }, [spec]);

  const pickImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const hasNext = solved && progress.nextProblemId !== null;
  const allDone = solved && progress.nextProblemId === null;
  const hasAttempted = messages.some(
    (message) => message.role === 'student' && message.intent === 'check',
  );

  return (
    <div className="min-h-dvh bg-paper xl:flex xl:h-dvh xl:overflow-hidden">
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur xl:hidden">
        <div className="flex items-center gap-2 px-3 py-2.5 sm:px-5">
          <Link
            href="/"
            aria-label="Back to all skills"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink-faint hover:bg-surface-sunk hover:text-ink"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
              {unitTitle}
            </p>
            <p className="truncate font-serif text-[15px] text-ink">{skillTitle}</p>
          </div>
          <form action={finishLesson}>
            <input type="hidden" name="sessionId" value={sessionId} />
            <button
              type="submit"
              className="min-h-11 rounded-lg px-2 text-[12px] font-medium text-ink-faint hover:bg-surface-sunk hover:text-ink"
            >
              Finish
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-1 px-3 pb-2 sm:px-5" role="tablist" aria-label="Lesson steps">
          {([
            ['learn', '1. Learn'],
            ['practice', '2. Practice'],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={view === id}
              onClick={() => setView(id)}
              className={`min-h-11 rounded-lg px-3 text-[13px] font-medium transition-colors ${
                view === id
                  ? 'bg-sage-100 text-sage-700'
                  : 'text-ink-faint hover:bg-surface-sunk hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <section
        className={`${view === 'learn' || view === 'practice' ? 'block' : 'hidden'} border-line bg-surface xl:h-full xl:w-[57%] xl:border-r`}
      >
        <header className="hidden h-[84px] items-start gap-3 border-b border-line px-5 py-4 xl:flex">
          <Link
            href="/"
            aria-label="Back to all skills"
            className="mt-0.5 shrink-0 rounded-lg p-1.5 text-ink-faint transition-colors hover:bg-surface-sunk hover:text-ink"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
              {unitTitle}
            </p>
            <h1 className="mt-0.5 line-clamp-2 font-serif text-[18px] leading-snug text-ink">
              {skillTitle}
            </h1>
          </div>
          <div className="mt-0.5 flex shrink-0 flex-col items-end gap-1.5">
            <StageRail stage={stage} />
            <form action={finishLesson}>
              <input type="hidden" name="sessionId" value={sessionId} />
              <button type="submit" className="text-[11px] font-medium text-ink-faint hover:text-ink">
                Finish lesson
              </button>
            </form>
          </div>
        </header>

        <div className="hidden border-b border-line px-5 py-2 xl:flex" role="tablist" aria-label="Lesson steps">
          {([
            ['learn', BookOpen, 'Learn the idea'],
            ['practice', ClipboardCheck, `Practice ${progress.index} of ${progress.total}`],
          ] as const).map(([id, Icon, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={view === id}
              onClick={() => setView(id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-[13px] font-medium ${
                view === id ? 'bg-sage-100 text-sage-700' : 'text-ink-faint hover:bg-surface-sunk hover:text-ink'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="px-4 py-5 sm:px-6 sm:py-7 xl:h-[calc(100%-141px)] xl:overflow-y-auto xl:px-8">
          {view === 'learn' ? (
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                <span className="rounded-full bg-sage-500 px-2.5 py-1 text-paper">1 Learn</span>
                <ArrowRight className="h-3.5 w-3.5" />
                <span>2 Practise</span>
                <ArrowRight className="h-3.5 w-3.5" />
                <span>3 Get coaching</span>
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sage-600">Big idea</p>
              <h2 className="mt-2 font-serif text-2xl leading-tight text-ink sm:text-3xl">See why the rule works.</h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink-soft">{skillGoal}</p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-sage-600">
                    <Eye className="h-4 w-4" /> Picture it
                  </p>
                  <MathText className="tutor-prose mt-3 text-[14px] leading-6 text-ink-soft">
                    {reference.pictorial}
                  </MathText>
                </div>
                <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-sage-600">Connect the symbols</p>
                  <MathText className="tutor-prose mt-3 text-[14px] leading-6 text-ink-soft">
                    {reference.abstract}
                  </MathText>
                </div>
              </div>

              {lessonExample && (
                <article className="mt-5 overflow-hidden rounded-2xl border border-sage-300 bg-paper">
                  <div className="border-b border-sage-200 bg-sage-50 px-4 py-3 sm:px-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-sage-700">Worked example</p>
                    <p className="mt-1 text-[12px] text-ink-faint">Study this example; your question uses different values.</p>
                  </div>
                  <div className="space-y-5 p-4 sm:p-5">
                    <MathText className="tutor-prose text-[15px] leading-7 text-ink">
                      {lessonExample.statement}
                    </MathText>
                    {lessonExample.visual && (
                      <div className="rounded-xl border border-line bg-surface-sunk p-3 sm:p-4">
                        <VisualCanvas spec={lessonExample.visual} />
                      </div>
                    )}
                    <div className="border-l-2 border-sage-400 pl-4">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">Reason it through</p>
                      <MathText className="tutor-prose text-[14px] leading-7 text-ink-soft">
                        {lessonExample.solution}
                      </MathText>
                    </div>
                  </div>
                </article>
              )}

              {reference.formulas.length > 0 && (
                <details className="mt-5 rounded-xl border border-line bg-paper">
                  <summary className="min-h-11 cursor-pointer px-4 py-3 text-[12px] font-semibold text-sage-700">
                    Key results to keep nearby
                  </summary>
                  <MathText className="tutor-prose border-t border-line px-4 py-4 text-[13px] leading-7 text-ink-soft">
                    {reference.formulas.map((formula) => `$${formula}$`).join(' · ')}
                  </MathText>
                </details>
              )}

              <button
                type="button"
                onClick={() => setView('practice')}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sage-500 px-5 text-[14px] font-semibold text-paper hover:opacity-90 sm:w-auto"
              >
                Try practice question {progress.index}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              {problemStatement && (
                <article className={`rounded-2xl border p-4 sm:p-6 ${solved ? 'border-affirm/30 bg-affirm-soft' : 'border-line bg-paper'}`}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-sage-600">
                      Question {progress.index} of {progress.total}
                    </p>
                    <p className="flex items-center gap-3 text-[11px] text-ink-faint">
                      {hintCount > 0 && <span><Lightbulb className="mr-1 inline h-3 w-3" />{hintsUsed}/{hintCount}</span>}
                      {solved && <span className="font-medium text-affirm"><Check className="mr-1 inline h-3 w-3" />Correct</span>}
                    </p>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-sunk" aria-hidden="true">
                    <div className="h-full rounded-full bg-sage-500" style={{ width: `${Math.max(8, (progress.index / progress.total) * 100)}%` }} />
                  </div>
                  <MathText className="tutor-prose mt-5 font-serif text-[18px] leading-8 text-ink sm:text-[21px]">
                    {problemStatement}
                  </MathText>
                </article>
              )}

              {spec && (
                <div className="mt-5 rounded-2xl border border-line bg-paper p-4 sm:p-5">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-sage-600">Visual coaching</p>
                  <VisualCanvas spec={spec} onChange={setSpec} />
                  {inconsistency && (
                    <p className="mt-4 rounded-lg border border-query/30 bg-query-soft px-3.5 py-2.5 text-[13px] leading-relaxed text-query">{inconsistency}</p>
                  )}
                  <button
                    onClick={shareCanvas}
                    disabled={busy}
                    className="mt-4 min-h-11 rounded-lg border border-line px-3.5 text-[13px] font-medium text-ink-soft hover:border-sage-400 hover:bg-sage-50 disabled:opacity-40"
                  >
                    Show the tutor my version
                  </button>
                </div>
              )}

              {hasNext && (
                <form action={nextProblem} className="mt-5">
                  <input type="hidden" name="sessionId" value={sessionId} />
                  <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sage-500 px-5 text-[14px] font-semibold text-paper hover:opacity-90 sm:w-auto">
                    Next question
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              {allDone && (
                <form action={finishLesson} className="mt-5">
                  <input type="hidden" name="sessionId" value={sessionId} />
                  <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sage-500 px-5 text-[14px] font-semibold text-paper hover:opacity-90 sm:w-auto">
                    Finish this lesson
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      <section className={`${view === 'practice' ? 'flex' : 'hidden'} min-h-[520px] flex-col bg-paper xl:flex xl:h-full xl:min-h-0 xl:w-[43%]`}>
        <div className="hidden h-[84px] shrink-0 border-b border-line px-6 py-4 xl:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sage-600">Your tutor</p>
          <p className="mt-1 text-[13px] text-ink-faint">Try first. Coaching adapts to the step you take.</p>
        </div>

        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-busy={busy}
          className="min-h-[280px] flex-1 px-4 py-6 sm:px-6 xl:min-h-0 xl:overflow-y-auto"
        >
          <div className="mx-auto max-w-xl space-y-6">
            <div className="xl:hidden">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sage-600">Your tutor</p>
              <p className="mt-1 text-[13px] text-ink-faint">Try the question, then get help on your exact step.</p>
            </div>

            {messages.map((message) => <MessageBubble key={message.id} message={message} />)}

            {error && (
              <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-fault/30 bg-fault-soft px-4 py-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-fault" />
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-fault">The tutor could not reply</p>
                  <p className="mt-0.5 break-words text-[13px] leading-relaxed text-ink-soft">{error}</p>
                </div>
              </div>
            )}

            {hasNext && !busy && (
              <form action={nextProblem} className="flex justify-center pt-2 xl:hidden">
                <input type="hidden" name="sessionId" value={sessionId} />
                <button type="submit" className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-sage-400 bg-sage-50 px-4 text-[13px] font-medium text-sage-700 hover:bg-sage-100">
                  Next question
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 shrink-0 border-t border-line bg-surface/95 px-4 py-4 backdrop-blur sm:px-6 xl:static">
          <div className="mx-auto max-w-xl">
            {!solved && hasAttempted && (
              <div className="mb-3 flex flex-wrap gap-2" aria-label="Learning support">
                <button type="button" onClick={() => requestSupport('smaller')} disabled={busy} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 text-[12px] font-medium text-ink-soft hover:border-sage-400 hover:bg-sage-50 disabled:opacity-40">
                  <CircleHelp className="h-3.5 w-3.5" /> Break it down
                </button>
                <button type="button" onClick={() => requestSupport('visual')} disabled={busy} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 text-[12px] font-medium text-ink-soft hover:border-sage-400 hover:bg-sage-50 disabled:opacity-40">
                  <Eye className="h-3.5 w-3.5" /> Visual hint
                </button>
                {hintCount > 0 && (
                  <button type="button" onClick={requestHint} disabled={busy || hintsUsed >= hintCount} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-query/30 bg-query-soft px-3 text-[12px] font-medium text-query hover:border-query disabled:opacity-40">
                    <Lightbulb className="h-3.5 w-3.5" />
                    {hintsUsed >= hintCount ? 'All hints used' : `Hint ${hintsUsed + 1} of ${hintCount}`}
                  </button>
                )}
              </div>
            )}

            {!solved && !hasAttempted && (
              <p className="mb-3 text-[12px] text-ink-faint">Give it one try. Hints and visual coaching appear after your first attempt.</p>
            )}

            {allDone && !busy && (
              <div className="mb-4 rounded-2xl border border-affirm/30 bg-affirm-soft p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-affirm">Lesson complete</p>
                <h2 className="mt-1 font-serif text-[18px] text-ink">You reached today&apos;s goal.</h2>
                <form action={finishLesson} className="mt-3">
                  <input type="hidden" name="sessionId" value={sessionId} />
                  <button type="submit" className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-sage-500 px-4 text-[13px] font-medium text-paper hover:opacity-90">
                    See what to learn next <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            )}

            {image && (
              <div className="mb-3 flex items-center gap-3 rounded-lg border border-line bg-surface-sunk p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Attached working" className="h-14 w-14 rounded object-cover" />
                <span className="flex-1 text-[13px] text-ink-soft">Photo attached</span>
                <button onClick={() => setImage(null)} className="rounded p-1 text-ink-faint hover:bg-surface hover:text-ink" aria-label="Remove photo">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="flex items-end gap-2 rounded-2xl border border-line bg-paper px-3 py-2 focus-within:border-sage-400">
              <button onClick={() => fileRef.current?.click()} className="mb-1 rounded-lg p-1.5 text-ink-faint hover:bg-surface-sunk hover:text-ink" aria-label="Attach a photo of your working" type="button">
                <ImagePlus className="h-[18px] w-[18px]" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={pickImage} className="hidden" />
              <textarea
                ref={textRef}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  event.target.style.height = 'auto';
                  event.target.style.height = `${Math.min(event.target.scrollHeight, 160)}px`;
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmit('check');
                  }
                }}
                rows={1}
                placeholder={solved ? 'Ask about why the solution works…' : 'Type the answer you want checked…'}
                aria-label="Your answer or question"
                className="max-h-40 flex-1 resize-none bg-transparent py-1.5 text-[15px] leading-relaxed text-ink outline-none placeholder:text-ink-faint"
              />
            </div>

            <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] leading-relaxed text-ink-faint">{answerShape ?? 'Write a concise final answer'} · Enter submits</p>
              <div className="grid grid-cols-2 gap-2 sm:flex">
                <button onClick={() => handleSubmit('ask')} disabled={busy || (input.trim().length === 0 && !image)} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-line px-3 text-[12px] font-medium text-ink-soft hover:border-sage-400 hover:bg-sage-50 disabled:opacity-35" type="button">
                  <MessageCircle className="h-3.5 w-3.5" /> Ask a question
                </button>
                <button onClick={() => handleSubmit('check')} disabled={busy || solved || input.trim().length === 0} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-sage-500 px-4 text-[12px] font-semibold text-paper hover:opacity-90 disabled:opacity-35" type="button">
                  {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                  Submit answer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  if (message.role === 'student') {
    return (
      <div className="animate-rise flex justify-end">
        <div className="max-w-[85%]">
          {message.intent === 'check' && (
            <p className="mb-1 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-sage-600">
              Answer submitted for checking
            </p>
          )}
          <div className="rounded-2xl rounded-br-md bg-sage-100 px-4 py-2.5">
          {message.imageData && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={message.imageData}
              alt="Your working"
              className="mb-2 max-h-56 rounded-lg object-contain"
            />
          )}
          {message.text && (
            <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink">
              {message.text}
            </p>
          )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-rise">
      {message.verdict && (
        <p
          className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
            message.verdict === 'correct'
              ? 'bg-affirm-soft text-affirm'
              : 'bg-query-soft text-query'
          }`}
        >
          {message.verdict === 'correct' ? (
            <>
              <Check className="h-3 w-3" /> Marked correct
            </>
          ) : (
            <>
              <X className="h-3 w-3" /> Not yet
            </>
          )}
        </p>
      )}

      {message.pending && message.text.length === 0 ? (
        <div className="flex items-center gap-1.5 py-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-sage-400"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>
      ) : (
        <MathText className="tutor-prose font-serif text-[16px] leading-[1.65] text-ink">
          {message.text}
        </MathText>
      )}

      {message.spec && (
        <p className="mt-2 text-[12px] italic text-ink-faint">Added visual coaching beside the question.</p>
      )}
    </div>
  );
}
