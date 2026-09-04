'use client';

import type { AngleDiagramSpec } from '@/lib/visual/spec';
import { Figure, FIG, Label, num, r } from './primitives';

/**
 * Points, lines and marked angles.
 *
 * Tick marks and arrowheads are the notation, not decoration: matching ticks assert equal
 * lengths and matching arrows assert parallel lines, which is exactly what a congruence
 * argument or an F/Z/C angle-chase is built from. A diagram that merely looks parallel
 * asserts nothing.
 *
 * Spec coordinates run -100..100 with y upward, the way a student would set out a sketch;
 * they are mapped to SVG's downward y here.
 */

const PAD = 44;
const ARC_R = 30;

export function AngleDiagram({ spec }: { spec: AngleDiagramSpec }) {
  const xs = spec.points.map((p) => p.x);
  const ys = spec.points.map((p) => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const spanX = Math.max(1, maxX - minX);
  const spanY = Math.max(1, maxY - minY);

  const plotW = FIG.width - PAD * 2;
  // One scale for both axes, or a right angle would not look like one.
  const scale = Math.min(plotW / spanX, 300 / spanY);
  const height = spanY * scale + PAD * 2;

  const sx = (x: number) => PAD + (x - minX) * scale + (plotW - spanX * scale) / 2;
  const sy = (y: number) => PAD + (maxY - y) * scale;

  const byId = new Map(spec.points.map((p) => [p.id, p]));
  const at = (id: string) => {
    const p = byId.get(id);
    return p ? { x: sx(p.x), y: sy(p.y) } : null;
  };

  return (
    <Figure title={spec.title} caption={spec.caption} height={height} description={describe(spec)}>
      {spec.segments.map((seg, i) => {
        const a = at(seg.from);
        const b = at(seg.to);
        if (!a || !b) return null;

        // A ray runs past its endpoint, because that is what makes it a ray.
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const extend = seg.style === 'ray' ? 26 : 0;
        const end = { x: b.x + (dx / len) * extend, y: b.y + (dy / len) * extend };

        return (
          <g key={`s${i}`}>
            <line
              x1={r(a.x)}
              y1={r(a.y)}
              x2={r(end.x)}
              y2={r(end.y)}
              stroke={FIG.ink}
              strokeWidth={1.6}
              strokeDasharray={seg.style === 'dashed' ? '6 4' : undefined}
              strokeLinecap="round"
            />
            {tickMarks(a, b, seg.ticks)}
            {parallelArrows(a, b, seg.arrows)}
          </g>
        );
      })}

      {spec.angles.map((angle, i) => {
        const v = at(angle.vertex);
        const a = at(angle.from);
        const b = at(angle.to);
        if (!v || !a || !b) return null;

        const a1 = Math.atan2(a.y - v.y, a.x - v.x);
        const a2 = Math.atan2(b.y - v.y, b.x - v.x);

        let sweep = a2 - a1;
        while (sweep <= -Math.PI) sweep += 2 * Math.PI;
        while (sweep > Math.PI) sweep -= 2 * Math.PI;

        const mid = a1 + sweep / 2;
        const isRight = Math.abs(Math.abs(sweep) - Math.PI / 2) < 0.02;
        const colour = angle.highlight ? FIG.accentStrong : FIG.solid;

        return (
          <g key={`a${i}`}>
            {isRight ? (
              rightAngleMark(v, a1, a2, colour)
            ) : (
              <path
                d={arcPath(v, a1, a1 + sweep, ARC_R)}
                fill="none"
                stroke={colour}
                strokeWidth={1.6}
              />
            )}
            {!isRight && (
              <Label
                x={v.x + Math.cos(mid) * (ARC_R + 17)}
                y={v.y + Math.sin(mid) * (ARC_R + 17)}
                size={13}
                fill={colour}
                weight={600}
                math
              >
                {angle.label}
              </Label>
            )}
          </g>
        );
      })}

      {spec.points.map((p) => (
        <g key={p.id}>
          <circle cx={r(sx(p.x))} cy={r(sy(p.y))} r={3.4} fill={FIG.ink} />
          {p.label && (
            <Label x={sx(p.x)} y={sy(p.y) - 15} size={13} fill={FIG.inkSoft} weight={600} math>
              {p.label}
            </Label>
          )}
        </g>
      ))}
    </Figure>
  );
}

interface Pt {
  x: number;
  y: number;
}

/** Matching tick counts assert equal lengths. */
function tickMarks(a: Pt, b: Pt, count: number) {
  if (count === 0) return null;

  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const ux = dx / len;
  const uy = dy / len;

  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const offset = (i - (count - 1) / 2) * 5;
        const cx = mx + ux * offset;
        const cy = my + uy * offset;
        return (
          <line
            key={i}
            x1={r(cx - nx * 6)}
            y1={r(cy - ny * 6)}
            x2={r(cx + nx * 6)}
            y2={r(cy + ny * 6)}
            stroke={FIG.ink}
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

/** Matching arrow counts assert parallel lines. */
function parallelArrows(a: Pt, b: Pt, count: number) {
  if (count === 0) return null;

  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const nx = -dy / len;
  const ny = dx / len;

  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const offset = (i - (count - 1) / 2) * 8;
        const tipX = mx + ux * (offset + 5);
        const tipY = my + uy * (offset + 5);
        const backX = mx + ux * (offset - 3);
        const backY = my + uy * (offset - 3);
        return (
          <path
            key={i}
            d={
              `M ${r(backX + nx * 5)} ${r(backY + ny * 5)} L ${r(tipX)} ${r(tipY)} ` +
              `L ${r(backX - nx * 5)} ${r(backY - ny * 5)}`
            }
            fill="none"
            stroke={FIG.ink}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </g>
  );
}

/** A right angle gets the square, never an arc — that is the convention students read. */
function rightAngleMark(v: Pt, a1: number, a2: number, colour: string) {
  const s = 15;
  const p1 = { x: v.x + Math.cos(a1) * s, y: v.y + Math.sin(a1) * s };
  const p2 = { x: v.x + Math.cos(a2) * s, y: v.y + Math.sin(a2) * s };
  const corner = { x: p1.x + p2.x - v.x, y: p1.y + p2.y - v.y };

  return (
    <path
      d={`M ${r(p1.x)} ${r(p1.y)} L ${r(corner.x)} ${r(corner.y)} L ${r(p2.x)} ${r(p2.y)}`}
      fill="none"
      stroke={colour}
      strokeWidth={1.6}
    />
  );
}

function arcPath(v: Pt, from: number, to: number, radius: number): string {
  const start = { x: v.x + Math.cos(from) * radius, y: v.y + Math.sin(from) * radius };
  const end = { x: v.x + Math.cos(to) * radius, y: v.y + Math.sin(to) * radius };
  const large = Math.abs(to - from) > Math.PI ? 1 : 0;
  const sweep = to > from ? 1 : 0;
  return `M ${r(start.x)} ${r(start.y)} A ${radius} ${radius} 0 ${large} ${sweep} ${r(end.x)} ${r(end.y)}`;
}

function describe(spec: AngleDiagramSpec): string {
  const parts: string[] = ['Geometric diagram.'];

  const named = spec.points.filter((p) => p.label);
  if (named.length > 0) parts.push(`Points ${named.map((p) => p.label).join(', ')}.`);

  const parallel = spec.segments.filter((s) => s.arrows > 0);
  if (parallel.length > 1) parts.push(`${parallel.length} lines marked parallel.`);

  const equal = spec.segments.filter((s) => s.ticks > 0);
  if (equal.length > 1) parts.push(`${equal.length} sides marked equal.`);

  for (const a of spec.angles) {
    parts.push(
      `Angle ${a.from}${a.vertex}${a.to} is ${a.value !== undefined ? `${num(a.value)} degrees` : a.label}.`,
    );
  }

  return parts.join(' ');
}
