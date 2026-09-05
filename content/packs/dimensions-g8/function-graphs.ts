import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';

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
    title: 'Plot straight lines from their gradient and intercept',
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
    title: 'Read and compare rates of change',
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
    title: 'Plot quadratic graphs',
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
    title: 'Find vertices, axes of symmetry and intercepts',
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
      {
        code: 'function-graphs.intercept-sign-flipped',
        description:
          'Factorises correctly to $(x - 5)(x + 1)$ but reads the $x$-intercepts straight off ' +
          'the brackets as $x = -5$ and $x = 1$, flipping the sign of each.',
        probe:
          'Put $x = -5$ into the bracket $(x - 5)$. Does it come out as zero? Which value of $x$ ' +
          'actually makes that bracket zero?',
        correction:
          'A bracket $(x - 5)$ is zero when $x = 5$, not $-5$: the intercept is the value that ' +
          'kills the bracket, which has the opposite sign to the number written inside it. So ' +
          '$(x - 5)(x + 1) = 0$ gives $x = 5$ or $x = -1$, and the intercepts are $(5, 0)$ and $(-1, 0)$.',
      },
      {
        code: 'function-graphs.intercepts-confused',
        description:
          'Answers an $x$-intercept question with the $y$-intercept $(0, c)$, or reads the ' +
          'constant $c$ as the place where the curve crosses the $x$-axis.',
        probe:
          'Every point on the $x$-axis has the same $y$ value. What is it? So which letter do you ' +
          'set to zero to find where the curve crosses the $x$-axis?',
        correction:
          'The curve crosses the $x$-axis where $y = 0$, so the $x$-intercepts come from solving ' +
          '$ax^2 + bx + c = 0$. The constant $c$ is the height at which the curve crosses the ' +
          '$y$-axis, at $(0, c)$ — a different crossing on a different axis.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
];

