'use client';

import type { AlgebraTilesSpec } from '@/lib/visual/spec';
import { netTiles } from '@/lib/visual/validate';
import { Figure, FIG, Label, r } from './primitives';

/**
 * Concrete tiles for $x^2$, $x$ and $1$.
 *
 * Layout is computed here rather than specified by the model: the spec says which tiles
 * exist and what shape to make of them, and the geometry follows exactly. That keeps the
 * one property the manipulative depends on — an $x$ tile is exactly as long as the side of
 * an $x^2$ tile — true by construction rather than by the model getting coordinates right.
 *
 * The x-length is deliberately not a whole number of units. Make it exactly 4 and a student
 * reads $x = 4$ off the picture, which is the opposite of the point.
 */

const UNIT = 17;
const X_LEN = 3.4 * UNIT;
const GAP = 2.5;
const PAD = 24;

export function AlgebraTiles({ spec }: { spec: AlgebraTilesSpec }) {
  const placed = layout(spec);

  const maxX = placed.reduce((m, p) => Math.max(m, p.x + p.w), 0);
  const maxY = placed.reduce((m, p) => Math.max(m, p.y + p.h), 0);
  const height = maxY + PAD + (spec.arrangement === 'square' ? 30 : 12);

  const zeroPairs = spec.showZeroPairs ? pairUp(placed) : [];

  return (
    <Figure
      title={spec.title}
      caption={spec.caption}
      height={Math.max(140, height)}
      description={describe(spec)}
      footnote={
        spec.arrangement === 'square'
          ? 'The corner is left empty on purpose. What size square would close it?'
          : spec.arrangement === 'rectangle'
            ? 'The two sides of the completed rectangle are the factors.'
            : undefined
      }
    >
      {/* The gap a completed square would fill, drawn as an absence. */}
      {spec.arrangement === 'square' &&
        (() => {
          const corner = squareCorner(spec);
          if (!corner) return null;
          return (
            <rect
              x={r(corner.x)}
              y={r(corner.y)}
              width={r(corner.size)}
              height={r(corner.size)}
              fill={FIG.sunk}
              stroke={FIG.accentEdge}
              strokeWidth={1.5}
              strokeDasharray="5 4"
              rx={2}
            />
          );
        })()}

      {placed.map((p) => {
        const negative = p.sign === 'negative';
        const w = p.w - GAP;
        const h = p.h - GAP;

        return (
          <g key={p.key}>
            <rect
              x={r(p.x)}
              y={r(p.y)}
              width={r(w)}
              height={r(h)}
              rx={2.5}
              fill={negative ? FIG.accent : p.type === 'unit' ? FIG.known : FIG.solid}
              stroke={negative ? FIG.accentEdge : p.type === 'unit' ? FIG.knownEdge : FIG.solidEdge}
              strokeWidth={1.2}
            />
            {w > 20 && h > 12 && (
              <Label
                x={p.x + w / 2}
                y={p.y + h / 2}
                size={p.type === 'x2' ? 15 : 11}
                fill={negative ? FIG.ink : p.type === 'unit' ? FIG.knownText : 'var(--color-surface)'}
                math
              >
                {`${negative ? '−' : ''}${p.type === 'x2' ? 'x²' : p.type === 'x' ? 'x' : '1'}`}
              </Label>
            )}
          </g>
        );
      })}

      {zeroPairs.map(([a, b], i) => (
        <line
          key={`z${i}`}
          x1={r(a.x + (a.w - GAP) / 2)}
          y1={r(a.y + (a.h - GAP) / 2)}
          x2={r(b.x + (b.w - GAP) / 2)}
          y2={r(b.y + (b.h - GAP) / 2)}
          stroke={FIG.accentStrong}
          strokeWidth={1.5}
          strokeDasharray="3 3"
          opacity={0.8}
        />
      ))}

      {/* Side labels, so a completed square reads as (x + b/2)². */}
      {spec.arrangement === 'square' &&
        (() => {
          const half = Math.abs(netTiles(spec, 'x')) / 2;
          if (half === 0 || maxX === 0) return null;
          return (
            <Label x={maxX / 2} y={maxY + 20} size={12} fill={FIG.accentStrong} weight={600} math>
              {`x + ${half % 1 === 0 ? half : half.toFixed(1)}`}
            </Label>
          );
        })()}
    </Figure>
  );
}

