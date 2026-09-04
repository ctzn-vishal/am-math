import type { Problem, SkillNode } from '@/lib/content/schema';

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
    title: 'Expand products of algebraic expressions using the Distributive Law',
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
    title: 'Apply special algebraic identities (perfect squares and difference of squares)',
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
    title: 'Factorize expressions by grouping and using special products',
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

export const expansionProblems: Problem[] = [
  {
    id: 'expansion.difference-of-squares',
    skillIds: ['expansion.special-algebraic-identities'],
    difficulty: 'basic',
    statement: 'Expand and simplify $(3x + 4)(3x - 4)$.',
    answer: { type: 'exact', value: '9x^2 - 16', accepts: ['9x²-16', '-16 + 9x^2'] },
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
    id: 'expansion.perfect-square-middle-term',
    skillIds: ['expansion.special-algebraic-identities'],
    difficulty: 'basic',
    statement: 'Expand $(2x + 5)^2$.',
    answer: { type: 'exact', value: '4x^2 + 20x + 25', accepts: ['4x²+20x+25'] },
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
    id: 'expansion.factorise-by-grouping',
    skillIds: ['expansion.factorize-expressions-grouping'],
    difficulty: 'challenge',
    statement: 'Factorize completely: $x^2 - y^2 + 6x + 9$.',
    answer: {
      type: 'exact',
      value: '(x + y + 3)(x - y + 3)',
      accepts: ['(x+y+3)(x-y+3)', '(x-y+3)(x+y+3)', '(x+3+y)(x+3-y)'],
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
  },
];
