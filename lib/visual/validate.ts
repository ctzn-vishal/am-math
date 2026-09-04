import type {
  VisualSpec,
  BarModelSpec,
  AreaGridSpec,
  CrossFrameSpec,
  AngleDiagramSpec,
  CoordinatePlaneSpec,
  SolidNetSpec,
  StatPlotSpec,
  AlgebraTilesSpec,
} from './spec';

/**
 * Mathematical soundness checks that a JSON schema cannot express.
 *
 * Zod tells us the spec is *shaped* right. This tells us it is *true*: that bars drawn
 * twice as long really do represent twice as much, that a cone's slant height agrees with
 * Pythagoras, that a five-number summary is ordered. A figure that fails here is worse
 * than no figure — it teaches the wrong thing with the full authority of a diagram — so
 * errors block the render and go back to the model as a tool error.
 *
 * Warnings do not block. They flag things that are legal but probably unintended.
 */

export type Severity = 'error' | 'warning';

export interface SpecIssue {
  path: string;
  message: string;
  severity: Severity;
}

export interface ValidationResult {
  ok: boolean;
  issues: SpecIssue[];
}

/** Relative tolerance for float comparison. Generous: authored values are human-scale. */
const EPSILON = 1e-6;

function approxEqual(a: number, b: number): boolean {
  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return Math.abs(a - b) <= EPSILON * scale;
}

function err(path: string, message: string): SpecIssue {
  return { path, message, severity: 'error' };
}

function warn(path: string, message: string): SpecIssue {
  return { path, message, severity: 'warning' };
}

// ---------------------------------------------------------------------------

function validateBarModel(spec: BarModelSpec): SpecIssue[] {
  const issues: SpecIssue[] = [];

  // A bar model's entire argument rests on one shared scale. If a block worth 20 is not
  // exactly twice as wide as a block worth 10, the picture lies.
  let scale: number | null = null;
  let scaleSource = '';

  // The same unknown must occupy the same width everywhere, or comparison is meaningless.
  const unknownWidths = new Map<string, { units: number; where: string }>();

  const seenRowIds = new Set<string>();

  spec.rows.forEach((row, r) => {
    const rowPath = `rows[${r}]`;

    if (seenRowIds.has(row.id)) {
      issues.push(err(`${rowPath}.id`, `Duplicate row id "${row.id}".`));
    }
    seenRowIds.add(row.id);

    const seenSegIds = new Set<string>();
    let allValued = true;
    let sum = 0;

    row.segments.forEach((seg, s) => {
      const segPath = `${rowPath}.segments[${s}]`;

      if (seenSegIds.has(seg.id)) {
        issues.push(err(`${segPath}.id`, `Duplicate segment id "${seg.id}" within row "${row.label}".`));
      }
      seenSegIds.add(seg.id);

      if (seg.value === undefined) {
        allValued = false;

        const prior = unknownWidths.get(seg.label);
        if (prior && !approxEqual(prior.units, seg.units)) {
          // Named by row rather than by array index: this message is shown to the student
          // as well as returned to the model, and "rows[0].segments[2]" means nothing to
          // someone looking at a picture.
          issues.push(
            err(
              `${segPath}.units`,
              `"${seg.label}" is ${round(seg.units)} wide in "${row.label}" but ` +
                `${round(prior.units)} wide in "${prior.where}". The same unknown has to be the ` +
                `same width everywhere, or the rows cannot be compared.`,
            ),
          );
        } else if (!prior) {
          unknownWidths.set(seg.label, { units: seg.units, where: row.label });
        }
        return;
      }

      if (seg.value <= 0) {
        issues.push(
          err(
            `${segPath}.value`,
            `Segment "${seg.label}" has value ${seg.value}. A bar represents a quantity and cannot ` +
              `have zero or negative length — model a decrease as a labelled difference instead.`,
          ),
        );
        allValued = false;
        return;
      }

      sum += seg.value;

      const thisScale = seg.units / seg.value;
      if (scale === null) {
        scale = thisScale;
        scaleSource = `"${seg.label}" (worth ${seg.value}, drawn ${round(seg.units)} wide)`;
      } else if (!approxEqual(scale, thisScale)) {
        const expected = seg.value * scale;
        issues.push(
          err(
            `${segPath}.units`,
            `Scale break: "${seg.label}" is worth ${seg.value}, so to match ${scaleSource} it has ` +
              `to be ${round(expected)} wide — but it is ${round(seg.units)}. Every block in the ` +
              `diagram shares one scale.`,
          ),
        );
      }
    });

    if (row.total?.value !== undefined) {
      if (allValued && !approxEqual(sum, row.total.value)) {
        issues.push(
          err(
            `${rowPath}.total.value`,
            `Row "${row.label}" has segments summing to ${round(sum)} but a stated total of ` +
              `${row.total.value}.`,
          ),
        );
      }
      if (row.total.value <= 0) {
        issues.push(err(`${rowPath}.total.value`, `Row total must be positive.`));
      }
    }
  });

  return issues;
}

