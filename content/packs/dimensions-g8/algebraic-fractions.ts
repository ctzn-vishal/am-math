import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';

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
    title: 'Simplify algebraic fractions by factorising',
    summary:
      'Factorise top and bottom completely, then cancel whole factors — and know why a term ' +
      'stuck to a plus sign can never be cancelled.',
    prerequisites: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    cpa: {
      concrete:
        'Fraction strips. Lay a strip cut into 6 equal pieces under a strip cut into 9 and shade ' +
        '4 of the 6 and 6 of the 9: the shaded lengths match, which is what "equivalent" means. ' +
        'Now use factor cards: the numerator $2x(x+3)$ is a row of three cards joined by ' +
        'multiplication signs, and the denominator $(x-3)(x+3)$ is a row of two. Dividing both ' +
        'rows by the shared $(x+3)$ card removes one complete factor from each; there is no ' +
        'complete $x^2$ factor in both rows to remove.',
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
    title: 'Use the four operations with algebraic fractions',
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
    title: 'Solve equations containing algebraic fractions',
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
    title: 'Identify restrictions and reject extraneous roots',
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

/**
 * Problems, in bank order: skill by skill, the tier-1 variation sequences first, then
 * application, applied, the SSDD challenge set and the diagnostics.
 *
 * Three of the sequences are built so that the *answer* stops moving while the question
 * keeps changing — `3/(2x)` survives a multiplication, a cancellation across two fractions
 * and a division — because the fact that division by a fraction is multiplication by its
 * reciprocal is far more convincing when the student watches it happen than when they are
 * told it.
 */
export const algebraicFractionsProblems: Problem[] = [
  // -------------------------------------------------------------------------
  // §5.1 simplify-algebraic-fractions — tier 1, family algebraic-fractions.simplify-a
  // -------------------------------------------------------------------------
  {
    id: 'algebraic-fractions.simplify-a-1',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.simplify-a', position: 1 },
    statement: 'Simplify $\\dfrac{6x}{9x^2}$.',
    answer: { type: 'expression', value: '2/(3x)', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'Lay out the top as pieces multiplied together — a $2$, a $3$ and an $x$. Do the same for ' +
        'the bottom. Which pieces can you lift off both piles at once?',
      pictorial:
        'Draw the top as the boxes $2 \\times 3 \\times x$ and the bottom as $3 \\times 3 \\times ' +
        'x \\times x$. Cross out one box in each row for every matching pair. What is left?',
      abstract:
        'Write $\\frac{6x}{9x^2}$ as $\\frac{3 \\cdot 2 \\cdot x}{3 \\cdot 3 \\cdot x \\cdot x}$ ' +
        'and divide top and bottom by $3x$.',
    },
    hints: [
      'What is the largest number that divides both $6$ and $9$? And how many $x$s does the top ' +
        'have compared with the bottom?',
      'Divide the top and the bottom by $3$, then divide both by $x$.',
      '$6x \\div 3x = 2$ and $9x^2 \\div 3x = 3x$.',
    ],
    solution:
      '$$\\frac{6x}{9x^2} = \\frac{3x \\cdot 2}{3x \\cdot 3x} = \\frac{2}{3x}, \\quad x \\ne 0.$$' +
      '\n\nCheck at $x = 2$: $\\frac{12}{36} = \\frac{1}{3}$ and $\\frac{2}{6} = \\frac{1}{3}$. ✓',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.simplify-a-2',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.simplify-a', position: 2 },
    expect:
      'The top is no longer a single term: it is $x + 3$, and the bottom has grown a $+6x$. ' +
      'Before you touch it — can you cancel anything at all while the bottom is still a sum?',
    statement: 'Simplify $\\dfrac{x+3}{2x^2+6x}$.',
    answer: { type: 'expression', value: '1/(2x)', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'The top is one whole piece labelled $x + 3$. Build the bottom out of pieces: how many ' +
        'pieces multiply to make $2x^2 + 6x$, and is one of them the same as the top?',
      pictorial:
        'Top row: a single box $(x+3)$. Bottom row: boxes $2$, $x$ and $(x+3)$. Cross out the box ' +
        'that appears in both rows. What is left on the top?',
      abstract:
        'Take the common factor $2x$ out of $2x^2 + 6x$ to get $2x(x+3)$, then divide top and ' +
        'bottom by $(x+3)$. Remember the top becomes $1$, not nothing.',
    },
    hints: [
      'The bottom is a sum, so nothing can be cancelled yet. What do $2x^2$ and $6x$ both contain?',
      '$2x^2 + 6x = 2x(x+3)$. Now the fraction is $\\frac{x+3}{2x(x+3)}$.',
      'Divide top and bottom by $(x+3)$. When the whole of a numerator cancels, a $1$ is left behind.',
    ],
    solution:
      '$$\\frac{x+3}{2x^2+6x} = \\frac{x+3}{2x(x+3)} = \\frac{1}{2x}, \\quad x \\ne 0, -3.$$\n\n' +
      'Check at $x = 1$: $\\frac{4}{8} = \\frac{1}{2}$ and $\\frac{1}{2}$. ✓ The commonest slip ' +
      'here is to leave the top blank rather than writing the $1$.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.simplify-difference-of-squares',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.simplify-a', position: 3 },
    expect:
      'Only the numerator changed: $x + 3$ has become $x^2 - 9$. The bottom is exactly the same ' +
      'as last time. Will the $(x+3)$ still cancel, and what will be left on top if it does?',
    statement: 'Simplify $\\dfrac{x^2 - 9}{2x^2 + 6x}$.',
    answer: { type: 'expression', value: '(x-3)/(2x)', variables: ['x'], form: 'simplified' },
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
    figure: {
      kind: 'area_grid',
      title: 'The denominator as a product',
      columns: ['x', '+3'],
      rows: ['2x'],
      cells: ['', ''],
      caption: '2x² + 6x is the area of this rectangle. What are its two sides?',
    },
  },
  {
    id: 'algebraic-fractions.simplify-a-4',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.simplify-a', position: 4 },
    expect:
      'Now the bottom has changed instead: $2x^2 + 6x$ has become $x^2 + 6x + 9$. Which factor ' +
      'will cancel this time, and what will be left underneath?',
    statement: 'Simplify $\\dfrac{x^2 - 9}{x^2 + 6x + 9}$.',
    answer: { type: 'expression', value: '(x-3)/(x+3)', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'The bottom is a square of side $x + 3$ built from tiles. The top is a rectangle with sides ' +
        '$x - 3$ and $x + 3$. Which side do the two shapes have in common?',
      pictorial:
        'Top row of boxes: $(x-3)$ and $(x+3)$. Bottom row: $(x+3)$ and $(x+3)$. Cross out one ' +
        'matching pair. How many $(x+3)$ boxes are left on the bottom?',
      abstract:
        'Factorise $x^2 - 9$ as a difference of squares and $x^2 + 6x + 9$ as $(x+3)^2$, then ' +
        'cancel one copy of $(x+3)$ from each.',
    },
    hints: [
      'The bottom is a perfect square trinomial. What number squared is $9$, and does $2 \\times 3$ ' +
        'match the middle term?',
      '$x^2 + 6x + 9 = (x+3)(x+3)$ and $x^2 - 9 = (x-3)(x+3)$.',
      'Cancel one $(x+3)$ from the top and one from the bottom. One $(x+3)$ survives underneath.',
    ],
    solution:
      '$$\\frac{x^2-9}{x^2+6x+9} = \\frac{(x-3)(x+3)}{(x+3)(x+3)} = \\frac{x-3}{x+3}, \\quad ' +
      'x \\ne -3.$$\n\nCheck at $x = 1$: $\\frac{-8}{16} = -\\frac{1}{2}$ and $\\frac{-2}{4} = ' +
      '-\\frac{1}{2}$. ✓ Only *one* $(x+3)$ cancels, because there is only one on top.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.simplify-a-5',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.simplify-a', position: 5 },
    expect:
      'Both top and bottom are three-term quadratics now. Nothing can be cancelled while they ' +
      'look like this — what is the one job that has to be done to each before you can start?',
    statement: 'Simplify $\\dfrac{x^2 + 5x + 6}{x^2 + x - 6}$.',
    answer: { type: 'expression', value: '(x+2)/(x-2)', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'Build each quadratic as a rectangle of tiles and read off its sides. The top rectangle has ' +
        'sides $x+2$ and $x+3$. What are the sides of the bottom one?',
      pictorial:
        'Two rows of factor boxes, two boxes in each. Line them up and cross out the box that ' +
        'appears in both rows. Which one is it?',
      abstract:
        'Factorise both trinomials. For $x^2 + 5x + 6$ find two numbers with sum $5$ and product ' +
        '$6$; for $x^2 + x - 6$ find two with sum $1$ and product $-6$.',
    },
    hints: [
      'Two numbers that add to $5$ and multiply to $6$; then two numbers that add to $1$ and ' +
        'multiply to $-6$.',
      '$x^2 + 5x + 6 = (x+2)(x+3)$ and $x^2 + x - 6 = (x+3)(x-2)$.',
      'The $(x+3)$ box is in both rows. Cross it out and read off what is left.',
    ],
    solution:
      '$$\\frac{x^2+5x+6}{x^2+x-6} = \\frac{(x+2)(x+3)}{(x-2)(x+3)} = \\frac{x+2}{x-2}, \\quad ' +
      'x \\ne 2, -3.$$\n\nCheck at $x = 1$: $\\frac{12}{-4} = -3$ and $\\frac{3}{-1} = -3$. ✓',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.simplify-a-6',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.simplify-a', position: 6 },
    expect:
      'The numerator is $x^2 - 9$ again, the one from earlier. But the denominator is the same ' +
      'two numbers the other way round: $9 - x^2$. Predict the answer before you factorise ' +
      'anything — will it still have an $x$ in it?',
    statement: 'Simplify $\\dfrac{x^2 - 9}{9 - x^2}$.',
    answer: { type: 'expression', value: '-1', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'Put a value in and see. At $x = 5$ the top is $16$ and the bottom is $-16$. Try $x = 4$ ' +
        'and $x = 10$ as well. What do all three answers have in common?',
      pictorial:
        'Draw the top as one box and the bottom as one box. They are the same length but pointing ' +
        'opposite ways. What does a length divided by its own opposite come to?',
      abstract:
        'Take $-1$ out of the denominator: $9 - x^2 = -(x^2 - 9)$. The fraction is then ' +
        '$\\frac{x^2-9}{-(x^2-9)}$, and the bracket divides out.',
    },
    hints: [
      'Try a number. Put $x = 5$ into the top and into the bottom. What do you notice about the ' +
        'two results?',
      'Write $9 - x^2$ as $-(x^2 - 9)$. Check by expanding the bracket: $-(x^2 - 9) = -x^2 + 9$. ✓',
      'Now the fraction is $\\frac{x^2-9}{-(x^2-9)}$. The bracket is the same on top and bottom, ' +
        'so it cancels, leaving $\\frac{1}{-1}$.',
    ],
    solution:
      '$$\\frac{x^2-9}{9-x^2} = \\frac{x^2-9}{-(x^2-9)} = -1, \\quad x \\ne 3, -3.$$\n\n' +
      'The rule this sequence has been building to: **when the bottom is the top with every sign ' +
      'flipped, the fraction is $-1$.** Any pair like $\\frac{a-b}{b-a}$ behaves the same way. ' +
      'Check at $x = 5$: $\\frac{16}{-16} = -1$. ✓',
    misconceptionCodes: [
      'algebraic-fractions.cancel-terms-not-factors',
      'algebraic-fractions.sign-lost-in-bracket',
    ],
  },

  // §5.1 — tier 2
  {
    id: 'algebraic-fractions.simplify-grouping',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 2,
    statement: 'Simplify $\\dfrac{x^3 + 2x^2 + 3x + 6}{x^2 - 4}$.',
    answer: { type: 'expression', value: '(x^2+3)/(x-2)', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'Four terms on top and no factor common to all of them. Split them into two pairs and ask ' +
        'of each pair: what can be taken out? Do the two leftovers match?',
      pictorial:
        'Write the top as two blocks: $x^2(x+2)$ and $3(x+2)$. Both blocks end in the same box. ' +
        'What does that shared box let you do?',
      abstract:
        'Group in pairs: $x^2(x+2) + 3(x+2) = (x+2)(x^2+3)$. Factorise the bottom as a difference ' +
        'of squares and cancel $(x+2)$.',
    },
    hints: [
      'Nothing divides all four terms of the top. Try splitting it as $(x^3 + 2x^2) + (3x + 6)$ ' +
        'and taking a factor out of each pair.',
      'The first pair gives $x^2(x+2)$ and the second gives $3(x+2)$. The same bracket appeared ' +
        'twice — so take it out.',
      'Top: $(x+2)(x^2+3)$. Bottom: $x^2 - 4 = (x-2)(x+2)$. Cancel $(x+2)$.',
    ],
    solution:
      'Grouping the numerator in pairs:\n\n$$x^3 + 2x^2 + 3x + 6 = x^2(x+2) + 3(x+2) = ' +
      '(x+2)(x^2+3).$$\n\nThe denominator is $x^2 - 4 = (x-2)(x+2)$, so\n\n' +
      '$$\\frac{(x+2)(x^2+3)}{(x-2)(x+2)} = \\frac{x^2+3}{x-2}, \\quad x \\ne 2, -2.$$\n\n' +
      '$x^2 + 3$ does not factorise, so this is as far as it goes.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.simplify-numeric-factor',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 2,
    statement: 'Simplify $\\dfrac{4x^2 - 36}{6x + 18}$.',
    answer: { type: 'expression', value: '(2x-6)/3', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'Both the top and the bottom have a number that can be pulled out first — a $4$ and a $6$. ' +
        'Pull them out and see what shape the brackets are then.',
      pictorial:
        'Top row of boxes: $4$, $(x-3)$, $(x+3)$. Bottom row: $6$, $(x+3)$. Cross out the matching ' +
        'bracket, then deal with the $4$ and the $6$ as a fraction of their own.',
      abstract:
        'Factorise fully: $4(x^2-9) = 4(x-3)(x+3)$ over $6(x+3)$. Cancel $(x+3)$, then cancel the ' +
        'common factor $2$ from $4$ and $6$.',
    },
    hints: [
      'Take a number out of each part first: what divides both $4x^2$ and $36$? What divides both ' +
        '$6x$ and $18$?',
      'You should have $\\frac{4(x-3)(x+3)}{6(x+3)}$. Now cancel the bracket that appears twice.',
      'That leaves $\\frac{4(x-3)}{6}$. The $4$ and the $6$ share a factor of $2$.',
    ],
    solution:
      '$$\\frac{4x^2-36}{6x+18} = \\frac{4(x-3)(x+3)}{6(x+3)} = \\frac{4(x-3)}{6} = ' +
      '\\frac{2(x-3)}{3} = \\frac{2x-6}{3}, \\quad x \\ne -3.$$\n\nCheck at $x = 1$: ' +
      '$\\frac{-32}{24} = -\\frac{4}{3}$ and $\\frac{-4}{3}$. ✓ Cancelling the bracket but ' +
      'forgetting the numbers leaves the answer only half simplified.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.simplify-reverse',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 2,
    statement:
      'A fraction has numerator $x^2 + 8x + 15$ and simplifies to $\\dfrac{x+5}{x-1}$. Find its ' +
      'denominator, written out as a quadratic with no brackets.',
    answer: { type: 'expression', value: 'x^2+2x-3', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'The numerator was built from two boxes and one of them was crossed out. Which box ' +
        'survived as $x+5$, and which one was cancelled away?',
      pictorial:
        'Draw the two rows again. Top: $(x+5)$ and a hidden box. Bottom: $(x-1)$ and the *same* ' +
        'hidden box. What must the hidden box be?',
      abstract:
        'Factorise $x^2+8x+15$. One factor is $x+5$, so the other is the factor that cancelled. ' +
        'The denominator is $(x-1)$ times that factor.',
    },
    hints: [
      'Factorise the numerator first: two numbers adding to $8$ and multiplying to $15$.',
      '$x^2+8x+15 = (x+5)(x+3)$. Since $x+5$ survived, the factor that cancelled was $x+3$.',
      'So the denominator was $(x-1)(x+3)$. Expand that.',
    ],
    solution:
      '$x^2 + 8x + 15 = (x+5)(x+3)$. The answer kept the $(x+5)$, so the $(x+3)$ must have ' +
      'cancelled — which means it was also a factor of the denominator. The denominator was\n\n' +
      '$$(x-1)(x+3) = x^2 + 2x - 3.$$\n\nCheck: $\\frac{(x+5)(x+3)}{(x-1)(x+3)} = ' +
      '\\frac{x+5}{x-1}$. ✓',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },

  // §5.1 — tier 3
  {
    id: 'algebraic-fractions.simplify-fuel',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 3,
    statement:
      'A van covers $x^2 - 16$ kilometres on $x + 4$ litres of fuel. Write, as simply as you ' +
      'can, how far it goes on one litre.',
    answer: { type: 'expression', value: 'x-4', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'If a van went $60$ km on $5$ litres, how would you work out the distance for one litre? ' +
        'Do the same thing with the two expressions you have been given.',
      pictorial:
        'Draw a bar of length $x^2 - 16$ cut into $x + 4$ equal pieces. The answer is the length ' +
        'of one piece. How would you find it?',
      abstract:
        'Distance per litre is $\\frac{x^2-16}{x+4}$. Factorise the top as a difference of two ' +
        'squares and cancel.',
    },
    hints: [
      'Kilometres per litre means kilometres divided by litres. Write that division as a fraction.',
      'The top is $x^2 - 4^2$. What two brackets multiply to give that?',
      '$\\frac{(x-4)(x+4)}{x+4}$ — the $(x+4)$ divides out.',
    ],
    solution:
      'Distance per litre $= \\dfrac{x^2-16}{x+4} = \\dfrac{(x-4)(x+4)}{x+4} = x - 4$ km, for ' +
      '$x \\ne -4$.\n\nCheck with numbers: if $x = 10$ the van covers $84$ km on $14$ litres, ' +
      'which is $6$ km per litre — and $x - 4 = 6$. ✓',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.simplify-photo',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 3,
    statement:
      'A photograph covers $x^2 - 1$ cm$^2$ of a card. The whole card covers $x^2 + 2x + 1$ ' +
      'cm$^2$. Write, in its simplest form, the fraction of the card that the photograph covers.',
    answer: { type: 'expression', value: '(x-1)/(x+1)', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'If a photo covered $12$ cm² of a $20$ cm² card, what fraction of the card would that be? ' +
        'Build the same fraction from the two expressions here.',
      pictorial:
        'Two rectangles, the small one sitting inside the big one. Label the areas $x^2-1$ and ' +
        '$x^2+2x+1$ and write the comparison as one fraction before doing any algebra.',
      abstract:
        'The fraction is $\\frac{x^2-1}{x^2+2x+1}$. The top is a difference of squares, the bottom ' +
        'is a perfect square, and they share a factor.',
    },
    hints: [
      '"Fraction of the card" means the photo\'s area divided by the card\'s area. Write that down ' +
        'first, before factorising anything.',
      '$x^2 - 1 = (x-1)(x+1)$ and $x^2 + 2x + 1 = (x+1)(x+1)$.',
      'Cancel one $(x+1)$ from the top and one from the bottom.',
    ],
    solution:
      'Fraction of the card $= \\dfrac{x^2-1}{x^2+2x+1} = \\dfrac{(x-1)(x+1)}{(x+1)^2} = ' +
      '\\dfrac{x-1}{x+1}$, for $x \\ne -1$.\n\nCheck with $x = 3$: photo $8$ cm², card $16$ cm², ' +
      'so half — and $\\frac{2}{4} = \\frac{1}{2}$. ✓',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },

  // -------------------------------------------------------------------------
  // §5.2 four-operations-rational — tier 1a, family algebraic-fractions.multiply-a
  // -------------------------------------------------------------------------
  {
    id: 'algebraic-fractions.multiply-a-1',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.multiply-a', position: 1 },
    statement: 'Simplify $\\dfrac{2x}{3} \\times \\dfrac{9}{4x^2}$.',
    answer: { type: 'expression', value: '3/(2x)', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'Multiplying fractions needs no re-cutting: tops with tops, bottoms with bottoms. Lay out ' +
        'the four pieces $2x$, $9$, $3$ and $4x^2$ and pair off what matches.',
      pictorial:
        'Write the whole thing as one fraction with all the top boxes above the line and all the ' +
        'bottom boxes below it. Which boxes pair off and disappear?',
      abstract:
        '$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}$, so this is $\\frac{18x}{12x^2}$. ' +
        'Now divide top and bottom by $6x$.',
    },
    hints: [
      'Multiply the two tops together and the two bottoms together, then simplify what you get.',
      '$\\frac{2x \\times 9}{3 \\times 4x^2} = \\frac{18x}{12x^2}$.',
      '$18$ and $12$ share a factor of $6$; the top and bottom share an $x$.',
    ],
    solution:
      '$$\\frac{2x}{3} \\times \\frac{9}{4x^2} = \\frac{18x}{12x^2} = \\frac{3}{2x}, \\quad ' +
      'x \\ne 0.$$\n\nYou can also cancel before multiplying: the $9$ and the $3$ leave a $3$, and ' +
      'the $2x$ and $4x^2$ leave a $2x$ underneath. Same answer, smaller numbers.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.multiply-a-2',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.multiply-a', position: 2 },
    expect:
      'Only one thing changed: the $4x^2$ underneath is now $4x^2 + 8x$. That is a sum, so it has ' +
      'to be factorised before anything can cancel. What extra bracket do you expect in the answer?',
    statement: 'Simplify $\\dfrac{2x}{3} \\times \\dfrac{9}{4x^2 + 8x}$.',
    answer: { type: 'expression', value: '3/(2x+4)', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'The bottom right piece is a sum, not a product, so it cannot be paired off yet. What ' +
        'common factor can you pull out of $4x^2$ and $8x$ to turn it into pieces?',
      pictorial:
        'Top boxes: $2x$ and $9$. Bottom boxes: $3$, $4x$ and $(x+2)$. Cross out what matches ' +
        'across the line. Which box has no partner?',
      abstract:
        '$4x^2 + 8x = 4x(x+2)$, so the product is $\\frac{18x}{12x(x+2)}$. Cancel $6x$ from top ' +
        'and bottom.',
    },
    hints: [
      'Factorise $4x^2 + 8x$ before you multiply anything. What is common to both terms?',
      '$4x^2 + 8x = 4x(x+2)$, so you have $\\frac{2x \\times 9}{3 \\times 4x(x+2)}$.',
      '$\\frac{18x}{12x(x+2)}$: divide top and bottom by $6x$ to get $\\frac{3}{2(x+2)}$.',
    ],
    solution:
      '$$\\frac{2x}{3} \\times \\frac{9}{4x^2+8x} = \\frac{18x}{12x(x+2)} = \\frac{3}{2(x+2)} = ' +
      '\\frac{3}{2x+4}, \\quad x \\ne 0, -2.$$\n\nCompared with the last item, the only new ' +
      'work was factorising the denominator — and the $(x+2)$ that came out had nothing to pair ' +
      'with, so it stayed.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.multiply-a-3',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.multiply-a', position: 3 },
    expect:
      'The $2x$ on the top left has become $2x + 4$. That factorises to $2(x+2)$ — and there is ' +
      'an $(x+2)$ waiting on the bottom of the *other* fraction. What will happen to it?',
    statement: 'Simplify $\\dfrac{2x + 4}{3} \\times \\dfrac{9}{4x^2 + 8x}$.',
    answer: { type: 'expression', value: '3/(2x)', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'A box on the top of the first fraction can cancel with a box on the bottom of the second. ' +
        'Lay all four pieces out at once and find every pair, wherever it sits.',
      pictorial:
        'Top boxes: $2$, $(x+2)$, $9$. Bottom boxes: $3$, $4$, $x$, $(x+2)$. Cross out the ' +
        '$(x+2)$ pair, then the numbers.',
      abstract:
        '$\\frac{2(x+2)}{3} \\times \\frac{9}{4x(x+2)}$. Cancelling across the multiplication sign ' +
        'is allowed because everything is one big product.',
    },
    hints: [
      'Factorise both the new numerator and the denominator: $2x+4 = 2(x+2)$ and $4x^2+8x = 4x(x+2)$.',
      'Now every piece is a factor of one big product. Cancel the $(x+2)$ that appears above and ' +
        'below, even though they are in different fractions.',
      'What is left is $\\frac{2 \\times 9}{3 \\times 4x} = \\frac{18}{12x}$.',
    ],
    solution:
      '$$\\frac{2x+4}{3} \\times \\frac{9}{4x^2+8x} = \\frac{2(x+2)}{3} \\times \\frac{9}{4x(x+2)} ' +
      '= \\frac{18(x+2)}{12x(x+2)} = \\frac{3}{2x}, \\quad x \\ne 0, -2.$$\n\nThe answer is the ' +
      'same as the first item in this sequence, even though the question looks much worse — ' +
      'because the extra $(x+2)$ appeared once on top and once underneath.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.multiply-a-4',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.multiply-a', position: 4 },
    expect:
      'The $\\times$ has become a $\\div$, and the second fraction has been turned upside down ' +
      'compared with the last item. Predict the answer before you work it — is it the same as ' +
      'last time or different?',
    statement: 'Simplify $\\dfrac{2x + 4}{3} \\div \\dfrac{4x^2 + 8x}{9}$.',
    answer: { type: 'expression', value: '3/(2x)', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'Dividing by a half doubles a quantity; dividing by a third triples it. Turning the second ' +
        'fraction over and multiplying is that same move written down. Do it, then compare with ' +
        'the previous question.',
      pictorial:
        'Draw the second fraction, then draw it flipped. Once it is flipped, the picture is exactly ' +
        'the one you drew for the previous item.',
      abstract:
        '$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$. Flip, then cancel ' +
        'as before.',
    },
    hints: [
      'To divide by a fraction, multiply by its reciprocal — turn the second fraction upside down ' +
        'and change the sign to $\\times$.',
      'That gives $\\frac{2x+4}{3} \\times \\frac{9}{4x^2+8x}$, which you have already done.',
      'Factorise: $\\frac{2(x+2)}{3} \\times \\frac{9}{4x(x+2)}$.',
    ],
    solution:
      '$$\\frac{2x+4}{3} \\div \\frac{4x^2+8x}{9} = \\frac{2x+4}{3} \\times \\frac{9}{4x^2+8x} = ' +
      '\\frac{3}{2x}, \\quad x \\ne 0, -2.$$\n\nIdentical to the previous item once the second ' +
      'fraction is flipped. There is no separate method for dividing: flipping turns every ' +
      'division question into a multiplication question you already know how to do.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.multiply-a-5',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.multiply-a', position: 5 },
    expect:
      'The first numerator has changed from $2x + 4$ to $x^2 - 4$. Both factorise, but into ' +
      'different things. Which bracket will still cancel, and which one is new?',
    statement: 'Simplify $\\dfrac{x^2 - 4}{3} \\div \\dfrac{4x^2 + 8x}{9}$.',
    answer: { type: 'expression', value: '(3x-6)/(4x)', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'Flip the second fraction first, then lay every piece out: $(x-2)$, $(x+2)$, $9$ on top and ' +
        '$3$, $4x$, $(x+2)$ underneath. Which pair vanishes?',
      pictorial:
        'Two rows of boxes again. The $(x+2)$ box appears in both rows, but $(x-2)$ appears only on ' +
        'top — so it has to stay.',
      abstract:
        'Flip and multiply: $\\frac{(x-2)(x+2)}{3} \\times \\frac{9}{4x(x+2)}$. Cancel $(x+2)$ and ' +
        'reduce $\\frac{9}{3}$ to $3$.',
    },
    hints: [
      'Turn the second fraction over first, then factorise everything: $x^2 - 4 = (x-2)(x+2)$.',
      'You now have $\\frac{(x-2)(x+2) \\times 9}{3 \\times 4x(x+2)}$. Cancel the $(x+2)$.',
      'That leaves $\\frac{9(x-2)}{12x}$, and $9$ and $12$ share a factor of $3$.',
    ],
    solution:
      '$$\\frac{x^2-4}{3} \\div \\frac{4x^2+8x}{9} = \\frac{(x-2)(x+2)}{3} \\times ' +
      '\\frac{9}{4x(x+2)} = \\frac{9(x-2)}{12x} = \\frac{3(x-2)}{4x} = \\frac{3x-6}{4x},$$\n\n' +
      'for $x \\ne 0, -2$. Check at $x = 4$: $\\frac{12}{3} \\div \\frac{96}{9} = 4 \\times ' +
      '\\frac{9}{96} = \\frac{3}{8}$, and $\\frac{6}{16} = \\frac{3}{8}$. ✓',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.multiply-a-6',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.multiply-a', position: 6 },
    expect:
      'One character has changed: the $9$ in the second denominator is now $9x$. After flipping, ' +
      'that $x$ lands on the top. What does it do to the $4x$ that was underneath?',
    statement: 'Simplify $\\dfrac{x^2 - 4}{3} \\div \\dfrac{4x^2 + 8x}{9x}$.',
    answer: { type: 'expression', value: '(3x-6)/4', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'After flipping, the pieces on top are $(x-2)$, $(x+2)$, $9$ and $x$; underneath are $3$, ' +
        '$4$, $x$ and $(x+2)$. Two pairs vanish this time, not one. Which two?',
      pictorial:
        'Same two rows of boxes as before, with one extra $x$ box added to the top row. It has a ' +
        'partner underneath, so cross both out.',
      abstract:
        '$\\frac{(x-2)(x+2)}{3} \\times \\frac{9x}{4x(x+2)}$. The $(x+2)$ cancels and so does the ' +
        '$x$, leaving no $x$ in the denominator at all.',
    },
    hints: [
      'Flip the second fraction: it becomes $\\frac{9x}{4x^2+8x}$.',
      'Factorise and write it as one product: $\\frac{(x-2)(x+2) \\times 9x}{3 \\times 4x(x+2)}$.',
      'Cancel $(x+2)$, cancel $x$, then reduce $\\frac{9}{12}$.',
    ],
    solution:
      '$$\\frac{x^2-4}{3} \\div \\frac{4x^2+8x}{9x} = \\frac{(x-2)(x+2)}{3} \\times ' +
      '\\frac{9x}{4x(x+2)} = \\frac{9x(x-2)}{12x} = \\frac{3(x-2)}{4} = \\frac{3x-6}{4},$$\n\n' +
      'for $x \\ne 0, -2$. The payoff of this sequence: multiplying and dividing never need a ' +
      'common denominator. Factorise everything, flip if it is a division, and then cancel any ' +
      'factor that appears both above and below the line — no matter which fraction it started in.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },

  // §5.3 four-operations-rational — tier 1b, family algebraic-fractions.add-a
  {
    id: 'algebraic-fractions.add-a-1',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.add-a', position: 1 },
    statement: 'Write $\\dfrac{x}{2} + \\dfrac{x}{3}$ as a single fraction.',
    answer: { type: 'expression', value: '(5x)/6', variables: ['x'], form: 'single-fraction' },
    cpaPrompts: {
      concrete:
        'Take two strips of the same length, one cut in halves and one in thirds. Can you push a ' +
        'half-piece and a third-piece together and land on a mark? What must both be re-cut into?',
      pictorial:
        'Draw a bar in sixths. Shade three of them for $\\frac{x}{2}$ and two of them for ' +
        '$\\frac{x}{3}$. How many sixths are shaded altogether?',
      abstract:
        'The lowest common denominator of $2$ and $3$ is $6$. Rewrite both fractions over $6$ and ' +
        'add the numerators only.',
    },
    hints: [
      'The pieces are different sizes, so they cannot be counted together yet. What is the smallest ' +
        'number that both $2$ and $3$ divide into?',
      '$\\frac{x}{2} = \\frac{3x}{6}$ and $\\frac{x}{3} = \\frac{2x}{6}$.',
      'Add the numerators: $3x + 2x$. The denominator stays as $6$.',
    ],
    solution:
      '$$\\frac{x}{2} + \\frac{x}{3} = \\frac{3x}{6} + \\frac{2x}{6} = \\frac{5x}{6}.$$\n\n' +
      'The denominator is $6$, not $5$: making the pieces equal is not the same as adding the ' +
      'numbers underneath. Check at $x = 6$: $3 + 2 = 5$, and $\\frac{5 \\times 6}{6} = 5$. ✓',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
  },
  {
    id: 'algebraic-fractions.add-a-2',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.add-a', position: 2 },
    expect:
      'The denominators are now $x$ and $2x$ instead of $2$ and $3$. One of them already divides ' +
      'into the other. Do you expect the common denominator to be $2x$ or $2x^2$?',
    statement: 'Write $\\dfrac{3}{x} + \\dfrac{1}{2x}$ as a single fraction.',
    answer: { type: 'expression', value: '7/(2x)', variables: ['x'], form: 'single-fraction' },
    cpaPrompts: {
      concrete:
        'One strip is cut into $x$-sized pieces, the other into pieces half that size. You only ' +
        'have to re-cut one of the strips. Which one, and into what?',
      pictorial:
        'Draw a bar in $2x$-ths. $\\frac{3}{x}$ covers six of them and $\\frac{1}{2x}$ covers one. ' +
        'Count the total.',
      abstract:
        'Since $x$ divides into $2x$, the LCD is $2x$, not $2x^2$. Multiply the first fraction top ' +
        'and bottom by $2$.',
    },
    hints: [
      'You do not always need the product of the two denominators. Does $x$ go into $2x$?',
      'Rewrite $\\frac{3}{x}$ as $\\frac{6}{2x}$ by multiplying top and bottom by $2$.',
      'Now both pieces are the same size: add $6$ and $1$ over the denominator $2x$.',
    ],
    solution:
      '$$\\frac{3}{x} + \\frac{1}{2x} = \\frac{6}{2x} + \\frac{1}{2x} = \\frac{7}{2x}, \\quad ' +
      'x \\ne 0.$$\n\nUsing $2x^2$ as the denominator is not wrong, but it makes more work and ' +
      'the answer then has to be cancelled back down. Check at $x = 1$: $3 + 0.5 = 3.5$ and ' +
      '$\\frac{7}{2} = 3.5$. ✓',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
  },
  {
    id: 'algebraic-fractions.add-a-3',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.add-a', position: 3 },
    expect:
      'The second denominator has changed from $2x$ to $x + 1$. That is a sum, and $x$ does not ' +
      'divide into it. What does the common denominator have to be this time?',
    statement: 'Write $\\dfrac{3}{x} + \\dfrac{1}{x+1}$ as a single fraction.',
    answer: { type: 'expression', value: '(4x+3)/(x^2+x)', variables: ['x'], form: 'single-fraction' },
    cpaPrompts: {
      concrete:
        'Two strips: one cut into $x$ pieces, one into $x+1$ pieces. Nothing lines up. Re-cut both ' +
        'into $x(x+1)$ pieces — how many of the new pieces does each original piece become?',
      pictorial:
        'A grid $x$ cells across and $(x+1)$ cells down. The first fraction covers a whole column, ' +
        'the second a whole row. How many cells in total, and how many altogether in the grid?',
      abstract:
        'The denominators share no factor, so the LCD is their product $x(x+1)$. Scale each ' +
        'fraction, then add the numerators.',
    },
    hints: [
      'Do $x$ and $x+1$ have a common factor? If not, their product is the LCD.',
      '$\\frac{3}{x} = \\frac{3(x+1)}{x(x+1)}$ and $\\frac{1}{x+1} = \\frac{x}{x(x+1)}$.',
      'Add the tops: $3(x+1) + x = 3x + 3 + x$. The bottom stays as $x(x+1) = x^2 + x$.',
    ],
    solution:
      '$$\\frac{3}{x} + \\frac{1}{x+1} = \\frac{3(x+1) + x}{x(x+1)} = \\frac{3x+3+x}{x(x+1)} = ' +
      '\\frac{4x+3}{x^2+x},$$\n\nfor $x \\ne 0, -1$. Check at $x = 1$: $3 + 0.5 = 3.5$ and ' +
      '$\\frac{7}{2} = 3.5$. ✓',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
    figure: {
      kind: 'area_grid',
      title: 'The common denominator x(x + 1)',
      columns: ['x'],
      rows: ['x', '+1'],
      cells: ['', ''],
      caption: 'The whole rectangle is x(x + 1). That is the size the pieces must be cut to.',
    },
  },
  {
    id: 'algebraic-fractions.add-with-lcd',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.add-a', position: 4 },
    expect:
      'Both denominators are brackets now: $x - 2$ and $x + 1$. Neither divides into the other. ' +
      'Predict the denominator of your answer before you start on the numerators.',
    statement: 'Write $\\dfrac{3}{x - 2} + \\dfrac{2}{x + 1}$ as a single fraction.',
    answer: {
      type: 'expression',
      value: '(5x-1)/((x-2)(x+1))',
      variables: ['x'],
      form: 'single-fraction',
    },
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
      '$5x - 1$; the denominators were made equal, not added. You may leave the bottom factorised ' +
      'or write it as $x^2 - x - 2$ — both are the same fraction.',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
    figure: {
      kind: 'area_grid',
      title: 'The common denominator (x − 2)(x + 1)',
      columns: ['x', '+1'],
      rows: ['x', '−2'],
      cells: ['', '', '', ''],
      caption: 'Both fractions have to be re-cut into pieces this size before they can be added.',
    },
  },
  {
    id: 'algebraic-fractions.add-a-5',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.add-a', position: 5 },
    expect:
      'The second denominator has become $(x-2)^2$ — the *same* bracket as the first, squared. ' +
      'Multiplying the two denominators would give $(x-2)^3$. Do you really need three of them?',
    statement: 'Write $\\dfrac{3}{x - 2} + \\dfrac{2}{(x-2)^2}$ as a single fraction.',
    answer: {
      type: 'expression',
      value: '(3x-4)/((x-2)^2)',
      variables: ['x'],
      form: 'single-fraction',
    },
    cpaPrompts: {
      concrete:
        'One strip is cut into $(x-2)$-sized pieces, the other into pieces $(x-2)$ times smaller ' +
        'again. Which strip already has the smaller pieces? Re-cut only the other one.',
      pictorial:
        'Write both denominators as lists of factors: $(x-2)$ and $(x-2)(x-2)$. The common ' +
        'denominator takes each different factor the *most* times it appears in either list.',
      abstract:
        'LCD $= (x-2)^2$, not $(x-2)^3$. Multiply the first fraction top and bottom by $(x-2)$ ' +
        'only, then add.',
    },
    hints: [
      'Write each denominator as a product of brackets. How many $(x-2)$s does each one contain?',
      'The LCD needs two $(x-2)$s, because that is the most either denominator has. So the LCD is ' +
        '$(x-2)^2$.',
      'Multiply the first fraction top and bottom by $(x-2)$: $\\frac{3(x-2)}{(x-2)^2}$. Now add ' +
        '$3(x-2) + 2$.',
    ],
    solution:
      '$$\\frac{3}{x-2} + \\frac{2}{(x-2)^2} = \\frac{3(x-2)}{(x-2)^2} + \\frac{2}{(x-2)^2} = ' +
      '\\frac{3x - 6 + 2}{(x-2)^2} = \\frac{3x-4}{(x-2)^2}, \\quad x \\ne 2.$$\n\n' +
      'The rule: **the LCD is not always the product of the denominators.** Take each distinct ' +
      'factor as many times as it appears in the denominator that uses it most.',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
  },
  {
    id: 'algebraic-fractions.add-a-6',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.add-a', position: 6 },
    expect:
      'The second denominator is $x^2 - 4$ this time. It looks unrelated to $x - 2$ — but ' +
      'factorise it before you decide. What is the LCD really?',
    statement: 'Write $\\dfrac{3}{x - 2} + \\dfrac{2}{x^2 - 4}$ as a single fraction.',
    answer: {
      type: 'expression',
      value: '(3x+8)/(x^2-4)',
      variables: ['x'],
      form: 'single-fraction',
    },
    cpaPrompts: {
      concrete:
        'One denominator is hiding inside the other. Split $x^2 - 4$ into its two pieces and lay ' +
        'them next to the piece $x - 2$. How many different pieces are there altogether?',
      pictorial:
        'Two lists of factors: $\\{x-2\\}$ and $\\{x-2,\\ x+2\\}$. The LCD is the shortest list ' +
        'that contains both. Write it out.',
      abstract:
        '$x^2 - 4 = (x-2)(x+2)$, so the LCD is $(x-2)(x+2)$. Only the first fraction needs ' +
        'scaling, by $(x+2)$.',
    },
    hints: [
      'Factorise $x^2 - 4$ first. It is a difference of two squares.',
      '$x^2 - 4 = (x-2)(x+2)$, and the first denominator is already one of those factors. So the ' +
        'LCD is $(x-2)(x+2)$ — the second denominator itself.',
      'Multiply the first fraction top and bottom by $(x+2)$, then add $3(x+2) + 2$.',
    ],
    solution:
      '$$\\frac{3}{x-2} + \\frac{2}{x^2-4} = \\frac{3(x+2)}{(x-2)(x+2)} + \\frac{2}{(x-2)(x+2)} ' +
      '= \\frac{3x + 6 + 2}{(x-2)(x+2)} = \\frac{3x+8}{x^2-4},$$\n\nfor $x \\ne 2, -2$. This is ' +
      'the same rule as the last item wearing a disguise: **factorise every denominator first, ' +
      'then build the LCD from the distinct factors.** Multiplying $(x-2)$ by $(x^2-4)$ would ' +
      'have given a denominator with an extra $(x-2)$ that has to be cancelled again at the end.',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
  },

  // §5.2–5.3 — tier 2
  {
    id: 'algebraic-fractions.subtract-leading-minus',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 2,
    statement: 'Write $\\dfrac{5}{x - 3} - \\dfrac{2}{x + 1}$ as a single fraction.',
    answer: {
      type: 'expression',
      value: '(3x+11)/((x-3)(x+1))',
      variables: ['x'],
      form: 'single-fraction',
    },
    cpaPrompts: {
      concrete:
        'Taking pieces away needs the pieces to match just as much as adding does. Re-cut both ' +
        'strips into $(x-3)(x+1)$-sized pieces, then take the second count from the first.',
      pictorial:
        'Write the numerator as $5(x+1) - 2(x-3)$ and put a ring round that second bracket. The ' +
        'minus sign in front of it reaches every term inside — which terms are those?',
      abstract:
        'LCD $= (x-3)(x+1)$. The numerator is $5(x+1) - 2(x-3)$; the minus multiplies *both* terms ' +
        'of the second bracket, so $-2 \\times (-3) = +6$.',
    },
    hints: [
      'The denominators share no factor, so the LCD is $(x-3)(x+1)$.',
      'The numerator is $5(x+1) - 2(x-3)$. Keep that second bracket until you have expanded it.',
      '$-2 \\times x = -2x$ and $-2 \\times (-3) = +6$. So the numerator is $5x + 5 - 2x + 6$.',
    ],
    solution:
      '$$\\frac{5}{x-3} - \\frac{2}{x+1} = \\frac{5(x+1) - 2(x-3)}{(x-3)(x+1)} = ' +
      '\\frac{5x + 5 - 2x + 6}{(x-3)(x+1)} = \\frac{3x + 11}{(x-3)(x+1)},$$\n\nfor $x \\ne 3, -1$. ' +
      'Check at $x = 0$: $-\\frac{5}{3} - 2 = -\\frac{11}{3}$ and $\\frac{11}{-3} = ' +
      '-\\frac{11}{3}$. ✓ Writing $5x + 5 - 2x - 6$ is the classic slip.',
    misconceptionCodes: [
      'algebraic-fractions.sign-lost-in-bracket',
      'algebraic-fractions.add-tops-and-bottoms',
    ],
  },
  {
    id: 'algebraic-fractions.whole-minus-fraction',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 2,
    statement: 'Write $2 - \\dfrac{3}{x + 1}$ as a single fraction.',
    answer: { type: 'expression', value: '(2x-1)/(x+1)', variables: ['x'], form: 'single-fraction' },
    cpaPrompts: {
      concrete:
        'You have two whole strips and you want to take away three pieces of size ' +
        '$\\frac{1}{x+1}$. How many pieces of that size is a whole strip worth?',
      pictorial:
        'Draw two bars, each cut into $x+1$ pieces. Together that is $2(x+1)$ pieces. Now cross ' +
        'out three of them.',
      abstract:
        'Write the $2$ as $\\frac{2(x+1)}{x+1}$, then subtract over the common denominator.',
    },
    hints: [
      'A whole number is a fraction too. What is $2$ written with $x+1$ underneath?',
      '$2 = \\frac{2(x+1)}{x+1}$.',
      'Now subtract: $\\frac{2(x+1) - 3}{x+1}$, and expand the bracket on top.',
    ],
    solution:
      '$$2 - \\frac{3}{x+1} = \\frac{2(x+1)}{x+1} - \\frac{3}{x+1} = \\frac{2x + 2 - 3}{x+1} = ' +
      '\\frac{2x-1}{x+1}, \\quad x \\ne -1.$$\n\nCheck at $x = 1$: $2 - 1.5 = 0.5$ and ' +
      '$\\frac{1}{2} = 0.5$. ✓',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
  },
  {
    id: 'algebraic-fractions.three-fractions',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 2,
    statement: 'Write $\\dfrac{1}{x} + \\dfrac{1}{2x} - \\dfrac{1}{3x}$ as a single fraction.',
    answer: { type: 'expression', value: '7/(6x)', variables: ['x'], form: 'single-fraction' },
    cpaPrompts: {
      concrete:
        'Three strips, cut into pieces of size $x$, $2x$ and $3x$. What is the smallest piece all ' +
        'three can be re-cut into without any leftovers?',
      pictorial:
        'A bar in $6x$-ths. The first fraction covers six of them, the second three, the third ' +
        'two. Shade, then cross out. What is left shaded?',
      abstract:
        'The LCD of $x$, $2x$ and $3x$ is $6x$. Rewrite all three, then combine the numerators ' +
        'with their signs: $6 + 3 - 2$.',
    },
    hints: [
      'What is the smallest expression that $x$, $2x$ and $3x$ all divide into?',
      'The LCD is $6x$: $\\frac{6}{6x} + \\frac{3}{6x} - \\frac{2}{6x}$.',
      'Combine the numerators in order, keeping the minus on the last one.',
    ],
    solution:
      '$$\\frac{1}{x} + \\frac{1}{2x} - \\frac{1}{3x} = \\frac{6}{6x} + \\frac{3}{6x} - ' +
      '\\frac{2}{6x} = \\frac{6 + 3 - 2}{6x} = \\frac{7}{6x}, \\quad x \\ne 0.$$\n\nCheck at ' +
      '$x = 1$: $1 + 0.5 - 0.3333\\ldots = 1.1666\\ldots$ and $\\frac{7}{6} = 1.1666\\ldots$ ✓',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
  },
  {
    id: 'algebraic-fractions.missing-numerator',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 2,
    statement:
      'For every value of $x$,\n$$\\frac{4}{x-1} + \\frac{k}{x+2} = \\frac{6x+6}{(x-1)(x+2)},$$' +
      '\nwhere $k$ is a number. Find $k$.',
    answer: { type: 'number', value: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The answer has already been worked out for you and the question is what went in. Add the ' +
        'left-hand side as usual, leaving $k$ as a letter, and see what the top comes to.',
      pictorial:
        'Both sides are already over the same denominator $(x-1)(x+2)$, so only the numerators can ' +
        'differ. Write the two numerators one above the other and compare them term by term.',
      abstract:
        'Combining gives $\\frac{4(x+2) + k(x-1)}{(x-1)(x+2)}$. Expand the numerator, collect the ' +
        '$x$ terms, and match the coefficient of $x$ with $6$.',
    },
    hints: [
      'Add the two fractions on the left in the usual way, treating $k$ as if it were a number ' +
        'you happen not to know yet.',
      'The numerator becomes $4(x+2) + k(x-1) = 4x + 8 + kx - k = (4+k)x + (8-k)$.',
      'That must equal $6x + 6$, so $4 + k = 6$.',
    ],
    solution:
      'Adding the left-hand side over the common denominator $(x-1)(x+2)$:\n\n' +
      '$$\\frac{4(x+2) + k(x-1)}{(x-1)(x+2)} = \\frac{(4+k)x + (8-k)}{(x-1)(x+2)}.$$\n\n' +
      'The denominators already match, so the numerators must: $(4+k)x + (8-k) = 6x + 6$. ' +
      'Comparing the $x$ terms, $4 + k = 6$, so $k = 2$. Comparing the constants as a check: ' +
      '$8 - 2 = 6$. ✓',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
  },

  // §5.2–5.3 — tier 3
  {
    id: 'algebraic-fractions.two-leg-journey',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 3,
    statement:
      'A delivery rider covers the first $30$ km of a route at a steady $x$ km/h and the last ' +
      '$30$ km at a steady $(x + 10)$ km/h. Write a single fraction, in terms of $x$, for the ' +
      'number of hours the whole route takes.',
    answer: {
      type: 'expression',
      value: '(60x+300)/(x^2+10x)',
      variables: ['x'],
      form: 'single-fraction',
    },
    cpaPrompts: {
      concrete:
        'Try it with real numbers first: at $60$ km/h, how long does $30$ km take? Now do the ' +
        'same reasoning with $x$ in place of the $60$.',
      pictorial:
        'Draw the route as two bars laid end to end and label each with its own time. The answer ' +
        'is the two bars joined — so the two times have to be added.',
      abstract:
        'Time $=$ distance $\\div$ speed, so the two times are $\\frac{30}{x}$ and ' +
        '$\\frac{30}{x+10}$. Add them over the LCD $x(x+10)$.',
    },
    hints: [
      'How do you get a time from a distance and a speed? Write down the time for each half of the ' +
        'route separately.',
      'The two times are $\\frac{30}{x}$ and $\\frac{30}{x+10}$. The whole route takes their sum.',
      'The LCD is $x(x+10)$: $\\frac{30(x+10) + 30x}{x(x+10)}$. Expand and collect the top.',
    ],
    solution:
      'The first leg takes $\\frac{30}{x}$ hours and the second $\\frac{30}{x+10}$ hours. ' +
      'Together:\n\n$$\\frac{30}{x} + \\frac{30}{x+10} = \\frac{30(x+10) + 30x}{x(x+10)} = ' +
      '\\frac{60x + 300}{x^2 + 10x} \\text{ hours}.$$\n\nCheck at $x = 20$: $\\frac{30}{20} + ' +
      '\\frac{30}{30} = 1.5 + 1 = 2.5$ hours, and $\\frac{1200+300}{400+200} = \\frac{1500}{600} ' +
      '= 2.5$. ✓',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
  },
  {
    id: 'algebraic-fractions.two-taps',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 3,
    statement:
      'One tap on its own fills a water butt in $x$ minutes. A second tap on its own fills the ' +
      'same butt in $(x + 6)$ minutes. Write a single fraction, in terms of $x$, for the share of ' +
      'the butt that the two taps together fill in one minute.',
    answer: {
      type: 'expression',
      value: '(2x+6)/(x^2+6x)',
      variables: ['x'],
      form: 'single-fraction',
    },
    cpaPrompts: {
      concrete:
        'If a tap fills the butt in $5$ minutes, what share of it does it fill in one minute? Say ' +
        'that out loud, then say it again with $x$ instead of $5$.',
      pictorial:
        'Draw the butt as a bar. Shade the part the first tap fills in a minute, then shade the ' +
        'part the second one adds. The answer is the total shaded.',
      abstract:
        'Each tap fills $\\frac{1}{x}$ and $\\frac{1}{x+6}$ of the butt per minute. Add them over ' +
        'the LCD $x(x+6)$.',
    },
    hints: [
      'A tap that takes $x$ minutes for the whole butt fills what fraction of it in one minute?',
      'The two shares are $\\frac{1}{x}$ and $\\frac{1}{x+6}$, and they add.',
      'LCD $= x(x+6)$: $\\frac{(x+6) + x}{x(x+6)}$.',
    ],
    solution:
      'In one minute the first tap fills $\\frac{1}{x}$ of the butt and the second fills ' +
      '$\\frac{1}{x+6}$. Together:\n\n$$\\frac{1}{x} + \\frac{1}{x+6} = \\frac{(x+6) + x}{x(x+6)} ' +
      '= \\frac{2x+6}{x^2+6x}.$$\n\nCheck at $x = 6$: $\\frac{1}{6} + \\frac{1}{12} = ' +
      '\\frac{1}{4}$, and $\\frac{12+6}{36+36} = \\frac{18}{72} = \\frac{1}{4}$. ✓',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
  },

  // -------------------------------------------------------------------------
  // §5.4 solve-fractional-equations — tier 1, family algebraic-fractions.solve-a
  // -------------------------------------------------------------------------
  {
    id: 'algebraic-fractions.solve-a-1',
    skillIds: ['algebraic-fractions.solve-fractional-equations'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.solve-a', position: 1 },
    statement: 'Solve $\\dfrac{3}{x} = 6$.',
    answer: { type: 'number', value: 0.5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'A balance: three pieces of size $\\frac{1}{x}$ on the left, six units on the right. ' +
        'Multiply *both* pans by $x$ and the fraction disappears. What is on each pan now?',
      pictorial:
        'Write the equation with $x$ hovering above it and an arrow to each side. Under the left ' +
        'arrow write what survives; under the right arrow write $6x$.',
      abstract:
        'Multiply both sides by $x$ to get $3 = 6x$, then divide both sides by $6$. Check that ' +
        'the answer does not make the denominator zero.',
    },
    hints: [
      'The $x$ is underneath. Multiply both sides of the equation by $x$ so that it moves up.',
      'That gives $3 = 6x$. Do not forget the right-hand side gets multiplied too.',
      'Divide both sides by $6$.',
    ],
    solution:
      'Multiplying both sides by $x$ (which is allowed since $x \\ne 0$):\n\n$$3 = 6x \\implies ' +
      'x = \\frac{3}{6} = 0.5.$$\n\nCheck in the original: $\\frac{3}{0.5} = 6$. ✓',
    misconceptionCodes: ['algebraic-fractions.sign-lost-in-bracket'],
  },
  {
    id: 'algebraic-fractions.solve-a-2',
    skillIds: ['algebraic-fractions.solve-fractional-equations'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.solve-a', position: 2 },
    expect:
      'The denominator is $x - 2$ instead of $x$. You will still multiply both sides by it. Do ' +
      'you expect the answer to be $0.5$ again, or $0.5$ shifted by something?',
    statement: 'Solve $\\dfrac{3}{x - 2} = 6$.',
    answer: { type: 'number', value: 2.5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Same balance, but each left-hand piece is now of size $\\frac{1}{x-2}$. Multiply both ' +
        'pans by the whole bracket $(x-2)$, not just by $x$.',
      pictorial:
        'Draw the arrow from $(x-2)$ to both sides. On the left the bracket cancels; on the right ' +
        'it multiplies the $6$, so write $6(x-2)$ and keep the bracket.',
      abstract:
        'Multiply through by $(x-2)$: $3 = 6(x-2)$. Expand, and remember $6 \\times (-2) = -12$.',
    },
    hints: [
      'Multiply both sides by the whole denominator $(x - 2)$.',
      '$3 = 6(x-2)$. Expand the bracket: $6 \\times x$ and $6 \\times (-2)$.',
      '$3 = 6x - 12$, so $6x = 15$.',
    ],
    solution:
      'Multiplying both sides by $(x-2)$, which is allowed since $x \\ne 2$:\n\n$$3 = 6(x-2) = ' +
      '6x - 12 \\implies 6x = 15 \\implies x = 2.5.$$\n\nCheck: $\\frac{3}{2.5 - 2} = ' +
      '\\frac{3}{0.5} = 6$. ✓ The answer is the previous one plus $2$, because the bracket has ' +
      'simply shifted the whole question along by $2$.',
    misconceptionCodes: ['algebraic-fractions.sign-lost-in-bracket'],
  },
  {
    id: 'algebraic-fractions.solve-a-3',
    skillIds: ['algebraic-fractions.solve-fractional-equations'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.solve-a', position: 3 },
    expect:
      'The $6$ on the right has become a fraction, $\\dfrac{6}{x+1}$. There are now two ' +
      'denominators to clear, not one. What do you have to multiply by this time?',
    statement: 'Solve $\\dfrac{3}{x - 2} = \\dfrac{6}{x + 1}$.',
    answer: { type: 'number', value: 5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Both pans now hold fraction pieces, of different sizes. One multiplier has to clear both: ' +
        'what single expression contains $(x-2)$ and $(x+1)$?',
      pictorial:
        'Put $(x-2)(x+1)$ above the equation and draw an arrow to each side. Under the left arrow ' +
        'write $3(x+1)$; under the right write $6(x-2)$.',
      abstract:
        'Multiply through by $(x-2)(x+1)$, or cross-multiply: $3(x+1) = 6(x-2)$. Expand both sides ' +
        'and solve.',
    },
    hints: [
      'One fraction equals another, so multiply both sides by both denominators — this is what ' +
        '"cross-multiplying" is.',
      '$3(x+1) = 6(x-2)$. Expand both brackets carefully.',
      '$3x + 3 = 6x - 12$, so $15 = 3x$.',
    ],
    solution:
      'Multiplying both sides by $(x-2)(x+1)$:\n\n$$3(x+1) = 6(x-2)$$\n$$3x + 3 = 6x - 12$$\n' +
      '$$15 = 3x \\implies x = 5.$$\n\nCheck: $\\frac{3}{3} = 1$ and $\\frac{6}{6} = 1$. ✓ ' +
      'Neither denominator is zero at $x = 5$, so the root stands.',
    misconceptionCodes: ['algebraic-fractions.sign-lost-in-bracket'],
  },
  {
    id: 'algebraic-fractions.solve-a-4',
    skillIds: ['algebraic-fractions.solve-fractional-equations'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.solve-a', position: 4 },
    expect:
      'The unknown has moved: it is on top now, and the denominators are plain numbers. Will the ' +
      'method change at all, and what is the multiplier this time?',
    statement: 'Solve $\\dfrac{x}{3} + \\dfrac{x}{4} = 7$.',
    answer: { type: 'number', value: 12, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'A bar of length $x$ cut into thirds, and the same bar cut into quarters. One third plus ' +
        'one quarter of the bar is $7$. Re-cut both into twelfths — how many twelfths is that?',
      pictorial:
        'Put $12$ above the equation and draw an arrow to all three terms, including the $7$. ' +
        'Write what survives under each arrow.',
      abstract:
        'The LCD of $3$ and $4$ is $12$. Multiplying through gives $4x + 3x = 84$.',
    },
    hints: [
      'What is the smallest number that both $3$ and $4$ divide into? Multiply every term by it.',
      'Multiplying by $12$: $\\frac{x}{3} \\times 12 = 4x$, $\\frac{x}{4} \\times 12 = 3x$, and ' +
        '$7 \\times 12 = 84$.',
      '$4x + 3x = 84$, so $7x = 84$.',
    ],
    solution:
      'The LCD of $3$ and $4$ is $12$. Multiplying **every** term by $12$:\n\n$$4x + 3x = 84 ' +
      '\\implies 7x = 84 \\implies x = 12.$$\n\nCheck: $\\frac{12}{3} + \\frac{12}{4} = 4 + 3 = ' +
      '7$. ✓ Multiplying only the fractions and leaving the $7$ alone is the commonest error here.',
    misconceptionCodes: ['algebraic-fractions.sign-lost-in-bracket'],
  },
  {
    id: 'algebraic-fractions.fractional-equation-lcd',
    skillIds: [
      'algebraic-fractions.solve-fractional-equations',
      'algebraic-fractions.identify-restrictions-extraneous',
    ],
    tier: 1,
    sequence: { family: 'algebraic-fractions.solve-a', position: 5 },
    expect:
      'Three terms this time, and the third denominator is a quadratic. Factorise it before you ' +
      'do anything else — do you expect the LCD to be bigger than $(x-2)(x+1)$, or exactly that?',
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
    id: 'algebraic-fractions.solve-a-6',
    skillIds: ['algebraic-fractions.solve-fractional-equations'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.solve-a', position: 6 },
    expect:
      'This time there is an $x$ on the top of one fraction as well as underneath. When you ' +
      'clear the denominators you will get an $x \\times x$. How many answers do you now expect?',
    statement: 'Solve $\\dfrac{x}{x - 1} + \\dfrac{2}{x} = 3$.',
    answer: { type: 'set', values: [0.5, 2], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Multiply both pans of the balance by $x(x-1)$. Every fraction piece becomes a whole one — ' +
        'but the left-hand pan now has an $x$ multiplied by an $x$. What shape of equation is that?',
      pictorial:
        'Write $x(x-1)$ above the equation with an arrow to each of the three terms, including ' +
        'the $3$. Under the arrows: $x \\cdot x$, $2(x-1)$ and $3x(x-1)$.',
      abstract:
        'LCD $= x(x-1)$, so $x^2 + 2(x-1) = 3x(x-1)$. Expand, bring everything to one side, and ' +
        'factorise the quadratic.',
    },
    hints: [
      'The LCD is $x(x-1)$. Multiply every term by it, the $3$ included.',
      '$x^2 + 2(x-1) = 3x(x-1)$, so $x^2 + 2x - 2 = 3x^2 - 3x$.',
      'Collect everything on one side: $2x^2 - 5x + 2 = 0$. That factorises as $(2x-1)(x-2)$.',
    ],
    solution:
      'The LCD is $x(x-1)$, with $x \\ne 0, 1$. Multiplying through:\n\n$$x^2 + 2(x-1) = ' +
      '3x(x-1)$$\n$$x^2 + 2x - 2 = 3x^2 - 3x$$\n$$0 = 2x^2 - 5x + 2 = (2x-1)(x-2).$$\n\n' +
      'So $x = 0.5$ or $x = 2$. Neither is excluded, so both stand. Check $x = 2$: $\\frac{2}{1} ' +
      '+ \\frac{2}{2} = 3$. ✓ Check $x = 0.5$: $\\frac{0.5}{-0.5} + \\frac{2}{0.5} = -1 + 4 = 3$. ✓' +
      '\n\nThe payoff: clearing denominators can raise the degree of the equation, so a fractional ' +
      'equation may well have **two** answers. Stopping at the first one loses half the solution.',
    misconceptionCodes: [
      'algebraic-fractions.sign-lost-in-bracket',
      'algebraic-fractions.unchecked-root',
    ],
  },

  // §5.4 — tier 2
  {
    id: 'algebraic-fractions.unknown-both-places',
    skillIds: ['algebraic-fractions.solve-fractional-equations'],
    tier: 2,
    statement: 'Solve $\\dfrac{2x + 1}{x - 3} = 3$.',
    answer: { type: 'number', value: 10, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'There is an $x$ above the line and an $x$ below it. Multiply both pans by $(x-3)$ and ' +
        'watch what happens to each side.',
      pictorial:
        'Draw the arrow from $(x-3)$ to both sides. On the left the bracket cancels and the whole ' +
        'numerator survives; on the right you get $3(x-3)$ — keep it in a bracket.',
      abstract:
        'Multiply by $(x-3)$: $2x + 1 = 3(x-3)$. Expand, then gather the $x$ terms on one side.',
    },
    hints: [
      'Multiply both sides by $(x-3)$. The whole numerator $2x+1$ survives on the left.',
      '$2x + 1 = 3(x - 3) = 3x - 9$.',
      'Take $2x$ from both sides: $1 = x - 9$.',
    ],
    solution:
      'Multiplying both sides by $(x-3)$, with $x \\ne 3$:\n\n$$2x + 1 = 3(x-3) = 3x - 9 \\implies ' +
      '1 + 9 = 3x - 2x \\implies x = 10.$$\n\nCheck: $\\frac{21}{7} = 3$. ✓ A common slip is to ' +
      'cancel the $x$s in $\\frac{2x+1}{x-3}$ — they are terms, not factors, so they cannot go.',
    misconceptionCodes: [
      'algebraic-fractions.cancel-terms-not-factors',
      'algebraic-fractions.sign-lost-in-bracket',
    ],
  },
  {
    id: 'algebraic-fractions.equation-with-constant',
    skillIds: ['algebraic-fractions.solve-fractional-equations'],
    tier: 2,
    statement: 'Solve $\\dfrac{4}{x} - \\dfrac{1}{3} = \\dfrac{1}{x}$.',
    answer: { type: 'number', value: 9, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Three different piece sizes here: $\\frac{1}{x}$, $\\frac{1}{3}$ and $\\frac{1}{x}$ again. ' +
        'What single multiplier turns all three into whole pieces at once?',
      pictorial:
        'Put $3x$ above the equation and draw an arrow to every term — there are three of them. ' +
        'Write the survivor under each arrow.',
      abstract:
        'LCD $= 3x$. Multiplying through gives $12 - x = 3$. The $\\frac{1}{3}$ term becomes $-x$, ' +
        'not $-3$.',
    },
    hints: [
      'The denominators are $x$, $3$ and $x$. What is the smallest expression all three divide into?',
      'Multiply every term by $3x$: $\\frac{4}{x} \\times 3x = 12$, $\\frac{1}{3} \\times 3x = x$, ' +
        '$\\frac{1}{x} \\times 3x = 3$.',
      '$12 - x = 3$. Now solve for $x$.',
    ],
    solution:
      'The LCD is $3x$, with $x \\ne 0$. Multiplying every term:\n\n$$12 - x = 3 \\implies x = 9.$$' +
      '\n\nCheck: $\\frac{4}{9} - \\frac{1}{3} = \\frac{4}{9} - \\frac{3}{9} = \\frac{1}{9}$, ' +
      'and the right-hand side is $\\frac{1}{9}$. ✓ The constant term is where the marks often ' +
      'go missing: $-\\frac{1}{3}$ multiplied by $3x$ is $-x$, so that $x$ must stay in the equation.',
    misconceptionCodes: ['algebraic-fractions.sign-lost-in-bracket'],
  },
  {
    id: 'algebraic-fractions.equation-mixed-lcd',
    skillIds: ['algebraic-fractions.solve-fractional-equations'],
    tier: 2,
    statement: 'Solve $\\dfrac{x}{x + 2} + \\dfrac{1}{2} = \\dfrac{4}{x + 2}$.',
    answer: { type: 'number', value: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two of the three terms already have the same denominator. Only the $\\frac{1}{2}$ is out ' +
        'of step. What is the smallest multiplier that fixes all three?',
      pictorial:
        'Write $2(x+2)$ above the equation with an arrow to each term. Under the arrows: $2x$, ' +
        '$(x+2)$ and $8$.',
      abstract:
        'LCD $= 2(x+2)$. Multiplying through gives $2x + (x+2) = 8$, a linear equation.',
    },
    hints: [
      'Two denominators are $x+2$ and one is $2$. The LCD is $2(x+2)$.',
      'Multiply each term: $\\frac{x}{x+2} \\times 2(x+2) = 2x$; $\\frac{1}{2} \\times 2(x+2) = ' +
        'x+2$; $\\frac{4}{x+2} \\times 2(x+2) = 8$.',
      '$2x + x + 2 = 8$, so $3x = 6$.',
    ],
    solution:
      'The LCD is $2(x+2)$, with $x \\ne -2$. Multiplying every term:\n\n$$2x + (x + 2) = 8 ' +
      '\\implies 3x = 6 \\implies x = 2.$$\n\nCheck: $\\frac{2}{4} + \\frac{1}{2} = 1$ and ' +
      '$\\frac{4}{4} = 1$. ✓ Note that $x = 2$ is not an excluded value; the excluded value here ' +
      'is $x = -2$.',
    misconceptionCodes: [
      'algebraic-fractions.sign-lost-in-bracket',
      'algebraic-fractions.unchecked-root',
    ],
  },

  // §5.4 — tier 3
  {
    id: 'algebraic-fractions.two-pipes-tank',
    skillIds: ['algebraic-fractions.solve-fractional-equations'],
    tier: 3,
    statement:
      'A narrow pipe on its own fills a tank in $x$ hours. A wider pipe on its own fills the same ' +
      'tank in $(x - 3)$ hours. With both running the tank is full after $2$ hours. Find $x$.',
    answer: { type: 'number', value: 6, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Think about one hour at a time. If a pipe takes $6$ hours for the whole tank, how much of ' +
        'the tank does it deliver in one hour? Say the same thing for a pipe that takes $x$ hours.',
      pictorial:
        'Draw the tank as a bar. In one hour the narrow pipe fills one slice and the wide pipe ' +
        'fills another. Together they fill half the tank, because two hours does the lot.',
      abstract:
        'In one hour: $\\frac{1}{x} + \\frac{1}{x-3} = \\frac{1}{2}$. Clear the denominators with ' +
        'the LCD $2x(x-3)$ and solve the quadratic that appears.',
    },
    hints: [
      'Work out what each pipe does in *one* hour, as a fraction of the tank. Then say what the ' +
        'two of them together do in one hour.',
      'The equation is $\\frac{1}{x} + \\frac{1}{x-3} = \\frac{1}{2}$. Multiply every term by ' +
        '$2x(x-3)$.',
      '$2(x-3) + 2x = x(x-3)$, which rearranges to $x^2 - 7x + 6 = 0$. Factorise it, then think ' +
        'about which root can be a real time.',
    ],
    solution:
      'In one hour the narrow pipe fills $\\frac{1}{x}$ of the tank and the wide one ' +
      '$\\frac{1}{x-3}$; together they fill $\\frac{1}{2}$ of it. So\n\n$$\\frac{1}{x} + ' +
      '\\frac{1}{x-3} = \\frac{1}{2}.$$\n\nMultiplying by $2x(x-3)$: $2(x-3) + 2x = x(x-3)$, so ' +
      '$4x - 6 = x^2 - 3x$ and $x^2 - 7x + 6 = 0$, giving $(x-1)(x-6) = 0$.\n\n$x = 1$ would make ' +
      'the wide pipe take $-2$ hours, which is impossible, so\n\n$$x = 6.$$\n\nCheck: ' +
      '$\\frac{1}{6} + \\frac{1}{3} = \\frac{1}{2}$. ✓',
    misconceptionCodes: [
      'algebraic-fractions.unchecked-root',
      'algebraic-fractions.sign-lost-in-bracket',
    ],
  },
  {
    id: 'algebraic-fractions.round-trip-speed',
    skillIds: ['algebraic-fractions.solve-fractional-equations'],
    tier: 3,
    statement:
      'A cyclist rides $24$ km out along a canal path at a steady $x$ km/h and comes back along ' +
      'the same path at a steady $(x + 4)$ km/h. The whole ride takes $5$ hours. Find $x$.',
    answer: { type: 'number', value: 8, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Try a guess: at $10$ km/h out and $14$ km/h back, how long does each leg take, and is the ' +
        'total more or less than $5$ hours? Now write the same calculation with $x$ in it.',
      pictorial:
        'Two bars end to end, one for each leg, labelled with its own time. The two bars together ' +
        'measure $5$ hours.',
      abstract:
        '$\\frac{24}{x} + \\frac{24}{x+4} = 5$. Multiply through by $x(x+4)$ and solve the ' +
        'quadratic $5x^2 - 28x - 96 = 0$.',
    },
    hints: [
      'Write down the time for each leg separately. Time is distance divided by speed.',
      'The equation is $\\frac{24}{x} + \\frac{24}{x+4} = 5$. Multiply every term by $x(x+4)$.',
      '$24(x+4) + 24x = 5x(x+4)$, which becomes $5x^2 - 28x - 96 = 0$. It factorises as ' +
        '$(x - 8)(5x + 12)$.',
    ],
    solution:
      'Time out $= \\frac{24}{x}$ hours, time back $= \\frac{24}{x+4}$ hours, and the total is ' +
      '$5$:\n\n$$\\frac{24}{x} + \\frac{24}{x+4} = 5.$$\n\nMultiplying by $x(x+4)$: $24(x+4) + ' +
      '24x = 5x(x+4)$, so $48x + 96 = 5x^2 + 20x$ and\n\n$$5x^2 - 28x - 96 = 0 \\implies ' +
      '(x-8)(5x+12) = 0.$$\n\n$x = -2.4$ is not a possible speed, so $x = 8$ km/h. Check: ' +
      '$\\frac{24}{8} + \\frac{24}{12} = 3 + 2 = 5$. ✓',
    misconceptionCodes: [
      'algebraic-fractions.unchecked-root',
      'algebraic-fractions.sign-lost-in-bracket',
    ],
  },

  // -------------------------------------------------------------------------
  // §5.4–5.5 identify-restrictions-extraneous — tier 1, family
  // algebraic-fractions.restrictions-a
  // -------------------------------------------------------------------------
  {
    id: 'algebraic-fractions.restrictions-a-1',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.restrictions-a', position: 1 },
    statement: 'For which value of $x$ is $\\dfrac{5}{x}$ undefined?',
    answer: { type: 'set', values: [0], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Five sweets shared among $x$ children. Try $x = 5$, then $x = 1$. Now try $x = 0$ — how ' +
        'many sweets does each child get when there are no children?',
      pictorial:
        'Draw a number line and put a hollow circle at every value of $x$ that the fraction cannot ' +
        'accept. How many circles does this one need?',
      abstract:
        'A fraction is undefined exactly where its denominator is zero. Solve $x = 0$.',
    },
    hints: [
      'A fraction is undefined when the number underneath is zero. What is underneath here?',
      'Set the denominator equal to zero and read off the value of $x$.',
    ],
    solution:
      'The denominator is $x$, and it is zero when $x = 0$. So the expression is undefined at\n\n' +
      '$$x = 0.$$\n\nDividing by zero is not a very big answer or an infinite one — it is a ' +
      'question with no answer at all, which is why the value has to be excluded.',
    misconceptionCodes: ['algebraic-fractions.unchecked-root'],
  },
  {
    id: 'algebraic-fractions.restrictions-a-2',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.restrictions-a', position: 2 },
    expect:
      'The denominator is $x - 2$ rather than $x$. The excluded value was $0$ last time. Where do ' +
      'you expect the hollow circle to sit on the number line now?',
    statement: 'For which value of $x$ is $\\dfrac{5}{x - 2}$ undefined?',
    answer: { type: 'set', values: [2], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Five sweets shared among $x - 2$ children. If $x$ is $2$, how many children are there, ' +
        'and what happens to the sharing?',
      pictorial:
        'A number line with a hollow circle where the denominator hits zero. Mark it, and say how ' +
        'far it has moved from the circle in the previous question.',
      abstract:
        'Set the denominator to zero: $x - 2 = 0$, so the excluded value is $x = 2$.',
    },
    hints: [
      'Ask what makes the bottom equal to zero, and solve that little equation.',
      '$x - 2 = 0$ gives $x = 2$, not $x = -2$. Substitute back to be sure.',
    ],
    solution:
      'The denominator is zero when $x - 2 = 0$, that is when\n\n$$x = 2.$$\n\nSubstituting: ' +
      '$\\frac{5}{2-2} = \\frac{5}{0}$, which has no value. Compared with $\\frac{5}{x}$, the ' +
      'hollow circle has slid $2$ to the right — a bracket $x - a$ always excludes $x = a$.',
    misconceptionCodes: ['algebraic-fractions.unchecked-root'],
  },
  {
    id: 'algebraic-fractions.restrictions-a-3',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.restrictions-a', position: 3 },
    expect:
      'The denominator is now $x^2 - 9$, which factorises into two brackets. Each bracket can be ' +
      'zero on its own. How many hollow circles do you expect this time?',
    statement: 'For which values of $x$ is $\\dfrac{5}{x^2 - 9}$ undefined? Give every value.',
    answer: { type: 'set', values: [3, -3], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Put $x = 3$ into the bottom and work it out. Now put $x = -3$ in. Does squaring the ' +
        'negative make any difference to the result?',
      pictorial:
        'A number line with a hollow circle at each excluded value. This time they sit either side ' +
        'of zero, the same distance away.',
      abstract:
        'Factorise: $x^2 - 9 = (x-3)(x+3)$. A product is zero when either factor is zero, so ' +
        'solve $x - 3 = 0$ and $x + 3 = 0$.',
    },
    hints: [
      'Factorise the denominator first. $x^2 - 9$ is a difference of two squares.',
      '$(x-3)(x+3) = 0$. A product of two things is zero when at least one of them is zero.',
      'Set each bracket to zero separately: $x - 3 = 0$ and $x + 3 = 0$.',
    ],
    solution:
      '$x^2 - 9 = (x-3)(x+3)$, which is zero when $x = 3$ or $x = -3$. So the expression is ' +
      'undefined at\n\n$$x = 3 \\quad \\text{and} \\quad x = -3.$$\n\nA quadratic denominator ' +
      'usually excludes two values, one from each factor.',
    misconceptionCodes: ['algebraic-fractions.unchecked-root'],
  },
  {
    id: 'algebraic-fractions.excluded-values',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.restrictions-a', position: 4 },
    expect:
      'The denominator is $2x^2 + 6x$ now. It still factorises into two pieces, but one of them ' +
      'is a monomial rather than a bracket. Where will the two hollow circles be?',
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
    id: 'algebraic-fractions.restrictions-a-5',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.restrictions-a', position: 5 },
    expect:
      'The denominator is $(x-2)^2$: the same bracket twice. Two factors gave two excluded values ' +
      'last time. Does two *identical* factors give two excluded values as well?',
    statement: 'For which values of $x$ is $\\dfrac{5}{(x - 2)^2}$ undefined? Give every value.',
    answer: { type: 'set', values: [2], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Put $x = 2$ into $(x-2)^2$ and work it out. Now hunt for a second value that also makes ' +
        'it zero — try a few. Can you find one?',
      pictorial:
        'A number line with a hollow circle wherever the denominator is zero. Both factors are the ' +
        'same, so both circles land in the same place — and two circles on top of each other is ' +
        'one circle.',
      abstract:
        '$(x-2)^2 = (x-2)(x-2)$. Setting each factor to zero gives $x = 2$ twice, which is a ' +
        'single excluded value.',
    },
    hints: [
      'Write $(x-2)^2$ as $(x-2)(x-2)$ and set each factor to zero.',
      'Both factors give the same equation, so both give the same value of $x$.',
    ],
    solution:
      '$(x-2)^2 = (x-2)(x-2)$, and both factors are zero at the same place, so the only excluded ' +
      'value is\n\n$$x = 2.$$\n\nThe number of excluded values is the number of *different* roots ' +
      'of the denominator, not the number of factors. A repeated factor still rules out one value.',
    misconceptionCodes: ['algebraic-fractions.unchecked-root'],
  },
  {
    id: 'algebraic-fractions.restrictions-a-6',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 1,
    sequence: { family: 'algebraic-fractions.restrictions-a', position: 6 },
    expect:
      'This one is an equation, not just an expression. Write down the excluded value *before* ' +
      'you solve it. Then solve it and see where the root lands.',
    statement:
      'Solve $\\dfrac{x}{x - 3} = \\dfrac{3}{x - 3} + 4$, then say how many solutions the ' +
      'equation has. Write "none" if it has no solutions.',
    answer: {
      type: 'exact',
      value: 'none',
      accepts: ['0', 'zero', 'no solutions', 'no solution', 'it has none'],
    },
    cpaPrompts: {
      concrete:
        'Before doing any algebra, ask what $x$ is not allowed to be here. Write that value down ' +
        'and keep it in front of you while you work.',
      pictorial:
        'A number line with a hollow circle at the forbidden value. Solve the equation, plot the ' +
        'root you get, and see whether it lands on the circle.',
      abstract:
        'Multiply through by $(x-3)$ to get $x = 3 + 4(x-3)$, solve, then test the root against ' +
        'the restriction $x \\ne 3$.',
    },
    hints: [
      'What value of $x$ makes a denominator zero? Write it down before you solve anything.',
      'Multiply every term by $(x-3)$: $x = 3 + 4(x-3)$. Expand and solve.',
      'You should get $x = 3$. Now compare that with the value you wrote down at the start.',
    ],
    solution:
      'The restriction is $x \\ne 3$, because $x - 3$ is a denominator. Multiplying through by ' +
      '$(x-3)$:\n\n$$x = 3 + 4(x-3) = 3 + 4x - 12 \\implies -3x = -9 \\implies x = 3.$$\n\n' +
      'But $x = 3$ was excluded from the start, so it is not a solution of the original equation ' +
      '— it was manufactured by the multiplying step, which is only reversible when $x - 3 \\ne 0$. ' +
      'The equation therefore has **no solutions**.\n\nThis is the payoff of the sequence: the ' +
      'restrictions are not decoration. An answer that lands on one has to be thrown away, and ' +
      'sometimes that leaves nothing behind.',
    misconceptionCodes: ['algebraic-fractions.unchecked-root'],
  },

  // §5.5 — tier 2: changing the subject of a formula
  {
    id: 'algebraic-fractions.subject-linear',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 2,
    statement: 'Make $x$ the subject of $y = 3x + 2$.',
    answer: { type: 'equation', lhs: 'x', rhs: '(y-2)/3', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Think of the formula as a machine: it takes $x$, multiplies by $3$, then adds $2$. To ' +
        'run it backwards, what do you undo first — the $\\times 3$ or the $+2$?',
      pictorial:
        'Draw two boxes with arrows: $x \\to \\times 3 \\to +2 \\to y$. Now draw the same chain ' +
        'with every arrow reversed and every operation replaced by its opposite.',
      abstract:
        'Subtract $2$ from both sides, then divide both sides by $3$: $x = \\frac{y-2}{3}$.',
    },
    hints: [
      'You want $x$ on its own. What is being done to $x$, and in what order?',
      'Take $2$ from both sides first: $y - 2 = 3x$.',
      'Now divide both sides by $3$. Everything on the left, including the $y$, gets divided.',
    ],
    solution:
      '$$y = 3x + 2 \\implies y - 2 = 3x \\implies x = \\frac{y-2}{3}.$$\n\nCheck with a number: ' +
      'if $x = 4$ then $y = 14$, and $\\frac{14-2}{3} = 4$. ✓ Writing $x = \\frac{y}{3} - 2$ is ' +
      'the usual error — it divides the $y$ but not the $2$.',
    misconceptionCodes: ['algebraic-fractions.sign-lost-in-bracket'],
  },
  {
    id: 'algebraic-fractions.subject-acceleration',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 2,
    statement: 'Make $a$ the subject of $v = u + at$.',
    answer: { type: 'equation', lhs: 'a', rhs: '(v-u)/t', variables: ['a', 'v', 'u', 't'] },
    cpaPrompts: {
      concrete:
        'Cover the letter $a$ with your finger. What is left is $v = u + (\\text{something}) ' +
        '\\times t$. Get that something on its own first, then deal with the $t$.',
      pictorial:
        'Draw the right-hand side as two blocks side by side: a block $u$ and a block $at$. To ' +
        'isolate $at$, which block do you remove from both sides?',
      abstract:
        'Subtract $u$: $v - u = at$. Then divide by $t$: $a = \\frac{v-u}{t}$, for $t \\ne 0$.',
    },
    hints: [
      'The $a$ is multiplied by $t$ and then $u$ is added. Undo the addition first.',
      '$v - u = at$.',
      'Divide both sides by $t$. The whole of $v - u$ goes over the $t$, so keep it together.',
    ],
    solution:
      '$$v = u + at \\implies v - u = at \\implies a = \\frac{v-u}{t}, \\quad t \\ne 0.$$\n\n' +
      'Check with numbers: $u = 3$, $a = 2$, $t = 5$ gives $v = 13$, and $\\frac{13-3}{5} = 2$. ✓ ' +
      'The restriction $t \\ne 0$ matters — no time has passed, so no acceleration can be ' +
      'worked out.',
    misconceptionCodes: ['algebraic-fractions.sign-lost-in-bracket'],
  },
  {
    id: 'algebraic-fractions.subject-suvat',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 2,
    statement: 'Make $a$ the subject of $s = ut + \\dfrac{1}{2}at^2$.',
    answer: {
      type: 'equation',
      lhs: 'a',
      rhs: '(2*(s-u*t))/(t^2)',
      variables: ['a', 's', 'u', 't'],
    },
    cpaPrompts: {
      concrete:
        'Cover the $a$ again. The right-hand side is a $ut$ block plus a $\\frac{1}{2}t^2$ block ' +
        'worth of $a$. Which block do you take off both sides first?',
      pictorial:
        'Write the equation as $s - ut = \\frac{1}{2}at^2$ and draw the right-hand side as half a ' +
        'rectangle of area $at^2$. Doubling both sides makes it a whole rectangle.',
      abstract:
        'Subtract $ut$, multiply both sides by $2$, then divide by $t^2$: ' +
        '$a = \\frac{2(s-ut)}{t^2}$.',
    },
    hints: [
      'Get the term containing $a$ on its own first: take $ut$ from both sides.',
      '$s - ut = \\frac{1}{2}at^2$. Now get rid of the half by multiplying *both* sides by $2$.',
      '$2(s - ut) = at^2$, so divide both sides by $t^2$.',
    ],
    solution:
      '$$s = ut + \\tfrac{1}{2}at^2 \\implies s - ut = \\tfrac{1}{2}at^2 \\implies 2(s - ut) = ' +
      'at^2 \\implies a = \\frac{2(s-ut)}{t^2},$$\n\nfor $t \\ne 0$. Check with $u = 2$, $a = 4$, ' +
      '$t = 3$: $s = 6 + 18 = 24$, and $\\frac{2(24-6)}{9} = \\frac{36}{9} = 4$. ✓ The bracket ' +
      'round $s - ut$ is essential: the $2$ multiplies both terms.',
    misconceptionCodes: ['algebraic-fractions.sign-lost-in-bracket'],
  },
  {
    id: 'algebraic-fractions.subject-reciprocal',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 2,
    statement: 'Make $t$ the subject of $\\dfrac{1}{t} = \\dfrac{1}{a} + \\dfrac{1}{b}$.',
    answer: { type: 'equation', lhs: 't', rhs: '(a*b)/(a+b)', variables: ['t', 'a', 'b'] },
    cpaPrompts: {
      concrete:
        'The letter you want is stuck underneath. Combine the right-hand side into one fraction ' +
        'first — then both sides are single fractions and you can turn them both over.',
      pictorial:
        'Two fraction strips on the right, cut into $a$ and $b$ pieces. Re-cut both into $ab$ ' +
        'pieces and count. What single fraction do you get?',
      abstract:
        '$\\frac{1}{t} = \\frac{b + a}{ab}$, so taking the reciprocal of both sides gives ' +
        '$t = \\frac{ab}{a+b}$.',
    },
    hints: [
      'Add the two fractions on the right first. What is their common denominator?',
      '$\\frac{1}{a} + \\frac{1}{b} = \\frac{b+a}{ab}$, so $\\frac{1}{t} = \\frac{a+b}{ab}$.',
      'Both sides are now single fractions. Turn each of them upside down.',
    ],
    solution:
      'Combining the right-hand side over the common denominator $ab$:\n\n$$\\frac{1}{t} = ' +
      '\\frac{b + a}{ab}.$$\n\nTaking the reciprocal of both sides:\n\n$$t = \\frac{ab}{a+b}, ' +
      '\\quad a + b \\ne 0.$$\n\nCheck with $a = 3$, $b = 6$: $\\frac{1}{3} + \\frac{1}{6} = ' +
      '\\frac{1}{2}$, so $t = 2$; and $\\frac{18}{9} = 2$. ✓ Note that $t$ is **not** $a + b$: ' +
      'flipping a sum of fractions is not the same as summing the flips.',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
  },
  {
    id: 'algebraic-fractions.subject-root',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 2,
    statement: 'Make $r$ the subject of $A = \\pi r^2$, where $r$ is positive.',
    answer: { type: 'equation', lhs: 'r', rhs: 'sqrt(A/pi)', variables: ['A', 'r'] },
    cpaPrompts: {
      concrete:
        'The formula squares $r$ and then multiplies by $\\pi$. Running it backwards means ' +
        'undoing those two steps in the opposite order. Which comes off first?',
      pictorial:
        'Draw the chain $r \\to \\text{square} \\to \\times \\pi \\to A$, then reverse every arrow ' +
        'and replace each operation by its opposite.',
      abstract:
        'Divide both sides by $\\pi$ to get $r^2 = \\frac{A}{\\pi}$, then take the positive square ' +
        'root of both sides.',
    },
    hints: [
      'Two things are done to $r$: it is squared, then multiplied by $\\pi$. Undo the last one first.',
      'Divide both sides by $\\pi$: $\\frac{A}{\\pi} = r^2$.',
      'Now take the square root of the whole of $\\frac{A}{\\pi}$, not of the $A$ alone.',
    ],
    solution:
      '$$A = \\pi r^2 \\implies \\frac{A}{\\pi} = r^2 \\implies r = \\sqrt{\\frac{A}{\\pi}},$$' +
      '\n\ntaking the positive root because a radius cannot be negative. Check with $r = 5$: ' +
      '$A = 25\\pi$, and $\\sqrt{\\frac{25\\pi}{\\pi}} = \\sqrt{25} = 5$. ✓ Writing ' +
      '$r = \\frac{\\sqrt{A}}{\\pi}$ takes the root of only part of the expression.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.subject-x-both-sides',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 2,
    statement: 'Make $x$ the subject of $y = \\dfrac{2x + 1}{x - 3}$.',
    answer: { type: 'equation', lhs: 'x', rhs: '(3*y+1)/(y-2)', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'The letter $x$ appears twice — once on top and once underneath. Clear the fraction first, ' +
        'then gather every $x$ term onto one side before doing anything else.',
      pictorial:
        'After multiplying out you have $xy - 3y = 2x + 1$. Draw a line down the page: $x$ terms ' +
        'on the left, everything else on the right. Which terms have to move?',
      abstract:
        'Multiply by $(x-3)$, collect the $x$ terms, factorise $x$ out of them, then divide by the ' +
        'bracket that is left: $x = \\frac{3y+1}{y-2}$.',
    },
    hints: [
      'Multiply both sides by $(x - 3)$ to clear the fraction: $y(x-3) = 2x + 1$.',
      'Expand and gather the $x$ terms together: $xy - 2x = 3y + 1$.',
      'Both terms on the left contain an $x$ — take it out as a factor, then divide.',
    ],
    solution:
      'Multiplying by $(x-3)$:\n\n$$y(x - 3) = 2x + 1 \\implies xy - 3y = 2x + 1.$$\n\nGathering ' +
      'the $x$ terms on one side and everything else on the other:\n\n$$xy - 2x = 3y + 1 \\implies ' +
      'x(y - 2) = 3y + 1 \\implies x = \\frac{3y+1}{y-2}, \\quad y \\ne 2.$$\n\nCheck with ' +
      '$x = 5$: $y = \\frac{11}{2} = 5.5$, and $\\frac{16.5+1}{3.5} = \\frac{17.5}{3.5} = 5$. ✓ ' +
      'Taking the $x$ out as a common factor is the step that makes this work.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },

  // §5.5 — tier 3
  {
    id: 'algebraic-fractions.cone-radius',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 3,
    statement:
      'The curved outside of a paper party hat is worked out from $A = \\pi r l$, where $l$ is ' +
      'the sloping length from the tip to the rim. One hat uses $60\\pi$ cm$^2$ of paper for its ' +
      'curved outside, and its sloping length is $12$ cm. Find $r$.',
    answer: { type: 'number', value: 5, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'You know the paper used and the slope, and you want the radius. Would you rather ' +
        'substitute the numbers first, or rearrange the formula first? Try both and see which is ' +
        'tidier.',
      pictorial:
        'Write $A = \\pi r l$ with the letter you want circled. Everything else on the right has ' +
        'to be moved across the equals sign by dividing.',
      abstract:
        'Rearranged, $r = \\frac{A}{\\pi l}$. Substitute $A = 60\\pi$ and $l = 12$; the $\\pi$ ' +
        'cancels.',
    },
    hints: [
      'Which letter do you want on its own? What is it currently multiplied by?',
      'Divide both sides by $\\pi l$: $r = \\frac{A}{\\pi l}$.',
      'Put in $A = 60\\pi$ and $l = 12$. The $\\pi$ on top and the $\\pi$ underneath cancel.',
    ],
    solution:
      'Rearranging $A = \\pi r l$ gives\n\n$$r = \\frac{A}{\\pi l}.$$\n\nSubstituting $A = 60\\pi$ ' +
      'and $l = 12$:\n\n$$r = \\frac{60\\pi}{12\\pi} = 5 \\text{ cm}.$$\n\nCheck: $\\pi \\times ' +
      '5 \\times 12 = 60\\pi$. ✓ Leaving $\\pi$ in symbol form until the end avoids rounding and ' +
      'keeps the shared factor visible.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.hire-charge',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 3,
    statement:
      'A van hire firm works out what a customer pays per day from $C = \\dfrac{800 + 15d}{d}$, ' +
      'where $d$ is the number of days of the hire and $C$ is in dollars. One customer paid $55$ ' +
      'dollars a day. How many days did they hire the van for?',
    answer: { type: 'number', value: 20, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Try a few values of $d$ and see what $C$ comes to: $d = 10$, $d = 40$. Is $C$ going up or ' +
        'down as the hire gets longer? Roughly where should the answer be?',
      pictorial:
        'The total bill is a fixed block of $800$ plus a block of $15$ for each day. Dividing by ' +
        '$d$ shares the whole bill out over the days. Draw that before you write any algebra.',
      abstract:
        'Substitute $C = 55$ and solve $55 = \\frac{800+15d}{d}$ by multiplying both sides by $d$.',
    },
    hints: [
      'Put the number you were given into the formula and see what equation you are left with.',
      '$55 = \\frac{800 + 15d}{d}$. Multiply both sides by $d$ to clear the fraction.',
      '$55d = 800 + 15d$, so $40d = 800$.',
    ],
    solution:
      'Substituting $C = 55$:\n\n$$55 = \\frac{800 + 15d}{d}.$$\n\nMultiplying both sides by $d$ ' +
      '(allowed, since $d \\ne 0$):\n\n$$55d = 800 + 15d \\implies 40d = 800 \\implies d = 20.$$' +
      '\n\nCheck: $\\frac{800 + 300}{20} = \\frac{1100}{20} = 55$. ✓ The restriction $d \\ne 0$ ' +
      'is not just algebra here — a hire of no days has no daily charge to speak of.',
    misconceptionCodes: [
      'algebraic-fractions.unchecked-root',
      'algebraic-fractions.cancel-terms-not-factors',
    ],
  },

  // -------------------------------------------------------------------------
  // Tier 4 — SSDD set. One fraction, four different questions, one per skill.
  // -------------------------------------------------------------------------
  {
    id: 'algebraic-fractions.ssdd-simplify',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 4,
    sequence: { family: 'algebraic-fractions.ssdd-fraction', position: 1 },
    statement: 'Simplify $\\dfrac{x^2 - 4}{x^2 - x - 6}$.',
    answer: { type: 'expression', value: '(x-2)/(x-3)', variables: ['x'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'Build both quadratics as rectangles of tiles and read off their sides. One side is the ' +
        'same for both rectangles — which one?',
      pictorial:
        'Two rows of factor boxes. Cross out the box that appears in both rows and read off what ' +
        'is left above and below the line.',
      abstract:
        'Factorise: $x^2 - 4 = (x-2)(x+2)$ and $x^2 - x - 6 = (x-3)(x+2)$. Cancel the shared ' +
        '$(x+2)$.',
    },
    hints: [
      'Both top and bottom factorise. The top is a difference of two squares; for the bottom, find ' +
        'two numbers with sum $-1$ and product $-6$.',
      '$x^2 - 4 = (x-2)(x+2)$ and $x^2 - x - 6 = (x-3)(x+2)$.',
      'The $(x+2)$ is on both rows, so it divides out.',
    ],
    solution:
      '$$\\frac{x^2-4}{x^2-x-6} = \\frac{(x-2)(x+2)}{(x-3)(x+2)} = \\frac{x-2}{x-3},$$\n\nfor ' +
      '$x \\ne 3, -2$. Check at $x = 0$: $\\frac{-4}{-6} = \\frac{2}{3}$ and $\\frac{-2}{-3} = ' +
      '\\frac{2}{3}$. ✓ The next three questions use exactly this fraction and ask for something ' +
      'completely different each time — read each one carefully before you start.',
    misconceptionCodes: ['algebraic-fractions.cancel-terms-not-factors'],
  },
  {
    id: 'algebraic-fractions.ssdd-restrictions',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 4,
    sequence: { family: 'algebraic-fractions.ssdd-fraction', position: 2 },
    statement:
      'For which values of $x$ is $\\dfrac{x^2 - 4}{x^2 - x - 6}$ undefined? Give every value.',
    answer: { type: 'set', values: [3, -2], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Substitute $x = 3$ into the bottom and work it out. Then try $x = -2$. Then try $x = 2$ ' +
        '— why is that one different from the other two?',
      pictorial:
        'A number line with a hollow circle at each value that kills the denominator. Only the ' +
        'denominator matters here — the numerator is allowed to be zero.',
      abstract:
        'Set $x^2 - x - 6 = 0$, that is $(x-3)(x+2) = 0$. Both roots are excluded, including the ' +
        'one that cancels.',
    },
    hints: [
      'Only the denominator can make a fraction undefined. Factorise it.',
      '$(x-3)(x+2) = 0$ gives two values of $x$.',
      'Do not drop the value that cancels: the restriction comes from the *original* fraction, ' +
        'before any simplifying.',
    ],
    solution:
      'The denominator factorises as $x^2 - x - 6 = (x-3)(x+2)$, which is zero when\n\n' +
      '$$x = 3 \\quad \\text{and} \\quad x = -2.$$\n\nBoth are excluded, even though the ' +
      'simplified form $\\frac{x-2}{x-3}$ shows no sign of the $-2$. Simplifying hides a ' +
      'restriction; it does not remove it.',
    misconceptionCodes: ['algebraic-fractions.unchecked-root'],
  },
  {
    id: 'algebraic-fractions.ssdd-solve',
    skillIds: ['algebraic-fractions.solve-fractional-equations'],
    tier: 4,
    sequence: { family: 'algebraic-fractions.ssdd-fraction', position: 3 },
    statement: 'Solve $\\dfrac{x^2 - 4}{x^2 - x - 6} = 2$.',
    answer: { type: 'number', value: 4, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'This is not a "simplify" question — it is a balance, and there is a $2$ on the other pan. ' +
        'What is the cheapest way to get rid of the fraction before you start solving?',
      pictorial:
        'Write the fraction in its simplest form first, then draw the two-pan balance with ' +
        '$\\frac{x-2}{x-3}$ on the left and $2$ on the right.',
      abstract:
        'Simplify to $\\frac{x-2}{x-3} = 2$, multiply through by $(x-3)$ and solve the linear ' +
        'equation that results.',
    },
    hints: [
      'Simplifying first makes this much shorter. What did the fraction come to in the first ' +
        'question of this set?',
      '$\\frac{x-2}{x-3} = 2$. Multiply both sides by $(x-3)$.',
      '$x - 2 = 2(x-3) = 2x - 6$. Now solve for $x$.',
    ],
    solution:
      'Simplifying the left-hand side first gives $\\frac{x-2}{x-3} = 2$. Multiplying by ' +
      '$(x-3)$:\n\n$$x - 2 = 2(x - 3) = 2x - 6 \\implies 4 = x.$$\n\n$x = 4$ is not one of the ' +
      'excluded values $3$ and $-2$, so it stands. Check in the original: $\\frac{16-4}{16-4-6} ' +
      '= \\frac{12}{6} = 2$. ✓',
    misconceptionCodes: [
      'algebraic-fractions.sign-lost-in-bracket',
      'algebraic-fractions.unchecked-root',
    ],
  },
  {
    id: 'algebraic-fractions.ssdd-add',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 4,
    sequence: { family: 'algebraic-fractions.ssdd-fraction', position: 4 },
    statement:
      'Write $\\dfrac{x^2 - 4}{x^2 - x - 6} + \\dfrac{1}{x - 3}$ as a single fraction in its ' +
      'simplest form.',
    answer: { type: 'expression', value: '(x-1)/(x-3)', variables: ['x'], form: 'single-fraction' },
    cpaPrompts: {
      concrete:
        'The two fractions look as though they have nothing in common. Simplify the first one and ' +
        'look again — are the pieces the same size after all?',
      pictorial:
        'Once the first fraction is simplified, both bars are cut into $(x-3)$-sized pieces. Then ' +
        'you only have to count.',
      abstract:
        'Simplify to $\\frac{x-2}{x-3}$; the denominators now match, so add the numerators: ' +
        '$(x-2) + 1$.',
    },
    hints: [
      'Simplify the first fraction before doing anything else.',
      'It becomes $\\frac{x-2}{x-3}$, and the second fraction already has $x-3$ underneath.',
      'The pieces are the same size, so just add the tops: $(x-2) + 1$.',
    ],
    solution:
      'The first fraction simplifies to $\\frac{x-2}{x-3}$, so both denominators are already ' +
      '$x - 3$:\n\n$$\\frac{x-2}{x-3} + \\frac{1}{x-3} = \\frac{(x-2) + 1}{x-3} = ' +
      '\\frac{x-1}{x-3},$$\n\nfor $x \\ne 3, -2$. Check at $x = 0$: $\\frac{2}{3} + ' +
      '\\left(-\\frac{1}{3}\\right) = \\frac{1}{3}$, and $\\frac{-1}{-3} = \\frac{1}{3}$. ✓ ' +
      'Simplifying first turned a complicated common-denominator problem into a short addition.',
    misconceptionCodes: ['algebraic-fractions.add-tops-and-bottoms'],
  },

  // -------------------------------------------------------------------------
  // Diagnostics — one per misconception code
  // -------------------------------------------------------------------------
  {
    id: 'algebraic-fractions.dx-cancel-terms-not-factors',
    skillIds: ['algebraic-fractions.simplify-algebraic-fractions'],
    tier: 'diagnostic',
    statement: 'Simplify $\\dfrac{x^2 - 9}{2x^2 + 6x}$ as far as it will go.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        {
          label: 'A',
          value: '$\\dfrac{-9}{2 + 6x}$',
          misconceptionCode: 'algebraic-fractions.cancel-terms-not-factors',
        },
        { label: 'B', value: '$\\dfrac{x-3}{2x}$' },
        {
          label: 'C',
          value: '$\\dfrac{x^2-9}{2x(x+3)}$',
          misconceptionCode: 'expansion.factorise-incompletely',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Test the idea on numbers you can check. Is $\\frac{4+2}{4+6}$ the same as ' +
        '$\\frac{2}{6}$? Work both out before you decide what may be crossed out.',
      pictorial:
        'Draw the top as a row of boxes and the bottom as another row. A box can only be crossed ' +
        'out when a whole box on top matches a whole box underneath. Can $x^2$ be a box on its own?',
      abstract:
        'Cancelling divides top and bottom by the same thing, and that is only valid for factors. ' +
        'Factorise both parts completely first, then look for a shared bracket.',
    },
    hints: [
      'What is the $x^2$ on the top attached to — a multiplication sign or a minus sign? That ' +
        'decides whether it can be cancelled.',
      'Factorise both parts first: $x^2 - 9 = (x-3)(x+3)$ and $2x^2 + 6x = 2x(x+3)$. Now which ' +
        'whole bracket is on both rows?',
    ],
    solution:
      '$$\\frac{x^2-9}{2x^2+6x} = \\frac{(x-3)(x+3)}{2x(x+3)} = \\frac{x-3}{2x}, \\quad ' +
      'x \\ne 0, -3.$$\n\nOption A strikes out the $x^2$ on top against the $x^2$ underneath, but ' +
      'the $x^2$ on top is glued to the $-9$ by a minus sign — it is a term, not a factor. ' +
      'Option C factorises the denominator and then stops: with the numerator still written as a ' +
      'sum, nothing can be cancelled at all.',
    misconceptionCodes: [
      'algebraic-fractions.cancel-terms-not-factors',
      'expansion.factorise-incompletely',
    ],
  },
  {
    id: 'algebraic-fractions.dx-add-tops-and-bottoms',
    skillIds: ['algebraic-fractions.four-operations-rational'],
    tier: 'diagnostic',
    statement: 'Write $\\dfrac{3}{x} + \\dfrac{2}{x + 1}$ as a single fraction.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        {
          label: 'A',
          value: '$\\dfrac{5}{2x+1}$',
          misconceptionCode: 'algebraic-fractions.add-tops-and-bottoms',
        },
        { label: 'B', value: '$\\dfrac{5x+3}{x^2+x}$' },
        {
          label: 'C',
          value: '$\\dfrac{5x+1}{x^2+x}$',
          misconceptionCode: 'expansion.partial-distribution',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Test the method on halves first: does $\\frac{1}{2} + \\frac{1}{2}$ come to ' +
        '$\\frac{2}{4}$? Half a cake plus half a cake — is that a quarter of a cake?',
      pictorial:
        'Two strips, one cut into $x$ pieces and one into $x+1$ pieces. Re-cut both into ' +
        '$x(x+1)$ pieces and count how many each fraction now covers.',
      abstract:
        'The LCD is $x(x+1)$. The numerator is $3(x+1) + 2x$ — the $3$ multiplies **both** terms ' +
        'inside the bracket.',
    },
    hints: [
      'A denominator says how big the pieces are. Does adding two piece-sizes together give the ' +
        'size of the pieces you end up with?',
      'Rewrite each fraction over $x(x+1)$, then add only the numerators. Expand $3(x+1)$ in full.',
    ],
    solution:
      '$$\\frac{3}{x} + \\frac{2}{x+1} = \\frac{3(x+1) + 2x}{x(x+1)} = \\frac{3x + 3 + 2x}{x^2+x} ' +
      '= \\frac{5x+3}{x^2+x}.$$\n\nOption A adds the tops and adds the bottoms; testing it on ' +
      '$\\frac{1}{2} + \\frac{1}{2}$ gives $\\frac{2}{4}$, which is plainly wrong. Option C ' +
      'expands $3(x+1)$ as $3x + 1$, multiplying only the first term inside the bracket.',
    misconceptionCodes: [
      'algebraic-fractions.add-tops-and-bottoms',
      'expansion.partial-distribution',
    ],
  },
  {
    id: 'algebraic-fractions.dx-sign-lost-in-bracket',
    skillIds: ['algebraic-fractions.solve-fractional-equations'],
    tier: 'diagnostic',
    statement:
      'While clearing the fractions from an equation you need to expand $-2(x - 2)$. What does ' +
      'it come to?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        {
          label: 'A',
          value: '$-2x - 4$',
          misconceptionCode: 'algebraic-fractions.sign-lost-in-bracket',
        },
        { label: 'B', value: '$-2x + 4$' },
        {
          label: 'C',
          value: '$-2x - 2$',
          misconceptionCode: 'expansion.partial-distribution',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Owing two lots of a debt of $2$ is being owed $4$. Work out $-2 \\times (-2)$ on its own ' +
        'first, with no $x$ anywhere in sight, and say what sign it has.',
      pictorial:
        'Draw a one-row grid: $-2$ down the side, $x$ and $-2$ across the top. Fill in both cells ' +
        'with their signs. How many cells are there, and are they both negative?',
      abstract:
        'The $-2$ multiplies every term in the bracket: $-2 \\times x = -2x$ and $-2 \\times ' +
        '(-2) = +4$.',
    },
    hints: [
      'How many terms are inside the bracket, and how many of them does the $-2$ have to reach?',
      'Work the second product on its own: what is a negative multiplied by a negative?',
    ],
    solution:
      '$$-2(x - 2) = (-2)(x) + (-2)(-2) = -2x + 4.$$\n\nOption A keeps the minus from the front ' +
      'but forgets that it also multiplies the $-2$ inside, so two negatives never get the chance ' +
      'to make a positive. Option C multiplies only the first term and copies the $-2$ across ' +
      'untouched. Substituting $x = 0$ settles it: $-2(0-2) = 4$, so the constant must be $+4$.',
    misconceptionCodes: [
      'algebraic-fractions.sign-lost-in-bracket',
      'expansion.partial-distribution',
    ],
  },
  {
    id: 'algebraic-fractions.dx-unchecked-root',
    skillIds: ['algebraic-fractions.identify-restrictions-extraneous'],
    tier: 'diagnostic',
    statement: 'Solve $\\dfrac{3}{x - 1} - \\dfrac{2}{x + 1} = \\dfrac{4}{x^2 - 1}$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        {
          label: 'A',
          value: '$x = -1$',
          misconceptionCode: 'algebraic-fractions.unchecked-root',
        },
        { label: 'B', value: 'There is no solution.' },
        {
          label: 'C',
          value: '$x = 3$',
          misconceptionCode: 'algebraic-fractions.sign-lost-in-bracket',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Before solving anything, write down the values $x$ is not allowed to take here. Keep ' +
        'them next to you, then look at them again when a root appears.',
      pictorial:
        'A number line with a hollow circle at each forbidden value. Plot your root on the same ' +
        'line. Does it land on a circle?',
      abstract:
        '$x^2 - 1 = (x-1)(x+1)$, so the LCD is $(x-1)(x+1)$ and $x \\ne 1, -1$. Multiplying ' +
        'through gives $3(x+1) - 2(x-1) = 4$.',
    },
    hints: [
      'Factorise the right-hand denominator, then write down which values of $x$ are excluded ' +
        'before you solve.',
      'Multiplying through gives $3(x+1) - 2(x-1) = 4$. Expand carefully — what is $-2 \\times ' +
        '(-1)$? — then compare your root with the excluded values.',
    ],
    solution:
      '$x^2 - 1 = (x-1)(x+1)$, so $x \\ne 1$ and $x \\ne -1$. Multiplying through by ' +
      '$(x-1)(x+1)$:\n\n$$3(x+1) - 2(x-1) = 4$$\n$$3x + 3 - 2x + 2 = 4$$\n$$x + 5 = 4 \\implies ' +
      'x = -1.$$\n\nBut $x = -1$ was excluded from the start, so it is not a solution of the ' +
      'original equation — it was created by the multiplying step. The equation has **no ' +
      'solution**.\n\nOption A reports the root without checking it. Option C expands ' +
      '$-2(x-1)$ as $-2x - 2$, losing the sign inside the bracket, and arrives at $x = 3$.',
    misconceptionCodes: [
      'algebraic-fractions.unchecked-root',
      'algebraic-fractions.sign-lost-in-bracket',
    ],
  },
];
