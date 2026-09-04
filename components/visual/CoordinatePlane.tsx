'use client';

import type { CoordinatePlaneSpec, Curve } from '@/lib/visual/spec';
import { Figure, FIG, Label, num, r } from './primitives';

/**
 * Cartesian axes with lines, parabolas and plotted points.
 *
 * The slope triangle is the reason this exists rather than a chart library: gradient is
 * taught as a rise over a run you can count off the grid, and hiding that behind a smooth
 * line turns $m$ back into a number to memorise.
 */

const PAD = { top: 18, right: 24, bottom: 34, left: 40 };
const PLOT_H = 300;

export function CoordinatePlane({ spec }: { spec: CoordinatePlaneSpec }) {
  const { xMin: x0, xMax: x1, yMin: y0, yMax: y1 } = spec;

  const plotW = FIG.width - PAD.left - PAD.right;
  const height = PLOT_H + PAD.top + PAD.bottom;

  const sx = (x: number) => PAD.left + ((x - x0) / (x1 - x0)) * plotW;
  const sy = (y: number) => PAD.top + PLOT_H - ((y - y0) / (y1 - y0)) * PLOT_H;

  const ticks = (from: number, to: number): number[] => {
    const out: number[] = [];
    const step = spec.gridStep;
    const start = Math.ceil(from / step) * step;
    for (let v = start; v <= to + 1e-9; v += step) out.push(Math.round(v * 1e6) / 1e6);
    return out;
  };

  const xTicks = ticks(x0, x1);
  const yTicks = ticks(y0, y1);

  // Only label every nth tick when the grid is dense, or the axis becomes unreadable.
  const xLabelEvery = Math.ceil(xTicks.length / 12);
  const yLabelEvery = Math.ceil(yTicks.length / 8);

  const axisY = y0 <= 0 && y1 >= 0 ? sy(0) : null;
  const axisX = x0 <= 0 && x1 >= 0 ? sx(0) : null;

  return (
    <Figure title={spec.title} caption={spec.caption} height={height} description={describe(spec)}>
      {/* Grid */}
      {xTicks.map((t) => (
        <line
          key={`gx${t}`}
          x1={r(sx(t))}
          y1={PAD.top}
          x2={r(sx(t))}
          y2={PAD.top + PLOT_H}
          stroke={FIG.stroke}
          strokeWidth={0.6}
          opacity={0.55}
        />
      ))}
      {yTicks.map((t) => (
        <line
          key={`gy${t}`}
          x1={PAD.left}
          y1={r(sy(t))}
          x2={PAD.left + plotW}
          y2={r(sy(t))}
          stroke={FIG.stroke}
          strokeWidth={0.6}
          opacity={0.55}
        />
      ))}

      {/* Axes, drawn only where the origin is actually in view. */}
      {axisY !== null && (
        <line
          x1={PAD.left}
          y1={r(axisY)}
          x2={PAD.left + plotW}
          y2={r(axisY)}
          stroke={FIG.axis}
          strokeWidth={1.4}
        />
      )}
      {axisX !== null && (
        <line
          x1={r(axisX)}
          y1={PAD.top}
          x2={r(axisX)}
          y2={PAD.top + PLOT_H}
          stroke={FIG.axis}
          strokeWidth={1.4}
        />
      )}

      {xTicks.map((t, i) =>
        i % xLabelEvery === 0 && t !== 0 ? (
          <Label key={`lx${t}`} x={sx(t)} y={PAD.top + PLOT_H + 14} size={11} fill={FIG.inkFaint}>
            {num(t)}
          </Label>
        ) : null,
      )}
      {yTicks.map((t, i) =>
        i % yLabelEvery === 0 && t !== 0 ? (
          <Label key={`ly${t}`} x={PAD.left - 10} y={sy(t)} anchor="end" size={11} fill={FIG.inkFaint}>
            {num(t)}
          </Label>
        ) : null,
      )}

      {/* Slope triangle sits under the curves so the line stays on top of it. */}
      {spec.slopeTriangle &&
        (() => {
          const curve = spec.curves[spec.slopeTriangle.curveIndex];
          if (!curve || curve.type !== 'linear') return null;
          const { fromX, toX } = spec.slopeTriangle;
          const m = curve.m ?? 0;
          const yA = m * fromX + curve.c;
          const yB = m * toX + curve.c;
          return (
            <g>
              <path
                d={`M ${r(sx(fromX))} ${r(sy(yA))} L ${r(sx(toX))} ${r(sy(yA))} L ${r(sx(toX))} ${r(sy(yB))} Z`}
                fill={FIG.accent}
                fillOpacity={0.28}
                stroke={FIG.accentEdge}
                strokeWidth={1.4}
              />
              <Label
                x={(sx(fromX) + sx(toX)) / 2}
                y={sy(yA) + (yB > yA ? -12 : 14)}
                size={12}
                fill={FIG.accentStrong}
                weight={600}
              >
                {`run ${num(toX - fromX)}`}
              </Label>
              <Label
                x={sx(toX) + 8}
                y={(sy(yA) + sy(yB)) / 2}
                anchor="start"
                size={12}
                fill={FIG.accentStrong}
                weight={600}
              >
                {`rise ${num(yB - yA)}`}
              </Label>
            </g>
          );
        })()}

      {spec.curves.map((curve, i) => (
        <g key={`c${i}`}>
          <path
            d={curvePathForTest(curve, x0, x1, y0, y1, sx, sy)}
            fill="none"
            stroke={i === 0 ? FIG.solid : FIG.accentEdge}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
          {curve.label && (
            <Label
              x={PAD.left + plotW - 8}
              y={PAD.top + 14 + i * 18}
              anchor="end"
              size={12}
              fill={i === 0 ? FIG.solid : FIG.accentEdge}
              weight={600}
              math
            >
              {curve.label}
            </Label>
          )}
        </g>
      ))}

      {spec.points.map((p, i) => (
        <g key={`p${i}`}>
          <circle
            cx={r(sx(p.x))}
            cy={r(sy(p.y))}
            r={p.highlight ? 5.5 : 4}
            fill={p.highlight ? FIG.accentStrong : FIG.solid}
            stroke={FIG.surface}
            strokeWidth={1.5}
          />
          {p.label && (
            <Label x={sx(p.x) + 9} y={sy(p.y) - 10} anchor="start" size={12} fill={FIG.ink} math>
              {p.label}
            </Label>
          )}
        </g>
      ))}
    </Figure>
  );
}