// ---------------------------------------------------------------------------

/** Net count of a tile type, positives minus negatives. */
export function netTiles(spec: AlgebraTilesSpec, type: 'x2' | 'x' | 'unit'): number {
  return spec.tiles
    .filter((t) => t.type === type)
    .reduce((sum, t) => sum + (t.sign === 'positive' ? t.count : -t.count), 0);
}

function validateAlgebraTiles(spec: AlgebraTilesSpec): SpecIssue[] {
  const issues: SpecIssue[] = [];

  const seen = new Set<string>();
  spec.tiles.forEach((group, i) => {
    const key = `${group.type}:${group.sign}`;
    if (seen.has(key)) {
      issues.push(
        err(`tiles[${i}]`, `${group.sign} ${group.type} tiles are listed twice — combine the counts.`),
      );
    }
    seen.add(key);
  });

  const total = spec.tiles.reduce((n, t) => n + t.count, 0);
  if (total === 0) {
    issues.push(err('tiles', 'The board has no tiles on it.'));
    return issues;
  }

  if (spec.arrangement === 'square') {
    const x2 = netTiles(spec, 'x2');
    const x = netTiles(spec, 'x');

    if (x2 !== 1) {
      issues.push(
        err(
          'tiles',
          `Completing the square starts from exactly one x² tile, but this board has ${x2}. ` +
            `Divide through by the leading coefficient first.`,
        ),
      );
    }

    // An odd number of x tiles cannot split evenly across the two sides. That is not a
    // defect — it is precisely why b/2 can be a fraction — so it warns rather than blocks.
    if (Math.abs(x) % 2 === 1) {
      issues.push(
        warn(
          'tiles',
          `${Math.abs(x)} x-tiles cannot be split evenly across the two sides, so one has to be ` +
            `halved. Worth showing if that is the point being made.`,
        ),
      );
    }
  }

  if (spec.arrangement === 'rectangle') {
    const x2 = netTiles(spec, 'x2');
    if (x2 <= 0) {
      issues.push(
        warn('tiles', 'A factorisation rectangle normally starts from at least one x² tile.'),
      );
    }
  }

  if (spec.showZeroPairs) {
    const hasPositive = spec.tiles.some((t) => t.sign === 'positive' && t.count > 0);
    const hasNegative = spec.tiles.some((t) => t.sign === 'negative' && t.count > 0);
    if (!hasPositive || !hasNegative) {
      issues.push(
        warn('showZeroPairs', 'Zero pairs are switched on but the board has tiles of only one sign.'),
      );
    }
  }

  return issues;
}

// ---------------------------------------------------------------------------

