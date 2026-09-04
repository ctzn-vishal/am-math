'use client';

import type { StatPlotSpec } from '@/lib/visual/spec';
import { fiveNumberSummary } from '@/lib/visual/validate';
import { Figure, FIG, Label, num, r } from './primitives';

/**
 * Box plots, histograms and dot plots.
 *
 * The box plot exists to make spread visible rather than computed: the box *is* the middle
 * half of the data, and shading it is what turns the IQR from a subtraction into a length
 * you can point at.
 */

const PAD = { top: 24, right: 40, bottom: 42, left: 40 };

export function StatPlot({ spec }: { spec: StatPlotSpec }) {
  const height = spec.plot === 'box' ? 190 : 260;
  const plotW = FIG.width - PAD.left - PAD.right;
  const plotH = height - PAD.top - PAD.bottom;

  const summary: Summary | null =
    spec.summary ?? (spec.values.length > 0 ? (fiveNumberSummary(spec.values) ?? null) : null);

  const domain = axisDomain(spec, summary);
  const sx = (v: number) => PAD.left + ((v - domain[0]) / (domain[1] - domain[0])) * plotW;

  return (
    <Figure title={spec.title} caption={spec.caption} height={height} description={describe(spec, summary)}>
      {/* Axis */}
      <line
        x1={PAD.left}
        y1={PAD.top + plotH}
        x2={PAD.left + plotW}
        y2={PAD.top + plotH}
        stroke={FIG.axis}
        strokeWidth={1.4}
      />
      {axisTicks(domain).map((t) => (
        <g key={t}>
          <line
            x1={r(sx(t))}
            y1={PAD.top + plotH}
            x2={r(sx(t))}
            y2={PAD.top + plotH + 5}
            stroke={FIG.axis}
            strokeWidth={1.2}
          />
          <Label x={sx(t)} y={PAD.top + plotH + 16} size={11} fill={FIG.inkFaint}>
            {num(t)}
          </Label>
        </g>
      ))}
      {spec.axisLabel && (
        <Label x={PAD.left + plotW / 2} y={height - 8} size={12} fill={FIG.inkSoft}>
          {spec.axisLabel}
        </Label>
      )}

      {spec.plot === 'box' && summary && <Box summary={summary} sx={sx} highlightIqr={spec.highlightIqr} />}
      {spec.plot === 'histogram' && <Histogram spec={spec} sx={sx} plotH={plotH} />}
      {spec.plot === 'dot' && <Dots spec={spec} sx={sx} plotH={plotH} />}
    </Figure>
  );
}

type Summary = NonNullable<StatPlotSpec['summary']>;

function Box({
  summary,
  sx,
  highlightIqr,
}: {
  summary: Summary;
  sx: (v: number) => number;
  highlightIqr: boolean;
}) {
  const midY = PAD.top + 46;
  const h = 46;

  return (
    <g>
      {/* Whiskers */}
      <line
        x1={r(sx(summary.min))}
        y1={r(midY)}
        x2={r(sx(summary.q1))}
        y2={r(midY)}
        stroke={FIG.ink}
        strokeWidth={1.5}
      />
      <line
        x1={r(sx(summary.q3))}
        y1={r(midY)}
        x2={r(sx(summary.max))}
        y2={r(midY)}
        stroke={FIG.ink}
        strokeWidth={1.5}
      />
      {[summary.min, summary.max].map((v, i) => (
        <line
          key={i}
          x1={r(sx(v))}
          y1={r(midY - h / 3)}
          x2={r(sx(v))}
          y2={r(midY + h / 3)}
          stroke={FIG.ink}
          strokeWidth={1.5}
        />
      ))}

      {/* The box is the middle half of the data. */}
      <rect
        x={r(sx(summary.q1))}
        y={r(midY - h / 2)}
        width={r(sx(summary.q3) - sx(summary.q1))}
        height={h}
        fill={highlightIqr ? FIG.accent : FIG.known}
        fillOpacity={highlightIqr ? 0.5 : 1}
        stroke={highlightIqr ? FIG.accentEdge : FIG.knownEdge}
        strokeWidth={1.5}
        rx={2}
      />

      <line
        x1={r(sx(summary.median))}
        y1={r(midY - h / 2)}
        x2={r(sx(summary.median))}
        y2={r(midY + h / 2)}
        stroke={FIG.solidEdge}
        strokeWidth={2.4}
      />

      {highlightIqr && (
        <Label
          x={(sx(summary.q1) + sx(summary.q3)) / 2}
          y={midY + h / 2 + 18}
          size={12}
          fill={FIG.accentStrong}
          weight={600}
        >
          {`IQR = ${num(summary.q3 - summary.q1)}`}
        </Label>
      )}

      {(
        [
          ['min', summary.min],
          ['Q1', summary.q1],
          ['med', summary.median],
          ['Q3', summary.q3],
          ['max', summary.max],
        ] as const
      ).map(([name, v]) => (
        <Label key={name} x={sx(v)} y={midY - h / 2 - 12} size={11} fill={FIG.inkFaint}>
          {`${name} ${num(v)}`}
        </Label>
      ))}
    </g>
  );
}

