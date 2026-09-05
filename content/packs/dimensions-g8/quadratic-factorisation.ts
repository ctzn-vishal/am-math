import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';

/**
 * Unit 4 — Quadratic Factorization and Equations. Hand-authored.
 *
 * Source: docs/Implementation Manual §2 (the monic/non-monic distinction, the
 * cross-multiplication frame) and the Chapter 4 worked examples in the content spec.
 *
 * The manual is emphatic about one distinction, and it shapes this whole unit: a monic
 * quadratic yields to searching factor pairs, and a non-monic one does not, because the
 * leading coefficient has to be split across both brackets. Students who never meet that
 * distinction squarely try to guess their way through $2w^2 + 3w - 35$ and conclude they
 * are bad at algebra.
 */

export const quadraticFactorisationSkills: SkillNode[] = [
  {
    id: 'quadratic-factorisation.factorize-quadratic-trinomials',
    title: 'Factorize quadratic trinomials by cross-multiplication and area methods',
    summary:
      'Factorise both monic and non-monic trinomials, and recognise which method the shape of the ' +
      'quadratic is asking for.',
    prerequisites: [],
    cpa: {
      concrete:
        'Algebra tiles assembled into a rectangle. One $x^2$ tile, some $x$ bars and some units, ' +
        'and the question is whether they close. When a gap remains, zero pairs — a $+x$ and a ' +
        '$-x$ together — can be added without changing the value, which is how negative ' +
        'coefficients enter without anything being "taken away".\n\nA non-monic quadratic needs ' +
        'more than one $x^2$ tile, and the student discovers by handling them that the sides can ' +
        'no longer both start with a plain $x$.',
      pictorial:
        'The cross-multiplication frame. Left column multiplies to $a$, right column to $c$, and ' +
        'the two crossing products must add to $b$. Its value is that it makes the search ' +
        'systematic: candidates get tested and ruled out rather than guessed at.',
      abstract:
        '$ax^2 + bx + c = (px + q)(rx + s)$ where $pr = a$, $qs = c$ and $ps + qr = b$. For monic ' +
        'quadratics $p = r = 1$ and this collapses to "two numbers multiplying to $c$ and adding ' +
        'to $b$".',
    },
    formulas: ['ax^2 + bx + c = (px + q)(rx + s)', 'pr = a, \\quad qs = c, \\quad ps + qr = b'],
    suggestedVisual: 'cross_frame',
    misconceptions: [
      {
        code: 'quadratic.monic-method-on-non-monic',
        description:
          'Applies the monic shortcut to a non-monic quadratic: for $3x^2 + 10x + 8$, looks for ' +
          'two numbers multiplying to 8 and adding to 10, and writes $(x + p)(x + q)$.',
        probe:
          'Multiply your factors back out. Does the first term come to the $3x^2$ we started with?',
        correction:
          'When $a \\neq 1$ the leading coefficient has to be split across the two brackets, so ' +
          'the $x$-terms are not both plain $x$. That is exactly what the cross frame is for: the ' +
          'left column has to multiply back to $a$.',
      },
      {
        code: 'quadratic.sign-pair-confusion',
        description:
          'Gets the signs of the factor pair wrong when the constant is positive and the middle ' +
          'term negative: tries $+3$ and $+4$ for $x^2 - 7x + 12$.',
        probe:
          'Your two numbers have to multiply to a positive 12 and add to a negative 7. If both ' +
          'were positive, what sign would their sum have?',
        correction:
          'A positive product means the two numbers share a sign; a negative sum then forces both ' +
          'to be negative. $-3$ and $-4$ multiply to $+12$ and add to $-7$.',
      },
    ],
  },
  {
    id: 'quadratic-factorisation.solve-quadratic-equations',
    title: 'Solve quadratic equations using the Zero Product Property',
    summary:
      'Turn a factorised quadratic into its roots, and understand why the property needs the ' +
      'equation set to zero first.',
    prerequisites: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    cpa: {
      concrete:
        'Two cards, each with a number written on the back, held face down. Their product is zero. ' +
        'The student is asked what they can conclude — and finds that at least one card must be a ' +
        'zero, because no two non-zero numbers multiply to nothing.\n\nThen the same with a ' +
        'product of 12, where nothing at all can be concluded about either card. That contrast is ' +
        'the whole reason the equation must be set to zero.',
      pictorial:
        'A parabola crossing the $x$-axis. The roots are where the curve meets $y = 0$, which is ' +
        'why solving means setting the expression equal to zero and not to anything else.',
      abstract:
        'If $A \\cdot B = 0$ then $A = 0$ or $B = 0$. Rearrange to $ax^2 + bx + c = 0$, factorise, ' +
        'then set each factor to zero.',
    },
    formulas: ['A \\cdot B = 0 \\implies A = 0 \\text{ or } B = 0'],
    suggestedVisual: 'coordinate_plane',
    misconceptions: [
      {
        code: 'quadratic.stops-at-factorising',
        description:
          'Factorises correctly and stops, offering $(x-3)(x-4)$ as the answer to "solve ' +
          '$x^2 - 7x + 12 = 0$".',
        probe:
          'You have factorised it correctly. But read the question again — it asks you to *solve*. ' +
          'What values of $x$ make that product equal zero?',
        correction:
          'Factorising rewrites the expression; solving finds the values. The Zero Product Property ' +
          'turns one into the other: each bracket set to zero gives one root.',
      },
      {
        code: 'quadratic.zero-product-on-nonzero',
        description:
          'Applies the property to an equation not set to zero: from $(x-1)(x-2) = 6$ concludes ' +
          '$x - 1 = 6$ or $x - 2 = 6$.',
        probe:
          'If two numbers multiply to 6, does either of them have to *be* 6? Name two that are ' +
          'not.',
        correction:
          'Zero is the only product that forces a factor. Expand, bring everything to one side, ' +
          'and factorise the result before applying the property.',
      },
    ],
  },
  {
    id: 'quadratic-factorisation.model-real-world-scenarios',
    title: 'Model real-world scenarios with quadratic equations',
    summary:
      'Set up a quadratic from a situation, solve it, and judge which of the roots the situation ' +
      'actually admits.',
    prerequisites: ['quadratic-factorisation.solve-quadratic-equations'],
    cpa: {
      concrete:
        'A rectangle of string or a marked-out patch of floor whose length is described in terms ' +
        'of its width. The student changes the width and watches the area change — and notices it ' +
        'does not change proportionally, which is what makes the equation quadratic.',
      pictorial:
        'A labelled rectangle: width $w$, length $2w + 3$, area 35. The picture carries the ' +
        'relationship so the algebra does not have to be remembered.',
      abstract:
        'Define a variable with units, express the other quantities in terms of it, form the ' +
        'equation, solve — then test every root against the situation, not against the algebra.',
    },
    formulas: [],
    suggestedVisual: 'area_grid',
    misconceptions: [
      {
        code: 'quadratic.keeps-impossible-root',
        description:
          'Reports both algebraic roots as answers, including a negative width or a negative time.',
        probe:
          'You have $w = 3.5$ and $w = -5$. Go back to the garden — can a physical width be $-5$ ' +
          'metres?',
        correction:
          'Both are solutions of the equation; only one is a solution of the *problem*. A quadratic ' +
          'model usually admits a root the situation forbids, so every root has to be checked ' +
          'against the thing being modelled.',
      },
      {
        code: 'quadratic.answers-the-variable-not-the-question',
        description:
          'Solves for the variable and stops, giving the width when the question asked for both ' +
          'dimensions or for the length.',
        probe: 'You have the width. What did the question actually ask you to find?',
        correction:
          'The variable is a means, not the answer. Read the question again once you have solved, ' +
          'and finish the job it set.',
      },
    ],
  },
];

/**
 * Problems, in bank order: skill by skill, tier-1 sequences first, then tiers 2-4 and the
 * diagnostics. Two sequences carry the first skill, because a monic quadratic and a
 * non-monic one are not one procedure with a bigger number in it — they are two, and the
 * unit exists to make that distinction land.
 */
