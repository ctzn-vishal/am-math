import type { Problem, SkillNode } from '@/lib/content/schema';

/**
 * Unit 14 — More About Quadratic Equations. Hand-authored.
 *
 * Source: docs/Implementation Manual (algebra tiles for completing the square, the
 * split-coefficient area grid) and the Chapter 14 worked examples in the content spec.
 *
 * The through-line: completing the square is a *physical* act — split the $x$-tiles in two,
 * lay them on two sides of the $x^2$ square, and see the empty corner that $(b/2)^2$ fills.
 * The quadratic formula is that same act done once, in general, and the discriminant is
 * what is left under the root when it is finished. The $\pm$ is not a decoration: a square
 * has two square roots, and forgetting one loses half the answer.
 */

export const quadraticMethodsSkills: SkillNode[] = [
  {
    id: 'quadratic-methods.solve-quadratic-equations',
    title: 'Solve quadratic equations by completing the square',
    summary:
      'Turn $x^2 + bx$ into a perfect square plus a correction by adding $(b/2)^2$, then solve ' +
      'by taking both square roots.',
    prerequisites: ['quadratic-factorisation.solve-quadratic-equations', 'expansion.special-algebraic-identities'],
    cpa: {
      concrete:
        'Algebra tiles: one $x^2$ square and six $x$ bars. Split the bars into two sets of three ' +
        'and lay one set along the right of the square and the other along the bottom. The shape ' +
        'is almost a square, $(x + 3)$ on each side — with an empty $3 \\times 3$ corner. Nine ' +
        'unit tiles complete it. That nine is $(6/2)^2$.',
      pictorial:
        'The split-coefficient area grid: a $2 \\times 2$ grid with $x$ and $3$ as headers on ' +
        'both axes, cells $x^2$, $3x$, $3x$ and a shaded missing corner of 9. ' +
        '$x^2 + 6x = (x+3)^2 - 9$ is read straight off the picture.',
      abstract:
        '$x^2 + bx = \\left(x + \\frac{b}{2}\\right)^2 - \\left(\\frac{b}{2}\\right)^2$. Move the ' +
        'constant across, add $(b/2)^2$ to both sides, write the left as a square, take ' +
        '$\\pm$ the root, and finish solving.',
    },
    formulas: ['x^2 + bx = \\left(x + \\tfrac{b}{2}\\right)^2 - \\left(\\tfrac{b}{2}\\right)^2'],
    misconceptions: [
      {
        code: 'quadratic-methods.missing-plus-minus',
        description:
          'Takes only the positive square root of both sides — writes $x - 3 = \\sqrt{11}$ and ' +
          'finds one solution where there are two.',
        probe:
          'What is $(-3)^2$? And $3^2$? So if a number squared is 9, how many numbers could it ' +
          'have been? What does that say about $(x - 3)^2 = 11$?',
        correction:
          'Every positive number has two square roots, one positive and one negative, because a ' +
          'negative squared is positive. So $(x-3)^2 = 11$ gives $x - 3 = \\pm\\sqrt{11}$ and two ' +
          'solutions, $3 \\pm \\sqrt{11}$.',
      },
    ],
    suggestedVisual: 'algebra_tiles',
  },
  {
    id: 'quadratic-methods.derive-quadratic-formula',
    title: 'Derive and apply the quadratic formula',
    summary:
      'See the formula as completing the square on $ax^2 + bx + c = 0$ in general, and apply ' +
      'it with every sign handled correctly.',
    prerequisites: ['quadratic-methods.solve-quadratic-equations'],
    cpa: {
      concrete:
        'Complete the square on the tiles again, but this time with the coefficients left as ' +
        'letters on the tiles: $a$ copies of $x^2$, $b$ copies of $x$. The same moves — divide ' +
        'by $a$, halve the middle, fill the corner — produce the formula. Nothing new happened; ' +
        'it was just done once for every quadratic at the same time.',
      pictorial:
        'The general area grid with headers $x$ and $\\frac{b}{2a}$, and the corner ' +
        '$\\frac{b^2}{4a^2}$ shaded. Beside it, the derivation lined up step by step against the ' +
        'numeric example so each line of algebra matches a move on the grid.',
      abstract:
        '$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$. Identify $a$, $b$, $c$ *with their signs* ' +
        'from the standard form, substitute with brackets, and evaluate the discriminant first.',
    },
    formulas: ['x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'],
    misconceptions: [
      {
        code: 'quadratic-methods.sign-slip-in-formula',
        description:
          'Evaluates $-(-3)$ as $-3$, or $(-3)^2$ as $-9$, or $-4(2)(-3)$ as $-24$, inside the ' +
          'quadratic formula.',
        probe:
          'Write each substituted value in its own bracket: $-(-3)$, $(-3)^2$, $-4(2)(-3)$. Take ' +
          'them one at a time — how many negatives are being multiplied in each, and what sign ' +
          'does that give?',
        correction:
          'Brackets around each substituted value keep the signs honest: $-(-3) = 3$, ' +
          '$(-3)^2 = 9$, $-4(2)(-3) = +24$, so the discriminant is $9 + 24 = 33$. A sign lost ' +
          'here changes both roots.',
      },
    ],
    suggestedVisual: 'area_grid',
  },
  {
    id: 'quadratic-methods.determine-number-real',
    title: 'Determine the number of real roots using the discriminant',
    summary:
      'Read how many times a parabola crosses the $x$-axis from the sign of $b^2 - 4ac$ ' +
      'without solving the equation.',
    prerequisites: ['quadratic-methods.derive-quadratic-formula', 'function-graphs.identify-vertices-axes'],
    cpa: {
      concrete:
        'A U-shaped wire held over a table edge. Lower it until it touches: one contact point. ' +
        'Lower it further: two. Hold it above: none. The discriminant is the number that says ' +
        'which of those three the equation is in.',
      pictorial:
        'Three parabolas on one set of axes: one crossing the $x$-axis twice, one touching it at ' +
        'the vertex, one floating above it. Labelled $\\Delta > 0$, $\\Delta = 0$, $\\Delta < 0$.',
      abstract:
        '$\\Delta = b^2 - 4ac$. Positive: two distinct real roots. Zero: one repeated root. ' +
        'Negative: no real roots, because a negative number has no real square root.',
    },
    formulas: ['\\Delta = b^2 - 4ac'],
    misconceptions: [
      {
        code: 'quadratic-methods.zero-discriminant-no-roots',
        description:
          'Reads $\\Delta = 0$ as "no roots" — or as two roots — instead of one repeated root ' +
          'where the parabola touches the axis.',
        probe:
          'If the number under the square root is exactly zero, what does $\\pm\\sqrt{0}$ add or ' +
          'take away? How many *different* values of $x$ does the formula give?',
        correction:
          '$\\pm\\sqrt{0}$ is just 0, so the two branches of the formula collapse to one value: ' +
          '$x = -\\frac{b}{2a}$. The parabola touches the axis at its vertex — one root, counted ' +
          'twice.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
  {
    id: 'quadratic-methods.solve-fractional-geometric',
    title: 'Solve fractional and geometric equations reducible to quadratic form',
    summary:
      'Clear fractions or set up a geometric relationship to reach $ax^2 + bx + c = 0$, solve ' +
      'with the formula, and reject any root the situation forbids.',
    prerequisites: ['quadratic-methods.derive-quadratic-formula', 'algebraic-fractions.solve-fractional-equations'],
    cpa: {
      concrete:
        'A balance with fractions on both pans. Multiplying every piece on both pans by ' +
        '$x(x+1)$ keeps it level and clears the fractions — and what is left is a quadratic ' +
        'because two $x$-terms got multiplied together in the process.',
      pictorial:
        'The equation with the LCD drawn above it and an arrow to each term, then the resulting ' +
        'expression rearranged into a single row equal to zero. Excluded values marked on a ' +
        'number line before solving.',
      abstract:
        'Note restrictions; multiply through by the LCD; expand; collect into standard form; ' +
        'apply the formula; check roots against the restrictions and, for geometry, against ' +
        'sense (a length cannot be negative).',
    },
    formulas: ['\\text{LCD} \\times \\text{(each term)} \\implies ax^2 + bx + c = 0'],
    misconceptions: [
      {
        code: 'quadratic-methods.not-in-standard-form',
        description:
          'Reads $a$, $b$ and $c$ off the equation before all terms are on one side, so the ' +
          'coefficients — and especially their signs — are wrong.',
        probe:
          'The formula needs the equation to look like $ax^2 + bx + c = 0$. Does yours have a ' +
          'zero on the right-hand side yet? What is $c$ once everything is moved across?',
        correction:
          'The formula is only valid for $ax^2 + bx + c = 0$. Bring every term to one side first: ' +
          '$5x + 3 = 2x^2 + 2x$ becomes $2x^2 - 3x - 3 = 0$, so $a = 2$, $b = -3$, $c = -3$.',
      },
    ],
    suggestedVisual: 'bar_model',
  },
];

export const quadraticMethodsProblems: Problem[] = [
  {
    id: 'quadratic-methods.complete-the-square',
    skillIds: ['quadratic-methods.solve-quadratic-equations'],
    tier: 1,
    statement:
      'Solve $x^2 - 6x - 2 = 0$ by completing the square. Give both answers correct to 2 ' +
      'decimal places.',
    answer: { type: 'set', values: [6.32, -0.32], tolerance: 0.011 },
    cpaPrompts: {
      concrete:
        'Take one $x^2$ tile and six negative $x$ bars. Split the bars three and three and lay ' +
        'them along two sides of the square. What size is the corner that is missing?',
      pictorial:
        'Draw the area grid with headers $x$ and $-3$ on each axis. Fill in $x^2$, $-3x$, $-3x$ ' +
        'and the corner. What must be added to $x^2 - 6x$ to make the whole square?',
      abstract:
        'Move the constant across, add $(b/2)^2 = 9$ to both sides, write $(x-3)^2 = 11$, and ' +
        'take both square roots.',
    },
    hints: [
      'Move the $-2$ to the other side. What value must you add to $x^2 - 6x$ to make it a ' +
        'perfect square?',
      'Take half of $-6$, which is $-3$, and square it to get $9$. Add 9 to *both* sides.',
      'Rewrite the left as $(x - 3)^2 = 11$. Take the square root of both sides — both roots — ' +
        'and add 3.',
    ],
    solution:
      '$x^2 - 6x = 2$. Add $(-3)^2 = 9$ to both sides: $x^2 - 6x + 9 = 11$, so $(x - 3)^2 = 11$ ' +
      'and $x - 3 = \\pm\\sqrt{11}$.\n\n$$x = 3 \\pm \\sqrt{11} \\approx 6.32 \\text{ or } ' +
      '-0.32.$$',
    misconceptionCodes: ['quadratic-methods.missing-plus-minus'],
  },
  {
    id: 'quadratic-methods.discriminant-count',
    skillIds: ['quadratic-methods.determine-number-real'],
    tier: 1,
    statement:
      'Without solving it, find how many distinct real roots the equation $x^2 + 6x + 9 = 0$ ' +
      'has.',
    answer: { type: 'number', value: 1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Picture the parabola $y = x^2 + 6x + 9$ as a wire being lowered onto a table edge. ' +
        'Does it cross the edge twice, touch it once, or hang above it? The discriminant decides.',
      pictorial:
        'Sketch the three cases: crossing twice, touching once, not touching. Compute ' +
        '$b^2 - 4ac$ and decide which picture this equation is.',
      abstract:
        'Evaluate $\\Delta = b^2 - 4ac$ with $a = 1$, $b = 6$, $c = 9$ and interpret its sign.',
    },
    hints: [
      'The discriminant $b^2 - 4ac$ tells you how many real roots there are. Identify $a$, $b$ ' +
        'and $c$.',
      'Compute $6^2 - 4(1)(9)$. Is it positive, zero or negative?',
    ],
    solution:
      '$\\Delta = 6^2 - 4(1)(9) = 36 - 36 = 0$. A zero discriminant means the parabola touches ' +
      'the $x$-axis at its vertex: one repeated root.\n\n$$\\text{One distinct real root } ' +
      '(x = -3).$$',
    misconceptionCodes: ['quadratic-methods.zero-discriminant-no-roots'],
  },
  {
    id: 'quadratic-methods.fractional-to-quadratic',
    skillIds: ['quadratic-methods.solve-fractional-geometric', 'quadratic-methods.derive-quadratic-formula'],
    tier: 2,
    statement:
      'Solve $\\dfrac{2}{x + 1} + \\dfrac{3}{x} = 2$. Give both answers correct to 2 decimal ' +
      'places.',
    answer: { type: 'set', values: [2.19, -0.69], tolerance: 0.011 },
    cpaPrompts: {
      concrete:
        'Two fractions on a balance, with different denominators. What can every piece on both ' +
        'pans be multiplied by so that no fractions remain — and which values of $x$ are ' +
        'forbidden before you start?',
      pictorial:
        'Write $x(x + 1)$ above the equation with an arrow to each of the three terms. Under each ' +
        'arrow, what survives? Then move everything to one side of a single row.',
      abstract:
        'Multiply through by $x(x+1)$, expand, rearrange to $2x^2 - 3x - 3 = 0$, and apply the ' +
        'quadratic formula with care over signs.',
    },
    hints: [
      'Clear the fractions by multiplying every term by the common denominator $x(x + 1)$. Note ' +
        'that $x \\ne 0$ and $x \\ne -1$.',
      'Rearrange all terms to one side to get the standard form $2x^2 - 3x - 3 = 0$.',
      'Substitute $a = 2$, $b = -3$, $c = -3$ into $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$, ' +
        'putting each value in its own bracket.',
    ],
    solution:
      'Restrictions $x \\ne -1, 0$. Multiplying by $x(x+1)$: $2x + 3(x + 1) = 2x(x + 1)$, so ' +
      '$5x + 3 = 2x^2 + 2x$ and $2x^2 - 3x - 3 = 0$.\n\n$$x = \\frac{3 \\pm \\sqrt{9 + 24}}{4} = ' +
      '\\frac{3 \\pm \\sqrt{33}}{4} \\approx 2.19 \\text{ or } -0.69.$$\n\nNeither is an ' +
      'excluded value, so both are valid.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula', 'quadratic-methods.not-in-standard-form'],
  },
];
