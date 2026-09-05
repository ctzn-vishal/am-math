'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Plus, Search, X } from 'lucide-react';
import { beginLesson } from '@/app/actions';

export interface ExplorerSkill {
  id: string;
  title: string;
  problemCount: number;
  status: string;
  statusClass: string;
  dotClass: string;
  sessionId?: string;
}

export interface ExplorerUnit {
  id: string;
  order: number;
  title: string;
  strand: string;
  skills: ExplorerSkill[];
}

export function CourseExplorer({ units }: { units: ExplorerUnit[] }) {
  const [query, setQuery] = useState('');
  const normalised = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!normalised) return [];
    return units.flatMap((unit) =>
      unit.skills
        .filter(
          (skill) =>
            skill.title.toLowerCase().includes(normalised) ||
            unit.title.toLowerCase().includes(normalised) ||
            unit.strand.toLowerCase().includes(normalised),
        )
        .map((skill) => ({ unit, skill })),
    );
  }, [normalised, units]);

  return (
    <section id="course" aria-labelledby="course-heading" className="scroll-mt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage-600">
            Explore
          </p>
          <h2 id="course-heading" className="mt-1 font-serif text-3xl tracking-tight text-ink">
            Find a skill
          </h2>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ink-soft">
            Follow the suggested path, or choose exactly what you need for school today.
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
          />
          <label htmlFor="course-search" className="sr-only">
            Search skills, units, or strands
          </label>
          <input
            id="course-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search algebra, graphs, angles…"
            className="min-h-12 w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-10 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-sage-400 focus:ring-2 focus:ring-sage-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear course search"
              className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-ink-faint hover:bg-surface-sunk hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {normalised ? (
        <div className="mt-6">
          <p className="mb-3 text-[12px] text-ink-faint" aria-live="polite">
            {matches.length === 0
              ? 'No skills found. Try a broader word.'
              : `${matches.length} ${matches.length === 1 ? 'skill' : 'skills'} found`}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {matches.map(({ unit, skill }) => (
              <SkillButton key={skill.id} skill={skill} unitLabel={`Unit ${unit.order} · ${unit.title}`} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {units.map((unit) => (
            <details
              key={unit.id}
              className="group self-start rounded-2xl border border-line bg-surface transition-colors open:border-sage-200"
            >
              <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 px-4 py-3.5 marker:hidden sm:px-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-sunk font-mono text-[12px] text-ink-soft group-open:bg-sage-100 group-open:text-sage-700">
                  {unit.order}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-[16px] leading-snug text-ink">{unit.title}</span>
                  <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                    {unit.strand} · {unit.skills.length} {unit.skills.length === 1 ? 'skill' : 'skills'}
                  </span>
                </span>
                <span className="text-ink-faint transition-transform group-open:rotate-45" aria-hidden>
                  <Plus className="h-4 w-4" />
                </span>
              </summary>

              <div className="space-y-1 border-t border-line p-2">
                {unit.skills.map((skill) => (
                  <SkillButton key={skill.id} skill={skill} />
                ))}
              </div>
            </details>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center gap-2 text-[12px] text-ink-faint">
        <BookOpen className="h-3.5 w-3.5" />
        Each lesson is a focused five-question session. You can stop and return at any time.
      </div>
    </section>
  );
}

function SkillButton({ skill, unitLabel }: { skill: ExplorerSkill; unitLabel?: string }) {
  return (
    <form action={beginLesson}>
      <input type="hidden" name="skillId" value={skill.id} />
      {skill.sessionId && <input type="hidden" name="sessionId" value={skill.sessionId} />}
      <button
        type="submit"
        className="group/skill flex min-h-16 w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-colors hover:bg-sage-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-500"
      >
        <span className={`h-2 w-2 shrink-0 rounded-full ${skill.dotClass}`} aria-hidden />
        <span className="min-w-0 flex-1">
          {unitLabel && (
            <span className="mb-0.5 block truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
              {unitLabel}
            </span>
          )}
          <span className="block text-[14px] leading-snug text-ink-soft group-hover/skill:text-ink">
            {skill.title}
          </span>
          <span className="mt-1 block text-[11px] text-ink-faint">
            5–10 min · {skill.problemCount} problems available
          </span>
        </span>
        <span className={`shrink-0 text-[11px] font-medium ${skill.statusClass}`}>
          {skill.sessionId ? 'Continue' : skill.status}
        </span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-faint transition-transform group-hover/skill:translate-x-0.5 group-hover/skill:text-sage-600" />
      </button>
    </form>
  );
}
