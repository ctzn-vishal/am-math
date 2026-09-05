import type { Problem, SkillNode } from '@/lib/content/schema';

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
 */

export const coordinateGeometrySkills: SkillNode[] = [
  {
    id: 'coordinate-geometry.calculate-length-midpoint',
    title: 'Calculate the length and midpoint of a line segment using coordinates',
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
    title: 'Find the gradient of a line segment and derive straight line equations',
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
    title: 'Apply the parallel and perpendicular line conditions',
    summary:
      'Recognise parallel lines by equal gradients and perpendicular lines by gradients that ' +
      'multiply to $-1$, and see the second fact as a quarter-turn of the slope triangle.',
    prerequisites: ['coordinate-geometry.find-gradient-line'],
    cpa: {
      concrete:
        'Cut the slope triangle out of card — 4 along, 3 up. Slide it along the line: parallel ' +
        'lines are the ones it fits without turning. Now rotate the card a quarter turn: the 4 is ' +
        'vertical and the 3 is horizontal, and the line it lies along is perpendicular to the ' +
        'first. Its slope is $\\frac{4}{3}$, the original was $-\\frac{3}{4}$.',
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
    title: 'Find equations of perpendicular bisectors',
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

export const coordinateGeometryProblems: Problem[] = [
  {
    id: 'coordinate-geometry.midpoint-pq',
    skillIds: ['coordinate-geometry.calculate-length-midpoint'],
    tier: 1,
    statement: 'Find the midpoint of the segment joining $P(-2, 5)$ and $Q(4, -3)$.',
    answer: { type: 'coordinates', x: 1, y: 1, tolerance: 0 },
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
      '\\frac{2}{2}\\right) = (1, 1).$$',
    misconceptionCodes: ['coordinate-geometry.double-negative-dropped'],
  },
  {
    id: 'coordinate-geometry.length-pq',
    skillIds: ['coordinate-geometry.calculate-length-midpoint'],
    tier: 1,
    statement: 'Find the exact length of the segment joining $P(-2, 5)$ and $Q(4, -3)$.',
    answer: { type: 'number', value: 10, tolerance: 0 },
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
      '(-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10.$$',
    misconceptionCodes: ['coordinate-geometry.double-negative-dropped'],
  },
  {
    id: 'coordinate-geometry.perpendicular-bisector-gradient',
    skillIds: ['coordinate-geometry.parallel-perpendicular-line', 'coordinate-geometry.find-gradient-line'],
    tier: 2,
    statement:
      'Find the gradient of the perpendicular bisector of the segment joining $A(2, -1)$ and ' +
      '$B(6, 7)$.',
    answer: { type: 'number', value: -0.5, tolerance: 0 },
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
    misconceptionCodes: ['coordinate-geometry.perpendicular-keeps-gradient', 'coordinate-geometry.mixed-subtraction-order'],
  },
  {
    id: 'coordinate-geometry.perpendicular-bisector-intercept',
    skillIds: ['coordinate-geometry.find-equations-perpendicular'],
    tier: 2,
    statement:
      'Find the equation of the perpendicular bisector of the segment joining $A(2, -1)$ and ' +
      '$B(6, 7)$, in the form $y = mx + c$. State the value of $c$, the $y$-intercept.',
    answer: { type: 'number', value: 5, tolerance: 0 },
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
    misconceptionCodes: ['coordinate-geometry.bisector-through-endpoint', 'coordinate-geometry.perpendicular-keeps-gradient'],
  },
];
