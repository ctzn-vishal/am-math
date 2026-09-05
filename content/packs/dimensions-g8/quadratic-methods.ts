import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';

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
 *
 * Marking note: the `set` checker reads plain numbers only, so every two-root item asks for
 * 2 d.p. Where the exact surd is the point, the item asks for *one* root as a `number`, which
 * the checker can evaluate from "1 + 2√2" or "3.83" alike.
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
      {
        code: 'quadratic-methods.half-b-squared-error',
        description:
          'Adds $b^2$ to complete the square — 36 for $x^2 - 6x$ — instead of $(b/2)^2 = 9$, or ' +
          'adds $b/2$ without squaring it.',
        probe:
          'Lay the six $x$-bars three along one side of the $x^2$ tile and three along the other. ' +
          'How long is each side of the empty corner? So how many unit tiles does it take to fill?',
        correction:
          'The $x$-bars are split in two and each half becomes one side of the corner, so the ' +
          'corner is $(b/2) \\times (b/2)$, not $b \\times b$. For $x^2 - 6x$ the corner is ' +
          '$3 \\times 3 = 9$, and $x^2 - 6x + 9 = (x - 3)^2$ — check it by expanding.',
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
        'Repeat the tile construction for several equations, including one whose leading ' +
        'coefficient is not 1. Each time, divide first so there is one $x^2$ tile, split the ' +
        '$x$-bars equally between two sides and fill the missing corner. Record the same moves ' +
        'beside each example before replacing the numbers by $a$, $b$ and $c$.',
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
      {
        code: 'quadratic-methods.divides-root-only',
        description:
          'Divides only the square root by $2a$, reading $\\frac{-b \\pm \\sqrt{\\Delta}}{2a}$ as ' +
          '$-b \\pm \\frac{\\sqrt{\\Delta}}{2a}$, so both roots are shifted by $b$ too far.',
        probe:
          'The fraction bar in the formula sits under the whole of $-b \\pm \\sqrt{\\Delta}$. If ' +
          'you had $\\frac{4 + 6}{2}$, would you divide only the 6 by 2? What does that give, and ' +
          'what should it give?',
        correction:
          'The fraction bar is a bracket: $\\frac{-b \\pm \\sqrt{\\Delta}}{2a}$ means ' +
          '$(-b \\pm \\sqrt{\\Delta}) \\div 2a$, so $-b$ is divided by $2a$ as well. For ' +
          '$x^2 + 2x - 4 = 0$ that is $\\frac{-2 \\pm \\sqrt{20}}{2} = -1 \\pm \\sqrt{5}$, not ' +
          '$-2 \\pm \\sqrt{5}$. Substituting a root back is the check.',
      },
    ],
    suggestedVisual: 'area_grid',
  },
  {
    id: 'quadratic-methods.determine-number-real',
    title: 'Use the discriminant to count real roots',
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
    title: 'Reduce fractional and geometric equations to quadratics',
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

const S_SQUARE = 'quadratic-methods.solve-quadratic-equations';
const S_FORMULA = 'quadratic-methods.derive-quadratic-formula';
const S_DISC = 'quadratic-methods.determine-number-real';
const S_REDUCE = 'quadratic-methods.solve-fractional-geometric';

export const quadraticMethodsProblems: Problem[] = [
  // ==========================================================================
  // §14.2 Completing the square
  // Tier 1 — family complete-square-a: x²+6x, x²+8x, x²−6x, x²+5x, 2x²+8x, then solve
  // three equations with the same left-hand side, ending with one that has no real root.
  // ==========================================================================
  {
    id: 'quadratic-methods.cs-seq-1',
    skillIds: [S_SQUARE],
    tier: 1,
    sequence: { family: 'quadratic-methods.complete-square-a', position: 1 },
    statement: 'Write $x^2 + 6x$ in the form $(x + p)^2 + q$.',
    answer: { type: 'expression', value: '(x+3)^2-9', variables: ['x'] },
    cpaPrompts: {
      concrete:
        'Put down one $x^2$ tile and six $x$ bars. Lay three bars along the right of the square ' +
        'and three along the bottom. What shape is it nearly — and what is missing from the corner?',
      pictorial:
        'Draw a $2 \\times 2$ grid with headers $x$ and $3$ on both axes. Fill in $x^2$, $3x$ and ' +
        '$3x$. What must go in the fourth cell to make the whole grid a square, and is it part ' +
        'of $x^2 + 6x$?',
      abstract:
        'Half of 6 is 3, so the bracket is $(x + 3)^2$. Expand it: what extra constant appeared ' +
        'that was not in $x^2 + 6x$, and what do you do about it?',
    },
    hints: [
      'Halve the coefficient of $x$. That number goes inside the bracket.',
      '$(x + 3)^2 = x^2 + 6x + 9$. The 9 was not there originally, so it has to be taken away again.',
      '$x^2 + 6x = (x + 3)^2 - 9$. Check by expanding the right-hand side.',
    ],
    solution:
      'Half of 6 is 3, and $3^2 = 9$. So $x^2 + 6x = (x + 3)^2 - 9$.\n\nCheck: ' +
      '$(x + 3)^2 - 9 = x^2 + 6x + 9 - 9 = x^2 + 6x$. ✓',
    misconceptionCodes: ['quadratic-methods.half-b-squared-error'],
    figure: {
      kind: 'algebra_tiles',
      title: 'One x² tile and six x bars',
      caption: 'Split the bars evenly along two sides of the square. Look at the corner.',
      tiles: [
        { type: 'x2', sign: 'positive', count: 1 },
        { type: 'x', sign: 'positive', count: 6 },
      ],
      arrangement: 'square',
      showZeroPairs: false,
    },
  },
  {
    id: 'quadratic-methods.cs-seq-2',
    skillIds: [S_SQUARE],
    tier: 1,
    sequence: { family: 'quadratic-methods.complete-square-a', position: 2 },
    expect:
      'The $6x$ became $8x$. Before you complete the square, predict: what goes inside the ' +
      'bracket now, and does the constant outside get bigger or smaller than $-9$?',
    statement: 'Write $x^2 + 8x$ in the form $(x + 4)^2 + q$. What is the value of $q$?',
    answer: { type: 'number', value: -16, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Eight $x$ bars now — four along each side of the $x^2$ tile. How many unit tiles does ' +
        'the empty corner take this time?',
      pictorial:
        'Headers $x$ and $4$ on both axes. Fill the three cells you have. The fourth cell is the ' +
        'corner you had to borrow — what is its area?',
      abstract:
        '$(x + 4)^2$ expands to $x^2 + 8x + 16$. The 16 must be subtracted to get back to ' +
        '$x^2 + 8x$. What is $q$?',
    },
    hints: [
      'Expand $(x + 4)^2$ and compare it with $x^2 + 8x$.',
      'The expansion has an extra $+16$, so $q$ must undo it.',
    ],
    solution:
      '$(x + 4)^2 = x^2 + 8x + 16$, so $x^2 + 8x = (x + 4)^2 - 16$ and $q = -16$.\n\n' +
      'Pattern: $q = -(8/2)^2 = -16$.',
    misconceptionCodes: ['quadratic-methods.half-b-squared-error'],
  },
  {
    id: 'quadratic-methods.cs-seq-3',
    skillIds: [S_SQUARE],
    tier: 1,
    sequence: { family: 'quadratic-methods.complete-square-a', position: 3 },
    expect:
      'The $+6x$ became $-6x$. Which sign inside the bracket flips, and does the constant ' +
      'outside the bracket change at all?',
    statement: 'Write $x^2 - 6x$ in the form $(x + p)^2 + q$.',
    answer: { type: 'expression', value: '(x-3)^2-9', variables: ['x'] },
    cpaPrompts: {
      concrete:
        'Six *negative* $x$ bars this time, three along each side of the $x^2$ tile. The corner ' +
        'is $(-3) \\times (-3)$. Is that corner positive or negative?',
      pictorial:
        'Headers $x$ and $-3$ on both axes. Fill in $x^2$, $-3x$, $-3x$ and work out the corner. ' +
        'Compare the grid with the one for $x^2 + 6x$ — what is the only difference?',
      abstract:
        'Half of $-6$ is $-3$, so the bracket is $(x - 3)^2$. Expand it: is the constant that ' +
        'appears positive or negative, and what do you subtract?',
    },
    hints: [
      'Half of $-6$ is $-3$. That is what goes inside the bracket.',
      '$(-3)^2 = 9$, not $-9$. So $(x - 3)^2 = x^2 - 6x + 9$.',
      '$x^2 - 6x = (x - 3)^2 - 9$. Only the sign inside the bracket changed.',
    ],
    solution:
      'Half of $-6$ is $-3$ and $(-3)^2 = 9$. So $x^2 - 6x = (x - 3)^2 - 9$.\n\nCheck: ' +
      '$(x-3)^2 - 9 = x^2 - 6x + 9 - 9 = x^2 - 6x$. ✓ The constant outside is still $-9$ ' +
      'because a negative squared is positive.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula', 'quadratic-methods.half-b-squared-error'],
    figure: {
      kind: 'algebra_tiles',
      title: 'One x² tile and six negative x bars',
      caption: 'The bars are negative now. Is the corner that completes the square negative too?',
      tiles: [
        { type: 'x2', sign: 'positive', count: 1 },
        { type: 'x', sign: 'negative', count: 6 },
      ],
      arrangement: 'square',
      showZeroPairs: false,
    },
  },
  {
    id: 'quadratic-methods.cs-seq-4',
    skillIds: [S_SQUARE],
    tier: 1,
    sequence: { family: 'quadratic-methods.complete-square-a', position: 4 },
    expect:
      'The coefficient of $x$ is $5$ now — odd. Predict: can the number inside the bracket ' +
      'still be a whole number? What will it be?',
    statement:
      '$x^2 + 5x$ can be written as $(x + p)^2 - \\dfrac{25}{4}$. What is the value of $p$? ' +
      'Give it as a fraction or a decimal.',
    answer: { type: 'number', value: 2.5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Five $x$ bars cannot be split into two equal whole groups. Cut one bar in half: now ' +
        'there are two and a half bars on each side. How wide is the corner?',
      pictorial:
        'Headers $x$ and $\\frac{5}{2}$ on both axes. The corner is $\\frac{5}{2} \\times ' +
        '\\frac{5}{2}$. Does that match the $\\frac{25}{4}$ in the question?',
      abstract:
        'The rule does not care whether $b$ is even: $p$ is always $b/2$. What is $5 \\div 2$?',
    },
    hints: [
      'Halve the coefficient of $x$, even though it is odd.',
      '$5 \\div 2 = \\frac{5}{2} = 2.5$. Check: $(2.5)^2 = 6.25 = \\frac{25}{4}$, which matches.',
    ],
    solution:
      '$p = \\frac{5}{2} = 2.5$, since $(x + \\frac{5}{2})^2 = x^2 + 5x + \\frac{25}{4}$.\n\n' +
      'So $x^2 + 5x = (x + \\frac{5}{2})^2 - \\frac{25}{4}$. The fraction is not a problem — the ' +
      'method is identical.',
    misconceptionCodes: ['quadratic-methods.half-b-squared-error'],
  },
  {
    id: 'quadratic-methods.cs-seq-5',
    skillIds: [S_SQUARE],
    tier: 1,
    sequence: { family: 'quadratic-methods.complete-square-a', position: 5 },
    expect:
      'There are now two $x^2$ tiles: $2x^2 + 8x$. You cannot build one square from two. ' +
      'What could you do first so the method still works, and what will sit in front of the bracket?',
    statement: 'Write $2x^2 + 8x$ in the form $a(x + p)^2 + q$.',
    answer: { type: 'expression', value: '2(x+2)^2-8', variables: ['x'] },
    cpaPrompts: {
      concrete:
        'Two $x^2$ tiles and eight $x$ bars make two identical piles: one $x^2$ and four bars ' +
        'each. Complete the square on *one* pile, then remember there are two of it.',
      pictorial:
        'Draw the grid for $x^2 + 4x$ with headers $x$ and $2$, corner 4. Then write "$\\times 2$" ' +
        'beside the whole grid. What does doubling do to the $-4$?',
      abstract:
        'Factor out the 2 first: $2(x^2 + 4x)$. Complete the square inside the bracket, then ' +
        'multiply the correction by 2 as well.',
    },
    hints: [
      'Take out the factor 2: $2x^2 + 8x = 2(x^2 + 4x)$.',
      'Inside the bracket, $x^2 + 4x = (x + 2)^2 - 4$.',
      'Now multiply the whole thing by 2: $2(x + 2)^2 - 8$. The $-4$ doubled too.',
    ],
    solution:
      '$2x^2 + 8x = 2(x^2 + 4x) = 2\\left[(x + 2)^2 - 4\\right] = 2(x + 2)^2 - 8$.\n\nCheck: ' +
      '$2(x^2 + 4x + 4) - 8 = 2x^2 + 8x + 8 - 8 = 2x^2 + 8x$. ✓',
    misconceptionCodes: ['quadratic-methods.half-b-squared-error', 'quadratic.monic-method-on-non-monic'],
  },
  {
    id: 'quadratic-methods.complete-the-square',
    skillIds: [S_SQUARE],
    tier: 1,
    sequence: { family: 'quadratic-methods.complete-square-a', position: 6 },
    expect:
      'Now it is an equation: $x^2 - 6x - 2 = 0$, with the $x^2 - 6x$ you already know how to ' +
      'square. Predict: after you write $(x - 3)^2 = \\ldots$, how many values of $x$ will there be?',
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
    id: 'quadratic-methods.cs-seq-7',
    skillIds: [S_SQUARE],
    tier: 1,
    sequence: { family: 'quadratic-methods.complete-square-a', position: 7 },
    expect:
      'Only the $-2$ became $+2$. Predict: what number will be on the right of ' +
      '$(x - 3)^2 = \\ldots$ now — bigger or smaller than 11 — and will the roots move closer ' +
      'together or further apart?',
    statement:
      'Solve $x^2 - 6x + 2 = 0$ by completing the square. Give both answers correct to 2 ' +
      'decimal places.',
    answer: { type: 'set', values: [5.65, 0.35], tolerance: 0.011 },
    cpaPrompts: {
      concrete:
        'Same tiles as before, same missing corner of 9. The only difference is the 2 unit ' +
        'tiles now sit on the same side as the square instead of the other. Where do they go?',
      pictorial:
        'Same grid, headers $x$ and $-3$. This time the $+2$ has to move across as $-2$, so the ' +
        'right-hand side is $-2 + 9$. What is it?',
      abstract:
        '$x^2 - 6x = -2$; add 9 to both sides: $(x - 3)^2 = 7$. Both square roots, then add 3.',
    },
    hints: [
      'Move the $+2$ across: $x^2 - 6x = -2$. Then add 9 to both sides as before.',
      '$(x - 3)^2 = 7$, so $x - 3 = \\pm\\sqrt{7}$.',
      '$x = 3 \\pm \\sqrt{7}$. $\\sqrt{7} \\approx 2.65$, so the roots are about $5.65$ and $0.35$.',
    ],
    solution:
      '$x^2 - 6x = -2$. Adding 9: $(x - 3)^2 = 7$, so $x - 3 = \\pm\\sqrt{7}$ and ' +
      '$x = 3 \\pm \\sqrt{7}$.\n\n$$x \\approx 5.65 \\text{ or } 0.35.$$\n\nThe right-hand ' +
      'side shrank from 11 to 7, so the roots sit closer to 3 than before.',
    misconceptionCodes: ['quadratic-methods.missing-plus-minus'],
  },
  {
    id: 'quadratic-methods.cs-seq-8',
    skillIds: [S_SQUARE],
    tier: 1,
    sequence: { family: 'quadratic-methods.complete-square-a', position: 8 },
    expect:
      'The constant is $+12$ now. Predict: what will the right-hand side of $(x - 3)^2 = \\ldots$ ' +
      'be — and can a squared number equal that?',
    statement:
      'Try to solve $x^2 - 6x + 12 = 0$ by completing the square. How many real solutions ' +
      'does it have?',
    answer: { type: 'number', value: 0, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Complete the square as before: the corner is still 9. But 12 unit tiles have to move ' +
        'across, leaving $-12 + 9 = -3$. Can a square of tiles have negative area?',
      pictorial:
        'Sketch $y = (x - 3)^2 + 3$: a U-shape whose lowest point is at height 3. Does it ever ' +
        'reach the $x$-axis?',
      abstract:
        '$(x - 3)^2 = -3$. A real number squared is never negative, so there is no real $x$ ' +
        'that satisfies this.',
    },
    hints: [
      'Move the 12 across and add 9: $(x - 3)^2 = -12 + 9$.',
      '$(x - 3)^2 = -3$. Can any real number squared be negative?',
    ],
    solution:
      '$x^2 - 6x = -12$. Adding 9: $(x - 3)^2 = -3$. A real square is never negative, so ' +
      'there are no real solutions.\n\n$$\\text{Number of real solutions: } 0.$$\n\nThe ' +
      'pattern across the last three items: the right-hand side went $11$, $7$, $-3$ — the ' +
      'roots closed in on $x = 3$ and then vanished.',
    misconceptionCodes: ['quadratic-methods.zero-discriminant-no-roots'],
  },

  // Tier 2 — vertex form and minimum values
  {
    id: 'quadratic-methods.cs-vertex',
    skillIds: [S_SQUARE, 'function-graphs.identify-vertices-axes'],
    tier: 2,
    statement:
      'The graph of $y = (x + 3)^2 - 9$ is drawn. Write down the coordinates of its lowest point.',
    answer: { type: 'coordinates', x: -3, y: -9, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'A squared number is never below zero. So the smallest $(x + 3)^2$ can ever be is 0 — ' +
        'at which $x$ does that happen, and what is $y$ there?',
      pictorial:
        'Sketch $y = x^2$ and imagine sliding it. The $+3$ inside the bracket slides it left or ' +
        'right; the $-9$ outside slides it up or down. Where does the bottom end up?',
      abstract:
        'Minimum of $(x + 3)^2$ is 0 when $x = -3$; then $y = -9$. The vertex is read straight ' +
        'off the completed square.',
    },
    hints: [
      'What is the smallest value $(x + 3)^2$ can take, and for which $x$?',
      'At that $x$, the bracket is 0, so $y = 0 - 9$.',
    ],
    solution:
      '$(x + 3)^2 \\ge 0$ with equality when $x = -3$. So the lowest point is at $x = -3$, ' +
      'where $y = 0 - 9 = -9$.\n\n$$(-3, -9)$$\n\nNote the sign: $+3$ inside gives $x = -3$.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula'],
  },
  {
    id: 'quadratic-methods.cs-minimum-value',
    skillIds: [S_SQUARE],
    tier: 2,
    statement: 'Find the minimum value of $x^2 - 10x + 30$.',
    answer: { type: 'number', value: 5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Ten negative $x$ bars split five and five around the $x^2$ tile; the corner is 25. ' +
        'Of the 30 unit tiles, 25 fill the corner. How many are left over?',
      pictorial:
        'Headers $x$ and $-5$; corner 25. So $x^2 - 10x + 30 = (x - 5)^2 + 5$. The square part ' +
        'can be 0 but never less — what is the smallest the whole thing can be?',
      abstract:
        'Complete the square: $(x - 5)^2 - 25 + 30 = (x - 5)^2 + 5$. Minimum when the square is 0.',
    },
    hints: [
      'Complete the square on $x^2 - 10x$ first: $(x - 5)^2 - 25$.',
      'So the expression is $(x - 5)^2 + 5$. The square is at least 0.',
      'The minimum is when $(x - 5)^2 = 0$, i.e. $x = 5$. What is the value then?',
    ],
    solution:
      '$x^2 - 10x + 30 = (x - 5)^2 - 25 + 30 = (x - 5)^2 + 5$. Since $(x - 5)^2 \\ge 0$, the ' +
      'expression is at least 5, with equality at $x = 5$.\n\n$$\\text{Minimum value} = 5.$$',
    misconceptionCodes: ['quadratic-methods.half-b-squared-error'],
  },
  {
    id: 'quadratic-methods.cs-reversed',
    skillIds: [S_SQUARE],
    tier: 2,
    statement:
      '$x^2 + bx + 7$ is written by completing the square as $(x - 4)^2 + q$. Find $b$ and $q$. ' +
      'Give your answer as $b = \\ldots$, $q = \\ldots$.',
    answer: { type: 'coordinates', x: -8, y: -9, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The finished square has $-4$ on each side, so there were four negative $x$ bars on ' +
        'each of two sides. How many bars in total, and what sign?',
      pictorial:
        'Headers $x$ and $-4$. Fill the grid: $x^2$, $-4x$, $-4x$, $16$. The $16$ was borrowed — ' +
        'the original constant was 7. What is $7 - 16$?',
      abstract:
        'Expand $(x - 4)^2 + q = x^2 - 8x + 16 + q$ and match it term by term with $x^2 + bx + 7$.',
    },
    hints: [
      'Expand $(x - 4)^2$ and compare the $x$-terms to find $b$.',
      '$(x - 4)^2 = x^2 - 8x + 16$, so $b = -8$. Now match the constants: $16 + q = 7$.',
    ],
    solution:
      '$(x - 4)^2 + q = x^2 - 8x + 16 + q$. Matching with $x^2 + bx + 7$: $b = -8$ and ' +
      '$16 + q = 7$, so $q = -9$.\n\n$$b = -8,\\quad q = -9.$$\n\nCheck: $(x-4)^2 - 9 = x^2 - 8x + 7$. ✓',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula', 'quadratic-methods.half-b-squared-error'],
  },

  // Tier 3 — maximising and minimising through the completed square
  {
    id: 'quadratic-methods.cs-fence',
    skillIds: [S_SQUARE],
    tier: 3,
    statement:
      'A farmer has 40 m of fencing and wants to enclose a rectangular pen against a long ' +
      'straight wall, so only three sides need fencing. What is the largest area the pen can have?',
    answer: { type: 'number', value: 200, tolerance: 0, unit: 'm^2' },
    cpaPrompts: {
      concrete:
        'Lay a 40 cm string along a ruler as the wall. Try a pen 5 wide: the far side is ' +
        '$40 - 10 = 30$. Try 15 wide: far side 10. Which gives more area — and is there a ' +
        'width that beats both?',
      pictorial:
        'Let the width (the two sides touching the wall) be $x$. Label the third side ' +
        '$40 - 2x$. Write the area as a product and expand it.',
      abstract:
        '$A = x(40 - 2x) = -2x^2 + 40x$. Take out $-2$, complete the square, and read the ' +
        'maximum from $200 - 2(x - 10)^2$.',
    },
    hints: [
      'Call the width $x$. Two sides use $2x$ of fence, so the third side is $40 - 2x$.',
      'Area $= x(40 - 2x) = 40x - 2x^2 = -2(x^2 - 20x)$. Complete the square inside the bracket.',
      '$-2\\left[(x - 10)^2 - 100\\right] = 200 - 2(x - 10)^2$. The subtracted part is smallest when $x = 10$.',
    ],
    solution:
      'Width $x$, length $40 - 2x$. $A = x(40 - 2x) = -2x^2 + 40x = -2(x^2 - 20x) = ' +
      '-2\\left[(x - 10)^2 - 100\\right] = 200 - 2(x - 10)^2$.\n\nSince $2(x - 10)^2 \\ge 0$, ' +
      '$A \\le 200$, with equality at $x = 10$ (a $10 \\times 20$ pen).\n\n$$A_{\\max} = 200 \\text{ m}^2.$$',
    misconceptionCodes: ['quadratic-methods.half-b-squared-error', 'quadratic.monic-method-on-non-monic'],
  },
  {
    id: 'quadratic-methods.cs-machine-cost',
    skillIds: [S_SQUARE],
    tier: 3,
    statement:
      'The hourly running cost, in dollars, of a machine run at speed $s$ is $C = 2s^2 - 24s + 100$. ' +
      'Find the lowest possible hourly cost.',
    answer: { type: 'number', value: 28, tolerance: 0, unit: '$' },
    cpaPrompts: {
      concrete:
        'Try $s = 5$: $C = 50 - 120 + 100 = 30$. Try $s = 7$: also 30. Try $s = 6$. The cost dips ' +
        'and rises again — you want the very bottom of that dip, not a guess near it.',
      pictorial:
        'Sketch $C$ against $s$: a U-shape. The bottom of the U is at the $s$ that makes the ' +
        'squared part zero once you complete the square.',
      abstract:
        'Factor out 2: $2(s^2 - 12s) + 100$. Complete the square inside: $2\\left[(s-6)^2 - 36\\right] + 100$.',
    },
    hints: [
      'Take the 2 out of the first two terms: $C = 2(s^2 - 12s) + 100$.',
      '$s^2 - 12s = (s - 6)^2 - 36$. Put that back in and simplify.',
      '$C = 2(s - 6)^2 - 72 + 100 = 2(s - 6)^2 + 28$. What is the smallest this can be?',
    ],
    solution:
      '$C = 2(s^2 - 12s) + 100 = 2\\left[(s - 6)^2 - 36\\right] + 100 = 2(s - 6)^2 + 28$.\n\n' +
      'The square is at least 0, so $C \\ge 28$, with the minimum at $s = 6$.\n\n' +
      '$$C_{\\min} = \\$28 \\text{ per hour.}$$',
    misconceptionCodes: ['quadratic-methods.half-b-squared-error', 'quadratic.monic-method-on-non-monic'],
  },

  // Diagnostics — completing the square
  {
    id: 'quadratic-methods.dx-missing-plus-minus',
    skillIds: [S_SQUARE],
    tier: 'diagnostic',
    statement: 'Find all the values of $x$ for which $(x + 3)^2 = 16$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$x = 1$', misconceptionCode: 'quadratic-methods.missing-plus-minus' },
        { label: 'B', value: '$x = 1$ or $x = -7$' },
        { label: 'C', value: '$x = \\sqrt{7}$ or $x = -\\sqrt{7}$', misconceptionCode: 'expansion.freshmans-dream' },
      ],
    },
    cpaPrompts: {
      concrete:
        'A square of tiles has area 16. How long is its side? Now: could $x + 3$ be $-4$ and ' +
        'still square to 16?',
      pictorial:
        'Sketch $y = (x + 3)^2$ and the horizontal line $y = 16$. How many times do they meet?',
      abstract:
        'Take the square root of both sides: $x + 3 = \\pm 4$. Two equations, two answers.',
    },
    hints: [
      'Which numbers square to give 16? There is more than one.',
      '$x + 3 = 4$ or $x + 3 = -4$. Solve each.',
    ],
    solution:
      '$x + 3 = \\pm 4$, so $x = 4 - 3 = 1$ or $x = -4 - 3 = -7$.\n\nCheck: $(1 + 3)^2 = 16$ ' +
      'and $(-7 + 3)^2 = (-4)^2 = 16$. ✓ Option A keeps only the positive root; option C ' +
      'expands $(x+3)^2$ as $x^2 + 9$.',
    misconceptionCodes: ['quadratic-methods.missing-plus-minus', 'expansion.freshmans-dream'],
  },
  {
    id: 'quadratic-methods.dx-half-b-squared',
    skillIds: [S_SQUARE],
    tier: 'diagnostic',
    statement: 'What number must be added to $x^2 - 6x$ to make it a perfect square?',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$9$' },
        { label: 'B', value: '$36$', misconceptionCode: 'quadratic-methods.half-b-squared-error' },
        { label: 'C', value: '$-9$', misconceptionCode: 'quadratic-methods.sign-slip-in-formula' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Lay the six negative $x$ bars three on each side of the $x^2$ tile. The empty corner is ' +
        '3 by 3. How many unit tiles is that?',
      pictorial:
        'Headers $x$ and $-3$ on the grid. The corner cell is $(-3) \\times (-3)$. Positive or negative?',
      abstract:
        'Half of $-6$ is $-3$; squared gives 9. $x^2 - 6x + 9 = (x - 3)^2$ — expand to check.',
    },
    hints: [
      'Halve the coefficient of $x$ first, *then* square.',
      '$(-3)^2 = 9$. Check: $(x - 3)^2 = x^2 - 6x + 9$.',
    ],
    solution:
      'Half of $-6$ is $-3$, and $(-3)^2 = 9$, so $x^2 - 6x + 9 = (x - 3)^2$.\n\nOption B squares ' +
      'the whole coefficient ($6^2 = 36$) instead of half of it; option C squares $-3$ and gets $-9$.',
    misconceptionCodes: ['quadratic-methods.half-b-squared-error', 'quadratic-methods.sign-slip-in-formula'],
  },

  // ==========================================================================
  // §14.3 The quadratic formula
  // Tier 1 — family formula-a: x²+3x+1, x²−3x+1, 2x²−3x−3, −x²+4x+1, a factorable one,
  // then b = 0.
  // ==========================================================================
  {
    id: 'quadratic-methods.qf-seq-1',
    skillIds: [S_FORMULA],
    tier: 1,
    sequence: { family: 'quadratic-methods.formula-a', position: 1 },
    statement:
      'Solve $x^2 + 3x + 1 = 0$ using the quadratic formula. Give both answers correct to 2 ' +
      'decimal places.',
    answer: { type: 'set', values: [-0.38, -2.62], tolerance: 0.011 },
    cpaPrompts: {
      concrete:
        'Try to complete the square with tiles: three $x$ bars split one and a half each side, ' +
        'corner $\\frac{9}{4}$. Awkward — which is exactly why a formula that does this once for ' +
        'every equation is worth having.',
      pictorial:
        'The general grid has headers $x$ and $\\frac{b}{2a}$. Here $a = 1$, $b = 3$: what is the ' +
        'corner? The formula is that grid, finished.',
      abstract:
        '$a = 1$, $b = 3$, $c = 1$. Work out $b^2 - 4ac$ first, then $x = \\frac{-3 \\pm \\sqrt{5}}{2}$.',
    },
    hints: [
      'Identify $a = 1$, $b = 3$, $c = 1$ and compute $b^2 - 4ac$ before anything else.',
      '$b^2 - 4ac = 9 - 4 = 5$. So $x = \\frac{-3 \\pm \\sqrt{5}}{2}$.',
      '$\\sqrt{5} \\approx 2.236$. Work out $\\frac{-3 + 2.236}{2}$ and $\\frac{-3 - 2.236}{2}$.',
    ],
    solution:
      '$a = 1$, $b = 3$, $c = 1$. $\\Delta = 3^2 - 4(1)(1) = 5$.\n\n$$x = \\frac{-3 \\pm \\sqrt{5}}{2} ' +
      '\\approx -0.38 \\text{ or } -2.62.$$\n\nCheck: $(-0.38)^2 + 3(-0.38) + 1 \\approx 0.14 - 1.14 + 1 = 0$. ✓',
    misconceptionCodes: ['quadratic-methods.divides-root-only'],
    figure: {
      kind: 'area_grid',
      title: 'Completing the square on x² + 3x',
      caption: 'The corner is (b/2)². The formula is what you get when you finish this grid for any a, b, c.',
      columns: ['x', '+3/2'],
      rows: ['x', '+3/2'],
      cells: ['x^2', '3x/2', '3x/2', ''],
    },
  },
  {
    id: 'quadratic-methods.qf-seq-2',
    skillIds: [S_FORMULA],
    tier: 1,
    sequence: { family: 'quadratic-methods.formula-a', position: 2 },
    expect:
      'Only $b$ changed sign: $+3x$ became $-3x$. Predict: does $b^2 - 4ac$ change? What happens ' +
      'to the two roots?',
    statement:
      'Solve $x^2 - 3x + 1 = 0$ using the quadratic formula. Give both answers correct to 2 ' +
      'decimal places.',
    answer: { type: 'set', values: [2.62, 0.38], tolerance: 0.011 },
    cpaPrompts: {
      concrete:
        'The three $x$ bars are negative now, but the corner they leave is the same size. What ' +
        'is different about where the square sits?',
      pictorial:
        'Sketch $y = x^2 + 3x + 1$ and $y = x^2 - 3x + 1$ together. One is the mirror image of ' +
        'the other in the $y$-axis. Where are the crossings now?',
      abstract:
        '$b = -3$, so $-b = 3$ and $b^2 = 9$ still. $x = \\frac{3 \\pm \\sqrt{5}}{2}$.',
    },
    hints: [
      'Now $b = -3$. Put it in brackets: $-(-3)$ and $(-3)^2$.',
      '$(-3)^2 = 9$, so the discriminant is still 5. But $-b = +3$ now.',
      '$x = \\frac{3 \\pm \\sqrt{5}}{2}$ — the same numbers as before, with the signs flipped.',
    ],
    solution:
      '$a = 1$, $b = -3$, $c = 1$. $\\Delta = (-3)^2 - 4(1)(1) = 5$.\n\n$$x = \\frac{3 \\pm ' +
      '\\sqrt{5}}{2} \\approx 2.62 \\text{ or } 0.38.$$\n\nExactly the negatives of the previous ' +
      'roots: flipping $b$ reflects the parabola in the $y$-axis.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula'],
  },
  {
    id: 'quadratic-methods.qf-seq-3',
    skillIds: [S_FORMULA],
    tier: 1,
    sequence: { family: 'quadratic-methods.formula-a', position: 3 },
    expect:
      'Now $a = 2$ and $c = -3$. Predict: which part of the formula changes because of $a$, and ' +
      'does $-4ac$ come out positive or negative?',
    statement:
      'Solve $2x^2 - 3x - 3 = 0$ using the quadratic formula. Give both answers correct to 2 ' +
      'decimal places.',
    answer: { type: 'set', values: [2.19, -0.69], tolerance: 0.011 },
    cpaPrompts: {
      concrete:
        'Two $x^2$ tiles: the tile method needs you to divide everything by 2 first. The formula ' +
        'has that division built in — where does the $a$ appear in it?',
      pictorial:
        'Write the formula with empty brackets: $\\frac{-(\\ ) \\pm \\sqrt{(\\ )^2 - 4(\\ )(\\ )}}{2(\\ )}$. ' +
        'Fill each bracket with its value *and its sign*.',
      abstract:
        '$a = 2$, $b = -3$, $c = -3$. $\\Delta = 9 - 4(2)(-3) = 9 + 24 = 33$; denominator $2a = 4$.',
    },
    hints: [
      'With $a = 2$, $b = -3$, $c = -3$: $-4ac = -4(2)(-3)$. Two negatives — what sign?',
      '$\\Delta = 9 + 24 = 33$, and the denominator is $2a = 4$.',
      '$x = \\frac{3 \\pm \\sqrt{33}}{4}$, with $\\sqrt{33} \\approx 5.745$.',
    ],
    solution:
      '$a = 2$, $b = -3$, $c = -3$. $\\Delta = (-3)^2 - 4(2)(-3) = 9 + 24 = 33$.\n\n' +
      '$$x = \\frac{3 \\pm \\sqrt{33}}{4} \\approx 2.19 \\text{ or } -0.69.$$\n\nThe whole of ' +
      '$3 \\pm \\sqrt{33}$ is divided by 4, not just the root.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula', 'quadratic-methods.divides-root-only'],
  },
  {
    id: 'quadratic-methods.qf-seq-4',
    skillIds: [S_FORMULA],
    tier: 1,
    sequence: { family: 'quadratic-methods.formula-a', position: 4 },
    expect:
      'This time $a$ is negative: $-x^2 + 4x + 1 = 0$. Predict: what is $2a$, and does a negative ' +
      'denominator change *which* root is the larger one?',
    statement:
      'Solve $-x^2 + 4x + 1 = 0$ using the quadratic formula. Give both answers correct to 2 ' +
      'decimal places.',
    answer: { type: 'set', values: [4.24, -0.24], tolerance: 0.011 },
    cpaPrompts: {
      concrete:
        'A negative $x^2$ tile. You could flip every tile to its opposite colour first — that is ' +
        'multiplying by $-1$ — and get $x^2 - 4x - 1 = 0$. Do both versions have the same roots?',
      pictorial:
        'Sketch: $a < 0$ makes the parabola open downwards, but it still crosses the axis in ' +
        'the same two places as its upside-down twin.',
      abstract:
        '$a = -1$, $b = 4$, $c = 1$. $\\Delta = 16 - 4(-1)(1) = 20$; $x = \\frac{-4 \\pm \\sqrt{20}}{-2}$.',
    },
    hints: [
      '$a = -1$, $b = 4$, $c = 1$. Compute $-4ac = -4(-1)(1)$ carefully.',
      '$\\Delta = 16 + 4 = 20$. The denominator is $2a = -2$.',
      '$x = \\frac{-4 \\pm \\sqrt{20}}{-2} = 2 \\mp \\sqrt{5}$. Either way the two roots are $2 + \\sqrt{5}$ and $2 - \\sqrt{5}$.',
    ],
    solution:
      '$a = -1$, $b = 4$, $c = 1$. $\\Delta = 4^2 - 4(-1)(1) = 20$.\n\n$$x = \\frac{-4 \\pm ' +
      '\\sqrt{20}}{-2} = 2 \\mp \\sqrt{5} \\approx 4.24 \\text{ or } -0.24.$$\n\nMultiplying the ' +
      'equation by $-1$ first gives $x^2 - 4x - 1 = 0$ and the same two roots.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula'],
  },
  {
    id: 'quadratic-methods.qf-seq-5',
    skillIds: [S_FORMULA],
    tier: 1,
    sequence: { family: 'quadratic-methods.formula-a', position: 5 },
    expect:
      'This one, $x^2 - 5x + 6 = 0$, factorises. Predict: what will $b^2 - 4ac$ be like when the ' +
      'roots are whole numbers — and will the formula agree with factorising?',
    statement:
      'Solve $x^2 - 5x + 6 = 0$ using the quadratic formula, then check your answer by ' +
      'factorising.',
    answer: { type: 'set', values: [3, 2], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Arrange one $x^2$ tile, five negative $x$ bars and six unit tiles into a rectangle. Its ' +
        'sides are the factors. Do the formula\'s answers match the sides?',
      pictorial:
        'The cross for factorising: which two numbers multiply to 6 and add to $-5$? Then ' +
        'compare with $\\frac{5 \\pm 1}{2}$ from the formula.',
      abstract:
        '$\\Delta = 25 - 24 = 1$, a perfect square. That is the signal that the equation factorises.',
    },
    hints: [
      '$a = 1$, $b = -5$, $c = 6$. $\\Delta = 25 - 24 = 1$.',
      '$x = \\frac{5 \\pm 1}{2}$, which gives two whole numbers.',
      'Factorising: $(x - 2)(x - 3) = 0$. Same roots.',
    ],
    solution:
      '$\\Delta = (-5)^2 - 4(1)(6) = 1$, so $x = \\frac{5 \\pm 1}{2} = 3$ or $2$.\n\nFactorising: ' +
      '$x^2 - 5x + 6 = (x - 2)(x - 3)$, roots 2 and 3. ✓\n\nA discriminant that is a perfect ' +
      'square means the roots are rational and the quadratic factorises.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula', 'quadratic.sign-pair-confusion'],
  },
  {
    id: 'quadratic-methods.qf-seq-6',
    skillIds: [S_FORMULA],
    tier: 1,
    sequence: { family: 'quadratic-methods.formula-a', position: 6 },
    expect:
      'There is no $x$-term at all: $x^2 - 7 = 0$, so $b = 0$. Predict: what does the formula ' +
      'collapse to when $b = 0$, and how are the two roots related to each other?',
    statement:
      'Solve $x^2 - 7 = 0$ using the quadratic formula. Give both answers correct to 2 decimal places.',
    answer: { type: 'set', values: [2.65, -2.65], tolerance: 0.011 },
    cpaPrompts: {
      concrete:
        'No $x$ bars to lay out at all — the $x^2$ tile is already a square. So the square ' +
        'has area 7 and its side is $\\pm\\sqrt{7}$ straight away.',
      pictorial:
        'Sketch $y = x^2 - 7$: $y = x^2$ moved down 7. It crosses the axis at two points ' +
        'symmetric about $x = 0$.',
      abstract:
        '$a = 1$, $b = 0$, $c = -7$. $x = \\frac{0 \\pm \\sqrt{0 + 28}}{2} = \\pm\\frac{\\sqrt{28}}{2} = \\pm\\sqrt{7}$.',
    },
    hints: [
      'Write it as $x^2 + 0x - 7 = 0$ so $b = 0$.',
      '$\\Delta = 0 - 4(1)(-7) = 28$, and $x = \\frac{\\pm\\sqrt{28}}{2}$.',
      '$\\frac{\\sqrt{28}}{2} = \\sqrt{7} \\approx 2.65$. Both signs.',
    ],
    solution:
      '$a = 1$, $b = 0$, $c = -7$. $\\Delta = 28$.\n\n$$x = \\frac{\\pm\\sqrt{28}}{2} = \\pm\\sqrt{7} ' +
      '\\approx \\pm 2.65.$$\n\nWith $b = 0$ the formula is just $x = \\pm\\sqrt{-c/a}$: the two ' +
      'roots are equal and opposite, which is what "$x^2 = 7$, take both square roots" says directly.',
    misconceptionCodes: ['quadratic-methods.missing-plus-minus'],
  },

  // Tier 2 — exact surds, simplifying, and a reversal
  {
    id: 'quadratic-methods.qf-exact-root',
    skillIds: [S_FORMULA],
    tier: 2,
    statement:
      'Solve $x^2 - 2x - 7 = 0$. Give the **larger** root in exact simplified surd form, or ' +
      'correct to 2 decimal places.',
    answer: { type: 'number', value: 3.828, tolerance: 0.01 },
    cpaPrompts: {
      concrete:
        'Completing the square by tiles gives $(x - 1)^2 = 8$: a square of area 8. Its side is ' +
        '$\\sqrt{8}$ — can you see that as $2\\sqrt{2}$, a side made of two $\\sqrt{2}$ pieces?',
      pictorial:
        'Draw $\\sqrt{8} = \\sqrt{4 \\times 2}$ as a $2 \\times 2$ block of $\\sqrt{2}$-squares. ' +
        'What is the side length of the whole block?',
      abstract:
        '$\\Delta = 4 + 28 = 32 = 16 \\times 2$, so $\\sqrt{32} = 4\\sqrt{2}$. Then divide the ' +
        'whole of $2 \\pm 4\\sqrt{2}$ by 2.',
    },
    hints: [
      '$a = 1$, $b = -2$, $c = -7$. $\\Delta = 4 + 28 = 32$.',
      '$\\sqrt{32} = \\sqrt{16 \\times 2} = 4\\sqrt{2}$. So $x = \\frac{2 \\pm 4\\sqrt{2}}{2}$.',
      'Divide both terms by 2: $x = 1 \\pm 2\\sqrt{2}$. The larger root uses $+$.',
    ],
    solution:
      '$\\Delta = (-2)^2 - 4(1)(-7) = 32$. $x = \\frac{2 \\pm \\sqrt{32}}{2} = \\frac{2 \\pm 4\\sqrt{2}}{2} ' +
      '= 1 \\pm 2\\sqrt{2}$.\n\n$$\\text{Larger root: } 1 + 2\\sqrt{2} \\approx 3.83.$$',
    misconceptionCodes: ['quadratic-methods.divides-root-only'],
  },
  {
    id: 'quadratic-methods.qf-simplify-surd',
    skillIds: [S_FORMULA],
    tier: 2,
    statement:
      'Solve $x^2 + 4x - 4 = 0$. Give the **larger** root in exact simplified surd form, or ' +
      'correct to 2 decimal places.',
    answer: { type: 'number', value: 0.828, tolerance: 0.01 },
    cpaPrompts: {
      concrete:
        'Complete the square: $(x + 2)^2 = 8$, side $\\sqrt{8}$. The formula gives $\\sqrt{32}$ ' +
        'over 2 — is that the same length? Check on a calculator before simplifying.',
      pictorial:
        'Write $\\sqrt{32}$ as $\\sqrt{16}\\sqrt{2}$. Then the fraction $\\frac{-4 \\pm 4\\sqrt{2}}{2}$ ' +
        'has a factor of 2 in every term on top.',
      abstract:
        '$\\Delta = 16 + 16 = 32$. $x = \\frac{-4 \\pm 4\\sqrt{2}}{2} = -2 \\pm 2\\sqrt{2}$.',
    },
    hints: [
      '$a = 1$, $b = 4$, $c = -4$. $\\Delta = 16 - 4(1)(-4) = 32$.',
      '$\\sqrt{32} = 4\\sqrt{2}$, so $x = \\frac{-4 \\pm 4\\sqrt{2}}{2}$.',
      'Divide *both* terms on top by 2: $x = -2 \\pm 2\\sqrt{2}$.',
    ],
    solution:
      '$\\Delta = 4^2 - 4(1)(-4) = 32$. $x = \\frac{-4 \\pm \\sqrt{32}}{2} = \\frac{-4 \\pm 4\\sqrt{2}}{2} ' +
      '= -2 \\pm 2\\sqrt{2}$.\n\n$$\\text{Larger root: } -2 + 2\\sqrt{2} \\approx 0.83.$$\n\n' +
      'Check: $0.83^2 + 4(0.83) - 4 \\approx 0.69 + 3.31 - 4 = 0$. ✓',
    misconceptionCodes: ['quadratic-methods.divides-root-only'],
  },
  {
    id: 'quadratic-methods.qf-reversed',
    skillIds: [S_FORMULA],
    tier: 2,
    statement:
      'A student applies the quadratic formula to $x^2 - 5x + c = 0$ and gets ' +
      '$x = \\dfrac{5 \\pm \\sqrt{37}}{2}$. What is the value of $c$?',
    answer: { type: 'number', value: -3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The number under the root is what is left after the corner of the square is filled. ' +
        'It came out as 37. Which pieces of $b^2 - 4ac$ do you already know?',
      pictorial:
        'Write the formula and the student\'s answer one above the other, lining up $-b$ with 5, ' +
        '$2a$ with 2, and $b^2 - 4ac$ with 37. Which bracket is unknown?',
      abstract:
        '$b^2 - 4ac = 37$ with $a = 1$, $b = -5$: $25 - 4c = 37$. Solve for $c$.',
    },
    hints: [
      'Match $b^2 - 4ac$ with the 37 under the root. You know $a = 1$ and $b = -5$.',
      '$25 - 4c = 37$. Solve for $c$.',
    ],
    solution:
      '$b^2 - 4ac = 37$, so $25 - 4(1)c = 37$, giving $-4c = 12$ and $c = -3$.\n\nCheck: ' +
      '$x^2 - 5x - 3 = 0$ gives $x = \\frac{5 \\pm \\sqrt{25 + 12}}{2} = \\frac{5 \\pm \\sqrt{37}}{2}$. ✓',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula'],
  },

  // Tier 3 — projectile and break-even
  {
    id: 'quadratic-methods.qf-projectile',
    skillIds: [S_FORMULA],
    tier: 3,
    statement:
      'A ball is thrown upwards from a height of 1 m. Its height after $t$ seconds is ' +
      '$h = 1 + 8t - 5t^2$ metres. After how many seconds does it hit the ground? Give your ' +
      'answer correct to 2 decimal places.',
    answer: { type: 'number', value: 1.72, tolerance: 0.011, unit: 's' },
    cpaPrompts: {
      concrete:
        'Toss a ball up and watch: it rises, stalls, falls, lands. "Hits the ground" is a ' +
        'statement about $h$. What is $h$ at that moment?',
      pictorial:
        'Sketch $h$ against $t$: an upside-down U starting at height 1. Where does it cross ' +
        'the $t$-axis? There are two crossings — is the one with $t < 0$ part of the throw?',
      abstract:
        'Set $h = 0$: $5t^2 - 8t - 1 = 0$. Apply the formula and keep the root that makes sense.',
    },
    hints: [
      'On the ground the height is 0. Write that as an equation in $t$.',
      '$-5t^2 + 8t + 1 = 0$, or $5t^2 - 8t - 1 = 0$. Identify $a$, $b$, $c$ and use the formula.',
      '$t = \\frac{8 \\pm \\sqrt{64 + 20}}{10} = \\frac{8 \\pm \\sqrt{84}}{10}$. One of these is ' +
        'negative — what does that mean for the throw?',
    ],
    solution:
      '$h = 0 \\Rightarrow 5t^2 - 8t - 1 = 0$. $\\Delta = 64 + 20 = 84$, so ' +
      '$t = \\frac{8 \\pm \\sqrt{84}}{10} \\approx 1.72$ or $-0.12$.\n\nTime before the throw is ' +
      'meaningless, so $t = -0.12$ is rejected.\n\n$$t \\approx 1.72 \\text{ s.}$$',
    misconceptionCodes: ['quadratic-methods.not-in-standard-form', 'quadratic.keeps-impossible-root'],
  },
  {
    id: 'quadratic-methods.qf-break-even',
    skillIds: [S_FORMULA],
    tier: 3,
    statement:
      'A small bakery sells $x$ hundred loaves a week. Its weekly income is $30x$ hundred ' +
      'dollars and its weekly costs are $2x^2 + 10x + 40$ hundred dollars. For which values of ' +
      '$x$ does the bakery exactly break even (income equals costs)? Give both values correct to 2 decimal places.',
    answer: { type: 'set', values: [2.76, 7.24], tolerance: 0.011 },
    cpaPrompts: {
      concrete:
        'Two columns on a receipt: money in, money out. Break-even is when the columns match. ' +
        'Write "money in $=$ money out" using the two expressions you are given.',
      pictorial:
        'Sketch the straight line $y = 30x$ and the curve $y = 2x^2 + 10x + 40$ on the same ' +
        'axes. Break-even is where they meet — how many meeting points do you expect?',
      abstract:
        '$30x = 2x^2 + 10x + 40 \\Rightarrow 2x^2 - 20x + 40 = 0 \\Rightarrow x^2 - 10x + 20 = 0$. Then the formula.',
    },
    hints: [
      'Break even means income $=$ costs: $30x = 2x^2 + 10x + 40$.',
      'Bring everything to one side: $2x^2 - 20x + 40 = 0$, and divide by 2 to simplify.',
      '$x^2 - 10x + 20 = 0$: $x = \\frac{10 \\pm \\sqrt{100 - 80}}{2} = 5 \\pm \\sqrt{5}$.',
    ],
    solution:
      '$30x = 2x^2 + 10x + 40 \\Rightarrow 2x^2 - 20x + 40 = 0 \\Rightarrow x^2 - 10x + 20 = 0$.\n\n' +
      '$\\Delta = 100 - 80 = 20$, so $x = \\frac{10 \\pm \\sqrt{20}}{2} = 5 \\pm \\sqrt{5} ' +
      '\\approx 2.76$ or $7.24$.\n\nBoth are positive, so both are break-even points: between ' +
      'them the bakery makes a profit.',
    misconceptionCodes: ['quadratic-methods.not-in-standard-form', 'quadratic-methods.sign-slip-in-formula'],
  },

  // Diagnostics — the formula
  {
    id: 'quadratic-methods.dx-sign-slip-in-formula',
    skillIds: [S_FORMULA],
    tier: 'diagnostic',
    statement: 'Solve $x^2 - 4x - 1 = 0$ using the quadratic formula. Give exact answers.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$x = -2 \\pm \\sqrt{5}$', misconceptionCode: 'quadratic-methods.sign-slip-in-formula' },
        { label: 'B', value: '$x = 2 \\pm \\sqrt{5}$' },
        { label: 'C', value: '$x = 4 \\pm \\sqrt{5}$', misconceptionCode: 'quadratic-methods.divides-root-only' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Put each value into its own bracket before doing anything: $-(-4)$, $(-4)^2$, ' +
        '$-4(1)(-1)$. Say the sign of each out loud.',
      pictorial:
        'Sketch $y = x^2 - 4x - 1$: it dips below the axis around $x = 2$, not $x = -2$. Which ' +
        'option puts the roots on the correct side of zero?',
      abstract:
        '$\\Delta = 16 + 4 = 20$, $\\sqrt{20} = 2\\sqrt{5}$. $x = \\frac{4 \\pm 2\\sqrt{5}}{2} = 2 \\pm \\sqrt{5}$.',
    },
    hints: [
      '$b = -4$, so $-b = +4$. And $-4ac = -4(1)(-1) = +4$.',
      '$x = \\frac{4 \\pm \\sqrt{20}}{2}$. Divide *both* the 4 and the root by 2.',
    ],
    solution:
      '$a = 1$, $b = -4$, $c = -1$. $\\Delta = (-4)^2 - 4(1)(-1) = 20$.\n\n$$x = \\frac{4 \\pm ' +
      '\\sqrt{20}}{2} = \\frac{4 \\pm 2\\sqrt{5}}{2} = 2 \\pm \\sqrt{5}.$$\n\nOption A has ' +
      '$-b$ as $-4$; option C divides only the root by 2.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula', 'quadratic-methods.divides-root-only'],
  },
  {
    id: 'quadratic-methods.dx-divides-root-only',
    skillIds: [S_FORMULA],
    tier: 'diagnostic',
    statement: 'Solve $x^2 + 2x - 4 = 0$ using the quadratic formula. Give exact answers.',
    answer: {
      type: 'choice',
      correct: 'C',
      options: [
        { label: 'A', value: '$x = -2 \\pm \\sqrt{5}$', misconceptionCode: 'quadratic-methods.divides-root-only' },
        { label: 'B', value: 'No real solutions', misconceptionCode: 'quadratic-methods.sign-slip-in-formula' },
        { label: 'C', value: '$x = -1 \\pm \\sqrt{5}$' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Substitute $x = -1 + \\sqrt{5} \\approx 1.24$ back into $x^2 + 2x - 4$. Now try ' +
        '$-2 + \\sqrt{5} \\approx 0.24$. Which one gives zero?',
      pictorial:
        'Write $\\frac{-2 \\pm \\sqrt{20}}{2}$ with a long fraction bar under *both* terms. The bar ' +
        'is a bracket: everything above it is divided by 2.',
      abstract:
        '$\\Delta = 4 + 16 = 20$. $x = \\frac{-2 \\pm 2\\sqrt{5}}{2} = -1 \\pm \\sqrt{5}$.',
    },
    hints: [
      '$-4ac = -4(1)(-4) = +16$, so $\\Delta = 20$, which is positive.',
      '$x = \\frac{-2 \\pm \\sqrt{20}}{2}$. Both the $-2$ and the $\\sqrt{20}$ are divided by 2.',
    ],
    solution:
      '$\\Delta = 2^2 - 4(1)(-4) = 20$. $x = \\frac{-2 \\pm \\sqrt{20}}{2} = \\frac{-2 \\pm 2\\sqrt{5}}{2} ' +
      '= -1 \\pm \\sqrt{5}$.\n\nOption A divides only the root by 2; option B computes ' +
      '$4 - 16 = -12$ by losing the sign of $c$.',
    misconceptionCodes: ['quadratic-methods.divides-root-only', 'quadratic-methods.sign-slip-in-formula'],
  },

  // ==========================================================================
  // §14.3–14.4 The discriminant
  // Tier 1 — family discriminant-a: x²+3x+c for c = 1, 2, 2.25, 3 (Δ crosses zero), then a
  // changes sign, then find k for equal roots.
  // ==========================================================================
  {
    id: 'quadratic-methods.disc-seq-1',
    skillIds: [S_DISC],
    tier: 1,
    sequence: { family: 'quadratic-methods.discriminant-a', position: 1 },
    statement: 'Find the value of the discriminant $b^2 - 4ac$ for $x^2 + 3x + 1 = 0$.',
    answer: { type: 'number', value: 5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'A U-shaped wire lowered over a table edge. The discriminant is the number that says ' +
        'whether it crosses, touches or hangs above. First find the number; the picture comes next.',
      pictorial:
        'Write the formula and circle only the part under the square root. That part is all ' +
        'you need here.',
      abstract:
        '$a = 1$, $b = 3$, $c = 1$: $\\Delta = 3^2 - 4(1)(1)$.',
    },
    hints: [
      'Read off $a = 1$, $b = 3$, $c = 1$.',
      '$\\Delta = 9 - 4 = 5$.',
    ],
    solution:
      '$\\Delta = b^2 - 4ac = 3^2 - 4(1)(1) = 9 - 4 = 5$.\n\nPositive, so the equation has two ' +
      'distinct real roots.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula'],
  },
  {
    id: 'quadratic-methods.disc-seq-2',
    skillIds: [S_DISC],
    tier: 1,
    sequence: { family: 'quadratic-methods.discriminant-a', position: 2 },
    expect:
      'Only $c$ changed, from 1 to 2. Predict: does the discriminant go up or down, and by how much?',
    statement: 'Find the value of the discriminant $b^2 - 4ac$ for $x^2 + 3x + 2 = 0$.',
    answer: { type: 'number', value: 1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Raising $c$ by 1 lifts the whole wire by 1. It still crosses the table edge — but ' +
        'only just. What number is left under the root?',
      pictorial:
        'Compare $9 - 4(1)(1)$ with $9 - 4(1)(2)$. Each extra 1 in $c$ takes 4 off $\\Delta$.',
      abstract: '$\\Delta = 3^2 - 4(1)(2) = 9 - 8$.',
    },
    hints: [
      '$a = 1$, $b = 3$, $c = 2$ now.',
      '$\\Delta = 9 - 8 = 1$. Still positive — two roots, and it factorises: $(x + 1)(x + 2)$.',
    ],
    solution:
      '$\\Delta = 9 - 4(1)(2) = 1$. Still positive: two distinct real roots, $x = -1$ and $x = -2$.\n\n' +
      'The discriminant dropped by 4 when $c$ rose by 1.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula'],
  },
  {
    id: 'quadratic-methods.disc-seq-3',
    skillIds: [S_DISC],
    tier: 1,
    sequence: { family: 'quadratic-methods.discriminant-a', position: 3 },
    expect:
      '$c$ is now $2.25$ — a quarter more. Predict: $\\Delta$ was 1 and falls by 4 for each 1 in ' +
      '$c$. What will it be now, and what does that say about the roots?',
    statement:
      'Find the value of the discriminant for $x^2 + 3x + 2.25 = 0$, and hence the number of ' +
      'distinct real roots.',
    answer: { type: 'number', value: 1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lift the wire by another quarter. Now it just grazes the table edge at one point. How ' +
        'many contact points is that?',
      pictorial:
        'Draw the parabola touching the $x$-axis at its vertex. The two crossings from before ' +
        'have merged into one.',
      abstract:
        '$\\Delta = 9 - 4(1)(2.25) = 9 - 9 = 0$. Zero under the root means $\\pm 0$: one repeated root.',
    },
    hints: [
      '$4 \\times 2.25 = 9$. So what is $9 - 9$?',
      '$\\Delta = 0$. The $\\pm\\sqrt{0}$ adds nothing, so the formula gives one value only: $x = -1.5$.',
    ],
    solution:
      '$\\Delta = 3^2 - 4(1)(2.25) = 0$. The parabola touches the $x$-axis at its vertex: ' +
      '$x^2 + 3x + 2.25 = (x + 1.5)^2$, one repeated root at $x = -1.5$.\n\n$$\\text{Number of ' +
      'distinct real roots: } 1.$$',
    misconceptionCodes: ['quadratic-methods.zero-discriminant-no-roots'],
  },
  {
    id: 'quadratic-methods.disc-seq-4',
    skillIds: [S_DISC],
    tier: 1,
    sequence: { family: 'quadratic-methods.discriminant-a', position: 4 },
    expect:
      '$c$ is now 3. Predict: the discriminant was 0 — which side of zero does it go now, and ' +
      'how many real roots will there be?',
    statement: 'How many real roots does $x^2 + 3x + 3 = 0$ have?',
    answer: { type: 'number', value: 0, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lift the wire above the table edge. It no longer touches at all. How many contact points?',
      pictorial:
        'The figure shows $c = 1$, $c = 2.25$ and $c = 3$ together. Which curve is this one, ' +
        'and does it meet the $x$-axis?',
      abstract:
        '$\\Delta = 9 - 12 = -3 < 0$. A negative number has no real square root, so no real $x$.',
    },
    hints: [
      '$\\Delta = 9 - 4(1)(3)$.',
      '$\\Delta = -3$. Can you take the square root of a negative number in the real numbers?',
    ],
    solution:
      '$\\Delta = 3^2 - 4(1)(3) = -3 < 0$. No real square root, so no real roots.\n\n$$0 \\text{ ' +
      'real roots.}$$\n\nAcross $c = 1, 2, 2.25, 3$ the discriminant ran $5, 1, 0, -3$: it crossed ' +
      'zero exactly at $c = 2.25 = (3/2)^2$, where the quadratic is a perfect square.',
    misconceptionCodes: ['quadratic-methods.zero-discriminant-no-roots'],
    figure: {
      kind: 'coordinate_plane',
      title: 'y = x² + 3x + c for three values of c',
      caption: 'Raising c lifts the whole curve. Watch what happens to the crossings.',
      xMin: -5,
      xMax: 2,
      yMin: -2,
      yMax: 6,
      gridStep: 1,
      curves: [
        { type: 'quadratic', a: 1, b: 3, c: 1, label: 'c = 1' },
        { type: 'quadratic', a: 1, b: 3, c: 2.25, label: 'c = 2.25' },
        { type: 'quadratic', a: 1, b: 3, c: 3, label: 'c = 3' },
      ],
      points: [],
    },
  },
  {
    id: 'quadratic-methods.disc-seq-5',
    skillIds: [S_DISC],
    tier: 1,
    sequence: { family: 'quadratic-methods.discriminant-a', position: 5 },
    expect:
      'Now $a$ is 2 instead of 1: $2x^2 + 3x + 3 = 0$. Predict: does a bigger $a$ make ' +
      '$4ac$ bigger or smaller, and does the discriminant get more negative or less?',
    statement: 'How many real roots does $2x^2 + 3x + 3 = 0$ have?',
    answer: { type: 'number', value: 0, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Doubling $a$ makes the wire narrower and steeper. Does that pull it down to the table, ' +
        'or not?',
      pictorial:
        'Sketch $y = x^2 + 3x + 3$ and $y = 2x^2 + 3x + 3$ on the same axes. Both start at ' +
        '$(0, 3)$. Which one dips lower, and does either reach the axis?',
      abstract: '$\\Delta = 9 - 4(2)(3) = 9 - 24 = -15$.',
    },
    hints: [
      '$a = 2$, $b = 3$, $c = 3$. $4ac = 24$.',
      '$\\Delta = 9 - 24 = -15 < 0$.',
    ],
    solution:
      '$\\Delta = 3^2 - 4(2)(3) = -15 < 0$, so no real roots.\n\n$$0 \\text{ real roots.}$$\n\n' +
      'A larger positive $a$ makes $4ac$ larger and the discriminant more negative.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula'],
  },
  {
    id: 'quadratic-methods.disc-seq-6',
    skillIds: [S_DISC],
    tier: 1,
    sequence: { family: 'quadratic-methods.discriminant-a', position: 6 },
    expect:
      'Same numbers, but $a$ is now $-2$. Predict: what happens to the sign of $4ac$ when $a$ and ' +
      '$c$ have opposite signs — and so to the number of roots?',
    statement: 'How many real roots does $-2x^2 + 3x + 3 = 0$ have?',
    answer: { type: 'number', value: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Turn the wire upside down: it now opens downwards, starting above the table at height 3. ' +
        'Must it cross the edge on the way down? How many times?',
      pictorial:
        'Sketch a downward parabola through $(0, 3)$. Both arms go down forever, so both must ' +
        'cross the axis.',
      abstract:
        '$\\Delta = 9 - 4(-2)(3) = 9 + 24 = 33 > 0$. When $a$ and $c$ have opposite signs, ' +
        '$-4ac$ is positive and $\\Delta$ is always positive.',
    },
    hints: [
      '$a = -2$, $b = 3$, $c = 3$. Compute $-4ac = -4(-2)(3)$ carefully.',
      '$\\Delta = 9 + 24 = 33 > 0$: two distinct real roots.',
    ],
    solution:
      '$\\Delta = 3^2 - 4(-2)(3) = 9 + 24 = 33 > 0$.\n\n$$2 \\text{ distinct real roots.}$$\n\n' +
      'Rule worth keeping: if $a$ and $c$ have opposite signs, $-4ac > 0$, so $\\Delta > 0$ and ' +
      'there are always two real roots.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula'],
  },
  {
    id: 'quadratic-methods.disc-seq-7',
    skillIds: [S_DISC],
    tier: 1,
    sequence: { family: 'quadratic-methods.discriminant-a', position: 7 },
    expect:
      'This one runs backwards: the number of roots is given and the constant is missing. ' +
      'Predict, from the earlier items: for $x^2 + 3x + k = 0$, what $k$ made the two roots merge into one?',
    statement: 'Find the value of $k$ for which $x^2 + 3x + k = 0$ has exactly one real root.',
    answer: { type: 'number', value: 2.25, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lower the wire until it just touches the table edge. That exact height is the $k$ you want.',
      pictorial:
        'The touching parabola is a perfect square: $(x + 1.5)^2$. Expand it — what is its constant?',
      abstract: 'One root means $\\Delta = 0$: $9 - 4k = 0$. Solve for $k$.',
    },
    hints: [
      'Exactly one root happens when the discriminant is zero. Write $b^2 - 4ac = 0$ with $c = k$.',
      '$9 - 4k = 0$, so $k = \\frac{9}{4}$.',
    ],
    solution:
      'One repeated root $\\iff \\Delta = 0$: $3^2 - 4(1)k = 0$, so $4k = 9$ and $k = \\frac{9}{4} = 2.25$.\n\n' +
      'Check: $x^2 + 3x + 2.25 = (x + 1.5)^2$. ✓',
    misconceptionCodes: ['quadratic-methods.zero-discriminant-no-roots'],
  },
  // Family discriminant-b: the existing item and one neighbour around c = 9.
  {
    id: 'quadratic-methods.discriminant-count',
    skillIds: [S_DISC],
    tier: 1,
    sequence: { family: 'quadratic-methods.discriminant-b', position: 1 },
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
    id: 'quadratic-methods.disc-seq-b2',
    skillIds: [S_DISC],
    tier: 1,
    sequence: { family: 'quadratic-methods.discriminant-b', position: 2 },
    expect:
      'The 9 became 10. Predict: the discriminant was exactly 0 — which way does it move, and ' +
      'what happens to the single touching point?',
    statement: 'Without solving it, find how many real roots the equation $x^2 + 6x + 10 = 0$ has.',
    answer: { type: 'number', value: 0, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The wire that was just touching the table is lifted by 1. Does it still touch?',
      pictorial:
        '$x^2 + 6x + 10 = (x + 3)^2 + 1$: the lowest point is at height 1, above the axis.',
      abstract:
        'Here $\\Delta = b^2 - 4ac = 36 - 40 = -4$, which is negative. What does a negative discriminant say about where the curve meets the $x$-axis?',
    },
    hints: [
      '$\\Delta = 6^2 - 4(1)(10)$.',
      '$36 - 40 = -4$. Negative under the root means no real roots.',
    ],
    solution:
      '$\\Delta = 36 - 40 = -4 < 0$, so there are no real roots.\n\n$$0 \\text{ real roots.}$$\n\n' +
      'The touching curve $(x + 3)^2$ was lifted to $(x + 3)^2 + 1$ and left the axis.',
    misconceptionCodes: ['quadratic-methods.zero-discriminant-no-roots'],
  },

  // Tier 2 — intercepts and k conditions
  {
    id: 'quadratic-methods.disc-intercepts',
    skillIds: [S_DISC, 'function-graphs.identify-vertices-axes'],
    tier: 2,
    statement: 'How many times does the graph of $y = x^2 - 4x + 7$ cross or touch the $x$-axis?',
    answer: { type: 'number', value: 0, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Crossing the $x$-axis means $y = 0$. So the question is really: how many solutions ' +
        'does $x^2 - 4x + 7 = 0$ have?',
      pictorial:
        'Complete the square to find the vertex: $(x - 2)^2 + 3$. The lowest point is at ' +
        'height 3 — above the axis or below?',
      abstract: '$\\Delta = 16 - 28 = -12 < 0$: no real roots, so no $x$-intercepts.',
    },
    hints: [
      'An $x$-intercept is a solution of $x^2 - 4x + 7 = 0$. Use the discriminant.',
      '$\\Delta = (-4)^2 - 4(1)(7) = 16 - 28$. What sign?',
    ],
    solution:
      '$\\Delta = 16 - 28 = -12 < 0$, so $x^2 - 4x + 7 = 0$ has no real roots and the graph ' +
      'never meets the $x$-axis.\n\n$$0 \\text{ times.}$$\n\nIndeed $y = (x - 2)^2 + 3 \\ge 3$.',
    misconceptionCodes: ['quadratic-methods.zero-discriminant-no-roots'],
  },
  {
    id: 'quadratic-methods.disc-k-no-roots',
    skillIds: [S_DISC],
    tier: 2,
    statement:
      'The equation $2x^2 + 4x + k = 0$ has no real roots when $k$ is greater than some number. ' +
      'Find that number.',
    answer: { type: 'number', value: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Raising $k$ lifts the wire. At some exact height it stops touching the table. Find ' +
        'the height where it is just touching — above that, no contact.',
      pictorial:
        'Sketch $\\Delta$ against $k$: $16 - 8k$ is a straight line going down. Where does it ' +
        'cross zero?',
      abstract: 'No real roots $\\iff \\Delta < 0$: $16 - 8k < 0$, so $k > 2$.',
    },
    hints: [
      'No real roots means $b^2 - 4ac < 0$. Here $a = 2$, $b = 4$, $c = k$.',
      '$16 - 8k < 0$. Solve the inequality for $k$.',
    ],
    solution:
      '$\\Delta = 4^2 - 4(2)k = 16 - 8k$. No real roots when $16 - 8k < 0$, i.e. $k > 2$.\n\n' +
      '$$\\text{The boundary value is } k = 2.$$\n\nAt $k = 2$ exactly, $\\Delta = 0$ and there is ' +
      'one repeated root, $x = -1$.',
    misconceptionCodes: ['quadratic-methods.zero-discriminant-no-roots'],
  },
  {
    id: 'quadratic-methods.disc-k-range',
    skillIds: [S_DISC],
    tier: 2,
    statement:
      '$x^2 + kx + 4 = 0$ has two distinct real roots. The possible values of $k$ lie outside ' +
      'an interval between two numbers. Find those two boundary values of $k$.',
    answer: { type: 'set', values: [-4, 4], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Here $k$ does not lift the wire; it slides the vertex along a curve. Try $k = 5$: ' +
        '$\\Delta = 25 - 16 > 0$. Try $k = 3$: $9 - 16 < 0$. Somewhere between, it switches.',
      pictorial:
        'Sketch $\\Delta = k^2 - 16$ against $k$: a U-shape. Where does it cross zero, and on ' +
        'which parts is it positive?',
      abstract: 'Two distinct roots $\\iff k^2 - 16 > 0 \\iff k < -4$ or $k > 4$.',
    },
    hints: [
      'Two distinct real roots means $\\Delta > 0$: $k^2 - 4(1)(4) > 0$.',
      '$k^2 > 16$. Which values of $k$ — positive *and* negative — satisfy this?',
      '$k^2 = 16$ at $k = 4$ and $k = -4$. Outside those, $k^2 > 16$.',
    ],
    solution:
      '$\\Delta = k^2 - 16 > 0 \\iff k^2 > 16 \\iff k < -4$ or $k > 4$.\n\n$$\\text{Boundary values: } ' +
      'k = -4 \\text{ and } k = 4.$$\n\nAt $k = \\pm 4$ the equation is $(x \\pm 2)^2 = 0$, one repeated root.',
    misconceptionCodes: ['quadratic-methods.missing-plus-minus', 'quadratic-methods.zero-discriminant-no-roots'],
  },

  // Tier 3 — can it get there?
  {
    id: 'quadratic-methods.disc-ball-height',
    skillIds: [S_DISC],
    tier: 3,
    statement:
      'A ball is kicked straight up. Its height after $t$ seconds is $h = 20t - 5t^2$ metres. ' +
      'At how many different moments is the ball exactly 10 m above the ground?',
    answer: { type: 'number', value: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'A ball going up and coming down passes each height on the way up and again on the way ' +
        'down — unless that height is above the top of its flight. Is 10 m above the top?',
      pictorial:
        'Sketch $h$ against $t$ (an upside-down U) and draw the horizontal line $h = 10$. How ' +
        'many times do they meet?',
      abstract:
        '$20t - 5t^2 = 10 \\Rightarrow 5t^2 - 20t + 10 = 0 \\Rightarrow t^2 - 4t + 2 = 0$. ' +
        '$\\Delta = 16 - 8 = 8 > 0$: two moments.',
    },
    hints: [
      'Set the height equal to 10 and bring everything to one side.',
      '$5t^2 - 20t + 10 = 0$. You do not need the actual times — only how many there are.',
      '$\\Delta = (-20)^2 - 4(5)(10) = 400 - 200 = 200$. Positive.',
    ],
    solution:
      '$20t - 5t^2 = 10 \\Rightarrow 5t^2 - 20t + 10 = 0$. $\\Delta = 400 - 200 = 200 > 0$, so ' +
      'there are two values of $t$: once on the way up and once on the way down.\n\n$$2 \\text{ moments.}$$\n\n' +
      '(The maximum height is $20$ m, so any height below 20 m is passed twice.)',
    misconceptionCodes: ['quadratic-methods.not-in-standard-form', 'quadratic-methods.zero-discriminant-no-roots'],
  },
  {
    id: 'quadratic-methods.disc-profit',
    skillIds: [S_DISC],
    tier: 3,
    statement:
      'A stall\'s weekly profit, in hundreds of dollars, when it sells $x$ hundred items is ' +
      '$P = -x^2 + 12x - 40$. Is there any number of items for which the stall makes exactly ' +
      'zero profit? Give the number of such values of $x$.',
    answer: { type: 'number', value: 0, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Try a few: $x = 6$ gives $P = -36 + 72 - 40 = -4$. $x = 5$: $-25 + 60 - 40 = -5$. ' +
        'The profit seems stuck below zero. Is there a way to be sure without trying every $x$?',
      pictorial:
        'Sketch $P$ against $x$: an upside-down U. Zero profit is where it crosses the $x$-axis. ' +
        'Does its highest point get up to the axis?',
      abstract: '$-x^2 + 12x - 40 = 0$: $\\Delta = 144 - 4(-1)(-40) = 144 - 160 = -16 < 0$. No solutions.',
    },
    hints: [
      'Zero profit means $P = 0$: $-x^2 + 12x - 40 = 0$.',
      'Use the discriminant with $a = -1$, $b = 12$, $c = -40$. Careful: $-4ac = -4(-1)(-40)$.',
      '$\\Delta = 144 - 160 = -16$. Negative means no real $x$.',
    ],
    solution:
      '$P = 0 \\Rightarrow -x^2 + 12x - 40 = 0$. $\\Delta = 12^2 - 4(-1)(-40) = 144 - 160 = -16 < 0$, ' +
      'so there is no real solution: the stall never breaks even.\n\n$$0 \\text{ values of } x.$$\n\n' +
      'Completing the square confirms it: $P = -(x - 6)^2 - 4 \\le -4$.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula', 'quadratic-methods.zero-discriminant-no-roots'],
  },

  // Tier 4 — a reason that works for every b
  {
    id: 'quadratic-methods.disc-always-two',
    skillIds: [S_DISC],
    tier: 4,
    statement:
      'Explain why $x^2 + bx - 1 = 0$ has two distinct real roots whatever the value of $b$. ' +
      'To check your reasoning, give the discriminant as an expression in $b$.',
    answer: { type: 'expression', value: 'b^2+4', variables: ['b'] },
    cpaPrompts: {
      concrete:
        'Try $b = 0$, $b = 3$, $b = -10$. Compute the discriminant each time. What do all the ' +
        'answers have in common — and could *any* choice of $b$ break that?',
      pictorial:
        'Every one of these parabolas passes through $(0, -1)$, below the axis, and opens ' +
        'upwards. Must both arms cross the axis?',
      abstract:
        '$\\Delta = b^2 - 4(1)(-1) = b^2 + 4$. Since $b^2 \\ge 0$, $\\Delta \\ge 4 > 0$ for every $b$.',
    },
    hints: [
      'Write the discriminant with $a = 1$, $c = -1$ and $b$ left as a letter.',
      '$\\Delta = b^2 + 4$. What is the smallest value $b^2$ can take?',
      '$b^2 \\ge 0$, so $\\Delta \\ge 4$, which is positive no matter what $b$ is.',
    ],
    solution:
      '$\\Delta = b^2 - 4(1)(-1) = b^2 + 4$. A square is never negative, so $b^2 + 4 \\ge 4 > 0$ ' +
      'for every real $b$. A positive discriminant means two distinct real roots.\n\n' +
      '$$\\Delta = b^2 + 4.$$\n\nThe same argument works whenever $a$ and $c$ have opposite signs.',
    misconceptionCodes: ['quadratic-methods.sign-slip-in-formula'],
  },

  // Diagnostic — the discriminant
  {
    id: 'quadratic-methods.dx-zero-discriminant',
    skillIds: [S_DISC],
    tier: 'diagnostic',
    statement: 'How many real roots does $x^2 - 8x + 16 = 0$ have?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$0$', misconceptionCode: 'quadratic-methods.zero-discriminant-no-roots' },
        { label: 'B', value: '$1$' },
        { label: 'C', value: '$2$', misconceptionCode: 'quadratic-methods.sign-slip-in-formula' },
      ],
    },
    cpaPrompts: {
      concrete:
        'The wire just touches the table at one point. Is that zero contact points, one, or two?',
      pictorial:
        '$x^2 - 8x + 16 = (x - 4)^2$: a parabola sitting on the axis at $x = 4$. Count the meeting points.',
      abstract:
        '$\\Delta = 64 - 64 = 0$. $\\pm\\sqrt{0} = 0$, so the formula gives a single value $x = 4$.',
    },
    hints: [
      '$\\Delta = (-8)^2 - 4(1)(16)$. Is it positive, zero or negative?',
      '$\\Delta = 0$: the two branches of the formula give the same value, $x = 4$.',
    ],
    solution:
      '$\\Delta = 64 - 64 = 0$, so there is exactly one real root, $x = 4$ (repeated): ' +
      '$x^2 - 8x + 16 = (x - 4)^2$.\n\nOption A reads zero under the root as "no roots"; option C ' +
      'computes $-4(1)(16)$ as $+64$ and gets $\\Delta = 128$.',
    misconceptionCodes: ['quadratic-methods.zero-discriminant-no-roots', 'quadratic-methods.sign-slip-in-formula'],
  },

  // ==========================================================================
  // §14.5 Equations reducible to quadratic form
  // Tier 1 — family reducible-a: two fractions (existing), one fraction, a product,
  // a right triangle, consecutive even integers (both roots valid — the payoff).
  // ==========================================================================
  {
    id: 'quadratic-methods.fractional-to-quadratic',
    skillIds: [S_REDUCE, S_FORMULA],
    tier: 1,
    sequence: { family: 'quadratic-methods.reducible-a', position: 1 },
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
  {
    id: 'quadratic-methods.red-seq-2',
    skillIds: [S_REDUCE],
    tier: 1,
    sequence: { family: 'quadratic-methods.reducible-a', position: 2 },
    expect:
      'Only one fraction this time: $\\dfrac{3}{x} = x - 2$. Predict: what is the smallest thing ' +
      'you can multiply through by, and will the result still be a quadratic?',
    statement: 'Solve $\\dfrac{3}{x} = x - 2$.',
    answer: { type: 'set', values: [3, -1], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'One fraction on the left pan. Multiply everything on both pans by $x$ — the fraction ' +
        'disappears, but the $x$ on the right gets multiplied by $x$ too. What does that make?',
      pictorial:
        'Write $x$ above the equation with an arrow to each term: $\\frac{3}{x} \\to 3$, ' +
        '$x \\to x^2$, $-2 \\to -2x$. Now bring everything to one side.',
      abstract: '$3 = x^2 - 2x \\Rightarrow x^2 - 2x - 3 = 0 \\Rightarrow (x - 3)(x + 1) = 0$.',
    },
    hints: [
      '$x \\ne 0$. Multiply both sides by $x$.',
      '$3 = x^2 - 2x$. Rearrange to standard form and factorise, or use the formula.',
      '$x^2 - 2x - 3 = (x - 3)(x + 1)$.',
    ],
    solution:
      'With $x \\ne 0$, multiply by $x$: $3 = x^2 - 2x$, so $x^2 - 2x - 3 = 0$ and $(x - 3)(x + 1) = 0$.\n\n' +
      '$$x = 3 \\text{ or } x = -1.$$\n\nCheck: $\\frac{3}{3} = 1 = 3 - 2$ ✓ and $\\frac{3}{-1} = -3 = -1 - 2$ ✓.',
    misconceptionCodes: ['quadratic-methods.not-in-standard-form'],
  },
  {
    id: 'quadratic-methods.red-seq-3',
    skillIds: [S_REDUCE],
    tier: 1,
    sequence: { family: 'quadratic-methods.reducible-a', position: 3 },
    expect:
      'No fraction now — a product: $x(x + 3) = 40$. Predict: is it already in the form ' +
      '$ax^2 + bx + c = 0$? What must happen to the 40 before the formula can be used?',
    statement: 'Solve $x(x + 3) = 40$.',
    answer: { type: 'set', values: [5, -8], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'A rectangle $x$ by $x + 3$ with area 40. Try $x = 4$: $4 \\times 7 = 28$. Try $x = 5$. ' +
        'Guessing finds one answer — the algebra will show whether there is another.',
      pictorial:
        'Expand the left with a $1 \\times 2$ grid: $x^2 + 3x$. Then write "$= 40$" and move the ' +
        '40 across so the right is 0.',
      abstract: '$x^2 + 3x - 40 = 0 \\Rightarrow (x + 8)(x - 5) = 0$.',
    },
    hints: [
      'Expand: $x^2 + 3x = 40$. The right side must be 0 before you can use the formula or factorise.',
      '$x^2 + 3x - 40 = 0$. Two numbers with product $-40$ and sum $3$?',
      '$(x + 8)(x - 5) = 0$.',
    ],
    solution:
      '$x^2 + 3x = 40 \\Rightarrow x^2 + 3x - 40 = 0 \\Rightarrow (x + 8)(x - 5) = 0$.\n\n' +
      '$$x = 5 \\text{ or } x = -8.$$\n\nCheck: $5 \\times 8 = 40$ ✓ and $(-8)(-5) = 40$ ✓. Both ' +
      'are genuine solutions of the equation.',
    misconceptionCodes: ['quadratic-methods.not-in-standard-form', 'quadratic.zero-product-on-nonzero'],
  },
  {
    id: 'quadratic-methods.red-seq-4',
    skillIds: [S_REDUCE, 'pythagoras.calculate-unknown-side'],
    tier: 1,
    sequence: { family: 'quadratic-methods.reducible-a', position: 4 },
    expect:
      'The equation now comes from a picture: a right-angled triangle with sides $x$, $x + 1$ ' +
      'and $x + 2$. Predict: which side is the longest, and will *both* roots be allowed this time?',
    statement:
      'A right-angled triangle has sides of length $x$, $x + 1$ and $x + 2$. Find the value of $x$.',
    answer: { type: 'number', value: 3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Cut three strips: one of length $x$, one a unit longer, one two units longer. The longest ' +
        'must be opposite the right angle. Which relation links the three lengths?',
      pictorial:
        'Draw the triangle with $x + 2$ as the longest side. Write squares on all three sides and ' +
        'the relation between their areas.',
      abstract:
        '$x^2 + (x + 1)^2 = (x + 2)^2 \\Rightarrow x^2 - 2x - 3 = 0 \\Rightarrow x = 3$ or $-1$; ' +
        'a length cannot be $-1$.',
    },
    hints: [
      'The longest side, $x + 2$, is opposite the right angle. Write Pythagoras\' relation.',
      '$x^2 + x^2 + 2x + 1 = x^2 + 4x + 4$. Collect everything on one side.',
      '$x^2 - 2x - 3 = 0$ gives $x = 3$ or $x = -1$. Which one can be a length?',
    ],
    solution:
      '$x^2 + (x + 1)^2 = (x + 2)^2 \\Rightarrow 2x^2 + 2x + 1 = x^2 + 4x + 4 \\Rightarrow x^2 - 2x - 3 = 0$.\n\n' +
      '$(x - 3)(x + 1) = 0$, so $x = 3$ or $x = -1$. A side cannot have negative length, so $x = 3$: ' +
      'the 3–4–5 triangle.\n\n$$x = 3.$$',
    misconceptionCodes: ['quadratic.keeps-impossible-root', 'quadratic-methods.not-in-standard-form'],
  },
  {
    id: 'quadratic-methods.red-seq-5',
    skillIds: [S_REDUCE],
    tier: 1,
    sequence: { family: 'quadratic-methods.reducible-a', position: 5 },
    expect:
      'Last time one root had to be thrown away because a length cannot be negative. This time ' +
      'the unknown is an integer, not a length. Predict: will you still have to reject a root?',
    statement:
      'The product of two consecutive even integers is 168. Find all possible values of the ' +
      'smaller integer.',
    answer: { type: 'set', values: [12, -14], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Consecutive even integers are 2 apart. Call the smaller one $n$; write the larger one. ' +
        'Then try $n = 12$ — and try $n = -14$ too.',
      pictorial:
        'A rectangle $n$ by $n + 2$ with area 168. Expand with a grid, move 168 across.',
      abstract: '$n(n + 2) = 168 \\Rightarrow n^2 + 2n - 168 = 0 \\Rightarrow (n + 14)(n - 12) = 0$.',
    },
    hints: [
      'Let the smaller integer be $n$; the next even integer is $n + 2$. Write their product.',
      '$n^2 + 2n - 168 = 0$. Factorise, or use the formula.',
      '$(n + 14)(n - 12) = 0$. Check both: is $-14 \\times -12$ also 168?',
    ],
    solution:
      '$n(n + 2) = 168 \\Rightarrow n^2 + 2n - 168 = 0 \\Rightarrow (n + 14)(n - 12) = 0$, so ' +
      '$n = 12$ or $n = -14$.\n\nBoth work: $12 \\times 14 = 168$ and $(-14)(-12) = 168$.\n\n' +
      '$$n = 12 \\text{ or } n = -14.$$\n\nThe payoff: a root is rejected only when the *situation* ' +
      'forbids it, not because it is negative. Integers can be negative; lengths cannot.',
    misconceptionCodes: ['quadratic.keeps-impossible-root', 'quadratic-methods.missing-plus-minus'],
  },

  // Tier 2 — a rate problem and a frame
  {
    id: 'quadratic-methods.red-boat',
    skillIds: [S_REDUCE, S_FORMULA],
    tier: 2,
    statement:
      'A boat travels 12 km up a river and 12 km back. The river flows at 2 km/h, and the whole ' +
      'trip takes 5 hours. Find the speed of the boat in still water, correct to 2 decimal places.',
    answer: { type: 'number', value: 5.52, tolerance: 0.011, unit: 'km/h' },
    cpaPrompts: {
      concrete:
        'Walking on a moving walkway: with it, your speed adds; against it, it subtracts. Let ' +
        'the still-water speed be $v$. What is the speed going up? Coming back?',
      pictorial:
        'Two rows in a table: leg, distance, speed, time. Time is distance over speed. The two ' +
        'times add to 5 — write that as one equation.',
      abstract:
        '$\\frac{12}{v - 2} + \\frac{12}{v + 2} = 5$. Multiply by $(v - 2)(v + 2)$ to get $5v^2 - 24v - 20 = 0$.',
    },
    hints: [
      'Upstream speed is $v - 2$, downstream $v + 2$. Time $= \\frac{12}{\\text{speed}}$ for each leg.',
      '$\\frac{12}{v - 2} + \\frac{12}{v + 2} = 5$. Multiply every term by $(v - 2)(v + 2)$.',
      '$12(v + 2) + 12(v - 2) = 5(v^2 - 4) \\Rightarrow 5v^2 - 24v - 20 = 0$. Use the formula and reject the negative speed.',
    ],
    solution:
      '$\\frac{12}{v - 2} + \\frac{12}{v + 2} = 5$. Multiplying by $(v - 2)(v + 2)$: ' +
      '$24v = 5v^2 - 20$, so $5v^2 - 24v - 20 = 0$.\n\n$$v = \\frac{24 \\pm \\sqrt{576 + 400}}{10} ' +
      '= \\frac{24 \\pm \\sqrt{976}}{10} \\approx 5.52 \\text{ or } -0.72.$$\n\nA speed cannot be ' +
      'negative, so $v \\approx 5.52$ km/h.',
    misconceptionCodes: ['quadratic-methods.not-in-standard-form', 'quadratic.keeps-impossible-root'],
  },
  {
    id: 'quadratic-methods.red-frame',
    skillIds: [S_REDUCE],
    tier: 2,
    statement:
      'A photograph measuring 20 cm by 30 cm is surrounded by a frame of uniform width. The ' +
      'total area of the photograph and frame together is $704\\ \\text{cm}^2$. Find the width of the frame.',
    answer: { type: 'number', value: 1, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Put a border of width $x$ all the way round a $20 \\times 30$ card. The border adds to ' +
        '*both* ends of each side. How wide is the whole thing now? How tall?',
      pictorial:
        'Draw the outer rectangle with sides $20 + 2x$ and $30 + 2x$. Its area is 704. Expand ' +
        'with a grid.',
      abstract:
        '$(20 + 2x)(30 + 2x) = 704 \\Rightarrow 4x^2 + 100x - 104 = 0 \\Rightarrow x^2 + 25x - 26 = 0$.',
    },
    hints: [
      'The frame adds $x$ on each side, so the outer rectangle is $(20 + 2x)$ by $(30 + 2x)$.',
      '$(20 + 2x)(30 + 2x) = 704$. Expand and bring 704 across; divide through by 4.',
      '$x^2 + 25x - 26 = 0 \\Rightarrow (x + 26)(x - 1) = 0$. Which root is a width?',
    ],
    solution:
      '$(20 + 2x)(30 + 2x) = 704 \\Rightarrow 600 + 100x + 4x^2 = 704 \\Rightarrow 4x^2 + 100x - 104 = 0 ' +
      '\\Rightarrow x^2 + 25x - 26 = 0 \\Rightarrow (x + 26)(x - 1) = 0$.\n\n$x = -26$ is impossible ' +
      'for a width, so $x = 1$.\n\n$$\\text{Width} = 1 \\text{ cm.}$$\n\nCheck: $22 \\times 32 = 704$. ✓',
    misconceptionCodes: ['quadratic-methods.not-in-standard-form', 'quadratic.keeps-impossible-root'],
  },

  // Tier 3 — formulate from a situation
  {
    id: 'quadratic-methods.red-garden-path',
    skillIds: [S_REDUCE, S_FORMULA],
    tier: 3,
    statement:
      'A rectangular lawn is 10 m long and 6 m wide. A path of uniform width runs all the way ' +
      'round the outside of the lawn, and the path alone has an area of $56\\ \\text{m}^2$. Find ' +
      'the width of the path, correct to 2 decimal places.',
    answer: { type: 'number', value: 1.48, tolerance: 0.011, unit: 'm' },
    cpaPrompts: {
      concrete:
        'A $10 \\times 6$ mat on the floor with tape of width $x$ round its edge. The area of ' +
        'the tape is the big rectangle minus the mat. What are the sides of the big rectangle?',
      pictorial:
        'Draw the lawn inside a larger rectangle $(10 + 2x)$ by $(6 + 2x)$. Shade the path. ' +
        'Path area $=$ outer area $-$ 60.',
      abstract:
        '$(10 + 2x)(6 + 2x) - 60 = 56 \\Rightarrow 4x^2 + 32x - 56 = 0 \\Rightarrow x^2 + 8x - 14 = 0$. Formula.',
    },
    hints: [
      'The outer rectangle is $(10 + 2x)$ by $(6 + 2x)$. The path is that area minus the lawn\'s 60.',
      '$(10 + 2x)(6 + 2x) - 60 = 56$. Expand: $4x^2 + 32x + 60 - 60 = 56$, so $4x^2 + 32x - 56 = 0$.',
      '$x^2 + 8x - 14 = 0$: $x = \\frac{-8 \\pm \\sqrt{64 + 56}}{2} = -4 \\pm \\sqrt{30}$. Reject the negative one.',
    ],
    solution:
      '$(10 + 2x)(6 + 2x) - 60 = 56 \\Rightarrow 4x^2 + 32x - 56 = 0 \\Rightarrow x^2 + 8x - 14 = 0$.\n\n' +
      '$$x = \\frac{-8 \\pm \\sqrt{120}}{2} = -4 \\pm \\sqrt{30} \\approx 1.48 \\text{ or } -9.48.$$\n\n' +
      'A width cannot be negative, so the path is about $1.48$ m wide.\n\nCheck: $12.96 \\times 8.96 - 60 \\approx 56.1$. ✓',
    misconceptionCodes: ['quadratic-methods.not-in-standard-form', 'quadratic.keeps-impossible-root'],
  },
  {
    id: 'quadratic-methods.red-cyclist',
    skillIds: [S_REDUCE],
    tier: 3,
    statement:
      'Mei cycles 30 km at a steady speed. If she had cycled 5 km/h faster, the journey would ' +
      'have taken 1 hour less. Find her actual speed.',
    answer: { type: 'number', value: 10, tolerance: 0, unit: 'km/h' },
    cpaPrompts: {
      concrete:
        'Two versions of the same ride: the real one and the faster one. Each has a time equal ' +
        'to 30 divided by its speed. The faster one is 1 hour shorter. Write that as a sentence ' +
        'in symbols.',
      pictorial:
        'A table with two rows (actual, faster), columns distance, speed, time. Fill it with $v$ ' +
        'and $v + 5$; the time column gives the equation.',
      abstract:
        '$\\frac{30}{v} - \\frac{30}{v + 5} = 1$. Multiply by $v(v + 5)$: $150 = v^2 + 5v$.',
    },
    hints: [
      'Let her speed be $v$. Actual time $= \\frac{30}{v}$; faster time $= \\frac{30}{v + 5}$. The difference is 1.',
      'Multiply $\\frac{30}{v} - \\frac{30}{v + 5} = 1$ through by $v(v + 5)$.',
      '$30(v + 5) - 30v = v(v + 5) \\Rightarrow v^2 + 5v - 150 = 0 \\Rightarrow (v + 15)(v - 10) = 0$.',
    ],
    solution:
      '$\\frac{30}{v} - \\frac{30}{v + 5} = 1$. Multiplying by $v(v + 5)$: $30v + 150 - 30v = v^2 + 5v$, ' +
      'so $v^2 + 5v - 150 = 0$ and $(v + 15)(v - 10) = 0$.\n\n$v = -15$ is not a speed, so $v = 10$.\n\n' +
      '$$10 \\text{ km/h.}$$\n\nCheck: $30/10 = 3$ h and $30/15 = 2$ h — one hour less. ✓',
    misconceptionCodes: ['quadratic-methods.not-in-standard-form', 'quadratic.keeps-impossible-root'],
  },

  // Tier 4 — reject a root with a reason, and use the survivor
  {
    id: 'quadratic-methods.red-triangle-perimeter',
    skillIds: [S_REDUCE, 'pythagoras.calculate-unknown-side'],
    tier: 4,
    statement:
      'The two shorter sides of a right-angled triangle are $x$ cm and $(x + 7)$ cm, and the ' +
      'longest side is $(x + 8)$ cm. Find the perimeter of the triangle, and explain why one of ' +
      'the two values of $x$ you find must be rejected.',
    answer: { type: 'number', value: 30, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Build the triangle from strips: $x$, $x + 7$, $x + 8$. Before any algebra — could ' +
        '$x$ be $-3$ and still be a strip you can hold?',
      pictorial:
        'Draw the triangle with the longest side opposite the right angle and write the ' +
        'Pythagoras relation. Expand both squares with grids.',
      abstract:
        '$x^2 + (x + 7)^2 = (x + 8)^2 \\Rightarrow x^2 - 2x - 15 = 0 \\Rightarrow x = 5$ or $-3$. ' +
        'Reject $-3$ (a negative length), then add the three sides.',
    },
    hints: [
      'Write Pythagoras: $x^2 + (x + 7)^2 = (x + 8)^2$. Expand both brackets fully.',
      '$2x^2 + 14x + 49 = x^2 + 16x + 64 \\Rightarrow x^2 - 2x - 15 = 0 \\Rightarrow (x - 5)(x + 3) = 0$.',
      '$x = -3$ would make the first side $-3$ cm, which is impossible. With $x = 5$ the sides are 5, 12 and 13.',
    ],
    solution:
      '$x^2 + (x + 7)^2 = (x + 8)^2 \\Rightarrow 2x^2 + 14x + 49 = x^2 + 16x + 64 \\Rightarrow ' +
      'x^2 - 2x - 15 = 0 \\Rightarrow (x - 5)(x + 3) = 0$.\n\n$x = -3$ is rejected: a side of ' +
      'length $-3$ cm does not exist (and $x + 7 = 4$, $x + 8 = 5$ would then not satisfy the ' +
      'original sides being $x$-based lengths). So $x = 5$ and the sides are 5, 12, 13.\n\n' +
      '$$\\text{Perimeter} = 5 + 12 + 13 = 30 \\text{ cm.}$$\n\nCheck: $25 + 144 = 169$. ✓',
    misconceptionCodes: ['quadratic.keeps-impossible-root', 'quadratic.answers-the-variable-not-the-question'],
  },

  // Diagnostic — standard form first
  {
    id: 'quadratic-methods.dx-not-in-standard-form',
    skillIds: [S_REDUCE],
    tier: 'diagnostic',
    statement:
      'To solve $5x + 3 = 2x^2 + 2x$ with the quadratic formula, what values of $a$, $b$ and $c$ ' +
      'should be used?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$a = 2,\\ b = 2,\\ c = 3$', misconceptionCode: 'quadratic-methods.not-in-standard-form' },
        { label: 'B', value: '$a = 2,\\ b = -3,\\ c = -3$' },
        { label: 'C', value: '$a = 2,\\ b = 3,\\ c = -3$', misconceptionCode: 'quadratic-methods.sign-slip-in-formula' },
      ],
    },
    cpaPrompts: {
      concrete:
        'The formula is a machine that only accepts equations with 0 on one pan. Move every ' +
        'piece from the left pan to the right, one at a time, changing its sign as it crosses.',
      pictorial:
        'Write the equation as one row equal to zero: $0 = 2x^2 + 2x - 5x - 3$. Now collect the ' +
        '$x$-terms and read off $a$, $b$, $c$.',
      abstract: '$2x^2 + 2x - 5x - 3 = 0 \\Rightarrow 2x^2 - 3x - 3 = 0$: $a = 2$, $b = -3$, $c = -3$.',
    },
    hints: [
      'Is there a zero on one side yet? If not, move everything across first.',
      '$2x^2 + 2x - 5x - 3 = 0$. Combine $2x - 5x$ carefully.',
    ],
    solution:
      'Bring all terms to one side: $2x^2 + 2x - 5x - 3 = 0$, so $2x^2 - 3x - 3 = 0$ and ' +
      '$a = 2$, $b = -3$, $c = -3$.\n\nOption A reads the coefficients off the equation as it ' +
      'stands; option C loses the sign when combining $2x - 5x$.',
    misconceptionCodes: ['quadratic-methods.not-in-standard-form', 'quadratic-methods.sign-slip-in-formula'],
  },
];
