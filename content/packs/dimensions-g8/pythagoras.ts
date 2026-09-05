import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';

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

// ---------------------------------------------------------------------------
// Shared figures
// ---------------------------------------------------------------------------

/** A right angle at B, legs along the axes, hypotenuse sloping — the "textbook" orientation. */
const rightAngleAtB = {
  kind: 'angle_diagram' as const,
  title: 'Triangle ABC',
  caption: 'The small square at B marks the right angle.',
  points: [
    { id: 'A', x: 0, y: 30, label: 'A' },
    { id: 'B', x: 0, y: 0, label: 'B' },
    { id: 'C', x: 40, y: 0, label: 'C' },
  ],
  segments: [
    { from: 'A', to: 'B' },
    { from: 'B', to: 'C' },
    { from: 'C', to: 'A' },
  ],
  angles: [{ from: 'A', vertex: 'B', to: 'C', label: '90°', value: 90 }],
};

const box8x6x24 = {
  kind: 'solid_net' as const,
  solid: 'cuboid' as const,
  view: 'solid' as const,
  dimensions: { length: 8, width: 6, height: 24 },
  caption: 'A box 8 cm long, 6 cm wide and 24 cm tall. All lengths in cm.',
};

const YES = {
  type: 'exact' as const,
  value: 'yes',
  accepts: ['yes it is', 'it is', 'right-angled', 'right angled', 'yes, right-angled', 'yes it is right-angled', 'true'],
};

const NO = {
  type: 'exact' as const,
  value: 'no',
  accepts: ['no it is not', 'it is not', 'not right-angled', 'not right angled', 'no, not right-angled', 'no it isn\'t', 'false'],
};