// ---------------------------------------------------------------------------

interface Placed {
  key: string;
  type: 'x2' | 'x' | 'unit';
  sign: 'positive' | 'negative';
  x: number;
  y: number;
  w: number;
  h: number;
}

function expand(spec: AlgebraTilesSpec): Array<{ type: Placed['type']; sign: Placed['sign'] }> {
  const out: Array<{ type: Placed['type']; sign: Placed['sign'] }> = [];
  for (const group of spec.tiles) {
    for (let i = 0; i < group.count; i++) out.push({ type: group.type, sign: group.sign });
  }
  return out;
}

function layout(spec: AlgebraTilesSpec): Placed[] {
  if (spec.arrangement === 'square') return layoutSquare(spec);
  if (spec.arrangement === 'rectangle') return layoutRectangle(spec);
  return layoutLoose(spec);
}

/**
 * The L-shape of completing the square: the x² tile, then the x tiles split evenly down the
 * right side and along the bottom, leaving the corner open.
 */
function layoutSquare(spec: AlgebraTilesSpec): Placed[] {
  const out: Placed[] = [];
  const xCount = Math.abs(netTiles(spec, 'x'));
  const sign: Placed['sign'] = netTiles(spec, 'x') < 0 ? 'negative' : 'positive';

  out.push({ key: 'x2', type: 'x2', sign: 'positive', x: PAD, y: PAD, w: X_LEN, h: X_LEN });

  const perSide = Math.floor(xCount / 2);
  const leftover = xCount - perSide * 2;

  for (let i = 0; i < perSide; i++) {
    // Down the right edge: rotated, so its long side matches the x² side.
    out.push({
      key: `xr${i}`,
      type: 'x',
      sign,
      x: PAD + X_LEN + i * UNIT,
      y: PAD,
      w: UNIT,
      h: X_LEN,
    });
    // Along the bottom edge.
    out.push({
      key: `xb${i}`,
      type: 'x',
      sign,
      x: PAD,
      y: PAD + X_LEN + i * UNIT,
      w: X_LEN,
      h: UNIT,
    });
  }

  // An odd tile cannot be split, so it sits apart — the visual form of "b/2 is a fraction".
  if (leftover > 0) {
    out.push({
      key: 'x-odd',
      type: 'x',
      sign,
      x: PAD + X_LEN + perSide * UNIT + 26,
      y: PAD + X_LEN + perSide * UNIT + 26,
      w: X_LEN,
      h: UNIT,
    });
  }

  return out;
}

