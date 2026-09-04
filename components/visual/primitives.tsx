'use client';

import type { ReactNode } from 'react';

/**
 * Shared furniture for every figure, so eight renderers look like one hand drew them.
 *
 * Colour comes from the theme tokens rather than literals, which is what lets a figure
 * survive the dark theme without a second palette. Sage carries structure and knowns, clay
 * carries the thing under discussion, ink carries labels.
 */

export const FIG = {
  /** Every figure is authored against this width and scales by viewBox. */
  width: 720,
  stroke: 'var(--color-line-strong)',
  axis: 'var(--color-ink-faint)',
  ink: 'var(--color-ink)',
  inkSoft: 'var(--color-ink-soft)',
  inkFaint: 'var(--color-ink-faint)',
  known: 'var(--color-sage-100)',
  knownEdge: 'var(--color-sage-400)',
  knownText: 'var(--color-sage-700)',
  solid: 'var(--color-sage-500)',
  solidEdge: 'var(--color-sage-600)',
  accent: 'var(--color-clay-300)',
  accentEdge: 'var(--color-clay-500)',
  accentStrong: 'var(--color-clay-600)',
  surface: 'var(--color-surface)',
  sunk: 'var(--color-surface-sunk)',
} as const;

export const LABEL_STYLE = { fontFamily: 'var(--font-sans)' } as const;
export const MATH_STYLE = { fontFamily: 'var(--font-serif)', fontStyle: 'italic' } as const;

export interface FigureProps {
  title?: string | undefined;
  caption?: string | undefined;
  /** Full-width height of the drawing area, in the same units as `FIG.width`. */
  height: number;
  /** Description for screen readers. A figure nobody can hear is not accessible. */
  description: string;
  footnote?: string | undefined;
  children: ReactNode;
}

export function Figure({ title, caption, height, description, footnote, children }: FigureProps) {
  return (
    <figure className="w-full">
      {title && (
        <figcaption className="mb-2 font-serif text-[15px] font-medium text-ink">{title}</figcaption>
      )}

      <svg
        viewBox={`0 0 ${FIG.width} ${height}`}
        className="w-full select-none overflow-visible"
        role="img"
        aria-label={description}
      >
        {children}
      </svg>

      {caption && <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{caption}</p>}
      {footnote && <p className="mt-2 text-[12px] text-ink-faint">{footnote}</p>}
    </figure>
  );
}

/** Plain label text. */
export function Label({
  x,
  y,
  children,
  anchor = 'middle',
  baseline = 'middle',
  size = 13,
  fill = FIG.ink,
  weight = 400,
  math = false,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  baseline?: 'middle' | 'hanging' | 'auto';
  size?: number;
  fill?: string;
  weight?: number;
  math?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline={baseline}
      fill={fill}
      fontSize={size}
      fontWeight={weight}
      style={math ? MATH_STYLE : LABEL_STYLE}
      className="pointer-events-none"
    >
      {children}
    </text>
  );
}

/** Round to keep generated path data readable and diffable. */
export function r(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Format a number for display: drop a trailing .0, keep two decimals otherwise. */
export function num(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return String(Math.round(n * 100) / 100);
}

/** Signed term for polynomial display, e.g. -3 -> "− 3". */
export function signed(n: number): string {
  return `${n < 0 ? '−' : '+'} ${num(Math.abs(n))}`;
}
