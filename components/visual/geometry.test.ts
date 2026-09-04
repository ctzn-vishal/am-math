import { describe, it, expect } from 'vitest';
import { curvePathForTest } from './CoordinatePlane';
import { fitToRatioForTest } from './SolidNet';

/**
 * Geometry that assertions can judge, kept separate from anything React renders.
 *
 * Both of these exist because looking at the gallery caught what the type checker and the
 * spec validators could not: a figure can be structurally perfect and still draw the wrong
 * picture. These lock in the two that got through.
 */

describe('curve clipping', () => {
  const sx = (x: number) => x * 10;
  const sy = (y: number) => 100 - y * 10;

  /** Count how many distinct sub-paths a path string contains. */
  const moves = (d: string) => (d.match(/M/g) ?? []).length;
  const lines = (d: string) => (d.match(/L/g) ?? []).length;

  it('draws a line that leaves the window through the top and bottom', () => {
    // The regression: y = 2x + 1 over x in [-4, 6] with y clipped to [-4, 10] exits both
    // ends. Dropping out-of-range samples left a single point and the line vanished.
    const d = curvePathForTest({ type: 'linear', m: 2, c: 1 }, -4, 6, -4, 10, sx, sy);

    expect(moves(d)).toBe(1);
    expect(lines(d)).toBeGreaterThan(1);
  });

  it('reaches the window boundary rather than the first sample inside it', () => {
    const d = curvePathForTest({ type: 'linear', m: 2, c: 1 }, -4, 6, -4, 10, sx, sy);
    const ys = [...d.matchAll(/-?\d+(?:\.\d+)?\s+(-?\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));

    // y = -4 maps to 140 and y = 10 maps to 0. Both extremes should be very nearly reached.
    expect(Math.max(...ys)).toBeGreaterThan(138);
    expect(Math.min(...ys)).toBeLessThan(2);
  });

  it('draws a fully visible line end to end', () => {
    const d = curvePathForTest({ type: 'linear', m: 1, c: 0 }, 0, 5, 0, 10, sx, sy);
    expect(moves(d)).toBe(1);
    expect(lines(d)).toBeGreaterThan(1);
  });

  it('breaks a parabola into two arms when its middle dips out of view', () => {
    // y = x² - 9 is below the window between the roots, so only the two arms are visible.
    const d = curvePathForTest({ type: 'quadratic', a: 1, b: 0, c: -9 }, -5, 5, 0, 20, sx, sy);
    expect(moves(d)).toBe(2);
  });

  it('returns an empty path when nothing is visible', () => {
    const d = curvePathForTest({ type: 'linear', m: 0, c: 100 }, -5, 5, -1, 1, sx, sy);
    expect(d).toBe('');
  });

  it('keeps a parabola inside the window it was clipped to', () => {
    const d = curvePathForTest({ type: 'quadratic', a: 1, b: -4, c: 3 }, -1, 5, -2, 8, sx, sy);
    const ys = [...d.matchAll(/-?\d+(?:\.\d+)?\s+(-?\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
    // y in [-2, 8] maps to [20, 120] under sy.
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(19.9);
    expect(Math.max(...ys)).toBeLessThanOrEqual(120.1);
  });
});

describe('solid proportions', () => {
  const ratioOf = (radius: number, height: number, w = 340) => {
    const box = fitToRatioForTest({ radius, height }, w);
    return box.height / box.halfWidth;
  };

  it('draws a 3-4-5 cone at its true 4:3 ratio', () => {
    // The regression: the cone was drawn at a fixed 2.45:1 regardless of its stated
    // dimensions, so a figure captioned r = 3, h = 4 was measurably not that shape.
    expect(ratioOf(3, 4)).toBeCloseTo(4 / 3, 5);
  });

  it('keeps a tall thin solid tall and thin', () => {
    expect(ratioOf(1, 8)).toBeCloseTo(8, 5);
  });

  it('keeps a squat solid squat', () => {
    expect(ratioOf(8, 2)).toBeCloseTo(0.25, 5);
  });

  it('stays inside the drawing area at any ratio', () => {
    for (const [r, h] of [
      [1, 20],
      [20, 1],
      [3, 4],
      [5, 12],
    ] as const) {
      const box = fitToRatioForTest({ radius: r, height: h }, 340);
      expect(box.halfWidth).toBeGreaterThan(0);
      expect(box.halfWidth).toBeLessThanOrEqual(92.01);
      expect(box.height).toBeGreaterThan(0);
      expect(box.height).toBeLessThanOrEqual(216.01);
    }
  });

  it('falls back to filling the box when dimensions are missing', () => {
    const box = fitToRatioForTest({ radius: 3 }, 340);
    expect(box.height).toBeGreaterThan(0);
    expect(box.halfWidth).toBeGreaterThan(0);
  });
});
