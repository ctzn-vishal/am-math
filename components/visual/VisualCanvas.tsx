'use client';

import type { VisualSpec } from '@/lib/visual/spec';
import { VISUAL_KINDS } from '@/lib/visual/registry';
import { BarModel } from './BarModel';

/**
 * Dispatches a spec to its renderer.
 *
 * The unimplemented branch is a real UI state, not a crash: the registry stops the tutor
 * emitting these, but a spec can also arrive from stored history written before a renderer
 * was removed, and a student should see an honest placeholder rather than a blank panel.
 */

export interface VisualCanvasProps {
  spec: VisualSpec;
  onChange?: (spec: VisualSpec) => void;
}

export function VisualCanvas({ spec, onChange }: VisualCanvasProps) {
  switch (spec.kind) {
    case 'bar_model':
      return (
        <BarModel
          spec={spec}
          {...(onChange ? { onChange: (next: VisualSpec) => onChange(next) } : {})}
        />
      );

    default:
      return <NotYetDrawable kind={spec.kind} />;
  }
}

function NotYetDrawable({ kind }: { kind: string }) {
  const info = VISUAL_KINDS.find((k) => k.kind === kind);

  return (
    <div className="rounded-lg border border-dashed border-line-strong bg-surface-sunk p-5 text-center">
      <p className="font-serif text-[15px] text-ink">
        {kind.replace(/_/g, ' ')} figures are not drawable yet
      </p>
      {info && <p className="mx-auto mt-2 max-w-sm text-[13px] text-ink-faint">{info.guidance}</p>}
    </div>
  );
}
