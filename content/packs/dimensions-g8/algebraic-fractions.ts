import type { Problem, SkillNode } from '@/lib/content/schema';

/**
 * Unit 5 — Simple Algebraic Fractions. Hand-authored.
 *
 * Source: docs/Implementation Manual (segmented strips and variable fraction bars) and the
 * Chapter 5 worked examples in the content spec.
 *
 * The through-line: a fraction bar is a *division*, and you can only cancel what divides
 * the whole of the top and the whole of the bottom. Almost every error in the unit —
 * striking out an $x^2$ that is glued to a $-9$, adding fractions by adding tops and
 * bottoms, losing the sign on $-2(x-2)$ — comes from treating the bar as a line that
 * separates two lists of terms rather than as one operation applied to two products.
 */

export const algebraicFractionsSkills: SkillNode[] = [
  {
    id: 'algebraic-fractions.simplify-algebraic-fractions',
    title: 'Simplify algebraic fractions with polynomial numerators and denominators',
    summary:
      'Factorise top and bottom completely, then cancel whole factors — and know why a term ' +
      'stuck to a plus sign can never be cancelled.',
    prerequisites: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    cpa: {
      concrete:
        'Fraction strips. Lay a strip cut into 6 equal pieces under a strip cut into 9 and shade ' +
        '4 of the 6 and 6 of the 9: the shaded lengths match, which is what "equivalent" means. ' +
        'Now the algebraic version: a strip labelled $2x(x+3)$ is built from three physical ' +
        'factors laid end to end, and $(x-3)(x+3)$ from two. The $(x+3)$ piece can be lifted ' +
        'off both because it is a whole piece on both — there is no piece marked $x^2$ to lift.',
      pictorial:
        'A tape diagram for numerator and denominator drawn as products: boxes side by side, one ' +
        'per factor. Cancelling is crossing out a box that appears in both rows. Writing ' +
        '$x^2 - 9$ as a single box makes it visible that nothing inside it can be crossed out ' +
        'until the box is split into $(x-3)$ and $(x+3)$.',
      abstract:
        '$\\frac{AC}{BC} = \\frac{A}{B}$ for $C \\ne 0$. The rule is about factors $A$, $B$, $C$ ' +
        'that multiply, and factorising completely is what turns a sum into a product so the ' +
        'rule applies. State the values excluded by the original denominator alongside the result.',
    },
    formulas: ['\\frac{A \\cdot C}{B \\cdot C} = \\frac{A}{B} \\quad (B, C \\ne 0)'],
    misconceptions: [
      {
        code: 'algebraic-fractions.cancel-terms-not-factors',
        description:
          'Strikes out a term that is added or subtracted, reading $\\frac{x^2 - 9}{2x^2 + 6x}$ as ' +
          '$\\frac{-9}{2 + 6x}$ by cancelling the $x^2$ on top against the $x^2$ underneath.',
        probe:
          'Try it with numbers first: is $\\frac{4 + 2}{4 + 6}$ the same as $\\frac{2}{6}$? Work out ' +
          'both. Then tell me — what is the $x^2$ on top glued to by a plus or minus sign?',
        correction:
          'Cancelling is dividing top and bottom by the same thing, and division only distributes ' +
          'over a product. $x^2$ is a *term* of $x^2 - 9$, not a factor of it. Factorise first — ' +
          '$(x-3)(x+3)$ over $2x(x+3)$ — and now $(x+3)$ really does divide the whole of both.',
      },
    ],
    suggestedVisual: 'bar_model',
  },
  {
    id: 'algebraic-fractions.four-operations-rational',
    title: 'Perform four operations (+, -, ×, ÷) on rational expressions',
    summary:
      'Multiply and divide by working with factors; add and subtract only once both fractions ' +
      'are cut into the same-sized pieces.',
    prerequisites: ['algebraic-fractions.simplify-algebraic-fractions'],
    cpa: {
      concrete:
        'Two fraction strips of the same length, one cut into halves and one into thirds. Trying ' +
        'to push a half-piece and a third-piece together produces a length that matches no mark on ' +
        'either strip. Re-cut both into sixths and the sum is suddenly a countable number of pieces. ' +
        'That re-cutting *is* finding a common denominator.',
      pictorial:
        'Partitioned area diagrams. A rectangle divided into $(x-2)$ columns and another into ' +
        '$(x+1)$ columns cannot be compared; a grid with both partitions overlaid has ' +
        '$(x-2)(x+1)$ cells, and each original fraction is a whole number of those cells.',
      abstract:
        '$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}$, and division is multiplication by the ' +
        'reciprocal. $\\frac{A}{B} \\pm \\frac{C}{D} = \\frac{AD \\pm CB}{BD}$ — but the LCD is ' +
        'usually smaller than $BD$ once both denominators are factorised, and using it keeps the ' +
        'algebra small.',
    },
    formulas: [
      '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} = \\frac{ad}{bc}',
      '\\frac{A}{B} \\pm \\frac{C}{D} = \\frac{AD \\pm BC}{BD}',
    ],
    misconceptions: [
      {
        code: 'algebraic-fractions.add-tops-and-bottoms',
        description:
          'Adds fractions by adding numerators and adding denominators: writes ' +
          '$\\frac{3}{x-2} + \\frac{2}{x+1}$ as $\\frac{5}{2x - 1}$.',
        probe:
          'Do it with $\\frac{1}{2} + \\frac{1}{2}$ your way. What do you get, and is it what ' +
          'half a cake plus half a cake actually comes to?',
        correction:
          'A denominator says what size the pieces are; a numerator counts them. Adding counts ' +
          'only makes sense when the pieces are the same size, so the denominators must be made ' +
          'equal first — and then they stay equal, they are not added.',
      },
    ],
    suggestedVisual: 'area_grid',
  },
  {
    id: 'algebraic-fractions.solve-fractional-equations',
    title: 'Solve fractional equations reducible to linear or quadratic form',
    summary:
      'Clear every denominator in one move by multiplying the whole equation by the LCD, then ' +
      'solve what is left with the sign on each term intact.',
    prerequisites: ['algebraic-fractions.four-operations-rational', 'linear-systems.solve-simultaneous-linear'],
    cpa: {
      concrete:
        'A balance with fraction strips on each pan. Multiplying *both pans* by the same factor — ' +
        'putting down $(x-2)(x+1)$ copies of everything — keeps the balance level and turns every ' +
        'fraction piece into a whole one. Multiplying only the awkward term would tip it.',
      pictorial:
        'The equation written on one line with the LCD hovering above it, and an arrow from the ' +
        'LCD to *each* term including the right-hand side. Under each arrow, the factor that ' +
        'survives after cancelling. Nothing on the line escapes an arrow.',
      abstract:
        'Factorise all denominators, take the LCD, multiply through, expand carefully — a negative ' +
        'coefficient in front of a bracket changes every sign inside — collect, solve, then test ' +
        'the answer against the excluded values.',
    },
    formulas: ['\\text{LCD} \\times \\left(\\frac{A}{B} - \\frac{C}{D}\\right) = \\text{LCD} \\times \\frac{E}{F}'],
    misconceptions: [
      {
        code: 'algebraic-fractions.sign-lost-in-bracket',
        description:
          'Expands $-2(x - 2)$ as $-2x - 4$, keeping the minus from the front but forgetting it ' +
          'also multiplies the $-2$ inside.',
        probe:
          'Cover the $x$ for a second: what is $-2$ times $-2$ on its own? Now put the $x$ back — ' +
          'which sign goes in front of the 4?',
        correction:
          'The $-2$ multiplies *both* terms in the bracket. $-2 \\times x = -2x$ and ' +
          '$-2 \\times (-2) = +4$, so $-2(x-2) = -2x + 4$. Two negatives multiplied make a positive.',
      },
    ],
    suggestedVisual: 'bar_model',
  },
  {
    id: 'algebraic-fractions.identify-restrictions-extraneous',
    title: 'Identify restrictions and extraneous roots',
    summary:
      'Read off the values that make any denominator zero before solving, and throw out any ' +
      'solution that lands on one of them.',
    prerequisites: ['algebraic-fractions.solve-fractional-equations'],
    cpa: {
      concrete:
        'Sharing sweets among $x - 2$ people: try $x = 2$. There is nobody to share among, and ' +
        'the question stops meaning anything. That is what a zero denominator is — not a big ' +
        'number, not infinity, but a question with no answer.',
      pictorial:
        'A number line with a hollow circle at each excluded value, drawn *before* the equation is ' +
        'solved. When the solution arrives it is plotted; if it lands on a hollow circle it is ' +
        'crossed out.',
      abstract:
        'Multiplying through by the LCD is only reversible where the LCD is non-zero, so the new ' +
        'equation can gain solutions the original never had. Those are extraneous. State ' +
        '$x \\ne \\dots$ up front and check each root against it.',
    },
    formulas: ['B(x) = 0 \\implies x \\text{ excluded}'],
    misconceptions: [
      {
        code: 'algebraic-fractions.unchecked-root',
        description:
          'Solves the cleared equation correctly and reports every root, without testing whether ' +
          'one of them makes an original denominator zero.',
        probe:
          'Put your value of $x$ back into the very first line of the question, the one with the ' +
          'fractions in it. What is the denominator of the first fraction now?',
        correction:
          'Multiplying by the LCD assumed the LCD was not zero. A root that makes it zero was ' +
          'never a solution of the original equation — it was manufactured by that step — so ' +
          'every root has to be checked against the excluded values.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
];

export const algebraicFractionsProblems: Problem[] = [
  {
    id: 'algebraic-fractions.simplify-difference-of-squares',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 1,
    statement: 'Simplify $\\dfrac{x^2 - 9}{2x^2 + 6x}$.',
    answer: { type: 'exact', value: '(x-3)/(2x)', accepts: ['(x-3)/2x', 'x-3/2x'] },
    cpaPrompts: {
      concrete:
        'Build the bottom out of strips: how many separate pieces multiply together to make ' +
        '$2x^2 + 6x$? What about the top — can it be built from pieces at all as it stands?',
      pictorial:
        'Draw the top as a row of factor boxes and the bottom as another row. Which box appears in ' +
        'both rows? Cross it out in both and read what is left.',
      abstract:
        'Factorise the numerator as a difference of two squares and the denominator by its common ' +
        'factor, then cancel the shared factor.',
    },
    hints: [
      'Do not cancel individual terms like $x^2$ directly. Factorise the entire numerator and the ' +
        'entire denominator first — what pattern is $x^2 - 9$?',
      'The top is $a^2 - b^2$ with $b = 3$. The bottom has a common factor: what do both $2x^2$ ' +
        'and $6x$ share?',
      'You should now have $\\frac{(x-3)(x+3)}{2x(x+3)}$. Which factor is on both the top and the ' +
        'bottom, and what remains when it is divided out?',
    ],
    solution:
      'Numerator: $x^2 - 9 = (x-3)(x+3)$. Denominator: $2x^2 + 6x = 2x(x+3)$. So the fraction is ' +
      '$\\frac{(x-3)(x+3)}{2x(x+3)}$, and cancelling $(x+3)$ gives\n\n$$\\frac{x-3}{2x}, \\quad ' +
      'x \\ne 0, -3.$$',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.excluded-values',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 1,
    statement:
      'For which values of $x$ is $\\dfrac{x^2 - 9}{2x^2 + 6x}$ undefined? Give every value.',
    answer: { type: 'set', values: [0, -3], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'A fraction is a sharing. What goes wrong when the number of people you are sharing among ' +
        'is zero? Which values of $x$ make the bottom of this fraction zero?',
      pictorial:
        'Draw a number line. Mark with a hollow circle each $x$ that makes the denominator zero. ' +
        'How many circles are there, and where?',
      abstract:
        'Factorise the denominator, set each factor to zero, and list the solutions as excluded ' +
        'values.',
    },
    hints: [
      'A fraction is undefined when its denominator is zero. Which part of the expression is the ' +
        'denominator?',
      'Factorise $2x^2 + 6x$ as $2x(x+3)$. A product is zero when any one factor is zero.',
      'Set $2x = 0$ and $x + 3 = 0$ separately. Two values come out.',
    ],
    solution:
      'The denominator is $2x^2 + 6x = 2x(x+3)$, which is zero when $x = 0$ or $x = -3$. So the ' +
      'expression is undefined for\n\n$$x = 0 \\quad \\text{and} \\quad x = -3.$$\n\nNote that the ' +
      'simplified form $\\frac{x-3}{2x}$ hides the $-3$ — the restriction comes from the original.',
    misconceptionCodes: ['algebraic-fractions.unchecked-root'],
  },
  {
    id: 'algebraic-fractions.fractional-equation-lcd',
    skillIds: [
      'algebraic-fractions.solve-fractional-equations',
      'algebraic-fractions.identify-restrictions-extraneous',
    ],
    tier: 2,
    statement:
      'Solve the equation\n$$\\frac{3}{x - 2} - \\frac{2}{x + 1} = \\frac{5}{x^2 - x - 2}.$$',
    answer: { type: 'number', value: -2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Three fractions on a balance, and none of them are cut into the same-sized pieces. What ' +
        'single thing could you multiply *every* piece by so that no fractions are left?',
      pictorial:
        'Write the LCD above the equation and draw an arrow from it to each of the three terms. ' +
        'Under each arrow, write what is left after the cancelling. Does every term get an arrow?',
      abstract:
        'Factorise the right-hand denominator, identify the LCD and the restrictions, multiply ' +
        'through, expand with care over the signs, and solve the resulting linear equation.',
    },
    hints: [
      'Factorise the denominator on the right-hand side first. What do you notice about its ' +
        'factors compared with the other two denominators?',
      'Multiply the entire equation by the common denominator $(x - 2)(x + 1)$ to clear all the ' +
        'fractions. Remember the right-hand side gets multiplied too.',
      'Expand $3(x + 1) - 2(x - 2) = 5$ carefully — watch the sign on $-2 \\times (-2) = +4$ — ' +
        'then solve for $x$.',
    ],
    solution:
      '$x^2 - x - 2 = (x-2)(x+1)$, so the LCD is $(x-2)(x+1)$ and $x \\ne 2, -1$. Multiplying ' +
      'through:\n\n$$3(x+1) - 2(x-2) = 5$$\n$$3x + 3 - 2x + 4 = 5$$\n$$x + 7 = 5 \\implies x = -2.$$' +
      '\n\n$x = -2$ makes no denominator zero, so it is a valid solution.',
    misconceptionCodes: [
      'algebraic-fractions.sign-lost-in-bracket',
      'algebraic-fractions.unchecked-root',
    ],
  },
  {
    id: 'algebraic-fractions.add-with-lcd',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    statement:
      'Write $\\dfrac{3}{x - 2} + \\dfrac{2}{x + 1}$ as a single fraction. Then state the ' +
      'numerator of your answer.',
    answer: { type: 'exact', value: '5x-1', accepts: ['5x - 1', '(5x-1)', '-1+5x'] },
    cpaPrompts: {
      concrete:
        'Two strips cut into different-sized pieces. Can you push a piece from one onto a piece ' +
        'from the other and get a whole number of anything? What would both strips have to be ' +
        're-cut into?',
      pictorial:
        'Draw a grid with $(x-2)$ columns and $(x+1)$ rows. How many cells does the first ' +
        'fraction cover? The second? Now count the total.',
      abstract:
        'The LCD is $(x-2)(x+1)$. Rewrite each fraction over it, add the numerators, and expand.',
    },
    hints: [
      'The two denominators share no factor, so the lowest common denominator is their product. ' +
        'What must the first fraction be multiplied top and bottom by to get that denominator?',
      'The first fraction becomes $\\frac{3(x+1)}{(x-2)(x+1)}$ and the second ' +
        '$\\frac{2(x-2)}{(x-2)(x+1)}$. Now the pieces are the same size — add the tops.',
      'Expand $3(x+1) + 2(x-2)$ and collect like terms.',
    ],
    solution:
      '$$\\frac{3}{x-2} + \\frac{2}{x+1} = \\frac{3(x+1) + 2(x-2)}{(x-2)(x+1)} = ' +
      '\\frac{3x + 3 + 2x - 4}{(x-2)(x+1)} = \\frac{5x - 1}{(x-2)(x+1)}.$$\n\nThe numerator is ' +
      '$5x - 1$; the denominators were made equal, not added.',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
  },
];
