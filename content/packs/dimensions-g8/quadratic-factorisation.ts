import type { Problem, SkillNode } from '@/lib/content/schema';

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

export const quadraticFactorisationProblems: Problem[] = [
  {
    id: 'quadratic.solve-monic',
    skillIds: ['quadratic-factorisation.solve-quadratic-equations'],
    difficulty: 'basic',
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
      '$$x = 3 \\quad \\text{or} \\quad x = 4$$',
    misconceptionCodes: ['quadratic.stops-at-factorising', 'quadratic.sign-pair-confusion'],
  },
  {
    id: 'quadratic.factorise-non-monic',
    skillIds: ['quadratic-factorisation.factorize-quadratic-trinomials'],
    difficulty: 'advanced',
    statement: 'Factorize $3x^2 + 10x + 8$.',
    answer: {
      type: 'exact',
      value: '(3x + 4)(x + 2)',
      accepts: ['(3x+4)(x+2)', '(x+2)(3x+4)'],
    },
    cpaPrompts: {
      concrete:
        'You need three $x^2$ tiles this time, not one. Try to lay them into a rectangle — what ' +
        'does that force about the two sides?',
      pictorial:
        'Use the cross frame. The left column has to multiply to 3 and the right to 8. Try a ' +
        'candidate and check whether the crossing products add to 10.',
      abstract:
        'Find $p, q, r, s$ with $pr = 3$, $qs = 8$ and $ps + qr = 10$.',
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
      '$$3x^2 + 10x + 8 = (3x + 4)(x + 2)$$',
    misconceptionCodes: ['quadratic.monic-method-on-non-monic'],
  },
  {
    id: 'quadratic.garden-dimensions',
    skillIds: [
      'quadratic-factorisation.model-real-world-scenarios',
      'quadratic-factorisation.solve-quadratic-equations',
    ],
    difficulty: 'challenge',
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
];
