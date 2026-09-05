'use client';

import type { CpaStage } from '@/lib/db/schema';

/**
 * Where the lesson is in the CPA sequence.
 *
 * Read-only, but written in student language. The formal CPA name remains in the tooltip
 * and accessible label so the method is transparent without making the rail feel academic.
 */

const STAGES: Array<{ id: CpaStage; label: string; hint: string }> = [
  { id: 'concrete', label: 'Handle it', hint: 'Concrete: something you could hold or act out' },
  { id: 'pictorial', label: 'See it', hint: 'Pictorial: a drawing that shows the relationship' },
  { id: 'abstract', label: 'Symbolise it', hint: 'Abstract: the mathematical symbols' },
];

export function StageRail({ stage }: { stage: CpaStage }) {
  const current = STAGES.findIndex((s) => s.id === stage);

  return (
    <div className="flex shrink-0 items-center gap-1" role="group" aria-label="Lesson stage">
      {STAGES.map((s, i) => {
        const active = i === current;
        const passed = i < current;

        return (
          <div key={s.id} className="flex items-center gap-1">
            {i > 0 && (
              <span
                className={`h-px w-3 ${passed || active ? 'bg-sage-400' : 'bg-line-strong'}`}
                aria-hidden
              />
            )}
            <span
              title={s.hint}
              aria-current={active ? 'step' : undefined}
              aria-label={`${s.hint}${active ? ', current stage' : passed ? ', completed' : ''}`}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                active
                  ? 'bg-sage-500 text-paper'
                  : passed
                    ? 'bg-sage-100 text-sage-700'
                    : 'text-ink-faint'
              }`}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
