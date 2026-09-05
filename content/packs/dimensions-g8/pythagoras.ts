import type { Problem, SkillNode } from '@/lib/content/schema';

/**
 * Unit 10 — Pythagorean Theorem. Hand-authored.
 *
 * Source: docs/Implementation Manual (unit-tile squares on a 3-4-5 triangle) and the
 * Chapter 10 worked examples in the content spec.
 *
 * The through-line: $a^2 + b^2 = c^2$ is a statement about *areas* — the square built on
 * the hypotenuse holds exactly as many tiles as the two squares on the legs together. Once
 * it is an area fact, "which side is $c$" answers itself (the biggest square), and
 * subtracting to find a leg is obviously the only move that leaves a smaller square.
 */

export const pythagorasSkills: SkillNode[] = [
  {
    id: 'pythagoras.state-prove-pythagorean',
    title: 'State and prove the Pythagorean Theorem',
    summary:
      'See the theorem as a fact about three squares before it is a formula, and identify the ' +
      'hypotenuse as the side opposite the right angle.',
    prerequisites: [],
    cpa: {
      concrete:
        'Unit square tiles. Build a right-angled triangle with legs 3 and 4. Lay a $3 \\times 3$ ' +
        'square of tiles on one leg (9 tiles) and a $4 \\times 4$ square on the other (16). Now ' +
        'pick up all 25 tiles and try to build a single square along the hypotenuse. It comes out ' +
        '$5 \\times 5$ exactly — no tile left over, no gap.',
      pictorial:
        'The triangle with a square drawn outward on each side, each square labelled with its ' +
        'area. The two smaller areas add to the largest. The biggest square is always on the ' +
        'longest side, which is always opposite the right angle.',
      abstract:
        '$a^2 + b^2 = c^2$, where $c$ is the hypotenuse. The squares in the formula are the ' +
        'areas of the squares in the picture, which is why the relationship uses exponents at ' +
        'all.',
    },
    formulas: ['a^2 + b^2 = c^2'],
    misconceptions: [
      {
        code: 'pythagoras.hypotenuse-misidentified',
        description:
          'Puts a leg in the $c$ position — often whichever side was mentioned last — rather than ' +
          'the side opposite the right angle.',
        probe:
          'Put your finger on the right angle. Now slide it straight across the triangle to the ' +
          'side that does not touch that corner. Is that the side you called $c$?',
        correction:
          'The hypotenuse is the side opposite the right angle, and it is always the longest — ' +
          'its square has to hold both the other squares. $c$ is that side, whatever letter the ' +
          'question used for it.',
      },
    ],
    suggestedVisual: 'angle_diagram',
  },
  {
    id: 'pythagoras.calculate-unknown-side',
    title: 'Calculate unknown side lengths in right-angled triangles',
    summary:
      'Find a missing hypotenuse by adding two squares, and a missing leg by subtracting one ' +
      'square from the largest — and take the square root at the end.',
    prerequisites: ['pythagoras.state-prove-pythagorean'],
    cpa: {
      concrete:
        'Start with the hypotenuse square of 169 tiles and the known leg square of 25 tiles. The ' +
        'unknown leg\'s square is what is left when 25 tiles are taken *out* of 169: 144 tiles, ' +
        'which lay out as $12 \\times 12$. Adding would give 194 tiles — a square bigger than the ' +
        'hypotenuse\'s, which cannot sit on a shorter side.',
      pictorial:
        'The three-squares diagram with the known areas written in and the unknown left blank. ' +
        'Whether to add or subtract is read off which square is blank: the biggest, or one of ' +
        'the two smaller.',
      abstract:
        'Hypotenuse: $c = \\sqrt{a^2 + b^2}$. Leg: $b = \\sqrt{c^2 - a^2}$. Square, combine, ' +
        'then root; keep the exact surd unless asked to round.',
    },
    formulas: ['c = \\sqrt{a^2 + b^2}', 'b = \\sqrt{c^2 - a^2}'],
    misconceptions: [
      {
        code: 'pythagoras.add-squares-for-leg',
        description:
          'Adds the two known squares when the unknown is a leg, getting $13^2 + 5^2 = 194$ and a ' +
          'leg longer than the hypotenuse.',
        probe:
          'The hypotenuse is 13 cm — the longest side. Your answer for the leg is $\\sqrt{194}$. ' +
          'Is that bigger or smaller than 13? Can a leg be longer than the hypotenuse?',
        correction:
          'The hypotenuse square is the *total*, so a leg square is found by taking the other leg ' +
          'square away from it: $b^2 = 13^2 - 5^2 = 144$. Adding only applies when the ' +
          'hypotenuse is the unknown.',
      },
    ],
    suggestedVisual: 'angle_diagram',
  },
  {
    id: 'pythagoras.converse-pythagorean-theorem',
    title: 'Apply the Converse of the Pythagorean Theorem',
    summary:
      'Decide whether a triangle is right-angled from its three side lengths alone by testing ' +
      'whether the two smaller squares add to the largest.',
    prerequisites: ['pythagoras.calculate-unknown-side'],
    cpa: {
      concrete:
        'A loop of string with 12 equally spaced knots, pulled into a triangle with sides 3, 4 ' +
        'and 5 knots. The corner between the 3 and the 4 is a right angle — this is how ancient ' +
        'builders squared corners. Try 3, 4 and 6 knots: the corner opens out past a right angle.',
      pictorial:
        'Three squares drawn on the sides with areas filled in. If the two smaller areas add ' +
        'exactly to the largest, the angle between the two shorter sides is $90°$. If they fall ' +
        'short or overshoot, it is not.',
      abstract:
        'Converse: if $a^2 + b^2 = c^2$ for the three sides (with $c$ the longest), the angle ' +
        'opposite $c$ is a right angle. Test with the longest side as $c$ every time.',
    },
    formulas: ['a^2 + b^2 = c^2 \\implies \\angle C = 90°'],
    misconceptions: [
      {
        code: 'pythagoras.converse-wrong-side-squared',
        description:
          'Tests the converse with the wrong side as $c$ — squaring and adding the two longest, ' +
          'or comparing against a side that is not the longest — and so mis-classifies the ' +
          'triangle.',
        probe:
          'Which of the three sides would be the hypotenuse *if* the triangle turned out to be ' +
          'right-angled? Is that the side you compared the other two against?',
        correction:
          'Only the longest side can be a hypotenuse, so the test is always: do the squares of ' +
          'the two shorter sides add to the square of the longest? $7^2 + 24^2 = 625 = 25^2$, ' +
          'so the 7-24-25 triangle is right-angled.',
      },
    ],
    suggestedVisual: 'angle_diagram',
  },
  {
    id: 'pythagoras.solve-applied-spatial',
    title: 'Solve 2D and 3D applied spatial problems (space diagonals)',
    summary:
      'Find right-angled triangles hiding inside a situation — a ladder, a box, a diagonal ' +
      'through a room — and chain two of them for a diagonal in three dimensions.',
    prerequisites: ['pythagoras.converse-pythagorean-theorem'],
    cpa: {
      concrete:
        'A shoebox and a piece of string. Stretch the string across the bottom from corner to ' +
        'corner: that is one right-angled triangle, lying flat. Now lift one end to the top ' +
        'corner directly above: the string, the floor diagonal and the vertical edge make a ' +
        'second right-angled triangle standing up. Two triangles, used one after the other.',
      pictorial:
        'The cuboid drawn with the base diagonal dashed in, and the standing triangle shaded: ' +
        'base diagonal along the bottom, height up the edge, space diagonal as the hypotenuse.',
      abstract:
        '$d_{\\text{base}}^2 = l^2 + w^2$, then $D^2 = d_{\\text{base}}^2 + h^2$. Combined: ' +
        '$D = \\sqrt{l^2 + w^2 + h^2}$. All three dimensions contribute.',
    },
    formulas: ['D = \\sqrt{l^2 + w^2 + h^2}'],
    misconceptions: [
      {
        code: 'pythagoras.space-diagonal-two-dimensions',
        description:
          'Finds a box\'s space diagonal from only two of its dimensions — the length and the ' +
          'height, say — leaving the width out.',
        probe:
          'Point to where your diagonal starts and where it ends. Does it move across the length? ' +
          'Up the height? And across the width — or does it stay against one wall?',
        correction:
          'The space diagonal moves in all three directions at once, so all three lengths go into ' +
          'it: first the floor diagonal $\\sqrt{8^2 + 6^2} = 10$, then ' +
          '$\\sqrt{10^2 + 24^2} = 26$. Leaving one out measures a diagonal of a *face*.',
      },
    ],
    suggestedVisual: 'solid_net',
  },
];

