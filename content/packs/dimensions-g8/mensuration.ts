import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';

/**
 * Unit 12 — Mensuration of Pyramids, Cylinders, Cones and Spheres. Hand-authored.
 *
 * Source: docs/Implementation Manual (hollow pouring solids, unfolded nets, the r² versus r³
 * probe) and the Chapter 12 worked examples in the content spec.
 *
 * The through-line: volume is *filling* and surface area is *wrapping*. Filling counts
 * cubes, so it carries $r^3$ or $r^2 h$; wrapping counts squares, so it carries $r^2$ or
 * $rl$. And the wrapping paper of a cone runs down the slant, not the height — which is why
 * the slant height, found from Pythagoras, is the one that belongs in $\pi r l$.
 */

export const mensurationSkills: SkillNode[] = [
  {
    id: 'mensuration.calculate-surface-areas',
    title: 'Find surface areas and volumes of cylinders, cones, spheres and pyramids',
    summary:
      'Apply the standard formulas with the right dimensions in the right places, and know ' +
      'which formula is filling and which is wrapping.',
    prerequisites: ['pythagoras.calculate-unknown-side'],
    cpa: {
      concrete:
        'Hollow solids and a jug of water. Fill a cone and pour it into the cylinder with the ' +
        'same base and height: it fills a third. Do it three times and the cylinder is full. ' +
        'The $\\frac{1}{3}$ is not a rule, it is what happened. Then wrap the cylinder in paper: ' +
        'the wrap is a rectangle whose width is the circumference.',
      pictorial:
        'The net of each solid drawn flat: a cylinder as two circles and a rectangle, a cone as a ' +
        'circle and a sector, a pyramid as a base and triangles. Surface area is the sum of the ' +
        'flat pieces and nothing else.',
      abstract:
        'Cylinder $V = \\pi r^2 h$, curved $2\\pi r h$. Cone $V = \\frac{1}{3}\\pi r^2 h$, ' +
        'curved $\\pi r l$. Sphere $V = \\frac{4}{3}\\pi r^3$, $A = 4\\pi r^2$. Pyramid ' +
        '$V = \\frac{1}{3} \\times \\text{base} \\times h$. Volume formulas have three lengths ' +
        'multiplied; area formulas have two.',
    },
    formulas: [
      'V_{\\text{cyl}} = \\pi r^2 h, \\quad A_{\\text{curved}} = 2\\pi r h',
      'V_{\\text{cone}} = \\tfrac{1}{3}\\pi r^2 h, \\quad A_{\\text{curved}} = \\pi r l',
      'V_{\\text{sphere}} = \\tfrac{4}{3}\\pi r^3, \\quad A = 4\\pi r^2',
    ],
    misconceptions: [
      {
        code: 'mensuration.r-squared-r-cubed-swapped',
        description:
          'Uses $r^2$ in a volume or $r^3$ in a surface area — writing the volume of a sphere as ' +
          '$\\frac{4}{3}\\pi r^2$, say.',
        probe:
          'Volume is measured in cubic units — cm³. Which power of $r$ carries three dimensions? ' +
          'And a surface, measured in cm² — which power is that?',
        correction:
          'Multiply three lengths and you get a volume; two, and you get an area. So $r^3$ (or ' +
          '$r^2 h$) belongs to volume and $r^2$ (or $rl$) to surface area. The units of the ' +
          'answer are a check on the formula.',
      },
    ],
    suggestedVisual: 'solid_net',
  },
  {
    id: 'mensuration.solve-problems-involving',
    title: 'Find the volume and surface area of composite solids',
    summary:
      'Split a composite solid into standard pieces for volume, and count only the exposed ' +
      'faces for surface area — the join between two pieces is inside.',
    prerequisites: ['mensuration.calculate-surface-areas'],
    cpa: {
      concrete:
        'A cylinder with a hemisphere sitting on top — a silo. Fill each piece separately and ' +
        'add: the water does not care about the join. Then wrap it: the paper goes over the ' +
        'dome, down the wall and under the base. No paper goes on the circle where the dome ' +
        'meets the wall, because you cannot reach it.',
      pictorial:
        'The composite solid drawn with a dashed line at the join, and beside it the exploded ' +
        'pieces. For surface area, each exposed face is shaded; the two faces at the join are ' +
        'left blank and crossed out.',
      abstract:
        'Volume: sum of the parts. Surface area: sum of the parts minus every face hidden at a ' +
        'join. Silo: $V = \\pi r^2 h + \\frac{2}{3}\\pi r^3$; $A = \\pi r^2 + 2\\pi r h + ' +
        '2\\pi r^2$.',
    },
    formulas: [
      'V_{\\text{hemi}} = \\tfrac{2}{3}\\pi r^3, \\quad A_{\\text{dome}} = 2\\pi r^2',
    ],
    misconceptions: [
      {
        code: 'mensuration.hidden-join-counted',
        description:
          'Includes the top circle of the cylinder and the flat face of the hemisphere in the ' +
          'exterior surface area, even though they meet each other and are inside the solid.',
        probe:
          'Imagine painting the outside of the silo. Can your brush reach the circle where the ' +
          'dome sits on the cylinder? If not, should it be in the area you paint?',
        correction:
          'Surface area counts exposed faces only. Where two pieces are glued together, both ' +
          'faces at the join vanish inside. The silo\'s exterior is the base circle, the curved ' +
          'wall and the dome: $\\pi r^2 + 2\\pi r h + 2\\pi r^2$.',
      },
    ],
    suggestedVisual: 'solid_net',
  },
  {
    id: 'mensuration.distinguish-vertical-height',
    title: 'Distinguish between vertical height and slant height',
    summary:
      'Know that the curved surface of a cone runs down the slant, find the slant from the ' +
      'radius and height by Pythagoras, and use each height in the formula it belongs to.',
    prerequisites: ['mensuration.calculate-surface-areas'],
    cpa: {
      concrete:
        'A paper cone. Run a finger from the tip straight down the outside to the rim: that is ' +
        'the slant, and it is what the paper is. Now poke a pencil down through the tip to the ' +
        'centre of the base: that is the vertical height, and it is inside, where there is no ' +
        'paper. The pencil, the radius and the slant make a right-angled triangle.',
      pictorial:
        'The cone drawn with its internal right triangle: $h$ vertical from apex to centre, $r$ ' +
        'along the base, $l$ down the outside as the hypotenuse. Beside it, the net: a sector ' +
        'whose radius is $l$, not $h$.',
      abstract:
        '$l = \\sqrt{r^2 + h^2}$. Volume uses $h$ (filling to a height); curved surface area ' +
        'uses $l$ (wrapping along the slant). Total surface area of a cone: $\\pi r l + \\pi r^2$.',
    },
    formulas: ['l = \\sqrt{r^2 + h^2}', 'A_{\\text{total, cone}} = \\pi r l + \\pi r^2'],
    misconceptions: [
      {
        code: 'mensuration.vertical-height-in-curved-area',
        description:
          'Uses the vertical height in the curved surface area of a cone — $\\pi r h$ with ' +
          '$h = 12$ — where the slant height $l = 13$ belongs.',
        probe:
          'Run your finger down the outside of the cone from the tip to the rim. Is that path the ' +
          'vertical height, straight down the middle, or something longer? Which one is the ' +
          'paper wrapped along?',
        correction:
          'The curved surface is the paper on the outside, and it runs down the slant. The ' +
          'vertical height is inside the cone, where there is no surface. So the formula is ' +
          '$\\pi r l$ with $l = \\sqrt{5^2 + 12^2} = 13$, not $\\pi r h$.',
      },
    ],
    suggestedVisual: 'solid_net',
  },
];

// ---------------------------------------------------------------------------
// Shared answer shapes
//
// "Leave it in terms of π" is marked by evaluating what the student typed, so the reference
// is the evaluated number and `36π` marks correct. "To 3 significant figures" keeps the exact
// value and adds `sigfigs`, with a tolerance of half the last significant place so the
// correctly rounded answer lands inside it.
// ---------------------------------------------------------------------------

/** A π-multiple answer: the student types `36π` and the checker evaluates it. */
function inPi(multiple: number, unit: string) {
  return { type: 'number' as const, value: multiple * Math.PI, tolerance: 1e-6, unit };
}

/** A 3-significant-figure answer. `halfPlace` is half the last significant digit's value. */
function toThreeSf(value: number, halfPlace: number, unit: string) {
  return { type: 'number' as const, value, tolerance: halfPlace, sigfigs: 3, unit };
}

const PI_NOTE = 'Leave your answer in terms of $\\pi$ — write it like $12\\pi$.';

