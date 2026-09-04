'use client';

import type { CrossFrameSpec } from '@/lib/visual/spec';
import { Figure, FIG, Label, num, signed, r } from './primitives';

/**
 * The X-method frame for non-monic quadratics.
 *
 * A monic quadratic yields to guessing factor pairs; $ax^2 + bx + c$ with $a \neq 1$ does
 * not, because the leading coefficient has to be split across both brackets. The frame
 * makes the search systematic: the left column multiplies to $a$, the right to $c$, and the
 * crossing products have to add to $b$.
 *
 * A candidate that misses on $b$ is drawn as a miss rather than hidden — ruling one out is
 * the work, and a frame that only ever shows the answer teaches nothing about the search.
 */

const PAD = 20;
const COL_GAP = 190;

export function CrossFrame({ spec }: { spec: CrossFrameSpec }) {
  const height = 260;
  const cx = FIG.width / 2;
  const leftX = cx - COL_GAP / 2;
  const rightX = cx + COL_GAP / 2;
  const topY = 96;
  const botY = 196;

  const attempt = spec.attempt;
  const cross = attempt ? attempt.topLeft * attempt.bottomRight + attempt.topRight * attempt.bottomLeft : null;
  const hits = cross !== null && Math.abs(cross - spec.b) < 1e-9;

  return (
    <Figure
      title={spec.title}
      caption={spec.caption}
      height={height}
      description={describe(spec)}
      footnote={
        attempt
          ? undefined
          : 'Left column multiplies to a, right column to c, and the two crossing products add to b.'
      }
    >
      {/* The quadratic being factorised. */}
      <Label x={cx} y={PAD + 12} size={19} fill={FIG.ink} math>
        {`${quadratic(spec)}`}
      </Label>

      {/* Column captions. */}
      <Label x={leftX} y={64} size={12} fill={FIG.inkFaint} weight={600}>
        {`× to ${num(spec.a)}`}
      </Label>
      <Label x={rightX} y={64} size={12} fill={FIG.inkFaint} weight={600}>
        {`× to ${num(spec.c)}`}
      </Label>

      {attempt ? (
        <>
          {/* Crossing lines drawn under the values. */}
          <line
            x1={leftX + 26}
            y1={topY + 8}
            x2={rightX - 26}
            y2={botY - 8}
            stroke={hits ? FIG.accentEdge : FIG.stroke}
            strokeWidth={1.5}
            strokeDasharray="5 4"
          />
          <line
            x1={leftX + 26}
            y1={botY - 8}
            x2={rightX - 26}
            y2={topY + 8}
            stroke={hits ? FIG.accentEdge : FIG.stroke}
            strokeWidth={1.5}
            strokeDasharray="5 4"
          />

          <Cell x={leftX} y={topY} value={attempt.topLeft} suffix="x" />
          <Cell x={rightX} y={topY} value={attempt.topRight} />
          <Cell x={leftX} y={botY} value={attempt.bottomLeft} suffix="x" />
          <Cell x={rightX} y={botY} value={attempt.bottomRight} />

          {/* The verdict, stated as arithmetic the student can check. */}
          <Label
            x={cx}
            y={height - 26}
            size={14}
            fill={hits ? FIG.accentStrong : FIG.inkSoft}
            weight={hits ? 600 : 400}
          >
            {`${num(attempt.topLeft)}×${num(attempt.bottomRight)} + ${num(attempt.topRight)}×${num(
              attempt.bottomLeft,
            )} = ${num(cross as number)}${hits ? '  ✓' : `  (needs ${num(spec.b)})`}`}
          </Label>
        </>
      ) : (
        <>
          <EmptyCell x={leftX} y={topY} />
          <EmptyCell x={rightX} y={topY} />
          <EmptyCell x={leftX} y={botY} />
          <EmptyCell x={rightX} y={botY} />
          <Label x={cx} y={height - 26} size={13} fill={FIG.inkFaint}>
            {`the crossing products must add to ${num(spec.b)}`}
          </Label>
        </>
      )}
    </Figure>
  );
}

function Cell({ x, y, value, suffix }: { x: number; y: number; value: number; suffix?: string }) {
  return (
    <g>
      <rect
        x={r(x - 42)}
        y={r(y - 20)}
        width={84}
        height={40}
        rx={6}
        fill={FIG.known}
        stroke={FIG.knownEdge}
        strokeWidth={1.25}
      />
      <Label x={x} y={y} size={16} fill={FIG.ink} math>
        {`${num(value)}${suffix ?? ''}`}
      </Label>
    </g>
  );
}

function EmptyCell({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect
        x={r(x - 42)}
        y={r(y - 20)}
        width={84}
        height={40}
        rx={6}
        fill={FIG.sunk}
        stroke={FIG.stroke}
        strokeWidth={1.25}
        strokeDasharray="4 3"
      />
      <Label x={x} y={y} size={18} fill={FIG.inkFaint}>
        ?
      </Label>
    </g>
  );
}

export function quadratic(spec: { a: number; b: number; c: number }): string {
  const lead = spec.a === 1 ? '' : spec.a === -1 ? '−' : num(spec.a);
  return `${lead}x² ${signed(spec.b)}x ${signed(spec.c)}`;
}

function describe(spec: CrossFrameSpec): string {
  const base = `Cross-multiplication frame for ${quadratic(spec)}.`;
  if (!spec.attempt) return `${base} The frame is empty.`;
  const a = spec.attempt;
  return (
    `${base} Trying (${num(a.topLeft)}x ${signed(a.topRight)})(${num(a.bottomLeft)}x ` +
    `${signed(a.bottomRight)}).`
  );
}
