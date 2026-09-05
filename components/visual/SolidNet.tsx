'use client';

import type { SolidNetSpec } from '@/lib/visual/spec';
import { Figure, FIG, Label, num, r } from './primitives';

/**
 * A 3D solid, its unfolded net, or both side by side.
 *
 * The net is the point. Surface area is taught as a formula to memorise and forgotten
 * within a term; unfolded, it is visibly a circle plus a sector, or two circles plus a
 * rectangle, and the formula becomes something you could rebuild from the picture.
 *
 * The slant triangle serves the same purpose for $l = \sqrt{r^2 + h^2}$ — drawn inside the
 * cone, it is just Pythagoras, which the student already has.
 */

const PAD = 24;
const HEIGHT = 300;

export function SolidNet({ spec }: { spec: SolidNetSpec }) {
  const both = spec.view === 'both';
  const paneW = both ? (FIG.width - PAD * 3) / 2 : FIG.width - PAD * 2;
  const showSolid = spec.view === 'solid' || both;
  const showNet = spec.view === 'net' || both;

  return (
    <Figure
      title={spec.title}
      caption={spec.caption}
      height={HEIGHT}
      description={describe(spec)}
      footnote={dimensionSummary(spec)}
    >
      {showSolid && (
        <g transform={`translate(${PAD}, 0)`}>
          {both && (
            <Label x={paneW / 2} y={16} size={11} fill={FIG.inkFaint} weight={600}>
              SOLID
            </Label>
          )}
          <Solid spec={spec} w={paneW} />
        </g>
      )}

      {showNet && (
        <g transform={`translate(${both ? PAD * 2 + paneW : PAD}, 0)`}>
          {both && (
            <Label x={paneW / 2} y={16} size={11} fill={FIG.inkFaint} weight={600}>
              NET
            </Label>
          )}
          <Net spec={spec} w={paneW} />
        </g>
      )}
    </Figure>
  );
}

// ---------------------------------------------------------------------------