export const mensurationProblems: Problem[] = [
  // =========================================================================
  // Skill 1 — surface areas and volumes of the standard solids
  // =========================================================================

  // ---- Tier 1a: family mensuration.sphere-scaling (6 items) ----
  // The payoff sequence: double the radius and the volume goes up eight times while the
  // surface area goes up four times, because one counts cubes and the other counts squares.
  {
    id: 'mensuration.sphere-volume-r3',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.sphere-scaling', position: 1 },
    statement:
      'A solid ball has radius $3$ cm. Find its volume. ' + PI_NOTE,
    answer: inPi(36, 'cm³'),
    cpaPrompts: {
      concrete:
        'Hold a ball of radius 3 cm. Sink it in a full measuring jug and catch what spills over — ' +
        'that spilled water is the volume you are about to calculate. Would you expect it to be ' +
        'more or less than a 6 cm cube?',
      pictorial:
        'Draw the ball inside the smallest box that holds it: a cube of side 6 cm, volume 216 cm³. ' +
        'The ball fills a bit over half of that box. Does your answer sit sensibly inside 216?',
      abstract:
        'Put $r = 3$ into $V = \\frac{4}{3}\\pi r^3$. Work out $r^3$ first, then take four thirds ' +
        'of it, and say what the units of the answer must be.',
    },
    hints: [
      'The volume of a sphere is $V = \\frac{4}{3}\\pi r^3$. Which power of $r$ does a volume carry?',
      'Cube the radius first: $3^3 = 27$. Now take $\\frac{4}{3}$ of $27$.',
    ],
    solution:
      '$$V = \\tfrac{4}{3}\\pi r^3 = \\tfrac{4}{3}\\pi (3)^3 = \\tfrac{4}{3}\\pi (27) = 36\\pi ' +
      '\\text{ cm}^3.$$\n\nCheck: the smallest cube holding the ball has volume $6^3 = 216$ cm³, ' +
      'and $36\\pi \\approx 113$ — a bit over half the cube, which is what the picture shows.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'sphere',
      view: 'solid',
      dimensions: { radius: 3 },
      caption: 'A ball of radius 3 cm.',
    },
  },
  {
    id: 'mensuration.sphere-volume-r6',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.sphere-scaling', position: 2 },
    expect:
      'The radius has doubled, from $3$ cm to $6$ cm — nothing else changed. Predict before you ' +
      'work it out: does the volume double, or does it grow by more than that? Say what number ' +
      'you expect $36\\pi$ to be multiplied by.',
    statement:
      'A solid ball has radius $6$ cm. Find its volume. ' + PI_NOTE,
    answer: inPi(288, 'cm³'),
    cpaPrompts: {
      concrete:
        'Stand the 3 cm ball next to a 6 cm one. The big one is only twice as wide, but how many ' +
        'of the small balls do you think you would have to melt down to make it?',
      pictorial:
        'Draw the two boxes: a 6 cm cube around the small ball and a 12 cm cube around the big ' +
        'one. The big box holds $2 \\times 2 \\times 2 = 8$ of the small boxes. What does that ' +
        'tell you about the balls inside them?',
      abstract:
        'Put $r = 6$ into $V = \\frac{4}{3}\\pi r^3$ and compare your answer with $36\\pi$. ' +
        'Which factor of the formula is responsible for the size of the jump?',
    },
    hints: [
      'Same formula, new radius: $V = \\frac{4}{3}\\pi (6)^3$.',
      '$6^3 = 216$. Take $\\frac{4}{3}$ of $216$.',
      'Compare with the last answer: $288\\pi \\div 36\\pi = 8$, and $8 = 2^3$.',
    ],
    solution:
      '$$V = \\tfrac{4}{3}\\pi (6)^3 = \\tfrac{4}{3}\\pi (216) = 288\\pi \\text{ cm}^3.$$\n\n' +
      'Doubling the radius multiplied the volume by $8$, not by $2$: the radius appears three ' +
      'times in $r^3$, and $2 \\times 2 \\times 2 = 8$.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'sphere',
      view: 'solid',
      dimensions: { radius: 6 },
      caption: 'The same ball with its radius doubled to 6 cm.',
    },
  },
  {
    id: 'mensuration.sphere-area-r3',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.sphere-scaling', position: 3 },
    expect:
      'Back to the $3$ cm ball, but the question has switched from filling it to wrapping it. ' +
      'Predict: will the formula still carry $r^3$, or a lower power — and why?',
    statement:
      'A solid ball has radius $3$ cm. Find its surface area. ' + PI_NOTE,
    answer: inPi(36, 'cm²'),
    cpaPrompts: {
      concrete:
        'Wrap the 3 cm ball tightly in foil, then peel the foil off and flatten it. You are being ' +
        'asked for the area of that flat piece of foil, not for what is inside the ball.',
      pictorial:
        'Draw the flat circle you get by slicing the ball through the middle — area $\\pi r^2 = ' +
        '9\\pi$. The foil covers exactly four of those circles. Sketch four of them.',
      abstract:
        'Put $r = 3$ into $A = 4\\pi r^2$. Two lengths multiplied, not three, so the units are ' +
        'cm² — write them down with the answer.',
    },
    hints: [
      'Surface area of a sphere is $A = 4\\pi r^2$. A wrapping carries two lengths, not three.',
      'Square the radius: $3^2 = 9$. Then multiply by $4\\pi$.',
    ],
    solution:
      '$$A = 4\\pi r^2 = 4\\pi (3)^2 = 4\\pi (9) = 36\\pi \\text{ cm}^2.$$\n\nThe number is the ' +
      'same as the volume of this ball, which is a coincidence of $r = 3$ and nothing more: one ' +
      'answer is $36\\pi$ cm³ and the other $36\\pi$ cm². The units keep them apart.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'sphere',
      view: 'solid',
      dimensions: { radius: 3 },
      caption: 'The 3 cm ball again — this time we are wrapping it, not filling it.',
    },
  },
  {
    id: 'mensuration.sphere-area-r6',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.sphere-scaling', position: 4 },
    expect:
      'The radius doubles again, $3$ cm to $6$ cm, but this time we are wrapping. The volume ' +
      'went up $\\times 8$ when the radius doubled. Predict: does the surface area also go up ' +
      '$\\times 8$, or by a smaller factor?',
    statement:
      'A solid ball has radius $6$ cm. Find its surface area. ' + PI_NOTE,
    answer: inPi(144, 'cm²'),
    cpaPrompts: {
      concrete:
        'You wrapped the 3 cm ball in foil. How many of those pieces of foil would you need to ' +
        'cover the 6 cm ball? Guess first, then check against your answer.',
      pictorial:
        'Draw a $1 \\times 1$ square and a $2 \\times 2$ square beside it. Doubling a length ' +
        'gives four small squares, not eight. A surface behaves like the squares, not the cubes.',
      abstract:
        'Put $r = 6$ into $A = 4\\pi r^2$ and divide by the previous answer $36\\pi$. Which ' +
        'power of $r$ produced the factor you got?',
    },
    hints: [
      'Same wrapping formula: $A = 4\\pi (6)^2$.',
      '$6^2 = 36$, so $A = 144\\pi$. Now compare: $144\\pi \\div 36\\pi = 4$.',
    ],
    solution:
      '$$A = 4\\pi (6)^2 = 4\\pi (36) = 144\\pi \\text{ cm}^2.$$\n\nDoubling the radius ' +
      'multiplied the area by $4$, because $r$ appears twice in $r^2$ and $2 \\times 2 = 4$. The ' +
      'volume went up $\\times 8$; the area only $\\times 4$.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'sphere',
      view: 'solid',
      dimensions: { radius: 6 },
      caption: 'Radius doubled to 6 cm, and we are still wrapping.',
    },
  },
  {
    id: 'mensuration.sphere-area-r12',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.sphere-scaling', position: 5 },
    expect:
      'The radius doubles once more, $6$ cm to $12$ cm. Last time the area went $\\times 4$. ' +
      'Predict the answer before you calculate it, then check whether your prediction was right.',
    statement:
      'A solid ball has radius $12$ cm. Find its surface area. ' + PI_NOTE,
    answer: inPi(576, 'cm²'),
    cpaPrompts: {
      concrete:
        'Line up the three balls: 3 cm, 6 cm, 12 cm. Each is twice the width of the one before. ' +
        'How many foil wraps of the middle ball would cover the largest one?',
      pictorial:
        'Draw the chain of areas: $36\\pi \\to 144\\pi \\to ?$, with a $\\times 4$ arrow between ' +
        'each pair. Fill in the missing end of the chain from the arrow, not from the formula.',
      abstract:
        'Put $r = 12$ into $A = 4\\pi r^2$, and separately do $144\\pi \\times 4$. The two routes ' +
        'must agree — say why they have to.',
    },
    hints: [
      'You can use the formula, or use the pattern: the radius doubled, so multiply the last area by 4.',
      '$A = 4\\pi (12)^2 = 4\\pi (144)$.',
    ],
    solution:
      '$$A = 4\\pi (12)^2 = 4\\pi (144) = 576\\pi \\text{ cm}^2.$$\n\nAnd by the pattern, ' +
      '$144\\pi \\times 4 = 576\\pi$ — the same answer. Doubling the radius always multiplies ' +
      'the surface area by $4$, whatever the radius was to start with.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'sphere',
      view: 'solid',
      dimensions: { radius: 12 },
      caption: 'Radius doubled again, to 12 cm.',
    },
  },
  {
    id: 'mensuration.sphere-scaling-payoff',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.sphere-scaling', position: 6 },
    expect:
      'No numbers at all this time — just the rule the last five items have been building. You ' +
      'saw the volume go $\\times 8$ each time the radius doubled. What did the surface area do ' +
      'every single time?',
    statement:
      'The radius of a sphere is doubled. Its volume is then $8$ times as big as before. By what ' +
      'number is its surface area multiplied?',
    answer: { type: 'number', value: 4, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Take a cube of side 1 cm and a cube of side 2 cm. Count the little cubes inside each ' +
        '(1 and 8) and the little squares on each face (1 and 4). Volume counts cubes; surface ' +
        'counts squares.',
      pictorial:
        'Draw a square growing to twice its side: it becomes four copies of itself. Draw a cube ' +
        'growing to twice its side: it becomes eight copies. That is the whole answer.',
      abstract:
        'In $A = 4\\pi r^2$ replace $r$ by $2r$: $4\\pi (2r)^2 = 4\\pi \\cdot 4r^2$. What has ' +
        'come out at the front, and why is it not $8$?',
    },
    hints: [
      'Replace $r$ with $2r$ in $A = 4\\pi r^2$ and see what pops out at the front.',
      '$(2r)^2 = 4r^2$ — the $2$ gets squared as well as the $r$.',
    ],
    solution:
      'Replacing $r$ by $2r$:\n\n$$A = 4\\pi (2r)^2 = 4\\pi \\cdot 4r^2 = 4 \\times (4\\pi r^2).$$\n\n' +
      'So the surface area is multiplied by $\\mathbf{4}$. The rule: doubling every length ' +
      'multiplies areas by $2^2 = 4$ and volumes by $2^3 = 8$ — the power of $r$ in the formula ' +
      'is the power the scale factor is raised to.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'sphere',
      view: 'solid',
      dimensions: { radius: 6 },
      caption: 'Any sphere: double the radius and compare what filling does with what wrapping does.',
    },
  },

  // ---- Tier 1b: family mensuration.cylinder-fill-and-wrap (5 items) ----
  {
    id: 'mensuration.cylinder-volume-r3-h10',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.cylinder-fill-and-wrap', position: 1 },
    statement:
      'A cylinder has base radius $3$ cm and height $10$ cm. Find its volume. ' + PI_NOTE,
    answer: inPi(90, 'cm³'),
    cpaPrompts: {
      concrete:
        'Stand a circular coaster of radius 3 cm on the desk and stack copies of it until the ' +
        'pile is 10 cm tall. The pile is the cylinder. How would you count the space in the pile?',
      pictorial:
        'Draw the base circle and label its area $\\pi r^2 = 9\\pi$. Then draw the cylinder as ' +
        'that circle dragged straight up 10 cm. Volume is base area times how far it travelled.',
      abstract:
        'Put $r = 3$ and $h = 10$ into $V = \\pi r^2 h$. Notice there are three lengths ' +
        'multiplied together — $r$, $r$ and $h$ — so the answer is in cm³.',
    },
    hints: [
      'A cylinder is its base circle dragged upwards, so $V = \\pi r^2 h$.',
      'Base area is $\\pi (3)^2 = 9\\pi$. Multiply that by the height $10$.',
    ],
    solution:
      '$$V = \\pi r^2 h = \\pi (3)^2 (10) = 9\\pi \\times 10 = 90\\pi \\text{ cm}^3.$$\n\nThree ' +
      'lengths multiplied ($3 \\times 3 \\times 10$), so the units are cubic centimetres.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'solid',
      dimensions: { radius: 3, height: 10 },
      caption: 'A cylinder of radius 3 cm and height 10 cm.',
    },
  },
  {
    id: 'mensuration.cylinder-volume-r3-h20',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.cylinder-fill-and-wrap', position: 2 },
    expect:
      'Only the height has changed, $10$ cm to $20$ cm; the base circle is exactly the same. ' +
      'Predict what happens to $90\\pi$ — and say which part of the formula tells you.',
    statement:
      'A cylinder has base radius $3$ cm and height $20$ cm. Find its volume. ' + PI_NOTE,
    answer: inPi(180, 'cm³'),
    cpaPrompts: {
      concrete:
        'Take the 10 cm pile of coasters and put an identical pile on top of it. Nothing about ' +
        'each coaster changed — you simply have twice as many. What does that do to the space?',
      pictorial:
        'Draw the two cylinders side by side, same width, one twice as tall. Shade the extra ' +
        'part: it is a copy of the first cylinder.',
      abstract:
        'In $V = \\pi r^2 h$ the height appears once, to the power one. Doubling something that ' +
        'appears once multiplies the answer by how much?',
    },
    hints: [
      'Same base, twice the height. You can use $V = \\pi r^2 h$, or just double the last answer.',
      '$V = \\pi (9)(20) = 180\\pi$.',
    ],
    solution:
      '$$V = \\pi (3)^2 (20) = 9\\pi \\times 20 = 180\\pi \\text{ cm}^3.$$\n\nDoubling the height ' +
      'doubles the volume, because $h$ appears exactly once in the formula.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'solid',
      dimensions: { radius: 3, height: 20 },
      caption: 'The same base circle, but the cylinder is now 20 cm tall.',
    },
  },
  {
    id: 'mensuration.cylinder-volume-r6-h10',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.cylinder-fill-and-wrap', position: 3 },
    expect:
      'Now the height goes back to $10$ cm and the radius doubles instead, $3$ cm to $6$ cm. ' +
      'Doubling the height doubled the volume. Predict: will doubling the radius do the same, or ' +
      'something bigger?',
    statement:
      'A cylinder has base radius $6$ cm and height $10$ cm. Find its volume. ' + PI_NOTE,
    answer: inPi(360, 'cm³'),
    cpaPrompts: {
      concrete:
        'Swap the coasters for ones of twice the radius and rebuild a 10 cm pile. Each coaster ' +
        'now covers four times as much desk. How many of the old piles fit inside the new one?',
      pictorial:
        'Draw the two base circles, radius 3 and radius 6. The big circle holds four copies of ' +
        'the small one. Both piles are the same height, so compare the bases.',
      abstract:
        'In $V = \\pi r^2 h$ the radius appears twice. Put $r = 6$, $h = 10$ and compare with ' +
        '$90\\pi$: what factor did you get, and why is it not $2$?',
    },
    hints: [
      'The base area is $\\pi (6)^2 = 36\\pi$, four times the old $9\\pi$.',
      'Multiply that base area by the height $10$.',
    ],
    solution:
      '$$V = \\pi (6)^2 (10) = 36\\pi \\times 10 = 360\\pi \\text{ cm}^3.$$\n\nDoubling the ' +
      'radius multiplied the volume by $4$, not $2$: $r$ appears twice in $\\pi r^2 h$, so the ' +
      'doubling is applied twice.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'solid',
      dimensions: { radius: 6, height: 10 },
      caption: 'Radius doubled to 6 cm, height back to 10 cm.',
    },
  },
  {
    id: 'mensuration.cylinder-curved-r3-h10',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.cylinder-fill-and-wrap', position: 4 },
    expect:
      'Back to the first cylinder, $r = 3$ and $h = 10$ — but the question has changed from ' +
      'filling to wrapping. Predict: should the answer be bigger or smaller than $90\\pi$, and ' +
      'what units will it have?',
    statement:
      'A cylinder has base radius $3$ cm and height $10$ cm. Find the area of its curved surface ' +
      'only — the label that wraps round it, with no top and no bottom. ' + PI_NOTE,
    answer: inPi(60, 'cm²'),
    cpaPrompts: {
      concrete:
        'Peel the paper label off a tin and lay it flat on the desk. It is a rectangle. One side ' +
        'is the height of the tin — what is the other side the length of?',
      pictorial:
        'Draw the unrolled label as a rectangle. Its height is $10$ cm and its width is the ' +
        'distance all the way round the tin, $2\\pi r$. Write both lengths on your rectangle.',
      abstract:
        'Curved surface area $= 2\\pi r h$: circumference times height. Put $r = 3$, $h = 10$ in ' +
        'and check that only two lengths were multiplied.',
    },
    hints: [
      'Unroll the curved surface. It is a rectangle: height $\\times$ circumference.',
      'The circumference is $2\\pi (3) = 6\\pi$. Multiply by the height $10$.',
    ],
    solution:
      'Unrolled, the curved surface is a rectangle $10$ cm tall and $2\\pi r = 6\\pi$ cm wide:\n\n' +
      '$$A = 2\\pi r h = 2\\pi (3)(10) = 60\\pi \\text{ cm}^2.$$\n\nOnly two lengths were ' +
      'multiplied, so the units are cm² — a wrapping, not a filling.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'net',
      dimensions: { radius: 3, height: 10 },
      caption: 'The cylinder unrolled: two circles and a rectangle whose width is the circumference.',
    },
  },
  {
    id: 'mensuration.cylinder-total-r3-h10',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.cylinder-fill-and-wrap', position: 5 },
    expect:
      'Same cylinder once more, but now the tin has a lid and a base as well as a label. ' +
      'Predict what has to be added to $60\\pi$, and how many pieces you are adding.',
    statement:
      'A closed cylindrical tin has base radius $3$ cm and height $10$ cm. Find its total surface ' +
      'area, including the lid and the base. ' + PI_NOTE,
    answer: inPi(78, 'cm²'),
    cpaPrompts: {
      concrete:
        'Cut a tin open with scissors: the label comes off as a rectangle and the two ends come ' +
        'off as circles. Lay all three pieces on the desk. That pile is the total surface area.',
      pictorial:
        'Draw the net: a rectangle with a circle stuck on the top edge and another on the bottom ' +
        'edge. Write the area inside each of the three pieces.',
      abstract:
        'Total $= 2\\pi r h + 2\\pi r^2$: the wrap plus two circles. Substitute $r = 3$ and ' +
        '$h = 10$, and keep the two parts separate until the last line.',
    },
    hints: [
      'The net has three pieces: the rectangle you already found, plus two circles.',
      'Each circle has area $\\pi (3)^2 = 9\\pi$, and there are two of them.',
      'Add: $60\\pi + 9\\pi + 9\\pi$.',
    ],
    solution:
      '$$A = 2\\pi r h + 2\\pi r^2 = 60\\pi + 2\\pi (9) = 60\\pi + 18\\pi = 78\\pi \\text{ cm}^2.$$\n\n' +
      'The pattern for the whole family: a volume formula multiplies three lengths and lands in ' +
      'cm³; an area formula multiplies two and lands in cm². If your answer has the wrong units, ' +
      'you have used the wrong formula.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'both',
      dimensions: { radius: 3, height: 10 },
      caption: 'The closed tin and its net: one rectangle and two circles.',
    },
  },

  // ---- Tier 1c: family mensuration.cone-third (3 items) ----
  {
    id: 'mensuration.cone-volume',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.cone-third', position: 1 },
    statement:
      'A right cone has base radius $5$ cm and vertical height $12$ cm. Find its volume. ' + PI_NOTE,
    answer: inPi(100, 'cm³'),
    cpaPrompts: {
      concrete:
        'Picture the cylinder with the same base and the same height, 12 cm tall. How many cones ' +
        'of water does it take to fill it? So what fraction of the cylinder is the cone?',
      pictorial:
        'Draw the cone inside its cylinder. The cylinder\'s volume is base area times height. ' +
        'What is the base area in terms of $\\pi$, and what does a third of the cylinder come to?',
      abstract:
        'Substitute $r = 5$ and $h = 12$ into $V = \\frac{1}{3}\\pi r^2 h$, and say why the ' +
        'vertical height rather than the slant is the one that goes in.',
    },
    hints: [
      'For volume, use $V = \\frac{1}{3}\\pi r^2 h$ with $r = 5$ and $h = 12$. Which height goes ' +
        'in here — the vertical one or the slant?',
      'Work out $r^2 h = 25 \\times 12$ first, then take a third of it.',
    ],
    solution:
      '$$V = \\tfrac{1}{3}\\pi r^2 h = \\tfrac{1}{3}\\pi (25)(12) = 100\\pi \\text{ cm}^3.$$\n\n' +
      'The matching cylinder holds $\\pi(25)(12) = 300\\pi$, and the cone is exactly a third of it.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'solid',
      dimensions: { radius: 5, height: 12 },
      caption: 'A cone of base radius 5 cm and vertical height 12 cm.',
    },
  },
  {
    id: 'mensuration.cone-volume-h24',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.cone-third', position: 2 },
    expect:
      'Only the vertical height changed, $12$ cm to $24$ cm; the base circle is untouched. ' +
      'Predict what $100\\pi$ becomes, and name the part of the formula that decides it.',
    statement:
      'A right cone has base radius $5$ cm and vertical height $24$ cm. Find its volume. ' + PI_NOTE,
    answer: inPi(200, 'cm³'),
    cpaPrompts: {
      concrete:
        'Pour the first cone of water into a taller cone with the same rim, twice as deep. How ' +
        'many pours does it take to fill the tall one?',
      pictorial:
        'Draw the two cones side by side on the same base circle, one twice as tall. Their bases ' +
        'are identical, so only the height is doing any work.',
      abstract:
        'In $V = \\frac{1}{3}\\pi r^2 h$ the height appears once. Substitute $h = 24$ with ' +
        '$r = 5$ and compare with $100\\pi$.',
    },
    hints: [
      'Same formula with $h = 24$: $V = \\frac{1}{3}\\pi (25)(24)$.',
      '$\\frac{1}{3} \\times 25 \\times 24 = 200$, so the volume is $200\\pi$.',
    ],
    solution:
      '$$V = \\tfrac{1}{3}\\pi (5)^2 (24) = \\tfrac{1}{3}\\pi (600) = 200\\pi \\text{ cm}^3.$$\n\n' +
      'Doubling the height doubled the volume, exactly as it did for the cylinder — $h$ appears ' +
      'once in both formulas.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'solid',
      dimensions: { radius: 5, height: 24 },
      caption: 'The same base circle, with the cone twice as tall.',
    },
  },
  {
    id: 'mensuration.cone-volume-r10',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.cone-third', position: 3 },
    expect:
      'The height returns to $12$ cm and the radius doubles instead, $5$ cm to $10$ cm. Doubling ' +
      'the height doubled the volume. Predict what doubling the radius does, and say why the two ' +
      'are different.',
    statement:
      'A right cone has base radius $10$ cm and vertical height $12$ cm. Find its volume. ' + PI_NOTE,
    answer: inPi(400, 'cm³'),
    cpaPrompts: {
      concrete:
        'Keep the depth the same but use a cone with a rim twice as wide. The opening now covers ' +
        'four times as much table. How many of the narrow cones of water will it swallow?',
      pictorial:
        'Draw the two base circles, radius 5 and radius 10. Four of the small circles fit inside ' +
        'the big one, and both cones are 12 cm deep.',
      abstract:
        'In $V = \\frac{1}{3}\\pi r^2 h$ the radius appears twice. Substitute $r = 10$, $h = 12$ ' +
        'and divide your answer by $100\\pi$.',
    },
    hints: [
      'The base area is $\\pi (10)^2 = 100\\pi$, four times as big as before.',
      '$V = \\frac{1}{3}\\pi (100)(12)$.',
    ],
    solution:
      '$$V = \\tfrac{1}{3}\\pi (10)^2 (12) = \\tfrac{1}{3}\\pi (1200) = 400\\pi \\text{ cm}^3.$$\n\n' +
      'The rule for this family: in every volume formula the height appears once and the radius ' +
      'appears twice, so doubling $h$ gives $\\times 2$ but doubling $r$ gives $\\times 4$.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'solid',
      dimensions: { radius: 10, height: 12 },
      caption: 'Radius doubled to 10 cm, height back to 12 cm.',
    },
  },

  // ---- Tier 1d: family mensuration.pyramid-third (3 items) ----
  {
    id: 'mensuration.pyramid-volume-6-10',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.pyramid-third', position: 1 },
    statement:
      'A right pyramid has a square base of side $6$ cm and vertical height $10$ cm. Find its ' +
      'volume in cm³.',
    answer: { type: 'number', value: 120, tolerance: 0, unit: 'cm³' },
    cpaPrompts: {
      concrete:
        'Fill a hollow pyramid with rice and pour it into a box with the same square base and the ' +
        'same height. It takes three pyramids to fill the box — the same one-third as the cone.',
      pictorial:
        'Draw the pyramid inside its box. The box is $6 \\times 6 \\times 10$. Shade the pyramid ' +
        'and write "one third of the box" beside it.',
      abstract:
        'Use $V = \\frac{1}{3} \\times \\text{base area} \\times h$ with base area $6 \\times 6$ ' +
        'and $h = 10$. No $\\pi$ appears, because the base is a square, not a circle.',
    },
    hints: [
      'A pyramid is a third of the box on the same base with the same height.',
      'Base area is $6 \\times 6 = 36$. Work out $\\frac{1}{3} \\times 36 \\times 10$.',
    ],
    solution:
      '$$V = \\tfrac{1}{3} \\times 36 \\times 10 = 120 \\text{ cm}^3.$$\n\nThe box on the same ' +
      'base holds $36 \\times 10 = 360$ cm³, and the pyramid is exactly a third of it.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'pyramid',
      view: 'solid',
      dimensions: { length: 6, width: 6, height: 10, baseEdges: 4 },
      caption: 'A pyramid on a 6 cm square base, 10 cm tall.',
    },
  },
  {
    id: 'mensuration.pyramid-volume-6-20',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.pyramid-third', position: 2 },
    expect:
      'Only the height changed, $10$ cm to $20$ cm; the square base is the same. Predict the new ' +
      'volume before working it out, and say which number in the formula you doubled.',
    statement:
      'A right pyramid has a square base of side $6$ cm and vertical height $20$ cm. Find its ' +
      'volume in cm³.',
    answer: { type: 'number', value: 240, tolerance: 0, unit: 'cm³' },
    cpaPrompts: {
      concrete:
        'Push the apex of the pyramid straight up until it is twice as high, keeping the base ' +
        'pinned to the desk. Does the base cover any more of the desk than before?',
      pictorial:
        'Draw the two pyramids on the same square, one twice as tall. Only the vertical dimension ' +
        'has stretched.',
      abstract:
        'In $V = \\frac{1}{3} \\times \\text{base} \\times h$ the height appears once, so ' +
        'doubling it does what? Substitute $h = 20$ and check.',
    },
    hints: [
      'Same base area $36$, new height $20$.',
      '$V = \\frac{1}{3} \\times 36 \\times 20$, or simply double the previous answer.',
    ],
    solution:
      '$$V = \\tfrac{1}{3} \\times 36 \\times 20 = 240 \\text{ cm}^3.$$\n\nDoubling the height ' +
      'doubled the volume, because $h$ appears once in the formula — the same behaviour as the ' +
      'cylinder and the cone.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'pyramid',
      view: 'solid',
      dimensions: { length: 6, width: 6, height: 20, baseEdges: 4 },
      caption: 'The same 6 cm square base, but the pyramid is 20 cm tall.',
    },
  },
  {
    id: 'mensuration.pyramid-volume-12-10',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 1,
    sequence: { family: 'mensuration.pyramid-third', position: 3 },
    expect:
      'The height goes back to $10$ cm and the base edge doubles instead, $6$ cm to $12$ cm. ' +
      'Doubling the height gave $\\times 2$. Predict what doubling the base edge gives, and why.',
    statement:
      'A right pyramid has a square base of side $12$ cm and vertical height $10$ cm. Find its ' +
      'volume in cm³.',
    answer: { type: 'number', value: 480, tolerance: 0, unit: 'cm³' },
    cpaPrompts: {
      concrete:
        'Lay the small square base on the desk, then the big one beside it. How many small squares ' +
        'tile the big one? The pyramid grew in two directions at once, not one.',
      pictorial:
        'Draw a $6 \\times 6$ square and a $12 \\times 12$ square. Cut the big one into copies of ' +
        'the small one and count them.',
      abstract:
        'The base edge appears twice in the base area $s^2$. With $s = 12$ and $h = 10$, work out ' +
        '$\\frac{1}{3} \\times 144 \\times 10$ and compare with $120$.',
    },
    hints: [
      'Find the new base area first: $12 \\times 12$.',
      '$V = \\frac{1}{3} \\times 144 \\times 10$. Compare with the first answer of $120$.',
    ],
    solution:
      '$$V = \\tfrac{1}{3} \\times 144 \\times 10 = 480 \\text{ cm}^3.$$\n\nDoubling the base ' +
      'edge multiplied the volume by $4$, because the edge appears twice in the base area. Every ' +
      'solid in this unit behaves the same way: a length that appears once gives $\\times 2$, one ' +
      'that appears twice gives $\\times 4$.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'pyramid',
      view: 'solid',
      dimensions: { length: 12, width: 12, height: 10, baseEdges: 4 },
      caption: 'Base edge doubled to 12 cm, height back to 10 cm.',
    },
  },

  // ---- Tier 2: unfamiliar surfaces ----
  {
    id: 'mensuration.cylinder-find-radius',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 2,
    statement:
      'A cylinder is $5$ cm tall and its volume is $80\\pi$ cm³. Find its base radius, in cm.',
    answer: { type: 'number', value: 4, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'You have the finished pile of coasters and its total volume, and you know the pile is ' +
        '5 cm high. What must one coaster cover, and how wide does that make it?',
      pictorial:
        'Draw the cylinder with the height labelled $5$ and the base circle left blank. Write the ' +
        'known volume beside it. The base area is the missing piece.',
      abstract:
        'Start from $V = \\pi r^2 h$, put in what you know, and undo the operations one at a time ' +
        'until $r$ is alone. The last undoing is a square root.',
    },
    hints: [
      'Write the formula with the numbers you have: $80\\pi = \\pi r^2 (5)$.',
      'Divide both sides by $5\\pi$ to get $r^2$ on its own.',
      '$r^2 = 16$, so take the positive square root.',
    ],
    solution:
      '$$80\\pi = \\pi r^2 (5) \\implies r^2 = \\frac{80\\pi}{5\\pi} = 16 \\implies r = 4 ' +
      '\\text{ cm}.$$\n\nCheck: $\\pi (4)^2 (5) = 80\\pi$. ✓ A length can only be positive, so the ' +
      'negative root is thrown away.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'net',
      dimensions: { radius: 4, height: 5 },
      caption: 'The cylinder unrolled. The rectangle is 5 cm tall; its width is the circumference.',
    },
  },
  {
    id: 'mensuration.hemisphere-total-area',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 2,
    statement:
      'A solid hemisphere has radius $6$ cm. Find its total surface area — the curved dome and ' +
      'the flat circle it sits on. ' + PI_NOTE,
    answer: inPi(108, 'cm²'),
    cpaPrompts: {
      concrete:
        'Slice a ball exactly in half and put one half dome-up on the table. Paint every part of ' +
        'it you can see and touch, then lift it and paint underneath too. How many pieces did you ' +
        'paint?',
      pictorial:
        'Draw the dome and, separately, the flat circle of the cut. Label the dome "half of ' +
        '$4\\pi r^2$" and the circle "$\\pi r^2$".',
      abstract:
        'Dome $= \\frac{1}{2}(4\\pi r^2) = 2\\pi r^2$; flat face $= \\pi r^2$. Add them with ' +
        '$r = 6$ and notice the total is $3\\pi r^2$, not $2\\pi r^2$.',
    },
    hints: [
      'A hemisphere has two surfaces, not one: the curved dome and the flat circular face.',
      'The dome is half a sphere\'s area: $\\frac{1}{2}(4\\pi r^2) = 2\\pi r^2$. The flat face is $\\pi r^2$.',
      'Total $= 2\\pi (36) + \\pi (36)$.',
    ],
    solution:
      '$$A = 2\\pi r^2 + \\pi r^2 = 3\\pi r^2 = 3\\pi (6)^2 = 108\\pi \\text{ cm}^2.$$\n\nHalving ' +
      'a sphere does not halve its surface area: cutting it open creates a brand new flat face ' +
      'that the whole sphere never had.',
    misconceptionCodes: ['mensuration.hidden-join-counted', 'mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'hemisphere',
      view: 'solid',
      dimensions: { radius: 6 },
      caption: 'A solid hemisphere of radius 6 cm, resting on its flat circular face.',
    },
  },
  {
    id: 'mensuration.sphere-volume-3sf',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 2,
    statement:
      'A ball has radius $4.5$ cm. Find its volume in cm³, correct to $3$ significant figures.',
    answer: toThreeSf(121.5 * Math.PI, 0.5, 'cm³'),
    cpaPrompts: {
      concrete:
        'A tennis ball is about this size. Before calculating, guess its volume in cm³ — is it ' +
        'nearer 100, 400 or 4000? Keep the guess to check your answer against.',
      pictorial:
        'Draw the ball inside a $9 \\times 9 \\times 9$ cube, volume $729$ cm³. Your answer has to ' +
        'be roughly half of that.',
      abstract:
        'Substitute $r = 4.5$ into $V = \\frac{4}{3}\\pi r^3$, keep the exact value $121.5\\pi$ as ' +
        'long as you can, and only round at the very end.',
    },
    hints: [
      'Cube the radius first: $4.5^3 = 91.125$. A decimal radius changes nothing about the method.',
      '$V = \\frac{4}{3}\\pi (91.125) = 121.5\\pi$. Now evaluate and round to 3 significant figures.',
    ],
    solution:
      '$$V = \\tfrac{4}{3}\\pi (4.5)^3 = \\tfrac{4}{3}\\pi (91.125) = 121.5\\pi = 381.70\\ldots ' +
      '\\approx 382 \\text{ cm}^3.$$\n\nRound once, at the end. Rounding $4.5^3$ first would ' +
      'change the third significant figure of the answer.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'sphere',
      view: 'solid',
      dimensions: { radius: 4.5 },
      caption: 'A ball of radius 4.5 cm.',
    },
  },
  {
    id: 'mensuration.cone-from-its-net',
    skillIds: ['mensuration.calculate-surface-areas', 'mensuration.distinguish-vertical-height'],
    tier: 2,
    statement:
      'A solid cone is cut open and laid flat. Its net is a circle of radius $6$ cm together with ' +
      'a sector whose two straight edges are each $10$ cm long. Find the total surface area of ' +
      'the cone. ' + PI_NOTE,
    answer: inPi(96, 'cm²'),
    cpaPrompts: {
      concrete:
        'Cut a paper cone from the rim up to the tip and flatten it. The straight edges of the ' +
        'flat piece were both the same line on the cone. Which length of the cone are they?',
      pictorial:
        'Draw the two flat pieces: a circle of radius $6$ and a fan-shaped sector of radius $10$. ' +
        'Label the circle "base" and the sector "curved surface".',
      abstract:
        'The sector\'s radius is the slant height $l = 10$; the circle\'s radius is $r = 6$. Total ' +
        '$= \\pi r l + \\pi r^2$. Substitute and add.',
    },
    hints: [
      'The straight edge of the sector was the slant height of the cone, so $l = 10$ and $r = 6$.',
      'Curved surface $= \\pi r l = \\pi (6)(10)$; base $= \\pi r^2 = \\pi (36)$.',
      'Add the two pieces of the net together.',
    ],
    solution:
      'From the net, $r = 6$ cm and $l = 10$ cm.\n\n$$A = \\pi r l + \\pi r^2 = \\pi (6)(10) + ' +
      '\\pi (6)^2 = 60\\pi + 36\\pi = 96\\pi \\text{ cm}^2.$$\n\nThe sector radius is always the ' +
      'slant, never the vertical height — the vertical height is inside the cone and is not part ' +
      'of the paper at all.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'net',
      dimensions: { radius: 6, height: 8, slant: 10 },
      caption: 'The net: a base circle of radius 6 cm and a sector of radius 10 cm.',
    },
  },

  // ---- Tier 3: contexts that must be formulated ----
  {
    id: 'mensuration.water-tank-litres',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 3,
    statement:
      'A water tank is a straight-sided drum, $1.2$ m across the top and $1.5$ m deep. One cubic ' +
      'metre holds $1000$ litres. How many litres does the full tank hold? Give your answer ' +
      'correct to $3$ significant figures.',
    answer: toThreeSf(540 * Math.PI, 5, 'litres'),
    cpaPrompts: {
      concrete:
        'Stand a bucket under a tap and fill it. The water sits in a shape with a flat circular ' +
        'top and straight sides. What two measurements of the tank decide how much it holds?',
      pictorial:
        'Sketch the tank from the side: a rectangle $1.5$ m tall, with a circle on top seen edge ' +
        'on. Mark the distance across the circle as $1.2$ m — is that the radius or twice it?',
      abstract:
        'Halve the width to get the radius, use $V = \\pi r^2 h$ in metres, then convert the cubic ' +
        'metres to litres by multiplying by $1000$.',
    },
    hints: [
      'The $1.2$ m is the distance right across the top, so it is the diameter. What is the radius?',
      'Volume in m³ is $\\pi (0.6)^2 (1.5)$.',
      'That is $0.54\\pi$ m³. Multiply by $1000$ to turn cubic metres into litres, then round.',
    ],
    solution:
      'The radius is $1.2 \\div 2 = 0.6$ m.\n\n$$V = \\pi (0.6)^2 (1.5) = 0.54\\pi \\text{ m}^3 = ' +
      '540\\pi \\text{ litres} = 1696.4\\ldots \\approx 1700 \\text{ litres}.$$\n\nThe trap is ' +
      'using $1.2$ as the radius; that would give four times too much water.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'solid',
      dimensions: { radius: 0.6, height: 1.5 },
      caption: 'The tank, in metres. The figure shows the radius; the question gave the width across.',
    },
  },
  {
    id: 'mensuration.soup-tin-metal',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 3,
    statement:
      'A soup tin is $7$ cm across and $10$ cm tall. It is made from a single sheet of metal: the ' +
      'wall, the bottom and the lid. How many cm² of metal does one tin use? Give your answer ' +
      'correct to $3$ significant figures.',
    answer: toThreeSf(94.5 * Math.PI, 0.5, 'cm²'),
    cpaPrompts: {
      concrete:
        'Take a tin, cut the wall open and press it flat, then add the two ends. Lay the flattened ' +
        'pieces on the desk. How many separate pieces of metal are you looking at?',
      pictorial:
        'Draw the three flat pieces: a long rectangle and two circles. Write the height on one ' +
        'side of the rectangle and the distance round the tin on the other.',
      abstract:
        'Halve the $7$ cm to get the radius. Metal $= 2\\pi r h + 2\\pi r^2$. Substitute, keep the ' +
        'answer as a multiple of $\\pi$ until the last step, then round.',
    },
    hints: [
      'The tin is $7$ cm across, so the radius is $3.5$ cm.',
      'Three pieces: the wall $2\\pi r h$, and two circles of area $\\pi r^2$ each.',
      '$2\\pi (3.5)(10) = 70\\pi$ and $2\\pi (3.5)^2 = 24.5\\pi$. Add, then round.',
    ],
    solution:
      'Radius $r = 3.5$ cm.\n\n$$A = 2\\pi r h + 2\\pi r^2 = 70\\pi + 24.5\\pi = 94.5\\pi = ' +
      '296.88\\ldots \\approx 297 \\text{ cm}^2.$$\n\nThe wall is much the biggest piece; ' +
      'forgetting one of the circles costs about $38$ cm², which is why it is worth listing the ' +
      'pieces before calculating.',
    misconceptionCodes: ['mensuration.hidden-join-counted', 'mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'both',
      dimensions: { radius: 3.5, height: 10 },
      caption: 'The tin and the flat metal it is made from: one rectangle and two circles.',
    },
  },

  // ---- Tier 4: reasoning ----
  {
    id: 'mensuration.ball-in-the-tin',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 4,
    statement:
      'A ball of radius $3$ cm fits exactly inside a closed cylindrical tin: it touches the wall ' +
      'all the way round, and it touches both the base and the lid. Find the volume of the empty ' +
      'space left in the tin. ' + PI_NOTE,
    answer: inPi(18, 'cm³'),
    cpaPrompts: {
      concrete:
        'Drop a ball into a tin it just fits. Now pour water in until the tin is full to the lid. ' +
        'The water you poured is the answer. Would you expect it to be more or less than half a ' +
        'tin?',
      pictorial:
        'Draw the tin from the side as a square with a circle inscribed in it — the circle touches ' +
        'all four sides. Mark the tin\'s radius as $3$ and work out its height from the picture.',
      abstract:
        'Because the ball touches base and lid, $h = 2r = 6$. Empty $= \\pi r^2 h - ' +
        '\\frac{4}{3}\\pi r^3$. Do it with $r = 3$, then again with a general $r$ and see what ' +
        'fraction is left.',
    },
    hints: [
      'How tall must the tin be if the ball touches both the base and the lid? Write the height in terms of the radius.',
      'Tin: $V = \\pi (3)^2 (6)$. Ball: $V = \\frac{4}{3}\\pi (3)^3$.',
      'Subtract the ball from the tin: $54\\pi - 36\\pi$.',
    ],
    solution:
      'The ball touches base and lid, so the tin\'s height is $h = 2r = 6$ cm.\n\n' +
      '$$V_{\\text{tin}} = \\pi (3)^2 (6) = 54\\pi, \\qquad V_{\\text{ball}} = \\tfrac{4}{3}\\pi ' +
      '(3)^3 = 36\\pi.$$\n\n$$\\text{Empty} = 54\\pi - 36\\pi = 18\\pi \\text{ cm}^3.$$\n\nIn ' +
      'general the tin holds $\\pi r^2 (2r) = 2\\pi r^3$ and the ball $\\frac{4}{3}\\pi r^3$, so ' +
      'the ball always fills exactly $\\frac{2}{3}$ of its tin and $\\frac{1}{3}$ is always air — ' +
      'whatever the radius. That is Archimedes\' result.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'solid',
      dimensions: { radius: 3, height: 6 },
      caption: 'The tin. A ball of radius 3 cm fits inside it exactly, touching the wall, base and lid.',
    },
  },

  // ---- Diagnostic ----
  {
    id: 'mensuration.dx-r-squared-r-cubed-swapped',
    skillIds: ['mensuration.calculate-surface-areas'],
    tier: 'diagnostic',
    statement:
      'A sphere has radius $6$ cm. Find its volume, as a multiple of $\\pi$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$48\\pi$ cm³', misconceptionCode: 'mensuration.r-squared-r-cubed-swapped' },
        { label: 'B', value: '$288\\pi$ cm³' },
        { label: 'C', value: '$24\\pi$ cm³', misconceptionCode: 'exponents.exponent-as-multiplier' },
      ],
    },
    cpaPrompts: {
      concrete:
        'A volume is a count of centimetre cubes. Ask yourself how many separate lengths have to ' +
        'be multiplied together before a count of cubes can appear.',
      pictorial:
        'Draw the ball inside a $12 \\times 12 \\times 12$ cube, which holds $1728$ cm³. Which of ' +
        'the three answers is a believable share of that box?',
      abstract:
        'Write $V = \\frac{4}{3}\\pi r^3$ with $r = 6$, and evaluate $6^3$ carefully before ' +
        'multiplying by $\\frac{4}{3}$.',
    },
    hints: [
      'Volume is measured in cm³. Which power of $r$ carries three dimensions?',
      '$6^3$ means $6 \\times 6 \\times 6$, not $6 \\times 3$ and not $6 \\times 6$.',
    ],
    solution:
      '$$V = \\tfrac{4}{3}\\pi r^3 = \\tfrac{4}{3}\\pi (6)^3 = \\tfrac{4}{3}\\pi (216) = 288\\pi ' +
      '\\text{ cm}^3.$$\n\n$48\\pi$ comes from using $r^2 = 36$ — the surface-area power in a ' +
      'volume formula, which cannot produce cubic units. $24\\pi$ comes from reading $6^3$ as ' +
      '$6 \\times 3 = 18$; an index counts factors, it is not a multiplier.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped', 'exponents.exponent-as-multiplier'],
    figure: {
      kind: 'solid_net',
      solid: 'sphere',
      view: 'solid',
      dimensions: { radius: 6 },
      caption: 'A sphere of radius 6 cm.',
    },
  },

  // =========================================================================
  // Skill 2 — composite solids and hollow containers
  // =========================================================================

  // ---- Tier 1: family mensuration.composite-pieces (5 items) ----
  {
    id: 'mensuration.silo-volume',
    skillIds: ['mensuration.solve-problems-involving'],
    tier: 1,
    sequence: { family: 'mensuration.composite-pieces', position: 1 },
    statement:
      'A storage silo is a cylinder of radius $3$ m and height $8$ m, topped by a solid ' +
      'hemisphere of radius $3$ m. Find the total volume of the silo in m³, correct to $3$ ' +
      'significant figures.',
    answer: toThreeSf(90 * Math.PI, 0.5, 'm³'),
    cpaPrompts: {
      concrete:
        'If you filled the silo with water, the water would fill the cylinder part and the dome ' +
        'part. Does the join between them change how much water fits?',
      pictorial:
        'Draw the silo and dash a line where the dome meets the cylinder. Below the line is a ' +
        'cylinder; above it is half a sphere. Write the volume formula under each piece.',
      abstract:
        '$V = \\pi r^2 h + \\frac{2}{3}\\pi r^3$ with $r = 3$, $h = 8$; evaluate the two pieces ' +
        'separately, add, and only then round.',
    },
    hints: [
      'Break the solid into its two components: the cylinder at the bottom and the hemisphere on ' +
        'top. Find each volume separately.',
      'A hemisphere is half a sphere, so its volume is $\\frac{2}{3}\\pi r^3$. The cylinder is ' +
        '$\\pi r^2 h$.',
      'Add $72\\pi$ and $18\\pi$, then multiply out and round to 3 significant figures.',
    ],
    solution:
      '$$V = \\pi r^2 h + \\tfrac{2}{3}\\pi r^3 = \\pi(9)(8) + \\tfrac{2}{3}\\pi(27) = 72\\pi + ' +
      '18\\pi = 90\\pi \\approx 283 \\text{ m}^3.$$\n\nFor volume the join costs nothing: the ' +
      'water simply fills both rooms.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'solid',
      dimensions: { radius: 3, height: 8 },
      caption: 'The silo\'s cylindrical body, radius 3 m and height 8 m. A hemisphere of the same radius caps it.',
    },
  },
  {
    id: 'mensuration.silo-surface-area',
    skillIds: ['mensuration.solve-problems-involving'],
    tier: 1,
    sequence: { family: 'mensuration.composite-pieces', position: 2 },
    expect:
      'Exactly the same silo and exactly the same numbers — but the question has switched from ' +
      'filling to wrapping. Predict: does the circle where the dome meets the wall count this ' +
      'time, and why?',
    statement:
      'A storage silo is a cylinder of radius $3$ m and height $8$ m, topped by a solid ' +
      'hemisphere of radius $3$ m. Find the total exterior surface area, including the flat ' +
      'circular base, in m² correct to $3$ significant figures.',
    answer: toThreeSf(75 * Math.PI, 0.5, 'm²'),
    cpaPrompts: {
      concrete:
        'Imagine painting the outside of the silo. List every surface your brush touches. Is ' +
        'there a circle where the dome sits on the wall that the brush can reach?',
      pictorial:
        'Draw the exploded pieces: a base circle, a curved rectangle for the wall, a dome. Shade ' +
        'what is exposed. Cross out the two circular faces at the join.',
      abstract:
        '$A = \\pi r^2 + 2\\pi r h + 2\\pi r^2 = 3\\pi r^2 + 2\\pi r h$; substitute $r = 3$, ' +
        '$h = 8$, evaluate and round.',
    },
    hints: [
      'Which faces are on the outside? The flat base, the curved wall of the cylinder, and the ' +
        'dome of the hemisphere.',
      'Do not include the circular boundary where the hemisphere meets the cylinder — it is ' +
        'inside the silo.',
      'Add $\\pi r^2 + 2\\pi r h + 2\\pi r^2$ with $r = 3$ and $h = 8$, then round.',
    ],
    solution:
      '$$A = \\pi r^2 + 2\\pi r h + 2\\pi r^2 = 9\\pi + 48\\pi + 18\\pi = 75\\pi \\approx 236 ' +
      '\\text{ m}^2.$$\n\nThe circle where the dome meets the wall is not exposed and is not ' +
      'counted. Volume adds every piece; surface area subtracts every face that has been glued ' +
      'shut.',
    misconceptionCodes: ['mensuration.hidden-join-counted'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'both',
      dimensions: { radius: 3, height: 8 },
      caption: 'The silo wall and its net. The dome of radius 3 m sits on the top circle, hiding it.',
    },
  },
  {
    id: 'mensuration.cone-on-hemisphere',
    skillIds: ['mensuration.solve-problems-involving'],
    tier: 1,
    sequence: { family: 'mensuration.composite-pieces', position: 3 },
    expect:
      'Back to filling, but the cylinder has been swapped for a cone: a cone of radius $3$ cm ' +
      'and height $4$ cm sitting on a hemisphere of radius $3$ cm. Predict which of the two ' +
      'pieces holds more, before you work either of them out.',
    statement:
      'A toy is a cone of base radius $3$ cm and vertical height $4$ cm, sitting on top of a ' +
      'solid hemisphere of radius $3$ cm. Find the total volume of the toy. ' + PI_NOTE,
    answer: inPi(30, 'cm³'),
    cpaPrompts: {
      concrete:
        'Push a scoop of ice cream into the top of a cone and round it off into a dome. Two ' +
        'separate helpings of ice cream: one filling the cone, one making the dome.',
      pictorial:
        'Draw the toy with a dashed line at the join. Above it a cone with $r = 3$, $h = 4$; ' +
        'below it half a ball with $r = 3$. Write a formula against each piece.',
      abstract:
        '$V = \\frac{1}{3}\\pi r^2 h + \\frac{2}{3}\\pi r^3$ with $r = 3$ and $h = 4$. Evaluate ' +
        'the two pieces separately before adding.',
    },
    hints: [
      'Two pieces, two formulas: the cone is $\\frac{1}{3}\\pi r^2 h$ and the hemisphere is $\\frac{2}{3}\\pi r^3$.',
      'Cone: $\\frac{1}{3}\\pi (9)(4) = 12\\pi$. Hemisphere: $\\frac{2}{3}\\pi (27) = 18\\pi$.',
      'Add the two volumes.',
    ],
    solution:
      '$$V = \\tfrac{1}{3}\\pi (3)^2 (4) + \\tfrac{2}{3}\\pi (3)^3 = 12\\pi + 18\\pi = 30\\pi ' +
      '\\text{ cm}^3.$$\n\nThe dome holds more than the cone even though it is shorter — a cone ' +
      'wastes space by tapering to a point.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'hemisphere',
      view: 'solid',
      dimensions: { radius: 3 },
      caption: 'The hemisphere of the toy, radius 3 cm. A cone of the same radius and height 4 cm sits on it.',
    },
  },
  {
    id: 'mensuration.pipe-volume',
    skillIds: ['mensuration.solve-problems-involving'],
    tier: 1,
    sequence: { family: 'mensuration.composite-pieces', position: 4 },
    expect:
      'The pieces are no longer added — this solid is a cylinder with a smaller cylinder removed ' +
      'from the middle. Predict which operation replaces the addition, and whether the answer ' +
      'will be more or less than $250\\pi$.',
    statement:
      'A metal pipe is $10$ cm long. Its outer radius is $5$ cm and it has a hole of radius $3$ ' +
      'cm running all the way through. Find the volume of metal in the pipe. ' + PI_NOTE,
    answer: inPi(160, 'cm³'),
    cpaPrompts: {
      concrete:
        'Hold a short length of pipe up to the light. There is a solid rod\'s worth of metal, and ' +
        'then a narrower rod of air has been pushed out of the middle of it.',
      pictorial:
        'Draw the end of the pipe: two circles with the same centre, radii $5$ and $3$. Shade the ' +
        'ring between them — that shaded ring is the end of the metal.',
      abstract:
        'Metal $= \\pi R^2 L - \\pi r^2 L$ with $R = 5$, $r = 3$, $L = 10$. Work out both ' +
        'cylinders, then subtract.',
    },
    hints: [
      'Find the volume of the solid cylinder first, as if there were no hole.',
      'Now find the volume of the hole: it is a cylinder of radius $3$ and the same length $10$.',
      'Subtract: $250\\pi - 90\\pi$.',
    ],
    solution:
      '$$V = \\pi (5)^2 (10) - \\pi (3)^2 (10) = 250\\pi - 90\\pi = 160\\pi \\text{ cm}^3.$$\n\n' +
      'A composite does not always mean adding. Whenever a piece has been removed, the same ' +
      'splitting-up works with a minus sign instead of a plus sign.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'solid',
      dimensions: { radius: 5, height: 10 },
      caption: 'The outside of the pipe: radius 5 cm, length 10 cm. A hole of radius 3 cm runs through it.',
    },
  },
  {
    id: 'mensuration.cone-cut-from-cylinder',
    skillIds: ['mensuration.solve-problems-involving'],
    tier: 1,
    sequence: { family: 'mensuration.composite-pieces', position: 5 },
    expect:
      'Still a subtraction, but now the piece removed is a cone that shares the cylinder\'s base ' +
      'and its full height. Predict, before calculating, what fraction of the cylinder is left ' +
      'behind — you have poured that cone into that cylinder before.',
    statement:
      'A solid cylinder has base radius $6$ cm and height $9$ cm. A cone with the same base ' +
      'circle and the same height is drilled out of it, leaving a hollowed solid. Find the volume ' +
      'of the solid that remains. ' + PI_NOTE,
    answer: inPi(216, 'cm³'),
    cpaPrompts: {
      concrete:
        'Fill the cone with water three times to fill the cylinder. Now take one cone of water ' +
        'out of the full cylinder. How many cones of water are still in there?',
      pictorial:
        'Draw the cylinder with the cone dashed inside it, tip down. Shade what is left. The ' +
        'shaded part is the cylinder minus the cone.',
      abstract:
        '$V = \\pi r^2 h - \\frac{1}{3}\\pi r^2 h = \\frac{2}{3}\\pi r^2 h$. Do it with $r = 6$ ' +
        'and $h = 9$, and check that the fraction agrees with the pouring.',
    },
    hints: [
      'Find the cylinder first: $\\pi (6)^2 (9)$.',
      'The cone shares the base and the height, so it is exactly one third of that.',
      'Subtract: $324\\pi - 108\\pi$. What fraction of the cylinder is that?',
    ],
    solution:
      '$$V_{\\text{cyl}} = \\pi (6)^2 (9) = 324\\pi, \\qquad V_{\\text{cone}} = \\tfrac{1}{3} ' +
      '(324\\pi) = 108\\pi.$$\n\n$$V_{\\text{left}} = 324\\pi - 108\\pi = 216\\pi \\text{ cm}^3.$$' +
      '\n\nThe payoff for the whole family: a cone on the same base and height is always one ' +
      'third of its cylinder, so removing it always leaves exactly two thirds — you never need ' +
      'the numbers to know the fraction.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'solid',
      dimensions: { radius: 6, height: 9 },
      caption: 'The cylinder, radius 6 cm and height 9 cm. A cone on the same base and height is removed.',
    },
  },

  // ---- Tier 2: unfamiliar surfaces ----
  {
    id: 'mensuration.glass-bowl-thickness',
    skillIds: ['mensuration.solve-problems-involving'],
    tier: 2,
    statement:
      'A glass bowl is a hemisphere with an outer radius of $10$ cm and an inner radius of $9$ ' +
      'cm. Find the volume of glass in the bowl, in cm³ correct to $3$ significant figures.',
    answer: toThreeSf((542 / 3) * Math.PI, 0.5, 'cm³'),
    cpaPrompts: {
      concrete:
        'Hold a bowl and feel its thickness at the rim. The glass is what is left when a slightly ' +
        'smaller bowl-shaped hole is scooped out of a solid dome.',
      pictorial:
        'Draw two dome outlines with the same centre, one of radius $10$ and one of radius $9$. ' +
        'Shade only the thin shell between them.',
      abstract:
        'Glass $= \\frac{2}{3}\\pi R^3 - \\frac{2}{3}\\pi r^3$ with $R = 10$, $r = 9$. Do not ' +
        'subtract the radii first — $1^3$ is not the answer.',
    },
    hints: [
      'Two hemispheres, one inside the other. Which one do you subtract from which?',
      'Outer: $\\frac{2}{3}\\pi (10)^3$. Inner: $\\frac{2}{3}\\pi (9)^3$.',
      '$1000 - 729 = 271$, so the glass is $\\frac{2}{3}\\pi (271)$. Now evaluate and round.',
    ],
    solution:
      '$$V = \\tfrac{2}{3}\\pi (10)^3 - \\tfrac{2}{3}\\pi (9)^3 = \\tfrac{2}{3}\\pi (1000 - 729) ' +
      '= \\tfrac{2}{3}\\pi (271) \\approx 568 \\text{ cm}^3.$$\n\nThe common slip is to subtract ' +
      'the radii and cube afterwards: $\\frac{2}{3}\\pi (10-9)^3 = \\frac{2}{3}\\pi$, which is ' +
      'about $2$ cm³ of glass — not enough for a bowl.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'hemisphere',
      view: 'solid',
      dimensions: { radius: 10 },
      caption: 'The outside of the bowl, radius 10 cm. A hemisphere of radius 9 cm is hollowed out of it.',
    },
  },
  {
    id: 'mensuration.water-level-rise',
    skillIds: ['mensuration.solve-problems-involving'],
    tier: 2,
    statement:
      'A cylindrical jar of radius $6$ cm is part full of water. A steel ball of radius $3$ cm is ' +
      'lowered in until it is completely under the water. By how many cm does the water level ' +
      'rise?',
    answer: { type: 'number', value: 1, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Drop a marble into a full glass and watch the water climb the side. The ball has to go ' +
        'somewhere, so the same amount of water is pushed upwards. Nothing is added or lost.',
      pictorial:
        'Draw the jar before and after. The extra water is a thin cylinder sitting on top of the ' +
        'old level: radius $6$, height $x$ — the rise you are looking for.',
      abstract:
        'Volume of the ball $=$ volume of the extra slice: $\\frac{4}{3}\\pi (3)^3 = \\pi (6)^2 ' +
        'x$. Solve for $x$.',
    },
    hints: [
      'The ball pushes up its own volume of water. What is that volume?',
      'The water that rises is a cylinder of radius $6$ and unknown height $x$: $\\pi (36) x$.',
      'Set $36\\pi = 36\\pi x$ and solve.',
    ],
    solution:
      'Ball: $V = \\frac{4}{3}\\pi (3)^3 = 36\\pi$ cm³.\n\nThe water that rises is a cylinder of ' +
      'radius $6$ and height $x$: $\\pi (6)^2 x = 36\\pi x$.\n\n$$36\\pi x = 36\\pi \\implies x ' +
      '= 1 \\text{ cm}.$$\n\nThe jar\'s starting depth never appears — only the cross-section ' +
      'matters, because the extra water spreads over that area whatever the level was.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'solid',
      dimensions: { radius: 6, height: 20 },
      caption: 'The jar, radius 6 cm. The ball of radius 3 cm is dropped in and sinks completely.',
    },
  },

  // ---- Tier 3: contexts that must be formulated ----
  {
    id: 'mensuration.capsule-pill',
    skillIds: ['mensuration.solve-problems-involving'],
    tier: 3,
    statement:
      'A capsule is $16$ mm from end to end and $6$ mm across. Its middle is a straight tube and ' +
      'each end is rounded into a half-ball of the same width as the tube. Find the volume of ' +
      'medicine the capsule holds, in mm³ correct to $3$ significant figures.',
    answer: toThreeSf(126 * Math.PI, 0.5, 'mm³'),
    cpaPrompts: {
      concrete:
        'Hold a capsule and press a fingernail where the straight side stops curving. That mark ' +
        'at each end is the join. How much of the $16$ mm is straight tube?',
      pictorial:
        'Draw the capsule and cut it at both joins. You get a tube in the middle and two domes. ' +
        'Slide the two domes together — what single shape do they make?',
      abstract:
        'Radius $= 3$; each rounded end is $3$ mm deep, so the tube is $16 - 3 - 3 = 10$ mm long. ' +
        'Then $V = \\pi r^2 h + \\frac{4}{3}\\pi r^3$.',
    },
    hints: [
      'The capsule is $6$ mm across, so the radius is $3$ mm — and each rounded end sticks out by ' +
        'that same $3$ mm.',
      'Take $3$ mm off each end of the $16$ mm to find the length of the straight tube.',
      'Two half-balls make one whole ball, so add $\\pi (9)(10)$ and $\\frac{4}{3}\\pi (27)$.',
    ],
    solution:
      'Radius $r = 3$ mm. Each rounded end is a half-ball of depth $3$ mm, so the straight tube ' +
      'is $16 - 6 = 10$ mm long.\n\n$$V = \\pi (3)^2 (10) + \\tfrac{4}{3}\\pi (3)^3 = 90\\pi + ' +
      '36\\pi = 126\\pi \\approx 396 \\text{ mm}^3.$$\n\nThe two ends are half-balls, so together ' +
      'they are one whole ball — much quicker than doing $\\frac{2}{3}\\pi r^3$ twice.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'solid',
      dimensions: { radius: 3, height: 10 },
      caption: 'The straight middle of the capsule. A rounded end of the same radius caps each end.',
    },
  },
  {
    id: 'mensuration.pencil-volume',
    skillIds: ['mensuration.solve-problems-involving'],
    tier: 3,
    statement:
      'A pencil is a wooden rod $15$ cm long and $0.8$ cm across. One end has been sharpened to a ' +
      'point, adding a tapered tip $1.2$ cm long on the end of the rod. Find the total volume of ' +
      'wood in the pencil, in cm³ correct to $3$ significant figures.',
    answer: toThreeSf(2.464 * Math.PI, 0.005, 'cm³'),
    cpaPrompts: {
      concrete:
        'Roll a pencil between your fingers. Most of it is the same thickness all the way, then ' +
        'at one end it narrows evenly to a point. Two different shapes, one object.',
      pictorial:
        'Draw the pencil from the side: a long thin rectangle with a triangle stuck on one end. ' +
        'Spun about its axis, the rectangle sweeps a rod and the triangle sweeps the tip.',
      abstract:
        'Radius $= 0.4$ cm. Rod $= \\pi r^2 (15)$; tip $= \\frac{1}{3}\\pi r^2 (1.2)$. Add, then ' +
        'round at the end.',
    },
    hints: [
      'The pencil is $0.8$ cm across, so its radius is $0.4$ cm. Both pieces share that radius.',
      'Rod: $\\pi (0.4)^2 (15) = 2.4\\pi$. The tapered tip is one third of a rod of the same ' +
        'radius and length $1.2$.',
      'Tip: $\\frac{1}{3}\\pi (0.16)(1.2) = 0.064\\pi$. Add and round.',
    ],
    solution:
      'Radius $r = 0.4$ cm.\n\n$$V_{\\text{rod}} = \\pi (0.4)^2 (15) = 2.4\\pi, \\qquad ' +
      'V_{\\text{tip}} = \\tfrac{1}{3}\\pi (0.4)^2 (1.2) = 0.064\\pi.$$\n\n$$V = 2.464\\pi ' +
      '\\approx 7.74 \\text{ cm}^3.$$\n\nThe tip is $1.2$ cm long but adds only about $0.2$ cm³ — ' +
      'a taper holds a third of what a straight piece of the same length would.',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'solid',
      dimensions: { radius: 0.4, height: 1.2 },
      caption: 'The sharpened tip, radius 0.4 cm and length 1.2 cm. Behind it is 15 cm of straight rod.',
    },
  },

  // ---- Tier 4: the frustum as a difference of cones ----
  {
    id: 'mensuration.bucket-frustum',
    skillIds: ['mensuration.solve-problems-involving', 'mensuration.calculate-surface-areas'],
    tier: 4,
    statement:
      'A bucket has a circular top of radius $6$ cm, a circular bottom of radius $3$ cm, and it ' +
      'is $4$ cm deep. Its sloping side is straight, so if the sides were continued downwards ' +
      'they would meet at a point. Find the volume of the bucket. ' + PI_NOTE,
    answer: inPi(84, 'cm³'),
    cpaPrompts: {
      concrete:
        'Stand the bucket on the desk and lay a ruler along its sloping side, running downwards. ' +
        'The two rulers, one on each side, cross under the bucket. That crossing point is the tip ' +
        'of a cone the bucket is the top slice of.',
      pictorial:
        'Draw the bucket from the side and extend the sloping edges down to a point. You now have ' +
        'a big triangle and, below the bucket, a small one. The two triangles are the same shape.',
      abstract:
        'The small cone has half the radius of the big one, so it has half the height: if the ' +
        'small height is $h$, the big one is $h + 4$ and $\\frac{3}{6} = \\frac{h}{h+4}$. Solve ' +
        'for $h$, then subtract the cones.',
    },
    hints: [
      'Extend the sides to a point. The bucket is a big cone with a small cone cut off the bottom.',
      'The radii are $3$ and $6$, so the small cone is a half-size copy of the big one: its height ' +
        'is half the big height. Write $\\frac{3}{6} = \\frac{h}{h + 4}$ and solve for $h$.',
      'That gives $h = 4$ for the small cone and $8$ for the big one. Now do ' +
        '$\\frac{1}{3}\\pi (6)^2 (8) - \\frac{1}{3}\\pi (3)^2 (4)$.',
    ],
    solution:
      'Extend the sloping sides to a point. The bucket is the big cone with the small cone removed.\n\n' +
      'The two cones are the same shape, and the radii are $6$ and $3$, so every length of the ' +
      'small cone is half the matching length of the big one. If the small cone has height $h$, ' +
      'the big one has height $h + 4$, and\n\n$$\\frac{h}{h+4} = \\frac{3}{6} = \\frac{1}{2} ' +
      '\\implies 2h = h + 4 \\implies h = 4.$$\n\nSo the big cone is $8$ cm tall and the small one ' +
      '$4$ cm.\n\n$$V = \\tfrac{1}{3}\\pi (6)^2 (8) - \\tfrac{1}{3}\\pi (3)^2 (4) = 96\\pi - ' +
      '12\\pi = 84\\pi \\text{ cm}^3.$$\n\nCheck the sizes: halving every length should divide ' +
      'the volume by $8$, and indeed $96\\pi \\div 12\\pi = 8$. ✓',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped', 'congruence.area-scales-by-k'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'solid',
      dimensions: { radius: 6, height: 8 },
      caption: 'The completed cone, radius 6 cm. The bucket is what is left when the bottom 4 cm of it is cut off.',
    },
  },

  // ---- Diagnostic ----
  {
    id: 'mensuration.dx-hidden-join-counted',
    skillIds: ['mensuration.solve-problems-involving'],
    tier: 'diagnostic',
    statement:
      'A solid stands on the ground: a cylinder of radius $3$ cm and height $10$ cm, with a cone ' +
      'of the same radius glued on top. The cone\'s vertical height is $4$ cm and its slant ' +
      'height is $5$ cm. The whole outside is painted, including the circle it stands on. Find ' +
      'the painted area, as a multiple of $\\pi$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$102\\pi$ cm²', misconceptionCode: 'mensuration.hidden-join-counted' },
        { label: 'B', value: '$84\\pi$ cm²' },
        { label: 'C', value: '$81\\pi$ cm²', misconceptionCode: 'mensuration.vertical-height-in-curved-area' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Run a paintbrush over the whole solid, starting underneath and working up. Say out loud ' +
        'every surface the bristles actually touch, and stop when you reach the tip.',
      pictorial:
        'Draw the solid and mark the circle where the cone meets the cylinder with a dashed line. ' +
        'Shade only what a brush could reach; leave the dashed circle unshaded.',
      abstract:
        'Exterior $= \\pi r^2 + 2\\pi r h + \\pi r l$. Decide which of the two heights, $4$ or ' +
        '$5$, belongs in the cone\'s curved surface before you substitute.',
    },
    hints: [
      'List the surfaces a brush can reach: the base circle, the cylinder wall, the cone\'s ' +
        'sloping surface. Is the circle at the join one of them?',
      'The cone\'s curved surface is $\\pi r l$, and $l$ is the slant, the distance down the ' +
        'outside — not the vertical height.',
    ],
    solution:
      'The brush reaches three surfaces:\n\n$$\\pi (3)^2 + 2\\pi (3)(10) + \\pi (3)(5) = 9\\pi + ' +
      '60\\pi + 15\\pi = 84\\pi \\text{ cm}^2.$$\n\n$102\\pi$ adds the two circles at the join — ' +
      'the cylinder\'s top and the cone\'s base — but those are glued together inside the solid ' +
      'and no brush can reach them. $81\\pi$ uses the vertical height $4$ in $\\pi r h$ instead of ' +
      'the slant height $5$ in $\\pi r l$.',
    misconceptionCodes: ['mensuration.hidden-join-counted', 'mensuration.vertical-height-in-curved-area'],
    figure: {
      kind: 'solid_net',
      solid: 'cylinder',
      view: 'solid',
      dimensions: { radius: 3, height: 10 },
      caption: 'The cylinder of the solid, radius 3 cm and height 10 cm. A cone of the same radius caps it.',
    },
  },

  // =========================================================================
  // Skill 3 — vertical height versus slant height
  // =========================================================================

  // ---- Tier 1: family mensuration.slant-triangle (6 items) ----
  {
    id: 'mensuration.slant-3-4',
    skillIds: ['mensuration.distinguish-vertical-height'],
    tier: 1,
    sequence: { family: 'mensuration.slant-triangle', position: 1 },
    statement:
      'A cone has base radius $3$ cm and vertical height $4$ cm. Find its slant height, in cm.',
    answer: { type: 'number', value: 5, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Push a pencil down through the tip of a paper cone to the centre of the base: that is the ' +
        '$4$ cm. Now run a finger down the outside from tip to rim. Which of the two is longer?',
      pictorial:
        'Draw the triangle hidden inside the cone: $4$ straight up the middle, $3$ out along the ' +
        'base, and the slant closing the shape. Mark the right angle where the axis meets the base.',
      abstract:
        'The radius, the vertical height and the slant make a right-angled triangle with the slant ' +
        'as hypotenuse: $l = \\sqrt{r^2 + h^2}$. Substitute $r = 3$ and $h = 4$.',
    },
    hints: [
      'Inside the cone is a right-angled triangle with legs $r$ and $h$. Which side is the slant?',
      'The slant is the hypotenuse: $l = \\sqrt{3^2 + 4^2}$.',
    ],
    solution:
      '$$l = \\sqrt{r^2 + h^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5 \\text{ cm}.$$\n\n' +
      'The slant is longer than both the radius and the vertical height, as a hypotenuse always is.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area', 'pythagoras.hypotenuse-misidentified'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'solid',
      dimensions: { radius: 3, height: 4 },
      showSlantTriangle: true,
      caption: 'The right-angled triangle inside the cone: the radius along the base, the height up the axis.',
    },
  },
  {
    id: 'mensuration.slant-5-12',
    skillIds: ['mensuration.distinguish-vertical-height'],
    tier: 1,
    sequence: { family: 'mensuration.slant-triangle', position: 2 },
    expect:
      'Same question, new numbers: $r = 5$ and $h = 12$ instead of $3$ and $4$. Predict whether ' +
      'the slant will again come out as a whole number, and say what $25 + 144$ would have to be ' +
      'for that to happen.',
    statement:
      'A cone has base radius $5$ cm and vertical height $12$ cm. Find its slant height, in cm.',
    answer: { type: 'number', value: 13, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'A taller, narrower cone this time. Before working: will the slant be closer to the ' +
        'vertical height of $12$, or closer to the radius of $5$?',
      pictorial:
        'Draw the internal triangle again with $5$ along the base and $12$ up the axis. The slant ' +
        'joins the tip to the rim.',
      abstract:
        'Same relationship with new numbers: $l = \\sqrt{5^2 + 12^2}$. Square, add, then root.',
    },
    hints: [
      'The method does not change: square the radius and the height, add, take the square root.',
      '$25 + 144 = 169$. Is that a square number?',
    ],
    solution:
      '$$l = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13 \\text{ cm}.$$\n\nThe slant ' +
      'is only a little longer than the height here, because the cone is narrow — but it is still ' +
      'longer, and it is still the one the paper runs along.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'solid',
      dimensions: { radius: 5, height: 12 },
      showSlantTriangle: true,
      caption: 'A narrower cone: radius 5 cm along the base, vertical height 12 cm up the axis.',
    },
  },
  {
    id: 'mensuration.slant-8-15',
    skillIds: ['mensuration.distinguish-vertical-height'],
    tier: 1,
    sequence: { family: 'mensuration.slant-triangle', position: 3 },
    expect:
      'Third time with the same question and larger numbers, $r = 8$ and $h = 15$. Predict ' +
      'roughly how big the slant will be — must it be more than $15$, and can it be more than ' +
      '$8 + 15 = 23$?',
    statement:
      'A cone has base radius $8$ cm and vertical height $15$ cm. Find its slant height, in cm.',
    answer: { type: 'number', value: 17, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Stretch a piece of string from the tip of this cone down to a point on the rim. It has to ' +
        'be longer than the $15$ cm pencil down the middle — but by a lot or a little?',
      pictorial:
        'Draw the internal triangle with legs $8$ and $15$. The slant is the hypotenuse and must ' +
        'be the longest side of that triangle.',
      abstract:
        '$l = \\sqrt{8^2 + 15^2}$. Substitute, and check the answer sits between $15$ and $23$.',
    },
    hints: [
      'Square both known lengths and add: $64 + 225$.',
      '$l = \\sqrt{289}$. Look for a whole-number square root.',
    ],
    solution:
      '$$l = \\sqrt{8^2 + 15^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17 \\text{ cm}.$$\n\nCheck: ' +
      '$17$ is more than $15$ but less than $8 + 15 = 23$, which is what a hypotenuse must do.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area', 'pythagoras.hypotenuse-misidentified'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'solid',
      dimensions: { radius: 8, height: 15 },
      showSlantTriangle: true,
      caption: 'Radius 8 cm along the base, vertical height 15 cm up the axis.',
    },
  },
  {
    id: 'mensuration.height-from-r-l',
    skillIds: ['mensuration.distinguish-vertical-height'],
    tier: 1,
    sequence: { family: 'mensuration.slant-triangle', position: 4 },
    expect:
      'Reversed: this time the slant is given and the vertical height is missing. Predict which ' +
      'operation changes — do you still add the two squares? And must the answer be more or less ' +
      'than $10$?',
    statement:
      'A cone has base radius $6$ cm and slant height $10$ cm. Find its vertical height, in cm.',
    answer: { type: 'number', value: 8, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Lay a $10$ cm straw from the tip of a cone down to the rim, and stand a second straw ' +
        'upright inside from the tip to the centre of the base. The upright one is hidden — is it ' +
        'longer or shorter than $10$ cm?',
      pictorial:
        'Draw the internal triangle with $6$ along the base and $10$ on the slope. The vertical ' +
        'side is blank. Which side of the triangle is the biggest square built on?',
      abstract:
        'In $l^2 = r^2 + h^2$ the slant is now known, so rearrange: $h = \\sqrt{l^2 - r^2}$. ' +
        'Substitute $l = 10$ and $r = 6$.',
    },
    hints: [
      'The slant is the hypotenuse, so its square is the total. Adding would give a height longer ' +
        'than the slant, which is impossible.',
      '$h^2 = 10^2 - 6^2 = 100 - 36$.',
    ],
    solution:
      '$$h = \\sqrt{l^2 - r^2} = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8 \\text{ cm}.$$\n\n' +
      'Check: $8 < 10$, so the hidden vertical height is shorter than the slant — as it has to be.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area', 'pythagoras.add-squares-for-leg'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'net',
      dimensions: { radius: 6, height: 8, slant: 10 },
      caption: 'The net of the cone: a base circle of radius 6 cm and a sector whose straight edge is the slant, 10 cm.',
    },
  },
  {
    id: 'mensuration.radius-from-h-l',
    skillIds: ['mensuration.distinguish-vertical-height'],
    tier: 1,
    sequence: { family: 'mensuration.slant-triangle', position: 5 },
    expect:
      'Reversed the other way: now the two heights are given and it is the radius that is ' +
      'missing. Predict whether you add or subtract, and whether the answer will be large or ' +
      'small compared with $24$ and $25$.',
    statement:
      'A cone has vertical height $24$ cm and slant height $25$ cm. Find its base radius, in cm.',
    answer: { type: 'number', value: 7, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'A tall thin cone: the pencil down the middle is $24$ cm and the outside edge only $25$ ' +
        'cm. If those two lengths are almost the same, how wide can the base possibly be?',
      pictorial:
        'Draw the internal triangle with $24$ up the axis and $25$ on the slope. The base leg is ' +
        'blank, and it is clearly the shortest side.',
      abstract:
        'Rearrange $l^2 = r^2 + h^2$ to $r = \\sqrt{l^2 - h^2}$, with $l = 25$ and $h = 24$. The ' +
        'slant is again the total.',
    },
    hints: [
      'The slant is still the hypotenuse, whichever side is missing. So its square is the total.',
      '$r^2 = 25^2 - 24^2 = 625 - 576$.',
    ],
    solution:
      '$$r = \\sqrt{l^2 - h^2} = \\sqrt{25^2 - 24^2} = \\sqrt{625 - 576} = \\sqrt{49} = 7 ' +
      '\\text{ cm}.$$\n\nThe pattern across all five items: $l$ is always the hypotenuse and ' +
      'always the longest of the three. Finding $l$ means adding two squares; finding $r$ or $h$ ' +
      'means subtracting from $l^2$.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area', 'pythagoras.add-squares-for-leg'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'net',
      dimensions: { radius: 7, height: 24, slant: 25 },
      caption: 'The net: a sector whose straight edge is the slant, 25 cm, and a base circle whose radius is unknown.',
    },
  },
  {
    id: 'mensuration.curved-area-9-12',
    skillIds: ['mensuration.distinguish-vertical-height'],
    tier: 1,
    sequence: { family: 'mensuration.slant-triangle', position: 6 },
    expect:
      'The slant is no longer the answer — it is now a step on the way to one. You are given ' +
      '$r = 9$ and $h = 12$ and asked for the curved surface. Predict which of $h$ and $l$ goes ' +
      'into the area formula, and why the paper cares.',
    statement:
      'A cone has base radius $9$ cm and vertical height $12$ cm. Find the area of its curved ' +
      'surface. ' + PI_NOTE,
    answer: inPi(135, 'cm²'),
    cpaPrompts: {
      concrete:
        'Wrap a sheet of paper round the cone and trim it to fit, then unwrap it. Every point of ' +
        'that paper lay on the outside of the cone. Did any of it lie along the pencil in the ' +
        'middle?',
      pictorial:
        'Draw the internal triangle to find the missing length, then draw the net: a sector whose ' +
        'straight edge is that length, not the $12$.',
      abstract:
        'First $l = \\sqrt{9^2 + 12^2}$, then $A = \\pi r l$. Write down why $\\pi r h$ would be ' +
        'measuring a surface that does not exist.',
    },
    hints: [
      'Two steps. Find the slant height first, from $r = 9$ and $h = 12$.',
      '$l = \\sqrt{81 + 144} = \\sqrt{225} = 15$.',
      'Now the curved surface: $A = \\pi r l = \\pi (9)(15)$, using the slant and not the height.',
    ],
    solution:
      'Slant height: $l = \\sqrt{9^2 + 12^2} = \\sqrt{225} = 15$ cm.\n\n$$A = \\pi r l = \\pi ' +
      '(9)(15) = 135\\pi \\text{ cm}^2.$$\n\nThat is the payoff of this sequence: the vertical ' +
      'height is what you *fill* to, and the slant is what you *wrap* along. Using $\\pi r h$ ' +
      'would have given $108\\pi$ — an area for a surface the cone does not have.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'both',
      dimensions: { radius: 9, height: 12 },
      showSlantTriangle: true,
      caption: 'The cone with its internal triangle, and its net. The sector\'s straight edge is the slant.',
    },
  },

  // ---- Tier 2: unfamiliar surfaces ----
  {
    id: 'mensuration.cone-total-surface-area',
    skillIds: ['mensuration.distinguish-vertical-height', 'mensuration.calculate-surface-areas'],
    tier: 2,
    statement:
      'A right cone has base radius $5$ cm and vertical height $12$ cm. Find its total surface ' +
      'area, including the base. ' + PI_NOTE,
    answer: inPi(90, 'cm²'),
    cpaPrompts: {
      concrete:
        'Run a finger from the tip of the cone down the outside to the rim. Is that 12 cm, or ' +
        'longer? Which length does the paper wrapped round the cone actually have?',
      pictorial:
        'Draw the right triangle inside the cone: 12 up the middle, 5 along the base, and the ' +
        'slant as the hypotenuse. What is the slant? Then draw the net: a sector and a circle.',
      abstract:
        'Find $l = \\sqrt{r^2 + h^2}$, then total area $= \\pi r l + \\pi r^2$. Two pieces, and ' +
        'only one of them uses the slant.',
    },
    hints: [
      'To find surface area you need the slant height $l$, not the vertical height. Use ' +
        'Pythagoras with the radius and the vertical height.',
      '$l = \\sqrt{5^2 + 12^2}$. What is that?',
      'Total area $= \\pi r l + \\pi r^2$ with $r = 5$ and $l = 13$. Add the curved part and the ' +
        'base.',
    ],
    solution:
      'Slant height: $l = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$ cm.\n\n$$A = \\pi r l + \\pi ' +
      'r^2 = \\pi(5)(13) + \\pi(25) = 65\\pi + 25\\pi = 90\\pi \\text{ cm}^2.$$\n\nThe base uses ' +
      '$r$ alone; only the curved part needs the slant.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'both',
      dimensions: { radius: 5, height: 12, slant: 13 },
      showSlantTriangle: true,
      caption: 'The cone with its internal triangle, and the net it unfolds into.',
    },
  },
  {
    id: 'mensuration.sector-arc-to-height',
    skillIds: ['mensuration.distinguish-vertical-height'],
    tier: 2,
    statement:
      'The curved surface of a cone is cut open and laid flat. It becomes a sector whose two ' +
      'straight edges are each $13$ cm long and whose curved edge is $10\\pi$ cm long. Find the ' +
      'vertical height of the cone, in cm.',
    answer: { type: 'number', value: 12, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Roll the flat sector back into a cone and hold the curved edge against the desk. That ' +
        'curved edge becomes the rim. What does the length of the rim tell you about the base?',
      pictorial:
        'Draw the sector with $13$ on each straight edge and $10\\pi$ on the arc. Beside it draw ' +
        'the cone, and mark which sector length becomes which cone length.',
      abstract:
        'The arc becomes the base circumference: $2\\pi r = 10\\pi$, so $r = 5$. The straight edge ' +
        'is the slant, $l = 13$. Then $h = \\sqrt{l^2 - r^2}$.',
    },
    hints: [
      'When the sector is rolled up, its curved edge becomes the circle round the base. So ' +
        '$2\\pi r = 10\\pi$.',
      'That gives $r = 5$, and the straight edge of the sector is the slant height $l = 13$.',
      'Now find the vertical height: $h = \\sqrt{13^2 - 5^2}$.',
    ],
    solution:
      'The arc becomes the base circumference:\n\n$$2\\pi r = 10\\pi \\implies r = 5 \\text{ cm}.$$\n\n' +
      'The straight edges of the sector are the slant height, $l = 13$ cm. So\n\n$$h = ' +
      '\\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12 \\text{ cm}.$$\n\nThe net never ' +
      'shows the vertical height anywhere — it is inside the cone, and only appears once the ' +
      'paper is rolled up.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'net',
      dimensions: { radius: 5, height: 12, slant: 13 },
      caption: 'The flattened cone: a sector of radius 13 cm whose arc is 10π cm long, and the base circle.',
    },
  },
  {
    id: 'mensuration.curved-area-to-height',
    skillIds: ['mensuration.distinguish-vertical-height'],
    tier: 2,
    statement:
      'A cone has base radius $8$ cm and its curved surface area is $136\\pi$ cm². Find its ' +
      'vertical height, in cm.',
    answer: { type: 'number', value: 15, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'You know how much paper wraps the cone and how wide the base is, but not how tall it ' +
        'stands. Which of the cone\'s lengths does the amount of paper tell you about directly?',
      pictorial:
        'Draw the net first: the sector\'s radius is the length the area formula uses. Then draw ' +
        'the internal triangle to get from that length to the height.',
      abstract:
        'From $\\pi r l = 136\\pi$ with $r = 8$, find $l$. Then $h = \\sqrt{l^2 - r^2}$. Two ' +
        'steps, and the first one gives the slant, never the height.',
    },
    hints: [
      'The curved surface area formula is $\\pi r l$. Put in what you know and solve for $l$.',
      '$8l = 136$, so $l = 17$.',
      'Now the internal triangle: $h = \\sqrt{17^2 - 8^2}$.',
    ],
    solution:
      '$$\\pi r l = 136\\pi \\implies 8l = 136 \\implies l = 17 \\text{ cm}.$$\n\nThat is the ' +
      'slant, not the height. Now use the internal triangle:\n\n$$h = \\sqrt{17^2 - 8^2} = ' +
      '\\sqrt{289 - 64} = \\sqrt{225} = 15 \\text{ cm}.$$\n\nAnswering $17$ is the trap: the area ' +
      'formula can only ever hand back the slant.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'net',
      dimensions: { radius: 8, height: 15, slant: 17 },
      caption: 'The net: a base circle of radius 8 cm and a sector whose area is 136π cm².',
    },
  },

  // ---- Tier 3: contexts that must be formulated ----
  {
    id: 'mensuration.tent-canvas',
    skillIds: ['mensuration.distinguish-vertical-height'],
    tier: 3,
    statement:
      'A tent is held up by a single pole. The tent is $6$ m across the ground and the top of the ' +
      'pole is $4$ m above the ground. The canvas covers the sloping sides only; there is no ' +
      'groundsheet. How many m² of canvas does the tent need? Give your answer correct to $3$ ' +
      'significant figures.',
    answer: toThreeSf(15 * Math.PI, 0.05, 'm²'),
    cpaPrompts: {
      concrete:
        'Stand inside the tent and touch the pole: that is the $4$ m. Now walk to the wall and run ' +
        'your hand up the canvas to the top. Did your hand travel $4$ m, or further?',
      pictorial:
        'Draw the tent from the side: a triangle $6$ m wide at the base with a $4$ m pole up the ' +
        'middle. Halve the base and you have a right-angled triangle — what is its longest side?',
      abstract:
        'Radius $= 3$; find the sloping length from $3$ and $4$; then canvas $= \\pi r \\times ' +
        '(\\text{that length})$.',
    },
    hints: [
      'The $6$ m is right across the tent, so the distance from the pole to the wall is $3$ m.',
      'The pole, the ground and the canvas make a right-angled triangle. The canvas runs along its ' +
        'longest side: $\\sqrt{3^2 + 4^2} = 5$.',
      'Canvas $= \\pi (3)(5) = 15\\pi$. Evaluate and round.',
    ],
    solution:
      'Half the width is $3$ m, and the pole is $4$ m, so the canvas runs along ' +
      '$\\sqrt{3^2 + 4^2} = 5$ m.\n\n$$A = \\pi (3)(5) = 15\\pi \\approx 47.1 \\text{ m}^2.$$\n\n' +
      'Using the $4$ m pole instead of the $5$ m sloping length would give $12\\pi \\approx 37.7$ ' +
      'm² — nearly $10$ m² short, and the tent would not close.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'solid',
      dimensions: { radius: 3, height: 4 },
      showSlantTriangle: true,
      caption: 'The tent: 6 m across the ground, pole 4 m tall. The figure shows half the width as the radius.',
    },
  },
  {
    id: 'mensuration.party-hat-paper',
    skillIds: ['mensuration.distinguish-vertical-height'],
    tier: 3,
    statement:
      'A party hat is $14$ cm across the open bottom and $24$ cm from the bottom rim straight up ' +
      'to the point. It is made from one piece of card, with nothing across the bottom. How many ' +
      'cm² of card does one hat use? Give your answer correct to $3$ significant figures.',
    answer: toThreeSf(175 * Math.PI, 0.5, 'cm²'),
    cpaPrompts: {
      concrete:
        'Put the hat on and press a finger to the point through the card, then trace straight down ' +
        'the outside to the rim. Is that path $24$ cm, or is the $24$ cm a measurement through the ' +
        'inside of the hat?',
      pictorial:
        'Draw the hat from the front and add the hidden vertical line from the point to the centre ' +
        'of the rim. Half the rim width and that vertical line make a right angle.',
      abstract:
        'Radius $= 7$; the card runs along $\\sqrt{7^2 + 24^2}$; area of card $= \\pi r \\times ' +
        '(\\text{that length})$, with no circle added at the bottom.',
    },
    hints: [
      '$14$ cm is right across the bottom, so the radius is $7$ cm. The $24$ cm is measured ' +
        'straight up the middle, not down the outside.',
      'The distance down the outside is $\\sqrt{7^2 + 24^2} = 25$ cm.',
      'Card $= \\pi (7)(25) = 175\\pi$. There is no bottom, so nothing else is added. Round at the end.',
    ],
    solution:
      'The radius is $7$ cm and the vertical height is $24$ cm, so the card runs along\n\n' +
      '$$\\sqrt{7^2 + 24^2} = \\sqrt{49 + 576} = \\sqrt{625} = 25 \\text{ cm}.$$\n\n' +
      '$$A = \\pi (7)(25) = 175\\pi \\approx 550 \\text{ cm}^2.$$\n\nNo circle is added: the hat ' +
      'is open at the bottom, so there is no base to make.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area', 'mensuration.hidden-join-counted'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'net',
      dimensions: { radius: 7, height: 24, slant: 25 },
      caption: 'The hat flattened. Only the sector is card — the hat has no bottom, so the circle is not made.',
    },
  },

  // ---- Diagnostic ----
  {
    id: 'mensuration.dx-vertical-height-in-curved-area',
    skillIds: ['mensuration.distinguish-vertical-height'],
    tier: 'diagnostic',
    statement:
      'A hollow paper cone has base radius $5$ cm and vertical height $12$ cm. It is open at the ' +
      'bottom — there is no base. Find the area of paper it is made from, as a multiple of $\\pi$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$60\\pi$ cm²', misconceptionCode: 'mensuration.vertical-height-in-curved-area' },
        { label: 'B', value: '$65\\pi$ cm²' },
        { label: 'C', value: '$90\\pi$ cm²', misconceptionCode: 'mensuration.hidden-join-counted' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Run a finger from the tip of the cone down the outside to the rim. Is that the $12$ cm, ' +
        'or is the $12$ cm a length inside the cone where there is no paper at all?',
      pictorial:
        'Draw the internal triangle, legs $5$ and $12$, and mark the hypotenuse. Then draw the ' +
        'flattened paper: one sector, and no circle, because the cone is open.',
      abstract:
        'Curved surface $= \\pi r l$ with $l = \\sqrt{r^2 + h^2}$. Work out $l$ first, then decide ' +
        'whether $\\pi r^2$ belongs in the answer at all.',
    },
    hints: [
      'The paper runs down the slant, not down the middle. Find the slant from $5$ and $12$.',
      'The cone is open at the bottom, so there is no base circle to add.',
    ],
    solution:
      '$l = \\sqrt{5^2 + 12^2} = 13$ cm, so\n\n$$A = \\pi r l = \\pi (5)(13) = 65\\pi \\text{ cm}^2.$$\n\n' +
      '$60\\pi$ is $\\pi r h$ — the vertical height used where the slant belongs, measuring a ' +
      'surface inside the cone that no paper lies on. $90\\pi$ adds the base circle $25\\pi$, but ' +
      'this cone is open and has no base to make.',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area', 'mensuration.hidden-join-counted'],
    figure: {
      kind: 'solid_net',
      solid: 'cone',
      view: 'solid',
      dimensions: { radius: 5, height: 12 },
      showSlantTriangle: true,
      caption: 'A hollow paper cone, radius 5 cm and vertical height 12 cm, open at the bottom.',
    },
  },
];
