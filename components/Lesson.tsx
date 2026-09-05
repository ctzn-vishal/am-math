'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronLeft,
  ImagePlus,
  Lightbulb,
  Loader2,
  X,
} from 'lucide-react';
import type { VisualSpec } from '@/lib/visual/spec';
import type { TutorEvent } from '@/lib/tutor/engine';
import type { CpaStage } from '@/lib/db/schema';
import type { ProblemProgress } from '@/lib/session/service';
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
}

export interface LessonProps {
  sessionId: string;
  skillTitle: string;
  unitTitle: string;
  initialStage: CpaStage;
  initialMessages: Message[];
  initialHintsUsed: number;
  hintCount: number;
  progress: ProblemProgress;
  problemStatement?: string;
  problemId?: string;
}

export function Lesson({
  sessionId,
  skillTitle,
  unitTitle,
  initialStage,
  initialMessages,
  initialHintsUsed,
  hintCount,
  progress,
  problemStatement,
  problemId,
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, solved]);

  // Hand focus back to the box once a reply has landed, so the next thought can be typed
  // without reaching for the mouse.
  useEffect(() => {
    if (!busy) textRef.current?.focus();
  }, [busy]);

  const send = useCallback(
    async (text: string, options: { imageDataUrl?: string; studentSpec?: VisualSpec } = {}) => {
      const { imageDataUrl, studentSpec } = options;
      if (busy) return;
      if (text.trim().length === 0 && !imageDataUrl && !studentSpec) return;

      setBusy(true);
      setError(null);

      const studentId = crypto.randomUUID();
      const tutorId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        {
          id: studentId,
          role: 'student',
          text,
          ...(imageDataUrl ? { imageData: imageDataUrl } : {}),
          ...(studentSpec ? { spec: studentSpec } : {}),
        },
        { id: tutorId, role: 'tutor', text: '', pending: true },
      ]);

      try {
        const response = await fetch('/api/tutor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, text, imageDataUrl, studentSpec }),
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

  const handleSubmit = () => {
    const text = input.trim();
    if (text.length === 0 && !image) return;
    void send(text, image ? { imageDataUrl: image } : {});
    setInput('');
    setImage(null);
    if (textRef.current) textRef.current.style.height = 'auto';
  };

  /** Hand the tutor the figure itself, not a description of it. */
  const shareCanvas = () => {
    if (!spec) return;
    void send('Here is my version of the diagram.', { studentSpec: spec });
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

  return (
    <div className="flex h-dvh flex-col lg:flex-row">
      {/* Canvas */}
      {/*
        Stacked below lg, the canvas is capped so the conversation always keeps roughly half
        the screen — but only once there is a figure to show. An empty canvas collapses to
        the problem card, so on a phone the first thing seen is the problem and the tutor's
        opening, not a placeholder.
      */}
      <section
        className={`flex min-h-0 shrink-0 flex-col border-b border-line bg-surface lg:h-full lg:max-h-none lg:w-[55%] lg:shrink lg:border-b-0 lg:border-r ${
          spec ? 'max-h-[48dvh]' : 'max-h-[40dvh]'
        }`}
      >
        <header className="flex items-start gap-3 border-b border-line px-4 py-3 sm:px-5">
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
            <h1 className="mt-0.5 line-clamp-2 font-serif text-[16px] leading-snug text-ink sm:text-[18px]">
              {skillTitle}
            </h1>
          </div>

          <div className="mt-0.5 flex shrink-0 flex-col items-end gap-1.5">
            <StageRail stage={stage} />
            <form action={finishLesson}>
              <input type="hidden" name="sessionId" value={sessionId} />
              <button
                type="submit"
                className="text-[11px] font-medium text-ink-faint transition-colors hover:text-ink"
              >
                Finish lesson
              </button>
            </form>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          {problemStatement && (
            <div
              className={`mb-5 rounded-xl border px-4 py-3.5 ${
                solved ? 'border-affirm/30 bg-affirm-soft' : 'border-line bg-surface-sunk'
              }`}
            >
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                  {progress.total > 1 ? `Problem ${progress.index} of ${progress.total}` : 'Problem'}
                </p>
                <p className="flex items-center gap-2 text-[11px] text-ink-faint">
                  {hintCount > 0 && (
                    <span className="flex items-center gap-1" title="Hints spent on this problem">
                      <Lightbulb className="h-3 w-3" />
                      {hintsUsed}/{hintCount}
                    </span>
                  )}
                  {solved && (
                    <span className="flex items-center gap-1 font-medium text-affirm">
                      <Check className="h-3 w-3" /> Solved
                    </span>
                  )}
                </p>
              </div>
              <MathText className="tutor-prose text-[14px] leading-relaxed text-ink">
                {problemStatement}
              </MathText>

              {hasNext && (
                <form action={nextProblem} className="mt-3">
                  <input type="hidden" name="sessionId" value={sessionId} />
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-lg bg-sage-500 px-3.5 py-2 text-[13px] font-medium text-paper transition-opacity hover:opacity-90"
                  >
                    Next problem
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}

              {allDone && (
                <form action={finishLesson} className="mt-3">
                  <input type="hidden" name="sessionId" value={sessionId} />
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-lg bg-sage-500 px-3.5 py-2 text-[13px] font-medium text-paper transition-opacity hover:opacity-90"
                  >
                    That is every problem here — back to the course
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          )}

          {spec ? (
            <>
              <VisualCanvas spec={spec} onChange={setSpec} />

              {inconsistency && (
                <p className="mt-4 rounded-lg border border-query/30 bg-query-soft px-3.5 py-2.5 text-[13px] leading-relaxed text-query">
                  {inconsistency}
                </p>
              )}

              <button
                onClick={shareCanvas}
                disabled={busy}
                className="mt-5 rounded-lg border border-line px-3.5 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:border-sage-400 hover:bg-sage-50 hover:text-sage-700 disabled:opacity-40"
              >
                Show the tutor my version
              </button>
            </>
          ) : (
            <div className="hidden h-full min-h-40 flex-col items-center justify-center text-center lg:flex">
              <p className="max-w-xs text-[14px] leading-relaxed text-ink-faint">
                Figures the tutor draws will appear here, and you can rearrange them.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Conversation */}
      <section className="flex min-h-0 flex-1 flex-col bg-paper">
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
          <div className="mx-auto max-w-xl space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {error && (
              <div className="flex items-start gap-2.5 rounded-xl border border-fault/30 bg-fault-soft px-4 py-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-fault" />
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-fault">The tutor could not reply</p>
                  <p className="mt-0.5 break-words text-[13px] leading-relaxed text-ink-soft">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {hasNext && !busy && (
              <form action={nextProblem} className="flex justify-center pt-2">
                <input type="hidden" name="sessionId" value={sessionId} />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-full border border-sage-400 bg-sage-50 px-4 py-2 text-[13px] font-medium text-sage-700 transition-colors hover:bg-sage-100"
                >
                  Next problem
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-line bg-surface px-5 py-4">
          <div className="mx-auto max-w-xl">
            {image && (
              <div className="mb-3 flex items-center gap-3 rounded-lg border border-line bg-surface-sunk p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Attached working" className="h-14 w-14 rounded object-cover" />
                <span className="flex-1 text-[13px] text-ink-soft">Photo attached</span>
                <button
                  onClick={() => setImage(null)}
                  className="rounded p-1 text-ink-faint hover:bg-surface hover:text-ink"
                  aria-label="Remove photo"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="flex items-end gap-2 rounded-2xl border border-line bg-surface px-3 py-2 focus-within:border-sage-400">
              <button
                onClick={() => fileRef.current?.click()}
                className="mb-1 rounded-lg p-1.5 text-ink-faint transition-colors hover:bg-surface-sunk hover:text-ink"
                aria-label="Attach a photo of your working"
                type="button"
              >
                <ImagePlus className="h-[18px] w-[18px]" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={pickImage}
                className="hidden"
              />

              <textarea
                ref={textRef}
                value={input}
                autoFocus
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                rows={1}
                placeholder={
                  solved ? 'Say why it worked, or move on to the next problem…' : 'Say what you are thinking…'
                }
                className="max-h-40 flex-1 resize-none bg-transparent py-1.5 text-[15px] leading-relaxed text-ink outline-none placeholder:text-ink-faint"
              />

              <button
                onClick={handleSubmit}
                disabled={busy || (input.trim().length === 0 && !image)}
                className="mb-0.5 rounded-lg bg-sage-500 p-2 text-paper transition-opacity hover:opacity-90 disabled:opacity-25"
                aria-label="Send"
                type="button"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-2 text-[11px] text-ink-faint">
              Enter to send · Shift+Enter for a new line · write maths like x^2 or 3/4
            </p>
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
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-sage-100 px-4 py-2.5">
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
        <p className="mt-2 text-[12px] italic text-ink-faint">Drew a figure on the canvas →</p>
      )}
    </div>
  );
}
