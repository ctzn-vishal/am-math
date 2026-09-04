import { z } from 'zod';

/**
 * VisualSpec — the contract between the tutor and the canvas.
 *
 * The model never draws. It emits one of these, we validate it (Zod for shape,
 * `validateSpec` for mathematical soundness), and a renderer draws it deterministically.
 * Student manipulation produces the same shape, so the loop closes: whatever the student
 * builds can be handed straight back to the model as its next input.
 *
 * Adding a kind is a four-step job: schema here, validator in `validate.ts`, renderer in
 * `components/visual/`, and an entry in `registry.ts`. Nothing reaches the model until it
 * is registered, so a half-built kind can never be emitted into a lesson.
 */

/** Shared across every kind. Keep this small — it is repeated in every tool schema. */
const specBase = {
  title: z.string().max(120).optional().describe('Short heading shown above the figure.'),
  caption: z
    .string()
    .max(400)
    .optional()
    .describe('One or two sentences under the figure. Explain what to notice, not how to solve it.'),
};

// ---------------------------------------------------------------------------
// bar_model — Singapore comparison / part-whole bars
// ---------------------------------------------------------------------------

export const barSegmentSchema = z.object({
  id: z.string().min(1).max(40),
  label: z
    .string()
    .max(40)
    .describe('What this block represents, e.g. "x", "15", "3 adult tickets". Plain text, not LaTeX.'),
  units: z
    .number()
    .positive()
    .max(1000)
    .describe(
      'Relative width. All blocks in the whole diagram share one scale, so a block worth 20 must be ' +
        'exactly twice as wide as a block worth 10. Unknowns may take any width you choose, but the ' +
        'same unknown must take the same width everywhere it appears.',
    ),
  value: z
    .number()
    .optional()
    .describe('Numeric value, when known. Omit for unknowns — do not guess or pre-solve.'),
  role: z
    .enum(['known', 'unknown', 'difference'])
    .default('known')
    .describe('Drives colour. "difference" highlights the gap that a comparison model exposes.'),
});

export const barRowSchema = z.object({
  id: z.string().min(1).max(40),
  label: z.string().max(60).describe('Row name shown to the left, e.g. "Adult tickets".'),
  segments: z.array(barSegmentSchema).min(1).max(12),
  total: z
    .object({
      label: z.string().max(40),
      value: z.number().optional(),
    })
    .optional()
    .describe('Brace shown to the right of the row. Omit when the total is what the student must find.'),
});

export const barModelSpec = z.object({
  kind: z.literal('bar_model'),
  ...specBase,
  rows: z.array(barRowSchema).min(1).max(6),
});

// ---------------------------------------------------------------------------
// algebra_tiles — concrete tiles for expansion, factorisation, completing the square
// ---------------------------------------------------------------------------

export const tileSchema = z.object({
  id: z.string().min(1).max(40),
  type: z.enum(['x2', 'x', 'unit']).describe('Tile shape: x² square, x rectangle, or unit square.'),
  sign: z.enum(['positive', 'negative']),
  /** Grid coordinates, top-left origin, in tile units. */
  col: z.number().int().min(0).max(40),
  row: z.number().int().min(0).max(40),
});

export const algebraTilesSpec = z.object({
  kind: z.literal('algebra_tiles'),
  ...specBase,
  tiles: z.array(tileSchema).max(120),
  frame: z
    .enum(['loose', 'rectangle', 'square'])
    .default('loose')
    .describe(
      '"loose" is a free workbench. "rectangle" asks the student to assemble a rectangle (factorisation). ' +
        '"square" asks for a completed square.',
    ),
  showZeroPairs: z
    .boolean()
    .default(false)
    .describe('Draw a link between each +/- pair that cancels.'),
});

// ---------------------------------------------------------------------------
// area_grid — 2x2 (and n x m) expansion grids
// ---------------------------------------------------------------------------

