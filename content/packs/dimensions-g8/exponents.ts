import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';

/**
 * Unit 1 — Exponents and Scientific Notation. Hand-authored.
 *
 * Source: docs/Implementation Manual §2 (paper folding, place-value discs) and the Chapter 1
 * worked examples in the content spec. Problem bank per docs/PROBLEM-SET-GUIDE.md §5, Unit 1.
 *
 * The through-line for the whole unit: an exponent counts *how many factors*, never what to
 * multiply by. Nearly every error here — $2^5 \cdot 2^{-2} = 4^3$, $2^3 = 6$, adding
 * mismatched powers of ten — is the same slip in different clothes, so the concrete stage
 * is built around making "count the factors" the automatic move.
 */

export const exponentsSkills: SkillNode[] = [
  {
    id: 'exponents.index-laws-positive',
    title: 'Apply index laws for positive, zero, negative, and fractional exponents',
    summary:
      'Derive the index laws by counting factors rather than memorising them, and extend them to ' +
      'zero, negative and fractional powers without the rules changing.',
    prerequisites: [],
    cpa: {
      concrete:
        'Fold a sheet of paper in half repeatedly and count the layers: 2, 4, 8, 16. Each fold ' +
        'does not *add* two, it *doubles* — and the exponent is a count of how many doublings, ' +
        'not a thing to multiply by. Then place-value discs on a decimal mat: sliding a disc one ' +
        'column left is one more factor of ten, one column right is one fewer.\n\nSliding right ' +
        'past the units column is where negative indices come from. Nothing new happens; the ' +
        'student just keeps going.',
      pictorial:
        'An exponential number line, and a place-value chart the digits shift along. Multiplying ' +
        'by $10^n$ shifts $n$ columns — the decimal point is a fixed marker the digits move past, ' +
        'not a thing that travels.',
      abstract:
        'The laws, each read as a factor count: $a^m \\cdot a^n = a^{m+n}$ is "$m$ factors then ' +
        '$n$ more". $\\frac{a^m}{a^n} = a^{m-n}$ is "$m$ factors, $n$ cancelled". $a^0 = 1$ is ' +
        'what "$n$ factors, all $n$ cancelled" has to mean, and $a^{-n} = \\frac{1}{a^n}$ is ' +
        'cancelling past the end.',
    },
    formulas: [
      'a^m \\cdot a^n = a^{m+n}',
      '\\frac{a^m}{a^n} = a^{m-n}',
      '(a^m)^n = a^{mn}',
      '(ab)^n = a^n b^n',
      'a^0 = 1',
      'a^{-n} = \\frac{1}{a^n}',
      'a^{\\frac{m}{n}} = \\sqrt[n]{a^m}',
    ],
    misconceptions: [
      {
        code: 'exponents.multiply-the-bases',
        description:
          'Multiplies the bases as well as combining the exponents: reads $2^5 \\cdot 2^{-2}$ as ' +
          '$4^3$ rather than $2^3$.',
        probe:
          'Write $2^5$ out as a string of 2s multiplied together. Now write $2^{-2}$ underneath. ' +
          'When you cancel, what number is still the thing being repeatedly multiplied?',
        correction:
          'The base names *what* is being multiplied; the exponent counts *how many*. Combining ' +
          'the counts never changes what is being counted, so the base stays 2. Five factors of ' +
          'two, less two of them, leaves three: $2^3$.',
      },
      {
        code: 'exponents.exponent-as-multiplier',
        description:
          'Treats the exponent as a multiplier: computes $2^3$ as $6$, or $5^2$ as $10$.',
        probe: 'How many 2s are being multiplied in $2^3$? Write them out and work left to right.',
        correction:
          'An exponent is a count of factors, not a factor itself. $2^3$ is $2 \\times 2 \\times ' +
          '2 = 8$, which is why it grows so much faster than $2 \\times 3$.',
      },
      {
        code: 'exponents.negative-index-negative-value',
        description:
          'Reads a negative index as making the value negative: takes $2^{-4}$ to be $-16$ rather ' +
          'than $\\frac{1}{16}$.',
        probe:
          'Slide down the powers of two: $2^3 = 8$, $2^2 = 4$, $2^1 = 2$, $2^0 = 1$. What comes ' +
          'next if you keep going the same way?',
        correction:
          'Each step down divides by the base, so the values shrink toward zero without ever ' +
          'crossing it. A negative index means "divided by", not "less than nothing".',
      },
    ],
  },
  {
    id: 'exponents.compare-orders-magnitude',
    title: 'Compare orders of magnitude',
    summary:
      'Judge how many times bigger one quantity is than another by its power of ten, without ' +
      'computing either exactly.',
    prerequisites: ['exponents.index-laws-positive'],
    cpa: {
      concrete:
        'Stacks of place-value discs of visibly different heights — a bacterium against a grain ' +
        'of sand, a person against the Earth. The student is asked which is bigger *and by how ' +
        'many tens*, before any arithmetic.',
      pictorial:
        'A logarithmic scale, so a step is a factor of ten rather than an addition. Objects ' +
        'placed on it show that the gap between $10^3$ and $10^6$ is the same *kind* of gap as ' +
        'between $10^6$ and $10^9$.',
      abstract:
        'Comparing $A \\times 10^m$ with $B \\times 10^n$: the exponents decide the answer unless ' +
        'they are equal, in which case the coefficients do. The ratio is roughly $10^{m-n}$.',
    },
    formulas: ['\\frac{A \\times 10^m}{B \\times 10^n} = \\frac{A}{B} \\times 10^{m-n}'],
    misconceptions: [
      {
        code: 'exponents.linear-magnitude',
        description:
          'Treats a difference of exponents as a small difference: says $10^9$ is "a bit more ' +
          'than" $10^6$ because 9 is a bit more than 6.',
        probe:
          'How many times would you have to multiply $10^6$ by ten to reach $10^9$? So how many ' +
          'times bigger is it?',
        correction:
          'Each step in the exponent multiplies by ten, so three steps is a thousand times, not ' +
          'three times. This is exactly why the notation is worth having.',
      },
    ],
  },
  {
    id: 'exponents.numbers-standard-scientific',
    title: 'Express numbers in standard scientific notation',
    summary:
      'Convert between ordinary and standard form, and know why the coefficient is pinned ' +
      'between 1 and 10.',
    prerequisites: ['exponents.index-laws-positive'],
    cpa: {
      concrete:
        'Place-value discs again, but now the student is asked to write the same quantity three ' +
        'ways — $480{,}000$, $48 \\times 10^4$, $4.8 \\times 10^5$ — and notice that all three ' +
        'are the same pile of discs, differently grouped.',
      pictorial:
        'A place-value chart with the digits sliding and the decimal point fixed. Moving the ' +
        'digits five columns left is exactly $\\times 10^5$; the exponent records how far they ' +
        'moved and in which direction.',
      abstract:
        'Standard form is a *convention*, not a fact: $1 \\le |A| < 10$ exists so that every ' +
        'number has exactly one representation and two numbers can be compared at a glance.',
    },
    formulas: ['A \\times 10^n, \\quad 1 \\le |A| < 10, \\quad n \\in \\mathbb{Z}'],
    misconceptions: [
      {
        code: 'exponents.coefficient-out-of-range',
        description:
          'Leaves an answer as $12.4 \\times 10^8$ or $0.76 \\times 10^5$ and calls it standard ' +
          'form.',
        probe: 'Is your coefficient between 1 and 10? Where does the extra factor of ten need to go?',
        correction:
          'Standard form allows exactly one digit before the decimal point. $12.4 \\times 10^8$ ' +
          'is correct arithmetic in the wrong dress: it is $1.24 \\times 10^9$.',
      },
      {
        code: 'exponents.sign-of-index',
        description:
          'Gets the sign of the index backwards on small numbers, writing $0.00042$ as ' +
          '$4.2 \\times 10^4$.',
        probe:
          'Is your number bigger or smaller than 1? Should multiplying by your power of ten make ' +
          'the 4.2 grow or shrink?',
        correction:
          'A number below 1 needs a negative index, because reaching it from the coefficient means ' +
          'dividing. Sanity-check by asking which way the value has to move.',
      },
    ],
  },
  {
    id: 'exponents.operations-scientific-notation',
    title: 'Perform operations with scientific notation and round to significant figures',
    summary:
      'Add, subtract, multiply and divide in standard form, and know why addition needs matched ' +
      'powers when multiplication does not.',
    prerequisites: [
      'exponents.numbers-standard-scientific',
      'exponents.compare-orders-magnitude',
    ],
    cpa: {
      concrete:
        'Money. $\\$480{,}000$ and $\\$76{,}000$ cannot be added by adding 4.8 and 7.6 any more ' +
        'than four £100 notes and seven £10 notes make eleven of anything. The student is asked ' +
        'to make the units match before combining.',
      pictorial:
        'Both numbers on one place-value chart, with the smaller shifted a column so the digits ' +
        'line up. Once the columns agree, the addition is ordinary.',
      abstract:
        'Multiplication and division combine coefficients and exponents independently. Addition ' +
        'and subtraction require a common power of ten first, then factor it out.',
    },
    formulas: [
      '(A \\times 10^m)(B \\times 10^n) = AB \\times 10^{m+n}',
      '(A \\times 10^n) \\pm (B \\times 10^n) = (A \\pm B) \\times 10^n',
    ],
    misconceptions: [
      {
        code: 'exponents.add-without-matching-powers',
        description:
          'Adds coefficients and exponents separately, giving $(4.8 \\times 10^5) + (7.6 \\times ' +
          '10^4) = 12.4 \\times 10^9$.',
        probe:
          'Write both as ordinary numbers: 480,000 and 76,000. Is your answer anywhere near their ' +
          'sum?',
        correction:
          'Adding requires the same unit of place value, exactly as it does for 4 hundreds and 7 ' +
          'tens. Match the powers of ten first, then add only the coefficients — the exponent is ' +
          'the unit, and units do not add.',
      },
      {
        code: 'exponents.round-before-finishing',
        description:
          'Rounds intermediate values to the required significant figures, so the accumulated ' +
          'error shows up in the final answer.',
        probe:
          'Try it once rounding only at the end. Do you get the same last digit as when you ' +
          'rounded on the way through?',
        correction:
          'Rounding discards information. Do it once, at the end, or the error compounds through ' +
          'every later step.',
      },
    ],
  },
];

