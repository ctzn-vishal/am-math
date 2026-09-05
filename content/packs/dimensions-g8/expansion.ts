import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';

/**
 * Unit 3 — Expansion and Factorization of Algebraic Expressions. Hand-authored.
 *
 * Source: docs/Implementation Manual §2 (algebra tiles, area models) and the Chapter 3
 * worked examples in the content spec.
 *
 * The whole unit rests on one idea: expanding is totalling areas, and factorising is the
 * same picture read backwards. Every renderer this unit reaches for — `area_grid` and
 * `algebra_tiles` — exists to keep that visible, which is why the famously forgotten $2ab$
 * is treated here as something the student *sees* twice rather than remembers once.
 */

export const expansionSkills: SkillNode[] = [
  {
    id: 'expansion.expand-products-algebraic',
    title: 'Expand products of algebraic expressions',
    summary:
      'Multiply out brackets by totalling the areas of the pieces, and know why every term in ' +
      'one bracket has to meet every term in the other.',
    prerequisites: [],
    cpa: {
      concrete:
        'Algebra tiles laid into a rectangle. The student builds a rectangle whose sides are ' +
        '$(x + 3)$ and $(x + 2)$ out of one $x^2$ tile, five $x$ tiles and six units, and finds ' +
        'there is exactly one way it closes. The dimensions are the factors; the tiles are the ' +
        'expansion. Neither is more true than the other.',
      pictorial:
        'The area grid: a rectangle partitioned by the terms of each bracket. Every cell is one ' +
        'product, and the grid has $m \\times n$ cells for a reason — that is the visual form of ' +
        '"every term meets every term".',
      abstract:
        '$a(b + c) = ab + ac$, and $(a + b)(c + d) = ac + ad + bc + bd$. Four products because ' +
        'the grid has four cells.',
    },
    formulas: ['a(b + c) = ab + ac', '(a + b)(c + d) = ac + ad + bc + bd'],
    suggestedVisual: 'area_grid',
    misconceptions: [
      {
        code: 'expansion.partial-distribution',
        description:
          'Multiplies only the first term of the bracket, giving $2(2x + 1) = 4x + 1$, or ' +
          'multiplies brackets term-by-position: $(a+b)(c+d) = ac + bd$.',
        probe:
          'Draw the grid. How many cells does it have? Now count the terms in your answer — do the ' +
          'numbers match?',
        correction:
          'Each cell of the grid is a product that genuinely exists in the total area, so none can ' +
          'be skipped. Two terms against two terms is four cells and four products.',
      },
      {
        code: 'expansion.coefficient-not-squared',
        description:
          'Squares only the variable when squaring a term with a coefficient: writes $(3x)^2$ as ' +
          '$3x^2$ rather than $9x^2$.',
        probe:
          'Write $(3x)^2$ as $(3x) \\times (3x)$ and multiply the numbers and the letters ' +
          'separately. What do the 3s give you?',
        correction:
          'The bracket squares everything inside it. $(3x)(3x)$ gives $3 \\times 3 = 9$ and $x ' +
          '\\times x = x^2$, so $9x^2$. Reading $(3x)^2$ as $3x^2$ silently drops one of the 3s.',
      },
    ],
  },
  {
    id: 'expansion.special-algebraic-identities',
    title: 'Use perfect-square and difference-of-squares identities',
    summary:
      'Recognise $(a \\pm b)^2$ and $(a+b)(a-b)$ on sight, and be able to rebuild each from its ' +
      'picture rather than recalling it.',
    prerequisites: ['expansion.expand-products-algebraic'],
    cpa: {
      concrete:
        'Build $(a + b)^2$ as a physical square of side $a + b$. It contains an $a \\times a$ ' +
        'square, a $b \\times b$ square, and — unavoidably — **two** $a \\times b$ rectangles, ' +
        'one along each side. The student sees two of them because there are two of them.',
      pictorial:
        'The same square as an area grid, four cells labelled $a^2$, $ab$, $ab$, $b^2$. For the ' +
        'difference of squares, a square of side $a$ with a $b \\times b$ corner removed, cut and ' +
        'rearranged into an $(a+b)$ by $(a-b)$ rectangle.',
      abstract:
        '$(a + b)^2 = a^2 + 2ab + b^2$, $(a - b)^2 = a^2 - 2ab + b^2$, $(a+b)(a-b) = a^2 - b^2$. ' +
        'The middle term of the first two is the two rectangles; the absence of a middle term in ' +
        'the third is the two rectangles cancelling.',
    },
    formulas: [
      '(a + b)^2 = a^2 + 2ab + b^2',
      '(a - b)^2 = a^2 - 2ab + b^2',
      '(a + b)(a - b) = a^2 - b^2',
    ],
    suggestedVisual: 'area_grid',
    misconceptions: [
      {
        code: 'expansion.freshmans-dream',
        description:
          'Distributes the square over the sum: writes $(a + b)^2 = a^2 + b^2$, losing the middle ' +
          'term entirely.',
        probe:
          'Try it with numbers you can check: is $(3 + 4)^2$ equal to $3^2 + 4^2$? Now look at the ' +
          'square on the canvas — which pieces did $a^2 + b^2$ leave out?',
        correction:
          'A square of side $a+b$ contains four regions, not two. The two $ab$ rectangles are real ' +
          'area and have to be counted, which is where $2ab$ comes from. $49 \\neq 25$ settles it ' +
          'in one line.',
      },
      {
        code: 'expansion.middle-term-once',
        description:
          'Includes the middle term but only once: $(a + b)^2 = a^2 + ab + b^2$.',
        probe: 'How many $ab$ rectangles are in the picture? Point at each one.',
        correction:
          'There are two — one along the top, one down the side — because the square has two ' +
          'dimensions and each contributes a rectangle. Hence $2ab$.',
      },
    ],
  },
  {
    id: 'expansion.factorize-expressions-grouping',
    title: 'Factorise by grouping and special products',
    summary:
      'Read the area picture backwards: given the pieces, find the sides. Includes grouping when ' +
      'no single identity applies to the whole expression.',
    prerequisites: ['expansion.special-algebraic-identities'],
    cpa: {
      concrete:
        'The tiles again, but the task is reversed: the student is handed the pieces and asked to ' +
        'assemble the rectangle. When it closes, the sides are the factors. When it will not ' +
        'close, the expression does not factorise over the integers — and finding that out by ' +
        'trying is worth more than being told.',
      pictorial:
        'A partly-filled area grid with the headers blank. The student works out what the sides ' +
        'must have been to produce those cells.',
      abstract:
        'Take out common factors first. Then look for a perfect-square trinomial or a difference ' +
        'of squares. When four terms share no single factor, group them in pairs — or, when three ' +
        'of them form a square, group those three and treat the result as a single object.',
    },
    formulas: ['A^2 - B^2 = (A + B)(A - B)', 'a^2 \\pm 2ab + b^2 = (a \\pm b)^2'],
    suggestedVisual: 'algebra_tiles',
    misconceptions: [
      {
        code: 'expansion.group-in-pairs-blindly',
        description:
          'Reaches for pair-grouping on any four-term expression: factors $x^2 - y^2$ out of ' +
          '$x^2 - y^2 + 6x + 9$ first, then cannot proceed.',
        probe:
          'That is a reasonable first instinct. But look at what it leaves behind — do those terms ' +
          'share anything? Is there a group of **three** terms here that makes a square instead?',
        correction:
          'Grouping in pairs only helps when the pairs leave a common bracket. Here the useful ' +
          'group is the three terms $x^2 + 6x + 9 = (x+3)^2$, which turns the whole expression ' +
          'into a difference of two squares.',
      },
      {
        code: 'expansion.factorise-incompletely',
        description:
          'Stops at the first factorisation without checking whether a factor can be broken down ' +
          'further, e.g. leaving $2x^2 - 8$ as $2(x^2 - 4)$.',
        probe: 'Look at what is left inside the bracket. Is that anything you recognise?',
        correction:
          '"Factorise completely" means keep going until no factor can be split. $2(x^2 - 4)$ is ' +
          'a difference of squares away from $2(x+2)(x-2)$.',
      },
    ],
  },
];

/**
 * Problems, in bank order: skill by skill, tier 1 sequence first, then tiers 2–4 and the
 * diagnostics. The tier-1 family for expanding is Barton's own sequence, with one bridging
 * item added so that no step changes two things at once.
 */
