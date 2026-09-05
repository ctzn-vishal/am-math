import type { Problem, SkillNode } from '@/lib/content/schema';

/**
 * Unit 7 — Parallel Lines and Angles in Triangles and Polygons. Hand-authored.
 *
 * Source: docs/Implementation Manual (angle rotators, torn paper corners) and the Chapter 7
 * worked examples in the content spec.
 *
 * The through-line: every angle fact here is a fact about *turning*. Walking round any
 * polygon turns you through one full revolution, which is where $360°$ comes from; a
 * straight line is half a turn, which is where $180°$ comes from; and parallel lines are
 * lines that face the same way, which is why a transversal meets them at the same angle.
 */

export const parallelAnglesSkills: SkillNode[] = [
  {
    id: 'parallel-angles.angle-properties-parallel',
    title: 'Apply angle properties of parallel lines intersected by transversals (F, Z, C angles)',
    summary:
      'Spot corresponding, alternate and co-interior angle pairs by the letter shape they make, ' +
      'and know which pairs are equal and which add to $180°$.',
    prerequisites: [],
    cpa: {
      concrete:
        'Two rulers laid parallel on the desk and a pencil laid across both. Slide the pencil ' +
        'along without turning it: the angle it makes with the first ruler is carried unchanged ' +
        'to the second, because the rulers face the same way. Turn the pencil and *both* angles ' +
        'change together.',
      pictorial:
        'The transversal diagram with one letter highlighted at a time: an F for corresponding ' +
        'angles, a Z for alternate angles, a C (or U) for co-interior angles. Colour the two ' +
        'angles of the pair before writing anything.',
      abstract:
        'Corresponding angles equal; alternate angles equal; co-interior angles supplementary. ' +
        'Each is written with its reason: "alt. $\\angle$s, $AB \\parallel CD$". The reason is ' +
        'part of the answer.',
    },
    formulas: [
      '\\text{corr. } \\angle\\text{s equal}',
      '\\text{alt. } \\angle\\text{s equal}',
      '\\text{co-int. } \\angle\\text{s sum to } 180°',
    ],
    misconceptions: [
      {
        code: 'parallel-angles.alternate-as-supplementary',
        description:
          'Sets two alternate angles to add to $180°$, confusing the Z-shape of alternate angles ' +
          'with the C-shape of co-interior ones.',
        probe:
          'Check the letter shape. Trace the two angles with your finger — do they sit on the ' +
          'same side of the transversal like a C, or on opposite sides like a Z?',
        correction:
          'Co-interior angles (a C-shape, same side of the transversal) sum to $180°$. Alternate ' +
          'angles (a Z-shape, opposite sides) are equal, because sliding along parallel lines ' +
          'carries an angle across unchanged.',
      },
    ],
    suggestedVisual: 'angle_diagram',
  },
  {
    id: 'parallel-angles.calculate-interior-exterior',
    title: 'Calculate interior and exterior angles of triangles and regular/irregular polygons',
    summary:
      'Use that the exterior angles of any polygon add to one full turn, and that interior ' +
      'and exterior angles at a vertex add to a straight line, to find any polygon angle.',
    prerequisites: ['parallel-angles.angle-properties-parallel'],
    cpa: {
      concrete:
        'Tear the three corners off a paper triangle and fit them together along a ruler: they ' +
        'make a straight line, so the interior angles sum to $180°$. Then walk round a polygon ' +
        'drawn on the floor, turning at each corner by the exterior angle. When you are back at ' +
        'the start you face the way you began: one full turn, $360°$, no matter how many sides.',
      pictorial:
        'A polygon with one side extended at each vertex so the exterior angle is drawn as a ' +
        'turn. Alongside, the same polygon cut into triangles from one vertex — $n - 2$ of them.',
      abstract:
        'Interior sum $(n-2) \\times 180°$; exterior sum $360°$; at each vertex interior + ' +
        'exterior $= 180°$. For a regular polygon each exterior angle is $\\frac{360°}{n}$, ' +
        'which is usually the quickest route to $n$.',
    },
    formulas: [
      'S_n = (n - 2) \\times 180°',
      '\\text{exterior angles sum to } 360°',
      '\\text{exterior angle of regular } n\\text{-gon} = \\frac{360°}{n}',
    ],
    misconceptions: [
      {
        code: 'parallel-angles.interior-formula-detour',
        description:
          'Reaches for the interior-angle formula $\\frac{(n-2) \\times 180°}{n}$ and sets up an ' +
          'equation in $n$ that they then cannot solve cleanly, when the exterior angle gives ' +
          '$n$ in one step.',
        probe:
          'What do an interior angle and the exterior angle next to it add up to? If the ' +
          'interior is five times the exterior, what is the exterior angle on its own?',
        correction:
          'Interior + exterior $= 180°$ at every vertex, so a ratio between them fixes the ' +
          'exterior angle immediately. Then $n = \\frac{360°}{\\text{exterior}}$, because the ' +
          'exterior angles of any polygon add to one full turn.',
      },
    ],
    suggestedVisual: 'angle_diagram',
  },
  {
    id: 'parallel-angles.solve-multi-step-geometric',
    title: 'Solve multi-step geometric deductive problems',
    summary:
      'Chain angle facts across a figure, writing a reason for every step, until the unknown ' +
      'is reached.',
    prerequisites: ['parallel-angles.calculate-interior-exterior'],
    cpa: {
      concrete:
        'A figure built from rulers and pencils on the desk. Each fact used is a physical move — ' +
        'slide this along the parallels, tear these three corners and line them up — so every ' +
        'step in the deduction corresponds to something that was actually done.',
      pictorial:
        'The figure with angles filled in one at a time in order, each new one written with a ' +
        'short reason next to it. Highlight the letter shape or triangle being used for each ' +
        'step before writing the number.',
      abstract:
        'A two-column argument: statement, reason. Reasons are the named facts — alt. $\\angle$s, ' +
        'co-int. $\\angle$s, $\\angle$ sum of triangle, ext. $\\angle$ of triangle — and the ' +
        'chain must be checkable line by line.',
    },
    formulas: ['\\text{ext. } \\angle \\text{ of triangle} = \\text{sum of interior opposite } \\angle\\text{s}'],
    misconceptions: [
      {
        code: 'parallel-angles.unstated-reason',
        description:
          'Writes a correct sequence of angle values with no reasons, so an assumed fact — ' +
          'often that two lines are parallel when nothing says so — passes unnoticed.',
        probe:
          'You used the Z-shape between those two lines. Point to where the question says they ' +
          'are parallel — or if it does not, what tells you the alternate angles are equal?',
        correction:
          'Each angle fact is only true under a condition: alternate angles are equal *because* ' +
          'the lines are parallel. Writing the reason is what forces you to check the condition ' +
          'holds, which is why it is required and not decoration.',
      },
    ],
    suggestedVisual: 'angle_diagram',
  },
];

