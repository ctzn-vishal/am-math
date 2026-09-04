import { z } from 'zod';
import { specSchemasByKind, visualSpecSchema, type VisualKind, type VisualSpec } from './spec';
import { validateSpec, type SpecIssue } from './validate';

/**
 * The single gate between "a kind exists in the type system" and "the tutor may draw it".
 *
 * Tool declarations sent to Gemini are generated from this list, so a kind with no
 * renderer is simply invisible to the model. That keeps Phase 2 additive: ship a renderer,
 * flip a flag, and the tutor gains a new way to explain something — with no prompt edits
 * and no risk of it promising a figure the app cannot draw.
 */

export interface KindInfo {
  kind: VisualKind;
  /** Shown to the model. Say when to reach for this figure, not what it looks like. */
  guidance: string;
  implemented: boolean;
}

export const VISUAL_KINDS: readonly KindInfo[] = [
  {
    kind: 'bar_model',
    guidance:
      'Singapore comparison and part-whole bars. Reach for this when two or more quantities must be ' +
      'compared, when a total splits into parts, or when substitution needs to be seen as one bar ' +
      'replacing another. The workhorse for simultaneous equations and ratio.',
    implemented: true,
  },
  {
    kind: 'algebra_tiles',
    guidance:
      'Physical tiles for x², x and 1. Use at the concrete stage of expansion, factorisation and ' +
      'completing the square, especially to show why the middle term is 2ab or why a zero pair changes ' +
      'nothing.',
    implemented: false,
  },
  {
    kind: 'area_grid',
    guidance:
      'Rectangle partitioned into sub-areas. Use to show that expansion is just totalling areas, and ' +
      'that every term in one bracket meets every term in the other.',
    implemented: false,
  },
  {
    kind: 'cross_frame',
    guidance:
      'The X-method frame for non-monic quadratics. Use when the leading coefficient is not 1 and the ' +
      'student needs to test factor splits systematically rather than by guessing.',
    implemented: false,
  },
  {
    kind: 'angle_diagram',
    guidance:
      'Points, lines and marked angles. Use for parallel-line reasoning (F, Z and C shapes), polygon ' +
      'angle sums, and congruence tests where equal sides and parallel lines must be marked.',
    implemented: false,
  },
  {
    kind: 'coordinate_plane',
    guidance:
      'Cartesian axes with lines, parabolas and plotted points. Use for gradient as rise over run, ' +
      'intersection as the solution of a system, turning points, and perpendicularity.',
    implemented: false,
  },
  {
    kind: 'solid_net',
    guidance:
      'A 3D solid, its unfolded net, or both. Use to make surface area obviously a sum of 2D shapes, ' +
      'and to expose the right triangle relating radius, height and slant height.',
    implemented: false,
  },
  {
    kind: 'stat_plot',
    guidance:
      'Box plots, histograms and dot plots. Use to read a five-number summary off a picture, to make ' +
      'spread visible, and to show what the IQR actually measures.',
    implemented: false,
  },
] as const;

export const IMPLEMENTED_KINDS: readonly VisualKind[] = VISUAL_KINDS.filter(
  (k) => k.implemented,
).map((k) => k.kind);

export function isImplemented(kind: VisualKind): boolean {
  return IMPLEMENTED_KINDS.includes(kind);
}

/**
 * JSON Schema for one kind, in the OpenAPI subset the Gemini function-calling API accepts.
 * Derived from the Zod schema so the contract cannot drift from the validator.
 */
export function jsonSchemaFor(kind: VisualKind): Record<string, unknown> {
  const schema = specSchemasByKind[kind];
  const json = z.toJSONSchema(schema, { target: 'draft-7', io: 'input' }) as Record<string, unknown>;
  delete json['$schema'];
  return json;
}

export type ParseOutcome =
  | { ok: true; spec: VisualSpec; warnings: SpecIssue[] }
  | { ok: false; issues: SpecIssue[] };

/**
 * Full gate for anything arriving from the model or the client: shape, then soundness,
 * then renderer availability. Nothing reaches the canvas without passing all three.
 */
export function parseVisualSpec(input: unknown): ParseOutcome {
  const parsed = visualSpecSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      issues: parsed.error.issues.map((i) => ({
        path: i.path.join('.') || '(root)',
        message: i.message,
        severity: 'error' as const,
      })),
    };
  }

  const spec = parsed.data;

  if (!isImplemented(spec.kind)) {
    return {
      ok: false,
      issues: [
        {
          path: 'kind',
          message:
            `"${spec.kind}" has no renderer yet. Explain this in words, or use one of: ` +
            `${IMPLEMENTED_KINDS.join(', ')}.`,
          severity: 'error',
        },
      ],
    };
  }

  const result = validateSpec(spec);
  if (!result.ok) {
    return { ok: false, issues: result.issues.filter((i) => i.severity === 'error') };
  }

  return { ok: true, spec, warnings: result.issues };
}