export const expansionProblems: Problem[] = [
  // -------------------------------------------------------------------------
  // §3.1 expand-products-algebraic — tier 1: Barton's sequence, family expansion.brackets-a
  // -------------------------------------------------------------------------
  {
    id: 'expansion.brackets-a-1',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 1,
    sequence: { family: 'expansion.brackets-a', position: 1 },
    statement: 'Expand $(x + 2)(x + 3)$.',
    answer: { type: 'expression', value: 'x^2+5x+6', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Build a rectangle out of tiles that is $x + 3$ along the top and $x + 2$ down the side. ' +
        'How many $x^2$ tiles, how many $x$ tiles and how many units did you need to fill it?',
      pictorial:
        'Fill the four cells of the grid: $x$ and $+3$ across, $x$ and $+2$ down. Which two cells ' +
        'are like terms, and what do they add to?',
      abstract:
        'Every term in the first bracket meets every term in the second — four products — then ' +
        'collect the two $x$ terms.',
    },
    hints: [
      'Each term of $(x + 2)$ has to multiply each term of $(x + 3)$. How many products is that?',
      'The four products are $x \\cdot x$, $x \\cdot 3$, $2 \\cdot x$ and $2 \\cdot 3$.',
      'Add $3x$ and $2x$ together; the $x^2$ and the $6$ stay as they are.',
    ],
    solution:
      '$$(x + 2)(x + 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6.$$\n\n' +
      'Check at $x = 1$: $(3)(4) = 12$ and $1 + 5 + 6 = 12$. ✓',
    misconceptionCodes: ['expansion.partial-distribution'],
    figure: {
      kind: 'area_grid',
      title: '(x + 2)(x + 3)',
      columns: ['x', '+3'],
      rows: ['x', '+2'],
      cells: ['', '', '', ''],
      caption: 'One cell for each pair of terms. Fill all four, then add.',
    },
  },
  {
    id: 'expansion.brackets-a-2',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 1,
    sequence: { family: 'expansion.brackets-a', position: 2 },
    expect:
      'Only the $+3$ became a $+4$. Before you expand — which terms of the answer change, and ' +
      'which stay exactly the same?',
    statement: 'Expand $(x + 2)(x + 4)$.',
    answer: { type: 'expression', value: 'x^2+6x+8', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Take your $(x+2)(x+3)$ rectangle and make the top edge one unit longer. Which new tiles ' +
        'had to be added down the right-hand side to close it again?',
      pictorial:
        'Redraw the grid with $+4$ in place of $+3$. Which two cells have changed and which two ' +
        'have not?',
      abstract:
        'Four products again: $x^2$, $4x$, $2x$ and $8$. The $x^2$ cannot change; the constant and ' +
        'the $x$ term both grow.',
    },
    hints: [
      'Only the second bracket changed. Which of the four cells involve the $4$?',
      'The cells are $x^2$, $4x$, $2x$ and $8$. Collect the $x$ terms.',
    ],
    solution:
      '$$(x + 2)(x + 4) = x^2 + 4x + 2x + 8 = x^2 + 6x + 8.$$\n\n' +
      'Compared with $x^2 + 5x + 6$: the $x$ coefficient went up by $1$ (one more $x$ tile in the ' +
      'top row) and the constant went up by $2$ (one more column of two units).',
    misconceptionCodes: ['expansion.partial-distribution'],
    figure: {
      kind: 'area_grid',
      title: '(x + 2)(x + 4)',
      columns: ['x', '+4'],
      rows: ['x', '+2'],
      cells: ['', '', '', ''],
    },
  },
  {
    id: 'expansion.brackets-a-3',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 1,
    sequence: { family: 'expansion.brackets-a', position: 3 },
    expect:
      'The $+4$ is now a $+5$. Last time the $x$ coefficient went up by $1$ and the constant by ' +
      '$2$. Predict both numbers this time before you check.',
    statement: 'Expand $(x + 2)(x + 5)$.',
    answer: { type: 'expression', value: 'x^2+7x+10', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Add one more unit to the top edge again. Which tiles appear, and why is it always one ' +
        '$x$ tile and two units?',
      pictorial:
        'Grid with $x$, $+5$ across and $x$, $+2$ down. Fill it and compare cell by cell with ' +
        'the last grid.',
      abstract:
        'The $x$ term is $5x + 2x$, the constant is $2 \\times 5$. Adding $1$ to the $5$ adds ' +
        '$1$ to the first and $2$ to the second.',
    },
    hints: [
      'What are the two $x$ cells now? What is the constant cell?',
      'Collect $5x + 2x$. The constant is $2 \\times 5$.',
    ],
    solution:
      '$$(x + 2)(x + 5) = x^2 + 5x + 2x + 10 = x^2 + 7x + 10.$$\n\n' +
      'The pattern holds: the $x$ coefficient is $2 + 5$ and the constant is $2 \\times 5$. That ' +
      'is what $(x + a)(x + b) = x^2 + (a + b)x + ab$ looks like with $a = 2$.',
    misconceptionCodes: ['expansion.partial-distribution'],
  },
  {
    id: 'expansion.brackets-a-4',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 1,
    sequence: { family: 'expansion.brackets-a', position: 4 },
    expect:
      'The $+5$ became $-5$. Which term of the answer will flip sign, which will shrink, and ' +
      'which will not change at all?',
    statement: 'Expand $(x + 2)(x - 5)$.',
    answer: { type: 'expression', value: 'x^2-3x-10', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Lay the rectangle with $x$ and $-5$ along the top. Five of the $x$ tiles in the top row ' +
        'are now negative, and so are the ten units. Are there zero pairs to remove?',
      pictorial:
        'Grid with $x$, $-5$ across and $x$, $+2$ down. Two of the four cells now carry a minus ' +
        'sign — which two?',
      abstract:
        'The products are $x^2$, $-5x$, $+2x$ and $-10$. Collecting $-5x + 2x$ gives a negative ' +
        '$x$ term.',
    },
    hints: [
      'Which of the four products involve the $-5$? Those are the ones whose sign changes.',
      'The four cells are $x^2$, $-5x$, $2x$ and $-10$.',
      'Collect $-5x + 2x$. Five negatives and two positives leave three negatives.',
    ],
    solution:
      '$$(x + 2)(x - 5) = x^2 - 5x + 2x - 10 = x^2 - 3x - 10.$$\n\n' +
      'The constant flipped sign ($2 \\times (-5) = -10$) and the $x$ coefficient became $2 + ' +
      '(-5) = -3$. The $x^2$ term never changes. Check at $x = 1$: $(3)(-4) = -12$ and $1 - 3 - ' +
      '10 = -12$. ✓',
    misconceptionCodes: ['expansion.partial-distribution'],
    figure: {
      kind: 'area_grid',
      title: '(x + 2)(x − 5)',
      columns: ['x', '−5'],
      rows: ['x', '+2'],
      cells: ['', '', '', ''],
      caption: 'Two cells are negative now. Which two?',
    },
  },
  {
    id: 'expansion.brackets-a-5',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 1,
    sequence: { family: 'expansion.brackets-a', position: 5 },
    expect:
      'Now the $+2$ has become $-2$ as well. Both brackets are subtractions. Will the constant ' +
      'be positive or negative this time? What about the $x$ term?',
    statement: 'Expand $(x - 2)(x - 5)$.',
    answer: { type: 'expression', value: 'x^2-7x+10', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Both edges now have negative pieces. The corner where $-2$ meets $-5$ is a negative ' +
        'times a negative — what sign do those ten unit tiles carry?',
      pictorial:
        'Grid with $x$, $-5$ across and $x$, $-2$ down. Three of the four cells involve a minus ' +
        'sign, but only two of them are negative. Which?',
      abstract:
        '$x^2$, $-5x$, $-2x$ and $(-2)(-5) = +10$. Both $x$ cells are negative, so they add to a ' +
        'bigger negative.',
    },
    hints: [
      'Work each cell with its sign. What is $(-2) \\times (-5)$?',
      'The two $x$ cells are $-5x$ and $-2x$. They have the same sign, so they add.',
    ],
    solution:
      '$$(x - 2)(x - 5) = x^2 - 5x - 2x + 10 = x^2 - 7x + 10.$$\n\n' +
      'The constant is positive again because $(-2)(-5) = 10$, and the $x$ coefficient is $-2 + ' +
      '(-5) = -7$. Compare with $(x+2)(x+5) = x^2 + 7x + 10$: the same numbers, one sign flipped.',
    misconceptionCodes: ['expansion.partial-distribution'],
  },
  {
    id: 'expansion.brackets-a-6',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 1,
    sequence: { family: 'expansion.brackets-a', position: 6 },
    expect:
      'The signs are back to $+$, and the first $x$ has become $2x$. Which cells of the grid ' +
      'are affected by that $2$ — and does the $x^2$ term still have coefficient $1$?',
    statement: 'Expand $(2x + 2)(x + 5)$.',
    answer: { type: 'expression', value: '2x^2+12x+10', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'The side of the rectangle is now $2x + 2$: two $x$-lengths and two units. How many ' +
        '$x^2$ tiles fit against an $x$-length top edge now?',
      pictorial:
        'Grid with $x$, $+5$ across and $2x$, $+2$ down. The top row of cells is $2x \\cdot x$ ' +
        'and $2x \\cdot 5$ — write both.',
      abstract:
        'Products: $2x \\cdot x = 2x^2$, $2x \\cdot 5 = 10x$, $2 \\cdot x = 2x$, $2 \\cdot 5 = ' +
        '10$. The $x^2$ coefficient is no longer $1$.',
    },
    hints: [
      'Which row of the grid has the $2x$ in it? Both cells in that row are doubled.',
      'The cells are $2x^2$, $10x$, $2x$ and $10$. Collect the $x$ terms.',
    ],
    solution:
      '$$(2x + 2)(x + 5) = 2x^2 + 10x + 2x + 10 = 2x^2 + 12x + 10.$$\n\n' +
      'Compare with $(x+2)(x+5) = x^2 + 7x + 10$: the $2x$ doubled the whole top row of the ' +
      'grid, so the $x^2$ term and one of the $x$ cells doubled, and the bottom row did not move.',
    misconceptionCodes: ['expansion.partial-distribution', 'expansion.coefficient-not-squared'],
    figure: {
      kind: 'area_grid',
      title: '(2x + 2)(x + 5)',
      columns: ['x', '+5'],
      rows: ['2x', '+2'],
      cells: ['', '', '', ''],
    },
  },
  {
    id: 'expansion.brackets-a-7',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 1,
    sequence: { family: 'expansion.brackets-a', position: 7 },
    expect:
      'Only the $+2$ in the first bracket became $+3$. Which row of the grid changes? Predict ' +
      'the new $x$ coefficient and the new constant.',
    statement: 'Expand $(2x + 3)(x + 5)$.',
    answer: { type: 'expression', value: '2x^2+13x+15', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Add one more unit to the side of the rectangle. Which tiles appear along the new bottom ' +
        'strip — one $x$ tile and how many units?',
      pictorial:
        'Grid with $x$, $+5$ across and $2x$, $+3$ down. Only the bottom row is new; the top row ' +
        'is the same as last time.',
      abstract:
        'Top row unchanged: $2x^2 + 10x$. Bottom row: $3x + 15$. Collect.',
    },
    hints: [
      'The top row of the grid is exactly what it was. Work out the bottom row: $3 \\cdot x$ and ' +
        '$3 \\cdot 5$.',
      'Add $10x + 3x$, and the constant is $3 \\times 5$.',
    ],
    solution:
      '$$(2x + 3)(x + 5) = 2x^2 + 10x + 3x + 15 = 2x^2 + 13x + 15.$$\n\n' +
      'One more unit on the side added one $x$ tile and five units, so the $x$ coefficient rose ' +
      'by $1$ and the constant by $5$.',
    misconceptionCodes: ['expansion.partial-distribution'],
  },
  {
    id: 'expansion.brackets-a-8',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 1,
    sequence: { family: 'expansion.brackets-a', position: 8 },
    expect:
      'The $+5$ became $-5$ again. Two cells of the grid will turn negative. Which two — and ' +
      'will the $x$ terms now add or fight each other?',
    statement: 'Expand $(2x + 3)(x - 5)$.',
    answer: { type: 'expression', value: '2x^2-7x-15', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Lay out the rectangle with $-5$ along the top. Ten of the $x$ tiles and fifteen units ' +
        'are negative. Three $x$ tiles are positive — how many zero pairs can you remove?',
      pictorial:
        'Grid with $x$, $-5$ across and $2x$, $+3$ down. The right-hand column is all negative.',
      abstract:
        'Products: $2x^2$, $-10x$, $3x$, $-15$. Collect $-10x + 3x$.',
    },
    hints: [
      'Which column of the grid contains the $-5$? Both cells in it are negative.',
      'The cells are $2x^2$, $-10x$, $3x$ and $-15$. Collect the $x$ terms with their signs.',
      '$-10x + 3x = -7x$.',
    ],
    solution:
      '$$(2x + 3)(x - 5) = 2x^2 - 10x + 3x - 15 = 2x^2 - 7x - 15.$$\n\n' +
      'Check at $x = 1$: $(5)(-4) = -20$ and $2 - 7 - 15 = -20$. ✓',
    misconceptionCodes: ['expansion.partial-distribution'],
  },
  {
    id: 'expansion.brackets-a-9',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 1,
    sequence: { family: 'expansion.brackets-a', position: 9 },
    expect:
      'The $+3$ has gone: the first bracket is now just $2x$. How many cells does the grid have ' +
      'now, and which of the four terms from last time disappear?',
    statement: 'Expand $2x(x - 5)$.',
    answer: { type: 'expression', value: '2x^2-10x', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'The side of the rectangle is only $2x$ now, no units. Which tiles from the last ' +
        'rectangle are gone? What is left?',
      pictorial:
        'A grid with one row: $2x$ down, and $x$, $-5$ across. Two cells only.',
      abstract:
        'A single term times a bracket: $2x \\cdot x$ and $2x \\cdot (-5)$. Two products because ' +
        'one bracket has two terms and the other has one.',
    },
    hints: [
      'One term times two terms. How many products?',
      'Multiply $2x$ by $x$, then $2x$ by $-5$.',
    ],
    solution:
      '$$2x(x - 5) = 2x^2 - 10x.$$\n\n' +
      'This is the top row of the last grid on its own. A monomial times a bracket is the same ' +
      'idea with fewer cells: every term still meets every term, there are simply fewer of them.',
    misconceptionCodes: ['expansion.partial-distribution'],
    figure: {
      kind: 'area_grid',
      title: '2x(x − 5)',
      columns: ['x', '−5'],
      rows: ['2x'],
      cells: ['', ''],
    },
  },

  // §3.1 — tier 2
  {
    id: 'expansion.expand-binomial-product',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 2,
    statement:
      'Expand and simplify $(2x + 3)(x - 4)$. Then state the coefficient of $x$ in your answer.',
    answer: { type: 'number', value: -5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay out a rectangle of tiles that is $2x + 3$ along the top and $x - 4$ down the side. ' +
        'Which tiles are negative? Are there any zero pairs to remove?',
      pictorial:
        'Draw a $2 \\times 2$ area grid with $2x$ and $+3$ across the top and $x$ and $-4$ down ' +
        'the side. Fill in all four cells. Which two cells are like terms?',
      abstract:
        'Every term in the first bracket multiplies every term in the second — four products — ' +
        'then collect the two $x$ terms.',
    },
    hints: [
      'Each term in the first bracket has to meet each term in the second. How many products ' +
        'does that make?',
      'The four products are $2x \\cdot x$, $2x \\cdot (-4)$, $3 \\cdot x$ and $3 \\cdot (-4)$. ' +
        'Work each out with its sign.',
      'Collect the two $x$ terms: $-8x + 3x$.',
    ],
    solution:
      '$$(2x + 3)(x - 4) = 2x^2 - 8x + 3x - 12 = 2x^2 - 5x - 12.$$\n\nThe coefficient of $x$ ' +
      'is $-5$.',
    misconceptionCodes: ['expansion.partial-distribution'],
  },
  {
    id: 'expansion.three-term-bracket',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 2,
    statement: 'Expand and simplify $(x + 2)(x^2 + 3x + 1)$.',
    answer: { type: 'expression', value: 'x^3+5x^2+7x+2', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'The tiles run out here — there is no $x^3$ tile. What does the grid do instead of the ' +
        'tiles? How many cells will it need for two terms against three?',
      pictorial:
        'Draw a grid with $x^2$, $3x$, $+1$ across and $x$, $+2$ down: six cells. Which cells ' +
        'are like terms with each other?',
      abstract:
        '$2 \\times 3 = 6$ products. Collect the $x^2$ terms and the $x$ terms separately.',
    },
    hints: [
      'Two terms against three terms. How many cells does the grid have?',
      'The top row is $x^3 + 3x^2 + x$. The bottom row is $2x^2 + 6x + 2$.',
      'Collect: $3x^2 + 2x^2$ and $x + 6x$.',
    ],
    solution:
      '$$(x + 2)(x^2 + 3x + 1) = x^3 + 3x^2 + x + 2x^2 + 6x + 2 = x^3 + 5x^2 + 7x + 2.$$\n\n' +
      'Check at $x = 1$: $(3)(5) = 15$ and $1 + 5 + 7 + 2 = 15$. ✓',
    misconceptionCodes: ['expansion.partial-distribution'],
    figure: {
      kind: 'area_grid',
      title: '(x + 2)(x² + 3x + 1)',
      columns: ['x²', '+3x', '+1'],
      rows: ['x', '+2'],
      cells: ['', '', '', '', '', ''],
    },
  },
  {
    id: 'expansion.triple-product',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 2,
    statement: 'Expand and simplify $(x + 1)(x + 2)(x + 3)$.',
    answer: { type: 'expression', value: 'x^3+6x^2+11x+6', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Three brackets is a box, not a rectangle: length $x + 1$, width $x + 2$, height $x + 3$. ' +
        'You cannot see all its pieces at once, so which two brackets would you deal with first?',
      pictorial:
        'Expand the first two brackets on a grid to get one three-term expression. Then draw a ' +
        'second grid with that expression across the top and $x$, $+3$ down.',
      abstract:
        'Multiply two brackets, then multiply the result by the third. Order does not matter, so ' +
        'choose the pair that is easiest.',
    },
    hints: [
      'Multiply any two of the brackets first. $(x + 1)(x + 2)$ is a good start.',
      '$(x + 1)(x + 2) = x^2 + 3x + 2$. Now expand $(x^2 + 3x + 2)(x + 3)$ on a six-cell grid.',
      'The six cells are $x^3$, $3x^2$, $3x^2$, $9x$, $2x$, $6$. Collect.',
    ],
    solution:
      '$(x + 1)(x + 2) = x^2 + 3x + 2$. Then\n\n' +
      '$$(x^2 + 3x + 2)(x + 3) = x^3 + 3x^2 + 3x^2 + 9x + 2x + 6 = x^3 + 6x^2 + 11x + 6.$$\n\n' +
      'Check at $x = 1$: $2 \\times 3 \\times 4 = 24$ and $1 + 6 + 11 + 6 = 24$. ✓',
    misconceptionCodes: ['expansion.partial-distribution'],
  },
  {
    id: 'expansion.subtract-products',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 2,
    statement: 'Expand and simplify $(x + 3)(x + 4) - (x + 1)(x + 2)$.',
    answer: { type: 'expression', value: '4x+10', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Build both rectangles from tiles and lay the smaller on top of the larger. Which tiles ' +
        'of the big one are not covered?',
      pictorial:
        'Two grids. Expand each fully, then subtract every term of the second from the first — ' +
        'the minus sign applies to the whole second product.',
      abstract:
        'Expand both products, bracket the second one before subtracting, then collect. The ' +
        '$x^2$ terms cancel.',
    },
    hints: [
      'Expand each product separately first. Keep the second one in a bracket.',
      '$(x^2 + 7x + 12) - (x^2 + 3x + 2)$. Subtracting the bracket changes the sign of every ' +
        'term inside it.',
      '$x^2 - x^2 = 0$, $7x - 3x = 4x$, $12 - 2 = 10$.',
    ],
    solution:
      '$$(x + 3)(x + 4) - (x + 1)(x + 2) = (x^2 + 7x + 12) - (x^2 + 3x + 2) = 4x + 10.$$\n\n' +
      'Check at $x = 0$: $12 - 2 = 10$ and $4(0) + 10 = 10$. ✓ A common slip is to subtract ' +
      'only the $x^2$ of the second product and leave $+3x + 2$ with the wrong signs.',
    misconceptionCodes: ['expansion.partial-distribution'],
  },

  // §3.1 — tier 3
  {
    id: 'expansion.photo-frame-border',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 3,
    statement:
      'A photograph is $x$ cm wide and $(x + 4)$ cm tall. It sits in a frame that adds a strip ' +
      '$2$ cm wide all the way round. Find the area of the strip, in cm$^2$, written in terms of ' +
      '$x$ with no brackets.',
    answer: { type: 'expression', value: '8x+32', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Sketch the photo, then draw the frame around it. The frame adds $2$ cm on the left ' +
        '*and* $2$ cm on the right. How wide is the whole thing? How tall?',
      pictorial:
        'Two rectangles, one inside the other. The strip is the big area minus the small area. ' +
        'Write the dimensions of each on your sketch before multiplying anything.',
      abstract:
        'Outer area $(x + 4)(x + 8)$ minus inner area $x(x + 4)$. Expand both, subtract, and ' +
        'the $x^2$ terms cancel.',
    },
    hints: [
      'The frame adds $2$ cm on each side, so the outside is $x + 4$ wide and $x + 8$ tall.',
      'Strip $=$ outer area $-$ photo area $= (x + 4)(x + 8) - x(x + 4)$.',
      '$(x + 4)(x + 8) = x^2 + 12x + 32$ and $x(x + 4) = x^2 + 4x$. Subtract.',
    ],
    solution:
      'Outer rectangle: $(x + 4)$ by $(x + 8)$, area $x^2 + 12x + 32$.\n\n' +
      'Photograph: $x$ by $(x + 4)$, area $x^2 + 4x$.\n\n' +
      '$$\\text{Strip} = (x^2 + 12x + 32) - (x^2 + 4x) = 8x + 32 \\text{ cm}^2.$$\n\n' +
      'Check with $x = 10$: outer $14 \\times 18 = 252$, photo $10 \\times 14 = 140$, strip ' +
      '$112$; and $8(10) + 32 = 112$. ✓',
    misconceptionCodes: ['expansion.partial-distribution'],
  },
  {
    id: 'expansion.garden-path',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 3,
    statement:
      'A rectangular lawn is $3x$ m long and $x$ m wide. A paved path $1$ m wide runs all the ' +
      'way round the outside of it. Find the total area covered by the lawn and the path ' +
      'together, in m$^2$, written in terms of $x$ with no brackets.',
    answer: { type: 'expression', value: '3x^2+8x+2', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Draw the lawn and shade the path around it. The path adds $1$ m at each end of the ' +
        'length and $1$ m on each side of the width. What are the outside measurements?',
      pictorial:
        'The outer rectangle is $(3x + 2)$ by $(x + 2)$. Set those out on a grid — four cells — ' +
        'and total them.',
      abstract:
        'Total area $= (3x + 2)(x + 2)$. Expand: four products, then collect the $x$ terms.',
    },
    hints: [
      'A $1$ m path on both ends makes the outside length $3x + 2$. What is the outside width?',
      'Total area $= (3x + 2)(x + 2)$. Expand it on a grid.',
      'The cells are $3x^2$, $6x$, $2x$ and $4$.',
    ],
    solution:
      'Outside length $3x + 2$ m, outside width $x + 2$ m.\n\n' +
      '$$(3x + 2)(x + 2) = 3x^2 + 6x + 2x + 4 = 3x^2 + 8x + 4 \\text{ m}^2.$$\n\n' +
      'Wait — that constant is $2 \\times 2 = 4$, so the total is $3x^2 + 8x + 4$. Check at $x = ' +
      '2$: outside $8 \\times 4 = 32$; $3(4) + 16 + 4 = 32$. ✓',
    misconceptionCodes: ['expansion.partial-distribution'],
  },

  // §3.1 — diagnostics
  {
    id: 'expansion.dx-partial-distribution',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 'diagnostic',
    statement: 'Expand $(2x + 3)(2x - 1)$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$4x^2 - 3$', misconceptionCode: 'expansion.partial-distribution' },
        { label: 'B', value: '$4x^2 + 4x - 3$' },
        { label: 'C', value: '$2x^2 + 4x - 3$', misconceptionCode: 'expansion.coefficient-not-squared' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Build the rectangle: $2x + 3$ along the top, $2x - 1$ down the side. Count the $x$ ' +
        'tiles that are left after zero pairs are removed. Is it zero?',
      pictorial:
        'Draw the four-cell grid. How many cells are there, and how many terms does your answer ' +
        'have before collecting?',
      abstract:
        'Four products: $4x^2$, $-2x$, $6x$, $-3$. The two middle ones do not cancel here.',
    },
    hints: [
      'Two terms against two terms is four products, not two.',
      'The middle cells are $2x \\cdot (-1) = -2x$ and $3 \\cdot 2x = 6x$. What do they add to?',
    ],
    solution:
      '$$(2x + 3)(2x - 1) = 4x^2 - 2x + 6x - 3 = 4x^2 + 4x - 3.$$\n\n' +
      'Option A multiplies only first-with-first and last-with-last, skipping the two middle ' +
      'cells. Option C squares the $x$ but not the $2$ in $2x \\cdot 2x$.',
    misconceptionCodes: ['expansion.partial-distribution', 'expansion.coefficient-not-squared'],
  },
  {
    id: 'expansion.dx-coefficient-not-squared',
    skillIds: ['expansion.expand-products-algebraic'],
    tier: 'diagnostic',
    statement: 'Expand $2x(2x + 5)$.',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$4x^2 + 10x$' },
        { label: 'B', value: '$2x^2 + 10x$', misconceptionCode: 'expansion.coefficient-not-squared' },
        { label: 'C', value: '$4x^2 + 5$', misconceptionCode: 'expansion.partial-distribution' },
      ],
    },
    cpaPrompts: {
      concrete:
        'A strip of tiles $2x$ tall against a top edge of $2x + 5$. How many $x^2$ tiles fit in ' +
        'the square part — one, two or four?',
      pictorial:
        'One row: $2x$ down, $2x$ and $+5$ across. Write both cells with their numbers as well ' +
        'as their letters.',
      abstract:
        '$2x \\cdot 2x = (2 \\cdot 2)(x \\cdot x) = 4x^2$, and $2x \\cdot 5 = 10x$.',
    },
    hints: [
      'Multiply the numbers and the letters separately: $2 \\times 2$ and $x \\times x$.',
      'Then $2x$ also has to multiply the $5$.',
    ],
    solution:
      '$$2x(2x + 5) = 4x^2 + 10x.$$\n\n' +
      'Option B keeps the $2$ as a $2$ — it forgets that $2x \\times 2x$ has two 2s in it. Option ' +
      'C multiplies $2x$ by the first term only and leaves the $5$ untouched.',
    misconceptionCodes: ['expansion.coefficient-not-squared', 'expansion.partial-distribution'],
  },

  // -------------------------------------------------------------------------
  // §3.2 special-algebraic-identities — tier 1, family expansion.squares-a
  // -------------------------------------------------------------------------
  {
    id: 'expansion.squares-a-1',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 1,
    sequence: { family: 'expansion.squares-a', position: 1 },
    statement: 'Expand $(x + 1)^2$.',
    answer: { type: 'expression', value: 'x^2+2x+1', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Build a square whose side is $x + 1$ out of tiles. You will need one $x^2$ tile, one ' +
        'unit, and some $x$ tiles. How many $x$ tiles, and where do they go?',
      pictorial:
        'Draw the square as a grid with $x$, $+1$ along both edges. Two of the four cells are the ' +
        'same — which two?',
      abstract:
        '$(x + 1)^2 = (x + 1)(x + 1)$. Four products, and the two middle ones are identical.',
    },
    hints: [
      'A squared bracket is that bracket times itself: $(x + 1)(x + 1)$.',
      'The four cells are $x^2$, $x$, $x$ and $1$.',
    ],
    solution:
      '$$(x + 1)^2 = (x + 1)(x + 1) = x^2 + x + x + 1 = x^2 + 2x + 1.$$\n\n' +
      'The two $x$ tiles are the two rectangles along the edges of the square: one on top, one ' +
      'down the side.',
    misconceptionCodes: ['expansion.freshmans-dream', 'expansion.middle-term-once'],
    figure: {
      kind: 'algebra_tiles',
      title: 'A square of side x + 1',
      tiles: [
        { type: 'x2', sign: 'positive', count: 1 },
        { type: 'x', sign: 'positive', count: 2 },
        { type: 'unit', sign: 'positive', count: 1 },
      ],
      arrangement: 'rectangle',
      caption: 'Arrange the tiles into a square. Where do the two x tiles have to go?',
    },
  },
  {
    id: 'expansion.squares-a-2',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 1,
    sequence: { family: 'expansion.squares-a', position: 2 },
    expect:
      'The $+1$ became $+2$. The middle term was $2x$ last time. Will it be $3x$, $4x$ or ' +
      'something else — and what will the constant be?',
    statement: 'Expand $(x + 2)^2$.',
    answer: { type: 'expression', value: 'x^2+4x+4', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Build the square of side $x + 2$. The strip along the top is $2$ units tall, so it holds ' +
        'two $x$ tiles. What about the strip down the side?',
      pictorial:
        'Grid with $x$, $+2$ along both edges. The two middle cells are each $2x$. Two of them.',
      abstract:
        '$(x + 2)^2 = x^2 + 2x + 2x + 4$. Middle term $2 \\times 2x$, constant $2^2$.',
    },
    hints: [
      'Write it as $(x + 2)(x + 2)$ and fill a four-cell grid.',
      'The two middle cells are both $2x$. Add them.',
    ],
    solution:
      '$$(x + 2)^2 = x^2 + 2x + 2x + 4 = x^2 + 4x + 4.$$\n\n' +
      'Check at $x = 1$: $3^2 = 9$ and $1 + 4 + 4 = 9$. ✓',
    misconceptionCodes: ['expansion.middle-term-once', 'expansion.freshmans-dream'],
    figure: {
      kind: 'algebra_tiles',
      title: 'A square of side x + 2',
      tiles: [
        { type: 'x2', sign: 'positive', count: 1 },
        { type: 'x', sign: 'positive', count: 4 },
        { type: 'unit', sign: 'positive', count: 4 },
      ],
      arrangement: 'rectangle',
    },
  },
  {
    id: 'expansion.squares-a-3',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 1,
    sequence: { family: 'expansion.squares-a', position: 3 },
    expect:
      'Now $+3$. Middle terms so far: $2x$, $4x$. Predict the next one, and say how it is ' +
      'related to the $3$. Predict the constant too.',
    statement: 'Expand $(x + 3)^2$.',
    answer: { type: 'expression', value: 'x^2+6x+9', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'A square of side $x + 3$: the top strip holds three $x$ tiles and the side strip holds ' +
        'three more. Six $x$ tiles, and a $3 \\times 3$ block of units in the corner.',
      pictorial:
        'Grid with $x$, $+3$ on both edges. Fill all four cells. Now look at the middle terms ' +
        'across the three grids: $2x$, $4x$, $6x$.',
      abstract:
        '$(x + b)^2 = x^2 + 2bx + b^2$. The middle term is *twice* $b$ because there are two ' +
        'rectangles; the constant is $b$ squared.',
    },
    hints: [
      'Grid: $x$, $+3$ across and down. The two middle cells are each $3x$.',
      'Middle term $= 3x + 3x$. Constant $= 3 \\times 3$.',
    ],
    solution:
      '$$(x + 3)^2 = x^2 + 3x + 3x + 9 = x^2 + 6x + 9.$$\n\n' +
      'The pattern: $(x + 1)^2$, $(x + 2)^2$, $(x + 3)^2$ give middle terms $2x$, $4x$, $6x$ — ' +
      'always twice the number, because the square has two edge rectangles. The constant is the ' +
      'number squared. That is $(a + b)^2 = a^2 + 2ab + b^2$.',
    misconceptionCodes: ['expansion.middle-term-once', 'expansion.freshmans-dream'],
    figure: {
      kind: 'area_grid',
      title: '(x + 3)²',
      columns: ['x', '+3'],
      rows: ['x', '+3'],
      cells: ['', '', '', ''],
      caption: 'Two of these cells are the same size. Which?',
    },
  },
  {
    id: 'expansion.squares-a-4',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 1,
    sequence: { family: 'expansion.squares-a', position: 4 },
    expect:
      'The $+3$ became $-3$. Which of the three terms will change sign? Think about what $(-3) ' +
      '\\times (-3)$ is before you decide about the constant.',
    statement: 'Expand $(x - 3)^2$.',
    answer: { type: 'expression', value: 'x^2-6x+9', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Lay out $(x - 3)(x - 3)$ with tiles. Six $x$ tiles are negative now, but the nine units ' +
        'in the corner come from $(-3)(-3)$. What sign are they?',
      pictorial:
        'Grid with $x$, $-3$ along both edges. The two middle cells are each $-3x$; the corner ' +
        'cell is a negative times a negative.',
      abstract:
        '$(x - 3)^2 = x^2 - 3x - 3x + 9$. Only the middle term is negative.',
    },
    hints: [
      'Write it as $(x - 3)(x - 3)$ and fill the grid with signs.',
      'The middle cells are $-3x$ and $-3x$. The corner is $(-3)(-3) = +9$.',
    ],
    solution:
      '$$(x - 3)^2 = x^2 - 3x - 3x + 9 = x^2 - 6x + 9.$$\n\n' +
      'Compared with $(x + 3)^2 = x^2 + 6x + 9$: only the middle term flipped. The constant is ' +
      'still $+9$, because squaring a negative gives a positive. Check at $x = 1$: $(-2)^2 = 4$ and ' +
      '$1 - 6 + 9 = 4$. ✓',
    misconceptionCodes: ['expansion.freshmans-dream', 'expansion.middle-term-once'],
  },
  {
    id: 'expansion.squares-a-5',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 1,
    sequence: { family: 'expansion.squares-a', position: 5 },
    expect:
      'Back to $+3$, but the $x$ is now $2x$. The first term was always $x^2$ before. What is ' +
      '$(2x)^2$? And does the middle term double, or stay at $6x$?',
    statement: 'Expand $(2x + 3)^2$.',
    answer: { type: 'expression', value: '4x^2+12x+9', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'A square of side $2x + 3$. The big corner is $2x$ by $2x$ — how many $x^2$ tiles is ' +
        'that? Each edge strip is $2x$ long and $3$ tall — how many $x$ tiles?',
      pictorial:
        'Grid with $2x$, $+3$ along both edges. The top-left cell is $2x \\cdot 2x$: multiply ' +
        'the numbers as well as the letters.',
      abstract:
        '$(a + b)^2$ with $a = 2x$, $b = 3$: $a^2 = 4x^2$, $2ab = 12x$, $b^2 = 9$.',
    },
    hints: [
      'Grid: $2x$, $+3$ across and down. Work $2x \\times 2x$ carefully: the 2 gets squared too.',
      'The middle cells are each $2x \\times 3 = 6x$. There are two of them.',
      '$(2x)^2 = 4x^2$, middle $= 12x$, constant $= 9$.',
    ],
    solution:
      '$$(2x + 3)^2 = (2x)^2 + 2(2x)(3) + 3^2 = 4x^2 + 12x + 9.$$\n\n' +
      'Check at $x = 1$: $5^2 = 25$ and $4 + 12 + 9 = 25$. ✓ If you got $2x^2$ for the first ' +
      'term, you squared the $x$ but not the $2$.',
    misconceptionCodes: ['expansion.coefficient-not-squared', 'expansion.middle-term-once'],
    figure: {
      kind: 'area_grid',
      title: '(2x + 3)²',
      columns: ['2x', '+3'],
      rows: ['2x', '+3'],
      cells: ['', '', '', ''],
    },
  },
  {
    id: 'expansion.perfect-square-middle-term',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 1,
    sequence: { family: 'expansion.squares-a', position: 6 },
    expect:
      'Only the $+3$ became $+5$. Which two of the three terms change, and which is fixed by ' +
      'the $2x$ alone? Predict all three before you expand.',
    statement: 'Expand $(2x + 5)^2$.',
    answer: { type: 'expression', value: '4x^2+20x+25', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Build a square whose side is $2x + 5$. How many distinct regions does it break into, and ' +
        'are any of them the same size as each other?',
      pictorial:
        'Draw the square as a grid with $2x$ and $+5$ on both edges. Fill in all four cells. Which ' +
        'two are identical?',
      abstract: 'Apply $(a+b)^2 = a^2 + 2ab + b^2$ with $a = 2x$ and $b = 5$.',
    },
    hints: [
      'A squared bracket is that bracket multiplied by itself. Write it out as $(2x+5)(2x+5)$ ' +
        'before doing anything else.',
      'Set it out as a four-cell grid. You should get $4x^2$, two identical middle cells, and 25.',
      'The middle cells are each $2x \\times 5 = 10x$. There are two of them.',
    ],
    solution:
      '$$(2x + 5)^2 = (2x)^2 + 2(2x)(5) + 5^2 = 4x^2 + 20x + 25$$\n\n' +
      'Check with a number: at $x = 1$, $(2+5)^2 = 49$ and $4 + 20 + 25 = 49$. ✓',
    misconceptionCodes: [
      'expansion.freshmans-dream',
      'expansion.middle-term-once',
      'expansion.coefficient-not-squared',
    ],
  },
  {
    id: 'expansion.squares-a-7',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 1,
    sequence: { family: 'expansion.squares-a', position: 7 },
    expect:
      'This is not a square any more: the two brackets are $(x + 3)$ and $(x - 3)$. What ' +
      'happens to the two middle cells when one is $+3x$ and the other is $-3x$?',
    statement: 'Expand $(x + 3)(x - 3)$.',
    answer: { type: 'expression', value: 'x^2-9', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Lay out $x$, $+3$ across and $x$, $-3$ down. Three positive $x$ tiles and three negative ' +
        'ones — pair them up. What is left on the board?',
      pictorial:
        'Grid with $x$, $+3$ across and $x$, $-3$ down. The two middle cells are $-3x$ and $+3x$.',
      abstract:
        '$(a + b)(a - b) = a^2 - b^2$: the middle terms are equal and opposite, so they vanish.',
    },
    hints: [
      'Fill the four cells: $x^2$, $-3x$, $3x$, $-9$.',
      '$-3x + 3x = 0$. What is left?',
    ],
    solution:
      '$$(x + 3)(x - 3) = x^2 - 3x + 3x - 9 = x^2 - 9.$$\n\n' +
      'The contrast with $(x + 3)^2 = x^2 + 6x + 9$: same numbers, but the middle rectangles ' +
      'now cancel instead of doubling, and the constant is negative. This is the difference of ' +
      'two squares, $(a+b)(a-b) = a^2 - b^2$.',
    misconceptionCodes: ['expansion.freshmans-dream'],
    figure: {
      kind: 'area_grid',
      title: '(x + 3)(x − 3)',
      columns: ['x', '+3'],
      rows: ['x', '−3'],
      cells: ['', '', '', ''],
      caption: 'Compare the two middle cells with the ones in (x + 3)².',
    },
  },
  {
    id: 'expansion.squares-a-8',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 1,
    sequence: { family: 'expansion.squares-a', position: 8 },
    expect:
      'No $x$ this time — just a number, $103$. If you write it as $100 + 3$, what does ' +
      '$(100 + 3)^2$ give you term by term? Predict the three pieces before you add them.',
    statement: 'Work out $103^2$ without a calculator, by writing $103$ as $100 + 3$.',
    answer: { type: 'number', value: 10609, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Picture a $103 \\times 103$ square cut into a $100 \\times 100$ square, a $3 \\times 3$ ' +
        'square, and two $100 \\times 3$ strips. Add the four pieces.',
      pictorial:
        'Grid with $100$, $+3$ along both edges. Four cells: $10000$, $300$, $300$, $9$.',
      abstract:
        '$(100 + 3)^2 = 100^2 + 2(100)(3) + 3^2$. The identity works for numbers because it ' +
        'works for everything.',
    },
    hints: [
      'Use $(a + b)^2 = a^2 + 2ab + b^2$ with $a = 100$ and $b = 3$.',
      '$100^2 = 10000$, $2 \\times 100 \\times 3 = 600$, $3^2 = 9$. Add them.',
    ],
    solution:
      '$$103^2 = (100 + 3)^2 = 100^2 + 2(100)(3) + 3^2 = 10000 + 600 + 9 = 10609.$$\n\n' +
      'The identity is a shortcut for arithmetic as much as algebra. Notice that $100^2 + 3^2 = ' +
      '10009$ is wrong: the two $300$ strips are real area.',
    misconceptionCodes: ['expansion.freshmans-dream'],
  },

  // §3.2 — tier 2
  {
    id: 'expansion.difference-of-squares',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 2,
    statement: 'Expand and simplify $(3x + 4)(3x - 4)$.',
    answer: { type: 'expression', value: '9x^2-16', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Picture a square of side $3x$ with a $4 \\times 4$ corner cut out of it. Cut the ' +
        'remaining L-shape into two pieces and slide them into a rectangle. What are its sides?',
      pictorial:
        'Set it out as a grid with $3x$ and $+4$ across the top, $3x$ and $-4$ down the side. Look ' +
        'at the two middle cells — what happens when you add them?',
      abstract:
        'Recognise the form $(a+b)(a-b)$ with $a = 3x$ and $b = 4$, then apply $a^2 - b^2$.',
    },
    hints: [
      'Look at the two brackets. They have the same terms, but one has a $+$ and the other a $-$. ' +
        'What pattern is that?',
      'Use $(a+b)(a-b) = a^2 - b^2$ with $a = 3x$ and $b = 4$.',
      'Square $3x$ carefully — the 3 gets squared too — then subtract $4^2 = 16$.',
    ],
    solution:
      'This is the difference of two squares with $a = 3x$, $b = 4$:\n\n' +
      '$$(3x)^2 - 4^2 = 9x^2 - 16$$\n\n' +
      'The middle terms $-12x$ and $+12x$ cancel, which is exactly why this form has no $x$ term.',
    misconceptionCodes: ['expansion.coefficient-not-squared'],
  },
  {
    id: 'expansion.two-variable-square',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 2,
    statement: 'Expand $(x + y)^2$.',
    answer: { type: 'expression', value: 'x^2+2xy+y^2', variables: ['x', 'y'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'A square of side $x + y$. Its corners are an $x \\times x$ square and a $y \\times y$ ' +
        'square. What shape are the other two pieces, and are they the same size as each other?',
      pictorial:
        'Grid with $x$, $+y$ along both edges. The two middle cells are $xy$ and $yx$ — the same ' +
        'thing.',
      abstract:
        '$(a + b)^2 = a^2 + 2ab + b^2$ with $a = x$ and $b = y$. Nothing to collect except the ' +
        'two $xy$ rectangles.',
    },
    hints: [
      'Write it as $(x + y)(x + y)$ and fill a four-cell grid.',
      'The middle cells are $xy$ and $yx$. Is $yx$ different from $xy$?',
    ],
    solution:
      '$$(x + y)^2 = x^2 + xy + yx + y^2 = x^2 + 2xy + y^2.$$\n\n' +
      'Check with $x = 2$, $y = 3$: $5^2 = 25$ and $4 + 12 + 9 = 25$. ✓ The answer $x^2 + y^2$ ' +
      'would give $13$, which is not $25$.',
    misconceptionCodes: ['expansion.freshmans-dream', 'expansion.middle-term-once'],
    figure: {
      kind: 'area_grid',
      title: '(x + y)²',
      columns: ['x', '+y'],
      rows: ['x', '+y'],
      cells: ['', '', '', ''],
    },
  },
  {
    id: 'expansion.mixed-coefficient-square',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 2,
    statement: 'Expand $(3x - 2y)^2$.',
    answer: { type: 'expression', value: '9x^2-12xy+4y^2', variables: ['x', 'y'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Name the two pieces first: $a = 3x$ and $b = 2y$. What is the area of the $a \\times a$ ' +
        'corner, the $b \\times b$ corner, and each $a \\times b$ strip?',
      pictorial:
        'Grid with $3x$, $-2y$ along both edges. Both middle cells are $3x \\times (-2y)$, and ' +
        'the corner is $(-2y)(-2y)$.',
      abstract:
        '$(a - b)^2 = a^2 - 2ab + b^2$ with $a = 3x$, $b = 2y$: $9x^2 - 12xy + 4y^2$.',
    },
    hints: [
      'Use $(a - b)^2 = a^2 - 2ab + b^2$ with $a = 3x$ and $b = 2y$.',
      '$(3x)^2 = 9x^2$ and $(2y)^2 = 4y^2$ — square the numbers too.',
      'The middle term is $2 \\times 3x \\times 2y = 12xy$, with a minus sign.',
    ],
    solution:
      '$$(3x - 2y)^2 = (3x)^2 - 2(3x)(2y) + (2y)^2 = 9x^2 - 12xy + 4y^2.$$\n\n' +
      'Check with $x = 1$, $y = 1$: $(3 - 2)^2 = 1$ and $9 - 12 + 4 = 1$. ✓',
    misconceptionCodes: [
      'expansion.coefficient-not-squared',
      'expansion.middle-term-once',
      'expansion.freshmans-dream',
    ],
  },
  {
    id: 'expansion.mental-998-1002',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 2,
    statement: 'Work out $998 \\times 1002$ without a calculator.',
    answer: { type: 'number', value: 999996, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Both numbers sit either side of $1000$: one is $2$ below, one is $2$ above. Which ' +
        'identity has one bracket with a $+$ and one with a $-$?',
      pictorial:
        'Grid with $1000$, $-2$ across and $1000$, $+2$ down. The two middle cells cancel.',
      abstract:
        '$(1000 - 2)(1000 + 2) = 1000^2 - 2^2$. Difference of two squares.',
    },
    hints: [
      'Write $998 = 1000 - 2$ and $1002 = 1000 + 2$.',
      '$(a - b)(a + b) = a^2 - b^2$ with $a = 1000$, $b = 2$.',
      '$1000^2 = 1000000$ and $2^2 = 4$.',
    ],
    solution:
      '$$998 \\times 1002 = (1000 - 2)(1000 + 2) = 1000^2 - 2^2 = 1000000 - 4 = 999996.$$',
    misconceptionCodes: ['expansion.freshmans-dream'],
  },

  // §3.2 — tier 3
  {
    id: 'expansion.extended-patio',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 3,
    statement:
      'A square patio has sides of $x$ m. It is rebuilt as a larger square with each side $5$ m ' +
      'longer than before. How much extra area, in m$^2$, is paved? Give your answer in terms of ' +
      '$x$ with no brackets.',
    answer: { type: 'expression', value: '10x+25', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Draw the old square and then the new one on top of it, sharing a corner. The extra ' +
        'paving is an L-shape. What three rectangles make up the L?',
      pictorial:
        'Grid with $x$, $+5$ along both edges. The old patio is the $x^2$ cell; the extra area is ' +
        'the other three cells.',
      abstract:
        'New area minus old area: $(x + 5)^2 - x^2$. Expand the square, and the $x^2$ cancels.',
    },
    hints: [
      'The new side is $x + 5$. Write the new area and the old area.',
      'Extra $= (x + 5)^2 - x^2$. Expand $(x + 5)^2$ first — three terms.',
      '$(x + 5)^2 = x^2 + 10x + 25$. Now subtract $x^2$.',
    ],
    solution:
      'New area $(x + 5)^2 = x^2 + 10x + 25$. Old area $x^2$.\n\n' +
      '$$\\text{Extra} = x^2 + 10x + 25 - x^2 = 10x + 25 \\text{ m}^2.$$\n\n' +
      'On the picture: two $5 \\times x$ strips and one $5 \\times 5$ corner. Check at $x = 3$: ' +
      '$64 - 9 = 55$ and $30 + 25 = 55$. ✓',
    misconceptionCodes: ['expansion.freshmans-dream', 'expansion.middle-term-once'],
  },
  {
    id: 'expansion.mental-29-31',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 3,
    statement:
      'Mei needs $29 \\times 31$ and has no calculator. She notices that $29$ and $31$ are both ' +
      'one away from $30$. What answer should she get, and how can she use $30$ to get it in one ' +
      'step? Give the number.',
    answer: { type: 'number', value: 899, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'A $30 \\times 30$ square has area $900$. Cut a strip $1$ wide off one side and lay it ' +
        'along another — the shape is now $29$ by $31$, but one little corner is missing.',
      pictorial:
        'Grid with $30$, $-1$ across and $30$, $+1$ down. The two $30$ cells cancel; what is ' +
        'left?',
      abstract:
        '$(30 - 1)(30 + 1) = 30^2 - 1^2 = 900 - 1$.',
    },
    hints: [
      'Write $29 = 30 - 1$ and $31 = 30 + 1$. What does $(30 - 1)(30 + 1)$ simplify to?',
      'Difference of two squares: $30^2 - 1^2$.',
    ],
    solution:
      '$$29 \\times 31 = (30 - 1)(30 + 1) = 30^2 - 1^2 = 900 - 1 = 899.$$\n\n' +
      'The same trick works for any pair equally spaced around a round number: $48 \\times 52 ' +
      '= 2500 - 4$.',
    misconceptionCodes: ['expansion.freshmans-dream'],
  },

  // §3.2 — tier 4
  {
    id: 'expansion.consecutive-squares',
    skillIds: ['expansion.special-algebraic-identities', 'expansion.expand-products-algebraic'],
    tier: 4,
    statement:
      'Take any whole number $n$. Show that the difference between $(n + 1)^2$ and $n^2$ is ' +
      'always an odd number. As your answer, write $(n + 1)^2 - n^2$ as simply as possible.',
    answer: { type: 'expression', value: '2n+1', variables: ['n'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Draw a $3 \\times 3$ square of dots and grow it to $4 \\times 4$. How many dots did you ' +
        'add? Try $4 \\to 5$ as well. What kind of numbers are you getting?',
      pictorial:
        'Grid with $n$, $+1$ along both edges. The old square is $n^2$; the added dots are the ' +
        'other three cells.',
      abstract:
        'Expand $(n + 1)^2$, subtract $n^2$, and read the result as "an even number plus one".',
    },
    hints: [
      'Expand $(n + 1)^2$ first.',
      '$(n + 1)^2 - n^2 = n^2 + 2n + 1 - n^2$.',
      'What is left is $2n + 1$. Why is $2n$ always even?',
    ],
    solution:
      '$$(n + 1)^2 - n^2 = (n^2 + 2n + 1) - n^2 = 2n + 1.$$\n\n' +
      '$2n$ is even for every whole number $n$, so $2n + 1$ is odd. On the dot picture: going ' +
      'from an $n$-square to an $(n+1)$-square adds two strips of $n$ and one corner dot.',
    misconceptionCodes: ['expansion.freshmans-dream'],
  },

  // §3.2 — diagnostics
  {
    id: 'expansion.dx-freshmans-dream',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 'diagnostic',
    statement: 'Expand $(x + 3)^2$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$x^2 + 9$', misconceptionCode: 'expansion.freshmans-dream' },
        { label: 'B', value: '$x^2 + 6x + 9$' },
        { label: 'C', value: '$x^2 + 3x + 9$', misconceptionCode: 'expansion.middle-term-once' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Build the square of side $x + 3$ from tiles. Does it close with only an $x^2$ tile and ' +
        'nine units? What is missing?',
      pictorial:
        'Draw the four-cell grid with $x$, $+3$ on both edges. How many cells contain an $x$?',
      abstract:
        '$(x + 3)^2 = (x + 3)(x + 3)$ has four products, two of them $3x$.',
    },
    hints: [
      'Test with a number: is $(1 + 3)^2$ equal to $1 + 9$?',
      'Write $(x + 3)(x + 3)$ and multiply every term by every term.',
    ],
    solution:
      '$$(x + 3)^2 = x^2 + 3x + 3x + 9 = x^2 + 6x + 9.$$\n\n' +
      'Option A squares each term separately and drops both $3x$ rectangles. Option C counts ' +
      'only one of the two.',
    misconceptionCodes: ['expansion.freshmans-dream', 'expansion.middle-term-once'],
  },
  {
    id: 'expansion.dx-middle-term-once',
    skillIds: ['expansion.special-algebraic-identities'],
    tier: 'diagnostic',
    statement: 'Expand $(x - 4)^2$.',
    answer: {
      type: 'choice',
      correct: 'C',
      options: [
        { label: 'A', value: '$x^2 - 4x + 16$', misconceptionCode: 'expansion.middle-term-once' },
        { label: 'B', value: '$x^2 + 16$', misconceptionCode: 'expansion.freshmans-dream' },
        { label: 'C', value: '$x^2 - 8x + 16$' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Lay out $(x - 4)(x - 4)$ with tiles. Count the negative $x$ tiles: four along the top ' +
        'strip and how many down the side?',
      pictorial:
        'Grid with $x$, $-4$ on both edges. Two of the cells are $-4x$. Point at both.',
      abstract:
        '$(a - b)^2 = a^2 - 2ab + b^2$: the $2$ is there because there are two rectangles.',
    },
    hints: [
      'Test with $x = 1$: $(1 - 4)^2 = 9$. Which option gives $9$?',
      'The grid has two middle cells, each $-4x$.',
    ],
    solution:
      '$$(x - 4)^2 = x^2 - 4x - 4x + 16 = x^2 - 8x + 16.$$\n\n' +
      'Option A has only one $-4x$ — one rectangle instead of two. Option B has none. At $x = ' +
      '1$ the true value is $9$; A gives $13$ and B gives $17$.',
    misconceptionCodes: ['expansion.middle-term-once', 'expansion.freshmans-dream'],
  },

  // -------------------------------------------------------------------------
  // §3.3 factorize-expressions-grouping — tier 1, family expansion.factor-a
  // -------------------------------------------------------------------------
  {
    id: 'expansion.factor-a-1',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 1,
    sequence: { family: 'expansion.factor-a', position: 1 },
    statement: 'Factorise $3x + 6$.',
    answer: { type: 'expression', value: '3(x+2)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Take three $x$ tiles and six units. Can you arrange them into a rectangle that is $3$ ' +
        'tall? How long is it?',
      pictorial:
        'A one-row grid: the cells are $3x$ and $6$, the row header is $3$. What are the two ' +
        'column headers?',
      abstract:
        'The biggest number that divides both $3$ and $6$ is $3$. Take it outside: $3(\\;\\;)$ ' +
        'and fill the bracket so it expands back.',
    },
    hints: [
      'What number goes into both $3x$ and $6$?',
      '$3x + 6 = 3 \\times x + 3 \\times 2$. Take the $3$ out.',
    ],
    solution:
      '$$3x + 6 = 3(x + 2).$$\n\n' +
      'Check by expanding: $3(x + 2) = 3x + 6$. ✓ A rectangle $3$ tall and $x + 2$ long.',
    misconceptionCodes: ['expansion.factorise-incompletely'],
    figure: {
      kind: 'area_grid',
      title: '3x + 6 as a rectangle',
      columns: ['', ''],
      rows: ['3'],
      cells: ['3x', '6'],
      caption: 'The row is 3 tall. What are the two column headings?',
    },
  },
  {
    id: 'expansion.factor-a-2',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 1,
    sequence: { family: 'expansion.factor-a', position: 2 },
    expect:
      'The $3x + 6$ has become $3x^2 + 6x$: each term has an extra $x$. Is the common factor ' +
      'still just $3$, or is it bigger now?',
    statement: 'Factorise $3x^2 + 6x$.',
    answer: { type: 'expression', value: '3x(x+2)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Three $x^2$ tiles and six $x$ tiles. Make a rectangle out of them. One side is $3x$ — ' +
        'what is the other?',
      pictorial:
        'A one-row grid with cells $3x^2$ and $6x$. Both cells have a $3$ and an $x$ in them. ' +
        'What is the row header?',
      abstract:
        'The highest common factor of $3x^2$ and $6x$ is $3x$, not $3$. Taking out only $3$ ' +
        'leaves $x^2 + 2x$, which still has a common factor.',
    },
    hints: [
      'Both terms share a number *and* a letter. What is the biggest thing that divides both?',
      '$3x^2 = 3x \\cdot x$ and $6x = 3x \\cdot 2$.',
    ],
    solution:
      '$$3x^2 + 6x = 3x(x + 2).$$\n\n' +
      'Check: $3x(x + 2) = 3x^2 + 6x$. ✓ Stopping at $3(x^2 + 2x)$ is not finished — the bracket ' +
      'still has a factor of $x$ in every term.',
    misconceptionCodes: ['expansion.factorise-incompletely'],
    figure: {
      kind: 'area_grid',
      title: '3x² + 6x as a rectangle',
      columns: ['', ''],
      rows: [''],
      cells: ['3x²', '6x'],
      caption: 'What is the tallest row that fits both cells?',
    },
  },
  {
    id: 'expansion.factor-a-3',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 1,
    sequence: { family: 'expansion.factor-a', position: 3 },
    expect:
      'Now a $y$ has appeared in both terms: $3x^2y + 6xy^2$. Which letters, and how many of ' +
      'each, will the common factor contain this time?',
    statement: 'Factorise $3x^2y + 6xy^2$.',
    answer: { type: 'expression', value: '3xy(x+2y)', variables: ['x', 'y'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Write each term out in full: $3 \\cdot x \\cdot x \\cdot y$ and $2 \\cdot 3 \\cdot x ' +
        '\\cdot y \\cdot y$. Circle everything that appears in both.',
      pictorial:
        'A one-row grid with cells $3x^2y$ and $6xy^2$. The row header is whatever both cells ' +
        'share.',
      abstract:
        'HCF of the numbers: $3$. Lowest power of $x$ in both: $x$. Lowest power of $y$: $y$. ' +
        'So the common factor is $3xy$.',
    },
    hints: [
      'Find the common factor one piece at a time: the number, then the $x$s, then the $y$s.',
      'Both terms contain $3$, one $x$ and one $y$. Take out $3xy$.',
      '$3x^2y \\div 3xy = x$ and $6xy^2 \\div 3xy = 2y$.',
    ],
    solution:
      '$$3x^2y + 6xy^2 = 3xy(x + 2y).$$\n\n' +
      'Check: $3xy \\cdot x = 3x^2y$ and $3xy \\cdot 2y = 6xy^2$. ✓',
    misconceptionCodes: ['expansion.factorise-incompletely'],
  },
  {
    id: 'expansion.factor-a-4',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 1,
    sequence: { family: 'expansion.factor-a', position: 4 },
    expect:
      'A different shape: $x^2 - 9$ has no common factor at all. Think back to $(x + 3)(x - 3)$ ' +
      '— what did that expand to? Which two brackets will you need?',
    statement: 'Factorise $x^2 - 9$.',
    answer: { type: 'expression', value: '(x+3)(x-3)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'A square of side $x$ with a $3 \\times 3$ corner cut away. Cut the L-shape that is left ' +
        'into two pieces and rearrange them into one rectangle. What are its sides?',
      pictorial:
        'A grid whose corner cells are $x^2$ and $-9$, headers blank. The two middle cells must ' +
        'cancel — so what are they, and what are the headers?',
      abstract:
        '$a^2 - b^2 = (a + b)(a - b)$ with $a = x$ and $b = 3$.',
    },
    hints: [
      'There is no common factor. But $x^2$ and $9$ are both squares — of what?',
      'You expanded $(x + 3)(x - 3)$ earlier. What did you get?',
    ],
    solution:
      '$$x^2 - 9 = x^2 - 3^2 = (x + 3)(x - 3).$$\n\n' +
      'Check: $(x + 3)(x - 3) = x^2 - 3x + 3x - 9 = x^2 - 9$. ✓',
    misconceptionCodes: ['expansion.freshmans-dream'],
    figure: {
      kind: 'area_grid',
      title: 'x² − 9 as a rectangle',
      columns: ['', ''],
      rows: ['', ''],
      cells: ['x²', '', '', '−9'],
      caption: 'The two blank cells add to zero. Fill them, then the headers.',
    },
  },
  {
    id: 'expansion.factor-a-5',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 1,
    sequence: { family: 'expansion.factor-a', position: 5 },
    expect: 'The $9$ became $16$. Which number changes inside the brackets, and to what?',
    statement: 'Factorise $x^2 - 16$.',
    answer: { type: 'expression', value: '(x+4)(x-4)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Same square of side $x$, but now a $4 \\times 4$ corner is removed. Rearrange the L into ' +
        'a rectangle: one side is $x + 4$, the other is shorter than $x$ by how much?',
      pictorial: 'Grid with corners $x^2$ and $-16$. The middle cells are $+4x$ and $-4x$.',
      abstract: '$16 = 4^2$, so $x^2 - 16 = (x + 4)(x - 4)$.',
    },
    hints: ['$16$ is a square. Of what?', 'Difference of two squares with $b = 4$.'],
    solution:
      '$$x^2 - 16 = x^2 - 4^2 = (x + 4)(x - 4).$$\n\n' +
      'Check: $x^2 - 4x + 4x - 16 = x^2 - 16$. ✓',
    misconceptionCodes: ['expansion.freshmans-dream'],
  },
  {
    id: 'expansion.factor-a-6',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 1,
    sequence: { family: 'expansion.factor-a', position: 6 },
    expect:
      'The $x^2$ has become $4x^2$. Is $4x^2$ still a square? If so, of what — and what goes in ' +
      'the brackets in place of $x$?',
    statement: 'Factorise $4x^2 - 9$.',
    answer: { type: 'expression', value: '(2x+3)(2x-3)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Four $x^2$ tiles make a square of side $2x$. Cut a $3 \\times 3$ corner out of it and ' +
        'rearrange. What are the sides of the rectangle?',
      pictorial:
        'Grid with corners $4x^2$ and $-9$. The headers are $2x$ and $\\pm 3$; the middle cells ' +
        'are $\\pm 6x$.',
      abstract: '$4x^2 = (2x)^2$ and $9 = 3^2$, so $a = 2x$, $b = 3$.',
    },
    hints: [
      '$4x^2$ is a square: $(2x)^2$. $9$ is $3^2$.',
      'Use $a^2 - b^2 = (a + b)(a - b)$ with $a = 2x$ and $b = 3$.',
    ],
    solution:
      '$$4x^2 - 9 = (2x)^2 - 3^2 = (2x + 3)(2x - 3).$$\n\n' +
      'Check: $(2x + 3)(2x - 3) = 4x^2 - 6x + 6x - 9 = 4x^2 - 9$. ✓',
    misconceptionCodes: ['expansion.coefficient-not-squared'],
  },
  {
    id: 'expansion.factor-a-7',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 1,
    sequence: { family: 'expansion.factor-a', position: 7 },
    expect:
      'The two terms have swapped places: $9 - 4x^2$ instead of $4x^2 - 9$. Which number is ' +
      'being squared and subtracted now? Predict which term comes first in each bracket.',
    statement: 'Factorise $9 - 4x^2$.',
    answer: { type: 'expression', value: '(3+2x)(3-2x)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'This time the big square is $3 \\times 3$ and the piece cut out is $2x$ by $2x$. Which ' +
        'side of the rectangle is $3 + 2x$?',
      pictorial: 'Grid with corners $9$ and $-4x^2$. Headers $3$ and $\\pm 2x$.',
      abstract: '$a^2 - b^2$ with $a = 3$ and $b = 2x$: $(3 + 2x)(3 - 2x)$.',
    },
    hints: [
      'It is still a difference of two squares, but now $a = 3$ and $b = 2x$.',
      '$(a + b)(a - b)$ with $a = 3$, $b = 2x$.',
    ],
    solution:
      '$$9 - 4x^2 = 3^2 - (2x)^2 = (3 + 2x)(3 - 2x).$$\n\n' +
      'Check: $9 - 6x + 6x - 4x^2 = 9 - 4x^2$. ✓ Writing $(2x + 3)(2x - 3)$ would give $4x^2 - ' +
      '9$, the negative of what was asked.',
    misconceptionCodes: ['expansion.coefficient-not-squared'],
  },
  {
    id: 'expansion.factor-a-8',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 1,
    sequence: { family: 'expansion.factor-a', position: 8 },
    expect:
      'Four terms now, and no square in sight: $ax + ay + bx + by$. There is no factor common ' +
      'to all four. Is there a factor common to the first *two*? And to the last two?',
    statement: 'Factorise $ax + ay + bx + by$.',
    answer: {
      type: 'expression',
      value: '(a+b)(x+y)',
      variables: ['a', 'b', 'x', 'y'],
      form: 'factorised',
    },
    cpaPrompts: {
      concrete:
        'Draw a rectangle with $x$ and $y$ along the top and $a$ and $b$ down the side. Label ' +
        'the four cells. Do they match the four terms you were given?',
      pictorial:
        'A $2 \\times 2$ grid with cells $ax$, $ay$, $bx$, $by$ and the headers blank. What ' +
        'headers produce exactly those cells?',
      abstract:
        'Group in pairs: $a(x + y) + b(x + y)$. The bracket $(x + y)$ is now a common factor of ' +
        'the two groups. Take it out.',
    },
    hints: [
      'Take $a$ out of the first two terms and $b$ out of the last two.',
      '$a(x + y) + b(x + y)$. The same bracket appears twice — it is a common factor.',
    ],
    solution:
      '$$ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y).$$\n\n' +
      'Check on the grid: rows $a$, $b$ and columns $x$, $y$ give cells $ax$, $ay$, $bx$, $by$. ✓',
    misconceptionCodes: ['expansion.group-in-pairs-blindly'],
    figure: {
      kind: 'area_grid',
      title: 'ax + ay + bx + by',
      columns: ['', ''],
      rows: ['', ''],
      cells: ['ax', 'ay', 'bx', 'by'],
      caption: 'The four cells are given. Find the headers.',
    },
  },
  {
    id: 'expansion.factor-a-9',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 1,
    sequence: { family: 'expansion.factor-a', position: 9 },
    expect:
      'The last two terms have turned negative: $ax + ay - bx - by$. When you take a factor out ' +
      'of $-bx - by$, what sign should it carry so that the bracket still matches $(x + y)$?',
    statement: 'Factorise $ax + ay - bx - by$.',
    answer: {
      type: 'expression',
      value: '(a-b)(x+y)',
      variables: ['a', 'b', 'x', 'y'],
      form: 'factorised',
    },
    cpaPrompts: {
      concrete:
        'Same grid as before, but the bottom row is now negative. If the columns are still $x$ ' +
        'and $y$, what must the bottom row header be?',
      pictorial: 'Cells $ax$, $ay$, $-bx$, $-by$. Columns $x$, $y$. Rows $a$ and what?',
      abstract:
        '$a(x + y) - b(x + y)$. Taking out $-b$, not $b$, is what makes the two brackets match.',
    },
    hints: [
      'Group: $(ax + ay) + (-bx - by)$. What is common to $-bx$ and $-by$?',
      'Take out $-b$: $-bx - by = -b(x + y)$. Now both groups contain $(x + y)$.',
    ],
    solution:
      '$$ax + ay - bx - by = a(x + y) - b(x + y) = (a - b)(x + y).$$\n\n' +
      'The payoff of the pair: the same four letters give $(a + b)(x + y)$ or $(a - b)(x + y)$ ' +
      'depending only on the signs of the second pair. Check by expanding: $ax + ay - bx - by$. ✓',
    misconceptionCodes: ['expansion.group-in-pairs-blindly'],
  },

  // §3.3 — tier 2
  {
    id: 'expansion.recognise-perfect-square',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 2,
    statement: 'Factorise $x^2 + 10x + 25$.',
    answer: { type: 'expression', value: '(x+5)^2', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'One $x^2$ tile, ten $x$ tiles and twenty-five units. Try to build a rectangle. Does it ' +
        'turn out to be a square?',
      pictorial:
        'Grid with corners $x^2$ and $25$. If the middle cells are equal, what are they each, and ' +
        'what are the headers?',
      abstract:
        'Is $25$ a square? Is $10x$ twice $x$ times that square root? If both, this is $(x + ' +
        'b)^2$.',
    },
    hints: [
      '$25 = 5^2$. Is $10x$ equal to $2 \\times 5 \\times x$?',
      'Then it matches $a^2 + 2ab + b^2 = (a + b)^2$ with $a = x$, $b = 5$.',
    ],
    solution:
      '$25 = 5^2$ and $10x = 2(x)(5)$, so\n\n$$x^2 + 10x + 25 = (x + 5)^2.$$\n\n' +
      'Check: $(x + 5)^2 = x^2 + 10x + 25$. ✓ $(x + 5)(x + 5)$ is the same answer.',
    misconceptionCodes: ['expansion.middle-term-once'],
    figure: {
      kind: 'algebra_tiles',
      title: 'x² + 10x + 25',
      tiles: [
        { type: 'x2', sign: 'positive', count: 1 },
        { type: 'x', sign: 'positive', count: 10 },
        { type: 'unit', sign: 'positive', count: 25 },
      ],
      arrangement: 'loose',
      caption: 'Can these tiles be arranged into a square? What is its side?',
    },
  },
  {
    id: 'expansion.factorise-completely-dots',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 2,
    statement: 'Factorise $2x^2 - 8$ completely.',
    answer: { type: 'expression', value: '2(x+2)(x-2)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Two $x^2$ tiles and eight negative units. Split them into two identical piles first. ' +
        'What is in each pile?',
      pictorial:
        'Take the $2$ out and draw what is left as a grid: corners $x^2$ and $-4$, headers blank.',
      abstract:
        'Common factor first: $2(x^2 - 4)$. Then look inside — $x^2 - 4$ is a difference of two ' +
        'squares.',
    },
    hints: [
      'Both terms are even. Take out the $2$ first.',
      '$2(x^2 - 4)$. Is the bracket finished, or can it be split further?',
      '$x^2 - 4 = (x + 2)(x - 2)$.',
    ],
    solution:
      '$$2x^2 - 8 = 2(x^2 - 4) = 2(x + 2)(x - 2).$$\n\n' +
      'Stopping at $2(x^2 - 4)$ is not complete: the bracket is a difference of two squares.',
    misconceptionCodes: ['expansion.factorise-incompletely'],
  },
  {
    id: 'expansion.grouping-two-variables',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 2,
    statement: 'Factorise $x^2 + xy + 2x + 2y$.',
    answer: { type: 'expression', value: '(x+2)(x+y)', variables: ['x', 'y'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Four terms and nothing common to all four. Which two terms share an $x$? Which two ' +
        'share a $2$?',
      pictorial:
        'Grid with cells $x^2$, $xy$, $2x$, $2y$ and blank headers. Read the top row: what ' +
        'header gives $x^2$ and $xy$?',
      abstract:
        '$x(x + y) + 2(x + y) = (x + 2)(x + y)$.',
    },
    hints: [
      'Take $x$ out of the first two terms and $2$ out of the last two.',
      '$x(x + y) + 2(x + y)$. Now the bracket is the common factor.',
    ],
    solution:
      '$$x^2 + xy + 2x + 2y = x(x + y) + 2(x + y) = (x + 2)(x + y).$$\n\n' +
      'Check: $(x + 2)(x + y) = x^2 + xy + 2x + 2y$. ✓',
    misconceptionCodes: ['expansion.group-in-pairs-blindly'],
    figure: {
      kind: 'area_grid',
      title: 'x² + xy + 2x + 2y',
      columns: ['', ''],
      rows: ['', ''],
      cells: ['x²', 'xy', '2x', '2y'],
    },
  },
  {
    id: 'expansion.reversed-dots',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 2,
    statement:
      'The expression $4x^2 - 12x + 9$ is a perfect square. Write it as a square bracket.',
    answer: { type: 'expression', value: '(2x-3)^2', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Four $x^2$ tiles make a square of side $2x$. Nine units make a square of side $3$. The ' +
        'twelve $x$ tiles are negative — which side of the bracket is minus?',
      pictorial:
        'Grid with corners $4x^2$ and $9$. The middle cells must be $-6x$ each. What headers ' +
        'give $4x^2$, $-6x$, $-6x$, $9$?',
      abstract:
        '$a^2 - 2ab + b^2 = (a - b)^2$ with $a = 2x$, $b = 3$. Check: $2ab = 2(2x)(3) = 12x$.',
    },
    hints: [
      'What is squared to give $4x^2$? What is squared to give $9$?',
      'Check that the middle term is $2 \\times 2x \\times 3$. Then it is $(2x - 3)^2$ or ' +
        '$(2x + 3)^2$ — which sign?',
    ],
    solution:
      '$4x^2 = (2x)^2$, $9 = 3^2$ and $12x = 2(2x)(3)$, with a minus sign, so\n\n' +
      '$$4x^2 - 12x + 9 = (2x - 3)^2.$$\n\n' +
      'Check: $(2x - 3)^2 = 4x^2 - 12x + 9$. ✓',
    misconceptionCodes: ['expansion.coefficient-not-squared', 'expansion.middle-term-once'],
  },

  // §3.3 — tier 3
  {
    id: 'expansion.square-offcut',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 3,
    statement:
      'A square sheet of card has sides of $51$ cm. A square of side $49$ cm is cut from it. ' +
      'Find the area of card left over, in cm$^2$, without a calculator.',
    answer: { type: 'number', value: 200, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The leftover is an L-shape. Cut it into two strips and lay them end to end. How long ' +
        'and how wide is the rectangle you get?',
      pictorial:
        'Grid with headers $51 \\pm 49$: the L rearranges into a rectangle $(51 + 49)$ by $(51 - ' +
        '49)$.',
      abstract:
        '$51^2 - 49^2 = (51 + 49)(51 - 49)$. Difference of two squares, read backwards.',
    },
    hints: [
      'The area left is $51^2 - 49^2$. Rather than squaring, is there a shortcut for a ' +
        'difference of two squares?',
      '$a^2 - b^2 = (a + b)(a - b)$ with $a = 51$, $b = 49$.',
      '$(51 + 49)(51 - 49) = 100 \\times 2$.',
    ],
    solution:
      '$$51^2 - 49^2 = (51 + 49)(51 - 49) = 100 \\times 2 = 200 \\text{ cm}^2.$$\n\n' +
      'Check the long way: $2601 - 2401 = 200$. ✓',
    misconceptionCodes: ['expansion.freshmans-dream'],
  },
  {
    id: 'expansion.paved-courtyard',
    skillIds: ['expansion.factorize-expressions-grouping', 'expansion.special-algebraic-identities'],
    tier: 3,
    statement:
      'A square courtyard has sides of $(2n + 3)$ m. In the middle is a square lawn with sides ' +
      'of $(2n - 3)$ m, and the rest is paved. Write the paved area, in m$^2$, as simply as you ' +
      'can. Explain why the paved area is always a multiple of $24$.',
    answer: { type: 'expression', value: '24n', variables: ['n'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'Sketch the two squares sharing a centre. The paving is the ring between them. Which two ' +
        'numbers are you subtracting?',
      pictorial:
        'Paved $= (2n + 3)^2 - (2n - 3)^2$. Rather than expanding both, treat it as $A^2 - B^2$ ' +
        'with $A = 2n + 3$, $B = 2n - 3$. What are $A + B$ and $A - B$?',
      abstract:
        '$(A + B)(A - B) = (4n)(6) = 24n$. A whole number times $24$ is a multiple of $24$.',
    },
    hints: [
      'Paved area $=$ big square $-$ small square $= (2n + 3)^2 - (2n - 3)^2$.',
      'That is a difference of two squares: $[(2n + 3) + (2n - 3)][(2n + 3) - (2n - 3)]$.',
      'The first bracket is $4n$, the second is $6$.',
    ],
    solution:
      '$$(2n + 3)^2 - (2n - 3)^2 = [(2n + 3) + (2n - 3)][(2n + 3) - (2n - 3)] = (4n)(6) = 24n.$$\n\n' +
      'Since $n$ is a whole number, $24n$ is a multiple of $24$. Check at $n = 2$: $7^2 - 1^2 = 48 ' +
      '= 24 \\times 2$. ✓ Expanding both squares gives $4n^2 + 12n + 9 - 4n^2 + 12n - 9 = 24n$ too.',
    misconceptionCodes: ['expansion.freshmans-dream', 'expansion.group-in-pairs-blindly'],
  },

  // §3.3 — tier 4
  {
    id: 'expansion.factorise-by-grouping',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 4,
    statement: 'Factorize completely: $x^2 - y^2 + 6x + 9$.',
    answer: {
      type: 'expression',
      value: '(x+y+3)(x-y+3)',
      variables: ['x', 'y'],
      form: 'factorised',
    },
    cpaPrompts: {
      concrete:
        'Four terms, and no factor common to all of them. Before rearranging anything — are there ' +
        'three of these terms that would build a square?',
      pictorial:
        'Set the three terms $x^2$, $6x$ and $9$ out as tiles. Can you arrange them into a ' +
        'complete square? What is its side?',
      abstract:
        'Group into $(x^2 + 6x + 9) - y^2$, recognise the perfect square, then apply the ' +
        'difference of two squares to the result.',
    },
    hints: [
      'Not every four-term expression wants splitting into pairs. Is there a group of **three** ' +
        'here that forms a perfect square trinomial?',
      'Group $(x^2 + 6x + 9)$ and factor it. What is left over after that group?',
      'You now have $(x+3)^2 - y^2$. Treat $(x+3)$ as a single object $A$ and apply ' +
        '$A^2 - B^2 = (A+B)(A-B)$.',
    ],
    solution:
      'Regroup: $$(x^2 + 6x + 9) - y^2$$\n\n' +
      'The first group is a perfect square, so this is $$(x + 3)^2 - y^2$$\n\n' +
      'Now a difference of two squares with $A = x + 3$ and $B = y$:\n\n' +
      '$$[(x+3) + y][(x+3) - y] = (x + y + 3)(x - y + 3)$$',
    misconceptionCodes: [
      'expansion.group-in-pairs-blindly',
      'expansion.factorise-incompletely',
    ],
    figure: {
      kind: 'algebra_tiles',
      title: 'x² + 6x + 9',
      tiles: [
        { type: 'x2', sign: 'positive', count: 1 },
        { type: 'x', sign: 'positive', count: 6 },
        { type: 'unit', sign: 'positive', count: 9 },
      ],
      arrangement: 'loose',
      caption: 'Three of the four terms, as tiles. Do they make a square?',
    },
  },

  // §3.3 — diagnostics
  {
    id: 'expansion.dx-group-in-pairs-blindly',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 'diagnostic',
    statement: 'Factorise $x^2 - y^2 + 4x + 4$ completely.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        {
          label: 'A',
          value: '$(x + y)(x - y) + 4(x + 1)$',
          misconceptionCode: 'expansion.group-in-pairs-blindly',
        },
        { label: 'B', value: '$(x + 2 + y)(x + 2 - y)$' },
        { label: 'C', value: '$(x + 2)^2 - y^2$', misconceptionCode: 'expansion.factorise-incompletely' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Before you pair anything up: which three of the four terms could be laid out as a ' +
        'complete square of tiles?',
      pictorial:
        'Set $x^2$, $4x$ and $4$ out as a square. Its side is $x + 2$. Now the whole thing is a ' +
        'square minus $y^2$.',
      abstract:
        '$(x^2 + 4x + 4) - y^2 = (x + 2)^2 - y^2$, then $A^2 - B^2$ with $A = x + 2$, $B = y$.',
    },
    hints: [
      'Pairing $x^2 - y^2$ with $4x + 4$ leaves two groups with nothing in common. Try a group ' +
        'of three instead.',
      '$x^2 + 4x + 4 = (x + 2)^2$. What is left, and what form is the whole thing now?',
    ],
    solution:
      '$$x^2 - y^2 + 4x + 4 = (x + 2)^2 - y^2 = (x + 2 + y)(x + 2 - y).$$\n\n' +
      'Option A has grouped in pairs and stopped — it is not a product, so it is not factorised. ' +
      'Option C is a correct step but is not complete: a difference of two squares remains.',
    misconceptionCodes: ['expansion.group-in-pairs-blindly', 'expansion.factorise-incompletely'],
  },
  {
    id: 'expansion.dx-factorise-incompletely',
    skillIds: ['expansion.factorize-expressions-grouping'],
    tier: 'diagnostic',
    statement: 'Factorise $2x^2 - 18$ completely.',
    answer: {
      type: 'choice',
      correct: 'C',
      options: [
        { label: 'A', value: '$2(x^2 - 9)$', misconceptionCode: 'expansion.factorise-incompletely' },
        { label: 'B', value: '$2(x - 3)^2$', misconceptionCode: 'expansion.freshmans-dream' },
        { label: 'C', value: '$2(x + 3)(x - 3)$' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Two $x^2$ tiles and eighteen negative units. Halve the pile: one $x^2$ and nine ' +
        'negative units. Is that a shape you recognise?',
      pictorial: 'After taking out the $2$: a grid with corners $x^2$ and $-9$, headers blank.',
      abstract:
        '$2(x^2 - 9)$, and $x^2 - 9$ is a difference of two squares. Keep going.',
    },
    hints: [
      'Take out the common factor $2$ first. Then look at the bracket.',
      '$x^2 - 9$ is $x^2 - 3^2$. Which identity is that?',
    ],
    solution:
      '$$2x^2 - 18 = 2(x^2 - 9) = 2(x + 3)(x - 3).$$\n\n' +
      'Option A stops one step early. Option B treats $x^2 - 9$ as $(x - 3)^2$, but $(x - 3)^2 ' +
      '= x^2 - 6x + 9$ — check at $x = 0$: $2(-9) = -18$ but $2(9) = 18$.',
    misconceptionCodes: ['expansion.factorise-incompletely', 'expansion.freshmans-dream'],
  },
];
