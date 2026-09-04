import { describe, it, expect } from 'vitest';
import { visualSpecSchema } from './spec';
import { validateSpec, fiveNumberSummary } from './validate';
import { parseVisualSpec, jsonSchemaFor } from './registry';

/** Parse through Zod first so defaults are applied, exactly as production does. */
function parse(input: unknown) {
  const r = visualSpecSchema.safeParse(input);
  if (!r.success) throw new Error(`fixture failed schema: ${r.error.message}`);
  return r.data;
}

function errorsOf(input: unknown): string[] {
  return validateSpec(parse(input))
    .issues.filter((i) => i.severity === 'error')
    .map((i) => i.message);
}

describe('bar_model', () => {
  // 3a + 4c = 48 against 10a + 4c = 104, the elimination example from the curriculum.
  const ticketModel = {
    kind: 'bar_model',
    title: 'Ticket problem',
    rows: [
      {
        id: 'r1',
        label: 'Group A',
        segments: [
          { id: 's1', label: '3 adult', units: 3, role: 'unknown' },
          { id: 's2', label: '4 child', units: 4, role: 'unknown' },
        ],
        total: { label: '$48', value: 48 },
      },
      {
        id: 'r2',
        label: '2 x Group B',
        segments: [
          { id: 's3', label: '3 adult', units: 3, role: 'unknown' },
          { id: 's4', label: '7 adult', units: 7, role: 'difference' },
          { id: 's5', label: '4 child', units: 4, role: 'unknown' },
        ],
        total: { label: '$104', value: 104 },
      },
    ],
  };

  it('accepts a sound comparison model with unknowns', () => {
    expect(errorsOf(ticketModel)).toEqual([]);
  });

  it('rejects a scale break between two known blocks', () => {
    const errors = errorsOf({
      kind: 'bar_model',
      rows: [
        {
          id: 'r1',
          label: 'Savings',
          segments: [
            { id: 'a', label: '10', units: 2, value: 10 },
            // Worth twice as much, but drawn only 1.5x as wide. This is the exact failure
            // a generated image would produce silently.
            { id: 'b', label: '20', units: 3, value: 20 },
          ],
        },
      ],
    });
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('Scale break');
    expect(errors[0]).toContain('has to be 4 wide');
    // Named by label, not by array index: this message reaches the student too.
    expect(errors[0]).not.toContain('rows[');
  });

  it('rejects the same unknown drawn at two different widths', () => {
    const errors = errorsOf({
      kind: 'bar_model',
      rows: [
        { id: 'r1', label: 'A', segments: [{ id: 'a', label: 'x', units: 2, role: 'unknown' }] },
        { id: 'r2', label: 'B', segments: [{ id: 'b', label: 'x', units: 5, role: 'unknown' }] },
      ],
    });
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('same unknown has to be the same width');
    expect(errors[0]).toContain('in "B" but');
    expect(errors[0]).not.toContain('segments[');
  });

  it('rejects a row whose parts do not sum to its stated total', () => {
    const errors = errorsOf({
      kind: 'bar_model',
      rows: [
        {
          id: 'r1',
          label: 'Total',
          segments: [
            { id: 'a', label: '30', units: 3, value: 30 },
            { id: 'b', label: '20', units: 2, value: 20 },
          ],
          total: { label: 'total', value: 60 },
        },
      ],
    });
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('summing to 50');
  });

  it('rejects a non-positive quantity', () => {
    const errors = errorsOf({
      kind: 'bar_model',
      rows: [
        { id: 'r1', label: 'A', segments: [{ id: 'a', label: 'loss', units: 2, value: -5 }] },
      ],
    });
    expect(errors[0]).toContain('cannot have zero or negative length');
  });

  it('allows unknowns to coexist with knowns on one shared scale', () => {
    expect(
      errorsOf({
        kind: 'bar_model',
        rows: [
          {
            id: 'r1',
            label: '2x + 15',
            segments: [
              { id: 'a', label: 'x', units: 6, role: 'unknown' },
              { id: 'b', label: 'x', units: 6, role: 'unknown' },
              { id: 'c', label: '15', units: 3, value: 15 },
            ],
          },
        ],
      }),
    ).toEqual([]);
  });
});

describe('cross_frame', () => {
  it('accepts a correct split of 3x² + 10x + 8', () => {
    // (3x + 4)(x + 2)
    const errors = errorsOf({
      kind: 'cross_frame',
      a: 3,
      b: 10,
      c: 8,
      attempt: { topLeft: 3, topRight: 4, bottomLeft: 1, bottomRight: 2 },
    });
    expect(errors).toEqual([]);
  });

  it('treats a near miss as a warning, not an error', () => {
    // (3x + 8)(x + 1) multiplies out to 3x² + 11x + 8 — a legitimate candidate to rule out.
    const result = validateSpec(
      parse({
        kind: 'cross_frame',
        a: 3,
        b: 10,
        c: 8,
        attempt: { topLeft: 3, topRight: 8, bottomLeft: 1, bottomRight: 1 },
      }),
    );
    expect(result.ok).toBe(true);
    expect(result.issues.map((i) => i.severity)).toEqual(['warning']);
    expect(result.issues[0]?.message).toContain('does not factorise');
  });

  it('rejects a split whose constants do not multiply back to c', () => {
    const errors = errorsOf({
      kind: 'cross_frame',
      a: 3,
      b: 10,
      c: 8,
      attempt: { topLeft: 3, topRight: 5, bottomLeft: 1, bottomRight: 2 },
    });
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('constant term is 8');
  });
});

