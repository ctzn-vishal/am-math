import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';

/**
 * Unit 2 — Linear Equations in Two Variables. Hand-authored.
 *
 * This is the reference unit: everything the mechanical port left thin (per-skill CPA
 * notes rather than one set inherited across the whole chapter, real misconception probes,
 * problems with structured answers that code can mark) is done properly here. The remaining
 * thirteen units are ported skeletons and need this same pass.
 *
 * Source: docs/Implementation Manual — The CPA Framework for Grade 8 Mathematics, §2, and
 * the Chapter 2 worked examples in the content spec.
 */

export const linearSystemsSkills: SkillNode[] = [
  {
    id: 'linear-systems.model-real-world-relationships',
    title: 'Model real-world relationships with two linear variables',
    summary:
      'Turn a situation with two unknown quantities into a pair of equations, and read a pair of ' +
      'equations back as a situation.',
    prerequisites: [],
    cpa: {
      concrete:
        'A two-pan balance with labelled cups. One cup is $x$ grams, another $y$ grams, and loose ' +
        'gram weights make up the constants. The student builds the situation until the pans level. ' +
        'Levelling is not a rule they are told — it is a thing they achieve, and it is what "=" means.',
      pictorial:
        'A comparison bar per equation, drawn on one shared scale so the two can be laid against ' +
        'each other. Each bar splits into blocks for $x$, blocks for $y$, and a labelled remainder.',
      abstract:
        'Standard form $ax + by = c$. Each of $a$, $b$ and $c$ traces back to something countable: ' +
        '$a$ is how many $x$-cups, $b$ how many $y$-cups, $c$ the reading on the scale.',
    },
    formulas: ['ax + by = c'],
    misconceptions: [
      {
        code: 'linear-systems.variable-as-label',
        description:
          'Reads $a$ in "3 adult tickets cost $a$" as the word "adult" rather than as the price of ' +
          'one ticket, then writes $3a$ meaning "three adults" and loses the units.',
        probe:
          'If $a$ is a number, what number is it? Point at the thing in the problem that $a$ measures — ' +
          'and tell me what it is measured in.',
        correction:
          'A variable stands for a quantity, never for an object. $a$ is *dollars per adult ticket*, ' +
          'so $3a$ is dollars — which is why it can be added to $4c$ and set equal to 48.',
      },
    ],
    suggestedVisual: 'bar_model',
  },
  {
    id: 'linear-systems.solve-simultaneous-linear',
    title: 'Solve simultaneous linear equations by substitution, elimination and graphing',
    summary:
      'Three methods for the same job, and a sense of which one the shape of a system is asking for.',
    prerequisites: ['linear-systems.model-real-world-relationships'],
    cpa: {
      concrete:
        'Substitution is performed physically: lift the $y$-cup off the pan and set down, in its place, ' +
        'the two $x$-cups and one weight that balanced it earlier. The pan does not move. That ' +
        'stillness is the whole justification for the method.\n\nElimination is performed by removing ' +
        'the same thing from both pans — four child-cups from each side — and observing that balance ' +
        'survives.',
      pictorial:
        'Comparison bars, aligned left. Substitution redraws one bar with the replacement blocks in ' +
        'place. Elimination lays two bars against each other so the shared portion cancels by sight ' +
        'and the leftover strip is read off directly.',
      abstract:
        'Substitution: rearrange one equation to $y = f(x)$ and put $f(x)$ wherever $y$ stood. ' +
        'Elimination: scale one or both equations until a coefficient matches, then add or subtract. ' +
        'Graphically, the solution is the single point both lines pass through.',
    },
    formulas: [
      'y = f(x) \\implies ax + b\\,f(x) = c',
      '\\lambda(a_2x + b_2y) = \\lambda c_2',
    ],
    misconceptions: [
      {
        code: 'linear-systems.partial-distribution',
        description:
          'Substitutes correctly but distributes the multiplier over only the first term: writes ' +
          '$3x + 2(2x + 1) = 3x + 4x + 1$, dropping the $+2$.',
        probe:
          'You have two of the bracket, not two of its first block. Draw the bracket twice, side by ' +
          'side — how many unit blocks are on the page now?',
        correction:
          'The multiplier applies to everything the bracket contains, because the bracket is one ' +
          'object repeated. Two copies of $(2x + 1)$ is $4x + 2$, so the equation is $7x + 2 = 16$.',
      },
      {
        code: 'linear-systems.one-sided-elimination',
        description:
          'Subtracts the left-hand sides of two equations but forgets the right-hand sides, ' +
          'getting $7a = 104$ or $7a = 48$ rather than $7a = 56$.',
        probe:
          'You took $3a + 4c$ off the left pan. What did you take off the right pan to keep it level?',
        correction:
          'An equation is a balance. Whatever is removed from one side must be removed from the ' +
          'other, so the constants subtract too: $104 - 48 = 56$.',
      },
      {
        code: 'linear-systems.sign-on-elimination',
        description:
          'When eliminating a variable whose coefficients have opposite signs, subtracts instead of ' +
          'adding (or vice versa), turning $-12y$ and $+12y$ into $-24y$ rather than $0$.',
        probe: 'If we subtract $-12y$ from $+12y$, do they cancel to zero, or become $-24y$?',
        correction:
          'Matching signs cancel by subtracting; opposite signs cancel by adding. Check by asking ' +
          'what the two terms sum to before choosing the operation.',
      },
    ],
    suggestedVisual: 'bar_model',
  },
  {
    id: 'linear-systems.formulate-solve-applied',
    title: 'Formulate and solve applied word problems',
    summary:
      'Go from prose to a system, solve it, and check the answer against the situation rather than ' +
      'against the algebra.',
    prerequisites: ['linear-systems.solve-simultaneous-linear'],
    cpa: {
      concrete:
        'Two till receipts for the same shop. The student lays them side by side and looks for what ' +
        'they share before touching any algebra.',
      pictorial:
        'One comparison bar per receipt, on a shared scale. Scaling a receipt means redrawing its bar ' +
        'at double length — and the shared portion becomes visible as an aligned block.',
      abstract:
        'Define variables with units, write one equation per independent statement, solve, then ' +
        'substitute back into the *original words* to check.',
    },
    formulas: [],
    misconceptions: [
      {
        code: 'linear-systems.unchecked-answer',
        description:
          'Solves the system correctly but never tests the pair against the second condition, so ' +
          'an arithmetic slip in back-substitution goes unnoticed.',
        probe:
          'You have $a = 8$ and $c = 6$. Go back to the second sentence of the problem — buy those ' +
          'tickets at those prices. What do you pay?',
        correction:
          'A solution must satisfy *both* equations. Checking against the one you did not use to ' +
          'find it is what makes the check meaningful.',
      },
    ],
    suggestedVisual: 'bar_model',
  },
];

