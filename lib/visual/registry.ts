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
    implemented: true,
  },
  {
    kind: 'area_grid',
    guidance:
      'Rectangle partitioned into sub-areas. Use to show that expansion is just totalling areas, and ' +
      'that every term in one bracket meets every term in the other.',
    implemented: true,
  },
  {
    kind: 'cross_frame',
    guidance:
      'The X-method frame for non-monic quadratics. Use when the leading coefficient is not 1 and the ' +
      'student needs to test factor splits systematically rather than by guessing.',
    implemented: true,
  },
  {
    kind: 'angle_diagram',
    guidance:
      'Points, lines and marked angles. Use for parallel-line reasoning (F, Z and C shapes), polygon ' +
      'angle sums, and congruence tests where equal sides and parallel lines must be marked.',
    implemented: true,
  },
  {
    kind: 'coordinate_plane',
    guidance:
      'Cartesian axes with lines, parabolas and plotted points. Use for gradient as rise over run, ' +
      'intersection as the solution of a system, turning points, and perpendicularity.',
    implemented: true,
  },
  {
    kind: 'solid_net',
    guidance:
      'A 3D solid, its unfolded net, or both. Use to make surface area obviously a sum of 2D shapes, ' +
      'and to expose the right triangle relating radius, height and slant height.',
    implemented: true,
  },
  {
    kind: 'stat_plot',
    guidance:
      'Box plots, histograms and dot plots. Use to read a five-number summary off a picture, to make ' +
      'spread visible, and to show what the IQR actually measures.',
    implemented: true,
  },
] as const;

export const IMPLEMENTED_KINDS: readonly VisualKind[] = VISUAL_KINDS.filter(
  (k) => k.implemented,
).map((k) => k.kind);

export function isImplemented(kind: VisualKind): boolean {
  return IMPLEMENTED_KINDS.includes(kind);
}

/**
 * Keywords Gemini's function-calling schema accepts. It is an OpenAPI 3.0 subset, not full
 * JSON Schema, and anything outside this list gets the whole request rejected with a bare
 * "Invalid JSON payload: syntax error in request body" that names nothing.
 */
const ALLOWED_KEYWORDS = new Set([
  'type',
  'description',
  'enum',
  'format',
  'items',
  'properties',
  'required',
  'minimum',
  'maximum',
  'minItems',
  'maxItems',
  'minLength',
  'maxLength',
  'nullable',
  'default',
]);

/** Constructs that are silently fatal, kept separate so the error can name them. */
const FORBIDDEN_KEYWORDS = ['anyOf', 'oneOf', 'allOf', 'not', 'const', '$ref', '$defs', 'prefixItems'];

/**
 * Reduce a draft-7 schema to the subset Gemini accepts.
 *
 * Rewrites what has an equivalent (`exclusiveMinimum: 0` becomes `minimum: 0`) and drops
 * what does not. It deliberately does *not* paper over `oneOf`, `const` and friends — those
 * mean the spec is shaped in a way the API cannot express at all, and quietly deleting them
 * would send the model a schema that no longer describes the data we expect back. Those are
 * caught by `assertGeminiCompatible` instead, which fails a test rather than a live turn.
 */
/** Keys whose values are data, not nested schemas, and must be copied through untouched. */
const DATA_KEYWORDS = new Set(['enum', 'required', 'default', 'description', 'type', 'format']);

function sanitise(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(sanitise);
  if (node === null || typeof node !== 'object') return node;

  const input = node as Record<string, unknown>;
  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input)) {
    if (key === 'exclusiveMinimum' && typeof value === 'number') {
      if (input['minimum'] === undefined) out['minimum'] = value;
      continue;
    }
    if (key === 'exclusiveMaximum' && typeof value === 'number') {
      if (input['maximum'] === undefined) out['maximum'] = value;
      continue;
    }

    // `properties` is a map of *field names* to schemas. Its keys are the author's, not
    // JSON Schema's, so they must never be filtered as keywords — doing so silently
    // emptied every object schema.
    if (key === 'properties') {
      const props = value as Record<string, unknown>;
      out['properties'] = Object.fromEntries(
        Object.entries(props).map(([name, sub]) => [name, sanitise(sub)]),
      );
      continue;
    }

    if (DATA_KEYWORDS.has(key)) {
      out[key] = value;
      continue;
    }

    // Kept so `assertGeminiCompatible` can report them rather than having them vanish.
    if (FORBIDDEN_KEYWORDS.includes(key)) {
      out[key] = sanitise(value);
      continue;
    }

    if (!ALLOWED_KEYWORDS.has(key)) continue;

    out[key] = sanitise(value);
  }

  return out;
}

/**
 * Throw if a schema still contains anything Gemini cannot parse.
 *
 * This exists because the failure it guards against is invisible: the API rejects the whole
 * request without naming the offending field, and the tutor simply stops working. Asserting
 * it in a test turns a mystifying production failure into a build failure.
 */
export function assertGeminiCompatible(schema: unknown, label: string): void {
  const found = new Set<string>();

  const walk = (node: unknown, path: string): void => {
    if (Array.isArray(node)) {
      node.forEach((item, i) => walk(item, `${path}[${i}]`));
      return;
    }
    if (node === null || typeof node !== 'object') return;

    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      if (FORBIDDEN_KEYWORDS.includes(key)) found.add(`${path}.${key}`);
      // OpenAPI 3.0 requires `items` to be a single schema; the tuple form is an array.
      if (key === 'items' && Array.isArray(value)) found.add(`${path}.items (tuple form)`);
      walk(value, `${path}.${key}`);
    }
  };

  walk(schema, label);

  if (found.size > 0) {
    throw new Error(
      `${label} uses constructs the Gemini function-calling schema cannot express: ` +
        `${[...found].join(', ')}. Flatten the spec — see the note on curveSchema for how.`,
    );
  }
}

/**
 * JSON Schema for one kind, in the OpenAPI subset the Gemini function-calling API accepts.
 * Derived from the Zod schema so the contract cannot drift from the validator.
 */
export function jsonSchemaFor(kind: VisualKind): Record<string, unknown> {
  const schema = specSchemasByKind[kind];
  const json = z.toJSONSchema(schema, { target: 'draft-7', io: 'input' }) as Record<string, unknown>;
  return sanitise(json) as Record<string, unknown>;
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