function Solid({ spec, w }: { spec: SolidNetSpec; w: number }) {
  const cx = w / 2;
  const d = spec.dimensions;

  const fill = FIG.known;
  const edge = FIG.knownEdge;

  // A figure captioned "r = 3, h = 4" has to actually be drawn 4:3, or a student reading
  // proportions off it is misled by the picture that was meant to ground the formula. The
  // available box is fitted to the true aspect ratio rather than filled.
  const box = fitToRatioForTest(d, w);
  const top = box.top;
  const bottom = box.top + box.height;
  const bodyH = box.height;

  switch (spec.solid) {
    case 'cylinder': {
      const rx = box.halfWidth;
      const ry = rx * 0.28;
      return (
        <g>
          <path
            d={`M ${r(cx - rx)} ${top} L ${r(cx - rx)} ${bottom} A ${r(rx)} ${r(ry)} 0 0 0 ${r(cx + rx)} ${bottom} L ${r(cx + rx)} ${top} Z`}
            fill={fill}
            stroke={edge}
            strokeWidth={1.5}
          />
          <ellipse cx={r(cx)} cy={top} rx={r(rx)} ry={r(ry)} fill={FIG.surface} stroke={edge} strokeWidth={1.5} />
          <path
            d={`M ${r(cx - rx)} ${bottom} A ${r(rx)} ${r(ry)} 0 0 0 ${r(cx + rx)} ${bottom}`}
            fill="none"
            stroke={edge}
            strokeWidth={1.5}
          />
          <path
            d={`M ${r(cx - rx)} ${bottom} A ${r(rx)} ${r(ry)} 0 0 1 ${r(cx + rx)} ${bottom}`}
            fill="none"
            stroke={edge}
            strokeWidth={1.2}
            strokeDasharray="5 4"
          />
          <Dim x1={cx + rx + 14} y1={top} x2={cx + rx + 14} y2={bottom} label={`h = ${num(d.height ?? 0)}`} vertical />
          <RadiusMark cx={cx} cy={top} rx={rx} label={`r = ${num(d.radius ?? 0)}`} />
        </g>
      );
    }

    case 'cone': {
      const rx = box.halfWidth;
      const ry = rx * 0.28;
      const apex = { x: cx, y: top };
      return (
        <g>
          <path
            d={`M ${r(apex.x)} ${r(apex.y)} L ${r(cx - rx)} ${bottom} A ${r(rx)} ${r(ry)} 0 0 0 ${r(cx + rx)} ${bottom} Z`}
            fill={fill}
            stroke={edge}
            strokeWidth={1.5}
          />
          <path
            d={`M ${r(cx - rx)} ${bottom} A ${r(rx)} ${r(ry)} 0 0 1 ${r(cx + rx)} ${bottom}`}
            fill="none"
            stroke={edge}
            strokeWidth={1.2}
            strokeDasharray="5 4"
          />

          {spec.showSlantTriangle && (
            <g>
              {/* Axis and radius, so l is visibly the hypotenuse of r and h. */}
              <line
                x1={r(cx)}
                y1={r(apex.y)}
                x2={r(cx)}
                y2={r(bottom)}
                stroke={FIG.accentEdge}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <line
                x1={r(cx)}
                y1={r(bottom)}
                x2={r(cx + rx)}
                y2={r(bottom)}
                stroke={FIG.accentEdge}
                strokeWidth={1.4}
              />
              <line
                x1={r(apex.x)}
                y1={r(apex.y)}
                x2={r(cx + rx)}
                y2={r(bottom)}
                stroke={FIG.accentStrong}
                strokeWidth={2}
              />
              <path
                d={`M ${r(cx)} ${r(bottom - 12)} L ${r(cx + 12)} ${r(bottom - 12)} L ${r(cx + 12)} ${r(bottom)}`}
                fill="none"
                stroke={FIG.accentEdge}
                strokeWidth={1.3}
              />
              <Label
                x={cx + rx / 2 + 14}
                y={(apex.y + bottom) / 2 - 6}
                size={12}
                fill={FIG.accentStrong}
                weight={600}
                math
              >
                {d.slant !== undefined ? `l = ${num(d.slant)}` : 'l'}
              </Label>
            </g>
          )}

          <Dim
            x1={cx - rx - 16}
            y1={top}
            x2={cx - rx - 16}
            y2={bottom}
            label={`h = ${num(d.height ?? 0)}`}
            vertical
          />
          <Label x={cx + rx / 2} y={bottom + 18} size={12} fill={FIG.inkSoft} math>
            {`r = ${num(d.radius ?? 0)}`}
          </Label>
        </g>
      );
    }

    case 'sphere':
    case 'hemisphere': {
      const rad = Math.min(w * 0.28, bodyH / 2 - 6);
      const cy = spec.solid === 'sphere' ? (top + bottom) / 2 : bottom - 10;
      return (
        <g>
          {spec.solid === 'sphere' ? (
            <circle cx={r(cx)} cy={r(cy)} r={r(rad)} fill={fill} stroke={edge} strokeWidth={1.5} />
          ) : (
            <path
              d={`M ${r(cx - rad)} ${r(cy)} A ${r(rad)} ${r(rad)} 0 0 1 ${r(cx + rad)} ${r(cy)} Z`}
              fill={fill}
              stroke={edge}
              strokeWidth={1.5}
            />
          )}
          <ellipse
            cx={r(cx)}
            cy={r(cy)}
            rx={r(rad)}
            ry={r(rad * 0.26)}
            fill="none"
            stroke={edge}
            strokeWidth={1.2}
            strokeDasharray="5 4"
          />
          <line
            x1={r(cx)}
            y1={r(cy)}
            x2={r(cx + rad)}
            y2={r(cy)}
            stroke={FIG.accentEdge}
            strokeWidth={1.5}
          />
          <Label x={cx + rad / 2} y={cy - 12} size={12} fill={FIG.accentStrong} weight={600} math>
            {`r = ${num(d.radius ?? 0)}`}
          </Label>
        </g>
      );
    }

    case 'cuboid': {
      const bw = Math.min(w * 0.44, 190);
      const bh = Math.min(bodyH * 0.6, 150);
      const dep = 42;
      const x = cx - bw / 2;
      const y = top + 26;
      return (
        <g>
          <rect x={r(x)} y={r(y + dep)} width={r(bw)} height={r(bh)} fill={fill} stroke={edge} strokeWidth={1.5} />
          <path
            d={`M ${r(x)} ${r(y + dep)} L ${r(x + dep)} ${r(y)} L ${r(x + bw + dep)} ${r(y)} L ${r(x + bw)} ${r(y + dep)} Z`}
            fill={FIG.sunk}
            stroke={edge}
            strokeWidth={1.5}
          />
          <path
            d={`M ${r(x + bw)} ${r(y + dep)} L ${r(x + bw + dep)} ${r(y)} L ${r(x + bw + dep)} ${r(y + bh)} L ${r(x + bw)} ${r(y + dep + bh)} Z`}
            fill={FIG.surface}
            stroke={edge}
            strokeWidth={1.5}
          />
          <Label x={x + bw / 2} y={y + dep + bh + 18} size={12} fill={FIG.inkSoft} math>
            {`l = ${num(d.length ?? 0)}`}
          </Label>
          <Label x={x - 14} y={y + dep + bh / 2} anchor="end" size={12} fill={FIG.inkSoft} math>
            {`h = ${num(d.height ?? 0)}`}
          </Label>
          <Label x={x + bw + dep + 12} y={y + 12} anchor="start" size={12} fill={FIG.inkSoft} math>
            {`w = ${num(d.width ?? 0)}`}
          </Label>
        </g>
      );
    }

    default: {
      // Pyramid and prism share a simple silhouette.
      const bw = Math.min(w * 0.44, 190);
      const x = cx - bw / 2;
      const dep = 34;
      return (
        <g>
          <path
            d={
              spec.solid === 'pyramid'
                ? `M ${r(cx)} ${r(top + 20)} L ${r(x)} ${r(bottom)} L ${r(x + bw)} ${r(bottom)} Z`
                : `M ${r(x)} ${r(top + 40)} L ${r(x + bw)} ${r(top + 40)} L ${r(x + bw)} ${r(bottom)} L ${r(x)} ${r(bottom)} Z`
            }
            fill={fill}
            stroke={edge}
            strokeWidth={1.5}
          />
          <path
            d={`M ${r(x)} ${r(bottom)} L ${r(x + dep)} ${r(bottom - dep * 0.5)} L ${r(x + bw + dep)} ${r(bottom - dep * 0.5)} L ${r(x + bw)} ${r(bottom)} Z`}
            fill={FIG.sunk}
            stroke={edge}
            strokeWidth={1.3}
            strokeDasharray="4 3"
          />
          <Dim
            x1={cx + bw / 2 + 18}
            y1={spec.solid === 'pyramid' ? top + 20 : top + 40}
            x2={cx + bw / 2 + 18}
            y2={bottom}
            label={`h = ${num(d.height ?? 0)}`}
            vertical
          />
        </g>
      );
    }
  }
}