export const areaGridSpec = z.object({
  kind: z.literal('area_grid'),
  ...specBase,
  /** Column headers, e.g. ["x", "+3"] */
  columns: z.array(z.string().max(20)).min(1).max(5),
  rows: z.array(z.string().max(20)).min(1).max(5),
  /**
   * Cell contents in row-major order, length must equal rows.length * columns.length.
   * Use null for a cell the student is meant to fill in.
   */
  cells: z.array(z.string().max(30).nullable()).max(25),
  widths: z
    .array(z.number().positive().max(100))
    .optional()
    .describe('Relative column widths. Omit for equal columns. Length must match `columns`.'),
  heights: z.array(z.number().positive().max(100)).optional().describe('Relative row heights.'),
});

// ---------------------------------------------------------------------------
// cross_frame — the X-method for non-monic factorisation
// ---------------------------------------------------------------------------

export const crossFrameSpec = z.object({
  kind: z.literal('cross_frame'),
  ...specBase,
  a: z.number().describe('Leading coefficient of ax² + bx + c.'),
  b: z.number(),
  c: z.number(),
  /** Candidate split the student (or model) is testing. Omit to show an empty frame. */
  attempt: z
    .object({
      topLeft: z.number(),
      topRight: z.number(),
      bottomLeft: z.number(),
      bottomRight: z.number(),
    })
    .optional(),
});

// ---------------------------------------------------------------------------
// angle_diagram — parallel lines, polygons, congruence
// ---------------------------------------------------------------------------

export const anglePointSchema = z.object({
  id: z.string().min(1).max(20),
  x: z.number().min(-100).max(100),
  y: z.number().min(-100).max(100),
  label: z.string().max(12).optional(),
});

export const angleDiagramSpec = z.object({
  kind: z.literal('angle_diagram'),
  ...specBase,
  points: z.array(anglePointSchema).min(2).max(24),
  segments: z
    .array(
      z.object({
        from: z.string().max(20),
        to: z.string().max(20),
        style: z.enum(['solid', 'dashed', 'ray']).default('solid'),
        /** Matching tick counts mark segments as equal — the visual language of congruence. */
        ticks: z.number().int().min(0).max(3).default(0),
        /** Matching arrow counts mark lines as parallel. */
        arrows: z.number().int().min(0).max(3).default(0),
      }),
    )
    .max(30),
  angles: z
    .array(
      z.object({
        /** Angle ABC is { from: "A", vertex: "B", to: "C" }. */
        from: z.string().max(20),
        vertex: z.string().max(20),
        to: z.string().max(20),
        label: z.string().max(20).describe('e.g. "62°", "x", "?"'),
        value: z.number().min(0).max(360).optional().describe('Degrees, when known.'),
        highlight: z.boolean().default(false),
      }),
    )
    .max(20),
});

// ---------------------------------------------------------------------------
// coordinate_plane — linear and quadratic graphs, coordinate geometry
// ---------------------------------------------------------------------------

export const coordinatePlaneSpec = z.object({
  kind: z.literal('coordinate_plane'),
  ...specBase,
  xRange: z.tuple([z.number(), z.number()]),
  yRange: z.tuple([z.number(), z.number()]),
  gridStep: z.number().positive().default(1),
  curves: z
    .array(
      z.discriminatedUnion('type', [
        z.object({
          type: z.literal('linear'),
          m: z.number(),
          c: z.number(),
          label: z.string().max(30).optional(),
        }),
        z.object({
          type: z.literal('quadratic'),
          a: z.number(),
          b: z.number(),
          c: z.number(),
          label: z.string().max(30).optional(),
        }),
      ]),
    )
    .max(4)
    .default([]),
  points: z
    .array(
      z.object({
        x: z.number(),
        y: z.number(),
        label: z.string().max(20).optional(),
        highlight: z.boolean().default(false),
      }),
    )
    .max(20)
    .default([]),
  /** Rise-over-run triangle drawn on a line, to make gradient visible rather than stated. */
  slopeTriangle: z
    .object({ fromX: z.number(), toX: z.number(), curveIndex: z.number().int().min(0) })
    .optional(),
});