export const linearSystemsProblems: Problem[] = [
  {
    id: 'linear-systems.substitution-basic',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    statement: 'Solve the simultaneous equations:\n$$y = 2x + 1$$\n$$3x + 2y = 16$$',
    answer: { type: 'coordinates', x: 2, y: 5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Put a $y$-cup on the balance. The first equation says it levels against two $x$-cups and one ' +
        'gram weight. If you swap the $y$-cup for exactly that, does the pan move?',
      pictorial:
        'Draw the bar for $y$ as two $x$-blocks and a 1-block. Now draw the bar for $3x + 2y = 16$, ' +
        'replacing each $y$-block with its two $x$-blocks and a 1. How many $x$-blocks are on the page?',
      abstract:
        'Substitute $y = 2x + 1$ into the second equation to get $3x + 2(2x + 1) = 16$, then solve ' +
        'for $x$ and back-substitute.',
    },
    hints: [
      'Equation (1) tells you exactly what $y$ is worth in terms of $x$. Where in equation (2) could ' +
        'you put that?',
      'Replace $y$ in $3x + 2y = 16$ with $(2x + 1)$. You now have one equation in one unknown.',
      'Expand $2(2x + 1)$ carefully — both terms. That gives $7x + 2 = 16$. Solve for $x$, then use ' +
        '$y = 2x + 1$.',
    ],
    solution:
      'Substituting gives $3x + 2(2x + 1) = 16$. Expanding: $3x + 4x + 2 = 16$, so $7x = 14$ and ' +
      '$x = 2$. Back-substituting into $y = 2x + 1$ gives $y = 5$. Check in equation (2): ' +
      '$3(2) + 2(5) = 16$. ✓\n\n$$(x, y) = (2, 5)$$',
    misconceptionCodes: ['linear-systems.partial-distribution'],
  },
  {
    id: 'linear-systems.elimination-tickets',
    skillIds: [
      'linear-systems.formulate-solve-applied',
      'linear-systems.solve-simultaneous-linear',
    ],
    tier: 2,
    statement:
      '3 adult tickets and 4 child tickets cost $\\$48$. 5 adult tickets and 2 child tickets cost ' +
      '$\\$52$. Find the cost of one adult ticket and one child ticket.',
    // Two unknowns, so the answer is a pair. Marked as an ordered (adult, child) coordinate.
    answer: { type: 'coordinates', x: 8, y: 6, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two receipts on the counter. What would happen if you bought the second lot twice over — ' +
        'what would the receipt say then, and what does it now share with the first?',
      pictorial:
        'Draw a bar for $3a + 4c = 48$ and, beneath it on the same scale, one for $10a + 4c = 104$. ' +
        'Line them up from the left. What is the leftover strip worth, and what is it made of?',
      abstract:
        'Scale equation (2) so the coefficients of $c$ match, then subtract to eliminate $c$.',
    },
    hints: [
      'Name the unknowns with their units: $a$ = cost in dollars of one adult ticket, $c$ = cost of ' +
        'one child ticket. Now write one equation per sentence.',
      'The coefficients of $c$ are 4 and 2. What can you multiply equation (2) by so that subtracting ' +
        'makes the child tickets disappear?',
      'Doubling equation (2) gives $10a + 4c = 104$. Subtract $3a + 4c = 48$ from it — remembering to ' +
        'subtract the right-hand sides too.',
    ],
    solution:
      'Let $a$ and $c$ be the costs in dollars of one adult and one child ticket.\n\n' +
      '$$3a + 4c = 48 \\quad (1)$$\n$$5a + 2c = 52 \\quad (2)$$\n\n' +
      'Doubling (2): $10a + 4c = 104 \\quad (3)$. Subtracting (1) from (3): $7a = 56$, so $a = 8$. ' +
      'Substituting into (1): $24 + 4c = 48$, so $c = 6$.\n\n' +
      'Check in (2): $5(8) + 2(6) = 52$. ✓\n\nAdult $\\$8$, child $\\$6$.',
    misconceptionCodes: [
      'linear-systems.one-sided-elimination',
      'linear-systems.variable-as-label',
      'linear-systems.unchecked-answer',
    ],
  },
  {
    id: 'linear-systems.write-the-equations',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 1,
    statement:
      'A bakery sells loaves for $\\$l$ each and rolls for $\\$r$ each. One customer buys 2 ' +
      'loaves and 6 rolls for $\\$13$; another buys 1 loaf and 3 rolls. Write an equation for ' +
      'the first purchase, then state the two coefficients in it — the number multiplying $l$ ' +
      'and the number multiplying $r$ — as a pair.',
    answer: { type: 'coordinates', x: 2, y: 6, tolerance: 0 },
    cpaPrompts: {
      concrete:
        "Put the first customer's shopping on a balance pan: how many loaf-cups and how many " +
        'roll-cups? On the other pan, 13 one-dollar weights. What does it mean that the pans level?',
      pictorial:
        'Draw one bar for the first purchase: blocks for each loaf, blocks for each roll, and a ' +
        'brace over the whole bar reading 13. How many blocks of each kind are there?',
      abstract:
        'One equation per sentence of the form $al + br = c$, where $a$ counts loaves and $b$ ' +
        'counts rolls.',
    },
    hints: [
      'What does $l$ stand for — a loaf, or the price of one loaf in dollars? What is $2l$ then?',
      'Two loaves cost $2l$ dollars and six rolls cost $6r$ dollars. Together they came to 13.',
    ],
    solution:
      'Let $l$ and $r$ be the prices in dollars of one loaf and one roll. The first purchase ' +
      'gives\n\n$$2l + 6r = 13.$$\n\nThe coefficients are $2$ (loaves) and $6$ (rolls). The second ' +
      "customer's purchase, $l + 3r$, is exactly half of the first — so no total is needed to " +
      'know it cost $\\$6.50$.',
    misconceptionCodes: ['linear-systems.variable-as-label'],
  },
];