// ---------------------------------------------------------------------------

function Net({ spec, w }: { spec: SolidNetSpec; w: number }) {
  const cx = w / 2;
  const d = spec.dimensions;
  const fill = FIG.known;
  const edge = FIG.knownEdge;

  switch (spec.solid) {
    case 'cylinder': {
      // Circumference sets the rectangle's width, which is the identity worth seeing.
      const rad = Math.min(w * 0.13, 44);
      const rectW = Math.min(w - 24, 2 * Math.PI * rad);
      const rectH = 96;
      const top = 58;
      const x = cx - rectW / 2;
      return (
        <g>
          <circle cx={r(cx)} cy={r(top - 8)} r={r(rad)} fill={fill} stroke={edge} strokeWidth={1.4} />
          <rect x={r(x)} y={r(top + rad)} width={r(rectW)} height={rectH} fill={fill} stroke={edge} strokeWidth={1.4} />
          <circle cx={r(cx)} cy={r(top + rad + rectH + rad + 6)} r={r(rad)} fill={fill} stroke={edge} strokeWidth={1.4} />
          <Label x={cx} y={top + rad + rectH / 2} size={12} fill={FIG.knownText} math>
            {`2πr × h`}
          </Label>
          <Label x={cx} y={top + rad + rectH + 16} size={11} fill={FIG.inkFaint}>
            two circles + one rectangle
          </Label>
        </g>
      );
    }

    case 'cone': {
      // Sector angle is (r / l) of a full turn — the reason CSA is πrl.
      const rad = d.radius ?? 1;
      const slant = (d.slant ?? Math.sqrt(rad ** 2 + (d.height ?? 0) ** 2)) || 1;
      const fraction = Math.min(1, rad / slant);
      const sweep = fraction * 2 * Math.PI;

      const R = Math.min(w * 0.3, 104);
      const centre = { x: cx, y: 92 };
      const start = -Math.PI / 2 - sweep / 2;
      const end = start + sweep;

      const p1 = { x: centre.x + Math.cos(start) * R, y: centre.y + Math.sin(start) * R };
      const p2 = { x: centre.x + Math.cos(end) * R, y: centre.y + Math.sin(end) * R };
      const large = sweep > Math.PI ? 1 : 0;

      const baseR = Math.min(w * 0.12, 40);

      return (
        <g>
          <path
            d={
              `M ${r(centre.x)} ${r(centre.y)} L ${r(p1.x)} ${r(p1.y)} ` +
              `A ${r(R)} ${r(R)} 0 ${large} 1 ${r(p2.x)} ${r(p2.y)} Z`
            }
            fill={fill}
            stroke={edge}
            strokeWidth={1.4}
          />
          <Label x={centre.x} y={centre.y + R * 0.55} size={12} fill={FIG.knownText} math>
            πrl
          </Label>
          <circle
            cx={r(cx)}
            cy={r(centre.y + R + baseR + 16)}
            r={r(baseR)}
            fill={fill}
            stroke={edge}
            strokeWidth={1.4}
          />
          <Label x={cx} y={centre.y + R + baseR + 16} size={12} fill={FIG.knownText} math>
            πr²
          </Label>
        </g>
      );
    }

    case 'cuboid': {
      const u = Math.min(w / 5.2, 52);
      const x = cx - u * 2;
      const y = 52;
      const faces: Array<[number, number, number, number]> = [
        [x + u, y, u, u],
        [x, y + u, u, u],
        [x + u, y + u, u, u],
        [x + u * 2, y + u, u, u],
        [x + u * 3, y + u, u, u],
        [x + u, y + u * 2, u, u],
      ];
      return (
        <g>
          {faces.map(([fx, fy, fw, fh], i) => (
            <rect
              key={i}
              x={r(fx)}
              y={r(fy)}
              width={r(fw)}
              height={r(fh)}
              fill={fill}
              stroke={edge}
              strokeWidth={1.3}
            />
          ))}
          <Label x={cx} y={y + u * 3 + 20} size={11} fill={FIG.inkFaint}>
            six rectangles, in three matching pairs
          </Label>
        </g>
      );
    }

    default: {
      const edges = d.baseEdges ?? 4;
      const u = Math.min(w / (edges + 2.4), 58);
      const x = cx - (u * edges) / 2;
      const y = 96;
      return (
        <g>
          <rect x={r(x)} y={r(y)} width={r(u * edges)} height={r(u)} fill={fill} stroke={edge} strokeWidth={1.3} />
          {Array.from({ length: edges }, (_, i) => (
            <g key={i}>
              <line
                x1={r(x + u * i)}
                y1={r(y)}
                x2={r(x + u * i)}
                y2={r(y + u)}
                stroke={edge}
                strokeWidth={1.1}
              />
              <path
                d={`M ${r(x + u * i)} ${r(y)} L ${r(x + u * (i + 0.5))} ${r(y - u * 0.85)} L ${r(x + u * (i + 1))} ${r(y)} Z`}
                fill={fill}
                stroke={edge}
                strokeWidth={1.3}
              />
            </g>
          ))}
          <Label x={cx} y={y + u + 20} size={11} fill={FIG.inkFaint}>
            {`base + ${edges} triangular faces`}
          </Label>
        </g>
      );
    }
  }
}