// ---------------------------------------------------------------------------
// solid_net — 3D solids and their unfolded nets
// ---------------------------------------------------------------------------

export const solidNetSpec = z.object({
  kind: z.literal('solid_net'),
  ...specBase,
  solid: z.enum(['cylinder', 'cone', 'sphere', 'hemisphere', 'pyramid', 'cuboid', 'prism']),
  view: z
    .enum(['solid', 'net', 'both'])
    .default('solid')
    .describe('"net" unfolds the surface — the move that makes surface area obviously a sum of 2D shapes.'),
  dimensions: z
    .object({
      radius: z.number().positive().optional(),
      height: z.number().positive().optional(),
      slant: z.number().positive().optional(),
      length: z.number().positive().optional(),
      width: z.number().positive().optional(),
      baseEdges: z.number().int().min(3).max(12).optional(),
    })
    .describe('Only the dimensions the chosen solid needs. Units are unlabelled; the caption carries them.'),
  /** Draw the internal right triangle linking r, h and l — the reason slant height is derivable. */
  showSlantTriangle: z.boolean().default(false),
});

// ---------------------------------------------------------------------------
// stat_plot — box plots and grouped frequency
// ---------------------------------------------------------------------------

export const statPlotSpec = z.object({
  kind: z.literal('stat_plot'),
  ...specBase,
  plot: z.enum(['box', 'histogram', 'dot']),
  axisLabel: z.string().max(40).optional(),
  /** Raw data, when the point is to derive the summary from it. */
  values: z.array(z.number()).max(200).default([]),
  /** Five-number summary, when the point is to read it. Derived from `values` if omitted. */
  summary: z
    .object({
      min: z.number(),
      q1: z.number(),
      median: z.number(),
      q3: z.number(),
      max: z.number(),
    })
    .optional(),
  bins: z
    .array(z.object({ from: z.number(), to: z.number(), frequency: z.number().min(0) }))
    .max(30)
    .optional(),
  highlightIqr: z.boolean().default(false),
});

// ---------------------------------------------------------------------------
// The union
// ---------------------------------------------------------------------------

export const visualSpecSchema = z.discriminatedUnion('kind', [
  barModelSpec,
  algebraTilesSpec,
  areaGridSpec,
  crossFrameSpec,
  angleDiagramSpec,
  coordinatePlaneSpec,
  solidNetSpec,
  statPlotSpec,
]);

export type VisualSpec = z.infer<typeof visualSpecSchema>;
export type VisualKind = VisualSpec['kind'];

export type BarModelSpec = z.infer<typeof barModelSpec>;
export type AlgebraTilesSpec = z.infer<typeof algebraTilesSpec>;
export type AreaGridSpec = z.infer<typeof areaGridSpec>;
export type CrossFrameSpec = z.infer<typeof crossFrameSpec>;
export type AngleDiagramSpec = z.infer<typeof angleDiagramSpec>;
export type CoordinatePlaneSpec = z.infer<typeof coordinatePlaneSpec>;
export type SolidNetSpec = z.infer<typeof solidNetSpec>;
export type StatPlotSpec = z.infer<typeof statPlotSpec>;

/** Per-kind schemas, for generating one tool declaration per implemented kind. */
export const specSchemasByKind = {
  bar_model: barModelSpec,
  algebra_tiles: algebraTilesSpec,
  area_grid: areaGridSpec,
  cross_frame: crossFrameSpec,
  angle_diagram: angleDiagramSpec,
  coordinate_plane: coordinatePlaneSpec,
  solid_net: solidNetSpec,
  stat_plot: statPlotSpec,
} as const satisfies Record<VisualKind, z.ZodType>;
