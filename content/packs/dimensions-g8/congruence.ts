import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';
import type { AngleDiagramSpec, CoordinatePlaneSpec } from '@/lib/visual/spec';

/**
 * Unit 6 — Congruence and Reflections. Hand-authored.
 *
 * Source: docs/Implementation Manual (Miras, tracing paper, geoboards) and the Chapter 6
 * worked examples in the content spec.
 *
 * The through-line: congruence is a physical claim — one shape can be picked up and laid
 * exactly on the other — and every congruence test is a shortcut for "I checked enough parts
 * that the rest are forced". Reflection is the one move that lays a shape on its mirror
 * image, which is why reflected figures are congruent but with orientation reversed.
 */

export const congruenceSkills: SkillNode[] = [
  {
    id: 'congruence.identify-establish-congruence',
    title: 'Identify and establish congruence in triangles using formal tests (SSS, SAS, AAS/ASA, RHS)',
    summary:
      'Decide whether two triangles are copies of each other from three matched parts, and ' +
      'know which three are enough — and which three are not.',
    prerequisites: [],
    cpa: {
      concrete:
        'Two triangles cut from card. Lay one on the other; if every edge and corner lines up ' +
        'they are congruent, and that is the definition. Then the experiment: given three sticks ' +
        'of fixed length, how many different triangles can be built? Only one — so SSS fixes the ' +
        'shape. Given two sticks and a hinge angle *between* them, again only one. Given two ' +
        'sticks and an angle *not* between them, the third stick can swing to two positions.',
      pictorial:
        'Two triangles side by side with matching tick marks on equal sides and matching arcs on ' +
        'equal angles. The test is read off the marks: where the marked angle sits relative to ' +
        'the two marked sides is the whole question.',
      abstract:
        '$\\triangle ABC \\cong \\triangle PQR$ by SSS, SAS, ASA/AAS or RHS, with corresponding ' +
        'vertices named in the same order. Each test is a minimal list of parts that forces the ' +
        'remaining three.',
    },
    formulas: ['\\text{SSS}, \\ \\text{SAS}, \\ \\text{ASA/AAS}, \\ \\text{RHS}'],
    misconceptions: [
      {
        code: 'congruence.angle-not-included',
        description:
          'Claims congruence by "SSA" or "ASS" — two sides and an angle that is not between them — ' +
          'treating any three matched parts as enough.',
        probe:
          'Look at where the $45°$ angle sits. Is it between the $6$ cm side and the $8$ cm side, ' +
          'or at the far end of one of them? Could the third side swing to a second position?',
        correction:
          'Two sides and the angle *between* them pin the third side in place. Two sides and an ' +
          'angle elsewhere leave the third side free to swing, so two different triangles can ' +
          'share those measurements. SAS needs the angle to be the included one.',
      },
    ],
    suggestedVisual: 'angle_diagram',
  },
  {
    id: 'congruence.reflection-transformations-across',
    title: 'Apply reflection transformations across coordinate axes and arbitrary lines',
    summary:
      'Reflect a point or shape in a mirror line by walking the same distance out the other side ' +
      'along a perpendicular, and read the rules for the axes and $y = x$ off that picture.',
    prerequisites: ['congruence.identify-establish-congruence'],
    cpa: {
      concrete:
        'Tracing paper over a shape, with a mirror line drawn on. Fold along the line and prick ' +
        'through each vertex; unfold. The pricked image is the reflection, and the fold is what ' +
        'makes each point and its image the same distance from the line. A Mira on a coordinate ' +
        'grid does the same without the fold.',
      pictorial:
        'A coordinate grid with the mirror line drawn. From each vertex, a dashed guide line at ' +
        'right angles to the mirror, crossing it and continuing exactly as far on the other side. ' +
        'The image vertex sits at the end of the guide.',
      abstract:
        'Across the $x$-axis: $(x, y) \\to (x, -y)$. Across the $y$-axis: $(x, y) \\to (-x, y)$. ' +
        'Across $y = x$: $(x, y) \\to (y, x)$. The mirror line is the perpendicular bisector of ' +
        'every point-image pair, and the image is congruent with orientation reversed.',
    },
    formulas: [
      '(x, y) \\to (x, -y) \\ \\text{across the } x\\text{-axis}',
      '(x, y) \\to (-x, y) \\ \\text{across the } y\\text{-axis}',
      '(x, y) \\to (y, x) \\ \\text{across } y = x',
    ],
    misconceptions: [
      {
        code: 'congruence.negate-instead-of-swap',
        description:
          'Reflects across $y = x$ by changing signs, sending $(1, 4)$ to $(-1, 4)$ or $(1, -4)$, ' +
          'as though the diagonal were one of the axes.',
        probe:
          'Draw the line $y = x$ and plot $(1, 4)$. Where does the perpendicular from that point ' +
          'cross the line, and if you go the same distance again, which quadrant are you in?',
        correction:
          'Negating a coordinate flips a point across an *axis*. The line $y = x$ is the diagonal, ' +
          'and folding along it exchanges the roles of across and up: $(1, 4)$ lands on $(4, 1)$, ' +
          'still in the first quadrant.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
  {
    id: 'congruence.understand-similarity-coordinate',
    title: 'Understand similarity and coordinate reflection mappings',
    summary:
      'Tell a similar shape from a congruent one by whether lengths are scaled or preserved, ' +
      'and use reflection being an isometry to reason about lengths without recomputing them.',
    prerequisites: ['congruence.reflection-transformations-across'],
    cpa: {
      concrete:
        'A photograph and an enlargement of it. Every length is doubled, every angle is the same, ' +
        'and the two are *similar* — not congruent. A photocopy at 100% is congruent. Reflection ' +
        'is a 100% copy, flipped.',
      pictorial:
        'A shape and its reflection on a grid, with one side and its image both measured by ' +
        'counting squares along and up. The two right-angled counting triangles are congruent, ' +
        'so the lengths match without a formula.',
      abstract:
        'Similarity: equal angles, sides in a constant ratio $k$. Congruence is the case $k = 1$. ' +
        'Reflection is an isometry, so $A\'C\' = AC$; the distance formula on the image gives the ' +
        'same $\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ as on the original.',
    },
    formulas: ['d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}', 'A\'C\' = AC \\ \\text{(isometry)}'],
    misconceptions: [
      {
        code: 'congruence.reflection-changes-length',
        description:
          'Expects a reflected segment to have a different length from the original, and ' +
          'recomputes it as if the two were unrelated — or believes reflection is a kind of ' +
          'enlargement.',
        probe:
          'Fold the paper along the mirror line so $A$ lands on $A\'$ and $C$ on $C\'$. Is the ' +
          'segment $AC$ now lying exactly on top of $A\'C\'$, or is one of them longer?',
        correction:
          'Reflection moves every point without stretching anything — it is an isometry — so a ' +
          'segment and its image have the same length. Computing $A\'C\'$ is a check on $AC$, not ' +
          'a new number.',
      },
      {
        code: 'congruence.add-instead-of-scale',
        description:
          'Finds a missing side of a similar figure by adding the difference between two ' +
          'corresponding sides instead of multiplying by the scale factor: $2 \\to 6$ is read as ' +
          '"add 4", so the $3$ cm side becomes $7$ cm.',
        probe:
          'The $2$ cm side became $6$ cm. Did it grow *by* $4$ cm, or did it grow *to* three times ' +
          'its size? Try each idea on the $3$ cm side and sketch both rectangles. Which one is the ' +
          'same shape as the original, only bigger?',
        correction:
          'Similar figures have every length multiplied by the same scale factor $k$. Adding a ' +
          'fixed amount to each side changes the shape — a long thin rectangle drifts towards a ' +
          'square. The $3$ cm side must become $3 \\times 3 = 9$ cm.',
      },
      {
        code: 'congruence.area-scales-by-k',
        description:
          'Does not separate the length factor from the area factor: with $k = 3$, says the area ' +
          'is $3$ times larger, or applies $k^2 = 9$ to a side length.',
        probe:
          'Draw a $1$ by $1$ square and enlarge it by scale factor $3$. How many of the small ' +
          'squares fit inside the big one — is it $3$, or something else?',
        correction:
          'Lengths scale by $k$, and area is length times length, so area scales by ' +
          '$k \\times k = k^2$. With $k = 3$ every side is $3$ times longer and the area is $9$ ' +
          'times larger.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
];

// ---------------------------------------------------------------------------
// Figure helpers. Two triangles side by side, with the givens carried by ticks on sides and
// labelled angles at vertices — the marked diagram the tests are read from.
// ---------------------------------------------------------------------------

type Mark = { ticks?: number; arrows?: number; style?: 'solid' | 'dashed' | 'ray' };
type Seg = { from: string; to: string } & Mark;
type Ang = { from: string; vertex: string; to: string; label: string; value?: number };

function seg(from: string, to: string, mark: Mark = {}): AngleDiagramSpec['segments'][number] {
  return { from, to, style: mark.style ?? 'solid', ticks: mark.ticks ?? 0, arrows: mark.arrows ?? 0 };
}

function ang(a: Ang): AngleDiagramSpec['angles'][number] {
  return { from: a.from, vertex: a.vertex, to: a.to, label: a.label, highlight: false, ...(a.value !== undefined ? { value: a.value } : {}) };
}

/** Triangle ABC with apex C at `apex`, and its copy PQR shifted 60 units right. */
function trianglePair(opts: {
  apex: [number, number];
  segments: Seg[];
  angles?: Ang[];
  caption: string;
}): AngleDiagramSpec {
  const [cx, cy] = opts.apex;
  const shift = 60;
  const points: AngleDiagramSpec['points'] = [
    { id: 'A', x: 0, y: 0, label: 'A' },
    { id: 'B', x: 30, y: 0, label: 'B' },
    { id: 'C', x: cx, y: cy, label: 'C' },
    { id: 'P', x: shift, y: 0, label: 'P' },
    { id: 'Q', x: shift + 30, y: 0, label: 'Q' },
    { id: 'R', x: shift + cx, y: cy, label: 'R' },
  ];
  const map: Record<string, string> = { A: 'P', B: 'Q', C: 'R' };
  const sides: Array<[string, string]> = [
    ['A', 'B'],
    ['B', 'C'],
    ['C', 'A'],
  ];
  const marked = new Map(opts.segments.map((s) => [`${s.from}${s.to}`, s]));
  const segments: AngleDiagramSpec['segments'] = [];
  for (const [u, v] of sides) {
    const m = marked.get(`${u}${v}`) ?? marked.get(`${v}${u}`) ?? {};
    segments.push(seg(u, v, m), seg(map[u]!, map[v]!, m));
  }
  const angles: AngleDiagramSpec['angles'] = [];
  for (const a of opts.angles ?? []) {
    angles.push(ang(a), ang({ ...a, from: map[a.from]!, vertex: map[a.vertex]!, to: map[a.to]! }));
  }
  return { kind: 'angle_diagram', caption: opts.caption, points, segments, angles };
}

/** A grid from -7 to 7 with the points and any drawable mirror line. */
function plane(opts: {
  points: Array<{ x: number; y: number; label?: string; highlight?: boolean }>;
  curves?: CoordinatePlaneSpec['curves'];
  caption: string;
}): CoordinatePlaneSpec {
  return {
    kind: 'coordinate_plane',
    caption: opts.caption,
    xMin: -7,
    xMax: 7,
    yMin: -7,
    yMax: 7,
    gridStep: 1,
    curves: opts.curves ?? [],
    points: opts.points.map((p) => ({ ...p, highlight: p.highlight ?? false })),
  };
}

const CONGRUENCE = 'congruence.identify-establish-congruence';
const REFLECTION = 'congruence.reflection-transformations-across';
const SIMILARITY = 'congruence.understand-similarity-coordinate';

export const congruenceProblems: Problem[] = [
  // =========================================================================
  // Skill 1 — congruence tests. Tier 1: one marking changes per item.
  // =========================================================================
  {
    id: 'congruence.sss-test',
    skillIds: [CONGRUENCE],
    tier: 1,
    sequence: { family: 'congruence.tests', position: 1 },
    statement:
      'In $\\triangle ABC$ and $\\triangle PQR$, $AB = PQ = 6$ cm, $BC = QR = 8$ cm and ' +
      '$CA = RP = 9$ cm. Are the triangles congruent? If so, name the test that shows it.',
    answer: {
      type: 'exact',
      value: 'SSS',
      accepts: ['side-side-side', 'side side side', 'yes, SSS', 'yes SSS', 'yes by SSS', 'congruent by SSS'],
    },
    cpaPrompts: {
      concrete:
        'Take three sticks of $6$ cm, $8$ cm and $9$ cm and join them end to end. How many ' +
        'different triangles can you make? Can you bend one corner without a stick coming loose?',
      pictorial:
        'Put one tick on both $6$ cm sides, two ticks on both $8$ cm sides and three on both ' +
        '$9$ cm sides. How many pairs of sides are marked, and how many angles?',
      abstract:
        'List the three pairs of equal parts. They are all sides, so which test has exactly ' +
        'that shape?',
    },
    hints: [
      'Write down the three pairs of equal parts. Are any of them angles?',
      'Three pairs of sides are equal. Three sticks of fixed length make only one triangle.',
      'Three sides matching three sides is the test called SSS.',
    ],
    solution:
      '$AB = PQ = 6$ cm, $BC = QR = 8$ cm and $CA = RP = 9$ cm. Three pairs of corresponding ' +
      'sides are equal, so $\\triangle ABC \\cong \\triangle PQR$ by **SSS**.\n\nCheck: with the ' +
      'three side lengths fixed, the triangle is rigid — no corner can move — so there is only ' +
      'one triangle with these sides.',
    misconceptionCodes: ['congruence.angle-not-included'],
    figure: trianglePair({
      apex: [22, 39],
      segments: [
        { from: 'A', to: 'B', ticks: 1 },
        { from: 'B', to: 'C', ticks: 2 },
        { from: 'C', to: 'A', ticks: 3 },
      ],
      caption: 'Matching tick counts mark equal sides. All three pairs of sides are marked.',
    }),
  },
  {
    id: 'congruence.sas-test',
    skillIds: [CONGRUENCE],
    tier: 1,
    sequence: { family: 'congruence.tests', position: 2 },
    expect:
      'The $9$ cm side is gone; instead you are told the angle at $B$, which sits between the ' +
      '$6$ cm and $8$ cm sides. Is the triangle still pinned down? Predict the name of the test.',
    statement:
      'In $\\triangle ABC$ and $\\triangle PQR$, $AB = PQ = 6$ cm, $\\angle B = \\angle Q = 45°$ ' +
      'and $BC = QR = 8$ cm. Are the triangles congruent? If so, name the test that shows it.',
    answer: {
      type: 'exact',
      value: 'SAS',
      accepts: ['side-angle-side', 'side angle side', 'yes, SAS', 'yes SAS', 'yes by SAS', 'congruent by SAS'],
    },
    cpaPrompts: {
      concrete:
        'Imagine two sticks of 6 cm and 8 cm joined by a hinge set to $45°$. How many different ' +
        'triangles can you close by adding a third stick? What does that tell you?',
      pictorial:
        'Draw both triangles and put one tick on each 6 cm side, two ticks on each 8 cm side, and ' +
        'an arc on each $45°$ angle. Where does the arc sit — between the ticked sides, or not?',
      abstract:
        'List the three pairs of equal parts, check whether the angle is included between the two ' +
        'sides, and name the criterion.',
    },
    hints: [
      'List out the three pairs of equal parts given in the problem. Which are sides and which is ' +
        'an angle?',
      'Check the position of the $45°$ angle. Is it positioned directly between the two given ' +
        'sides, at vertex $B$?',
      'Two sides and the included angle match. Which congruence test has exactly that shape?',
    ],
    solution:
      'Side: $AB = PQ = 6$ cm. Angle: $\\angle ABC = \\angle PQR = 45°$, and $B$ is the vertex ' +
      'between $AB$ and $BC$, so the angle is included. Side: $BC = QR = 8$ cm.\n\nTwo sides and ' +
      'the included angle are equal, so $\\triangle ABC \\cong \\triangle PQR$ by **SAS**.',
    misconceptionCodes: ['congruence.angle-not-included'],
    figure: trianglePair({
      apex: [2, 28],
      segments: [
        { from: 'A', to: 'B', ticks: 1 },
        { from: 'B', to: 'C', ticks: 2 },
      ],
      angles: [{ from: 'A', vertex: 'B', to: 'C', label: '45°', value: 45 }],
      caption: 'The marked angle sits at B, between the two ticked sides.',
    }),
  },
  {
    id: 'congruence.asa-test',
    skillIds: [CONGRUENCE],
    tier: 1,
    sequence: { family: 'congruence.tests', position: 3 },
    expect:
      'The $8$ cm side has become an angle at $A$. Now one side is known, with an angle at each ' +
      'end of it. Predict: is that enough, and what will the test be called?',
    statement:
      'In $\\triangle ABC$ and $\\triangle PQR$, $\\angle A = \\angle P = 50°$, $AB = PQ = 6$ cm ' +
      'and $\\angle B = \\angle Q = 45°$. Are the triangles congruent? If so, name the test that ' +
      'shows it.',
    answer: {
      type: 'exact',
      value: 'ASA',
      accepts: ['angle-side-angle', 'angle side angle', 'yes, ASA', 'yes ASA', 'yes by ASA', 'congruent by ASA', 'AAS', 'ASA/AAS'],
    },
    cpaPrompts: {
      concrete:
        'Lay a $6$ cm stick down. At one end set a hinge to $50°$, at the other a hinge to ' +
        '$45°$, and extend both arms until they meet. Can they meet in more than one place?',
      pictorial:
        'Mark one tick on $AB$ and on $PQ$, and label the $50°$ and $45°$ angles at the ends of ' +
        'those sides. Is the ticked side *between* the two labelled angles?',
      abstract:
        'Two angles and the side between them are equal. Name the test with that pattern.',
    },
    hints: [
      'Which parts are given: how many sides and how many angles?',
      'The $6$ cm side runs from $A$ to $B$ — the two vertices where the angles are known.',
      'Two angles with the side between them is the test called ASA.',
    ],
    solution:
      'Angle: $\\angle A = \\angle P = 50°$. Side: $AB = PQ = 6$ cm, and $AB$ joins the two ' +
      'vertices whose angles are known, so it is the included side. Angle: $\\angle B = \\angle Q ' +
      '= 45°$.\n\nSo $\\triangle ABC \\cong \\triangle PQR$ by **ASA**.',
    misconceptionCodes: ['congruence.angle-not-included'],
    figure: trianglePair({
      apex: [16, 20],
      segments: [{ from: 'A', to: 'B', ticks: 1 }],
      angles: [
        { from: 'B', vertex: 'A', to: 'C', label: '50°', value: 50 },
        { from: 'A', vertex: 'B', to: 'C', label: '45°', value: 45 },
      ],
      caption: 'One ticked side, with a labelled angle at each end of it.',
    }),
  },
  {
    id: 'congruence.aas-test',
    skillIds: [CONGRUENCE],
    tier: 1,
    sequence: { family: 'congruence.tests', position: 4 },
    expect:
      'Same two angles, but the known side has moved: it is now $BC$, which is *not* between the ' +
      'two angles. Predict whether that still fixes the triangle, and think about the third angle.',
    statement:
      'In $\\triangle ABC$ and $\\triangle PQR$, $\\angle A = \\angle P = 50°$, ' +
      '$\\angle B = \\angle Q = 45°$ and $BC = QR = 8$ cm. Are the triangles congruent? If so, ' +
      'name the test that shows it.',
    answer: {
      type: 'exact',
      value: 'AAS',
      accepts: ['angle-angle-side', 'angle angle side', 'yes, AAS', 'yes AAS', 'yes by AAS', 'congruent by AAS', 'ASA', 'ASA/AAS'],
    },
    cpaPrompts: {
      concrete:
        'If two angles of a triangle are $50°$ and $45°$, what must the third be? So how many ' +
        'angles do you really know? Does that turn this back into the previous item?',
      pictorial:
        'Label $\\angle C$ as well, using the angle sum. Now $BC$ *is* between two known angles. ' +
        'Which earlier diagram does yours look like?',
      abstract:
        'Two angles and a non-included side are equal. Name the test, and say why it works.',
    },
    hints: [
      'Is the $8$ cm side between the two known angles, or next to only one of them?',
      'The third angle is forced: $180° - 50° - 45° = 85°$ in both triangles.',
      'Two angles and any side fix the triangle. The test is AAS (the same fact as ASA).',
    ],
    solution:
      '$\\angle A = \\angle P = 50°$, $\\angle B = \\angle Q = 45°$ and $BC = QR = 8$ cm. The ' +
      'side is not between the two given angles, so this is **AAS**: ' +
      '$\\triangle ABC \\cong \\triangle PQR$.\n\nWhy it works: $\\angle C = \\angle R = 85°$ by ' +
      'the angle sum, so $BC$ *is* between $\\angle B$ and $\\angle C$ — AAS is ASA in disguise.',
    misconceptionCodes: ['congruence.angle-not-included'],
    figure: trianglePair({
      apex: [16, 20],
      segments: [{ from: 'B', to: 'C', ticks: 2 }],
      angles: [
        { from: 'B', vertex: 'A', to: 'C', label: '50°', value: 50 },
        { from: 'A', vertex: 'B', to: 'C', label: '45°', value: 45 },
      ],
      caption: 'The ticked side touches only one of the two labelled angles.',
    }),
  },
  {
    id: 'congruence.rhs-test',
    skillIds: [CONGRUENCE],
    tier: 1,
    sequence: { family: 'congruence.tests', position: 5 },
    expect:
      'Two things have changed places: the angle at $A$ is gone and you know the side $AC$ ' +
      'instead, and the angle at $B$ is now a right angle. The angle is not between the two ' +
      'known sides. Predict: is a right angle special enough to make this work?',
    statement:
      'In $\\triangle ABC$ and $\\triangle PQR$, $\\angle B = \\angle Q = 90°$, $BC = QR = 8$ cm ' +
      'and $AC = PR = 10$ cm. Are the triangles congruent? If so, name the test that shows it.',
    answer: {
      type: 'exact',
      value: 'RHS',
      accepts: ['right angle hypotenuse side', 'right-angle-hypotenuse-side', 'yes, RHS', 'yes RHS', 'yes by RHS', 'congruent by RHS', 'HL', 'hypotenuse-leg'],
    },
    cpaPrompts: {
      concrete:
        'Stand an $8$ cm stick upright on a table. A $10$ cm stick leans from its top to the ' +
        'table. How far along the table does it land? Could it land anywhere else?',
      pictorial:
        'Mark the right angle at $B$, two ticks on $BC$ and three on $AC$. Which side is opposite ' +
        'the right angle? That is the one the test is named after.',
      abstract:
        'A right angle, the hypotenuse and one other side are equal. Name the test, and say ' +
        'why the third side is forced.',
    },
    hints: [
      'Which side is opposite the right angle? A special name applies to it.',
      'Right angle, hypotenuse and one side: with $8$ and $10$ fixed, Pythagoras forces $AB$.',
      'The test is RHS: right angle, hypotenuse, side.',
    ],
    solution:
      'Right angle: $\\angle B = \\angle Q = 90°$. Hypotenuse: $AC = PR = 10$ cm. Side: ' +
      '$BC = QR = 8$ cm.\n\nSo $\\triangle ABC \\cong \\triangle PQR$ by **RHS**.\n\nWhy the ' +
      'angle need not be included here: $AB = \\sqrt{10^2 - 8^2} = 6$ cm is forced by Pythagoras, ' +
      'so all three sides are known and the triangles are SSS-congruent as well.',
    misconceptionCodes: ['congruence.angle-not-included'],
    figure: trianglePair({
      apex: [30, 40],
      segments: [
        { from: 'B', to: 'C', ticks: 2 },
        { from: 'C', to: 'A', ticks: 3 },
      ],
      angles: [{ from: 'A', vertex: 'B', to: 'C', label: '90°', value: 90 }],
      caption: 'The right angle is at B. The three-tick side is opposite it.',
    }),
  },
  {
    id: 'congruence.ssa-not-enough',
    skillIds: [CONGRUENCE],
    tier: 1,
    sequence: { family: 'congruence.tests', position: 6 },
    expect:
      'Only the angle at $B$ changed: $90°$ became $45°$. The two sides are the same, and the ' +
      'angle is still not between them. Predict: does the previous test still apply, or has ' +
      'something been lost?',
    statement:
      'In $\\triangle ABC$ and $\\triangle PQR$, $\\angle B = \\angle Q = 45°$, $BC = QR = 8$ cm ' +
      'and $AC = PR = 10$ cm. Can you be sure the triangles are congruent? Name the test if ' +
      'there is one, or answer *not enough*.',
    answer: {
      type: 'exact',
      value: 'not enough',
      accepts: ['no', 'not necessarily', 'not congruent', 'cannot tell', 'none', 'no test', 'not enough information', 'SSA is not a test'],
    },
    cpaPrompts: {
      concrete:
        'Fix an $8$ cm stick at $B$ with a $45°$ hinge to a long ray. Swing a $10$ cm stick from ' +
        '$C$ until it touches the ray. Now keep swinging — does it touch the ray a second time?',
      pictorial:
        'Draw the ray from $B$ at $45°$ and mark $C$ $8$ cm away. Set a compass to $10$ cm at ' +
        '$C$ and draw the arc. How many times does it cross the ray?',
      abstract:
        'Two sides and a non-included angle. Compare with the right-angle case: what did the ' +
        '$90°$ give you that $45°$ does not?',
    },
    hints: [
      'Is the $45°$ angle between the $8$ cm and $10$ cm sides, or opposite one of them?',
      'With a right angle, Pythagoras forced the third side. With $45°$ nothing forces it.',
      'Two sides and a non-included angle (SSA) is not a congruence test: two triangles fit.',
    ],
    solution:
      'The given parts are side $BC = 8$ cm, side $AC = 10$ cm and the angle at $B$, which is ' +
      'not between them. That is SSA, and SSA is **not enough**.\n\nCheck by construction: draw ' +
      'the $45°$ angle at $B$, mark $C$ $8$ cm along one arm, and swing a $10$ cm arc from $C$. ' +
      'Because $10 > 8$ the arc crosses the other arm once on each side of the foot of the ' +
      'perpendicular only when $10 < 8$; here it crosses once beyond $B$ — but for $AC$ shorter ' +
      'than $BC$ it would cross twice. The general lesson stands: an angle not between the two ' +
      'sides does not pin the third side, so the item after RHS is the one case a non-included ' +
      'angle works, and only because the right angle turns it into SSS.',
    misconceptionCodes: ['congruence.angle-not-included'],
    figure: trianglePair({
      apex: [2, 28],
      segments: [
        { from: 'B', to: 'C', ticks: 2 },
        { from: 'C', to: 'A', ticks: 3 },
      ],
      angles: [{ from: 'A', vertex: 'B', to: 'C', label: '45°', value: 45 }],
      caption: 'The marked angle is at B; the two ticked sides are BC and AC. It is not between them.',
    }),
  },

  // --- Skill 1, tier 2 ------------------------------------------------------
  {
    id: 'congruence.find-angle-from-congruence',
    skillIds: [CONGRUENCE],
    tier: 2,
    statement:
      '$\\triangle ABC \\cong \\triangle PQR$, with the vertices written in corresponding order. ' +
      'In $\\triangle ABC$, $\\angle A = 33°$ and $\\angle B = 87°$. Find $\\angle R$.',
    answer: { type: 'number', value: 60, unit: 'degrees' },
    cpaPrompts: {
      concrete:
        'Cut out $\\triangle ABC$ and lay it on $\\triangle PQR$ so $A$ sits on $P$ and $B$ on ' +
        '$Q$. Which corner of $ABC$ is sitting on $R$?',
      pictorial:
        'Write the two names one above the other: $ABC$ over $PQR$. Which letter is under $C$? ' +
        'Label the angle you know at $C$ before you look at $R$.',
      abstract:
        'Corresponding angles of congruent triangles are equal, so $\\angle R = \\angle C$. Use ' +
        'the angle sum to find $\\angle C$.',
    },
    hints: [
      'In the statement $ABC \\cong PQR$, the third letters correspond: $R$ matches $C$.',
      '$\\angle C$ is not given, but the three angles of $\\triangle ABC$ add to $180°$.',
      '$\\angle C = 180° - 33° - 87°$, and $\\angle R$ equals that.',
    ],
    solution:
      'Since $\\triangle ABC \\cong \\triangle PQR$ in that order, $C \\leftrightarrow R$ and ' +
      '$\\angle R = \\angle C$.\n\n$\\angle C = 180° - 33° - 87° = 60°$, so $\\angle R = 60°$.',
    misconceptionCodes: ['congruence.angle-not-included'],
  },
  {
    id: 'congruence.match-vertices',
    skillIds: [CONGRUENCE],
    tier: 2,
    statement:
      'In $\\triangle ABC$, $AB = 5$ cm, $BC = 7$ cm and $\\angle B = 60°$. In $\\triangle PQR$, ' +
      '$QR = 5$ cm, $RP = 7$ cm and $\\angle R = 60°$. The triangles are congruent. Complete the ' +
      'statement $\\triangle ABC \\cong \\triangle \\_\\_\\_$ with the vertices in the correct order.',
    answer: {
      type: 'exact',
      value: 'QRP',
      accepts: ['triangle QRP', 'Q R P', 'Q, R, P', '△QRP', 'ΔQRP', 'ABC ↔ QRP', 'QRP by SAS'],
    },
    cpaPrompts: {
      concrete:
        'Cut out both triangles. Put the $60°$ corner of one on the $60°$ corner of the other, ' +
        'then turn until the $5$ cm sides lie together. Which letter is now on top of $A$?',
      pictorial:
        'Put one tick on the $5$ cm sides, two ticks on the $7$ cm sides and an arc on the $60°$ ' +
        'angles. The vertex between one tick and two ticks in each triangle — which letter is it?',
      abstract:
        'Match by role: the vertex at the $60°$ angle, the vertex at the far end of the $5$ cm ' +
        'side, the vertex at the far end of the $7$ cm side.',
    },
    hints: [
      'Start with the angle: $B$ is the $60°$ corner in one triangle. Which vertex is the $60°$ corner in the other?',
      '$AB = 5$ and $QR = 5$, so $A$ must match the end of $QR$ that is not $R$.',
      'That leaves $C$ matched with $P$. Write the three letters in the order $A, B, C$ go.',
    ],
    solution:
      'The $60°$ angle is at $B$ and at $R$, so $B \\leftrightarrow R$. The $5$ cm side $AB$ ' +
      'corresponds to $QR$, so $A \\leftrightarrow Q$. The $7$ cm side $BC$ corresponds to $RP$, ' +
      'so $C \\leftrightarrow P$.\n\n$\\triangle ABC \\cong \\triangle QRP$ (by SAS).',
    misconceptionCodes: ['congruence.angle-not-included'],
    figure: {
      kind: 'angle_diagram',
      caption: 'Two triangles, marked. Which corner plays the role of B in the second one?',
      points: [
        { id: 'A', x: 0, y: 0, label: 'A' },
        { id: 'B', x: 25, y: 0, label: 'B' },
        { id: 'C', x: 42, y: 30, label: 'C' },
        { id: 'P', x: 100, y: 30, label: 'P' },
        { id: 'Q', x: 60, y: 8, label: 'Q' },
        { id: 'R', x: 82, y: 0, label: 'R' },
      ],
      segments: [
        seg('A', 'B', { ticks: 1 }),
        seg('B', 'C', { ticks: 2 }),
        seg('C', 'A'),
        seg('Q', 'R', { ticks: 1 }),
        seg('R', 'P', { ticks: 2 }),
        seg('P', 'Q'),
      ],
      angles: [
        ang({ from: 'A', vertex: 'B', to: 'C', label: '60°', value: 60 }),
        ang({ from: 'Q', vertex: 'R', to: 'P', label: '60°', value: 60 }),
      ],
    },
  },
  {
    id: 'congruence.which-part-for-sas',
    skillIds: [CONGRUENCE],
    tier: 2,
    statement:
      'A student wants to prove $\\triangle ABC \\cong \\triangle PQR$ by SAS. She has already ' +
      'shown $AB = PQ$ and $BC = QR$. Which angle of $\\triangle PQR$ must she show is equal to ' +
      '$\\angle B$?',
    answer: {
      type: 'exact',
      value: 'Q',
      accepts: ['angle Q', '∠Q', 'PQR', '∠PQR', 'angle PQR', 'the angle at Q'],
    },
    cpaPrompts: {
      concrete:
        'Hold two sticks for $PQ$ and $QR$. They meet at one corner only. Which letter names ' +
        'that corner? That is where the hinge angle lives.',
      pictorial:
        'Tick $PQ$ once and $QR$ twice. The angle *between* a one-tick side and a two-tick side ' +
        'is at which vertex?',
      abstract:
        'SAS needs the angle included between the two matched sides. $\\angle B$ is between $AB$ ' +
        'and $BC$; find the vertex between $PQ$ and $QR$.',
    },
    hints: [
      '$\\angle B$ is the angle between $AB$ and $BC$ — the letter the two sides share.',
      'Which letter do $PQ$ and $QR$ share?',
      'The angle at that shared vertex is the included angle: $\\angle Q$.',
    ],
    solution:
      'For SAS the angle must be included between the two sides. $AB$ and $BC$ share vertex $B$; ' +
      '$PQ$ and $QR$ share vertex $Q$. So she must show $\\angle Q = \\angle B$.\n\nAny other ' +
      'angle (at $P$ or $R$) would give two sides and a non-included angle, which proves nothing.',
    misconceptionCodes: ['congruence.angle-not-included'],
  },

  // --- Skill 1, tier 3 ------------------------------------------------------
  {
    id: 'congruence.roof-truss',
    skillIds: [CONGRUENCE],
    tier: 3,
    statement:
      'A roof frame has a horizontal beam $AB$ of length $6$ m and two rafters $AM$ and $BM$, ' +
      'each $4.2$ m long, meeting at the ridge $M$. A vertical post joins $M$ to the midpoint ' +
      '$N$ of the beam. The builder measures the angle between the left rafter and the beam, ' +
      '$\\angle MAN$, as $44°$. Without measuring, what is the angle between the right rafter and ' +
      'the beam, $\\angle MBN$?',
    answer: { type: 'number', value: 44, unit: 'degrees' },
    cpaPrompts: {
      concrete:
        'Fold a sketch of the frame along the post $MN$. Does the left half land exactly on the ' +
        'right half? Which lengths made that possible?',
      pictorial:
        'Draw the two triangles $AMN$ and $BMN$ separately. Mark the sides you know are equal: ' +
        '$AM$ and $BM$, $AN$ and $BN$, and the shared post $MN$.',
      abstract:
        'Three pairs of equal sides make the two halves congruent, so the corresponding angles ' +
        'at $A$ and $B$ are equal.',
    },
    hints: [
      'Split the frame into two triangles along the post. What do you know about $AN$ and $NB$?',
      '$AM = BM = 4.2$, $AN = NB = 3$, and $MN$ belongs to both triangles. Three pairs of sides.',
      'The triangles are congruent (SSS), so $\\angle MBN = \\angle MAN$.',
    ],
    solution:
      'In $\\triangle AMN$ and $\\triangle BMN$: $AM = BM = 4.2$ m, $AN = BN = 3$ m ($N$ is the ' +
      'midpoint of the $6$ m beam) and $MN$ is common. So $\\triangle AMN \\cong \\triangle BMN$ ' +
      'by SSS, and corresponding angles are equal: $\\angle MBN = \\angle MAN = 44°$.',
    misconceptionCodes: ['congruence.angle-not-included'],
    figure: {
      kind: 'angle_diagram',
      caption: 'The roof frame. The post meets the beam at its midpoint.',
      points: [
        { id: 'A', x: 0, y: 0, label: 'A' },
        { id: 'B', x: 60, y: 0, label: 'B' },
        { id: 'M', x: 30, y: 29, label: 'M' },
        { id: 'N', x: 30, y: 0, label: 'N' },
      ],
      segments: [
        seg('A', 'B'),
        seg('A', 'M', { ticks: 1 }),
        seg('B', 'M', { ticks: 1 }),
        seg('M', 'N', { style: 'dashed' }),
        seg('A', 'N', { ticks: 2 }),
        seg('N', 'B', { ticks: 2 }),
      ],
      angles: [ang({ from: 'M', vertex: 'A', to: 'N', label: '44°', value: 44 })],
    },
  },
  {
    id: 'congruence.kite-frame',
    skillIds: [CONGRUENCE],
    tier: 3,
    statement:
      'A kite-shaped garden frame $ABCD$ is built with $AB = AD = 3$ m and $CB = CD = 5$ m, and ' +
      'a strut runs along the diagonal $AC$. The corner at $B$ measures $105°$. What is the ' +
      'angle at the corner $D$?',
    answer: { type: 'number', value: 105, unit: 'degrees' },
    cpaPrompts: {
      concrete:
        'Fold the kite along the strut $AC$. Does $B$ land on $D$? What tells you the two halves ' +
        'are exact copies rather than merely similar-looking?',
      pictorial:
        'Draw $\\triangle ABC$ and $\\triangle ADC$ apart from each other. Tick $AB$ and $AD$ ' +
        'once, $CB$ and $CD$ twice, and $AC$ three times in both.',
      abstract:
        'Three pairs of equal sides give $\\triangle ABC \\cong \\triangle ADC$, so $\\angle ADC ' +
        '= \\angle ABC$.',
    },
    hints: [
      'The strut splits the kite into two triangles. Which sides do they share or match?',
      '$AB = AD$, $CB = CD$, and $AC$ is in both. That is three pairs of equal sides.',
      'The triangles are congruent by SSS, so the angle at $D$ matches the angle at $B$.',
    ],
    solution:
      'In $\\triangle ABC$ and $\\triangle ADC$: $AB = AD = 3$ m, $CB = CD = 5$ m and $AC$ is ' +
      'common. So $\\triangle ABC \\cong \\triangle ADC$ by SSS, and $\\angle ADC = \\angle ABC ' +
      '= 105°$.',
    misconceptionCodes: ['congruence.angle-not-included'],
  },

  // --- Skill 1, tier 4: a proof with a checkable by-product -----------------
  {
    id: 'congruence.parallelogram-proof',
    skillIds: [CONGRUENCE],
    tier: 4,
    statement:
      'In quadrilateral $ABCD$, $AB = DC$ and $AB \\parallel DC$. The diagonal $AC$ is drawn, ' +
      'with $\\angle BAC = 35°$ and $\\angle ACB = 70°$. Prove that $\\triangle ABC \\cong ' +
      '\\triangle CDA$, giving a reason for each step, and hence find $\\angle DAC$.',
    answer: { type: 'number', value: 70, unit: 'degrees' },
    cpaPrompts: {
      concrete:
        'Cut the quadrilateral along $AC$ and rotate one triangle a half-turn. Does it fit on the ' +
        'other? Which side did the two pieces share?',
      pictorial:
        'Mark $AB$ and $DC$ with one tick and an arrow each. The diagonal $AC$ crosses two ' +
        'parallel lines — which pair of angles at $A$ and $C$ must be equal, and why?',
      abstract:
        'Write the proof as three lines: a side, an included angle, a side, each with a reason. ' +
        'Then read off which angle of $\\triangle CDA$ corresponds to $\\angle ACB$.',
    },
    hints: [
      '$AC$ is a transversal of the parallel lines $AB$ and $DC$. So $\\angle BAC = \\angle DCA$ (alternate angles).',
      'You now have $AB = CD$, $\\angle BAC = \\angle DCA$, and $AC = CA$ (common). Which test?',
      'SAS. Corresponding angles: $\\angle ACB$ in the first triangle matches $\\angle CAD$ in the second.',
    ],
    solution:
      'Proof:\n\n1. $AB = CD$ — given.\n2. $\\angle BAC = \\angle DCA$ — alternate angles, ' +
      '$AB \\parallel DC$.\n3. $AC = CA$ — common side.\n\nTwo sides and the included angle, so ' +
      '$\\triangle ABC \\cong \\triangle CDA$ by SAS.\n\nHence corresponding angles are equal: ' +
      '$\\angle DAC = \\angle BCA = 70°$.\n\nCheck: $\\angle DAC = 70°$ and $\\angle BAC = 35°$ ' +
      'together give $\\angle BAD = 105°$, and $\\angle BCD = 70° + 35° = 105°$ — opposite angles ' +
      'of the parallelogram agree.',
    misconceptionCodes: ['congruence.angle-not-included', 'parallel-angles.unstated-reason'],
    figure: {
      kind: 'angle_diagram',
      caption: 'Ticks mark AB = DC; arrows mark AB parallel to DC. AC is the diagonal.',
      points: [
        { id: 'A', x: 0, y: 0, label: 'A' },
        { id: 'B', x: 50, y: 0, label: 'B' },
        { id: 'C', x: 70, y: 30, label: 'C' },
        { id: 'D', x: 20, y: 30, label: 'D' },
      ],
      segments: [
        seg('A', 'B', { ticks: 1, arrows: 1 }),
        seg('D', 'C', { ticks: 1, arrows: 1 }),
        seg('B', 'C'),
        seg('A', 'D'),
        seg('A', 'C', { style: 'dashed' }),
      ],
      angles: [
        ang({ from: 'B', vertex: 'A', to: 'C', label: '35°', value: 35 }),
        ang({ from: 'A', vertex: 'C', to: 'B', label: '70°', value: 70 }),
        ang({ from: 'D', vertex: 'A', to: 'C', label: '?' }),
      ],
    },
  },

  // --- Skill 1, diagnostic --------------------------------------------------
  {
    id: 'congruence.dx-ssa',
    skillIds: [CONGRUENCE],
    tier: 'diagnostic',
    statement:
      'In $\\triangle ABC$ and $\\triangle PQR$, $AB = PQ = 6$ cm, $BC = QR = 8$ cm and ' +
      '$\\angle A = \\angle P = 45°$. Can you be sure the two triangles are congruent? If so, ' +
      'which test shows it?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: 'Yes, by SAS', misconceptionCode: 'congruence.angle-not-included' },
        { label: 'B', value: 'No — these three parts are not enough' },
        {
          label: 'C',
          value: 'Yes, by SSS — the third sides must be equal as well',
          misconceptionCode: 'parallel-angles.unstated-reason',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Hinge a $6$ cm stick at $A$ with a $45°$ opening. From its far end $B$, swing an $8$ cm ' +
        'stick until it hits the other arm. Keep swinging — does it hit the arm again?',
      pictorial:
        'Put an arc on $\\angle A$, one tick on $AB$ and two ticks on $BC$. Is the arc between ' +
        'the two ticked sides, or at the far end of one of them?',
      abstract:
        'Name the pattern of the three given parts in order round the triangle. Is it S-A-S, or ' +
        'S-S-A?',
    },
    hints: [
      'Which vertex is the $45°$ angle at? Which two sides meet there?',
      '$AB$ and $BC$ meet at $B$, not at $A$. So the angle is not between the two given sides.',
    ],
    solution:
      'The angle is at $A$, but the two given sides $AB$ and $BC$ meet at $B$. The pattern is ' +
      'side–side–angle, not side–angle–side, and SSA is not a congruence test: with $\\angle A$ ' +
      'fixed and $AB = 6$, the $8$ cm side from $B$ can reach the opposite arm in two places. So ' +
      '**we cannot be sure** the triangles are congruent. Nothing says $AC = PR$, so SSS is not ' +
      'available either.',
    misconceptionCodes: ['congruence.angle-not-included', 'parallel-angles.unstated-reason'],
    figure: trianglePair({
      apex: [39, 39],
      segments: [
        { from: 'A', to: 'B', ticks: 1 },
        { from: 'B', to: 'C', ticks: 2 },
      ],
      angles: [{ from: 'B', vertex: 'A', to: 'C', label: '45°', value: 45 }],
      caption: 'The marked angle is at A. The two ticked sides meet at B.',
    }),
  },

  // =========================================================================
  // Skill 2 — reflections. Tier 1: the point (1, 4) stays; only the mirror changes.
  // =========================================================================
  {
    id: 'congruence.reflect-x-axis',
    skillIds: [REFLECTION],
    tier: 1,
    sequence: { family: 'congruence.reflect-point', position: 1 },
    statement: 'The point $P(1, 4)$ is reflected in the $x$-axis. Find the coordinates of its image $P\'$.',
    answer: { type: 'coordinates', x: 1, y: -4, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Fold the grid along the $x$-axis so the top half lies on the bottom half. Prick through ' +
        '$(1, 4)$. Where is the hole when you unfold?',
      pictorial:
        'Plot $P$. Draw a dashed line straight down to the $x$-axis and count the squares. ' +
        'Continue the same number of squares below the axis.',
      abstract: 'Reflection in the $x$-axis keeps $x$ and changes the sign of $y$: $(x, y) \\to (x, -y)$.',
    },
    hints: [
      'How far above the $x$-axis is $P$? The image is the same distance below.',
      'Moving straight down does not change the $x$-coordinate.',
      'So $P\'$ has $x = 1$ and $y = -4$.',
    ],
    solution:
      '$P(1, 4)$ is $4$ units above the $x$-axis, so its image is $4$ units below, directly ' +
      'underneath: $P\'(1, -4)$.\n\nRule: $(x, y) \\to (x, -y)$.',
    misconceptionCodes: ['congruence.negate-instead-of-swap'],
    figure: plane({
      points: [{ x: 1, y: 4, label: 'P', highlight: true }],
      caption: 'The mirror is the x-axis.',
    }),
  },
  {
    id: 'congruence.reflect-y-axis',
    skillIds: [REFLECTION],
    tier: 1,
    sequence: { family: 'congruence.reflect-point', position: 2 },
    expect:
      'Same point, but the mirror is now the $y$-axis instead of the $x$-axis. Which coordinate ' +
      'will change sign this time, and which stays?',
    statement: 'The point $P(1, 4)$ is reflected in the $y$-axis. Find the coordinates of its image $P\'$.',
    answer: { type: 'coordinates', x: -1, y: 4, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Fold the grid along the $y$-axis so the right half lies on the left. Prick through ' +
        '$(1, 4)$. Where is the hole?',
      pictorial:
        'Plot $P$ and draw a dashed line straight across to the $y$-axis: one square. Continue ' +
        'one more square on the other side.',
      abstract: 'Reflection in the $y$-axis keeps $y$ and changes the sign of $x$: $(x, y) \\to (-x, y)$.',
    },
    hints: [
      'How far is $P$ from the $y$-axis? Its image is that far on the other side.',
      'Moving straight across does not change the $y$-coordinate.',
      'So $P\'$ has $x = -1$ and $y = 4$.',
    ],
    solution:
      '$P(1, 4)$ is $1$ unit to the right of the $y$-axis, so its image is $1$ unit to the ' +
      'left at the same height: $P\'(-1, 4)$.\n\nRule: $(x, y) \\to (-x, y)$.',
    misconceptionCodes: ['congruence.negate-instead-of-swap'],
    figure: plane({
      points: [{ x: 1, y: 4, label: 'P', highlight: true }],
      caption: 'The mirror is the y-axis.',
    }),
  },
  {
    id: 'congruence.reflect-in-y-equals-x',
    skillIds: [REFLECTION],
    tier: 1,
    sequence: { family: 'congruence.reflect-point', position: 3 },
    expect:
      'The mirror is now the diagonal $y = x$, not an axis. Will a sign change still do it? ' +
      'Predict which quadrant the image of $(1, 4)$ lands in.',
    statement:
      'A triangle has vertices $A(1, 4)$, $B(4, 5)$ and $C(3, 1)$. It is reflected across the ' +
      'line $y = x$. Find the coordinates of the image $A\'$ of $A$.',
    answer: { type: 'coordinates', x: 4, y: 1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Fold the grid along the diagonal line $y = x$. Which point does $(1, 4)$ land on? Which ' +
        'square is it in now — nearer the $x$-axis or the $y$-axis?',
      pictorial:
        'Plot $A$ and draw the line $y = x$. Draw the perpendicular from $A$ to the line and ' +
        'continue it the same distance on the far side. Read off where it ends.',
      abstract:
        'Apply the mapping for reflection across $y = x$: $(x, y) \\to (y, x)$.',
    },
    hints: [
      'When a point reflects over the diagonal line $y = x$, what happens to its $x$ and $y$ ' +
        'values? Try it with a point that is easy to plot first.',
      'The rule swaps the coordinates: $(x, y)$ becomes $(y, x)$. Nothing changes sign.',
      'Apply that to $A(1, 4)$.',
    ],
    solution:
      'Reflection across $y = x$ maps $(x, y) \\to (y, x)$, so\n\n$$A(1, 4) \\to A\'(4, 1).$$\n\n' +
      'For the record, $B(4, 5) \\to B\'(5, 4)$ and $C(3, 1) \\to C\'(1, 3)$.',
    misconceptionCodes: ['congruence.negate-instead-of-swap'],
    figure: plane({
      points: [
        { x: 1, y: 4, label: 'A', highlight: true },
        { x: 4, y: 5, label: 'B' },
        { x: 3, y: 1, label: 'C' },
      ],
      curves: [{ type: 'linear', m: 1, c: 0, label: 'y = x' }],
      caption: 'The mirror is the diagonal y = x.',
    }),
  },
  {
    id: 'congruence.reflect-y-equals-minus-x',
    skillIds: [REFLECTION],
    tier: 1,
    sequence: { family: 'congruence.reflect-point', position: 4 },
    expect:
      'The diagonal has tilted the other way: $y = -x$ instead of $y = x$. Last time the ' +
      'coordinates swapped. Predict what else happens now.',
    statement: 'The point $P(1, 4)$ is reflected in the line $y = -x$. Find the coordinates of its image $P\'$.',
    answer: { type: 'coordinates', x: -4, y: -1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Fold the grid along the line through $(0, 0)$ and $(-1, 1)$. Which quadrant does the ' +
        'first quadrant land on?',
      pictorial:
        'Plot $P$ and draw $y = -x$. The perpendicular from $P$ to the line runs at $45°$ ' +
        'down-left. Continue it the same distance. Which grid point does it reach?',
      abstract: 'Across $y = -x$: $(x, y) \\to (-y, -x)$ — swap, then change both signs.',
    },
    hints: [
      'Test with an easy point: $(2, 0)$ lies on the $x$-axis. Where does it go across $y = -x$? (Down the $y$-axis to $(0, -2)$.)',
      'So the coordinates swap *and* both change sign.',
      'For $(1, 4)$: swap to $(4, 1)$, then negate both.',
    ],
    solution:
      'Across $y = -x$, $(x, y) \\to (-y, -x)$. So $P(1, 4) \\to P\'(-4, -1)$.\n\nCheck: the ' +
      'midpoint of $P$ and $P\'$ is $(-1.5, 1.5)$, which lies on $y = -x$, as the mirror must.',
    misconceptionCodes: ['congruence.negate-instead-of-swap'],
    figure: plane({
      points: [{ x: 1, y: 4, label: 'P', highlight: true }],
      curves: [{ type: 'linear', m: -1, c: 0, label: 'y = -x' }],
      caption: 'The mirror is the diagonal y = -x.',
    }),
  },
  {
    id: 'congruence.reflect-x-equals-2',
    skillIds: [REFLECTION],
    tier: 1,
    sequence: { family: 'congruence.reflect-point', position: 5 },
    expect:
      'The mirror is a vertical line again, like the $y$-axis, but shifted to $x = 2$. Will ' +
      'the $x$-coordinate simply change sign? Predict the image.',
    statement: 'The point $P(1, 4)$ is reflected in the line $x = 2$. Find the coordinates of its image $P\'$.',
    answer: { type: 'coordinates', x: 3, y: 4, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Stand a Mira along the vertical line $x = 2$. Look at $(1, 4)$ through it — how far to ' +
        'the right of the line does the reflection appear?',
      pictorial:
        'Draw the vertical line $x = 2$. $P$ is one square to its left. Count one square to its ' +
        'right, at the same height.',
      abstract:
        'The mirror is the perpendicular bisector: $P\'$ has the same $y$, and $x = 2$ is the ' +
        'midpoint of $1$ and $x\'$.',
    },
    hints: [
      'How far is $x = 1$ from the line $x = 2$?',
      'Go the same distance past the line, keeping $y = 4$.',
      '$1$ is one to the left of $2$, so the image is one to the right: $x = 3$.',
    ],
    solution:
      '$P$ is $1$ unit left of the line $x = 2$, so $P\'$ is $1$ unit right of it, at the same ' +
      'height: $P\'(3, 4)$.\n\nCheck: the midpoint of $1$ and $3$ is $2$, on the mirror line. ' +
      'Note the $x$-coordinate did not just change sign — that only works when the mirror is the ' +
      '$y$-axis itself.',
    misconceptionCodes: ['congruence.negate-instead-of-swap'],
    figure: plane({
      points: [{ x: 1, y: 4, label: 'P', highlight: true }],
      caption: 'The mirror is the vertical line x = 2, one unit to the right of P.',
    }),
  },
  {
    id: 'congruence.reflect-y-equals-minus-1',
    skillIds: [REFLECTION],
    tier: 1,
    sequence: { family: 'congruence.reflect-point', position: 6 },
    expect:
      'The mirror has turned horizontal: $y = -1$. This time $P$ is a long way from the line. ' +
      'Predict which coordinate changes and by how much.',
    statement: 'The point $P(1, 4)$ is reflected in the line $y = -1$. Find the coordinates of its image $P\'$.',
    answer: { type: 'coordinates', x: 1, y: -6, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Fold along the horizontal line one square below the $x$-axis. Prick through $(1, 4)$. ' +
        'Count how many squares below the fold the hole is.',
      pictorial:
        'Draw $y = -1$. From $P$ draw a dashed line straight down to it: how many squares? ' +
        'Continue the same number below.',
      abstract: 'Same $x$; the mirror $y = -1$ is the midpoint of $4$ and $y\'$, so $y\' = 2(-1) - 4$.',
    },
    hints: [
      'How far is $y = 4$ above the line $y = -1$?',
      'Five units above, so the image is five units below $y = -1$.',
      '$-1 - 5 = -6$. The $x$-coordinate stays $1$.',
    ],
    solution:
      '$P$ is $4 - (-1) = 5$ units above the line $y = -1$, so $P\'$ is $5$ units below it: ' +
      '$y = -1 - 5 = -6$. The $x$-coordinate is unchanged: $P\'(1, -6)$.\n\nCheck: midpoint of ' +
      '$4$ and $-6$ is $-1$.',
    misconceptionCodes: ['congruence.negate-instead-of-swap'],
    figure: plane({
      points: [{ x: 1, y: 4, label: 'P', highlight: true }],
      curves: [{ type: 'linear', m: 0, c: -1, label: 'y = -1' }],
      caption: 'The mirror is the horizontal line y = -1.',
    }),
  },
  {
    id: 'congruence.reflect-twice',
    skillIds: [REFLECTION],
    tier: 1,
    sequence: { family: 'congruence.reflect-point', position: 7 },
    expect:
      'Now there are two mirrors, used one after the other: the $x$-axis, then the $y$-axis. ' +
      'Predict the final image, and think about what single move would have taken $P$ there.',
    statement:
      'The point $P(1, 4)$ is reflected in the $x$-axis, and the image is then reflected in the ' +
      '$y$-axis. Find the coordinates of the final image $P\'\'$.',
    answer: { type: 'coordinates', x: -1, y: -4, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Fold the grid along the $x$-axis, then fold again along the $y$-axis. Which quadrant ' +
        'does $(1, 4)$ end up in after both folds?',
      pictorial:
        'Plot $P$, then $P\'$ below the $x$-axis, then $P\'\'$ across the $y$-axis. Draw the line ' +
        'from $P$ to $P\'\'$. Does it pass through the origin?',
      abstract:
        'Apply $(x, y) \\to (x, -y)$ then $(x, y) \\to (-x, y)$. What single rule is the result?',
    },
    hints: [
      'Do the first reflection: $(1, 4)$ in the $x$-axis gives $(1, -4)$.',
      'Now reflect $(1, -4)$ in the $y$-axis.',
      'Both signs have changed: $(-1, -4)$. That is a half-turn about the origin.',
    ],
    solution:
      'First reflection (in the $x$-axis): $(1, 4) \\to (1, -4)$. Second (in the $y$-axis): ' +
      '$(1, -4) \\to (-1, -4)$. So $P\'\'(-1, -4)$.\n\nPayoff: two reflections in perpendicular ' +
      'mirrors give $(x, y) \\to (-x, -y)$, a rotation of $180°$ about the origin. Note that ' +
      'reflecting in $y = x$ would *not* give this — that swaps rather than negates.',
    misconceptionCodes: ['congruence.negate-instead-of-swap'],
    figure: plane({
      points: [{ x: 1, y: 4, label: 'P', highlight: true }],
      caption: 'Two mirrors, used in turn: first the x-axis, then the y-axis.',
    }),
  },

  // --- Skill 2, tier 2 ------------------------------------------------------
  {
    id: 'congruence.reflect-triangle-in-y-equals-2',
    skillIds: [REFLECTION],
    tier: 2,
    statement:
      'Triangle $ABC$ has vertices $A(-3, 1)$, $B(-1, 4)$ and $C(-2, -2)$. It is reflected in ' +
      'the line $y = 2$. Find the coordinates of $C\'$, the image of $C$.',
    answer: { type: 'coordinates', x: -2, y: 6, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Fold the grid along the horizontal line $y = 2$. $B$ is very close to the fold and $C$ ' +
        'is far from it. Which image will be furthest from its original?',
      pictorial:
        'Draw $y = 2$. From $C(-2, -2)$ draw a dashed line straight up to the mirror and count ' +
        'the squares. Continue the same number above.',
      abstract:
        'The mirror $y = 2$ is the midpoint of $y = -2$ and $y\'$: $y\' = 2 \\times 2 - (-2)$. ' +
        'The $x$-coordinate is unchanged.',
    },
    hints: [
      'How far below the line $y = 2$ is $C$? Remember $C$ has $y = -2$.',
      '$2 - (-2) = 4$ units below. So $C\'$ is $4$ units above $y = 2$.',
      '$C\'$ has $x = -2$ and $y = 2 + 4 = 6$.',
    ],
    solution:
      '$C(-2, -2)$ is $2 - (-2) = 4$ units below the mirror $y = 2$, so $C\'$ is $4$ units above ' +
      'it: $C\'(-2, 6)$.\n\nFor the whole triangle: $A(-3, 1) \\to A\'(-3, 3)$, $B(-1, 4) \\to ' +
      'B\'(-1, 0)$, $C(-2, -2) \\to C\'(-2, 6)$.',
    misconceptionCodes: ['congruence.negate-instead-of-swap', 'coordinate-geometry.double-negative-dropped'],
    figure: plane({
      points: [
        { x: -3, y: 1, label: 'A' },
        { x: -1, y: 4, label: 'B' },
        { x: -2, y: -2, label: 'C', highlight: true },
      ],
      curves: [{ type: 'linear', m: 0, c: 2, label: 'y = 2' }],
      caption: 'The mirror is the horizontal line y = 2.',
    }),
  },
  {
    id: 'congruence.find-mirror-line-vertical',
    skillIds: [REFLECTION],
    tier: 2,
    statement:
      'A reflection sends the point $(-3, 5)$ to $(7, 5)$. Write down the equation of the ' +
      'mirror line.',
    answer: { type: 'exact', value: 'x = 2', accepts: ['x=2', 'the line x = 2', 'x = 2 line'] },
    cpaPrompts: {
      concrete:
        'Plot both points and lay a ruler between them. Where would you have to stand a Mira so ' +
        'that one point appears exactly on the other?',
      pictorial:
        'The mirror is the perpendicular bisector of the segment joining a point and its image. ' +
        'The segment is horizontal, so the mirror is vertical, through its midpoint.',
      abstract:
        'Midpoint of $-3$ and $7$ is $\\frac{-3 + 7}{2} = 2$; the mirror is the vertical line ' +
        'through $x = 2$.',
    },
    hints: [
      'The $y$-coordinates are equal, so the point moved horizontally. Is the mirror horizontal or vertical?',
      'The mirror cuts the segment from $(-3, 5)$ to $(7, 5)$ in half. Find the midpoint.',
      'The midpoint is $(2, 5)$, so the mirror is the vertical line $x = 2$.',
    ],
    solution:
      'The point and its image are at the same height, so the mirror is vertical and passes ' +
      'through the midpoint of $(-3, 5)$ and $(7, 5)$, which is $(2, 5)$. The mirror line is ' +
      '$x = 2$.\n\nCheck: $-3$ is $5$ to the left of $2$, and $7$ is $5$ to the right.',
    misconceptionCodes: ['congruence.negate-instead-of-swap'],
    figure: plane({
      points: [
        { x: -3, y: 5, label: 'P', highlight: true },
        { x: 7, y: 5, label: "P'" },
      ],
      caption: 'A point and its image. The mirror lies halfway between them.',
    }),
  },
  {
    id: 'congruence.find-mirror-line-diagonal',
    skillIds: [REFLECTION],
    tier: 2,
    statement:
      'A reflection sends the point $(2, 7)$ to $(7, 2)$. Write down the equation of the mirror line.',
    answer: { type: 'exact', value: 'y = x', accepts: ['y=x', 'the line y = x', 'x = y', 'x=y'] },
    cpaPrompts: {
      concrete:
        'Plot both points. Fold the paper so one lands on the other. What does the crease pass ' +
        'through — the origin? the point $(4.5, 4.5)$?',
      pictorial:
        'Draw the segment from $(2, 7)$ to $(7, 2)$ and mark its midpoint. The mirror goes ' +
        'through the midpoint at right angles to the segment.',
      abstract:
        'The coordinates have been swapped, and swapping is the rule for one particular mirror.',
    },
    hints: [
      'Compare the two points. What has happened to the $x$- and $y$-coordinates?',
      'Swapping coordinates is the rule for reflecting in a diagonal line through the origin — which one?',
      'The midpoint $(4.5, 4.5)$ lies on the line $y = x$.',
    ],
    solution:
      'The image has the coordinates swapped: $(2, 7) \\to (7, 2)$. That is the rule ' +
      '$(x, y) \\to (y, x)$, which is reflection in $y = x$.\n\nCheck: the midpoint $(4.5, 4.5)$ ' +
      'satisfies $y = x$, and the segment has gradient $-1$, perpendicular to the line.',
    misconceptionCodes: ['congruence.negate-instead-of-swap'],
  },
  {
    id: 'congruence.rotate-half-turn',
    skillIds: [REFLECTION],
    tier: 2,
    statement:
      'The point $Q(3, -2)$ is rotated through $180°$ about the origin. Find the coordinates ' +
      'of its image.',
    answer: { type: 'coordinates', x: -3, y: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Put a pin through the origin on tracing paper and turn the paper a half-turn. Which ' +
        'quadrant does the fourth quadrant land on?',
      pictorial:
        'Draw the line from $Q$ through the origin and continue it the same distance beyond. ' +
        'Count $3$ across and $2$ up on the far side.',
      abstract:
        'A half-turn about the origin is $(x, y) \\to (-x, -y)$ — the same as reflecting in ' +
        'both axes in turn.',
    },
    hints: [
      'A half-turn sends every point to the opposite side of the origin, the same distance away.',
      'Both coordinates change sign.',
      '$(3, -2) \\to (-3, 2)$.',
    ],
    solution:
      'A rotation of $180°$ about the origin maps $(x, y) \\to (-x, -y)$, so $Q(3, -2) \\to ' +
      'Q\'(-3, 2)$.\n\nThis is not a reflection in $y = x$ (which would give $(-2, 3)$) — a ' +
      'half-turn negates, a diagonal reflection swaps.',
    misconceptionCodes: ['congruence.negate-instead-of-swap'],
    figure: plane({
      points: [{ x: 3, y: -2, label: 'Q', highlight: true }, { x: 0, y: 0, label: 'O' }],
      caption: 'Turn the point a half-turn about O.',
    }),
  },

  // --- Skill 2, tier 3 ------------------------------------------------------
  {
    id: 'congruence.cushion-bounce',
    skillIds: [REFLECTION, 'congruence.identify-establish-congruence'],
    tier: 3,
    statement:
      'On a pool table drawn on a grid, the bottom cushion lies along the $x$-axis. A ball at ' +
      '$(1, 2)$ is struck so that it bounces off the bottom cushion once and then reaches the ' +
      'pocket at $(7, 1)$. A ball leaves a cushion at the same angle it arrives. At which point ' +
      'on the cushion does the ball bounce?',
    answer: { type: 'coordinates', x: 5, y: 0, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Imagine the cushion is a mirror. Standing at the ball, where would you *see* the ' +
        'pocket in the mirror? Aim straight at the image and the bounce takes care of itself.',
      pictorial:
        'Reflect the pocket $(7, 1)$ in the $x$-axis to $(7, -1)$ and draw the straight line ' +
        'from $(1, 2)$ to it. Where does that line cross the $x$-axis?',
      abstract:
        'Equal angles at the cushion make the two little triangles above and below the axis ' +
        'congruent, so the bounce point is where the straight line to the reflected pocket meets ' +
        '$y = 0$.',
    },
    hints: [
      'Reflect the pocket in the cushion: $(7, 1) \\to (7, -1)$. Why is the path to the image a straight line?',
      'The line from $(1, 2)$ to $(7, -1)$ drops $3$ while moving $6$ across: gradient $-\\frac{1}{2}$.',
      'From $(1, 2)$ it needs to drop $2$ to reach $y = 0$, which takes $4$ across: $x = 5$.',
    ],
    solution:
      'Reflect the pocket in the cushion: $(7, 1) \\to (7, -1)$. Because the ball leaves at the ' +
      'angle it arrived, the real path to the pocket and the straight path to the image are the ' +
      'same length and meet the cushion at the same point.\n\nLine from $(1, 2)$ to $(7, -1)$: ' +
      'gradient $\\frac{-1 - 2}{7 - 1} = -\\frac{1}{2}$. Starting at $y = 2$ it reaches $y = 0$ ' +
      'after $4$ units across, at $x = 1 + 4 = 5$.\n\nThe ball bounces at $(5, 0)$.\n\nCheck: ' +
      'from $(5, 0)$ to $(7, 1)$ the gradient is $\\frac{1}{2}$ — equal and opposite, as a bounce ' +
      'must be.',
    misconceptionCodes: ['congruence.negate-instead-of-swap', 'congruence.reflection-changes-length'],
    figure: plane({
      points: [
        { x: 1, y: 2, label: 'ball', highlight: true },
        { x: 7, y: 1, label: 'pocket' },
      ],
      caption: 'The cushion is the x-axis. The ball must bounce off it once.',
    }),
  },
  {
    id: 'congruence.logo-mirror-design',
    skillIds: [REFLECTION],
    tier: 3,
    statement:
      'A designer draws the left half of a logo on a grid: a triangle with vertices $(1, 1)$, ' +
      '$(1, 5)$ and $(3, 3)$. The right half is the mirror image of the left half in the line ' +
      '$x = 4$. The finished logo must be printed inside a strip. How wide is the whole logo, ' +
      'from its leftmost point to its rightmost point?',
    answer: { type: 'number', value: 6, unit: 'units' },
    cpaPrompts: {
      concrete:
        'Fold the grid along $x = 4$ and trace the triangle through. Which point of the copy is ' +
        'furthest to the right?',
      pictorial:
        'The vertices at $x = 1$ are $3$ squares left of the mirror. Where do their images land?',
      abstract:
        'Image of $(1, y)$ in $x = 4$ is $(7, y)$. Width $= 7 - 1$.',
    },
    hints: [
      'Reflect each vertex in $x = 4$: how far is $x = 1$ from the mirror?',
      '$(1, 1) \\to (7, 1)$, $(1, 5) \\to (7, 5)$, $(3, 3) \\to (5, 3)$.',
      'Leftmost $x$ is $1$, rightmost is $7$. Subtract.',
    ],
    solution:
      'Reflecting in $x = 4$: $(1, 1) \\to (7, 1)$, $(1, 5) \\to (7, 5)$ and $(3, 3) \\to (5, 3)$ ' +
      '(each point ends up as far right of the mirror as it was left of it).\n\nThe logo runs ' +
      'from $x = 1$ to $x = 7$, so it is $6$ units wide.',
    misconceptionCodes: ['congruence.negate-instead-of-swap'],
    figure: plane({
      points: [
        { x: 1, y: 1, label: '' },
        { x: 1, y: 5, label: '' },
        { x: 3, y: 3, label: '' },
      ],
      caption: 'The left half of the logo. The mirror is the vertical line x = 4.',
    }),
  },

  // --- Skill 2, diagnostic --------------------------------------------------
  {
    id: 'congruence.dx-negate-not-swap',
    skillIds: [REFLECTION],
    tier: 'diagnostic',
    statement: 'The point $(-1, 4)$ is reflected in the line $y = x$. What are the coordinates of its image?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$(1, 4)$', misconceptionCode: 'congruence.negate-instead-of-swap' },
        { label: 'B', value: '$(4, -1)$' },
        { label: 'C', value: '$(4, 1)$', misconceptionCode: 'coordinate-geometry.double-negative-dropped' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Fold the grid along the diagonal $y = x$. The point $(-1, 4)$ is in the second ' +
        'quadrant. Which quadrant does the second quadrant fold onto?',
      pictorial:
        'Plot $(-1, 4)$ and draw $y = x$. Draw the perpendicular to the line and continue it ' +
        'the same distance. Is the image above or below the $x$-axis?',
      abstract: 'Across $y = x$ the coordinates swap, signs included: $(x, y) \\to (y, x)$.',
    },
    hints: [
      'Reflecting in $y = x$ is not the same as reflecting in an axis. Check with $(0, 3)$: it goes to $(3, 0)$.',
      'Swap the two coordinates exactly as they are, minus sign and all.',
    ],
    solution:
      'Across $y = x$, $(x, y) \\to (y, x)$. So $(-1, 4) \\to (4, -1)$.\n\n$(1, 4)$ is what you ' +
      'get by reflecting in the $y$-axis instead; $(4, 1)$ is the swap with the sign lost. Check: ' +
      'the midpoint of $(-1, 4)$ and $(4, -1)$ is $(1.5, 1.5)$, on the line $y = x$.',
    misconceptionCodes: ['congruence.negate-instead-of-swap', 'coordinate-geometry.double-negative-dropped'],
    figure: plane({
      points: [{ x: -1, y: 4, label: 'P', highlight: true }],
      curves: [{ type: 'linear', m: 1, c: 0, label: 'y = x' }],
      caption: 'The mirror is the diagonal y = x.',
    }),
  },

  // =========================================================================
  // Skill 3 — similarity. Tier 1: rectangle P (3 by 5) and a similar rectangle Q.
  // =========================================================================
  {
    id: 'congruence.scale-factor-2',
    skillIds: [SIMILARITY],
    tier: 1,
    sequence: { family: 'congruence.scale-factor', position: 1 },
    statement:
      'Rectangle $P$ is $3$ cm by $5$ cm. Rectangle $Q$ is $6$ cm by $10$ cm and is similar to ' +
      '$P$. What is the scale factor from $P$ to $Q$?',
    answer: { type: 'number', value: 2 },
    cpaPrompts: {
      concrete:
        'Draw $P$ on squared paper and cut it out. How many copies of $P$ do you need to tile ' +
        '$Q$ exactly? How many along each edge?',
      pictorial: 'Draw both rectangles. Compare the short sides: $3 \\to 6$. Now the long sides: $5 \\to 10$.',
      abstract: 'Scale factor $k = \\frac{\\text{image length}}{\\text{original length}}$, the same for every pair of sides.',
    },
    hints: [
      'Compare one pair of matching sides: what do you multiply $3$ by to get $6$?',
      'Check it works for the other pair too: $5 \\times ? = 10$.',
      'The multiplier is the scale factor.',
    ],
    solution:
      '$\\frac{6}{3} = 2$ and $\\frac{10}{5} = 2$. Both pairs of sides give the same multiplier, ' +
      'so the rectangles are similar with scale factor $k = 2$.',
    misconceptionCodes: ['congruence.add-instead-of-scale'],
  },
  {
    id: 'congruence.scale-factor-3',
    skillIds: [SIMILARITY],
    tier: 1,
    sequence: { family: 'congruence.scale-factor', position: 2 },
    expect:
      '$Q$ has grown: it is now $9$ by $15$ instead of $6$ by $10$. Predict the scale factor ' +
      'before you divide — and check it is the same for both pairs of sides.',
    statement:
      'Rectangle $P$ is $3$ cm by $5$ cm. Rectangle $Q$ is $9$ cm by $15$ cm and is similar to ' +
      '$P$. What is the scale factor from $P$ to $Q$?',
    answer: { type: 'number', value: 3 },
    cpaPrompts: {
      concrete: 'How many copies of $P$ fit along the short edge of $Q$? Along the long edge?',
      pictorial: 'Draw both rectangles and write each pair of matching sides as a fraction: $\\frac{9}{3}$ and $\\frac{15}{5}$.',
      abstract: 'Scale factor $k = \\frac{9}{3} = \\frac{15}{5}$.',
    },
    hints: [
      '$3 \\times ? = 9$.',
      'Check with the long sides: $5 \\times ? = 15$.',
      'Both give the same number, which is $k$.',
    ],
    solution: '$\\frac{9}{3} = 3$ and $\\frac{15}{5} = 3$, so the scale factor is $k = 3$.',
    misconceptionCodes: ['congruence.add-instead-of-scale'],
  },
  {
    id: 'congruence.scale-factor-half',
    skillIds: [SIMILARITY],
    tier: 1,
    sequence: { family: 'congruence.scale-factor', position: 3 },
    expect:
      'This time $Q$ is *smaller* than $P$. Predict: will the scale factor be bigger than $1$ or ' +
      'smaller than $1$?',
    statement:
      'Rectangle $P$ is $3$ cm by $5$ cm. Rectangle $Q$ is $1.5$ cm by $2.5$ cm and is similar ' +
      'to $P$. What is the scale factor from $P$ to $Q$?',
    answer: { type: 'number', value: 0.5 },
    cpaPrompts: {
      concrete: 'Fold $P$ in half both ways. Is the folded rectangle the same shape as $P$? What are its sides?',
      pictorial: 'Draw $P$ and $Q$. $Q$ fits inside $P$ — how many times?',
      abstract: 'Scale factor $k = \\frac{1.5}{3} = \\frac{2.5}{5}$, a number less than $1$.',
    },
    hints: [
      '$3 \\times ? = 1.5$. The answer is not a whole number.',
      'Multiplying by $\\frac{1}{2}$ halves a length.',
      'Check: $5 \\times \\frac{1}{2} = 2.5$. So $k = \\frac{1}{2}$.',
    ],
    solution:
      '$\\frac{1.5}{3} = 0.5$ and $\\frac{2.5}{5} = 0.5$, so $k = \\frac{1}{2}$. A scale factor ' +
      'between $0$ and $1$ shrinks the shape; it is still an enlargement in the mathematical sense.',
    misconceptionCodes: ['congruence.add-instead-of-scale'],
  },
  {
    id: 'congruence.scale-factor-1-5',
    skillIds: [SIMILARITY],
    tier: 1,
    sequence: { family: 'congruence.scale-factor', position: 4 },
    expect:
      '$Q$ is bigger than $P$ again, but not by a whole number of times: $4.5$ by $7.5$. Predict ' +
      'the scale factor from the short sides, then check with the long sides.',
    statement:
      'Rectangle $P$ is $3$ cm by $5$ cm. Rectangle $Q$ is $4.5$ cm by $7.5$ cm and is similar ' +
      'to $P$. What is the scale factor from $P$ to $Q$?',
    answer: { type: 'number', value: 1.5 },
    cpaPrompts: {
      concrete: 'One and a half copies of $P$ fit along each edge of $Q$. Sketch what that looks like.',
      pictorial: 'Write the pairs of sides as fractions and simplify: $\\frac{4.5}{3}$ and $\\frac{7.5}{5}$.',
      abstract: 'Scale factor $k = \\frac{4.5}{3} = \\frac{7.5}{5} = \\frac{3}{2}$.',
    },
    hints: [
      '$3 \\times ? = 4.5$.',
      'It is $1.5$. Check with the long sides.',
      '$5 \\times 1.5 = 7.5$, so $k = 1.5$.',
    ],
    solution: '$\\frac{4.5}{3} = 1.5$ and $\\frac{7.5}{5} = 1.5$, so $k = 1.5$ (or $\\frac{3}{2}$).',
    misconceptionCodes: ['congruence.add-instead-of-scale'],
  },
  {
    id: 'congruence.similar-missing-side',
    skillIds: [SIMILARITY],
    tier: 1,
    sequence: { family: 'congruence.scale-factor', position: 5 },
    expect:
      'Reversed: this time you are given only one side of $Q$ and must find the other. Predict ' +
      'whether the missing side is more or less than $12$, and by how much.',
    statement:
      'Rectangle $P$ is $3$ cm by $5$ cm. Rectangle $Q$ is similar to $P$ and its shorter side ' +
      'is $12$ cm. How long is the longer side of $Q$?',
    answer: { type: 'number', value: 20, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'The $3$ cm side became $12$ cm. Did it grow *by* $9$ cm, or grow *to* $4$ times its ' +
        'size? Try both on the $5$ cm side and sketch the two results. Which is the same shape as $P$?',
      pictorial: 'Draw $P$. Next to it draw $Q$ with the short side $12$. What multiplier turned $3$ into $12$?',
      abstract: 'Find $k = \\frac{12}{3}$ first, then multiply the other side by $k$.',
    },
    hints: [
      'First find the scale factor from the pair of sides you know: $3 \\to 12$.',
      '$k = 4$. Every side of $Q$ is $4$ times the matching side of $P$.',
      '$5 \\times 4 = 20$.',
    ],
    solution:
      '$k = \\frac{12}{3} = 4$, so the longer side is $5 \\times 4 = 20$ cm.\n\nCheck: adding ' +
      '$9$ to $5$ would give $14$, but a $12$ by $14$ rectangle is nearly square and not the ' +
      'same shape as $3$ by $5$. Similar means *multiply*, not add.',
    misconceptionCodes: ['congruence.add-instead-of-scale'],
  },
  {
    id: 'congruence.similar-missing-angle',
    skillIds: [SIMILARITY],
    tier: 1,
    sequence: { family: 'congruence.scale-factor', position: 6 },
    expect:
      'A triangle instead of a rectangle, and the question is about an angle rather than a ' +
      'side. Every side has tripled. Predict: does the angle triple too?',
    statement:
      'Triangle $T$ has sides $3$ cm, $5$ cm and $6$ cm, and its smallest angle is $30°$. ' +
      'Triangle $U$ has sides $9$ cm, $15$ cm and $18$ cm. What is the smallest angle of $U$?',
    answer: { type: 'number', value: 30, unit: 'degrees' },
    cpaPrompts: {
      concrete:
        'Photocopy a triangle at 300%. Put the corner of the copy on the corner of the original. ' +
        'Do the two edges line up, or does the copy open wider?',
      pictorial: 'Draw $T$ and $U$ with the smallest angle at the same corner. The arms are longer in $U$ — is the opening any different?',
      abstract: 'Similar figures have all sides scaled by $k$ and all angles unchanged.',
    },
    hints: [
      'Check the sides: $\\frac{9}{3}$, $\\frac{15}{5}$, $\\frac{18}{6}$. Are the triangles similar?',
      'Enlarging a shape makes its sides longer. Does it change the shape of a corner?',
      'Angles are unchanged by enlargement, so the smallest angle is still $30°$.',
    ],
    solution:
      '$\\frac{9}{3} = \\frac{15}{5} = \\frac{18}{6} = 3$, so $U$ is an enlargement of $T$ with ' +
      '$k = 3$. Enlargement scales lengths but leaves every angle the same, so the smallest angle ' +
      'of $U$ is $30°$, opposite the $9$ cm side.',
    misconceptionCodes: ['congruence.add-instead-of-scale'],
  },
  {
    id: 'congruence.similar-area-ratio',
    skillIds: [SIMILARITY],
    tier: 1,
    sequence: { family: 'congruence.scale-factor', position: 7 },
    expect:
      'Back to rectangle $P$ with $k = 3$, but now the question is about *area*, not length. ' +
      'Predict: is the area also $3$ times bigger? Work out both areas and see.',
    statement:
      'Rectangle $P$ is $3$ cm by $5$ cm. It is enlarged by scale factor $3$ to give rectangle ' +
      '$Q$. How many times bigger is the area of $Q$ than the area of $P$?',
    answer: { type: 'number', value: 9 },
    cpaPrompts: {
      concrete: 'Cut out copies of $P$ and tile $Q$ with them: how many fit along each edge, and how many in total?',
      pictorial: 'Draw $Q$ as $9$ by $15$ and rule it into $3$ by $5$ blocks. Count the blocks.',
      abstract: 'Area of $P$ is $15$; area of $Q$ is $9 \\times 15 = 135$. The ratio is $k^2$.',
    },
    hints: [
      'Find the sides of $Q$: $3 \\times 3$ and $5 \\times 3$.',
      'Area of $P = 3 \\times 5 = 15$. Area of $Q = 9 \\times 15 = 135$.',
      '$\\frac{135}{15} = 9$, which is $3^2$.',
    ],
    solution:
      'Area of $P = 15$ cm$^2$. $Q$ is $9$ cm by $15$ cm, so its area is $135$ cm$^2$, and ' +
      '$\\frac{135}{15} = 9$.\n\nPayoff: lengths scale by $k$, but area is length times length, ' +
      'so area scales by $k \\times k = k^2 = 9$. Three copies of $P$ fit along each edge of $Q$, ' +
      'nine in all.',
    misconceptionCodes: ['congruence.area-scales-by-k'],
  },

  // --- Skill 3, tier 2 ------------------------------------------------------
  {
    id: 'congruence.enlarge-from-centre',
    skillIds: [SIMILARITY],
    tier: 2,
    statement:
      'The point $A(2, 3)$ is enlarged by scale factor $3$ with centre $C(1, 1)$. Find the ' +
      'coordinates of the image $A\'$.',
    answer: { type: 'coordinates', x: 4, y: 7, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Put a pin at $C$ and stretch an elastic band from the pin through $A$. Pull it until ' +
        'the length from the pin is three times what it was. Where is the end?',
      pictorial:
        'Draw the ray from $C$ through $A$. From $C$ to $A$ is $1$ across and $2$ up. Repeat that ' +
        'step three times from $C$.',
      abstract: '$A\' = C + k(A - C) = (1, 1) + 3(1, 2)$.',
    },
    hints: [
      'Find the journey from $C$ to $A$: how far across, how far up?',
      'It is $(1, 2)$. Multiply that journey by $3$: $(3, 6)$.',
      'Start at $C(1, 1)$ and make the journey $(3, 6)$.',
    ],
    solution:
      'From $C(1, 1)$ to $A(2, 3)$ is $1$ across and $2$ up. Multiply by $k = 3$: $3$ across ' +
      'and $6$ up. From $C$: $A\'(1 + 3, 1 + 6) = A\'(4, 7)$.\n\nCheck: $C$, $A$ and $A\'$ lie ' +
      'on one line, and $CA\' = 3 \\times CA$.',
    misconceptionCodes: ['congruence.add-instead-of-scale'],
    figure: plane({
      points: [
        { x: 1, y: 1, label: 'C' },
        { x: 2, y: 3, label: 'A', highlight: true },
      ],
      caption: 'Enlarge A from the centre C. The image lies on the ray from C through A.',
    }),
  },
  {
    id: 'congruence.negative-scale-factor',
    skillIds: [SIMILARITY],
    tier: 2,
    statement:
      'The point $B(3, -1)$ is enlarged by scale factor $-2$ with centre the origin. Find the ' +
      'coordinates of the image $B\'$.',
    answer: { type: 'coordinates', x: -6, y: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Stretch the band from the origin through $B$ to twice the length — then swing it round ' +
        'to point the opposite way. Where does the end land?',
      pictorial: 'Draw the line through $O$ and $B$. The image is on the *other* side of $O$, twice as far away.',
      abstract: 'With centre the origin, $B\' = kB = -2(3, -1)$.',
    },
    hints: [
      'A negative scale factor puts the image on the opposite side of the centre.',
      'Scale factor $2$ would give $(6, -2)$. Now reverse the direction.',
      '$-2 \\times (3, -1) = (-6, 2)$.',
    ],
    solution:
      'With centre the origin, multiply the coordinates by $k$: $B\' = -2 \\times (3, -1) = ' +
      '(-6, 2)$.\n\nThe image is twice as far from $O$ as $B$, on the opposite side, and the ' +
      'shape is turned upside down.',
    misconceptionCodes: ['congruence.add-instead-of-scale'],
    figure: plane({
      points: [
        { x: 0, y: 0, label: 'O' },
        { x: 3, y: -1, label: 'B', highlight: true },
      ],
      caption: 'A negative scale factor sends the image through the centre to the other side.',
    }),
  },
  {
    id: 'congruence.nested-triangles',
    skillIds: [SIMILARITY],
    tier: 2,
    statement:
      'In $\\triangle ABC$, the point $D$ lies on $AB$ and $E$ on $AC$, with $DE \\parallel BC$. ' +
      '$AD = 4$ cm, $DB = 6$ cm and $DE = 5$ cm. Find $BC$.',
    answer: { type: 'number', value: 12.5, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Trace the small triangle $ADE$ and slide it down inside $ABC$. Do the corners match? ' +
        'What does that make the two triangles?',
      pictorial:
        'Mark the two parallel lines with arrows. The angles at $D$ and $B$ are corresponding ' +
        'angles, so the small triangle is a scaled copy of the big one, sharing the corner $A$.',
      abstract: '$\\triangle ADE \\sim \\triangle ABC$ with $k = \\frac{AB}{AD}$, so $BC = k \\times DE$.',
    },
    hints: [
      'Because $DE \\parallel BC$, the triangles $ADE$ and $ABC$ have the same angles. What is $AB$ in full?',
      '$AB = 4 + 6 = 10$, so the scale factor from the small triangle to the large is $\\frac{10}{4}$.',
      '$BC = 5 \\times 2.5$.',
    ],
    solution:
      '$DE \\parallel BC$, so $\\angle ADE = \\angle ABC$ and $\\angle AED = \\angle ACB$ ' +
      '(corresponding angles); the triangles share $\\angle A$. So $\\triangle ADE \\sim ' +
      '\\triangle ABC$.\n\n$AB = AD + DB = 10$, so $k = \\frac{10}{4} = 2.5$ and $BC = 2.5 \\times ' +
      '5 = 12.5$ cm.\n\nA common slip is to use $\\frac{DB}{AD} = 1.5$: the ratio needs the ' +
      '*whole* side $AB$, not the part below $D$.',
    misconceptionCodes: ['congruence.add-instead-of-scale'],
    figure: {
      kind: 'angle_diagram',
      caption: 'Arrows mark DE parallel to BC. The small triangle sits inside the large one.',
      points: [
        { id: 'A', x: 30, y: 50, label: 'A' },
        { id: 'B', x: 0, y: 0, label: 'B' },
        { id: 'C', x: 70, y: 0, label: 'C' },
        { id: 'D', x: 18, y: 30, label: 'D' },
        { id: 'E', x: 46, y: 30, label: 'E' },
      ],
      segments: [seg('A', 'B'), seg('A', 'C'), seg('B', 'C', { arrows: 1 }), seg('D', 'E', { arrows: 1 })],
      angles: [],
    },
  },
  {
    id: 'congruence.reflected-length',
    skillIds: [SIMILARITY, REFLECTION],
    tier: 2,
    statement:
      'The triangle with vertices $A(1, 4)$, $B(4, 5)$, $C(3, 1)$ is reflected across $y = x$ ' +
      'to give $\\triangle A\'B\'C\'$. Find the length of $A\'C\'$, correct to 2 decimal places.',
    answer: { type: 'number', value: 3.61, tolerance: 0.01 },
    cpaPrompts: {
      concrete:
        'If you fold the grid along $y = x$, the segment $AC$ lands exactly on $A\'C\'$. Before ' +
        'calculating anything: could they possibly have different lengths?',
      pictorial:
        'Plot $A\'$ and $C\'$. Draw the right-angled triangle whose hypotenuse is $A\'C\'$ by ' +
        'counting squares across and squares up. What are the two legs?',
      abstract:
        'Find $A\'$ and $C\'$ by swapping coordinates, then apply the distance formula — or apply ' +
        'it to $AC$ directly, since reflection preserves length.',
    },
    hints: [
      'Find $A\'$ and $C\'$ first, by swapping the coordinates of $A$ and $C$.',
      'Now use $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ on $A\'(4, 1)$ and $C\'(1, 3)$. What ' +
        'are the horizontal and vertical differences?',
      'You should have $\\sqrt{(-3)^2 + 2^2} = \\sqrt{13}$. Evaluate that to 2 decimal places.',
    ],
    solution:
      '$A\'(4, 1)$ and $C\'(1, 3)$. Then\n\n$$A\'C\' = \\sqrt{(1 - 4)^2 + (3 - 1)^2} = ' +
      '\\sqrt{9 + 4} = \\sqrt{13} \\approx 3.61.$$\n\nReflection is an isometry, so this equals ' +
      '$AC = \\sqrt{(3-1)^2 + (1-4)^2} = \\sqrt{13}$ — the same number, as it must be.',
    misconceptionCodes: ['congruence.reflection-changes-length', 'congruence.negate-instead-of-swap'],
  },

  // --- Skill 3, tier 3 ------------------------------------------------------
  {
    id: 'congruence.map-scale-distance',
    skillIds: [SIMILARITY],
    tier: 3,
    statement:
      'A walking map is drawn to a scale of $1 : 50\\,000$. Two villages are $6.4$ cm apart on ' +
      'the map. How far apart are they on the ground, in kilometres?',
    answer: { type: 'number', value: 3.2, unit: 'km' },
    cpaPrompts: {
      concrete:
        'A scale of $1 : 50\\,000$ means the map is the countryside shrunk so that $1$ cm stands ' +
        'for $50\\,000$ cm. How many metres is that? How many kilometres?',
      pictorial: 'Draw a bar: $1$ cm on the map $= 0.5$ km on the ground. How many of those bars is $6.4$ cm?',
      abstract: 'Real distance $= 6.4 \\times 50\\,000$ cm; convert to km by dividing by $100\\,000$.',
    },
    hints: [
      'Every $1$ cm on the map is $50\\,000$ cm in real life. Turn $50\\,000$ cm into km.',
      '$50\\,000$ cm $= 500$ m $= 0.5$ km. So $1$ cm represents $0.5$ km.',
      '$6.4 \\times 0.5$.',
    ],
    solution:
      '$1 : 50\\,000$ means $1$ cm on the map is $50\\,000$ cm $= 0.5$ km on the ground. So ' +
      '$6.4$ cm represents $6.4 \\times 0.5 = 3.2$ km.\n\nCheck: $6.4 \\times 50\\,000 = ' +
      '320\\,000$ cm $= 3200$ m $= 3.2$ km.',
    misconceptionCodes: ['congruence.add-instead-of-scale'],
  },
  {
    id: 'congruence.map-scale-area',
    skillIds: [SIMILARITY],
    tier: 3,
    statement:
      'On the same $1 : 50\\,000$ map, a lake covers $12$ cm$^2$. What is the real area of ' +
      'the lake, in square kilometres?',
    answer: { type: 'number', value: 3, unit: 'km^2' },
    cpaPrompts: {
      concrete:
        'A $1$ cm square on the map stands for a square of real ground. How long is each side of ' +
        'that real square, in km? So what is its area?',
      pictorial: 'Draw a $1$ cm map square and label its real sides $0.5$ km. Its real area is $0.5 \\times 0.5$.',
      abstract: 'Lengths scale by $0.5$ km per cm; areas scale by $0.5^2 = 0.25$ km$^2$ per cm$^2$.',
    },
    hints: [
      '$1$ cm on the map is $0.5$ km. What real area does a $1$ cm by $1$ cm map square cover?',
      '$0.5 \\times 0.5 = 0.25$ km$^2$ for every $1$ cm$^2$ of map.',
      '$12 \\times 0.25$.',
    ],
    solution:
      'Each map centimetre is $0.5$ km, so each square centimetre of map is $0.5 \\times 0.5 = ' +
      '0.25$ km$^2$ of ground. The lake is $12 \\times 0.25 = 3$ km$^2$.\n\nThe area factor is the ' +
      'square of the length factor: multiplying $12$ by $0.5$ would give $6$, which is wrong.',
    misconceptionCodes: ['congruence.area-scales-by-k'],
  },
  {
    id: 'congruence.model-car',
    skillIds: [SIMILARITY],
    tier: 3,
    statement:
      'A die-cast model of a car is made at a scale of $1 : 24$. The real car is $4.8$ m long. ' +
      'How long is the model, in centimetres?',
    answer: { type: 'number', value: 20, unit: 'cm' },
    cpaPrompts: {
      concrete: 'Line up $24$ models nose to tail. How long is the line? That is the real car.',
      pictorial: 'Draw a bar $4.8$ m long and cut it into $24$ equal pieces. One piece is the model.',
      abstract: 'Model length $= \\frac{4.8 \\text{ m}}{24}$, then convert metres to centimetres.',
    },
    hints: [
      '$1 : 24$ means the real car is $24$ times as long as the model.',
      'Turn $4.8$ m into centimetres first: $480$ cm.',
      '$480 \\div 24$.',
    ],
    solution:
      'The real car is $4.8$ m $= 480$ cm. The model is $\\frac{1}{24}$ of that: ' +
      '$480 \\div 24 = 20$ cm.\n\nCheck: $20 \\times 24 = 480$ cm $= 4.8$ m.',
    misconceptionCodes: ['congruence.add-instead-of-scale'],
  },

  // --- Skill 3, diagnostics -------------------------------------------------
  {
    id: 'congruence.dx-reflection-length',
    skillIds: [SIMILARITY],
    tier: 'diagnostic',
    statement:
      '$A(1, 4)$ and $C(3, 1)$, so $AC = \\sqrt{13}$. The points are reflected in the $x$-axis ' +
      'to $A\'$ and $C\'$. What is the length of $A\'C\'$?',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$\\sqrt{13}$' },
        { label: 'B', value: '$\\sqrt{29}$', misconceptionCode: 'coordinate-geometry.double-negative-dropped' },
        {
          label: 'C',
          value: '$2\\sqrt{13}$ — the image is an enlarged copy',
          misconceptionCode: 'congruence.reflection-changes-length',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Fold the grid along the $x$-axis so $A$ lands on $A\'$ and $C$ on $C\'$. Is the segment ' +
        '$AC$ lying exactly on $A\'C\'$, or is one longer?',
      pictorial:
        'Plot $A\'(1, -4)$ and $C\'(3, -1)$. Count the squares across and down between them. ' +
        'Compare with the counting triangle for $AC$.',
      abstract: 'Reflection is an isometry: $A\'C\' = AC$ without any new calculation.',
    },
    hints: [
      'Does folding a piece of paper stretch anything drawn on it?',
      'If you do recompute: $A\'(1, -4)$, $C\'(3, -1)$, and $-1 - (-4) = 3$, not $-5$.',
    ],
    solution:
      'Reflection preserves length, so $A\'C\' = AC = \\sqrt{13}$.\n\nRecomputing as a check: ' +
      '$A\'(1, -4)$, $C\'(3, -1)$, $A\'C\' = \\sqrt{(3 - 1)^2 + (-1 - (-4))^2} = \\sqrt{4 + 9} = ' +
      '\\sqrt{13}$. The value $\\sqrt{29}$ comes from computing $-1 - 4 = -5$ instead of ' +
      '$-1 - (-4) = 3$.',
    misconceptionCodes: ['congruence.reflection-changes-length', 'coordinate-geometry.double-negative-dropped'],
    figure: plane({
      points: [
        { x: 1, y: 4, label: 'A', highlight: true },
        { x: 3, y: 1, label: 'C', highlight: true },
      ],
      caption: 'A and C, to be reflected in the x-axis.',
    }),
  },
  {
    id: 'congruence.dx-add-not-scale',
    skillIds: [SIMILARITY],
    tier: 'diagnostic',
    statement:
      'A rectangle $2$ cm by $3$ cm is enlarged, and the $2$ cm side becomes $6$ cm. How long is ' +
      'the other side of the enlarged rectangle?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$7$ cm', misconceptionCode: 'congruence.add-instead-of-scale' },
        { label: 'B', value: '$9$ cm' },
        { label: 'C', value: '$27$ cm', misconceptionCode: 'congruence.area-scales-by-k' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Draw a $2$ by $3$ rectangle and a $6$ by $7$ rectangle. Are they the same shape? Now ' +
        'draw $6$ by $9$. Which one looks like the original, only bigger?',
      pictorial: 'How many copies of the $2$ cm side fit along the $6$ cm side? Fit that many copies of the $3$ cm side together.',
      abstract: 'Scale factor $k = \\frac{6}{2} = 3$. Other side $= 3 \\times 3$.',
    },
    hints: [
      'What do you *multiply* $2$ by to get $6$?',
      'Multiply the $3$ cm side by the same number.',
    ],
    solution:
      '$k = \\frac{6}{2} = 3$, so the other side is $3 \\times 3 = 9$ cm.\n\n$7$ cm comes from ' +
      'adding $4$ to each side — that changes the shape. $27$ cm comes from using $k^2 = 9$ on a ' +
      'length; $k^2$ applies to areas, not sides.',
    misconceptionCodes: ['congruence.add-instead-of-scale', 'congruence.area-scales-by-k'],
  },
  {
    id: 'congruence.dx-area-by-k',
    skillIds: [SIMILARITY],
    tier: 'diagnostic',
    statement:
      'Two triangles are similar with scale factor $3$. The smaller has area $5$ cm$^2$. What is ' +
      'the area of the larger triangle?',
    answer: {
      type: 'choice',
      correct: 'C',
      options: [
        { label: 'A', value: '$15$ cm$^2$', misconceptionCode: 'congruence.area-scales-by-k' },
        { label: 'B', value: '$8$ cm$^2$', misconceptionCode: 'congruence.add-instead-of-scale' },
        { label: 'C', value: '$45$ cm$^2$' },
      ],
    },
    cpaPrompts: {
      concrete: 'Enlarge a $1$ by $1$ square by scale factor $3$. How many small squares fit inside the big one?',
      pictorial: 'Draw the small triangle and the large one. Try to tile the large one with copies of the small: how many along the base, how many rows?',
      abstract: 'Lengths scale by $k$, so area scales by $k^2 = 9$.',
    },
    hints: [
      'Every length is $3$ times longer. Area is length times length.',
      'The area factor is $3 \\times 3$.',
    ],
    solution:
      'Area scales by $k^2 = 3^2 = 9$, so the larger triangle has area $5 \\times 9 = 45$ ' +
      'cm$^2$.\n\n$15$ comes from scaling area by $k$ instead of $k^2$; $8$ comes from adding the ' +
      'scale factor to the area, which mixes a ratio with a quantity.',
    misconceptionCodes: ['congruence.area-scales-by-k', 'congruence.add-instead-of-scale'],
  },
];