function Histogram({
  spec,
  sx,
  plotH,
}: {
  spec: StatPlotSpec;
  sx: (v: number) => number;
  plotH: number;
}) {
  const bins = spec.bins ?? autoBins(spec.values);
  if (bins.length === 0) return null;

  const maxF = Math.max(...bins.map((b) => b.frequency), 1);

  return (
    <g>
      {bins.map((bin, i) => {
        const x = sx(bin.from);
        const w = sx(bin.to) - x;
        const h = (bin.frequency / maxF) * (plotH - 24);
        return (
          <g key={i}>
            <rect
              x={r(x)}
              y={r(PAD.top + plotH - h)}
              width={r(Math.max(1, w - 1.5))}
              height={r(h)}
              fill={FIG.known}
              stroke={FIG.knownEdge}
              strokeWidth={1.2}
            />
            {bin.frequency > 0 && (
              <Label x={x + w / 2} y={PAD.top + plotH - h - 9} size={11} fill={FIG.inkSoft}>
                {num(bin.frequency)}
              </Label>
            )}
          </g>
        );
      })}
    </g>
  );
}

function Dots({ spec, sx, plotH }: { spec: StatPlotSpec; sx: (v: number) => number; plotH: number }) {
  // Stack repeats, which is the whole point of a dot plot.
  const counts = new Map<number, number>();
  const placed: Array<{ v: number; level: number }> = [];

  for (const v of [...spec.values].sort((a, b) => a - b)) {
    const level = counts.get(v) ?? 0;
    counts.set(v, level + 1);
    placed.push({ v, level });
  }

  return (
    <g>
      {placed.map(({ v, level }, i) => (
        <circle
          key={i}
          cx={r(sx(v))}
          cy={r(PAD.top + plotH - 9 - level * 13)}
          r={5}
          fill={FIG.known}
          stroke={FIG.knownEdge}
          strokeWidth={1.3}
        />
      ))}
    </g>
  );
}

function axisDomain(spec: StatPlotSpec, summary: Summary | null): [number, number] {
  const values: number[] = [...spec.values];
  if (summary) values.push(summary.min, summary.max);
  if (spec.bins) for (const b of spec.bins) values.push(b.from, b.to);

  if (values.length === 0) return [0, 1];

  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = (hi - lo) * 0.08 || 1;
  return [lo - pad, hi + pad];
}

function axisTicks([lo, hi]: [number, number]): number[] {
  const span = hi - lo;
  const rough = span / 6;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rough)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= rough) ?? magnitude * 10;

  const out: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) {
    out.push(Math.round(v * 1e6) / 1e6);
  }
  return out;
}

/** Sturges' rule, when a histogram is asked for without bins. */
function autoBins(values: number[]): Array<{ from: number; to: number; frequency: number }> {
  if (values.length === 0) return [];

  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const count = Math.max(1, Math.ceil(Math.log2(values.length) + 1));
  const width = (hi - lo) / count || 1;

  return Array.from({ length: count }, (_, i) => {
    const from = lo + i * width;
    const to = from + width;
    return {
      from,
      to,
      frequency: values.filter((v) => (i === count - 1 ? v >= from && v <= to : v >= from && v < to))
        .length,
    };
  });
}

function describe(spec: StatPlotSpec, summary: Summary | null): string {
  if (spec.plot === 'box' && summary) {
    return (
      `Box plot. Minimum ${num(summary.min)}, lower quartile ${num(summary.q1)}, median ` +
      `${num(summary.median)}, upper quartile ${num(summary.q3)}, maximum ${num(summary.max)}. ` +
      `Interquartile range ${num(summary.q3 - summary.q1)}.`
    );
  }

  if (spec.plot === 'histogram') {
    const bins = spec.bins ?? autoBins(spec.values);
    return `Histogram with ${bins.length} bins: ${bins
      .map((b) => `${num(b.from)} to ${num(b.to)}, frequency ${num(b.frequency)}`)
      .join('; ')}.`;
  }

  return `Dot plot of ${spec.values.length} values from ${num(Math.min(...spec.values))} to ${num(
    Math.max(...spec.values),
  )}.`;
}

export const statPlotInternals = { autoBins, axisTicks, axisDomain };