// ---------------------------------------------------------------------------

function Dim({
  x1,
  y1,
  x2,
  y2,
  label,
  vertical,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  vertical?: boolean;
}) {
  return (
    <g>
      <line x1={r(x1)} y1={r(y1)} x2={r(x2)} y2={r(y2)} stroke={FIG.inkFaint} strokeWidth={1.1} />
      <line x1={r(x1 - 4)} y1={r(y1)} x2={r(x1 + 4)} y2={r(y1)} stroke={FIG.inkFaint} strokeWidth={1.1} />
      <line x1={r(x2 - 4)} y1={r(y2)} x2={r(x2 + 4)} y2={r(y2)} stroke={FIG.inkFaint} strokeWidth={1.1} />
      <Label
        x={vertical ? x1 + 8 : (x1 + x2) / 2}
        y={vertical ? (y1 + y2) / 2 : y1 - 8}
        anchor={vertical ? 'start' : 'middle'}
        size={12}
        fill={FIG.inkSoft}
        math
      >
        {label}
      </Label>
    </g>
  );
}

function RadiusMark({ cx, cy, rx, label }: { cx: number; cy: number; rx: number; label: string }) {
  return (
    <g>
      <line x1={r(cx)} y1={r(cy)} x2={r(cx + rx)} y2={r(cy)} stroke={FIG.accentEdge} strokeWidth={1.5} />
      <Label x={cx + rx / 2} y={cy - 11} size={12} fill={FIG.accentStrong} weight={600} math>
        {label}
      </Label>
    </g>
  );
}

