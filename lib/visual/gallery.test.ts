import { describe, it, expect } from 'vitest';
import { FIGURE_GALLERY } from './gallery';
import {
  parseVisualSpec,
  IMPLEMENTED_KINDS,
  VISUAL_KINDS,
  jsonSchemaFor,
  assertGeminiCompatible,
} from './registry';
import { visualSpecSchema, type VisualKind } from './spec';

/**
 * The gallery is the renderers' fixture set. Holding it to the same gate the tutor passes
 * through means a renderer can never be built against a spec the model could not legally
 * emit — the failure mode where a figure looks right in development and is refused in
 * production.
 */

describe('figure gallery', () => {
  it('has at least one entry for every implemented kind', () => {
    const covered = new Set(
      FIGURE_GALLERY.map((e) => visualSpecSchema.safeParse(e.spec))
        .filter((r) => r.success)
        .map((r) => r.data.kind),
    );

    for (const kind of IMPLEMENTED_KINDS) {
      expect(covered.has(kind), `no gallery entry for ${kind}`).toBe(true);
    }
  });

  it('passes the full production gate for every entry', () => {
    for (const entry of FIGURE_GALLERY) {
      const outcome = parseVisualSpec(entry.spec);
      if (!outcome.ok) {
        throw new Error(
          `"${entry.name}" would be refused: ${outcome.issues.map((i) => `${i.path}: ${i.message}`).join('; ')}`,
        );
      }
      expect(outcome.ok).toBe(true);
    }
  });

  it('carries exactly one deliberate near-miss warning', () => {
    // The cross_frame near-miss is meant to warn: it shows a candidate being ruled out.
    // Anything else warning means a showcase figure is subtly wrong.
    const warned = FIGURE_GALLERY.filter((entry) => {
      const outcome = parseVisualSpec(entry.spec);
      return outcome.ok && outcome.warnings.length > 0;
    });

    expect(warned.map((e) => e.name)).toEqual(['cross_frame (near miss)']);
  });

  it('gives every entry a note explaining what it is for', () => {
    for (const entry of FIGURE_GALLERY) {
      expect(entry.note.length, entry.name).toBeGreaterThan(20);
    }
  });
});

describe('registry after phase 2', () => {
  it('has a renderer for all eight kinds', () => {
    expect(IMPLEMENTED_KINDS).toHaveLength(8);
    expect(VISUAL_KINDS.every((k) => k.implemented)).toBe(true);
  });

  it('produces a Gemini-consumable schema for each kind', () => {
    for (const info of VISUAL_KINDS) {
      const schema = jsonSchemaFor(info.kind as VisualKind);
      expect(schema['type'], info.kind).toBe('object');
      expect(schema['properties'], info.kind).toBeDefined();
    }
  });

  it('detects an incompatible schema rather than passing it through', () => {
    expect(() => assertGeminiCompatible({ properties: { a: { oneOf: [] } } }, 'x')).toThrow(/oneOf/);
    expect(() => assertGeminiCompatible({ items: [{ type: 'number' }] }, 'x')).toThrow(/tuple/);
    expect(() => assertGeminiCompatible({ type: 'string', const: 'a' }, 'x')).toThrow(/const/);
  });

  it('tells the model when to reach for each kind', () => {
    for (const info of VISUAL_KINDS) {
      // Guidance has to be about the teaching situation, not the geometry. Length is a
      // crude proxy, but it does catch a kind added with a one-line placeholder.
      expect(info.guidance.length, info.kind).toBeGreaterThan(120);
      expect(info.guidance, info.kind).toMatch(/use|reach for/i);
    }
  });
});