/** Factorisation: x² tiles, then x tiles as a border, then units filling the corner. */
function layoutRectangle(spec: AlgebraTilesSpec): Placed[] {
  const out: Placed[] = [];
  const x2 = Math.max(0, netTiles(spec, 'x2'));
  const xCount = Math.abs(netTiles(spec, 'x'));
  const xSign: Placed['sign'] = netTiles(spec, 'x') < 0 ? 'negative' : 'positive';
  const units = Math.abs(netTiles(spec, 'unit'));
  const unitSign: Placed['sign'] = netTiles(spec, 'unit') < 0 ? 'negative' : 'positive';

  for (let i = 0; i < x2; i++) {
    out.push({
      key: `x2-${i}`,
      type: 'x2',
      sign: 'positive',
      x: PAD + i * X_LEN,
      y: PAD,
      w: X_LEN,
      h: X_LEN,
    });
  }

  const bodyW = Math.max(1, x2) * X_LEN;

  // Split the x tiles between the right edge and the bottom edge, favouring the bottom so
  // the completed shape stays close to a rectangle.
  const down = Math.min(xCount, Math.ceil(xCount / 2));
  const across = xCount - down;

  for (let i = 0; i < across; i++) {
    out.push({
      key: `xr-${i}`,
      type: 'x',
      sign: xSign,
      x: PAD + bodyW + i * UNIT,
      y: PAD,
      w: UNIT,
      h: X_LEN,
    });
  }

  for (let i = 0; i < down; i++) {
    out.push({
      key: `xb-${i}`,
      type: 'x',
      sign: xSign,
      x: PAD,
      y: PAD + X_LEN + i * UNIT,
      w: X_LEN,
      h: UNIT,
    });
  }

  const cornerX = PAD + bodyW;
  const cornerY = PAD + X_LEN;
  const perRow = Math.max(1, across);

  for (let i = 0; i < units; i++) {
    out.push({
      key: `u-${i}`,
      type: 'unit',
      sign: unitSign,
      x: cornerX + (i % perRow) * UNIT,
      y: cornerY + Math.floor(i / perRow) * UNIT,
      w: UNIT,
      h: UNIT,
    });
  }

  return out;
}

/** A workbench: tiles grouped by type in rows, nothing implied about arrangement. */
function layoutLoose(spec: AlgebraTilesSpec): Placed[] {
  const out: Placed[] = [];
  const tiles = expand(spec);
  const maxRowW = 620;

  let x = PAD;
  let y = PAD;
  let rowH = 0;
  let lastType: string | null = null;

  for (const [i, tile] of tiles.entries()) {
    const w = tile.type === 'x2' ? X_LEN : tile.type === 'x' ? X_LEN : UNIT;
    const h = tile.type === 'x2' ? X_LEN : UNIT;

    // Start a new row when the type changes, so like tiles read as a group.
    if (lastType !== null && lastType !== `${tile.type}${tile.sign}`) {
      x = PAD;
      y += rowH + 10;
      rowH = 0;
    } else if (x + w > maxRowW) {
      x = PAD;
      y += rowH + 6;
      rowH = 0;
    }

    out.push({ key: `t${i}`, type: tile.type, sign: tile.sign, x, y, w, h });
    x += w + 4;
    rowH = Math.max(rowH, h);
    lastType = `${tile.type}${tile.sign}`;
  }

  return out;
}

function squareCorner(spec: AlgebraTilesSpec): { x: number; y: number; size: number } | null {
  const perSide = Math.floor(Math.abs(netTiles(spec, 'x')) / 2);
  if (perSide === 0) return null;
  return { x: PAD + X_LEN, y: PAD + X_LEN, size: perSide * UNIT };
}

function pairUp(placed: Placed[]): Array<[Placed, Placed]> {
  const pairs: Array<[Placed, Placed]> = [];

  for (const type of ['x2', 'x', 'unit'] as const) {
    const pos = placed.filter((p) => p.type === type && p.sign === 'positive');
    const neg = placed.filter((p) => p.type === type && p.sign === 'negative');
    for (let i = 0; i < Math.min(pos.length, neg.length); i++) {
      pairs.push([pos[i] as Placed, neg[i] as Placed]);
    }
  }

  return pairs;
}

function describe(spec: AlgebraTilesSpec): string {
  const terms = (['x2', 'x', 'unit'] as const)
    .map((t) => ({ t, n: netTiles(spec, t) }))
    .filter(({ n }) => n !== 0)
    .map(({ t, n }) => `${n} ${t === 'x2' ? 'x squared' : t === 'x' ? 'x' : 'unit'}`);

  return (
    `Algebra tiles, arranged ${spec.arrangement === 'loose' ? 'loosely' : `as a ${spec.arrangement}`}. ` +
    `${terms.length > 0 ? terms.join(', ') : 'No net tiles'}.`
  );
}
