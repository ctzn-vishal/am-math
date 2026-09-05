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
    title: 'Model linear relationships with two variables',
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
    title: 'Solve simultaneous equations by substitution, elimination and graphing',
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
    title: 'Model and solve problems with simultaneous equations',
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

// ---------------------------------------------------------------------------
// Shared figures
// ---------------------------------------------------------------------------

/**
 * Comparison bars for the two equations of the first elimination item. Unknown blocks may
 * take any width — they are unknown — but the same unknown keeps the same width in every
 * row, which is the whole point: the shared `2y` portion can then be seen to cancel.
 */
const bars3x2y16 = {
  kind: 'bar_model' as const,
  title: 'Two equations, one scale',
  caption:
    'The x-blocks and y-blocks are the same size in both bars. Lay the second bar against the first.',
  rows: [
    {
      id: 'e1',
      label: 'Equation (1)',
      segments: [
        { id: 'x1', label: 'x', units: 3, role: 'unknown' as const },
        { id: 'x2', label: 'x', units: 3, role: 'unknown' as const },
        { id: 'x3', label: 'x', units: 3, role: 'unknown' as const },
        { id: 'y1', label: 'y', units: 2, role: 'unknown' as const },
        { id: 'y2', label: 'y', units: 2, role: 'unknown' as const },
      ],
      total: { label: '16', value: 16 },
    },
    {
      id: 'e2',
      label: 'Equation (2)',
      segments: [
        { id: 'x1', label: 'x', units: 3, role: 'unknown' as const },
        { id: 'y1', label: 'y', units: 2, role: 'unknown' as const },
        { id: 'y2', label: 'y', units: 2, role: 'unknown' as const },
      ],
      total: { label: '8', value: 8 },
    },
  ],
};

/** The same two-bar picture with the scaled copy of equation (2) drawn underneath it. */
const barsScaledSecond = {
  kind: 'bar_model' as const,
  title: 'Scaling a bar before comparing',
  caption:
    'The third bar is the second one drawn twice over. Only then does it share a portion with the first.',
  rows: [
    {
      id: 'e1',
      label: 'Equation (1)',
      segments: [
        { id: 'x1', label: 'x', units: 3, role: 'unknown' as const },
        { id: 'x2', label: 'x', units: 3, role: 'unknown' as const },
        { id: 'x3', label: 'x', units: 3, role: 'unknown' as const },
        { id: 'y1', label: 'y', units: 2, role: 'unknown' as const },
        { id: 'y2', label: 'y', units: 2, role: 'unknown' as const },
      ],
      total: { label: '16', value: 16 },
    },
    {
      id: 'e2',
      label: 'Equation (2)',
      segments: [
        { id: 'x1', label: 'x', units: 3, role: 'unknown' as const },
        { id: 'y1', label: 'y', units: 2, role: 'unknown' as const },
      ],
      total: { label: '7', value: 7 },
    },
    {
      id: 'e3',
      label: 'Equation (2) doubled',
      segments: [
        { id: 'x1', label: 'x', units: 3, role: 'unknown' as const },
        { id: 'x2', label: 'x', units: 3, role: 'unknown' as const },
        { id: 'y1', label: 'y', units: 2, role: 'unknown' as const },
        { id: 'y2', label: 'y', units: 2, role: 'unknown' as const },
      ],
      total: { label: '14', value: 14 },
    },
  ],
};

/** The two till receipts of the ticket problem, plus the doubled second receipt. */
const barsTickets = {
  kind: 'bar_model' as const,
  title: 'Two receipts on one scale',
  caption:
    'An a-block is one adult ticket and a c-block one child ticket. The third bar is the second bought twice over.',
  rows: [
    {
      id: 'r1',
      label: '3 adult, 4 child',
      segments: [
        { id: 'a1', label: 'a', units: 5, role: 'unknown' as const },
        { id: 'a2', label: 'a', units: 5, role: 'unknown' as const },
        { id: 'a3', label: 'a', units: 5, role: 'unknown' as const },
        { id: 'c1', label: 'c', units: 3, role: 'unknown' as const },
        { id: 'c2', label: 'c', units: 3, role: 'unknown' as const },
        { id: 'c3', label: 'c', units: 3, role: 'unknown' as const },
        { id: 'c4', label: 'c', units: 3, role: 'unknown' as const },
      ],
      total: { label: '48', value: 48 },
    },
    {
      id: 'r2',
      label: '5 adult, 2 child',
      segments: [
        { id: 'a1', label: 'a', units: 5, role: 'unknown' as const },
        { id: 'a2', label: 'a', units: 5, role: 'unknown' as const },
        { id: 'a3', label: 'a', units: 5, role: 'unknown' as const },
        { id: 'a4', label: 'a', units: 5, role: 'unknown' as const },
        { id: 'a5', label: 'a', units: 5, role: 'unknown' as const },
        { id: 'c1', label: 'c', units: 3, role: 'unknown' as const },
        { id: 'c2', label: 'c', units: 3, role: 'unknown' as const },
      ],
      total: { label: '52', value: 52 },
    },
    {
      id: 'r3',
      label: 'the second receipt, twice',
      segments: [
        { id: 'g1', label: '5a', units: 25, role: 'unknown' as const },
        { id: 'g2', label: '5a', units: 25, role: 'unknown' as const },
        { id: 'c1', label: 'c', units: 3, role: 'unknown' as const },
        { id: 'c2', label: 'c', units: 3, role: 'unknown' as const },
        { id: 'c3', label: 'c', units: 3, role: 'unknown' as const },
        { id: 'c4', label: 'c', units: 3, role: 'unknown' as const },
      ],
      total: { label: '104', value: 104 },
    },
  ],
};

/** "Is this pair a solution?" — the answers a student actually types for a no. */
const NO = {
  type: 'exact' as const,
  value: 'no',
  accepts: ['no it does not', 'it does not', 'false', 'no, it does not', "no it doesn't", 'no it is not'],
};