function validateAreaGrid(spec: AreaGridSpec): SpecIssue[] {
  const issues: SpecIssue[] = [];
  const expected = spec.rows.length * spec.columns.length;

  if (spec.cells.length !== expected) {
    issues.push(
      err(
        'cells',
        `Grid is ${spec.rows.length}x${spec.columns.length} so it needs ${expected} cells in ` +
          `row-major order, but ${spec.cells.length} were given.`,
      ),
    );
  }

  if (spec.widths && spec.widths.length !== spec.columns.length) {
    issues.push(
      err('widths', `${spec.widths.length} widths given for ${spec.columns.length} columns.`),
    );
  }

  if (spec.heights && spec.heights.length !== spec.rows.length) {
    issues.push(err('heights', `${spec.heights.length} heights given for ${spec.rows.length} rows.`));
  }

  return issues;
}

// ---------------------------------------------------------------------------

function validateCrossFrame(spec: CrossFrameSpec): SpecIssue[] {
  const issues: SpecIssue[] = [];

  if (spec.a === 0) {
    issues.push(err('a', 'Leading coefficient is 0, so this is not a quadratic.'));
  }

  const attempt = spec.attempt;
  if (!attempt) return issues;

  // The frame reads (topLeft·x + topRight)(bottomLeft·x + bottomRight).
  const { topLeft: p, topRight: q, bottomLeft: r, bottomRight: s } = attempt;

  if (!approxEqual(p * r, spec.a)) {
    issues.push(
      err(
        'attempt',
        `Left column ${p} x ${r} = ${round(p * r)}, but the leading coefficient is ${spec.a}. ` +
          `The x-terms must multiply back to a.`,
      ),
    );
  }

  if (!approxEqual(q * s, spec.c)) {
    issues.push(
      err(
        'attempt',
        `Right column ${q} x ${s} = ${round(q * s)}, but the constant term is ${spec.c}. ` +
          `The constants must multiply back to c.`,
      ),
    );
  }

  // Whether the cross-products land on b is the *exercise*, not a spec defect. A frame
  // showing a near miss is pedagogically useful, so this is deliberately not an error.
  const cross = p * s + q * r;
  if (!approxEqual(cross, spec.b)) {
    issues.push(
      warn(
        'attempt',
        `Cross-products give ${round(cross)}x, not ${spec.b}x — this split does not factorise. ` +
          `Fine to show as a candidate the student rules out.`,
      ),
    );
  }

  return issues;
}

// ---------------------------------------------------------------------------

function validateAngleDiagram(spec: AngleDiagramSpec): SpecIssue[] {
  const issues: SpecIssue[] = [];
  const ids = new Set<string>();

  spec.points.forEach((p, i) => {
    if (ids.has(p.id)) issues.push(err(`points[${i}].id`, `Duplicate point id "${p.id}".`));
    ids.add(p.id);
  });

  const requirePoint = (id: string, path: string) => {
    if (!ids.has(id)) issues.push(err(path, `References unknown point "${id}".`));
  };

  spec.segments.forEach((seg, i) => {
    requirePoint(seg.from, `segments[${i}].from`);
    requirePoint(seg.to, `segments[${i}].to`);
    if (seg.from === seg.to) {
      issues.push(err(`segments[${i}]`, 'Segment starts and ends at the same point.'));
    }
  });

  spec.angles.forEach((a, i) => {
    requirePoint(a.from, `angles[${i}].from`);
    requirePoint(a.vertex, `angles[${i}].vertex`);
    requirePoint(a.to, `angles[${i}].to`);
    if (a.from === a.vertex || a.to === a.vertex) {
      issues.push(err(`angles[${i}]`, 'An angle arm cannot be the vertex itself.'));
    }
    if (a.value !== undefined && (a.value <= 0 || a.value >= 360)) {
      issues.push(err(`angles[${i}].value`, `Angle of ${a.value}° is not drawable.`));
    }
  });

  return issues;
}

// ---------------------------------------------------------------------------

