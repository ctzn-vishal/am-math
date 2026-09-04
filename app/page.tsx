import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { getPack, getSkill, unitsInOrder } from '@/lib/content';
import { AUTHORED_UNITS } from '@/content/packs/dimensions-g8';
import { getMastery, getRecommendations } from '@/lib/session/service';
import type { Mastery, MasteryBand } from '@/lib/mastery/model';
import { beginLesson } from './actions';

export const dynamic = 'force-dynamic';

const BAND_STYLE: Record<MasteryBand, { label: string; dot: string; text: string }> = {
  unseen: { label: 'Not started', dot: 'bg-line-strong', text: 'text-ink-faint' },
  developing: { label: 'Shaky', dot: 'bg-fault', text: 'text-fault' },
  approaching: { label: 'Getting there', dot: 'bg-query', text: 'text-query' },
  secure: { label: 'Secure', dot: 'bg-affirm', text: 'text-affirm' },
};

export default async function Dashboard() {
  const pack = getPack();
  const units = unitsInOrder();
  const mastery = await getMastery();
  const recommendations = await getRecommendations();

  const started = [...mastery.values()].filter((m) => m.attemptCount > 0).length;

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-12">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          {pack.level}
        </p>
        <h1 className="font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Math Sage
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          Work through a skill with a tutor that draws. Every idea is met three times — as
          something you could hold, as a picture, and only then as symbols.
        </p>
      </header>

      {recommendations.length > 0 && (
        <section className="mb-14">
          <h2 className="mb-4 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            <Sparkles className="h-3.5 w-3.5" />
            {started === 0 ? 'Start here' : 'Suggested next'}
          </h2>

          <div className="space-y-2.5">
            {recommendations.map((rec) => {
              const skill = getSkill(rec.skillId);
              if (!skill) return null;

              return (
                <form action={beginLesson} key={rec.skillId}>
                  <input type="hidden" name="skillId" value={rec.skillId} />
                  <button
                    type="submit"
                    className="group flex w-full items-center gap-4 rounded-xl border border-line bg-surface p-4 text-left transition-colors hover:border-sage-400 hover:bg-sage-50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-[17px] leading-snug text-ink">{skill.title}</p>
                      <p className="mt-1 text-[13px] text-ink-soft">{rec.explanation}</p>
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
          The whole course
        </h2>

        <div className="space-y-1">
          {units.map((unit) => {
            const skills = unit.skillIds
              .map((id) => getSkill(id))
              .filter((s): s is NonNullable<typeof s> => s !== undefined);

            const authored = AUTHORED_UNITS.has(unit.id);

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
                  <UnitProgress skills={skills.map((s) => s.id)} mastery={mastery} />
                </summary>

                <div className="mt-3 space-y-1 pl-8">
                  {!authored && (
                    <p className="mb-3 rounded-lg bg-query-soft px-3 py-2 text-[12px] leading-relaxed text-query">
                      Ported from the syllabus outline but not yet written up. The tutor can
                      teach it, but without the per-skill teaching notes and marked problems
                      that unit 2 has.
                    </p>
                  )}

                  {skills.map((skill) => {
                    const m = mastery.get(skill.id);
                    const band = m?.band ?? 'unseen';
                    const style = BAND_STYLE[band];

                    return (
                      <form action={beginLesson} key={skill.id}>
                        <input type="hidden" name="skillId" value={skill.id} />
                        <button
                          type="submit"
                          className="group/skill flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-sage-50"
                        >
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
                          <span className="min-w-0 flex-1 text-[14px] leading-snug text-ink-soft group-hover/skill:text-ink">
                            {skill.title}
                          </span>
                          <span className={`shrink-0 text-[11px] font-medium ${style.text}`}>
                            {style.label}
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
