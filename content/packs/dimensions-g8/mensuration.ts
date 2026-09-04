import type { Problem, SkillNode } from '@/lib/content/schema';

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
    title: 'Calculate surface areas and volumes of right pyramids, cylinders, cones, and spheres',
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
    title: 'Solve problems involving composite 3D solids and hollow containers',
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

export const mensurationProblems: Problem[] = [
  {
    id: 'mensuration.cone-volume',
    skillIds: ['mensuration.calculate-surface-areas'],
    difficulty: 'basic',
    statement:
      'A right cone has base radius 5 cm and vertical height 12 cm. Find its volume, leaving ' +
      'your answer as a multiple of $\\pi$ — so give the number that multiplies $\\pi$.',
    answer: { type: 'number', value: 100, tolerance: 0, unit: 'π cm³' },
    cpaPrompts: {
      concrete:
        'Picture the cylinder with the same base and the same height, 12 cm tall. How many cones ' +
        'of water does it take to fill it? So what fraction of the cylinder is the cone?',
      pictorial:
        'Draw the cone inside its cylinder. The cylinder\'s volume is base area times height. ' +
        'What is the base area in terms of $\\pi$, and what does a third of the cylinder come to?',
      abstract:
        'Substitute $r = 5$ and $h = 12$ into $V = \\frac{1}{3}\\pi r^2 h$.',
    },
    hints: [
      'For volume, use $V = \\frac{1}{3}\\pi r^2 h$ with $r = 5$ and $h = 12$. Which height goes ' +
        'in here — the vertical one or the slant?',
      'Work out $r^2 h = 25 \\times 12$ first, then take a third of it.',
    ],
    solution:
      '$$V = \\tfrac{1}{3}\\pi r^2 h = \\tfrac{1}{3}\\pi (25)(12) = 100\\pi \\text{ cm}^3.$$',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
  },
  {
    id: 'mensuration.cone-total-surface-area',
    skillIds: ['mensuration.distinguish-vertical-height', 'mensuration.calculate-surface-areas'],
    difficulty: 'advanced',
    statement:
      'A right cone has base radius 5 cm and vertical height 12 cm. Find its total surface ' +
      'area, leaving your answer as a multiple of $\\pi$ — give the number that multiplies $\\pi$.',
    answer: { type: 'number', value: 90, tolerance: 0, unit: 'π cm²' },
    cpaPrompts: {
      concrete:
        'Run a finger from the tip of the cone down the outside to the rim. Is that 12 cm, or ' +
        'longer? Which length does the paper wrapped round the cone actually have?',
      pictorial:
        'Draw the right triangle inside the cone: 12 up the middle, 5 along the base, and the ' +
        'slant as the hypotenuse. What is the slant? Then draw the net: a sector and a circle.',
      abstract:
        'Find $l = \\sqrt{r^2 + h^2}$, then total area $= \\pi r l + \\pi r^2$.',
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
      'r^2 = \\pi(5)(13) + \\pi(25) = 65\\pi + 25\\pi = 90\\pi \\text{ cm}^2.$$',
    misconceptionCodes: ['mensuration.vertical-height-in-curved-area'],
  },
  {
    id: 'mensuration.silo-volume',
    skillIds: ['mensuration.solve-problems-involving'],
    difficulty: 'advanced',
    statement:
      'A storage silo is a cylinder of radius 3 m and height 8 m, topped by a solid hemisphere ' +
      'of radius 3 m. Find the total volume of the silo in m³, correct to 3 significant figures.',
    answer: { type: 'number', value: 283, tolerance: 0.6, unit: 'm³' },
    cpaPrompts: {
      concrete:
        'If you filled the silo with water, the water would fill the cylinder part and the dome ' +
        'part. Does the join between them change how much water fits?',
      pictorial:
        'Draw the silo and dash a line where the dome meets the cylinder. Below the line is a ' +
        'cylinder; above it is half a sphere. Write the volume formula under each piece.',
      abstract:
        '$V = \\pi r^2 h + \\frac{2}{3}\\pi r^3$ with $r = 3$, $h = 8$; evaluate and round.',
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
      '18\\pi = 90\\pi \\approx 283 \\text{ m}^3.$$',
    misconceptionCodes: ['mensuration.r-squared-r-cubed-swapped'],
  },
  {
    id: 'mensuration.silo-surface-area',
    skillIds: ['mensuration.solve-problems-involving'],
    difficulty: 'challenge',
    statement:
      'A storage silo is a cylinder of radius 3 m and height 8 m, topped by a solid hemisphere ' +
      'of radius 3 m. Find the total exterior surface area, including the flat circular base, ' +
      'in m² correct to 3 significant figures.',
    answer: { type: 'number', value: 236, tolerance: 0.6, unit: 'm²' },
    cpaPrompts: {
      concrete:
        'Imagine painting the outside of the silo. List every surface your brush touches. Is ' +
        'there a circle where the dome sits on the wall that the brush can reach?',
      pictorial:
        'Draw the exploded pieces: a base circle, a curved rectangle for the wall, a dome. Shade ' +
        'what is exposed. Cross out the two circular faces at the join.',
      abstract:
        '$A = \\pi r^2 + 2\\pi r h + 2\\pi r^2 = 3\\pi r^2 + 2\\pi r h$; evaluate and round.',
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
      'counted.',
    misconceptionCodes: ['mensuration.hidden-join-counted'],
  },
];
