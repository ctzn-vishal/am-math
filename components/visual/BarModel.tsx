'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import type { BarModelSpec } from '@/lib/visual/spec';

/**
 * Singapore bar model.
 *
 * Drawn to scale from the spec, which the validator has already held to a single shared
 * scale — so proportions here are trustworthy by construction rather than by eye.
 *
 * When `onChange` is supplied the student can drag a block's right edge to resize it. That
 * produces a new spec, which goes back to the tutor as its next input: the model sees what
 * they built, not a description of it. This is the loop the old app could not close.
 */

const ROW_HEIGHT = 46;
const ROW_GAP = 18;
const LABEL_WIDTH = 116;
const TOTAL_WIDTH = 96;
const PAD_X = 12;
const PAD_TOP = 8;
const CANVAS_WIDTH = 720;

/** Minimum drag width, so a block can never be shrunk to something unclickable. */
const MIN_UNITS = 0.25;

interface Palette {
  fill: string;
  stroke: string;
  text: string;
}

const PALETTES: Record<'known' | 'unknown' | 'difference', Palette> = {
  known: { fill: 'var(--color-sage-100)', stroke: 'var(--color-sage-400)', text: 'var(--color-sage-700)' },
  unknown: { fill: 'var(--color-sage-500)', stroke: 'var(--color-sage-600)', text: 'var(--color-surface)' },
  difference: { fill: 'var(--color-clay-300)', stroke: 'var(--color-clay-500)', text: 'var(--color-ink)' },
};

export interface BarModelProps {
  spec: BarModelSpec;
  /** Omit for a read-only figure. Supplying it makes blocks draggable. */
  onChange?: (spec: BarModelSpec) => void;
}