export const pythagorasProblems: Problem[] = [
  {
    id: 'pythagoras.missing-leg',
    skillIds: ['pythagoras.calculate-unknown-side', 'pythagoras.state-prove-pythagorean'],
    difficulty: 'basic',
    statement:
      'A right-angled triangle has a hypotenuse of length 13 cm and one leg of length 5 cm. ' +
      'Find the length of the other leg.',
    answer: { type: 'number', value: 12, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Picture 169 tiles in a square on the hypotenuse and 25 tiles in a square on the short ' +
        'leg. How many tiles must the third square hold? Are you adding tiles or taking them away?',
      pictorial:
        'Draw the triangle with a square on each side. Write 169 in the biggest square and 25 in ' +
        'the small one. What goes in the third, and what side length gives that area?',
      abstract:
        'Substitute into $a^2 + b^2 = c^2$ with $c = 13$, isolate $b^2$, and take the positive ' +
        'square root.',
    },
    hints: [
      'Which side is the hypotenuse? Make sure that is the one on its own as $c^2$ in the ' +
        'equation.',
      'Substitute 13 for $c$ and 5 for $a$: $5^2 + b^2 = 13^2$.',
      'Subtract 25 from 169 to find $b^2$, then take the square root.',
    ],
    solution:
      '$5^2 + b^2 = 13^2 \\implies 25 + b^2 = 169 \\implies b^2 = 144$, so\n\n$$b = \\sqrt{144} ' +
      '= 12 \\text{ cm}.$$\n\n(5, 12, 13) is a Pythagorean triple.',
    misconceptionCodes: ['pythagoras.add-squares-for-leg', 'pythagoras.hypotenuse-misidentified'],
  },
  {
    id: 'pythagoras.converse-7-24-25',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    difficulty: 'basic',
    statement:
      'A triangle has sides of length 7 cm, 24 cm and 25 cm. Is it right-angled? Answer yes ' +
      'or no, and be ready to say why.',
    answer: { type: 'exact', value: 'yes', accepts: ['yes it is', 'it is', 'right-angled', 'right angled', 'yes, right-angled'] },
    cpaPrompts: {
      concrete:
        'If this triangle is right-angled, the tiles from the two smaller squares should exactly ' +
        'fill the biggest one. How many tiles are in each square?',
      pictorial:
        'Draw three squares with areas $7^2$, $24^2$ and $25^2$. Do the two smaller areas add ' +
        'up to the largest — exactly, or with something left over?',
      abstract:
        'Apply the converse with the longest side as $c$: test whether $7^2 + 24^2 = 25^2$.',
    },
    hints: [
      'Which side would have to be the hypotenuse if the triangle were right-angled? Only the ' +
        'longest side can be.',
      'Square the two shorter sides and add: $7^2 + 24^2$. Compare with $25^2$.',
    ],
    solution:
      'Longest side 25, so test $7^2 + 24^2 = 49 + 576 = 625$ and $25^2 = 625$. They are equal, ' +
      'so by the converse of Pythagoras the angle opposite the 25 cm side is $90°$.\n\n' +
      '**Yes**, it is right-angled.',
    misconceptionCodes: ['pythagoras.converse-wrong-side-squared'],
  },
  {
    id: 'pythagoras.space-diagonal',
    skillIds: ['pythagoras.solve-applied-spatial', 'pythagoras.calculate-unknown-side'],
    difficulty: 'advanced',
    statement:
      'A rectangular box has length 8 cm, width 6 cm and height 24 cm. Find the length of the ' +
      'internal diagonal joining two opposite corners.',
    answer: { type: 'number', value: 26, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Stretch a string across the floor of the box from corner to corner. That is one ' +
        'right-angled triangle. Now lift one end straight up to the top corner. What triangle ' +
        'does the string make now, and which of its sides do you already know?',
      pictorial:
        'Draw the box. Dash in the diagonal across the base, then shade the triangle made by that ' +
        'diagonal, the vertical edge, and the space diagonal. Label the two legs.',
      abstract:
        'Two applications of Pythagoras — base diagonal first, then the space diagonal — or the ' +
        'combined form $D = \\sqrt{l^2 + w^2 + h^2}$.',
    },
    hints: [
      'Break this into two steps. First find the diagonal across the bottom face of the box, ' +
        'which is an $8 \\times 6$ rectangle.',
      'Use that base diagonal and the vertical height as the two legs of a new right-angled ' +
        'triangle whose hypotenuse is the space diagonal.',
      'Compute $\\sqrt{8^2 + 6^2 + 24^2} = \\sqrt{676}$.',
    ],
    solution:
      'Base diagonal: $\\sqrt{8^2 + 6^2} = \\sqrt{100} = 10$ cm. Then the space diagonal $D$ is ' +
      'the hypotenuse of a triangle with legs 10 and 24:\n\n$$D = \\sqrt{10^2 + 24^2} = ' +
      '\\sqrt{676} = 26 \\text{ cm}.$$\n\nEquivalently $D = \\sqrt{8^2 + 6^2 + 24^2}$.',
    misconceptionCodes: ['pythagoras.space-diagonal-two-dimensions'],
  },
];