/**
 * Fit a solid into the drawing area at its true height-to-radius ratio.
 *
 * Both dimensions are bounded, so a tall thin cylinder shrinks in width rather than
 * overflowing, and a squat one shrinks in height rather than stretching.
 */
export function fitToRatioForTest(
  d: SolidNetSpec['dimensions'],
  w: number,
): { top: number; height: number; halfWidth: number } {
  const maxHalfWidth = Math.min(w * 0.3, 92);
  const maxHeight = HEIGHT - 84;
  const fallback = { top: 44, height: maxHeight, halfWidth: maxHalfWidth };

  const radius = d.radius;
  const height = d.height;
  if (radius === undefined || height === undefined || radius <= 0 || height <= 0) return fallback;

  const ratio = height / radius;

  // Take whichever constraint binds first.
  let halfWidth = maxHalfWidth;
  let drawnHeight = halfWidth * ratio;
  if (drawnHeight > maxHeight) {
    drawnHeight = maxHeight;
    halfWidth = drawnHeight / ratio;
  }

  return { top: 44 + (maxHeight - drawnHeight) / 2, height: drawnHeight, halfWidth };
}

/**
 * The slant footnote is shown only when the figure opts into the slant triangle.
 *
 * It states `l = √(r² + h²) = ...`, which is the whole answer to "find the slant height"
 * — printing it on every cone handed the student the result of the item they were being
 * asked to work. Opting in keeps it available where the relationship is the teaching point.
 */
function dimensionSummary(spec: SolidNetSpec): string | undefined {
  const d = spec.dimensions;
  if (!spec.showSlantTriangle) return undefined;
  if (spec.solid !== 'cone' || d.radius === undefined || d.height === undefined) return undefined;
  const slant = d.slant ?? Math.sqrt(d.radius ** 2 + d.height ** 2);
  return `l = √(r² + h²) = √(${num(d.radius)}² + ${num(d.height)}²) = ${num(slant)}`;
}

function describe(spec: SolidNetSpec): string {
  const d = spec.dimensions;
  const dims = Object.entries(d)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k} ${num(v as number)}`)
    .join(', ');
  return `A ${spec.solid}${spec.view === 'net' ? ', unfolded as a net' : spec.view === 'both' ? ', shown as a solid and as a net' : ''}. ${dims}.`;
}