function validateCoordinatePlane(spec: CoordinatePlaneSpec): SpecIssue[] {
  const issues: SpecIssue[] = [];
  const { xMin: x0, xMax: x1, yMin: y0, yMax: y1 } = spec;

  if (x0 >= x1) issues.push(err('xMax', `xMax must be greater than xMin, got ${x0} to ${x1}.`));
  if (y0 >= y1) issues.push(err('yMax', `yMax must be greater than yMin, got ${y0} to ${y1}.`));

  // Curves are a flat shape on the wire, so the coefficients each type needs are checked
  // here rather than by the schema. See the note on `curveSchema`.
  spec.curves.forEach((curve, i) => {
    if (curve.type === 'linear' && curve.m === undefined) {
      issues.push(err(`curves[${i}].m`, 'A linear curve needs a gradient m.'));
    }
    if (curve.type === 'quadratic') {
      if (curve.a === undefined) {
        issues.push(err(`curves[${i}].a`, 'A quadratic needs an x² coefficient a.'));
      } else if (curve.a === 0) {
        issues.push(err(`curves[${i}].a`, 'A quadratic with a = 0 is a straight line — use type "linear".'));
      }
      if (curve.b === undefined) {
        issues.push(err(`curves[${i}].b`, 'A quadratic needs an x coefficient b.'));
      }
    }
  });

  const xSteps = (x1 - x0) / spec.gridStep;
  if (xSteps > 60) {
    issues.push(
      warn('gridStep', `Grid step ${spec.gridStep} gives ${Math.round(xSteps)} columns — too dense to read.`),
    );
  }

  if (spec.slopeTriangle) {
    const { curveIndex, fromX, toX } = spec.slopeTriangle;
    const curve = spec.curves[curveIndex];
    if (!curve) {
      issues.push(err('slopeTriangle.curveIndex', `No curve at index ${curveIndex}.`));
    } else if (curve.type !== 'linear') {
      issues.push(warn('slopeTriangle', 'Slope triangles read clearly only on a straight line.'));
    }
    if (approxEqual(fromX, toX)) {
      issues.push(err('slopeTriangle', 'Slope triangle has zero run.'));
    }
  }

  spec.points.forEach((p, i) => {
    if (p.x < x0 || p.x > x1 || p.y < y0 || p.y > y1) {
      issues.push(warn(`points[${i}]`, `Point (${p.x}, ${p.y}) falls outside the visible axes.`));
    }
  });

  return issues;
}

// ---------------------------------------------------------------------------

const REQUIRED_DIMENSIONS: Record<SolidNetSpec['solid'], Array<keyof SolidNetSpec['dimensions']>> = {
  cylinder: ['radius', 'height'],
  cone: ['radius', 'height'],
  sphere: ['radius'],
  hemisphere: ['radius'],
  pyramid: ['height'],
  cuboid: ['length', 'width', 'height'],
  prism: ['length', 'height'],
};

function validateSolidNet(spec: SolidNetSpec): SpecIssue[] {
  const issues: SpecIssue[] = [];
  const d = spec.dimensions;

  for (const key of REQUIRED_DIMENSIONS[spec.solid]) {
    if (d[key] === undefined) {
      issues.push(err(`dimensions.${String(key)}`, `A ${spec.solid} needs ${String(key)}.`));
    }
  }

  // r, h and l are not independent. Letting them disagree would quietly contradict the
  // Pythagorean argument the figure exists to make.
  if (d.radius !== undefined && d.height !== undefined && d.slant !== undefined) {
    const implied = Math.sqrt(d.radius ** 2 + d.height ** 2);
    if (!approxEqual(implied, d.slant)) {
      issues.push(
        err(
          'dimensions.slant',
          `Slant height ${d.slant} contradicts r=${d.radius} and h=${d.height}, which give ` +
            `l = sqrt(r² + h²) = ${round(implied)}.`,
        ),
      );
    }
  }

  if (spec.showSlantTriangle && spec.solid !== 'cone' && spec.solid !== 'pyramid') {
    issues.push(warn('showSlantTriangle', `A ${spec.solid} has no slant height.`));
  }

  return issues;
}

