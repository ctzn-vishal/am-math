'use client';

import type { VisualSpec } from '@/lib/visual/spec';
import { VISUAL_KINDS } from '@/lib/visual/registry';
import { BarModel } from './BarModel';
import { AlgebraTiles } from './AlgebraTiles';
import { AreaGrid } from './AreaGrid';
import { CrossFrame } from './CrossFrame';
import { AngleDiagram } from './AngleDiagram';
import { CoordinatePlane } from './CoordinatePlane';
import { SolidNet } from './SolidNet';
import { StatPlot } from './StatPlot';

/**
 * Dispatches a spec to its renderer.
 *
 * `onChange` is only offered where direct manipulation genuinely helps. Dragging a bar
 * changes what the model claims; dragging a point on a parabola would just be fiddling with
 * a picture of a function, so those kinds are read-only until there is a reason otherwise.
 *
 * The fallback branch is a real UI state rather than a crash: a spec stored before a
 * renderer changed should show an honest placeholder, not a blank panel.
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

    case 'algebra_tiles':
      return <AlgebraTiles spec={spec} />;

    case 'area_grid':
      return <AreaGrid spec={spec} />;

    case 'cross_frame':
      return <CrossFrame spec={spec} />;

    case 'angle_diagram':
      return <AngleDiagram spec={spec} />;

    case 'coordinate_plane':
      return <CoordinatePlane spec={spec} />;

    case 'solid_net':
      return <SolidNet spec={spec} />;

    case 'stat_plot':
      return <StatPlot spec={spec} />;

    default:
      return <NotYetDrawable kind={(spec as { kind: string }).kind} />;
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
