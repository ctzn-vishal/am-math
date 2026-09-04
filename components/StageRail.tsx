'use client';

import type { CpaStage } from '@/lib/db/schema';

/**
 * Where the lesson is in the CPA sequence.
 *
 * Read-only on purpose. The stage is the tutor's judgement about readiness, and letting a
 * student skip to the symbols because the blocks feel slow is exactly the failure the whole
 * method exists to prevent.
 */

const STAGES: Array<{ id: CpaStage; label: string; hint: string }> = [
  { id: 'concrete', label: 'Concrete', hint: 'Something you could hold' },
  { id: 'pictorial', label: 'Pictorial', hint: 'A picture of it' },
  { id: 'abstract', label: 'Abstract', hint: 'The symbols' },
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
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                active
                  ? 'bg-sage-500 text-white'
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