export function BarModel({ spec, onChange }: BarModelProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drag, setDrag] = useState<{ rowId: string; segId: string } | null>(null);

  const interactive = onChange !== undefined;

  /** Widest row in spec units, so every row shares one pixel-per-unit scale. */
  const maxUnits = useMemo(
    () =>
      Math.max(
        1,
        ...spec.rows.map((row) => row.segments.reduce((sum, s) => sum + s.units, 0)),
      ),
    [spec.rows],
  );

  const barArea = CANVAS_WIDTH - LABEL_WIDTH - TOTAL_WIDTH - PAD_X * 2;
  const pxPerUnit = barArea / maxUnits;
  const height = PAD_TOP * 2 + spec.rows.length * ROW_HEIGHT + (spec.rows.length - 1) * ROW_GAP;

  /** Convert a pointer position to spec units, so drag maths stays in the spec's own terms. */
  const unitsAt = useCallback(
    (clientX: number, startX: number): number => {
      const svg = svgRef.current;
      if (!svg) return 0;
      const rect = svg.getBoundingClientRect();
      const scale = CANVAS_WIDTH / rect.width;
      const svgX = (clientX - rect.left) * scale;
      return (svgX - startX) / pxPerUnit;
    },
    [pxPerUnit],
  );

  const handleDrag = useCallback(
    (rowId: string, segId: string, segStartX: number) =>
      (event: React.PointerEvent<SVGRectElement>) => {
        if (!onChange) return;
        event.preventDefault();
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          // Not every pointer can be captured (synthetic events, some pen drivers). The
          // window-level listeners below carry the drag regardless.
        }
        setDrag({ rowId, segId });

        const move = (e: PointerEvent) => {
          const units = Math.max(MIN_UNITS, Math.round(unitsAt(e.clientX, segStartX) * 4) / 4);
          onChange({
            ...spec,
            rows: spec.rows.map((row) =>
              row.id !== rowId
                ? row
                : {
                    ...row,
                    segments: row.segments.map((seg) =>
                      seg.id === segId ? { ...seg, units } : seg,
                    ),
                  },
            ),
          });
        };

        const up = () => {
          setDrag(null);
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
      },
    [onChange, spec, unitsAt],
  );

  return (
    <figure className="w-full">
      {spec.title && (
        <figcaption className="mb-2 font-serif text-[15px] font-medium text-ink">
          {spec.title}
        </figcaption>
      )}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${CANVAS_WIDTH} ${height}`}
        className="w-full select-none overflow-visible"
        role="img"
        aria-label={describe(spec)}
      >
        {spec.rows.map((row, rowIndex) => {
          const y = PAD_TOP + rowIndex * (ROW_HEIGHT + ROW_GAP);
          let cursor = PAD_X + LABEL_WIDTH;
          const rowStart = cursor;

          const blocks = row.segments.map((seg) => {
            const x = cursor;
            const width = seg.units * pxPerUnit;
            cursor += width;
            return { seg, x, width };
          });

          const rowEnd = cursor;

          return (
            <g key={row.id}>
              <text
                x={PAD_X + LABEL_WIDTH - 12}
                y={y + ROW_HEIGHT / 2}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-ink-soft text-[13px]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {row.label}
              </text>

              {blocks.map(({ seg, x, width }) => {
                const palette = PALETTES[seg.role];
                const isDragging = drag?.rowId === row.id && drag.segId === seg.id;
                const showLabel = width > 26;

                return (
                  <g key={seg.id}>
                    <rect
                      x={x}
                      y={y}
                      width={Math.max(2, width - 2)}
                      height={ROW_HEIGHT}
                      rx={5}
                      fill={palette.fill}
                      stroke={palette.stroke}
                      strokeWidth={isDragging ? 2 : 1.25}
                    />

                    {showLabel && (
                      <text
                        x={x + width / 2 - 1}
                        y={y + ROW_HEIGHT / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={palette.text}
                        className="pointer-events-none text-[13px] font-medium"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {seg.label}
                      </text>
                    )}

                    {interactive && (
                      <rect
                        x={x + width - 7}
                        y={y}
                        width={12}
                        height={ROW_HEIGHT}
                        fill="transparent"
                        className="cursor-ew-resize"
                        onPointerDown={handleDrag(row.id, seg.id, x)}
                      >
                        {/*
                          One interpolated string, not text-around-an-expression: adjacent
                          text children inside an SVG <title> do not survive hydration.
                        */}
                        <title>{`Drag to resize ${seg.label}`}</title>
                      </rect>
                    )}

                    {interactive && (
                      <line
                        x1={x + width - 1}
                        y1={y + 9}
                        x2={x + width - 1}
                        y2={y + ROW_HEIGHT - 9}
                        stroke={palette.stroke}
                        strokeWidth={isDragging ? 2.5 : 1.5}
                        strokeLinecap="round"
                        opacity={isDragging ? 1 : 0.45}
                        className="pointer-events-none"
                      />
                    )}
                  </g>
                );
              })}

              {row.total && (
                <>
                  {/* A brace, so the total reads as spanning the row rather than following it. */}
                  <path
                    d={brace(rowStart, rowEnd, y + ROW_HEIGHT + 7)}
                    fill="none"
                    stroke="var(--color-line-strong)"
                    strokeWidth={1.25}
                  />
                  <text
                    x={rowEnd + 14}
                    y={y + ROW_HEIGHT / 2}
                    dominantBaseline="middle"
                    className="fill-ink text-[13px] font-semibold"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {row.total.label}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>

      {spec.caption && (
        <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{spec.caption}</p>
      )}

      {interactive && (
        <p className="mt-2 text-[12px] text-ink-faint">
          Drag the right edge of any block to resize it.
        </p>
      )}
    </figure>
  );
}

/** Downward-pointing brace spanning x0..x1 at height y. */
function brace(x0: number, x1: number, y: number): string {
  const mid = (x0 + x1) / 2;
  const drop = 5;
  return [
    `M ${x0} ${y}`,
    `v ${drop / 2}`,
    `q 0 ${drop / 2} ${drop} ${drop / 2}`,
    `H ${mid - drop}`,
    `q ${drop} 0 ${drop} ${drop / 2}`,
    `q 0 ${-drop / 2} ${drop} ${-drop / 2}`,
    `H ${x1 - drop}`,
    `q ${drop} 0 ${drop} ${-drop / 2}`,
    `v ${-drop / 2}`,
  ].join(' ');
}

/** Screen-reader description. A diagram nobody can hear is not accessible for being pretty. */
function describe(spec: BarModelSpec): string {
  const rows = spec.rows.map((row) => {
    const parts = row.segments.map((s) => s.label).join(', ');
    const total = row.total ? `, totalling ${row.total.label}` : '';
    return `${row.label}: ${parts}${total}`;
  });
  return `Bar model. ${spec.title ? `${spec.title}. ` : ''}${rows.join('. ')}.`;
}