/**
 * Sample the curve across the visible x-range, clipping to the visible y-range.
 *
 * Clipping has to interpolate to the boundary rather than simply drop out-of-range
 * samples. Dropping them meant a line steep enough to leave the top and bottom of the
 * window — `y = 2x + 1` on a ±4 view, which is about as ordinary as a Secondary 2 example
 * gets — kept only the samples in the middle, and with two samples that left a path with a
 * single point in it. The line silently did not draw at all.
 */
export function curvePathForTest(
  curve: Curve,
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  sx: (x: number) => number,
  sy: (y: number) => number,
): string {
  const steps = curve.type === 'linear' ? 64 : 240;
  const evaluate = (x: number) =>
    curve.type === 'linear'
      ? (curve.m ?? 0) * x + curve.c
      : (curve.a ?? 0) * x * x + (curve.b ?? 0) * x + curve.c;

  const inside = (y: number) => y >= y0 && y <= y1;

  /** Walk to the boundary between an inside and an outside sample. */
  const crossing = (xIn: number, xOut: number): number => {
    let lo = xIn;
    let hi = xOut;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (inside(evaluate(mid))) lo = mid;
      else hi = mid;
    }
    return lo;
  };

  let d = '';
  let drawing = false;
  let prevX: number | null = null;

  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const y = evaluate(x);

    if (inside(y)) {
      if (!drawing && prevX !== null) {
        // Entering the window: start at the boundary, not at the first sample inside it.
        const edge = crossing(x, prevX);
        d += `M ${r(sx(edge))} ${r(sy(evaluate(edge)))} `;
        drawing = true;
        d += `L ${r(sx(x))} ${r(sy(y))} `;
      } else {
        d += `${drawing ? 'L' : 'M'} ${r(sx(x))} ${r(sy(y))} `;
        drawing = true;
      }
    } else if (drawing && prevX !== null) {
      // Leaving the window: run out to the boundary before breaking.
      const edge = crossing(prevX, x);
      d += `L ${r(sx(edge))} ${r(sy(evaluate(edge)))} `;
      drawing = false;
    }

    prevX = x;
  }

  return d.trim();
}

function describe(spec: CoordinatePlaneSpec): string {
  const parts: string[] = [
    `Coordinate plane from x = ${num(spec.xMin)} to ${num(spec.xMax)}, ` +
      `y = ${num(spec.yMin)} to ${num(spec.yMax)}.`,
  ];

  for (const curve of spec.curves) {
    parts.push(
      curve.type === 'linear'
        ? `Line y = ${num(curve.m ?? 0)}x + ${num(curve.c)}.`
        : `Parabola y = ${num(curve.a ?? 0)}x squared + ${num(curve.b ?? 0)}x + ${num(curve.c)}.`,
    );
  }

  for (const p of spec.points) {
    parts.push(`Point ${p.label ? `${p.label} ` : ''}at (${num(p.x)}, ${num(p.y)}).`);
  }

  return parts.join(' ');
}