describe('solid_net', () => {
  it('accepts a 3-4-5 cone', () => {
    expect(
      errorsOf({
        kind: 'solid_net',
        solid: 'cone',
        dimensions: { radius: 3, height: 4, slant: 5 },
        showSlantTriangle: true,
      }),
    ).toEqual([]);
  });

  it('rejects a slant height that contradicts Pythagoras', () => {
    const errors = errorsOf({
      kind: 'solid_net',
      solid: 'cone',
      dimensions: { radius: 3, height: 4, slant: 6 },
    });
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('l = sqrt(r² + h²) = 5');
  });

  it('rejects a solid missing a dimension it needs', () => {
    const errors = errorsOf({ kind: 'solid_net', solid: 'cylinder', dimensions: { radius: 3 } });
    expect(errors).toEqual(['A cylinder needs height.']);
  });
});

describe('stat_plot', () => {
  it('computes a five-number summary by linear interpolation', () => {
    expect(fiveNumberSummary([1, 2, 3, 4, 5])).toEqual({ min: 1, q1: 2, median: 3, q3: 4, max: 5 });
  });

  it('rejects a summary that contradicts its own data', () => {
    const errors = errorsOf({
      kind: 'stat_plot',
      plot: 'box',
      values: [1, 2, 3, 4, 5],
      summary: { min: 1, q1: 2, median: 9, q3: 4, max: 5 },
    });
    // Out of order, and disagrees with the values.
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.includes('out of order'))).toBe(true);
  });

  it('rejects overlapping bins', () => {
    const errors = errorsOf({
      kind: 'stat_plot',
      plot: 'histogram',
      bins: [
        { from: 0, to: 10, frequency: 3 },
        { from: 5, to: 15, frequency: 4 },
      ],
    });
    expect(errors[0]).toContain('overlaps');
  });
});

describe('coordinate_plane', () => {
  it('rejects a slope triangle pointing at a curve that does not exist', () => {
    const errors = errorsOf({
      kind: 'coordinate_plane',
      xRange: [-5, 5],
      yRange: [-5, 5],
      curves: [{ type: 'linear', m: 2, c: 1 }],
      slopeTriangle: { curveIndex: 3, fromX: 0, toX: 2 },
    });
    expect(errors).toEqual(['No curve at index 3.']);
  });
});

describe('angle_diagram', () => {
  it('rejects a segment referencing an undeclared point', () => {
    const errors = errorsOf({
      kind: 'angle_diagram',
      points: [
        { id: 'A', x: 0, y: 0 },
        { id: 'B', x: 10, y: 0 },
      ],
      segments: [{ from: 'A', to: 'Z' }],
      angles: [],
    });
    expect(errors).toEqual(['References unknown point "Z".']);
  });
});

describe('parseVisualSpec gate', () => {
  it('refuses a kind that has no renderer yet', () => {
    const outcome = parseVisualSpec({
      kind: 'area_grid',
      columns: ['x', '+3'],
      rows: ['x', '+2'],
      cells: ['x^2', '3x', '2x', '6'],
    });
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) {
      expect(outcome.issues[0]?.message).toContain('no renderer yet');
      expect(outcome.issues[0]?.message).toContain('bar_model');
    }
  });

  it('passes a sound bar model and surfaces no warnings', () => {
    const outcome = parseVisualSpec({
      kind: 'bar_model',
      rows: [
        { id: 'r1', label: 'A', segments: [{ id: 'a', label: '12', units: 12, value: 12 }] },
      ],
    });
    expect(outcome.ok).toBe(true);
    if (outcome.ok) expect(outcome.warnings).toEqual([]);
  });

  it('reports schema failures without throwing', () => {
    const outcome = parseVisualSpec({ kind: 'bar_model', rows: [] });
    expect(outcome.ok).toBe(false);
  });

  it('rejects an unknown kind', () => {
    expect(parseVisualSpec({ kind: 'mandelbrot' }).ok).toBe(false);
  });
});

describe('tool schema generation', () => {
  it('emits a JSON schema Gemini can consume for every implemented kind', () => {
    const schema = jsonSchemaFor('bar_model');
    expect(schema['type']).toBe('object');
    const props = schema['properties'] as Record<string, unknown>;
    expect(props['rows']).toBeDefined();
    expect(JSON.stringify(schema)).not.toContain('$schema');
  });
});
