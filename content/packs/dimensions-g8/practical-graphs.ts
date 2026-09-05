import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';

/**
 * Unit 9 — Graphs in Practical Situations. Hand-authored.
 *
 * Source: docs/Implementation Manual (walking a path with a stopwatch, slope profiles) and
 * the Chapter 9 worked examples in the content spec.
 *
 * The through-line: on a distance–time graph the *slope* is the speed, and on a speed–time
 * graph the slope is the acceleration and the *area* is the distance. Both are the same
 * idea as gradient in Unit 8, but with units attached, and the units are what stop
 * "average the speeds" and "distance = speed × time" being applied where they do not hold.
 *
 * Figures: `coordinate_plane` cannot yet draw piecewise segments or shaded regions, so a
 * journey is given in the statement as a table of (time, distance) points and, where it
 * helps, plotted as labelled points for the tutor to join in words. Straight conversion
 * graphs and two-traveller meetings are drawn as `linear` curves, which it can do.
 */

export const practicalGraphsSkills: SkillNode[] = [
  {
    id: 'practical-graphs.construct-interpret-distance-time',
    title: 'Construct and interpret distance-time and speed-time graphs',
    summary:
      'Draw a journey as a graph from its stages, and read a graph back as a journey: steep ' +
      'means fast, flat means stopped, and on a speed–time graph flat means steady.',
    prerequisites: ['function-graphs.interpret-rate-change'],
    cpa: {
      concrete:
        'Walk a marked corridor with a stopwatch, calling out the distance every two seconds. ' +
        'Walk fast, then stop, then walk slowly. The three lists of numbers are the three ' +
        'segments of the graph before it is drawn.',
      pictorial:
        'A segmented line profile with each section coloured: steep and red for fast, shallow ' +
        'and blue for slow, flat and green for stopped. The gradient of each section is written ' +
        'beside it with units.',
      abstract:
        'Distance–time: gradient $= \\frac{\\Delta d}{\\Delta t}$ is speed; a horizontal section ' +
        'is rest. Speed–time: gradient is acceleration; a horizontal section is constant speed, ' +
        'not rest.',
    },
    formulas: ['\\text{speed} = \\frac{\\Delta \\text{distance}}{\\Delta \\text{time}}'],
    misconceptions: [
      {
        code: 'practical-graphs.flat-means-stopped-on-speed-graph',
        description:
          'Reads a horizontal section of a speed–time graph as the object being at rest, ' +
          'carrying the distance–time meaning across.',
        probe:
          'Look at the label on the vertical axis of this graph. If the line is flat at 24, what ' +
          'is staying at 24 — the distance travelled, or the speed?',
        correction:
          'A flat line means the vertical quantity is not changing. On a speed–time graph that ' +
          'quantity is speed, so flat means a steady speed — the object is still moving. Only a ' +
          'line along the time axis, at speed 0, means rest.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
  {
    id: 'practical-graphs.calculate-speed-average',
    title: 'Calculate speed, average speed, and acceleration from graphical gradients',
    summary:
      'Find the speed of each stage from its gradient, and the average speed of the whole ' +
      'journey from total distance over total time — rests included.',
    prerequisites: ['practical-graphs.construct-interpret-distance-time'],
    cpa: {
      concrete:
        'A journey acted out: 30 paces in 15 seconds, stand still for 5 seconds, 20 paces in 10 ' +
        'seconds. Count the total paces and read the stopwatch at the very end. The average is ' +
        'those two numbers, and the standing-still seconds were on the clock.',
      pictorial:
        'The distance–time graph with a single straight line drawn from the start point to the ' +
        'end point, cutting across the rest and the stages. The gradient of that one line is the ' +
        'average speed.',
      abstract:
        'Stage speed $= \\frac{\\text{distance}}{\\text{time}}$ for that stage. Average speed ' +
        '$= \\frac{\\text{total distance}}{\\text{total time}}$, never the mean of the stage ' +
        'speeds. Acceleration $= \\frac{v - u}{t}$ from a speed–time gradient.',
    },
    formulas: [
      '\\text{average speed} = \\frac{\\text{total distance}}{\\text{total time}}',
      'a = \\frac{v - u}{t}',
    ],
    misconceptions: [
      {
        code: 'practical-graphs.rest-dropped-from-total-time',
        description:
          'Leaves the rest period out of the total time when finding average speed, on the ' +
          'grounds that no distance was covered then.',
        probe:
          'The cyclist stopped for half an hour. Did the clock stop too? When she arrived, how ' +
          'long had it been since she set off — including the rest?',
        correction:
          'Average speed measures the whole journey against the whole elapsed time. Time passes ' +
          'during a rest even though distance does not, so the rest goes into the denominator: ' +
          '$\\frac{50}{3}$ km/h, not $\\frac{50}{2.5}$.',
      },
      {
        code: 'practical-graphs.average-of-speeds',
        description:
          'Averages the stage speeds — $(20 + 20) / 2$ — instead of dividing total distance by ' +
          'total time.',
        probe:
          'Suppose one stage lasted a minute and the other lasted an hour. Should they count the ' +
          'same in the average? What does the average speed have to be measured over?',
        correction:
          'Stages of different length do not deserve equal weight. Total distance over total time ' +
          'weights each stage by how long it took, which is what "average speed for the journey" ' +
          'means.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
  {
    id: 'practical-graphs.interpret-conversion-practical',
    title: 'Interpret conversion and practical rate graphs, and compute area under speed-time graphs',
    summary:
      'Read a conversion graph in both directions, and find distance from a speed–time graph as ' +
      'the area under it, split into rectangles and triangles.',
    prerequisites: ['practical-graphs.calculate-speed-average'],
    cpa: {
      concrete:
        'A car at a steady 24 m/s for 12 seconds covers $24 \\times 12$ metres — a rectangle of ' +
        'height 24 and width 12 on the graph, and the multiplication *is* the area. When the ' +
        'speed is climbing from 0 to 24, only half that rectangle is covered: a triangle.',
      pictorial:
        'The speed–time profile with the region under it shaded and cut into a triangle, a ' +
        'rectangle and a triangle. Each piece labelled with its area formula. The whole is a ' +
        'trapezium and can be done in one go.',
      abstract:
        'Distance $=$ area under the speed–time graph. Rectangle $= vt$; triangle $= ' +
        '\\frac{1}{2}vt$; trapezium $= \\frac{1}{2}(a + b)h$. $d = vt$ alone is only valid ' +
        'while $v$ is constant.',
    },
    formulas: [
      '\\text{distance} = \\text{area under speed–time graph}',
      'A = \\tfrac{1}{2}(a + b)h',
    ],
    misconceptions: [
      {
        code: 'practical-graphs.constant-speed-assumed',
        description:
          'Uses distance $=$ speed $\\times$ time with the top speed across the whole trip — ' +
          '$24 \\times 24 = 576$ m — as though the car were at full speed from the first second.',
        probe:
          'In the first eight seconds the car goes from 0 to 24 m/s. Was it doing 24 m/s for all ' +
          'eight of those seconds? Shade the region under that part of the graph — what shape is it?',
        correction:
          '$d = vt$ is the area of a rectangle, which is only the region under the graph when the ' +
          'speed is constant. While the car speeds up or slows down the region is a triangle, ' +
          'half the rectangle. Summing the actual area gives 432 m.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
];

// ---------------------------------------------------------------------------
// Shared figures
// ---------------------------------------------------------------------------

/**
 * Dev's walk: the one journey the first variation sequence reads six ways. Time in hours on
 * the horizontal axis, distance from home in km on the vertical. Straight lines join the
 * labelled points in order: A–B walking, B–C stopped, C–D faster, D–E walking home.
 */
const DEV_WALK_TABLE =
  '| Point | A | B | C | D | E |\n| --- | --- | --- | --- | --- | --- |\n' +
  '| Time (hours) | 0 | 1 | 2 | 3 | 5 |\n| Distance from home (km) | 0 | 4 | 4 | 10 | 0 |';

const devWalkFigure: Problem['figure'] = {
  kind: 'coordinate_plane',
  title: "Dev's walk",
  caption: 'Time in hours across, distance from home in km up. The graph joins A, B, C, D, E in order with straight lines.',
  xMin: 0,
  xMax: 5,
  yMin: 0,
  yMax: 10,
  gridStep: 1,
  curves: [],
  points: [
    { x: 0, y: 0, label: 'A', highlight: false },
    { x: 1, y: 4, label: 'B', highlight: false },
    { x: 2, y: 4, label: 'C', highlight: false },
    { x: 3, y: 10, label: 'D', highlight: false },
    { x: 5, y: 0, label: 'E', highlight: false },
  ],
};

/** A kilometres-to-miles conversion line: 8 km is 5 miles, through the origin. */
const kmMilesFigure: Problem['figure'] = {
  kind: 'coordinate_plane',
  title: 'Kilometres to miles',
  caption: 'Kilometres across, miles up. The line passes through (0, 0) and (80, 50).',
  xMin: 0,
  xMax: 80,
  yMin: 0,
  yMax: 50,
  gridStep: 10,
  curves: [{ type: 'linear', m: 0.625, c: 0, label: 'miles' }],
  points: [{ x: 80, y: 50, label: '(80, 50)', highlight: false }],
};

const DEV_CPA_CONCRETE =
  'Walk it: for the first hour Dev is moving away from home, then for an hour the distance ' +
  'does not change, then he moves away faster, then he comes back. Which of those stages is ' +
  'this question about?';

// ---------------------------------------------------------------------------
// Problems
// ---------------------------------------------------------------------------

export const practicalGraphsProblems: Problem[] = [
  // =========================================================================
  // Skill 1 — construct and interpret distance–time and speed–time graphs
  // =========================================================================

  // ---- Tier 1: read one journey six ways ----------------------------------
  {
    id: 'practical-graphs.walk-read-1',
    skillIds: ['practical-graphs.construct-interpret-distance-time'],
    tier: 1,
    sequence: { family: 'practical-graphs.walk-read', position: 1 },
    statement:
      'Dev goes for a walk. The table gives his distance from home at five moments, and the ' +
      'graph joins the points with straight lines.\n\n' +
      DEV_WALK_TABLE +
      '\n\nFind his speed on segment $AB$, in km/h.',
    answer: { type: 'number', value: 4, tolerance: 0, unit: 'km/h' },
    cpaPrompts: {
      concrete: DEV_CPA_CONCRETE,
      pictorial:
        'Draw a slope triangle under segment $AB$: one hour along, and how far up? The height of ' +
        'that triangle is the answer, because the run is exactly one hour.',
      abstract:
        'Speed is the gradient of a distance–time segment: $\\frac{\\Delta d}{\\Delta t}$ with ' +
        '$\\Delta d = 4 - 0$ and $\\Delta t = 1 - 0$.',
    },
    hints: [
      'On a distance–time graph, speed is the gradient of the segment. What are the rise and the run of $AB$?',
      'From $A(0, 0)$ to $B(1, 4)$: the distance rises by 4 km while the time runs on by 1 hour.',
      'Divide the rise by the run: $4 \\div 1$ km/h.',
    ],
    solution:
      'Segment $AB$ runs from $(0, 0)$ to $(1, 4)$.\n\n$$\\text{speed} = \\frac{\\Delta d}{\\Delta t} ' +
      '= \\frac{4 - 0}{1 - 0} = 4 \\text{ km/h}.$$\n\nCheck: 4 km/h for 1 hour is 4 km, which is where $B$ sits.',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
    figure: devWalkFigure,
  },
  {
    id: 'practical-graphs.walk-read-2',
    skillIds: ['practical-graphs.construct-interpret-distance-time'],
    tier: 1,
    sequence: { family: 'practical-graphs.walk-read', position: 2 },
    expect:
      'Same walk, but now you are asked for a segment rather than a speed. Before you look: what ' +
      'must a segment look like if Dev is not moving at all?',
    statement:
      'Here is Dev\'s walk again.\n\n' +
      DEV_WALK_TABLE +
      '\n\nDuring which segment is Dev standing still? Give its two letters.',
    answer: {
      type: 'exact',
      value: 'BC',
      accepts: ['B to C', 'from B to C', 'B-C', 'segment BC', 'between B and C', 'the second segment', 'second segment', 'second'],
    },
    cpaPrompts: {
      concrete: DEV_CPA_CONCRETE,
      pictorial:
        'Lay a ruler along each segment in turn. Which one is level, with the ruler parallel to the ' +
        'time axis? That is the one where the distance from home does not change.',
      abstract:
        'A stationary stage has $\\Delta d = 0$, so its gradient is $0$ and the segment is horizontal. ' +
        'Between which two points does the distance stay the same?',
    },
    hints: [
      'If Dev is standing still, his distance from home does not change while time carries on. What does that look like on the graph?',
      'Look for two consecutive points with the same distance value in the table.',
      '$B$ is at 4 km after 1 hour and $C$ is at 4 km after 2 hours. The segment between them is flat.',
    ],
    solution:
      'A horizontal segment has zero gradient, so zero speed. From $B(1, 4)$ to $C(2, 4)$ the ' +
      'distance stays at 4 km for a whole hour, so Dev is standing still during $BC$.',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
    figure: devWalkFigure,
  },
  {
    id: 'practical-graphs.walk-read-3',
    skillIds: ['practical-graphs.construct-interpret-distance-time'],
    tier: 1,
    sequence: { family: 'practical-graphs.walk-read', position: 3 },
    expect:
      'Now the question is "fastest" instead of "still". What does a fast stage look like on a ' +
      'distance–time graph — and which segment do you predict it will be?',
    statement:
      'Here is Dev\'s walk again.\n\n' +
      DEV_WALK_TABLE +
      '\n\nDuring which segment is Dev moving fastest? Give its two letters.',
    answer: {
      type: 'exact',
      value: 'CD',
      accepts: ['C to D', 'from C to D', 'C-D', 'segment CD', 'between C and D', 'the third segment', 'third segment', 'third'],
    },
    cpaPrompts: {
      concrete: DEV_CPA_CONCRETE,
      pictorial:
        'Compare the steepness of $AB$, $CD$ and $DE$ by eye. Steeper means more distance in the ' +
        'same time. Then check with a slope triangle on the two that look close.',
      abstract:
        'Compute the gradient of each sloping segment: $AB$ gives $\\frac{4}{1}$, $CD$ gives ' +
        '$\\frac{6}{1}$, $DE$ gives $\\frac{-10}{2}$. The largest size of gradient is the fastest.',
    },
    hints: [
      'Fastest means steepest. Which segments slope at all, and which of those slopes most?',
      'Work out the speed on each sloping segment: $AB$, $CD$ and $DE$. Remember $DE$ takes 2 hours.',
      '$AB$: 4 km/h. $CD$: $\\frac{10 - 4}{3 - 2} = 6$ km/h. $DE$: $\\frac{10}{2} = 5$ km/h. Which is largest?',
    ],
    solution:
      'Speeds: $AB = \\frac{4}{1} = 4$ km/h; $BC = 0$; $CD = \\frac{10 - 4}{3 - 2} = 6$ km/h; ' +
      '$DE = \\frac{10 - 0}{5 - 3} = 5$ km/h (towards home). The steepest segment is $CD$, at 6 km/h.',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
    figure: devWalkFigure,
  },
  {
    id: 'practical-graphs.walk-read-4',
    skillIds: ['practical-graphs.construct-interpret-distance-time'],
    tier: 1,
    sequence: { family: 'practical-graphs.walk-read', position: 4 },
    expect:
      'This time the segment goes downhill on the graph. Will its gradient be positive or ' +
      'negative — and what would a negative gradient mean for someone walking?',
    statement:
      'Here is Dev\'s walk again.\n\n' +
      DEV_WALK_TABLE +
      '\n\nFind the gradient of segment $DE$, in km/h, including its sign.',
    answer: { type: 'number', value: -5, tolerance: 0, unit: 'km/h' },
    cpaPrompts: {
      concrete:
        'At $D$ Dev is 10 km from home; two hours later, at $E$, he is home. Was the distance from ' +
        'home going up or down during those two hours? By how much each hour?',
      pictorial:
        'Draw the slope triangle on $DE$. The run is 2 hours to the right, but the rise goes ' +
        '*down* 10 km. Rise over run with a downward rise is negative.',
      abstract:
        'Gradient $= \\frac{\\Delta d}{\\Delta t} = \\frac{0 - 10}{5 - 3}$. The sign says the ' +
        'distance from home is decreasing: he is walking back. The speed itself is 5 km/h.',
    },
    hints: [
      'Gradient is still rise over run. From $D(3, 10)$ to $E(5, 0)$, what is the rise? Is it up or down?',
      'The rise is $0 - 10 = -10$ km over a run of $5 - 3 = 2$ hours.',
      'Divide: $-10 \\div 2$. A negative gradient on a distance–time graph means moving back towards the start.',
    ],
    solution:
      '$$\\text{gradient of } DE = \\frac{0 - 10}{5 - 3} = \\frac{-10}{2} = -5 \\text{ km/h}.$$\n\n' +
      'Dev walks home at 5 km/h. The minus sign records the direction — distance from home is ' +
      'falling — not a negative speed.',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
    figure: devWalkFigure,
  },
  {
    id: 'practical-graphs.walk-read-5',
    skillIds: ['practical-graphs.construct-interpret-distance-time'],
    tier: 1,
    sequence: { family: 'practical-graphs.walk-read', position: 5 },
    expect:
      'The graph ends at distance 0, back where it began. Does that mean Dev walked no distance? ' +
      'Predict: is the total distance he walked 0, 10, or something else?',
    statement:
      'Here is Dev\'s walk one more time.\n\n' +
      DEV_WALK_TABLE +
      '\n\nAt $E$ he is back home. What is the total distance Dev walked, in km?',
    answer: { type: 'number', value: 20, tolerance: 0, unit: 'km' },
    cpaPrompts: {
      concrete:
        'Imagine a pedometer on Dev\'s wrist. It counts every kilometre out and every kilometre ' +
        'back; it never subtracts. What does it read at $E$?',
      pictorial:
        'Add up the *vertical* change of each segment, ignoring direction: up 4, flat 0, up 6, ' +
        'down 10. The graph reading of 0 at $E$ is his distance *from home*, not the distance walked.',
      abstract:
        'Total distance $= |4| + |0| + |6| + |{-10}| = 20$ km. Displacement $= 0$ km. The graph ' +
        'shows displacement from home; the distance walked is the sum of the sizes of the changes.',
    },
    hints: [
      'The graph shows distance *from home*. Walking out and walking back both count as distance walked.',
      'How far out did he get? He reached 10 km from home at $D$. Then he walked all the way back.',
      'Out: $4 + 0 + 6 = 10$ km. Back: 10 km. Add them.',
    ],
    solution:
      'Distance walked, segment by segment: $AB = 4$ km, $BC = 0$ km, $CD = 6$ km, $DE = 10$ km ' +
      '(back towards home). Total $= 4 + 0 + 6 + 10 = 20$ km.\n\nHis displacement at $E$ is 0 km, ' +
      'which is what the graph reads. Distance walked and distance from home are different things.',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
    figure: devWalkFigure,
  },
  {
    id: 'practical-graphs.walk-read-6',
    skillIds: ['practical-graphs.construct-interpret-distance-time', 'practical-graphs.interpret-conversion-practical'],
    tier: 1,
    sequence: { family: 'practical-graphs.walk-read', position: 6 },
    expect:
      'One thing has changed: the vertical axis is now *speed*, not distance. Dev\'s flat segment ' +
      'meant standing still. Does a flat line still mean that here? Predict the answer before you calculate.',
    statement:
      'A different graph. A car\'s speed–time graph is a horizontal line at 12 m/s from $t = 0$ s ' +
      'to $t = 10$ s. How far does the car travel in these 10 seconds, in metres?',
    answer: { type: 'number', value: 120, tolerance: 0, unit: 'm' },
    cpaPrompts: {
      concrete:
        'Sit in the car. The speedometer needle stays on 12 the whole time. Is the car parked, or ' +
        'is it moving at 12 metres every second? How far after 10 of those seconds?',
      pictorial:
        'The region under the flat line is a rectangle 10 wide and 12 tall. Its area, with units ' +
        'seconds times metres per second, is metres.',
      abstract:
        'On a speed–time graph a horizontal line means the speed is constant, not zero. Distance ' +
        '$= vt = 12 \\times 10$. The distance–time meaning of "flat" does not carry across.',
    },
    hints: [
      'Read the vertical axis label. What quantity is staying fixed at 12?',
      'The speed is 12 m/s for the whole 10 seconds — the car is moving the entire time.',
      'Distance $=$ speed $\\times$ time $= 12 \\times 10$.',
    ],
    solution:
      'The vertical axis is speed, so a horizontal line at 12 means the speed stays at 12 m/s for ' +
      'all 10 seconds. The car is moving throughout.\n\n$$\\text{distance} = 12 \\times 10 = 120 ' +
      '\\text{ m}.$$\n\nThis is the area of the rectangle under the line. Flat on a speed–time graph ' +
      'is steady speed; only a line along the time axis, at speed 0, would be rest.',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
  },

  // ---- Tier 2 --------------------------------------------------------------
  {
    id: 'practical-graphs.story-to-graph',
    skillIds: ['practical-graphs.construct-interpret-distance-time'],
    tier: 2,
    statement:
      'Priya leaves home at time 0. She cycles 6 km in 20 minutes, stops for 10 minutes, then ' +
      'cycles a further 9 km in 30 minutes. She plots her distance from home in km against time ' +
      'in minutes. Give the coordinates of the point where the third stage ends.',
    answer: { type: 'coordinates', x: 60, y: 15, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Keep two running totals as you read the story: a clock and a distance counter. Every ' +
        'stage moves the clock; only the cycling stages move the distance counter.',
      pictorial:
        'Plot each stage as a straight segment starting where the last one ended: up and right for ' +
        'cycling, flat for the stop. Where does the pen finish?',
      abstract:
        'Each stage adds $(\\Delta t, \\Delta d)$ to the previous endpoint: $(0, 0) \\to (20, 6) ' +
        '\\to (30, 6) \\to (60, 15)$.',
    },
    hints: [
      'Build the graph point by point. After the first stage she is at $(20, 6)$. Where is she after the stop?',
      'The stop adds 10 minutes but no distance: $(30, 6)$. Now add the third stage.',
      'Third stage: 30 more minutes and 9 more km from $(30, 6)$.',
    ],
    solution:
      'Endpoints of the stages: start $(0, 0)$; after cycling 6 km in 20 min, $(20, 6)$; after ' +
      'the 10-minute stop, $(30, 6)$; after 9 km in 30 min, $(30 + 30, 6 + 9) = (60, 15)$.\n\n' +
      'The third stage ends at $(60, 15)$: 15 km from home after 60 minutes.',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
  },
  {
    id: 'practical-graphs.graph-to-story',
    skillIds: ['practical-graphs.construct-interpret-distance-time'],
    tier: 2,
    statement:
      'A distance–time graph for Mei\'s walk to the shop and back joins these points with straight lines: ' +
      '$(0, 0)$, $(15, 3)$, $(35, 3)$, $(50, 0)$, with time in minutes and distance from home in km. ' +
      'For how many minutes was Mei at the shop?',
    answer: { type: 'number', value: 20, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Tell the story of the graph aloud: she walks away from home, then something happens, then ' +
        'she comes back. What is she doing while the distance stays at 3 km?',
      pictorial:
        'Find the flat part of the graph. Its left end and right end are the times she arrived and ' +
        'left; its length along the time axis is how long she stayed.',
      abstract:
        'The horizontal segment from $(15, 3)$ to $(35, 3)$ has $\\Delta d = 0$: stationary. Its ' +
        'duration is $\\Delta t = 35 - 15$ minutes.',
    },
    hints: [
      'While she is in the shop her distance from home does not change. Which two points have the same distance?',
      'She is at 3 km from $t = 15$ to $t = 35$.',
      'Subtract the times: $35 - 15$.',
    ],
    solution:
      'The flat segment from $(15, 3)$ to $(35, 3)$ is the time at the shop: distance from home ' +
      'fixed at 3 km. Duration $= 35 - 15 = 20$ minutes.\n\nThe rest of the story: she walked 3 km ' +
      'in 15 min (12 km/h — a brisk pace) and came home in 15 min at the same speed.',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
  },
  {
    id: 'practical-graphs.two-travellers-meet',
    skillIds: ['practical-graphs.construct-interpret-distance-time', 'practical-graphs.calculate-speed-average'],
    tier: 2,
    statement:
      'Towns $P$ and $Q$ are 60 km apart. At the same moment, Anna cycles from $P$ towards $Q$ at ' +
      '12 km/h and Ben cycles from $Q$ towards $P$ at 18 km/h. Both distance–time graphs are ' +
      'drawn with distance measured from $P$. After how many hours do they meet?',
    answer: { type: 'number', value: 2, tolerance: 0, unit: 'hours' },
    cpaPrompts: {
      concrete:
        'Every hour Anna moves 12 km up the road and Ben moves 18 km down it. How much does the ' +
        'gap between them shrink each hour? It started at 60 km.',
      pictorial:
        'Anna\'s line rises from $(0, 0)$ with gradient 12; Ben\'s falls from $(0, 60)$ with ' +
        'gradient $-18$. They meet where the lines cross. Read the time there.',
      abstract:
        'Anna: $d = 12t$. Ben: $d = 60 - 18t$. Meeting means the same $d$ at the same $t$: ' +
        '$12t = 60 - 18t$.',
    },
    hints: [
      'Write each cyclist\'s distance from $P$ as a formula in $t$. Ben starts 60 km from $P$ and that distance falls.',
      'They meet when the two distances are equal: $12t = 60 - 18t$.',
      'Collect the $t$ terms: $30t = 60$.',
    ],
    solution:
      'Distance from $P$: Anna $d = 12t$; Ben $d = 60 - 18t$. At the meeting point the distances ' +
      'agree:\n\n$$12t = 60 - 18t \\implies 30t = 60 \\implies t = 2.$$\n\nThey meet after 2 hours, ' +
      '24 km from $P$. Check: Anna has done 24 km and Ben $36$ km; $24 + 36 = 60$.',
    misconceptionCodes: ['practical-graphs.average-of-speeds'],
    figure: {
      kind: 'coordinate_plane',
      title: 'Anna and Ben',
      caption: 'Time in hours across, distance from P in km up. Anna starts at P; Ben starts at Q, 60 km away.',
      xMin: 0,
      xMax: 4,
      yMin: 0,
      yMax: 60,
      gridStep: 4,
      curves: [
        { type: 'linear', m: 12, c: 0, label: 'Anna' },
        { type: 'linear', m: -18, c: 60, label: 'Ben' },
      ],
      points: [],
    },
  },

  // ---- Tier 3 --------------------------------------------------------------
  {
    id: 'practical-graphs.bus-timetable',
    skillIds: ['practical-graphs.construct-interpret-distance-time'],
    tier: 3,
    statement:
      'A bus leaves the interchange at 08:00. Its distance from the interchange was recorded ' +
      'at these times:\n\n| Clock time | 08:00 | 08:12 | 08:18 | 08:30 | 08:45 | 09:00 |\n' +
      '| --- | --- | --- | --- | --- | --- | --- |\n| Distance (km) | 0 | 6 | 6 | 15 | 15 | 24 |\n\n' +
      'The bus moves steadily between readings. For how many minutes in total was the bus ' +
      'waiting at stops?',
    answer: { type: 'number', value: 21, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Ride the bus with the table in your hand. Between which pairs of readings did the ' +
        'distance not change at all? What was the bus doing then?',
      pictorial:
        'Sketch the distance–time graph from the table. The flat pieces are the stops. How wide ' +
        'is each flat piece along the time axis?',
      abstract:
        'A stop is an interval with $\\Delta d = 0$: 08:12 to 08:18 and 08:30 to 08:45. Total ' +
        'waiting time is the sum of those intervals.',
    },
    hints: [
      'Where in the table does the distance stay the same from one reading to the next?',
      'It stays at 6 km from 08:12 to 08:18, and at 15 km from 08:30 to 08:45.',
      'Those stops last 6 minutes and 15 minutes. Add them.',
    ],
    solution:
      'The distance is unchanged from 08:12 to 08:18 (at 6 km) and from 08:30 to 08:45 (at 15 km): ' +
      'these are the stops.\n\nWaiting time $= 6 + 15 = 21$ minutes.\n\nThe moving legs were 6 km in ' +
      '12 min, 9 km in 12 min and 9 km in 15 min, so the bus was fastest on the second leg.',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
  },
  {
    id: 'practical-graphs.race-shoelace',
    skillIds: ['practical-graphs.construct-interpret-distance-time', 'practical-graphs.calculate-speed-average'],
    tier: 3,
    statement:
      'In a 200 m race, Ravi sprints at 8 m/s for 20 seconds, stops for 15 seconds to tie his ' +
      'shoelace, then walks the rest of the way at 2 m/s. Simran runs the whole 200 m at a steady ' +
      '5 m/s. By how many seconds does the winner beat the other?',
    answer: { type: 'number', value: 15, tolerance: 0, unit: 'seconds' },
    cpaPrompts: {
      concrete:
        'Put both runners on a stopwatch. After 20 seconds, how far has Ravi gone and how far has ' +
        'Simran? Keep going stage by stage until each one crosses 200 m.',
      pictorial:
        'Draw both distance–time graphs on one set of axes: Ravi\'s is steep, then flat, then ' +
        'shallow; Simran\'s is one straight line. Where does each line reach 200 m?',
      abstract:
        'Ravi: $8 \\times 20 = 160$ m at $t = 20$; still 160 m at $t = 35$; the remaining 40 m at ' +
        '2 m/s takes 20 s, so $t = 55$. Simran: $200 \\div 5 = 40$ s.',
    },
    hints: [
      'Work out each runner\'s finishing time separately. Start with Simran — hers is one step.',
      'Ravi: how far has he gone when he stops? How far is left, and how long does that take at 2 m/s?',
      'Ravi finishes at $20 + 15 + 20 = 55$ s. Simran finishes at 40 s. Find the difference.',
    ],
    solution:
      'Simran: $200 \\div 5 = 40$ seconds.\n\nRavi: sprint $8 \\times 20 = 160$ m, finished at ' +
      '$t = 20$ s. Stop until $t = 35$ s. Remaining $200 - 160 = 40$ m at 2 m/s takes $40 \\div 2 = 20$ ' +
      's, so he finishes at $t = 55$ s.\n\nSimran wins by $55 - 40 = 15$ seconds — even though Ravi ' +
      'led by 60 m at the moment he stopped.',
    misconceptionCodes: ['practical-graphs.average-of-speeds'],
  },

  // ---- Diagnostic ----------------------------------------------------------
  {
    id: 'practical-graphs.dx-flat-means-stopped',
    skillIds: ['practical-graphs.construct-interpret-distance-time'],
    tier: 'diagnostic',
    statement:
      'A lift starts from rest and its speed rises steadily to 3 m/s in 4 seconds. From $t = 4$ s ' +
      'to $t = 10$ s its speed–time graph is a horizontal line at 3 m/s. How far does the lift ' +
      'travel in the whole 10 seconds?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '6 m', misconceptionCode: 'practical-graphs.flat-means-stopped-on-speed-graph' },
        { label: 'B', value: '24 m' },
        { label: 'C', value: '30 m', misconceptionCode: 'practical-graphs.constant-speed-assumed' },
      ],
    },
    cpaPrompts: {
      concrete:
        'You are in the lift. For the last 6 seconds the speed reads a steady 3 m/s. Is the lift ' +
        'stopped, or is it moving 3 metres every second?',
      pictorial:
        'Under the graph there is a triangle (first 4 s) and a rectangle (next 6 s). Both regions ' +
        'have area, and both areas are distance.',
      abstract:
        'Distance $=$ area under the speed–time graph $= \\tfrac{1}{2} \\times 4 \\times 3 + 6 \\times 3 = 6 + 18$.',
    },
    hints: [
      'What does the vertical axis measure? A flat line means *that* quantity is not changing.',
      'The speed is fixed at 3 m/s for 6 seconds — the lift is moving that whole time. And it moved during the first 4 seconds too.',
    ],
    solution:
      'First 4 s: speed climbs from 0 to 3, a triangle of area $\\tfrac{1}{2} \\times 4 \\times 3 = 6$ m. ' +
      'Next 6 s: steady 3 m/s, a rectangle of area $6 \\times 3 = 18$ m. Total $24$ m.\n\n' +
      '6 m treats the flat section as rest; 30 m treats the lift as doing 3 m/s for all 10 seconds.',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph', 'practical-graphs.constant-speed-assumed'],
  },

  // =========================================================================
  // Skill 2 — speed, average speed and acceleration from gradients
  // =========================================================================

  // ---- Tier 1a: average speed ---------------------------------------------
  {
    id: 'practical-graphs.average-speed-1',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 1,
    sequence: { family: 'practical-graphs.average-speed', position: 1 },
    statement:
      'A cyclist rides 30 km in 1.5 hours and then a further 30 km in 1 hour, without stopping. ' +
      'Find her average speed for the whole ride, in km/h.',
    answer: { type: 'number', value: 24, tolerance: 0.01, unit: 'km/h' },
    cpaPrompts: {
      concrete:
        'When she finishes, her odometer says how far she has come and her watch says how long it ' +
        'took. Those two numbers are the whole story. What are they?',
      pictorial:
        'Draw the distance–time graph: $(0, 0)$ to $(1.5, 30)$ to $(2.5, 60)$. Now draw one straight ' +
        'line from start to finish. Its gradient is the average speed.',
      abstract:
        'Average speed $= \\frac{\\text{total distance}}{\\text{total time}} = \\frac{30 + 30}{1.5 + 1}$.',
    },
    hints: [
      'Average speed is total distance divided by total time — not the average of the two stage speeds.',
      'Total distance is $30 + 30 = 60$ km. Total time is $1.5 + 1 = 2.5$ h.',
      'Divide: $60 \\div 2.5$.',
    ],
    solution:
      'Total distance $= 30 + 30 = 60$ km. Total time $= 1.5 + 1 = 2.5$ h.\n\n' +
      '$$\\text{average speed} = \\frac{60}{2.5} = 24 \\text{ km/h}.$$\n\nThe stage speeds were 20 ' +
      'and 30 km/h; the average is nearer 20 because she spent longer at that speed.',
    misconceptionCodes: ['practical-graphs.average-of-speeds'],
  },
  {
    id: 'practical-graphs.average-speed-2',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 1,
    sequence: { family: 'practical-graphs.average-speed', position: 2 },
    expect:
      'The second leg shrank from 30 km to 10 km, but still takes 1 hour. The stage speeds are now ' +
      '20 and 10 km/h. Will the average be exactly 15, above 15, or below 15?',
    statement:
      'A cyclist rides 30 km in 1.5 hours and then a further 10 km in 1 hour, without stopping. ' +
      'Find her average speed for the whole ride, in km/h.',
    answer: { type: 'number', value: 16, tolerance: 0.01, unit: 'km/h' },
    cpaPrompts: {
      concrete:
        'She rode at 20 km/h for an hour and a half and at 10 km/h for one hour. She spent more ' +
        'time at the faster speed. Should the average lean towards 20 or towards 10?',
      pictorial:
        'Distance–time graph: $(0, 0)$ to $(1.5, 30)$ to $(2.5, 40)$. The start-to-finish line is ' +
        'less steep than before. What is its gradient?',
      abstract:
        'Average speed $= \\frac{30 + 10}{1.5 + 1} = \\frac{40}{2.5}$. Compare with the mean of the ' +
        'stage speeds, $\\frac{20 + 10}{2} = 15$: different, because the stages are not equal in time.',
    },
    hints: [
      'Same method: total distance over total time.',
      'Total distance $= 40$ km, total time $= 2.5$ h.',
      '$40 \\div 2.5$. Notice this is not $(20 + 10) \\div 2$.',
    ],
    solution:
      'Total distance $= 30 + 10 = 40$ km. Total time $= 2.5$ h. Average speed $= \\frac{40}{2.5} = ' +
      '16$ km/h.\n\nThe mean of the stage speeds is 15 km/h, which is wrong: she spent 1.5 h at ' +
      '20 km/h and only 1 h at 10 km/h, so the faster stage carries more weight.',
    misconceptionCodes: ['practical-graphs.average-of-speeds'],
  },
  {
    id: 'practical-graphs.average-speed-3',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 1,
    sequence: { family: 'practical-graphs.average-speed', position: 3 },
    expect:
      'The second leg now takes 30 minutes instead of 1 hour. Before dividing, what do you have to ' +
      'do to the 30 minutes — and do you predict the average goes up or down?',
    statement:
      'A cyclist rides 30 km in 1.5 hours and then a further 10 km in 30 minutes, without ' +
      'stopping. Find her average speed for the whole ride, in km/h.',
    answer: { type: 'number', value: 20, tolerance: 0.01, unit: 'km/h' },
    cpaPrompts: {
      concrete:
        'Her watch counts in hours and minutes but her answer is in km per *hour*. Half an hour is ' +
        'what fraction of an hour? Make everything hours before dividing.',
      pictorial:
        'Distance–time graph with the time axis in hours: $(0, 0)$, $(1.5, 30)$, $(2, 40)$. The ' +
        'second leg is only half a unit wide.',
      abstract:
        '30 minutes $= 0.5$ h. Average speed $= \\frac{30 + 10}{1.5 + 0.5} = \\frac{40}{2}$.',
    },
    hints: [
      'The answer is in km/h, so the time must be in hours. Convert 30 minutes first.',
      '30 minutes is 0.5 hours. Total time $= 1.5 + 0.5 = 2$ h.',
      'Total distance is still 40 km. Divide by 2.',
    ],
    solution:
      '30 min $= 0.5$ h. Total distance $= 40$ km; total time $= 1.5 + 0.5 = 2$ h.\n\n' +
      '$$\\text{average speed} = \\frac{40}{2} = 20 \\text{ km/h}.$$\n\nUsing 30 instead of 0.5 in the ' +
      'denominator would give a nonsense answer of just over 1 km/h.',
    misconceptionCodes: ['practical-graphs.average-of-speeds'],
  },
  {
    id: 'practical-graphs.average-speed-4',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 1,
    sequence: { family: 'practical-graphs.average-speed', position: 4 },
    expect:
      'This one is reversed: the average speed is given and a distance is missing. If you know the ' +
      'average and the total time, what can you find first?',
    statement:
      'A cyclist rides 30 km in 1.5 hours and then rides for a further 1 hour. Her average speed ' +
      'for the whole ride is 20 km/h. How far did she ride in that second hour, in km?',
    answer: { type: 'number', value: 20, tolerance: 0.01, unit: 'km' },
    cpaPrompts: {
      concrete:
        'Her average was 20 km/h and the whole ride took 2.5 hours. If she had ridden at exactly ' +
        '20 km/h the entire time, how far would she have gone? That is her total.',
      pictorial:
        'Draw the start-to-finish line with gradient 20 over 2.5 hours; it ends at height 50. The ' +
        'first leg reaches 30. The second leg must climb the rest.',
      abstract:
        'Total distance $=$ average speed $\\times$ total time $= 20 \\times 2.5 = 50$ km. ' +
        'Second leg $= 50 - 30$.',
    },
    hints: [
      'Rearrange: total distance $=$ average speed $\\times$ total time.',
      'Total time is $1.5 + 1 = 2.5$ h, so total distance is $20 \\times 2.5 = 50$ km.',
      'Subtract the first leg: $50 - 30$.',
    ],
    solution:
      'Total time $= 2.5$ h, so total distance $= 20 \\times 2.5 = 50$ km. The first leg was 30 km, ' +
      'so the second leg was $50 - 30 = 20$ km.\n\nCheck: $\\frac{30 + 20}{1.5 + 1} = \\frac{50}{2.5} = 20$ km/h.',
    misconceptionCodes: ['practical-graphs.average-of-speeds'],
  },
  {
    id: 'practical-graphs.cyclist-average-speed',
    skillIds: ['practical-graphs.calculate-speed-average', 'practical-graphs.construct-interpret-distance-time'],
    tier: 1,
    sequence: { family: 'practical-graphs.average-speed', position: 5 },
    expect:
      'A 30-minute rest has been added between the two legs. No distance was added. Will the ' +
      'average speed go up, go down, or stay the same? Say why before you calculate.',
    statement:
      'A cyclist rides 30 km in 1.5 hours, rests for 30 minutes, then rides a further 20 km in ' +
      '1 hour. Find her average speed for the whole journey, in km/h, correct to 2 decimal places.',
    answer: { type: 'number', value: 16.67, tolerance: 0.02, unit: 'km/h' },
    cpaPrompts: {
      concrete:
        'Act out the three stages with a stopwatch running the whole time — including the rest. ' +
        'When she arrives, what does the stopwatch say, and how far has she come altogether?',
      pictorial:
        'Draw the distance–time graph: a rising line, a flat line, a rising line. Now draw one ' +
        'straight line from the start to the finish. What is its gradient?',
      abstract:
        'Total distance divided by total elapsed time, with the rest converted to hours and ' +
        'included.',
    },
    hints: [
      'For the first stage, speed is distance over time: $30 \\div 1.5$. But average speed for ' +
        'the whole journey is something different — what is it?',
      'Do not average the two stage speeds. Find the total distance and the total time, then ' +
        'divide.',
      'Total distance is 50 km. Total time includes the rest: $1.5 + 0.5 + 1 = 3$ hours. Divide.',
    ],
    solution:
      'Stage 1 speed: $\\frac{30}{1.5} = 20$ km/h. Total distance: $30 + 20 = 50$ km. Total ' +
      'time: $1.5 + 0.5 + 1 = 3$ h, with the rest included.\n\n$$\\text{Average speed} = ' +
      '\\frac{50}{3} \\approx 16.67 \\text{ km/h}.$$',
    misconceptionCodes: ['practical-graphs.rest-dropped-from-total-time', 'practical-graphs.average-of-speeds'],
  },
  {
    id: 'practical-graphs.average-speed-6',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 1,
    sequence: { family: 'practical-graphs.average-speed', position: 6 },
    expect:
      'Only the rest has changed: 30 minutes became a full hour. Both legs are identical to last ' +
      'time. Both stage speeds are still 20 km/h. Predict: does the average change at all?',
    statement:
      'A cyclist rides 30 km in 1.5 hours, rests for 1 hour, then rides a further 20 km in ' +
      '1 hour. Find her average speed for the whole journey, in km/h.',
    answer: { type: 'number', value: 12.5, tolerance: 0.01, unit: 'km/h' },
    cpaPrompts: {
      concrete:
        'She is sitting on a bench for an hour. The distance counter is frozen, but is the clock ' +
        'frozen? When she gets home, how long has it been since she left?',
      pictorial:
        'The flat part of the graph is now a full unit wide. The start-to-finish line has the same ' +
        'height as before, 50 km, but a longer run. Is it steeper or shallower?',
      abstract:
        'Average speed $= \\frac{50}{1.5 + 1 + 1} = \\frac{50}{4}$. Both stage speeds are 20 km/h, ' +
        'yet the average is well below 20: the rest is in the time but not in the distance.',
    },
    hints: [
      'The total distance is unchanged at 50 km. What is the total time now?',
      'Total time $= 1.5 + 1 + 1 = 4$ hours, rest included.',
      'Divide $50$ by $4$.',
    ],
    solution:
      'Total distance $= 50$ km. Total time $= 1.5 + 1 + 1 = 4$ h.\n\n$$\\text{average speed} = ' +
      '\\frac{50}{4} = 12.5 \\text{ km/h}.$$\n\nThe pattern: both legs were ridden at 20 km/h in every ' +
      'version, but the average fell from 20 to 16.67 to 12.5 as the rest grew. Rests cost time ' +
      'and time is in the denominator.',
    misconceptionCodes: ['practical-graphs.rest-dropped-from-total-time', 'practical-graphs.average-of-speeds'],
  },

  // ---- Tier 1b: acceleration from a speed–time gradient --------------------
  {
    id: 'practical-graphs.car-acceleration',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 1,
    sequence: { family: 'practical-graphs.acceleration', position: 1 },
    statement:
      'A car accelerates uniformly from rest to 24 m/s in 8 seconds. Find its acceleration, ' +
      'in m/s².',
    answer: { type: 'number', value: 3, tolerance: 0, unit: 'm/s²' },
    cpaPrompts: {
      concrete:
        'Every second the speedometer goes up by the same amount. It reads 0 at the start and 24 ' +
        'after 8 seconds. How much does it rise each second?',
      pictorial:
        'Draw the speed–time graph for the first 8 seconds: a straight line from $(0, 0)$ to ' +
        '$(8, 24)$. Draw a slope triangle one second wide on it. How tall is it?',
      abstract:
        'Acceleration is the gradient of the speed–time graph: $\\frac{v - u}{t}$.',
    },
    hints: [
      'Acceleration is the gradient of the speed–time graph during those 8 seconds. What are the ' +
        'rise and the run?',
      'Rise is the change in speed, $24 - 0$; run is the time, 8. Divide.',
    ],
    solution:
      '$$a = \\frac{v - u}{t} = \\frac{24 - 0}{8} = 3 \\text{ m/s}^2.$$',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
    figure: {
      kind: 'coordinate_plane',
      title: 'Speed–time, first 8 seconds',
      caption: 'Time in seconds across, speed in m/s up. The gradient of this line is the acceleration.',
      xMin: 0,
      xMax: 8,
      yMin: 0,
      yMax: 24,
      gridStep: 1,
      curves: [{ type: 'linear', m: 3, c: 0, label: 'speed' }],
      points: [{ x: 8, y: 24, label: '(8, 24)', highlight: false }],
      slopeTriangle: { fromX: 4, toX: 5, curveIndex: 0 },
    },
  },
  {
    id: 'practical-graphs.acceleration-2',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 1,
    sequence: { family: 'practical-graphs.acceleration', position: 2 },
    expect:
      'The car no longer starts from rest: it starts at 10 m/s. The rise of the graph is no longer ' +
      'the whole 24. What is the rise now, and will the acceleration be more or less than 3?',
    statement:
      'A car travelling at 10 m/s accelerates uniformly to 24 m/s in 7 seconds. Find its ' +
      'acceleration, in m/s².',
    answer: { type: 'number', value: 2, tolerance: 0, unit: 'm/s²' },
    cpaPrompts: {
      concrete:
        'The speedometer starts on 10, not 0, and reaches 24 after 7 seconds. By how much did it ' +
        'go up altogether? Spread that evenly over the 7 seconds.',
      pictorial:
        'The speed–time line runs from $(0, 10)$ to $(7, 24)$. The slope triangle has run 7 and rise ' +
        '$24 - 10$ — it does not start at the axis.',
      abstract: 'Acceleration $= \\frac{v - u}{t} = \\frac{24 - 10}{7}$, with $u = 10$ not $0$.',
    },
    hints: [
      'The rise is the *change* in speed, not the final speed.',
      'Change in speed $= 24 - 10 = 14$ m/s, over 7 seconds.',
      '$14 \\div 7$.',
    ],
    solution: '$$a = \\frac{v - u}{t} = \\frac{24 - 10}{7} = \\frac{14}{7} = 2 \\text{ m/s}^2.$$',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
  },
  {
    id: 'practical-graphs.acceleration-3',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 1,
    sequence: { family: 'practical-graphs.acceleration', position: 3 },
    expect:
      'Now the speed falls from 24 to 0. The graph slopes downwards. What sign will the gradient ' +
      'have, and what does that sign mean for the car?',
    statement:
      'A car travelling at 24 m/s brakes uniformly to a stop in 4 seconds. Find its acceleration, ' +
      'in m/s², including its sign.',
    answer: { type: 'number', value: -6, tolerance: 0, unit: 'm/s²' },
    cpaPrompts: {
      concrete:
        'The speedometer drops from 24 to 0 in 4 seconds, the same amount each second. How much ' +
        'does it drop per second? Is the speed going up or down?',
      pictorial:
        'The speed–time line runs from $(0, 24)$ down to $(4, 0)$. The slope triangle has run 4 and ' +
        'rise $0 - 24$ — a downward rise.',
      abstract:
        'Acceleration $= \\frac{v - u}{t} = \\frac{0 - 24}{4}$. Negative acceleration is deceleration.',
    },
    hints: [
      'Use $\\frac{v - u}{t}$ with $u = 24$ and $v = 0$. Keep the order: final minus initial.',
      '$0 - 24 = -24$ m/s over 4 seconds.',
      '$-24 \\div 4$. The minus sign means the car is slowing down.',
    ],
    solution:
      '$$a = \\frac{v - u}{t} = \\frac{0 - 24}{4} = -6 \\text{ m/s}^2.$$\n\nA negative gradient on a ' +
      'speed–time graph is deceleration: the car loses 6 m/s of speed every second.',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
  },

  // ---- Tier 2 --------------------------------------------------------------
  {
    id: 'practical-graphs.time-from-average',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 2,
    statement:
      'A coach journey is 210 km long. The coach\'s average speed for the whole journey, ' +
      'including a stop at a service station, is 60 km/h. How long does the journey take, in hours?',
    answer: { type: 'number', value: 3.5, tolerance: 0.01, unit: 'hours' },
    cpaPrompts: {
      concrete:
        'At 60 km/h the coach covers 60 km every hour on average. How many lots of 60 km are in ' +
        '210 km? That many hours — stop included, because the average already allows for it.',
      pictorial:
        'The start-to-finish line on the distance–time graph has gradient 60 and reaches a height ' +
        'of 210. How far along the time axis does it get there?',
      abstract: 'Total time $= \\frac{\\text{total distance}}{\\text{average speed}} = \\frac{210}{60}$.',
    },
    hints: [
      'Rearrange average speed $= \\frac{\\text{distance}}{\\text{time}}$ to make time the subject.',
      'Time $= 210 \\div 60$.',
      '$210 \\div 60 = 3.5$. The stop is already inside the average, so do not add anything.',
    ],
    solution:
      '$$\\text{total time} = \\frac{210}{60} = 3.5 \\text{ hours}.$$\n\nThe average speed was ' +
      'measured over the whole journey, stop included, so 3.5 h is the whole journey time.',
    misconceptionCodes: ['practical-graphs.rest-dropped-from-total-time'],
  },
  {
    id: 'practical-graphs.missing-leg',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 2,
    statement:
      'A hiker walks 9 km in the first 2 hours, rests for 1 hour, then walks for a further ' +
      '2 hours. Her average speed for the whole 5 hours is 3 km/h. How far did she walk after ' +
      'the rest, in km?',
    answer: { type: 'number', value: 6, tolerance: 0.01, unit: 'km' },
    cpaPrompts: {
      concrete:
        'An average of 3 km/h over 5 hours means she ended up as far along as if she had walked ' +
        '3 km every hour for 5 hours. How far is that in total? She had done 9 km before the rest.',
      pictorial:
        'The start-to-finish line rises 3 for every 1 across, for 5 hours: height 15. The first leg ' +
        'reaches 9, the rest stays at 9. The last leg must climb from 9 to 15.',
      abstract: 'Total distance $= 3 \\times 5 = 15$ km. Second leg $= 15 - 9 = 6$ km.',
    },
    hints: [
      'Total distance $=$ average speed $\\times$ total time. The total time is the full 5 hours.',
      '$3 \\times 5 = 15$ km altogether.',
      'Take off the 9 km she walked before the rest.',
    ],
    solution:
      'Total distance $= 3 \\times 5 = 15$ km. First leg 9 km, rest 0 km, so the second leg is ' +
      '$15 - 9 = 6$ km.\n\nCheck: $\\frac{9 + 0 + 6}{2 + 1 + 2} = \\frac{15}{5} = 3$ km/h.',
    misconceptionCodes: ['practical-graphs.rest-dropped-from-total-time'],
  },
  {
    id: 'practical-graphs.length-of-stop',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 2,
    statement:
      'A train covers 120 km at a steady 80 km/h, but makes one stop on the way. Its average ' +
      'speed for the whole journey, stop included, is 60 km/h. How long was the stop, in minutes?',
    answer: { type: 'number', value: 30, tolerance: 0.5, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Two clocks: one runs only while the train is moving, one runs the whole time. The moving ' +
        'clock is set by 80 km/h; the whole-journey clock by 60 km/h. The stop is the gap between them.',
      pictorial:
        'On the distance–time graph the moving segments have gradient 80 and the start-to-finish ' +
        'line has gradient 60. Both reach 120 km; the flat piece accounts for the difference in time.',
      abstract:
        'Moving time $= \\frac{120}{80} = 1.5$ h. Total time $= \\frac{120}{60} = 2$ h. Stop $= 2 - 1.5 = 0.5$ h.',
    },
    hints: [
      'Find two times: how long the train was moving, and how long the whole journey took.',
      'Moving: $120 \\div 80 = 1.5$ h. Whole journey: $120 \\div 60 = 2$ h.',
      'The difference is the stop. Convert it to minutes.',
    ],
    solution:
      'Moving time $= \\frac{120}{80} = 1.5$ h. Total time $= \\frac{120}{60} = 2$ h. The stop is the ' +
      'difference: $2 - 1.5 = 0.5$ h $= 30$ minutes.',
    misconceptionCodes: ['practical-graphs.rest-dropped-from-total-time'],
  },

  // ---- Tier 3 --------------------------------------------------------------
  {
    id: 'practical-graphs.train-with-stops',
    skillIds: ['practical-graphs.calculate-speed-average', 'practical-graphs.construct-interpret-distance-time'],
    tier: 3,
    statement:
      'A train leaves City A at 09:00 and reaches Town B, 40 km away, at 09:30. It waits at Town B ' +
      'and leaves at 09:40, then reaches City C, a further 60 km on, at 10:40. Find the train\'s ' +
      'average speed for the whole journey from A to C, in km/h.',
    answer: { type: 'number', value: 60, tolerance: 0.1, unit: 'km/h' },
    cpaPrompts: {
      concrete:
        'You board at 09:00 and step off at 10:40. How long were you on the train, in minutes? ' +
        'How far did you travel? The wait at Town B — were you still on the journey then?',
      pictorial:
        'Distance–time graph: $(0, 0)$ to $(30, 40)$, flat to $(40, 40)$, then to $(100, 100)$ with ' +
        'time in minutes. One straight line from start to finish has the average as its gradient.',
      abstract:
        'Total distance $= 100$ km. Total time $= 09{:}00$ to $10{:}40 = 100$ min $= \\frac{5}{3}$ h. ' +
        'Average $= 100 \\div \\frac{5}{3}$.',
    },
    hints: [
      'Average speed needs the total distance and the total elapsed time from departure to arrival.',
      'Total distance $= 40 + 60 = 100$ km. From 09:00 to 10:40 is 100 minutes, wait included.',
      'Convert 100 minutes to hours: $\\frac{100}{60} = \\frac{5}{3}$ h. Then divide.',
    ],
    solution:
      'Total distance $= 40 + 60 = 100$ km. Elapsed time from 09:00 to 10:40 is 100 min ' +
      '$= \\frac{100}{60} = \\frac{5}{3}$ h.\n\n$$\\text{average speed} = 100 \\div \\frac{5}{3} = ' +
      '100 \\times \\frac{3}{5} = 60 \\text{ km/h}.$$\n\nLeaving out the 10-minute wait would give ' +
      '$100 \\div 1.5 = 66.7$ km/h, which is not the average for the journey.',
    misconceptionCodes: ['practical-graphs.rest-dropped-from-total-time'],
  },
  {
    id: 'practical-graphs.ferry-round-trip',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 3,
    statement:
      'A ferry crosses 12 km to an island at 24 km/h, waits 20 minutes at the island, then ' +
      'returns the 12 km against the tide at 16 km/h. Find its average speed for the round trip, ' +
      'in km/h, correct to 2 decimal places.',
    answer: { type: 'number', value: 15.16, tolerance: 0.05, unit: 'km/h' },
    cpaPrompts: {
      concrete:
        'Time each part with a stopwatch. At 24 km/h, how long does 12 km take? At 16 km/h? Add ' +
        'the 20-minute wait. The stopwatch reading at the end is the total time.',
      pictorial:
        'Distance–time graph in hours: a line with gradient 24 up to 12 km, a flat piece one-third ' +
        'of an hour wide, then a line with gradient $-16$ back to 0. Total distance is 24 km, not 0.',
      abstract:
        'Times: $\\frac{12}{24} = 0.5$ h, $\\frac{20}{60} = \\frac{1}{3}$ h, $\\frac{12}{16} = 0.75$ h. ' +
        'Average $= \\frac{24}{0.5 + \\frac{1}{3} + 0.75}$.',
    },
    hints: [
      'You are given speeds, not times. Find the time each crossing takes first.',
      'Out: $12 \\div 24 = 0.5$ h. Back: $12 \\div 16 = 0.75$ h. Wait: 20 min $= \\frac{1}{3}$ h.',
      'Total distance is $12 + 12 = 24$ km. Divide by the total time, $0.5 + \\frac{1}{3} + 0.75$ h.',
    ],
    solution:
      'Out: $\\frac{12}{24} = 0.5$ h. Wait: $\\frac{20}{60} = 0.333\\ldots$ h. Back: $\\frac{12}{16} = 0.75$ h. ' +
      'Total time $= 1.5833\\ldots$ h $= \\frac{19}{12}$ h. Total distance $= 24$ km.\n\n' +
      '$$\\text{average speed} = 24 \\div \\frac{19}{12} = \\frac{288}{19} \\approx 15.16 \\text{ km/h}.$$\n\n' +
      'Averaging the two speeds, $(24 + 16) \\div 2 = 20$, is wrong even before the wait: the slow ' +
      'crossing took longer, so it counts for more.',
    misconceptionCodes: ['practical-graphs.average-of-speeds', 'practical-graphs.rest-dropped-from-total-time'],
  },

  // ---- Diagnostics ---------------------------------------------------------
  {
    id: 'practical-graphs.dx-rest-dropped',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 'diagnostic',
    statement:
      'A cyclist rides 30 km in 1.5 hours, rests for 30 minutes, then rides 10 km in 1 hour. ' +
      'What is her average speed for the whole journey?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '16 km/h', misconceptionCode: 'practical-graphs.rest-dropped-from-total-time' },
        { label: 'B', value: '$\\frac{40}{3} \\approx 13.3$ km/h' },
        { label: 'C', value: '15 km/h', misconceptionCode: 'practical-graphs.average-of-speeds' },
      ],
    },
    cpaPrompts: {
      concrete:
        'She set off, and three hours later she arrived. Did the clock stop while she rested? ' +
        'How far did she get in those three hours?',
      pictorial:
        'Draw the graph with its flat middle piece. The start-to-finish line runs across all three ' +
        'hours, not just the two and a half spent riding.',
      abstract:
        'Average speed $= \\frac{30 + 10}{1.5 + 0.5 + 1} = \\frac{40}{3}$. Not $\\frac{40}{2.5}$, and not $\\frac{20 + 10}{2}$.',
    },
    hints: [
      'Total distance over total *elapsed* time. What was the elapsed time from setting off to arriving?',
      'The rest is 0.5 h of elapsed time with 0 km of distance. It belongs in the denominator.',
    ],
    solution:
      'Total distance $= 40$ km; total time $= 1.5 + 0.5 + 1 = 3$ h; average $= \\frac{40}{3} \\approx 13.3$ km/h.\n\n' +
      '16 km/h comes from dropping the rest ($40 \\div 2.5$); 15 km/h from averaging the stage ' +
      'speeds ($\\frac{20 + 10}{2}$).',
    misconceptionCodes: ['practical-graphs.rest-dropped-from-total-time', 'practical-graphs.average-of-speeds'],
  },
  {
    id: 'practical-graphs.dx-average-of-speeds',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 'diagnostic',
    statement:
      'A driver covers 60 km at 60 km/h, stops for 1 hour for lunch, then covers another 60 km ' +
      'at 30 km/h. What is his average speed for the whole trip?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '45 km/h', misconceptionCode: 'practical-graphs.average-of-speeds' },
        { label: 'B', value: '30 km/h' },
        { label: 'C', value: '40 km/h', misconceptionCode: 'practical-graphs.rest-dropped-from-total-time' },
      ],
    },
    cpaPrompts: {
      concrete:
        'How long did the first 60 km take? The second 60 km? Add the lunch hour. Now: 120 km in ' +
        'how many hours?',
      pictorial:
        'Distance–time graph: gradient 60 for 1 h, flat for 1 h, gradient 30 for 2 h. The ' +
        'start-to-finish line spans 4 hours and rises 120 km.',
      abstract:
        'Times: $\\frac{60}{60} = 1$ h, $1$ h, $\\frac{60}{30} = 2$ h. Average $= \\frac{120}{4} = 30$ km/h.',
    },
    hints: [
      'You need the total time. The second leg took longer than the first — how much longer?',
      'Times are 1 h, 1 h and 2 h, so 120 km in 4 h.',
    ],
    solution:
      'Total distance $= 120$ km. Total time $= 1 + 1 + 2 = 4$ h. Average $= 30$ km/h.\n\n45 km/h is ' +
      'the mean of the two speeds, which ignores that the slow leg took twice as long; 40 km/h drops ' +
      'the lunch hour ($120 \\div 3$).',
    misconceptionCodes: ['practical-graphs.average-of-speeds', 'practical-graphs.rest-dropped-from-total-time'],
  },

  // =========================================================================
  // Skill 3 — area under speed–time graphs, and conversion graphs
  // =========================================================================

  // ---- Tier 1 --------------------------------------------------------------
  {
    id: 'practical-graphs.area-under-1',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 1,
    sequence: { family: 'practical-graphs.area-under', position: 1 },
    statement:
      'A car travels at a steady 24 m/s for 12 seconds. Its speed–time graph is a horizontal line ' +
      'at 24. Find the distance travelled, in metres.',
    answer: { type: 'number', value: 288, tolerance: 0, unit: 'm' },
    cpaPrompts: {
      concrete:
        'Every second the car covers 24 metres. There are 12 of those seconds. How far altogether?',
      pictorial:
        'The region under the line is a rectangle 12 wide and 24 tall. Its area is the same ' +
        'multiplication you just did — that is why area under a speed–time graph is distance.',
      abstract: 'Distance $= vt = 24 \\times 12$, the area of the rectangle under the graph.',
    },
    hints: [
      'At a steady speed, distance is speed times time.',
      '$24 \\times 12$. Notice this is the area of the rectangle under the graph.',
    ],
    solution:
      '$$\\text{distance} = 24 \\times 12 = 288 \\text{ m}.$$\n\nOn the graph this is the area of the ' +
      'rectangle with width 12 s and height 24 m/s.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed'],
  },
  {
    id: 'practical-graphs.area-under-2',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 1,
    sequence: { family: 'practical-graphs.area-under', position: 2 },
    expect:
      'The speed now climbs from 0 to 24 instead of staying at 24. The rectangle has become a ' +
      'triangle. Will the distance be more than, less than, or equal to $24 \\times 8$?',
    statement:
      'A car accelerates uniformly from rest to 24 m/s in 8 seconds. Find the distance it ' +
      'travels in those 8 seconds, in metres.',
    answer: { type: 'number', value: 96, tolerance: 0, unit: 'm' },
    cpaPrompts: {
      concrete:
        'For most of those 8 seconds the car was going slower than 24 m/s — at the start it was ' +
        'hardly moving. Could it have covered as much as $24 \\times 8$? About what fraction of that?',
      pictorial:
        'The line runs from $(0, 0)$ to $(8, 24)$. Shade underneath: a right triangle with base 8 ' +
        'and height 24, exactly half of the $8 \\times 24$ rectangle.',
      abstract: 'Distance $= \\tfrac{1}{2} \\times 8 \\times 24$, the area of the triangle under the graph.',
    },
    hints: [
      'The region under the graph is a triangle, not a rectangle. What is its base and height?',
      'Base 8 s, height 24 m/s. Area $= \\frac{1}{2} \\times$ base $\\times$ height.',
      '$\\frac{1}{2} \\times 8 \\times 24$.',
    ],
    solution:
      '$$\\text{distance} = \\tfrac{1}{2} \\times 8 \\times 24 = 96 \\text{ m}.$$\n\nHalf of $24 \\times 8 = 192$, ' +
      'because the average speed while accelerating steadily from 0 to 24 is 12 m/s.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed'],
  },
  {
    id: 'practical-graphs.area-under-speed-time',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 1,
    sequence: { family: 'practical-graphs.area-under', position: 3 },
    expect:
      'The last two items are now joined together, with a braking stage added at the end. The ' +
      'region under the graph is a triangle, a rectangle and a triangle. Predict the total from ' +
      'the pieces you already know.',
    statement:
      'A car accelerates uniformly from rest to 24 m/s in 8 seconds, travels at 24 m/s for 12 ' +
      'seconds, then decelerates uniformly to a stop in 4 seconds. Find the total distance ' +
      'travelled, in metres.',
    answer: { type: 'number', value: 432, tolerance: 0, unit: 'm' },
    cpaPrompts: {
      concrete:
        'During the middle 12 seconds the car is at a steady 24 m/s — how far is that? During ' +
        'the first 8 seconds it was slower than 24 m/s the whole time. Could it have covered as ' +
        'much as $24 \\times 8$?',
      pictorial:
        'Draw the speed–time graph and shade under it. Cut the shaded region into a triangle, a ' +
        'rectangle and a triangle — or see it as one trapezium. What are the parallel sides?',
      abstract:
        'Distance is the area under the speed–time graph: a trapezium with parallel sides 24 s ' +
        'and 12 s and height 24 m/s.',
    },
    hints: [
      'How do you find distance from a speed–time graph? Look at the geometric shape formed under ' +
        'the line.',
      'The region is a trapezium: the bottom is the full 24 seconds, the top is the 12 seconds at ' +
        'constant speed, and the height is 24 m/s.',
      'Use $\\text{Area} = \\frac{1}{2}(a + b)h$ with $a = 24$, $b = 12$ and $h = 24$.',
    ],
    solution:
      'The region under the graph is a trapezium with parallel sides $8 + 12 + 4 = 24$ s and 12 ' +
      's, and height 24 m/s.\n\n$$\\text{Distance} = \\tfrac{1}{2}(24 + 12)(24) = ' +
      '\\tfrac{1}{2}(36)(24) = 432 \\text{ m}.$$\n\nAs a check: triangle $96$ + rectangle $288$ ' +
      '+ triangle $48 = 432$.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed'],
  },
  {
    id: 'practical-graphs.area-under-4',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 1,
    sequence: { family: 'practical-graphs.area-under', position: 4 },
    expect:
      'New numbers, and the shape is a rectangle followed by a triangle with no speeding-up stage. ' +
      'Which piece will be bigger? Estimate the total before you compute it.',
    statement:
      'A train travels at 20 m/s for 10 seconds, then brakes uniformly to a stop in 6 seconds. ' +
      'Find the total distance travelled, in metres.',
    answer: { type: 'number', value: 260, tolerance: 0, unit: 'm' },
    cpaPrompts: {
      concrete:
        'For 10 seconds the train does 20 metres a second. Then it slows: for the next 6 seconds ' +
        'it does *less* than 20 metres a second, ending at 0. Roughly how far in the braking part?',
      pictorial:
        'Shade under the graph: a rectangle 10 wide and 20 tall, then a triangle 6 wide and 20 tall ' +
        'sloping down to the axis. Add the two areas.',
      abstract: 'Distance $= 20 \\times 10 + \\tfrac{1}{2} \\times 6 \\times 20 = 200 + 60$.',
    },
    hints: [
      'Split the region under the graph into two pieces: one for the steady stage, one for the braking stage.',
      'Steady stage: rectangle $20 \\times 10$. Braking: triangle with base 6 and height 20.',
      '$200 + \\frac{1}{2} \\times 6 \\times 20$.',
    ],
    solution:
      'Rectangle: $20 \\times 10 = 200$ m. Triangle: $\\tfrac{1}{2} \\times 6 \\times 20 = 60$ m. ' +
      'Total $= 260$ m.\n\nUsing $20 \\times 16 = 320$ m would assume full speed throughout the braking.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed'],
  },
  {
    id: 'practical-graphs.area-under-5',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 1,
    sequence: { family: 'practical-graphs.area-under', position: 5 },
    expect:
      'A different kind of practical graph: the axes are kilometres and miles, and there is no ' +
      'time at all. It is still a straight line through the origin. What does reading it mean now?',
    statement:
      'The conversion graph shows miles against kilometres. It is a straight line through ' +
      '$(0, 0)$ and $(80, 50)$. Use it to convert 40 km to miles.',
    answer: { type: 'number', value: 25, tolerance: 0.5, unit: 'miles' },
    cpaPrompts: {
      concrete:
        'A signpost says 40 km. On the graph, find 40 on the kilometres axis, go straight up to the ' +
        'line, then straight across to the miles axis. What do you read?',
      pictorial:
        'Draw the vertical from 40 on the horizontal axis to the line, then the horizontal to the ' +
        'vertical axis. 40 is halfway to 80, so the reading is halfway to 50.',
      abstract:
        'The line is miles $= \\frac{50}{80} \\times$ km $= 0.625 \\times$ km. At 40 km: $0.625 \\times 40$.',
    },
    hints: [
      'Start at 40 on the kilometres axis. Go up to the line, then across to the miles axis.',
      '40 km is half of 80 km, so it is half of 50 miles.',
    ],
    solution:
      'The line passes through $(80, 50)$, so 80 km is 50 miles and the gradient is $\\frac{50}{80} = 0.625$ ' +
      'miles per km.\n\n$$40 \\text{ km} = 0.625 \\times 40 = 25 \\text{ miles}.$$',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed'],
    figure: kmMilesFigure,
  },
  {
    id: 'practical-graphs.area-under-6',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 1,
    sequence: { family: 'practical-graphs.area-under', position: 6 },
    expect:
      'Same line, but the question goes the other way: you start with miles, on the vertical ' +
      'axis. Which way will you trace across the graph this time, and will the answer be bigger or smaller than 30?',
    statement:
      'The same conversion graph: a straight line through $(0, 0)$ and $(80, 50)$, with ' +
      'kilometres across and miles up. Use it to convert 30 miles to kilometres.',
    answer: { type: 'number', value: 48, tolerance: 0.5, unit: 'km' },
    cpaPrompts: {
      concrete:
        'Now the known number, 30, is on the miles axis. Go across from 30 to the line, then down ' +
        'to the kilometres axis. A mile is longer than a kilometre, so expect more than 30.',
      pictorial:
        'Draw the horizontal from 30 on the vertical axis to the line, then drop to the horizontal ' +
        'axis. The graph works in both directions; only the starting axis changes.',
      abstract:
        'miles $= 0.625 \\times$ km, so km $= \\frac{\\text{miles}}{0.625} = \\frac{30}{0.625}$. Or: 5 miles is 8 km, and 30 is $6 \\times 5$.',
    },
    hints: [
      'Start on the miles axis this time. Go across to the line, then down.',
      '5 miles is 8 km on this line (since 50 miles is 80 km). How many 5s in 30?',
      '$6 \\times 8$ km.',
    ],
    solution:
      'From $(80, 50)$: 5 miles $= 8$ km. $30 = 6 \\times 5$ miles $= 6 \\times 8 = 48$ km.\n\n' +
      'Or: km $= 30 \\div 0.625 = 48$. One straight line converts both ways; you just start on a ' +
      'different axis.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed'],
    figure: kmMilesFigure,
  },

  // ---- Tier 2 --------------------------------------------------------------
  {
    id: 'practical-graphs.time-from-distance',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 2,
    statement:
      'A motorbike accelerates uniformly from rest to 20 m/s, covering 150 m while it does so. ' +
      'How many seconds does the acceleration take?',
    answer: { type: 'number', value: 15, tolerance: 0, unit: 'seconds' },
    cpaPrompts: {
      concrete:
        'While the speed climbs steadily from 0 to 20, the bike is on average doing 10 m/s. ' +
        'How many seconds at 10 m/s make 150 m?',
      pictorial:
        'The region under the graph is a triangle of height 20 and unknown base $t$. Its area is ' +
        'known to be 150. Write the area and solve for $t$.',
      abstract: '$\\tfrac{1}{2} \\times t \\times 20 = 150 \\implies 10t = 150$.',
    },
    hints: [
      'The distance is the area of a triangle with height 20 and base equal to the time. Write that area with $t$ in it.',
      '$\\frac{1}{2} \\times t \\times 20 = 150$.',
      '$10t = 150$.',
    ],
    solution:
      'Area of the triangle under the graph $= \\tfrac{1}{2} \\times t \\times 20 = 10t$. Set it equal ' +
      'to 150: $10t = 150$, so $t = 15$ seconds.\n\nCheck: 15 s at an average of 10 m/s is 150 m.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed'],
  },
  {
    id: 'practical-graphs.stop-and-wait',
    skillIds: ['practical-graphs.interpret-conversion-practical', 'practical-graphs.construct-interpret-distance-time'],
    tier: 2,
    statement:
      'A cyclist travelling at 8 m/s brakes uniformly to a stop in 4 seconds, then stays stopped ' +
      'at a red light for a further 6 seconds. How far does she travel in the whole 10 seconds, in metres?',
    answer: { type: 'number', value: 16, tolerance: 0, unit: 'm' },
    cpaPrompts: {
      concrete:
        'She is slowing from 8 to 0 over 4 seconds, so on average she is doing 4 m/s during the ' +
        'braking. Then she is not moving at all. Where does all the distance come from?',
      pictorial:
        'The speed–time graph slopes from $(0, 8)$ down to $(4, 0)$ and then runs *along the time ' +
        'axis* to $(10, 0)$. The second part has no area under it.',
      abstract:
        'Distance $= \\tfrac{1}{2} \\times 4 \\times 8 + 6 \\times 0 = 16$ m. A line at speed 0 is ' +
        'the only flat line that means rest.',
    },
    hints: [
      'Split the 10 seconds: 4 seconds of braking and 6 seconds stopped. Which part contributes distance?',
      'Braking: a triangle with base 4 and height 8. Stopped: speed is 0, area is 0.',
      '$\\frac{1}{2} \\times 4 \\times 8$.',
    ],
    solution:
      'Braking triangle: $\\tfrac{1}{2} \\times 4 \\times 8 = 16$ m. Waiting: speed 0 for 6 s, area 0. ' +
      'Total $= 16$ m.\n\n$8 \\times 10 = 80$ m would treat her as riding at full speed the whole time.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed', 'practical-graphs.flat-means-stopped-on-speed-graph'],
  },
  {
    id: 'practical-graphs.temperature-conversion',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 2,
    statement:
      'A conversion graph has degrees Celsius across and degrees Fahrenheit up. It is a straight ' +
      'line through $(0, 32)$ and $(100, 212)$. A recipe says to bake at 68 °F. Use the graph to ' +
      'find this temperature in °C.',
    answer: { type: 'number', value: 20, tolerance: 0.5, unit: '°C' },
    cpaPrompts: {
      concrete:
        'Two thermometers side by side: the Fahrenheit one reads 32 when the Celsius one reads 0, ' +
        'and 212 when it reads 100. The Fahrenheit scale climbs 180 for every 100 on Celsius.',
      pictorial:
        'Start at 68 on the *vertical* axis, go across to the line, and drop to the horizontal ' +
        'axis. Unlike the km–miles line, this one does not pass through the origin.',
      abstract:
        'Gradient $= \\frac{212 - 32}{100} = 1.8$, so $F = 1.8C + 32$. Solve $1.8C + 32 = 68$.',
    },
    hints: [
      'This line does not go through $(0, 0)$ — it starts at 32. Find its gradient from the two points.',
      'Gradient $= \\frac{212 - 32}{100 - 0} = 1.8$. So $F = 1.8C + 32$.',
      'Set $F = 68$: $1.8C = 36$.',
    ],
    solution:
      'Gradient $= \\frac{180}{100} = 1.8$, so the line is $F = 1.8C + 32$. With $F = 68$: ' +
      '$1.8C = 36$, $C = 20$.\n\n68 °F is 20 °C. Reading a line that does not pass through the origin, ' +
      'a doubling of one quantity is not a doubling of the other.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed'],
    figure: {
      kind: 'coordinate_plane',
      title: 'Celsius to Fahrenheit',
      caption: 'Degrees Celsius across, degrees Fahrenheit up. The line passes through (0, 32) and (100, 212).',
      xMin: 0,
      xMax: 100,
      yMin: 0,
      yMax: 220,
      gridStep: 10,
      curves: [{ type: 'linear', m: 1.8, c: 32, label: '°F' }],
      points: [
        { x: 0, y: 32, label: '(0, 32)', highlight: false },
        { x: 100, y: 212, label: '(100, 212)', highlight: false },
      ],
    },
  },

  // ---- Tier 3 --------------------------------------------------------------
  {
    id: 'practical-graphs.fuel-gauge',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 3,
    statement:
      'A car\'s fuel gauge is plotted against distance driven since the tank was filled. It is a ' +
      'straight line from $(0, 40)$, a full 40-litre tank, down to $(240, 10)$ after 240 km. ' +
      'If the driver carries on at the same rate, how many more kilometres can the car go before ' +
      'the tank is empty?',
    answer: { type: 'number', value: 80, tolerance: 0.5, unit: 'km' },
    cpaPrompts: {
      concrete:
        'The car used 30 litres to go 240 km. How far does one litre take it? There are 10 litres ' +
        'left — so how far?',
      pictorial:
        'Extend the line until it hits the distance axis, where fuel is 0. It drops 30 litres over ' +
        '240 km, so it drops the last 10 litres over a third of that.',
      abstract:
        'Gradient $= \\frac{10 - 40}{240} = -\\frac{1}{8}$ litre per km, i.e. 8 km per litre. ' +
        'Remaining $= 10 \\times 8$ km.',
    },
    hints: [
      'How much fuel was used over the 240 km, and how much is left?',
      '30 litres used over 240 km is 8 km per litre. 10 litres remain.',
      '$10 \\times 8$.',
    ],
    solution:
      'Fuel used $= 40 - 10 = 30$ L over 240 km: $240 \\div 30 = 8$ km per litre. Remaining fuel is ' +
      '10 L, so the car can go $10 \\times 8 = 80$ km more.\n\nOn the graph: the line reaches fuel 0 ' +
      'at $240 + 80 = 320$ km.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed'],
  },
  {
    id: 'practical-graphs.exchange-rate',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 3,
    statement:
      'At the airport, a conversion graph for Singapore dollars to Japanese yen is a straight ' +
      'line through $(0, 0)$ and $(100, 11\\,000)$. A souvenir in Tokyo is priced at ¥3 300. ' +
      'How much is that in Singapore dollars?',
    answer: { type: 'number', value: 30, tolerance: 0.05, unit: 'S$' },
    cpaPrompts: {
      concrete:
        'S$100 buys ¥11 000. So S$10 buys how many yen? How many lots of that make ¥3 300?',
      pictorial:
        'The yen amount is on the vertical axis. Go across from 3 300 to the line, then down to ' +
        'the dollar axis. 3 300 is a bit under a third of 11 000.',
      abstract:
        'yen $= 110 \\times$ dollars, so dollars $= \\frac{\\text{yen}}{110} = \\frac{3300}{110}$.',
    },
    hints: [
      'Find the rate from the point $(100, 11\\,000)$: how many yen per dollar?',
      '110 yen per dollar. Divide the price by 110.',
      '$3300 \\div 110$.',
    ],
    solution:
      'Rate $= \\frac{11\\,000}{100} = 110$ yen per S$. Then S$ $= 3300 \\div 110 = 30$.\n\n' +
      'The souvenir costs S$30. Check: $30 \\times 110 = 3300$.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed'],
  },
  {
    id: 'practical-graphs.plumber-charge',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 3,
    statement:
      'A plumber\'s charges are shown on a graph of cost in dollars against hours worked. It is a ' +
      'straight line through $(0, 60)$ and $(3, 180)$. What does she charge for a job that ' +
      'takes 2.5 hours, in dollars?',
    answer: { type: 'number', value: 160, tolerance: 0.5, unit: '$' },
    cpaPrompts: {
      concrete:
        'Before she has done any work at all the bill is already $60 — a call-out fee. After 3 ' +
        'hours it is $180. How much did the 3 hours of work add, and so how much per hour?',
      pictorial:
        'The line starts at height 60 on the cost axis, not at the origin. Its gradient is the ' +
        'hourly rate. Read up from 2.5 on the hours axis.',
      abstract:
        'Gradient $= \\frac{180 - 60}{3} = 40$ dollars per hour. Cost $= 60 + 40h$; at $h = 2.5$, $60 + 100$.',
    },
    hints: [
      'This line does not pass through the origin. What does the $60 at 0 hours represent?',
      'The hourly rate is the gradient: $\\frac{180 - 60}{3 - 0} = 40$ per hour.',
      'Cost $= 60 + 40 \\times 2.5$.',
    ],
    solution:
      'Call-out fee $= 60$ (the intercept). Hourly rate $= \\frac{180 - 60}{3} = 40$ per hour (the ' +
      'gradient). Cost for 2.5 h $= 60 + 40 \\times 2.5 = 60 + 100 = 160$ dollars.\n\nScaling ' +
      '$180$ by $\\frac{2.5}{3}$ would give 150 and is wrong because the fee does not scale.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed'],
  },

  // ---- Diagnostic ----------------------------------------------------------
  {
    id: 'practical-graphs.dx-constant-speed-assumed',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 'diagnostic',
    statement:
      'A car accelerates uniformly from rest to 24 m/s in 8 seconds, holds 24 m/s for 12 seconds, ' +
      'then brakes uniformly to a stop in 4 seconds. How far does it travel altogether?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '576 m', misconceptionCode: 'practical-graphs.constant-speed-assumed' },
        { label: 'B', value: '432 m' },
        { label: 'C', value: '144 m', misconceptionCode: 'practical-graphs.flat-means-stopped-on-speed-graph' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Was the car doing 24 m/s for all 24 seconds? During the first 8 seconds and the last 4 it ' +
        'was slower than that. And during the middle 12 seconds — was it stopped, or at full speed?',
      pictorial:
        'Shade under the graph: a triangle, a rectangle, a triangle. The middle rectangle is the ' +
        'largest piece; the two triangles are each half of a rectangle.',
      abstract:
        'Distance $=$ area $= \\tfrac{1}{2}(8)(24) + 12 \\times 24 + \\tfrac{1}{2}(4)(24) = 96 + 288 + 48$.',
    },
    hints: [
      'Distance is the area under the speed–time graph. Sketch it and look at the shapes.',
      'Triangle $96$, rectangle $288$, triangle $48$. Add them.',
    ],
    solution:
      '$96 + 288 + 48 = 432$ m.\n\n576 m is $24 \\times 24$, full speed for the whole trip. 144 m is ' +
      '$96 + 48$, counting only the sloping parts as though the flat 12 seconds were a stop.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed', 'practical-graphs.flat-means-stopped-on-speed-graph'],
  },

  // =========================================================================
  // Tier 4 — SSDD set: one delivery van, three questions
  // =========================================================================
  {
    id: 'practical-graphs.van-ssdd-acceleration',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 4,
    sequence: { family: 'practical-graphs.van-ssdd', position: 1 },
    statement:
      'A delivery van pulls away from rest and reaches 15 m/s after 10 seconds, speeding up ' +
      'steadily. It holds 15 m/s for 30 seconds, then brakes steadily to a stop in 5 seconds. ' +
      'Find the van\'s acceleration during the first 10 seconds, in m/s².',
    answer: { type: 'number', value: 1.5, tolerance: 0, unit: 'm/s²' },
    cpaPrompts: {
      concrete:
        'The speedometer goes from 0 to 15 in ten seconds, rising the same amount each second. ' +
        'How much per second?',
      pictorial:
        'Sketch the whole speed–time graph: up to $(10, 15)$, across to $(40, 15)$, down to $(45, 0)$. ' +
        'This question is only about the gradient of the first piece.',
      abstract: 'Acceleration $= \\frac{v - u}{t} = \\frac{15 - 0}{10}$.',
    },
    hints: [
      'Acceleration is the gradient of the speed–time graph. Only the first stage matters here.',
      'Rise 15 m/s, run 10 s.',
    ],
    solution:
      '$$a = \\frac{15 - 0}{10} = 1.5 \\text{ m/s}^2.$$\n\nThe braking stage has acceleration ' +
      '$\\frac{0 - 15}{5} = -3$ m/s², twice as sharp.',
    misconceptionCodes: ['practical-graphs.flat-means-stopped-on-speed-graph'],
  },
  {
    id: 'practical-graphs.van-ssdd-distance',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 4,
    sequence: { family: 'practical-graphs.van-ssdd', position: 2 },
    statement:
      'The same delivery van: from rest to 15 m/s in 10 seconds, steady at 15 m/s for 30 seconds, ' +
      'then braking steadily to a stop in 5 seconds. Find the total distance it travels, in metres.',
    answer: { type: 'number', value: 562.5, tolerance: 0, unit: 'm' },
    cpaPrompts: {
      concrete:
        'Only during the middle 30 seconds is the van at full speed. The first 10 and last 5 ' +
        'seconds cover less than full speed would. Is the total more or less than $15 \\times 45$?',
      pictorial:
        'Shade under the graph: triangle (base 10), rectangle (width 30), triangle (base 5), all of ' +
        'height 15. Or one trapezium with parallel sides 45 and 30.',
      abstract:
        'Distance $= \\tfrac{1}{2}(10)(15) + 30 \\times 15 + \\tfrac{1}{2}(5)(15)$, or $\\tfrac{1}{2}(45 + 30)(15)$.',
    },
    hints: [
      'Distance is the area under the speed–time graph. Split it into the three stages.',
      'Triangle $75$, rectangle $450$, triangle $37.5$.',
      'Or use the trapezium: $\\frac{1}{2}(45 + 30) \\times 15$.',
    ],
    solution:
      'Triangle $\\tfrac{1}{2} \\times 10 \\times 15 = 75$; rectangle $30 \\times 15 = 450$; triangle ' +
      '$\\tfrac{1}{2} \\times 5 \\times 15 = 37.5$. Total $= 562.5$ m.\n\nTrapezium check: ' +
      '$\\tfrac{1}{2}(45 + 30)(15) = \\tfrac{1}{2}(75)(15) = 562.5$ m.',
    misconceptionCodes: ['practical-graphs.constant-speed-assumed'],
  },
  {
    id: 'practical-graphs.van-ssdd-average',
    skillIds: ['practical-graphs.calculate-speed-average', 'practical-graphs.interpret-conversion-practical'],
    tier: 4,
    sequence: { family: 'practical-graphs.van-ssdd', position: 3 },
    statement:
      'The same delivery van: from rest to 15 m/s in 10 seconds, steady at 15 m/s for 30 seconds, ' +
      'then braking steadily to a stop in 5 seconds. Find its average speed over the whole ' +
      '45 seconds, in m/s.',
    answer: { type: 'number', value: 12.5, tolerance: 0.01, unit: 'm/s' },
    cpaPrompts: {
      concrete:
        'The van covered a certain distance in 45 seconds. If it had done the same distance at one ' +
        'unchanging speed, what would that speed be? It must be below 15, since 15 was the top speed.',
      pictorial:
        'The area under the graph is 562.5. A rectangle 45 wide with the same area has what ' +
        'height? That height is the average speed.',
      abstract:
        'Average speed $= \\frac{\\text{total distance}}{\\text{total time}} = \\frac{562.5}{45}$. Not ' +
        '$\\frac{0 + 15 + 0}{3}$, and not 15.',
    },
    hints: [
      'You need the total distance first — the area under the whole graph.',
      'Total distance is 562.5 m (triangle 75, rectangle 450, triangle 37.5). Total time is 45 s.',
      '$562.5 \\div 45$.',
    ],
    solution:
      'Total distance $= 75 + 450 + 37.5 = 562.5$ m. Total time $= 45$ s.\n\n$$\\text{average speed} = ' +
      '\\frac{562.5}{45} = 12.5 \\text{ m/s}.$$\n\nThe average is the height of a rectangle 45 wide ' +
      'with the same area as the region under the graph.',
    misconceptionCodes: ['practical-graphs.average-of-speeds', 'practical-graphs.constant-speed-assumed'],
  },
];
