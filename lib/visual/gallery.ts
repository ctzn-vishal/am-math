/**
 * One representative spec per figure kind, drawn from the Secondary 2 curriculum rather
 * than invented.
 *
 * Used by the `/figures` gallery and by the renderer tests, which assert that every kind
 * has an entry and that each one passes validation. That second assertion is what stops a
 * renderer shipping against a spec the tutor could never legally produce.
 */

export interface GalleryEntry {
  name: string;
  note: string;
  spec: unknown;
}

export const FIGURE_GALLERY: GalleryEntry[] = [
  {
    name: 'bar_model',
    note: 'Unit 2 — two ticket receipts on one scale, the second doubled so the child tickets align.',
    spec: {
      kind: 'bar_model',
      title: 'Two receipts, lined up',
      caption:
        'Both rows contain the same four child tickets. Whatever is left over must account for ' +
        'the difference in price.',
      rows: [
        {
          id: 'r1',
          label: 'Group A',
          segments: [
            { id: 's1', label: '3 adult', units: 3, role: 'unknown' },
            { id: 's2', label: '4 child', units: 4, role: 'known' },
          ],
          total: { label: '$48', value: 48 },
        },
        {
          id: 'r2',
          label: '2 × Group B',
          segments: [
            { id: 's3', label: '3 adult', units: 3, role: 'unknown' },
            { id: 's4', label: '7 more adult', units: 7, role: 'difference' },
            { id: 's5', label: '4 child', units: 4, role: 'known' },
          ],
          total: { label: '$104', value: 104 },
        },
      ],
    },
  },

  {
    name: 'algebra_tiles',
    note: 'Unit 14 — completing the square on x² + 6x. The corner is the missing (b/2)².',
    spec: {
      kind: 'algebra_tiles',
      title: 'x² + 6x, arranged as a square',
      caption:
        'The six x-tiles split three down one side and three along the other. What size of ' +
        'square would fill the empty corner?',
      arrangement: 'square',
      tiles: [
        { type: 'x2', sign: 'positive', count: 1 },
        { type: 'x', sign: 'positive', count: 6 },
      ],
    },
  },

  {
    name: 'algebra_tiles (factorising)',
    note: 'Unit 4 — x² + 5x + 6 assembled into the rectangle whose sides are the factors.',
    spec: {
      kind: 'algebra_tiles',
      title: 'x² + 5x + 6',
      caption: 'Every tile is used and the shape closes. Read the two sides — those are the factors.',
      arrangement: 'rectangle',
      tiles: [
        { type: 'x2', sign: 'positive', count: 1 },
        { type: 'x', sign: 'positive', count: 5 },
        { type: 'unit', sign: 'positive', count: 6 },
      ],
    },
  },

  {
    name: 'algebra_tiles (zero pairs)',
    note: 'A workbench showing that a +x and a −x cancel without changing the net value.',
    spec: {
      kind: 'algebra_tiles',
      title: 'Zero pairs',
      caption: 'Each joined pair contributes nothing. What is left when they are all removed?',
      arrangement: 'loose',
      showZeroPairs: true,
      tiles: [
        { type: 'x', sign: 'positive', count: 5 },
        { type: 'x', sign: 'negative', count: 3 },
      ],
    },
  },

  {
    name: 'area_grid',
    note: 'Unit 3 — (x + 3)(x + 2) partitioned. Cells drawn to true relative size.',
    spec: {
      kind: 'area_grid',
      title: '(x + 3)(x + 2)',
      caption: 'The two middle rectangles are what become the 5x. Why are there exactly two?',
      columns: ['x', '+3'],
      rows: ['x', '+2'],
      widths: [4, 3],
      heights: [4, 2],
      cells: ['x²', '3x', '2x', '6'],
    },
  },

  {
    name: 'cross_frame',
    note: 'Unit 4 — a correct split of 3x² + 10x + 8.',
    spec: {
      kind: 'cross_frame',
      title: 'Factorising 3x² + 10x + 8',
      caption: 'The left column has to multiply back to 3, the right to 8.',
      a: 3,
      b: 10,
      c: 8,
      attempt: { topLeft: 3, topRight: 4, bottomLeft: 1, bottomRight: 2 },
    },
  },

  {
    name: 'cross_frame (near miss)',
    note: 'The same frame with a candidate that has to be ruled out — drawn, not hidden.',
    spec: {
      kind: 'cross_frame',
      title: 'Does this split work?',
      a: 3,
      b: 10,
      c: 8,
      attempt: { topLeft: 3, topRight: 8, bottomLeft: 1, bottomRight: 1 },
    },
  },

  {
    name: 'angle_diagram',
    note: 'Unit 7 — a transversal across two parallel lines. Arrows assert the parallelism.',
    spec: {
      kind: 'angle_diagram',
      title: 'Alternate angles (the Z shape)',
      caption: 'The arrows mark the two lines as parallel. What does that force about the two marked angles?',
      points: [
        { id: 'A', x: -80, y: 40, label: 'A' },
        { id: 'B', x: 80, y: 40, label: 'B' },
        { id: 'C', x: -80, y: -40, label: 'C' },
        { id: 'D', x: 80, y: -40, label: 'D' },
        { id: 'P', x: -40, y: 70, label: 'P' },
        { id: 'Q', x: 40, y: -70, label: 'Q' },
        { id: 'X', x: -10, y: 40, label: 'X' },
        { id: 'Y', x: 10, y: -40, label: 'Y' },
      ],
      segments: [
        { from: 'A', to: 'B', arrows: 1 },
        { from: 'C', to: 'D', arrows: 1 },
        { from: 'P', to: 'Q' },
      ],
      angles: [
        { from: 'B', vertex: 'X', to: 'Q', label: '62°', value: 62, highlight: true },
        { from: 'C', vertex: 'Y', to: 'P', label: 'x', highlight: true },
      ],
    },
  },

  {
    name: 'coordinate_plane',
    note: 'Unit 8 — gradient as a rise over a run you can count off the grid.',
    spec: {
      kind: 'coordinate_plane',
      title: 'y = 2x + 1',
      caption: 'Count the run along, then the rise up. The gradient is one divided by the other.',
      xMin: -4,
      xMax: 6,
      yMin: -4,
      yMax: 10,
      gridStep: 1,
      curves: [{ type: 'linear', m: 2, c: 1, label: 'y = 2x + 1' }],
      points: [{ x: 2, y: 5, label: '(2, 5)', highlight: true }],
      slopeTriangle: { curveIndex: 0, fromX: 0, toX: 2 },
    },
  },

  {
    name: 'coordinate_plane (quadratic)',
    note: 'Unit 8 — a parabola and its turning point.',
    spec: {
      kind: 'coordinate_plane',
      title: 'y = x² − 4x + 3',
      caption: 'Where does the curve turn, and what is special about the x there?',
      xMin: -1,
      xMax: 5,
      yMin: -2,
      yMax: 8,
      gridStep: 1,
      curves: [{ type: 'quadratic', a: 1, b: -4, c: 3, label: 'y = x² − 4x + 3' }],
      points: [
        { x: 2, y: -1, label: 'vertex', highlight: true },
        { x: 1, y: 0 },
        { x: 3, y: 0 },
      ],
    },
  },

  {
    name: 'solid_net',
    note: 'Unit 12 — a 3-4-5 cone, solid and unfolded, with the slant triangle drawn in.',
    spec: {
      kind: 'solid_net',
      title: 'Cone: r = 3, h = 4',
      caption:
        'Unfolded, the curved surface is a sector and the base is a circle. The slant height is ' +
        'just the hypotenuse of the radius and the height.',
      solid: 'cone',
      view: 'both',
      dimensions: { radius: 3, height: 4, slant: 5 },
      showSlantTriangle: true,
    },
  },

  {
    name: 'solid_net (cylinder)',
    note: 'Unit 12 — the rectangle in a cylinder net is as wide as the circumference.',
    spec: {
      kind: 'solid_net',
      title: 'Cylinder: r = 5, h = 12',
      solid: 'cylinder',
      view: 'both',
      dimensions: { radius: 5, height: 12 },
    },
  },

  {
    name: 'stat_plot (box)',
    note: 'Unit 13 — the box is literally the middle half of the data.',
    spec: {
      kind: 'stat_plot',
      title: 'Arm spans (cm)',
      caption: 'The shaded box holds the middle half of the class. How wide is it?',
      plot: 'box',
      axisLabel: 'arm span (cm)',
      summary: { min: 132, q1: 145, median: 152, q3: 161, max: 178 },
      highlightIqr: true,
    },
  },

  {
    name: 'stat_plot (histogram)',
    note: 'Unit 13 — grouped frequency, the picture behind an estimated mean.',
    spec: {
      kind: 'stat_plot',
      title: 'Test scores',
      plot: 'histogram',
      axisLabel: 'score',
      bins: [
        { from: 0, to: 20, frequency: 2 },
        { from: 20, to: 40, frequency: 7 },
        { from: 40, to: 60, frequency: 12 },
        { from: 60, to: 80, frequency: 9 },
        { from: 80, to: 100, frequency: 3 },
      ],
    },
  },

  {
    name: 'stat_plot (dot)',
    note: 'Unit 13 — repeats stack, which is what makes the mode visible.',
    spec: {
      kind: 'stat_plot',
      title: 'Siblings per student',
      plot: 'dot',
      axisLabel: 'number of siblings',
      values: [0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 0, 1, 2, 1, 2, 5],
    },
  },
];