export const parallelAnglesProblems: Problem[] = [
  {
    id: 'parallel-angles.alternate-angles-x',
    skillIds: ['parallel-angles.angle-properties-parallel', 'parallel-angles.solve-multi-step-geometric'],
    tier: 1,
    statement:
      'In the figure, $AB \\parallel CD$. A transversal meets $AB$ at $P$ and $CD$ at $Q$. ' +
      '$\\angle APQ = (3x + 20)°$ and $\\angle PQD = (5x - 40)°$. Find the value of $x$.',
    answer: { type: 'number', value: 30, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay two parallel rulers down with a pencil across them. Slide the pencil from $P$ to ' +
        '$Q$ without turning it. Which angle at $Q$ matches the angle at $P$?',
      pictorial:
        'Draw the two parallel lines and the transversal. Colour $\\angle APQ$ and $\\angle PQD$. ' +
        'Which letter do they make together — an F, a Z or a C?',
      abstract:
        'Identify the pair as alternate angles, set the expressions equal with the reason, and ' +
        'solve the linear equation.',
    },
    hints: [
      'Look at the positions of $\\angle APQ$ and $\\angle PQD$. Do they form a Z-shape between ' +
        'the parallel lines?',
      'Because they are alternate angles, they are equal. Set the two expressions equal to each ' +
        'other.',
      'Solve $3x + 20 = 5x - 40$: collect the $x$ terms on one side and the numbers on the other.',
    ],
    solution:
      '$\\angle APQ$ and $\\angle PQD$ are alternate angles (Z-shape), so they are equal because ' +
      '$AB \\parallel CD$.\n\n$$3x + 20 = 5x - 40 \\implies 60 = 2x \\implies x = 30.$$\n\n' +
      'Then $\\angle APQ = 3(30) + 20 = 110°$.',
    misconceptionCodes: ['parallel-angles.alternate-as-supplementary', 'parallel-angles.unstated-reason'],
  },
  {
    id: 'parallel-angles.regular-polygon-sides',
    skillIds: ['parallel-angles.calculate-interior-exterior'],
    tier: 2,
    statement:
      'The interior angle of a regular polygon is five times its exterior angle. How many ' +
      'sides does the polygon have?',
    answer: { type: 'number', value: 12, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Walk round the polygon, turning at each corner by the exterior angle. By the time you ' +
        'are back where you started, how far have you turned in total? What does that make each ' +
        'turn, if there are $n$ equal ones?',
      pictorial:
        'Draw one vertex with its side extended: the interior angle and the exterior angle sit ' +
        'together on a straight line. If one is five times the other, how is the $180°$ shared?',
      abstract:
        'Let the exterior angle be $e$. Use $e + 5e = 180°$ to find $e$, then $n = 360° / e$.',
    },
    hints: [
      'What is the sum of an interior angle and its adjacent exterior angle at any vertex?',
      'Let the exterior angle be $e$, so the interior is $5e$. Set up $e + 5e = 180°$ and find $e$.',
      'The exterior angles of any polygon add to $360°$. Divide $360°$ by your exterior angle to ' +
        'get the number of sides.',
    ],
    solution:
      'At any vertex, interior + exterior $= 180°$. Let the exterior angle be $e$; the interior ' +
      'is $5e$.\n\n$$6e = 180° \\implies e = 30°.$$\n\nExterior angles sum to $360°$, so\n\n' +
      '$$n = \\frac{360°}{30°} = 12.$$',
    misconceptionCodes: ['parallel-angles.interior-formula-detour'],
  },
];