export const quadraticFactorisationProblems: Problem[] = [
  // -------------------------------------------------------------------------
  // §4.1 factorize-quadratic-trinomials — tier 1a: monic, family quadratic-factorisation.monic-a
  // -------------------------------------------------------------------------
  {
    id: 'quadratic-factorisation.monic-a-1',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.monic-a', position: 1 },
    statement: 'Factorise $x^2 + 5x + 6$.',
    answer: { type: 'expression', value: '(x+2)(x+3)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Take one $x^2$ tile, five $x$ tiles and six units and push them into a rectangle. What ' +
        'are the two side lengths when it closes?',
      pictorial:
        'Draw a four-cell grid with $x^2$ in the top-left corner and $6$ in the bottom-right. ' +
        'What must the two blank cells be, and what headers produce them?',
      abstract:
        'Find two numbers that multiply to $6$ and add to $5$. Those numbers go into the brackets ' +
        'as $(x + \\square)(x + \\square)$.',
    },
    hints: [
      'List the pairs of whole numbers that multiply to $6$: $1 \\times 6$ and $2 \\times 3$.',
      'Which of those pairs adds up to $5$?',
      '$2 + 3 = 5$ and $2 \\times 3 = 6$, so the brackets are $(x + 2)$ and $(x + 3)$.',
    ],
    solution:
      'Two numbers multiplying to $+6$ and adding to $+5$ are $2$ and $3$.\n\n' +
      '$$x^2 + 5x + 6 = (x + 2)(x + 3)$$\n\n' +
      'Check by expanding: $x^2 + 3x + 2x + 6 = x^2 + 5x + 6$. ✓',
    misconceptionCodes: ['quadratic.sign-pair-confusion'],
    figure: {
      kind: 'algebra_tiles',
      title: 'x² + 5x + 6',
      tiles: [
        { type: 'x2', sign: 'positive', count: 1 },
        { type: 'x', sign: 'positive', count: 5 },
        { type: 'unit', sign: 'positive', count: 6 },
      ],
      arrangement: 'rectangle',
      caption: 'The sides of the rectangle are the factors. What are they?',
    },
  },
  {
    id: 'quadratic-factorisation.monic-a-2',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.monic-a', position: 2 },
    expect:
      'The $5x$ has become $7x$, but the $6$ has not moved. So the pair still multiplies to $6$ ' +
      '— which pair is it this time, and why was it not the pair you used last time?',
    statement: 'Factorise $x^2 + 7x + 6$.',
    answer: { type: 'expression', value: '(x+1)(x+6)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Same one $x^2$ tile and six units, but now seven $x$ tiles. Build the rectangle again — ' +
        'it is much longer and thinner than the last one. Why?',
      pictorial:
        'Grid with $x^2$ and $6$ in opposite corners again. The two blank cells must now add to ' +
        '$7x$ instead of $5x$. What are they?',
      abstract:
        'Still two numbers multiplying to $6$, but adding to $7$ now. Only one pair of factors ' +
        'of $6$ can do that.',
    },
    hints: [
      'The pairs multiplying to $6$ have not changed: $1 \\times 6$ and $2 \\times 3$.',
      'Which pair adds to $7$? $2 + 3 = 5$, so try the other one.',
    ],
    solution:
      '$1 \\times 6 = 6$ and $1 + 6 = 7$.\n\n' +
      '$$x^2 + 7x + 6 = (x + 1)(x + 6)$$\n\n' +
      'The constant chooses the *pair*; the middle term chooses *which* pair. Check: $x^2 + 6x + ' +
      'x + 6 = x^2 + 7x + 6$. ✓',
    misconceptionCodes: ['quadratic.sign-pair-confusion'],
  },
  {
    id: 'quadratic-factorisation.monic-a-3',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.monic-a', position: 3 },
    expect:
      'Only the middle sign changed: $+5x$ is now $-5x$, and the $+6$ has stayed positive. Will ' +
      'the two numbers still be $2$ and $3$? What signs must they carry?',
    statement: 'Factorise $x^2 - 5x + 6$.',
    answer: { type: 'expression', value: '(x-2)(x-3)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'One $x^2$ tile, six positive units and five *negative* $x$ tiles. Lay them out: the ' +
        'negative $x$ tiles have to sit along both edges of the rectangle.',
      pictorial:
        'Grid with $x^2$ and $+6$ in opposite corners and $-5x$ shared between the other two ' +
        'cells. What two cells add to $-5x$ and come from a positive $6$?',
      abstract:
        'The product is $+6$, so the two numbers share a sign. Their sum is $-5$, so that shared ' +
        'sign is negative.',
    },
    hints: [
      'Two numbers multiply to a positive $6$. What does that tell you about their signs?',
      'If both were positive their sum would be positive. The sum is $-5$, so both are negative.',
      '$(-2) \\times (-3) = 6$ and $(-2) + (-3) = -5$.',
    ],
    solution:
      'A positive product means the pair shares a sign; a negative sum makes that sign negative.\n\n' +
      '$$x^2 - 5x + 6 = (x - 2)(x - 3)$$\n\n' +
      'Check: $x^2 - 3x - 2x + 6 = x^2 - 5x + 6$. ✓ Compare with item 1: the same numbers, both ' +
      'flipped.',
    misconceptionCodes: ['quadratic.sign-pair-confusion'],
  },
  {
    id: 'quadratic-factorisation.monic-a-4',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.monic-a', position: 4 },
    expect:
      'Now the constant has gone negative: $x^2 + x - 6$. A negative product cannot come from ' +
      'two numbers with the same sign. So what has to be true of the pair this time?',
    statement: 'Factorise $x^2 + x - 6$.',
    answer: { type: 'expression', value: '(x+3)(x-2)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'One $x^2$ tile, one $x$ tile and six negative units. The rectangle will not close — ' +
        'until you add a zero pair of $x$ tiles. How many pairs do you need?',
      pictorial:
        'Grid with $x^2$ and $-6$ in opposite corners. One of the two blank cells is positive and ' +
        'the other negative, and they add to $+x$.',
      abstract:
        'The product is $-6$, so one number is positive and one is negative. Their sum is $+1$, ' +
        'so the positive one is the larger.',
    },
    hints: [
      'A negative product means one number is positive and the other negative.',
      'The pairs are $\\pm 1, \\mp 6$ and $\\pm 2, \\mp 3$. Which combination adds to $+1$?',
      '$3 + (-2) = 1$ and $3 \\times (-2) = -6$.',
    ],
    solution:
      'A negative constant forces opposite signs. $+3$ and $-2$ multiply to $-6$ and add to $+1$.\n\n' +
      '$$x^2 + x - 6 = (x + 3)(x - 2)$$\n\n' +
      'Check: $x^2 - 2x + 3x - 6 = x^2 + x - 6$. ✓',
    misconceptionCodes: ['quadratic.sign-pair-confusion'],
    figure: {
      kind: 'algebra_tiles',
      title: 'x² + x − 6',
      tiles: [
        { type: 'x2', sign: 'positive', count: 1 },
        { type: 'x', sign: 'positive', count: 1 },
        { type: 'unit', sign: 'negative', count: 6 },
      ],
      arrangement: 'loose',
      showZeroPairs: true,
      caption: 'These will not close into a rectangle yet. Adding zero pairs of x tiles is free.',
    },
  },
  {
    id: 'quadratic-factorisation.monic-a-5',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.monic-a', position: 5 },
    expect:
      'Only the middle sign changed again: $+x$ became $-x$, and the $-6$ stayed. Predict both ' +
      'brackets before you work — which of $2$ and $3$ carries the minus sign now?',
    statement: 'Factorise $x^2 - x - 6$.',
    answer: { type: 'expression', value: '(x-3)(x+2)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Compare the two boards side by side: $x^2 + x - 6$ needed three positive and two ' +
        'negative $x$ tiles. What does $x^2 - x - 6$ need?',
      pictorial:
        'Grid with $x^2$ and $-6$ in opposite corners, and the two middle cells adding to $-x$ ' +
        'this time instead of $+x$.',
      abstract:
        'Opposite signs again because the product is negative; the sum is now $-1$, so the ' +
        '*negative* number is the larger one.',
    },
    hints: [
      'The pair is still $2$ and $3$ — only the signs are in question.',
      'The sum is $-1$, so the bigger of the two numbers is the negative one.',
    ],
    solution:
      '$-3$ and $+2$ multiply to $-6$ and add to $-1$.\n\n' +
      '$$x^2 - x - 6 = (x - 3)(x + 2)$$\n\n' +
      '**The rule these five items give you.** For $x^2 + bx + c$ with the pair $p$, $q$:\n\n' +
      '- $c$ positive: $p$ and $q$ share a sign, and it is the sign of $b$.\n' +
      '- $c$ negative: $p$ and $q$ have opposite signs, and the *larger* one takes the sign of $b$.\n\n' +
      'Read back over $x^2+5x+6$, $x^2-5x+6$, $x^2+x-6$ and $x^2-x-6$ and check the rule against ' +
      'all four. The size of the numbers came from $c$; only their signs came from $b$.',
    misconceptionCodes: ['quadratic.sign-pair-confusion'],
  },

  // §4.1 — tier 1b: non-monic, family quadratic-factorisation.non-monic-a
  {
    id: 'quadratic-factorisation.non-monic-a-1',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.non-monic-a', position: 1 },
    statement: 'Factorise $2x^2 + 7x + 3$.',
    answer: { type: 'expression', value: '(2x+1)(x+3)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'You need *two* $x^2$ tiles now. Lay them side by side and try to build the rectangle — ' +
        'what does that force one side of it to start with?',
      pictorial:
        'Set up the cross frame. The left column must multiply to $2$, the right column to $3$. ' +
        'Test the candidate shown and say why it fails.',
      abstract:
        'Find $p, q, r, s$ with $pr = 2$, $qs = 3$ and $ps + qr = 7$. The only split of $2$ is ' +
        '$2 \\times 1$, so only the order of the $3$ and the $1$ is in question.',
    },
    hints: [
      'The leading coefficient is $2$, so the brackets cannot both start with a plain $x$. One ' +
        'starts with $2x$.',
      'Left column: $2$ and $1$. Right column: $3$ and $1$ — but in which order?',
      'Try $2x$ with $1$, and $x$ with $3$: the cross-products are $2 \\times 3 = 6$ and ' +
        '$1 \\times 1 = 1$, which add to $7$.',
    ],
    solution:
      'The $2$ splits only as $2 \\times 1$, and the $3$ only as $3 \\times 1$. Pairing $2x$ with ' +
      '$+1$ and $x$ with $+3$ gives cross-products $6$ and $1$, and $6 + 1 = 7$. ✓\n\n' +
      '$$2x^2 + 7x + 3 = (2x + 1)(x + 3)$$\n\n' +
      'The other order, $(2x + 3)(x + 1)$, gives $2 + 3 = 5$ in the middle — not $7$. The order ' +
      'matters as soon as $a \\neq 1$.',
    misconceptionCodes: ['quadratic.monic-method-on-non-monic'],
    figure: {
      kind: 'cross_frame',
      title: '2x² + 7x + 3',
      a: 2,
      b: 7,
      c: 3,
      attempt: { topLeft: 2, topRight: 3, bottomLeft: 1, bottomRight: 1 },
      caption: 'One candidate split. Work out its cross-products — does this one survive?',
    },
  },
  {
    id: 'quadratic-factorisation.non-monic-a-2',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.non-monic-a', position: 2 },
    expect:
      'Only the constant changed sign: $+3$ became $-3$. The right column still multiplies to ' +
      '$3$ in size. Which of the two entries turns negative, and what does that do to the $7x$?',
    statement: 'Factorise $2x^2 + 5x - 3$.',
    answer: { type: 'expression', value: '(2x-1)(x+3)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Two $x^2$ tiles, five $x$ tiles and three negative units. The negative units force one ' +
        'edge of the rectangle to carry a minus. Which edge?',
      pictorial:
        'Cross frame with $a = 2$, $c = -3$. The right column must multiply to $-3$, so one entry ' +
        'is negative — try it both ways round and compare the cross-products.',
      abstract:
        '$pr = 2$, $qs = -3$, $ps + qr = 5$. The negative in the right column shrinks the middle ' +
        'term instead of growing it.',
    },
    hints: [
      'The right column must multiply to $-3$, so it is $+3$ and $-1$ in some order.',
      'Keeping the same left column as before, try $2x$ with $-1$ and $x$ with $+3$.',
      'Cross-products: $2 \\times 3 = 6$ and $(-1) \\times 1 = -1$. $6 - 1 = 5$. ✓',
    ],
    solution:
      'Left column $2$ and $1$ as before; right column $-1$ and $+3$.\n\n' +
      'Cross-products $2 \\times 3 = 6$ and $-1 \\times 1 = -1$, so the middle term is $5x$. ✓\n\n' +
      '$$2x^2 + 5x - 3 = (2x - 1)(x + 3)$$\n\n' +
      'Compared with $(2x + 1)(x + 3) = 2x^2 + 7x + 3$: flipping one sign moved the middle term ' +
      'from $7x$ to $5x$, not just the constant.',
    misconceptionCodes: ['quadratic.monic-method-on-non-monic', 'quadratic.sign-pair-confusion'],
  },
  {
    id: 'quadratic-factorisation.non-monic-a-3',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.non-monic-a', position: 3 },
    expect:
      'The middle term flipped: $+5x$ became $-5x$, and the $-3$ stayed. Predict the two ' +
      'brackets. Is it enough to swap the signs of the last one?',
    statement: 'Factorise $2x^2 - 5x - 3$.',
    answer: { type: 'expression', value: '(2x+1)(x-3)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Two $x^2$ tiles, three negative units, and five negative $x$ tiles. Zero pairs will be ' +
        'needed again — how many positive $x$ tiles have to come in with them?',
      pictorial:
        'Cross frame with $a = 2$, $b = -5$, $c = -3$. Same numbers as last time, but the ' +
        'negative has moved to the other entry of the right column.',
      abstract:
        '$qs = -3$ still, but now $ps + qr = -5$. Putting the $-3$ with the $x$ rather than with ' +
        'the $2x$ makes the large cross-product the negative one.',
    },
    hints: [
      'The right column is still $+3$ and $-1$ in some order — but the other way round from last ' +
        'time.',
      'Try $2x$ with $+1$ and $x$ with $-3$. What are the cross-products now?',
      '$2 \\times (-3) = -6$ and $1 \\times 1 = 1$, and $-6 + 1 = -5$. ✓',
    ],
    solution:
      '$$2x^2 - 5x - 3 = (2x + 1)(x - 3)$$\n\n' +
      'Cross-products $2 \\times (-3) = -6$ and $1 \\times 1 = 1$, giving $-5x$. ✓\n\n' +
      'Notice what did **not** work: simply negating both signs of $(2x - 1)(x + 3)$ gives ' +
      '$(2x + 1)(x - 3)$ only by accident here. With $a \\neq 1$ the two brackets are not ' +
      'interchangeable, so each candidate has to be checked, not assumed.',
    misconceptionCodes: ['quadratic.sign-pair-confusion', 'quadratic.monic-method-on-non-monic'],
  },
  {
    id: 'quadratic-factorisation.non-monic-a-4',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.non-monic-a', position: 4 },
    expect:
      'The leading coefficient is now $3$, not $2$, and the constant is $+2$. Before you search: ' +
      'how many ways can the left column multiply to $3$, and how many for the right to give $2$?',
    statement: 'Factorise $3x^2 - 7x + 2$.',
    answer: { type: 'expression', value: '(3x-1)(x-2)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Three $x^2$ tiles this time. Lay them out — a rectangle three $x^2$ tiles wide means one ' +
        'side must be about three times the other. Which side starts with $3x$?',
      pictorial:
        'Cross frame with $a = 3$, $b = -7$, $c = 2$. Left column $3$ and $1$; right column $-1$ ' +
        'and $-2$. Try each order and keep the one whose cross-products give $-7$.',
      abstract:
        '$pr = 3$, $qs = 2$, $ps + qr = -7$. Both constants are negative because the product is ' +
        'positive and the sum negative.',
    },
    hints: [
      'The only split of $3$ is $3 \\times 1$, and of $2$ is $2 \\times 1$. So there are just two ' +
        'orders to test.',
      'The constant is $+2$ with a negative middle term, so both entries in the right column are ' +
        'negative: $-1$ and $-2$.',
      'Try $3x$ with $-1$ and $x$ with $-2$: cross-products $3 \\times (-2) = -6$ and ' +
        '$(-1) \\times 1 = -1$, total $-7$. ✓',
    ],
    solution:
      'Left column $3, 1$; right column $-1, -2$.\n\n' +
      'Cross-products: $3 \\times (-2) = -6$ and $-1 \\times 1 = -1$, so the middle term is ' +
      '$-7x$. ✓\n\n' +
      '$$3x^2 - 7x + 2 = (3x - 1)(x - 2)$$\n\n' +
      'The other order, $(3x - 2)(x - 1)$, gives $-3 - 2 = -5$ in the middle. This is the whole ' +
      'point of the frame: with $a \\neq 1$ you generate candidates and rule them out, rather ' +
      'than reading a pair straight off the constant.',
    misconceptionCodes: ['quadratic.monic-method-on-non-monic', 'quadratic.sign-pair-confusion'],
    figure: {
      kind: 'cross_frame',
      title: '3x² − 7x + 2',
      a: 3,
      b: -7,
      c: 2,
      caption: 'Left column multiplies to 3, right column to 2. Fill it in.',
    },
  },

  // §4.1 — tier 2
  {
    id: 'quadratic.factorise-non-monic',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 2,
    statement: 'Factorize $3x^2 + 10x + 8$.',
    answer: { type: 'expression', value: '(3x+4)(x+2)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'You need three $x^2$ tiles this time, not one. Try to lay them into a rectangle — what ' +
        'does that force about the two sides?',
      pictorial:
        'Use the cross frame. The left column has to multiply to 3 and the right to 8. Try a ' +
        'candidate and check whether the crossing products add to 10.',
      abstract:
        'Find $p, q, r, s$ with $pr = 3$, $qs = 8$ and $ps + qr = 10$. The $8$ splits three ways, ' +
        'so there are more candidates to rule out than usual.',
    },
    hints: [
      'The leading coefficient is not 1, so the two brackets cannot both start with a plain $x$. ' +
        'What are the options for splitting the 3?',
      'Left column: $3$ and $1$, since $3 \\times 1 = 3$. Now what pairs multiply to 8?',
      'Try $4$ and $2$ on the right. Check the crossing products: $3 \\times 2$ and $4 \\times 1$. ' +
        'Do they add to 10?',
    ],
    solution:
      'The leading coefficient 3 splits as $3 \\times 1$, and 8 as $4 \\times 2$.\n\n' +
      'Cross-products: $3 \\times 2 = 6$ and $4 \\times 1 = 4$, and $6 + 4 = 10$. ✓\n\n' +
      '$$3x^2 + 10x + 8 = (3x + 4)(x + 2)$$\n\n' +
      'Ruled out along the way: $(3x + 8)(x + 1)$ gives $11x$, and $(3x + 2)(x + 4)$ gives $14x$.',
    misconceptionCodes: ['quadratic.monic-method-on-non-monic'],
    figure: {
      kind: 'cross_frame',
      title: '3x² + 10x + 8',
      a: 3,
      b: 10,
      c: 8,
      caption: 'Three candidate splits of 8 to test. Which one lands on 10?',
    },
  },
  {
    id: 'quadratic-factorisation.common-factor-first',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 2,
    statement: 'Factorise $2x^2 + 10x + 12$ completely.',
    answer: { type: 'expression', value: '2(x+2)(x+3)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'Two $x^2$ tiles, ten $x$ tiles and twelve units. Before building anything — can you ' +
        'split the whole pile into two identical smaller piles?',
      pictorial:
        'Draw the rectangle for one of the two identical piles: one $x^2$, five $x$, six units. ' +
        'What are its sides, and what do you do with the other pile?',
      abstract:
        'Every coefficient is even, so take out the $2$ first. What is left is a monic trinomial, ' +
        'which the pair method handles.',
    },
    hints: [
      'Look at $2$, $10$ and $12$. What is the highest number that divides all three?',
      'Take the $2$ out: $2(x^2 + 5x + 6)$. Is the bracket finished?',
      '$x^2 + 5x + 6 = (x + 2)(x + 3)$ — you factorised exactly this at the start of the unit.',
    ],
    solution:
      'Take out the common factor first:\n\n$$2x^2 + 10x + 12 = 2(x^2 + 5x + 6)$$\n\n' +
      'The bracket is monic, so look for two numbers multiplying to $6$ and adding to $5$:\n\n' +
      '$$2(x + 2)(x + 3)$$\n\n' +
      'Check: $2(x^2 + 5x + 6) = 2x^2 + 10x + 12$. ✓ Going straight at $2x^2 + 10x + 12$ with the ' +
      'cross frame also works, but taking the $2$ out first turns a non-monic problem into one ' +
      'you have already solved.',
    misconceptionCodes: ['quadratic.monic-method-on-non-monic'],
  },
  {
    id: 'quadratic-factorisation.negative-leading',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 2,
    statement: 'Factorise $-x^2 + 2x + 8$.',
    answer: { type: 'expression', value: '-(x-4)(x+2)', variables: ['x'], form: 'factorised' },
    cpaPrompts: {
      concrete:
        'The $x^2$ tile is negative here, which no rectangle of positive tiles can contain. What ' +
        'do you take out of the whole board to turn it the right way up?',
      pictorial:
        'Rewrite the expression as $-1$ times something, then draw the grid for that something: ' +
        'corners $x^2$ and $-8$.',
      abstract:
        'Factor out $-1$: $-(x^2 - 2x - 8)$. Every sign inside the bracket flips, and then the ' +
        'usual pair method applies.',
    },
    hints: [
      'A negative $x^2$ term is awkward. Take out a factor of $-1$ before anything else.',
      '$-x^2 + 2x + 8 = -(x^2 - 2x - 8)$. Check each sign inside the bracket has flipped.',
      'Now factorise $x^2 - 2x - 8$: a negative constant, so opposite signs, and the sum is $-2$.',
    ],
    solution:
      'Take out $-1$ so the leading term is positive:\n\n$$-x^2 + 2x + 8 = -(x^2 - 2x - 8)$$\n\n' +
      'Then $-4$ and $+2$ multiply to $-8$ and add to $-2$:\n\n$$-(x - 4)(x + 2)$$\n\n' +
      'Check at $x = 0$: the original gives $8$, and $-(-4)(2) = 8$. ✓ Writing it as ' +
      '$(4 - x)(x + 2)$ is the same answer with the minus absorbed into the first bracket.',
    misconceptionCodes: ['quadratic.sign-pair-confusion'],
  },
  {
    id: 'quadratic-factorisation.two-variables',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 2,
    statement: 'Factorise $x^2 + 5xy + 6y^2$.',
    answer: {
      type: 'expression',
      value: '(x+2y)(x+3y)',
      variables: ['x', 'y'],
      form: 'factorised',
    },
    cpaPrompts: {
      concrete:
        'Imagine tiles whose two side lengths are $x$ and $y$ rather than $x$ and $1$. The unit ' +
        'square has become a $y$-by-$y$ square. Does the rectangle still close the same way?',
      pictorial:
        'Grid with corners $x^2$ and $6y^2$. The middle cells must add to $5xy$, so each of them ' +
        'carries one $x$ and one $y$.',
      abstract:
        'Treat $y$ as if it were the number $1$: the pair still multiplies to $6$ and adds to ' +
        '$5$, and each bracket ends in $\\square y$ instead of $\\square$.',
    },
    hints: [
      'Cover up every $y$. What is left is $x^2 + 5x + 6$ — a trinomial you can already do.',
      'The pair is $2$ and $3$. Now put the $y$ back on each of them.',
      'The brackets are $(x + 2y)$ and $(x + 3y)$.',
    ],
    solution:
      'Because every term is degree $2$ in $x$ and $y$ together, the $y$ rides along:\n\n' +
      '$$x^2 + 5xy + 6y^2 = (x + 2y)(x + 3y)$$\n\n' +
      'Check by expanding: $x^2 + 3xy + 2xy + 6y^2 = x^2 + 5xy + 6y^2$. ✓ Also check at ' +
      '$x = 1, y = 1$: $1 + 5 + 6 = 12$ and $3 \\times 4 = 12$. ✓',
    misconceptionCodes: ['quadratic.sign-pair-confusion'],
  },
  {
    id: 'quadratic-factorisation.find-other-factor',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 2,
    statement: 'One factor of $x^2 + 2x - 24$ is $(x + 6)$. Find the other factor.',
    answer: { type: 'expression', value: 'x-4', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'A rectangle of area $x^2 + 2x - 24$ has one side measuring $x + 6$. What must you know ' +
        'about the other side before you even calculate it?',
      pictorial:
        'Grid with $x$ and $+6$ across the top and the two rows blank. The cells have to total ' +
        '$x^2 + 2x - 24$ — what headers go down the side?',
      abstract:
        'The two numbers in the brackets multiply to $-24$ and add to $+2$. One of them is $+6$, ' +
        'so the other is forced twice over.',
    },
    hints: [
      'The two constants inside the brackets have to multiply to $-24$. One of them is $6$.',
      '$6 \\times \\square = -24$, so the other is $-4$. Check the sum: $6 + (-4) = 2$. ✓',
    ],
    solution:
      'The constants multiply to $-24$, and one of them is $+6$, so the other is $-4$.\n\n' +
      '$$x^2 + 2x - 24 = (x + 6)(x - 4)$$\n\n' +
      'The other factor is $x - 4$. Check the middle term as well as the constant: ' +
      '$6x - 4x = 2x$. ✓ Both conditions have to hold, which is why checking only the product is ' +
      'not enough.',
    misconceptionCodes: ['quadratic.sign-pair-confusion'],
  },

  // §4.1 — tier 3
  {
    id: 'quadratic-factorisation.banner-length',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 3,
    statement:
      'A rectangular banner covers $x^2 + 11x + 24$ square metres of wall. Its height is ' +
      '$(x + 3)$ m. Write its width in terms of $x$.',
    answer: { type: 'expression', value: 'x+8', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Cut a paper rectangle and mark one edge $x + 3$. You know the area. What does that let ' +
        'you say about the edge you have not marked?',
      pictorial:
        'Draw the grid with $x$ and $+3$ down the side and the two columns blank. The four cells ' +
        'must total $x^2 + 11x + 24$.',
      abstract:
        'Area $=$ height $\\times$ width, so the width is whatever multiplies $(x + 3)$ to give ' +
        'the area. Write the area as a product of two brackets and read off the other one.',
    },
    hints: [
      'Area is one side times the other. You have the area and one side.',
      'Write $x^2 + 11x + 24$ as two brackets multiplied together. One of them should turn out ' +
        'to be $(x + 3)$.',
      'The pair of numbers multiplies to $24$ and adds to $11$. One of them is $3$.',
    ],
    solution:
      'The two numbers multiply to $24$ and add to $11$: they are $3$ and $8$.\n\n' +
      '$$x^2 + 11x + 24 = (x + 3)(x + 8)$$\n\n' +
      'The height is $(x + 3)$ m, so the width is $(x + 8)$ m.\n\n' +
      'Check with a number: at $x = 2$ the area is $4 + 22 + 24 = 50$, and $5 \\times 10 = 50$. ✓',
    misconceptionCodes: ['quadratic.sign-pair-confusion'],
    figure: {
      kind: 'area_grid',
      title: 'The banner',
      columns: ['', ''],
      rows: ['x', '+3'],
      cells: ['', '', '', ''],
      caption: 'One side is known. The four cells have to total x² + 11x + 24.',
    },
  },
  {
    id: 'quadratic-factorisation.choir-rows',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 3,
    statement:
      'A choir of $x^2 + 7x + 12$ singers stands in a rectangular block. There is exactly one ' +
      'more singer in each row than there are rows. How many rows are there, in terms of $x$?',
    answer: { type: 'expression', value: 'x+3', variables: ['x'], form: 'expanded' },
    cpaPrompts: {
      concrete:
        'Arrange counters in a block that is one wider than it is deep — try $3 \\times 4$, then ' +
        '$4 \\times 5$. What is always true of the two totals you multiply?',
      pictorial:
        'Draw the block as a rectangle whose two sides differ by $1$. Its area is the number of ' +
        'singers, so the two sides are the two brackets.',
      abstract:
        'Rows $\\times$ singers per row $=$ total, and the two differ by $1$. So the total ' +
        'splits into two brackets whose constants differ by $1$; the smaller is the rows.',
    },
    hints: [
      'Call the number of rows $r$. Then each row holds $r + 1$ singers, and the total is ' +
        '$r(r + 1)$.',
      'So $x^2 + 7x + 12$ has to split into two brackets that differ by $1$. Which pair of ' +
        'numbers multiplies to $12$ and adds to $7$?',
      '$3$ and $4$ differ by $1$, so the block is $(x + 3)$ by $(x + 4)$. Which of those is the ' +
        'number of rows?',
    ],
    solution:
      'If there are $r$ rows then each row holds $r + 1$ singers, and $r(r + 1)$ is the total.\n\n' +
      '$$x^2 + 7x + 12 = (x + 3)(x + 4)$$\n\n' +
      'The two brackets differ by $1$, exactly as the block requires, so the smaller one is the ' +
      'number of rows: $x + 3$ rows, each holding $x + 4$ singers.\n\n' +
      'Check at $x = 1$: $1 + 7 + 12 = 20$ singers, in $4$ rows of $5$. ✓',
    misconceptionCodes: ['quadratic.sign-pair-confusion'],
  },

  // §4.1 — diagnostics
  {
    id: 'quadratic-factorisation.dx-monic-method-on-non-monic',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 'diagnostic',
    statement: 'Factorise $2x^2 - 7x + 6$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        {
          label: 'A',
          value: '$(x - 6)(x - 1)$',
          misconceptionCode: 'quadratic.monic-method-on-non-monic',
        },
        { label: 'B', value: '$(2x - 3)(x - 2)$' },
        { label: 'C', value: '$(2x + 3)(x + 2)$', misconceptionCode: 'quadratic.sign-pair-confusion' },
      ],
    },
    cpaPrompts: {
      concrete:
        'The board has *two* $x^2$ tiles on it. Push them into a rectangle and look at the two ' +
        'sides: can they both start with a single $x$?',
      pictorial:
        'Cross frame with $a = 2$, $b = -7$, $c = 6$. The left column must multiply back to $2$. ' +
        'What are the only two numbers that can go there?',
      abstract:
        'Multiply your answer back out and look at the first term only. Does it come to $2x^2$?',
    },
    hints: [
      'Whatever your answer is, expand the first terms of the two brackets. They must multiply to ' +
        '$2x^2$.',
      'So one bracket starts with $2x$ and the other with $x$. Now the right column: two numbers ' +
        'multiplying to $+6$ with a negative middle term.',
    ],
    solution:
      'Left column $2$ and $1$; right column both negative because $c > 0$ and $b < 0$: $-3$ and ' +
      '$-2$. Cross-products $2 \\times (-2) = -4$ and $-3 \\times 1 = -3$, total $-7$. ✓\n\n' +
      '$$2x^2 - 7x + 6 = (2x - 3)(x - 2)$$\n\n' +
      'Option A is what the monic shortcut produces — two numbers multiplying to $6$ and adding ' +
      'to $-7$ — but it expands to $x^2 - 7x + 6$, and the first term is wrong. Option C has the ' +
      'right split of the $2$ but both constants positive, which gives $+7x$ in the middle.',
    misconceptionCodes: [
      'quadratic.monic-method-on-non-monic',
      'quadratic.sign-pair-confusion',
    ],
    figure: {
      kind: 'cross_frame',
      title: '2x² − 7x + 6',
      a: 2,
      b: -7,
      c: 6,
      caption: 'Left column multiplies to a. That is the constraint the monic method ignores.',
    },
  },
  {
    id: 'quadratic-factorisation.dx-sign-pair-confusion',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    tier: 'diagnostic',
    statement: 'Factorise $3x^2 - 13x + 12$.',
    answer: {
      type: 'choice',
      correct: 'C',
      options: [
        { label: 'A', value: '$(3x + 4)(x + 3)$', misconceptionCode: 'quadratic.sign-pair-confusion' },
        {
          label: 'B',
          value: '$(x - 1)(x - 12)$',
          misconceptionCode: 'quadratic.monic-method-on-non-monic',
        },
        { label: 'C', value: '$(3x - 4)(x - 3)$' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Lay out three $x^2$ tiles and twelve units, then ask what sign the thirteen $x$ tiles ' +
        'must carry. Can positive edges produce negative $x$ tiles?',
      pictorial:
        'Cross frame with $a = 3$, $b = -13$, $c = 12$. Before choosing numbers, decide the two ' +
        'signs in the right column.',
      abstract:
        'The constants multiply to $+12$ and their cross-products total $-13$. What signs does ' +
        'that force?',
    },
    hints: [
      'Start with the signs, not the numbers. The constant is positive, so the two constants in ' +
        'the brackets share a sign.',
      'Their contribution to the middle term is negative, so that shared sign is negative. Now ' +
        'find the sizes: $3, 1$ on the left and $4, 3$ on the right.',
    ],
    solution:
      'Positive constant, negative middle term: both bracket constants are negative.\n\n' +
      'Left column $3, 1$; right column $-4, -3$. Cross-products $3 \\times (-3) = -9$ and ' +
      '$-4 \\times 1 = -4$, total $-13$. ✓\n\n' +
      '$$3x^2 - 13x + 12 = (3x - 4)(x - 3)$$\n\n' +
      'Option A keeps both constants positive and expands to $3x^2 + 13x + 12$ — the middle term ' +
      'has the wrong sign. Option B has the signs right but ignores the $3$ in front of $x^2$.',
    misconceptionCodes: [
      'quadratic.sign-pair-confusion',
      'quadratic.monic-method-on-non-monic',
    ],
  },

  // -------------------------------------------------------------------------
  // §4.2 solve-quadratic-equations — tier 1, family quadratic-factorisation.solve-a
  // -------------------------------------------------------------------------
  {
    id: 'quadratic-factorisation.solve-a-1',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.solve-a', position: 1 },
    statement: 'Solve the equation $(x - 3)(x - 4) = 0$.',
    answer: { type: 'set', values: [3, 4], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two cards lie face down and you are told their product is zero. What can you say for ' +
        'certain about at least one of them, without turning either over?',
      pictorial:
        'A parabola that crosses the $x$-axis twice. Solving means finding where the curve meets ' +
        '$y = 0$ — which is why the equation has to say $= 0$.',
      abstract:
        'If $A \\times B = 0$ then $A = 0$ or $B = 0$. Here $A$ is $(x - 3)$ and $B$ is $(x - 4)$.',
    },
    hints: [
      'Two numbers multiply to zero. Does one of them have to be zero, or could both be non-zero?',
      'Set each bracket equal to zero in turn: $x - 3 = 0$ and $x - 4 = 0$.',
    ],
    solution:
      'The product of the two brackets is zero, so at least one bracket is zero:\n\n' +
      '$$x - 3 = 0 \\quad \\text{or} \\quad x - 4 = 0$$\n\n' +
      '$$x = 3 \\quad \\text{or} \\quad x = 4$$\n\n' +
      'Check $x = 3$: $(0)(-1) = 0$. ✓ Check $x = 4$: $(1)(0) = 0$. ✓ Notice the roots are $+3$ ' +
      'and $+4$ even though the brackets show $-3$ and $-4$.',
    misconceptionCodes: ['quadratic.stops-at-factorising'],
    figure: {
      kind: 'coordinate_plane',
      title: 'y = (x − 3)(x − 4)',
      xMin: -1,
      xMax: 7,
      yMin: -3,
      yMax: 8,
      gridStep: 1,
      curves: [{ type: 'quadratic', a: 1, b: -7, c: 12, label: 'y = x² − 7x + 12' }],
      caption: 'The solutions are where the curve crosses the x-axis, that is, where y = 0.',
    },
  },
  {
    id: 'quadratic.solve-monic',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.solve-a', position: 2 },
    expect:
      'The brackets have gone: this is the same equation multiplied out. Before you do anything ' +
      '— do you expect the same two answers, and what must you do first to get at them?',
    statement: 'Solve the equation $x^2 - 7x + 12 = 0$.',
    answer: { type: 'set', values: [3, 4], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two numbers, multiplied together, give zero. What does that force to be true about at ' +
        'least one of them?',
      pictorial:
        'Set up the cross frame. The left column has to multiply to 1, so both entries are $x$. ' +
        'What pair goes on the right?',
      abstract:
        'Find two integers multiplying to $+12$ and adding to $-7$, factorise, then set each ' +
        'bracket to zero.',
    },
    hints: [
      'What two numbers multiply to $+12$ and add to $-7$?',
      'The product is positive and the sum is negative — what does that tell you about the signs ' +
        'of both numbers?',
      'The pair is $-3$ and $-4$, so it factorises as $(x-3)(x-4) = 0$. Now set each bracket to ' +
        'zero.',
    ],
    solution:
      'Two numbers multiplying to $+12$ and adding to $-7$: since the product is positive and the ' +
      'sum negative, both are negative. $-3$ and $-4$ work.\n\n' +
      '$$(x - 3)(x - 4) = 0$$\n\n' +
      'By the Zero Product Property, $x - 3 = 0$ or $x - 4 = 0$:\n\n' +
      '$$x = 3 \\quad \\text{or} \\quad x = 4$$\n\n' +
      'Same equation as the last item, same answers — the only new work was the factorising.',
    misconceptionCodes: ['quadratic.stops-at-factorising', 'quadratic.sign-pair-confusion'],
  },
  {
    id: 'quadratic-factorisation.solve-a-3',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.solve-a', position: 3 },
    expect:
      'The $+12$ has moved to the other side: the equation now reads $x^2 - 7x = -12$. Are the ' +
      'answers still $3$ and $4$? And can you factorise before you move it back?',
    statement: 'Solve the equation $x^2 - 7x = -12$.',
    answer: { type: 'set', values: [3, 4], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The two face-down cards now multiply to $-12$, not to zero. Name two numbers whose ' +
        'product is $-12$ — does knowing the product pin either card down?',
      pictorial:
        'The curve $y = x^2 - 7x$ meets the horizontal line $y = -12$. Sliding everything down by ' +
        '$12$ turns that line into the $x$-axis without moving the crossing points sideways.',
      abstract:
        'Add $12$ to both sides to get $x^2 - 7x + 12 = 0$. Only then does factorising help, ' +
        'because only zero forces a factor.',
    },
    hints: [
      'The Zero Product Property needs a zero. What is on the right-hand side at the moment?',
      'Add $12$ to both sides: $x^2 - 7x + 12 = 0$.',
      'That is the equation you solved a moment ago.',
    ],
    solution:
      'Bring everything to one side first:\n\n$$x^2 - 7x + 12 = 0$$\n\n' +
      '$$(x - 3)(x - 4) = 0 \\implies x = 3 \\quad \\text{or} \\quad x = 4$$\n\n' +
      'Check $x = 3$ in the original: $9 - 21 = -12$. ✓ Factorising the left side as ' +
      '$x(x - 7) = -12$ leads nowhere, because $-12$ is a product two non-zero numbers can make ' +
      'in many ways.',
    misconceptionCodes: ['quadratic.zero-product-on-nonzero'],
  },
  {
    id: 'quadratic-factorisation.solve-a-4',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.solve-a', position: 4 },
    expect:
      'Back to $= 0$, but there is now a $2$ in front of $x^2$. Which step of your method has to ' +
      'change, and do you still expect both answers to be whole numbers?',
    statement: 'Solve the equation $2x^2 - 7x + 3 = 0$.',
    answer: { type: 'set', values: [0.5, 3], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two $x^2$ tiles have to go into the rectangle, so one side starts with $2x$. When you ' +
        'set that side to zero, is the answer a whole number?',
      pictorial:
        'Cross frame with $a = 2$, $b = -7$, $c = 3$. Once the frame is filled, each row of it is ' +
        'one bracket, and each bracket becomes one small equation.',
      abstract:
        'Factorise to $(2x - 1)(x - 3) = 0$, then solve $2x - 1 = 0$ as well as $x - 3 = 0$. The ' +
        'first takes two steps, not one.',
    },
    hints: [
      'The leading coefficient is $2$, so one bracket starts with $2x$. Use the cross frame.',
      'You should reach $(2x - 1)(x - 3) = 0$. Now set each bracket to zero.',
      '$2x - 1 = 0$ gives $2x = 1$, so $x = \\tfrac{1}{2}$.',
    ],
    solution:
      'Left column $2, 1$; right column $-1, -3$, giving cross-products $-6$ and $-1$.\n\n' +
      '$$(2x - 1)(x - 3) = 0$$\n\n' +
      '$$2x - 1 = 0 \\implies x = \\tfrac{1}{2}, \\qquad x - 3 = 0 \\implies x = 3$$\n\n' +
      'Check $x = \\tfrac{1}{2}$: $2(\\tfrac14) - \\tfrac72 + 3 = \\tfrac12 - \\tfrac72 + 3 = 0$. ✓ ' +
      'A bracket starting with $2x$ gives a root that is not a whole number.',
    misconceptionCodes: ['quadratic.stops-at-factorising', 'quadratic.monic-method-on-non-monic'],
  },
  {
    id: 'quadratic-factorisation.solve-a-5',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.solve-a', position: 5 },
    expect:
      'The constant has gone: $2x^2 - 7x = 0$. With no number to make a pair from, what is the ' +
      'common factor of the two terms — and how many roots do you expect?',
    statement: 'Solve the equation $2x^2 - 7x = 0$.',
    answer: { type: 'set', values: [0, 3.5], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two $x^2$ tiles and seven negative $x$ tiles, and no units at all. Every tile has an ' +
        '$x$ along one edge — so what is the length of one side of the rectangle?',
      pictorial:
        'The curve $y = 2x^2 - 7x$ passes straight through the origin. One of the two crossing ' +
        'points is therefore at $x = 0$ — can you see it on the sketch?',
      abstract:
        'Take out the common factor $x$: $x(2x - 7) = 0$. The factor $x$ is itself a bracket, so ' +
        'it too gives a root.',
    },
    hints: [
      'There is no constant term, so both terms share a factor. What is it?',
      '$x(2x - 7) = 0$. Now set *each* factor to zero — including the bare $x$.',
      '$x = 0$ is a genuine solution. The other comes from $2x - 7 = 0$.',
    ],
    solution:
      'Take out the common factor rather than hunting for a pair:\n\n$$x(2x - 7) = 0$$\n\n' +
      '$$x = 0 \\quad \\text{or} \\quad 2x - 7 = 0 \\implies x = 3.5$$\n\n' +
      'Check $x = 0$: $0 - 0 = 0$. ✓ Check $x = 3.5$: $2(12.25) - 24.5 = 0$. ✓\n\n' +
      'A quadratic with no constant term always has $x = 0$ as one of its roots, because the ' +
      'curve passes through the origin.',
    misconceptionCodes: ['quadratic.stops-at-factorising'],
  },
  {
    id: 'quadratic-factorisation.solve-a-6',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.solve-a', position: 6 },
    expect:
      'Two things moved: the leading coefficient is back to $1$, and the $7x$ has crossed to the ' +
      'right, giving $x^2 = 7x$. It is very tempting to divide both sides by $x$. If you did, ' +
      'how many answers would you be left with — and how many should there be?',
    statement: 'Solve the equation $x^2 = 7x$.',
    answer: { type: 'set', values: [0, 7], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Suppose $x$ really were zero. Dividing both sides by $x$ would mean dividing by nothing ' +
        '— what happens to the answer you would have found?',
      pictorial:
        'Sketch $y = x^2$ and $y = 7x$ on the same axes. They cross twice. Where is the second ' +
        'crossing point, the one that is easy to miss?',
      abstract:
        'Bring everything to one side: $x^2 - 7x = 0$, so $x(x - 7) = 0$. Never divide an ' +
        'equation by the unknown; move it instead.',
    },
    hints: [
      'Resist dividing by $x$. Subtract $7x$ from both sides instead.',
      '$x^2 - 7x = 0$, so $x(x - 7) = 0$.',
      'Two factors, two roots: $x = 0$ and $x = 7$.',
    ],
    solution:
      'Move everything to one side rather than dividing:\n\n$$x^2 - 7x = 0 \\implies x(x - 7) = 0$$\n\n' +
      '$$x = 0 \\quad \\text{or} \\quad x = 7$$\n\n' +
      '**The payoff.** Dividing both sides by $x$ gives $x = 7$ and looks tidy, but it silently ' +
      'throws away the root $x = 0$ — and $x = 0$ does satisfy the original equation, since ' +
      '$0^2 = 7 \\times 0$. Dividing by the unknown is only legal when the unknown is known not ' +
      'to be zero, and here it can be. Factor out instead of dividing out, every time.',
    misconceptionCodes: ['quadratic.stops-at-factorising', 'quadratic.zero-product-on-nonzero'],
    figure: {
      kind: 'coordinate_plane',
      title: 'y = x² and y = 7x',
      xMin: -2,
      xMax: 9,
      yMin: -10,
      yMax: 60,
      gridStep: 1,
      curves: [
        { type: 'quadratic', a: 1, b: 0, c: 0, label: 'y = x²' },
        { type: 'linear', m: 7, c: 0, label: 'y = 7x' },
      ],
      caption: 'Two crossing points. The one at the origin is the one division destroys.',
    },
  },

  // §4.2 — tier 2
  {
    id: 'quadratic-factorisation.solve-after-expanding',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 2,
    statement: 'Solve the equation $(x - 1)(x - 2) = 6$.',
    answer: { type: 'set', values: [4, -1], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two face-down cards multiply to $6$. Name three different pairs that would do it. Does ' +
        'knowing the product tell you either card?',
      pictorial:
        'The curve $y = (x - 1)(x - 2)$ meets the line $y = 6$ twice. Lowering the whole picture ' +
        'by $6$ turns that line into the $x$-axis.',
      abstract:
        'Expand, subtract $6$ from both sides to reach standard form, then factorise the *new* ' +
        'quadratic. The old brackets are of no use once the right side is not zero.',
    },
    hints: [
      'The brackets are already there, but the right-hand side is $6$, not $0$. Does the Zero ' +
        'Product Property apply?',
      'Expand the left side and take the $6$ across: $x^2 - 3x + 2 - 6 = 0$.',
      '$x^2 - 3x - 4 = 0$. Factorise this new quadratic and then set each bracket to zero.',
    ],
    solution:
      'The property needs a zero, so expand and rearrange first:\n\n' +
      '$$x^2 - 3x + 2 = 6 \\implies x^2 - 3x - 4 = 0$$\n\n' +
      '$$(x - 4)(x + 1) = 0 \\implies x = 4 \\quad \\text{or} \\quad x = -1$$\n\n' +
      'Check $x = 4$: $(3)(2) = 6$. ✓ Check $x = -1$: $(-2)(-3) = 6$. ✓\n\n' +
      'Writing $x - 1 = 6$ and $x - 2 = 6$ would give $7$ and $8$, and neither works: ' +
      '$(6)(5) = 30$, not $6$.',
    misconceptionCodes: ['quadratic.zero-product-on-nonzero'],
  },
  {
    id: 'quadratic-factorisation.solve-repeated-root',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 2,
    statement: 'Solve the equation $x^2 - 6x + 9 = 0$.',
    answer: { type: 'set', values: [3], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'One $x^2$ tile, six negative $x$ tiles, nine units. Build the rectangle — it comes out ' +
        'as a square. What does a square rectangle mean for the two answers?',
      pictorial:
        'The curve $y = x^2 - 6x + 9$ touches the $x$-axis without crossing it. How many ' +
        'crossing points does that give you?',
      abstract:
        'The two brackets turn out identical: $(x - 3)(x - 3) = 0$. Both give the same equation, ' +
        'so there is only one distinct solution.',
    },
    hints: [
      'Two numbers multiplying to $+9$ and adding to $-6$. Is there anything unusual about them?',
      'They are both $-3$, so the factorisation is $(x - 3)^2 = 0$.',
      'Setting each bracket to zero twice gives the same equation both times.',
    ],
    solution:
      '$-3$ and $-3$ multiply to $9$ and add to $-6$, so\n\n$$(x - 3)(x - 3) = 0, \\quad\\text{i.e.}\\quad (x - 3)^2 = 0$$\n\n' +
      'Both brackets give $x - 3 = 0$, so there is exactly one solution, $x = 3$.\n\n' +
      'Check: $9 - 18 + 9 = 0$. ✓ This is called a repeated root: the curve touches the $x$-axis ' +
      'at $x = 3$ instead of cutting through it, so the two crossing points have merged into one.',
    misconceptionCodes: ['quadratic.stops-at-factorising'],
  },
  {
    id: 'quadratic-factorisation.solve-square-equals-25',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 2,
    statement: 'Solve the equation $x^2 = 25$.',
    answer: { type: 'set', values: [5, -5], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Think of $25$ as the area of a square. A side of $5$ works — but the equation is about ' +
        'numbers, not lengths. What other number squares to $25$?',
      pictorial:
        'The curve $y = x^2$ meets the line $y = 25$ at two points, one either side of the ' +
        '$y$-axis. A parabola is symmetrical, so a horizontal line cuts it twice.',
      abstract:
        'Rearrange to $x^2 - 25 = 0$, a difference of two squares: $(x + 5)(x - 5) = 0$. Two ' +
        'brackets, two roots.',
    },
    hints: [
      'Taking the square root of both sides gives $x = 5$ — but is that the only number whose ' +
        'square is $25$?',
      'Move the $25$ across: $x^2 - 25 = 0$. That is a difference of two squares.',
      '$(x + 5)(x - 5) = 0$, so $x = -5$ as well as $x = 5$.',
    ],
    solution:
      'Rearranging turns this into a factorising problem:\n\n' +
      '$$x^2 - 25 = 0 \\implies (x + 5)(x - 5) = 0 \\implies x = 5 \\quad \\text{or} \\quad x = -5$$\n\n' +
      'Check: $5^2 = 25$ ✓ and $(-5)^2 = 25$ ✓.\n\n' +
      'Writing $x = \\sqrt{25} = 5$ and stopping loses half the answer, because squaring destroys ' +
      'the sign. Rearranging to zero and factorising cannot lose a root.',
    misconceptionCodes: ['quadratic.stops-at-factorising'],
  },
  {
    id: 'quadratic-factorisation.solve-fraction-root',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 2,
    statement:
      'Solve the equation $3x^2 + 5x - 2 = 0$. Give any answer that is not a whole number as a ' +
      'fraction.',
    answer: { type: 'set', values: [1 / 3, -2], tolerance: 0.005 },
    cpaPrompts: {
      concrete:
        'Three $x^2$ tiles means one side of the rectangle starts with $3x$. Setting a side of ' +
        'length $3x + 1$ to zero — what sort of number does that give?',
      pictorial:
        'Cross frame with $a = 3$, $b = 5$, $c = -2$. The left column can only be $3$ and $1$; ' +
        'the right column is $+2$ and $-1$ in one of the two orders.',
      abstract:
        'Factorise to $(3x - 1)(x + 2) = 0$, then solve $3x - 1 = 0$ and $x + 2 = 0$ separately.',
    },
    hints: [
      'Left column of the frame: $3$ and $1$. The constant is $-2$, so the right column is $\\pm 1$ ' +
        'and $\\mp 2$.',
      'Try $3x$ with $-1$ and $x$ with $+2$: cross-products $6$ and $-1$, which add to $5$. ✓',
      '$(3x - 1)(x + 2) = 0$. Solving $3x - 1 = 0$ gives $3x = 1$.',
    ],
    solution:
      'Cross-products $3 \\times 2 = 6$ and $-1 \\times 1 = -1$ give $5x$. ✓\n\n' +
      '$$(3x - 1)(x + 2) = 0$$\n\n' +
      '$$3x - 1 = 0 \\implies x = \\tfrac{1}{3}, \\qquad x + 2 = 0 \\implies x = -2$$\n\n' +
      'Check $x = \\tfrac13$: $3(\\tfrac19) + \\tfrac53 - 2 = \\tfrac13 + \\tfrac53 - 2 = 0$. ✓ ' +
      'A bracket of the form $3x - 1$ always produces a root with a denominator.',
    misconceptionCodes: ['quadratic.stops-at-factorising', 'quadratic.monic-method-on-non-monic'],
  },

  // §4.2 — tier 3
  {
    id: 'quadratic-factorisation.ball-in-the-air',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 3,
    statement:
      'A ball is kicked straight up from the ground. Its height above the ground $t$ seconds ' +
      'later is $20t - 5t^2$ metres. How many seconds is it in the air before it lands?',
    answer: { type: 'number', value: 4, unit: 's', tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Throw something up and watch it. At the moment it leaves your hand and at the moment it ' +
        'lands, what is the same about its height?',
      pictorial:
        'Sketch the height against time. The curve starts on the axis, rises, and comes back down ' +
        'to it. Landing is the second point where the height is zero.',
      abstract:
        'Set the height expression equal to $0$ and solve. Two times come out; decide which one ' +
        'is the kick and which is the landing.',
    },
    hints: [
      'What is the ball\'s height at the exact moment it lands? Write that as an equation.',
      '$20t - 5t^2 = 0$. Both terms share a factor — take it out rather than dividing by it.',
      '$5t(4 - t) = 0$, so $t = 0$ or $t = 4$. Which of those is the landing?',
    ],
    solution:
      'The ball is on the ground when its height is $0$:\n\n' +
      '$$20t - 5t^2 = 0 \\implies 5t(4 - t) = 0 \\implies t = 0 \\quad \\text{or} \\quad t = 4$$\n\n' +
      '$t = 0$ is the moment of the kick — the ball was on the ground then too, so it is a real ' +
      'solution of the equation but not the answer to the question. The landing is at $t = 4$, so ' +
      'the ball is in the air for $4$ seconds.\n\n' +
      'Check at $t = 4$: $80 - 80 = 0$. ✓ At $t = 2$ the height is $40 - 20 = 20$ m, safely above ' +
      'the ground in between.',
    misconceptionCodes: ['quadratic.stops-at-factorising', 'quadratic.keeps-impossible-root'],
  },
  {
    id: 'quadratic-factorisation.firework-height',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 3,
    statement:
      'A firework is fired straight up from the ground. Its height above the ground $t$ seconds ' +
      'later is $30t - 5t^2$ metres. At what times is it exactly $40$ m above the ground?',
    answer: { type: 'set', values: [2, 4], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Hold a hand at a fixed height and toss a ball past it. How many times does the ball pass ' +
        'your hand on one throw — and why is that number not one?',
      pictorial:
        'Sketch the height curve and draw the horizontal line at $40$ m across it. Count the ' +
        'crossing points: that count is the number of answers you should expect.',
      abstract:
        'Set the height expression equal to $40$, bring everything to one side, and solve the ' +
        'resulting quadratic. Both roots are answers here.',
    },
    hints: [
      'Write down the equation the question describes: the height expression equals $40$.',
      '$30t - 5t^2 = 40$. Bring everything to one side and divide through by $5$ to make the ' +
        'numbers manageable.',
      '$t^2 - 6t + 8 = 0$. Two numbers multiplying to $8$ and adding to $-6$.',
    ],
    solution:
      'Set the height to $40$:\n\n$$30t - 5t^2 = 40$$\n\n' +
      '$$5t^2 - 30t + 40 = 0 \\implies t^2 - 6t + 8 = 0 \\implies (t - 2)(t - 4) = 0$$\n\n' +
      '$$t = 2 \\quad \\text{or} \\quad t = 4$$\n\n' +
      'Both are genuine: the firework passes $40$ m on the way up at $2$ s and again on the way ' +
      'down at $4$ s. Check at $t = 2$: $60 - 20 = 40$. ✓ At $t = 4$: $120 - 80 = 40$. ✓\n\n' +
      'Not every quadratic model has a root to throw away — the situation decides, not a rule.',
    misconceptionCodes: ['quadratic.zero-product-on-nonzero'],
  },

  // §4.2 — diagnostics
  {
    id: 'quadratic-factorisation.dx-stops-at-factorising',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 'diagnostic',
    statement: 'Solve the equation $x^2 - 7x + 12 = 0$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        {
          label: 'A',
          value: '$(x - 3)(x - 4)$',
          misconceptionCode: 'quadratic.stops-at-factorising',
        },
        { label: 'B', value: '$x = 3$ or $x = 4$' },
        {
          label: 'C',
          value: '$x = -3$ or $x = -4$',
          misconceptionCode: 'quadratic.sign-pair-confusion',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Read the instruction again, one word at a time. Does the word "solve" ask you for an ' +
        'expression, or for the values of $x$ that make the statement true?',
      pictorial:
        'On the curve $y = x^2 - 7x + 12$, a factorised expression is a rewriting of the curve; ' +
        'the solutions are two specific points on the $x$-axis. Which did the question ask for?',
      abstract:
        'Factorising is a step. The Zero Product Property is the step that turns brackets into ' +
        'numbers: set each bracket to zero.',
    },
    hints: [
      'Whatever you have, test it: can you substitute it into the equation and get $0 = 0$?',
      'If you have reached $(x - 3)(x - 4) = 0$, you are one step short. What must each bracket ' +
        'equal?',
    ],
    solution:
      '$$x^2 - 7x + 12 = 0 \\implies (x - 3)(x - 4) = 0 \\implies x = 3 \\quad \\text{or} \\quad x = 4$$\n\n' +
      'Check $x = 3$: $9 - 21 + 12 = 0$. ✓\n\n' +
      'Option A is a correct factorisation but not a solution — it is an expression, not a value ' +
      'of $x$. Option C reads the numbers straight out of the brackets without changing their ' +
      'signs, and comes from choosing the pair $+3, +4$ instead of $-3, -4$; check it: ' +
      '$9 + 21 + 12 = 42$, not $0$.',
    misconceptionCodes: ['quadratic.stops-at-factorising', 'quadratic.sign-pair-confusion'],
  },
  {
    id: 'quadratic-factorisation.dx-zero-product-on-nonzero',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    tier: 'diagnostic',
    statement: 'Solve the equation $(x - 1)(x - 2) = 6$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        {
          label: 'A',
          value: '$x = 7$ or $x = 8$',
          misconceptionCode: 'quadratic.zero-product-on-nonzero',
        },
        { label: 'B', value: '$x = 4$ or $x = -1$' },
        {
          label: 'C',
          value: '$x = -4$ or $x = 1$',
          misconceptionCode: 'quadratic.sign-pair-confusion',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Two face-down cards multiply to $6$. Give me two pairs of numbers that would do it, ' +
        'neither of which contains a $6$.',
      pictorial:
        'The curve $y = (x - 1)(x - 2)$ crosses the line $y = 6$ at two points. Those crossings ' +
        'are nowhere near where it crosses the $x$-axis.',
      abstract:
        'Only a product of zero forces a factor to be zero. Expand, subtract $6$, factorise the ' +
        'new quadratic, and only then set brackets to zero.',
    },
    hints: [
      'Test your answer by substituting it back into $(x - 1)(x - 2)$. Do you get $6$?',
      'Expand and bring the $6$ across first: $x^2 - 3x - 4 = 0$. Now the property applies.',
    ],
    solution:
      '$$x^2 - 3x + 2 = 6 \\implies x^2 - 3x - 4 = 0 \\implies (x - 4)(x + 1) = 0$$\n\n' +
      '$$x = 4 \\quad \\text{or} \\quad x = -1$$\n\n' +
      'Option A comes from setting each bracket equal to $6$; testing $x = 7$ gives ' +
      '$(6)(5) = 30$, not $6$. Option C factorises correctly but chooses the pair $+4, -1$ ' +
      'instead of $-4, +1$; testing $x = 1$ gives $(0)(-1) = 0$, not $6$.',
    misconceptionCodes: ['quadratic.zero-product-on-nonzero', 'quadratic.sign-pair-confusion'],
  },

  // -------------------------------------------------------------------------
  // §4.3 model-real-world-scenarios — tier 1, family quadratic-factorisation.garden-a
  //
  // The story is held still and the numbers move, so that what the student notices is the
  // *shape* of the modelling: name the unknown, write the other side in terms of it, form
  // the equation, solve, then throw one root away.
  // -------------------------------------------------------------------------
  {
    id: 'quadratic-factorisation.garden-a-1',
    skillIds: ['quadratic-factorisation.model-real-world-scenarios'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.garden-a', position: 1 },
    statement:
      'A rectangular flower bed is $3$ m longer than it is wide. Its area is $10\\text{ m}^2$. ' +
      'Find its width, in metres.',
    answer: { type: 'number', value: 2, unit: 'm', tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Pace out a rectangle whose long side is three steps more than its short side. Widen it ' +
        'by one step and pace it again — did the area grow by the same amount?',
      pictorial:
        'Draw the rectangle. Label the short side $w$ and work out what to write along the long ' +
        'side. The two labels multiplied together have to give $10$.',
      abstract:
        'Let $w$ be the width in metres. Then $w(w + 3) = 10$; rearrange to $w^2 + 3w - 10 = 0$ ' +
        'and factorise.',
    },
    hints: [
      'Name the unknown with its unit: let $w$ be the width in metres. Now write the length in ' +
        'terms of $w$.',
      'Area is length times width: $w(w + 3) = 10$. Expand and bring everything to one side.',
      '$w^2 + 3w - 10 = 0$. Two numbers multiplying to $-10$ and adding to $3$.',
    ],
    solution:
      'Let $w$ be the width in metres, so the length is $(w + 3)$ m.\n\n' +
      '$$w(w + 3) = 10 \\implies w^2 + 3w - 10 = 0 \\implies (w + 5)(w - 2) = 0$$\n\n' +
      'So $w = -5$ or $w = 2$. A width cannot be negative, so the width is $2$ m.\n\n' +
      'Check: $2 \\times 5 = 10$. ✓',
    misconceptionCodes: ['quadratic.keeps-impossible-root'],
    figure: {
      kind: 'area_grid',
      title: 'The flower bed',
      columns: ['w', '+3'],
      rows: ['w'],
      cells: ['', ''],
      caption: 'The two cells together have to make 10.',
    },
  },
  {
    id: 'quadratic-factorisation.garden-a-2',
    skillIds: ['quadratic-factorisation.model-real-world-scenarios'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.garden-a', position: 2 },
    expect:
      'Only the area changed, from $10\\text{ m}^2$ to $18\\text{ m}^2$. The equation will have ' +
      'the same shape. Which number in $w^2 + 3w - 10 = 0$ moves, and will the width be more or ' +
      'less than $2$ m?',
    statement:
      'A rectangular flower bed is $3$ m longer than it is wide. Its area is $18\\text{ m}^2$. ' +
      'Find its width, in metres.',
    answer: { type: 'number', value: 3, unit: 'm', tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The same shape of bed, but bigger. If the width goes up by one step, the length goes up ' +
        'by one step too — so the area grows by more than one square step. By how much?',
      pictorial:
        'The same two-cell picture, $w$ and $+3$ along the top. Only the total underneath the ' +
        'picture has changed, from $10$ to $18$.',
      abstract:
        'Same set-up, new constant: $w(w + 3) = 18$, so $w^2 + 3w - 18 = 0$.',
    },
    hints: [
      'Set it up exactly as last time. Only the number on the right-hand side is different.',
      '$w^2 + 3w - 18 = 0$. Two numbers multiplying to $-18$ and adding to $3$.',
    ],
    solution:
      '$$w(w + 3) = 18 \\implies w^2 + 3w - 18 = 0 \\implies (w + 6)(w - 3) = 0$$\n\n' +
      '$w = -6$ or $w = 3$; a width cannot be negative, so the width is $3$ m and the length ' +
      '$6$ m.\n\n' +
      'Check: $3 \\times 6 = 18$. ✓ Compare with the last item: the area went from $10$ to $18$ ' +
      'but the width only from $2$ to $3$ — area does not grow in step with width.',
    misconceptionCodes: ['quadratic.keeps-impossible-root'],
  },
  {
    id: 'quadratic-factorisation.garden-a-3',
    skillIds: ['quadratic-factorisation.model-real-world-scenarios'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.garden-a', position: 3 },
    expect:
      'The area is $40\\text{ m}^2$ now. The widths so far were $2$ m for $10\\text{ m}^2$ and ' +
      '$3$ m for $18\\text{ m}^2$. Predict the width before you solve, then check whether the ' +
      'negative root behaves as you expect too.',
    statement:
      'A rectangular flower bed is $3$ m longer than it is wide. Its area is $40\\text{ m}^2$. ' +
      'Find its width, in metres.',
    answer: { type: 'number', value: 5, unit: 'm', tolerance: 0 },
    cpaPrompts: {
      concrete:
        'A bed of $40\\text{ m}^2$ that is three metres longer than it is wide. Guess a width, ' +
        'work out the area it would give, and adjust. Does guessing get slower as the numbers grow?',
      pictorial:
        'The same picture again: $w$ and $+3$ across the top, one row of height $w$. Only the ' +
        'total has moved to $40$.',
      abstract:
        '$w(w + 3) = 40$, so $w^2 + 3w - 40 = 0$. The negative root has been $-5$, then $-6$; ' +
        'what will it be now?',
    },
    hints: [
      'Same equation shape as before, with $40$ on the right.',
      '$w^2 + 3w - 40 = 0$. The pair multiplies to $-40$ and adds to $3$.',
    ],
    solution:
      '$$w(w + 3) = 40 \\implies w^2 + 3w - 40 = 0 \\implies (w + 8)(w - 5) = 0$$\n\n' +
      'So $w = -8$ or $w = 5$, and the width is $5$ m with a length of $8$ m.\n\n' +
      'Check: $5 \\times 8 = 40$. ✓ Notice the pattern across the three items: the roots are ' +
      'always the width and *minus the length*. The rejected root is not random — it is the ' +
      'length, wearing a minus sign.',
    misconceptionCodes: ['quadratic.keeps-impossible-root'],
  },
  {
    id: 'quadratic-factorisation.garden-a-4',
    skillIds: ['quadratic-factorisation.model-real-world-scenarios'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.garden-a', position: 4 },
    expect:
      'Every number is exactly as it was in the last item. Only the final question changed: it ' +
      'now asks for the length. Will your equation change at all? Will your answer?',
    statement:
      'A rectangular flower bed is $3$ m longer than it is wide. Its area is $40\\text{ m}^2$. ' +
      'Find its length, in metres.',
    answer: { type: 'number', value: 8, unit: 'm', tolerance: 0 },
    cpaPrompts: {
      concrete:
        'You have already paced this bed out. You know the short side. The question is asking for ' +
        'the other one — what one extra step turns what you know into what is wanted?',
      pictorial:
        'The same rectangle, but circle the side the question is about this time. Which label is ' +
        'it, $w$ or $w + 3$?',
      abstract:
        'The variable is $w$, the width. Solving gives $w$. The question wants $w + 3$, so ' +
        'solving is not yet finishing.',
    },
    hints: [
      'Set up and solve exactly as before. Nothing about the equation has changed.',
      'You will get $w = 5$. Now read the question again — is $5$ what it asked for?',
      'The length is $w + 3$.',
    ],
    solution:
      '$$w^2 + 3w - 40 = 0 \\implies (w + 8)(w - 5) = 0 \\implies w = 5 \\ (\\text{rejecting } -8)$$\n\n' +
      'The width is $5$ m, so the length is $5 + 3 = 8$ m.\n\n' +
      'Check: $5 \\times 8 = 40$. ✓ The variable you chose is a means to the answer, not the ' +
      'answer. The last line of any modelling problem is to go back and read what was asked.',
    misconceptionCodes: [
      'quadratic.answers-the-variable-not-the-question',
      'quadratic.keeps-impossible-root',
    ],
  },
  {
    id: 'quadratic-factorisation.garden-a-5',
    skillIds: ['quadratic-factorisation.model-real-world-scenarios'],
    tier: 1,
    sequence: { family: 'quadratic-factorisation.garden-a', position: 5 },
    expect:
      'The relationship itself has changed: the length is now $3$ m more than **twice** the ' +
      'width, and the area is $27\\text{ m}^2$. Will you still get a quadratic? Will there still ' +
      'be exactly one root you have to throw away?',
    statement:
      'A rectangular flower bed is $3$ m longer than twice its width. Its area is ' +
      '$27\\text{ m}^2$. Find its width, in metres.',
    answer: { type: 'number', value: 3, unit: 'm', tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Pace the width, then pace twice that and three more for the length. Widening by one step ' +
        'now lengthens the bed by two steps. Does the area grow faster than before?',
      pictorial:
        'The same two-cell strip, but the top now reads $2w$ and $+3$ instead of $w$ and $+3$. ' +
        'The row is still $w$ tall.',
      abstract:
        '$w(2w + 3) = 27$, so $2w^2 + 3w - 27 = 0$. A leading coefficient of $2$ means the cross ' +
        'frame, not a straight pair search.',
    },
    hints: [
      'Write the length in terms of $w$ first: twice the width, then three more.',
      '$w(2w + 3) = 27$, so $2w^2 + 3w - 27 = 0$. The leading coefficient is not $1$ any more.',
      'Cross frame: left column $2$ and $1$; right column has to multiply to $-27$. Try $+9$ and ' +
        '$-3$.',
    ],
    solution:
      'Let $w$ be the width in metres; the length is $(2w + 3)$ m.\n\n' +
      '$$w(2w + 3) = 27 \\implies 2w^2 + 3w - 27 = 0 \\implies (2w + 9)(w - 3) = 0$$\n\n' +
      'So $w = -4.5$ or $w = 3$. A width cannot be negative, so the width is $3$ m and the length ' +
      '$9$ m. Check: $3 \\times 9 = 27$. ✓\n\n' +
      '**The payoff of this sequence.** Five different sets of numbers and two different ' +
      'relationships, and the method never moved: name the unknown with its unit, write every ' +
      'other quantity in terms of it, form the equation, rearrange to $= 0$, factorise, and then ' +
      'test each root against the *situation*. The equation always offered two roots, and the ' +
      'flower bed always accepted exactly one.',
    misconceptionCodes: ['quadratic.keeps-impossible-root', 'quadratic.monic-method-on-non-monic'],
  },

  // §4.3 — tier 2
  {
    id: 'quadratic-factorisation.consecutive-integers',
    skillIds: ['quadratic-factorisation.model-real-world-scenarios'],
    tier: 2,
    statement:
      'Two consecutive positive whole numbers multiply to give $156$. Find the smaller of the ' +
      'two numbers.',
    answer: { type: 'number', value: 12, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay counters into a rectangle that is exactly one row taller than it is wide. Try a few ' +
        'sizes and see how quickly the total climbs past $156$.',
      pictorial:
        'Draw a rectangle with sides $n$ and $n + 1$, area $156$. The picture is the equation ' +
        'before any algebra is written down.',
      abstract:
        'Let $n$ be the smaller number. Consecutive means the other is $n + 1$, so ' +
        '$n(n + 1) = 156$ and $n^2 + n - 156 = 0$.',
    },
    hints: [
      'Name the smaller number $n$. What is the next whole number after it?',
      '$n(n + 1) = 156$, so $n^2 + n - 156 = 0$.',
      'Two numbers multiplying to $-156$ and adding to $1$. Since $12 \\times 13 = 156$, try ' +
        '$+13$ and $-12$... check which way round makes the sum $+1$.',
    ],
    solution:
      'Let the smaller number be $n$, so the larger is $n + 1$.\n\n' +
      '$$n(n + 1) = 156 \\implies n^2 + n - 156 = 0 \\implies (n + 13)(n - 12) = 0$$\n\n' +
      'So $n = -13$ or $n = 12$. The question says positive, so $n = 12$ and the two numbers are ' +
      '$12$ and $13$.\n\n' +
      'Check: $12 \\times 13 = 156$. ✓ The rejected root $-13$ is not nonsense — $-13$ and $-12$ ' +
      'also multiply to $156$ — it is simply excluded by the word "positive" in the question.',
    misconceptionCodes: ['quadratic.keeps-impossible-root'],
  },
  {
    id: 'quadratic-factorisation.number-puzzle',
    skillIds: ['quadratic-factorisation.model-real-world-scenarios'],
    tier: 2,
    statement:
      'A positive whole number is added to its own square, and the result is $72$. Find the ' +
      'number.',
    answer: { type: 'number', value: 8, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Take a square of counters with $n$ along each side, then add one more row of $n$ ' +
        'counters beside it. What shape does the whole pile make?',
      pictorial:
        'The pile is a rectangle $n$ tall and $n + 1$ wide, with area $72$. Draw it and label the ' +
        'two sides.',
      abstract:
        'Let $n$ be the number. Then $n^2 + n = 72$, so $n^2 + n - 72 = 0$.',
    },
    hints: [
      'Call the number $n$. Write "its square" and "the number" as algebra, then add them.',
      '$n^2 + n = 72$. Bring the $72$ across so the right-hand side is zero.',
      '$n^2 + n - 72 = 0$: two numbers multiplying to $-72$ and adding to $1$.',
    ],
    solution:
      'Let the number be $n$.\n\n' +
      '$$n^2 + n = 72 \\implies n^2 + n - 72 = 0 \\implies (n + 9)(n - 8) = 0$$\n\n' +
      'So $n = -9$ or $n = 8$. The question asks for a positive number, so $n = 8$.\n\n' +
      'Check: $64 + 8 = 72$. ✓ (The root $-9$ works algebraically too: $81 - 9 = 72$. It is the ' +
      'word "positive" that rules it out, not the algebra.)',
    misconceptionCodes: ['quadratic.keeps-impossible-root'],
  },
  {
    id: 'quadratic-factorisation.uniform-border',
    skillIds: ['quadratic-factorisation.model-real-world-scenarios'],
    tier: 2,
    statement:
      'A rectangular photograph measures $8$ cm by $6$ cm. It is mounted with a card border of ' +
      'the same width all the way round. The photograph and border together cover ' +
      '$120\\text{ cm}^2$. Find the width of the border, in centimetres.',
    answer: { type: 'number', value: 2, unit: 'cm', tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Cut a rectangle of paper $8$ cm by $6$ cm and lay it on a bigger sheet. A border of ' +
        '$1$ cm adds $1$ cm on the left *and* $1$ cm on the right. How much wider is the mount?',
      pictorial:
        'Draw the two rectangles, one inside the other. Label the outer sides in terms of the ' +
        'border width $x$ before multiplying anything.',
      abstract:
        'Outer sides $(8 + 2x)$ and $(6 + 2x)$, so $(8 + 2x)(6 + 2x) = 120$. Expand and rearrange ' +
        'to standard form.',
    },
    hints: [
      'Let $x$ be the width of the border in cm. The border appears on *both* sides, so how much ' +
        'is added to the $8$?',
      'Outer rectangle: $(8 + 2x)$ by $(6 + 2x)$, and its area is $120$.',
      'Expanding gives $4x^2 + 28x + 48 = 120$. Divide through by $4$ once you have brought the ' +
        '$120$ across.',
    ],
    solution:
      'Let $x$ cm be the border width. The mounted rectangle is $(8 + 2x)$ by $(6 + 2x)$.\n\n' +
      '$$(8 + 2x)(6 + 2x) = 120 \\implies 4x^2 + 28x + 48 = 120$$\n\n' +
      '$$4x^2 + 28x - 72 = 0 \\implies x^2 + 7x - 18 = 0 \\implies (x + 9)(x - 2) = 0$$\n\n' +
      'So $x = -9$ or $x = 2$. A border cannot have negative width, so the border is $2$ cm ' +
      'wide.\n\nCheck: the mount is $12$ cm by $10$ cm, area $120\\text{ cm}^2$. ✓ The commonest ' +
      'slip here is writing $(8 + x)(6 + x)$ and forgetting that the border is on both sides.',
    misconceptionCodes: ['quadratic.keeps-impossible-root'],
    figure: {
      kind: 'area_grid',
      title: 'Photograph and border',
      columns: ['8', '+2x'],
      rows: ['6', '+2x'],
      cells: ['', '', '', ''],
      caption: 'The outer rectangle. Its four cells have to total 120.',
    },
  },

  // §4.3 — tier 3
  {
    id: 'quadratic.garden-dimensions',
    skillIds: [
      'quadratic-factorisation.model-real-world-scenarios',
      'quadratic-factorisation.solve-quadratic-equations',
    ],
    tier: 3,
    statement:
      'The length of a rectangular garden is $3\\text{ m}$ longer than twice its width. The area ' +
      'is $35\\text{ m}^2$. Find the dimensions of the garden.',
    // Ordered (width, length) in metres.
    answer: { type: 'coordinates', x: 3.5, y: 10, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Picture pacing out the garden. If you widen it by a metre, the length grows too — by how ' +
        'much? So does the area grow steadily, or faster and faster?',
      pictorial:
        'Draw the rectangle. Label the width $w$ and work out what to write along the top. The ' +
        'area of that rectangle has to come to 35.',
      abstract:
        'Let $w$ be the width in metres. Form $w(2w + 3) = 35$, rearrange to standard form, ' +
        'factorise and solve — then check both roots against the garden.',
    },
    hints: [
      'Name the unknown with its units: let $w$ be the width in metres. Now write the length in ' +
        'terms of $w$.',
      'Length $\\times$ width $= 35$ gives $w(2w + 3) = 35$. Expand it and bring everything to one ' +
        'side — the Zero Product Property needs a zero.',
      'You have $2w^2 + 3w - 35 = 0$. Factorise with the cross method, then solve — and think ' +
        'about whether both answers can be a width.',
    ],
    solution:
      'Let $w$ be the width in metres, so the length is $(2w + 3)$ m.\n\n' +
      '$$w(2w + 3) = 35 \\implies 2w^2 + 3w - 35 = 0$$\n\n' +
      'Splitting the middle term: factors of $2 \\times (-35) = -70$ that add to $+3$ are $+10$ ' +
      'and $-7$.\n\n' +
      '$$2w^2 + 10w - 7w - 35 = 0 \\implies 2w(w+5) - 7(w+5) = 0 \\implies (2w - 7)(w + 5) = 0$$\n\n' +
      'So $w = 3.5$ or $w = -5$. A width cannot be negative, so $w = 3.5$ m and the length is ' +
      '$2(3.5) + 3 = 10$ m.\n\n' +
      'Check: $3.5 \\times 10 = 35$. ✓\n\nWidth $3.5$ m, length $10$ m.',
    misconceptionCodes: [
      'quadratic.keeps-impossible-root',
      'quadratic.answers-the-variable-not-the-question',
    ],
  },
  {
    id: 'quadratic-factorisation.sail-edges',
    skillIds: [
      'quadratic-factorisation.model-real-world-scenarios',
      'pythagoras.calculate-unknown-side',
    ],
    tier: 3,
    statement:
      'A triangular sail has two straight edges that meet at a right angle. One of them is ' +
      '$x$ m long and the other is $7$ m longer than that. The third edge is $13$ m. Find $x$.',
    answer: { type: 'number', value: 5, unit: 'm', tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Cut a corner out of paper so the two cut edges meet squarely, one $7$ cm longer than ' +
        'the other, and measure across the opening. What connects those three lengths?',
      pictorial:
        'Sketch the sail with the right angle marked. Label the two edges at the corner $x$ and ' +
        '$x + 7$, and the edge opposite the corner $13$.',
      abstract:
        'The square on the edge opposite the right angle equals the sum of the squares on the ' +
        'other two: $x^2 + (x + 7)^2 = 13^2$. Expand and rearrange to a quadratic.',
    },
    hints: [
      'Which of the three edges is opposite the right angle? That one is the $13$ m edge.',
      'So $x^2 + (x + 7)^2 = 169$. Expand the square carefully — the middle term is $14x$, not $7x$.',
      '$2x^2 + 14x - 120 = 0$. Halve everything before you factorise.',
    ],
    solution:
      'The $13$ m edge is opposite the right angle, so\n\n$$x^2 + (x + 7)^2 = 13^2$$\n\n' +
      '$$x^2 + x^2 + 14x + 49 = 169 \\implies 2x^2 + 14x - 120 = 0 \\implies x^2 + 7x - 60 = 0$$\n\n' +
      '$$(x + 12)(x - 5) = 0 \\implies x = -12 \\ \\text{or}\\ x = 5$$\n\n' +
      'A length cannot be negative, so $x = 5$ m. The sail is $5$ m, $12$ m and $13$ m.\n\n' +
      'Check: $25 + 144 = 169$. ✓',
    misconceptionCodes: [
      'quadratic.keeps-impossible-root',
      'quadratic.answers-the-variable-not-the-question',
    ],
  },

  // §4.3 — tier 4: which root, and why
  {
    id: 'quadratic-factorisation.which-root-and-why',
    skillIds: [
      'quadratic-factorisation.model-real-world-scenarios',
      'quadratic-factorisation.solve-quadratic-equations',
    ],
    tier: 4,
    statement:
      'A ball is thrown from the top of a cliff. Its height above the sea, in metres, $t$ seconds ' +
      'after it is thrown, is $50 + 15t - 5t^2$. Find the number of seconds until it hits the ' +
      'sea, and be ready to say what the other solution of your equation describes.',
    answer: { type: 'number', value: 5, unit: 's', tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Stand on a step and throw something upwards off it. Which happens first — the throw, the ' +
        'highest point, or the landing? Which of those is $t = 0$?',
      pictorial:
        'Sketch height against time. The curve starts at $50$ m, rises for a while, then falls ' +
        'and crosses the time axis once. Extend the curve backwards to the left of $t = 0$: it ' +
        'crosses the axis a second time. What would a time of $-2$ seconds mean?',
      abstract:
        'Set the height to $0$ and solve. Two roots come out; one of them lies before the ball ' +
        'was thrown, so it belongs to the *equation* and not to the *throw*.',
    },
    hints: [
      'Hitting the sea means the height is zero. Write that equation down.',
      '$50 + 15t - 5t^2 = 0$. Divide through by $-5$ (or by $5$ after rearranging) to get ' +
        '$t^2 - 3t - 10 = 0$.',
      '$(t - 5)(t + 2) = 0$, so $t = 5$ or $t = -2$. Which of those can be a time measured from ' +
        'the throw?',
    ],
    solution:
      'The ball hits the sea when its height is $0$:\n\n' +
      '$$50 + 15t - 5t^2 = 0 \\implies 5t^2 - 15t - 50 = 0 \\implies t^2 - 3t - 10 = 0$$\n\n' +
      '$$(t - 5)(t + 2) = 0 \\implies t = 5 \\quad \\text{or} \\quad t = -2$$\n\n' +
      'The ball hits the sea after $5$ seconds. Check: $50 + 75 - 125 = 0$. ✓\n\n' +
      '**Why $t = -2$ is rejected, and what it means.** The formula is a model of the ball only ' +
      'from the moment it leaves the hand, $t = 0$, onwards. The value $t = -2$ satisfies the ' +
      'equation perfectly — it is where the same parabola, extended backwards in time, would have ' +
      'crossed sea level. It says: *if* the ball had been following this curve for the two ' +
      'seconds before the throw, it would have been at sea level then. It was not; it was in ' +
      'someone\'s hand. So $-2$ is a solution of the equation and not of the problem.\n\n' +
      'That is the habit worth taking from this unit: solving the equation is not the end. Every ' +
      'root has to be read back into the situation, and a root is only an answer if the ' +
      'situation admits it.',
    misconceptionCodes: [
      'quadratic.keeps-impossible-root',
      'quadratic.answers-the-variable-not-the-question',
    ],
    figure: {
      kind: 'coordinate_plane',
      title: 'Height above the sea against time',
      xMin: -4,
      xMax: 7,
      yMin: -20,
      yMax: 70,
      gridStep: 1,
      curves: [{ type: 'quadratic', a: -5, b: 15, c: 50, label: 'h = 50 + 15t − 5t²' }],
      caption: 'The curve meets the time axis twice. Only one of those meetings is the throw.',
    },
  },

  // §4.3 — diagnostics
  {
    id: 'quadratic-factorisation.dx-keeps-impossible-root',
    skillIds: ['quadratic-factorisation.model-real-world-scenarios'],
    tier: 'diagnostic',
    statement:
      'A rectangular patio is $4$ m longer than it is wide and covers $12\\text{ m}^2$. Find its ' +
      'width, in metres.',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$2$ m' },
        {
          label: 'B',
          value: '$2$ m and $-6$ m',
          misconceptionCode: 'quadratic.keeps-impossible-root',
        },
        {
          label: 'C',
          value: '$6$ m',
          misconceptionCode: 'quadratic.answers-the-variable-not-the-question',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Take a tape measure and try to lay out a patio $-6$ m wide. What goes wrong before you ' +
        'have started?',
      pictorial:
        'Draw the rectangle with $w$ down one side and $w + 4$ along the other. Which of your two ' +
        'answers could actually be marked on that drawing?',
      abstract:
        'Both roots satisfy $w^2 + 4w - 12 = 0$. Only one of them satisfies "is the width of a ' +
        'patio". Those are different tests.',
    },
    hints: [
      'Solve as usual first: $w(w + 4) = 12$, so $w^2 + 4w - 12 = 0$.',
      'You should get $w = 2$ and $w = -6$. Now go back to the patio and ask which of those a ' +
        'builder could actually mark out.',
    ],
    solution:
      '$$w(w + 4) = 12 \\implies w^2 + 4w - 12 = 0 \\implies (w + 6)(w - 2) = 0$$\n\n' +
      'So $w = -6$ or $w = 2$, and the width is $2$ m.\n\n' +
      'Option B reports both roots: both solve the equation, but a physical width cannot be ' +
      'negative, so only one solves the problem. Option C gives $6$ m, which is the *length* ' +
      '($2 + 4$), not the width the question asked for.',
    misconceptionCodes: [
      'quadratic.keeps-impossible-root',
      'quadratic.answers-the-variable-not-the-question',
    ],
  },
  {
    id: 'quadratic-factorisation.dx-answers-the-variable',
    skillIds: ['quadratic-factorisation.model-real-world-scenarios'],
    tier: 'diagnostic',
    statement:
      'A rectangular garden is $3$ m longer than it is wide and covers $54\\text{ m}^2$. Find the ' +
      'length of the garden, in metres.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        {
          label: 'A',
          value: '$6$ m',
          misconceptionCode: 'quadratic.answers-the-variable-not-the-question',
        },
        { label: 'B', value: '$9$ m' },
        {
          label: 'C',
          value: '$9$ m and $-6$ m',
          misconceptionCode: 'quadratic.keeps-impossible-root',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Pace out the garden and stop at the short side. Have you finished the job the question ' +
        'set you, or only the job your equation set you?',
      pictorial:
        'Draw the rectangle and mark the side the question is asking about. Is it the one you ' +
        'called $w$?',
      abstract:
        'The variable $w$ was chosen for convenience. Solving gives $w$; the question asked for ' +
        '$w + 3$. One more line of work is needed.',
    },
    hints: [
      'Set up as usual: $w(w + 3) = 54$, so $w^2 + 3w - 54 = 0$.',
      'You get $w = 6$ (rejecting $w = -9$). Read the question one more time before writing your ' +
        'answer down.',
    ],
    solution:
      '$$w(w + 3) = 54 \\implies w^2 + 3w - 54 = 0 \\implies (w + 9)(w - 6) = 0$$\n\n' +
      'A width cannot be negative, so $w = 6$ m — and the *length* is $6 + 3 = 9$ m.\n\n' +
      'Check: $6 \\times 9 = 54$. ✓\n\n' +
      'Option A stops at the variable and reports the width. Option C keeps the rejected root as ' +
      'well, giving a second "length" of $-9 + 3 = -6$ m, which no garden has.',
    misconceptionCodes: [
      'quadratic.answers-the-variable-not-the-question',
      'quadratic.keeps-impossible-root',
    ],
  },

];