export const pythagorasProblems: Problem[] = [
  // =========================================================================
  // Skill 1 — state and prove: name the hypotenuse, count the tiles
  // =========================================================================

  // ---- Tier 1: family pythagoras.name-the-hypotenuse (6 items) ----
  {
    id: 'pythagoras.hyp-name-1',
    skillIds: ['pythagoras.state-prove-pythagorean'],
    tier: 1,
    sequence: { family: 'pythagoras.name-the-hypotenuse', position: 1 },
    statement:
      'In triangle $ABC$, the angle at $B$ is $90°$. Name the hypotenuse.',
    answer: { type: 'exact', value: 'AC', accepts: ['CA', 'side AC', 'side CA'] },
    cpaPrompts: {
      concrete:
        'Put a finger on the corner $B$ where the two edges meet squarely. Which edge does your ' +
        'finger not touch at all?',
      pictorial:
        'Draw the triangle and mark the right angle with a small square. Which side is on the ' +
        'opposite side of the triangle from that square?',
      abstract:
        'The hypotenuse is the side opposite the right angle, so it is named by the two vertices ' +
        'that are *not* the right angle.',
    },
    hints: [
      'The hypotenuse is the side that does not touch the right angle.',
      'The right angle is at $B$. The two sides through $B$ are $AB$ and $BC$ — so the hypotenuse is the third side.',
    ],
    solution:
      'The right angle is at $B$, so the sides $AB$ and $BC$ are the legs. The side opposite ' +
      '$B$, joining the other two vertices, is the hypotenuse:\n\n$$AC.$$\n\nIt is also the ' +
      'longest side — the slanted one in the picture.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
    figure: rightAngleAtB,
  },
  {
    id: 'pythagoras.hyp-name-2',
    skillIds: ['pythagoras.state-prove-pythagorean'],
    tier: 1,
    sequence: { family: 'pythagoras.name-the-hypotenuse', position: 2 },
    expect:
      'Same kind of triangle, but turned so the right angle is at the top. Does the hypotenuse ' +
      'stay at the bottom, or does it move with the right angle? Decide before you look.',
    statement:
      'In triangle $PQR$, the angle at $Q$ is $90°$. The triangle is drawn with $Q$ at the top. ' +
      'Name the hypotenuse.',
    answer: { type: 'exact', value: 'PR', accepts: ['RP', 'side PR', 'side RP'] },
    cpaPrompts: {
      concrete:
        'Cut the triangle out of card and turn it so the square corner points upward. Which edge ' +
        'is now lying along the bottom, away from the square corner?',
      pictorial:
        'Mark the right angle at $Q$ with a small square. Trace across the triangle from that ' +
        'square to the side that does not touch $Q$.',
      abstract:
        'Orientation does not matter: the hypotenuse is always opposite the right angle, so it ' +
        'joins the two vertices other than $Q$.',
    },
    hints: [
      'Turning the triangle does not change which side is opposite the right angle.',
      'The right angle is at $Q$, so $PQ$ and $QR$ are legs. Name the remaining side.',
    ],
    solution:
      'The right angle is at $Q$. The legs are $PQ$ and $QR$; the side opposite $Q$ is\n\n' +
      '$$PR.$$\n\nHere the hypotenuse is the bottom edge, because the right angle points up.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
    figure: {
      kind: 'angle_diagram',
      title: 'Triangle PQR',
      caption: 'The right angle at Q is at the top of the picture.',
      points: [
        { id: 'P', x: -40, y: 10, label: 'P' },
        { id: 'Q', x: 0, y: 40, label: 'Q' },
        { id: 'R', x: 30, y: 0, label: 'R' },
      ],
      segments: [
        { from: 'P', to: 'Q' },
        { from: 'Q', to: 'R' },
        { from: 'R', to: 'P' },
      ],
      angles: [{ from: 'P', vertex: 'Q', to: 'R', label: '90°', value: 90 }],
    },
  },
  {
    id: 'pythagoras.hyp-name-3',
    skillIds: ['pythagoras.state-prove-pythagorean'],
    tier: 1,
    sequence: { family: 'pythagoras.name-the-hypotenuse', position: 3 },
    expect:
      'This time no side is horizontal or vertical — the whole triangle is tilted. Will the ' +
      'rule "opposite the right angle" still pick out one side without any doubt?',
    statement:
      'In triangle $KLM$, the angle at $M$ is $90°$. No side of the triangle is horizontal. ' +
      'Name the hypotenuse.',
    answer: { type: 'exact', value: 'KL', accepts: ['LK', 'side KL', 'side LK'] },
    cpaPrompts: {
      concrete:
        'Hold the card triangle at a slant. Whichever way you tilt it, one edge never touches the ' +
        'square corner. Which edge is that here?',
      pictorial:
        'Mark the right angle at $M$. The two sides that meet at $M$ are the legs; shade them. ' +
        'The unshaded side is the hypotenuse.',
      abstract:
        'Hypotenuse $=$ the side joining the two vertices that are not the right angle: $K$ and ' +
        '$L$.',
    },
    hints: [
      'Ignore the tilt. Find the right angle first.',
      'The right angle is at $M$. The hypotenuse is the side that does not have $M$ in its name.',
    ],
    solution:
      'The right angle is at $M$, so $KM$ and $LM$ are legs and the hypotenuse is\n\n$$KL.$$\n\n' +
      'The orientation of the drawing is irrelevant; only the position of the right angle matters.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
    figure: {
      kind: 'angle_diagram',
      title: 'Triangle KLM',
      caption: 'A tilted triangle. Find the right angle before naming anything.',
      points: [
        { id: 'K', x: 30, y: 40, label: 'K' },
        { id: 'L', x: 40, y: -30, label: 'L' },
        { id: 'M', x: 0, y: 0, label: 'M' },
      ],
      segments: [
        { from: 'K', to: 'M' },
        { from: 'M', to: 'L' },
        { from: 'L', to: 'K' },
      ],
      angles: [{ from: 'K', vertex: 'M', to: 'L', label: '90°', value: 90 }],
    },
  },
  {
    id: 'pythagoras.hyp-tiles-3-4-5',
    skillIds: ['pythagoras.state-prove-pythagorean'],
    tier: 1,
    sequence: { family: 'pythagoras.name-the-hypotenuse', position: 4 },
    expect:
      'Now the sides have lengths instead of just letters, and squares of tiles are built on ' +
      'them. Before counting: will the square on the hypotenuse hold more tiles, fewer, or ' +
      'exactly as many as the other two squares together?',
    statement:
      'A right-angled triangle has legs of length 3 and 4. A square of unit tiles is built on ' +
      'each leg: 9 tiles and 16 tiles. A square of tiles is built on the hypotenuse too. How ' +
      'many tiles does it hold?',
    answer: { type: 'number', value: 25, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Take the 9 tiles and the 16 tiles and push them together into one pile. Try to lay the ' +
        'pile out as a single square. How many along each edge?',
      pictorial:
        'Draw the three squares on the triangle and write the two known areas in. The third ' +
        'square must hold both of them.',
      abstract:
        'The theorem: $3^2 + 4^2 = c^2$. So $c^2 = 25$ tiles, and $c = 5$.',
    },
    hints: [
      'The square on the hypotenuse holds exactly as many tiles as the two leg squares together.',
      'Add: $9 + 16$.',
    ],
    solution:
      'The square on the hypotenuse holds the tiles of both leg squares:\n\n$$9 + 16 = 25.$$\n\n' +
      'And 25 tiles lay out as a $5 \\times 5$ square, so the hypotenuse is 5 — the (3, 4, 5) ' +
      'triangle.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },
  {
    id: 'pythagoras.hyp-tiles-third-square',
    skillIds: ['pythagoras.state-prove-pythagorean'],
    tier: 1,
    sequence: { family: 'pythagoras.name-the-hypotenuse', position: 5 },
    expect:
      'Reversed: this time the biggest square is given and one of the small squares is ' +
      'missing. Will the missing square hold more than 169 tiles, or fewer?',
    statement:
      'Squares of tiles are built on the three sides of a right-angled triangle. The square on ' +
      'the hypotenuse holds 169 tiles and the square on one leg holds 25 tiles. How many tiles ' +
      'are in the square on the other leg?',
    answer: { type: 'number', value: 144, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Start with the 169-tile square. Take 25 tiles out of it to make the small leg square. ' +
        'How many tiles are left for the other leg?',
      pictorial:
        'Draw the three squares with 169 in the largest and 25 in one small one. The blank square ' +
        'and the 25 together must make 169.',
      abstract:
        '$25 + b^2 = 169$, so $b^2 = 169 - 25$.',
    },
    hints: [
      'The two leg squares together make the hypotenuse square. One leg square is 25; the total is 169.',
      'Subtract: $169 - 25$.',
    ],
    solution:
      'The leg squares add to the hypotenuse square, so the missing one is\n\n$$169 - 25 = 144$$\n\n' +
      'tiles, a $12 \\times 12$ square. The triangle is (5, 12, 13).',
    misconceptionCodes: ['pythagoras.add-squares-for-leg', 'pythagoras.hypotenuse-misidentified'],
  },
  {
    id: 'pythagoras.hyp-largest-square',
    skillIds: ['pythagoras.state-prove-pythagorean'],
    tier: 1,
    sequence: { family: 'pythagoras.name-the-hypotenuse', position: 6 },
    expect:
      'No right angle is marked at all this time — you are given only three areas. Can the ' +
      'areas alone tell you which square sits on the hypotenuse? What is the rule?',
    statement:
      'Squares of area $36$, $64$ and $100$ are drawn on the three sides of a right-angled ' +
      'triangle. Which of the three areas is the square on the hypotenuse?',
    answer: { type: 'number', value: 100, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Three piles of tiles: 36, 64 and 100. Which pile can be made from the other two piles ' +
        'pushed together?',
      pictorial:
        'Sketch the three squares on a triangle. The hypotenuse is the longest side, so it must ' +
        'carry the biggest square.',
      abstract:
        'Check $36 + 64 = 100$: the two smaller areas add to the largest, so the largest is $c^2$.',
    },
    hints: [
      'The hypotenuse is the longest side. Which side carries the largest square?',
      'Confirm with the theorem: do the two smaller areas add to the largest?',
    ],
    solution:
      'The hypotenuse is the longest side, so its square is the largest: $100$. Check: ' +
      '$36 + 64 = 100$. ✓\n\nThe rule: the square on the hypotenuse is always the biggest, and ' +
      'it always equals the other two added together.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },

  // ---- Tier 2: the proof by rearrangement ----
  {
    id: 'pythagoras.rearrangement-3-4',
    skillIds: ['pythagoras.state-prove-pythagorean'],
    tier: 2,
    statement:
      'Four identical right-angled triangles with legs $3$ and $4$ are placed in the corners of ' +
      'a square of side $7$, leaving a tilted square in the middle. Find the area of the tilted ' +
      'square.',
    answer: { type: 'number', value: 25, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Cut four 3-by-4 right-angled triangles from card and fit them into the corners of a ' +
        '7-by-7 square. The hole in the middle is a square. What are its edges made of?',
      pictorial:
        'Draw the $7 \\times 7$ square with the four triangles shaded. The area left unshaded is ' +
        'the big square minus the four triangles.',
      abstract:
        'Area of tilted square $= 7^2 - 4 \\times \\tfrac{1}{2}(3)(4)$. Each edge of the tilted ' +
        'square is a hypotenuse, so this is $c^2$.',
    },
    hints: [
      'Find the area of the big square and the area of one triangle.',
      'Each triangle has area $\\tfrac{1}{2} \\times 3 \\times 4 = 6$. Subtract all four from $49$.',
    ],
    solution:
      'Big square: $7^2 = 49$. Four triangles: $4 \\times \\tfrac{1}{2} \\times 3 \\times 4 = 24$. ' +
      'Tilted square:\n\n$$49 - 24 = 25.$$\n\nEach side of the tilted square is a hypotenuse, so ' +
      '$c^2 = 25 = 3^2 + 4^2$ — the theorem, seen as a rearrangement.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
    figure: {
      kind: 'angle_diagram',
      title: 'Four triangles in a square',
      caption: 'The outer square has side 7; each triangle has legs 3 and 4.',
      points: [
        { id: 'A', x: 0, y: 0 },
        { id: 'B', x: 70, y: 0 },
        { id: 'C', x: 70, y: 70 },
        { id: 'D', x: 0, y: 70 },
        { id: 'E', x: 30, y: 0 },
        { id: 'F', x: 70, y: 30 },
        { id: 'G', x: 40, y: 70 },
        { id: 'H', x: 0, y: 40 },
      ],
      segments: [
        { from: 'A', to: 'B' },
        { from: 'B', to: 'C' },
        { from: 'C', to: 'D' },
        { from: 'D', to: 'A' },
        { from: 'E', to: 'F', ticks: 1 },
        { from: 'F', to: 'G', ticks: 1 },
        { from: 'G', to: 'H', ticks: 1 },
        { from: 'H', to: 'E', ticks: 1 },
      ],
      angles: [],
    },
  },
  {
    id: 'pythagoras.rearrangement-general',
    skillIds: ['pythagoras.state-prove-pythagorean'],
    tier: 2,
    statement:
      'Four identical right-angled triangles with legs $a$ and $b$ are placed in the corners of ' +
      'a square of side $a + b$, leaving a tilted square in the middle. Write an expression for ' +
      'the area of the tilted square in terms of $a$ and $b$, simplified.',
    answer: { type: 'expression', value: 'a^2+b^2', variables: ['a', 'b'], form: 'simplified' },
    cpaPrompts: {
      concrete:
        'Same four card triangles as before, but now the legs are unknown lengths $a$ and $b$. ' +
        'The big square\'s side is a leg of one triangle and a leg of the next: $a + b$.',
      pictorial:
        'Label the big square $(a+b)$ on each side and each triangle $\\tfrac{1}{2}ab$. The tilted ' +
        'square is what remains.',
      abstract:
        '$(a+b)^2 - 4 \\times \\tfrac{1}{2}ab$. Expand and collect — the middle term cancels.',
    },
    hints: [
      'Big square minus four triangles: $(a+b)^2 - 4 \\times \\tfrac{1}{2}ab$.',
      'Expand $(a+b)^2 = a^2 + 2ab + b^2$. What cancels with $2ab$?',
    ],
    solution:
      'Area $= (a+b)^2 - 4 \\cdot \\tfrac{1}{2}ab = a^2 + 2ab + b^2 - 2ab$, so\n\n' +
      '$$\\text{area} = a^2 + b^2.$$\n\nBut every side of the tilted square is the hypotenuse ' +
      '$c$, so its area is also $c^2$. Hence $a^2 + b^2 = c^2$ — that is the proof.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },

  // ---- Tier 3: contexts (no cue words) ----
  {
    id: 'pythagoras.patio-on-the-path',
    skillIds: ['pythagoras.state-prove-pythagorean'],
    tier: 3,
    statement:
      'A rectangular garden is $3$ m by $4$ m. A straight path runs from one corner to the ' +
      'opposite corner, cutting the garden into two halves. Along the two outside edges of one ' +
      'half, square patios are laid using 1 m slabs: one patio uses 9 slabs and the other 16. ' +
      'A third square patio, edge to edge with the path, is to be laid with the same slabs. ' +
      'How many slabs does it need?',
    answer: { type: 'number', value: 25, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay the 9 slabs and the 16 slabs out as two squares against the garden edges. Sweep them ' +
        'into one pile: can that pile make a square whose edge is the path?',
      pictorial:
        'Draw the rectangle and its diagonal. One half is a triangle with a square corner at the ' +
        'garden corner. Sketch a square on each of its three sides.',
      abstract:
        'The path is opposite the square corner, so its patio is $c^2 = 3^2 + 4^2$.',
    },
    hints: [
      'What shape is one half of the garden? Which of its corners is square?',
      'The path is the side opposite that square corner, so its square holds both other squares: $9 + 16$.',
    ],
    solution:
      'Half the garden is a right-angled triangle with legs 3 m and 4 m, and the path is its ' +
      'hypotenuse. The square on the hypotenuse holds the two leg squares:\n\n$$9 + 16 = 25$$\n\n' +
      'slabs, so the path is 5 m long.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },
  {
    id: 'pythagoras.tilted-flowerbed',
    skillIds: ['pythagoras.state-prove-pythagorean'],
    tier: 3,
    statement:
      'A square lawn has sides of $7$ m. A square flower bed is set inside it, tilted, with each ' +
      'corner of the bed touching a side of the lawn $3$ m from a corner of the lawn. The four ' +
      'grass pieces left in the corners are identical. Find the area of the flower bed in m$^2$.',
    answer: { type: 'number', value: 25, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Mark $3$ m from each corner along the lawn edges and join the marks. What shape is each ' +
        'grass corner, and what are its two straight edges?',
      pictorial:
        'Draw the $7 \\times 7$ lawn, mark the four points, join them. Each corner piece is a ' +
        'right-angled triangle with legs 3 and $7 - 3 = 4$.',
      abstract:
        'Bed $= 7^2 - 4 \\times \\tfrac{1}{2}(3)(4)$. Equivalently $c^2 = 3^2 + 4^2$.',
    },
    hints: [
      'Each grass corner is a triangle. Its two straight edges are 3 m and $7 - 3$ m.',
      'Lawn area minus the four corner triangles gives the bed.',
    ],
    solution:
      'Each corner triangle has legs 3 and 4, area $6$. Bed area:\n\n$$49 - 4 \\times 6 = 25 ' +
      '\\text{ m}^2.$$\n\nThe bed\'s side is 5 m, the hypotenuse of a 3-4 right-angled triangle — ' +
      'the rearrangement proof in the ground.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },

  // ---- Diagnostic ----
  {
    id: 'pythagoras.dx-hypotenuse-misidentified',
    skillIds: ['pythagoras.state-prove-pythagorean'],
    tier: 'diagnostic',
    statement:
      'In triangle $XYZ$, the angle at $Y$ is $90°$. The sides are $XZ$, $XY$ and $YZ$. Which ' +
      'side is $c$ in $a^2 + b^2 = c^2$?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$XY$', misconceptionCode: 'pythagoras.converse-wrong-side-squared' },
        { label: 'B', value: '$XZ$' },
        { label: 'C', value: '$YZ$', misconceptionCode: 'pythagoras.hypotenuse-misidentified' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Put a finger on $Y$, the square corner. Which of the three sides does your finger not touch?',
      pictorial:
        'Draw the triangle with the right angle at $Y$. The side opposite that square is $c$.',
      abstract:
        '$c$ is the hypotenuse, opposite the right angle, so it joins the two vertices that are not $Y$.',
    },
    hints: [
      '$c$ is always the hypotenuse — the side opposite the right angle.',
      'The right angle is at $Y$. Both $XY$ and $YZ$ touch $Y$, so neither can be $c$.',
    ],
    solution:
      'The right angle is at $Y$, so $XY$ and $YZ$ are the legs and the hypotenuse is $XZ$. ' +
      'Therefore $c = XZ$. Naming $YZ$ — the side mentioned last — is the common error; the ' +
      'letter order in the question has nothing to do with it.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified', 'pythagoras.converse-wrong-side-squared'],
  },

  // =========================================================================
  // Skill 2 — calculate an unknown side
  // =========================================================================

  // ---- Tier 1: family pythagoras.find-a-side (7 items) ----
  {
    id: 'pythagoras.hyp-3-4',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 1,
    sequence: { family: 'pythagoras.find-a-side', position: 1 },
    statement:
      'A right-angled triangle has legs of length $3$ cm and $4$ cm. Find the length of the ' +
      'hypotenuse.',
    answer: { type: 'number', value: 5, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Build the two leg squares from tiles: 9 and 16. Push them together and lay the 25 tiles ' +
        'out as one square. How long is its edge?',
      pictorial:
        'Draw the triangle with a square on each side. Write 9 and 16 in the leg squares; what ' +
        'goes in the third, and what side length gives that area?',
      abstract:
        '$c^2 = 3^2 + 4^2 = 25$, so $c = \\sqrt{25}$.',
    },
    hints: [
      'Square both legs and add.',
      '$9 + 16 = 25$. The hypotenuse is the square root of that.',
    ],
    solution:
      '$c^2 = 3^2 + 4^2 = 9 + 16 = 25$, so\n\n$$c = \\sqrt{25} = 5 \\text{ cm}.$$\n\nCheck: 5 is ' +
      'longer than both legs, as a hypotenuse must be.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
    figure: {
      kind: 'angle_diagram',
      title: 'Legs 3 and 4',
      caption: 'Legs 3 cm (vertical) and 4 cm (horizontal). Find the sloping side.',
      points: [
        { id: 'A', x: 0, y: 30, label: 'A' },
        { id: 'B', x: 0, y: 0, label: 'B' },
        { id: 'C', x: 40, y: 0, label: 'C' },
      ],
      segments: [
        { from: 'A', to: 'B' },
        { from: 'B', to: 'C' },
        { from: 'C', to: 'A', style: 'dashed' },
      ],
      angles: [{ from: 'A', vertex: 'B', to: 'C', label: '90°', value: 90 }],
    },
  },
  {
    id: 'pythagoras.hyp-6-8',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 1,
    sequence: { family: 'pythagoras.find-a-side', position: 2 },
    expect:
      'Both legs have doubled, from 3 and 4 to 6 and 8. Predict: does the hypotenuse double ' +
      'too, or does it quadruple like the areas of the squares?',
    statement:
      'A right-angled triangle has legs of length $6$ cm and $8$ cm. Find the length of the ' +
      'hypotenuse.',
    answer: { type: 'number', value: 10, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'The leg squares are now 36 and 64 tiles — four times as many as before. Push them ' +
        'together: 100 tiles. What edge does a 100-tile square have?',
      pictorial:
        'Draw the three squares with 36 and 64 written in. The third holds 100.',
      abstract:
        '$c^2 = 6^2 + 8^2 = 100$, so $c = 10$ — double the previous 5, even though the areas ' +
        'quadrupled.',
    },
    hints: [
      'Square both legs and add: $36 + 64$.',
      '$c^2 = 100$. Take the square root.',
    ],
    solution:
      '$c^2 = 6^2 + 8^2 = 36 + 64 = 100$, so\n\n$$c = 10 \\text{ cm}.$$\n\nDoubling both legs ' +
      'doubles the hypotenuse: (6, 8, 10) is (3, 4, 5) scaled by 2. The areas went up by 4, but ' +
      'the square root brings the length back to a factor of 2.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },
  {
    id: 'pythagoras.hyp-5-12',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 1,
    sequence: { family: 'pythagoras.find-a-side', position: 3 },
    expect:
      'These legs, 5 and 12, are not a multiple of 3 and 4. Predict: will the hypotenuse still ' +
      'come out as a whole number? What would you need $25 + 144$ to be?',
    statement:
      'A right-angled triangle has legs of length $5$ cm and $12$ cm. Find the length of the ' +
      'hypotenuse.',
    answer: { type: 'number', value: 13, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Leg squares of 25 and 144 tiles. Together that is 169 tiles. Can 169 tiles be laid out ' +
        'as an exact square? Try 13 along each edge.',
      pictorial:
        'Three squares on the triangle: 25, 144 and the sum. Is the sum a square number?',
      abstract:
        '$c^2 = 5^2 + 12^2 = 169 = 13^2$.',
    },
    hints: [
      'Square both legs: $25$ and $144$. Add them.',
      '$c^2 = 169$. Is 169 a square number?',
    ],
    solution:
      '$c^2 = 5^2 + 12^2 = 25 + 144 = 169$, so\n\n$$c = \\sqrt{169} = 13 \\text{ cm}.$$\n\n' +
      '(5, 12, 13) is a second Pythagorean triple, not related to (3, 4, 5) by scaling.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },
  {
    id: 'pythagoras.missing-leg',
    skillIds: ['pythagoras.calculate-unknown-side', 'pythagoras.state-prove-pythagorean'],
    tier: 1,
    sequence: { family: 'pythagoras.find-a-side', position: 4 },
    expect:
      'Reversed: the hypotenuse 13 is now given and one leg is missing. Which operation ' +
      'changes — do you still add the two squares, or not? Predict whether the leg will be ' +
      'shorter or longer than 13.',
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
    id: 'pythagoras.leg-10-6',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 1,
    sequence: { family: 'pythagoras.find-a-side', position: 5 },
    expect:
      'Same shape of question — hypotenuse and one leg given — with new numbers 10 and 6. ' +
      'Before working: the answer must be less than 10. Which triple do you expect to appear?',
    statement:
      'A right-angled triangle has a hypotenuse of length $10$ cm and one leg of length $6$ cm. ' +
      'Find the length of the other leg.',
    answer: { type: 'number', value: 8, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        '100 tiles on the hypotenuse, 36 on the known leg. Take the 36 out of the 100. How many ' +
        'tiles remain, and what square do they make?',
      pictorial:
        'Three squares: 100 in the largest, 36 in one small one, the other blank. The blank ' +
        'plus 36 is 100.',
      abstract:
        '$b^2 = 10^2 - 6^2 = 64$, so $b = 8$.',
    },
    hints: [
      'The hypotenuse is 10, so $10^2$ is the total. Subtract $6^2$ from it.',
      '$100 - 36 = 64$. Square root.',
    ],
    solution:
      '$b^2 = 10^2 - 6^2 = 100 - 36 = 64$, so\n\n$$b = 8 \\text{ cm}.$$\n\nThe triangle is ' +
      '(6, 8, 10). Check: $8 < 10$, so the leg is shorter than the hypotenuse. ✓',
    misconceptionCodes: ['pythagoras.add-squares-for-leg'],
  },
  {
    id: 'pythagoras.hyp-2-3',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 1,
    sequence: { family: 'pythagoras.find-a-side', position: 6 },
    expect:
      'Legs 2 and 3 now. $4 + 9 = 13$, and 13 is not a square number. Does the theorem stop ' +
      'working, or does the answer stop being a whole number? How would you write it?',
    statement:
      'A right-angled triangle has legs of length $2$ cm and $3$ cm. Find the length of the ' +
      'hypotenuse. Give your answer in exact form, or to 2 decimal places.',
    answer: { type: 'number', value: Math.sqrt(13), tolerance: 0.005, unit: 'cm' },
    cpaPrompts: {
      concrete:
        '4 tiles and 9 tiles make 13 tiles. Try to lay 13 tiles as a square — you cannot with ' +
        'whole tiles. The square exists, but its edge is not a whole number.',
      pictorial:
        'Draw the three squares with 4, 9 and 13. The third square is real; its side is the ' +
        'number that squares to 13.',
      abstract:
        '$c^2 = 13$, so $c = \\sqrt{13}$. Leave it as a surd: $\\sqrt{13} \\approx 3.61$.',
    },
    hints: [
      'Square and add as before: $2^2 + 3^2$.',
      '$c^2 = 13$. The exact answer is $\\sqrt{13}$; do not round unless asked.',
    ],
    solution:
      '$c^2 = 2^2 + 3^2 = 4 + 9 = 13$, so\n\n$$c = \\sqrt{13} \\text{ cm} \\approx 3.61 ' +
      '\\text{ cm}.$$\n\nThe theorem gives $c^2$ exactly every time; only sometimes is $c$ a whole ' +
      'number. Keep $\\sqrt{13}$ as the exact value.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },
  {
    id: 'pythagoras.leg-6-5-2-5',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 1,
    sequence: { family: 'pythagoras.find-a-side', position: 7 },
    expect:
      'Decimals now: hypotenuse 6.5, leg 2.5. Does the method change at all? Predict whether ' +
      'the answer will be a decimal or a whole number — think of 5-12-13 halved.',
    statement:
      'A right-angled triangle has a hypotenuse of length $6.5$ cm and one leg of length $2.5$ ' +
      'cm. Find the length of the other leg.',
    answer: { type: 'number', value: 6, tolerance: 1e-6, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Halve every side of the (5, 12, 13) triangle: 2.5, 6, 6.5. The tile picture still ' +
        'works with quarter-tiles: $42.25 - 6.25 = 36$.',
      pictorial:
        'Three squares with $6.5^2 = 42.25$ in the largest and $2.5^2 = 6.25$ in a small one. ' +
        'The blank square holds the difference.',
      abstract:
        '$b^2 = 6.5^2 - 2.5^2 = 42.25 - 6.25 = 36$, so $b = 6$.',
    },
    hints: [
      'Same method: square the hypotenuse, subtract the square of the known leg.',
      '$42.25 - 6.25 = 36$. Square root.',
    ],
    solution:
      '$b^2 = 6.5^2 - 2.5^2 = 42.25 - 6.25 = 36$, so\n\n$$b = 6 \\text{ cm}.$$\n\nThe sides ' +
      '2.5, 6, 6.5 are (5, 12, 13) halved; scaling a right-angled triangle keeps it right-angled.',
    misconceptionCodes: ['pythagoras.add-squares-for-leg'],
  },

  // ---- Tier 2: unfamiliar surfaces ----
  {
    id: 'pythagoras.isosceles-height',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 2,
    statement:
      'An isosceles triangle has two equal sides of $13$ cm and a base of $10$ cm. Find its ' +
      'height, measured from the base to the top vertex.',
    answer: { type: 'number', value: 12, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Fold the triangle down its line of symmetry. The two halves match, so the fold hits the ' +
        'base at its midpoint and meets it squarely. What are the sides of one half?',
      pictorial:
        'Draw the height from the apex to the base. It splits the triangle into two right-angled ' +
        'triangles with base $5$ and hypotenuse $13$.',
      abstract:
        'Half-base $5$, slant side $13$: $h^2 = 13^2 - 5^2$.',
    },
    hints: [
      'The height cuts the base in half. What is half of 10?',
      'In one half: hypotenuse 13, leg 5. Find the other leg.',
    ],
    solution:
      'The height bisects the base, giving a right-angled triangle with hypotenuse 13 and leg 5:\n\n' +
      '$$h = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12 \\text{ cm}.$$\n\nThe base of 10 must be ' +
      'halved before Pythagoras can be used — the 10 is not a side of the right-angled triangle.',
    misconceptionCodes: ['pythagoras.add-squares-for-leg', 'pythagoras.hypotenuse-misidentified'],
  },
  {
    id: 'pythagoras.rectangle-diagonal',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 2,
    statement:
      'A rectangle is $12$ cm long and $5$ cm wide. Find the length of its diagonal.',
    answer: { type: 'number', value: 13, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Draw a diagonal on a rectangular card and cut along it. What shape are the two pieces, ' +
        'and where is the square corner in each?',
      pictorial:
        'Sketch the rectangle and one diagonal. The diagonal is the hypotenuse of a right-angled ' +
        'triangle whose legs are the length and the width.',
      abstract:
        'The diagonal is the long side of the right triangle made by two edges of the rectangle, so $d^2 = 12^2 + 5^2$. Work out $d$, and say whether it should come out longer or shorter than 12.',
    },
    hints: [
      'A diagonal splits a rectangle into two right-angled triangles.',
      'The legs are 12 and 5, so $d^2 = 144 + 25$.',
    ],
    solution:
      'The diagonal, the length and the width form a right-angled triangle:\n\n' +
      '$$d = \\sqrt{12^2 + 5^2} = \\sqrt{169} = 13 \\text{ cm}.$$',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },
  {
    id: 'pythagoras.expression-sides',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 2,
    statement:
      'A right-angled triangle has legs of length $x$ and $2x$. Find the length of the ' +
      'hypotenuse in terms of $x$, in simplest surd form.',
    answer: { type: 'expression', value: 'sqrt(5)*x', variables: ['x'] },
    cpaPrompts: {
      concrete:
        'Try $x = 1$: legs 1 and 2, so $c^2 = 5$. Try $x = 3$: legs 3 and 6, $c^2 = 45 = 9 \\times 5$. ' +
        'What does the hypotenuse do when $x$ is tripled?',
      pictorial:
        'Squares of area $x^2$ and $4x^2$ on the legs. The hypotenuse square holds $5x^2$.',
      abstract:
        '$c^2 = x^2 + (2x)^2 = 5x^2$, so $c = \\sqrt{5x^2} = x\\sqrt{5}$.',
    },
    hints: [
      'Square both legs: $x^2$ and $(2x)^2$. Careful — square the 2 as well.',
      '$c^2 = 5x^2$. Take the square root of both factors.',
    ],
    solution:
      '$c^2 = x^2 + (2x)^2 = x^2 + 4x^2 = 5x^2$, so\n\n$$c = \\sqrt{5x^2} = \\sqrt{5}\\,x.$$\n\n' +
      'Check with $x = 2$: legs 2 and 4, $c = \\sqrt{20} = 2\\sqrt{5}$. ✓',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified', 'expansion.coefficient-not-squared'],
  },

  // ---- Tier 3: contexts (no cue words) ----
  {
    id: 'pythagoras.ladder-wall',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 3,
    statement:
      'A $5$ m ladder leans against a vertical wall. Its foot is on level ground, $1.4$ m from ' +
      'the base of the wall. How far up the wall does the ladder reach?',
    answer: { type: 'number', value: 4.8, tolerance: 1e-6, unit: 'm' },
    cpaPrompts: {
      concrete:
        'Lean a ruler against a book standing on the desk. The ground, the book\'s spine and the ' +
        'ruler make a shape. Where is the square corner, and which piece is the longest?',
      pictorial:
        'Draw the wall, the ground and the ladder. The ladder is the sloping side; the wall meets ' +
        'the ground at $90°$.',
      abstract:
        'The ladder is the longest side. Height $= \\sqrt{5^2 - 1.4^2}$.',
    },
    hints: [
      'Sketch it. The wall and the ground meet at a right angle; the ladder is the sloping side.',
      'The ladder is the longest side, so its square is the total: $h^2 = 5^2 - 1.4^2$.',
    ],
    solution:
      'Wall, ground and ladder form a right-angled triangle with the ladder as hypotenuse:\n\n' +
      '$$h = \\sqrt{5^2 - 1.4^2} = \\sqrt{25 - 1.96} = \\sqrt{23.04} = 4.8 \\text{ m}.$$\n\n' +
      'Check: 4.8 is less than 5, as it must be.',
    misconceptionCodes: ['pythagoras.add-squares-for-leg', 'pythagoras.hypotenuse-misidentified'],
  },
  {
    id: 'pythagoras.tv-screen',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 3,
    statement:
      'A television screen is $120$ cm wide and $50$ cm high. Screens are sold by the distance ' +
      'from one corner to the opposite corner. What is this screen\'s advertised size, in cm?',
    answer: { type: 'number', value: 130, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Stretch a tape measure from the bottom-left corner of a screen to the top-right. Which ' +
        'two edges of the screen does the tape cut off a corner from?',
      pictorial:
        'Draw the rectangle and the corner-to-corner line. It is the sloping side of a ' +
        'right-angled triangle with legs 120 and 50.',
      abstract:
        'The advertised size is the corner-to-corner measurement, so it is $\\sqrt{120^2 + 50^2}$. Work that out, and check it is longer than either side.',
    },
    hints: [
      'The corner-to-corner line is a diagonal of a rectangle.',
      'Legs 120 and 50: $14400 + 2500$.',
    ],
    solution:
      'The diagonal is the hypotenuse of a right-angled triangle with legs 120 and 50:\n\n' +
      '$$\\sqrt{120^2 + 50^2} = \\sqrt{14400 + 2500} = \\sqrt{16900} = 130 \\text{ cm}.$$\n\n' +
      '(120, 50, 130) is (12, 5, 13) scaled by 10.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },
  {
    id: 'pythagoras.field-shortcut',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 3,
    statement:
      'A rectangular field is $60$ m by $80$ m. Mia walks from one corner to the opposite ' +
      'corner along two edges of the field. Her friend walks straight across the field between ' +
      'the same two corners. How many metres shorter is the friend\'s route?',
    answer: { type: 'number', value: 40, tolerance: 0, unit: 'm' },
    cpaPrompts: {
      concrete:
        'Walk the two edges of a table with your finger, then cut straight across. Which route is ' +
        'longer, and what shape do the two routes together make?',
      pictorial:
        'Draw the field and both routes. The straight route is the sloping side of a right-angled ' +
        'triangle whose legs are the two edges.',
      abstract:
        'Edges: $60 + 80 = 140$. Straight: $\\sqrt{60^2 + 80^2}$. Subtract.',
    },
    hints: [
      'Find the length of the straight route first: it is the diagonal of the rectangle.',
      '$\\sqrt{60^2 + 80^2} = 100$. Compare with $60 + 80$.',
    ],
    solution:
      'Straight route: $\\sqrt{60^2 + 80^2} = \\sqrt{3600 + 6400} = \\sqrt{10000} = 100$ m. ' +
      'Along the edges: $60 + 80 = 140$ m. Saving:\n\n$$140 - 100 = 40 \\text{ m}.$$',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },

  // ---- Diagnostic ----
  {
    id: 'pythagoras.dx-add-squares-for-leg',
    skillIds: ['pythagoras.calculate-unknown-side'],
    tier: 'diagnostic',
    statement:
      'A right-angled triangle has a hypotenuse of $13$ cm and one leg of $5$ cm. What is the ' +
      'length of the other leg?',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$12$ cm' },
        { label: 'B', value: '$\\sqrt{194} \\approx 13.9$ cm', misconceptionCode: 'pythagoras.add-squares-for-leg' },
        { label: 'C', value: '$8$ cm', misconceptionCode: 'exponents.linear-magnitude' },
      ],
    },
    cpaPrompts: {
      concrete:
        '169 tiles on the hypotenuse, 25 on the known leg. Is the missing square made by adding ' +
        'tiles to 169, or by taking tiles away from it?',
      pictorial:
        'Three squares: the largest is 169. Can a leg square be bigger than the hypotenuse square?',
      abstract:
        '$b^2 = 13^2 - 5^2$, not $13^2 + 5^2$; and it is the *squares* that subtract, not the lengths.',
    },
    hints: [
      'The unknown side is a leg, so it must be shorter than 13.',
      'The hypotenuse square is the total. Subtract: $169 - 25$, then square root.',
    ],
    solution:
      '$b = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12$ cm. Adding gives $\\sqrt{194} \\approx 13.9$, ' +
      'a leg longer than the hypotenuse, which is impossible. Subtracting the lengths, $13 - 5 = 8$, ' +
      'ignores that the theorem is about squares.',
    misconceptionCodes: ['pythagoras.add-squares-for-leg', 'exponents.linear-magnitude'],
  },

  // =========================================================================
  // Skill 3 — the converse
  // =========================================================================

  // ---- Tier 1: family pythagoras.converse-test (6 items) ----
  {
    id: 'pythagoras.converse-3-4-5',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    tier: 1,
    sequence: { family: 'pythagoras.converse-test', position: 1 },
    statement:
      'A triangle has sides of length $3$ cm, $4$ cm and $5$ cm. Is it right-angled? Answer yes ' +
      'or no.',
    answer: YES,
    cpaPrompts: {
      concrete:
        'Pull a 12-knot loop of string into a triangle with 3, 4 and 5 knots on its sides. Does ' +
        'the corner between the 3 and the 4 fit the corner of a book?',
      pictorial:
        'Squares of 9, 16 and 25 on the sides. Do the two smaller areas add to the largest?',
      abstract:
        'Test $3^2 + 4^2$ against $5^2$ with the longest side as $c$.',
    },
    hints: [
      'Only the longest side can be the hypotenuse. Which is longest?',
      'Compare $3^2 + 4^2$ with $5^2$.',
    ],
    solution:
      'Longest side 5. $3^2 + 4^2 = 9 + 16 = 25 = 5^2$. The squares match, so by the converse ' +
      'the angle opposite the 5 cm side is $90°$.\n\n**Yes**, it is right-angled.',
    misconceptionCodes: ['pythagoras.converse-wrong-side-squared'],
  },
  {
    id: 'pythagoras.converse-5-12-13',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    tier: 1,
    sequence: { family: 'pythagoras.converse-test', position: 2 },
    expect:
      'New numbers: 5, 12, 13. Before testing, which side must you compare the other two ' +
      'against, and why that one?',
    statement:
      'A triangle has sides of length $5$ cm, $12$ cm and $13$ cm. Is it right-angled? Answer ' +
      'yes or no.',
    answer: YES,
    cpaPrompts: {
      concrete:
        'A 30-knot loop pulled into 5, 12 and 13 knots. Test the corner between the 5 and the 12 ' +
        'against a square corner.',
      pictorial:
        'Squares of 25, 144 and 169. Add the two smaller.',
      abstract:
        'Test the two shorter sides against the longest: $5^2 + 12^2 = 169$, and $13^2 = 169$ too. What does that equality let you conclude about the corner?',
    },
    hints: [
      'The longest side is 13, so that is the one to compare against.',
      '$25 + 144 = 169$. Is that $13^2$?',
    ],
    solution:
      'Longest side 13. $5^2 + 12^2 = 25 + 144 = 169 = 13^2$. ✓\n\n**Yes**, the triangle is ' +
      'right-angled, with the right angle between the 5 cm and 12 cm sides.',
    misconceptionCodes: ['pythagoras.converse-wrong-side-squared'],
  },
  {
    id: 'pythagoras.converse-4-5-6',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    tier: 1,
    sequence: { family: 'pythagoras.converse-test', position: 3 },
    expect:
      'Sides 4, 5, 6 — consecutive numbers. The 4 and 5 are the same as before but the longest ' +
      'side is 6, not 5... wait, is the 5 still the longest? Predict whether the test passes.',
    statement:
      'A triangle has sides of length $4$ cm, $5$ cm and $6$ cm. Is it right-angled? Answer yes ' +
      'or no.',
    answer: NO,
    cpaPrompts: {
      concrete:
        'A 15-knot loop pulled into 4, 5, 6. Does the corner between the 4 and the 5 fit a ' +
        'square corner, or is it a little wider?',
      pictorial:
        'Squares of 16, 25 and 36. The two smaller add to 41 — more than 36. The corner opens ' +
        'out past $90°$.',
      abstract:
        'Here $4^2 + 5^2 = 41$ but $6^2 = 36$, and $41 \\ne 36$. Since the two sides are the wrong size to close the corner exactly, what kind of angle is it?',
    },
    hints: [
      'The longest side is 6. Compare $4^2 + 5^2$ with $6^2$.',
      '$16 + 25 = 41$ and $36$. Equal or not?',
    ],
    solution:
      'Longest side 6. $4^2 + 5^2 = 16 + 25 = 41$, but $6^2 = 36$. Not equal, so the triangle ' +
      'is not right-angled.\n\n**No.** (Since $41 > 36$, the largest angle is less than $90°$: ' +
      'the triangle is acute.)',
    misconceptionCodes: ['pythagoras.converse-wrong-side-squared'],
  },
  {
    id: 'pythagoras.converse-7-24-25',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    tier: 1,
    sequence: { family: 'pythagoras.converse-test', position: 4 },
    expect:
      'Bigger numbers: 7, 24, 25. The two largest are only 1 apart, like 4-5-6 was. Does that ' +
      'tell you anything, or do you have to do the squares?',
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
    id: 'pythagoras.converse-8-15-16',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    tier: 1,
    sequence: { family: 'pythagoras.converse-test', position: 5 },
    expect:
      'Sides 8, 15, 16. You may know that 8-15-17 is a right-angled triangle. This one has 16 ' +
      'instead of 17. Predict: does the test pass, and if not, on which side of $90°$ is the ' +
      'largest angle?',
    statement:
      'A triangle has sides of length $8$ cm, $15$ cm and $16$ cm. Is it right-angled? Answer ' +
      'yes or no.',
    answer: NO,
    cpaPrompts: {
      concrete:
        'Pull a loop into 8, 15 and 16 knots. The corner between the 8 and the 15 is slightly ' +
        'tighter than a square corner — the 16 is too short to open it fully.',
      pictorial:
        'Squares of 64, 225 and 256. Add the two smaller: 289. Compare with 256.',
      abstract:
        '$8^2 + 15^2 = 289 \\ne 256 = 16^2$.',
    },
    hints: [
      'Longest side 16. Compare $8^2 + 15^2$ with $16^2$.',
      '$64 + 225 = 289$; $16^2 = 256$. Equal?',
    ],
    solution:
      '$8^2 + 15^2 = 64 + 225 = 289$, but $16^2 = 256$. Not equal.\n\n**No**, it is not ' +
      'right-angled. $289 = 17^2$, so the side would need to be 17 for a right angle; with 16 the ' +
      'largest angle is acute.',
    misconceptionCodes: ['pythagoras.converse-wrong-side-squared'],
  },
  {
    id: 'pythagoras.converse-1-5-2-2-5',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    tier: 1,
    sequence: { family: 'pythagoras.converse-test', position: 6 },
    expect:
      'Decimals: 1.5, 2, 2.5. Look at them next to 3, 4, 5. What do you notice, and what do ' +
      'you predict the test will say?',
    statement:
      'A triangle has sides of length $1.5$ cm, $2$ cm and $2.5$ cm. Is it right-angled? Answer ' +
      'yes or no.',
    answer: YES,
    cpaPrompts: {
      concrete:
        'Take the 3-4-5 string triangle and shrink it to half size. Does shrinking change any of ' +
        'its angles?',
      pictorial:
        'Squares of $2.25$, $4$ and $6.25$. Do the two smaller add to the largest?',
      abstract:
        '$1.5^2 + 2^2 = 2.25 + 4 = 6.25 = 2.5^2$.',
    },
    hints: [
      'Longest side 2.5. Compare $1.5^2 + 2^2$ with $2.5^2$.',
      '$2.25 + 4 = 6.25$. Is that $2.5^2$?',
    ],
    solution:
      '$1.5^2 + 2^2 = 2.25 + 4 = 6.25 = 2.5^2$. ✓\n\n**Yes.** The sides are (3, 4, 5) halved: ' +
      'scaling every side by the same factor keeps every angle the same, so any multiple of a ' +
      'right-angled triple is still right-angled.',
    misconceptionCodes: ['pythagoras.converse-wrong-side-squared'],
  },

  // ---- Tier 2 ----
  {
    id: 'pythagoras.acute-or-obtuse-5-6-8',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    tier: 2,
    statement:
      'A triangle has sides of length $5$ cm, $6$ cm and $8$ cm. Is its largest angle acute or ' +
      'obtuse?',
    answer: { type: 'exact', value: 'obtuse', accepts: ['obtuse angle', 'it is obtuse', 'obtuse-angled'] },
    cpaPrompts: {
      concrete:
        'Pull a loop into 5, 6 and 8 knots. The 8 is longer than a right-angled triangle on legs ' +
        '5 and 6 would allow, so the corner between the 5 and 6 has to open wider than $90°$.',
      pictorial:
        'Squares 25, 36 and 64. The two smaller add to 61 — less than 64. The big square is ' +
        'too big for a right angle.',
      abstract:
        'If $a^2 + b^2 < c^2$ the angle opposite $c$ is obtuse; if $>$, acute; if $=$, right.',
    },
    hints: [
      'Compare $5^2 + 6^2$ with $8^2$. Which is bigger?',
      '$61 < 64$: the longest side is longer than a right angle would give, so the angle is wider than $90°$.',
    ],
    solution:
      '$5^2 + 6^2 = 25 + 36 = 61$ and $8^2 = 64$. Since $61 < 64$, the longest side is longer ' +
      'than a right angle would produce, so the angle opposite it is greater than $90°$.\n\n' +
      '**Obtuse.**',
    misconceptionCodes: ['pythagoras.converse-wrong-side-squared'],
  },
  {
    id: 'pythagoras.acute-or-obtuse-6-7-8',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    tier: 2,
    statement:
      'A triangle has sides of length $6$ cm, $7$ cm and $8$ cm. Is its largest angle acute or ' +
      'obtuse?',
    answer: { type: 'exact', value: 'acute', accepts: ['acute angle', 'it is acute', 'acute-angled'] },
    cpaPrompts: {
      concrete:
        'Pull a loop into 6, 7 and 8 knots. The 8 is shorter than a right-angled triangle on legs ' +
        '6 and 7 would need, so the corner between them is pinched tighter than $90°$.',
      pictorial:
        'Squares 36, 49 and 64. The two smaller add to 85 — more than 64.',
      abstract:
        '$a^2 + b^2 > c^2 \\implies$ the angle opposite $c$ is acute.',
    },
    hints: [
      'Compare $6^2 + 7^2$ with $8^2$.',
      '$85 > 64$: the longest side is shorter than a right angle would give.',
    ],
    solution:
      '$6^2 + 7^2 = 36 + 49 = 85$ and $8^2 = 64$. Since $85 > 64$, the longest side is shorter ' +
      'than a right angle would produce, so the largest angle is less than $90°$.\n\n**Acute.**',
    misconceptionCodes: ['pythagoras.converse-wrong-side-squared'],
  },
  {
    id: 'pythagoras.which-triple',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    tier: 2,
    statement:
      'Exactly one of these sets of side lengths makes a right-angled triangle. Which one? ' +
      'Answer with the letter.\n\n(A) $6, 7, 9$ (B) $9, 40, 41$ (C) $10, 20, 25$ (D) $5, 6, 7$',
    answer: { type: 'exact', value: 'B', accepts: ['(b)', '9, 40, 41', '9,40,41', '9-40-41', 'b: 9, 40, 41'] },
    cpaPrompts: {
      concrete:
        'Four string loops. Only one can be pulled into a triangle with a square corner. Which ' +
        'one — test each by squaring rather than by eye.',
      pictorial:
        'For each set, three squares. Only in one do the two smaller add exactly to the largest.',
      abstract:
        'Test $a^2 + b^2 = c^2$ with $c$ the longest, four times.',
    },
    hints: [
      'For each set, square the two shorter sides, add, and compare with the square of the longest.',
      '$81 + 1600 = 1681$. What is $41^2$?',
    ],
    solution:
      '(A) $36 + 49 = 85 \\ne 81$. (B) $81 + 1600 = 1681 = 41^2$. ✓ (C) $100 + 400 = 500 \\ne 625$. ' +
      '(D) $25 + 36 = 61 \\ne 49$.\n\nOnly **(B)** $9, 40, 41$ is right-angled.',
    misconceptionCodes: ['pythagoras.converse-wrong-side-squared'],
  },

  // ---- Tier 3: contexts (no cue words) ----
  {
    id: 'pythagoras.builders-corner',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    tier: 3,
    statement:
      'A builder wants to check that the corner where two walls meet is exactly square. She ' +
      'marks a point $60$ cm along one wall from the corner and a point $80$ cm along the other, ' +
      'then measures the straight distance between the two marks: $100$ cm. Is the corner ' +
      'square? Answer yes or no.',
    answer: YES,
    cpaPrompts: {
      concrete:
        'This is the ancient rope trick: a 3-4-5 loop scaled up by 20. Lay a 3-4-5 string ' +
        'triangle into the corner of a room and see whether it fits.',
      pictorial:
        'Draw the two walls and the measuring line: a triangle with sides 60, 80, 100. Which is ' +
        'the longest?',
      abstract:
        'Converse: does $60^2 + 80^2 = 100^2$?',
    },
    hints: [
      'The two marks and the corner form a triangle. Write down its three sides.',
      'If the corner is square, the squares of the two wall distances add to the square of the measured distance.',
    ],
    solution:
      '$60^2 + 80^2 = 3600 + 6400 = 10000 = 100^2$. The converse applies, so the angle at the ' +
      'corner — opposite the 100 cm measurement — is $90°$.\n\n**Yes**, the corner is square. ' +
      '(60, 80, 100) is (3, 4, 5) scaled by 20.',
    misconceptionCodes: ['pythagoras.converse-wrong-side-squared'],
  },
  {
    id: 'pythagoras.shelf-bracket',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    tier: 3,
    statement:
      'A triangular shelf bracket is supposed to hold the shelf exactly square to the wall. Its ' +
      'three edges measure $9$ cm, $12$ cm and $15.5$ cm. Is the corner between the 9 cm and ' +
      '12 cm edges a true $90°$ corner? Answer yes or no.',
    answer: NO,
    cpaPrompts: {
      concrete:
        'Compare with a 9-12-15 triangle, which is 3-4-5 scaled by 3. This bracket\'s long edge ' +
        'is half a centimetre too long. What does that do to the corner?',
      pictorial:
        'Squares 81, 144 and $15.5^2 = 240.25$. The two smaller add to 225.',
      abstract:
        '$9^2 + 12^2 = 225 \\ne 240.25 = 15.5^2$. Since $225 < 240.25$ the corner is obtuse.',
    },
    hints: [
      'Which edge is the longest? Compare the sum of the squares of the other two against its square.',
      '$81 + 144 = 225$ and $15.5^2 = 240.25$. Equal?',
    ],
    solution:
      '$9^2 + 12^2 = 81 + 144 = 225$, but $15.5^2 = 240.25$. Not equal, so the corner is not a ' +
      'right angle.\n\n**No.** A 9-12-15 bracket would be square; at 15.5 the long edge is too ' +
      'long and the corner is slightly more than $90°$ — the shelf would droop.',
    misconceptionCodes: ['pythagoras.converse-wrong-side-squared'],
  },

  // ---- Diagnostic ----
  {
    id: 'pythagoras.dx-converse-wrong-side',
    skillIds: ['pythagoras.converse-pythagorean-theorem'],
    tier: 'diagnostic',
    statement:
      'A triangle has sides of length $17$ cm, $8$ cm and $15$ cm. Is it right-angled?',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: 'Yes — $8^2 + 15^2 = 289 = 17^2$' },
        { label: 'B', value: 'No — $15^2 + 17^2 = 514 \\ne 8^2$', misconceptionCode: 'pythagoras.converse-wrong-side-squared' },
        { label: 'C', value: 'No — $17^2 + 8^2 = 353 \\ne 15^2$', misconceptionCode: 'pythagoras.hypotenuse-misidentified' },
      ],
    },
    cpaPrompts: {
      concrete:
        'A 40-knot loop pulled into 17, 8 and 15. Which corner would you test against a square ' +
        'corner — the one opposite the longest side, or another?',
      pictorial:
        'Squares 289, 64 and 225. Which two must add to which?',
      abstract:
        'The candidate hypotenuse is the longest side, 17, whatever order the sides are listed in.',
    },
    hints: [
      'Only the longest side can be the hypotenuse. Which side is longest?',
      'Compare $8^2 + 15^2$ with $17^2$.',
    ],
    solution:
      'Longest side 17. $8^2 + 15^2 = 64 + 225 = 289 = 17^2$, so by the converse the triangle ' +
      'is right-angled. Comparing against 15 (the side written last) or adding the two longest ' +
      'sides both give a false "no".',
    misconceptionCodes: ['pythagoras.converse-wrong-side-squared', 'pythagoras.hypotenuse-misidentified'],
  },

  // =========================================================================
  // Skill 4 — applied spatial (2D and 3D)
  // =========================================================================

  // ---- Tier 1: family pythagoras.diagonal-chain (5 items) ----
  {
    id: 'pythagoras.face-diagonal-8-6',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 1,
    sequence: { family: 'pythagoras.diagonal-chain', position: 1 },
    statement:
      'A rectangular box has length $8$ cm, width $6$ cm and height $24$ cm. Find the length ' +
      'of the diagonal across the bottom face of the box.',
    answer: { type: 'number', value: 10, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Stretch a string across the floor of the box from one corner to the opposite corner. ' +
        'The string and two edges of the floor make a shape lying flat — which shape?',
      pictorial:
        'Draw the bottom face as an $8 \\times 6$ rectangle with one diagonal dashed in.',
      abstract:
        '$d^2 = 8^2 + 6^2$. The height is not involved — the string never leaves the floor.',
    },
    hints: [
      'The bottom face is an $8 \\times 6$ rectangle. Its diagonal is the hypotenuse of a right-angled triangle.',
      '$d = \\sqrt{64 + 36}$.',
    ],
    solution:
      'The base diagonal is the hypotenuse of a right-angled triangle with legs 8 and 6:\n\n' +
      '$$d = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10 \\text{ cm}.$$\n\nThe 24 cm height plays no ' +
      'part — this diagonal lies flat on the base.',
    misconceptionCodes: ['pythagoras.space-diagonal-two-dimensions'],
    figure: box8x6x24,
  },
  {
    id: 'pythagoras.space-diagonal',
    skillIds: ['pythagoras.solve-applied-spatial', 'pythagoras.calculate-unknown-side'],
    tier: 1,
    sequence: { family: 'pythagoras.diagonal-chain', position: 2 },
    expect:
      'Now the string is lifted from the far corner of the base up to the top corner. The base ' +
      'diagonal you just found becomes a leg. Which length is the other leg, and what is the ' +
      'new hypotenuse?',
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
    figure: box8x6x24,
  },
  {
    id: 'pythagoras.cube-diagonal',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 1,
    sequence: { family: 'pythagoras.diagonal-chain', position: 3 },
    expect:
      'All three lengths are equal now — a cube of side 5. Predict the answer from the combined ' +
      'formula before chaining the triangles: what is $5^2 + 5^2 + 5^2$?',
    statement:
      'A cube has edges of $5$ cm. Find the length of the diagonal joining two opposite ' +
      'corners of the cube. Give your answer in exact form or to 3 significant figures.',
    answer: { type: 'number', value: 5 * Math.sqrt(3), tolerance: 0.05, sigfigs: 3, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'A dice-shaped box. String across the floor corner to corner, then lift to the top ' +
        'corner. Both triangles have a leg of 5; the first has two.',
      pictorial:
        'Draw the cube with the base diagonal dashed. Base diagonal $= \\sqrt{50}$; standing ' +
        'triangle has legs $\\sqrt{50}$ and 5.',
      abstract:
        '$D = \\sqrt{5^2 + 5^2 + 5^2} = \\sqrt{75} = 5\\sqrt{3}$.',
    },
    hints: [
      'Base diagonal first: $\\sqrt{5^2 + 5^2} = \\sqrt{50}$.',
      'Then $D^2 = 50 + 5^2 = 75$. Simplify $\\sqrt{75}$.',
    ],
    solution:
      'Base diagonal: $\\sqrt{25 + 25} = \\sqrt{50}$. Space diagonal:\n\n$$D = \\sqrt{50 + 25} ' +
      '= \\sqrt{75} = 5\\sqrt{3} \\approx 8.66 \\text{ cm}.$$\n\nFor any cube of side $s$, ' +
      '$D = s\\sqrt{3}$.',
    misconceptionCodes: ['pythagoras.space-diagonal-two-dimensions'],
    figure: {
      kind: 'solid_net',
      solid: 'cuboid',
      view: 'solid',
      dimensions: { length: 5, width: 5, height: 5 },
      caption: 'A cube of side 5 cm.',
    },
  },
  {
    id: 'pythagoras.cylinder-rod',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 1,
    sequence: { family: 'pythagoras.diagonal-chain', position: 4 },
    expect:
      'The box is round now — a cylindrical tin. There is no base diagonal to find with a ' +
      'triangle. What is the longest straight line across a circular base, and where does that ' +
      'leave the first step?',
    statement:
      'A cylindrical tin has a base of diameter $6$ cm and a height of $8$ cm. Find the length ' +
      'of the longest straight rod that fits inside the tin.',
    answer: { type: 'number', value: 10, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Lay a pencil across the bottom of a tin — the longest it can lie is across the middle. ' +
        'Now tilt it up until it touches the top rim on the far side.',
      pictorial:
        'Draw the rectangle you would see if the tin were sliced down its middle: 6 wide, 8 tall. ' +
        'The rod is its diagonal.',
      abstract:
        'The first step is free: the base "diagonal" is the diameter 6. Then $L = \\sqrt{6^2 + 8^2}$.',
    },
    hints: [
      'The longest line across the base is the diameter: 6 cm. That is the flat leg.',
      'Legs 6 and 8: $\\sqrt{36 + 64}$.',
    ],
    solution:
      'The rod lies in the rectangle formed by a diameter and the height: legs 6 and 8.\n\n' +
      '$$L = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10 \\text{ cm}.$$\n\nA round base needs only one ' +
      'triangle; the diameter replaces the base diagonal.',
    misconceptionCodes: ['pythagoras.space-diagonal-two-dimensions'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'solid',
      dimensions: { radius: 3, height: 8 },
      caption: 'A tin of radius 3 cm (diameter 6 cm) and height 8 cm.',
    },
  },
  {
    id: 'pythagoras.pyramid-slant-edge',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 1,
    sequence: { family: 'pythagoras.diagonal-chain', position: 5 },
    expect:
      'A square pyramid: the vertical line now rises from the *centre* of the base to the apex, ' +
      'not from a corner. Which part of the base diagonal is the flat leg this time — all of ' +
      'it, or half?',
    statement:
      'A pyramid has a square base of side $12$ cm and its apex is $7$ cm vertically above the ' +
      'centre of the base. Find the length of a sloping edge from a base corner to the apex.',
    answer: { type: 'number', value: 11, tolerance: 1e-6, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Stand a pencil upright in the middle of a square card. String from a corner of the card ' +
        'to the pencil tip: the flat leg runs from the corner to the centre — half a diagonal.',
      pictorial:
        'Draw the base with both diagonals. Half a diagonal, the height and the sloping edge ' +
        'make the standing right-angled triangle.',
      abstract:
        'Half-diagonal$^2 = 6^2 + 6^2 = 72$. Edge $= \\sqrt{72 + 7^2} = \\sqrt{121}$.',
    },
    hints: [
      'From the centre of the base to a corner is half a diagonal. Its square is $6^2 + 6^2$.',
      'Edge$^2 = 72 + 49$.',
    ],
    solution:
      'Half the base diagonal: $\\sqrt{6^2 + 6^2} = \\sqrt{72}$. The sloping edge is the ' +
      'hypotenuse of the triangle with legs $\\sqrt{72}$ and 7:\n\n$$e = \\sqrt{72 + 49} = ' +
      '\\sqrt{121} = 11 \\text{ cm}.$$\n\nThe pattern in all five: find a flat length, then ' +
      'stand a triangle on it.',
    misconceptionCodes: ['pythagoras.space-diagonal-two-dimensions'],
    figure: {
      kind: 'solid_net',
      solid: 'pyramid',
      view: 'solid',
      dimensions: { height: 7, length: 12, baseEdges: 4 },
      showSlantTriangle: true,
      caption: 'Square base 12 cm, height 7 cm to the apex above the centre.',
    },
  },

  // ---- Tier 2 ----
  {
    id: 'pythagoras.grid-distance',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 2,
    statement:
      'On a square grid, point $A$ is at $(1, 2)$ and point $B$ is at $(7, 10)$. Find the ' +
      'straight-line distance from $A$ to $B$.',
    answer: { type: 'number', value: 10, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Walk from $A$ to $B$ on the grid: how many squares across, then how many up? Those two ' +
        'walks and the straight line make a triangle.',
      pictorial:
        'Plot the points and draw the horizontal and vertical legs to make a right-angled ' +
        'triangle with $AB$ as hypotenuse.',
      abstract:
        'Across $7 - 1 = 6$, up $10 - 2 = 8$. $AB = \\sqrt{6^2 + 8^2}$.',
    },
    hints: [
      'How far across from $x = 1$ to $x = 7$? How far up from $y = 2$ to $y = 10$?',
      'Legs 6 and 8.',
    ],
    solution:
      'Horizontal change 6, vertical change 8:\n\n$$AB = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10.$$\n\n' +
      'This is the distance formula of coordinate geometry, which is Pythagoras on a grid.',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
    figure: {
      kind: 'coordinate_plane',
      xMin: 0,
      xMax: 8,
      yMin: 0,
      yMax: 11,
      gridStep: 1,
      curves: [],
      points: [
        { x: 1, y: 2, label: 'A', highlight: true },
        { x: 7, y: 10, label: 'B', highlight: true },
      ],
    },
  },
  {
    id: 'pythagoras.folded-rectangle',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 2,
    statement:
      'A rectangular sheet of paper is $16$ cm by $12$ cm. It is folded in half so that the two ' +
      '$12$ cm edges meet. Find the length of a diagonal of the folded sheet, to 3 significant ' +
      'figures.',
    answer: { type: 'number', value: Math.sqrt(208), tolerance: 0.05, sigfigs: 3, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Fold a sheet so the short edges meet. The fold halves the long side. Measure the new ' +
        'rectangle: what are its two edges?',
      pictorial:
        'Draw the $16 \\times 12$ sheet with the fold line down the middle. The folded piece is ' +
        '$8 \\times 12$; draw its diagonal.',
      abstract:
        '$d = \\sqrt{8^2 + 12^2} = \\sqrt{208}$.',
    },
    hints: [
      'Which side is halved by the fold? The folded sheet is $8$ cm by $12$ cm.',
      '$d^2 = 64 + 144 = 208$. Square root and round.',
    ],
    solution:
      'Folding the 16 cm side in half gives an $8 \\times 12$ rectangle. Its diagonal:\n\n' +
      '$$d = \\sqrt{8^2 + 12^2} = \\sqrt{208} = 4\\sqrt{13} \\approx 14.4 \\text{ cm}.$$',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },

  // ---- Tier 3: contexts (no cue words) ----
  {
    id: 'pythagoras.straw-in-box',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 3,
    statement:
      'A juice carton is $4$ cm by $6$ cm on the base and $12$ cm tall. What is the longest ' +
      'straw that can fit completely inside the carton?',
    answer: { type: 'number', value: 14, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Drop a straw into an empty carton and let it settle: it leans from a bottom corner to ' +
        'the opposite top corner. Its shadow on the base runs corner to corner.',
      pictorial:
        'Draw the carton. Dash in the base diagonal, then draw the straw from that diagonal\'s ' +
        'far end up to the top corner.',
      abstract:
        'Base diagonal$^2 = 4^2 + 6^2 = 52$; straw $= \\sqrt{52 + 12^2}$.',
    },
    hints: [
      'The longest straight line in a box goes from one corner to the opposite corner.',
      'Base diagonal squared is $16 + 36 = 52$. Then add $12^2$ and square root.',
    ],
    solution:
      'Base diagonal: $\\sqrt{4^2 + 6^2} = \\sqrt{52}$. Straw:\n\n$$\\sqrt{52 + 12^2} = ' +
      '\\sqrt{196} = 14 \\text{ cm}.$$\n\nAll three dimensions contribute: $\\sqrt{16 + 36 + 144}$.',
    misconceptionCodes: ['pythagoras.space-diagonal-two-dimensions'],
  },
  {
    id: 'pythagoras.kite-string',
    skillIds: ['pythagoras.solve-applied-spatial', 'pythagoras.calculate-unknown-side'],
    tier: 3,
    statement:
      'A kite is flying $30$ m above level ground, directly above a point that is $40$ m from ' +
      'the person holding the string. The string is straight and held at ground level. How ' +
      'long is the string?',
    answer: { type: 'number', value: 50, tolerance: 0, unit: 'm' },
    cpaPrompts: {
      concrete:
        'Stand a ruler upright 40 cm from your hand and hold a string to its top at 30 cm. The ' +
        'string, the ground and the ruler make a shape with one square corner.',
      pictorial:
        'Draw the ground, the vertical line up to the kite, and the string. The string is the ' +
        'sloping side.',
      abstract:
        'The string is the long side of the triangle made by the ground distance and the height, so it is $\\sqrt{40^2 + 30^2}$. Work it out and check it exceeds both.',
    },
    hints: [
      'Sketch the ground distance, the height and the string. Which side is the sloping one?',
      '$\\sqrt{1600 + 900}$.',
    ],
    solution:
      'The string is the hypotenuse of a right-angled triangle with legs 40 and 30:\n\n' +
      '$$\\sqrt{40^2 + 30^2} = \\sqrt{2500} = 50 \\text{ m}.$$',
    misconceptionCodes: ['pythagoras.hypotenuse-misidentified'],
  },

  // ---- Tier 4: SSDD set on the 8 × 6 × 24 box (family pythagoras.box-8-6-24-ssdd) ----
  {
    id: 'pythagoras.ssdd-box-face',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 4,
    sequence: { family: 'pythagoras.box-8-6-24-ssdd', position: 1 },
    statement:
      'A closed box is $8$ cm long, $6$ cm wide and $24$ cm tall. Find the length of the ' +
      'diagonal drawn across the front face, which is $8$ cm by $24$ cm. Give your answer to 3 ' +
      'significant figures.',
    answer: { type: 'number', value: Math.sqrt(640), tolerance: 0.05, sigfigs: 3, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Draw a line on the front of the box from the bottom-left corner to the top-right. It ' +
        'never leaves that face. Which two edges of the box does it cross?',
      pictorial:
        'Sketch the front face as an $8 \\times 24$ rectangle with its diagonal.',
      abstract:
        '$\\sqrt{8^2 + 24^2}$ — only two dimensions, because this diagonal stays on one face.',
    },
    hints: [
      'A face diagonal uses only the two edges of that face.',
      '$\\sqrt{64 + 576} = \\sqrt{640}$.',
    ],
    solution:
      '$\\sqrt{8^2 + 24^2} = \\sqrt{640} = 8\\sqrt{10} \\approx 25.3$ cm. This is the diagonal ' +
      'of a *face*; the diagonal through the *inside* of the box would also use the 6 cm width.',
    misconceptionCodes: ['pythagoras.space-diagonal-two-dimensions'],
    figure: box8x6x24,
  },
  {
    id: 'pythagoras.ssdd-box-rod',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 4,
    sequence: { family: 'pythagoras.box-8-6-24-ssdd', position: 2 },
    statement:
      'A closed box is $8$ cm long, $6$ cm wide and $24$ cm tall. Find the length of the ' +
      'longest thin rod that can be placed entirely inside the box.',
    answer: { type: 'number', value: 26, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'The rod must go from a bottom corner to the opposite top corner — any other position ' +
        'leaves room to slide it longer.',
      pictorial:
        'Dash in the base diagonal, then draw the standing triangle with the height as the other leg.',
      abstract:
        '$\\sqrt{8^2 + 6^2 + 24^2}$ — all three dimensions.',
    },
    hints: [
      'This rod goes through the inside of the box, corner to opposite corner.',
      'Base diagonal 10, height 24.',
    ],
    solution:
      'Base diagonal $\\sqrt{8^2 + 6^2} = 10$; rod $= \\sqrt{10^2 + 24^2} = \\sqrt{676} = 26$ cm. ' +
      'Unlike the face diagonal, all three edges contribute.',
    misconceptionCodes: ['pythagoras.space-diagonal-two-dimensions'],
    figure: box8x6x24,
  },
  {
    id: 'pythagoras.ssdd-box-volume',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 4,
    sequence: { family: 'pythagoras.box-8-6-24-ssdd', position: 3 },
    statement:
      'A closed box is $8$ cm long, $6$ cm wide and $24$ cm tall. Find its volume in cm$^3$.',
    answer: { type: 'number', value: 1152, tolerance: 0, unit: 'cm^3' },
    cpaPrompts: {
      concrete:
        'How many 1 cm cubes cover the base? How many layers of them stack up to the top?',
      pictorial:
        'Draw the base as $8 \\times 6 = 48$ squares, then 24 layers.',
      abstract:
        '$V = l \\times w \\times h$. No square roots here — same box, different question.',
    },
    hints: [
      'Volume of a cuboid is length × width × height.',
      '$48 \\times 24$.',
    ],
    solution:
      '$V = 8 \\times 6 \\times 24 = 1152 \\text{ cm}^3$. Same numbers as the diagonal questions, ' +
      'but no right-angled triangle is involved — read what is asked before choosing a method.',
    misconceptionCodes: ['pythagoras.space-diagonal-two-dimensions'],
    figure: box8x6x24,
  },
  {
    id: 'pythagoras.ssdd-box-surface',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 4,
    sequence: { family: 'pythagoras.box-8-6-24-ssdd', position: 4 },
    statement:
      'A closed box is $8$ cm long, $6$ cm wide and $24$ cm tall. Find its total surface area ' +
      'in cm$^2$.',
    answer: { type: 'number', value: 768, tolerance: 0, unit: 'cm^2' },
    cpaPrompts: {
      concrete:
        'Unfold the box into its net: six rectangles, in three matching pairs. What are the ' +
        'dimensions of each pair?',
      pictorial:
        'Draw the net: two $8 \\times 6$, two $8 \\times 24$, two $6 \\times 24$.',
      abstract:
        'Surface area totals the three pairs of faces: $S = 2(lw + lh + wh)$. Notice this question needs no diagonal at all, unlike the ones before it.',
    },
    hints: [
      'Three pairs of faces: $8 \\times 6$, $8 \\times 24$ and $6 \\times 24$.',
      '$2(48 + 192 + 144)$.',
    ],
    solution:
      '$S = 2(8 \\times 6 + 8 \\times 24 + 6 \\times 24) = 2(48 + 192 + 144) = 2 \\times 384 = ' +
      '768 \\text{ cm}^2$.',
    misconceptionCodes: ['pythagoras.space-diagonal-two-dimensions'],
    figure: { ...box8x6x24, view: 'net' },
  },
  {
    id: 'pythagoras.bug-on-box',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 4,
    statement:
      'A box is $3$ cm by $4$ cm on the base and $12$ cm tall. An ant at a bottom corner walks ' +
      'on the outside of the box to the top corner diagonally opposite. It may cross two faces ' +
      'but cannot go through the box. Find the shortest possible walk, to 3 significant figures.',
    answer: { type: 'number', value: Math.sqrt(193), tolerance: 0.05, sigfigs: 3, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Unfold the two faces the ant walks across so they lie flat, edge to edge. The shortest ' +
        'walk on a flat sheet is a straight line.',
      pictorial:
        'Three possible unfoldings give three flat rectangles: $(3 + 4) \\times 12$, ' +
        '$(3 + 12) \\times 4$ and $(4 + 12) \\times 3$. Draw the diagonal of each.',
      abstract:
        'Compare $\\sqrt{7^2 + 12^2}$, $\\sqrt{15^2 + 4^2}$ and $\\sqrt{16^2 + 3^2}$; take the smallest.',
    },
    hints: [
      'Unfold two adjacent faces into one flat rectangle. The walk becomes a straight line across it.',
      'There are three ways to unfold. Work out the diagonal for each and pick the shortest.',
      '$\\sqrt{193}$, $\\sqrt{241}$, $\\sqrt{265}$.',
    ],
    solution:
      'Unfolding across the two base edges: $\\sqrt{(3 + 4)^2 + 12^2} = \\sqrt{49 + 144} = ' +
      '\\sqrt{193} \\approx 13.9$. The other unfoldings give $\\sqrt{15^2 + 4^2} = \\sqrt{241}$ ' +
      'and $\\sqrt{16^2 + 3^2} = \\sqrt{265}$, both longer.\n\nShortest walk: ' +
      '$\\sqrt{193} \\approx 13.9$ cm. (The straight line *through* the box, $13$ cm, is shorter ' +
      'still, but the ant cannot take it.)',
    misconceptionCodes: ['pythagoras.space-diagonal-two-dimensions'],
  },

  // ---- Diagnostic ----
  {
    id: 'pythagoras.dx-space-diagonal-two-dimensions',
    skillIds: ['pythagoras.solve-applied-spatial'],
    tier: 'diagnostic',
    statement:
      'A box is $8$ cm long, $6$ cm wide and $24$ cm tall. What is the length of the diagonal ' +
      'through the inside of the box, from one corner to the opposite corner?',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$26$ cm' },
        { label: 'B', value: '$\\sqrt{640} \\approx 25.3$ cm', misconceptionCode: 'pythagoras.space-diagonal-two-dimensions' },
        { label: 'C', value: '$\\sqrt{476} \\approx 21.8$ cm', misconceptionCode: 'pythagoras.hypotenuse-misidentified' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Trace the diagonal with a string. Does it move along the 8, up the 24, *and* across the 6?',
      pictorial:
        'Base diagonal first (8 and 6 give 10), then the standing triangle (10 and 24).',
      abstract:
        '$\\sqrt{8^2 + 6^2 + 24^2}$. Leaving out the 6 gives a face diagonal, $\\sqrt{640}$.',
    },
    hints: [
      'Does your diagonal use all three edges of the box?',
      'Base diagonal 10; then $\\sqrt{10^2 + 24^2}$, with 24 as a leg, not the hypotenuse.',
    ],
    solution:
      '$\\sqrt{8^2 + 6^2 + 24^2} = \\sqrt{676} = 26$ cm. Using only 8 and 24 gives $\\sqrt{640}$, ' +
      'the diagonal of the front face. Treating the 24 cm height as the hypotenuse of the ' +
      'standing triangle gives $\\sqrt{24^2 - 10^2} = \\sqrt{476}$, which is shorter than the ' +
      'height — impossible for a line that climbs the full height.',
    misconceptionCodes: ['pythagoras.space-diagonal-two-dimensions', 'pythagoras.hypotenuse-misidentified'],
  },
];
