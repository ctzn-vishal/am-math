import type { Problem, SkillNode } from '@/lib/content/schema';

/**
 * Unit 1 — Exponents and Scientific Notation. Hand-authored.
 *
 * Source: docs/Implementation Manual §2 (paper folding, place-value discs) and the Chapter 1
 * worked examples in the content spec.
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
  {
    id: 'exponents.simplify-index-expression',
    skillIds: ['exponents.index-laws-positive'],
    tier: 1,
    statement: 'Simplify $\\dfrac{2^5 \\cdot 2^{-2}}{2^7}$, giving your answer in positive index form.',
    answer: { type: 'exact', value: '1/16', accepts: ['0.0625', '1/2^4', '2^-4'] },
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
        'a^{p-q}$ and convert the negative index.',
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
    id: 'exponents.add-in-standard-form',
    skillIds: [
      'exponents.operations-scientific-notation',
      'exponents.numbers-standard-scientific',
    ],
    tier: 2,
    statement:
      'Evaluate $(4.8 \\times 10^5) + (7.6 \\times 10^4)$, giving your answer in standard form.',
    answer: { type: 'exact', value: '5.56 x 10^5', accepts: ['556000', '5.56e5', '5.56*10^5'] },
    cpaPrompts: {
      concrete:
        'These are $\\$480{,}000$ and $\\$76{,}000$. If you had four £100 notes and seven £10 ' +
        'notes, could you add the 4 and the 7 directly? What would you do first?',
      pictorial:
        'Put both on one place-value chart. Shift the smaller number one column so its digits line ' +
        'up with the larger. What does $7.6 \\times 10^4$ become when written against $10^5$?',
      abstract: 'Match the powers of ten, factor out the common power, then add the coefficients.',
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
      '$480{,}000 + 76{,}000 = 556{,}000$. ✓',
    misconceptionCodes: [
      'exponents.add-without-matching-powers',
      'exponents.coefficient-out-of-range',
    ],
  },
  {
    id: 'exponents.magnitude-ratio',
    skillIds: ['exponents.compare-orders-magnitude'],
    tier: 1,
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
        'Divide: $\\frac{6 \\times 10^{24}}{7.3 \\times 10^{22}} = \\frac{6}{7.3} \\times 10^{2}$.',
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
      'Moon — two orders of magnitude, trimmed a little by the coefficients.',
    misconceptionCodes: ['exponents.linear-magnitude'],
  },
];
