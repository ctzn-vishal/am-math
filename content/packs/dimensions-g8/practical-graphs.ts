import type { Problem, SkillNode } from '@/lib/content/schema';

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

export const practicalGraphsProblems: Problem[] = [
  {
    id: 'practical-graphs.cyclist-average-speed',
    skillIds: ['practical-graphs.calculate-speed-average', 'practical-graphs.construct-interpret-distance-time'],
    tier: 1,
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
    id: 'practical-graphs.car-acceleration',
    skillIds: ['practical-graphs.calculate-speed-average'],
    tier: 1,
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
  },
  {
    id: 'practical-graphs.area-under-speed-time',
    skillIds: ['practical-graphs.interpret-conversion-practical'],
    tier: 2,
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
];
