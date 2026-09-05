import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  Compass,
  Shapes,
  Sparkles,
} from 'lucide-react';
import { getPack, getSkill, problemsForSkill, unitOfSkill, unitsInOrder } from '@/lib/content';
import { getMastery, getRecommendations, openSessionsBySkill } from '@/lib/session/service';
import type { MasteryBand } from '@/lib/mastery/model';
import { CourseExplorer, type ExplorerUnit } from '@/components/CourseExplorer';
import { beginLesson } from './actions';

export const dynamic = 'force-dynamic';

const BAND_STYLE: Record<MasteryBand, { label: string; dot: string; text: string }> = {
  unseen: { label: 'New', dot: 'bg-line-strong', text: 'text-ink-faint' },
  developing: { label: 'Needs practice', dot: 'bg-query', text: 'text-query' },
  approaching: { label: 'Nearly secure', dot: 'bg-sage-400', text: 'text-sage-700' },
  secure: { label: 'Secure', dot: 'bg-affirm', text: 'text-affirm' },
};

const STAGE_LABEL = {
  concrete: 'Handle it',
  pictorial: 'See it',
  abstract: 'Symbolise it',
} as const;

const STRAND_LABEL: Record<string, string> = {
  algebra: 'Algebra',
  geometry: 'Geometry',
  graphs: 'Graphs',
  mensuration: 'Mensuration',
  statistics: 'Statistics',
  number: 'Number',
};

function timeAgo(ms: number): string {
  const minutes = Math.round((Date.now() - ms) / 60_000);
  if (minutes < 2) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? 'yesterday' : `${days} days ago`;
}

