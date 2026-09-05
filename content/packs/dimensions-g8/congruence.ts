import type { Problem, SkillNode } from '@/lib/content/schema';

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
    ],
    suggestedVisual: 'coordinate_plane',
  },
];

export const congruenceProblems: Problem[] = [
  {
    id: 'congruence.sas-test',
    skillIds: ['congruence.identify-establish-congruence'],
    tier: 1,
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
  },
  {
    id: 'congruence.reflect-in-y-equals-x',
    skillIds: ['congruence.reflection-transformations-across'],
    tier: 1,
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
  },
  {
    id: 'congruence.reflected-length',
    skillIds: [
      'congruence.understand-similarity-coordinate',
      'congruence.reflection-transformations-across',
    ],
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
];
