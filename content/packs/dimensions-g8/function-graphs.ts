import type { Problem, SkillNode } from '@/lib/content/schema';

/**
 * Unit 8 — Graphs of Linear and Quadratic Functions. Hand-authored.
 *
 * Source: docs/Implementation Manual (pegboards, rubber-band slope triangles, step ladders)
 * and the Chapter 8 worked examples in the content spec.
 *
 * The through-line: a graph is a table of values drawn, and everything read off it —
 * gradient, intercept, turning point — is a statement about how the $y$ values change as
 * $x$ steps along. Gradient is a step you can walk; the vertex is where the steps stop
 * going one way and start going the other.
 */

export const functionGraphsSkills: SkillNode[] = [
  {
    id: 'function-graphs.graph-linear-functions',
    title: 'Graph linear functions from gradient and intercept',
    summary:
      'Rearrange any linear equation to $y = mx + c$, read the gradient and intercept from it, ' +
      'and test whether a point lies on the line by substituting.',
    prerequisites: ['linear-systems.model-real-world-relationships'],
    cpa: {
      concrete:
        'A pegboard with a rubber band stretched between two pegs. Starting at the peg where the ' +
        'band crosses the vertical axis, step one hole to the right and count how many holes up ' +
        'or down the band has moved. Do it again; the count is the same every time. That count ' +
        'is $m$, and the starting peg is $c$.',
      pictorial:
        'A right-angled slope triangle drawn on the line: one unit across, $m$ units up. A ' +
        'table of values beside the graph with the constant difference in $y$ marked between rows.',
      abstract:
        '$y = mx + c$. Rearranging to this form means isolating $y$ with coefficient 1 — dividing ' +
        '*every* term by whatever multiplies $y$. A point is on the line exactly when its ' +
        'coordinates make the equation true.',
    },
    formulas: ['y = mx + c', 'm = \\frac{\\text{rise}}{\\text{run}}'],
    misconceptions: [
      {
        code: 'function-graphs.gradient-before-isolating-y',
        description:
          'Reads the gradient of $3x + 2y = 8$ as $-3$ (or $3$) straight from the coefficient of ' +
          '$x$, without first dividing through by the 2 in front of $y$.',
        probe:
          'Cover everything except the $2y$. Is $y$ on its own yet? What does every term need to ' +
          'be divided by before the number in front of $x$ is the gradient?',
        correction:
          'The coefficient of $x$ is only the gradient when $y$ has coefficient 1. Dividing ' +
          'through by 2 gives $y = -\\frac{3}{2}x + 4$: the gradient is $-\\frac{3}{2}$ and the ' +
          'intercept is 4.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
  {
    id: 'function-graphs.interpret-rate-change',
    title: 'Interpret rate of change',
    summary:
      'Read a gradient as "this much $y$ for every one of $x$", with units, and connect steeper ' +
      'lines to faster change and negative gradients to decrease.',
    prerequisites: ['function-graphs.graph-linear-functions'],
    cpa: {
      concrete:
        'Filling a jug from a tap at a steady rate, reading the level every ten seconds. The ' +
        'level rises the same amount each time — that constant amount per interval is the rate, ' +
        'and it is what a straight-line graph means.',
      pictorial:
        'A step ladder drawn along the line: equal horizontal steps, and the vertical rise of ' +
        'each step labelled. Every step is the same height; that is the picture of "constant rate".',
      abstract:
        'Rate of change $= \\frac{\\Delta y}{\\Delta x}$ with units of $y$ per unit of $x$. ' +
        'Positive means increasing, negative decreasing, zero means flat. For a line it is the ' +
        'same between any two points.',
    },
    formulas: ['m = \\frac{y_2 - y_1}{x_2 - x_1}'],
    misconceptions: [
      {
        code: 'function-graphs.rise-run-inverted',
        description:
          'Computes gradient as run over rise — horizontal change divided by vertical — and so ' +
          'reports a shallow line as steep.',
        probe:
          'Take one step to the right along the line. How far up did you go? Which of those two ' +
          'numbers is the change in $y$, and which is on top of the fraction?',
        correction:
          'Gradient answers "how much does $y$ change for each one unit of $x$?", so the change ' +
          'in $y$ goes on top: $\\frac{\\Delta y}{\\Delta x}$. A line that rises 3 for every 1 ' +
          'across has gradient 3, not $\\frac{1}{3}$.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
  {
    id: 'function-graphs.graph-quadratic-functions',
    title: 'Graph quadratic functions',
    summary:
      'Plot a parabola from a table of values, and predict from the sign of $a$ which way it ' +
      'opens before plotting a single point.',
    prerequisites: ['quadratic-factorisation.solve-quadratic-equations', 'function-graphs.interpret-rate-change'],
    cpa: {
      concrete:
        'A ball thrown gently upward and caught: it rises, slows, hangs, falls. Its height ' +
        'against time is the shape being drawn. Turn the picture over — a bowl — and the ' +
        'sign of $a$ has flipped.',
      pictorial:
        'A table of values for $x = -2$ to $6$ with the differences between successive $y$ ' +
        'values written beside it. The differences are not constant — they change by the same ' +
        'amount each time — and that is why the graph curves rather than going straight.',
      abstract:
        '$y = ax^2 + bx + c$ with $a \\ne 0$. $a > 0$ opens upward (a minimum); $a < 0$ opens ' +
        'downward (a maximum). The $y$-intercept is $c$. Evaluate carefully: $-x^2$ means ' +
        'square first, then negate.',
    },
    formulas: ['y = ax^2 + bx + c \\quad (a \\ne 0)'],
    misconceptions: [
      {
        code: 'function-graphs.negate-then-square',
        description:
          'Evaluates $-x^2$ at $x = 2$ as $(-2)^2 = 4$ rather than $-(2^2) = -4$, and so gets the ' +
          'wrong $y$ value and often the wrong orientation.',
        probe:
          'In $-x^2$, which happens first — the squaring or the minus sign? Write $-(2)^2$ with ' +
          'the bracket in and work it out one step at a time.',
        correction:
          'Powers are applied before the sign in front: $-x^2$ means $-(x^2)$. At $x = 2$ that is ' +
          '$-4$, so $y = -4 + 8 + 5 = 9$. Only $(-x)^2$, with the bracket, squares the sign away.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
  {
    id: 'function-graphs.identify-vertices-axes',
    title: 'Identify vertices, axes of symmetry, and intercepts of parabolas',
    summary:
      'Find the turning point from the axis of symmetry $x = -\\frac{b}{2a}$, and the ' +
      'intercepts by setting $x = 0$ and $y = 0$ in turn.',
    prerequisites: ['function-graphs.graph-quadratic-functions'],
    cpa: {
      concrete:
        'Fold the plotted parabola down the middle: the two halves match exactly. The fold line ' +
        'is the axis of symmetry and it passes through the highest (or lowest) point, halfway ' +
        'between any two points at the same height — including the two $x$-intercepts.',
      pictorial:
        'The parabola with its axis drawn as a dashed vertical line, the vertex marked on it, and ' +
        'the two $x$-intercepts marked as mirror images across it.',
      abstract:
        'Axis: $x = -\\frac{b}{2a}$. Vertex: substitute that $x$ back in for $y$. $y$-intercept: ' +
        '$(0, c)$. $x$-intercepts: solve $ax^2 + bx + c = 0$, usually by factorising.',
    },
    formulas: ['x = -\\frac{b}{2a}', 'y\\text{-intercept } (0, c)'],
    misconceptions: [
      {
        code: 'function-graphs.vertex-x-only',
        description:
          'Finds $x = -\\frac{b}{2a}$ and reports the vertex as that number alone, or as ' +
          '$(x, 0)$, without substituting back to find its $y$ coordinate.',
        probe:
          'You have found the fold line, $x = 2$. Is the vertex a line or a point? What is the ' +
          'height of the curve *at* $x = 2$?',
        correction:
          'The axis of symmetry only says where the vertex sits left to right. Its height is ' +
          '$y$ at that $x$: substituting gives $y = -4 + 8 + 5 = 9$, so the vertex is $(2, 9)$.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
];

export const functionGraphsProblems: Problem[] = [
  {
    id: 'function-graphs.gradient-from-standard-form',
    skillIds: ['function-graphs.graph-linear-functions', 'function-graphs.interpret-rate-change'],
    tier: 1,
    statement:
      'Find the gradient of the straight line $3x + 2y = 8$. Then decide whether the point ' +
      '$(4, -2)$ lies on the line.',
    answer: { type: 'number', value: -1.5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Imagine the line on a pegboard. Which peg does it cross the vertical axis at? From that ' +
        'peg, one hole to the right — how many holes down does the band go?',
      pictorial:
        'Sketch the line by finding where it crosses each axis. Draw a slope triangle one unit ' +
        'wide on it. How tall is the triangle, and is it going down or up?',
      abstract:
        'Rearrange to $y = mx + c$ by isolating $y$; the coefficient of $x$ is then the gradient. ' +
        'Substitute $(4, -2)$ to test the point.',
    },
    hints: [
      'Isolate $y$ on one side of the equation to put it into the form $y = mx + c$.',
      'After subtracting $3x$, you still have $2y$. Divide every term by 2 — the coefficient in ' +
        'front of $x$ is then the gradient.',
      'To test the point, substitute $x = 4$ and $y = -2$ into $3x + 2y = 8$ and see whether it ' +
        'holds.',
    ],
    solution:
      '$2y = -3x + 8 \\implies y = -\\frac{3}{2}x + 4$, so the gradient is $-\\frac{3}{2}$ and ' +
      'the $y$-intercept is 4.\n\nTesting $(4, -2)$: $3(4) + 2(-2) = 12 - 4 = 8$, which equals the ' +
      'right-hand side, so the point lies on the line.\n\n$$m = -\\tfrac{3}{2}$$',
    misconceptionCodes: ['function-graphs.gradient-before-isolating-y', 'function-graphs.rise-run-inverted'],
  },
  {
    id: 'function-graphs.parabola-vertex',
    skillIds: ['function-graphs.identify-vertices-axes', 'function-graphs.graph-quadratic-functions'],
    tier: 2,
    statement:
      'For the quadratic function $y = -x^2 + 4x + 5$, decide whether the graph has a maximum ' +
      'or minimum turning point, and find the coordinates of that turning point.',
    answer: { type: 'coordinates', x: 2, y: 9, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'A ball is thrown and this is its height over time. Does it go up and come down, or dip ' +
        'and rise? Which sign in the equation tells you that before you plot anything?',
      pictorial:
        'Make a table for $x = 0$ to $4$ and plot the points. Fold the sketch down its line of ' +
        'symmetry — where is the fold, and how high is the curve there?',
      abstract:
        'Use the sign of $a$ for the orientation, $x = -\\frac{b}{2a}$ for the axis, and ' +
        'substitute back for the $y$-coordinate.',
    },
    hints: [
      'Look at the sign of the $x^2$ term. Is it positive or negative, and which way does that ' +
        'make the parabola open?',
      'Use $x = -\\frac{b}{2a}$ with $a = -1$ and $b = 4$ to find the $x$-coordinate of the ' +
        'vertex.',
      'Substitute that $x$ back into the equation to get $y$. Careful: $-x^2$ means square first, ' +
        'then take the negative.',
    ],
    solution:
      '$a = -1 < 0$, so the parabola opens downward and the turning point is a maximum.\n\n' +
      'Axis of symmetry: $x = -\\frac{4}{2(-1)} = 2$. Then $y = -(2)^2 + 4(2) + 5 = -4 + 8 + 5 ' +
      '= 9$.\n\n$$\\text{Vertex } (2, 9), \\text{ a maximum.}$$',
    misconceptionCodes: ['function-graphs.negate-then-square', 'function-graphs.vertex-x-only'],
  },
  {
    id: 'function-graphs.parabola-x-intercepts',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 2,
    statement: 'Find the $x$-intercepts of the graph of $y = -x^2 + 4x + 5$.',
    answer: { type: 'set', values: [5, -1], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The ball is on the ground when its height is zero. What value does $y$ take at those ' +
        'moments — and how many such moments are there for a thrown ball?',
      pictorial:
        'On your sketch, the curve crosses the $x$-axis twice, mirror images either side of the ' +
        'fold at $x = 2$. If one crossing is 3 to the right of the fold, where is the other?',
      abstract:
        'Set $y = 0$, multiply through by $-1$ to get a monic quadratic, factorise, and solve.',
    },
    hints: [
      'A graph crosses the $x$-axis where $y = 0$. Set the expression equal to zero.',
      'Multiply both sides by $-1$ to make the $x^2$ coefficient positive: $x^2 - 4x - 5 = 0$. ' +
        'Which two numbers multiply to $-5$ and add to $-4$?',
      'Factorise as $(x - 5)(x + 1) = 0$ and solve each bracket.',
    ],
    solution:
      '$-x^2 + 4x + 5 = 0 \\implies x^2 - 4x - 5 = 0 \\implies (x - 5)(x + 1) = 0$, so $x = 5$ ' +
      'or $x = -1$.\n\n$$\\text{Intercepts } (5, 0) \\text{ and } (-1, 0).$$\n\nThey sit ' +
      'symmetrically either side of the axis $x = 2$, as they must.',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },
];