export const exponentsProblems: Problem[] = [
  // =========================================================================
  // Skill 1 — index laws: the exponent counts factors
  // =========================================================================

  // ---- Tier 1a: family exponents.product-law (6 items) ----
  {
    id: 'exponents.product-law-1',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.product-law', position: 1 },
    statement:
      'Simplify $3^2 \\times 3^3$, writing your answer as a single power of $3$, and give its ' +
      'value.',
    answer: { type: 'number', value: 243 },
    cpaPrompts: {
      concrete:
        'Lay out two counters marked 3, then three more counters marked 3, all in one row. How ' +
        'many 3s are now waiting to be multiplied together?',
      pictorial:
        'Write the 3s out in full: $(3 \\times 3)$ next to $(3 \\times 3 \\times 3)$. Ring the ' +
        'whole row and count how many 3s are inside the ring.',
      abstract:
        'Which index law applies when two powers of the same base are multiplied? Use it on ' +
        '$3^2 \\times 3^3$ and say what happens to the base itself.',
    },
    hints: [
      'Write both powers out as strings of 3s and count how many there are altogether.',
      'Two 3s followed by three more 3s is five 3s: $3^{2+3}$. Now work out $3^5$.',
    ],
    solution:
      '$3^2 \\times 3^3$ is two factors of 3 followed by three more, so it is five factors of 3:\n\n' +
      '$$3^2 \\times 3^3 = 3^{2+3} = 3^5 = 243.$$\n\nThe base stays 3 — combining the counts ' +
      'never changes what is being counted.',
    misconceptionCodes: ['exponents.multiply-the-bases', 'exponents.exponent-as-multiplier'],
  },
  {
    id: 'exponents.product-law-2',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.product-law', position: 2 },
    expect:
      'Only the first index moved, from $2$ to $4$. Predict: does the base change, and by how ' +
      'much does the index of the answer go up?',
    statement:
      'Simplify $3^4 \\times 3^3$, writing your answer as a single power of $3$, and give its ' +
      'value.',
    answer: { type: 'number', value: 2187 },
    cpaPrompts: {
      concrete:
        'Put out four counters marked 3, then three more. Compare the row with the last ' +
        'question, which had two then three. How many extra 3s are in the row now?',
      pictorial:
        'Write $(3 \\times 3 \\times 3 \\times 3)$ beside $(3 \\times 3 \\times 3)$ and count the ' +
        'whole row. Is the base of the answer still a single 3?',
      abstract:
        'Apply $a^m \\cdot a^n = a^{m+n}$ with $m = 4$ and $n = 3$, then evaluate the power you ' +
        'get. Why is the answer nine times the previous one?',
    },
    hints: [
      'Add the indices, exactly as before. The base is untouched.',
      '$3^{4+3} = 3^7$. Work out $3^7$ by doubling back from $3^5 = 243$: multiply by 9.',
    ],
    solution:
      'Four factors of 3 then three more is seven factors of 3:\n\n$$3^4 \\times 3^3 = 3^7 = ' +
      '2187.$$\n\nRaising the first index by 2 multiplied the answer by $3^2 = 9$, not by 2 — ' +
      '$243 \\times 9 = 2187$. ✓',
    misconceptionCodes: ['exponents.multiply-the-bases'],
  },
  {
    id: 'exponents.product-law-3',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.product-law', position: 3 },
    expect:
      'This time the *second* index moved, from $3$ down to $1$. Predict: will the answer be ' +
      'bigger or smaller than $3^7$, and by what factor?',
    statement:
      'Simplify $3^4 \\times 3^1$, writing your answer as a single power of $3$, and give its ' +
      'value.',
    answer: { type: 'number', value: 243 },
    cpaPrompts: {
      concrete:
        'Four counters marked 3, then a single one. Does one lone 3 count as a factor in the row, ' +
        'or can you ignore it?',
      pictorial:
        'Write $(3 \\times 3 \\times 3 \\times 3)$ beside a single $3$. Ring the lot and count: ' +
        'how many 3s are in the ring?',
      abstract:
        'What index does a bare $3$ carry? Use that to apply $a^m \\cdot a^n = a^{m+n}$ to ' +
        '$3^4 \\times 3^1$.',
    },
    hints: [
      'A number written with no index has an index of 1: $3 = 3^1$.',
      '$3^{4+1} = 3^5$. You already know its value from the first question.',
    ],
    solution:
      'A bare 3 is $3^1$, so\n\n$$3^4 \\times 3^1 = 3^{4+1} = 3^5 = 243.$$\n\nDropping the second ' +
      'index from 3 to 1 divided the answer by $3^2 = 9$: $2187 \\div 9 = 243$. ✓',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },
  {
    id: 'exponents.product-law-4',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.product-law', position: 4 },
    expect:
      'The second index has dropped one more, from $1$ to $0$. Predict what $3^0$ must be if ' +
      'the rule is to keep working, and what that does to the answer.',
    statement:
      'Simplify $3^4 \\times 3^0$, writing your answer as a single power of $3$, and give its ' +
      'value.',
    answer: { type: 'number', value: 81 },
    cpaPrompts: {
      concrete:
        'Four counters marked 3, and then *no* counters at all. What have you multiplied the ' +
        'four 3s by, if nothing was added to the row?',
      pictorial:
        'Write $(3 \\times 3 \\times 3 \\times 3)$ and leave the space beside it empty. What ' +
        'number can fill that space without changing the product?',
      abstract:
        'Apply $a^m \\cdot a^n = a^{m+n}$ with $n = 0$. What does that force $3^0$ to be, and ' +
        'does the same argument work for any base?',
    },
    hints: [
      'The rule says the indices add: $4 + 0 = 4$. So the answer is $3^4$.',
      'For that to be true, $3^0$ has to be the number that changes nothing when you multiply by ' +
        'it. Which number is that?',
    ],
    solution:
      'The rule gives $3^4 \\times 3^0 = 3^{4+0} = 3^4 = 81$.\n\nSo $3^0$ must be the number that ' +
      'leaves 81 unchanged, and that number is $1$:\n\n$$3^0 = 1.$$\n\n$a^0 = 1$ is not a special ' +
      'case bolted on; it is what the product law forces.',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },
  {
    id: 'exponents.product-law-5',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.product-law', position: 5 },
    expect:
      'Reversed: this time the answer is given and one index is missing. Predict whether you ' +
      'will add or subtract to find it.',
    statement: 'Find the value of $n$ if $3^4 \\times 3^n = 3^9$.',
    answer: { type: 'number', value: 5 },
    cpaPrompts: {
      concrete:
        'You need a row of nine 3s. Four are already on the table. How many more counters marked ' +
        '3 do you have to put down?',
      pictorial:
        'Draw nine slots in a row and shade the first four. How many slots are still empty?',
      abstract:
        'Write $4 + n = 9$ from the product law and solve it. Why does the base 3 never appear ' +
        'in that equation?',
    },
    hints: [
      'The product law says the indices add, so $4 + n$ must equal $9$.',
      'Solve $4 + n = 9$ by taking 4 from both sides.',
    ],
    solution:
      'The product law gives $3^{4+n} = 3^9$, so the indices must match:\n\n$$4 + n = 9 ' +
      '\\implies n = 5.$$\n\nCheck: $3^4 \\times 3^5 = 81 \\times 243 = 19683 = 3^9$. ✓',
    misconceptionCodes: ['exponents.multiply-the-bases'],
  },
  {
    id: 'exponents.product-law-6',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.product-law', position: 6 },
    expect:
      'A negative index enters for the first time: $3^{-6}$. Predict whether the rule "add the ' +
      'indices" still applies, and whether the answer will be bigger or smaller than $1$.',
    statement:
      'Simplify $3^4 \\times 3^{-6}$, writing your answer as a single power of $3$. Then give ' +
      'its value as a fraction.',
    answer: { type: 'number', value: 1 / 9 },
    cpaPrompts: {
      concrete:
        'Four counters marked 3 on the table, and six "cancelling" counters that each remove one ' +
        '3. Pair them off. How many cancelling counters are left over, and where do they sit — ' +
        'above the line or below it?',
      pictorial:
        'Write four 3s on top of a fraction bar and six 3s underneath. Cross off matching pairs. ' +
        'What survives, and on which side of the bar?',
      abstract:
        'Add the indices: $4 + (-6)$. Then rewrite the negative power you get using ' +
        '$a^{-n} = \\frac{1}{a^n}$, and say what its value is.',
    },
    hints: [
      'The rule does not change: add the indices, $4 + (-6)$.',
      '$3^{-2}$. A negative index means "divided by", so rewrite it as $\\frac{1}{3^2}$.',
    ],
    solution:
      'Adding the indices as always:\n\n$$3^4 \\times 3^{-6} = 3^{4 + (-6)} = 3^{-2} = ' +
      '\\frac{1}{3^2} = \\frac{1}{9}.$$\n\nThe payoff of the sequence: one rule, "count the ' +
      'factors and add the counts", has covered positive, zero and negative indices without ' +
      'ever changing. A negative index makes the value *small*, never negative.',
    misconceptionCodes: [
      'exponents.negative-index-negative-value',
      'exponents.multiply-the-bases',
    ],
  },

  // ---- Tier 1b: family exponents.quotient-law (6 items) ----
  {
    id: 'exponents.quotient-law-1',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.quotient-law', position: 1 },
    statement: 'Simplify $\\dfrac{2^5}{2^3}$ and give its value.',
    answer: { type: 'number', value: 4 },
    cpaPrompts: {
      concrete:
        'Put five counters marked 2 on the top shelf and three on the bottom shelf. Remove one ' +
        'from each shelf at a time until one shelf is empty. How many are left on top?',
      pictorial:
        'Write $\\frac{2 \\times 2 \\times 2 \\times 2 \\times 2}{2 \\times 2 \\times 2}$ and ' +
        'cross off a top 2 against a bottom 2, three times. What is left?',
      abstract:
        'Apply $\\frac{a^m}{a^n} = a^{m-n}$ with $m = 5$, $n = 3$, and then work out the value of ' +
        'the power you are left with.',
    },
    hints: [
      'Write the 2s out top and bottom and cancel them in pairs.',
      'Five 2s with three cancelled leaves two: $2^{5-3} = 2^2$.',
    ],
    solution:
      'Cancelling three factors of 2 from five leaves two of them:\n\n$$\\frac{2^5}{2^3} = ' +
      '2^{5-3} = 2^2 = 4.$$\n\nCheck against the plain arithmetic: $32 \\div 8 = 4$. ✓',
    misconceptionCodes: ['exponents.multiply-the-bases'],
  },
  {
    id: 'exponents.quotient-law-2',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.quotient-law', position: 2 },
    expect:
      'Only the bottom index moved, from $3$ to $4$. Predict: does the answer halve, or drop ' +
      'by one?',
    statement: 'Simplify $\\dfrac{2^5}{2^4}$ and give its value.',
    answer: { type: 'number', value: 2 },
    cpaPrompts: {
      concrete:
        'Five counters on the top shelf, four on the bottom now. Pair them off one for one. How ' +
        'many survive on top?',
      pictorial:
        'Five 2s over four 2s. Cross off four matching pairs and read what is left above the bar.',
      abstract:
        'Use $\\frac{a^m}{a^n} = a^{m-n}$ with $n = 4$. Compare your answer with the previous ' +
        'one — what did taking away one more factor of 2 do?',
    },
    hints: [
      'Subtract the indices: $5 - 4$.',
      '$2^1$ is just 2. One extra cancelled factor halves the answer.',
    ],
    solution:
      '$$\\frac{2^5}{2^4} = 2^{5-4} = 2^1 = 2.$$\n\nCancelling one more 2 halved the previous ' +
      'answer of 4. Each step down the bottom index divides by the base.',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },
  {
    id: 'exponents.quotient-law-3',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.quotient-law', position: 3 },
    expect:
      'The bottom index has reached $5$, the same as the top. Predict the answer *before* you ' +
      'use the rule — what is any number divided by itself?',
    statement: 'Simplify $\\dfrac{2^5}{2^5}$ and give its value.',
    answer: { type: 'number', value: 1 },
    cpaPrompts: {
      concrete:
        'Five counters on each shelf. Pair them all off. What is left on the top shelf, and what ' +
        'number does an empty shelf stand for in a product?',
      pictorial:
        'Five 2s over five 2s, every pair crossed off. Nothing is written above the bar — what ' +
        'value does that stand for?',
      abstract:
        'Apply $\\frac{a^m}{a^n} = a^{m-n}$ with $m = n = 5$. What power do you get, and what ' +
        'must its value therefore be?',
    },
    hints: [
      '$32 \\div 32$ — you already know this answer without any index law.',
      'The rule gives $2^{5-5} = 2^0$. So $2^0$ has to equal your answer.',
    ],
    solution:
      'Plain arithmetic first: $\\frac{32}{32} = 1$. The rule must agree:\n\n$$\\frac{2^5}{2^5} = ' +
      '2^{5-5} = 2^0 = 1.$$\n\nThis is where $a^0 = 1$ comes from. It is not a convention someone ' +
      'chose; it is the only value that keeps the quotient law true.',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },
  {
    id: 'exponents.quotient-law-4',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.quotient-law', position: 4 },
    expect:
      'The bottom index has gone one further, to $6$, so the subtraction crosses zero. Predict: ' +
      'will the answer be negative, or less than $1$?',
    statement:
      'Simplify $\\dfrac{2^5}{2^6}$, writing your answer as a power of $2$, and give its value ' +
      'as a fraction.',
    answer: { type: 'number', value: 0.5 },
    cpaPrompts: {
      concrete:
        'Five counters on top, six on the bottom. Pair off all five. One counter is left — on ' +
        'which shelf? So is the answer bigger or smaller than 1?',
      pictorial:
        'Five 2s over six 2s. After crossing off five pairs, a single 2 remains under the bar. ' +
        'Write down the fraction that leaves.',
      abstract:
        'Apply $\\frac{a^m}{a^n} = a^{m-n}$ with $m = 5$, $n = 6$, then convert the negative ' +
        'index using $a^{-n} = \\frac{1}{a^n}$.',
    },
    hints: [
      'Subtract the indices even though the answer goes below zero: $5 - 6 = -1$.',
      '$2^{-1}$ means one factor of 2 left on the *bottom*, so it is $\\frac{1}{2}$.',
    ],
    solution:
      'One more factor of 2 on the bottom than on the top:\n\n$$\\frac{2^5}{2^6} = 2^{5-6} = ' +
      '2^{-1} = \\frac{1}{2}.$$\n\nCheck: $32 \\div 64 = 0.5$. ✓ The values keep halving — 4, 2, ' +
      '1, $\\tfrac{1}{2}$ — and never turn negative.',
    misconceptionCodes: ['exponents.negative-index-negative-value'],
  },
  {
    id: 'exponents.quotient-law-5',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.quotient-law', position: 5 },
    expect:
      'Reversed: the answer $\\frac{1}{8}$ is given and the bottom index is missing. Predict ' +
      'whether that index will be bigger or smaller than $5$.',
    statement: 'Find the value of $n$ if $\\dfrac{2^5}{2^n} = \\dfrac{1}{8}$.',
    answer: { type: 'number', value: 8 },
    cpaPrompts: {
      concrete:
        'The answer has three 2s stranded on the bottom shelf, because $8 = 2 \\times 2 \\times ' +
        '2$. Five were paired off first. How many were on the bottom shelf to begin with?',
      pictorial:
        'Draw the fraction after cancelling: nothing on top, three 2s underneath. Now count ' +
        'backwards to how many were under the bar before the five cancelled.',
      abstract:
        'Write $\\frac{1}{8}$ as $2^{-3}$, set $5 - n = -3$ from the quotient law, and solve for ' +
        '$n$.',
    },
    hints: [
      'Write $\\frac{1}{8}$ as a power of 2 first: $8 = 2^3$, so $\\frac{1}{8} = 2^{-3}$.',
      'The quotient law gives $5 - n = -3$. Solve that.',
    ],
    solution:
      '$\\frac{1}{8} = 2^{-3}$, and the quotient law gives $2^{5-n}$, so\n\n$$5 - n = -3 ' +
      '\\implies n = 8.$$\n\nCheck: $\\frac{2^5}{2^8} = \\frac{32}{256} = \\frac{1}{8}$. ✓',
    misconceptionCodes: ['exponents.negative-index-negative-value'],
  },
  {
    id: 'exponents.quotient-law-6',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.quotient-law', position: 6 },
    expect:
      'The base has changed from $2$ to $10$ — everything else is the same kind of question. ' +
      'Predict: does the rule depend on which base you are counting?',
    statement:
      'Simplify $\\dfrac{10^3}{10^7}$, writing your answer as a power of $10$, and give its ' +
      'value as a decimal.',
    answer: { type: 'number', value: 0.0001 },
    cpaPrompts: {
      concrete:
        'Slide a place-value disc three columns left, then seven columns right. Where does it ' +
        'end up relative to where it started, and how many columns past the units column is it?',
      pictorial:
        'Three 10s over seven 10s. Cross off three pairs; four 10s are stranded under the bar. ' +
        'Write the decimal that leaves.',
      abstract:
        'Apply $\\frac{a^m}{a^n} = a^{m-n}$ with base 10, then write $10^{-4}$ as a decimal. How ' +
        'many places is the 1 after the point?',
    },
    hints: [
      'Subtract the indices: $3 - 7$. The base is irrelevant to that step.',
      '$10^{-4} = \\frac{1}{10^4} = \\frac{1}{10000}$. Write that as a decimal.',
    ],
    solution:
      '$$\\frac{10^3}{10^7} = 10^{3-7} = 10^{-4} = \\frac{1}{10^4} = 0.0001.$$\n\nThe payoff: ' +
      'the rule never mentioned the base, so it works for 2, for 10, for anything. Base 10 is ' +
      'the one that matters next — negative powers of ten are exactly how small numbers get ' +
      'written in standard form.',
    misconceptionCodes: ['exponents.negative-index-negative-value', 'exponents.sign-of-index'],
  },

  // ---- Tier 1c: family exponents.power-of-a-power (5 items) ----
  {
    id: 'exponents.power-of-a-power-1',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.power-of-a-power', position: 1 },
    statement:
      'Simplify $(2^3)^2$, writing your answer as a single power of $2$, and give its value.',
    answer: { type: 'number', value: 64 },
    cpaPrompts: {
      concrete:
        'Make a bag holding three counters marked 2. Now make two identical bags and tip them ' +
        'both out. How many counters marked 2 are on the table?',
      pictorial:
        'Write $(2 \\times 2 \\times 2) \\times (2 \\times 2 \\times 2)$ — the bracket twice — ' +
        'and count all the 2s.',
      abstract:
        'Apply $(a^m)^n = a^{mn}$ to $(2^3)^2$. Why do the indices multiply here when they added ' +
        'in $2^3 \\times 2^2$?',
    },
    hints: [
      'Squaring means writing the bracket down twice and multiplying.',
      'Two lots of three 2s is six 2s: $2^{3 \\times 2} = 2^6$.',
    ],
    solution:
      'Two copies of three factors of 2 is six factors of 2:\n\n$$(2^3)^2 = 2^{3 \\times 2} = ' +
      '2^6 = 64.$$\n\nCheck: $2^3 = 8$ and $8^2 = 64$. ✓ The indices multiply because the outer ' +
      'index says *how many copies of the whole bracket*.',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },
  {
    id: 'exponents.power-of-a-power-2',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.power-of-a-power', position: 2 },
    expect:
      'Only the index inside the bracket changed, from $3$ to $2$. Predict what happens to the ' +
      'index of the answer, and then to its value.',
    statement:
      'Simplify $(2^2)^2$, writing your answer as a single power of $2$, and give its value.',
    answer: { type: 'number', value: 16 },
    cpaPrompts: {
      concrete:
        'Each bag now holds two counters marked 2, and there are still two bags. Tip them out ' +
        'and count.',
      pictorial:
        'Write $(2 \\times 2) \\times (2 \\times 2)$ and count the 2s. Compare with the four ' +
        'you would get by adding the indices instead.',
      abstract:
        'Use $(a^m)^n = a^{mn}$ with $m = 2$, $n = 2$. Say what the answer is and check it ' +
        'against $4^2$.',
    },
    hints: [
      'Multiply the indices: $2 \\times 2$.',
      '$2^4$. Work it out, and check against $(2^2)^2 = 4^2$.',
    ],
    solution:
      '$$(2^2)^2 = 2^{2 \\times 2} = 2^4 = 16.$$\n\nCheck the other way round: $2^2 = 4$ and ' +
      '$4^2 = 16$. ✓ Lowering the inner index by 1 removed two factors of 2, so the value fell ' +
      'from 64 to 16.',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },
  {
    id: 'exponents.power-of-a-power-3',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.power-of-a-power', position: 3 },
    expect:
      'Now the *outer* index moved, from $2$ to $5$. Predict the index of the answer before you ' +
      'work anything out.',
    statement:
      'Simplify $(2^2)^5$, writing your answer as a single power of $2$, and give its value.',
    answer: { type: 'number', value: 1024 },
    cpaPrompts: {
      concrete:
        'Five bags now, each holding two counters marked 2. Tip them all out. How many counters ' +
        'are on the table?',
      pictorial:
        'Write the bracket $(2 \\times 2)$ five times in a row and count every 2 you have ' +
        'written.',
      abstract:
        'Use $(a^m)^n = a^{mn}$ with $m = 2$, $n = 5$, then evaluate. Would adding the indices ' +
        'have given the same answer?',
    },
    hints: [
      'Five copies of two factors: multiply the indices, $2 \\times 5$.',
      '$2^{10}$. Doubling ten times from 1 gives 1024.',
    ],
    solution:
      '$$(2^2)^5 = 2^{2 \\times 5} = 2^{10} = 1024.$$\n\nAdding the indices would have given ' +
      '$2^7 = 128$, which is eight times too small — the outer index counts *copies of the whole ' +
      'bracket*, so it multiplies.',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },
  {
    id: 'exponents.power-of-a-power-4',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.power-of-a-power', position: 4 },
    expect:
      'Reversed: the answer $2^{12}$ is given and the outer index is missing. Predict whether ' +
      'you will divide or subtract to find it.',
    statement: 'Find the value of $n$ if $(2^3)^n = 2^{12}$.',
    answer: { type: 'number', value: 4 },
    cpaPrompts: {
      concrete:
        'Each bag holds three counters marked 2, and you need twelve counters on the table. How ' +
        'many bags do you have to tip out?',
      pictorial:
        'Draw twelve slots and group them into blocks of three. How many blocks are there?',
      abstract:
        'Write $3n = 12$ from $(a^m)^n = a^{mn}$ and solve it. Why is this a division and not a ' +
        'subtraction?',
    },
    hints: [
      'The power law multiplies the indices, so $3 \\times n = 12$.',
      'Divide both sides by 3.',
    ],
    solution:
      'The power law gives $(2^3)^n = 2^{3n}$, so matching indices:\n\n$$3n = 12 \\implies n = ' +
      '4.$$\n\nBecause the indices multiply here, undoing it is a division — unlike the product ' +
      'law, where the missing index came from a subtraction.',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },
  {
    id: 'exponents.power-of-a-power-5',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    sequence: { family: 'exponents.power-of-a-power', position: 5 },
    expect:
      'A negative index appears inside the bracket: $(2^{-2})^3$. Predict whether the indices ' +
      'still multiply, and whether the answer will be negative or a fraction.',
    statement:
      'Simplify $(2^{-2})^3$, writing your answer as a single power of $2$. Then give its value ' +
      'as a fraction.',
    answer: { type: 'number', value: 1 / 64 },
    cpaPrompts: {
      concrete:
        'Each bag now holds two *cancelling* counters — each removes one factor of 2. Tip out ' +
        'three such bags. How many factors of 2 have been removed altogether, and where do they ' +
        'sit in the fraction?',
      pictorial:
        'Write $\\frac{1}{2 \\times 2}$ three times side by side and multiply. How many 2s end ' +
        'up under the bar?',
      abstract:
        'Apply $(a^m)^n = a^{mn}$ with $m = -2$, $n = 3$, then convert the result with ' +
        '$a^{-n} = \\frac{1}{a^n}$.',
    },
    hints: [
      'Multiply the indices as always, keeping the minus sign: $-2 \\times 3$.',
      '$2^{-6} = \\frac{1}{2^6}$. Work out $2^6$.',
    ],
    solution:
      'The indices multiply exactly as before, sign and all:\n\n$$(2^{-2})^3 = 2^{-2 \\times 3} = ' +
      '2^{-6} = \\frac{1}{2^6} = \\frac{1}{64}.$$\n\nThe payoff for the sequence: none of the ' +
      'three index laws ever cared whether an index was positive, zero or negative. The answer ' +
      'is a small positive fraction, not a negative number.',
    misconceptionCodes: [
      'exponents.negative-index-negative-value',
      'exponents.exponent-as-multiplier',
    ],
  },

  // ---- Tier 2: unfamiliar surfaces ----
  {
    id: 'exponents.simplify-index-expression',
    skillIds: ['exponents.index-laws-positive'],
    tier: 2,
    statement:
      'Simplify $\\dfrac{2^5 \\cdot 2^{-2}}{2^7}$, giving your answer as a fraction in positive ' +
      'index form.',
    answer: { type: 'number', value: 1 / 16 },
    cpaPrompts: {
      concrete:
        'Imagine five 2s written out and multiplied. Now imagine two of them cancelled by the ' +
        '$2^{-2}$, and seven more cancelled by the denominator. How many 2s are left, and are ' +
        'they on the top or the bottom?',
      pictorial:
        'Write the numerator as a row of 2s and the denominator as another row underneath. Cross ' +
        'off matching pairs. What survives?',
      abstract:
        'Combine the numerator with $a^m \\cdot a^n = a^{m+n}$, then apply $\\frac{a^p}{a^q} = ' +
        'a^{p-q}$ and convert the negative index. What single power of 2 do you end with?',
    },
    hints: [
      'Deal with the numerator first. What index law applies when you multiply two powers of the ' +
        'same base?',
      'The numerator becomes $2^{5 + (-2)} = 2^3$. Now you have $\\frac{2^3}{2^7}$ — what does the ' +
        'quotient law give?',
      '$3 - 7 = -4$, so you have $2^{-4}$. Rewrite that with a positive index.',
    ],
    solution:
      'Numerator: $2^5 \\cdot 2^{-2} = 2^{3}$. Then $\\frac{2^3}{2^7} = 2^{3-7} = 2^{-4}$.\n\n' +
      '$$2^{-4} = \\frac{1}{2^4} = \\frac{1}{16}$$',
    misconceptionCodes: ['exponents.multiply-the-bases', 'exponents.negative-index-negative-value'],
  },
  {
    id: 'exponents.fractional-index-eight',
    skillIds: ['exponents.index-laws-positive'],
    tier: 2,
    statement: 'Evaluate $8^{\\frac{2}{3}}$.',
    answer: { type: 'number', value: 4 },
    cpaPrompts: {
      concrete:
        'Eight unit cubes can be stacked into a $2 \\times 2 \\times 2$ cube. The cube root of 8 ' +
        'is the length of one edge — what is it? Now square that edge length.',
      pictorial:
        'Draw $8^{\\frac{2}{3}}$ as two steps: the $\\frac{1}{3}$ says "take the cube root", the ' +
        '$2$ says "then square". Draw the two arrows in order and label what comes out of each.',
      abstract:
        'Use $a^{\\frac{m}{n}} = (\\sqrt[n]{a})^m$ on $8^{\\frac{2}{3}}$. Which part of the ' +
        'fraction tells you which root to take, the top or the bottom?',
    },
    hints: [
      'The denominator of the index is the root; the numerator is the power.',
      'Cube root of 8 first: $\\sqrt[3]{8} = 2$. Now square it.',
    ],
    solution:
      'The bottom of the fractional index is the root, the top is the power:\n\n$$8^{\\frac{2}{3}} ' +
      '= \\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4.$$\n\nDoing it the other way round gives the ' +
      'same answer: $\\sqrt[3]{8^2} = \\sqrt[3]{64} = 4$. ✓',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },
  {
    id: 'exponents.fractional-index-sixteen',
    skillIds: ['exponents.index-laws-positive'],
    tier: 2,
    statement: 'Evaluate $16^{-\\frac{3}{4}}$, giving your answer as a fraction.',
    answer: { type: 'number', value: 1 / 8 },
    cpaPrompts: {
      concrete:
        'Split the job into three moves on a number you can hold: take the fourth root of 16, ' +
        'cube what you get, then flip it over because of the minus. Do them in that order and ' +
        'say what you get at each stage.',
      pictorial:
        'Draw three arrows in a row from 16: "fourth root", then "cube", then "reciprocal". ' +
        'Write the number that comes out of each arrow.',
      abstract:
        'Rewrite $16^{-\\frac{3}{4}}$ as $\\frac{1}{16^{3/4}}$, then use ' +
        '$a^{\\frac{m}{n}} = (\\sqrt[n]{a})^m$ on the denominator. What number do you get?',
    },
    hints: [
      'Deal with the minus sign first: $16^{-\\frac{3}{4}} = \\frac{1}{16^{\\frac{3}{4}}}$.',
      'For $16^{\\frac{3}{4}}$: fourth root of 16 is 2, and $2^3 = 8$.',
      'So the answer is $\\frac{1}{8}$ — small and positive, not negative.',
    ],
    solution:
      'The minus flips it, the 4 takes the root, the 3 raises the power:\n\n' +
      '$$16^{-\\frac{3}{4}} = \\frac{1}{16^{\\frac{3}{4}}} = \\frac{1}{(\\sqrt[4]{16})^3} = ' +
      '\\frac{1}{2^3} = \\frac{1}{8}.$$\n\nNote the answer is $\\frac{1}{8}$, not $-8$: a ' +
      'negative index divides, it does not negate.',
    misconceptionCodes: ['exponents.negative-index-negative-value'],
  },
  {
    id: 'exponents.power-of-a-monomial',
    skillIds: ['exponents.index-laws-positive'],
    tier: 2,
    statement: 'Simplify $(3a^2)^3$.',
    answer: { type: 'expression', value: '27*a^6', variables: ['a'] },
    cpaPrompts: {
      concrete:
        'Write the bracket $3a^2$ out three times in a row and multiply: $(3 \\times a \\times ' +
        'a)(3 \\times a \\times a)(3 \\times a \\times a)$. Count the 3s, then count the $a$s.',
      pictorial:
        'Draw three identical boxes each containing "3, a, a". Tip them all into one pile and ' +
        'sort it: how many 3s, how many $a$s?',
      abstract:
        'Apply $(ab)^n = a^n b^n$ to $(3a^2)^3$, so the 3 gets cubed too. What is $3^3$, and what ' +
        'does $(a^2)^3$ give?',
    },
    hints: [
      'Everything inside the bracket is cubed, the 3 included — not just the $a^2$.',
      '$3^3 = 27$ and $(a^2)^3 = a^{2 \\times 3} = a^6$.',
    ],
    solution:
      'Every factor in the bracket is raised to the power 3:\n\n$$(3a^2)^3 = 3^3 \\times ' +
      '(a^2)^3 = 27a^6.$$\n\nCheck with $a = 2$: $(3 \\times 4)^3 = 12^3 = 1728$, and ' +
      '$27 \\times 2^6 = 27 \\times 64 = 1728$. ✓ Leaving the 3 uncubed would have given $3a^6$, ' +
      'nine times too small.',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },

  // ---- Tier 3: contexts ----
  {
    id: 'exponents.paper-folding-threshold',
    skillIds: ['exponents.index-laws-positive'],
    tier: 3,
    statement:
      'A sheet of paper is folded in half, then in half again, and so on. Each fold doubles the ' +
      'number of layers. What is the smallest number of folds that gives more than $1000$ layers?',
    answer: { type: 'number', value: 10 },
    cpaPrompts: {
      concrete:
        'Fold a sheet of paper and count the layers after each fold: 2, 4, 8, 16. Keep a tally ' +
        'of fold number against layer count and carry it on in your head past where the paper ' +
        'gives out.',
      pictorial:
        'Draw a two-column table: folds 1, 2, 3, … against layers 2, 4, 8, …. Extend it until ' +
        'the right-hand column passes 1000.',
      abstract:
        'After $n$ folds there are $2^n$ layers. Find the smallest whole $n$ with $2^n > 1000$, ' +
        'and say which power of 2 sits just below 1000.',
    },
    hints: [
      'After 1 fold there are 2 layers, after 2 folds 4, after 3 folds 8. What is the pattern in ' +
        'terms of the fold number?',
      'You need $2^n > 1000$. Work up: $2^8 = 256$, $2^9 = 512$, $2^{10} = ?$',
    ],
    solution:
      'Each fold doubles, so $n$ folds give $2^n$ layers:\n\n$$2^9 = 512 \\le 1000 < 1024 = ' +
      '2^{10}.$$\n\nSo **10 folds** is the smallest number that passes 1000 layers. Ten folds ' +
      'sounds like nothing, which is exactly how surprising doubling is.',
    misconceptionCodes: ['exponents.exponent-as-multiplier', 'exponents.linear-magnitude'],
  },
  {
    id: 'exponents.bacteria-doubling',
    skillIds: ['exponents.index-laws-positive'],
    tier: 3,
    statement:
      'A dish starts with $500$ bacteria. The number doubles every hour. How many bacteria are ' +
      'in the dish after $6$ hours?',
    answer: { type: 'number', value: 32000 },
    cpaPrompts: {
      concrete:
        'Put 500 counters on the table. Double the pile, and again, keeping count of how many ' +
        'doublings you have done. Stop at six doublings and read the total.',
      pictorial:
        'Draw a chain of six arrows, each labelled "$\\times 2$", starting at 500. Write the ' +
        'number above each arrow head.',
      abstract:
        'The count after $t$ hours is $500 \\times 2^t$. Substitute $t = 6$ and evaluate — and ' +
        'note that the 500 is *not* raised to the power.',
    },
    hints: [
      'Six doublings means multiplying by 2 six times, which is $2^6$.',
      '$2^6 = 64$. Now multiply the starting 500 by that.',
    ],
    solution:
      'Six doublings multiply the population by $2^6 = 64$:\n\n$$500 \\times 2^6 = 500 \\times ' +
      '64 = 32{,}000.$$\n\nOnly the doubling factor carries the index; the starting 500 is ' +
      'multiplied once at the end, not raised to a power.',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },

  // ---- Tier 4: SSDD set on 2^x (family exponents.ssdd-two-to-the-x) ----
  {
    id: 'exponents.ssdd-solve-power',
    skillIds: ['exponents.index-laws-positive'],
    tier: 4,
    sequence: { family: 'exponents.ssdd-two-to-the-x', position: 1 },
    statement: 'In this set, $x$ is a whole number and the expression is $2^x$.\n\nSolve $2^x = 64$.',
    answer: { type: 'number', value: 6 },
    cpaPrompts: {
      concrete:
        'Double a single counter and keep doubling — 2, 4, 8, 16 — counting the doublings on ' +
        'your fingers. Stop when the pile reaches 64 and read off how many fingers are up.',
      pictorial:
        'Draw the powers of 2 up a ladder: rung 1 is 2, rung 2 is 4, rung 3 is 8. Which rung has ' +
        '64 on it?',
      abstract:
        'Write $64$ as a power of 2 and match the indices on both sides of $2^x = 64$. What does ' +
        'that give for $x$?',
    },
    hints: [
      'Write 64 as a power of 2 by halving repeatedly: 64, 32, 16, 8, 4, 2.',
      '$64 = 2^6$, so $2^x = 2^6$. Two powers of the same base are equal only when the indices ' +
        'match.',
    ],
    solution:
      'Halving 64 down to 1 takes six steps, so $64 = 2^6$:\n\n$$2^x = 2^6 \\implies x = 6.$$\n\n' +
      'Here the unknown is the *index*, which is why the move is to rewrite both sides with the ' +
      'same base.',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },
  {
    id: 'exponents.ssdd-simplify-power',
    skillIds: ['exponents.index-laws-positive'],
    tier: 4,
    sequence: { family: 'exponents.ssdd-two-to-the-x', position: 2 },
    statement:
      'In this set, $x$ is a whole number and the expression is $2^x$.\n\nWrite $2^x \\times 2^3$ ' +
      'as a single power of $2$.',
    answer: { type: 'expression', value: '2^(x+3)', variables: ['x'] },
    cpaPrompts: {
      concrete:
        'Imagine a row of $x$ counters marked 2, and then three more counters marked 2 pushed up ' +
        'against them. How would you describe the length of the whole row without knowing $x$?',
      pictorial:
        'Draw a bar of unknown length labelled $x$ and a short bar of length 3 joined to its ' +
        'end. What single label goes under the joined bar?',
      abstract:
        'Apply $a^m \\cdot a^n = a^{m+n}$ with $m = x$ and $n = 3$. Nothing is being solved here ' +
        '— what is the single power you end with?',
    },
    hints: [
      'The product law does not need to know the value of $x$: the indices still add.',
      'Add the indices: $x + 3$, and keep the base as 2.',
    ],
    solution:
      'The product law adds the indices whether or not they are numbers:\n\n$$2^x \\times 2^3 = ' +
      '2^{x+3}.$$\n\nNothing is solved here — there is no equation. The answer is an expression, ' +
      'and it is worth noticing it equals $8 \\times 2^x$.',
    misconceptionCodes: ['exponents.multiply-the-bases'],
  },
  {
    id: 'exponents.ssdd-evaluate-negative',
    skillIds: ['exponents.index-laws-positive'],
    tier: 4,
    sequence: { family: 'exponents.ssdd-two-to-the-x', position: 3 },
    statement:
      'In this set, $x$ is a whole number and the expression is $2^x$.\n\nFind the value of ' +
      '$2^{-x}$ when $x = 3$. Give your answer as a fraction.',
    answer: { type: 'number', value: 0.125 },
    cpaPrompts: {
      concrete:
        'Start at 1 and halve three times: 1, then a half, then a quarter. Say the third number ' +
        'out loud. Did the pile ever go below zero, or just get smaller?',
      pictorial:
        'Draw the powers of 2 sliding down past $2^0 = 1$: $\\tfrac{1}{2}$, $\\tfrac{1}{4}$, ' +
        '$\\tfrac{1}{8}$. Mark where $2^{-3}$ lands.',
      abstract:
        'Substitute $x = 3$ into $2^{-x}$ to get $2^{-3}$, then use $a^{-n} = \\frac{1}{a^n}$. ' +
        'Is the result negative or a fraction?',
    },
    hints: [
      'Substitute first: $2^{-x}$ with $x = 3$ is $2^{-3}$.',
      '$2^{-3} = \\frac{1}{2^3}$, and $2^3 = 8$.',
    ],
    solution:
      'Substituting $x = 3$ gives $2^{-3}$, and a negative index means "divide":\n\n$$2^{-3} = ' +
      '\\frac{1}{2^3} = \\frac{1}{8} = 0.125.$$\n\nThe minus lives in the index, not in the ' +
      'value: the answer is a small positive number, not $-8$.',
    misconceptionCodes: ['exponents.negative-index-negative-value'],
  },
  {
    id: 'exponents.ssdd-next-power',
    skillIds: ['exponents.index-laws-positive'],
    tier: 4,
    sequence: { family: 'exponents.ssdd-two-to-the-x', position: 4 },
    statement:
      'In this set, $x$ is a whole number and the expression is $2^x$.\n\nIt is known that ' +
      '$2^x = 10$. Without finding $x$, write down the value of $2^{x+1}$.',
    answer: { type: 'number', value: 20 },
    cpaPrompts: {
      concrete:
        'A pile of counters is worth 10. Adding one more factor of 2 means doubling the whole ' +
        'pile. What is it worth now, and did you ever need to know how many counters were in it?',
      pictorial:
        'Draw a bar labelled $2^x = 10$ and a second bar exactly the same length beside it. What ' +
        'is the total, and which index does it belong to?',
      abstract:
        'Split $2^{x+1}$ as $2^x \\times 2^1$ using the product law, then substitute the given ' +
        'value $2^x = 10$.',
    },
    hints: [
      'Split the index: $2^{x+1} = 2^x \\times 2^1$.',
      'You are told $2^x = 10$, so the answer is $10 \\times 2$. There is no need to solve for $x$.',
    ],
    solution:
      'Split the index with the product law and substitute:\n\n$$2^{x+1} = 2^x \\times 2^1 = ' +
      '10 \\times 2 = 20.$$\n\nSame surface as the other items in this set, quite different ' +
      'mathematics: no equation is solved and no index law is applied to a number — the given ' +
      'value is simply carried through.',
    misconceptionCodes: ['exponents.exponent-as-multiplier'],
  },

  // ---- Diagnostics for skill 1 ----
  {
    id: 'exponents.dx-multiply-the-bases',
    skillIds: ['exponents.index-laws-positive'],
    tier: 'diagnostic',
    statement: 'Work out the value of $2^5 \\times 2^{-2}$.',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$8$' },
        { label: 'B', value: '$64$', misconceptionCode: 'exponents.multiply-the-bases' },
        {
          label: 'C',
          value: '$-128$',
          misconceptionCode: 'exponents.negative-index-negative-value',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Write five 2s in a row and then cancel two of them. What number is still the thing being ' +
        'multiplied over and over — 2, or 4?',
      pictorial:
        'Write $\\frac{2 \\times 2 \\times 2 \\times 2 \\times 2}{2 \\times 2}$ and cross off ' +
        'two pairs. How many 2s survive above the bar?',
      abstract:
        'Apply $a^m \\cdot a^n = a^{m+n}$ to $2^5 \\times 2^{-2}$ and say what the base of the ' +
        'answer is before you work out its value.',
    },
    hints: [
      'Add the indices: $5 + (-2)$. What does the base do while you do that?',
      'The base is what is being multiplied and it never changes: the answer is $2^3$.',
    ],
    solution:
      'Adding the indices gives $2^{5 + (-2)} = 2^3 = 8$.\n\nAnswering $64$ means the bases were ' +
      'multiplied as well ($2 \\times 2 = 4$, giving $4^3$), which counts the wrong thing. ' +
      'Answering $-128$ means $2^{-2}$ was read as $-4$ rather than $\\frac{1}{4}$.',
    misconceptionCodes: [
      'exponents.multiply-the-bases',
      'exponents.negative-index-negative-value',
    ],
  },
  {
    id: 'exponents.dx-exponent-as-multiplier',
    skillIds: ['exponents.index-laws-positive'],
    tier: 'diagnostic',
    statement: 'Work out the value of $2^3 \\times 3^2$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$36$', misconceptionCode: 'exponents.exponent-as-multiplier' },
        { label: 'B', value: '$72$' },
        { label: 'C', value: '$7776$', misconceptionCode: 'exponents.multiply-the-bases' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Count out $2 \\times 2 \\times 2$ counters into one pile and $3 \\times 3$ into another. ' +
        'How many are in each pile, and what do you get when you multiply the two totals?',
      pictorial:
        'Draw $2^3$ as a $2 \\times 2 \\times 2$ block of cubes and $3^2$ as a $3 \\times 3$ ' +
        'square. Write the count under each picture before combining them.',
      abstract:
        'The bases here are different, so no index law applies. Evaluate $2^3$ and $3^2$ ' +
        'separately and multiply the two numbers.',
    },
    hints: [
      'The bases are 2 and 3 — different — so you cannot combine the indices at all.',
      'Work out $2^3$ and $3^2$ on their own, then multiply the two values.',
    ],
    solution:
      '$2^3 = 2 \\times 2 \\times 2 = 8$ and $3^2 = 3 \\times 3 = 9$, so\n\n$$2^3 \\times 3^2 = ' +
      '8 \\times 9 = 72.$$\n\nAnswering $36$ means each exponent was used as a multiplier ' +
      '($2 \\times 3 = 6$ and $3 \\times 2 = 6$). Answering $7776$ means the bases were ' +
      'multiplied and the indices added, giving $6^5$ — a law that does not exist.',
    misconceptionCodes: [
      'exponents.exponent-as-multiplier',
      'exponents.multiply-the-bases',
    ],
  },
  {
    id: 'exponents.dx-negative-index-negative-value',
    skillIds: ['exponents.index-laws-positive'],
    tier: 'diagnostic',
    statement:
      'The powers of two slide down like this: $2^3 = 8$, $2^2 = 4$, $2^1 = 2$, $2^0 = 1$. ' +
      'Carrying on in exactly the same way, what is the value of $2^{-4}$?',
    answer: {
      type: 'choice',
      correct: 'C',
      options: [
        { label: 'A', value: '$-16$', misconceptionCode: 'exponents.negative-index-negative-value' },
        { label: 'B', value: '$-8$', misconceptionCode: 'exponents.exponent-as-multiplier' },
        { label: 'C', value: '$\\frac{1}{16}$' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Start with 8 counters and halve the pile each time: 8, 4, 2, 1. Keep halving four more ' +
        'times. Does the pile ever pass through zero into negative counters?',
      pictorial:
        'Mark 8, 4, 2, 1 on a number line and keep stepping the same way. Where do the next four ' +
        'steps land relative to 0?',
      abstract:
        'Each step down the index divides by 2, so continue $1, \\tfrac{1}{2}, \\tfrac{1}{4}, ' +
        '\\ldots$ four steps past $2^0$ and say where you land.',
    },
    hints: [
      'Each step down in the index divides the value by 2, so keep halving past 1.',
      'Four halvings from 1: $\\tfrac{1}{2}$, $\\tfrac{1}{4}$, $\\tfrac{1}{8}$, then what?',
    ],
    solution:
      'Halving from $2^0 = 1$ four times gives $\\tfrac{1}{2}, \\tfrac{1}{4}, \\tfrac{1}{8}, ' +
      '\\tfrac{1}{16}$, so\n\n$$2^{-4} = \\frac{1}{2^4} = \\frac{1}{16}.$$\n\nAnswering $-16$ ' +
      'moves the minus sign from the index onto the value; the sequence shrinks toward zero and ' +
      'never crosses it. Answering $-8$ uses the index as a multiplier: $2 \\times (-4)$.',
    misconceptionCodes: [
      'exponents.negative-index-negative-value',
      'exponents.exponent-as-multiplier',
    ],
  },

  // =========================================================================
  // Skill 2 — orders of magnitude
  // =========================================================================

  // ---- Tier 1: family exponents.orders-of-magnitude (6 items) ----
  {
    id: 'exponents.magnitude-1',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 1,
    sequence: { family: 'exponents.orders-of-magnitude', position: 1 },
    statement: 'How many times bigger is $10^6$ than $10^3$?',
    answer: { type: 'number', value: 1000 },
    cpaPrompts: {
      concrete:
        'Build a stack of place-value discs for $10^3$ and another for $10^6$. How many columns ' +
        'further left does the taller stack reach, and what does each column multiply by?',
      pictorial:
        'Mark $10^3$ and $10^6$ on a scale where every step is a factor of ten. Count the steps ' +
        'between them.',
      abstract:
        'Divide: $\\frac{10^6}{10^3} = 10^{6-3}$. Work out the value of that power and say what ' +
        'it means in words.',
    },
    hints: [
      'Subtract the indices rather than the numbers themselves.',
      '$10^{6-3} = 10^3$. Write that as an ordinary number.',
    ],
    solution:
      'Each step in the index multiplies by ten, and there are three steps:\n\n' +
      '$$\\frac{10^6}{10^3} = 10^{6-3} = 10^3 = 1000.$$\n\nA million is a thousand times a ' +
      'thousand — not three times it.',
    misconceptionCodes: ['exponents.linear-magnitude'],
  },
  {
    id: 'exponents.magnitude-2',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 1,
    sequence: { family: 'exponents.orders-of-magnitude', position: 2 },
    expect:
      'Only the top index moved, from $6$ to $9$ — three more steps. Predict: does the answer go ' +
      'up by 3, or get multiplied by 1000?',
    statement: 'How many times bigger is $10^9$ than $10^3$?',
    answer: { type: 'number', value: 1000000 },
    cpaPrompts: {
      concrete:
        'Add three more columns to the taller disc stack. Each new column multiplies the whole ' +
        'stack by ten. What has the ratio been multiplied by?',
      pictorial:
        'On the factor-of-ten scale, $10^9$ is three steps further right than $10^6$. Count the ' +
        'total steps from $10^3$.',
      abstract:
        'Divide: $\\frac{10^9}{10^3} = 10^{9-3}$. Give the value of that power as an ordinary ' +
        'number.',
    },
    hints: [
      'Subtract the indices: $9 - 3$.',
      '$10^6$ is a million. Three extra steps multiplied the previous answer by 1000.',
    ],
    solution:
      '$$\\frac{10^9}{10^3} = 10^{9-3} = 10^6 = 1{,}000{,}000.$$\n\nThree extra steps in the ' +
      'index multiplied the ratio by $10^3 = 1000$, taking it from a thousand to a million. ' +
      'Small changes in the index are large changes in the number.',
    misconceptionCodes: ['exponents.linear-magnitude'],
  },
  {
    id: 'exponents.magnitude-3',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 1,
    sequence: { family: 'exponents.orders-of-magnitude', position: 3 },
    expect:
      'Both indices are negative now, $-2$ and $-5$, but the gap between them is still three. ' +
      'Predict whether the answer changes from the first question.',
    statement: 'How many times bigger is $10^{-2}$ than $10^{-5}$?',
    answer: { type: 'number', value: 1000 },
    cpaPrompts: {
      concrete:
        'Slide a place-value disc two columns to the right of the units column, then start again ' +
        'and slide it five. How many columns apart did the two end positions finish?',
      pictorial:
        'Mark $0.01$ and $0.00001$ on a factor-of-ten scale. How many steps separate them?',
      abstract:
        'Divide: $\\frac{10^{-2}}{10^{-5}} = 10^{-2-(-5)}$. Be careful with the double minus — ' +
        'what index do you get?',
    },
    hints: [
      'Subtract the indices, minus signs and all: $-2 - (-5)$.',
      'Subtracting a negative adds: $-2 + 5 = 3$, so the answer is $10^3$.',
    ],
    solution:
      '$$\\frac{10^{-2}}{10^{-5}} = 10^{-2 - (-5)} = 10^{3} = 1000.$$\n\nThe gap in the index is ' +
      'what counts, not where the two numbers sit. $0.01$ is a thousand times $0.00001$, exactly ' +
      'as $10^6$ is a thousand times $10^3$.',
    misconceptionCodes: ['exponents.linear-magnitude', 'exponents.sign-of-index'],
  },
  {
    id: 'exponents.magnitude-4',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 1,
    sequence: { family: 'exponents.orders-of-magnitude', position: 4 },
    expect:
      'Coefficients appear for the first time: $4$ and $2$. Predict whether the answer will be ' +
      'more or less than the $10^3$ the indices alone would give.',
    statement: 'How many times bigger is $4 \\times 10^8$ than $2 \\times 10^5$?',
    answer: { type: 'number', value: 2000 },
    cpaPrompts: {
      concrete:
        'Four discs sitting eight columns left, against two discs sitting five columns left. Deal ' +
        'with the columns first, then ask how the counts 4 and 2 change the answer.',
      pictorial:
        'On the factor-of-ten scale the indices are three steps apart. Then nudge the result by ' +
        'the ratio of the coefficients — which way does $\\frac{4}{2}$ push it?',
      abstract:
        'Split the division: $\\frac{4}{2} \\times 10^{8-5}$. Work out each part and multiply ' +
        'them together.',
    },
    hints: [
      'Handle the powers of ten and the coefficients separately.',
      '$10^{8-5} = 1000$ and $\\frac{4}{2} = 2$. Multiply them.',
    ],
    solution:
      '$$\\frac{4 \\times 10^8}{2 \\times 10^5} = \\frac{4}{2} \\times 10^{8-5} = 2 \\times 1000 ' +
      '= 2000.$$\n\nThe indices set the order of magnitude — about a thousand — and the ' +
      'coefficients then adjust it, here doubling it.',
    misconceptionCodes: ['exponents.linear-magnitude'],
  },
  {
    id: 'exponents.magnitude-5',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 1,
    sequence: { family: 'exponents.orders-of-magnitude', position: 5 },
    expect:
      'The coefficients have swapped roles: the bigger one is now on the bottom, $3$ over $6$. ' +
      'Predict whether the answer is above or below $1000$ this time.',
    statement: 'How many times bigger is $3 \\times 10^8$ than $6 \\times 10^5$?',
    answer: { type: 'number', value: 500 },
    cpaPrompts: {
      concrete:
        'Three discs eight columns left, six discs five columns left. The columns still say a ' +
        'thousand — but which pile has more discs in it, and what does that do to the ratio?',
      pictorial:
        'Take the thousand from the factor-of-ten scale, then shrink it by the coefficient ratio ' +
        '$\\frac{3}{6}$. Where does it land?',
      abstract:
        'Split it: $\\frac{3}{6} \\times 10^{8-5}$. What is $\\frac{3}{6}$, and what does ' +
        'multiplying $1000$ by it give?',
    },
    hints: [
      'Same two steps as before: coefficients, then powers of ten.',
      '$\\frac{3}{6} = 0.5$ and $10^3 = 1000$. Multiply.',
    ],
    solution:
      '$$\\frac{3 \\times 10^8}{6 \\times 10^5} = \\frac{3}{6} \\times 10^{3} = 0.5 \\times 1000 ' +
      '= 500.$$\n\nThe coefficients can pull the answer *below* the power of ten the indices ' +
      'suggest. The indices give the order of magnitude; the coefficients decide where inside it ' +
      'the answer sits.',
    misconceptionCodes: ['exponents.linear-magnitude'],
  },
  {
    id: 'exponents.magnitude-ratio',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 1,
    sequence: { family: 'exponents.orders-of-magnitude', position: 6 },
    expect:
      'Real measurements now, and the coefficients almost cancel: $6$ over $7.3$. Predict ' +
      'whether the answer will be a little above or a little below the $100$ the indices give.',
    statement:
      'The mass of the Earth is about $6 \\times 10^{24}$ kg and the mass of the Moon is about ' +
      '$7.3 \\times 10^{22}$ kg. Roughly how many times more massive is the Earth than the Moon? ' +
      'Give your answer to the nearest whole number.',
    answer: { type: 'number', value: 82, tolerance: 1 },
    cpaPrompts: {
      concrete:
        'Two stacks of place-value discs, one for each mass. Before doing any arithmetic: how ' +
        'many more columns does the Earth stack reach than the Moon stack? What does each extra ' +
        'column multiply by?',
      pictorial:
        'Put both masses on a logarithmic number line where each step is a factor of ten. How ' +
        'many steps apart are $10^{22}$ and $10^{24}$? Now allow for the coefficients.',
      abstract:
        'Divide: $\\frac{6 \\times 10^{24}}{7.3 \\times 10^{22}} = \\frac{6}{7.3} \\times 10^{2}$. ' +
        'Work out the coefficient part first and say whether it is above or below 1.',
    },
    hints: [
      'Compare the powers of ten first. $10^{24}$ against $10^{22}$ — how many times bigger is ' +
        'that, before you look at the 6 and the 7.3?',
      'Two steps in the exponent is a factor of $100$, not a factor of 2. Now divide the ' +
        'coefficients: $6 \\div 7.3$.',
      'Multiply $\\frac{6}{7.3} \\approx 0.82$ by $100$.',
    ],
    solution:
      '$$\\frac{6 \\times 10^{24}}{7.3 \\times 10^{22}} = \\frac{6}{7.3} \\times 10^{24 - 22} ' +
      '\\approx 0.82 \\times 100 \\approx 82.$$\n\nThe Earth is about 82 times as massive as the ' +
      'Moon — two orders of magnitude, trimmed a little by the coefficients. That is the payoff ' +
      'of the sequence: the indices tell you the size of the answer, the coefficients only ' +
      'fine-tune it.',
    misconceptionCodes: ['exponents.linear-magnitude'],
  },

  // ---- Tier 2: unfamiliar surfaces ----
  {
    id: 'exponents.order-standard-form',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 2,
    statement:
      'Three numbers are written in standard form: $3.2 \\times 10^4$, $9.9 \\times 10^3$ and ' +
      '$1.1 \\times 10^5$. Put them in order from smallest to largest, and give the middle one ' +
      'as an ordinary number.',
    answer: { type: 'number', value: 32000 },
    cpaPrompts: {
      concrete:
        'Build each number as a stack of place-value discs. Which stack reaches the fewest ' +
        'columns to the left, and which reaches the most?',
      pictorial:
        'Write the three numbers on a factor-of-ten scale, using only their indices at first. ' +
        'Then check whether the coefficients change any of the positions.',
      abstract:
        'Compare the indices $4$, $3$ and $5$ first; only compare coefficients when two indices ' +
        'are equal. Which number is second, and what is it as an ordinary number?',
    },
    hints: [
      'Look only at the powers of ten first: $10^3$, $10^4$, $10^5$. Do the coefficients change ' +
        'that order?',
      'A coefficient is always between 1 and 10, so it can never make up a whole power of ten. ' +
        'The order is $9.9 \\times 10^3$, $3.2 \\times 10^4$, $1.1 \\times 10^5$.',
    ],
    solution:
      'In standard form the coefficient is under 10, so it can never bridge a whole power of ' +
      'ten. Ordering by index alone:\n\n$$9.9 \\times 10^3 < 3.2 \\times 10^4 < 1.1 \\times ' +
      '10^5.$$\n\nThe middle number is $3.2 \\times 10^4 = 32{,}000$. In ordinary form: 9900, ' +
      '32000, 110000. ✓',
    misconceptionCodes: ['exponents.linear-magnitude', 'exponents.coefficient-out-of-range'],
  },
  {
    id: 'exponents.magnitude-reversal',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 2,
    statement:
      'A number $N$ is $10^4$ times as big as $4.5 \\times 10^3$. Write $N$ as an ordinary number.',
    answer: { type: 'number', value: 45000000 },
    cpaPrompts: {
      concrete:
        'Take the disc stack for $4.5 \\times 10^3$ and slide every disc four columns to the ' +
        'left. Which column does the leading 4 finish in?',
      pictorial:
        'On the factor-of-ten scale, move four steps to the right of $4.5 \\times 10^3$. What ' +
        'index do you land on?',
      abstract:
        'Multiply: $10^4 \\times (4.5 \\times 10^3) = 4.5 \\times 10^{4+3}$. Write the result as ' +
        'an ordinary number.',
    },
    hints: [
      'Multiplying by $10^4$ adds 4 to the index; the coefficient 4.5 is untouched.',
      '$4.5 \\times 10^7$. Now write out the digits: 4.5 followed by seven place-value shifts.',
    ],
    solution:
      'Multiplying by $10^4$ adds four to the index:\n\n$$N = 4.5 \\times 10^{3+4} = 4.5 \\times ' +
      '10^7 = 45{,}000{,}000.$$\n\nThe coefficient never moves when you multiply by a power of ' +
      'ten; only the index does.',
    misconceptionCodes: ['exponents.linear-magnitude'],
  },
  {
    id: 'exponents.magnitude-small-numbers',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 2,
    statement:
      'How many times larger is $5 \\times 10^{-3}$ than $2 \\times 10^{-7}$?',
    answer: { type: 'number', value: 25000 },
    cpaPrompts: {
      concrete:
        'Slide one disc three columns right of the units column, and another seven columns right. ' +
        'How many columns apart are they, and which is the larger number?',
      pictorial:
        'Put $0.005$ and $0.0000002$ on a factor-of-ten scale. Count the steps between them, then ' +
        'adjust for the coefficients 5 and 2.',
      abstract:
        'Compute $\\frac{5}{2} \\times 10^{-3 - (-7)}$. Watch the double minus in the index and ' +
        'say what power of ten you get.',
    },
    hints: [
      'Both numbers are small, but the question is still a division: coefficients, then powers.',
      '$-3 - (-7) = 4$, so the power part is $10^4$. And $\\frac{5}{2} = 2.5$.',
    ],
    solution:
      '$$\\frac{5 \\times 10^{-3}}{2 \\times 10^{-7}} = \\frac{5}{2} \\times 10^{-3 - (-7)} = ' +
      '2.5 \\times 10^{4} = 25{,}000.$$\n\nBoth numbers are tiny, but one is twenty-five ' +
      'thousand times the other. Being small does not make the gap small.',
    misconceptionCodes: ['exponents.linear-magnitude', 'exponents.sign-of-index'],
  },

  // ---- Tier 3: contexts ----
  {
    id: 'exponents.cells-across-a-hair',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 3,
    statement:
      'A human hair is about $7 \\times 10^{-5}$ m thick. A red blood cell is about ' +
      '$7 \\times 10^{-6}$ m across. About how many blood cells would fit side by side across ' +
      'the thickness of one hair?',
    answer: { type: 'number', value: 10 },
    cpaPrompts: {
      concrete:
        'Lay a row of identical small counters along a longer strip and count how many fit. What ' +
        'calculation are you doing when you do that?',
      pictorial:
        'Draw a long bar for the hair and a short bar for the cell, then mark off the short bar ' +
        'repeatedly along the long one. How many marks?',
      abstract:
        'Set up the division $\\frac{7 \\times 10^{-5}}{7 \\times 10^{-6}}$ and evaluate it. What ' +
        'happens to the coefficients here?',
    },
    hints: [
      'Decide what to divide by what: you want how many small lengths make one big length.',
      'The coefficients are both 7, so they cancel. That leaves $10^{-5 - (-6)}$.',
    ],
    solution:
      'The number that fit is the thickness of the hair divided by the width of a cell:\n\n' +
      '$$\\frac{7 \\times 10^{-5}}{7 \\times 10^{-6}} = \\frac{7}{7} \\times 10^{-5+6} = 10^1 = ' +
      '10.$$\n\nAbout ten blood cells across one hair. The coefficients cancelled, so the whole ' +
      'answer came from the one-step gap in the indices.',
    misconceptionCodes: ['exponents.linear-magnitude', 'exponents.sign-of-index'],
  },
  {
    id: 'exponents.world-population-ratio',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 3,
    statement:
      'About $5.9 \\times 10^6$ people live in Singapore. About $8.1 \\times 10^9$ people live ' +
      'on Earth. How many times as many people live on Earth as in Singapore? Give your answer ' +
      'to 2 significant figures.',
    answer: { type: 'number', value: 8.1e9 / 5.9e6, sigfigs: 2 },
    cpaPrompts: {
      concrete:
        'Two piles of discs, one reaching six columns and one reaching nine. Before dividing, say ' +
        'roughly how many times taller the second pile is.',
      pictorial:
        'Place both populations on a factor-of-ten scale. Three steps apart is a factor of a ' +
        'thousand — then adjust for the coefficients 8.1 and 5.9.',
      abstract:
        'Evaluate $\\frac{8.1}{5.9} \\times 10^{9-6}$, then round the result to 2 significant ' +
        'figures.',
    },
    hints: [
      'Divide the coefficients and subtract the indices separately.',
      '$10^{9-6} = 1000$ and $\\frac{8.1}{5.9} \\approx 1.37$. Multiply, then round.',
    ],
    solution:
      '$$\\frac{8.1 \\times 10^9}{5.9 \\times 10^6} = \\frac{8.1}{5.9} \\times 10^{3} \\approx ' +
      '1.3729 \\times 1000 = 1372.9.$$\n\nTo 2 significant figures that is **1400**, or ' +
      '$1.4 \\times 10^3$. Roughly fourteen hundred Singapores would fill the world.',
    misconceptionCodes: ['exponents.linear-magnitude', 'exponents.round-before-finishing'],
  },

  // ---- Diagnostic for skill 2 ----
  {
    id: 'exponents.dx-linear-magnitude',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 'diagnostic',
    statement: 'How many times bigger is $10^9$ than $10^6$?',
    answer: {
      type: 'choice',
      correct: 'C',
      options: [
        { label: 'A', value: '$3$ times', misconceptionCode: 'exponents.linear-magnitude' },
        { label: 'B', value: '$1.5$ times', misconceptionCode: 'exponents.exponent-as-multiplier' },
        { label: 'C', value: '$1000$ times' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Start with a stack of discs for $10^6$ and add columns one at a time until you reach ' +
        '$10^9$. How many columns did you add, and what did each one do to the value?',
      pictorial:
        'On a scale where each step is a factor of ten, count the steps from $10^6$ to $10^9$. ' +
        'Then say what three steps means as a single multiplier.',
      abstract:
        'Divide $\\frac{10^9}{10^6}$ using the quotient law and give the value of the power you ' +
        'get, not the index.',
    },
    hints: [
      'The question asks how many times, so it is a division, not a subtraction of the indices.',
      'The quotient law gives $10^{9-6} = 10^3$. That index of 3 means a *thousand*, not 3.',
    ],
    solution:
      '$$\\frac{10^9}{10^6} = 10^{9-6} = 10^3 = 1000.$$\n\nAnswering "3 times" reports the ' +
      'difference of the indices instead of its value — that is the whole point of the notation, ' +
      'that a small step in the index is a huge step in the number. Answering "1.5 times" comes ' +
      'from reading $10^9$ as $90$ and $10^6$ as $60$.',
    misconceptionCodes: ['exponents.linear-magnitude', 'exponents.exponent-as-multiplier'],
  },

  // =========================================================================
  // Skill 3 — standard form
  // =========================================================================

  // ---- Tier 1: family exponents.standard-form-conversion (6 items) ----
  {
    id: 'exponents.standard-form-1',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 1,
    sequence: { family: 'exponents.standard-form-conversion', position: 1 },
    statement: 'Write $4800$ in standard form.',
    answer: { type: 'number', value: 4800 },
    cpaPrompts: {
      concrete:
        'Lay out 4800 with place-value discs: four discs in the thousands column and eight in the ' +
        'hundreds. Now slide every disc right until the leading 4 sits in the units column. How ' +
        'many columns did they move?',
      pictorial:
        'Write 4800 on a place-value chart and move the digits until only one non-zero digit sits ' +
        'before the decimal point. Count the columns crossed.',
      abstract:
        'Standard form is $A \\times 10^n$ with $1 \\le A < 10$. Choose $A$ for $4800$, then find ' +
        'the $n$ that puts the digits back where they started.',
    },
    hints: [
      'The coefficient must be between 1 and 10, so it has to be $4.8$.',
      'To get from $4.8$ back to $4800$ you multiply by 1000, and $1000 = 10^3$.',
    ],
    solution:
      'The only coefficient between 1 and 10 that uses these digits is $4.8$, and $4.8$ must be ' +
      'multiplied by $1000$ to reach $4800$:\n\n$$4800 = 4.8 \\times 10^3.$$\n\nCheck: three ' +
      'zeros of shift, index 3. ✓',
    misconceptionCodes: ['exponents.coefficient-out-of-range'],
  },
  {
    id: 'exponents.standard-form-2',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 1,
    sequence: { family: 'exponents.standard-form-conversion', position: 2 },
    expect:
      'The number is ten times bigger, $48\\,000$ instead of $4800$. Predict: does the ' +
      'coefficient change, or the index?',
    statement: 'Write $48\\,000$ in standard form.',
    answer: { type: 'number', value: 48000 },
    cpaPrompts: {
      concrete:
        'Take the disc layout for 4800 and slide every disc one column further left. Which part ' +
        'of the standard-form answer records that extra slide?',
      pictorial:
        'Put 48000 on a place-value chart and count how many columns the digits must move right ' +
        'so that only the 4 is before the point.',
      abstract:
        'Write $48\\,000$ as $A \\times 10^n$ with $1 \\le A < 10$. What are $A$ and $n$, and ' +
        'which one changed from the last question?',
    },
    hints: [
      'The digits are the same, so the coefficient is the same: $4.8$.',
      'The number is ten times bigger, so the index goes up by one.',
    ],
    solution:
      'Same digits, one more place-value column:\n\n$$48{,}000 = 4.8 \\times 10^4.$$\n\nOnly the ' +
      'index moved. The coefficient carries the digits; the index carries the size.',
    misconceptionCodes: ['exponents.coefficient-out-of-range'],
  },
  {
    id: 'exponents.standard-form-3',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 1,
    sequence: { family: 'exponents.standard-form-conversion', position: 3 },
    expect:
      'The number has dropped below 1, to $0.048$. Predict what the sign of the index will be, ' +
      'and why.',
    statement: 'Write $0.048$ in standard form.',
    answer: { type: 'number', value: 0.048 },
    cpaPrompts: {
      concrete:
        'Lay out $0.048$ with discs: four in the hundredths column and eight in the thousandths. ' +
        'Slide them left until the 4 reaches the units column. Which direction did they go?',
      pictorial:
        'On the place-value chart, the digits of $0.048$ sit to the right of the point. Count the ' +
        'columns they must move *left* to reach standard form, and record the direction with the ' +
        'sign of the index.',
      abstract:
        'The coefficient is still $4.8$. Decide whether multiplying $4.8$ by your power of ten ' +
        'must make it grow or shrink, and choose the sign of $n$ accordingly.',
    },
    hints: [
      'The coefficient is $4.8$ again — the digits have not changed.',
      '$4.8$ must be made *smaller* to reach $0.048$, so the index is negative. How many times ' +
        'do you divide by 10?',
    ],
    solution:
      '$4.8$ must be divided by 100 to reach $0.048$, so the index is $-2$:\n\n$$0.048 = 4.8 ' +
      '\\times 10^{-2}.$$\n\nCheck: $4.8 \\div 100 = 0.048$. ✓ A number below 1 always takes a ' +
      'negative index.',
    misconceptionCodes: ['exponents.sign-of-index'],
  },
  {
    id: 'exponents.standard-form-4',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 1,
    sequence: { family: 'exponents.standard-form-conversion', position: 4 },
    expect:
      'Reversed: the coefficient is given and the index is missing, for a number two columns ' +
      'smaller again. Predict whether $n$ will be $-2$, $-3$ or $-4$.',
    statement: 'Given that $0.00048 = 4.8 \\times 10^n$, find the value of $n$.',
    answer: { type: 'number', value: -4 },
    cpaPrompts: {
      concrete:
        'Place a disc for the 4 in the ten-thousandths column. Count the columns from there back ' +
        'to the units column, and note which way you counted.',
      pictorial:
        'Write $0.00048$ on a place-value chart. How many columns must the 4 travel left to sit ' +
        'in the units place?',
      abstract:
        'Ask what $4.8$ has to be divided by to become $0.00048$, then write that divisor as a ' +
        'power of ten with a negative index.',
    },
    hints: [
      'How many times must you divide $4.8$ by 10 to reach $0.00048$?',
      'Dividing four times means multiplying by $10^{-4}$.',
    ],
    solution:
      '$4.8 \\div 10\\,000 = 0.00048$, and $10\\,000 = 10^4$, so dividing by it is multiplying by ' +
      '$10^{-4}$:\n\n$$n = -4.$$\n\nCounting the digits after the point is a shortcut, but the ' +
      'reason is the four divisions by ten.',
    misconceptionCodes: ['exponents.sign-of-index'],
  },
  {
    id: 'exponents.standard-form-5',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 1,
    sequence: { family: 'exponents.standard-form-conversion', position: 5 },
    expect:
      'Back to a large number, but this one has four significant digits: $6\\,371\\,000$. ' +
      'Predict how many digits will appear after the decimal point in the coefficient.',
    statement:
      'The radius of the Earth is about $6\\,371\\,000$ m. Write this in standard form.',
    answer: { type: 'number', value: 6371000 },
    cpaPrompts: {
      concrete:
        'Lay out the digits 6, 3, 7, 1 in the millions, hundred-thousands, ten-thousands and ' +
        'thousands columns. Slide them right until the 6 is in the units column, counting the ' +
        'columns as you go.',
      pictorial:
        'Put $6\\,371\\,000$ on a place-value chart and mark where the decimal point ends up when ' +
        'only the 6 is in front of it.',
      abstract:
        'Choose $A$ with $1 \\le A < 10$ using all four significant digits, then find $n$. Do the ' +
        'trailing zeros belong in the coefficient?',
    },
    hints: [
      'The coefficient must start with the 6 and keep the other significant digits: $6.371$.',
      'Count the columns from $6.371$ up to $6\\,371\\,000$: six of them.',
    ],
    solution:
      'Keeping every significant digit in the coefficient:\n\n$$6{,}371{,}000 = 6.371 \\times ' +
      '10^6.$$\n\nThe trailing zeros are place-holders, so they are carried by the index, not by ' +
      'the coefficient. Check: $6.371 \\times 1{,}000{,}000 = 6{,}371{,}000$. ✓',
    misconceptionCodes: ['exponents.coefficient-out-of-range'],
  },
  {
    id: 'exponents.standard-form-6',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 1,
    sequence: { family: 'exponents.standard-form-conversion', position: 6 },
    expect:
      'The whole question turns round: you are given standard form and asked for the ordinary ' +
      'number. Predict which way the digits will move for an index of $-4$.',
    statement: 'Write $2.05 \\times 10^{-4}$ as an ordinary decimal number.',
    answer: { type: 'number', value: 0.000205 },
    cpaPrompts: {
      concrete:
        'Put discs for 2, 0 and 5 in the units, tenths and hundredths columns, then slide them ' +
        'all four columns to the right. Which column does the 2 land in?',
      pictorial:
        'On a place-value chart, shift the digits of $2.05$ four columns right and fill the empty ' +
        'columns with zeros. Write what you read.',
      abstract:
        'A negative index divides, so work out $2.05 \\div 10^4$. How many zeros sit between the ' +
        'decimal point and the 2?',
    },
    hints: [
      'A negative index means divide, so the number is smaller than $2.05$.',
      'Divide $2.05$ by $10\\,000$: the digits move four columns right.',
    ],
    solution:
      'A negative index divides:\n\n$$2.05 \\times 10^{-4} = \\frac{2.05}{10\\,000} = ' +
      '0.000205.$$\n\nThe payoff of the sequence: the coefficient always holds the digits and the ' +
      'index always holds the shift, so converting in either direction is the same single move ' +
      'read forwards or backwards. Note there are three zeros after the point, not four — the ' +
      'index counts columns moved, not zeros written.',
    misconceptionCodes: ['exponents.sign-of-index'],
  },

  // ---- Tier 2: unfamiliar surfaces ----
  {
    id: 'exponents.normalise-coefficient',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 2,
    statement:
      'A student writes a number as $48 \\times 10^4$. This is not standard form. Written ' +
      'properly as $A \\times 10^n$ with $1 \\le A < 10$, what is the value of $n$?',
    answer: { type: 'number', value: 5 },
    cpaPrompts: {
      concrete:
        'Build $48 \\times 10^4$ with discs: 48 discs each worth $10^4$. Regroup ten of them into ' +
        'one disc worth $10^5$ wherever you can. What is left?',
      pictorial:
        'Write $48 \\times 10^4$ as $4.8 \\times 10 \\times 10^4$ on a place-value chart. Where ' +
        'does the extra factor of ten go?',
      abstract:
        'Split the out-of-range coefficient: $48 = 4.8 \\times 10$. Combine that spare ten with ' +
        '$10^4$ and read off the new index.',
    },
    hints: [
      'The coefficient 48 is too big. Split it as $4.8 \\times 10$.',
      'Now you have $4.8 \\times 10 \\times 10^4 = 4.8 \\times 10^5$.',
    ],
    solution:
      'Split the coefficient and absorb the spare ten into the power:\n\n$$48 \\times 10^4 = 4.8 ' +
      '\\times 10 \\times 10^4 = 4.8 \\times 10^5,$$\n\nso $n = 5$. The value never changed — ' +
      'both are $480{,}000$. Only the dress was wrong.',
    misconceptionCodes: ['exponents.coefficient-out-of-range'],
  },
  {
    id: 'exponents.normalise-small-coefficient',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 2,
    statement:
      'A calculation ends with the answer $0.76 \\times 10^{-3}$. Written properly as ' +
      '$A \\times 10^n$ with $1 \\le A < 10$, what is the value of $n$?',
    answer: { type: 'number', value: -4 },
    cpaPrompts: {
      concrete:
        'The coefficient $0.76$ is too *small* this time. To make it at least 1 you must multiply ' +
        'it by ten — so what must you do to the power of ten to keep the value the same?',
      pictorial:
        'On a place-value chart, shift the digits of $0.76$ one column left to get $7.6$. Record ' +
        'that shift by moving the index one step the other way.',
      abstract:
        'Rewrite $0.76 = 7.6 \\times 10^{-1}$ and combine the two powers of ten. Does the index ' +
        'go up or down?',
    },
    hints: [
      'The coefficient is below 1, so it needs to grow by a factor of ten.',
      'Whatever you multiply the coefficient by, you must divide the power of ten by: ' +
        '$0.76 \\times 10^{-3} = 7.6 \\times 10^{-4}$.',
    ],
    solution:
      'The coefficient must be at least 1, so multiply it by ten and take that ten off the power:\n\n' +
      '$$0.76 \\times 10^{-3} = 7.6 \\times 10^{-1} \\times 10^{-3} = 7.6 \\times 10^{-4},$$\n\n' +
      'so $n = -4$. Both are $0.00076$. Notice the index went *down* here and *up* in the ' +
      'previous question — the direction follows the coefficient.',
    misconceptionCodes: ['exponents.coefficient-out-of-range', 'exponents.sign-of-index'],
  },
  {
    id: 'exponents.compare-two-small-numbers',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 2,
    statement:
      'Which is larger, $3.4 \\times 10^{-5}$ or $9.8 \\times 10^{-6}$? Write the larger one as ' +
      'an ordinary decimal number.',
    answer: { type: 'number', value: 0.000034 },
    cpaPrompts: {
      concrete:
        'Slide one disc five columns right of the units column and another six columns right. ' +
        'Which one stopped sooner, and is that the bigger or the smaller number?',
      pictorial:
        'Put both numbers on a place-value chart, lining the digits up under the right columns. ' +
        'Which has a non-zero digit further to the left?',
      abstract:
        'Compare the indices $-5$ and $-6$ first; the coefficients only matter if the indices ' +
        'match. Then write the winner out as a decimal.',
    },
    hints: [
      'Compare the indices before the coefficients. Which of $-5$ and $-6$ is larger?',
      'A coefficient below 10 cannot make up a whole power of ten, so $3.4 \\times 10^{-5}$ wins ' +
        'despite the smaller coefficient. Now write it as a decimal.',
    ],
    solution:
      '$-5 > -6$, so $3.4 \\times 10^{-5}$ is the larger, even though $9.8 > 3.4$. As decimals:\n\n' +
      '$$3.4 \\times 10^{-5} = 0.000034, \\qquad 9.8 \\times 10^{-6} = 0.0000098.$$\n\nThe ' +
      'larger number is $0.000034$. Standard form is designed so that the index decides first.',
    misconceptionCodes: ['exponents.sign-of-index', 'exponents.linear-magnitude'],
  },

  // ---- Tier 3: contexts ----
  {
    id: 'exponents.memory-card-bytes',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 3,
    statement:
      'A memory card is labelled $64$ GB. One GB is $1 \\times 10^9$ bytes. The card\'s capacity ' +
      'in bytes is to be printed as $A \\times 10^n$ with $1 \\le A < 10$. What is the value of ' +
      '$n$?',
    answer: { type: 'number', value: 10 },
    cpaPrompts: {
      concrete:
        'Imagine 64 identical boxes, each holding $10^9$ bytes. Group ten of the boxes together ' +
        'wherever you can. How many groups of ten do you make, and what is left over?',
      pictorial:
        'Write $64 \\times 10^9$ on a place-value chart. Move the digits until only the 6 sits ' +
        'before the decimal point, and count the shift.',
      abstract:
        'Form the product $64 \\times 10^9$, then rewrite $64$ as $6.4 \\times 10$ and combine ' +
        'the powers of ten. What index do you finish with?',
    },
    hints: [
      'First write down the calculation: 64 lots of $10^9$ bytes.',
      '$64 \\times 10^9$ is not standard form because 64 is bigger than 10. Split it as ' +
        '$6.4 \\times 10$.',
      '$6.4 \\times 10 \\times 10^9 = 6.4 \\times 10^{10}$.',
    ],
    solution:
      'The capacity is $64 \\times 10^9$ bytes, but 64 is out of range for a coefficient:\n\n' +
      '$$64 \\times 10^9 = 6.4 \\times 10 \\times 10^9 = 6.4 \\times 10^{10},$$\n\nso $n = 10$. ' +
      'That is $64{,}000{,}000{,}000$ bytes — sixty-four billion.',
    misconceptionCodes: ['exponents.coefficient-out-of-range'],
  },
  {
    id: 'exponents.ream-thickness',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 3,
    statement:
      'One sheet of printer paper is $0.0001$ m thick. A ream contains $500$ sheets, stacked ' +
      'flat. How thick is the ream, in metres? Give your answer in standard form.',
    answer: { type: 'number', value: 0.05 },
    cpaPrompts: {
      concrete:
        'Stack sheets one on top of another and watch the pile grow. What single calculation ' +
        'gives the height of the whole pile from the thickness of one sheet?',
      pictorial:
        'Draw a bar for one sheet, then a bar 500 times as long. Label both with the numbers you ' +
        'know.',
      abstract:
        'Write the sheet thickness as $1 \\times 10^{-4}$ m and the count as $5 \\times 10^2$. ' +
        'Multiply the coefficients and add the indices, then check the coefficient is in range.',
    },
    hints: [
      'Decide what to multiply by what: one sheet\'s thickness, 500 times over.',
      'In standard form: $(5 \\times 10^2) \\times (1 \\times 10^{-4})$. Multiply the ' +
        'coefficients and add the indices.',
      '$5 \\times 10^{-2}$. Write that as a decimal to check it is sensible for a stack of paper.',
    ],
    solution:
      'The ream is 500 sheets thick:\n\n$$(5 \\times 10^2) \\times (1 \\times 10^{-4}) = 5 ' +
      '\\times 10^{2 + (-4)} = 5 \\times 10^{-2} \\text{ m}.$$\n\nThat is $0.05$ m, or 5 cm — ' +
      'about right for a ream of paper, which is a good sanity check on the index.',
    misconceptionCodes: ['exponents.sign-of-index', 'exponents.coefficient-out-of-range'],
  },

  // ---- Diagnostics for skill 3 ----
  {
    id: 'exponents.dx-coefficient-out-of-range',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 'diagnostic',
    statement: 'Write $480\\,000$ in standard form.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        {
          label: 'A',
          value: '$48 \\times 10^4$',
          misconceptionCode: 'exponents.coefficient-out-of-range',
        },
        { label: 'B', value: '$4.8 \\times 10^5$' },
        { label: 'C', value: '$4.8 \\times 10^{-5}$', misconceptionCode: 'exponents.sign-of-index' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Lay out $480\\,000$ with place-value discs and slide them right until only one non-zero ' +
        'digit is left of the units column. How many columns did they cross?',
      pictorial:
        'On a place-value chart, move the digits of $480\\,000$ until the decimal point sits just ' +
        'after the 4. Count the columns.',
      abstract:
        'Standard form demands $1 \\le A < 10$. Check each candidate coefficient against that ' +
        'rule before checking the arithmetic.',
    },
    hints: [
      'The coefficient must be at least 1 and less than 10. Which candidates fail that test?',
      '$4.8$ has to be multiplied by $100\\,000 = 10^5$ to reach $480\\,000$.',
    ],
    solution:
      'The coefficient must have exactly one digit before the point, so it is $4.8$, and ' +
      '$4.8 \\times 100{,}000 = 480{,}000$:\n\n$$480{,}000 = 4.8 \\times 10^5.$$\n\n' +
      '$48 \\times 10^4$ is the right value in the wrong dress — its coefficient is out of range. ' +
      '$4.8 \\times 10^{-5}$ has the sign of the index backwards and is worth $0.000048$.',
    misconceptionCodes: ['exponents.coefficient-out-of-range', 'exponents.sign-of-index'],
  },
  {
    id: 'exponents.dx-sign-of-index',
    skillIds: ['exponents.numbers-standard-scientific'],
    tier: 'diagnostic',
    statement: 'Write $0.00042$ in standard form.',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$4.2 \\times 10^{-4}$' },
        { label: 'B', value: '$4.2 \\times 10^{4}$', misconceptionCode: 'exponents.sign-of-index' },
        {
          label: 'C',
          value: '$0.42 \\times 10^{-3}$',
          misconceptionCode: 'exponents.coefficient-out-of-range',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Place a disc for the 4 in the ten-thousandths column. To bring it to the units column, ' +
        'do you multiply or divide, and how many times?',
      pictorial:
        'Write $0.00042$ on a place-value chart and count the columns from the 4 back to the ' +
        'units place. Record the direction as the sign of the index.',
      abstract:
        'Ask whether $4.2$ must grow or shrink to become $0.00042$, and let that decide the sign ' +
        'of $n$ before you count anything.',
    },
    hints: [
      'Is $0.00042$ bigger or smaller than 1? What must that make the sign of the index?',
      '$4.2$ has to be divided by $10\\,000$ to reach $0.00042$, and dividing by $10^4$ is ' +
        'multiplying by $10^{-4}$.',
    ],
    solution:
      '$0.00042$ is less than 1, so the coefficient $4.2$ must shrink, which needs a negative ' +
      'index:\n\n$$0.00042 = 4.2 \\times 10^{-4}.$$\n\n$4.2 \\times 10^4 = 42{,}000$ — a hundred ' +
      'million times too big — which is what flipping the sign costs. $0.42 \\times 10^{-3}$ has ' +
      'the right value but a coefficient below 1, so it is not standard form.',
    misconceptionCodes: ['exponents.sign-of-index', 'exponents.coefficient-out-of-range'],
  },

  // =========================================================================
  // Skill 4 — operations in standard form, and rounding
  // =========================================================================

  // ---- Tier 1a: family exponents.standard-form-arithmetic (6 items) ----
  {
    id: 'exponents.sf-add-equal-powers',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 1,
    sequence: { family: 'exponents.standard-form-arithmetic', position: 1 },
    statement:
      'Evaluate $(3.2 \\times 10^5) + (4.1 \\times 10^5)$, giving your answer in standard form.',
    answer: { type: 'number', value: 730000 },
    cpaPrompts: {
      concrete:
        'Think of $10^5$ as a single kind of note. You have 3.2 of them and 4.1 of them. Since ' +
        'the notes are the same kind, what do you do with the counts?',
      pictorial:
        'Draw two bars on the same place-value chart, both starting in the same column. Their ' +
        'lengths add directly because the columns already line up.',
      abstract:
        'Both terms carry $10^5$, so factor it out: $(3.2 + 4.1) \\times 10^5$. Add the ' +
        'coefficients and check the result is still under 10.',
    },
    hints: [
      'The powers of ten are already the same, so the units match.',
      'Add the coefficients only: $3.2 + 4.1$, keeping $\\times 10^5$.',
    ],
    solution:
      'Both terms are in units of $10^5$, so the common factor comes out:\n\n$$(3.2 + 4.1) ' +
      '\\times 10^5 = 7.3 \\times 10^5 = 730{,}000.$$\n\nThe coefficient $7.3$ is between 1 and ' +
      '10, so no renormalising is needed. ✓',
    misconceptionCodes: ['exponents.add-without-matching-powers'],
  },
  {
    id: 'exponents.sf-add-gap-one',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 1,
    sequence: { family: 'exponents.standard-form-arithmetic', position: 2 },
    expect:
      'Only the second index moved, from $10^5$ down to $10^4$. Predict: can you still just add ' +
      '$3.2$ and $4.1$?',
    statement:
      'Evaluate $(3.2 \\times 10^5) + (4.1 \\times 10^4)$, giving your answer in standard form.',
    answer: { type: 'number', value: 361000 },
    cpaPrompts: {
      concrete:
        'Now you have 3.2 hundred-thousand notes and 4.1 ten-thousand notes. Can you add 3.2 and ' +
        '4.1 while the notes are different kinds? What has to happen first?',
      pictorial:
        'Draw both numbers on one place-value chart. The second bar starts one column to the ' +
        'right. Shift it so the columns line up before adding.',
      abstract:
        'Rewrite $4.1 \\times 10^4$ with an index of 5, then factor out $10^5$ and add the ' +
        'coefficients.',
    },
    hints: [
      'The units are different, so match them first. Use the larger power, $10^5$.',
      '$4.1 \\times 10^4 = 0.41 \\times 10^5$. Now add $3.2 + 0.41$.',
    ],
    solution:
      'Matching the powers: $4.1 \\times 10^4 = 0.41 \\times 10^5$. Then\n\n$$(3.2 + 0.41) ' +
      '\\times 10^5 = 3.61 \\times 10^5 = 361{,}000.$$\n\nCheck against the ordinary sum: ' +
      '$320{,}000 + 41{,}000 = 361{,}000$. ✓ Adding $3.2 + 4.1$ would have given $7.3 \\times ' +
      '10^5$, twice the true answer.',
    misconceptionCodes: ['exponents.add-without-matching-powers'],
  },
  {
    id: 'exponents.add-in-standard-form',
    skillIds: [
      'exponents.operations-scientific-notation',
      'exponents.numbers-standard-scientific',
    ],
    tier: 1,
    sequence: { family: 'exponents.standard-form-arithmetic', position: 3 },
    expect:
      'The gap is still one power of ten, but the coefficients $4.8$ and $7.6$ add to more than ' +
      '10. Predict: will the final index stay at $5$, or be pushed up to $6$?',
    statement:
      'Evaluate $(4.8 \\times 10^5) + (7.6 \\times 10^4)$, giving your answer in standard form.',
    answer: { type: 'number', value: 556000 },
    cpaPrompts: {
      concrete:
        'These are $\\$480{,}000$ and $\\$76{,}000$. If you had four £100 notes and seven £10 ' +
        'notes, could you add the 4 and the 7 directly? What would you do first?',
      pictorial:
        'Put both on one place-value chart. Shift the smaller number one column so its digits line ' +
        'up with the larger. What does $7.6 \\times 10^4$ become when written against $10^5$?',
      abstract:
        'Match the powers of ten, factor out the common power, then add the coefficients. Check ' +
        'whether the result needs renormalising.',
    },
    hints: [
      'Can you add two numbers directly when their place values differ? Try it as $480{,}000 + ' +
        '76{,}000$ first and keep the answer to check against.',
      'Rewrite both with the same power of ten. Use the higher one, $10^5$.',
      '$7.6 \\times 10^4 = 0.76 \\times 10^5$. Now factor out $10^5$ and add what is left.',
    ],
    solution:
      'Matching the powers: $7.6 \\times 10^4 = 0.76 \\times 10^5$.\n\n' +
      '$$(4.8 + 0.76) \\times 10^5 = 5.56 \\times 10^5$$\n\n' +
      'Check the coefficient is in range: $1 \\le 5.56 < 10$. ✓ And against the ordinary sum, ' +
      '$480{,}000 + 76{,}000 = 556{,}000$. ✓ Matching first is what keeps the index at 5.',
    misconceptionCodes: [
      'exponents.add-without-matching-powers',
      'exponents.coefficient-out-of-range',
    ],
  },
  {
    id: 'exponents.sf-add-gap-two',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 1,
    sequence: { family: 'exponents.standard-form-arithmetic', position: 4 },
    expect:
      'The gap has widened to two powers of ten. Predict how many decimal places the shifted ' +
      'coefficient will have, and whether the answer is close to $3.2 \\times 10^5$.',
    statement:
      'Evaluate $(3.2 \\times 10^5) + (4.1 \\times 10^3)$, giving your answer in standard form.',
    answer: { type: 'number', value: 324100 },
    cpaPrompts: {
      concrete:
        'Hundred-thousand notes and thousand notes: two column-widths apart now. How many columns ' +
        'must the smaller pile shift before the two can be combined?',
      pictorial:
        'On the place-value chart the second bar starts two columns to the right. Slide it two ' +
        'columns and read the new coefficient.',
      abstract:
        'Rewrite $4.1 \\times 10^3$ against $10^5$, then add the coefficients. How much does the ' +
        'smaller number actually change the answer?',
    },
    hints: [
      'Match to the bigger power, $10^5$, by shifting two columns.',
      '$4.1 \\times 10^3 = 0.041 \\times 10^5$. Now add $3.2 + 0.041$.',
    ],
    solution:
      '$4.1 \\times 10^3 = 0.041 \\times 10^5$, so\n\n$$(3.2 + 0.041) \\times 10^5 = 3.241 ' +
      '\\times 10^5 = 324{,}100.$$\n\nCheck: $320{,}000 + 4{,}100 = 324{,}100$. ✓ The wider the ' +
      'gap in the indices, the less the smaller number matters — two orders down, it only ' +
      'touches the third decimal place of the coefficient.',
    misconceptionCodes: ['exponents.add-without-matching-powers'],
  },
  {
    id: 'exponents.sf-missing-addend',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 1,
    sequence: { family: 'exponents.standard-form-arithmetic', position: 5 },
    expect:
      'Reversed: the total is given and one of the two numbers is missing. Predict whether the ' +
      'missing number has an index of $10^6$ or something smaller.',
    statement:
      'Given that $(5.2 \\times 10^6) + N = 5.6 \\times 10^6$, write $N$ in standard form.',
    answer: { type: 'number', value: 400000 },
    cpaPrompts: {
      concrete:
        'You have 5.2 million-notes and you need 5.6 of them. How many more do you need, and is ' +
        'that a whole note or part of one?',
      pictorial:
        'Draw a bar of length $5.2$ and a target bar of length $5.6$, both in units of $10^6$. ' +
        'The gap between them is $N$.',
      abstract:
        'Subtract: $N = (5.6 - 5.2) \\times 10^6$. The coefficient you get is below 1, so ' +
        'renormalise it into standard form.',
    },
    hints: [
      'Both are in units of $10^6$, so subtract the coefficients: $5.6 - 5.2$.',
      '$N = 0.4 \\times 10^6$. That coefficient is below 1 — shift it to get standard form.',
    ],
    solution:
      'Subtracting the coefficients while the units match:\n\n$$N = (5.6 - 5.2) \\times 10^6 = ' +
      '0.4 \\times 10^6 = 4 \\times 10^5 = 400{,}000.$$\n\nThe first form is correct arithmetic ' +
      'but not standard form, because $0.4 < 1$. Check: $5{,}200{,}000 + 400{,}000 = ' +
      '5{,}600{,}000$. ✓',
    misconceptionCodes: [
      'exponents.coefficient-out-of-range',
      'exponents.add-without-matching-powers',
    ],
  },
  {
    id: 'exponents.sf-multiply-renormalise',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 1,
    sequence: { family: 'exponents.standard-form-arithmetic', position: 6 },
    expect:
      'The operation changes from $+$ to $\\times$. Predict: do the powers of ten still have to ' +
      'be matched before you start?',
    statement:
      'Evaluate $(7 \\times 10^3) \\times (3 \\times 10^4)$, giving your answer in standard form.',
    answer: { type: 'number', value: 210000000 },
    cpaPrompts: {
      concrete:
        'Seven groups of a thousand, each repeated $3 \\times 10^4$ times. Nothing has to be ' +
        'regrouped into matching columns first — why not?',
      pictorial:
        'Draw a rectangle with sides $7 \\times 10^3$ and $3 \\times 10^4$. Its area splits into ' +
        '"$7 \\times 3$" and "$10^3 \\times 10^4$" as two separate pieces of work.',
      abstract:
        'Multiply the coefficients and add the indices: $(7 \\times 3) \\times 10^{3+4}$. Then ' +
        'check whether the coefficient is still under 10.',
    },
    hints: [
      'Multiplication does not need matching powers. Deal with coefficients and indices ' +
        'separately.',
      '$7 \\times 3 = 21$ and $10^{3+4} = 10^7$, giving $21 \\times 10^7$. Is 21 an allowed ' +
        'coefficient?',
    ],
    solution:
      'Coefficients and indices are handled independently:\n\n$$(7 \\times 3) \\times 10^{3+4} = ' +
      '21 \\times 10^7 = 2.1 \\times 10^8 = 210{,}000{,}000.$$\n\nThe payoff of the sequence: ' +
      'addition needs the powers matched *first* because the power is the unit, but ' +
      'multiplication never does — it just adds the indices. What multiplication does need is a ' +
      'final check that the coefficient is back between 1 and 10.',
    misconceptionCodes: [
      'exponents.coefficient-out-of-range',
      'exponents.add-without-matching-powers',
    ],
  },

  // ---- Tier 1b: family exponents.significant-figures (5 items) ----
  {
    id: 'exponents.sigfig-1',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 1,
    sequence: { family: 'exponents.significant-figures', position: 1 },
    statement: 'Round $4.362$ to 3 significant figures.',
    answer: { type: 'number', value: 4.36 },
    cpaPrompts: {
      concrete:
        'Count the digits of $4.362$ off on your fingers, starting from the first non-zero one. ' +
        'Put a finger on the third digit and read the one immediately after it.',
      pictorial:
        'Write $4.362$ and draw a cut line after the third significant digit: $4.36 \\,|\\, 2$. ' +
        'Which side decides whether the last kept digit moves?',
      abstract:
        'The three significant figures are 4, 3 and 6. The next digit is 2 — below 5, so decide ' +
        'what happens to the 6.',
    },
    hints: [
      'Count three significant figures from the left: 4, 3, 6.',
      'The next digit is 2, which is less than 5, so the 6 stays as it is.',
    ],
    solution:
      'The first three significant figures of $4.362$ are $4$, $3$ and $6$. The next digit is ' +
      '$2 < 5$, so nothing is rounded up:\n\n$$4.362 \\approx 4.36 \\ (3 \\text{ s.f.})$$',
    misconceptionCodes: ['exponents.round-before-finishing'],
  },
  {
    id: 'exponents.sigfig-2',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 1,
    sequence: { family: 'exponents.significant-figures', position: 2 },
    expect:
      'Only the fourth digit changed, from $2$ to $7$. Predict what that does to the third digit ' +
      'of your answer.',
    statement: 'Round $4.367$ to 3 significant figures.',
    answer: { type: 'number', value: 4.37 },
    cpaPrompts: {
      concrete:
        'Put your finger on the third digit again, the 6. The digit after it is 7 — is that ' +
        'nearer the bottom or the top of the 0-to-9 range?',
      pictorial:
        'Draw the cut: $4.36 \\,|\\, 7$. On a number line between $4.36$ and $4.37$, which end is ' +
        '$4.367$ closer to?',
      abstract:
        'The digit after the third significant figure is 7, which is 5 or more. State the rule ' +
        'and apply it to the 6.',
    },
    hints: [
      'The three significant figures are still 4, 3, 6 — only the digit after them changed.',
      'The next digit is 7, which is 5 or more, so the 6 rounds up to 7.',
    ],
    solution:
      'The digit after the third significant figure is now $7 \\ge 5$, so the last kept digit ' +
      'goes up:\n\n$$4.367 \\approx 4.37 \\ (3 \\text{ s.f.})$$\n\nOn a number line, $4.367$ is ' +
      'nearer to $4.37$ than to $4.36$, which is what rounding means.',
    misconceptionCodes: ['exponents.round-before-finishing'],
  },
  {
    id: 'exponents.sigfig-3',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 1,
    sequence: { family: 'exponents.significant-figures', position: 3 },
    expect:
      'The third digit is now a $9$, and the digit after it is still $7$. Predict what happens ' +
      'when a $9$ has to round up.',
    statement: 'Round $4.397$ to 3 significant figures.',
    answer: { type: 'number', value: 4.4 },
    cpaPrompts: {
      concrete:
        'Count out $4.397$ on a number line marked in hundredths. The next mark up from $4.39$ ' +
        'is not $4.3\\text{-something}$ — what is it?',
      pictorial:
        'Draw the cut $4.39 \\,|\\, 7$ and try to add one to the 9. Where does the carry go?',
      abstract:
        'Rounding the third significant figure up takes $9$ to $10$, so a carry moves into the ' +
        'digit before it. Write the resulting number.',
    },
    hints: [
      'The three significant figures are 4, 3, 9, and the next digit is 7, so the 9 rounds up.',
      'A 9 rounding up becomes 10, so it carries: the 3 becomes a 4 and the 9 becomes 0.',
    ],
    solution:
      'The 9 rounds up and carries into the digit before it:\n\n$$4.397 \\approx 4.40 \\ ' +
      '(3 \\text{ s.f.})$$\n\nWritten as $4.40$, not $4.4$, when three significant figures are ' +
      'asked for — the trailing zero shows the precision that was claimed. Its value is $4.4$.',
    misconceptionCodes: ['exponents.round-before-finishing'],
  },
  {
    id: 'exponents.sigfig-4',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 1,
    sequence: { family: 'exponents.significant-figures', position: 4 },
    expect:
      'The same digits, but now with leading zeros: $0.004397$. Predict whether those zeros ' +
      'count as significant figures.',
    statement: 'Round $0.004397$ to 3 significant figures.',
    answer: { type: 'number', value: 0.0044 },
    cpaPrompts: {
      concrete:
        'Start reading the digits aloud from the left and stop at the first one that is not zero. ' +
        'That is where counting begins. Which digit is it?',
      pictorial:
        'Write $0.004397$ and cross out the zeros before the 4. Count three digits from the 4 and ' +
        'draw the cut line there.',
      abstract:
        'Leading zeros only mark place value, so the significant figures are 4, 3, 9. Apply the ' +
        'same rounding rule as the last question and keep the place value intact.',
    },
    hints: [
      'Significant figures are counted from the first non-zero digit, so start at the 4.',
      'The three significant figures are 4, 3, 9 and the next is 7 — the same rounding as before, ' +
        'with the leading zeros kept.',
    ],
    solution:
      'Leading zeros hold place value and are not significant, so counting starts at the 4:\n\n' +
      '$$0.004397 \\approx 0.00440 \\ (3 \\text{ s.f.})$$\n\nSame rounding as $4.397 \\to 4.40$, ' +
      'shifted three columns. Its value is $0.0044$.',
    misconceptionCodes: ['exponents.round-before-finishing', 'exponents.sign-of-index'],
  },
  {
    id: 'exponents.sigfig-5',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 1,
    sequence: { family: 'exponents.significant-figures', position: 5 },
    expect:
      'Same digits again, this time as a large number: $43970$. Predict whether the trailing ' +
      'zeros can be dropped from your answer.',
    statement: 'Round $43\\,970$ to 3 significant figures.',
    answer: { type: 'number', value: 44000 },
    cpaPrompts: {
      concrete:
        'Lay out $43\\,970$ with place-value discs. Rounding to 3 significant figures keeps the ' +
        'three left-most digits — but you cannot just delete the columns to their right. What ' +
        'must go in them?',
      pictorial:
        'Write $439 \\,|\\, 70$ with the cut after the third significant digit, then put the ' +
        'place-holders back so the number keeps its size.',
      abstract:
        'The three significant figures are 4, 3, 9 and the next digit is 7. Round, then restore ' +
        'the place value with zeros. Compare your answer with the previous two questions.',
    },
    hints: [
      'Count three significant figures from the left: 4, 3, 9. The next digit is 7.',
      'The 9 rounds up and carries, giving 4, 4, 0 — then add zeros to hold the place value.',
    ],
    solution:
      'The digits round exactly as in the last two questions, $439 \\to 440$, and then the ' +
      'place-holders go back:\n\n$$43{,}970 \\approx 44{,}000 \\ (3 \\text{ s.f.})$$\n\nThe ' +
      'payoff of the sequence: $4.397$, $0.004397$ and $43\\,970$ all round to the same three ' +
      'digits $4$, $4$, $0$. Significant figures are about *which digits you keep*; the power of ' +
      'ten looks after the size. In standard form all three are $4.40 \\times 10^n$.',
    misconceptionCodes: ['exponents.round-before-finishing', 'exponents.coefficient-out-of-range'],
  },

  // ---- Tier 2: unfamiliar surfaces ----
  {
    id: 'exponents.sf-subtract-drops-power',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 2,
    statement:
      'Evaluate $(5.1 \\times 10^6) - (4.9 \\times 10^6)$, giving your answer in standard form.',
    answer: { type: 'number', value: 200000 },
    cpaPrompts: {
      concrete:
        'You have 5.1 million-notes and you spend 4.9 of them. How many are left, and is that ' +
        'more or less than one whole million-note?',
      pictorial:
        'Draw two bars of length $5.1$ and $4.9$ in units of $10^6$ and shade the difference. The ' +
        'shaded piece is a small fraction of one unit.',
      abstract:
        'The units already match, so subtract the coefficients. The result is below 1, so ' +
        'renormalise before calling it standard form.',
    },
    hints: [
      'The powers of ten are equal, so subtract the coefficients directly.',
      '$5.1 - 4.9 = 0.2$, giving $0.2 \\times 10^6$. That coefficient is below 1 — shift it.',
    ],
    solution:
      'The units match, so the coefficients subtract:\n\n$$(5.1 - 4.9) \\times 10^6 = 0.2 \\times ' +
      '10^6 = 2 \\times 10^5 = 200{,}000.$$\n\nSubtracting two close numbers can drop the order ' +
      'of magnitude — here from millions to hundreds of thousands — so the final range check on ' +
      'the coefficient matters more for subtraction than for addition.',
    misconceptionCodes: [
      'exponents.coefficient-out-of-range',
      'exponents.add-without-matching-powers',
    ],
  },
  {
    id: 'exponents.sf-divide-small-coefficient',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 2,
    statement:
      'Evaluate $\\dfrac{2.4 \\times 10^3}{6.0 \\times 10^7}$, giving your answer in standard form.',
    answer: { type: 'number', value: 0.00004 },
    cpaPrompts: {
      concrete:
        'Take 2.4 thousand-notes and share them among $6 \\times 10^7$ people. Will each person ' +
        'get more or less than one whole unit — and does that make the index positive or ' +
        'negative?',
      pictorial:
        'Put both numbers on a factor-of-ten scale. The top is four steps *below* the bottom, so ' +
        'the answer sits well to the left of 1.',
      abstract:
        'Divide the coefficients and subtract the indices: $\\frac{2.4}{6.0} \\times 10^{3-7}$. ' +
        'Then fix the coefficient, which comes out below 1.',
    },
    hints: [
      'Coefficients and indices separately: $\\frac{2.4}{6.0}$ and $10^{3-7}$.',
      '$\\frac{2.4}{6.0} = 0.4$ and $10^{-4}$, so you have $0.4 \\times 10^{-4}$. Renormalise it.',
    ],
    solution:
      '$$\\frac{2.4 \\times 10^3}{6.0 \\times 10^7} = \\frac{2.4}{6.0} \\times 10^{3-7} = 0.4 ' +
      '\\times 10^{-4} = 4 \\times 10^{-5} = 0.00004.$$\n\nMultiplying the coefficient by ten ' +
      'means taking one off the index, so $-4$ becomes $-5$. The value is unchanged; only the ' +
      'dress is fixed.',
    misconceptionCodes: ['exponents.coefficient-out-of-range', 'exponents.sign-of-index'],
  },
  {
    id: 'exponents.sf-divide-three-sigfigs',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 2,
    statement:
      'Evaluate $\\dfrac{8.6 \\times 10^7}{2.4 \\times 10^3}$, giving your answer to 3 ' +
      'significant figures.',
    answer: { type: 'number', value: 86000000 / 2400, sigfigs: 3 },
    cpaPrompts: {
      concrete:
        'Do the division on a calculator and write down every digit it shows before you touch the ' +
        'rounding. Why is it worth keeping them all until the very end?',
      pictorial:
        'The indices are four steps apart, so the answer is somewhere in the ten thousands. Mark ' +
        'that region on a factor-of-ten scale before computing.',
      abstract:
        'Compute $\\frac{8.6}{2.4} \\times 10^{7-3}$ keeping full accuracy, and only then round ' +
        'the whole thing to 3 significant figures.',
    },
    hints: [
      'Split it: divide the coefficients, subtract the indices.',
      '$\\frac{8.6}{2.4} = 3.5833\\ldots$ — keep all those digits for now — and $10^{7-3} = 10^4$.',
      'Round only at the end: $3.5833\\ldots \\times 10^4$ to 3 significant figures.',
    ],
    solution:
      '$$\\frac{8.6 \\times 10^7}{2.4 \\times 10^3} = \\frac{8.6}{2.4} \\times 10^{4} = ' +
      '3.5833\\ldots \\times 10^4.$$\n\nRounding once, at the end:\n\n$$\\approx 3.58 \\times ' +
      '10^4 = 35{,}800 \\ (3 \\text{ s.f.})$$\n\nRounding $\\frac{8.6}{2.4}$ to $3.6$ before ' +
      'multiplying would have given $36{,}000$ — wrong in the third figure.',
    misconceptionCodes: ['exponents.round-before-finishing'],
  },

  // ---- Tier 3: contexts ----
  {
    id: 'exponents.light-in-an-hour',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 3,
    statement:
      'Light travels $3.0 \\times 10^8$ m every second. How far does light travel in one hour? ' +
      'Give your answer in metres in standard form.',
    answer: { type: 'number', value: 1.08e12 },
    cpaPrompts: {
      concrete:
        'Count the seconds in an hour out loud in stages: 60 seconds in a minute, 60 minutes in ' +
        'an hour. What single number do you need before you can start?',
      pictorial:
        'Draw a bar for one second\'s travel and imagine repeating it once for every second in an ' +
        'hour. What multiplication does that picture show?',
      abstract:
        'Write $3600$ as $3.6 \\times 10^3$, multiply the coefficients, add the indices, and ' +
        'check the coefficient is still in range.',
    },
    hints: [
      'How many seconds are there in an hour? Work that out first.',
      '$3600 = 3.6 \\times 10^3$. Now multiply: coefficients together, indices added.',
      '$3.0 \\times 3.6 = 10.8$ and $10^{8+3} = 10^{11}$. Is $10.8$ an allowed coefficient?',
    ],
    solution:
      'One hour is $60 \\times 60 = 3600 = 3.6 \\times 10^3$ seconds, so\n\n$$(3.0 \\times 10^8) ' +
      '\\times (3.6 \\times 10^3) = 10.8 \\times 10^{11} = 1.08 \\times 10^{12} \\text{ m}.$$\n\n' +
      'That is about $1.08$ trillion metres, or a little over a billion kilometres. The ' +
      'coefficient $10.8$ had to be renormalised, which pushed the index from 11 to 12.',
    misconceptionCodes: [
      'exponents.coefficient-out-of-range',
      'exponents.add-without-matching-powers',
    ],
  },
  {
    id: 'exponents.crate-of-bolts',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 3,
    statement:
      'A crate holds $2.5 \\times 10^4$ identical bolts. Each bolt has a mass of ' +
      '$8.0 \\times 10^{-3}$ kg. The empty crate itself has a mass of $12$ kg. What is the total ' +
      'mass of the full crate, in kilograms?',
    answer: { type: 'number', value: 212, unit: 'kg' },
    cpaPrompts: {
      concrete:
        'Weigh one bolt, then imagine 25 000 of them on the scale, and finally put the empty ' +
        'crate on too. Which of those steps is a multiplication and which is an addition?',
      pictorial:
        'Draw a bar for the bolts and a short bar for the crate joined on the end. Label each ' +
        'with the calculation that gives its length.',
      abstract:
        'Multiply $(2.5 \\times 10^4) \\times (8.0 \\times 10^{-3})$ for the bolts, then add the ' +
        '$12$ kg crate. Why does the addition need the numbers in ordinary form?',
    },
    hints: [
      'Two steps: the mass of all the bolts, then the crate on top.',
      'For the bolts: $2.5 \\times 8.0 = 20$ and $10^{4 + (-3)} = 10^1$, so $20 \\times 10^1$.',
      'That is $200$ kg of bolts. Now add the $12$ kg crate.',
    ],
    solution:
      'Mass of the bolts:\n\n$$(2.5 \\times 10^4) \\times (8.0 \\times 10^{-3}) = 20 \\times ' +
      '10^{1} = 2 \\times 10^2 = 200 \\text{ kg}.$$\n\nAdding the crate: $200 + 12 = 212$ kg. ' +
      'The multiplication needed no matching of powers; the final addition needed both numbers in ' +
      'the same units, which is why writing $200$ plainly was the easiest move.',
    misconceptionCodes: [
      'exponents.add-without-matching-powers',
      'exponents.coefficient-out-of-range',
    ],
  },

  // ---- Tier 4: reasoning about precision ----
  {
    id: 'exponents.precision-comparison',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 4,
    statement:
      'Two students measure the same metal rod. Aisha records $1.2$ m. Ben records $1.20$ m. ' +
      'Their teacher says one of these records the length more precisely than the other. How ' +
      'many significant figures does the more precise measurement have?',
    answer: { type: 'number', value: 3 },
    cpaPrompts: {
      concrete:
        'Find a ruler marked in centimetres and another marked in millimetres, and measure the ' +
        'same pencil with each. Which reading needs more digits to write down, and why?',
      pictorial:
        'Draw a number line from $1.15$ to $1.25$. Shade the stretch of rods that would be ' +
        'recorded as $1.2$, then the much shorter stretch that would be recorded as $1.20$.',
      abstract:
        'Count the significant figures in each record and say what range of true lengths each ' +
        'one covers. Which is the narrower range?',
    },
    hints: [
      'Count the significant figures in each: how many digits does each student write?',
      '$1.2$ means "somewhere between $1.15$ and $1.25$". What range does $1.20$ mean?',
      '$1.20$ pins the length between $1.195$ and $1.205$ — a ten times narrower window.',
    ],
    solution:
      '$1.2$ has 2 significant figures and covers everything from $1.15$ m to $1.25$ m. $1.20$ ' +
      'has **3** significant figures and covers only $1.195$ m to $1.205$ m — a window ten times ' +
      'narrower.\n\nSo Ben\'s measurement is the more precise, with **3 significant figures**. ' +
      'The trailing zero is not decoration: it is a claim about how carefully the rod was ' +
      'measured, which is exactly why intermediate values must not be rounded before the end of ' +
      'a calculation.',
    misconceptionCodes: ['exponents.round-before-finishing'],
  },

  // ---- Diagnostics for skill 4 ----
  {
    id: 'exponents.dx-add-without-matching-powers',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 'diagnostic',
    statement: 'Work out $(4.8 \\times 10^5) + (7.6 \\times 10^4)$, in standard form.',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$5.56 \\times 10^5$' },
        {
          label: 'B',
          value: '$12.4 \\times 10^9$',
          misconceptionCode: 'exponents.add-without-matching-powers',
        },
        {
          label: 'C',
          value: '$12.4 \\times 10^5$',
          misconceptionCode: 'exponents.coefficient-out-of-range',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'These are $\\$480{,}000$ and $\\$76{,}000$. Add them as money in your head first, and ' +
        'keep that figure to compare against each option.',
      pictorial:
        'Draw both numbers on one place-value chart. Do their leading digits sit in the same ' +
        'column? What has to happen before you can add them?',
      abstract:
        'Match the powers of ten, factor the common power out, then add only the coefficients — ' +
        'and check the coefficient you get is between 1 and 10.',
    },
    hints: [
      'Write both as ordinary numbers first: $480{,}000$ and $76{,}000$. Roughly what should the ' +
        'answer be?',
      'Match the powers: $7.6 \\times 10^4 = 0.76 \\times 10^5$, then add $4.8 + 0.76$.',
    ],
    solution:
      'Matching first: $7.6 \\times 10^4 = 0.76 \\times 10^5$, so\n\n$$(4.8 + 0.76) \\times 10^5 ' +
      '= 5.56 \\times 10^5 = 556{,}000.$$\n\n$12.4 \\times 10^9$ comes from adding the ' +
      'coefficients and the indices separately — it is over twenty thousand times too big. ' +
      '$12.4 \\times 10^5$ adds the coefficients without matching and then leaves a coefficient ' +
      'above 10, which is not standard form either.',
    misconceptionCodes: [
      'exponents.add-without-matching-powers',
      'exponents.coefficient-out-of-range',
    ],
  },
  {
    id: 'exponents.dx-round-before-finishing',
    skillIds: ['exponents.operations-scientific-notation'],
    tier: 'diagnostic',
    statement:
      'A square has an area of $2.00 \\times 10^2$ cm$^2$. Find its perimeter in centimetres, in ' +
      'standard form, to 3 significant figures.',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$5.66 \\times 10^1$ cm' },
        {
          label: 'B',
          value: '$5.64 \\times 10^1$ cm',
          misconceptionCode: 'exponents.round-before-finishing',
        },
        {
          label: 'C',
          value: '$56.6 \\times 10^0$ cm',
          misconceptionCode: 'exponents.coefficient-out-of-range',
        },
      ],
    },
    cpaPrompts: {
      concrete:
        'Work out $\\sqrt{200}$ on a calculator and leave every digit on the screen. Now ' +
        'multiply by 4 without clearing it. Then try again, writing down only 14.1 first, and ' +
        'compare the two answers.',
      pictorial:
        'Draw the square and label one side $\\sqrt{200}$. The perimeter is four of those sides ' +
        'laid end to end — so any error in one side is multiplied by four.',
      abstract:
        'Side $= \\sqrt{200}$; perimeter $= 4\\sqrt{200}$. Compute the whole thing at full ' +
        'accuracy and round once, at the very end.',
    },
    hints: [
      'The side of the square is $\\sqrt{200}$. Do not round it yet.',
      '$\\sqrt{200} = 14.1421\\ldots$ Multiply by 4 with all those digits, then round.',
      'Rounding the side to $14.1$ first and then multiplying gives $56.4$ — a different third ' +
        'figure.',
    ],
    solution:
      'Side $= \\sqrt{200} = 14.14213\\ldots$ cm, so\n\n$$\\text{perimeter} = 4 \\times ' +
      '14.14213\\ldots = 56.5685\\ldots \\approx 5.66 \\times 10^1 \\text{ cm} \\ ' +
      '(3 \\text{ s.f.})$$\n\nRounding the side to $14.1$ first gives $4 \\times 14.1 = 56.4$, ' +
      'so the third significant figure comes out wrong — the small error in the side was ' +
      'multiplied by four. $56.6 \\times 10^0$ has the right value but a coefficient above 10, so ' +
      'it is not standard form.',
    misconceptionCodes: [
      'exponents.round-before-finishing',
      'exponents.coefficient-out-of-range',
    ],
  },
];