export const linearSystemsProblems: Problem[] = [
  // =========================================================================
  // Skill 1 — model a situation with two linear variables
  // =========================================================================

  // ---- Tier 1: family linear-systems.write-an-equation (6 items) ----
  {
    id: 'linear-systems.write-eq-1',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 1,
    sequence: { family: 'linear-systems.write-an-equation', position: 1 },
    statement:
      'A school shop sells pens at $\\$p$ each and notebooks at $\\$q$ each. Ravi buys 2 pens ' +
      'and 3 notebooks and pays $\\$17$. Write an equation connecting $p$ and $q$.',
    answer: { type: 'equation', lhs: '2p + 3q', rhs: '17', variables: ['p', 'q'] },
    cpaPrompts: {
      concrete:
        "Put Ravi's shopping on one pan of a balance: two pen-cups and three notebook-cups. On " +
        'the other pan, 17 one-dollar weights. What does it mean when the pans level?',
      pictorial:
        'Draw one bar for the purchase: two blocks labelled $p$, then three labelled $q$, with a ' +
        'brace over the whole bar reading 17. How many blocks of each kind are there?',
      abstract:
        'Each pen contributes $p$ dollars and each notebook $q$ dollars, so the bill is ' +
        '$2p + 3q$. Set that equal to what he actually paid.',
    },
    hints: [
      'What does $p$ stand for — a pen, or the price of one pen in dollars? So what is $2p$?',
      'Two pens cost $2p$ dollars and three notebooks cost $3q$ dollars. Together they came to 17.',
    ],
    solution:
      'Each pen costs $p$ dollars, so two pens cost $2p$ dollars. Each notebook costs $q$ ' +
      'dollars, so three cost $3q$ dollars. The bill was $\\$17$, giving\n\n$$2p + 3q = 17.$$\n\n' +
      'Both sides of this equation are amounts of money, which is why they can be equal at all.',
    misconceptionCodes: ['linear-systems.variable-as-label'],
    figure: {
      kind: 'bar_model',
      title: "Ravi's purchase",
      caption: 'Two pen-blocks and three notebook-blocks make up a bill of 17 dollars.',
      rows: [
        {
          id: 'ravi',
          label: '2 pens, 3 notebooks',
          segments: [
            { id: 'p1', label: 'p', units: 3, role: 'unknown' },
            { id: 'p2', label: 'p', units: 3, role: 'unknown' },
            { id: 'q1', label: 'q', units: 2, role: 'unknown' },
            { id: 'q2', label: 'q', units: 2, role: 'unknown' },
            { id: 'q3', label: 'q', units: 2, role: 'unknown' },
          ],
          total: { label: '17', value: 17 },
        },
      ],
    },
  },
  {
    id: 'linear-systems.write-eq-2',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 1,
    sequence: { family: 'linear-systems.write-an-equation', position: 2 },
    expect:
      'Same shop, same prices. Mei buys one fewer pen than Ravi did and the same three notebooks. ' +
      'Which term of your equation changes, and which term stays exactly as it was?',
    statement:
      'At the same shop, Mei buys 1 pen and 3 notebooks and pays $\\$13$. Write an equation ' +
      'connecting $p$ and $q$.',
    answer: { type: 'equation', lhs: 'p + 3q', rhs: '13', variables: ['p', 'q'] },
    cpaPrompts: {
      concrete:
        'Take one pen-cup off the pan you built for Ravi. The pans no longer level — how many ' +
        'one-dollar weights do you take off the other pan to fix that?',
      pictorial:
        "Redraw Ravi's bar with one $p$-block removed. The three $q$-blocks are untouched; only " +
        'the brace over the whole bar changes, from 17 to 13.',
      abstract:
        'One pen costs $p$, so the pen part of the bill is now $1p$, written simply as $p$. The ' +
        'notebook part is still $3q$.',
    },
    hints: [
      'The notebooks are unchanged, so the $3q$ term is unchanged. Only the pen term moves.',
      'One pen costs $p$ dollars. We do not write $1p$; we write $p$.',
    ],
    solution:
      'One pen costs $p$ dollars and three notebooks cost $3q$ dollars, and Mei paid $\\$13$:\n\n' +
      '$$p + 3q = 13.$$\n\nComparing with $2p + 3q = 17$: one fewer pen, and $\\$4$ less paid. ' +
      'That already tells you a pen costs $\\$4$ — the two equations together know more than ' +
      'either does alone.',
    misconceptionCodes: ['linear-systems.variable-as-label'],
  },
  {
    id: 'linear-systems.write-eq-3',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 1,
    sequence: { family: 'linear-systems.write-an-equation', position: 3 },
    expect:
      'This time it is the notebooks that drop to one, and the pens go back up to two. Which of ' +
      'the two coefficients becomes 1 now — the one on $p$, or the one on $q$?',
    statement:
      'At the same shop, Tan buys 2 pens and 1 notebook and pays $\\$11$. Write an equation ' +
      'connecting $p$ and $q$.',
    answer: { type: 'equation', lhs: '2p + q', rhs: '11', variables: ['p', 'q'] },
    cpaPrompts: {
      concrete:
        'Build the pan again: two pen-cups and a single notebook-cup. Against 11 one-dollar ' +
        'weights, does it level?',
      pictorial:
        'Draw the bar as two $p$-blocks followed by a single $q$-block, braced at 11. Compare its ' +
        "length with Ravi's bar.",
      abstract:
        'Two pens give $2p$; one notebook gives $q$, not $1q$. The total spent is the right-hand ' +
        'side.',
    },
    hints: [
      'Write the pen part first, then the notebook part, then what was paid.',
      'A single notebook costs $q$ dollars, so the coefficient of $q$ is 1 and is left unwritten.',
    ],
    solution:
      'Two pens cost $2p$ dollars, one notebook costs $q$ dollars, and the bill was $\\$11$:\n\n' +
      '$$2p + q = 11.$$\n\nThe coefficient 1 is real but invisible: $q$ means $1 \\times q$. ' +
      'Every one of these three purchases has the shape $ap + bq = c$.',
    misconceptionCodes: ['linear-systems.variable-as-label'],
  },
  {
    id: 'linear-systems.write-eq-4',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 1,
    sequence: { family: 'linear-systems.write-an-equation', position: 4 },
    expect:
      'The letters change job here: $x$ and $y$ will count objects instead of measuring prices. ' +
      'Before you write anything down — will the equation still have the shape $ax + by = c$?',
    statement:
      'A second shop sells pens at $\\$4$ each and notebooks at $\\$3$ each. Kim buys some pens ' +
      'and some notebooks — 7 items altogether. Let $x$ be the number of pens and $y$ the number ' +
      'of notebooks. Write the equation that counts the items.',
    answer: { type: 'equation', lhs: 'x + y', rhs: '7', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Put 7 objects on the table and sort them into two piles, pens and notebooks. You do not ' +
        'know the size of either pile — but what do you know about the two sizes together?',
      pictorial:
        'Draw one bar split into two parts, an $x$ part and a $y$ part, with a brace of 7 over ' +
        'the whole bar. The split can be anywhere; the total cannot.',
      abstract:
        'Each pen counts once and each notebook counts once, so the counting equation is ' +
        '$1x + 1y = 7$ — written $x + y = 7$.',
    },
    hints: [
      'This equation is about how many things, not about how much money. Do the prices belong in it?',
      'Every item is either a pen or a notebook, and there are 7 items in all.',
    ],
    solution:
      'Counting the items and ignoring the money:\n\n$$x + y = 7.$$\n\nThe prices $\\$4$ and ' +
      '$\\$3$ play no part here, because this sentence counts objects. Notice the shape is still ' +
      '$ax + by = c$ — with $a = b = 1$.',
    misconceptionCodes: ['linear-systems.variable-as-label'],
  },
  {
    id: 'linear-systems.write-eq-5',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 1,
    sequence: { family: 'linear-systems.write-an-equation', position: 5 },
    expect:
      'Same shopping trip and the same two letters, but this equation is about money instead of ' +
      'about how many things. Which numbers become the coefficients now — the counts, or the prices?',
    statement:
      'Kim paid $\\$25$ altogether for those 7 items. With $x$ the number of pens at $\\$4$ each ' +
      'and $y$ the number of notebooks at $\\$3$ each, write the equation for the money.',
    answer: { type: 'equation', lhs: '4x + 3y', rhs: '25', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Lay $\\$4$ beside every pen and $\\$3$ beside every notebook, then sweep all the money ' +
        'into one pile. What is the pile worth, in terms of $x$ and $y$?',
      pictorial:
        'Draw a bar in which each pen contributes a block worth 4 and each notebook a block worth ' +
        '3, braced at 25. The bar is no longer measuring objects — it is measuring dollars.',
      abstract:
        '$x$ pens at $\\$4$ each cost $4x$ dollars, $y$ notebooks at $\\$3$ each cost $3y$ ' +
        'dollars, and the two amounts add to 25.',
    },
    hints: [
      'How much do $x$ pens cost if one pen costs $\\$4$?',
      'Money equation: $4x$ dollars on pens plus $3y$ dollars on notebooks makes $\\$25$.',
    ],
    solution:
      'The pens cost $4x$ dollars and the notebooks $3y$ dollars, so\n\n$$4x + 3y = 25.$$\n\n' +
      'The prices are the coefficients here, where in the counting equation the coefficients were ' +
      'both 1. Same trip, same letters, two different equations — and together they pin the trip ' +
      'down to 4 pens and 3 notebooks.',
    misconceptionCodes: ['linear-systems.variable-as-label'],
  },
  {
    id: 'linear-systems.write-eq-6',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 1,
    sequence: { family: 'linear-systems.write-an-equation', position: 6 },
    expect:
      'This sentence compares the two counts instead of totalling them. Can a *difference* still ' +
      'be written in the form $ax + by = c$? If it can, what are $a$ and $b$?',
    statement:
      'On that same trip Kim bought 1 more pen than notebook. With $x$ the number of pens and $y$ ' +
      'the number of notebooks, write an equation that says so.',
    answer: { type: 'equation', lhs: 'x - y', rhs: '1', variables: ['x', 'y'] },
    cpaPrompts: {
      concrete:
        'Pair each notebook with a pen and push the pairs aside. What is left over on the table, ' +
        'and how many of it are there?',
      pictorial:
        'Draw the $x$ bar and the $y$ bar one above the other, aligned at the left. Mark the bit ' +
        'that sticks out — that overhang is the difference, and it is worth 1.',
      abstract:
        'Take the notebook count away from the pen count: $x - y$. The sentence says that ' +
        'difference is 1.',
    },
    hints: [
      '"1 more pen than notebook" compares the two counts. Which is the bigger one?',
      'Pens minus notebooks is 1. Write that with a minus sign.',
    ],
    solution:
      '$$x - y = 1.$$\n\nCheck with the answer from before, 4 pens and 3 notebooks: $4 - 3 = 1$. ' +
      '✓\n\nThis is still $ax + by = c$, with $a = 1$, $b = -1$ and $c = 1$. That is the pattern ' +
      'behind the whole sequence: totals, costs and differences are all the same kind of ' +
      'equation. Only the signs and what the letters measure change.',
    misconceptionCodes: ['linear-systems.variable-as-label'],
  },

  // ---- Tier 2: unfamiliar surfaces ----
  {
    id: 'linear-systems.find-partner-value',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 2,
    statement:
      'The equation $2x + 5y = 24$ records a bill: $x$ small drinks at $\\$2$ each and $y$ large ' +
      'drinks at $\\$5$ each, coming to $\\$24$. If $x = 7$, find $y$.',
    answer: { type: 'number', value: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Count out $\\$2$ seven times and put it aside — that is the small drinks paid for. How ' +
        'much of the $\\$24$ is left, and how many $\\$5$ drinks does it buy?',
      pictorial:
        'Draw the bar of 24 and shade off the part the small drinks take. Split the unshaded part ' +
        'into blocks worth 5 each.',
      abstract:
        'Substitute $x = 7$ into $2x + 5y = 24$, giving $14 + 5y = 24$, then solve for $y$.',
    },
    hints: [
      'Put 7 in place of $x$ and work out the value of that term.',
      '$14 + 5y = 24$, so $5y = 10$.',
    ],
    solution:
      'Substituting $x = 7$:\n\n$$2(7) + 5y = 24 \\implies 14 + 5y = 24 \\implies 5y = 10 ' +
      '\\implies y = 2.$$\n\nCheck: $\\$14$ on small drinks and $\\$10$ on large ones is ' +
      '$\\$24$. ✓ A single equation in two letters does not fix both — it only says how one ' +
      'depends on the other.',
    misconceptionCodes: ['linear-systems.variable-as-label'],
  },
  {
    id: 'linear-systems.test-a-pair',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 2,
    statement:
      'Does the pair $x = 5$, $y = 1$ satisfy the equation $3x + 2y = 16$? Answer yes or no.',
    answer: NO,
    cpaPrompts: {
      concrete:
        'Load a pan with 5 x-cups of 1 unit each and 1 y-cup, at the sizes claimed. Against 16 ' +
        'weights on the other pan, does it level or tip?',
      pictorial:
        'Draw three $x$-blocks of length 5 and two $y$-blocks of length 1 in a row. Is the bar ' +
        'exactly as long as a bar of 16?',
      abstract:
        'Put 5 in for $x$ and 1 in for $y$, work out $3x + 2y$, and compare the result with 16.',
    },
    hints: [
      'Substitute both values and work out the left-hand side.',
      '$3(5) + 2(1) = 15 + 2$. Is that 16?',
    ],
    solution:
      'Substituting: $3(5) + 2(1) = 15 + 2 = 17$, and $17 \\ne 16$.\n\nSo **no**, the pair is ' +
      'not a solution — it misses by 1. Testing a pair means putting it into the equation and ' +
      'seeing whether the two sides really do balance.',
    misconceptionCodes: ['linear-systems.unchecked-answer', 'linear-systems.variable-as-label'],
  },
  {
    id: 'linear-systems.taxi-formula',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 2,
    statement:
      'A taxi charges $\\$3.50$ the moment you get in, and then $\\$1.20$ for every kilometre ' +
      'travelled. Write an equation connecting the fare $\\$f$ and the distance $k$ kilometres.',
    answer: { type: 'equation', lhs: 'f', rhs: '1.2k + 3.5', variables: ['f', 'k'] },
    cpaPrompts: {
      concrete:
        'Put $\\$3.50$ in the meter before the taxi moves. Then add $\\$1.20$ for the first ' +
        'kilometre, the same again for the second. What is in the meter after $k$ kilometres?',
      pictorial:
        'Draw a bar beginning with a fixed block of 3.5, followed by $k$ equal blocks of 1.20 ' +
        'each. The whole bar is the fare.',
      abstract:
        'The distance part is $1.20 \\times k$ and the fixed part is $3.50$, so ' +
        '$f = 1.2k + 3.5$. The decimal coefficient changes nothing about the shape.',
    },
    hints: [
      'Which part of the fare is the same however far you go, and which part grows?',
      'The kilometres cost $1.2k$ dollars. Add the flat charge of 3.5 to that.',
    ],
    solution:
      'The distance charge is $\\$1.20$ per kilometre, so $k$ kilometres cost $1.2k$ dollars. ' +
      'The flag-fall of $\\$3.50$ is paid whatever happens, so\n\n$$f = 1.2k + 3.5.$$\n\n' +
      'Check with $k = 10$: $f = 12 + 3.5 = \\$15.50$. Rearranged, this is ' +
      '$1.2k - f = -3.5$ — still the familiar shape, decimals and all.',
    misconceptionCodes: ['linear-systems.variable-as-label'],
  },

  // ---- Tier 3: contexts that must be modelled first ----
  {
    id: 'linear-systems.write-the-equations',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 3,
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
  {
    id: 'linear-systems.tea-blend-coefficients',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 3,
    statement:
      'A shop makes a blend from two kinds of tea leaf. The cheaper leaf costs $\\$8$ a kilogram ' +
      'and the finer leaf $\\$14$ a kilogram. One batch weighs 20 kg, and the leaf that went into ' +
      'it was worth $\\$208$. Let $x$ be the mass in kilograms of cheaper leaf and $y$ the mass ' +
      'of finer leaf. Two equations describe the batch. State the two numbers on their ' +
      'right-hand sides, as a pair, with the mass equation first.',
    answer: { type: 'coordinates', x: 20, y: 208, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Tip the two kinds of leaf into one sack. Weigh the sack — that is one fact. Now add up ' +
        'what the shop paid for what is in it — that is a different fact about the same sack.',
      pictorial:
        'Draw two bars for the same batch. In the first, the blocks are kilograms and the brace ' +
        'reads 20. In the second, the blocks are dollars and the brace reads 208.',
      abstract:
        'Mass: $x + y = 20$. Money: $8x + 14y = 208$. Two independent sentences about one batch ' +
        'give two equations in the same two letters.',
    },
    hints: [
      'One sentence weighs the batch and one prices it. Write a separate equation for each.',
      'How much is $x$ kg of leaf worth at $\\$8$ a kilogram? And $y$ kg at $\\$14$?',
      'The mass equation is $x + y = 20$; the money equation is $8x + 14y = 208$.',
    ],
    solution:
      'Two independent facts, two equations:\n\n$$x + y = 20 \\quad \\text{(kilograms)}$$\n' +
      '$$8x + 14y = 208 \\quad \\text{(dollars)}$$\n\nSo the pair asked for is $(20, 208)$. The ' +
      'first equation counts mass and has coefficients of 1; the second measures money and has ' +
      'the prices as its coefficients. (Solving them would give 12 kg of cheaper leaf and 8 kg of ' +
      'finer leaf, but the modelling is the job here.)',
    misconceptionCodes: ['linear-systems.variable-as-label'],
  },

  // ---- Diagnostic ----
  {
    id: 'linear-systems.dx-variable-as-label',
    skillIds: ['linear-systems.model-real-world-relationships'],
    tier: 'diagnostic',
    statement:
      'A pen costs $\\$p$ and a ruler costs $\\$r$. The pen costs $\\$2$ more than the ruler. ' +
      'Write an equation connecting $p$ and $r$.',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$p = r + 2$' },
        { label: 'B', value: '$r = p + 2$', misconceptionCode: 'linear-systems.variable-as-label' },
        { label: 'C', value: '$p + r = 2$', misconceptionCode: 'linear-systems.sign-on-elimination' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Put the ruler on one pan and the pen on the other. The pen side is heavier. Which pan do ' +
        'you add the $\\$2$ weight to so that they level?',
      pictorial:
        'Draw the two prices as bars, one above the other, aligned at the left. Which bar is ' +
        'longer, and how long is the overhang?',
      abstract:
        'Which of $p$ and $r$ is the larger number? The 2 must be added to the smaller one to ' +
        'reach the larger.',
    },
    hints: [
      'The pen is the dearer one, so $p$ is the bigger number. Which side of your equation needs ' +
        'the extra 2?',
      'Try numbers: if the ruler costs $\\$3$, the pen costs $\\$5$. Test each equation with ' +
        '$r = 3$ and $p = 5$ and see which one is true.',
    ],
    solution:
      'The pen is dearer, so $p$ is the larger number and the $\\$2$ is added to the ruler to ' +
      'reach it:\n\n$$p = r + 2.$$\n\nCheck with $r = 3$: $p = 5$, and the pen is indeed $\\$2$ ' +
      'more. ✓\n\nWriting $r = p + 2$ comes from reading the letters as labels and copying the ' +
      "word order of the sentence — \"pen, 2 more, ruler\". But $p$ is not the word \"pen\"; it " +
      'is a number of dollars, and the bigger number has to end up on the bigger side. Writing ' +
      '$p + r = 2$ adds where the sentence compares: a difference of 2 is $p - r = 2$, not a ' +
      'total of 2.',
    misconceptionCodes: ['linear-systems.variable-as-label', 'linear-systems.sign-on-elimination'],
  },

  // =========================================================================
  // Skill 2 — solve a system by substitution, elimination or graphing
  // =========================================================================

  // ---- Tier 1a: family linear-systems.substitute-and-solve (6 items) ----
  // The second equation never moves. Only what is being substituted changes.
  {
    id: 'linear-systems.sub-1',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.substitute-and-solve', position: 1 },
    statement: 'Solve the simultaneous equations:\n$$y = x + 1$$\n$$2x + y = 13$$',
    answer: { type: 'coordinates', x: 4, y: 5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Set a $y$-cup on the pan. Equation (1) says it balances against one $x$-cup and one gram ' +
        'weight. Swap the $y$-cup for exactly that — does the pan move at all?',
      pictorial:
        'Draw the bar for $2x + y = 13$, then redraw it with the $y$-block replaced by an ' +
        '$x$-block and a 1-block. How many $x$-blocks are on the page now?',
      abstract:
        'Put $x + 1$ wherever $y$ stands in equation (2): $2x + (x + 1) = 13$. Solve for $x$, ' +
        'then use equation (1) to get $y$.',
    },
    hints: [
      'Equation (1) tells you what $y$ is worth in terms of $x$. Where in equation (2) can you put it?',
      'Replace $y$ with $(x + 1)$ to get $2x + x + 1 = 13$.',
      'That is $3x + 1 = 13$, so $3x = 12$. Find $x$, then $y = x + 1$.',
    ],
    solution:
      'Substituting $y = x + 1$ into $2x + y = 13$:\n\n$$2x + (x + 1) = 13 \\implies 3x + 1 = 13 ' +
      '\\implies 3x = 12 \\implies x = 4.$$\n\nThen $y = 4 + 1 = 5$. Check in (2): ' +
      '$2(4) + 5 = 13$. ✓\n\n$$(x, y) = (4, 5)$$',
    misconceptionCodes: ['linear-systems.partial-distribution'],
  },
  {
    id: 'linear-systems.sub-2',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.substitute-and-solve', position: 2 },
    expect:
      'The $+1$ in equation (1) has become $+4$. Equation (2) has not moved at all. Before you ' +
      'work it out: will $x$ come out bigger or smaller than the 4 you got last time?',
    statement: 'Solve the simultaneous equations:\n$$y = x + 4$$\n$$2x + y = 13$$',
    answer: { type: 'coordinates', x: 3, y: 7, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The $y$-cup now balances against one $x$-cup and four gram weights instead of one. Swap ' +
        'it in. There are more loose weights on the pan now — so fewer of the 13 are left for $x$.',
      pictorial:
        'Same bar of 13, but the block you swap in for $y$ carries a 4 instead of a 1. Redraw it ' +
        'and see how much of the bar the $x$-blocks are left with.',
      abstract:
        '$2x + (x + 4) = 13$, so $3x + 4 = 13$. The number of $x$-terms is unchanged; only the ' +
        'constant you carry across has grown.',
    },
    hints: [
      'Substitute exactly as before, but with $x + 4$ in place of $y$.',
      '$3x + 4 = 13$. Take the 4 across before you divide.',
    ],
    solution:
      '$$2x + (x + 4) = 13 \\implies 3x + 4 = 13 \\implies 3x = 9 \\implies x = 3,$$\n\nand ' +
      '$y = 3 + 4 = 7$. Check: $2(3) + 7 = 13$. ✓\n\n$$(x, y) = (3, 7)$$\n\nA bigger constant ' +
      'in equation (1) eats more of the 13, so less is left over and $x$ shrinks from 4 to 3.',
    misconceptionCodes: ['linear-systems.partial-distribution'],
  },
  {
    id: 'linear-systems.sub-3',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.substitute-and-solve', position: 3 },
    expect:
      'Now the $x$ inside equation (1) has a 2 in front of it, and the constant is back to $+1$. ' +
      'How many $x$-terms will there be after you substitute — three, as before, or four?',
    statement: 'Solve the simultaneous equations:\n$$y = 2x + 1$$\n$$2x + y = 13$$',
    answer: { type: 'coordinates', x: 3, y: 7, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'This time the $y$-cup balances two $x$-cups and one weight. Lift it off and set those ' +
        'three things down in its place. Count the $x$-cups on the pan now.',
      pictorial:
        'Redraw the bar of 13 with the $y$-block replaced by two $x$-blocks and a 1-block. The ' +
        'bar now shows four $x$-blocks and a single unit.',
      abstract:
        '$2x + (2x + 1) = 13$, so $4x + 1 = 13$. The coefficient of $x$ in the substituted ' +
        'equation is now $2 + 2$, not $2 + 1$.',
    },
    hints: [
      'Replace $y$ by $2x + 1$ and collect the $x$-terms.',
      'You have $2x$ from equation (2) and another $2x$ from the substitution: $4x + 1 = 13$.',
    ],
    solution:
      '$$2x + (2x + 1) = 13 \\implies 4x + 1 = 13 \\implies 4x = 12 \\implies x = 3,$$\n\nand ' +
      '$y = 2(3) + 1 = 7$. Check: $2(3) + 7 = 13$. ✓\n\n$$(x, y) = (3, 7)$$\n\nThe answer is the ' +
      'same as last time even though the first equation is a different line — the two lines ' +
      'happen to cross $2x + y = 13$ at the same place.',
    misconceptionCodes: ['linear-systems.partial-distribution'],
  },
  {
    id: 'linear-systems.sub-4',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.substitute-and-solve', position: 4 },
    expect:
      'The $+1$ has become $-3$: the first negative constant of the sequence. When you substitute, ' +
      'does that $-3$ get added to the 13 or taken away from it?',
    statement: 'Solve the simultaneous equations:\n$$y = 2x - 3$$\n$$2x + y = 13$$',
    answer: { type: 'coordinates', x: 4, y: 5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Now the $y$-cup is *lighter* than two $x$-cups — by three grams. Swapping it in puts two ' +
        '$x$-cups on the pan and takes three weights off. Which way does that push $x$?',
      pictorial:
        'Draw the bar of 13. The block replacing $y$ is two $x$-blocks with a 3 cut off the end. ' +
        'The missing 3 has to be given back to the other side.',
      abstract:
        '$2x + (2x - 3) = 13$, so $4x - 3 = 13$. Adding 3 to both sides gives $4x = 16$.',
    },
    hints: [
      'Substitute $2x - 3$ for $y$, brackets and all, and keep the minus sign attached to the 3.',
      '$4x - 3 = 13$. Add 3 to both sides before dividing.',
    ],
    solution:
      '$$2x + (2x - 3) = 13 \\implies 4x - 3 = 13 \\implies 4x = 16 \\implies x = 4,$$\n\nand ' +
      '$y = 2(4) - 3 = 5$. Check: $2(4) + 5 = 13$. ✓\n\n$$(x, y) = (4, 5)$$\n\nA negative ' +
      'constant leaves *more* of the 13 for the $x$-terms, so $x$ grows.',
    misconceptionCodes: ['linear-systems.partial-distribution', 'linear-systems.sign-on-elimination'],
  },
  {
    id: 'linear-systems.sub-5',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.substitute-and-solve', position: 5 },
    expect:
      'This time it is $x$ that is given in terms of $y$, not $y$ in terms of $x$. Which letter ' +
      'disappears when you substitute now, and which one will you find first?',
    statement: 'Solve the simultaneous equations:\n$$x = 2y - 11$$\n$$2x + y = 13$$',
    answer: { type: 'coordinates', x: 3, y: 7, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The cup you can lift off is the $x$-cup this time. Equation (1) says it balances two ' +
        '$y$-cups with 11 grams taken away. Replace *both* $x$-cups in equation (2) with that.',
      pictorial:
        'Redraw the bar of 13 with each of the two $x$-blocks swapped for two $y$-blocks less 11. ' +
        'Count the $y$-blocks: four from the swap, one already there.',
      abstract:
        '$2(2y - 11) + y = 13$. Multiply the bracket by 2 — both terms — to get $4y - 22 + y = 13$.',
    },
    hints: [
      'Equation (1) is solved for $x$, so substitute into the $x$ of equation (2) — and there are ' +
        'two of them.',
      '$2(2y - 11) + y = 13$. Expand the bracket carefully: $4y - 22$, not $4y - 11$.',
      '$5y - 22 = 13$, so $5y = 35$. Find $y$, then $x = 2y - 11$.',
    ],
    solution:
      '$$2(2y - 11) + y = 13 \\implies 4y - 22 + y = 13 \\implies 5y = 35 \\implies y = 7,$$\n\n' +
      'and $x = 2(7) - 11 = 3$. Check in (2): $2(3) + 7 = 13$. ✓\n\n$$(x, y) = (3, 7)$$\n\n' +
      'Substitution does not care which letter is on its own. Whatever is alone can be lifted out ' +
      'and put down elsewhere.',
    misconceptionCodes: ['linear-systems.partial-distribution'],
  },
  {
    id: 'linear-systems.sub-6',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.substitute-and-solve', position: 6 },
    expect:
      'Neither equation is written as "$y = \\ldots$" this time. Before solving anything: can you ' +
      'turn $y - 2x = 1$ into one of the first equations you have already met in this set?',
    statement: 'Solve the simultaneous equations:\n$$y - 2x = 1$$\n$$2x + y = 13$$',
    answer: { type: 'coordinates', x: 3, y: 7, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Nothing is sitting on its own on a pan yet. Move the two $x$-cups of equation (1) across ' +
        'to the other pan — adding the same thing to both sides keeps it level — and the $y$-cup ' +
        'is alone.',
      pictorial:
        'Draw equation (1) as a bar comparison: the $y$ bar is longer than the $2x$ bar by 1. ' +
        'Redrawn from the left, that says $y$ is two $x$-blocks plus 1.',
      abstract:
        'Add $2x$ to both sides of equation (1): $y = 2x + 1$. Now it is exactly the system you ' +
        'solved earlier, so substitute as before.',
    },
    hints: [
      'One equation has to be made ready before you can substitute. Which letter is easiest to ' +
        'get on its own?',
      'Add $2x$ to both sides of $y - 2x = 1$.',
      'That gives $y = 2x + 1$ — a system you have already solved in this set.',
    ],
    solution:
      'Rearrange equation (1): $y - 2x = 1 \\implies y = 2x + 1$. Substituting into (2):\n\n' +
      '$$2x + (2x + 1) = 13 \\implies 4x = 12 \\implies x = 3, \\quad y = 7.$$\n\n' +
      '$$(x, y) = (3, 7)$$\n\nThis is the third item of the set wearing different clothes: ' +
      '$y - 2x = 1$ and $y = 2x + 1$ are the same equation. That is the payoff — substitution ' +
      'never needs a system to arrive in the right form. You can always put it there yourself.',
    misconceptionCodes: ['linear-systems.partial-distribution'],
  },

  // ---- Tier 1b: family linear-systems.eliminate-and-solve (6 items) ----
  // Equation (1) is 3x + 2y = 16 throughout; only the partner equation changes.
  {
    id: 'linear-systems.elim-1',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.eliminate-and-solve', position: 1 },
    statement: 'Solve the simultaneous equations:\n$$3x + 2y = 16$$\n$$x + 2y = 8$$',
    answer: { type: 'coordinates', x: 4, y: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two balanced pans. Take one $x$-cup and both $y$-cups off the first pan, and take 8 ' +
        'weights off the other. That is exactly equation (2) removed. What is left on each side?',
      pictorial:
        'Lay the two bars against each other from the left. The $2y$ portion is identical in ' +
        'both, so it cancels by sight. What is the leftover strip, and what is it worth?',
      abstract:
        'Both equations contain $2y$, so subtracting removes it: $(3x + 2y) - (x + 2y) = 16 - 8$.',
    },
    hints: [
      'Look at the $y$-terms in the two equations. What do you notice about them?',
      'Subtract equation (2) from equation (1) — the left-hand sides *and* the right-hand sides.',
      '$3x - x = 2x$ and $16 - 8 = 8$, so $2x = 8$.',
    ],
    solution:
      'Both equations have $2y$, so subtracting kills it:\n\n$$(3x + 2y) - (x + 2y) = 16 - 8 ' +
      '\\implies 2x = 8 \\implies x = 4.$$\n\nSubstituting into (2): $4 + 2y = 8$, so $y = 2$. ' +
      'Check in (1): $3(4) + 2(2) = 16$. ✓\n\n$$(x, y) = (4, 2)$$',
    misconceptionCodes: ['linear-systems.one-sided-elimination'],
    figure: bars3x2y16,
  },
  {
    id: 'linear-systems.elim-2',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.eliminate-and-solve', position: 2 },
    expect:
      'Last time the two $y$-terms matched. This time it is the two $x$-terms that match instead. ' +
      'Which letter will vanish when you subtract, and which one will you find first?',
    statement: 'Solve the simultaneous equations:\n$$3x + 2y = 16$$\n$$3x + y = 11$$',
    answer: { type: 'coordinates', x: 2, y: 5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Both pans start with three $x$-cups. Take those three off each first equation pan and ' +
        'the matching three off the second — the difference between the two situations is one ' +
        '$y$-cup and 5 weights.',
      pictorial:
        'Draw the two bars aligned at the left. The first $3x$ of each is identical; the strip ' +
        'sticking out of the longer bar is a single $y$-block.',
      abstract:
        'Subtracting removes the $3x$: $(3x + 2y) - (3x + y) = 16 - 11$, leaving $y = 5$.',
    },
    hints: [
      'Which terms are identical in the two equations this time?',
      'Subtract: $2y - y = y$ and $16 - 11 = 5$.',
    ],
    solution:
      '$(3x + 2y) - (3x + y) = 16 - 11$, so\n\n$$y = 5.$$\n\nSubstituting into (2): ' +
      '$3x + 5 = 11$, so $3x = 6$ and $x = 2$. Check in (1): $3(2) + 2(5) = 16$. ✓\n\n' +
      '$$(x, y) = (2, 5)$$\n\nIt does not matter which letter has the matching coefficient; ' +
      'subtracting removes whichever one it is.',
    misconceptionCodes: ['linear-systems.one-sided-elimination'],
  },
  {
    id: 'linear-systems.elim-3',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.eliminate-and-solve', position: 3 },
    expect:
      'This one runs backwards: you are told what is *left* after the subtraction and asked what ' +
      'went into it. If subtracting the two $x$-terms has to leave $2x$, what must $3 - k$ be?',
    statement:
      'Subtracting one equation from the other removes the $y$ terms from $3x + 2y = 16$ and ' +
      '$kx + 2y = 10$, and leaves $2x = 6$. Find the value of $k$.',
    answer: { type: 'number', value: 1, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Both pans hold two $y$-cups, so those come off cleanly. What comes off with them is $k$ ' +
        '$x$-cups from three — and two are left standing.',
      pictorial:
        'Draw the first bar with three $x$-blocks, the second with an unknown number. The leftover ' +
        'strip after lining them up is two $x$-blocks long.',
      abstract:
        'Subtracting gives $(3 - k)x = 16 - 10 = 6$. You are told the result is $2x = 6$, so ' +
        '$3 - k = 2$.',
    },
    hints: [
      'Do the subtraction with $k$ left as a letter. What is the coefficient of $x$ afterwards?',
      'The right-hand side checks out: $16 - 10 = 6$. So all that is left is $3 - k = 2$.',
    ],
    solution:
      'Subtracting the second equation from the first:\n\n$$(3 - k)x + 0y = 16 - 10 = 6.$$\n\n' +
      'We are told this is $2x = 6$, so $3 - k = 2$ and\n\n$$k = 1.$$\n\nCheck: subtracting ' +
      '$x + 2y = 10$ from $3x + 2y = 16$ does give $2x = 6$. ✓ Reading the subtraction backwards ' +
      'like this is the quickest test of whether you really know what elimination does.',
    misconceptionCodes: ['linear-systems.one-sided-elimination'],
  },
  {
    id: 'linear-systems.elim-4',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.eliminate-and-solve', position: 4 },
    expect:
      'Nothing matches now: the $y$-terms are $2y$ and $y$, and the $x$-terms are $3x$ and $x$. ' +
      'What could you do to the whole of equation (2) so that something does match?',
    statement: 'Solve the simultaneous equations:\n$$3x + 2y = 16$$\n$$x + y = 7$$',
    answer: { type: 'coordinates', x: 2, y: 5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Build the second situation twice over on one pan: two $x$-cups and two $y$-cups, ' +
        'balanced by 14 weights. Nothing has been cheated — twice a balanced pan is still balanced.',
      pictorial:
        'Draw the second bar again at double length underneath. It now shares its $2y$ portion ' +
        'with the first bar, so the two can be laid against each other.',
      abstract:
        'Multiply every term of equation (2) by 2: $2x + 2y = 14$. Now the $y$-terms match and ' +
        'you can subtract.',
    },
    hints: [
      'To match $2y$, what must you multiply $y$ by? And what else in that equation must you ' +
        'multiply by the same number?',
      'Doubling equation (2) gives $2x + 2y = 14$ — right-hand side included.',
      'Subtract $2x + 2y = 14$ from $3x + 2y = 16$ to get $x = 2$.',
    ],
    solution:
      'Double equation (2): $2x + 2y = 14 \\quad (3)$. Subtracting (3) from (1):\n\n' +
      '$$(3x + 2y) - (2x + 2y) = 16 - 14 \\implies x = 2.$$\n\nThen $2 + y = 7$, so $y = 5$. ' +
      'Check in (1): $3(2) + 2(5) = 16$. ✓\n\n$$(x, y) = (2, 5)$$\n\nScaling an equation does ' +
      'not change what it says; it only redraws it at a size that can be compared.',
    misconceptionCodes: ['linear-systems.one-sided-elimination'],
    figure: barsScaledSecond,
  },
  {
    id: 'linear-systems.elim-5',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.eliminate-and-solve', position: 5 },
    expect:
      'Neither $2y$ nor $5y$ divides into the other. Will one multiplication be enough this time, ' +
      'or will both equations have to be scaled? What number will the $y$-terms have to reach?',
    statement: 'Solve the simultaneous equations:\n$$3x + 2y = 16$$\n$$2x + 5y = 29$$',
    answer: { type: 'coordinates', x: 2, y: 5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Build the first situation five times over and the second twice over. Both pans now carry ' +
        'ten $y$-cups, so those ten can be taken off each side together.',
      pictorial:
        'Draw the first bar five times and the second twice. Each long bar now ends in the same ' +
        'block of ten $y$-blocks; the difference between them is all $x$.',
      abstract:
        '$5 \\times (3x + 2y = 16)$ gives $15x + 10y = 80$; $2 \\times (2x + 5y = 29)$ gives ' +
        '$4x + 10y = 58$. Subtract to remove $10y$.',
    },
    hints: [
      'What is the smallest number that both 2 and 5 go into?',
      'Multiply equation (1) by 5 and equation (2) by 2, so that both have $10y$.',
      '$15x + 10y = 80$ minus $4x + 10y = 58$ gives $11x = 22$.',
    ],
    solution:
      '$(1) \\times 5$: $15x + 10y = 80$. $(2) \\times 2$: $4x + 10y = 58$. Subtracting:\n\n' +
      '$$11x = 22 \\implies x = 2.$$\n\nThen $3(2) + 2y = 16$, so $2y = 10$ and $y = 5$. Check ' +
      'in (2): $2(2) + 5(5) = 29$. ✓\n\n$$(x, y) = (2, 5)$$\n\nWhen neither coefficient is a ' +
      'multiple of the other, scale both to their lowest common multiple.',
    misconceptionCodes: ['linear-systems.one-sided-elimination'],
  },
  {
    id: 'linear-systems.elim-6',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.eliminate-and-solve', position: 6 },
    expect:
      'Equation (2) now has $-2y$ where every earlier one had $+2y$. Subtracting made *matching* ' +
      'terms cancel. What will make $+2y$ and $-2y$ cancel — subtracting, or adding?',
    statement: 'Solve the simultaneous equations:\n$$3x + 2y = 16$$\n$$2x - 2y = 4$$',
    answer: { type: 'coordinates', x: 4, y: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Pour both balanced pans together into one pair of pans: five $x$-cups, two $y$-cups added ' +
        'and two taken away, against 20 weights. The $y$-cups undo each other completely.',
      pictorial:
        'Draw the surplus $2y$ of the first bar and the shortfall $2y$ of the second. Placed ' +
        'together they fill each other exactly, leaving only $x$-blocks.',
      abstract:
        'Adding the equations: $(3x + 2y) + (2x - 2y) = 16 + 4$, and $2y + (-2y) = 0$.',
    },
    hints: [
      'Work out $2y + (-2y)$ and then $2y - (-2y)$. Which one is zero?',
      'The signs are opposite, so *add* the two equations: $5x = 20$.',
    ],
    solution:
      'The $y$-terms have opposite signs, so adding removes them:\n\n$$(3x + 2y) + (2x - 2y) = ' +
      '16 + 4 \\implies 5x = 20 \\implies x = 4.$$\n\nThen $3(4) + 2y = 16$, so $y = 2$. Check ' +
      'in (2): $2(4) - 2(2) = 4$. ✓\n\n$$(x, y) = (4, 2)$$\n\nThat is the rule the whole ' +
      'sequence has been building to: **matching signs cancel by subtracting, opposite signs ' +
      'cancel by adding.** Ask what the two terms add to before you choose the operation, and ' +
      'you will never pick the wrong one.',
    misconceptionCodes: ['linear-systems.sign-on-elimination', 'linear-systems.one-sided-elimination'],
  },

  // ---- Tier 1c: family linear-systems.read-the-intersection (6 items) ----
  {
    id: 'linear-systems.graph-1',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.read-the-intersection', position: 1 },
    statement:
      'The lines $y = x + 1$ and $y = -x + 5$ are drawn on the grid. Write down the solution of ' +
      'the two equations, as a pair of values $x$ and $y$.',
    answer: { type: 'coordinates', x: 2, y: 3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay two rulers on the grid along the two lines. There is exactly one spot where both ' +
        'rulers touch the paper at once. Put your finger on it and read off where it is.',
      pictorial:
        'Every point on the first line makes $y = x + 1$ true, and every point on the second ' +
        'makes $y = -x + 5$ true. Which point is on both lines?',
      abstract:
        'The solution of a pair of equations is the point that satisfies both, which on a graph ' +
        'is where the two lines cross.',
    },
    hints: [
      'Find the one point that lies on both lines.',
      'Read across to the $x$-axis and down to the $y$-axis from the crossing point.',
    ],
    solution:
      'The lines cross at $(2, 3)$, so\n\n$$x = 2, \\quad y = 3.$$\n\nCheck in both equations: ' +
      '$3 = 2 + 1$ ✓ and $3 = -2 + 5$ ✓. Every point on a line makes its equation true, so the ' +
      'crossing point is the one place both equations hold at once.',
    misconceptionCodes: ['linear-systems.unchecked-answer'],
    figure: {
      kind: 'coordinate_plane',
      title: 'Two lines on one grid',
      caption: 'Where do they meet?',
      xMin: -2,
      xMax: 8,
      yMin: -2,
      yMax: 8,
      gridStep: 1,
      curves: [
        { type: 'linear', m: 1, c: 1, label: 'y = x + 1' },
        { type: 'linear', m: -1, c: 5, label: 'y = -x + 5' },
      ],
    },
  },
  {
    id: 'linear-systems.graph-2',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.read-the-intersection', position: 2 },
    expect:
      'The first line has been made steeper — a gradient of 2 instead of 1 — while the second has ' +
      'not moved at all. Predict: will the crossing point move, and if so, which way?',
    statement:
      'The lines $y = 2x - 1$ and $y = -x + 5$ are drawn on the grid. Write down the solution of ' +
      'the two equations.',
    answer: { type: 'coordinates', x: 2, y: 3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Pin one ruler at the crossing point of the last question and swing it steeper. Does it ' +
        'still touch that same point? A steeper line through the same point crosses in the same ' +
        'place.',
      pictorial:
        'The new line starts lower on the $y$-axis, at $-1$ instead of $1$, but climbs twice as ' +
        'fast. Trace it across and see where it meets the other line.',
      abstract:
        'Setting the two right-hand sides equal: $2x - 1 = -x + 5$, so $3x = 6$ and $x = 2$.',
    },
    hints: [
      'Look for the point that is on both lines, exactly as before.',
      'Check your reading algebraically: $2x - 1 = -x + 5$.',
    ],
    solution:
      'The lines still cross at $(2, 3)$:\n\n$$x = 2, \\quad y = 3.$$\n\nAlgebraically, ' +
      '$2x - 1 = -x + 5 \\implies 3x = 6 \\implies x = 2$, and then $y = 3$. Changing a line ' +
      'changes the picture, but if the new line happens to pass through the old crossing point, ' +
      'the solution is unchanged.',
    misconceptionCodes: ['linear-systems.unchecked-answer'],
    figure: {
      kind: 'coordinate_plane',
      title: 'A steeper first line',
      caption: 'The second line is exactly where it was.',
      xMin: -2,
      xMax: 8,
      yMin: -4,
      yMax: 8,
      gridStep: 1,
      curves: [
        { type: 'linear', m: 2, c: -1, label: 'y = 2x - 1' },
        { type: 'linear', m: -1, c: 5, label: 'y = -x + 5' },
      ],
    },
  },
  {
    id: 'linear-systems.graph-3',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.read-the-intersection', position: 3 },
    expect:
      'Only the second line has changed: $y = -x + 5$ has become $y = -x + 8$, so it has slid 3 ' +
      'units up the page. Which way will the crossing point move — left, right, up or down?',
    statement:
      'The lines $y = 2x - 1$ and $y = -x + 8$ are drawn on the grid. Write down the solution of ' +
      'the two equations.',
    answer: { type: 'coordinates', x: 3, y: 5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Slide the second ruler 3 units up the page without turning it. The crossing point runs ' +
        'along the first ruler as you do — up and to the right.',
      pictorial:
        'The second line is parallel to the one in the last question, three units higher. Follow ' +
        'the first line up until it meets the new position.',
      abstract:
        '$2x - 1 = -x + 8 \\implies 3x = 9 \\implies x = 3$, and $y = 2(3) - 1 = 5$.',
    },
    hints: [
      'Read the crossing point off the grid, then confirm it in both equations.',
      'Set the right-hand sides equal: $2x - 1 = -x + 8$.',
    ],
    solution:
      'The lines cross at $(3, 5)$:\n\n$$x = 3, \\quad y = 5.$$\n\nCheck: $5 = 2(3) - 1$ ✓ and ' +
      '$5 = -3 + 8$ ✓. Raising one line pushes the crossing point up the *other* line, so both ' +
      'coordinates change even though only one equation did.',
    misconceptionCodes: ['linear-systems.unchecked-answer'],
    figure: {
      kind: 'coordinate_plane',
      title: 'The second line, three units higher',
      caption: 'Only the constant term of the second equation has changed.',
      xMin: -2,
      xMax: 8,
      yMin: -4,
      yMax: 10,
      gridStep: 1,
      curves: [
        { type: 'linear', m: 2, c: -1, label: 'y = 2x - 1' },
        { type: 'linear', m: -1, c: 8, label: 'y = -x + 8' },
      ],
    },
  },
  {
    id: 'linear-systems.graph-4',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.read-the-intersection', position: 4 },
    expect:
      'Only the second line has moved again, this time a long way down to $y = -x - 7$. Will the ' +
      'crossing point still be in the top right quarter of the grid, where every earlier one was?',
    statement:
      'The lines $y = 2x - 1$ and $y = -x - 7$ are drawn on the grid. Write down the solution of ' +
      'the two equations.',
    answer: { type: 'coordinates', x: -2, y: -5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Slide the second ruler far down the page. The crossing point slides back along the first ' +
        'ruler, past the origin, into the corner where both readings are negative.',
      pictorial:
        'Follow the first line down and to the left. Read the crossing point off the grid, ' +
        'remembering that left of the $y$-axis means a negative $x$.',
      abstract:
        '$2x - 1 = -x - 7 \\implies 3x = -6 \\implies x = -2$, and $y = 2(-2) - 1 = -5$.',
    },
    hints: [
      'The crossing point is below and to the left of the origin, so expect two negative numbers.',
      'Set the right-hand sides equal: $2x - 1 = -x - 7$, so $3x = -6$.',
    ],
    solution:
      '$$2x - 1 = -x - 7 \\implies 3x = -6 \\implies x = -2,$$\n\nand $y = 2(-2) - 1 = -5$. ' +
      'Check in the second equation: $-(-2) - 7 = 2 - 7 = -5$ ✓.\n\n$$x = -2, \\quad y = -5$$\n\n' +
      'Nothing about the method changes when the answer is negative; only the quarter of the ' +
      'grid you read it from.',
    misconceptionCodes: ['linear-systems.unchecked-answer'],
    figure: {
      kind: 'coordinate_plane',
      title: 'A crossing point below the axes',
      caption: 'The second line has slid a long way down.',
      xMin: -6,
      xMax: 6,
      yMin: -12,
      yMax: 8,
      gridStep: 1,
      curves: [
        { type: 'linear', m: 2, c: -1, label: 'y = 2x - 1' },
        { type: 'linear', m: -1, c: -7, label: 'y = -x - 7' },
      ],
    },
  },
  {
    id: 'linear-systems.graph-5',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.read-the-intersection', position: 5 },
    expect:
      'No graph is given this time, and neither equation is written as "$y = \\ldots$". Before ' +
      'you start: what is the quickest way to get two points on a line like $x + y = 6$?',
    statement:
      'By drawing both lines on a grid, solve the simultaneous equations:\n$$x + y = 6$$\n' +
      '$$y - x = 2$$',
    answer: { type: 'coordinates', x: 2, y: 4, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Find two points on each line by trial: for $x + y = 6$, pick $x = 0$ and then $x = 6$, ' +
        'and mark both. Two pins are enough to lay a ruler.',
      pictorial:
        'Make a small table for each equation, plot the points, and draw the two lines right ' +
        'across the grid. Mark the point where they cross.',
      abstract:
        'Rearranged, the lines are $y = 6 - x$ and $y = x + 2$. Where they meet, ' +
        '$6 - x = x + 2$.',
    },
    hints: [
      'For each equation, find the value of $y$ when $x = 0$ and again when $x = 4$. That gives ' +
        'you two points per line.',
      'Draw both lines and read off where they cross, then check the point in both equations.',
      'Algebraically: $6 - x = x + 2$, so $2x = 4$.',
    ],
    solution:
      'For $x + y = 6$: when $x = 0$, $y = 6$; when $x = 6$, $y = 0$. For $y - x = 2$: when ' +
      '$x = 0$, $y = 2$; when $x = 4$, $y = 6$. Drawing both lines, they cross at $(2, 4)$.\n\n' +
      '$$x = 2, \\quad y = 4$$\n\nCheck: $2 + 4 = 6$ ✓ and $4 - 2 = 2$ ✓. A table of two points ' +
      'is enough to draw any straight line, whatever form the equation arrives in.',
    misconceptionCodes: ['linear-systems.unchecked-answer'],
  },
  {
    id: 'linear-systems.graph-6',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 1,
    sequence: { family: 'linear-systems.read-the-intersection', position: 6 },
    expect:
      'These two lines have the same gradient, 2, but different intercepts. Before you draw ' +
      'anything — how many times can two lines like that cross?',
    statement:
      'How many points do the lines $y = 2x + 1$ and $y = 2x - 3$ have in common? Give a number.',
    answer: { type: 'number', value: 0, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay two rulers on the grid at exactly the same slope, one a little above the other. Push ' +
        'them as far as you like along the page — do their edges ever touch?',
      pictorial:
        'Plot both lines from a short table. Every point of one is exactly 4 units above the ' +
        'matching point of the other, all the way across.',
      abstract:
        'Setting them equal gives $2x + 1 = 2x - 3$, so $1 = -3$ — false for every $x$, so there ' +
        'is no solution.',
    },
    hints: [
      'Try to solve them algebraically: put $2x + 1 = 2x - 3$ and see what happens to the $x$.',
      'Every $x$ gives a $y$ on the second line exactly 4 less than on the first. Can they ever be equal?',
    ],
    solution:
      'Setting the two expressions for $y$ equal:\n\n$$2x + 1 = 2x - 3 \\implies 1 = -3,$$\n\n' +
      'which is false whatever $x$ is. So the lines never meet and the answer is\n\n$$0.$$\n\n' +
      'That is the payoff of this set: the number of solutions is the number of crossing points. ' +
      'Equal gradients and different intercepts mean parallel lines, no crossing, and no ' +
      'solution — and the algebra says so by collapsing to a statement with no $x$ in it at all.',
    misconceptionCodes: ['linear-systems.sign-on-elimination'],
  },

  // ---- Tier 2: unfamiliar surfaces ----
  {
    id: 'linear-systems.fraction-coefficients',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 2,
    statement:
      'Solve the simultaneous equations:\n$$\\frac{x}{2} + \\frac{y}{3} = 4$$\n$$x + y = 9$$',
    answer: { type: 'coordinates', x: 6, y: 3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Halves and thirds are awkward to lay on a pan. Build the first situation six times over ' +
        'instead: six halves of $x$ is $3x$, six thirds of $y$ is $2y$, and six fours is 24.',
      pictorial:
        'Draw the first bar with the $x$ block cut in half and the $y$ block cut in three. Redraw ' +
        'the whole bar six times as long and every piece becomes whole.',
      abstract:
        'Multiply equation (1) through by 6 to clear the fractions: $3x + 2y = 24$. Then solve ' +
        'that with $x + y = 9$ by elimination as usual.',
    },
    hints: [
      'Fractions with denominators 2 and 3 — what single number clears both?',
      'Multiply every term of equation (1) by 6: $3x + 2y = 24$.',
      'Double equation (2) to get $2x + 2y = 18$, then subtract.',
    ],
    solution:
      'Clear the fractions first. $(1) \\times 6$: $3x + 2y = 24 \\quad (3)$. Doubling (2): ' +
      '$2x + 2y = 18 \\quad (4)$. Subtracting (4) from (3):\n\n$$x = 6.$$\n\nThen $6 + y = 9$, ' +
      'so $y = 3$. Check in the original (1): $\\frac{6}{2} + \\frac{3}{3} = 3 + 1 = 4$ ✓.\n\n' +
      '$$(x, y) = (6, 3)$$\n\nFractions never change the method — they are cleared first and the ' +
      'system that is left is an ordinary one.',
    misconceptionCodes: ['linear-systems.one-sided-elimination'],
  },
  {
    id: 'linear-systems.negative-solution',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 2,
    statement: 'Solve the simultaneous equations:\n$$2x + y = -1$$\n$$x - y = -5$$',
    answer: { type: 'coordinates', x: -2, y: 3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'A balance cannot hold a negative number of cups, so work on the number line instead: ' +
        'mark $2x + y$ at $-1$ and $x - y$ at $-5$ and ask what $x$ would put both there.',
      pictorial:
        'On a grid, both lines cross the axes on the negative side. Sketch them roughly and see ' +
        'that their meeting point sits to the left of the $y$-axis.',
      abstract:
        'The $y$-terms are $+y$ and $-y$ — opposite signs, so add: $3x = -6$.',
    },
    hints: [
      'Look at the two $y$-terms. Do they have matching signs or opposite signs?',
      'Opposite signs, so add the equations: $(2x + y) + (x - y) = -1 + (-5)$.',
      '$3x = -6$. Careful with the sign when you divide.',
    ],
    solution:
      'The $y$-terms are opposite, so adding removes them:\n\n$$(2x + y) + (x - y) = -1 + (-5) ' +
      '\\implies 3x = -6 \\implies x = -2.$$\n\nSubstituting into (1): $-4 + y = -1$, so $y = 3$. ' +
      'Check in (2): $-2 - 3 = -5$ ✓.\n\n$$(x, y) = (-2, 3)$$\n\nA negative answer is not a ' +
      'mistake to be corrected. Check it in both original equations; here it satisfies each one.',
    misconceptionCodes: ['linear-systems.sign-on-elimination'],
  },
  {
    id: 'linear-systems.same-line-twice',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 2,
    statement:
      'How many pairs of values $(x, y)$ satisfy both $2x + 3y = 12$ and $4x + 6y = 24$? Answer ' +
      'in words: "one", "none" or "infinitely many".',
    answer: {
      type: 'exact',
      value: 'infinitely many',
      accepts: [
        'infinite',
        'infinitely many solutions',
        'infinitely many pairs',
        'an infinite number',
        'infinite number',
        'infinitely many points',
      ],
    },
    cpaPrompts: {
      concrete:
        'Build the first situation on the pans, then build it a second time on top. The second ' +
        'equation is nothing but the first one done twice — it carries no new information.',
      pictorial:
        'Plot a few points of each: $(0, 4)$, $(3, 2)$, $(6, 0)$ satisfy both. Draw both lines and ' +
        'they land exactly on top of one another.',
      abstract:
        'Try to eliminate: doubling (1) gives $4x + 6y = 24$, which is (2) exactly. Subtracting ' +
        'leaves $0 = 0$, true for every pair on the line.',
    },
    hints: [
      'Multiply the first equation by 2 and compare it with the second.',
      'They are the same equation. So how many points lie on the line $2x + 3y = 12$?',
    ],
    solution:
      'Doubling the first equation gives $4x + 6y = 24$ — which *is* the second equation. ' +
      'Eliminating leaves $0 = 0$, true for every pair, so the two lines are one and the same ' +
      'line and every point on it works:\n\n$$\\textbf{infinitely many}.$$\n\nThree collapse ' +
      'cases are worth knowing apart: one crossing point (one solution), parallel lines ' +
      '($0 = $ something non-zero, no solution), and the same line twice ($0 = 0$, infinitely ' +
      'many).',
    misconceptionCodes: ['linear-systems.one-sided-elimination'],
  },

  // ---- Tier 3: contexts, no method named ----
  {
    id: 'linear-systems.river-crossing',
    skillIds: ['linear-systems.solve-simultaneous-linear', 'linear-systems.formulate-solve-applied'],
    tier: 3,
    statement:
      'A boat covers the 24 km down a river in 2 hours, and the same 24 km back up it in 3 hours. ' +
      'The river flows at a steady speed and the engine is set the same both ways. Find the speed ' +
      'of the boat in still water and the speed of the river, both in km/h.',
    answer: { type: 'coordinates', x: 10, y: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Walk down a moving walkway and your speed over the ground is your own plus the ' +
        "walkway's. Walk back against it and it is your own minus the walkway's. What are the " +
        "boat's two ground speeds here?",
      pictorial:
        'Draw two bars on one scale: the downstream bar is the boat block plus the river block; ' +
        'the upstream bar is the boat block with the river block cut off the end.',
      abstract:
        'Speed $=$ distance $\\div$ time gives 12 km/h down and 8 km/h up. With $b$ for the boat ' +
        'and $r$ for the river, $b + r = 12$ and $b - r = 8$.',
    },
    hints: [
      'Work out the two speeds over the ground first: 24 km in 2 hours, and 24 km in 3 hours.',
      'Going with the river the two speeds add; going against it they subtract. Write one ' +
        'equation for each direction.',
      '$b + r = 12$ and $b - r = 8$. Adding removes $r$.',
    ],
    solution:
      'Downstream: $24 \\div 2 = 12$ km/h. Upstream: $24 \\div 3 = 8$ km/h. With $b$ the boat ' +
      "speed in still water and $r$ the river's speed,\n\n$$b + r = 12, \\qquad b - r = 8.$$\n\n" +
      'Adding: $2b = 20$, so $b = 10$. Then $r = 2$. Check: with the river, $10 + 2 = 12$ km/h, ' +
      'and 24 km takes 2 hours ✓; against it, $10 - 2 = 8$ km/h, and 24 km takes 3 hours ✓.\n\n' +
      'Boat 10 km/h, river 2 km/h.',
    misconceptionCodes: ['linear-systems.unchecked-answer', 'linear-systems.variable-as-label'],
  },
  {
    id: 'linear-systems.coin-jar',
    skillIds: ['linear-systems.solve-simultaneous-linear', 'linear-systems.formulate-solve-applied'],
    tier: 3,
    statement:
      'A jar holds only 20-cent and 50-cent coins. There are 30 coins in it and they are worth ' +
      '$\\$11.40$ altogether. How many of each are there? Give the number of 20-cent coins first.',
    answer: { type: 'coordinates', x: 12, y: 18, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Tip the coins out and count them: 30. Now stack them by value and count the money: ' +
        '$\\$11.40$. Two different counts of the same pile, and neither alone tells you the mix.',
      pictorial:
        'Draw two bars. In the first, every coin is one block and the brace reads 30. In the ' +
        'second, the blocks are worth 20 and 50 and the brace reads 1140 cents.',
      abstract:
        'With $x$ twenties and $y$ fifties: $x + y = 30$ and $20x + 50y = 1140$ in cents. Two ' +
        'facts about the same jar, two equations.',
    },
    hints: [
      'What two different things is the question telling you about the same jar?',
      'Let $x$ be the number of 20-cent coins and $y$ the number of 50-cent coins. One equation ' +
        'counts the coins; the other adds up their value — work in cents to avoid decimals.',
      '$x + y = 30$ and $20x + 50y = 1140$. Multiply the first by 20 and subtract.',
    ],
    solution:
      'Let $x$ be the number of 20-cent coins and $y$ the number of 50-cent coins, and work in ' +
      'cents:\n\n$$x + y = 30 \\quad (1)$$\n$$20x + 50y = 1140 \\quad (2)$$\n\n$(1) \\times 20$: ' +
      '$20x + 20y = 600$. Subtracting from (2): $30y = 540$, so $y = 18$ and $x = 12$.\n\n' +
      'Check: 30 coins ✓, and $12(20) + 18(50) = 240 + 900 = 1140$ cents $= \\$11.40$ ✓.\n\n' +
      'Twelve 20-cent coins and eighteen 50-cent coins.',
    misconceptionCodes: ['linear-systems.unchecked-answer', 'linear-systems.one-sided-elimination'],
  },

  // ---- Tier 4: the SSDD set on 3x + 2y = 16 ----
  // Same equation in every item; each asks for different mathematics.
  {
    id: 'linear-systems.substitution-basic',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 4,
    sequence: { family: 'linear-systems.ssdd-3x-2y-16', position: 1 },
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
    id: 'linear-systems.ssdd-value-at-x',
    skillIds: [
      'linear-systems.model-real-world-relationships',
      'linear-systems.solve-simultaneous-linear',
    ],
    tier: 4,
    sequence: { family: 'linear-systems.ssdd-3x-2y-16', position: 2 },
    statement: 'For the equation $3x + 2y = 16$, find the value of $y$ when $x = 2$.',
    answer: { type: 'number', value: 5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Set each of the three $x$-cups to 2 grams. That is 6 grams accounted for on a pan that ' +
        'has to reach 16. How much is left for the two $y$-cups to share?',
      pictorial:
        'Draw the bar of 16 and shade the part the three $x$-blocks take once each is worth 2. ' +
        'Split what is unshaded into two equal $y$-blocks.',
      abstract:
        'Substitute $x = 2$ into $3x + 2y = 16$: $6 + 2y = 16$, then solve the one-variable ' +
        'equation that is left.',
    },
    hints: [
      'Only one equation this time, and one of the two letters is already known.',
      'Put 2 in for $x$: $6 + 2y = 16$, so $2y = 10$.',
    ],
    solution:
      'Substituting $x = 2$:\n\n$$3(2) + 2y = 16 \\implies 6 + 2y = 16 \\implies 2y = 10 ' +
      '\\implies y = 5.$$\n\nSame equation as the last item, but a different job: there, a second ' +
      'equation pinned $x$ down for you; here you are handed $x$ and asked only to finish the ' +
      'arithmetic. One equation in two letters never fixes both — it only links them.',
    misconceptionCodes: ['linear-systems.variable-as-label'],
  },
  {
    id: 'linear-systems.ssdd-gradient',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 4,
    sequence: { family: 'linear-systems.ssdd-3x-2y-16', position: 3 },
    statement: 'Find the gradient of the line $3x + 2y = 16$.',
    answer: { type: 'number', value: -1.5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Find two points on the line by trial — try $x = 0$ and $x = 2$ — and walk between them ' +
        'on the grid. How far up or down do you go for every one step across?',
      pictorial:
        'Plot $(0, 8)$ and $(2, 5)$ and draw the step triangle between them: 2 across, 3 down. ' +
        'Gradient is the down-or-up divided by the across.',
      abstract:
        'Rearrange into the form $y = mx + c$: $2y = 16 - 3x$, so $y = -\\frac{3}{2}x + 8$ and ' +
        'the gradient is the coefficient of $x$.',
    },
    hints: [
      'The gradient can only be read straight off when the equation is in the form $y = mx + c$.',
      'Make $y$ the subject: $2y = -3x + 16$, then divide *everything* by 2.',
    ],
    solution:
      'Rearranging:\n\n$$3x + 2y = 16 \\implies 2y = -3x + 16 \\implies y = -\\frac{3}{2}x + 8.$$' +
      '\n\nSo the gradient is\n\n$$m = -\\frac{3}{2} = -1.5.$$\n\nCheck against two points: ' +
      '$(0, 8)$ and $(2, 5)$ give a fall of 3 over a run of 2. ✓ The same equation as the other ' +
      'items in this set, but nothing here is being *solved* — it is being read.',
    misconceptionCodes: ['linear-systems.variable-as-label'],
  },
  {
    id: 'linear-systems.ssdd-axis-crossing',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 4,
    sequence: { family: 'linear-systems.ssdd-3x-2y-16', position: 4 },
    statement:
      'Find the coordinates of the point where the line $3x + 2y = 16$ crosses the $y$-axis.',
    answer: { type: 'coordinates', x: 0, y: 8, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Walk along the line until you are standing exactly on the vertical axis. What is your ' +
        'distance from that axis at that moment — in other words, what is $x$?',
      pictorial:
        'Sketch the axes and the line. Mark the point where it cuts the vertical axis, and read ' +
        'off both coordinates of that point.',
      abstract:
        'Every point on the $y$-axis has $x = 0$. Put $x = 0$ into $3x + 2y = 16$ and solve for $y$.',
    },
    hints: [
      'What is special about the $x$-coordinate of every point on the $y$-axis?',
      'Set $x = 0$: $2y = 16$.',
    ],
    solution:
      'On the $y$-axis, $x = 0$. Substituting:\n\n$$3(0) + 2y = 16 \\implies 2y = 16 \\implies ' +
      'y = 8.$$\n\nSo the line crosses at\n\n$$(0, 8).$$\n\n(By the same trick, setting $y = 0$ ' +
      'gives $3x = 16$ and a crossing of the $x$-axis at $\\left(\\frac{16}{3}, 0\\right)$.) ' +
      'Four questions, one equation: solve a system, evaluate, find a gradient, find an ' +
      'intercept. The surface is identical every time; deciding *what is being asked* is the ' +
      'whole skill.',
    misconceptionCodes: ['linear-systems.variable-as-label'],
  },

  // ---- Diagnostics ----
  {
    id: 'linear-systems.dx-partial-distribution',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 'diagnostic',
    statement:
      'Substitute $y = 2x - 3$ into $3x + 2y = 16$ and collect the terms. What equation in $x$ ' +
      'do you get?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$7x - 3 = 16$', misconceptionCode: 'linear-systems.partial-distribution' },
        { label: 'B', value: '$7x - 6 = 16$' },
        { label: 'C', value: '$7x + 6 = 16$', misconceptionCode: 'linear-systems.sign-on-elimination' },
      ],
    },
    cpaPrompts: {
      concrete:
        'You have *two* of the bracket, not two of its first block. Build $(2x - 3)$ twice on the ' +
        'pan: how many $x$-cups, and how many weights come off?',
      pictorial:
        'Draw the bracket $(2x - 3)$ side by side with a copy of itself. Count everything on the ' +
        'page — the $x$-blocks and the pieces cut away.',
      abstract:
        'The 2 outside the bracket multiplies every term inside it: $2 \\times 2x$ and ' +
        '$2 \\times (-3)$.',
    },
    hints: [
      'Write it out with the bracket first: $3x + 2(2x - 3) = 16$. What does the 2 reach?',
      'Two lots of $-3$ is $-6$, not $-3$ and not $+6$.',
    ],
    solution:
      '$$3x + 2(2x - 3) = 3x + 4x - 6 = 7x - 6,$$\n\nso the equation is $7x - 6 = 16$ (giving ' +
      '$x = \\frac{22}{7}$ — the numbers are deliberately unfriendly so that only the expansion ' +
      'is being tested).\n\nAnswering $7x - 3$ means the 2 was applied to the $2x$ and then ' +
      'forgotten before the $-3$: the bracket is one object repeated, so everything inside it is ' +
      'doubled. Answering $7x + 6$ means the doubling was done but the sign was dropped along ' +
      'the way: $2 \\times (-3)$ is $-6$.',
    misconceptionCodes: ['linear-systems.partial-distribution', 'linear-systems.sign-on-elimination'],
  },
  {
    id: 'linear-systems.dx-one-sided-elimination',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 'diagnostic',
    statement:
      'Equation (3) is $10a + 4c = 104$ and equation (1) is $3a + 4c = 48$. Subtract equation (1) ' +
      'from equation (3). What equation in $a$ do you get?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$7a = 104$', misconceptionCode: 'linear-systems.one-sided-elimination' },
        { label: 'B', value: '$7a = 56$' },
        { label: 'C', value: '$7a = 152$', misconceptionCode: 'linear-systems.sign-on-elimination' },
      ],
    },
    cpaPrompts: {
      concrete:
        'You have taken three $a$-cups and four $c$-cups off the left pan. What exactly did you ' +
        'take off the right pan to keep the whole thing level?',
      pictorial:
        'Lay the shorter bar against the longer one from the left. The leftover strip is seven ' +
        '$a$-blocks — and it is worth the difference between the two braces, not one whole brace.',
      abstract:
        'Subtracting means subtracting on both sides: $10a - 3a$ on the left and $104 - 48$ on ' +
        'the right.',
    },
    hints: [
      'Do the left-hand sides first, then ask what happens to the numbers on the right.',
      'An equation is a balance. If you take $3a + 4c$ off one side, you must take its value, 48, ' +
        'off the other.',
    ],
    solution:
      'Subtracting term by term:\n\n$$(10a - 3a) + (4c - 4c) = 104 - 48 \\implies 7a = 56,$$\n\n' +
      'so $a = 8$.\n\nAnswering $7a = 104$ means the left-hand sides were subtracted and the ' +
      'right-hand sides were not — the balance was tipped. Answering $7a = 152$ means the left ' +
      'was subtracted but the right was added: one operation, applied consistently, is the whole ' +
      'discipline of elimination.',
    misconceptionCodes: ['linear-systems.one-sided-elimination', 'linear-systems.sign-on-elimination'],
  },
  {
    id: 'linear-systems.dx-sign-on-elimination',
    skillIds: ['linear-systems.solve-simultaneous-linear'],
    tier: 'diagnostic',
    statement:
      'The equations $5x + 12y = 39$ and $2x - 12y = 4$ are to be combined so that the $y$ terms ' +
      'disappear. What equation in $x$ does that give?',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$7x = 43$' },
        { label: 'B', value: '$3x + 24y = 35$', misconceptionCode: 'linear-systems.sign-on-elimination' },
        { label: 'C', value: '$7x = 39$', misconceptionCode: 'linear-systems.one-sided-elimination' },
      ],
    },
    cpaPrompts: {
      concrete:
        'One pan has twelve $y$-cups added; the other has twelve taken away. Pour the two ' +
        'situations together — do the $y$-cups pile up, or cancel out?',
      pictorial:
        'Draw the surplus of twelve $y$-blocks and the gap of twelve $y$-blocks. Slid together, ' +
        'do they fill each other exactly or make a gap twice as wide?',
      abstract:
        'Work out $12y + (-12y)$ and $12y - (-12y)$. Only one of them is zero, and that tells ' +
        'you which operation to use.',
    },
    hints: [
      'What is $12y + (-12y)$? And what is $12y - (-12y)$?',
      'The signs are opposite, so the two equations must be added — right-hand sides included.',
    ],
    solution:
      'The $y$-terms have opposite signs, so they cancel when the equations are **added**:\n\n' +
      '$$(5x + 12y) + (2x - 12y) = 39 + 4 \\implies 7x = 43.$$\n\nSubtracting instead gives ' +
      '$3x + 24y = 35$ — the $y$ has not gone anywhere, which is the tell. Adding the left-hand ' +
      'sides but keeping only one right-hand side gives $7x = 39$, which unbalances the equation.' +
      '\n\nThe rule: matching signs cancel by subtracting, opposite signs cancel by adding.',
    misconceptionCodes: ['linear-systems.sign-on-elimination', 'linear-systems.one-sided-elimination'],
  },

  // =========================================================================
  // Skill 3 — formulate and solve applied problems
  // =========================================================================

  // ---- Tier 1: family linear-systems.same-story-new-numbers (6 items) ----
  // One story, one structure. Only the numbers move, so the shape of the pair of
  // equations is seen to be a property of the *situation*, not of the arithmetic.
  {
    id: 'linear-systems.story-1',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 1,
    sequence: { family: 'linear-systems.same-story-new-numbers', position: 1 },
    statement:
      'A stall at the school fair sells adult tickets at $\\$3$ and child tickets at $\\$2$. On ' +
      'Monday it sold 10 tickets altogether and took $\\$26$. How many adult tickets and how many ' +
      'child tickets did it sell? Give the number of adult tickets first.',
    answer: { type: 'coordinates', x: 6, y: 4, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay out 10 counters for the 10 tickets. If every one were a child ticket the takings ' +
        'would be $\\$20$. Turn one counter over to make it an adult ticket — what happens to the ' +
        'takings?',
      pictorial:
        'Draw two bars for the same 10 tickets. In the first, each ticket is one block and the ' +
        'brace reads 10. In the second, the blocks are worth 3 and 2 and the brace reads 26.',
      abstract:
        'With $a$ adult tickets and $c$ child tickets: $a + c = 10$ counts them and ' +
        '$3a + 2c = 26$ prices them.',
    },
    hints: [
      'The question tells you two different things about the same 10 tickets. Write an equation ' +
        'for each.',
      'Let $a$ be the number of adult tickets and $c$ the number of child tickets: $a + c = 10$ ' +
        'and $3a + 2c = 26$.',
      'Double the counting equation to get $2a + 2c = 20$ and subtract it from the money equation.',
    ],
    solution:
      'Let $a$ and $c$ be the numbers of adult and child tickets.\n\n$$a + c = 10 \\quad (1)$$\n' +
      '$$3a + 2c = 26 \\quad (2)$$\n\n$(1) \\times 2$: $2a + 2c = 20$. Subtracting from (2): ' +
      '$a = 6$, so $c = 4$.\n\nCheck against the words: 6 adult and 4 child is 10 tickets ✓, and ' +
      '$6(3) + 4(2) = 18 + 8 = \\$26$ ✓.\n\n6 adult, 4 child.',
    misconceptionCodes: ['linear-systems.unchecked-answer', 'linear-systems.variable-as-label'],
  },
  {
    id: 'linear-systems.story-2',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 1,
    sequence: { family: 'linear-systems.same-story-new-numbers', position: 2 },
    expect:
      'Everything is the same as Monday except the takings: $\\$26$ has become $\\$27$. One extra ' +
      'dollar from the same 10 tickets — what must have changed about the mix?',
    statement:
      'The same stall sells adult tickets at $\\$3$ and child tickets at $\\$2$. On Tuesday it ' +
      'sold 10 tickets altogether and took $\\$27$. How many of each did it sell? Give the number ' +
      'of adult tickets first.',
    answer: { type: 'coordinates', x: 7, y: 3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Take Monday\'s 10 counters — 6 adult, 4 child — and turn one child counter over into an ' +
        'adult one. The count is still 10. By how much do the takings go up?',
      pictorial:
        'The counting bar is unchanged at 10. Only the brace on the money bar moves, from 26 to 27.',
      abstract:
        'Same pair of equations with a new constant: $a + c = 10$ and $3a + 2c = 27$.',
    },
    hints: [
      'Only one number in your two equations changes. Which one?',
      '$a + c = 10$ and $3a + 2c = 27$. Solve exactly as before.',
    ],
    solution:
      '$$a + c = 10, \\qquad 3a + 2c = 27.$$\n\nDoubling the first gives $2a + 2c = 20$; ' +
      'subtracting leaves $a = 7$, so $c = 3$.\n\nCheck: 10 tickets ✓, and ' +
      '$7(3) + 3(2) = 21 + 6 = \\$27$ ✓.\n\n7 adult, 3 child. Swapping one child ticket for one ' +
      'adult ticket raises the takings by exactly $\\$1$ — the difference between the two prices.',
    misconceptionCodes: ['linear-systems.unchecked-answer'],
  },
  {
    id: 'linear-systems.story-3',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 1,
    sequence: { family: 'linear-systems.same-story-new-numbers', position: 3 },
    expect:
      'The takings have dropped to $\\$24$, two dollars below Monday\'s. Use the pattern you have ' +
      'just seen to predict the mix before you work it out.',
    statement:
      'The same stall sells adult tickets at $\\$3$ and child tickets at $\\$2$. On Wednesday it ' +
      'sold 10 tickets altogether and took $\\$24$. How many of each did it sell? Give the number ' +
      'of adult tickets first.',
    answer: { type: 'coordinates', x: 4, y: 6, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Start from all ten counters being child tickets, worth $\\$20$. Each counter you turn ' +
        'over adds $\\$1$. How many do you have to turn to reach $\\$24$?',
      pictorial:
        'The counting bar is still 10 blocks. The money bar has shrunk to 24 — two blocks shorter ' +
        'than Monday.',
      abstract:
        '$a + c = 10$ and $3a + 2c = 24$. Only the right-hand side of the money equation has moved.',
    },
    hints: [
      'Write the same two equations with 24 in place of 26.',
      'Subtracting $2a + 2c = 20$ from $3a + 2c = 24$ gives $a$ directly.',
    ],
    solution:
      '$$a + c = 10, \\qquad 3a + 2c = 24.$$\n\n$(1) \\times 2$ is $2a + 2c = 20$; subtracting ' +
      'from the money equation gives $a = 4$, so $c = 6$.\n\nCheck: ' +
      '$4(3) + 6(2) = 12 + 12 = \\$24$ ✓.\n\n4 adult, 6 child. The pattern holds: the number of ' +
      'adult tickets is always the takings minus $\\$20$ — because $\\$20$ is what ten child ' +
      'tickets would cost, and every adult ticket adds one dollar to that.',
    misconceptionCodes: ['linear-systems.unchecked-answer'],
  },
  {
    id: 'linear-systems.story-4',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 1,
    sequence: { family: 'linear-systems.same-story-new-numbers', position: 4 },
    expect:
      'This time the number of tickets changes too: 12 tickets for $\\$32$. Which of your two ' +
      'equations has to be rewritten, and which one only changes its right-hand side?',
    statement:
      'The same stall sells adult tickets at $\\$3$ and child tickets at $\\$2$. On Thursday it ' +
      'sold 12 tickets altogether and took $\\$32$. How many of each did it sell? Give the number ' +
      'of adult tickets first.',
    answer: { type: 'coordinates', x: 8, y: 4, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Twelve counters now. All child would be $\\$24$; each turn-over adds $\\$1$. How many ' +
        'turn-overs reach $\\$32$?',
      pictorial:
        'Both braces move this time: the counting bar reads 12 and the money bar reads 32.',
      abstract:
        '$a + c = 12$ and $3a + 2c = 32$. The structure of the pair is untouched — only its ' +
        'numbers are new.',
    },
    hints: [
      'Both totals are different from before, but the two equations still say the same two things.',
      '$a + c = 12$ and $3a + 2c = 32$. Double the first and subtract.',
    ],
    solution:
      '$$a + c = 12, \\qquad 3a + 2c = 32.$$\n\n$(1) \\times 2$: $2a + 2c = 24$. Subtracting ' +
      'from (2): $a = 8$, so $c = 4$.\n\nCheck: 12 tickets ✓ and ' +
      '$8(3) + 4(2) = 24 + 8 = \\$32$ ✓.\n\n8 adult, 4 child. Notice how little of the working ' +
      'changed: the *shape* of the solution belongs to the story, not to the numbers in it.',
    misconceptionCodes: ['linear-systems.unchecked-answer'],
  },
  {
    id: 'linear-systems.story-5',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 1,
    sequence: { family: 'linear-systems.same-story-new-numbers', position: 5 },
    expect:
      'Now the prices change: adult tickets have gone up to $\\$4$. Which numbers in your ' +
      'equations are the prices — the coefficients, or the totals?',
    statement:
      'The stall raises its adult ticket to $\\$4$, keeping child tickets at $\\$2$. On Friday it ' +
      'sold 10 tickets altogether and took $\\$34$. How many of each did it sell? Give the number ' +
      'of adult tickets first.',
    answer: { type: 'coordinates', x: 7, y: 3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Ten counters again, but now each turn-over from child to adult adds $\\$2$ instead of ' +
        '$\\$1$. Starting from $\\$20$, how many turn-overs reach $\\$34$?',
      pictorial:
        'The counting bar is unchanged at 10 blocks, but on the money bar the adult blocks are ' +
        'now twice the size of the child blocks.',
      abstract:
        '$a + c = 10$ and $4a + 2c = 34$. The price is the coefficient, so it is the coefficient ' +
        'that moves.',
    },
    hints: [
      'Which part of the money equation carries the price of a ticket?',
      '$a + c = 10$ and $4a + 2c = 34$. Double the counting equation and subtract.',
    ],
    solution:
      '$$a + c = 10, \\qquad 4a + 2c = 34.$$\n\n$(1) \\times 2$: $2a + 2c = 20$. Subtracting: ' +
      '$2a = 14$, so $a = 7$ and $c = 3$.\n\nCheck: $7(4) + 3(2) = 28 + 6 = \\$34$ ✓.\n\n' +
      '7 adult, 3 child. Prices live in the coefficients and totals live on the right; changing ' +
      'a price changes what you multiply by, not what you add up to.',
    misconceptionCodes: ['linear-systems.unchecked-answer', 'linear-systems.variable-as-label'],
  },
  {
    id: 'linear-systems.story-6',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 1,
    sequence: { family: 'linear-systems.same-story-new-numbers', position: 6 },
    expect:
      'Back to $\\$3$ and $\\$2$ with 10 tickets, but the takings are now $\\$30$. Before working ' +
      'anything out: what is the most that 10 of these tickets could ever bring in?',
    statement:
      'The stall returns to $\\$3$ adult and $\\$2$ child tickets. On Saturday it sold 10 tickets ' +
      'altogether and took $\\$30$. How many of each did it sell? Give the number of adult ' +
      'tickets first.',
    answer: { type: 'coordinates', x: 10, y: 0, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Ten counters, all child, is $\\$20$; every turn-over adds $\\$1$. Keep turning until you ' +
        'reach $\\$30$ — and count how many counters are left unturned.',
      pictorial:
        'The money bar of 30 splits into ten blocks of 3 with nothing left over. There is no room ' +
        'for a block of 2 anywhere in it.',
      abstract:
        '$a + c = 10$ and $3a + 2c = 30$. Solving gives $a = 10$, which forces $c = 0$.',
    },
    hints: [
      'What would the takings be if every one of the 10 tickets were an adult ticket?',
      'Solve $a + c = 10$ with $3a + 2c = 30$ and see what value of $c$ comes out.',
    ],
    solution:
      '$$a + c = 10, \\qquad 3a + 2c = 30.$$\n\n$(1) \\times 2$: $2a + 2c = 20$. Subtracting: ' +
      '$a = 10$, and then $c = 0$.\n\nCheck: $10(3) + 0(2) = \\$30$ ✓.\n\n10 adult, 0 child — ' +
      'and that is the payoff of the whole set. Ten tickets can only ever bring in between ' +
      '$\\$20$ (all child) and $\\$30$ (all adult), one dollar apart for each ticket swapped. ' +
      'The takings alone therefore fix the mix, and $\\$30$ is the very top of the range. Any ' +
      'figure outside $\\$20$ to $\\$30$ would mean the stall had counted something wrongly.',
    misconceptionCodes: ['linear-systems.unchecked-answer'],
  },

  // ---- Tier 2: unfamiliar surfaces ----
  {
    id: 'linear-systems.ages-now',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 2,
    statement:
      'Mira is three times as old as her brother Ben. In 6 years\' time she will be twice as old ' +
      'as he is then. How old are they now? Give Mira\'s age first.',
    answer: { type: 'coordinates', x: 18, y: 6, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Cut a strip for Ben\'s age and lay three of them end to end for Mira. Now add the same ' +
        '6 cm to each of the two ages — the strips grow by the same amount, not by the same ratio.',
      pictorial:
        'Draw two bars, Ben one block and Mira three. Add an equal 6-block to the end of each, ' +
        'then compare: the long bar must be exactly twice the short one.',
      abstract:
        'Let $m$ and $b$ be their ages now. Then $m = 3b$, and in six years ' +
        '$m + 6 = 2(b + 6)$.',
    },
    hints: [
      'Name the two ages now, and write an equation for the sentence about today.',
      'In 6 years Mira is $m + 6$ and Ben is $b + 6$. Write the second sentence with those.',
      'Substitute $m = 3b$ into $m + 6 = 2(b + 6)$ and expand the bracket fully.',
    ],
    solution:
      'Let $m$ be Mira\'s age and $b$ be Ben\'s, both now.\n\n$$m = 3b \\quad (1)$$\n' +
      '$$m + 6 = 2(b + 6) \\quad (2)$$\n\nSubstituting (1) into (2): $3b + 6 = 2b + 12$, so ' +
      '$b = 6$ and $m = 18$.\n\nCheck against the words: 18 is three times 6 ✓; in six years they ' +
      'are 24 and 12, and 24 is twice 12 ✓.\n\nMira 18, Ben 6. The trap is to add 6 to only one ' +
      'of them — time passes for both.',
    misconceptionCodes: ['linear-systems.partial-distribution', 'linear-systems.unchecked-answer'],
  },
  {
    id: 'linear-systems.three-drink-sizes',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 2,
    statement:
      'A café sells small, medium and large drinks. A medium costs $\\$0.50$ more than a small. A ' +
      'large costs $\\$1$ more than a medium. A small and a large together cost $\\$5.50$. How ' +
      'much does a small drink cost, in dollars?',
    answer: { type: 'number', value: 2, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay three strips in a row, each a little longer than the last: small, then small plus ' +
        '50c, then that plus another dollar. How much longer is the third strip than the first?',
      pictorial:
        'Draw the small bar. Draw the large bar directly beneath it as the small bar plus a block ' +
        'of 0.50 and a block of 1. Together the two bars are 5.50 long.',
      abstract:
        'Three unknowns, but two of them can be written in terms of the first: $m = s + 0.5$ and ' +
        '$\\ell = m + 1 = s + 1.5$. Then $s + \\ell = 5.5$ has only one letter in it.',
    },
    hints: [
      'Three sizes, but you do not need three letters. Write the medium and the large in terms of ' +
        'the small.',
      'A large is $\\$1.50$ more than a small, so $s + (s + 1.5) = 5.5$.',
    ],
    solution:
      'Let $s$ be the price of a small in dollars. Then a medium is $s + 0.5$ and a large is ' +
      '$(s + 0.5) + 1 = s + 1.5$. The last sentence gives\n\n$$s + (s + 1.5) = 5.5 \\implies ' +
      '2s = 4 \\implies s = 2.$$\n\nSo a small is $\\$2$, a medium $\\$2.50$ and a large ' +
      '$\\$3.50$. Check: $\\$2 + \\$3.50 = \\$5.50$ ✓.\n\nA third quantity is not a third ' +
      'unknown when it is tied to the others by a stated relationship.',
    misconceptionCodes: ['linear-systems.unchecked-answer', 'linear-systems.variable-as-label'],
  },
  {
    id: 'linear-systems.sale-prices',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 2,
    statement:
      'A shirt and a pair of shoes together cost $\\$120$. In a sale the price of the shirt is cut ' +
      'by 20% and the price of the shoes by 10%, and the two together now cost $\\$105$. Find the ' +
      'original price of each. Give the shirt first.',
    answer: { type: 'coordinates', x: 30, y: 90, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Put $\\$120$ on the table split into two piles, shirt and shoes. Take a fifth off one ' +
        'pile and a tenth off the other. The $\\$15$ that has gone tells you how the piles were ' +
        'split.',
      pictorial:
        'Draw one bar of 120 split into a shirt part and a shoes part. Under it, draw the same ' +
        'split with 20% shaved off the first part and 10% off the second, braced at 105.',
      abstract:
        'With $s$ and $h$ the original prices: $s + h = 120$, and after the cuts ' +
        '$0.8s + 0.9h = 105$.',
    },
    hints: [
      'If a price is cut by 20%, what fraction of it is left? And by 10%?',
      '$s + h = 120$ and $0.8s + 0.9h = 105$. Substitute $h = 120 - s$ into the second.',
      '$0.8s + 0.9(120 - s) = 105$. Expand the bracket fully before collecting.',
    ],
    solution:
      'Let $s$ and $h$ be the original prices in dollars.\n\n$$s + h = 120 \\quad (1)$$\n' +
      '$$0.8s + 0.9h = 105 \\quad (2)$$\n\nFrom (1), $h = 120 - s$. Substituting into (2): ' +
      '$0.8s + 108 - 0.9s = 105$, so $-0.1s = -3$ and $s = 30$. Then $h = 90$.\n\nCheck: the ' +
      'shirt falls to $\\$24$ and the shoes to $\\$81$, and $24 + 81 = \\$105$ ✓.\n\nShirt ' +
      '$\\$30$, shoes $\\$90$.',
    misconceptionCodes: ['linear-systems.partial-distribution', 'linear-systems.unchecked-answer'],
  },

  // ---- Tier 3: varied contexts ----
  {
    id: 'linear-systems.elimination-tickets',
    skillIds: [
      'linear-systems.formulate-solve-applied',
      'linear-systems.solve-simultaneous-linear',
    ],
    tier: 3,
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
    figure: barsTickets,
  },
  {
    id: 'linear-systems.swapped-digits',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 3,
    statement:
      'The two digits of a certain number between 10 and 99 add up to 11. Writing the same two ' +
      'digits the other way round gives a number 27 larger than the original. What is the ' +
      'original number?',
    answer: { type: 'number', value: 47, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Write a two-digit number on two cards, one digit per card, and swap them. The digits are ' +
        'the same objects — only the column each sits in has changed, and a column is worth ten ' +
        'times its neighbour.',
      pictorial:
        'Draw the number as $t$ bundles of ten and $u$ loose ones. Swapping makes it $u$ bundles ' +
        'of ten and $t$ loose ones. Which picture has more, and by how much?',
      abstract:
        'The number is $10t + u$ and the swapped one is $10u + t$. The two sentences give ' +
        '$t + u = 11$ and $10u + t = 10t + u + 27$.',
    },
    hints: [
      'A two-digit number with tens digit $t$ and units digit $u$ is worth $10t + u$, not $tu$.',
      'Write the swapped number the same way, then set it 27 more than the original.',
      '$10u + t - (10t + u) = 27$ simplifies to $9u - 9t = 27$, so $u - t = 3$.',
    ],
    solution:
      'Let $t$ be the tens digit and $u$ the units digit, so the number is $10t + u$.\n\n' +
      '$$t + u = 11 \\quad (1)$$\n$$10u + t = 10t + u + 27 \\implies 9u - 9t = 27 \\implies ' +
      'u - t = 3 \\quad (2)$$\n\nAdding (1) and (2): $2u = 14$, so $u = 7$ and $t = 4$.\n\n' +
      'The number is $\\mathbf{47}$. Check: $4 + 7 = 11$ ✓, and $74 - 47 = 27$ ✓.\n\nSwapping ' +
      'the digits of a two-digit number always changes it by a multiple of 9, which is why the ' +
      '27 collapsed so neatly.',
    misconceptionCodes: ['linear-systems.variable-as-label', 'linear-systems.unchecked-answer'],
  },
  {
    id: 'linear-systems.pen-perimeter',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 3,
    statement:
      'A rectangular pen for chickens is fenced all the way round with 34 m of wire. Its longer ' +
      'side is 5 m more than its shorter side. Find the area of the pen, in square metres.',
    answer: { type: 'number', value: 66, tolerance: 0, unit: 'm^2' },
    cpaPrompts: {
      concrete:
        'Lay a 34 m loop of string on the ground and pull it into a rectangle. Walking all the way ' +
        'round covers each side twice — so walking one long side and one short side covers half ' +
        'the wire.',
      pictorial:
        'Draw the rectangle with the short side as one block and the long side as that block plus ' +
        'a piece of 5. Two of each make up the 34.',
      abstract:
        'With $\\ell$ and $w$ the two side lengths: $2\\ell + 2w = 34$, so $\\ell + w = 17$, and ' +
        '$\\ell - w = 5$. Area is $\\ell w$, found only after both are known.',
    },
    hints: [
      'The wire goes right round, so it covers each of the four sides. What does one long side plus ' +
        'one short side come to?',
      '$\\ell + w = 17$ and $\\ell - w = 5$. Adding removes $w$.',
      'Once you have both side lengths, the question asks for the area, not the sides.',
    ],
    solution:
      'The wire is the perimeter, so $2\\ell + 2w = 34$ and hence\n\n$$\\ell + w = 17, \\qquad ' +
      '\\ell - w = 5.$$\n\nAdding: $2\\ell = 22$, so $\\ell = 11$ and $w = 6$. The question asks ' +
      'for the area:\n\n$$A = 11 \\times 6 = 66 \\text{ m}^2.$$\n\nCheck: the perimeter is ' +
      '$2(11) + 2(6) = 34$ m ✓ and $11 - 6 = 5$ ✓. Solving the system is only part of the job — ' +
      'the last step is answering the question that was actually asked.',
    misconceptionCodes: ['linear-systems.unchecked-answer', 'linear-systems.variable-as-label'],
  },

  // ---- Tier 4: a solution the situation refuses ----
  {
    id: 'linear-systems.impossible-takings',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 4,
    statement:
      'The fair stall sells adult tickets at $\\$3$ and child tickets at $\\$2$. The seller ' +
      'reports 12 tickets sold and $\\$40$ taken. Show that the report cannot be right, and state ' +
      'the largest amount that 12 of these tickets could possibly have brought in.',
    answer: { type: 'number', value: 36, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Put out 12 counters and make them all adult tickets — the most valuable arrangement ' +
        'there is. Count the money. Can any other arrangement of 12 counters beat it?',
      pictorial:
        'Draw the money bar for 12 tickets twice: once with every block worth 2, once with every ' +
        'block worth 3. Every real Saturday lies between those two bars.',
      abstract:
        'Solving $a + c = 12$ with $3a + 2c = 40$ gives $a = 16$, which is more tickets than were ' +
        'sold. The algebra is fine; the situation rejects the answer.',
    },
    hints: [
      'Set the problem up as usual and solve it. Then look hard at the number you get for the ' +
        'adult tickets.',
      '$a + c = 12$ and $3a + 2c = 40$ give $a = 16$ — but only 12 tickets were sold in total, so ' +
        '$c$ would have to be $-4$.',
      'For the second part: which ticket brings in more? What if all 12 were that kind?',
    ],
    solution:
      'Let $a$ and $c$ be the numbers of adult and child tickets.\n\n$$a + c = 12, \\qquad ' +
      '3a + 2c = 40.$$\n\nDoubling the first gives $2a + 2c = 24$; subtracting leaves $a = 16$, ' +
      'and then $c = 12 - 16 = -4$. A stall cannot sell $-4$ child tickets, so the report is ' +
      'impossible — the algebra is correct and the *situation* is what rejects it.\n\nThe most 12 ' +
      'tickets could bring in is 12 adult tickets:\n\n$$12 \\times 3 = \\$36.$$\n\nThe possible ' +
      'takings run from $\\$24$ (all child) to $\\$36$ (all adult), and $\\$40$ is outside that ' +
      'range — which could have been spotted before any algebra was done at all.',
    misconceptionCodes: ['linear-systems.unchecked-answer'],
  },

  // ---- Diagnostic ----
  {
    id: 'linear-systems.dx-unchecked-answer',
    skillIds: ['linear-systems.formulate-solve-applied'],
    tier: 'diagnostic',
    statement:
      'Find the pair of values $x$ and $y$ that fits both $x + 4y = 33$ and $x + y = 12$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$x = 9,\\ y = 6$', misconceptionCode: 'linear-systems.unchecked-answer' },
        { label: 'B', value: '$x = 5,\\ y = 7$' },
        { label: 'C', value: '$x = 1,\\ y = 11$', misconceptionCode: 'linear-systems.one-sided-elimination' },
      ],
    },
    cpaPrompts: {
      concrete:
        'A pair has to level *both* balances, not just the first one you happen to try. Test each ' +
        'candidate on both pans before you commit to it.',
      pictorial:
        'Draw both bars for each candidate pair. A pair that fills the first bar exactly but ' +
        'overshoots or falls short on the second is not a solution.',
      abstract:
        'Subtracting the second equation from the first gives $3y = 21$ — right-hand sides ' +
        'included — so $y = 7$ and $x = 5$. Then check the pair in *both* originals.',
    },
    hints: [
      'Subtract one equation from the other, taking care to subtract the numbers on the right as ' +
        'well as the terms on the left.',
      'Whatever pair you get, put it into both equations before you decide. A pair that only fits ' +
        'one of them is not a solution.',
    ],
    solution:
      'Subtracting $x + y = 12$ from $x + 4y = 33$:\n\n$$3y = 21 \\implies y = 7, \\qquad x = 5.$$' +
      '\n\nCheck in both: $5 + 4(7) = 33$ ✓ and $5 + 7 = 12$ ✓.\n\nThe pair $x = 9$, $y = 6$ fits ' +
      'the first equation perfectly — $9 + 24 = 33$ — and fails the second, $9 + 6 = 15$. That is ' +
      'exactly what an unchecked answer looks like: right against the equation you happened to ' +
      'test, wrong against the one you did not. The pair $x = 1$, $y = 11$ comes from subtracting ' +
      'the left-hand sides but not the right, giving $3y = 33$ instead of $3y = 21$.',
    misconceptionCodes: ['linear-systems.unchecked-answer', 'linear-systems.one-sided-elimination'],
  },
];