// ---------------------------------------------------------------------------

/** Linear interpolation quartiles, matching the method Sec 2 students are taught. */
export function fiveNumberSummary(values: number[]): StatPlotSpec['summary'] | null {
  if (values.length === 0) return null;
  const v = [...values].sort((a, b) => a - b);
  const quantile = (p: number): number => {
    const pos = (v.length - 1) * p;
    const lo = Math.floor(pos);
    const hi = Math.ceil(pos);
    const loVal = v[lo] as number;
    if (lo === hi) return loVal;
    return loVal + (pos - lo) * ((v[hi] as number) - loVal);
  };
  return {
    min: v[0] as number,
    q1: quantile(0.25),
    median: quantile(0.5),
    q3: quantile(0.75),
    max: v[v.length - 1] as number,
  };
}

function validateStatPlot(spec: StatPlotSpec): SpecIssue[] {
  const issues: SpecIssue[] = [];

  if (spec.values.length === 0 && !spec.summary && !spec.bins) {
    issues.push(err('values', 'A stat plot needs raw values, a five-number summary, or bins.'));
  }

  if (spec.summary) {
    const { min, q1, median, q3, max } = spec.summary;
    const ordered = [min, q1, median, q3, max];
    for (let i = 1; i < ordered.length; i++) {
      if ((ordered[i] as number) < (ordered[i - 1] as number)) {
        issues.push(
          err('summary', `Five-number summary is out of order: ${ordered.join(' , ')}.`),
        );
        break;
      }
    }

    // If both are supplied they must agree, or the student is being shown a summary that
    // their own data does not support.
    if (spec.values.length > 0) {
      const computed = fiveNumberSummary(spec.values);
      if (computed) {
        for (const key of ['min', 'q1', 'median', 'q3', 'max'] as const) {
          if (!approxEqual(computed[key], spec.summary[key])) {
            issues.push(
              err(
                `summary.${key}`,
                `Stated ${key} is ${spec.summary[key]} but the given values yield ${round(computed[key])}.`,
              ),
            );
          }
        }
      }
    }
  }

  if (spec.bins) {
    const sorted = [...spec.bins].sort((a, b) => a.from - b.from);
    sorted.forEach((bin, i) => {
      if (bin.to <= bin.from) {
        issues.push(err(`bins[${i}]`, `Bin ${bin.from}-${bin.to} has non-positive width.`));
      }
      const prev = sorted[i - 1];
      if (prev && bin.from < prev.to) {
        issues.push(err(`bins[${i}]`, `Bin ${bin.from}-${bin.to} overlaps ${prev.from}-${prev.to}.`));
      }
    });
  }

  if (spec.plot === 'histogram' && !spec.bins) {
    issues.push(warn('bins', 'Histogram without bins — the renderer will choose them for you.'));
  }

  return issues;
}

// ---------------------------------------------------------------------------

function round(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}

/**
 * Check a structurally valid spec for mathematical soundness.
 * Call this *after* `visualSpecSchema.parse`.
 */
export function validateSpec(spec: VisualSpec): ValidationResult {
  let issues: SpecIssue[];

  switch (spec.kind) {
    case 'bar_model':
      issues = validateBarModel(spec);
      break;
    case 'algebra_tiles':
      issues = validateAlgebraTiles(spec);
      break;
    case 'area_grid':
      issues = validateAreaGrid(spec);
      break;
    case 'cross_frame':
      issues = validateCrossFrame(spec);
      break;
    case 'angle_diagram':
      issues = validateAngleDiagram(spec);
      break;
    case 'coordinate_plane':
      issues = validateCoordinatePlane(spec);
      break;
    case 'solid_net':
      issues = validateSolidNet(spec);
      break;
    case 'stat_plot':
      issues = validateStatPlot(spec);
      break;
  }

  return { ok: !issues.some((i) => i.severity === 'error'), issues };
}
