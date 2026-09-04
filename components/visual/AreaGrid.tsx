'use client';

import type { AreaGridSpec } from '@/lib/visual/spec';
import { Figure, FIG, Label, num, r } from './primitives';

/**
 * Partitioned rectangle for expansion.
 *
 * The argument the figure makes is that expanding brackets is nothing more than totalling
 * the areas of the pieces, and that every term in one bracket necessarily meets every term
 * in the other — which is why the middle term of $(a+b)^2$ is $2ab$ and not $ab$.
 *
 * Cells are drawn to their true relative size when widths and heights are given, so a $3x$
 * strip really is three times a unit strip. An empty cell is one the student fills in.
 */

const HEADER = 34;
const PAD = 16;
const MAX_BODY = 300;

export function AreaGrid({ spec }: { spec: AreaGridSpec }) {
  const cols = spec.columns.length;
  const rows = spec.rows.length;

  const widths = normalise(spec.widths, cols);
  const heights = normalise(spec.heights, rows);

  const bodyWidth = FIG.width - HEADER - PAD * 2;
  const totalW = widths.reduce((a, b) => a + b, 0);
  const totalH = heights.reduce((a, b) => a + b, 0);

  // Keep cells from becoming absurdly tall when a row is weighted heavily.
  const bodyHeight = Math.min(MAX_BODY, Math.max(120, rows * 74));

  const colX: number[] = [];
  let x = PAD + HEADER;
  for (const w of widths) {
    colX.push(x);
    x += (w / totalW) * bodyWidth;
  }

  const rowY: number[] = [];
  let y = PAD + HEADER;
  for (const h of heights) {
    rowY.push(y);
    y += (h / totalH) * bodyHeight;
  }

  const colW = (i: number) => ((widths[i] as number) / totalW) * bodyWidth;
  const rowH = (i: number) => ((heights[i] as number) / totalH) * bodyHeight;

  const height = PAD * 2 + HEADER + bodyHeight;

  return (
    <Figure
      title={spec.title}
      caption={spec.caption}
      height={height}
      description={describe(spec)}
    >
      {/* Column headers, sitting outside the rectangle so they read as dimensions. */}
      {spec.columns.map((header, i) => (
        <Label
          key={`c${i}`}
          x={(colX[i] as number) + colW(i) / 2}
          y={PAD + HEADER / 2}
          size={14}
          fill={FIG.knownText}
          weight={600}
          math
        >
          {header}
        </Label>
      ))}

      {spec.rows.map((header, i) => (
        <Label
          key={`r${i}`}
          x={PAD + HEADER / 2}
          y={(rowY[i] as number) + rowH(i) / 2}
          size={14}
          fill={FIG.knownText}
          weight={600}
          math
        >
          {header}
        </Label>
      ))}

      {spec.rows.map((_, ri) =>
        spec.columns.map((__, ci) => {
          const content = spec.cells[ri * cols + ci] ?? '';
          const cx = colX[ci] as number;
          const cy = rowY[ri] as number;
          const w = colW(ci);
          const h = rowH(ri);
          const blank = content.trim().length === 0;

          return (
            <g key={`${ri}-${ci}`}>
              <rect
                x={r(cx)}
                y={r(cy)}
                width={r(w)}
                height={r(h)}
                fill={blank ? FIG.sunk : FIG.known}
                stroke={FIG.knownEdge}
                strokeWidth={1.25}
                strokeDasharray={blank ? '4 3' : undefined}
              />
              {!blank && (
                <Label x={cx + w / 2} y={cy + h / 2} size={15} fill={FIG.ink} math>
                  {content}
                </Label>
              )}
              {blank && (
                <Label x={cx + w / 2} y={cy + h / 2} size={18} fill={FIG.inkFaint}>
                  ?
                </Label>
              )}
            </g>
          );
        }),
      )}
    </Figure>
  );
}

/** Equal weights when none are given, so the grid still draws. */
function normalise(given: number[] | undefined, count: number): number[] {
  if (given && given.length === count) return given;
  return Array.from({ length: count }, () => 1);
}

function describe(spec: AreaGridSpec): string {
  const filled = spec.cells.filter((c) => c.trim().length > 0).length;
  return (
    `Area grid, ${spec.rows.length} by ${spec.columns.length}. ` +
    `Columns ${spec.columns.join(', ')}; rows ${spec.rows.join(', ')}. ` +
    `${filled} of ${spec.cells.length} cells filled.`
  );
}

/** Exported for the renderer tests. */
export const areaGridInternals = { normalise, describe, num };