export default async function Dashboard() {
  const pack = getPack();
  const units = unitsInOrder();
  const [mastery, recommendations, openBySkill] = await Promise.all([
    getMastery(),
    getRecommendations(),
    openSessionsBySkill(),
  ]);

  const recent = [...openBySkill.values()].sort((a, b) => b.startedAt - a.startedAt);
  const started = [...mastery.values()].filter((item) => item.attemptCount > 0).length;
  const secure = [...mastery.values()].filter((item) => item.band === 'secure').length;

  const continuePath = recent
    .map((session) => {
      const skill = getSkill(session.skillId);
      if (!skill) return null;
      return {
        mode: 'continue' as const,
        skill,
        unit: unitOfSkill(skill.id),
        sessionId: session.sessionId,
        detail: `${STAGE_LABEL[session.stage]} · last opened ${timeAgo(session.startedAt)}`,
      };
    })
    .find((item) => item !== null);

  const recommendedPath = recommendations
    .map((recommendation) => {
      const skill = getSkill(recommendation.skillId);
      if (!skill) return null;
      return {
        mode: 'start' as const,
        skill,
        unit: unitOfSkill(skill.id),
        detail: recommendation.explanation,
      };
    })
    .find((item) => item !== null);

  const primaryPath = continuePath ?? recommendedPath;
  const secondaryRecommendations = recommendations
    .filter((item) => item.skillId !== primaryPath?.skill.id)
    .slice(0, 2);

  const explorerUnits: ExplorerUnit[] = units.map((unit) => ({
    id: unit.id,
    order: unit.order,
    title: unit.title,
    strand: STRAND_LABEL[unit.strand] ?? unit.strand,
    skills: unit.skillIds.flatMap((skillId) => {
      const skill = getSkill(skillId);
      if (!skill) return [];
      const band = mastery.get(skill.id)?.band ?? 'unseen';
      const style = BAND_STYLE[band];
      const open = openBySkill.get(skill.id);
      return [
        {
          id: skill.id,
          title: skill.title,
          problemCount: problemsForSkill(skill.id).length,
          status: style.label,
          statusClass: style.text,
          dotClass: style.dot,
          ...(open ? { sessionId: open.sessionId } : {}),
        },
      ];
    }),
  }));

  return (
    <main className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12">
      <header className="grid items-center gap-7 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-100 text-sage-600">
              <Shapes className="h-4 w-4" aria-hidden />
            </span>
            <span>
              <span className="block font-serif text-[18px] leading-none text-ink">Math Sage</span>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-faint sm:text-[10px]">
                {pack.title}
              </span>
            </span>
          </div>

          <h1 className="mt-5 max-w-2xl font-serif text-[2.8rem] font-medium leading-[0.94] tracking-[-0.045em] text-ink sm:mt-7 sm:text-[clamp(3.5rem,7vw,5.8rem)]">
            See the idea.
            <span className="block text-sage-600">Then solve it.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-soft sm:mt-6 sm:text-[18px]">
            A calm maths tutor that helps you build the picture before the symbols. Work one
            short lesson at a time, ask freely, and check an answer when you feel ready.
          </p>

          <div className="mt-7 hidden flex-wrap gap-x-6 gap-y-3 text-[13px] text-ink-soft sm:flex">
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-sage-500" aria-hidden />
              5–10 minute lessons
            </span>
            <span className="inline-flex items-center gap-2">
              <Shapes className="h-4 w-4 text-sage-500" aria-hidden />
              Visual explanations
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-sage-500" aria-hidden />
              Progress saved
            </span>
          </div>
        </div>

        {primaryPath && (
          <section
            aria-labelledby="today-heading"
            className="relative overflow-hidden rounded-[1.75rem] border border-sage-200 bg-sage-50 p-5 shadow-[0_24px_70px_-45px_rgba(65,79,46,0.65)] sm:p-7"
          >
            <div className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-sage-100/70" aria-hidden />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-sage-600">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  Your next step
                </p>
                <p className="text-[12px] text-ink-faint">About 10 min</p>
              </div>

              <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                {primaryPath.unit ? `Unit ${primaryPath.unit.order} · ${primaryPath.unit.title}` : 'Lesson'}
              </p>
              <h2 id="today-heading" className="mt-2 max-w-md font-serif text-[1.65rem] leading-[1.08] text-ink sm:text-[2.15rem] sm:leading-tight">
                {primaryPath.skill.title}
              </h2>
              <p className="mt-4 hidden max-w-md text-[14px] leading-relaxed text-ink-soft sm:block">
                {primaryPath.skill.summary}
              </p>
              <p className="mt-3 line-clamp-2 border-l-2 border-sage-300 pl-3 text-[13px] leading-relaxed text-sage-700 sm:mt-4 sm:line-clamp-none">
                {primaryPath.detail}
              </p>

              <form action={beginLesson} className="mt-5 sm:mt-7">
                <input type="hidden" name="skillId" value={primaryPath.skill.id} />
                {'sessionId' in primaryPath && (
                  <input type="hidden" name="sessionId" value={primaryPath.sessionId} />
                )}
                <button
                  type="submit"
                  className="group flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-sage-600 px-5 text-[15px] font-semibold text-paper shadow-sm transition hover:bg-sage-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600"
                >
                  {primaryPath.mode === 'continue' ? 'Continue lesson' : 'Start today’s lesson'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </button>
              </form>

              <Link
                href="#course"
                className="mt-3 flex min-h-11 items-center justify-center rounded-lg text-[13px] font-medium text-ink-soft hover:bg-sage-100 hover:text-sage-700"
              >
                Choose a different skill
              </Link>
            </div>
          </section>
        )}
      </header>

      {started > 0 && (
        <section aria-label="Your progress" className="mt-12 rounded-2xl border border-line bg-surface px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                Your progress
              </p>
              <p className="mt-1 text-[14px] text-ink-soft">
                <strong className="font-semibold text-ink">{secure} secure</strong>
                {' · '}
                {Math.max(0, started - secure)} building
                {' · '}
                {pack.skills.length - started} still to explore
              </p>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-surface-sunk sm:w-64"
              role="progressbar"
              aria-label="Skills explored"
              aria-valuemin={0}
              aria-valuemax={pack.skills.length}
              aria-valuenow={started}
            >
              <div
                className="h-full rounded-full bg-sage-500 transition-[width]"
                style={{ width: `${Math.max(2, (started / pack.skills.length) * 100)}%` }}
              />
            </div>
          </div>
        </section>
      )}

      {(recent.length > 1 || secondaryRecommendations.length > 0) && (
        <section aria-labelledby="next-heading" className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage-600">
                Keep going
              </p>
              <h2 id="next-heading" className="mt-1 font-serif text-3xl tracking-tight text-ink">
                Other useful next steps
              </h2>
            </div>
            <Compass className="hidden h-6 w-6 text-sage-400 sm:block" aria-hidden />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {recent.slice(1, 2).map((session) => {
              const skill = getSkill(session.skillId);
              const unit = unitOfSkill(session.skillId);
              if (!skill) return null;
              return (
                <NextStepCard
                  key={session.sessionId}
                  skillId={skill.id}
                  sessionId={session.sessionId}
                  eyebrow={unit ? `Continue · ${unit.title}` : 'Continue lesson'}
                  title={skill.title}
                  detail={`${STAGE_LABEL[session.stage]} · ${timeAgo(session.startedAt)}`}
                />
              );
            })}

            {secondaryRecommendations.map((recommendation) => {
              const skill = getSkill(recommendation.skillId);
              const unit = unitOfSkill(recommendation.skillId);
              if (!skill) return null;
              return (
                <NextStepCard
                  key={skill.id}
                  skillId={skill.id}
                  eyebrow={unit ? `Unit ${unit.order} · ${unit.title}` : 'Suggested skill'}
                  title={skill.title}
                  detail={recommendation.explanation}
                />
              );
            })}
          </div>
        </section>
      )}

      <div className="my-16 flex items-center gap-4" aria-hidden>
        <div className="h-px flex-1 bg-line" />
        <BookOpenCheck className="h-4 w-4 text-line-strong" />
        <div className="h-px flex-1 bg-line" />
      </div>

      <CourseExplorer units={explorerUnits} />
    </main>
  );
}

function NextStepCard({
  skillId,
  sessionId,
  eyebrow,
  title,
  detail,
}: {
  skillId: string;
  sessionId?: string;
  eyebrow: string;
  title: string;
  detail: string;
}) {
  return (
    <form action={beginLesson}>
      <input type="hidden" name="skillId" value={skillId} />
      {sessionId && <input type="hidden" name="sessionId" value={sessionId} />}
      <button
        type="submit"
        className="group flex min-h-32 w-full items-center gap-4 rounded-2xl border border-line bg-surface p-5 text-left transition hover:border-sage-300 hover:bg-sage-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-500"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            {eyebrow}
          </span>
          <span className="mt-2 block font-serif text-[19px] leading-snug text-ink">{title}</span>
          <span className="mt-2 line-clamp-2 block text-[13px] leading-relaxed text-ink-soft">
            {detail}
          </span>
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-sunk text-ink-faint transition group-hover:bg-sage-100 group-hover:text-sage-700">
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </button>
    </form>
  );
}
