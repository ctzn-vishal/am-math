import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';

/**
 * Unit 11 — Coordinate Geometry. Hand-authored.
 *
 * Source: docs/Implementation Manual §4 (the perpendicular-line worked example with its
 * pictorial-to-abstract hint ladder) and the Chapter 11 worked examples in the content spec.
 *
 * The through-line: every formula in this unit is a right-angled triangle drawn on the
 * grid. Distance is its hypotenuse, gradient is its rise over its run, the midpoint is the
 * middle of it, and a perpendicular line is the same triangle turned a quarter turn — which
 * is where the negative reciprocal comes from.
 *
 * Problem bank built to docs/PROBLEM-SET-GUIDE.md §5, Unit 11: one variation sequence per
 * skill, application and applied items, one diagnostic per misconception code, and a
 * circumcentre challenge that uses every skill in the unit.
 */

export const coordinateGeometrySkills: SkillNode[] = [
  {
    id: 'coordinate-geometry.calculate-length-midpoint',
    title: 'Find lengths and midpoints from coordinates',
    summary:
      'Find the length of a segment as the hypotenuse of its across-and-up triangle, and its ' +
      'midpoint by averaging the coordinates of its ends.',
    prerequisites: ['pythagoras.calculate-unknown-side'],
    cpa: {
      concrete:
        'A pegboard with a rubber band between two pegs. Add a third peg to make an L: straight ' +
        'across from one end, straight up to the other. Count the holes along and the holes up. ' +
        'The band is the hypotenuse of that L, and its length comes from Pythagoras. The midpoint ' +
        'is the peg halfway along and halfway up.',
      pictorial:
        'The segment with its right-angled triangle drawn in, the horizontal leg labelled ' +
        '$\\Delta x$ and the vertical leg $\\Delta y$. The midpoint marked at half of each.',
      abstract:
        '$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ and $M = \\left(\\frac{x_1 + x_2}{2}, ' +
        '\\frac{y_1 + y_2}{2}\\right)$. Subtracting a negative coordinate adds; the squares ' +
        'make the order of subtraction irrelevant.',
    },
    formulas: [
      'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}',
      'M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)',
    ],
    misconceptions: [
      {
        code: 'coordinate-geometry.double-negative-dropped',
        description:
          'Computes $4 - (-2)$ as $2$, treating the subtraction of a negative as an ordinary ' +
          'subtraction and shrinking the horizontal leg.',
        probe:
          'Plot $-2$ and $4$ on a number line. Count the gaps between them. Is that 2, or ' +
          'something else? What does $4 - (-2)$ have to equal to match the picture?',
        correction:
          'Subtracting a negative is adding: $4 - (-2) = 4 + 2 = 6$. The horizontal distance ' +
          'from $x = -2$ to $x = 4$ is 6 units, which is what the formula is measuring.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
  {
    id: 'coordinate-geometry.find-gradient-line',
    title: 'Find gradients and equations of straight lines',
    summary:
      'Compute a gradient from two points as rise over run, and write the equation of a line ' +
      'from a gradient and one point on it.',
    prerequisites: ['coordinate-geometry.calculate-length-midpoint', 'function-graphs.graph-linear-functions'],
    cpa: {
      concrete:
        'The same rubber-band L on the pegboard. Gradient is holes up divided by holes along. ' +
        'Move the band to a parallel pair of pegs and the L is the same shape — same gradient. ' +
        'Two points are enough to pin the line, and one point plus the slope of the L is enough ' +
        'too.',
      pictorial:
        'The slope triangle labelled $\\Delta x$ and $\\Delta y$, with the gradient written as the ' +
        'fraction beside it. From a known point, step along the gradient to reach other points ' +
        'on the line.',
      abstract:
        '$m = \\frac{y_2 - y_1}{x_2 - x_1}$. Point–slope form $y - y_1 = m(x - x_1)$ turns a ' +
        'gradient and a point into an equation; rearrange to $y = mx + c$ if asked.',
    },
    formulas: ['m = \\frac{y_2 - y_1}{x_2 - x_1}', 'y - y_1 = m(x - x_1)'],
    misconceptions: [
      {
        code: 'coordinate-geometry.mixed-subtraction-order',
        description:
          'Subtracts the $y$ coordinates in one order and the $x$ coordinates in the other, ' +
          'reversing the sign of the gradient.',
        probe:
          'You wrote $7 - (-1)$ on top. Which point did you start with? For the bottom, did you ' +
          'start with the same point — is it $6 - 2$ or $2 - 6$?',
        correction:
          'Rise and run must be measured from the same starting point to the same finishing ' +
          'point. $\\frac{7 - (-1)}{6 - 2} = \\frac{8}{4} = 2$; swapping only one of them ' +
          'gives $-2$, a line sloping the wrong way.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
  {
    id: 'coordinate-geometry.parallel-perpendicular-line',
    title: 'Recognise parallel and perpendicular lines from their gradients',
    summary:
      'Recognise parallel lines by equal gradients and perpendicular lines by gradients that ' +
      'multiply to $-1$, and see the second fact as a quarter-turn of the slope triangle.',
    prerequisites: ['coordinate-geometry.find-gradient-line'],
    cpa: {
      concrete:
        'Cut a slope triangle out of card — 4 along, 3 up — so its gradient is $\\frac{3}{4}$. ' +
        'Slide it along the line: parallel lines are the ones it fits without turning. Now rotate ' +
        'the card a quarter turn. The 4 is vertical, the 3 is horizontal and one direction has ' +
        'reversed, so the perpendicular gradient is $-\\frac{4}{3}$.',
      pictorial:
        'A line with its slope triangle, and the same triangle rotated $90°$ drawn on the ' +
        'perpendicular. Rise and run have swapped places and one sign has flipped.',
      abstract:
        'Parallel: $m_1 = m_2$. Perpendicular: $m_1 m_2 = -1$, so $m_2 = -\\frac{1}{m_1}$ — ' +
        'the negative reciprocal. Horizontal and vertical lines are the exception the formula ' +
        'cannot express.',
    },
    formulas: ['m_1 = m_2 \\ \\text{(parallel)}', 'm_1 m_2 = -1 \\ \\text{(perpendicular)}'],
    misconceptions: [
      {
        code: 'coordinate-geometry.perpendicular-keeps-gradient',
        description:
          'Uses the original line\'s gradient for a line that is supposed to be perpendicular to ' +
          'it, or flips only the sign without taking the reciprocal.',
        probe:
          'Rotate the slope triangle a quarter turn in your head. The rise of 2 — which way is it ' +
          'pointing now? What is the new rise over the new run?',
        correction:
          'A quarter turn swaps rise and run and reverses one of them, so the new gradient is the ' +
          'negative reciprocal: for $m = 2$ it is $-\\frac{1}{2}$. Check: $2 \\times ' +
          '(-\\frac{1}{2}) = -1$.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
  {
    id: 'coordinate-geometry.find-equations-perpendicular',
    title: 'Find the equation of a perpendicular bisector',
    summary:
      'Combine the midpoint, the gradient and the perpendicular condition to write the equation ' +
      'of the line that cuts a segment in half at right angles.',
    prerequisites: ['coordinate-geometry.parallel-perpendicular-line'],
    cpa: {
      concrete:
        'Fold a strip of paper so that the two endpoints of a drawn segment land on each other. ' +
        'The crease passes through the middle of the segment and crosses it square-on. That ' +
        'crease is the perpendicular bisector: two facts, midpoint and right angle, in one fold.',
      pictorial:
        'The segment $AB$ with its midpoint $M$ marked, its slope triangle drawn, and the rotated ' +
        'triangle drawn at $M$ to give the direction of the bisector.',
      abstract:
        'Midpoint $M$ of $AB$; gradient $m_{AB}$; $m_\\perp = -\\frac{1}{m_{AB}}$; then ' +
        '$y - y_M = m_\\perp (x - x_M)$, rearranged to $y = mx + c$.',
    },
    formulas: ['y - y_M = -\\frac{1}{m_{AB}}(x - x_M)'],
    misconceptions: [
      {
        code: 'coordinate-geometry.bisector-through-endpoint',
        description:
          'Writes the perpendicular bisector through one endpoint of the segment instead of ' +
          'through its midpoint, producing a perpendicular that does not bisect.',
        probe:
          'Bisect means cut in half. If your line goes through $A$, how much of $AB$ is on each ' +
          'side of it? Which point should it go through instead?',
        correction:
          'A perpendicular bisector does two jobs: it is perpendicular to $AB$ *and* it passes ' +
          'through the midpoint of $AB$. The point used in the point–slope form must be $M$, ' +
          'not $A$ or $B$.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
];

// ---------------------------------------------------------------------------

const LENGTH = 'coordinate-geometry.calculate-length-midpoint';
const GRADIENT = 'coordinate-geometry.find-gradient-line';
const PARALLEL = 'coordinate-geometry.parallel-perpendicular-line';
const BISECTOR = 'coordinate-geometry.find-equations-perpendicular';

const DOUBLE_NEG = 'coordinate-geometry.double-negative-dropped';
const MIXED_ORDER = 'coordinate-geometry.mixed-subtraction-order';
const KEEPS_GRADIENT = 'coordinate-geometry.perpendicular-keeps-gradient';
const THROUGH_ENDPOINT = 'coordinate-geometry.bisector-through-endpoint';

export const coordinateGeometryProblems: Problem[] = [
  // =========================================================================
  // Skill 1 — length and midpoint
  // Tier 1: the sequence keeps one segment shape (6 across, 8 up) and moves it around the
  // grid one coordinate at a time, so the length stays 10 while the subtraction changes.
  // Then the midpoints of the same three segments.
  // =========================================================================
  {
    id: 'coordinate-geometry.length-a-1',
    skillIds: [LENGTH],
    tier: 1,
    sequence: { family: 'coordinate-geometry.length-midpoint-a', position: 1 },
    statement: 'Find the length of the segment joining $A(10, 5)$ and $B(4, 13)$.',
    answer: { type: 'number', value: 10, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Put pegs at $A$ and $B$. Go straight across from $A$ until you are under $B$, then ' +
        'straight up to $B$. How many holes across, how many up?',
      pictorial:
        'Draw the L under the segment. The across leg runs from $x = 10$ to $x = 4$ and the up ' +
        'leg from $y = 5$ to $y = 13$. Label both legs.',
      abstract:
        'Use $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ with $A$ as the first point and $B$ as ' +
        'the second.',
    },
    hints: [
      'Find the across leg $4 - 10$ and the up leg $13 - 5$. A negative leg is fine — it gets squared.',
      'Square both legs and add: $(-6)^2 + 8^2$. Then square root.',
    ],
    solution:
      '$\\Delta x = 4 - 10 = -6$ and $\\Delta y = 13 - 5 = 8$, so\n\n$$AB = \\sqrt{(-6)^2 + 8^2} ' +
      '= \\sqrt{36 + 64} = \\sqrt{100} = 10.$$\n\nSubtracting the other way round gives $6$ and ' +
      '$-8$, and the same squares.',
    misconceptionCodes: [DOUBLE_NEG],
    figure: {
      kind: 'coordinate_plane',
      xMin: -1,
      xMax: 12,
      yMin: -1,
      yMax: 15,
      gridStep: 1,
      curves: [],
      points: [
        { x: 10, y: 5, label: 'A', highlight: true },
        { x: 4, y: 13, label: 'B', highlight: true },
      ],
      caption: 'Draw the across-and-up L under the segment before you compute anything.',
    },
  },
  {
    id: 'coordinate-geometry.length-a-2',
    skillIds: [LENGTH],
    tier: 1,
    sequence: { family: 'coordinate-geometry.length-midpoint-a', position: 2 },
    expect:
      'Only $A$ has moved: its $x$-coordinate $10$ became $-2$. Before you compute — is the ' +
      'across leg still 6, and will the length change?',
    statement: 'Find the length of the segment joining $A(-2, 5)$ and $B(4, 13)$.',
    answer: { type: 'number', value: 10, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'On a number line, put a finger on $-2$ and count the jumps to $4$. Is it 2 jumps or 6? ' +
        'That count is the across leg.',
      pictorial:
        'Draw the L again. The across leg crosses the $y$-axis this time — from $x = -2$ to ' +
        '$x = 4$. How wide is it?',
      abstract:
        '$\\Delta x = 4 - (-2)$. Subtracting a negative adds. Then Pythagoras as before.',
    },
    hints: [
      'What is $4 - (-2)$? Check it against the number line: from $-2$ to $4$ is how many units?',
      'The across leg is $6$ and the up leg is $13 - 5 = 8$. So the length is $\\sqrt{6^2 + 8^2}$.',
    ],
    solution:
      '$\\Delta x = 4 - (-2) = 6$ and $\\Delta y = 13 - 5 = 8$, so\n\n$$AB = \\sqrt{6^2 + 8^2} = ' +
      '\\sqrt{100} = 10.$$\n\nThe segment has slid 12 units left and kept its shape, so its ' +
      'length is unchanged. Writing $4 - 2 = 2$ would give $\\sqrt{68}$, which is wrong.',
    misconceptionCodes: [DOUBLE_NEG],
  },
  {
    id: 'coordinate-geometry.length-pq',
    skillIds: [LENGTH],
    tier: 1,
    sequence: { family: 'coordinate-geometry.length-midpoint-a', position: 3 },
    expect:
      'Now the second point\'s $y$-coordinate $13$ has become $-3$, so the segment runs ' +
      'downhill. Will the up leg be $8$, $-8$, or something else — and does the sign matter for ' +
      'the length?',
    statement: 'Find the exact length of the segment joining $P(-2, 5)$ and $Q(4, -3)$.',
    answer: { type: 'number', value: 10, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Make the L on the pegboard: from $P$ straight across to below $Q$, then straight down ' +
        'to $Q$. Count the holes along and the holes down. Which theorem gives the band\'s length?',
      pictorial:
        'Draw the right-angled triangle with $PQ$ as hypotenuse. Label the horizontal leg with ' +
        '$\\Delta x$ and the vertical leg with $\\Delta y$ — careful with $4 - (-2)$.',
      abstract:
        'Apply $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.',
    },
    hints: [
      'Find $\\Delta x = 4 - (-2)$ and $\\Delta y = -3 - 5$ first. What is $4 - (-2)$?',
      'Now $d = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$. Square both, add, root.',
      'Evaluate $\\sqrt{6^2 + (-8)^2} = \\sqrt{36 + 64}$.',
    ],
    solution:
      '$\\Delta x = 4 - (-2) = 6$ and $\\Delta y = -3 - 5 = -8$, so\n\n$$PQ = \\sqrt{6^2 + ' +
      '(-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10.$$\n\nThe leg is negative because the segment ' +
      'goes down; squaring removes the sign, so the length is 10 again.',
    misconceptionCodes: [DOUBLE_NEG],
  },
  {
    id: 'coordinate-geometry.length-a-4',
    skillIds: [LENGTH],
    tier: 1,
    sequence: { family: 'coordinate-geometry.length-midpoint-a', position: 4 },
    expect:
      'Only $P$ has moved: its $x$-coordinate is now $4$, the same as $Q$\'s. What happens to ' +
      'the across leg? Do you still need Pythagoras?',
    statement: 'Find the length of the segment joining $P(4, 5)$ and $Q(4, -3)$.',
    answer: { type: 'number', value: 8, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Put pegs at $P$ and $Q$. They are in the same column of the pegboard, so the band is ' +
        'vertical. Just count the holes from $y = 5$ down to $y = -3$.',
      pictorial:
        'Draw the segment. The across leg has zero width, so the "triangle" is just the segment ' +
        'itself standing upright.',
      abstract:
        '$\\Delta x = 0$, so $d = \\sqrt{0^2 + (\\Delta y)^2} = |\\Delta y|$.',
    },
    hints: [
      'Both points have $x = 4$. What is $\\Delta x$?',
      'With $\\Delta x = 0$ the formula collapses to $\\sqrt{(-3 - 5)^2}$. A length is positive.',
    ],
    solution:
      '$\\Delta x = 4 - 4 = 0$ and $\\Delta y = -3 - 5 = -8$, so\n\n$$PQ = \\sqrt{0 + 64} = 8.$$' +
      '\n\nA vertical segment is just the difference of the $y$-coordinates: from $5$ down to ' +
      '$-3$ is $8$ units.',
    misconceptionCodes: [DOUBLE_NEG],
  },
  {
    id: 'coordinate-geometry.midpoint-a-5',
    skillIds: [LENGTH],
    tier: 1,
    sequence: { family: 'coordinate-geometry.length-midpoint-a', position: 5 },
    expect:
      'Back to the first segment, $A(10, 5)$ to $B(4, 13)$, but the question has changed: not ' +
      'how long, but where is the middle. Will the midpoint\'s coordinates be whole numbers?',
    statement: 'Find the midpoint of the segment joining $A(10, 5)$ and $B(4, 13)$.',
    answer: { type: 'coordinates', x: 7, y: 9, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Stretch the band from $A$ to $B$ and pinch it in the middle. How far across from $A$ ' +
        'have you gone — half of 6 — and how far up — half of 8?',
      pictorial:
        'Draw the across-and-up L. Mark the halfway point of each leg. The midpoint sits above ' +
        'one mark and beside the other.',
      abstract: 'Average the $x$-coordinates and average the $y$-coordinates.',
    },
    hints: [
      'The midpoint is halfway across and halfway up: $x = \\frac{10 + 4}{2}$, $y = \\frac{5 + 13}{2}$.',
      'Add the two $x$-coordinates and halve; do the same for $y$.',
    ],
    solution:
      '$$M = \\left(\\frac{10 + 4}{2}, \\frac{5 + 13}{2}\\right) = (7, 9).$$\n\nCheck: $M$ is 3 ' +
      'across and 4 up from $A$, half of the 6-by-8 L.',
    misconceptionCodes: [DOUBLE_NEG],
  },
  {
    id: 'coordinate-geometry.midpoint-a-6',
    skillIds: [LENGTH],
    tier: 1,
    sequence: { family: 'coordinate-geometry.length-midpoint-a', position: 6 },
    expect:
      'As before, $A$\'s $x$-coordinate $10$ has become $-2$. The midpoint\'s $y$ should not ' +
      'change. Predict the new $x$: is it halfway between $-2$ and $4$?',
    statement: 'Find the midpoint of the segment joining $A(-2, 5)$ and $B(4, 13)$.',
    answer: { type: 'coordinates', x: 1, y: 9, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'On the number line, $-2$ and $4$ are 6 apart. Step 3 from $-2$ toward $4$. Where do you land?',
      pictorial:
        'Draw the L. Its across leg runs from $x = -2$ to $x = 4$; mark its middle. Its up leg ' +
        'is unchanged from the last item.',
      abstract:
        'Average with the sign kept: $\\frac{-2 + 4}{2}$, not $\\frac{2 + 4}{2}$.',
    },
    hints: [
      'The $y$-coordinate is the same average as before, $\\frac{5 + 13}{2}$.',
      'For $x$: $\\frac{-2 + 4}{2} = \\frac{2}{2}$. Keep the minus sign when you add.',
    ],
    solution:
      '$$M = \\left(\\frac{-2 + 4}{2}, \\frac{5 + 13}{2}\\right) = (1, 9).$$\n\nCheck: $1$ is 3 ' +
      'to the right of $-2$ and 3 to the left of $4$.',
    misconceptionCodes: [DOUBLE_NEG],
  },
  {
    id: 'coordinate-geometry.midpoint-pq',
    skillIds: [LENGTH],
    tier: 1,
    sequence: { family: 'coordinate-geometry.length-midpoint-a', position: 7 },
    expect:
      'Now $Q$ has $y = -3$ instead of $13$. You are averaging a positive and a negative ' +
      '$y$-coordinate for the first time. Will the midpoint\'s $y$ be above or below the $x$-axis?',
    statement: 'Find the midpoint of the segment joining $P(-2, 5)$ and $Q(4, -3)$.',
    answer: { type: 'coordinates', x: 1, y: 1, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Put pegs at $P$ and $Q$ and stretch a band between them. Halfway along the band — how ' +
        'far across from $P$ have you gone, and how far down?',
      pictorial:
        'Plot the two points and draw the across-and-down triangle. Mark the halfway point of the ' +
        'horizontal leg and of the vertical leg. Where do they meet?',
      abstract:
        'Average the $x$-coordinates and average the $y$-coordinates.',
    },
    hints: [
      'For the midpoint, take the average of the $x$-coordinates and the average of the ' +
        '$y$-coordinates.',
      '$x$: $\\frac{-2 + 4}{2}$. $y$: $\\frac{5 + (-3)}{2}$. Watch the signs.',
    ],
    solution:
      '$$M = \\left(\\frac{-2 + 4}{2}, \\frac{5 + (-3)}{2}\\right) = \\left(\\frac{2}{2}, ' +
      '\\frac{2}{2}\\right) = (1, 1).$$\n\nThe pattern: a midpoint is an average, and an average ' +
      'of $5$ and $-3$ is pulled down to $1$ — still 4 below $P$ and 4 above $Q$.',
    misconceptionCodes: [DOUBLE_NEG],
  },

  // --- Skill 1, tier 2 ---
  {
    id: 'coordinate-geometry.endpoint-from-midpoint',
    skillIds: [LENGTH],
    tier: 2,
    statement:
      '$M(1, 2)$ is the midpoint of the segment $AB$. If $A$ is $(-3, 5)$, find the coordinates of $B$.',
    answer: { type: 'coordinates', x: 5, y: -1, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Put pegs at $A$ and $M$. $B$ is the same jump again, past $M$. How many holes across and ' +
        'how many down did you go from $A$ to $M$?',
      pictorial:
        'Draw the step from $A$ to $M$ as an L: 4 across, 3 down. Draw the same L again starting ' +
        'at $M$. Where does it end?',
      abstract:
        'Solve $\\frac{-3 + x}{2} = 1$ and $\\frac{5 + y}{2} = 2$, or step the vector $A \\to M$ ' +
        'once more.',
    },
    hints: [
      'From $A(-3, 5)$ to $M(1, 2)$ is $+4$ across and $-3$ up. $B$ is that same step beyond $M$.',
      'Or use the formula backwards: $\\frac{-3 + x_B}{2} = 1$ gives $x_B = 5$. Do the same for $y$.',
    ],
    solution:
      'The midpoint formula gives $\\frac{-3 + x_B}{2} = 1 \\implies x_B = 5$ and ' +
      '$\\frac{5 + y_B}{2} = 2 \\implies y_B = -1$.\n\n$$B = (5, -1).$$\n\nCheck: the step from ' +
      '$A$ to $M$ is $(+4, -3)$ and from $M$ to $B$ is $(+4, -3)$ too.',
    misconceptionCodes: [DOUBLE_NEG],
  },
  {
    id: 'coordinate-geometry.isosceles-by-lengths',
    skillIds: [LENGTH],
    tier: 2,
    statement:
      'Triangle $ABC$ has vertices $A(-2, 1)$, $B(4, 1)$ and $C(1, 5)$. Show that it is isosceles ' +
      'and give the length of each of the two equal sides.',
    answer: { type: 'number', value: 5, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Three pegs and three bands. Which two bands look the same length? Make the L under each ' +
        'of those two and compare the counts.',
      pictorial:
        'Plot the three points. $AB$ is horizontal. Draw the L under $AC$ and the L under $BC$ — ' +
        'are they the same shape, mirrored?',
      abstract:
        'Compute all three lengths with the distance formula. Two equal lengths means isosceles.',
    },
    hints: [
      '$AB$ is horizontal, so its length is just $4 - (-2)$. That leaves $AC$ and $BC$.',
      '$AC$: across $1 - (-2) = 3$, up $5 - 1 = 4$. $BC$: across $1 - 4 = -3$, up $4$.',
      'Both give $\\sqrt{3^2 + 4^2}$.',
    ],
    solution:
      '$AB = 4 - (-2) = 6$.\n\n$AC = \\sqrt{(1 - (-2))^2 + (5 - 1)^2} = \\sqrt{9 + 16} = 5$.\n\n' +
      '$BC = \\sqrt{(1 - 4)^2 + (5 - 1)^2} = \\sqrt{9 + 16} = 5$.\n\nTwo sides are equal, so the ' +
      'triangle is isosceles with equal sides of length $5$.',
    misconceptionCodes: [DOUBLE_NEG],
    figure: {
      kind: 'coordinate_plane',
      xMin: -4,
      xMax: 6,
      yMin: -1,
      yMax: 7,
      gridStep: 1,
      curves: [],
      points: [
        { x: -2, y: 1, label: 'A', highlight: true },
        { x: 4, y: 1, label: 'B', highlight: true },
        { x: 1, y: 5, label: 'C', highlight: true },
      ],
    },
  },
  {
    id: 'coordinate-geometry.perimeter-plotted',
    skillIds: [LENGTH],
    tier: 2,
    statement:
      'Find the perimeter of the triangle with vertices $P(-3, -1)$, $Q(3, 7)$ and $R(3, -1)$.',
    answer: { type: 'number', value: 24, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Three pegs, one band round all three. Two of the sides run along the pegboard rows and ' +
        'columns — count them directly. Only one side is slanted.',
      pictorial:
        'Plot the points. $PR$ is horizontal and $QR$ is vertical, so $PQ$ is the hypotenuse of ' +
        'the triangle the other two sides make.',
      abstract:
        'Horizontal and vertical lengths from coordinate differences; the slanted side from the ' +
        'distance formula. Add all three.',
    },
    hints: [
      '$P$ and $R$ share $y = -1$, so $PR = 3 - (-3)$. $Q$ and $R$ share $x = 3$, so $QR = 7 - (-1)$.',
      '$PQ$ has across leg $6$ and up leg $8$. What is $\\sqrt{6^2 + 8^2}$?',
      'Perimeter $= PR + QR + PQ$.',
    ],
    solution:
      '$PR = 3 - (-3) = 6$, $QR = 7 - (-1) = 8$, and $PQ = \\sqrt{6^2 + 8^2} = 10$.\n\n' +
      '$$\\text{Perimeter} = 6 + 8 + 10 = 24.$$',
    misconceptionCodes: [DOUBLE_NEG],
  },

  // --- Skill 1, tier 3 ---
  {
    id: 'coordinate-geometry.map-grid-towns',
    skillIds: [LENGTH],
    tier: 3,
    statement:
      'On a map grid each unit is $1$ km. Ashford is at $(-3, 2)$ and Bexley is at $(9, 7)$. A ' +
      'helicopter flies directly from one to the other. How far does it fly, in km?',
    answer: { type: 'number', value: 13, tolerance: 1e-6, unit: 'km' },
    cpaPrompts: {
      concrete:
        'Lay a ruler on the map from Ashford to Bexley. Now trace the "road" route instead: due ' +
        'east until you are level with Bexley, then due north. How long is each part?',
      pictorial:
        'Draw the two towns on the grid and the east-then-north path. The flight is the straight ' +
        'side of the triangle you have drawn.',
      abstract:
        'The straight-line distance between two points is $\\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$, ' +
        'in the grid\'s units.',
    },
    hints: [
      'How far east is Bexley from Ashford? Careful: from $x = -3$ to $x = 9$.',
      'East $12$ km, north $5$ km. The direct flight is the longest side of that triangle.',
      '$\\sqrt{12^2 + 5^2} = \\sqrt{144 + 25}$.',
    ],
    solution:
      'East: $9 - (-3) = 12$ km. North: $7 - 2 = 5$ km.\n\n$$d = \\sqrt{12^2 + 5^2} = \\sqrt{169} ' +
      '= 13 \\text{ km}.$$',
    misconceptionCodes: [DOUBLE_NEG],
    figure: {
      kind: 'coordinate_plane',
      xMin: -5,
      xMax: 11,
      yMin: -1,
      yMax: 9,
      gridStep: 1,
      curves: [],
      points: [
        { x: -3, y: 2, label: 'Ashford', highlight: true },
        { x: 9, y: 7, label: 'Bexley', highlight: true },
      ],
      caption: 'Each grid unit is 1 km.',
    },
  },
  {
    id: 'coordinate-geometry.diagonal-fence',
    skillIds: [LENGTH],
    tier: 3,
    statement:
      'A farmer marks the four corners of a rectangular paddock on a plan as $(-4, -3)$, $(8, -3)$, ' +
      '$(8, 6)$ and $(-4, 6)$, with each unit $1$ metre. She runs a straight fence from the corner ' +
      'at $(-4, -3)$ to the corner at $(8, 6)$. How many metres of fencing does she need?',
    answer: { type: 'number', value: 15, tolerance: 1e-6, unit: 'm' },
    cpaPrompts: {
      concrete:
        'Walk the fence line in your head. Instead, walk along the bottom edge and then up the ' +
        'right edge to reach the same corner. How long is each edge?',
      pictorial:
        'Draw the rectangle. The fence is a corner-to-corner line, and the two edges it cuts off ' +
        'make a triangle with it.',
      abstract:
        'The fence joins two points; its length is the distance between them.',
    },
    hints: [
      'The paddock is $8 - (-4)$ wide and $6 - (-3)$ tall. Find both.',
      'The fence is the longest side of a triangle whose other sides are $12$ and $9$.',
    ],
    solution:
      'Width $= 8 - (-4) = 12$ m; height $= 6 - (-3) = 9$ m.\n\n$$\\text{Fence} = \\sqrt{12^2 + ' +
      '9^2} = \\sqrt{144 + 81} = \\sqrt{225} = 15 \\text{ m}.$$',
    misconceptionCodes: [DOUBLE_NEG],
  },

  // --- Skill 1, diagnostic ---
  {
    id: 'coordinate-geometry.dx-double-negative-dropped',
    skillIds: [LENGTH],
    tier: 'diagnostic',
    statement: 'Find the length of the segment joining $P(-2, 5)$ and $Q(4, 13)$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$\\sqrt{68}$', misconceptionCode: DOUBLE_NEG },
        { label: 'B', value: '$10$' },
        { label: 'C', value: '$\\sqrt{28}$', misconceptionCode: 'pythagoras.hypotenuse-misidentified' },
      ],
    },
    cpaPrompts: {
      concrete:
        'On the number line, count from $-2$ up to $4$. That count is the across leg — is it 2 or 6?',
      pictorial:
        'Draw the L under $PQ$: across from $x = -2$ to $x = 4$, up from $y = 5$ to $y = 13$. ' +
        'Label both legs before squaring anything.',
      abstract:
        '$\\Delta x = 4 - (-2)$. Subtracting a negative adds. Then add the squares of both legs.',
    },
    hints: [
      'What is $4 - (-2)$? Check on a number line.',
      'The legs are $6$ and $8$. The segment is the longest side, so add the squares.',
    ],
    solution:
      '$\\Delta x = 4 - (-2) = 6$, $\\Delta y = 13 - 5 = 8$, so $PQ = \\sqrt{36 + 64} = 10$.\n\n' +
      'Writing $4 - 2 = 2$ gives $\\sqrt{4 + 64} = \\sqrt{68}$; subtracting the squares instead ' +
      'of adding gives $\\sqrt{64 - 36} = \\sqrt{28}$.',
    misconceptionCodes: [DOUBLE_NEG, 'pythagoras.hypotenuse-misidentified'],
  },

  // =========================================================================
  // Skill 2 — gradient and the equation of a line
  // Tier 1: gradient from two points with one sign changing at a time, then the equation
  // from gradient + intercept, gradient + point (the same line), and finally two points.
  // =========================================================================
  {
    id: 'coordinate-geometry.gradient-a-1',
    skillIds: [GRADIENT],
    tier: 1,
    sequence: { family: 'coordinate-geometry.gradient-a', position: 1 },
    statement: 'Find the gradient of the line through $A(1, 2)$ and $B(3, 8)$.',
    answer: { type: 'number', value: 3, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Pegs at $A$ and $B$, band between them. Make the L: how many holes across from $A$, how ' +
        'many up to $B$? Gradient is up divided by across.',
      pictorial:
        'Draw the slope triangle under $AB$. Write the rise on the vertical leg and the run on the ' +
        'horizontal leg.',
      abstract: '$m = \\frac{y_2 - y_1}{x_2 - x_1}$, both subtractions in the same order.',
    },
    hints: [
      'Rise is the change in $y$: $8 - 2$. Run is the change in $x$: $3 - 1$.',
      'Gradient $= \\frac{\\text{rise}}{\\text{run}} = \\frac{6}{2}$.',
    ],
    solution: '$$m = \\frac{8 - 2}{3 - 1} = \\frac{6}{2} = 3.$$\n\nFor every 1 across, the line goes 3 up.',
    misconceptionCodes: [MIXED_ORDER],
    figure: {
      kind: 'coordinate_plane',
      xMin: -1,
      xMax: 5,
      yMin: -1,
      yMax: 10,
      gridStep: 1,
      curves: [],
      points: [
        { x: 1, y: 2, label: 'A', highlight: true },
        { x: 3, y: 8, label: 'B', highlight: true },
      ],
    },
  },
  {
    id: 'coordinate-geometry.gradient-a-2',
    skillIds: [GRADIENT],
    tier: 1,
    sequence: { family: 'coordinate-geometry.gradient-a', position: 2 },
    expect:
      '$B$\'s $y$-coordinate $8$ has become $-4$, so $B$ is now below $A$. Predict: does the ' +
      'gradient keep its size, its sign, both or neither?',
    statement: 'Find the gradient of the line through $A(1, 2)$ and $B(3, -4)$.',
    answer: { type: 'number', value: -3, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Band from $A$ to $B$ again. Going across 2 from $A$, do you go up or down to reach $B$, ' +
        'and by how much?',
      pictorial: 'Draw the slope triangle. The rise now points downward: label it $-6$.',
      abstract: '$m = \\frac{-4 - 2}{3 - 1}$. A negative rise over a positive run is negative.',
    },
    hints: [
      'Rise: $-4 - 2$. Run: $3 - 1$, unchanged.',
      '$\\frac{-6}{2}$ — the line falls 3 for every 1 across.',
    ],
    solution: '$$m = \\frac{-4 - 2}{3 - 1} = \\frac{-6}{2} = -3.$$\n\nSame steepness, opposite direction.',
    misconceptionCodes: [MIXED_ORDER],
  },
  {
    id: 'coordinate-geometry.gradient-a-3',
    skillIds: [GRADIENT],
    tier: 1,
    sequence: { family: 'coordinate-geometry.gradient-a', position: 3 },
    expect:
      'Now $A$\'s $x$-coordinate $1$ has become $-1$. The rise is the same $-6$. Is the run still ' +
      '2 — and will the gradient get steeper or shallower?',
    statement: 'Find the gradient of the line through $A(-1, 2)$ and $B(3, -4)$.',
    answer: { type: 'number', value: -1.5, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Count the holes across from $x = -1$ to $x = 3$. The rise is still 6 down, but spread ' +
        'over more holes — so the slope is gentler.',
      pictorial: 'Draw the slope triangle. The run crosses the $y$-axis: from $-1$ to $3$ is $4$.',
      abstract: '$m = \\frac{-4 - 2}{3 - (-1)}$. Subtracting $-1$ adds 1.',
    },
    hints: [
      'Run: $3 - (-1)$. What is that?',
      '$m = \\frac{-6}{4}$. Simplify the fraction.',
    ],
    solution: '$$m = \\frac{-4 - 2}{3 - (-1)} = \\frac{-6}{4} = -\\frac{3}{2}.$$',
    misconceptionCodes: [MIXED_ORDER, DOUBLE_NEG],
  },
  {
    id: 'coordinate-geometry.gradient-a-4',
    skillIds: [GRADIENT],
    tier: 1,
    sequence: { family: 'coordinate-geometry.gradient-a', position: 4 },
    expect:
      '$A$\'s $y$-coordinate $2$ has become $-2$, so both points are now below the $x$-axis. Will ' +
      'the rise be bigger or smaller than 6, and which sign?',
    statement: 'Find the gradient of the line through $A(-1, -2)$ and $B(3, -4)$.',
    answer: { type: 'number', value: -0.5, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'From $A$ at height $-2$ to $B$ at height $-4$: that is only 2 holes down over 4 across. ' +
        'The band is nearly flat.',
      pictorial: 'Draw the slope triangle: run $4$, rise $-2$. Compare with the last one.',
      abstract: '$m = \\frac{-4 - (-2)}{3 - (-1)}$. Two double negatives this time.',
    },
    hints: [
      'Rise: $-4 - (-2) = -4 + 2$. Run: $3 - (-1)$.',
      '$m = \\frac{-2}{4}$.',
    ],
    solution:
      '$$m = \\frac{-4 - (-2)}{3 - (-1)} = \\frac{-2}{4} = -\\frac{1}{2}.$$\n\nCheck by stepping: ' +
      'from $A(-1, -2)$, go 4 across and $2$ down — that is $(3, -4) = B$.',
    misconceptionCodes: [MIXED_ORDER, DOUBLE_NEG],
  },
  {
    id: 'coordinate-geometry.gradient-a-5',
    skillIds: [GRADIENT],
    tier: 1,
    sequence: { family: 'coordinate-geometry.gradient-a', position: 5 },
    expect:
      'The question has turned around: now you are given the gradient $3$ and where the line ' +
      'crosses the $y$-axis, and asked for the line itself. Which of $m$ and $c$ in $y = mx + c$ ' +
      'is each of those?',
    statement: 'A line has gradient $3$ and crosses the $y$-axis at $(0, -2)$. Write its equation.',
    answer: { type: 'equation', lhs: 'y', rhs: '3x-2', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Peg at $(0, -2)$. From it, step 1 across and 3 up, again and again. The pegs you hit are ' +
        'all on the line. What rule turns the across count into the height?',
      pictorial: 'Draw the line through $(0, -2)$ with a slope triangle of 1 across, 3 up.',
      abstract: 'In $y = mx + c$, $m$ is the gradient and $c$ is the $y$-intercept.',
    },
    hints: [
      '$y = mx + c$: put the gradient in for $m$.',
      'The $y$-intercept is the value of $y$ when $x = 0$, which is $-2$. That is $c$.',
    ],
    solution: '$m = 3$ and $c = -2$, so\n\n$$y = 3x - 2.$$\n\nCheck: $x = 0$ gives $y = -2$. ✓',
    misconceptionCodes: [MIXED_ORDER],
  },
  {
    id: 'coordinate-geometry.gradient-a-6',
    skillIds: [GRADIENT],
    tier: 1,
    sequence: { family: 'coordinate-geometry.gradient-a', position: 6 },
    expect:
      'Same gradient $3$, but the point given is $(2, 4)$ instead of the $y$-intercept. You ' +
      'cannot read $c$ off directly. Predict: could this be the same line as last time?',
    statement: 'A line has gradient $3$ and passes through $(2, 4)$. Write its equation.',
    answer: { type: 'equation', lhs: 'y', rhs: '3x-2', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Peg at $(2, 4)$. Step backwards: 1 across to the left, 3 down. Again. Where do you hit ' +
        'the $y$-axis?',
      pictorial: 'Draw the line through $(2, 4)$ with slope 3 and read where it crosses the $y$-axis.',
      abstract:
        'Either substitute $(2, 4)$ into $y = 3x + c$ and solve for $c$, or use ' +
        '$y - 4 = 3(x - 2)$.',
    },
    hints: [
      'Start with $y = 3x + c$. The point $(2, 4)$ must satisfy it: $4 = 3(2) + c$.',
      'Solve for $c$, then write the equation.',
    ],
    solution:
      '$y = 3x + c$ with $(2, 4)$: $4 = 6 + c$, so $c = -2$.\n\n$$y = 3x - 2.$$\n\nIt is the same ' +
      'line as before: $(2, 4)$ was already on it, two steps of "1 across, 3 up" from $(0, -2)$.',
    misconceptionCodes: [MIXED_ORDER],
  },
  {
    id: 'coordinate-geometry.gradient-a-7',
    skillIds: [GRADIENT],
    tier: 1,
    sequence: { family: 'coordinate-geometry.gradient-a', position: 7 },
    expect:
      'No gradient is given now — just the two points from the very first item, $A(1, 2)$ and ' +
      '$B(3, 8)$. You already know the gradient. What extra step turns two points into an equation?',
    statement: 'Find the equation of the line through $A(1, 2)$ and $B(3, 8)$.',
    answer: { type: 'equation', lhs: 'y', rhs: '3x-1', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'From $A(1, 2)$ step back 1 across and 3 down to reach the $y$-axis. What height is the ' +
        'line there?',
      pictorial: 'Draw the line through $A$ and $B$ and extend it to the $y$-axis.',
      abstract:
        'Two points give $m$; then one point gives $c$. Two steps, the same two you have ' +
        'practised.',
    },
    hints: [
      'The gradient of $AB$ was found in the first item: $m = 3$.',
      'Now use either point: $2 = 3(1) + c$.',
      '$c = -1$. Check that $B(3, 8)$ fits too.',
    ],
    solution:
      '$m = \\frac{8 - 2}{3 - 1} = 3$. Then $2 = 3(1) + c$ gives $c = -1$.\n\n$$y = 3x - 1.$$\n\n' +
      'Check with $B$: $3(3) - 1 = 8$. ✓ The pattern: gradient from two points, intercept from one.',
    misconceptionCodes: [MIXED_ORDER],
  },

  // --- Skill 2, tier 2 ---
  {
    id: 'coordinate-geometry.rewrite-form-gradient',
    skillIds: [GRADIENT],
    tier: 2,
    statement: 'The line $3x + 2y = 12$ is written in the form $y = mx + c$. State the gradient $m$.',
    answer: { type: 'number', value: -1.5, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Find two points on the line by choosing $x = 0$ and then $x = 2$. Make the L between them ' +
        'and read rise over run.',
      pictorial:
        'Plot $(0, 6)$ and $(4, 0)$ — both satisfy the equation — and draw the slope triangle.',
      abstract:
        'Rearrange: $2y = 12 - 3x$, then divide everything by $2$. The coefficient of $x$ is then $m$.',
    },
    hints: [
      'Get $y$ on its own first: subtract $3x$ from both sides.',
      '$2y = -3x + 12$. Divide every term by 2 — including the $-3x$.',
    ],
    solution:
      '$3x + 2y = 12 \\implies 2y = -3x + 12 \\implies y = -\\frac{3}{2}x + 6$.\n\nSo ' +
      '$m = -\\frac{3}{2}$. Reading $-3$ straight from the original equation skips the division ' +
      'by 2.',
    misconceptionCodes: ['function-graphs.gradient-before-isolating-y', MIXED_ORDER],
  },
  {
    id: 'coordinate-geometry.axes-intercepts',
    skillIds: [GRADIENT],
    tier: 2,
    statement: 'Find the coordinates of the point where the line $2x + 5y = 20$ crosses the $x$-axis.',
    answer: { type: 'coordinates', x: 10, y: 0, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Every peg on the $x$-axis has height zero. Which peg on the axis satisfies the line\'s rule?',
      pictorial:
        'Sketch the line. Where it meets the $x$-axis its $y$-coordinate is $0$; mark that point.',
      abstract: 'On the $x$-axis $y = 0$. Substitute and solve for $x$.',
    },
    hints: [
      'Points on the $x$-axis look like $(x, 0)$. Put $y = 0$ into the equation.',
      '$2x + 0 = 20$. Solve for $x$ and write the point with its $y$-coordinate.',
    ],
    solution:
      'On the $x$-axis $y = 0$: $2x = 20$, so $x = 10$.\n\n$$(10, 0).$$\n\n(The $y$-axis crossing, ' +
      'with $x = 0$, is $(0, 4)$.)',
    misconceptionCodes: [MIXED_ORDER],
  },
  {
    id: 'coordinate-geometry.find-k-on-line',
    skillIds: [GRADIENT],
    tier: 2,
    statement: 'The point $(k, 5)$ lies on the line $y = -2x + 11$. Find $k$.',
    answer: { type: 'number', value: 3, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'The line drops 2 for every 1 across, starting from height 11 at the $y$-axis. How many ' +
        'steps across until it is at height 5?',
      pictorial: 'Draw the line and the horizontal line $y = 5$. Where do they cross?',
      abstract: 'A point is on a line if its coordinates satisfy the equation. Substitute $y = 5$, $x = k$.',
    },
    hints: [
      'If the point is on the line, then $5 = -2k + 11$.',
      'Solve $-2k = 5 - 11$.',
    ],
    solution: '$5 = -2k + 11 \\implies -2k = -6 \\implies k = 3$.\n\nCheck: $-2(3) + 11 = 5$. ✓',
    misconceptionCodes: [MIXED_ORDER],
  },
  {
    id: 'coordinate-geometry.equation-two-points-mixed',
    skillIds: [GRADIENT],
    tier: 2,
    statement: 'Find the equation of the line through $(-2, 7)$ and $(4, -2)$.',
    answer: { type: 'equation', lhs: 'y', rhs: '-3x/2+4', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Band between the two pegs. Across from $x = -2$ to $x = 4$ is 6 holes; from height 7 down ' +
        'to $-2$ is 9 holes. Rise over run, with its sign.',
      pictorial: 'Draw the slope triangle: run $6$, rise $-9$. Extend the line to the $y$-axis.',
      abstract: 'Gradient from the two points, then $y - y_1 = m(x - x_1)$ with either point.',
    },
    hints: [
      '$m = \\frac{-2 - 7}{4 - (-2)}$. Both subtractions in the same order.',
      '$m = -\\frac{3}{2}$. Now $7 = -\\frac{3}{2}(-2) + c$.',
      '$7 = 3 + c$, so $c = 4$.',
    ],
    solution:
      '$m = \\frac{-2 - 7}{4 - (-2)} = \\frac{-9}{6} = -\\frac{3}{2}$. Using $(-2, 7)$: ' +
      '$7 = -\\frac{3}{2}(-2) + c = 3 + c$, so $c = 4$.\n\n$$y = -\\tfrac{3}{2}x + 4, \\quad ' +
      '\\text{or } 3x + 2y = 8.$$\n\nCheck with $(4, -2)$: $-6 + 4 = -2$. ✓',
    misconceptionCodes: [MIXED_ORDER, DOUBLE_NEG],
  },

  // --- Skill 2, tier 3 ---
  {
    id: 'coordinate-geometry.depreciation-line',
    skillIds: [GRADIENT],
    tier: 3,
    statement:
      'A delivery van is bought for $\\$40\\,000$. Its value falls by the same amount every ' +
      'year, and after $3$ years it is worth $\\$28\\,000$. Write an equation for its value ' +
      '$V$ dollars after $t$ years.',
    answer: { type: 'equation', lhs: 'V', rhs: '40000-4000t', variables: ['t', 'V'] },
    cpaPrompts: {
      concrete:
        'Two receipts: at year 0 the van is worth 40 000, at year 3 it is worth 28 000. How much ' +
        'was lost altogether, and how much is that per year?',
      pictorial:
        'Plot $(0, 40\\,000)$ and $(3, 28\\,000)$ with $t$ across and $V$ up. The value is a ' +
        'straight line through them; it falls, so its slope is negative.',
      abstract:
        'The value is linear in $t$: $V = mt + c$. $c$ is the starting value and $m$ the change per year.',
    },
    hints: [
      'Two points on the graph: $(0, 40\\,000)$ and $(3, 28\\,000)$. What is the change in $V$ per year?',
      'It loses $12\\,000$ in 3 years, so $4\\,000$ a year: $m = -4000$. The starting value gives $c$.',
    ],
    solution:
      'Loss per year $= \\frac{28\\,000 - 40\\,000}{3 - 0} = -4000$. At $t = 0$, $V = 40\\,000$.\n\n' +
      '$$V = 40\\,000 - 4000t.$$\n\nCheck: $t = 3$ gives $40\\,000 - 12\\,000 = 28\\,000$. ✓',
    misconceptionCodes: [MIXED_ORDER],
  },
  {
    id: 'coordinate-geometry.hire-charges',
    skillIds: [GRADIENT],
    tier: 3,
    statement:
      'A tool-hire shop charges a fixed booking fee plus a rate for each hour. Hiring a drill for ' +
      '$3$ hours costs $\\$46$; hiring it for $7$ hours costs $\\$86$. Write an equation for the ' +
      'cost $C$ dollars of hiring the drill for $h$ hours.',
    answer: { type: 'equation', lhs: 'C', rhs: '10h+16', variables: ['h', 'C'] },
    cpaPrompts: {
      concrete:
        'Two receipts side by side. The second is for 4 more hours and costs 40 dollars more. ' +
        'What does one extra hour cost?',
      pictorial:
        'Plot $(3, 46)$ and $(7, 86)$ with hours across and dollars up. Draw the line through them ' +
        'back to $h = 0$: that height is the booking fee.',
      abstract: '$C = mh + c$: $m$ is the hourly rate (the gradient), $c$ the fixed fee (the intercept).',
    },
    hints: [
      'Between the two hires, hours went up by 4 and cost by 40. Rate per hour?',
      'At $\\$10$ an hour, 3 hours is $\\$30$. The rest of the $\\$46$ is the booking fee.',
    ],
    solution:
      'Rate $= \\frac{86 - 46}{7 - 3} = 10$ dollars per hour. Then $46 = 10(3) + c$ gives $c = 16$.\n\n' +
      '$$C = 10h + 16.$$\n\nCheck: $10(7) + 16 = 86$. ✓',
    misconceptionCodes: [MIXED_ORDER],
  },

  // --- Skill 2, diagnostic ---
  {
    id: 'coordinate-geometry.dx-mixed-subtraction-order',
    skillIds: [GRADIENT],
    tier: 'diagnostic',
    statement: 'Find the gradient of the line through $A(2, -1)$ and $B(6, 7)$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$-2$', misconceptionCode: MIXED_ORDER },
        { label: 'B', value: '$2$' },
        { label: 'C', value: '$\\frac{3}{2}$', misconceptionCode: DOUBLE_NEG },
      ],
    },
    cpaPrompts: {
      concrete:
        'Band from $A$ up to $B$. Does the line go uphill or downhill as you move right? That fixes ' +
        'the sign before you compute anything.',
      pictorial:
        'Draw the slope triangle from $A$ to $B$: across from $x = 2$ to $x = 6$, up from $y = -1$ ' +
        'to $y = 7$.',
      abstract:
        '$m = \\frac{7 - (-1)}{6 - 2}$: $B$ minus $A$ on top, $B$ minus $A$ underneath.',
    },
    hints: [
      'Start from $A$ both times: rise is $7 - (-1)$ and run is $6 - 2$.',
      'What is $7 - (-1)$? Then divide by 4.',
    ],
    solution:
      '$$m = \\frac{7 - (-1)}{6 - 2} = \\frac{8}{4} = 2.$$\n\nUsing $2 - 6$ underneath gives $-2$, ' +
      'a line sloping the wrong way; writing $7 - 1$ on top gives $\\frac{6}{4} = \\frac{3}{2}$.',
    misconceptionCodes: [MIXED_ORDER, DOUBLE_NEG],
  },

  // =========================================================================
  // Skill 3 — parallel and perpendicular
  // Tier 1: two parallels to y = 2x + 1, then the perpendicular gradient for m = 2, -3,
  // 1/2, -3/4 — signs and fractions one at a time, ending in the negative-reciprocal rule.
  // =========================================================================
  {
    id: 'coordinate-geometry.parallel-a-1',
    skillIds: [PARALLEL],
    tier: 1,
    sequence: { family: 'coordinate-geometry.parallel-perpendicular-a', position: 1 },
    statement: 'Find the equation of the line parallel to $y = 2x + 1$ that passes through $(0, 5)$.',
    answer: { type: 'equation', lhs: 'y', rhs: '2x+5', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Cut out the slope triangle of $y = 2x + 1$: 1 across, 2 up. Slide it, without turning, up ' +
        'to the peg at $(0, 5)$. The line it now lies along is the parallel.',
      pictorial: 'Draw $y = 2x + 1$ and a second line with the same slope triangle through $(0, 5)$.',
      abstract: 'Parallel lines share a gradient. Keep $m = 2$ and change $c$.',
    },
    hints: [
      'Parallel means the same gradient. What is the gradient of $y = 2x + 1$?',
      'The new line is $y = 2x + c$ and passes through $(0, 5)$, which is on the $y$-axis.',
    ],
    solution: 'Gradient $2$, $y$-intercept $5$:\n\n$$y = 2x + 5.$$',
    misconceptionCodes: [KEEPS_GRADIENT],
    figure: {
      kind: 'coordinate_plane',
      xMin: -4,
      xMax: 4,
      yMin: -3,
      yMax: 9,
      gridStep: 1,
      curves: [{ type: 'linear', m: 2, c: 1, label: 'y = 2x + 1' }],
      points: [{ x: 0, y: 5, label: '(0, 5)', highlight: true }],
      slopeTriangle: { fromX: 0, toX: 1, curveIndex: 0 },
    },
  },
  {
    id: 'coordinate-geometry.parallel-a-2',
    skillIds: [PARALLEL],
    tier: 1,
    sequence: { family: 'coordinate-geometry.parallel-perpendicular-a', position: 2 },
    expect:
      'The point has moved off the $y$-axis to $(1, 4)$. The gradient is still $2$. Predict: will ' +
      '$c$ be $4$, or something else?',
    statement: 'Find the equation of the line parallel to $y = 2x + 1$ that passes through $(1, 4)$.',
    answer: { type: 'equation', lhs: 'y', rhs: '2x+2', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Slide the same 1-across-2-up triangle to the peg at $(1, 4)$. Step it back one place to ' +
        'the left: where does the line cross the $y$-axis?',
      pictorial: 'Draw the parallel through $(1, 4)$ and read its $y$-intercept.',
      abstract: '$y = 2x + c$ with $4 = 2(1) + c$.',
    },
    hints: [
      'Keep $m = 2$: $y = 2x + c$. Substitute the point.',
      '$4 = 2 + c$.',
    ],
    solution: '$y = 2x + c$ and $4 = 2(1) + c$ gives $c = 2$.\n\n$$y = 2x + 2.$$',
    misconceptionCodes: [KEEPS_GRADIENT],
  },
  {
    id: 'coordinate-geometry.perpendicular-a-3',
    skillIds: [PARALLEL],
    tier: 1,
    sequence: { family: 'coordinate-geometry.parallel-perpendicular-a', position: 3 },
    expect:
      'Same line, $y = 2x + 1$, but now the new line must be perpendicular to it, not parallel. ' +
      'Predict the gradient: will it still be $2$? Will it still be positive?',
    statement: 'A line is perpendicular to $y = 2x + 1$. Find its gradient.',
    answer: { type: 'number', value: -0.5, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Take the 1-across-2-up card triangle and turn it a quarter turn. Which side is horizontal ' +
        'now, and does the line it lies along go up or down as you move right?',
      pictorial: 'Draw the rotated slope triangle: 2 across, 1 down.',
      abstract: '$m_1 m_2 = -1$, so $m_2 = -\\frac{1}{2}$.',
    },
    hints: [
      'Perpendicular gradients multiply to $-1$. What times $2$ gives $-1$?',
      'Flip the fraction $\\frac{2}{1}$ and change its sign.',
    ],
    solution: '$$m_\\perp = -\\frac{1}{2}.$$\n\nCheck: $2 \\times (-\\tfrac{1}{2}) = -1$. ✓',
    misconceptionCodes: [KEEPS_GRADIENT],
  },
  {
    id: 'coordinate-geometry.perpendicular-a-4',
    skillIds: [PARALLEL],
    tier: 1,
    sequence: { family: 'coordinate-geometry.parallel-perpendicular-a', position: 4 },
    expect:
      'The gradient $2$ has become $-3$: a falling line this time. Predict the sign of the ' +
      'perpendicular gradient before you find its size.',
    statement: 'A line has gradient $-3$. Find the gradient of a line perpendicular to it.',
    answer: { type: 'number', value: 1 / 3, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Card triangle: 1 across, 3 down. Turn it a quarter turn. Now it is 3 across and 1 up — ' +
        'a gentle rise.',
      pictorial: 'Draw the falling line and the rotated triangle on the line that crosses it square-on.',
      abstract: '$-3 \\times m_2 = -1$, so $m_2 = \\frac{1}{3}$.',
    },
    hints: [
      'What times $-3$ gives $-1$?',
      'Flip $\\frac{-3}{1}$ to $\\frac{1}{-3}$ and change the sign.',
    ],
    solution: '$$m_\\perp = -\\frac{1}{-3} = \\frac{1}{3}.$$\n\nCheck: $-3 \\times \\tfrac{1}{3} = -1$. ✓',
    misconceptionCodes: [KEEPS_GRADIENT],
  },
  {
    id: 'coordinate-geometry.perpendicular-a-5',
    skillIds: [PARALLEL],
    tier: 1,
    sequence: { family: 'coordinate-geometry.parallel-perpendicular-a', position: 5 },
    expect:
      'Now the gradient is a fraction, $\\frac{1}{2}$. A shallow line. Predict: will the ' +
      'perpendicular be steeper or shallower, and will it be a fraction?',
    statement: 'A line has gradient $\\frac{1}{2}$. Find the gradient of a line perpendicular to it.',
    answer: { type: 'number', value: -2, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Card triangle: 2 across, 1 up. Turn it a quarter turn: 1 across, 2 down. Shallow has ' +
        'become steep.',
      pictorial: 'Draw both slope triangles: the flat one and its quarter-turn.',
      abstract: '$\\frac{1}{2} \\times m_2 = -1$, so $m_2 = -2$.',
    },
    hints: [
      'What times $\\frac{1}{2}$ gives $-1$?',
      'Flip $\\frac{1}{2}$ to $\\frac{2}{1}$ and change the sign.',
    ],
    solution: '$$m_\\perp = -\\frac{1}{1/2} = -2.$$\n\nCheck: $\\tfrac{1}{2} \\times (-2) = -1$. ✓',
    misconceptionCodes: [KEEPS_GRADIENT],
  },
  {
    id: 'coordinate-geometry.perpendicular-a-6',
    skillIds: [PARALLEL],
    tier: 1,
    sequence: { family: 'coordinate-geometry.parallel-perpendicular-a', position: 6 },
    expect:
      'Gradient $-\\frac{3}{4}$: negative and a fraction with neither part equal to 1. Predict ' +
      'the perpendicular gradient using the pattern of the last three items — then state the rule.',
    statement: 'A line has gradient $-\\frac{3}{4}$. Find the gradient of a line perpendicular to it.',
    answer: { type: 'number', value: 4 / 3, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Card triangle: 4 across, 3 down. Quarter turn: 3 across, 4 up. Read the new rise over run.',
      pictorial: 'Draw the slope triangle and its rotation. Rise and run have swapped and one sign has flipped.',
      abstract: 'The rule: $m_\\perp = -\\frac{1}{m}$, the negative reciprocal.',
    },
    hints: [
      'Flip the fraction: $\\frac{3}{4}$ becomes $\\frac{4}{3}$.',
      'Then change the sign: negative becomes positive.',
    ],
    solution:
      '$$m_\\perp = -\\frac{1}{-3/4} = \\frac{4}{3}.$$\n\nCheck: $-\\tfrac{3}{4} \\times ' +
      '\\tfrac{4}{3} = -1$. ✓ The rule for every case: flip the fraction, flip the sign — the ' +
      'negative reciprocal.',
    misconceptionCodes: [KEEPS_GRADIENT],
  },

  // --- Skill 3, tier 2 ---
  {
    id: 'coordinate-geometry.perpendicular-bisector-gradient',
    skillIds: [PARALLEL, GRADIENT],
    tier: 2,
    statement:
      'Find the gradient of the perpendicular bisector of the segment joining $A(2, -1)$ and ' +
      '$B(6, 7)$.',
    answer: { type: 'number', value: -0.5, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Cut out the slope triangle of $AB$ — how many along, how many up? Now turn it a quarter ' +
        'turn. Which way does the rise point now, and what has the slope become?',
      pictorial:
        'Draw $AB$ with its slope triangle. Draw the same triangle rotated $90°$ at the midpoint. ' +
        'Read the new rise over run, including the sign.',
      abstract:
        'Find $m_{AB}$ from the two points, then take the negative reciprocal.',
    },
    hints: [
      'Find the gradient of $AB$ first: $\\frac{7 - (-1)}{6 - 2}$.',
      'A perpendicular line has gradient equal to the negative reciprocal of that. What is the ' +
        'negative reciprocal of 2?',
    ],
    solution:
      '$m_{AB} = \\frac{7 - (-1)}{6 - 2} = \\frac{8}{4} = 2$. The perpendicular bisector has ' +
      'gradient\n\n$$m_\\perp = -\\frac{1}{2}.$$\n\nCheck: $2 \\times (-\\tfrac{1}{2}) = -1$.',
    misconceptionCodes: [KEEPS_GRADIENT, MIXED_ORDER],
  },
  {
    id: 'coordinate-geometry.classify-pair-perpendicular',
    skillIds: [PARALLEL],
    tier: 2,
    statement:
      'Are the lines $2x + 3y = 6$ and $3x - 2y = 4$ parallel, perpendicular, or neither?',
    answer: { type: 'exact', value: 'perpendicular', accepts: ['perpendicular lines', 'they are perpendicular'] },
    cpaPrompts: {
      concrete:
        'Find the slope triangle of each line by rearranging to $y = mx + c$. Lay one triangle on ' +
        'the other: does it fit by sliding, by a quarter turn, or not at all?',
      pictorial: 'Sketch both lines from their intercepts and look at the angle where they cross.',
      abstract: 'Compare $m_1$ and $m_2$: equal means parallel; product $-1$ means perpendicular.',
    },
    hints: [
      'Rearrange each to $y = mx + c$. The first gives $y = -\\frac{2}{3}x + 2$.',
      'The second gives $y = \\frac{3}{2}x - 2$. Now multiply the two gradients.',
    ],
    solution:
      '$2x + 3y = 6 \\implies y = -\\tfrac{2}{3}x + 2$, so $m_1 = -\\tfrac{2}{3}$.\n\n' +
      '$3x - 2y = 4 \\implies y = \\tfrac{3}{2}x - 2$, so $m_2 = \\tfrac{3}{2}$.\n\n' +
      '$m_1 m_2 = -\\tfrac{2}{3} \\times \\tfrac{3}{2} = -1$, so the lines are **perpendicular**.',
    misconceptionCodes: [KEEPS_GRADIENT, 'function-graphs.gradient-before-isolating-y'],
  },
  {
    id: 'coordinate-geometry.classify-pair-neither',
    skillIds: [PARALLEL],
    tier: 2,
    statement: 'Are the lines $y = 4x - 1$ and $4y = x + 8$ parallel, perpendicular, or neither?',
    answer: { type: 'exact', value: 'neither', accepts: ['neither parallel nor perpendicular', 'not parallel or perpendicular'] },
    cpaPrompts: {
      concrete:
        'Slope triangles: 1 across 4 up, and 4 across 1 up. The second is the first turned a ' +
        'quarter turn — but does it also go the other way?',
      pictorial: 'Sketch both. Both rise to the right, so they cannot cross square-on.',
      abstract: 'Reciprocal gradients are not enough; the product must be $-1$, not $+1$.',
    },
    hints: [
      'Write the second line as $y = \\frac{1}{4}x + 2$. Compare gradients: $4$ and $\\frac{1}{4}$.',
      'Equal? No. Multiply them: $4 \\times \\frac{1}{4} = 1$. Is that $-1$?',
    ],
    solution:
      '$m_1 = 4$ and $m_2 = \\tfrac{1}{4}$. Not equal, so not parallel. $m_1 m_2 = 1 \\ne -1$, so ' +
      'not perpendicular either — the gradients are reciprocals, but not *negative* reciprocals.\n\n' +
      '**Neither.**',
    misconceptionCodes: [KEEPS_GRADIENT],
  },
  {
    id: 'coordinate-geometry.find-k-perpendicular',
    skillIds: [PARALLEL],
    tier: 2,
    statement: 'The line $y = kx + 3$ is perpendicular to $y = 4x - 1$. Find $k$.',
    answer: { type: 'number', value: -0.25, tolerance: 1e-6 },
    cpaPrompts: {
      concrete: 'Slope triangle of $y = 4x - 1$: 1 across, 4 up. Quarter turn: 4 across, 1 down.',
      pictorial: 'Draw the steep line and the shallow one crossing it square-on. Read $k$ as rise over run.',
      abstract:
        'Perpendicular gradients multiply to $-1$, so $4k = -1$. Solve for $k$, and say what the sign of your answer tells you about the direction of the second line.',
    },
    hints: [
      '$k$ is the gradient of the new line. Perpendicular gradients multiply to $-1$.',
      'Solve $4k = -1$.',
    ],
    solution: '$4 \\times k = -1$, so\n\n$$k = -\\frac{1}{4}.$$',
    misconceptionCodes: [KEEPS_GRADIENT],
  },
  {
    id: 'coordinate-geometry.perpendicular-through-point',
    skillIds: [PARALLEL, GRADIENT],
    tier: 2,
    statement:
      'Find the equation of the line through $(-1, 2)$ that is perpendicular to $3x + 4y = 12$.',
    answer: { type: 'equation', lhs: 'y', rhs: '4x/3+10/3', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'First find the slope triangle of $3x + 4y = 12$ by getting $y$ alone: 4 across, 3 down. ' +
        'Turn it a quarter turn and place it at the peg $(-1, 2)$.',
      pictorial:
        'Draw $3x + 4y = 12$ through $(4, 0)$ and $(0, 3)$. Through $(-1, 2)$ draw the line with ' +
        'the rotated triangle: 3 across, 4 up.',
      abstract:
        'Rearrange to find $m_1 = -\\frac{3}{4}$; then $m_2 = \\frac{4}{3}$; then ' +
        '$y - 2 = \\frac{4}{3}(x + 1)$.',
    },
    hints: [
      'Rearrange $3x + 4y = 12$ to $y = -\\frac{3}{4}x + 3$. Its gradient is $-\\frac{3}{4}$.',
      'The perpendicular gradient is the negative reciprocal, $\\frac{4}{3}$.',
      'Use $y - 2 = \\frac{4}{3}(x - (-1))$ and expand.',
    ],
    solution:
      '$3x + 4y = 12 \\implies y = -\\tfrac{3}{4}x + 3$, so $m_1 = -\\tfrac{3}{4}$ and ' +
      '$m_\\perp = \\tfrac{4}{3}$.\n\n$$y - 2 = \\tfrac{4}{3}(x + 1) \\implies y = \\tfrac{4}{3}x ' +
      '+ \\tfrac{4}{3} + 2 = \\tfrac{4}{3}x + \\tfrac{10}{3},$$\n\nor $3y = 4x + 10$. Check: ' +
      '$x = -1$ gives $3y = 6$, $y = 2$. ✓',
    misconceptionCodes: [KEEPS_GRADIENT, 'function-graphs.gradient-before-isolating-y'],
  },

  // --- Skill 3, tier 3 ---
  {
    id: 'coordinate-geometry.road-junction',
    skillIds: [PARALLEL, GRADIENT],
    tier: 3,
    statement:
      'On a town plan, Main Road runs along the line $y = 2x + 3$. A new side road is to leave ' +
      'Main Road at the junction $(1, 5)$, meeting it square-on. Write the equation of the side road.',
    answer: { type: 'equation', lhs: 'y', rhs: '-x/2+11/2', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Lay a ruler along Main Road: 1 across, 2 up. A second ruler crossing it square-on at the ' +
        'junction — which way does it lean, and how steeply?',
      pictorial:
        'Draw Main Road through $(0, 3)$ and $(1, 5)$. At the junction draw its slope triangle ' +
        'turned a quarter turn.',
      abstract: 'Square-on means perpendicular: $m = -\\frac{1}{2}$, through $(1, 5)$.',
    },
    hints: [
      'Main Road has gradient $2$. A road crossing it square-on has the negative reciprocal gradient.',
      'So the side road is $y = -\\frac{1}{2}x + c$ and passes through $(1, 5)$. Find $c$.',
    ],
    solution:
      '$m_{\\text{side}} = -\\tfrac{1}{2}$. Through $(1, 5)$: $5 = -\\tfrac{1}{2}(1) + c$, so ' +
      '$c = \\tfrac{11}{2}$.\n\n$$y = -\\tfrac{1}{2}x + \\tfrac{11}{2}, \\quad \\text{or } x + 2y = 11.$$',
    misconceptionCodes: [KEEPS_GRADIENT],
    figure: {
      kind: 'coordinate_plane',
      xMin: -3,
      xMax: 6,
      yMin: -1,
      yMax: 9,
      gridStep: 1,
      curves: [{ type: 'linear', m: 2, c: 3, label: 'Main Road' }],
      points: [{ x: 1, y: 5, label: 'junction', highlight: true }],
    },
  },
  {
    id: 'coordinate-geometry.roof-brace',
    skillIds: [PARALLEL, GRADIENT],
    tier: 3,
    statement:
      'On a builder\'s drawing a rafter runs in a straight line from the wall at $(0, 0)$ up to ' +
      'the ridge at $(8, 6)$. A brace is fixed at the ridge and comes down to the floor, the ' +
      '$x$-axis, meeting the rafter square-on. Where does the brace meet the floor?',
    answer: { type: 'coordinates', x: 12.5, y: 0, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'The rafter goes 4 along for every 3 up. A strut that crosses it square-on goes 3 along ' +
        'for every 4 down. From the ridge, step down until you hit the floor.',
      pictorial:
        'Draw the rafter with its 8-across-6-up triangle. At $(8, 6)$ draw the rotated triangle ' +
        'pointing down to the right, and continue that line to $y = 0$.',
      abstract:
        'Rafter gradient $\\frac{6}{8} = \\frac{3}{4}$; brace gradient $-\\frac{4}{3}$; brace ' +
        'line $y - 6 = -\\frac{4}{3}(x - 8)$; set $y = 0$.',
    },
    hints: [
      'The rafter has gradient $\\frac{6}{8}$. The brace crosses it square-on, so its gradient is the negative reciprocal.',
      'Brace: $y - 6 = -\\frac{4}{3}(x - 8)$. On the floor $y = 0$.',
      '$-6 = -\\frac{4}{3}(x - 8)$, so $x - 8 = 4.5$.',
    ],
    solution:
      'Rafter gradient $= \\tfrac{6}{8} = \\tfrac{3}{4}$, so the brace has gradient $-\\tfrac{4}{3}$.\n\n' +
      'Brace: $y - 6 = -\\tfrac{4}{3}(x - 8)$. At the floor $y = 0$: $-6 = -\\tfrac{4}{3}(x - 8)$, ' +
      'so $x - 8 = \\tfrac{18}{4} = 4.5$ and $x = 12.5$.\n\n$$(12.5, 0).$$',
    misconceptionCodes: [KEEPS_GRADIENT],
  },

  // --- Skill 3, diagnostic ---
  {
    id: 'coordinate-geometry.dx-perpendicular-keeps-gradient',
    skillIds: [PARALLEL],
    tier: 'diagnostic',
    statement:
      'Line $L$ passes through $(1, 3)$ and $(3, 7)$. Find the gradient of a line perpendicular to $L$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$2$', misconceptionCode: KEEPS_GRADIENT },
        { label: 'B', value: '$-\\frac{1}{2}$' },
        { label: 'C', value: '$\\frac{1}{2}$', misconceptionCode: MIXED_ORDER },
      ],
    },
    cpaPrompts: {
      concrete:
        'Slope triangle of $L$: 2 across, 4 up — that is 1 across, 2 up. Turn the card a quarter ' +
        'turn. Is the new slope the same as the old one?',
      pictorial: 'Draw $L$ and a line crossing it square-on. One rises, the other must fall.',
      abstract: '$m_L = \\frac{7 - 3}{3 - 1} = 2$; then $m_\\perp = -\\frac{1}{2}$.',
    },
    hints: [
      'First find the gradient of $L$ itself: $\\frac{7 - 3}{3 - 1}$.',
      'Perpendicular gradients multiply to $-1$. What times $2$ gives $-1$?',
    ],
    solution:
      '$m_L = \\frac{7 - 3}{3 - 1} = 2$, so $m_\\perp = -\\frac{1}{2}$.\n\nKeeping $2$ gives a ' +
      'parallel line, not a perpendicular one. Computing $m_L$ as $\\frac{7 - 3}{1 - 3} = -2$ and ' +
      'then taking the negative reciprocal gives $\\frac{1}{2}$.',
    misconceptionCodes: [KEEPS_GRADIENT, MIXED_ORDER],
  },

  // =========================================================================
  // Skill 4 — perpendicular bisectors
  // Tier 1: the same A(2, -1) with B moved so the segment is horizontal, vertical, then
  // diagonal (the existing item), then a fractional midpoint, then the payoff y = x.
  // =========================================================================
  {
    id: 'coordinate-geometry.bisector-a-1',
    skillIds: [BISECTOR],
    tier: 1,
    sequence: { family: 'coordinate-geometry.bisector-a', position: 1 },
    statement: 'Find the equation of the perpendicular bisector of the segment joining $A(2, -1)$ and $B(6, -1)$.',
    answer: { type: 'equation', lhs: 'x', rhs: '4', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Draw $AB$ on paper — it is flat. Fold so $A$ lands on $B$. The crease is upright and ' +
        'passes through the middle of $AB$. Which pegs does it go through?',
      pictorial: 'Plot $A$ and $B$ on the line $y = -1$. Mark the midpoint and draw a vertical line through it.',
      abstract: 'A vertical line through $(4, -1)$ has equation $x = 4$.',
    },
    hints: [
      'The midpoint of $AB$ is $\\left(\\frac{2 + 6}{2}, -1\\right)$.',
      '$AB$ is horizontal, so the bisector is vertical. A vertical line through $(4, -1)$ is $x = \\ldots$',
    ],
    solution:
      'Midpoint $M = (4, -1)$. $AB$ is horizontal, so its perpendicular is vertical.\n\n$$x = 4.$$\n\n' +
      'There is no gradient to take a negative reciprocal of: a horizontal line\'s gradient is $0$.',
    misconceptionCodes: [THROUGH_ENDPOINT],
    figure: {
      kind: 'coordinate_plane',
      xMin: -1,
      xMax: 8,
      yMin: -4,
      yMax: 4,
      gridStep: 1,
      curves: [],
      points: [
        { x: 2, y: -1, label: 'A', highlight: true },
        { x: 6, y: -1, label: 'B', highlight: true },
      ],
    },
  },
  {
    id: 'coordinate-geometry.bisector-a-2',
    skillIds: [BISECTOR],
    tier: 1,
    sequence: { family: 'coordinate-geometry.bisector-a', position: 2 },
    expect:
      '$B$ has moved from $(6, -1)$ to $(2, 7)$, directly above $A$. Predict: which way will the ' +
      'crease run now, and what kind of equation will it have?',
    statement: 'Find the equation of the perpendicular bisector of the segment joining $A(2, -1)$ and $B(2, 7)$.',
    answer: { type: 'equation', lhs: 'y', rhs: '3', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete: 'Fold so $A$ lands on $B$. The segment is upright, so the crease is flat. At what height?',
      pictorial: 'Plot $A$ and $B$ on $x = 2$. Mark the midpoint and draw a horizontal line through it.',
      abstract: 'A horizontal line through $(2, 3)$ has equation $y = 3$.',
    },
    hints: [
      'Midpoint: $\\left(2, \\frac{-1 + 7}{2}\\right)$.',
      '$AB$ is vertical, so the bisector is horizontal: $y = $ the midpoint\'s height.',
    ],
    solution: 'Midpoint $M = (2, 3)$. $AB$ is vertical, so the bisector is horizontal.\n\n$$y = 3.$$',
    misconceptionCodes: [THROUGH_ENDPOINT],
  },
  {
    id: 'coordinate-geometry.perpendicular-bisector-intercept',
    skillIds: [BISECTOR],
    tier: 1,
    sequence: { family: 'coordinate-geometry.bisector-a', position: 3 },
    expect:
      'Now $B$ is at $(6, 7)$, so $AB$ is diagonal and the crease is too. Neither $x = $ nor ' +
      '$y = $ a number will do. What two facts about the crease do you need to write $y = mx + c$?',
    statement:
      'Find the equation of the perpendicular bisector of the segment joining $A(2, -1)$ and ' +
      '$B(6, 7)$, in the form $y = mx + c$. State the value of $c$, the $y$-intercept.',
    answer: { type: 'number', value: 5, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Fold the paper so $A$ lands on $B$. Where does the crease cross $AB$? That crossing ' +
        'point and the crease\'s direction are the two things the equation needs.',
      pictorial:
        'Mark the midpoint $M$ of $AB$. From $M$, step along the perpendicular gradient ' +
        '$-\\frac{1}{2}$ back toward the $y$-axis. Where does the line cross it?',
      abstract:
        'Midpoint, perpendicular gradient, then point–slope form through the midpoint; rearrange ' +
        'to read off $c$.',
    },
    hints: [
      'A perpendicular bisector passes through the midpoint and meets the segment at $90°$. Find ' +
        'the midpoint of $AB$ first.',
      'The midpoint is $(4, 3)$ and the perpendicular gradient is $-\\frac{1}{2}$. Use ' +
        '$y - y_1 = m(x - x_1)$ with that point and gradient.',
      'Expand $y - 3 = -\\frac{1}{2}(x - 4)$ and collect the constant terms to find $c$.',
    ],
    solution:
      'Midpoint $M = \\left(\\frac{2+6}{2}, \\frac{-1+7}{2}\\right) = (4, 3)$. $m_{AB} = 2$, so ' +
      '$m_\\perp = -\\frac{1}{2}$.\n\n$$y - 3 = -\\tfrac{1}{2}(x - 4) \\implies y = ' +
      '-\\tfrac{1}{2}x + 2 + 3 = -\\tfrac{1}{2}x + 5.$$\n\nSo $c = 5$ (equivalently $x + 2y - ' +
      '10 = 0$).',
    misconceptionCodes: [THROUGH_ENDPOINT, KEEPS_GRADIENT],
  },
  {
    id: 'coordinate-geometry.bisector-a-4',
    skillIds: [BISECTOR],
    tier: 1,
    sequence: { family: 'coordinate-geometry.bisector-a', position: 4 },
    expect:
      '$B$ has moved to $(5, 5)$, and this time give the whole equation. The midpoint will not ' +
      'have whole-number coordinates. Predict: does that change the method, or only the arithmetic?',
    statement: 'Find the equation of the perpendicular bisector of the segment joining $A(2, -1)$ and $B(5, 5)$.',
    answer: { type: 'equation', lhs: 'y', rhs: '-x/2+15/4', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Fold $A$ onto $B$. The crease crosses $AB$ halfway — between two pegs this time, at ' +
        '$x = 3.5$. Its direction is still the quarter-turn of $AB$\'s slope triangle.',
      pictorial: 'Mark $M(3.5, 2)$. Draw $AB$\'s triangle (3 across, 6 up) rotated at $M$.',
      abstract: '$M = (3.5, 2)$, $m_{AB} = 2$, $m_\\perp = -\\frac{1}{2}$, then $y - 2 = -\\frac{1}{2}(x - 3.5)$.',
    },
    hints: [
      'Midpoint: $\\left(\\frac{2 + 5}{2}, \\frac{-1 + 5}{2}\\right) = (3.5, 2)$.',
      '$m_{AB} = \\frac{5 - (-1)}{5 - 2} = 2$, so the bisector has gradient $-\\frac{1}{2}$.',
      '$y - 2 = -\\frac{1}{2}(x - 3.5)$. Expand: $-\\frac{1}{2} \\times (-3.5) = 1.75$.',
    ],
    solution:
      '$M = (3.5, 2)$; $m_{AB} = \\frac{6}{3} = 2$; $m_\\perp = -\\tfrac{1}{2}$.\n\n' +
      '$$y - 2 = -\\tfrac{1}{2}(x - 3.5) \\implies y = -\\tfrac{1}{2}x + 1.75 + 2 = ' +
      '-\\tfrac{1}{2}x + \\tfrac{15}{4},$$\n\nor $2x + 4y = 15$. Check: $x = 3.5$ gives ' +
      '$7 + 4y = 15$, $y = 2$. ✓',
    misconceptionCodes: [THROUGH_ENDPOINT, KEEPS_GRADIENT],
  },
  {
    id: 'coordinate-geometry.bisector-a-5',
    skillIds: [BISECTOR],
    tier: 1,
    sequence: { family: 'coordinate-geometry.bisector-a', position: 5 },
    expect:
      'A fresh segment: from $(0, 4)$ on one axis to $(4, 0)$ on the other. Predict the midpoint ' +
      'and the gradient of $AB$ before you start. Where will the crease pass — and is it a line ' +
      'you already know?',
    statement: 'Find the equation of the perpendicular bisector of the segment joining $A(0, 4)$ and $B(4, 0)$.',
    answer: { type: 'equation', lhs: 'y', rhs: 'x', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Fold $A$ onto $B$. The crease goes through the origin, corner to corner across the grid ' +
        'squares. Which pegs is it hitting?',
      pictorial: 'Plot $A$, $B$ and $M(2, 2)$. Draw $AB$ (falling at $45°$) and the crease (rising at $45°$).',
      abstract: '$M = (2, 2)$, $m_{AB} = -1$, $m_\\perp = 1$, so $y - 2 = 1(x - 2)$.',
    },
    hints: [
      'Midpoint $(2, 2)$. Gradient of $AB$: $\\frac{0 - 4}{4 - 0} = -1$.',
      'The negative reciprocal of $-1$ is $1$. Through $(2, 2)$ with gradient $1$: $y - 2 = x - 2$.',
    ],
    solution:
      '$M = (2, 2)$, $m_{AB} = -1$, so $m_\\perp = 1$.\n\n$$y - 2 = 1(x - 2) \\implies y = x.$$\n\n' +
      'The payoff: the bisector is the line $y = x$, the mirror that swaps $A(0, 4)$ and $B(4, 0)$. ' +
      'A perpendicular bisector is always the mirror line that maps one endpoint onto the other.',
    misconceptionCodes: [THROUGH_ENDPOINT],
  },

  // --- Skill 4, tier 2 ---
  {
    id: 'coordinate-geometry.equidistant-point',
    skillIds: [BISECTOR, LENGTH],
    tier: 2,
    statement:
      'Show that $P(1, 5)$ is the same distance from $A(-1, 1)$ as from $B(5, 3)$, and state that ' +
      'common distance in exact form.',
    answer: { type: 'number', value: Math.sqrt(20), tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Bands from $P$ to $A$ and from $P$ to $B$. Make the L under each: 2 across 4 up, and 4 ' +
        'across 2 up. Same triangle, turned — so the same length.',
      pictorial:
        'Plot the three points. Draw the perpendicular bisector of $AB$ through $M(2, 2)$ with ' +
        'gradient $-3$: does $P$ lie on it?',
      abstract:
        'Compute $PA$ and $PB$ with the distance formula. Equal distances is what lying on the ' +
        'perpendicular bisector means.',
    },
    hints: [
      '$PA$: across $1 - (-1) = 2$, up $5 - 1 = 4$. $PB$: across $5 - 1 = 4$, up $3 - 5 = -2$.',
      'Both give $\\sqrt{4 + 16}$. Simplify the surd.',
    ],
    solution:
      '$PA = \\sqrt{(1 - (-1))^2 + (5 - 1)^2} = \\sqrt{4 + 16} = \\sqrt{20}$.\n\n' +
      '$PB = \\sqrt{(5 - 1)^2 + (3 - 5)^2} = \\sqrt{16 + 4} = \\sqrt{20}$.\n\nSo $PA = PB = ' +
      '\\sqrt{20} = 2\\sqrt{5}$. Check: the perpendicular bisector of $AB$ is $y = -3x + 8$, and ' +
      '$P(1, 5)$ satisfies it.',
    misconceptionCodes: [THROUGH_ENDPOINT, DOUBLE_NEG],
  },
  {
    id: 'coordinate-geometry.bisector-meets-x-axis',
    skillIds: [BISECTOR],
    tier: 2,
    statement: 'Find the point on the $x$-axis that is the same distance from $A(2, -1)$ as from $B(6, 7)$.',
    answer: { type: 'coordinates', x: 10, y: 0, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Fold $A$ onto $B$. Every point on the crease is equally far from both. Follow the crease ' +
        'until it reaches the $x$-axis.',
      pictorial: 'Draw the perpendicular bisector of $AB$, which you know is $y = -\\frac{1}{2}x + 5$, and find where it crosses $y = 0$.',
      abstract: 'Points equidistant from $A$ and $B$ lie on the perpendicular bisector. Set $y = 0$ in its equation.',
    },
    hints: [
      'The set of points the same distance from $A$ and $B$ is the perpendicular bisector of $AB$: $y = -\\frac{1}{2}x + 5$.',
      'On the $x$-axis $y = 0$. Solve $0 = -\\frac{1}{2}x + 5$.',
    ],
    solution:
      'The perpendicular bisector of $AB$ is $y = -\\tfrac{1}{2}x + 5$. With $y = 0$: $x = 10$.\n\n' +
      '$$(10, 0).$$\n\nCheck: distance to $A$ is $\\sqrt{64 + 1} = \\sqrt{65}$; to $B$ is ' +
      '$\\sqrt{16 + 49} = \\sqrt{65}$. ✓',
    misconceptionCodes: [THROUGH_ENDPOINT],
  },

  // --- Skill 4, tier 3 ---
  {
    id: 'coordinate-geometry.water-pipe',
    skillIds: [BISECTOR],
    tier: 3,
    statement:
      'Two houses are marked on a site plan at $(-3, 2)$ and $(5, 6)$. A straight water main is to ' +
      'be laid so that every point along it is equally far from both houses. Write the equation of ' +
      'the line the main follows.',
    answer: { type: 'equation', lhs: 'y', rhs: '-2x+6', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Fold the plan so one house lands on the other. The crease is the only line whose every ' +
        'point is the same distance from both. Where does it cross the segment between the houses?',
      pictorial:
        'Plot the houses and the midpoint $(1, 4)$. Draw the segment\'s slope triangle (8 across, ' +
        '4 up) and rotate it at the midpoint to get the pipe\'s direction.',
      abstract:
        '"Equally far from both" means the perpendicular bisector: midpoint, gradient of the ' +
        'segment, negative reciprocal, point–slope form.',
    },
    hints: [
      'Which line has every point equidistant from two fixed points? Start with the midpoint of the houses.',
      'Midpoint $(1, 4)$; the segment has gradient $\\frac{6 - 2}{5 - (-3)} = \\frac{1}{2}$. The pipe crosses it square-on.',
      'Pipe gradient $-2$, through $(1, 4)$: $y - 4 = -2(x - 1)$.',
    ],
    solution:
      'Midpoint $= \\left(\\frac{-3 + 5}{2}, \\frac{2 + 6}{2}\\right) = (1, 4)$. Segment gradient ' +
      '$= \\frac{4}{8} = \\tfrac{1}{2}$, so the pipe has gradient $-2$.\n\n$$y - 4 = -2(x - 1) ' +
      '\\implies y = -2x + 6.$$\n\nCheck: $(1, 4)$ is $\\sqrt{16 + 4}$ from each house. ✓',
    misconceptionCodes: [THROUGH_ENDPOINT, KEEPS_GRADIENT],
    figure: {
      kind: 'coordinate_plane',
      xMin: -5,
      xMax: 7,
      yMin: -1,
      yMax: 8,
      gridStep: 1,
      curves: [],
      points: [
        { x: -3, y: 2, label: 'house 1', highlight: true },
        { x: 5, y: 6, label: 'house 2', highlight: true },
      ],
    },
  },
  {
    id: 'coordinate-geometry.mast-on-road',
    skillIds: [BISECTOR, GRADIENT],
    tier: 3,
    statement:
      'A phone mast must be built the same distance from the villages at $P(-2, 1)$ and $Q(6, 5)$, ' +
      'and it must stand on the straight road whose equation is $y = x - 5$. Find the coordinates ' +
      'of the mast.',
    answer: { type: 'coordinates', x: 4, y: -1, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Fold $P$ onto $Q$ to get the crease of equal distances. Lay a ruler along the road. The ' +
        'mast is where the ruler crosses the crease.',
      pictorial:
        'Draw the road $y = x - 5$ and the perpendicular bisector of $PQ$ through its midpoint ' +
        '$(2, 3)$ with gradient $-2$. Mark where they cross.',
      abstract:
        'Equidistant from $P$ and $Q$: on the perpendicular bisector $y = -2x + 7$. On the road: ' +
        '$y = x - 5$. Solve simultaneously.',
    },
    hints: [
      'The mast lies on the perpendicular bisector of $PQ$. Midpoint $(2, 3)$, $m_{PQ} = \\frac{1}{2}$, so the bisector has gradient $-2$.',
      'Bisector: $y = -2x + 7$. The mast is also on $y = x - 5$. Where do these two lines meet?',
      '$x - 5 = -2x + 7$.',
    ],
    solution:
      'Midpoint of $PQ$ is $(2, 3)$; $m_{PQ} = \\frac{5 - 1}{6 - (-2)} = \\tfrac{1}{2}$; bisector ' +
      'gradient $-2$: $y - 3 = -2(x - 2)$, so $y = -2x + 7$.\n\nOn the road too: $x - 5 = -2x + 7$, ' +
      '$3x = 12$, $x = 4$, $y = -1$.\n\n$$(4, -1).$$\n\nCheck: distance to $P$ is $\\sqrt{36 + 4} ' +
      '= \\sqrt{40}$; to $Q$ is $\\sqrt{4 + 36} = \\sqrt{40}$. ✓',
    misconceptionCodes: [THROUGH_ENDPOINT, MIXED_ORDER],
  },

  // --- Skill 4, tier 4: the circumcentre, which uses every skill in the unit ---
  {
    id: 'coordinate-geometry.circumcentre-two-bisectors',
    skillIds: [BISECTOR, LENGTH, PARALLEL],
    tier: 4,
    statement:
      'Triangle $ABC$ has vertices $A(1, 1)$, $B(7, 1)$ and $C(4, 7)$. Find the point that is the ' +
      'same distance from all three vertices.',
    answer: { type: 'coordinates', x: 4, y: 3.25, tolerance: 1e-6 },
    cpaPrompts: {
      concrete:
        'Fold $A$ onto $B$: one crease. Fold $A$ onto $C$: a second crease. The point where the ' +
        'creases cross is equally far from $A$ and $B$, and from $A$ and $C$ — so from all three.',
      pictorial:
        'Plot the triangle. The bisector of $AB$ is the vertical line $x = 4$. Draw the bisector ' +
        'of $AC$ through $(2.5, 4)$ with gradient $-\\frac{1}{2}$ and mark where they cross.',
      abstract:
        'Two perpendicular bisectors meet at the circumcentre. Solve them simultaneously, then ' +
        'check the three distances are equal.',
    },
    hints: [
      'A point equidistant from $A$ and $B$ lies on the perpendicular bisector of $AB$. $AB$ is horizontal with midpoint $(4, 1)$, so that bisector is $x = 4$.',
      'Now the bisector of $AC$: midpoint $(2.5, 4)$, $m_{AC} = \\frac{6}{3} = 2$, so gradient $-\\frac{1}{2}$: $y - 4 = -\\frac{1}{2}(x - 2.5)$.',
      'Put $x = 4$ into that equation.',
    ],
    solution:
      'Bisector of $AB$: midpoint $(4, 1)$, $AB$ horizontal, so $x = 4$.\n\nBisector of $AC$: ' +
      'midpoint $(2.5, 4)$, $m_{AC} = 2$, so $y - 4 = -\\tfrac{1}{2}(x - 2.5)$.\n\nAt $x = 4$: ' +
      '$y = 4 - \\tfrac{1}{2}(1.5) = 3.25$.\n\n$$(4, 3.25) = \\left(4, \\tfrac{13}{4}\\right).$$\n\n' +
      'Check: to $A$, $\\sqrt{9 + 2.25^2} = \\sqrt{14.0625} = 3.75$; to $C$, $7 - 3.25 = 3.75$; ' +
      'to $B$, $\\sqrt{9 + 5.0625} = 3.75$. ✓ All three distances are $3.75$, the radius of the ' +
      'circle through $A$, $B$ and $C$.',
    misconceptionCodes: [THROUGH_ENDPOINT, KEEPS_GRADIENT, DOUBLE_NEG],
    figure: {
      kind: 'coordinate_plane',
      xMin: -1,
      xMax: 9,
      yMin: -1,
      yMax: 9,
      gridStep: 1,
      curves: [],
      points: [
        { x: 1, y: 1, label: 'A', highlight: true },
        { x: 7, y: 1, label: 'B', highlight: true },
        { x: 4, y: 7, label: 'C', highlight: true },
      ],
    },
  },

  // --- Skill 4, diagnostic ---
  {
    id: 'coordinate-geometry.dx-bisector-through-endpoint',
    skillIds: [BISECTOR],
    tier: 'diagnostic',
    statement: 'Find the equation of the perpendicular bisector of the segment joining $A(2, -1)$ and $B(6, 7)$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$y = -\\frac{1}{2}x$', misconceptionCode: THROUGH_ENDPOINT },
        { label: 'B', value: '$y = -\\frac{1}{2}x + 5$' },
        { label: 'C', value: '$y = 2x - 5$', misconceptionCode: KEEPS_GRADIENT },
      ],
    },
    cpaPrompts: {
      concrete:
        'Fold $A$ onto $B$. Does the crease pass through $A$? Through $B$? Or through the point ' +
        'halfway between them?',
      pictorial:
        'Plot $A$, $B$ and the midpoint $(4, 3)$. The bisector goes through the midpoint with the ' +
        'quarter-turned slope triangle of $AB$.',
      abstract: 'Point: the midpoint $(4, 3)$. Gradient: $-\\frac{1}{m_{AB}} = -\\frac{1}{2}$.',
    },
    hints: [
      'Two facts: which point does the bisector pass through, and what is its gradient?',
      'Midpoint $(4, 3)$; $m_{AB} = 2$ so the bisector has gradient $-\\frac{1}{2}$. Use point–slope form with the midpoint.',
    ],
    solution:
      'Midpoint $(4, 3)$, gradient $-\\tfrac{1}{2}$: $y - 3 = -\\tfrac{1}{2}(x - 4)$, so ' +
      '$y = -\\tfrac{1}{2}x + 5$.\n\nUsing $A(2, -1)$ instead of the midpoint gives $y = ' +
      '-\\tfrac{1}{2}x$, a perpendicular that does not bisect. Keeping the gradient $2$ through the ' +
      'midpoint gives $y = 2x - 5$, a bisector that is not perpendicular.',
    misconceptionCodes: [THROUGH_ENDPOINT, KEEPS_GRADIENT],
  },
];