export const functionGraphsProblems: Problem[] = [
  // -------------------------------------------------------------------------
  // graph-linear-functions — tier 1: read m and c (family function-graphs.read-m-c)
  // -------------------------------------------------------------------------
  {
    id: 'function-graphs.read-m-c-1',
    skillIds: ['function-graphs.graph-linear-functions'],
    tier: 1,
    sequence: { family: 'function-graphs.read-m-c', position: 1 },
    statement:
      'The line $y = 2x + 1$ is drawn on a grid. State its gradient $m$ and its $y$-intercept $c$, ' +
      'as the pair $(m, c)$.',
    answer: { type: 'coordinates', x: 2, y: 1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Stretch a rubber band along $y = 2x + 1$ on the pegboard. Which peg does it cross the ' +
        'vertical axis at? From that peg, one hole to the right — how many holes up is the band?',
      pictorial:
        'Draw a slope triangle on the line, one unit across. How tall is it? Where does the line ' +
        'cut the $y$-axis? Label both numbers on your sketch.',
      abstract:
        'The equation is already in the form $y = mx + c$. Which number is multiplying $x$, and ' +
        'which number is on its own?',
    },
    hints: [
      'Compare $y = 2x + 1$ with $y = mx + c$ letter by letter.',
      'The number multiplying $x$ is the gradient. The number added on the end is where the line ' +
        'crosses the $y$-axis.',
    ],
    solution:
      'Matching $y = 2x + 1$ against $y = mx + c$: the coefficient of $x$ is $2$, so $m = 2$, ' +
      'and the constant is $1$, so $c = 1$. Check: at $x = 0$, $y = 1$, so $(0, 1)$ is on the line ' +
      'and the line rises 2 for each step right.\n\n$$(m, c) = (2, 1)$$',
    misconceptionCodes: ['function-graphs.gradient-before-isolating-y'],
  },
  {
    id: 'function-graphs.read-m-c-2',
    skillIds: ['function-graphs.graph-linear-functions'],
    tier: 1,
    sequence: { family: 'function-graphs.read-m-c', position: 2 },
    expect:
      'The $+1$ became $-1$. Which of $m$ and $c$ changes, and does the line get steeper, or ' +
      'just slide up or down?',
    statement: 'State the gradient $m$ and the $y$-intercept $c$ of the line $y = 2x - 1$, as the pair $(m, c)$.',
    answer: { type: 'coordinates', x: 2, y: -1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Move the rubber band so it now crosses the vertical axis one hole *below* the middle. ' +
        'Does the one-across, two-up step change?',
      pictorial:
        'Sketch $y = 2x + 1$ and $y = 2x - 1$ on the same axes. Are they parallel? What is the ' +
        'only difference between the two drawings?',
      abstract:
        '$y = 2x - 1$ is $y = 2x + (-1)$. Read $m$ and $c$ with their signs.',
    },
    hints: [
      'Write the equation as $y = 2x + (-1)$ so the sign belongs to the constant.',
      'The gradient is still the number in front of $x$. The intercept is the constant, sign included.',
    ],
    solution:
      '$y = 2x - 1 = 2x + (-1)$, so $m = 2$ and $c = -1$. The line is parallel to $y = 2x + 1$ ' +
      'but crosses the $y$-axis at $(0, -1)$ instead of $(0, 1)$.\n\n$$(m, c) = (2, -1)$$',
    misconceptionCodes: ['function-graphs.gradient-before-isolating-y'],
  },
  {
    id: 'function-graphs.read-m-c-3',
    skillIds: ['function-graphs.graph-linear-functions'],
    tier: 1,
    sequence: { family: 'function-graphs.read-m-c', position: 3 },
    expect:
      'Now the $2$ has become $-2$ and the $+1$ is back. Which way does the line tilt now — and ' +
      'does the crossing point on the $y$-axis move?',
    statement: 'State the gradient $m$ and the $y$-intercept $c$ of the line $y = -2x + 1$, as the pair $(m, c)$.',
    answer: { type: 'coordinates', x: -2, y: 1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Keep the band on the peg one above the middle, but now, one hole to the right, the band ' +
        'must be two holes *down*. Which way does it slope?',
      pictorial:
        'Draw a slope triangle one unit across on $y = -2x + 1$. Is the vertical side going up or ' +
        'down from left to right? What sign does that give the gradient?',
      abstract:
        'The coefficient of $x$ is $-2$, sign included. The constant is $+1$.',
    },
    hints: [
      'The gradient is the whole coefficient of $x$, including its sign.',
      'A negative gradient means the line falls as you move right; $c$ is still where it cuts the $y$-axis.',
    ],
    solution:
      'Comparing with $y = mx + c$: $m = -2$ and $c = 1$. Check: $(0, 1)$ is on the line, and ' +
      'stepping right by 1 takes $y$ from $1$ to $-1$, a fall of 2.\n\n$$(m, c) = (-2, 1)$$',
    misconceptionCodes: ['function-graphs.gradient-before-isolating-y'],
  },
  {
    id: 'function-graphs.read-m-c-4',
    skillIds: ['function-graphs.graph-linear-functions'],
    tier: 1,
    sequence: { family: 'function-graphs.read-m-c', position: 4 },
    expect:
      'The gradient is now $\\frac{1}{2}$ instead of $-2$. Will the line be steeper or shallower ' +
      'than the last one, and what is $c$?',
    statement:
      'State the gradient $m$ and the $y$-intercept $c$ of the line $y = \\frac{1}{2}x + 1$, as the pair $(m, c)$.',
    answer: { type: 'coordinates', x: 0.5, y: 1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'On the pegboard, one hole to the right only gets you half a hole up. Go two holes right ' +
        'instead: how many up now? What is "up per one across"?',
      pictorial:
        'Draw a slope triangle two units across on $y = \\frac{1}{2}x + 1$. It rises 1. Divide ' +
        'rise by run: what is the gradient?',
      abstract: 'The coefficient of $x$ is the fraction $\\frac{1}{2}$; the constant is $1$.',
    },
    hints: [
      'A fraction can be a gradient. What is multiplying $x$?',
      '$m = \\frac{1}{2}$ means "up $\\frac{1}{2}$ for every 1 across", or equivalently up 1 for every 2 across.',
    ],
    solution:
      '$m = \\frac{1}{2}$ and $c = 1$. Check: $(0, 1)$ and $(2, 2)$ both satisfy the equation, and ' +
      'the rise between them is 1 over a run of 2, giving $\\frac{1}{2}$.\n\n$$(m, c) = \\left(\\tfrac{1}{2}, 1\\right)$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },
  {
    id: 'function-graphs.read-m-c-5',
    skillIds: ['function-graphs.graph-linear-functions'],
    tier: 1,
    sequence: { family: 'function-graphs.read-m-c', position: 5 },
    expect:
      'The equation is now $2y = x + 2$ — there is a 2 in front of $y$. Before rearranging, ' +
      'predict: is this the same line as the last one, or a different one?',
    statement: 'State the gradient $m$ and the $y$-intercept $c$ of the line $2y = x + 2$, as the pair $(m, c)$.',
    answer: { type: 'coordinates', x: 0.5, y: 1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Find two pegs on this line by picking $x = 0$ and $x = 2$ and working out $y$. Stretch ' +
        'the band between them. Is it the same band as for $y = \\frac{1}{2}x + 1$?',
      pictorial:
        'Make a table for $x = 0, 2, 4$ using $2y = x + 2$. Plot the points. Draw a slope ' +
        'triangle: rise over run?',
      abstract:
        '$y$ must have coefficient 1 before you can read $m$ and $c$. Divide *every* term by 2.',
    },
    hints: [
      'The equation is not yet in the form $y = mx + c$. What is in the way?',
      'Divide both sides by 2 — that means every term on the right too: $y = \\frac{x}{2} + \\frac{2}{2}$.',
    ],
    solution:
      'Dividing every term by 2: $y = \\frac{1}{2}x + 1$. So $m = \\frac{1}{2}$ and $c = 1$: the ' +
      'very same line as the previous item, written differently. Reading $m = 1$ from the $x$ ' +
      'would be wrong because $y$ had a 2 in front of it.\n\n$$(m, c) = \\left(\\tfrac{1}{2}, 1\\right)$$',
    misconceptionCodes: ['function-graphs.gradient-before-isolating-y'],
  },
  {
    id: 'function-graphs.gradient-from-standard-form',
    skillIds: ['function-graphs.graph-linear-functions', 'function-graphs.interpret-rate-change'],
    tier: 1,
    sequence: { family: 'function-graphs.read-m-c', position: 6 },
    expect:
      'Now there is an $x$ term on the same side as the $2y$. Two things must happen to isolate ' +
      '$y$ — which comes first, and will the gradient come out positive or negative?',
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
    id: 'function-graphs.read-m-c-7',
    skillIds: ['function-graphs.graph-linear-functions'],
    tier: 1,
    sequence: { family: 'function-graphs.read-m-c', position: 7 },
    expect:
      'This equation has no $y$ in it at all: $x = 3$. Can it be written as $y = mx + c$? ' +
      'Predict what happens when you try to find the gradient.',
    statement:
      'What is the gradient of the line $x = 3$? Give a number, or say "undefined" if there is ' +
      'no gradient.',
    answer: {
      type: 'exact',
      value: 'undefined',
      accepts: [
        'no gradient',
        'undefined gradient',
        'the gradient is undefined',
        'not defined',
        'does not exist',
        'infinite',
        'infinity',
        'vertical',
      ],
    },
    cpaPrompts: {
      concrete:
        'Every peg on this line has $x = 3$: $(3, 0)$, $(3, 1)$, $(3, 2)$. Stretch the band ' +
        'through them. Try stepping one hole to the right along the band — can you?',
      pictorial:
        'Draw the points $(3, -2)$, $(3, 0)$, $(3, 4)$ and join them. Try to draw a slope ' +
        'triangle with run 1. What is its run, and what happens when you divide by it?',
      abstract:
        'Gradient is $\\frac{\\Delta y}{\\Delta x}$. Between any two points on $x = 3$, ' +
        '$\\Delta x = 0$. What is a number divided by zero?',
    },
    hints: [
      'Pick two points on the line, say $(3, 1)$ and $(3, 5)$. What is the change in $x$ between them?',
      'The gradient formula divides by the change in $x$. Dividing by zero has no value.',
      'A vertical line cannot be written as $y = mx + c$ — no value of $m$ works — so its gradient is undefined.',
    ],
    solution:
      'Two points on the line are $(3, 1)$ and $(3, 5)$. The gradient would be ' +
      '$\\frac{5 - 1}{3 - 3} = \\frac{4}{0}$, which is not a number. The line is vertical, ' +
      'cannot be written as $y = mx + c$, and its gradient is **undefined**. (Contrast $y = 3$, a ' +
      'horizontal line with gradient $0$.)',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },

  // graph-linear-functions — tier 2
  {
    id: 'function-graphs.equation-from-graph',
    skillIds: ['function-graphs.graph-linear-functions'],
    tier: 2,
    statement:
      'The figure shows a straight line with a slope triangle drawn on it. Write the equation of ' +
      'the line in the form $y = mx + c$.',
    answer: { type: 'equation', lhs: 'y', rhs: '2x-3', variables: ['x', 'y'] },
    figure: {
      kind: 'coordinate_plane',
      title: 'Read the line',
      xMin: -4,
      xMax: 4,
      yMin: -6,
      yMax: 6,
      gridStep: 1,
      curves: [{ type: 'linear', m: 2, c: -3 }],
      points: [
        { x: 0, y: -3, label: '(0, -3)', highlight: true },
        { x: 2, y: 1, label: '(2, 1)', highlight: true },
      ],
      slopeTriangle: { fromX: 1, toX: 2, curveIndex: 0 },
    },
    cpaPrompts: {
      concrete:
        'Put your finger where the line crosses the vertical axis. Now walk one square to the ' +
        'right along the line: how many squares up did you climb? Do it again to check.',
      pictorial:
        'The slope triangle is one unit across. How tall is its vertical side? Where is the line ' +
        'when $x = 0$? Those two numbers are $m$ and $c$.',
      abstract:
        'Read $c$ from the $y$-axis crossing and $m$ from the triangle, then write $y = mx + c$. ' +
        'Check with the second marked point.',
    },
    hints: [
      'The $y$-intercept is where the line crosses the vertical axis. Read it from the figure.',
      'The slope triangle runs 1 across. Count how far up it rises — that is $m$.',
      'Check your equation with $(2, 1)$: does $2 \\times 2 - 3$ give $1$?',
    ],
    solution:
      'The line crosses the $y$-axis at $(0, -3)$, so $c = -3$. The slope triangle rises 2 for a ' +
      'run of 1, so $m = 2$. The equation is $y = 2x - 3$. Check with $(2, 1)$: $2(2) - 3 = 1$. ✓\n\n$$y = 2x - 3$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },
  {
    id: 'function-graphs.equation-from-two-points',
    skillIds: ['function-graphs.graph-linear-functions', 'function-graphs.interpret-rate-change'],
    tier: 2,
    statement:
      'A straight line passes through $(1, 5)$ and $(3, 11)$. Find the equation of the line in ' +
      'the form $y = mx + c$.',
    answer: { type: 'equation', lhs: 'y', rhs: '3x+2', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Put pegs at $(1, 5)$ and $(3, 11)$ and stretch a band between them. Going from the first ' +
        'peg to the second you move 2 across; how many up? So how many up per 1 across?',
      pictorial:
        'Draw the two points and the slope triangle between them: run 2, rise 6. Then slide back ' +
        'one step left from $(1, 5)$ along the line — where does it cross the $y$-axis?',
      abstract:
        'Gradient first: $m = \\frac{11 - 5}{3 - 1}$. Then substitute one point into $y = mx + c$ ' +
        'to find $c$.',
    },
    hints: [
      'You need $m$ and $c$. Which one can you get straight from the two points?',
      '$m = \\frac{\\text{change in } y}{\\text{change in } x} = \\frac{11 - 5}{3 - 1}$.',
      'With $m = 3$, put $(1, 5)$ into $y = 3x + c$: $5 = 3 + c$. Solve for $c$.',
    ],
    solution:
      '$m = \\frac{11 - 5}{3 - 1} = \\frac{6}{2} = 3$. Substituting $(1, 5)$ into $y = 3x + c$: ' +
      '$5 = 3 + c$, so $c = 2$. Check with $(3, 11)$: $3(3) + 2 = 11$. ✓\n\n$$y = 3x + 2$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },
  {
    id: 'function-graphs.missing-intercept',
    skillIds: ['function-graphs.graph-linear-functions'],
    tier: 2,
    statement:
      'A line has gradient $-2$ and passes through the point $(3, 1)$. Its equation is ' +
      '$y = -2x + c$. Find $c$.',
    answer: { type: 'number', value: 7, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Start at the peg $(3, 1)$. Walking one hole *left* along a line of gradient $-2$ takes ' +
        'you 2 holes *up*. Do that three times — where are you on the vertical axis?',
      pictorial:
        'Plot $(3, 1)$, then draw the line through it falling 2 for every 1 across. Extend it ' +
        'left until it meets the $y$-axis and read the crossing.',
      abstract:
        'The point is on the line, so its coordinates satisfy the equation: $1 = -2(3) + c$.',
    },
    hints: [
      'If $(3, 1)$ is on the line, then putting $x = 3$ into the equation must give $y = 1$.',
      'Substitute: $1 = -2 \\times 3 + c$. Now solve for $c$.',
    ],
    solution:
      'Substituting $(3, 1)$ into $y = -2x + c$: $1 = -6 + c$, so $c = 7$. The line is ' +
      '$y = -2x + 7$. Check: at $x = 3$, $y = -6 + 7 = 1$. ✓\n\n$$c = 7$$',
    misconceptionCodes: ['function-graphs.gradient-before-isolating-y'],
  },

  // graph-linear-functions — tier 3
  {
    id: 'function-graphs.taxi-fare',
    skillIds: ['function-graphs.graph-linear-functions', 'function-graphs.interpret-rate-change'],
    tier: 3,
    statement:
      'A taxi charges $\\$3.20$ as soon as you get in, and then $\\$0.55$ for every kilometre ' +
      'travelled. Write an equation for the fare $F$ dollars for a journey of $d$ kilometres.',
    answer: { type: 'equation', lhs: 'F', rhs: '0.55d+3.2', variables: ['d', 'F'] },
    cpaPrompts: {
      concrete:
        'Watch the meter. What does it read before the taxi moves? What does it add each time ' +
        'another kilometre ticks over? After 2 km? After 10 km?',
      pictorial:
        'Make a table: $d = 0, 1, 2, 3$ and the fare for each. Plot the points. The starting fare ' +
        'is where the line meets the vertical axis; the amount added per km is the step up.',
      abstract:
        'Fare = (cost per km) $\\times$ (km) + (fixed charge). Which of those is $m$ and which is $c$ in $F = md + c$?',
    },
    hints: [
      'What is the fare for 0 km? For 1 km? For 2 km? What is being added each time?',
      'The fixed $\\$3.20$ is paid once; the $\\$0.55$ is paid $d$ times. Add them.',
      'So $F = 0.55d + 3.20$. Check: 10 km should cost $\\$8.70$.',
    ],
    solution:
      'The fixed charge is paid once and the per-kilometre charge $d$ times, so\n\n' +
      '$$F = 0.55d + 3.20.$$\n\nThis is a straight line with gradient $0.55$ (dollars per km) and ' +
      'intercept $3.20$ (the flag-down fare). Check: $d = 10$ gives $F = 5.50 + 3.20 = 8.70$.',
    misconceptionCodes: ['function-graphs.gradient-before-isolating-y'],
  },
  {
    id: 'function-graphs.temperature-conversion',
    skillIds: ['function-graphs.graph-linear-functions', 'function-graphs.interpret-rate-change'],
    tier: 3,
    statement:
      'Water freezes at $0^\\circ$C, which is $32^\\circ$F, and boils at $100^\\circ$C, which is ' +
      '$212^\\circ$F. The two temperature scales are related by a straight line. Write an ' +
      'equation giving $F$ in terms of $C$.',
    answer: { type: 'equation', lhs: 'F', rhs: '1.8C+32', variables: ['C', 'F'] },
    cpaPrompts: {
      concrete:
        'Two thermometers side by side. When the Celsius one climbs from 0 to 100, the Fahrenheit ' +
        'one climbs from 32 to 212. How many Fahrenheit degrees for each Celsius degree?',
      pictorial:
        'Plot $(0, 32)$ and $(100, 212)$ with $C$ across and $F$ up, and join them. Where does the ' +
        'line cross the vertical axis? What is its rise over run?',
      abstract:
        'Two points on the line: $(0, 32)$ and $(100, 212)$. Gradient from the two points, ' +
        'intercept from the point with $C = 0$.',
    },
    hints: [
      'Treat the two facts as points $(C, F)$: $(0, 32)$ and $(100, 212)$.',
      'The point with $C = 0$ tells you the intercept straight away. For the gradient, divide the ' +
        'change in $F$ by the change in $C$.',
      '$m = \\frac{212 - 32}{100 - 0} = 1.8$, and the intercept is 32.',
    ],
    solution:
      'Gradient: $\\frac{212 - 32}{100 - 0} = \\frac{180}{100} = 1.8$. Intercept: at $C = 0$, ' +
      '$F = 32$. So\n\n$$F = 1.8C + 32.$$\n\nCheck: $C = 100$ gives $180 + 32 = 212$. ✓ (Body ' +
      'temperature, $37^\\circ$C, comes out as $98.6^\\circ$F.)',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },

  // graph-linear-functions — diagnostic
  {
    id: 'function-graphs.dx-gradient-before-isolating-y',
    skillIds: ['function-graphs.graph-linear-functions'],
    tier: 'diagnostic',
    statement: 'What is the gradient of the line $4x + 2y = 6$?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$-4$', misconceptionCode: 'function-graphs.gradient-before-isolating-y' },
        { label: 'B', value: '$-2$' },
        { label: 'C', value: '$-\\frac{1}{2}$', misconceptionCode: 'function-graphs.rise-run-inverted' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Find two pegs on the line: $x = 0$ gives $y = 3$, and $x = 1$ gives $y = 1$. From one ' +
        'peg to the next, one across — how many down?',
      pictorial:
        'Plot $(0, 3)$ and $(1, 1)$ and draw the slope triangle between them. Rise over run?',
      abstract:
        'Is $y$ on its own with coefficient 1? If not, what must every term be divided by first?',
    },
    hints: [
      'The gradient can only be read off once the equation is in the form $y = mx + c$.',
      'Subtract $4x$, then divide every term by 2: $y = -2x + 3$.',
    ],
    solution:
      '$2y = -4x + 6 \\implies y = -2x + 3$, so the gradient is $-2$. Reading $-4$ ignores the ' +
      '2 in front of $y$; $-\\frac{1}{2}$ is run over rise instead of rise over run.\n\n$$m = -2$$',
    misconceptionCodes: ['function-graphs.gradient-before-isolating-y', 'function-graphs.rise-run-inverted'],
  },

  // -------------------------------------------------------------------------
  // interpret-rate-change — tier 1: gradient from two points
  // -------------------------------------------------------------------------
  {
    id: 'function-graphs.gradient-two-points-1',
    skillIds: ['function-graphs.interpret-rate-change'],
    tier: 1,
    sequence: { family: 'function-graphs.gradient-two-points', position: 1 },
    statement: 'Find the gradient of the straight line through $(1, 2)$ and $(3, 8)$.',
    answer: { type: 'number', value: 3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Pegs at $(1, 2)$ and $(3, 8)$ with a band between them. Walk from the first to the ' +
        'second: how many holes across, how many holes up? So how many up for each one across?',
      pictorial:
        'Draw the two points and the step ladder between them: 2 across, 6 up. Split it into two ' +
        'equal steps — how tall is each?',
      abstract: 'Gradient $= \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{8 - 2}{3 - 1}$.',
    },
    hints: [
      'How much does $y$ change between the two points? How much does $x$ change?',
      'Divide the change in $y$ by the change in $x$: $\\frac{8 - 2}{3 - 1}$.',
    ],
    solution:
      '$m = \\frac{8 - 2}{3 - 1} = \\frac{6}{2} = 3$. The line rises 3 for every 1 across. ' +
      'Check: from $(1, 2)$, one step right lands on $(2, 5)$, and another on $(3, 8)$. ✓\n\n$$m = 3$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },
  {
    id: 'function-graphs.gradient-two-points-2',
    skillIds: ['function-graphs.interpret-rate-change'],
    tier: 1,
    sequence: { family: 'function-graphs.gradient-two-points', position: 2 },
    expect:
      'The two $y$-values have swapped: the line now goes from $(1, 8)$ down to $(3, 2)$. Predict ' +
      'the gradient before you calculate — same size, or different sign?',
    statement: 'Find the gradient of the straight line through $(1, 8)$ and $(3, 2)$.',
    answer: { type: 'number', value: -3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Walk from $(1, 8)$ to $(3, 2)$: 2 holes across, and 6 holes *down*. Down counts as negative.',
      pictorial:
        'Draw the step ladder from $(1, 8)$ to $(3, 2)$. The steps go downhill from left to right. ' +
        'How tall is each step, and what sign does downhill get?',
      abstract: '$m = \\frac{2 - 8}{3 - 1}$. Keep the sign of the top line.',
    },
    hints: [
      'Subtract in the same order on top and bottom: second point minus first point.',
      '$\\frac{2 - 8}{3 - 1} = \\frac{-6}{2}$.',
    ],
    solution:
      '$m = \\frac{2 - 8}{3 - 1} = \\frac{-6}{2} = -3$. Same steepness as before, but the line ' +
      'falls 3 for each step right, so the gradient is negative.\n\n$$m = -3$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },
  {
    id: 'function-graphs.gradient-two-points-3',
    skillIds: ['function-graphs.interpret-rate-change'],
    tier: 1,
    sequence: { family: 'function-graphs.gradient-two-points', position: 3 },
    expect:
      'Now both points have the same $y$-value, 5. What is the rise between them? Predict the ' +
      'gradient before working it out.',
    statement: 'Find the gradient of the straight line through $(1, 5)$ and $(3, 5)$.',
    answer: { type: 'number', value: 0, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Pegs at $(1, 5)$ and $(3, 5)$. The band between them is level — walking along it you ' +
        'never go up or down. How many holes up per hole across?',
      pictorial:
        'Draw the two points. The "step ladder" has no vertical sides at all: it is flat. What is ' +
        'the height of a step?',
      abstract: '$m = \\frac{5 - 5}{3 - 1} = \\frac{0}{2}$.',
    },
    hints: [
      'What is the change in $y$ between the two points?',
      'Zero divided by anything (other than zero) is zero. A horizontal line has gradient 0.',
    ],
    solution:
      '$m = \\frac{5 - 5}{3 - 1} = \\frac{0}{2} = 0$. The line is horizontal: $y = 5$ everywhere, ' +
      'so $y$ does not change as $x$ changes.\n\n$$m = 0$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },
  {
    id: 'function-graphs.gradient-two-points-4',
    skillIds: ['function-graphs.interpret-rate-change'],
    tier: 1,
    sequence: { family: 'function-graphs.gradient-two-points', position: 4 },
    expect:
      'These are the same two points as item 1, but written in the other order: $(3, 8)$ first, ' +
      'then $(1, 2)$. Should the gradient change because of the order? Predict, then check.',
    statement: 'Find the gradient of the straight line through $(3, 8)$ and $(1, 2)$.',
    answer: { type: 'number', value: 3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Walk from $(3, 8)$ to $(1, 2)$: that is 2 holes to the *left* and 6 holes *down*. Both ' +
        'negative. A line does not care which way you walk along it.',
      pictorial:
        'Draw the step ladder from $(3, 8)$ back to $(1, 2)$. Run $= -2$, rise $= -6$. Divide.',
      abstract:
        '$m = \\frac{2 - 8}{1 - 3}$. Subtract in the *same* order on top and bottom, and the two ' +
        'negatives cancel.',
    },
    hints: [
      'Use the formula with the points in the order given: $\\frac{2 - 8}{1 - 3}$.',
      'Top: $-6$. Bottom: $-2$. Negative over negative is positive.',
      'It is the same line as $(1, 2)$ to $(3, 8)$, so it must be the same gradient — 3.',
    ],
    solution:
      '$m = \\frac{2 - 8}{1 - 3} = \\frac{-6}{-2} = 3$. The order of the points does not matter ' +
      'as long as you subtract in the same order top and bottom. Mixing the order, ' +
      '$\\frac{2 - 8}{3 - 1} = -3$, would be wrong: this line rises.\n\n$$m = 3$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },
  {
    id: 'function-graphs.gradient-two-points-5',
    skillIds: ['function-graphs.interpret-rate-change'],
    tier: 1,
    sequence: { family: 'function-graphs.gradient-two-points', position: 5 },
    expect:
      'The run is now 3 and the rise is 2, so the rise no longer divides evenly. Will the ' +
      'gradient be bigger or smaller than 1? Predict the fraction.',
    statement:
      'Find the gradient of the straight line through $(1, 2)$ and $(4, 4)$. Give your answer as ' +
      'a fraction.',
    answer: { type: 'number', value: 2 / 3, tolerance: 0.001 },
    cpaPrompts: {
      concrete:
        'Walk from $(1, 2)$ to $(4, 4)$: 3 holes across, 2 holes up. You cannot make whole steps of ' +
        'one across — so share the 2 up equally between the 3 across.',
      pictorial:
        'Draw the step ladder: run 3, rise 2. One step of run 1 rises $\\frac{2}{3}$ of a square.',
      abstract: '$m = \\frac{4 - 2}{4 - 1} = \\frac{2}{3}$. Leave it as a fraction.',
    },
    hints: [
      'Rise $= 4 - 2$, run $= 4 - 1$.',
      '$\\frac{2}{3}$ is already in lowest terms. Do not turn it upside down — the rise is on top.',
    ],
    solution:
      '$m = \\frac{4 - 2}{4 - 1} = \\frac{2}{3}$. For every 3 across, the line goes 2 up; for ' +
      'every 1 across, $\\frac{2}{3}$ up. A gradient less than 1 is a shallow line.\n\n$$m = \\tfrac{2}{3}$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },

  // interpret-rate-change — tier 2
  {
    id: 'function-graphs.rate-from-graph',
    skillIds: ['function-graphs.interpret-rate-change'],
    tier: 2,
    statement:
      'The figure shows the volume of water in a tank, in litres, against time in minutes while a ' +
      'tap is running. At what rate is the tank filling? Give your answer in litres per minute.',
    answer: { type: 'number', value: 4, tolerance: 0, unit: 'litres per minute' },
    figure: {
      kind: 'coordinate_plane',
      title: 'Volume (litres) against time (minutes)',
      xMin: 0,
      xMax: 10,
      yMin: 0,
      yMax: 50,
      gridStep: 2,
      curves: [{ type: 'linear', m: 4, c: 10, label: 'V' }],
      points: [
        { x: 0, y: 10, label: '(0, 10)', highlight: true },
        { x: 5, y: 30, label: '(5, 30)', highlight: true },
      ],
      slopeTriangle: { fromX: 0, toX: 5, curveIndex: 0 },
    },
    cpaPrompts: {
      concrete:
        'How much water was already in the tank when the tap was turned on? How much is there ' +
        'after 5 minutes? So how much went in during those 5 minutes — and per minute?',
      pictorial:
        'Use the two marked points to draw a step ladder: 5 minutes across and how many litres up? ' +
        'Divide to get the rise for one minute.',
      abstract:
        'Rate $= \\frac{\\Delta V}{\\Delta t}$ with units litres per minute. Read two points off ' +
        'the line and subtract.',
    },
    hints: [
      'Read two points off the line, for instance where $t = 0$ and $t = 5$.',
      'From $(0, 10)$ to $(5, 30)$ the volume rises by 20 litres in 5 minutes.',
      'Divide 20 litres by 5 minutes.',
    ],
    solution:
      'From $(0, 10)$ to $(5, 30)$: $\\frac{30 - 10}{5 - 0} = \\frac{20}{5} = 4$. The tank fills ' +
      'at 4 litres per minute; the 10 is the water already there at the start.\n\n$$4 \\text{ litres per minute}$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },
  {
    id: 'function-graphs.steeper-line',
    skillIds: ['function-graphs.interpret-rate-change'],
    tier: 2,
    statement:
      'Line A has equation $y = 3x + 1$. Line B passes through $(0, 1)$ and $(2, -9)$. Which ' +
      'line is steeper? Give the gradient of the steeper line.',
    answer: { type: 'number', value: -5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two rubber bands from the same peg $(0, 1)$. One climbs 3 for every hole across; the ' +
        'other drops how many for every hole across? Which band is closer to vertical?',
      pictorial:
        'Sketch both lines from $(0, 1)$. Draw a run-1 slope triangle on each. Which triangle is ' +
        'taller — ignoring whether it points up or down?',
      abstract:
        'Steepness is the *size* of the gradient, $|m|$; the sign only says up or down. Find ' +
        "line B's gradient from its two points and compare sizes.",
    },
    hints: [
      "Find line B's gradient: $\\frac{-9 - 1}{2 - 0}$.",
      'Line B has gradient $-5$. Which is bigger in size, 3 or 5? Steeper means bigger in size.',
    ],
    solution:
      'Line B: $m = \\frac{-9 - 1}{2 - 0} = \\frac{-10}{2} = -5$. Since $|{-5}| = 5 > 3$, line B ' +
      'is steeper, even though it slopes downward. Its gradient is $-5$.\n\n$$m_B = -5$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },
  {
    id: 'function-graphs.change-over-five',
    skillIds: ['function-graphs.interpret-rate-change'],
    tier: 2,
    statement:
      'On the line $y = -0.4x + 7$, $x$ increases by 5. By how much does $y$ change? Include the sign.',
    answer: { type: 'number', value: -2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Every hole to the right, the band drops $0.4$ of a hole. Take five holes to the right, one ' +
        'at a time, and add up the drops.',
      pictorial:
        'Draw a step ladder of five steps, each run 1 and each dropping $0.4$. What is the total drop?',
      abstract:
        'Gradient means change in $y$ per unit change in $x$, so $\\Delta y = m \\times \\Delta x = -0.4 \\times 5$.',
    },
    hints: [
      'The gradient tells you the change in $y$ for a change of 1 in $x$. What is it here?',
      'Multiply that by 5. Keep the sign: negative means $y$ goes down.',
    ],
    solution:
      '$\\Delta y = m \\cdot \\Delta x = -0.4 \\times 5 = -2$. Check: at $x = 0$, $y = 7$; at ' +
      '$x = 5$, $y = -2 + 7 = 5$; a change of $-2$. ✓\n\n$$\\Delta y = -2$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },

  // interpret-rate-change — tier 3
  {
    id: 'function-graphs.cost-per-km',
    skillIds: ['function-graphs.interpret-rate-change', 'function-graphs.graph-linear-functions'],
    tier: 3,
    statement:
      'A taxi meter reads $\\$8.40$ after 4 km and $\\$12.80$ after 12 km, and the fare goes up ' +
      'steadily with distance. How much does each extra kilometre cost?',
    answer: { type: 'number', value: 0.55, tolerance: 0.001, unit: 'dollars per km' },
    cpaPrompts: {
      concrete:
        'Between the two readings the taxi travelled some kilometres and the meter went up by some ' +
        'dollars. How many of each? Share the dollars equally among the kilometres.',
      pictorial:
        'Plot $(4, 8.40)$ and $(12, 12.80)$ with km across and dollars up. Join them. The step ' +
        'ladder between them is 8 across and how much up?',
      abstract:
        'Rate $= \\frac{\\Delta \\text{fare}}{\\Delta \\text{distance}} = \\frac{12.80 - 8.40}{12 - 4}$.',
    },
    hints: [
      'How far did the taxi go between the two readings, and how much more did it cost?',
      '$\\$4.40$ more for 8 more km. Divide.',
    ],
    solution:
      'Extra distance $= 12 - 4 = 8$ km; extra cost $= 12.80 - 8.40 = 4.40$ dollars. Rate ' +
      '$= \\frac{4.40}{8} = 0.55$ dollars per km. (The fare line is $F = 0.55d + 6.20$, so the ' +
      'flag-down charge here is $\\$6.20$.)\n\n$$\\$0.55 \\text{ per km}$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },
  {
    id: 'function-graphs.draining-tank',
    skillIds: ['function-graphs.interpret-rate-change'],
    tier: 3,
    statement:
      'A tank is being emptied at a steady rate. After 2 minutes it holds 46 litres; after 7 ' +
      'minutes it holds 26 litres. Find the rate of change of the volume, in litres per minute, ' +
      'including its sign.',
    answer: { type: 'number', value: -4, tolerance: 0, unit: 'litres per minute' },
    cpaPrompts: {
      concrete:
        'Between the two readings, how many minutes passed and how many litres left the tank? ' +
        'Losing water counts as negative change.',
      pictorial:
        'Plot $(2, 46)$ and $(7, 26)$ with minutes across and litres up. The line slopes down. ' +
        'Draw the step ladder: 5 across, how far down?',
      abstract: 'Rate $= \\frac{26 - 46}{7 - 2}$. A negative rate means the volume is decreasing.',
    },
    hints: [
      'Subtract in the same order top and bottom: (later volume $-$ earlier volume) over (later time $-$ earlier time).',
      '$\\frac{26 - 46}{7 - 2} = \\frac{-20}{5}$.',
    ],
    solution:
      'Rate $= \\frac{26 - 46}{7 - 2} = \\frac{-20}{5} = -4$ litres per minute. The tank loses 4 ' +
      'litres every minute; it will be empty after $26 \\div 4 = 6.5$ more minutes, at ' +
      '$t = 13.5$.\n\n$$-4 \\text{ litres per minute}$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted'],
  },

  // interpret-rate-change — diagnostic
  {
    id: 'function-graphs.dx-rise-run-inverted',
    skillIds: ['function-graphs.interpret-rate-change'],
    tier: 'diagnostic',
    statement: 'A line passes through $(0, 2)$ and $(2, 8)$. What is its gradient?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$\\frac{1}{3}$', misconceptionCode: 'function-graphs.rise-run-inverted' },
        { label: 'B', value: '$3$' },
        { label: 'C', value: '$6$', misconceptionCode: 'function-graphs.gradient-before-isolating-y' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Walk from $(0, 2)$ to $(2, 8)$: 2 holes across and 6 holes up. How many up for *each one* across?',
      pictorial:
        'Draw the step ladder: run 2, rise 6. Cut it into two steps of run 1. How tall is each?',
      abstract:
        'Gradient is change in $y$ over change in $x$: $\\frac{8 - 2}{2 - 0}$. The $y$ change goes on top.',
    },
    hints: [
      'Which number is the change in $y$ — 2 or 6? That one goes on top.',
      '$\\frac{6}{2} = 3$: the line rises 3 for every 1 across.',
    ],
    solution:
      '$m = \\frac{8 - 2}{2 - 0} = \\frac{6}{2} = 3$. The answer $\\frac{1}{3}$ comes from ' +
      'dividing run by rise; $6$ is the rise alone, forgetting to divide by the run of 2 — like ' +
      'reading the coefficient of $x$ from $2y = 6x + 4$ before dividing by 2.\n\n$$m = 3$$',
    misconceptionCodes: ['function-graphs.rise-run-inverted', 'function-graphs.gradient-before-isolating-y'],
  },

  // -------------------------------------------------------------------------
  // graph-quadratic-functions — tier 1: table and plot
  // -------------------------------------------------------------------------
  {
    id: 'function-graphs.table-and-plot-1',
    skillIds: ['function-graphs.graph-quadratic-functions'],
    tier: 1,
    sequence: { family: 'function-graphs.table-and-plot', position: 1 },
    statement:
      'Make a table of values for $y = x^2$ with $x = -3, -2, -1, 0, 1, 2, 3$, and plot the ' +
      'points to sketch the graph. What is $y$ when $x = -2$?',
    answer: { type: 'number', value: 4, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Build the squares with tiles: a $1 \\times 1$, a $2 \\times 2$, a $3 \\times 3$. How many ' +
        'tiles in each? Does a side of $-2$ make a different number of tiles from a side of $2$?',
      pictorial:
        'Plot the seven points. Look at the differences between successive $y$ values: ' +
        '$1, 3, 5, \\ldots$ They are not constant, so the graph curves. Which point is lowest?',
      abstract:
        '$(-2)^2 = (-2) \\times (-2)$. The square of a negative number is positive, so the table ' +
        'is symmetric about $x = 0$.',
    },
    hints: [
      'Square each $x$ value: multiply it by itself, sign and all.',
      '$(-2) \\times (-2)$: negative times negative is positive.',
    ],
    solution:
      'Table: $x = -3, -2, -1, 0, 1, 2, 3$ gives $y = 9, 4, 1, 0, 1, 4, 9$. At $x = -2$, ' +
      '$y = (-2)^2 = 4$. Plotting gives a U-shaped curve, symmetric about the $y$-axis, with its ' +
      'lowest point at $(0, 0)$.\n\n$$y = 4$$',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },
  {
    id: 'function-graphs.table-and-plot-2',
    skillIds: ['function-graphs.graph-quadratic-functions'],
    tier: 1,
    sequence: { family: 'function-graphs.table-and-plot', position: 2 },
    expect:
      'A $+1$ has been added: $y = x^2 + 1$. Before filling the table, predict how every $y$ value ' +
      'changes and what that does to the picture.',
    statement:
      'Make a table of values for $y = x^2 + 1$ with $x = -3$ to $3$, and plot the points. What is ' +
      '$y$ when $x = -2$?',
    answer: { type: 'number', value: 5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Take each pile of square tiles from before and put one extra tile on top. How does the ' +
        'row of pile heights change?',
      pictorial:
        'Plot the new points on the same axes as $y = x^2$. Is the shape the same? Where has it moved to?',
      abstract: 'Every $y$ is the old $y$ plus 1: $(-2)^2 + 1$.',
    },
    hints: [
      'Square first, then add 1.',
      'From the last table, $y$ was 4 at $x = -2$. Add 1.',
    ],
    solution:
      'Table: $y = 10, 5, 2, 1, 2, 5, 10$. At $x = -2$, $y = 4 + 1 = 5$. The whole curve is the ' +
      '$y = x^2$ curve shifted up by 1; its lowest point is now $(0, 1)$.\n\n$$y = 5$$',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },
  {
    id: 'function-graphs.table-and-plot-3',
    skillIds: ['function-graphs.graph-quadratic-functions'],
    tier: 1,
    sequence: { family: 'function-graphs.table-and-plot', position: 3 },
    expect:
      'The $+1$ has become $-4$: $y = x^2 - 4$. Predict where the curve now sits — and whether it ' +
      'will cross the $x$-axis this time.',
    statement:
      'Make a table of values for $y = x^2 - 4$ with $x = -3$ to $3$, and plot the points. What is ' +
      '$y$ when $x = -2$?',
    answer: { type: 'number', value: 0, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Take 4 tiles away from each pile of squares. The $2 \\times 2$ pile has exactly 4 — what ' +
        'is left? What about the $1 \\times 1$ pile — you owe tiles.',
      pictorial:
        'Plot the points. The curve dips below the $x$-axis in the middle. At which two $x$ values ' +
        'does it sit exactly *on* the axis?',
      abstract: 'Every $y$ is the old $y$ minus 4: $(-2)^2 - 4$.',
    },
    hints: [
      'Square first, then subtract 4.',
      '$4 - 4 = 0$. The point $(-2, 0)$ is on the $x$-axis — the curve crosses there.',
    ],
    solution:
      'Table: $y = 5, 0, -3, -4, -3, 0, 5$. At $x = -2$, $y = 4 - 4 = 0$. The curve is $y = x^2$ ' +
      'shifted down 4, so it crosses the $x$-axis at $x = -2$ and $x = 2$ and bottoms out at $(0, -4)$.\n\n$$y = 0$$',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },
  {
    id: 'function-graphs.table-and-plot-4',
    skillIds: ['function-graphs.graph-quadratic-functions'],
    tier: 1,
    sequence: { family: 'function-graphs.table-and-plot', position: 4 },
    expect:
      'Now a minus sign sits in front: $y = -x^2$. Predict the sign of every $y$ value, and which ' +
      'way up the curve will be.',
    statement:
      'Make a table of values for $y = -x^2$ with $x = -3$ to $3$, and plot the points. What is ' +
      '$y$ when $x = -2$?',
    answer: { type: 'number', value: -4, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Build the $2 \\times 2$ square of tiles as before — 4 tiles — and then flip its sign: you ' +
        'owe 4. Is the square built from $-2$ any different from the square built from $2$?',
      pictorial:
        'Plot the points. Compare with $y = x^2$: the same shape reflected in the $x$-axis, with its ' +
        'highest point at $(0, 0)$.',
      abstract:
        '$-x^2$ means $-(x^2)$: square first, then take the negative. At $x = -2$: $-((-2)^2) = -(4)$.',
    },
    hints: [
      'Square first, then apply the minus sign in front.',
      '$(-2)^2 = 4$, so $-x^2 = -4$. Not $+4$: the minus is outside the square.',
    ],
    solution:
      'Table: $y = -9, -4, -1, 0, -1, -4, -9$. At $x = -2$, $y = -((-2)^2) = -4$. Every $y$ is ' +
      'zero or negative, so the curve opens downward with its highest point at $(0, 0)$. Writing ' +
      '$(-(-2))^2 = 4$ would be squaring the wrong thing.\n\n$$y = -4$$',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },
  {
    id: 'function-graphs.table-and-plot-5',
    skillIds: ['function-graphs.graph-quadratic-functions'],
    tier: 1,
    sequence: { family: 'function-graphs.table-and-plot', position: 5 },
    expect:
      'The coefficient is now $2$: $y = 2x^2$. Predict whether the curve is wider or narrower ' +
      'than $y = x^2$, and which way it opens.',
    statement:
      'Make a table of values for $y = 2x^2$ with $x = -3$ to $3$, and plot the points. What is ' +
      '$y$ when $x = -2$?',
    answer: { type: 'number', value: 8, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Build the $2 \\times 2$ square of tiles, then build a second one just like it. How many ' +
        'tiles in all? Does doubling change whether you have tiles or owe them?',
      pictorial:
        'Plot the points on the same axes as $y = x^2$. Each point is twice as high, so the curve ' +
        'climbs faster and looks narrower.',
      abstract: '$2x^2$ means $2 \\times (x^2)$: square first, then double. At $x = -2$: $2 \\times 4$.',
    },
    hints: [
      'Square first, then multiply by 2.',
      '$(-2)^2 = 4$, and $2 \\times 4 = 8$. (Not $(2 \\times -2)^2 = 16$.)',
    ],
    solution:
      'Table: $y = 18, 8, 2, 0, 2, 8, 18$. At $x = -2$, $y = 2 \\times (-2)^2 = 2 \\times 4 = 8$. ' +
      'The curve opens upward like $y = x^2$ but is steeper, so it looks narrower.\n\n$$y = 8$$',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },
  {
    id: 'function-graphs.table-and-plot-6',
    skillIds: ['function-graphs.graph-quadratic-functions'],
    tier: 1,
    sequence: { family: 'function-graphs.table-and-plot', position: 6 },
    expect:
      'This one has all three terms: $y = -x^2 + 4x + 5$. From the sign of the $x^2$ term alone, ' +
      'predict which way it opens; from the $+5$, predict where it crosses the $y$-axis.',
    statement:
      'Make a table of values for $y = -x^2 + 4x + 5$ with $x = -2, -1, 0, 1, 2, 3, 4, 5, 6$, and ' +
      'plot the points. What is $y$ when $x = -2$?',
    answer: { type: 'number', value: -7, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'A ball is thrown: this curve is its height. Before plotting, does the $-x^2$ tell you ' +
        'it goes up and comes down, or dips and rises? Where is it at $x = 0$?',
      pictorial:
        'Plot the nine points. The differences between successive $y$ values go $7, 5, 3, 1, -1, ' +
        '-3, \\ldots$ — they shrink by 2 each time. Where do they change from positive to negative?',
      abstract:
        'Three terms, evaluated one at a time: $-(x^2)$, then $4x$, then $5$. At $x = -2$: ' +
        '$-(4) + (-8) + 5$.',
    },
    hints: [
      'Work each term separately at $x = -2$: what is $-x^2$? What is $4x$? Then add 5.',
      '$-x^2 = -4$ and $4x = -8$. So $y = -4 - 8 + 5$.',
    ],
    solution:
      'Table: $x = -2, -1, 0, 1, 2, 3, 4, 5, 6$ gives $y = -7, 0, 5, 8, 9, 8, 5, 0, -7$. At ' +
      '$x = -2$: $y = -(-2)^2 + 4(-2) + 5 = -4 - 8 + 5 = -7$. The curve opens downward (since ' +
      '$a = -1$), crosses the $y$-axis at $(0, 5)$, and is symmetric about $x = 2$.\n\n$$y = -7$$',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },

  // graph-quadratic-functions — tier 2
  {
    id: 'function-graphs.read-a-from-graph',
    skillIds: ['function-graphs.graph-quadratic-functions'],
    tier: 2,
    statement:
      'The figure shows the graph of $y = ax^2 + 4$ for some number $a$. Use the marked points to ' +
      'find $a$.',
    answer: { type: 'number', value: -1, tolerance: 0 },
    figure: {
      kind: 'coordinate_plane',
      title: 'y = ax² + 4',
      xMin: -4,
      xMax: 4,
      yMin: -6,
      yMax: 6,
      gridStep: 1,
      curves: [{ type: 'quadratic', a: -1, b: 0, c: 4 }],
      points: [
        { x: 0, y: 4, label: '(0, 4)', highlight: true },
        { x: 2, y: 0, label: '(2, 0)', highlight: true },
        { x: -2, y: 0, label: '(-2, 0)', highlight: true },
      ],
    },
    cpaPrompts: {
      concrete:
        'Is the curve a hill or a bowl? Which sign of $a$ makes a hill? Now use the point $(2, 0)$ ' +
        'to find how big $a$ is.',
      pictorial:
        'Compare with $y = x^2$: this one is turned upside down and lifted up 4. What does flipping ' +
        'do to $a$?',
      abstract: 'Substitute $(2, 0)$: $0 = a(2)^2 + 4$, so $4a = -4$.',
    },
    hints: [
      'The curve opens downward. What does that say about the sign of $a$?',
      'The point $(2, 0)$ is on the curve. Put $x = 2, y = 0$ into $y = ax^2 + 4$ and solve for $a$.',
    ],
    solution:
      'The curve opens downward, so $a < 0$. Substituting $(2, 0)$: $0 = 4a + 4$, so $a = -1$. ' +
      'Check with $(-2, 0)$: $-1 \\times 4 + 4 = 0$. ✓\n\n$$a = -1$$',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },
  {
    id: 'function-graphs.orientation-from-a',
    skillIds: ['function-graphs.graph-quadratic-functions'],
    tier: 2,
    statement:
      'Without plotting, decide whether the graph of $y = 3 - 2x - x^2$ has a maximum or a ' +
      'minimum turning point. Answer "maximum" or "minimum".',
    answer: {
      type: 'exact',
      value: 'maximum',
      accepts: ['max', 'a maximum', 'maximum point', 'maximum turning point', 'opens downward', 'opens down', 'downward'],
    },
    cpaPrompts: {
      concrete:
        'A thrown ball has a highest point; a hanging chain has a lowest point. Which of these ' +
        'shapes is this curve? The $x^2$ term decides.',
      pictorial:
        'Rewrite the equation with the $x^2$ term first and sketch the rough shape from the sign of ' +
        'its coefficient alone.',
      abstract:
        'In $y = ax^2 + bx + c$ form this is $y = -x^2 - 2x + 3$, so $a = -1$. $a < 0$ opens downward.',
    },
    hints: [
      'The terms are written in an unusual order. Find the $x^2$ term and its sign.',
      '$-x^2$ means $a = -1$. A negative $a$ means the curve opens downward, so its turning point is a maximum.',
    ],
    solution:
      'Rearranged, $y = -x^2 - 2x + 3$, so $a = -1 < 0$. The parabola opens downward and its ' +
      'turning point is a **maximum**. (It is at $x = -\\frac{-2}{2(-1)} = -1$, where $y = 4$.)',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },
  {
    id: 'function-graphs.y-intercept-from-c',
    skillIds: ['function-graphs.graph-quadratic-functions'],
    tier: 2,
    statement: 'Write down the coordinates of the point where the graph of $y = 2x^2 - 3x - 7$ crosses the $y$-axis.',
    answer: { type: 'coordinates', x: 0, y: -7, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'On the $y$-axis, how far across have you gone? Zero. What are $2x^2$ and $-3x$ worth when ' +
        '$x$ is zero?',
      pictorial:
        'Sketch any parabola. Mark where it crosses the vertical axis. What is the $x$-coordinate ' +
        'of that point — always?',
      abstract: 'Set $x = 0$: $y = 2(0)^2 - 3(0) - 7$. Only the constant survives.',
    },
    hints: [
      'Every point on the $y$-axis has $x = 0$. Substitute it.',
      '$2(0)^2 - 3(0) - 7 = -7$. The point is $(0, -7)$, not $(-7, 0)$.',
    ],
    solution:
      'At $x = 0$, $y = 0 - 0 - 7 = -7$. The graph crosses the $y$-axis at $(0, -7)$: the ' +
      'constant term $c$ is always the $y$-intercept.\n\n$$(0, -7)$$',
    misconceptionCodes: ['function-graphs.intercepts-confused'],
  },
  {
    id: 'function-graphs.evaluate-negative-x',
    skillIds: ['function-graphs.graph-quadratic-functions'],
    tier: 2,
    statement: 'Find the value of $y$ on the curve $y = -2x^2 + 3x - 1$ when $x = -3$.',
    answer: { type: 'number', value: -28, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Three separate piles: the square pile (9 tiles, doubled, then owed), the $3x$ pile (owed ' +
        '9), and the $-1$. Combine them: how much do you owe in all?',
      pictorial:
        'Write the three terms in a column, each worked out on its own line, before adding.',
      abstract:
        '$-2x^2 = -2 \\times (x^2) = -2 \\times 9$. Then $3x = 3 \\times (-3)$. Then $-1$.',
    },
    hints: [
      'Do each term separately. Start with $(-3)^2$ — what is it?',
      '$(-3)^2 = 9$, so $-2x^2 = -18$. Now $3x = -9$. Add $-18$, $-9$ and $-1$.',
    ],
    solution:
      '$y = -2(-3)^2 + 3(-3) - 1 = -2(9) - 9 - 1 = -18 - 9 - 1 = -28$. The square is positive; ' +
      'the $-2$ in front then makes the term negative.\n\n$$y = -28$$',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },

  // graph-quadratic-functions — tier 3
  {
    id: 'function-graphs.thrown-ball-height',
    skillIds: ['function-graphs.graph-quadratic-functions'],
    tier: 3,
    statement:
      'A ball is thrown upward from a balcony. Its height above the ground after $t$ seconds is ' +
      '$h = -5t^2 + 20t + 1$ metres. How high is the ball after 3 seconds?',
    answer: { type: 'number', value: 16, tolerance: 0, unit: 'm' },
    cpaPrompts: {
      concrete:
        'Picture the throw: the ball leaves your hand 1 metre up, rises, hangs, falls. At 3 ' +
        'seconds, is it still going up or already coming down? The $-5t^2$ is gravity pulling it back.',
      pictorial:
        'Make a table for $t = 0, 1, 2, 3, 4$ and sketch the height. Which way does the curve open, ' +
        'and what does the sign of the $t^2$ term have to do with it?',
      abstract:
        'Substitute $t = 3$, working each term on its own: $-5(3)^2$, then $20(3)$, then $+1$.',
    },
    hints: [
      'Put $t = 3$ into the formula. Square first: $3^2 = 9$.',
      '$-5 \\times 9 = -45$ and $20 \\times 3 = 60$. Add them and the 1.',
    ],
    solution:
      '$h = -5(3)^2 + 20(3) + 1 = -45 + 60 + 1 = 16$ metres. (At $t = 2$ the ball is at its ' +
      'highest, 21 m, so at 3 seconds it is on the way down.)\n\n$$h = 16 \\text{ m}$$',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },
  {
    id: 'function-graphs.profit-curve',
    skillIds: ['function-graphs.graph-quadratic-functions'],
    tier: 3,
    statement:
      'A stall sells cakes at $x$ dollars each. Its daily profit, in dollars, is modelled by ' +
      '$P = -x^2 + 30x - 125$. Find the profit when the cakes are priced at $\\$5$ each.',
    answer: { type: 'number', value: 0, tolerance: 0, unit: 'dollars' },
    cpaPrompts: {
      concrete:
        'Price too low and you sell lots but make nothing; price too high and nobody buys. Somewhere ' +
        'between is a best price. At $\\$5$, does the stall make money, lose money, or break even?',
      pictorial:
        'Sketch $P$ against $x$ for $x = 0$ to $30$. It is a hill. Where does it cross the ' +
        '$x$-axis — the prices at which profit is exactly zero?',
      abstract: 'Substitute $x = 5$: $-(5^2) + 30(5) - 125$, one term at a time.',
    },
    hints: [
      'Put $x = 5$ into the formula. Square first: $5^2 = 25$, and the minus sign in front makes it $-25$.',
      '$-25 + 150 - 125$.',
    ],
    solution:
      '$P = -(5)^2 + 30(5) - 125 = -25 + 150 - 125 = 0$. At $\\$5$ the stall exactly breaks even. ' +
      '(Profit is positive between the prices $\\$5$ and $\\$25$, and greatest at $\\$15$.)\n\n$$P = 0$$',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },

  // graph-quadratic-functions — diagnostic
  {
    id: 'function-graphs.dx-negate-then-square',
    skillIds: ['function-graphs.graph-quadratic-functions', 'function-graphs.identify-vertices-axes'],
    tier: 'diagnostic',
    statement:
      'The axis of symmetry of $y = -x^2 + 4x + 5$ is the line $x = 2$. What are the coordinates of the vertex?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$(2, 17)$', misconceptionCode: 'function-graphs.negate-then-square' },
        { label: 'B', value: '$(2, 9)$' },
        { label: 'C', value: '$(2, 0)$', misconceptionCode: 'function-graphs.vertex-x-only' },
      ],
    },
    cpaPrompts: {
      concrete:
        'The fold line is $x = 2$. How high is the curve at the fold? Work out $-x^2$ at $x = 2$ ' +
        'with a bracket: $-(2)^2$.',
      pictorial:
        'Mark $x = 2$ on a sketch. The vertex is the point on the curve directly above it — you ' +
        'need its height, not just its $x$.',
      abstract: 'Substitute $x = 2$: $y = -(2^2) + 4(2) + 5$. Square first, then negate.',
    },
    hints: [
      'The vertex is a point, so it needs a $y$-coordinate: substitute $x = 2$ into the equation.',
      '$-x^2$ at $x = 2$ is $-(4) = -4$, not $+4$. Then $-4 + 8 + 5$.',
    ],
    solution:
      '$y = -(2)^2 + 4(2) + 5 = -4 + 8 + 5 = 9$, so the vertex is $(2, 9)$. The answer $17$ comes ' +
      'from treating $-x^2$ as $(-2)^2 = +4$; $(2, 0)$ stops at the axis without finding the height.\n\n$$(2, 9)$$',
    misconceptionCodes: ['function-graphs.negate-then-square', 'function-graphs.vertex-x-only'],
  },

  // -------------------------------------------------------------------------
  // identify-vertices-axes — tier 1: axis of symmetry
  // -------------------------------------------------------------------------
  {
    id: 'function-graphs.axis-1',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 1,
    sequence: { family: 'function-graphs.axis-of-symmetry', position: 1 },
    statement:
      'The axis of symmetry of the parabola $y = x^2 + 2x + 3$ is the vertical line $x = k$. Find $k$.',
    answer: { type: 'number', value: -1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Make a table for $x = -3$ to $1$: $y = 6, 3, 2, 3, 6$. Fold the list in half so the equal ' +
        'values meet. Which $x$ is on the fold?',
      pictorial:
        'Plot the points and draw the dashed fold line through the lowest point. Read its $x$ value.',
      abstract: 'Axis: $x = -\\frac{b}{2a}$ with $a = 1$, $b = 2$.',
    },
    hints: [
      'Identify $a$ and $b$ in $y = ax^2 + bx + c$.',
      '$x = -\\frac{b}{2a} = -\\frac{2}{2 \\times 1}$.',
    ],
    solution:
      '$a = 1$, $b = 2$, so the axis is $x = -\\frac{2}{2(1)} = -1$. Check: $y$ at $x = -2$ and ' +
      '$x = 0$ are both $3$, equal distances either side of $-1$. ✓\n\n$$k = -1$$',
    misconceptionCodes: ['function-graphs.vertex-x-only'],
  },
  {
    id: 'function-graphs.axis-2',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 1,
    sequence: { family: 'function-graphs.axis-of-symmetry', position: 2 },
    expect: 'Only $b$ changed, from $2$ to $4$. Predict the axis: does it move left or right, and by how much?',
    statement: 'The axis of symmetry of $y = x^2 + 4x + 3$ is the line $x = k$. Find $k$.',
    answer: { type: 'number', value: -2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Table for $x = -4$ to $0$: $y = 3, 0, -1, 0, 3$. Where is the fold that makes the equal ' +
        'values meet?',
      pictorial: 'Plot the five points, draw the fold line through the lowest one, and read its $x$.',
      abstract: '$x = -\\frac{b}{2a}$ with $a = 1$, $b = 4$.',
    },
    hints: ['$a$ is still 1. What is $b$ now?', '$x = -\\frac{4}{2 \\times 1}$.'],
    solution:
      '$x = -\\frac{4}{2(1)} = -2$. Doubling $b$ (with $a$ fixed) doubles the distance of the axis ' +
      'from the $y$-axis. Check: $y(-3) = 0 = y(-1)$. ✓\n\n$$k = -2$$',
    misconceptionCodes: ['function-graphs.vertex-x-only'],
  },
  {
    id: 'function-graphs.axis-3',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 1,
    sequence: { family: 'function-graphs.axis-of-symmetry', position: 3 },
    expect: 'Now $b = 6$. If the pattern from $b = 2$ and $b = 4$ continues, where will the axis be?',
    statement: 'The axis of symmetry of $y = x^2 + 6x + 3$ is the line $x = k$. Find $k$.',
    answer: { type: 'number', value: -3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Table for $x = -5$ to $-1$: $y = -2, -5, -6, -5, -2$. Fold so the $-5$s meet, then the ' +
        '$-2$s. Which $x$ is on the fold?',
      pictorial: 'Plot, draw the fold, read its $x$. Compare with the last two items.',
      abstract: '$x = -\\frac{b}{2a}$ with $b = 6$.',
    },
    hints: ['$b = 6$, $a = 1$.', '$x = -\\frac{6}{2}$.'],
    solution:
      '$x = -\\frac{6}{2(1)} = -3$. With $a = 1$ the axis is always at $x = -\\frac{b}{2}$: $b = 2, 4, 6$ ' +
      'gives $x = -1, -2, -3$.\n\n$$k = -3$$',
    misconceptionCodes: ['function-graphs.vertex-x-only'],
  },
  {
    id: 'function-graphs.axis-4',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 1,
    sequence: { family: 'function-graphs.axis-of-symmetry', position: 4 },
    expect: 'The sign of $b$ has flipped: $b = -4$. Which side of the $y$-axis will the fold line be on now?',
    statement: 'The axis of symmetry of $y = x^2 - 4x + 3$ is the line $x = k$. Find $k$.',
    answer: { type: 'number', value: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Table for $x = 0$ to $4$: $y = 3, 0, -1, 0, 3$. It is the $b = 4$ table mirrored. Where is the fold?',
      pictorial: 'Plot the points. The curve is the reflection of $y = x^2 + 4x + 3$ in the $y$-axis.',
      abstract: '$x = -\\frac{b}{2a} = -\\frac{-4}{2}$. Two minus signs.',
    },
    hints: [
      '$b = -4$ now. Put the whole of $b$, sign included, into $-\\frac{b}{2a}$.',
      '$-\\frac{-4}{2 \\times 1} = \\frac{4}{2}$.',
    ],
    solution:
      '$x = -\\frac{-4}{2(1)} = \\frac{4}{2} = 2$. A negative $b$ (with $a > 0$) puts the axis to the ' +
      'right of the $y$-axis. Check: $y(1) = 0 = y(3)$. ✓\n\n$$k = 2$$',
    misconceptionCodes: ['function-graphs.vertex-x-only'],
  },
  {
    id: 'function-graphs.axis-5',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 1,
    sequence: { family: 'function-graphs.axis-of-symmetry', position: 5 },
    expect:
      'Same $b = -4$, but now $a = -1$: the parabola is upside down. Does flipping $a$ leave the ' +
      'axis at $x = 2$, or move it?',
    statement: 'The axis of symmetry of $y = -x^2 - 4x + 3$ is the line $x = k$. Find $k$.',
    answer: { type: 'number', value: -2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Table for $x = -4$ to $0$: $y = 3, 6, 7, 6, 3$. It is a hill now. Fold so the 6s meet: which $x$?',
      pictorial:
        'Plot the points. Draw the fold through the *highest* point this time and read its $x$.',
      abstract: '$x = -\\frac{b}{2a}$ with $a = -1$, $b = -4$: $-\\frac{-4}{2(-1)}$.',
    },
    hints: [
      'Both $a$ and $b$ are negative now. Substitute both carefully.',
      '$-\\frac{-4}{-2}$: the top is $+4$, the bottom is $-2$.',
    ],
    solution:
      '$x = -\\frac{-4}{2(-1)} = -\\frac{-4}{-2} = -2$. Changing the sign of $a$ moves the axis to the ' +
      'other side: the formula divides by $a$. Check: $y(-3) = 6 = y(-1)$. ✓\n\n$$k = -2$$',
    misconceptionCodes: ['function-graphs.vertex-x-only', 'function-graphs.negate-then-square'],
  },
  {
    id: 'function-graphs.axis-6',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 1,
    sequence: { family: 'function-graphs.axis-of-symmetry', position: 6 },
    expect:
      'Now $a = 2$ with $b = -4$. Compared with $a = 1$ (where the axis was at $x = 2$), will the ' +
      'axis be closer to the $y$-axis or further away?',
    statement: 'The axis of symmetry of $y = 2x^2 - 4x + 3$ is the line $x = k$. Find $k$.',
    answer: { type: 'number', value: 1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Table for $x = -1$ to $3$: $y = 9, 3, 1, 3, 9$. Fold so the 3s meet. Which $x$ is on the fold?',
      pictorial: 'Plot the five points. The curve is narrow. Draw the fold through the lowest point.',
      abstract: '$x = -\\frac{b}{2a} = -\\frac{-4}{2 \\times 2}$.',
    },
    hints: ['$a = 2$ this time, so the bottom of the fraction is $2 \\times 2 = 4$.', '$-\\frac{-4}{4} = 1$.'],
    solution:
      '$x = -\\frac{-4}{2(2)} = \\frac{4}{4} = 1$. Doubling $a$ halves the distance of the axis from ' +
      'the $y$-axis. Check: $y(0) = 3 = y(2)$. ✓\n\n$$k = 1$$',
    misconceptionCodes: ['function-graphs.vertex-x-only'],
  },
  {
    id: 'function-graphs.axis-7-vertex',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 1,
    sequence: { family: 'function-graphs.axis-of-symmetry', position: 7 },
    expect:
      'Same curve as the last item, but now the question asks for the vertex, not the axis. What ' +
      'more do you need beyond $x = 1$?',
    statement: 'Find the coordinates of the vertex of the parabola $y = 2x^2 - 4x + 3$.',
    answer: { type: 'coordinates', x: 1, y: 1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The fold line is $x = 1$. The vertex is the point on the curve *at* the fold — how high ' +
        'is the curve there? Read it from your table.',
      pictorial: 'Mark the fold line $x = 1$ on your plot. The vertex is where the curve meets it.',
      abstract: 'Substitute $x = 1$ into the equation to get the $y$-coordinate of the vertex.',
    },
    hints: [
      'The axis is $x = 1$. A vertex is a point, so it needs a $y$ as well.',
      '$y = 2(1)^2 - 4(1) + 3$.',
    ],
    solution:
      'Axis: $x = 1$. Then $y = 2(1)^2 - 4(1) + 3 = 2 - 4 + 3 = 1$. The vertex is $(1, 1)$, a ' +
      'minimum since $a = 2 > 0$.\n\n$$(1, 1)$$',
    misconceptionCodes: ['function-graphs.vertex-x-only'],
  },

  // identify-vertices-axes — tier 2
  {
    id: 'function-graphs.vertex-from-intercepts',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 2,
    statement:
      'The parabola $y = (x + 1)(x - 7)$ crosses the $x$-axis at $(-1, 0)$ and $(7, 0)$. Use the ' +
      'symmetry of the curve to find the coordinates of its vertex.',
    answer: { type: 'coordinates', x: 3, y: -16, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Fold the graph so that the two crossing points land on top of each other. The fold is ' +
        'exactly halfway between $-1$ and $7$. Where is that?',
      pictorial:
        'Mark $-1$ and $7$ on the $x$-axis and the midpoint between them. Draw the dashed axis ' +
        'there. The vertex is on it — how far down?',
      abstract:
        'Axis $x = \\frac{-1 + 7}{2}$. Then substitute that $x$ into $(x + 1)(x - 7)$ for the $y$-coordinate.',
    },
    hints: [
      'The axis of symmetry is halfway between the two $x$-intercepts. Average them.',
      'The axis is $x = 3$. Now find $y$ at $x = 3$: $(3 + 1)(3 - 7)$.',
    ],
    solution:
      'Midpoint of the intercepts: $x = \\frac{-1 + 7}{2} = 3$. Then $y = (3 + 1)(3 - 7) = 4 \\times (-4) = -16$. ' +
      'The vertex is $(3, -16)$, a minimum. (Expanding, $y = x^2 - 6x - 7$, and $-\\frac{b}{2a} = 3$ agrees.)\n\n$$(3, -16)$$',
    misconceptionCodes: ['function-graphs.vertex-x-only', 'function-graphs.intercept-sign-flipped'],
  },
  {
    id: 'function-graphs.vertex-from-graph',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 2,
    statement:
      'The figure shows the graph of $y = x^2 - 2x - 3$. Read off the coordinates of its turning point.',
    answer: { type: 'coordinates', x: 1, y: -4, tolerance: 0 },
    figure: {
      kind: 'coordinate_plane',
      title: 'y = x² − 2x − 3',
      xMin: -4,
      xMax: 6,
      yMin: -6,
      yMax: 8,
      gridStep: 1,
      curves: [{ type: 'quadratic', a: 1, b: -2, c: -3 }],
      points: [
        { x: -1, y: 0, label: '(-1, 0)', highlight: true },
        { x: 3, y: 0, label: '(3, 0)', highlight: true },
        { x: 0, y: -3, label: '(0, -3)', highlight: true },
      ],
    },
    cpaPrompts: {
      concrete:
        'Fold the picture so the two $x$-axis crossings meet. Where is the fold? The bottom of the ' +
        'bowl sits on that fold — how far below the axis?',
      pictorial:
        'Find the lowest point of the curve on the grid. Count across to it from the $y$-axis and ' +
        'down to it from the $x$-axis.',
      abstract:
        'Check by calculation: axis $x = -\\frac{-2}{2} = 1$, and $y = 1 - 2 - 3 = -4$.',
    },
    hints: [
      'The crossings are at $x = -1$ and $x = 3$. The turning point is halfway between them.',
      'At $x = 1$, read the height of the curve from the grid (or substitute into the equation).',
    ],
    solution:
      'The curve is lowest halfway between the intercepts $-1$ and $3$, at $x = 1$. There ' +
      '$y = 1^2 - 2(1) - 3 = -4$. The turning point is $(1, -4)$, a minimum.\n\n$$(1, -4)$$',
    misconceptionCodes: ['function-graphs.vertex-x-only'],
  },
  {
    id: 'function-graphs.sketch-four-features',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 2,
    statement:
      'For the parabola $y = x^2 - 2x - 8$, find the $y$-intercept, the axis of symmetry and the ' +
      'vertex, then sketch the curve. Give the two values of $x$ where the curve crosses the $x$-axis.',
    answer: { type: 'set', values: [4, -2], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Four landmarks pin the curve down: where it meets the vertical axis, the fold line, the ' +
        'lowest point, and the two crossings of the horizontal axis. Find each, then join up.',
      pictorial:
        'Plot $(0, -8)$, draw the dashed axis at $x = 1$, mark the vertex $(1, -9)$, then the two ' +
        'crossings mirror-image either side of the axis. Sketch through them.',
      abstract:
        '$y$-intercept $(0, c)$; axis $x = -\\frac{b}{2a}$; vertex by substitution; $x$-intercepts ' +
        'by solving $x^2 - 2x - 8 = 0$.',
    },
    hints: [
      'The $y$-intercept is $(0, -8)$ and the axis is $x = 1$. What is $y$ at $x = 1$?',
      'For the crossings, set $y = 0$ and factorise: which two numbers multiply to $-8$ and add to $-2$?',
      '$(x - 4)(x + 2) = 0$. A bracket is zero when $x$ equals the *opposite* of the number inside.',
    ],
    solution:
      '$y$-intercept: $(0, -8)$. Axis: $x = -\\frac{-2}{2} = 1$. Vertex: $y = 1 - 2 - 8 = -9$, so ' +
      '$(1, -9)$. $x$-intercepts: $x^2 - 2x - 8 = (x - 4)(x + 2) = 0$, so $x = 4$ or $x = -2$ — ' +
      'symmetric about $x = 1$, as they must be.\n\n$$x = 4 \\text{ or } x = -2$$',
    misconceptionCodes: ['function-graphs.intercept-sign-flipped', 'function-graphs.vertex-x-only'],
  },

  // identify-vertices-axes — tier 3
  {
    id: 'function-graphs.maximum-height',
    skillIds: ['function-graphs.identify-vertices-axes', 'function-graphs.graph-quadratic-functions'],
    tier: 3,
    statement:
      'A firework is launched from the ground. Its height in metres after $t$ seconds is ' +
      '$h = -5t^2 + 20t$. What is the greatest height it reaches?',
    answer: { type: 'number', value: 20, tolerance: 0, unit: 'm' },
    cpaPrompts: {
      concrete:
        'It goes up, slows, hangs for an instant, and falls. The highest point is the moment it ' +
        'hangs. It is on the ground at $t = 0$ and again at $t = 4$ — when is it highest?',
      pictorial:
        'Sketch $h$ against $t$: a hill starting and ending on the axis at $t = 0$ and $t = 4$. The ' +
        'top of the hill is on the fold line halfway between.',
      abstract:
        'The greatest height is the $h$-coordinate of the vertex. Axis $t = -\\frac{b}{2a} = -\\frac{20}{2(-5)}$, then substitute.',
    },
    hints: [
      'The greatest height is at the turning point. When does that happen — use $-\\frac{b}{2a}$ with $a = -5$, $b = 20$.',
      'The top is at $t = 2$. Substitute $t = 2$ to get the height itself.',
    ],
    solution:
      'Axis: $t = -\\frac{20}{2(-5)} = 2$. Height there: $h = -5(2)^2 + 20(2) = -20 + 40 = 20$. ' +
      'The greatest height is 20 m, reached after 2 seconds. (It lands at $t = 4$: $-80 + 80 = 0$.)\n\n$$20 \\text{ m}$$',
    misconceptionCodes: ['function-graphs.vertex-x-only', 'function-graphs.negate-then-square'],
  },
  {
    id: 'function-graphs.minimum-cost',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 3,
    statement:
      'A workshop finds that the cost in dollars of making a batch of $x$ items is ' +
      '$C = 2x^2 - 12x + 30$. What is the lowest possible cost of a batch?',
    answer: { type: 'number', value: 12, tolerance: 0, unit: 'dollars' },
    cpaPrompts: {
      concrete:
        'Make a table for $x = 0$ to $6$. The cost falls, bottoms out, then rises. Which batch size ' +
        'is cheapest, and what does it cost?',
      pictorial:
        'Sketch $C$ against $x$: a bowl. The cheapest batch is the bottom of the bowl, on the fold line.',
      abstract:
        'The minimum is the $C$-value at the vertex: $x = -\\frac{b}{2a} = -\\frac{-12}{4}$, then substitute.',
    },
    hints: [
      'The lowest cost is at the turning point. Find its $x$ with $-\\frac{b}{2a}$, $a = 2$, $b = -12$.',
      '$x = 3$. Now substitute $x = 3$ to find the cost — the question asks for the cost, not the batch size.',
    ],
    solution:
      'Axis: $x = -\\frac{-12}{2(2)} = 3$. Cost there: $C = 2(9) - 36 + 30 = 12$. The lowest ' +
      'possible cost is $\\$12$, for a batch of 3 items.\n\n$$\\$12$$',
    misconceptionCodes: ['function-graphs.vertex-x-only'],
  },

  // identify-vertices-axes — tier 4: SSDD set on y = -x^2 + 4x + 5
  {
    id: 'function-graphs.parabola-vertex',
    skillIds: ['function-graphs.identify-vertices-axes', 'function-graphs.graph-quadratic-functions'],
    tier: 4,
    sequence: { family: 'function-graphs.ssdd-parabola', position: 1 },
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
    tier: 4,
    sequence: { family: 'function-graphs.ssdd-parabola', position: 2 },
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
    misconceptionCodes: ['function-graphs.negate-then-square', 'function-graphs.intercept-sign-flipped'],
  },
  {
    id: 'function-graphs.ssdd-value-at-one',
    skillIds: ['function-graphs.identify-vertices-axes', 'function-graphs.graph-quadratic-functions'],
    tier: 4,
    sequence: { family: 'function-graphs.ssdd-parabola', position: 3 },
    statement:
      'For the same curve $y = -x^2 + 4x + 5$, find the value of $y$ when $x = 1$. Then use the ' +
      'symmetry of the curve to say which other value of $x$ gives the same $y$.',
    answer: { type: 'number', value: 8, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'One second after the throw, how high is the ball? And since it comes down the way it went ' +
        'up, at what other time is it at that same height?',
      pictorial:
        'Mark $x = 1$ on your sketch and read up to the curve. The fold is at $x = 2$; $x = 1$ is one ' +
        'step left of it. Which $x$ is one step right?',
      abstract:
        'Substitute $x = 1$ term by term. The mirror image of $x = 1$ across the axis $x = 2$ is $x = 3$.',
    },
    hints: [
      'Substitute $x = 1$: $-(1)^2 + 4(1) + 5$.',
      '$y = 8$. The axis is $x = 2$, and $1$ is one unit left of it, so the matching $x$ is one unit right.',
    ],
    solution:
      '$y = -(1)^2 + 4(1) + 5 = -1 + 4 + 5 = 8$. By symmetry about $x = 2$, $x = 3$ gives the same ' +
      'value: $-9 + 12 + 5 = 8$. ✓\n\n$$y = 8 \\text{ (also at } x = 3)$$',
    misconceptionCodes: ['function-graphs.negate-then-square'],
  },
  {
    id: 'function-graphs.ssdd-solve-equals-five',
    skillIds: ['function-graphs.identify-vertices-axes', 'quadratic-factorisation.solve-quadratic-equations'],
    tier: 4,
    sequence: { family: 'function-graphs.ssdd-parabola', position: 4 },
    statement:
      'For the same curve $y = -x^2 + 4x + 5$, find both values of $x$ for which $y = 5$.',
    answer: { type: 'set', values: [0, 4], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The ball starts 5 m up. When is it at 5 m again on the way down? Two moments — one of ' +
        'them is the start.',
      pictorial:
        'Draw the horizontal line $y = 5$ across your sketch. It cuts the curve twice, mirror images ' +
        'across the fold at $x = 2$. One crossing is on the $y$-axis.',
      abstract: 'Set $-x^2 + 4x + 5 = 5$, so $-x^2 + 4x = 0$. Factorise: $x(4 - x) = 0$.',
    },
    hints: [
      'Put $y = 5$ into the equation: $5 = -x^2 + 4x + 5$. Subtract 5 from both sides.',
      '$-x^2 + 4x = 0$. Take out the common factor $x$: $x(-x + 4) = 0$.',
      'Either $x = 0$ or $-x + 4 = 0$.',
    ],
    solution:
      '$-x^2 + 4x + 5 = 5 \\implies -x^2 + 4x = 0 \\implies x(4 - x) = 0$, so $x = 0$ or $x = 4$. ' +
      'These are symmetric about the axis $x = 2$, and $(0, 5)$ is the $y$-intercept.\n\n$$x = 0 \\text{ or } x = 4$$',
    misconceptionCodes: ['function-graphs.intercept-sign-flipped', 'function-graphs.intercepts-confused'],
  },

  // identify-vertices-axes — diagnostics
  {
    id: 'function-graphs.dx-vertex-x-only',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 'diagnostic',
    statement: 'What is the vertex of the parabola $y = -x^2 + 6x - 5$?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$x = 3$', misconceptionCode: 'function-graphs.vertex-x-only' },
        { label: 'B', value: '$(3, 4)$' },
        { label: 'C', value: '$(3, 22)$', misconceptionCode: 'function-graphs.negate-then-square' },
      ],
    },
    cpaPrompts: {
      concrete:
        'The fold line is $x = 3$. Is the top of the hill a line, or a single point on that line? ' +
        'How high is it?',
      pictorial:
        'Draw the dashed axis at $x = 3$. The vertex is the one point where the curve touches it — ' +
        'you need both coordinates.',
      abstract: 'Axis $x = -\\frac{6}{2(-1)} = 3$. Then $y = -(3)^2 + 6(3) - 5$: square first, then negate.',
    },
    hints: [
      '$x = 3$ is the axis of symmetry, a line. The vertex is a point on it — find its $y$.',
      '$-(3)^2 = -9$, so $y = -9 + 18 - 5$.',
    ],
    solution:
      'Axis: $x = -\\frac{6}{2(-1)} = 3$. Then $y = -(3)^2 + 6(3) - 5 = -9 + 18 - 5 = 4$. The vertex ' +
      'is $(3, 4)$. "$x = 3$" is only the axis; $(3, 22)$ comes from computing $-x^2$ as $+9$.\n\n$$(3, 4)$$',
    misconceptionCodes: ['function-graphs.vertex-x-only', 'function-graphs.negate-then-square'],
  },
  {
    id: 'function-graphs.dx-intercept-sign-flipped',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 'diagnostic',
    statement: 'Where does the graph of $y = x^2 - 4x - 5$ cross the $x$-axis?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$x = -5$ and $x = 1$', misconceptionCode: 'function-graphs.intercept-sign-flipped' },
        { label: 'B', value: '$x = 5$ and $x = -1$' },
        { label: 'C', value: '$x = -5$ only', misconceptionCode: 'function-graphs.intercepts-confused' },
      ],
    },
    cpaPrompts: {
      concrete:
        'The curve is on the $x$-axis when its height is zero. Which $x$ values make $x^2 - 4x - 5$ ' +
        'exactly zero? Try each candidate by substituting.',
      pictorial:
        'Sketch the bowl with its $y$-intercept at $(0, -5)$. It crosses the horizontal axis twice, ' +
        'either side of the fold at $x = 2$.',
      abstract: 'Set $y = 0$: $(x - 5)(x + 1) = 0$. Each bracket is zero at the opposite of its number.',
    },
    hints: [
      'Set $y = 0$ and factorise: $(x - 5)(x + 1) = 0$.',
      '$(x - 5) = 0$ when $x = 5$, not $-5$. Check by substituting: $25 - 20 - 5 = 0$. ✓',
    ],
    solution:
      '$x^2 - 4x - 5 = (x - 5)(x + 1) = 0$, so $x = 5$ or $x = -1$. Check: $x = -5$ gives ' +
      '$25 + 20 - 5 = 40 \\ne 0$, so the flipped signs are wrong; and $-5$ on its own is the ' +
      '$y$-intercept, not an $x$-intercept.\n\n$$x = 5 \\text{ or } x = -1$$',
    misconceptionCodes: ['function-graphs.intercept-sign-flipped', 'function-graphs.intercepts-confused'],
  },
  {
    id: 'function-graphs.dx-intercepts-confused',
    skillIds: ['function-graphs.identify-vertices-axes'],
    tier: 'diagnostic',
    statement: 'Find the $x$-intercepts of the graph of $y = x^2 - 6x + 8$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$(0, 8)$', misconceptionCode: 'function-graphs.intercepts-confused' },
        { label: 'B', value: '$(2, 0)$ and $(4, 0)$' },
        { label: 'C', value: '$(-2, 0)$ and $(-4, 0)$', misconceptionCode: 'function-graphs.intercept-sign-flipped' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Walk along the $x$-axis. What is $y$ at every step? So to find where the curve meets the ' +
        'axis, which letter do you set to zero — and which do you solve for?',
      pictorial:
        'Sketch the bowl. It meets the vertical axis once, at $(0, 8)$, and the horizontal axis twice. ' +
        'The question asks about the horizontal axis.',
      abstract: 'Set $y = 0$: $x^2 - 6x + 8 = (x - 2)(x - 4) = 0$.',
    },
    hints: [
      'On the $x$-axis, $y = 0$. Put $y = 0$ into the equation and solve for $x$.',
      '$(x - 2)(x - 4) = 0$. A bracket is zero when $x$ is the opposite of the number inside it.',
    ],
    solution:
      'Setting $y = 0$: $(x - 2)(x - 4) = 0$, so $x = 2$ or $x = 4$; the $x$-intercepts are $(2, 0)$ ' +
      'and $(4, 0)$. $(0, 8)$ is where the curve crosses the *y*-axis; $(-2, 0)$ and $(-4, 0)$ come ' +
      'from reading the brackets with the wrong sign.\n\n$$(2, 0) \\text{ and } (4, 0)$$',
    misconceptionCodes: ['function-graphs.intercepts-confused', 'function-graphs.intercept-sign-flipped'],
  },
];
