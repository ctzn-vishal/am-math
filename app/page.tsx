import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import { getPack, getSkill, problemsForSkill, unitOfSkill, unitsInOrder } from '@/lib/content';
import { getMastery, getRecommendations, openSessionsBySkill } from '@/lib/session/service';
import type { Mastery, MasteryBand } from '@/lib/mastery/model';
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

  // One card per skill, newest first. Two abandoned sessions on the same skill are one
  // thing to pick up, not two.
  const recent = [...openBySkill.values()].sort((a, b) => b.startedAt - a.startedAt).slice(0, 3);

  const started = [...mastery.values()].filter((m) => m.attemptCount > 0).length;
  const secure = [...mastery.values()].filter((m) => m.band === 'secure').length;

  return (
    <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {pack.title}
          </p>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Math Sage
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            A calm, one-to-one tutor for Dimensions Math Grade 8. Work with objects, pictures
            and symbols; ask questions freely; and check an answer only when you are ready.
          </p>
        </div>

        {started > 0 && (
          <dl className="flex shrink-0 gap-6 text-[13px] text-ink-soft">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-faint">Started</dt>
              <dd className="mt-0.5 font-serif text-2xl text-ink">
                {started}
                <span className="text-[13px] text-ink-faint"> / {pack.skills.length}</span>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-faint">Secure</dt>
              <dd className="mt-0.5 font-serif text-2xl text-affirm">{secure}</dd>
            </div>
          </dl>
        )}
      </header>

      {recent.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            <Clock className="h-3.5 w-3.5" />
            Today · continue learning
          </h2>

          <div className="grid gap-2.5 sm:grid-cols-3">
            {recent.map((session) => {
              const skill = getSkill(session.skillId);
              if (!skill) return null;
              const unit = unitOfSkill(session.skillId);

              return (
                <form action={beginLesson} key={session.sessionId}>
                  <input type="hidden" name="sessionId" value={session.sessionId} />
                  <button
                    type="submit"
                    className="group flex h-full w-full flex-col rounded-xl border border-sage-200 bg-sage-50 p-4 text-left transition-colors hover:border-sage-400"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-sage-600">
                      {unit?.title ?? 'Lesson'}
                    </p>
                    <p className="mt-1.5 line-clamp-2 flex-1 font-serif text-[15px] leading-snug text-ink">
                      {skill.title}
                    </p>
                    <p className="mt-3 flex items-center justify-between text-[12px] text-ink-faint">
                      <span>
                        {STAGE_LABEL[session.stage]} · {timeAgo(session.startedAt)}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-sage-700">
                        Continue
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </p>
                  </button>
                </form>
              );
            })}
          </div>
        </section>
      )}

      {recommendations.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            <Sparkles className="h-3.5 w-3.5" />
            {started === 0 ? 'Today · a good place to start' : 'Today · suggested next'}
          </h2>

          <div className="space-y-2.5">
            {recommendations.map((rec) => {
              const skill = getSkill(rec.skillId);
              if (!skill) return null;
              const unit = unitOfSkill(rec.skillId);
              const open = openBySkill.get(rec.skillId);

              return (
                <form action={beginLesson} key={rec.skillId}>
                  <input type="hidden" name="skillId" value={rec.skillId} />
                  {open && <input type="hidden" name="sessionId" value={open.sessionId} />}
                  <button
                    type="submit"
                    className="group flex w-full items-center gap-4 rounded-xl border border-line bg-surface p-4 text-left transition-colors hover:border-sage-400 hover:bg-sage-50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                        {unit ? `Unit ${unit.order} · ${unit.title}` : ''}
                      </p>
                      <p className="mt-1 font-serif text-[17px] leading-snug text-ink">{skill.title}</p>
                      <p className="mt-1 text-[13px] text-ink-soft">
                        {open ? 'You have a lesson in progress here — pick it back up.' : rec.explanation}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-sage-500" />
                  </button>
                </form>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-5 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
          <BookOpen className="h-3.5 w-3.5" />
          Explore the course
        </h2>

        <div className="space-y-1">
          {units.map((unit) => {
            const skills = unit.skillIds
              .map((id) => getSkill(id))
              .filter((s): s is NonNullable<typeof s> => s !== undefined);

            return (
              <details
                key={unit.id}
                className="group rounded-xl border border-transparent px-4 py-3 transition-colors open:border-line open:bg-surface hover:bg-surface"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3">
                  <span className="w-5 shrink-0 font-mono text-[12px] text-ink-faint">
                    {unit.order}
                  </span>
                  <span className="min-w-0 flex-1 font-serif text-[16px] leading-snug text-ink">
                    {unit.title}
                  </span>
                  <span className="hidden shrink-0 text-[11px] uppercase tracking-[0.08em] text-ink-faint sm:inline">
                    {STRAND_LABEL[unit.strand] ?? unit.strand}
                  </span>
                  <UnitProgress skills={skills.map((s) => s.id)} mastery={mastery} />
                </summary>

                <div className="mt-3 space-y-1 pl-8">
                  {skills.map((skill) => {
                    const m = mastery.get(skill.id);
                    const band = m?.band ?? 'unseen';
                    const style = BAND_STYLE[band];
                    const open = openBySkill.get(skill.id);
                    const problemCount = problemsForSkill(skill.id).length;

                    return (
                      <form action={beginLesson} key={skill.id}>
                        <input type="hidden" name="skillId" value={skill.id} />
                        {open && <input type="hidden" name="sessionId" value={open.sessionId} />}
                        <button
                          type="submit"
                          className="group/skill flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-sage-50"
                        >
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[14px] leading-snug text-ink-soft group-hover/skill:text-ink">
                              {skill.title}
                            </span>
                            <span className="mt-0.5 block text-[12px] text-ink-faint">
                              5–10 min lesson · {problemCount} practice problems available
                              {open ? ' · in progress' : ''}
                            </span>
                          </span>
                          <span className={`shrink-0 text-[11px] font-medium ${style.text}`}>
                            {open ? 'Continue' : style.label}
                          </span>
                        </button>
                      </form>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </main>
  );
}

/** A row of dots per skill. Reads at a glance without claiming a precision it does not have. */
function UnitProgress({ skills, mastery }: { skills: string[]; mastery: Map<string, Mastery> }) {
  return (
    <span className="flex shrink-0 items-center gap-1" aria-hidden>
      {skills.map((id) => {
        const band = mastery.get(id)?.band ?? 'unseen';
        return <span key={id} className={`h-1.5 w-1.5 rounded-full ${BAND_STYLE[band].dot}`} />;
      })}
    </span>
  );
}
