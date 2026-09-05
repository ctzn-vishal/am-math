import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';

/**
 * Unit 13 — Data Analysis. Hand-authored.
 *
 * Source: docs/Implementation Manual (measuring arm spans and sorting them into interval
 * boxes, folding sorted strips into quarters) and the Chapter 13 worked examples in the
 * content spec.
 *
 * The through-line: every summary statistic is a *position* or a *weight* in an ordered
 * pile of data. The median is the middle strip once the strips are in order; the quartiles
 * are the middles of each half; the grouped mean weights each interval by how many strips
 * are in its box. Sorting first is not a tidy habit, it is where the meaning comes from.
 */

export const dataAnalysisSkills: SkillNode[] = [
  {
    id: 'data-analysis.calculate-interpret-measures',
    title: 'Calculate and interpret measures of central tendency (mean, median, mode) and spread (range, IQR)',
    summary:
      'Find the mean, median and mode of a dataset and say what each is telling you; measure ' +
      'spread with the range and, more robustly, the interquartile range.',
    prerequisites: [],
    cpa: {
      concrete:
        'Each data value cut as a paper strip of that length. Lay them out in order of length ' +
        'and the middle strip is the median — no calculation, just a position. Stack them all ' +
        'end to end and cut the total into equal pieces for the mean. The strip length that ' +
        'appears most often is the mode.',
      pictorial:
        'A dot plot of the values with the median marked as the middle dot and the mean as the ' +
        'balance point of the dots. The range as the span from first dot to last.',
      abstract:
        'Mean $\\bar{x} = \\frac{\\sum x}{n}$; median is the middle value of the *sorted* list ' +
        '(mean of the middle two if $n$ is even); mode is the most frequent. Range $= \\max - ' +
        '\\min$; $\\text{IQR} = Q_3 - Q_1$.',
    },
    formulas: ['\\bar{x} = \\frac{\\sum x}{n}', '\\text{IQR} = Q_3 - Q_1'],
    misconceptions: [
      {
        code: 'data-analysis.median-of-unsorted',
        description:
          'Takes the middle value of the list as written, without sorting, and calls it the ' +
          'median.',
        probe:
          'Lay the strips out in the order the question gives them. Is the strip in the middle ' +
          'position longer than the ones to its left and shorter than the ones to its right? ' +
          'What has to happen first for "middle" to mean anything?',
        correction:
          'The median is the middle of the values in *size order* — half the data below it, half ' +
          'above. The order the numbers arrive in is an accident. Sort first, then count to the ' +
          'middle.',
      },
    ],
    suggestedVisual: 'stat_plot',
  },
  {
    id: 'data-analysis.construct-interpret-five-number',
    title: 'Construct and interpret five-number summaries and box-and-whisker plots',
    summary:
      'Split a sorted dataset into quarters to get the minimum, quartiles, median and maximum, ' +
      'draw them as a box plot, and read the IQR as the width of the box.',
    prerequisites: ['data-analysis.calculate-interpret-measures'],
    cpa: {
      concrete:
        'The sorted strips laid in a row. Fold the row in half to find the median; fold each ' +
        'half in half to find the quartiles. The four folds put a quarter of the strips in each ' +
        'section — the middle two sections are the box, the outer two are the whiskers.',
      pictorial:
        'A box-and-whisker plot above a number line, the five numbers labelled, and the middle ' +
        'half of the data shaded so the IQR is seen as a width rather than a subtraction.',
      abstract:
        'Order the data. $Q_2$ is the median; $Q_1$ the median of the lower half, $Q_3$ of the ' +
        'upper half (excluding the median itself when $n$ is odd). ' +
        '$\\text{IQR} = Q_3 - Q_1$ measures the spread of the middle 50%, unaffected by outliers.',
    },
    formulas: ['\\text{IQR} = Q_3 - Q_1', '\\text{five-number: } \\min, Q_1, Q_2, Q_3, \\max'],
    misconceptions: [
      {
        code: 'data-analysis.quartile-includes-median',
        description:
          'With an odd number of values, includes the median in both halves when finding the ' +
          'quartiles, shifting $Q_1$ and $Q_3$ inward.',
        probe:
          'You have nine strips and the fifth is the median. How many strips are on each side of ' +
          'it? When you fold the lower half, which strips are in that fold — does the fifth belong ' +
          'to it?',
        correction:
          'The median is the divider, not a member of either half. With nine values, the lower ' +
          'half is the four below the median and the upper half the four above; $Q_1$ and $Q_3$ ' +
          'are the medians of those fours.',
      },
    ],
    suggestedVisual: 'stat_plot',
  },
  {
    id: 'data-analysis.calculate-estimated-mean',
    title: 'Calculate an estimated mean for grouped frequency data',
    summary:
      'Estimate the mean of grouped data by standing in each interval\'s midpoint for its ' +
      'values, weighting by frequency, and say why the answer is only an estimate.',
    prerequisites: ['data-analysis.calculate-interpret-measures'],
    cpa: {
      concrete:
        'Arm spans measured and dropped into four sorting boxes labelled by interval. The exact ' +
        'values are now lost — only the box counts remain. To estimate the total, assume every ' +
        'span in a box is at the box\'s middle and multiply by the count in that box. A box with ' +
        '14 strips contributes far more than a box with 6.',
      pictorial:
        'A histogram with the midpoint of each bar marked and the frequency written on it. The ' +
        'mean is the balance point of the bars, pulled toward the taller ones.',
      abstract:
        '$\\bar{x} = \\frac{\\sum f x}{\\sum f}$, with $x$ the class midpoint and $f$ the ' +
        'frequency. It is an estimate because the midpoint stands in for values we no longer ' +
        'know.',
    },
    formulas: ['\\bar{x} \\approx \\frac{\\sum f x}{\\sum f}'],
    misconceptions: [
      {
        code: 'data-analysis.unweighted-midpoints',
        description:
          'Averages the class midpoints — adds the four midpoints and divides by 4 — ignoring ' +
          'that the intervals hold different numbers of students.',
        probe:
          'Fourteen students scored around 65 and only six scored around 55. Should 65 and 55 ' +
          'count the same in the average? How many times should 65 be added in?',
        correction:
          'Each midpoint stands for every student in its interval, so it is counted once per ' +
          'student: multiply by the frequency. $\\sum fx = 2820$ over $\\sum f = 40$ students ' +
          'gives 70.5, weighted toward the crowded intervals.',
      },
    ],
    suggestedVisual: 'stat_plot',
  },
  {
    id: 'data-analysis.identify-scatter-plot',
    title: 'Identify scatter plot correlation patterns',
    summary:
      'Read a scatter plot for positive, negative or no correlation, judge its strength from ' +
      'how tightly the points cluster, and draw a sensible line of best fit.',
    prerequisites: ['data-analysis.calculate-interpret-measures', 'function-graphs.interpret-rate-change'],
    cpa: {
      concrete:
        'Each student measures their arm span and their height and puts a sticker on a wall ' +
        'chart at that pair. Step back: the stickers drift up and to the right. Taller people ' +
        'tend to have longer arms — a tendency, with exceptions, not a rule.',
      pictorial:
        'A scatter plot with a corridor drawn around the cloud of points. A corridor that slopes ' +
        'up is positive correlation, down is negative, and a cloud with no corridor is none. A ' +
        'narrow corridor is strong, a wide one weak. The line of best fit runs down the middle ' +
        'of the corridor with points on both sides.',
      abstract:
        'Correlation describes the direction and strength of a linear trend between two ' +
        'variables. A line of best fit summarises it and can be used to predict within the ' +
        'range of the data — and correlation is not causation.',
    },
    formulas: [],
    misconceptions: [
      {
        code: 'data-analysis.correlation-as-causation',
        description:
          'Reads a positive correlation as one variable causing the other — that longer arms ' +
          'make you taller, or ice-cream sales cause sunburn.',
        probe:
          'Ice-cream sales and sunburn cases rise together every summer. Does eating ice cream ' +
          'burn your skin? What else changes in summer that could push both of them up?',
        correction:
          'Correlation says two things move together; it says nothing about which drives which, ' +
          'or whether a third thing drives both. Here the sun drives both sales and sunburn. ' +
          'A scatter plot shows association, and causation needs a different argument.',
      },
    ],
    suggestedVisual: 'coordinate_plane',
  },
];

// ---------------------------------------------------------------------------
// Shared figures and context strings
// ---------------------------------------------------------------------------

/** The eight puzzle times the first variation sequence reads six ways. */
const PUZZLE_EIGHT = '$4, 6, 8, 8, 12, 14, 16, 20$';

const PUZZLE_CONCRETE =
  'Cut a paper strip for each time — 4 cm, 6 cm, 8 cm, 8 cm, 12 cm, 14 cm, 16 cm, 20 cm — and lay ' +
  'them out shortest to longest. Which measurement does this question ask you to read off that row?';

const puzzleDotPlot: Problem['figure'] = {
  kind: 'stat_plot',
  plot: 'dot',
  title: 'Eight puzzle times',
  axisLabel: 'minutes',
  caption: 'One dot per student, placed at the number of minutes that student took.',
  values: [4, 6, 8, 8, 12, 14, 16, 20],
};

const puzzleOutlierDotPlot: Problem['figure'] = {
  kind: 'stat_plot',
  plot: 'dot',
  title: 'The same eight times, with one changed',
  axisLabel: 'minutes',
  caption: 'The dot that sat at 20 has moved out to 100. Every other dot is exactly where it was.',
  values: [4, 6, 8, 8, 12, 14, 16, 100],
};

/** Ten points on the same axes, five times over, with only the spread and slope changing. */
function scatter(
  title: string,
  caption: string,
  points: { x: number; y: number }[],
): Problem['figure'] {
  return {
    kind: 'coordinate_plane',
    title,
    caption,
    xMin: 0,
    xMax: 11,
    yMin: 0,
    yMax: 11,
    gridStep: 1,
    points,
  };
}

const SCATTER_CONCRETE =
  'Picture the wall chart: every student put one sticker on it, across for the first measurement ' +
  'and up for the second. Stand back from the ten stickers. Do they drift up, drift down, or sit ' +
  'in no particular direction at all?';

export const dataAnalysisProblems: Problem[] = [
  // =========================================================================
  // Skill 1 — mean, median, mode, range
  // =========================================================================

  // ---- Tier 1: one pile of data, six measurements, then an outlier --------
  {
    id: 'data-analysis.median-five-sorted',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 1,
    sequence: { family: 'data-analysis.centre-spread', position: 1 },
    statement:
      'Five students solved a puzzle. Their times, in minutes, are already in order:\n\n' +
      '$$4, \\; 6, \\; 8, \\; 12, \\; 20.$$\n\nFind the median time.',
    answer: { type: 'number', value: 8, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Cut five paper strips, 4 cm, 6 cm, 8 cm, 12 cm and 20 cm long, and lay them out in that ' +
        'order. Put a finger on each end of the row and walk the fingers inwards one strip at a ' +
        'time. Which strip do they meet on?',
      pictorial:
        'Mark the five times as dots on a number line from 0 to 20. Cover the smallest dot and the ' +
        'largest dot, then the next pair. Which single dot is left uncovered?',
      abstract:
        'With $n = 5$ the median sits at position $\\frac{n + 1}{2} = 3$ in the sorted list. Count ' +
        'along to the 3rd value.',
    },
    hints: [
      'The median is the value in the middle position once the data is in order. This list is already in order.',
      'There are five values, so two sit below the median and two sit above it. Count in to the 3rd value.',
    ],
    solution:
      'The list is already sorted, and there are five values, so two lie on each side of the ' +
      'middle one.\n\nWith $n = 5$ the median is the 3rd value:\n\n$$Q_2 = 8 \\text{ minutes}.$$\n\n' +
      'Check: 4 and 6 are below it, ' +
      '12 and 20 are above it — two on each side, as a median must have.',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
  },
  {
    id: 'data-analysis.median-five-shuffled',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 1,
    sequence: { family: 'data-analysis.centre-spread', position: 2 },
    expect:
      'Exactly the same five times, but written in the order the students finished rather than in ' +
      'size order. Predict: will the median change, stay the same, or is it impossible to say yet?',
    statement:
      'The same five students, with their times now listed in the order they handed the puzzle in:\n\n' +
      '$$12, \\; 4, \\; 20, \\; 8, \\; 6.$$\n\nFind the median time.',
    answer: { type: 'number', value: 8, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Lay the five strips out in the order the question gives them: 12, 4, 20, 8, 6. Is the ' +
        'middle strip of that row longer than everything on its left? What must you do to the row first?',
      pictorial:
        'Plot the five dots on a number line. The number line puts them in size order for you, ' +
        'whatever order they were written in. Which dot is in the middle now?',
      abstract:
        'Sort first: $4, 6, 8, 12, 20$. Only then does "position 3" mean anything. The median is a ' +
        'position in the *sorted* list, not in the list as written.',
    },
    hints: [
      'The order the times were written down in is an accident of who finished first. Sort them before you look for a middle.',
      'Sorted, the five times are $4, 6, 8, 12, 20$. Which is the 3rd?',
    ],
    solution:
      'Sorted: $4, 6, 8, 12, 20$. With $n = 5$ the median is the 3rd value, $8$ minutes — the same ' +
      'as before.\n\nThe median did not change, because it depends only on *which* times were ' +
      'recorded, not on the order they were written in. What did change is that you had to sort ' +
      'first: the middle of the list as written is 20, which is nobody\'s idea of a typical time.',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
  },
  {
    id: 'data-analysis.median-nine-values',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 1,
    sequence: { family: 'data-analysis.centre-spread', position: 3 },
    expect:
      'Still a jumbled list, but there are nine values now instead of five. Before you sort: which ' +
      'position will the middle one be — the 4th, the 5th, or between two of them?',
    statement: 'Find the median of the dataset $3, 7, 8, 5, 12, 14, 21, 13, 18$.',
    answer: { type: 'number', value: 12, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Cut a strip for each number and lay them out shortest to longest. Which strip is in the ' +
        'middle, with the same number on each side of it?',
      pictorial:
        'Draw a dot plot of the nine values on a number line. Count in from both ends at once ' +
        'until you meet. Which dot is that?',
      abstract:
        'Sort the data ascending; with $n = 9$ the median is the 5th value.',
    },
    hints: [
      'Always sort the dataset from least to greatest before looking for the middle.',
      'There are nine values, so the median is the 5th one in the sorted list. Count to it.',
    ],
    solution:
      'Sorted: $3, 5, 7, 8, 12, 13, 14, 18, 21$. With $n = 9$ the median is the 5th value:\n\n' +
      '$$Q_2 = 12.$$\n\n(The unsorted list happens to have 12 in the middle too — a coincidence ' +
      'that would not survive on the quartiles.)',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
  },
  {
    id: 'data-analysis.median-eight-values',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 1,
    sequence: { family: 'data-analysis.centre-spread', position: 4 },
    expect:
      'A new class, and this time there are eight times, an even number. Predict: with eight values ' +
      'in order, is there a single strip in the middle, or will you have to do something else?',
    statement:
      'Eight students in another class solved the same puzzle. Their times in minutes, in order, ' +
      'were\n\n$$' + '4, \\; 6, \\; 8, \\; 8, \\; 12, \\; 14, \\; 16, \\; 20.$$\n\nFind the median time.',
    answer: { type: 'number', value: 10, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete: PUZZLE_CONCRETE,
      pictorial:
        'On the dot plot, cover the outermost pair of dots, then the next pair, then the next. You ' +
        'are left with two dots, at 8 and 12. Where is the point exactly halfway between them?',
      abstract:
        'With $n = 8$ there is no single middle position. The median is the mean of the 4th and 5th ' +
        'values: $\\frac{8 + 12}{2}$.',
    },
    hints: [
      'Eight values means no single middle one. Which two values are in the middle?',
      'The 4th value is 8 and the 5th is 12. The median is halfway between them.',
      'Halfway between 8 and 12 is $\\frac{8 + 12}{2}$.',
    ],
    solution:
      'With $n = 8$ the two middle values are the 4th and the 5th, which are $8$ and $12$.\n\n' +
      '$$Q_2 = \\frac{8 + 12}{2} = 10 \\text{ minutes}.$$\n\nNotice that 10 is not one of the ' +
      'recorded times. A median does not have to be a value in the data — it is the point that ' +
      'splits the data in half, and here four times fall below 10 and four above it.',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
    figure: puzzleDotPlot,
  },
  {
    id: 'data-analysis.mean-eight-values',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 1,
    sequence: { family: 'data-analysis.centre-spread', position: 5 },
    expect:
      'The same eight times as last time. Only the measure has changed, from median to mean. ' +
      'Predict: will the mean come out above 10, below 10, or exactly at 10?',
    statement:
      'The same eight puzzle times, in minutes:\n\n$$' + '4, \\; 6, \\; 8, \\; 8, \\; 12, \\; 14, ' +
      '\\; 16, \\; 20.$$\n\nFind the mean time.',
    answer: { type: 'number', value: 11, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Tape the eight strips end to end into one long strip, then fold that long strip into eight ' +
        'equal pieces. How long is one piece? That length is the mean — everybody\'s time shared out equally.',
      pictorial:
        'Think of the dot plot as weights on a ruler. The mean is where you would put your finger ' +
        'to balance it. Is that balance point at 10, or pulled off it by the 20?',
      abstract:
        '$\\bar{x} = \\frac{\\sum x}{n}$, so add all eight times and divide by 8. Here $\\sum x = 88$.',
    },
    hints: [
      'The mean shares the total out equally. Start by adding all eight times together.',
      '$4 + 6 + 8 + 8 + 12 + 14 + 16 + 20 = 88$.',
      'Now divide the total by how many students there were: $88 \\div 8$.',
    ],
    solution:
      'Total time $= 4 + 6 + 8 + 8 + 12 + 14 + 16 + 20 = 88$ minutes, shared between 8 students.\n\n' +
      '$$\\bar{x} = \\frac{88}{8} = 11 \\text{ minutes}.$$\n\nThe mean, 11, sits just above the ' +
      'median, 10. Every single time is used in the mean, so the long 20-minute time pulls it ' +
      'upwards; the median only cared about the two values in the middle.',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
    figure: puzzleDotPlot,
  },
  {
    id: 'data-analysis.mode-eight-values',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 1,
    sequence: { family: 'data-analysis.centre-spread', position: 6 },
    expect:
      'Same eight times again, and the measure changes once more — now the mode. Predict: which ' +
      'feature of the dot plot will the answer come from, the middle or a stack of dots?',
    statement:
      'The same eight puzzle times, in minutes:\n\n$$' + '4, \\; 6, \\; 8, \\; 8, \\; 12, \\; 14, ' +
      '\\; 16, \\; 20.$$\n\nFind the mode.',
    answer: { type: 'number', value: 8, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Sort the eight strips into piles, one pile per length. Seven of the piles have a single ' +
        'strip in them. Which pile has two, and what length are those strips?',
      pictorial:
        'On the dot plot, look for the tallest stack of dots rather than the middle of the row. ' +
        'Above which number are there two dots instead of one?',
      abstract:
        'The mode is the most frequently occurring value. Count how many times each value appears ' +
        'and take the value with the highest count.',
    },
    hints: [
      'The mode is about how often a value appears, not about where it sits. Which time was recorded twice?',
      'Every time appears once except one of them. Look for the repeat.',
    ],
    solution:
      'Counting: 4 appears once, 6 once, **8 twice**, 12 once, 14 once, 16 once, 20 once.\n\nThe ' +
      'mode is $8$ minutes.\n\nThe mode is the only one of the three averages that must be an actual ' +
      'data value, and the only one that would still make sense if the data were colours or shoe ' +
      'brands rather than numbers.',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
    figure: puzzleDotPlot,
  },
  {
    id: 'data-analysis.range-eight-values',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 1,
    sequence: { family: 'data-analysis.centre-spread', position: 7 },
    expect:
      'Same eight times once more, but the question has switched from a centre to a spread. ' +
      'Predict: will the answer come from the middle of the row of strips, or from its two ends?',
    statement:
      'The same eight puzzle times, in minutes:\n\n$$' + '4, \\; 6, \\; 8, \\; 8, \\; 12, \\; 14, ' +
      '\\; 16, \\; 20.$$\n\nFind the range.',
    answer: { type: 'number', value: 16, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Hold up the shortest strip against the longest strip. How much longer is the long one? ' +
        'That difference is the range, and none of the strips in between affect it at all.',
      pictorial:
        'On the dot plot, measure the distance along the axis from the first dot to the last dot. ' +
        'That whole span is the range.',
      abstract:
        'Range $= \\max - \\min = 20 - 4$. It measures spread, not centre, so it answers a ' +
        'different question from the mean and the median.',
    },
    hints: [
      'The range measures how spread out the data is. Which two values does it use?',
      'The fastest time was 4 minutes and the slowest was 20 minutes. Subtract.',
    ],
    solution:
      '$$\\text{range} = \\max - \\min = 20 - 4 = 16 \\text{ minutes}.$$\n\nThe range uses only the ' +
      'two end values, so it is easy to find and easy to fool: change any of the six times in ' +
      'between and the range does not move at all, while one unusually slow student changes it ' +
      'completely.',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
    figure: puzzleDotPlot,
  },
  {
    id: 'data-analysis.median-with-outlier',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 1,
    sequence: { family: 'data-analysis.centre-spread', position: 8 },
    expect:
      'One value has changed: the student who took 20 minutes actually took 100. Nothing else has ' +
      'moved. Predict what that does to the median — a lot, a little, or nothing at all?',
    statement:
      'The slowest student\'s time was recorded wrongly. She took 100 minutes, not 20. The eight ' +
      'times are now\n\n$$4, \\; 6, \\; 8, \\; 8, \\; 12, \\; 14, \\; 16, \\; 100.$$\n\nFind the ' +
      'median time.',
    answer: { type: 'number', value: 10, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Swap the 20 cm strip for a 100 cm one and lay the row out again. The long strip is still ' +
        'the last one in the row. Which two strips are in the middle now — the same two as before?',
      pictorial:
        'On the new dot plot, the far-right dot has slid out to 100 but every other dot is where it ' +
        'was. Cover the outer pairs again. Which two dots are left?',
      abstract:
        'The median depends only on the *positions* of the 4th and 5th values, which are still 8 ' +
        'and 12. Making the largest value larger cannot change which values sit in the middle.',
    },
    hints: [
      'Sort the new list. Does the 100 change which values sit in the 4th and 5th positions?',
      'The middle two are still 8 and 12.',
      'Median $= \\frac{8 + 12}{2}$, exactly as before.',
    ],
    solution:
      'Sorted, the times are $4, 6, 8, 8, 12, 14, 16, 100$. The 4th and 5th values are still $8$ ' +
      'and $12$, so\n\n$$Q_2 = \\frac{8 + 12}{2} = 10 \\text{ minutes},$$\n\nexactly what it was ' +
      'before the correction. The median only asks *how many* values are above and below, never ' +
      '*how far* above. That is what makes it resistant to a single extreme value.',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
    figure: puzzleOutlierDotPlot,
  },
  {
    id: 'data-analysis.mean-with-outlier',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 1,
    sequence: { family: 'data-analysis.centre-spread', position: 9 },
    expect:
      'The same corrected list, and the same switch from median to mean you made at item 5. The ' +
      'median did not budge from 10. Predict: will the mean stay at 11, or will the 100 drag it up?',
    statement:
      'The corrected times, in minutes, are\n\n$$4, \\; 6, \\; 8, \\; 8, \\; 12, \\; 14, \\; 16, ' +
      '\\; 100.$$\n\nFind the mean time.',
    answer: { type: 'number', value: 21, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Tape the strips end to end again, but with the 100 cm strip in place of the 20 cm one. The ' +
        'whole strip is 80 cm longer than before. Fold it into eight equal pieces — how much longer ' +
        'is each piece now?',
      pictorial:
        'Put your finger on the ruler where the dots would balance. With one heavy dot far out at ' +
        '100, the balance point has to slide right, past every dot but one.',
      abstract:
        'The total rises from $88$ to $88 - 20 + 100 = 168$, while $n$ is still 8, so ' +
        '$\\bar{x} = \\frac{168}{8}$. Every value enters the mean, so a change of $+80$ in one value ' +
        'moves the mean by $\\frac{80}{8} = 10$.',
    },
    hints: [
      'Find the new total. The old total was 88; one value went up by 80.',
      'New total $= 88 - 20 + 100 = 168$. There are still 8 students.',
      '$168 \\div 8$.',
    ],
    solution:
      'New total $= 4 + 6 + 8 + 8 + 12 + 14 + 16 + 100 = 168$ minutes.\n\n' +
      '$$\\bar{x} = \\frac{168}{8} = 21 \\text{ minutes}.$$\n\n**The pattern this sequence was ' +
      'built for.** One value changed, and:\n\n- the median stayed at 10 minutes;\n- the mean ' +
      'almost doubled, from 11 to 21.\n\nThe mean shares the total out, so every extra minute is ' +
      'spread across all eight students — $80$ extra minutes moved it by $\\frac{80}{8} = 10$. The ' +
      'median only counts positions, so it did not move at all. When one value is far from the ' +
      'rest, the median describes a typical student and the mean describes nobody: 21 minutes is ' +
      'longer than seven of the eight times.',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
    figure: puzzleOutlierDotPlot,
  },

  // ---- Tier 2: unfamiliar surfaces ----------------------------------------
  {
    id: 'data-analysis.missing-value-from-mean',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 2,
    statement:
      'The mean of the five numbers $7, \\; 9, \\; x, \\; 12, \\; 14$ is $11$. Find $x$.',
    answer: { type: 'number', value: 13, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Five strips must share out equally to 11 cm each, so the whole taped-together strip has to ' +
        'be $5 \\times 11$ cm long. Four of the strips are already cut. How long is the piece left over?',
      pictorial:
        'Draw a bar of length 55 split into five equal parts of 11. Now draw the four known values ' +
        'inside it: 7, 9, 12 and 14. What length of bar is still uncovered?',
      abstract:
        'The mean is $\\frac{\\sum x}{n}$, so $\\sum x = \\bar{x} \\times n = 11 \\times 5$. Then ' +
        '$x = 55 - (7 + 9 + 12 + 14)$.',
    },
    hints: [
      'You know the mean and how many values there are. What must the total of all five be?',
      'Total $= 11 \\times 5 = 55$. Add up the four numbers you can see.',
      '$7 + 9 + 12 + 14 = 42$, so $x = 55 - 42$.',
    ],
    solution:
      'If the mean of five numbers is 11, their total is $11 \\times 5 = 55$.\n\nThe four known ' +
      'numbers add to $7 + 9 + 12 + 14 = 42$, so\n\n$$x = 55 - 42 = 13.$$\n\nCheck: ' +
      '$\\frac{7 + 9 + 13 + 12 + 14}{5} = \\frac{55}{5} = 11$. ✓',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
  },
  {
    id: 'data-analysis.mean-frequency-table',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 2,
    statement:
      'A team\'s goals in its last 20 matches are recorded in a frequency table.\n\n' +
      '| Goals scored | 0 | 1 | 2 | 3 | 4 |\n| --- | --- | --- | --- | --- | --- |\n' +
      '| Number of matches | 4 | 6 | 7 | 2 | 1 |\n\nFind the mean number of goals per match.',
    answer: { type: 'number', value: 1.5, tolerance: 0, unit: 'goals' },
    cpaPrompts: {
      concrete:
        'Lay out 20 counters, one per match, in five piles: four piles worth 0 goals, six worth 1, ' +
        'seven worth 2, two worth 3, one worth 4. How many goals are on the table altogether, and ' +
        'how many matches are they shared between?',
      pictorial:
        'Draw a bar chart with a bar of height 4 above 0, height 6 above 1, and so on. The mean is ' +
        'the point along the bottom axis where the bars would balance.',
      abstract:
        'This is not a list of 5 numbers, it is a list of 20. Use $\\bar{x} = \\frac{\\sum fx}{\\sum f}$ ' +
        'with $f$ the number of matches and $x$ the goals.',
    },
    hints: [
      'There are 20 matches here, not 5 columns. Each value has to be counted once for every match it happened in.',
      'Multiply each number of goals by how many matches scored it: $0 \\times 4$, $1 \\times 6$, $2 \\times 7$, $3 \\times 2$, $4 \\times 1$.',
      'The goals total $0 + 6 + 14 + 6 + 4 = 30$. Divide by the 20 matches.',
    ],
    solution:
      '$\\sum fx = (0)(4) + (1)(6) + (2)(7) + (3)(2) + (4)(1) = 0 + 6 + 14 + 6 + 4 = 30$ goals, ' +
      'scored across $\\sum f = 4 + 6 + 7 + 2 + 1 = 20$ matches.\n\n' +
      '$$\\bar{x} = \\frac{30}{20} = 1.5 \\text{ goals per match}.$$\n\nAdding the five goal ' +
      'figures and dividing by 5 would give 2 — but that pretends each column stands for one match, ' +
      'when the 2-goal column stands for seven of them.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
  },
  {
    id: 'data-analysis.which-measure-cafe',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 2,
    statement:
      'A café records the price of every drink it sold today. Almost all of them cost between ' +
      '\\$3 and \\$5, but one customer bought a \\$120 bottle of champagne. The owner wants a single ' +
      'figure for "the price of a typical drink here". Which average should she use — the mean, ' +
      'the median or the mode?',
    answer: {
      type: 'exact',
      value: 'median',
      accepts: ['the median', 'median price', 'the median price', 'use the median', 'median or mode'],
    },
    cpaPrompts: {
      concrete:
        'Line up a paper strip for every drink sold, then add one enormous 120 cm strip at the end. ' +
        'Which measurement of that row still describes the strips a customer actually holds?',
      pictorial:
        'On a dot plot, a tight cluster of dots between 3 and 5 with one lone dot far out at 120. ' +
        'Which summary would sit inside the cluster, and which would be dragged out towards the lone dot?',
      abstract:
        'The mean uses every value, so a single extreme value shifts it. The median uses only ' +
        'positions, so it stays inside the cluster. Choose the measure whose answer a customer would recognise.',
    },
    hints: [
      'One drink cost 25 times more than any other. Which of the three averages would that single price change the most?',
      'The mean adds every price into one total, so the \\$120 is shared across all the drinks. The median only counts how many prices lie on each side.',
    ],
    solution:
      'The **median**.\n\nThe \\$120 champagne is an outlier. The mean adds it into the total and ' +
      'shares it out, so it lifts the "typical" price above anything most customers paid. The median ' +
      'only asks how many prices lie above and below, so one extreme price moves it by at most one ' +
      'position and it stays inside the \\$3–\\$5 cluster, where the real drinks are.\n\n(The mode ' +
      'would also stay in the cluster and is a reasonable second choice; the mean is the one to avoid.)',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
  },

  // ---- Tier 3: applied ----------------------------------------------------
  {
    id: 'data-analysis.shoe-order',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 3,
    statement:
      'A shop owner is deciding what to order for next month. She writes down the size of every ' +
      'pair of trainers she sold today:\n\n$$6, \\; 7, \\; 7, \\; 8, \\; 8, \\; 8, \\; 8, \\; 9, ' +
      '\\; 9, \\; 10.$$\n\nShe can only order extra stock in one size. Which size should she order?',
    answer: { type: 'number', value: 8, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Put every pair she sold into a box labelled with its size: a box for 6s, for 7s, and so ' +
        'on. Which box emptied fastest today? That is the box she needs to refill.',
      pictorial:
        'Draw a bar chart of sizes against pairs sold. She should reorder the size with the tallest ' +
        'bar, not the size in the middle of the axis.',
      abstract:
        'The question is "which value occurs most often", so it asks for the mode. A mean size of ' +
        '8.1 would be no use — she cannot order a tenth of a size.',
    },
    hints: [
      'She needs the size that most customers actually asked for. Count how many pairs went out in each size.',
      'Sizes sold: one 6, two 7s, four 8s, two 9s, one 10.',
    ],
    solution:
      'Counting the sales: size 6 once, size 7 twice, **size 8 four times**, size 9 twice, size 10 ' +
      'once.\n\nShe should order **size 8** — the mode.\n\nThe mean size is ' +
      '$\\frac{80}{10} = 8$ here as well, but that is luck; a mean of 8.1 or 7.6 would be useless, ' +
      'because shops stock whole sizes. When the answer has to be one of the values that actually ' +
      'occurred, the mode is the measure that answers the question.',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
  },
  {
    id: 'data-analysis.wage-fairness',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 3,
    statement:
      'Seven people work at a small design studio. Their yearly pay, in thousands of dollars, is\n\n' +
      '$$24, \\; 26, \\; 27, \\; 28, \\; 30, \\; 32, \\; 176.$$\n\nThe owner (who is paid \\$176 000) ' +
      'advertises a job with the line "average pay here is \\$49 000". A job applicant wants one ' +
      'figure that better describes what a new designer would earn. What figure should she use, in ' +
      'thousands of dollars?',
    answer: { type: 'number', value: 28, tolerance: 0, unit: 'thousand dollars' },
    cpaPrompts: {
      concrete:
        'Cut a strip for each salary, six of them roughly a quarter of a metre and one nearly two ' +
        'metres. Lay them in order. Which strip would a new designer actually be handed?',
      pictorial:
        'On a dot plot, six dots huddle between 24 and 32 and one sits far away at 176. Mark where ' +
        '49 falls. Is there a single person paid anything close to it?',
      abstract:
        'The advertised 49 is $\\frac{343}{7}$, the mean. The applicant wants a figure that half the ' +
        'staff are above and half below, which is the middle value of the sorted list.',
    },
    hints: [
      'Check the advertised figure first: is anyone actually paid \\$49 000? How many are paid less?',
      'Six of the seven salaries are below \\$49 000, so that figure describes nobody. Try a measure that ignores how far away the owner\'s salary is.',
      'The list is already in order and there are seven salaries. Which one sits in the middle?',
    ],
    solution:
      'The advertised average is the mean: $\\frac{24 + 26 + 27 + 28 + 30 + 32 + 176}{7} = ' +
      '\\frac{343}{7} = 49$. It is arithmetically correct and completely misleading — six of the ' +
      'seven people earn less than \\$33 000.\n\nWith $n = 7$ the middle value is the 4th:\n\n' +
      '$$Q_2 = 28 \\text{ (thousand dollars)}.$$\n\nSo a new designer should expect around ' +
      '\\$28 000. The owner\'s salary drags the mean up by about \\$21 000 on its own; it moves the ' +
      'median not at all.',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
  },

  // ---- Diagnostic ---------------------------------------------------------
  {
    id: 'data-analysis.dx-median-of-unsorted',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 'diagnostic',
    statement:
      'In its nine matches this season a netball team scored\n\n' +
      '$$2, \\; 0, \\; 3, \\; 1, \\; 0, \\; 2, \\; 0, \\; 5, \\; 1$$\n\ngoals. Find the median ' +
      'number of goals.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '0 goals', misconceptionCode: 'data-analysis.median-of-unsorted' },
        { label: 'B', value: '1 goal' },
        { label: 'C', value: '2 goals', misconceptionCode: 'data-analysis.unweighted-midpoints' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Put out one counter for each match, stacked above its score: three counters above 0, two ' +
        'above 1, two above 2, one above 3, one above 5. Now count the matches in from each end. ' +
        'Where do you meet?',
      pictorial:
        'Draw the nine scores as dots on a number line from 0 to 5. Three dots stack above 0. Count ' +
        'dots, not columns, until you reach the fifth one.',
      abstract:
        'Sort the nine scores, then take the value in position $\\frac{9 + 1}{2} = 5$. Repeats each ' +
        'occupy their own position — a score of 0 that happened three times fills three places in the list.',
    },
    hints: [
      'The scores are in the order the matches were played. What has to happen before "the middle" means anything?',
      'Sorted, the nine scores are $0, 0, 0, 1, 1, 2, 2, 3, 5$. Count along to the 5th.',
    ],
    solution:
      'Sorted: $0, 0, 0, 1, 1, 2, 2, 3, 5$. With $n = 9$ the median is the 5th value, ' +
      '$\\mathbf{1}$ goal.\n\nThe two wrong answers each come from a specific slip. **0** is the ' +
      'middle of the list *as written* — the fifth match played, not the fifth smallest score. ' +
      '**2** comes from listing the different scores that occurred ($0, 1, 2, 3, 5$) and taking the ' +
      'middle of those five, which throws away the fact that 0 happened three times and 1 twice. ' +
      'Every match counts once, repeats included.',
    misconceptionCodes: ['data-analysis.median-of-unsorted', 'data-analysis.unweighted-midpoints'],
  },

  {
    id: 'data-analysis.iqr-nine-values',
    skillIds: ['data-analysis.construct-interpret-five-number', 'data-analysis.calculate-interpret-measures'],
    tier: 1,
    sequence: { family: 'data-analysis.five-number', position: 1 },
    statement:
      'Find the interquartile range of the dataset $3, 7, 8, 5, 12, 14, 21, 13, 18$.',
    answer: { type: 'number', value: 10, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'With the strips in order, the middle one is the median. Now fold the four strips below ' +
        'it in half, and the four above it in half. Where do those two folds land?',
      pictorial:
        'Sketch a box plot: mark the median, then the middle of each half as the ends of the box. ' +
        'How wide is the box?',
      abstract:
        'Sort, find $Q_2$, then $Q_1$ as the median of the lower half and $Q_3$ of the upper ' +
        'half, excluding the median. $\\text{IQR} = Q_3 - Q_1$.',
    },
    hints: [
      'Sort the data first. Find the median, then split the remaining values into a lower half ' +
        'and an upper half — the median itself belongs to neither.',
      'Find the median of each half: the lower half is $3, 5, 7, 8$ and the upper half is ' +
        '$13, 14, 18, 21$. Each has an even count, so average the middle two.',
      '$Q_1 = 6$ and $Q_3 = 16$. Subtract.',
    ],
    solution:
      'Sorted: $3, 5, 7, 8, 12, 13, 14, 18, 21$. Median $Q_2 = 12$. Lower half $3, 5, 7, 8$ ' +
      'gives $Q_1 = \\frac{5 + 7}{2} = 6$; upper half $13, 14, 18, 21$ gives $Q_3 = \\frac{14 + ' +
      '18}{2} = 16$.\n\n$$\\text{IQR} = 16 - 6 = 10.$$',
    misconceptionCodes: ['data-analysis.quartile-includes-median', 'data-analysis.median-of-unsorted'],
  },
  {
    id: 'data-analysis.five-number-nine',
    skillIds: ['data-analysis.construct-interpret-five-number'],
    tier: 1,
    sequence: { family: 'data-analysis.five-number', position: 2 },
    expect:
      'The same nine numbers as the last item, but now report all five summary values rather than ' +
      'just their middle two subtracted. Predict: which two of the five did you already work out?',
    statement:
      'For the dataset $3, 7, 8, 5, 12, 14, 21, 13, 18$, write down the five-number summary: the ' +
      'minimum, $Q_1$, the median, $Q_3$ and the maximum. Give the five values.',
    answer: { type: 'set', values: [3, 6, 12, 16, 21], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay the nine strips out in size order. The two ends of the row are the minimum and the ' +
        'maximum. Fold the row in half for the median, then fold each half in half again. Read off ' +
        'the five values those folds and ends mark.',
      pictorial:
        'Sketch the box plot: two whisker ends and three lines making the box. Each of the five ' +
        'numbers is one of those marks on the number line.',
      abstract:
        'Sorted: $3, 5, 7, 8, 12, 13, 14, 18, 21$. $\\min$ and $\\max$ are the ends; $Q_2$ is the ' +
        '5th value; $Q_1$ and $Q_3$ are the medians of the four values below and the four above.',
    },
    hints: [
      'Sort the nine values first, then find the median. The minimum and maximum are simply the two ends.',
      'Sorted: $3, 5, 7, 8, 12, 13, 14, 18, 21$, so $Q_2 = 12$. The lower half is $3, 5, 7, 8$ and the upper half is $13, 14, 18, 21$ — the median itself belongs to neither.',
      '$Q_1 = \\frac{5 + 7}{2}$ and $Q_3 = \\frac{14 + 18}{2}$.',
    ],
    solution:
      'Sorted: $3, 5, 7, 8, 12, 13, 14, 18, 21$.\n\n- $\\min = 3$\n- lower half $3, 5, 7, 8$, so ' +
      '$Q_1 = \\frac{5 + 7}{2} = 6$\n- $Q_2 = 12$ (the 5th value)\n- upper half $13, 14, 18, 21$, ' +
      'so $Q_3 = \\frac{14 + 18}{2} = 16$\n- $\\max = 21$\n\nFive-number summary: ' +
      '$3, \\; 6, \\; 12, \\; 16, \\; 21$.\n\nThe IQR you found last time, $16 - 6 = 10$, is the ' +
      'width of the box these five numbers draw.',
    misconceptionCodes: ['data-analysis.quartile-includes-median'],
  },
  {
    id: 'data-analysis.five-number-eight',
    skillIds: ['data-analysis.construct-interpret-five-number'],
    tier: 1,
    sequence: { family: 'data-analysis.five-number', position: 3 },
    expect:
      'A new class, and this time there are eight marks, an even number, already in order. Predict: ' +
      'with no single middle mark, how many marks will end up in the lower half?',
    statement:
      'Eight students sat a test marked out of 25. Their marks, in order, were\n\n' +
      '$$2, \\; 4, \\; 6, \\; 8, \\; 10, \\; 14, \\; 16, \\; 18.$$\n\nWrite down the five-number ' +
      'summary: the minimum, $Q_1$, the median, $Q_3$ and the maximum.',
    answer: { type: 'set', values: [2, 5, 9, 15, 18], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay eight strips in a row and fold it in half. The fold falls *between* two strips, at 8 ' +
        'and 10 — that is the median. Now fold each half of four in half again: those folds fall ' +
        'between strips too.',
      pictorial:
        'Draw the eight marks as dots from 0 to 25. Split them into two groups of four, then split ' +
        'each group of four into two pairs. Each split point is one of the quartiles.',
      abstract:
        'With $n = 8$: $Q_2 = \\frac{4\\text{th} + 5\\text{th}}{2}$; the lower half is the first ' +
        'four marks and the upper half the last four, and each quartile is the mean of that half\'s middle pair.',
    },
    hints: [
      'Eight values split cleanly into a lower four and an upper four — no value is left over to be "the middle".',
      'Median $= \\frac{8 + 10}{2} = 9$. The lower half is $2, 4, 6, 8$ and the upper half is $10, 14, 16, 18$.',
      '$Q_1 = \\frac{4 + 6}{2}$ and $Q_3 = \\frac{14 + 16}{2}$.',
    ],
    solution:
      'With $n = 8$ there is no middle mark, so the halves are exactly four and four.\n\n' +
      '- $\\min = 2$\n- lower half $2, 4, 6, 8$, so $Q_1 = \\frac{4 + 6}{2} = 5$\n- ' +
      '$Q_2 = \\frac{8 + 10}{2} = 9$\n- upper half $10, 14, 16, 18$, so $Q_3 = \\frac{14 + 16}{2} = 15$\n' +
      '- $\\max = 18$\n\nSummary: $2, \\; 5, \\; 9, \\; 15, \\; 18$, and $\\text{IQR} = 15 - 5 = 10$.',
    misconceptionCodes: ['data-analysis.quartile-includes-median'],
  },
  {
    id: 'data-analysis.five-number-nine-spine',
    skillIds: ['data-analysis.construct-interpret-five-number'],
    tier: 1,
    sequence: { family: 'data-analysis.five-number', position: 4 },
    expect:
      'One more student has joined the class and scored 20, so $n$ goes from 8 to 9. Predict: will ' +
      'the median still fall between two marks, or land on one?',
    statement:
      'A ninth student joins the class and scores 20. The marks are now\n\n' +
      '$$2, \\; 4, \\; 6, \\; 8, \\; 10, \\; 14, \\; 16, \\; 18, \\; 20.$$\n\nWrite down the ' +
      'five-number summary.',
    answer: { type: 'set', values: [2, 5, 10, 17, 20], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Nine strips in a row. Fold it in half and the fold lands *on* the fifth strip. Pull that ' +
        'strip out and set it on the fold line — it is the divider. Four strips are left on each side.',
      pictorial:
        'Nine dots on the axis. The 5th dot is the median. Ring the four dots to its left and the ' +
        'four to its right; the median dot belongs to neither ring.',
      abstract:
        'With $n = 9$, $Q_2$ is the 5th value. The lower half is the four values *below* it and the ' +
        'upper half the four *above* it; the median is excluded from both.',
    },
    hints: [
      'Nine values now, so there is a single middle one. Which position is it?',
      'The 5th value is 10, so $Q_2 = 10$. The lower half is $2, 4, 6, 8$ and the upper half is $14, 16, 18, 20$ — the 10 goes in neither.',
      '$Q_1 = \\frac{4 + 6}{2}$ and $Q_3 = \\frac{16 + 18}{2}$.',
    ],
    solution:
      '- $\\min = 2$\n- $Q_2 = 10$, the 5th of nine values\n- lower half $2, 4, 6, 8$, so ' +
      '$Q_1 = \\frac{4 + 6}{2} = 5$\n- upper half $14, 16, 18, 20$, so $Q_3 = \\frac{16 + 18}{2} = 17$\n' +
      '- $\\max = 20$\n\nSummary: $2, \\; 5, \\; 10, \\; 17, \\; 20$.\n\nCompared with the eight ' +
      'marks, $Q_1$ has not moved at all — the new mark landed in the upper half, so only the ' +
      'median and $Q_3$ shifted.',
    misconceptionCodes: ['data-analysis.quartile-includes-median'],
  },
  {
    id: 'data-analysis.five-number-ten',
    skillIds: ['data-analysis.construct-interpret-five-number'],
    tier: 1,
    sequence: { family: 'data-analysis.five-number', position: 5 },
    expect:
      'A tenth student scores 22, so $n = 10$ — even again, but with five in each half instead of ' +
      'four. Predict: will $Q_1$ now be a mark somebody actually scored, or a halfway point?',
    statement:
      'A tenth student joins and scores 22. The marks are now\n\n' +
      '$$2, \\; 4, \\; 6, \\; 8, \\; 10, \\; 14, \\; 16, \\; 18, \\; 20, \\; 22.$$\n\nWrite down ' +
      'the five-number summary.',
    answer: { type: 'set', values: [2, 6, 12, 18, 22], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Ten strips. The half-fold falls between the 5th and 6th strips. Each half is now a row of ' +
        'five, so folding a half in half lands *on* its middle strip rather than between two.',
      pictorial:
        'Ten dots. Split them 5 and 5 at the middle, then find the middle dot of each group of five. ' +
        'Those middle dots are $Q_1$ and $Q_3$.',
      abstract:
        'With $n = 10$: $Q_2 = \\frac{5\\text{th} + 6\\text{th}}{2}$; each half holds five values, ' +
        'so $Q_1$ is the 3rd value and $Q_3$ is the 8th.',
    },
    hints: [
      'Ten values split into a lower five and an upper five. Find the median first.',
      '$Q_2 = \\frac{10 + 14}{2} = 12$. The lower half is $2, 4, 6, 8, 10$ and the upper half is $14, 16, 18, 20, 22$.',
      'Each half has an odd count, so its median is a single value: the 3rd of each five.',
    ],
    solution:
      '- $\\min = 2$\n- $Q_2 = \\frac{10 + 14}{2} = 12$\n- lower half $2, 4, 6, 8, 10$ (five ' +
      'values), so $Q_1 = 6$\n- upper half $14, 16, 18, 20, 22$, so $Q_3 = 18$\n- $\\max = 22$\n\n' +
      'Summary: $2, \\; 6, \\; 12, \\; 18, \\; 22$.\n\nWith an even $n$ the median is a halfway ' +
      'point, but each half then has an odd count, so the quartiles are real marks. The parity ' +
      'keeps swapping over.',
    misconceptionCodes: ['data-analysis.quartile-includes-median'],
  },
  {
    id: 'data-analysis.five-number-eleven',
    skillIds: ['data-analysis.construct-interpret-five-number'],
    tier: 1,
    sequence: { family: 'data-analysis.five-number', position: 6 },
    expect:
      'One last student scores 24, making $n = 11$. You have now done $n = 8, 9, 10$. Predict, ' +
      'before you work anything out, how many marks will sit in each half this time.',
    statement:
      'An eleventh student joins and scores 24. The marks are now\n\n' +
      '$$2, \\; 4, \\; 6, \\; 8, \\; 10, \\; 14, \\; 16, \\; 18, \\; 20, \\; 22, \\; 24.$$\n\n' +
      'Write down the five-number summary.',
    answer: { type: 'set', values: [2, 6, 14, 20, 24], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Eleven strips. The fold lands on the 6th; lift it out as the divider and five strips are ' +
        'left on each side. Fold each five in half and the fold lands on its 3rd strip.',
      pictorial:
        'Eleven dots. Ring the median dot, then the five dots on each side of it. The middle dot of ' +
        'each ring is a quartile.',
      abstract:
        'With $n = 11$: $Q_2$ is the 6th value; each half has five values, so $Q_1$ is the 3rd and ' +
        '$Q_3$ is the 9th of the whole list.',
    },
    hints: [
      'Eleven values, so there is a single middle one. $\\frac{11 + 1}{2} = 6$: take the 6th.',
      '$Q_2 = 14$. The lower half is $2, 4, 6, 8, 10$ and the upper half is $16, 18, 20, 22, 24$.',
      'Each half has five values, so each quartile is the 3rd of its half.',
    ],
    solution:
      '- $\\min = 2$\n- $Q_2 = 14$, the 6th of eleven values\n- lower half $2, 4, 6, 8, 10$, so ' +
      '$Q_1 = 6$\n- upper half $16, 18, 20, 22, 24$, so $Q_3 = 20$\n- $\\max = 24$\n\nSummary: ' +
      '$2, \\; 6, \\; 14, \\; 20, \\; 24$.\n\n**The pattern this sequence was built for.** Across ' +
      'the four sizes the recipe never changed — sort, split at the median, take the middle of each ' +
      'half — but the *parity* did:\n\n| $n$ | median | values in each half | $Q_1$ |\n' +
      '| --- | --- | --- | --- |\n| 8 | between the 4th and 5th | 4 | halfway between two marks |\n' +
      '| 9 | the 5th | 4 | halfway between two marks |\n| 10 | between the 5th and 6th | 5 | a real mark |\n' +
      '| 11 | the 6th | 5 | a real mark |\n\nWhen $n$ is odd the median is a data value and is ' +
      'excluded from both halves; when $n$ is even it is a halfway point and nothing is excluded. ' +
      'Either way, each half must hold exactly a quarter of the data.',
    misconceptionCodes: ['data-analysis.quartile-includes-median'],
  },

  // ---- Tier 2: unfamiliar surfaces ----------------------------------------
  {
    id: 'data-analysis.read-box-plot',
    skillIds: ['data-analysis.construct-interpret-five-number'],
    tier: 2,
    statement:
      'The box plot shows the number of minutes 60 passengers waited for a bus. Find the ' +
      'interquartile range of the waiting times.',
    answer: { type: 'number', value: 15, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Hold a ruler against the box — not the whiskers, just the box. The length you measure is ' +
        'the answer, because the box is exactly the middle half of the 60 passengers.',
      pictorial:
        'Read the number under the left edge of the box and the number under the right edge. The ' +
        'IQR is the distance between those two readings.',
      abstract:
        'The box runs from $Q_1$ to $Q_3$, so $\\text{IQR} = Q_3 - Q_1 = 35 - 20$. The whisker ends ' +
        'give the minimum and maximum and play no part.',
    },
    hints: [
      'The IQR is the width of the box. Which two of the five marked values are the edges of the box?',
      'The box runs from $Q_1 = 20$ to $Q_3 = 35$. Subtract.',
    ],
    solution:
      'The five marks on the plot are $\\min = 12$, $Q_1 = 20$, $Q_2 = 26$, $Q_3 = 35$, ' +
      '$\\max = 48$.\n\n$$\\text{IQR} = Q_3 - Q_1 = 35 - 20 = 15 \\text{ minutes}.$$\n\nSo the ' +
      'middle 30 passengers all waited within a 15-minute band, even though the full range was ' +
      '$48 - 12 = 36$ minutes. The box is narrow and the right whisker long: a few passengers ' +
      'waited far longer than most.',
    misconceptionCodes: ['data-analysis.quartile-includes-median'],
    figure: {
      kind: 'stat_plot',
      plot: 'box',
      title: 'Waiting times for 60 passengers',
      axisLabel: 'minutes',
      caption: 'The box holds the middle half of the passengers; the whiskers reach the shortest and longest waits.',
      summary: { min: 12, q1: 20, median: 26, q3: 35, max: 48 },
      highlightIqr: true,
    },
  },
  {
    id: 'data-analysis.outlier-fence',
    skillIds: ['data-analysis.construct-interpret-five-number'],
    tier: 2,
    statement:
      'For a set of readings, $Q_1 = 24$ and $Q_3 = 40$. A reading counts as an outlier if it lies ' +
      'more than $1.5 \\times \\text{IQR}$ above $Q_3$, or more than $1.5 \\times \\text{IQR}$ ' +
      'below $Q_1$. Four readings are checked: $5, \\; 18, \\; 52, \\; 66$. Which one is an outlier?',
    answer: { type: 'number', value: 66, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Draw the box on a long strip of paper from 24 to 40, then measure one and a half box-widths ' +
        'out from each edge and draw a fence there. Which of the four readings lands outside a fence?',
      pictorial:
        'Sketch the number line with the box from 24 to 40 and two fences at 0 and 64. Mark the four ' +
        'readings. Three sit inside the fences.',
      abstract:
        '$\\text{IQR} = 40 - 24 = 16$, so $1.5 \\times \\text{IQR} = 24$. Fences at ' +
        '$Q_1 - 24 = 0$ and $Q_3 + 24 = 64$.',
    },
    hints: [
      'Work out the IQR first, then one and a half times it.',
      '$\\text{IQR} = 16$ and $1.5 \\times 16 = 24$. Now find the two fences: $24 - 24$ and $40 + 24$.',
      'The fences are at 0 and 64. Which reading lies outside that interval?',
    ],
    solution:
      '$\\text{IQR} = 40 - 24 = 16$, so $1.5 \\times \\text{IQR} = 24$.\n\n- Lower fence: ' +
      '$24 - 24 = 0$\n- Upper fence: $40 + 24 = 64$\n\nChecking: $5 > 0$ ✓, $18 > 0$ ✓, ' +
      '$52 < 64$ ✓, but $66 > 64$ ✗.\n\nThe outlier is $\\mathbf{66}$. Note that 5 looks extreme ' +
      'next to a box running from 24 to 40, but the rule does not call it one — a low reading has ' +
      'to get below 0 to qualify, and readings like these cannot.',
    misconceptionCodes: ['data-analysis.quartile-includes-median'],
  },
  {
    id: 'data-analysis.draw-from-summary',
    skillIds: ['data-analysis.construct-interpret-five-number'],
    tier: 2,
    statement:
      'You are drawing a box plot from the five-number summary\n\n$$\\min = 5, \\quad Q_1 = 11, ' +
      '\\quad Q_2 = 14, \\quad Q_3 = 23, \\quad \\max = 30.$$\n\nHow long is the whisker on the ' +
      'right of the box?',
    answer: { type: 'number', value: 7, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Mark the five values along a metre rule with pegs. The right whisker is the piece of string ' +
        'you would run from the peg at 23 to the peg at 30. How long is it?',
      pictorial:
        'Sketch the plot: whisker from 5 to 11, box from 11 to 23 with a line at 14, whisker from 23 ' +
        'to 30. Measure the last piece.',
      abstract:
        'The right whisker runs from $Q_3$ to the maximum, so its length is $\\max - Q_3 = 30 - 23$.',
    },
    hints: [
      'Which two of the five numbers are the ends of the right-hand whisker?',
      'It runs from $Q_3 = 23$ out to $\\max = 30$. Subtract.',
    ],
    solution:
      'The right whisker joins $Q_3$ to the maximum:\n\n$$30 - 23 = 7.$$\n\nWorth comparing the ' +
      'four pieces: left whisker $11 - 5 = 6$, left half-box $14 - 11 = 3$, right half-box ' +
      '$23 - 14 = 9$, right whisker $7$. Each piece holds a quarter of the data, so the short ' +
      'left half-box means a quarter of the values are packed between 11 and 14, while another ' +
      'quarter is spread over 14 to 23.',
    misconceptionCodes: ['data-analysis.quartile-includes-median'],
  },

  // ---- Tier 3: applied ----------------------------------------------------
  {
    id: 'data-analysis.two-classes-spread',
    skillIds: ['data-analysis.construct-interpret-five-number'],
    tier: 3,
    statement:
      'Two classes sat the same paper. Their marks are summarised below.\n\n' +
      '| | lowest | $Q_1$ | middle | $Q_3$ | highest |\n| --- | --- | --- | --- | --- | --- |\n' +
      '| Class A | 12 | 18 | 24 | 30 | 44 |\n| Class B | 20 | 22 | 30 | 42 | 46 |\n\n' +
      'A teacher wants the class whose middle half of marks is bunched most tightly together, so ' +
      'that one lesson can suit most of them. Which class is it?',
    answer: {
      type: 'exact',
      value: 'Class A',
      accepts: ['A', 'class a', 'a', 'Class A is more bunched', 'A (Class A)'],
    },
    cpaPrompts: {
      concrete:
        'Cut two paper strips, one running from 18 to 30 and one from 22 to 42 on the same scale. ' +
        'Each strip covers half the students in its class. Which strip is shorter?',
      pictorial:
        'Draw both box plots one above the other on the same axis. Compare the widths of the two ' +
        'boxes — not the whiskers, and not where the boxes sit.',
      abstract:
        'The width of the box is $Q_3 - Q_1$. Class A: $30 - 18 = 12$. Class B: $42 - 22 = 20$. ' +
        'The smaller width is the tighter middle half.',
    },
    hints: [
      'Half of each class lies between that class\'s $Q_1$ and $Q_3$. How wide is that band for each class?',
      'Class A: from 18 to 30. Class B: from 22 to 42. Work out both widths and compare.',
      'Class A spans 12 marks and Class B spans 20.',
    ],
    solution:
      'The middle half of a class lies between $Q_1$ and $Q_3$, so compare those widths:\n\n' +
      '- Class A: $30 - 18 = 12$ marks\n- Class B: $42 - 22 = 20$ marks\n\n**Class A** — its ' +
      'middle half is squeezed into 12 marks against Class B\'s 20.\n\nThe full ranges tell a ' +
      'different story: Class A spans $44 - 12 = 32$ marks and Class B only $46 - 20 = 26$, so ' +
      'judging by range alone would pick the wrong class. The range is decided by two students; ' +
      'the box is decided by half of them.',
    misconceptionCodes: ['data-analysis.quartile-includes-median'],
  },
  {
    id: 'data-analysis.rainfall-two-months',
    skillIds: ['data-analysis.construct-interpret-five-number'],
    tier: 3,
    statement:
      'A weather station summarises its daily rainfall readings, in mm, for two months.\n\n' +
      '| | lowest | $Q_1$ | middle | $Q_3$ | highest |\n| --- | --- | --- | --- | --- | --- |\n' +
      '| January | 0 | 2 | 5 | 9 | 20 |\n| July | 1 | 6 | 14 | 27 | 40 |\n\n' +
      'For each month, take the band of readings that the middle half of the days fall into. How ' +
      'much wider, in mm, is July\'s band than January\'s?',
    answer: { type: 'number', value: 14, tolerance: 0, unit: 'mm' },
    cpaPrompts: {
      concrete:
        'Cut one strip from 2 to 9 and another from 6 to 27 on the same scale. Lay the shorter on ' +
        'the longer and see how much sticks out. That overhang is the answer.',
      pictorial:
        'Draw the two box plots on one axis. Compare the widths of the boxes and find the difference.',
      abstract:
        'The middle half of the days lies between $Q_1$ and $Q_3$. January: $9 - 2 = 7$. July: ' +
        '$27 - 6 = 21$. The difference is $21 - 7$.',
    },
    hints: [
      'Half of each month\'s days fall between that month\'s $Q_1$ and $Q_3$. Find that width for each month.',
      'January: $9 - 2 = 7$ mm. July: $27 - 6 = 21$ mm.',
      'Now subtract the two widths.',
    ],
    solution:
      'The middle half of the days runs from $Q_1$ to $Q_3$:\n\n- January: $9 - 2 = 7$ mm\n' +
      '- July: $27 - 6 = 21$ mm\n\n$$21 - 7 = 14 \\text{ mm wider in July}.$$\n\nJuly is not just ' +
      'wetter, it is far less predictable: its middle half is three times as spread out. A single ' +
      '40 mm storm day would have shown up in the range, but the boxes show that July\'s ordinary ' +
      'days vary too.',
    misconceptionCodes: ['data-analysis.quartile-includes-median'],
  },

  // ---- Diagnostic ---------------------------------------------------------
  {
    id: 'data-analysis.dx-quartile-includes-median',
    skillIds: ['data-analysis.construct-interpret-five-number'],
    tier: 'diagnostic',
    statement:
      'Nine students\' scores, already written in order, are\n\n$$2, \\; 4, \\; 6, \\; 6, \\; 9, ' +
      '\\; 10, \\; 12, \\; 12, \\; 15.$$\n\nFind the lower quartile, $Q_1$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$Q_1 = 4$', misconceptionCode: 'data-analysis.unweighted-midpoints' },
        { label: 'B', value: '$Q_1 = 5$' },
        { label: 'C', value: '$Q_1 = 6$', misconceptionCode: 'data-analysis.quartile-includes-median' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Lay nine strips in order and lift out the 5th — the median — and hold it up as the divider. ' +
        'How many strips are left on the table to its left? Fold just those in half.',
      pictorial:
        'Nine dots in a row. Ring the middle dot and set it aside, then look only at the dots to its ' +
        'left. Where is the middle of that group?',
      abstract:
        'The median is a divider, not a member of either half. With $n = 9$ the lower half is the ' +
        'four values below the 5th, and $Q_1$ is the median of those four.',
    },
    hints: [
      'The 5th value, 9, is the median. Does it belong to the lower half, the upper half, or neither?',
      'The lower half is $2, 4, 6, 6$ — four values. Their median is the mean of the middle two.',
    ],
    solution:
      'The median is the 5th value, $9$. It divides the other eight into a lower half $2, 4, 6, 6$ ' +
      'and an upper half $10, 12, 12, 15$, and belongs to neither.\n\n' +
      '$$Q_1 = \\frac{4 + 6}{2} = \\mathbf{5}.$$\n\nThe wrong answers: **6** comes from counting ' +
      'the median into the lower half as well, giving $2, 4, 6, 6, 9$ and picking its middle value ' +
      '— that puts five of the nine values in a "half", which cannot be right. **4** comes from ' +
      'working with the seven *different* scores $2, 4, 6, 9, 10, 12, 15$ instead of all nine, ' +
      'which throws away the fact that 6 and 12 each happened twice; repeats occupy their own ' +
      'positions in the list.',
    misconceptionCodes: ['data-analysis.quartile-includes-median', 'data-analysis.unweighted-midpoints'],
  },

  // =========================================================================
  // Skill 3 — estimated mean of grouped data
  // =========================================================================

  // ---- Tier 1 -------------------------------------------------------------
  {
    id: 'data-analysis.grouped-mean-three',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 1,
    sequence: { family: 'data-analysis.grouped-mean', position: 1 },
    statement:
      'Twenty parcels were weighed and their masses grouped.\n\n' +
      '| Mass $m$ (kg) | $0 \\le m < 10$ | $10 \\le m < 20$ | $20 \\le m < 30$ |\n' +
      '| --- | --- | --- | --- |\n| Number of parcels | 4 | 10 | 6 |\n\n' +
      'Calculate an estimate of the mean mass.',
    answer: { type: 'number', value: 16, tolerance: 0, unit: 'kg' },
    cpaPrompts: {
      concrete:
        'Three sorting boxes hold the parcels; the individual masses have been thrown away. If ' +
        'every parcel in the middle box weighed exactly 15 kg, what would those ten parcels weigh ' +
        'altogether? Do the same for the other two boxes.',
      pictorial:
        'Draw three bars of heights 4, 10 and 6. Mark the midpoint of each bar\'s interval — 5, 15, ' +
        '25 — and ask where the three bars would balance. Nearer 15 or nearer 25?',
      abstract:
        'Take the midpoint of each interval as the value of every parcel in it, then ' +
        '$\\bar{x} \\approx \\frac{\\sum fx}{\\sum f}$ with $x = 5, 15, 25$ and $f = 4, 10, 6$.',
    },
    hints: [
      'The exact masses are gone. What single number best stands in for every parcel in the interval $0 \\le m < 10$?',
      'The midpoints are 5, 15 and 25. Multiply each by the number of parcels in its interval.',
      '$5 \\times 4 = 20$, $15 \\times 10 = 150$, $25 \\times 6 = 150$. Add these, then divide by 20.',
    ],
    solution:
      'Midpoints: $5$, $15$, $25$.\n\n$\\sum fx = (5)(4) + (15)(10) + (25)(6) = 20 + 150 + 150 = ' +
      '320$ kg, over $\\sum f = 20$ parcels.\n\n$$\\bar{x} \\approx \\frac{320}{20} = 16 \\text{ kg}.$$\n\n' +
      'It is an *estimate*: the true total is somewhere between $0 \\times 4 + 10 \\times 10 + ' +
      '20 \\times 6 = 220$ kg and $10 \\times 4 + 20 \\times 10 + 30 \\times 6 = 420$ kg, and the ' +
      'midpoint assumption puts it in the middle of that.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
  },
  {
    id: 'data-analysis.grouped-mean-shift',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 1,
    sequence: { family: 'data-analysis.grouped-mean', position: 2 },
    expect:
      'Only one number has changed: the heaviest interval now holds 16 parcels instead of 6. The ' +
      'intervals and their midpoints are untouched. Predict: will the estimate rise, fall or stay at 16?',
    statement:
      'A second lorry-load is weighed. The intervals are the same, but there are far more heavy ' +
      'parcels.\n\n| Mass $m$ (kg) | $0 \\le m < 10$ | $10 \\le m < 20$ | $20 \\le m < 30$ |\n' +
      '| --- | --- | --- | --- |\n| Number of parcels | 4 | 10 | 16 |\n\n' +
      'Calculate an estimate of the mean mass.',
    answer: { type: 'number', value: 19, tolerance: 0, unit: 'kg' },
    cpaPrompts: {
      concrete:
        'The same three boxes, but the heavy box now holds sixteen parcels instead of six. Ten more ' +
        'parcels at about 25 kg each have joined the pile. Does the shared-out mass go up or down?',
      pictorial:
        'Redraw the bars: 4, 10, 16. The tall bar has moved from the middle to the right-hand end, ' +
        'so the balance point must slide to the right.',
      abstract:
        'Only $f$ changes: $\\bar{x} \\approx \\frac{(5)(4) + (15)(10) + (25)(16)}{4 + 10 + 16}$. ' +
        'Both the top and the bottom of the fraction change, so the answer is not simply 16 plus something.',
    },
    hints: [
      'The midpoints are still 5, 15 and 25 — only the frequencies moved. Recompute both the total mass and the number of parcels.',
      '$\\sum fx = 20 + 150 + 400 = 570$ and $\\sum f = 30$.',
      '$570 \\div 30$.',
    ],
    solution:
      '$\\sum fx = (5)(4) + (15)(10) + (25)(16) = 20 + 150 + 400 = 570$ kg over $\\sum f = 30$ ' +
      'parcels.\n\n$$\\bar{x} \\approx \\frac{570}{30} = 19 \\text{ kg}.$$\n\nThe estimate rose ' +
      'from 16 kg to 19 kg because the heavy interval now carries more than half the parcels. The ' +
      'midpoints did not change at all — the *weighting* did, and that is what a grouped mean is for.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
  },
  {
    id: 'data-analysis.grouped-mean-scores',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 1,
    sequence: { family: 'data-analysis.grouped-mean', position: 3 },
    expect:
      'A fourth interval has appeared, and the context is test scores rather than parcel masses. ' +
      'Does one extra interval change the recipe, or just add one more product to the total?',
    statement:
      'The test scores of 40 students were grouped as follows:\n\n' +
      '- $50 \\le x < 60$: 6 students\n- $60 \\le x < 70$: 14 students\n' +
      '- $70 \\le x < 80$: 12 students\n- $80 \\le x < 90$: 8 students\n\n' +
      'Calculate an estimate of the mean score.',
    answer: { type: 'number', value: 70.5, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The exact scores are gone — only the box counts are left. If every one of the 14 ' +
        'students in the 60s scored right in the middle of that box, what would their scores ' +
        'add up to? Do the same for each box.',
      pictorial:
        'Draw the histogram. Mark the midpoint of each bar and write its frequency on it. Where ' +
        'would the bars balance — nearer 55 or nearer 65, given how tall those bars are?',
      abstract:
        'Midpoints 55, 65, 75, 85; $\\bar{x} = \\frac{\\sum fx}{\\sum f}$.',
    },
    hints: [
      'You do not know the exact scores in each interval, so what single number best represents ' +
        'each one? Find the midpoints.',
      'Multiply each midpoint by its frequency, then add those four products together.',
      'Divide the total, $2820$, by the total number of students, 40.',
    ],
    solution:
      'Midpoints 55, 65, 75, 85. Products: $55 \\times 6 = 330$, $65 \\times 14 = 910$, ' +
      '$75 \\times 12 = 900$, $85 \\times 8 = 680$. $\\sum fx = 2820$ and $\\sum f = 40$.\n\n' +
      '$$\\bar{x} \\approx \\frac{2820}{40} = 70.5.$$',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
  },
  {
    id: 'data-analysis.grouped-mean-unequal',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 1,
    sequence: { family: 'data-analysis.grouped-mean', position: 4 },
    expect:
      'One thing has changed and it is not the recipe: the intervals are no longer all the same ' +
      'width. Predict — does the midpoint of an interval still stand in for the values inside it?',
    statement:
      'Twenty patients\' waiting times at a clinic were recorded.\n\n' +
      '| Time $t$ (min) | $0 \\le t < 5$ | $5 \\le t < 15$ | $15 \\le t < 35$ |\n' +
      '| --- | --- | --- | --- |\n| Number of patients | 8 | 10 | 2 |\n\n' +
      'Calculate an estimate of the mean waiting time.',
    answer: { type: 'number', value: 8.5, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Three boxes again, but this time the boxes are different sizes: one catches a 5-minute ' +
        'span, one a 10-minute span, one a 20-minute span. Where is the middle of each box? Halfway ' +
        'between its two ends, however far apart they are.',
      pictorial:
        'Mark each interval on a number line and put a cross at its centre: 2.5, 10 and 25. The ' +
        'crosses are no longer evenly spaced, but each is still the middle of its own interval.',
      abstract:
        'Midpoint $= \\frac{\\text{lower end} + \\text{upper end}}{2}$ for each interval separately: ' +
        '$2.5$, $10$, $25$. Then $\\bar{x} \\approx \\frac{\\sum fx}{\\sum f}$ as before.',
    },
    hints: [
      'Find each interval\'s midpoint from its own two ends. The intervals do not have to be the same width for that to work.',
      'Midpoints: $\\frac{0 + 5}{2} = 2.5$, $\\frac{5 + 15}{2} = 10$, $\\frac{15 + 35}{2} = 25$.',
      '$\\sum fx = 2.5 \\times 8 + 10 \\times 10 + 25 \\times 2 = 170$. Divide by 20.',
    ],
    solution:
      'Midpoints: $2.5$, $10$, $25$ — each one halfway between its own interval\'s ends.\n\n' +
      '$\\sum fx = (2.5)(8) + (10)(10) + (25)(2) = 20 + 100 + 50 = 170$ minutes over ' +
      '$\\sum f = 20$ patients.\n\n$$\\bar{x} \\approx \\frac{170}{20} = 8.5 \\text{ minutes}.$$\n\n' +
      'Unequal widths change nothing about the method. What they do change is how much guessing ' +
      'each midpoint is doing: a patient in $15 \\le t < 35$ could be 20 minutes away from the ' +
      'midpoint we assigned them, while one in $0 \\le t < 5$ can be at most 2.5 minutes away.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
  },
  {
    id: 'data-analysis.grouped-mean-histogram',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 1,
    sequence: { family: 'data-analysis.grouped-mean', position: 5 },
    expect:
      'The intervals are back to equal widths, but the frequencies are drawn as bars instead of ' +
      'written in a table. Predict: what will you have to do before you can start multiplying?',
    statement:
      'The histogram shows how long 20 pupils spent on their homework, in minutes. Read the ' +
      'frequencies from the bars and calculate an estimate of the mean time.',
    answer: { type: 'number', value: 14.5, tolerance: 0, unit: 'minutes' },
    cpaPrompts: {
      concrete:
        'Imagine the 20 pupils queuing at three doors, one per interval, and the bar heights ' +
        'telling you how many chose each door. Send everyone at the first door to stand at the ' +
        '5-minute mark, and so on. How many pupil-minutes altogether?',
      pictorial:
        'Read the height of each bar off the vertical axis, then write the midpoint of its interval ' +
        'on the bar: 5 on the first, 15 on the second, 25 on the third.',
      abstract:
        'The histogram *is* the frequency table. Recover $f = 6, 9, 5$ and $x = 5, 15, 25$, then ' +
        'apply $\\bar{x} \\approx \\frac{\\sum fx}{\\sum f}$.',
    },
    hints: [
      'Turn the histogram back into a table first: how tall is each bar, and what interval does it cover?',
      'The bars give frequencies 6, 9 and 5 for the intervals $0$–$10$, $10$–$20$ and $20$–$30$.',
      '$\\sum fx = 5 \\times 6 + 15 \\times 9 + 25 \\times 5 = 290$, and $\\sum f = 20$.',
    ],
    solution:
      'Reading the bars: $0 \\le t < 10$ has 6 pupils, $10 \\le t < 20$ has 9, $20 \\le t < 30$ ' +
      'has 5. Midpoints 5, 15, 25.\n\n$\\sum fx = 30 + 135 + 125 = 290$ minutes over ' +
      '$\\sum f = 20$ pupils.\n\n$$\\bar{x} \\approx \\frac{290}{20} = 14.5 \\text{ minutes}.$$\n\n' +
      'A histogram and a grouped frequency table hold exactly the same information; the bars just ' +
      'show you at a glance which interval is crowded, and therefore which midpoint pulls hardest.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
    figure: {
      kind: 'stat_plot',
      plot: 'histogram',
      title: 'Homework times for 20 pupils',
      axisLabel: 'minutes',
      caption: 'Each bar covers a 10-minute interval; its height is the number of pupils in that interval.',
      bins: [
        { from: 0, to: 10, frequency: 6 },
        { from: 10, to: 20, frequency: 9 },
        { from: 20, to: 30, frequency: 5 },
      ],
    },
  },
  {
    id: 'data-analysis.grouped-mean-missing-frequency',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 1,
    sequence: { family: 'data-analysis.grouped-mean', position: 6 },
    expect:
      'Everything is reversed this time: the mean is handed to you and one frequency is missing. ' +
      'Predict which quantity you will now be solving for, and which you can still work out directly.',
    statement:
      'A grouped frequency table has one entry missing.\n\n' +
      '| Value $x$ | $0 \\le x < 10$ | $10 \\le x < 20$ | $20 \\le x < 30$ |\n' +
      '| --- | --- | --- | --- |\n| Frequency | 5 | $k$ | 7 |\n\n' +
      'The estimated mean is $16$. Find $k$.',
    answer: { type: 'number', value: 8, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'You know that sharing the whole pile out equally gives 16 each. Add one more item to the ' +
        'middle box at a time and watch the shared-out figure drop from 20 towards 16. How many ' +
        'must you add before it lands on 16?',
      pictorial:
        'Draw the bars with the middle one\'s height unknown. Making it taller drags the balance ' +
        'point left towards 15; making it shorter lets the 25 pull it right. You need it to balance at 16.',
      abstract:
        'Write both sums in terms of $k$: $\\sum fx = 25 + 15k + 175$ and $\\sum f = 12 + k$. Then ' +
        'solve $\\frac{200 + 15k}{12 + k} = 16$.',
    },
    hints: [
      'Write the total $\\sum fx$ and the total frequency $\\sum f$ with $k$ still in them.',
      '$\\sum fx = 5(5) + 15k + 25(7) = 200 + 15k$ and $\\sum f = 12 + k$. Now set the mean equal to 16.',
      '$200 + 15k = 16(12 + k) = 192 + 16k$. Collect the $k$ terms.',
    ],
    solution:
      'Midpoints 5, 15, 25.\n\n$$\\sum fx = 5(5) + 15k + 25(7) = 200 + 15k, \\qquad \\sum f = 12 + k.$$\n\n' +
      'The estimated mean is 16, so\n\n$$\\frac{200 + 15k}{12 + k} = 16 \\implies 200 + 15k = 192 + ' +
      '16k \\implies k = 8.$$\n\nCheck: $\\sum fx = 200 + 120 = 320$ and $\\sum f = 20$, giving ' +
      '$\\frac{320}{20} = 16$. ✓\n\n**Worth noticing.** The middle midpoint is 15, just below the ' +
      'target mean of 16, so every extra item in that interval drags the mean down a little — which ' +
      'is why the equation has a solution at all, and why $k$ had to be large enough to balance the ' +
      'seven items sitting out at 25.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
  },

  // ---- Tier 2: unfamiliar surfaces ----------------------------------------
  {
    id: 'data-analysis.modal-class',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 2,
    statement:
      'The heights of 50 seedlings were measured.\n\n' +
      '| Height $h$ (cm) | $0 \\le h < 10$ | $10 \\le h < 20$ | $20 \\le h < 30$ | $30 \\le h < 40$ |\n' +
      '| --- | --- | --- | --- | --- |\n| Number of seedlings | 7 | 20 | 13 | 10 |\n\n' +
      'Write down the modal class.',
    answer: {
      type: 'exact',
      value: '10 <= h < 20',
      accepts: ['10 ≤ h < 20', '$10 \\le h < 20$', '10-20', '10 to 20', '10 ≤ h < 20 cm', '10-20 cm', 'the second class'],
    },
    cpaPrompts: {
      concrete:
        'Four trays of seedlings, one per height band. Which tray is fullest? The modal class is ' +
        'the *label on that tray*, not the number of seedlings in it.',
      pictorial:
        'Draw the four bars, of heights 7, 20, 13 and 10. The modal class is the interval under the ' +
        'tallest bar.',
      abstract:
        'The modal class is the interval with the greatest frequency. With grouped data we cannot ' +
        'name a single modal value, only the interval that value lies in.',
    },
    hints: [
      'Which interval has the most seedlings in it?',
      'The largest frequency is 20. Now give the *interval* that goes with it, not the frequency itself.',
    ],
    solution:
      'The frequencies are 7, 20, 13 and 10, and the largest is 20.\n\nThe modal class is ' +
      '$\\mathbf{10 \\le h < 20}$ cm.\n\nThe answer is an interval, not a number: because the data ' +
      'has been grouped, the individual heights are gone and no single height can be named as the ' +
      'mode. The best we can say is which 10 cm band the most common heights fall in.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
  },
  {
    id: 'data-analysis.median-class',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 2,
    statement:
      'For the same 50 seedlings:\n\n' +
      '| Height $h$ (cm) | $0 \\le h < 10$ | $10 \\le h < 20$ | $20 \\le h < 30$ | $30 \\le h < 40$ |\n' +
      '| --- | --- | --- | --- | --- |\n| Number of seedlings | 7 | 20 | 13 | 10 |\n\n' +
      'Which class contains the median height?',
    answer: {
      type: 'exact',
      value: '10 <= h < 20',
      accepts: ['10 ≤ h < 20', '$10 \\le h < 20$', '10-20', '10 to 20', '10 ≤ h < 20 cm', '10-20 cm', 'the second class'],
    },
    cpaPrompts: {
      concrete:
        'Line all 50 seedlings up shortest to tallest and walk along the line counting. Stop at the ' +
        '25th and 26th plants. Which tray did those two come out of?',
      pictorial:
        'Write a running total under the bars: 7, then 27, then 40, then 50. The median position ' +
        'falls somewhere in that climb — read off which bar it lands under.',
      abstract:
        'With $n = 50$ the median lies between the 25th and 26th values. Cumulative frequencies ' +
        '$7, 27, 40, 50$ show that both of those positions fall in the second class.',
    },
    hints: [
      'There are 50 seedlings, so which positions in the ordered list are the middle ones?',
      'Build a running total: after the first class 7 seedlings, after the second $7 + 20 = 27$.',
      'The 25th and 26th seedlings are both inside the first 27 but not inside the first 7.',
    ],
    solution:
      'With $n = 50$ the median sits between the 25th and 26th values.\n\nRunning totals: ' +
      '$7$, then $7 + 20 = 27$, then $40$, then $50$. Positions 8 to 27 all fall in the second ' +
      'class, and 25 and 26 are among them.\n\nThe median lies in $\\mathbf{10 \\le h < 20}$ cm.\n\n' +
      'Here the modal class and the median class happen to be the same interval, but they answer ' +
      'different questions: one is where the crowd is, the other is where the middle plant stands.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
  },
  {
    id: 'data-analysis.why-only-an-estimate',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 2,
    statement:
      'The same 50 seedlings:\n\n' +
      '| Height $h$ (cm) | $0 \\le h < 10$ | $10 \\le h < 20$ | $20 \\le h < 30$ | $30 \\le h < 40$ |\n' +
      '| --- | --- | --- | --- | --- |\n| Number of seedlings | 7 | 20 | 13 | 10 |\n\n' +
      'The midpoint method gives an estimated mean of $20.2$ cm. Suppose instead that every ' +
      'seedling were as tall as its interval allows. What mean height would that give?',
    answer: { type: 'number', value: 25.2, tolerance: 0.05, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Push every seedling in a tray right up to the top of that tray\'s band: the 0–10 tray all ' +
        'at 10 cm, the 10–20 tray all at 20 cm, and so on. Now share the total height out between ' +
        'the 50 plants.',
      pictorial:
        'On the number line, slide each interval\'s marker from its centre to its right-hand end. ' +
        'The balance point of the bars slides right by the same amount every time — 5 cm.',
      abstract:
        'Replace each midpoint by the interval\'s upper end: $x = 10, 20, 30, 40$. Then ' +
        '$\\frac{\\sum fx}{\\sum f} = \\frac{(10)(7) + (20)(20) + (30)(13) + (40)(10)}{50}$.',
    },
    hints: [
      'Use the top of each interval instead of its midpoint: 10, 20, 30 and 40.',
      '$\\sum fx = 70 + 400 + 390 + 400 = 1260$, over 50 seedlings.',
      '$1260 \\div 50$.',
    ],
    solution:
      'Using the upper end of each interval: $x = 10, 20, 30, 40$.\n\n$\\sum fx = (10)(7) + ' +
      '(20)(20) + (30)(13) + (40)(10) = 70 + 400 + 390 + 400 = 1260$ cm over 50 seedlings, so the ' +
      'mean would be\n\n$$\\frac{1260}{50} = 25.2 \\text{ cm}.$$\n\nThe same sum with the *lower* ' +
      'ends gives $\\frac{760}{50} = 15.2$ cm. So all we can honestly say from the grouped table is ' +
      'that the true mean lies between 15.2 cm and 25.2 cm; the midpoint answer of 20.2 cm is the ' +
      'centre of that window, not a measured fact. **That** is why it is called an estimate: the ' +
      'grouping destroyed the information needed to do better.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
  },

  // ---- Tier 3: applied ----------------------------------------------------
  {
    id: 'data-analysis.arm-spans',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 3,
    statement:
      'A class measured each other\'s arm spans with a tape measure and dropped each measurement ' +
      'into one of four labelled boxes. At the end of the lesson the slips of paper had been ' +
      'shuffled, so all that survives is the count in each box.\n\n' +
      '| Arm span $a$ (cm) | $130 \\le a < 140$ | $140 \\le a < 150$ | $150 \\le a < 160$ | $160 \\le a < 170$ |\n' +
      '| --- | --- | --- | --- | --- |\n| Number of students | 3 | 7 | 10 | 5 |\n\n' +
      'The teacher still wants a single figure for the class\'s typical arm span. What is the best ' +
      'she can now give, in cm?',
    answer: { type: 'number', value: 151.8, tolerance: 0.05, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'The slips are gone, so every student in a box has to be treated as standing at the middle ' +
        'of that box: 135, 145, 155, 165 cm. Line them all up at those four marks and share the ' +
        'total height of the line out between the 25 of them.',
      pictorial:
        'Draw four bars of heights 3, 7, 10 and 5 and write 135, 145, 155, 165 under them. The ' +
        'figure she wants is the balance point, which the tallest bar drags towards 155.',
      abstract:
        'With the raw values lost, the midpoint of each interval stands in for every student in it: ' +
        '$\\frac{\\sum fx}{\\sum f}$ with $x = 135, 145, 155, 165$ and $f = 3, 7, 10, 5$.',
    },
    hints: [
      'You cannot recover the individual measurements. What single value can stand in for everyone in the $140 \\le a < 150$ box?',
      'Midpoints 135, 145, 155, 165. Multiply each by how many students are in its box.',
      '$405 + 1015 + 1550 + 825 = 3795$, and there are $3 + 7 + 10 + 5 = 25$ students.',
    ],
    solution:
      'Midpoints: $135$, $145$, $155$, $165$ cm.\n\n$\\sum fx = (135)(3) + (145)(7) + (155)(10) + ' +
      '(165)(5) = 405 + 1015 + 1550 + 825 = 3795$ cm, over $\\sum f = 25$ students.\n\n' +
      '$$\\bar{a} \\approx \\frac{3795}{25} = 151.8 \\text{ cm}.$$\n\nShe should quote about ' +
      '151.8 cm, and say it is an estimate. Had the slips survived, the true mean would be ' +
      'somewhere in $146.8$ cm to $156.8$ cm; the grouping cost her that much precision.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
  },
  {
    id: 'data-analysis.cinema-ages',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 3,
    statement:
      'A cinema is choosing which advertisements to run before its Saturday matinee. Staff recorded ' +
      'the ages of the 30 people who came last Saturday.\n\n' +
      '| Age $a$ (years) | $0 \\le a < 10$ | $10 \\le a < 20$ | $20 \\le a < 40$ | $40 \\le a < 60$ |\n' +
      '| --- | --- | --- | --- | --- |\n| Number of people | 6 | 15 | 6 | 3 |\n\n' +
      'An advertiser will only buy the slot if the average age of the audience is under 20. What ' +
      'average age should the cinema report, in years?',
    answer: { type: 'number', value: 19.5, tolerance: 0.05, unit: 'years' },
    cpaPrompts: {
      concrete:
        'Thirty tickets, sorted into four piles by age band. The exact ages on the tickets have ' +
        'been shredded. Stand each pile at the middle of its band — 5, 15, 30, 50 — and share the ' +
        'total out between all thirty people.',
      pictorial:
        'Bars of heights 6, 15, 6 and 3 over bands of widths 10, 10, 20 and 20. Where do they ' +
        'balance? The three people in the oldest band sit far out and pull harder than their number suggests.',
      abstract:
        'Midpoints $5, 15, 30, 50$; $\\bar{a} \\approx \\frac{\\sum fa}{\\sum f}$ with ' +
        '$f = 6, 15, 6, 3$ and $\\sum f = 30$.',
    },
    hints: [
      'The bands are not all the same width, so work out each midpoint from its own two ends.',
      'Midpoints: 5, 15, 30 and 50. Multiply each by the number of people in that band.',
      '$30 + 225 + 180 + 150 = 585$, over 30 people.',
    ],
    solution:
      'Midpoints: $5$, $15$, $30$, $50$ (each halfway between its own band\'s ends, so the wide ' +
      'bands get midpoints of 30 and 50).\n\n$\\sum fa = (5)(6) + (15)(15) + (30)(6) + (50)(3) = ' +
      '30 + 225 + 180 + 150 = 585$ years over $\\sum f = 30$ people.\n\n' +
      '$$\\bar{a} \\approx \\frac{585}{30} = 19.5 \\text{ years}.$$\n\nJust under 20, so the ' +
      'advertiser buys the slot — but only just, and only because the three over-40s were ' +
      'outnumbered. Note how little the count of 3 tells you on its own: those three contributed ' +
      '150 of the 585 years, more than a quarter of the total from a tenth of the audience.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
  },

  // ---- Diagnostic ---------------------------------------------------------
  {
    id: 'data-analysis.dx-unweighted-midpoints',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 'diagnostic',
    statement:
      'A receptionist wrote the waiting times of 20 patients into a table in the order the bands ' +
      'occurred to her.\n\n' +
      '| Time $t$ (min) | $20 \\le t < 60$ | $0 \\le t < 10$ | $10 \\le t < 20$ |\n' +
      '| --- | --- | --- | --- |\n| Number of patients | 4 | 12 | 4 |\n\n' +
      'Calculate an estimate of the mean waiting time.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '5 minutes', misconceptionCode: 'data-analysis.median-of-unsorted' },
        { label: 'B', value: '14 minutes' },
        { label: 'C', value: '20 minutes', misconceptionCode: 'data-analysis.unweighted-midpoints' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Three boxes of slips: twelve slips in the 0–10 box, four in the 10–20 box, four in the ' +
        '20–60 box. Twelve patients waited about 5 minutes and only four waited about 40. Should ' +
        '5 and 40 count the same when you share the total out?',
      pictorial:
        'Put the bands in order along a number line and mark 5, 15 and 40. Three crosses, but one ' +
        'of them stands for twelve people. Where do the twenty patients balance?',
      abstract:
        '$\\bar{t} \\approx \\frac{\\sum ft}{\\sum f}$: each midpoint is counted once *per patient*, ' +
        'so it is multiplied by that band\'s frequency and the total is divided by 20, not by 3.',
    },
    hints: [
      'The three bands hold 12, 4 and 4 patients. Does each band deserve the same say in the answer?',
      'Multiply each midpoint by its frequency: $40 \\times 4$, $5 \\times 12$, $15 \\times 4$. Then divide by the 20 patients.',
    ],
    solution:
      'Midpoints: $40$, $5$, $15$.\n\n$\\sum ft = (40)(4) + (5)(12) + (15)(4) = 160 + 60 + 60 = 280$ ' +
      'minutes over $\\sum f = 20$ patients, so\n\n$$\\bar{t} \\approx \\frac{280}{20} = \\mathbf{14} ' +
      '\\text{ minutes}.$$\n\nThe wrong answers: **20 minutes** is $\\frac{40 + 5 + 15}{3}$, the ' +
      'average of the three midpoints. That gives the four patients in the 20–60 band the same say ' +
      'as the twelve in the 0–10 band, which is exactly what multiplying by the frequency prevents. ' +
      '**5 minutes** is the midpoint of the middle *row of the table* — a value grabbed from a ' +
      'position rather than computed, and the rows are not even in order, so that position means ' +
      'nothing at all. Note that the order of the rows makes no difference to the correct answer: ' +
      'a weighted total does not care which row you add first.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints', 'data-analysis.median-of-unsorted'],
  },

  // =========================================================================
  // Skill 4 — scatter plots and correlation
  // =========================================================================

  // ---- Tier 1: five clouds, one thing changing each time ------------------
  {
    id: 'data-analysis.correlation-strong-positive',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 1,
    sequence: { family: 'data-analysis.correlation-read', position: 1 },
    statement:
      'Ten students each measured their hand span (across) and their foot length (up), in ' +
      'centimetres, and the class plotted the pairs. Describe the correlation the scatter plot ' +
      'shows, saying both its direction and its strength.',
    answer: {
      type: 'exact',
      value: 'strong positive correlation',
      accepts: ['strong positive', 'positive', 'positive correlation', 'strongly positive', 'a strong positive correlation', 'strong, positive', 'strong positive linear correlation'],
    },
    cpaPrompts: {
      concrete: SCATTER_CONCRETE,
      pictorial:
        'Draw a corridor around the ten points, as narrow as you can make it while still enclosing ' +
        'them all. Which way does your corridor slope, and how wide did it have to be?',
      abstract:
        'Direction comes from the slope of the trend — up to the right is positive. Strength comes ' +
        'from how tightly the points hug that trend: a narrow band is strong.',
    },
    hints: [
      'As you move right along the plot, do the points tend to climb or to fall?',
      'They climb, so the correlation is positive. Now judge the strength: could you draw a single straight line that passes close to every point?',
    ],
    solution:
      'The points climb steadily from bottom-left to top-right and sit very close to a straight ' +
      'line, so this is a **strong positive correlation**: students with a bigger hand span tend to ' +
      'have a longer foot.\n\n"Positive" is the direction, "strong" is how tightly the cloud hugs ' +
      'the trend. Both parts are needed — a plot can be positive and barely worth mentioning.',
    misconceptionCodes: ['data-analysis.correlation-as-causation'],
    figure: scatter(
      'Hand span against foot length',
      'Hand span in cm across, foot length in cm up. Ten students.',
      [
        { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 5 }, { x: 5, y: 5 },
        { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 9 }, { x: 9, y: 9 }, { x: 10, y: 10 },
      ],
    ),
  },
  {
    id: 'data-analysis.correlation-weak-positive',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 1,
    sequence: { family: 'data-analysis.correlation-read', position: 2 },
    expect:
      'The points still drift upwards to the right, but they are scattered much more loosely than ' +
      'last time. Predict: which half of your answer changes — the direction or the strength?',
    statement:
      'Ten students plotted their hand span (across) against the number of press-ups they could do ' +
      '(up). Describe the correlation this scatter plot shows, giving both direction and strength.',
    answer: {
      type: 'exact',
      value: 'weak positive correlation',
      accepts: ['weak positive', 'positive', 'positive correlation', 'weakly positive', 'a weak positive correlation', 'weak, positive', 'weak positive linear correlation'],
    },
    cpaPrompts: {
      concrete: SCATTER_CONCRETE,
      pictorial:
        'Draw the narrowest corridor that still contains all ten points. It slopes the same way as ' +
        'last time — but how much wider did you have to make it?',
      abstract:
        'The direction is unchanged: the trend still rises. What has changed is the scatter about ' +
        'that trend, and scatter is what "weak" and "strong" describe.',
    },
    hints: [
      'Move your eye left to right. On balance, are the points higher on the right than on the left?',
      'They are, so it is still positive. But several points sit well away from any line you could draw — that makes the correlation weak.',
    ],
    solution:
      'On balance the points rise from left to right, so the correlation is **positive**. But they ' +
      'are widely scattered — at a hand span of 3 one student managed 2 press-ups while at a span ' +
      'of 2 another managed 7 — so it is a **weak positive correlation**.\n\nOnly one thing changed ' +
      'from the last plot: the tightness of the cloud. The direction word stayed, the strength word ' +
      'flipped. Knowing a student\'s hand span here would barely help you guess their press-ups.',
    misconceptionCodes: ['data-analysis.correlation-as-causation'],
    figure: scatter(
      'Hand span against press-ups',
      'Hand span in cm across, press-ups up. Ten students.',
      [
        { x: 1, y: 3 }, { x: 2, y: 7 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 },
        { x: 6, y: 9 }, { x: 7, y: 5 }, { x: 8, y: 8 }, { x: 9, y: 6 }, { x: 10, y: 9 },
      ],
    ),
  },
  {
    id: 'data-analysis.correlation-none',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 1,
    sequence: { family: 'data-analysis.correlation-read', position: 3 },
    expect:
      'The scatter has loosened once more, until no drift is left. Predict: if there is no trend to ' +
      'slope up or down, is there still a direction word to give?',
    statement:
      'Ten students plotted their hand span (across) against the number of letters in their first ' +
      'name (up). Describe the correlation this scatter plot shows.',
    answer: {
      type: 'exact',
      value: 'no correlation',
      accepts: ['none', 'no relationship', 'zero correlation', 'no linear correlation', 'there is no correlation', 'no obvious correlation', 'no correlation at all'],
    },
    cpaPrompts: {
      concrete: SCATTER_CONCRETE,
      pictorial:
        'Try to draw a corridor around these points. To catch all ten you would have to make it ' +
        'almost as tall as the whole grid — and it would not matter which way you tilted it.',
      abstract:
        'If the points do not tend to rise or fall as $x$ increases, there is no linear trend to ' +
        'describe. The answer is "no correlation", with no direction and no strength.',
    },
    hints: [
      'Cover the right-hand half of the plot. Do the points on the left sit higher, lower, or about the same as the ones you covered?',
      'A point high up appears at both small and large hand spans, and so does a point low down. Knowing one measurement tells you nothing about the other.',
    ],
    solution:
      'The points are scattered all over the grid with no upward or downward drift, so there is ' +
      '**no correlation**.\n\nThis is the sensible answer, not a failure to find one: hand span and ' +
      'the length of your name have nothing to do with each other, and the plot says so honestly. ' +
      'Notice there is no direction word to give — "positive" and "negative" only mean something ' +
      'when there is a trend to point at.',
    misconceptionCodes: ['data-analysis.correlation-as-causation'],
    figure: scatter(
      'Hand span against letters in first name',
      'Hand span in cm across, number of letters up. Ten students.',
      [
        { x: 1, y: 5 }, { x: 2, y: 9 }, { x: 3, y: 2 }, { x: 4, y: 7 }, { x: 5, y: 4 },
        { x: 6, y: 8 }, { x: 7, y: 3 }, { x: 8, y: 6 }, { x: 9, y: 9 }, { x: 10, y: 1 },
      ],
    ),
  },
  {
    id: 'data-analysis.correlation-weak-negative',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 1,
    sequence: { family: 'data-analysis.correlation-read', position: 4 },
    expect:
      'A drift has come back into the cloud, but it now runs the other way. Predict which word in ' +
      'your answer changes from the plot before last, and which word stays.',
    statement:
      'Ten students plotted the hours they spent gaming in a week (across) against their score in a ' +
      'spelling test (up). Describe the correlation this scatter plot shows, giving both direction ' +
      'and strength.',
    answer: {
      type: 'exact',
      value: 'weak negative correlation',
      accepts: ['weak negative', 'negative', 'negative correlation', 'weakly negative', 'a weak negative correlation', 'weak, negative', 'weak negative linear correlation'],
    },
    cpaPrompts: {
      concrete: SCATTER_CONCRETE,
      pictorial:
        'Draw the narrowest corridor that holds all ten points. This time it tilts downwards — but ' +
        'it is still a wide corridor, with points well away from its centre line.',
      abstract:
        'A downward trend means $y$ tends to fall as $x$ rises: negative. A wide scatter about that ' +
        'trend means weak. Say nothing yet about what causes what.',
    },
    hints: [
      'Compare the left-hand third of the plot with the right-hand third. Which side has the higher scores?',
      'Scores are generally lower on the right, so the correlation is negative. Is the cloud tight enough to call it strong?',
    ],
    solution:
      'The points drift downward from left to right, so the correlation is **negative**; but the ' +
      'scatter is wide — one student gaming for 3 hours scored 9 while another gaming for 4 scored ' +
      '3 — so it is a **weak negative correlation**.\n\nCompared with the weak *positive* plot, only ' +
      'the direction changed. And a warning worth repeating: this plot cannot tell you that gaming ' +
      'lowered anyone\'s spelling score. It only says the two tend to move in opposite directions.',
    misconceptionCodes: ['data-analysis.correlation-as-causation'],
    figure: scatter(
      'Gaming hours against spelling score',
      'Hours of gaming in a week across, spelling score out of 10 up. Ten students.',
      [
        { x: 1, y: 7 }, { x: 2, y: 4 }, { x: 3, y: 9 }, { x: 4, y: 3 }, { x: 5, y: 6 },
        { x: 6, y: 8 }, { x: 7, y: 2 }, { x: 8, y: 5 }, { x: 9, y: 3 }, { x: 10, y: 1 },
      ],
    ),
  },
  {
    id: 'data-analysis.correlation-strong-negative',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 1,
    sequence: { family: 'data-analysis.correlation-read', position: 5 },
    expect:
      'The downward drift is still there, but the points have pulled in tight against it. Predict ' +
      'the pair of words you will need, and check it against the very first plot in this sequence.',
    statement:
      'Ten cars were plotted with their age in years (across) against their value in thousands of ' +
      'dollars (up). Describe the correlation this scatter plot shows, giving both direction and ' +
      'strength.',
    answer: {
      type: 'exact',
      value: 'strong negative correlation',
      accepts: ['strong negative', 'negative', 'negative correlation', 'strongly negative', 'a strong negative correlation', 'strong, negative', 'strong negative linear correlation'],
    },
    cpaPrompts: {
      concrete: SCATTER_CONCRETE,
      pictorial:
        'Draw the narrowest corridor that contains all ten points. It slopes down, and this time it ' +
        'is thin — every point is close to its centre line.',
      abstract:
        'Downward trend, tight scatter: strong negative. Knowing a car\'s age here would let you ' +
        'predict its value quite closely, which is what "strong" is really saying.',
    },
    hints: [
      'Do the points fall as you move right?',
      'They do, and they sit close to a single straight line. Both facts go into your answer.',
    ],
    solution:
      'The points fall steadily from top-left to bottom-right and lie close to a straight line, so ' +
      'this is a **strong negative correlation**: older cars are worth less.\n\n**The pattern this ' +
      'sequence was built for.** Across the five plots, two independent things were varying:\n\n' +
      '| Plot | slope of the trend | tightness of the cloud | description |\n| --- | --- | --- | --- |\n' +
      '| 1 | up | tight | strong positive |\n| 2 | up | loose | weak positive |\n' +
      '| 3 | none | — | no correlation |\n| 4 | down | loose | weak negative |\n' +
      '| 5 | down | tight | strong negative |\n\nThe *slope* gives the direction word and the ' +
      '*tightness* gives the strength word. They are separate judgements, and a full description ' +
      'needs both.',
    misconceptionCodes: ['data-analysis.correlation-as-causation'],
    figure: scatter(
      'Car age against value',
      'Age in years across, value in thousands of dollars up. Ten cars.',
      [
        { x: 1, y: 10 }, { x: 2, y: 9 }, { x: 3, y: 9 }, { x: 4, y: 7 }, { x: 5, y: 6 },
        { x: 6, y: 6 }, { x: 7, y: 4 }, { x: 8, y: 3 }, { x: 9, y: 2 }, { x: 10, y: 1 },
      ],
    ),
  },
  {
    id: 'data-analysis.correlation-direction',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 1,
    sequence: { family: 'data-analysis.correlation-read', position: 6 },
    expect:
      'This time there is no plot to look at — only a sentence describing which way the points ' +
      'drift. Predict: can you still name the correlation from the description alone?',
    statement:
      "A class plots each student's hours of sleep the night before a test against their test " +
      'score. The points drift downward from left to right. What kind of correlation does the ' +
      'scatter plot show — positive, negative or none?',
    answer: { type: 'exact', value: 'negative', accepts: ['negative correlation', 'a negative correlation', 'negative.'] },
    cpaPrompts: {
      concrete:
        "Imagine the stickers on the wall chart: each student's sleep across, score up. If the " +
        'stickers drift *down* as you move right, what is happening to scores as sleep goes up?',
      pictorial:
        'Draw a corridor around the cloud of points. Which way does the corridor slope? What ' +
        'sign is that slope?',
      abstract:
        'Downward trend from left to right means $y$ tends to fall as $x$ rises: negative ' +
        'correlation. Say nothing about cause.',
    },
    hints: [
      'As you move to the right — more sleep — do the points go up, go down, or scatter with no ' +
        'pattern?',
      'A cloud that slopes downward from left to right has a negative correlation, the way a ' +
        'line with negative gradient does.',
    ],
    solution:
      'The points trend downward to the right, so as hours of sleep increase, scores tend to ' +
      'decrease: a **negative** correlation.\n\nWhether the sleep *causes* the lower scores is a ' +
      'separate question the plot cannot answer.',
    misconceptionCodes: ['data-analysis.correlation-as-causation'],
  },

  // ---- Tier 2: unfamiliar surfaces ----------------------------------------
  {
    id: 'data-analysis.best-fit-predict',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 2,
    statement:
      'A kiosk plotted the midday temperature against the number of ice creams sold on 20 days, ' +
      'and drew a line of best fit through the cloud. The line passes through $(10, 30)$ and ' +
      '$(30, 130)$, with temperature in $^\\circ$C across and ice creams sold up. Use the line to ' +
      'estimate the sales on a day when the midday temperature is $22^\\circ$C.',
    answer: { type: 'number', value: 90, tolerance: 3, unit: 'ice creams' },
    cpaPrompts: {
      concrete:
        'Put a ruler on the two points the line is known to pass through, then slide a finger along ' +
        'the ruler until you are above 22 on the temperature axis. How high is your finger?',
      pictorial:
        'Draw the line through $(10, 30)$ and $(30, 130)$. Go up from 22 on the horizontal axis ' +
        'until you meet the line, then across to the vertical axis and read off the value.',
      abstract:
        'The line has gradient $\\frac{130 - 30}{30 - 10} = 5$ ice creams per degree. From ' +
        '$(10, 30)$, going 12 degrees further right raises sales by $5 \\times 12$.',
    },
    hints: [
      'First find how many extra ice creams the line predicts for each extra degree.',
      'From $(10, 30)$ to $(30, 130)$ is 100 more ice creams over 20 more degrees, so 5 per degree.',
      '$22^\\circ$ is 12 degrees above $10^\\circ$, so add $5 \\times 12 = 60$ to the 30 sold at $10^\\circ$.',
    ],
    solution:
      'Gradient of the line of best fit:\n\n$$m = \\frac{130 - 30}{30 - 10} = \\frac{100}{20} = 5 ' +
      '\\text{ ice creams per } ^\\circ\\text{C}.$$\n\nFrom $(10, 30)$, moving to $22^\\circ$ is 12 ' +
      'degrees to the right:\n\n$$30 + 5 \\times 12 = 90 \\text{ ice creams}.$$\n\nThis is an ' +
      'estimate, not a promise: the real days scattered on both sides of the line, and $22^\\circ$ ' +
      'is comfortably inside the range of temperatures actually recorded, which is what makes the ' +
      'estimate worth making at all.',
    misconceptionCodes: ['data-analysis.correlation-as-causation'],
  },
  {
    id: 'data-analysis.scatter-outlier',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 2,
    statement:
      'Ten shops are plotted with the number of staff on duty (across) against the number of ' +
      'customers served that hour (up). Nine of them follow a clear trend and one does not. Give ' +
      'the coordinates of the point that does not fit.',
    answer: { type: 'coordinates', x: 8, y: 3, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay a ruler along the stickers so that it runs through as many as possible. One sticker is ' +
        'left stranded a long way off the ruler. Read the pair of numbers under that sticker.',
      pictorial:
        'Draw a corridor around the cloud. Nine points fit comfortably inside it; the tenth sits ' +
        'well below. Read off its horizontal and vertical values.',
      abstract:
        'An outlier is a point far from the pattern the rest of the data makes, not simply a point ' +
        'with a large or small value. Give it as $(x, y)$.',
    },
    hints: [
      'The trend is roughly "customers served is about double the number of staff". Which point badly breaks that?',
      'Look along the row of points for one that sits far below where the others at that staffing level would be.',
    ],
    solution:
      'Nine of the ten points follow the pattern "customers $\\approx 2 \\times$ staff": ' +
      '$(1, 2)$, $(2, 4)$, $(3, 5)$, $(4, 8)$, $(5, 9)$, $(6, 12)$, $(7, 13)$, $(9, 17)$, ' +
      '$(10, 19)$.\n\nThe point that does not fit is $\\mathbf{(8, 3)}$: eight staff on duty but ' +
      'only 3 customers served.\n\nIt is not an error to be deleted — it may be the shop\'s ' +
      'quietest hour, or a day the till broke — but it should be investigated, and a line of best ' +
      'fit drawn without thinking about it would be dragged downwards by it.',
    misconceptionCodes: ['data-analysis.correlation-as-causation'],
    figure: {
      kind: 'coordinate_plane',
      title: 'Staff on duty against customers served',
      caption: 'Staff on duty across, customers served in the hour up. Ten shops.',
      xMin: 0,
      xMax: 11,
      yMin: 0,
      yMax: 20,
      gridStep: 1,
      points: [
        { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 9 },
        { x: 6, y: 12 }, { x: 7, y: 13 }, { x: 8, y: 3 }, { x: 9, y: 17 }, { x: 10, y: 19 },
      ],
    },
  },
  {
    id: 'data-analysis.interpolation-or-extrapolation',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 2,
    statement:
      'A study plotted height against arm span for students whose heights ran from 140 cm to ' +
      '175 cm, and drew a line of best fit. Two predictions are then made from that line: the arm ' +
      'span of someone 160 cm tall, and the arm span of someone 210 cm tall. One of the two should ' +
      'not be trusted. Give the height, in cm, of the prediction that should not be trusted.',
    answer: { type: 'number', value: 210, tolerance: 0, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'The stickers on the wall chart only cover the stretch from 140 to 175. Hold a ruler along ' +
        'them and extend it far past the last sticker. What evidence is there that the line keeps ' +
        'behaving out there?',
      pictorial:
        'Shade the strip of the horizontal axis that the data actually covers, from 140 to 175. ' +
        'Mark 160 and 210. Which one falls outside the shaded strip?',
      abstract:
        'Predicting *inside* the range of the data is interpolation and is reasonably safe. ' +
        'Predicting *outside* it is extrapolation: the line is being used where nothing was measured.',
    },
    hints: [
      'What range of heights were actually measured in the study?',
      'Heights from 140 cm to 175 cm were measured. Which of the two predictions asks about a height outside that range?',
    ],
    solution:
      'The data covers heights from 140 cm to 175 cm.\n\n- 160 cm sits inside that range, so ' +
      'predicting from the line is **interpolation** — the line was fitted to points on both sides ' +
      'of 160.\n- 210 cm sits far outside it, so predicting there is **extrapolation**.\n\nThe ' +
      'prediction not to trust is the one at $\\mathbf{210}$ cm. Nobody in the study was anywhere ' +
      'near that tall, so there is no evidence the straight-line pattern carries on that far — and ' +
      'in body measurements it usually does not.',
    misconceptionCodes: ['data-analysis.correlation-as-causation'],
  },

  // ---- Tier 3: applied ----------------------------------------------------
  {
    id: 'data-analysis.arm-span-height',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 3,
    statement:
      'A tailor is writing a table to help staff order sleeve lengths when a customer will not be ' +
      'measured. Eight customers gave both figures, in centimetres:\n\n' +
      '| Height | 150 | 155 | 158 | 162 | 165 | 170 | 175 | 178 |\n' +
      '| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n' +
      '| Arm span | 149 | 153 | 160 | 161 | 167 | 169 | 176 | 180 |\n\n' +
      'A customer says she is 168 cm tall. What arm span, in cm, should the tailor write down for her?',
    answer: { type: 'number', value: 168, tolerance: 4, unit: 'cm' },
    cpaPrompts: {
      concrete:
        'Put a sticker on a wall chart for each customer, height across and arm span up. Lay a ' +
        'ruler through the cloud so that roughly as many stickers sit above it as below, then read ' +
        'off the height of the ruler above 168.',
      pictorial:
        'Plot the eight points and draw one straight line through the middle of them. Go up from ' +
        '168 to your line and across to the vertical axis.',
      abstract:
        'Fit a line of best fit and read $y$ at $x = 168$. The eight pairs sit very close to ' +
        '$y = x$, so the line predicts an arm span of about the same as the height.',
    },
    hints: [
      'Plot the eight pairs first. Do they lie close to a straight line?',
      'Compare each arm span with its height: they are never more than about 2 cm apart, in either direction.',
      'So a sensible line of best fit is very close to "arm span $=$ height". Read it off at 168.',
    ],
    solution:
      'Plotting the eight pairs shows a very strong positive correlation, with the points lying ' +
      'close to the line "arm span $=$ height" — the differences are $-1, -2, +2, -1, +2, -1, +1, ' +
      '+2$ cm.\n\nA line of best fit through the cloud therefore predicts, at a height of 168 cm, ' +
      'an arm span of about $\\mathbf{168}$ cm (anything from about 166 to 170 is a reasonable read ' +
      'off a hand-drawn line).\n\n168 cm sits comfortably inside the measured range of 150–178 cm, ' +
      'so this is interpolation and the estimate is a fair one. The tailor should still expect to ' +
      'be a couple of centimetres out on any individual customer.',
    misconceptionCodes: ['data-analysis.correlation-as-causation'],
  },
  {
    id: 'data-analysis.study-hours-marks',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 3,
    statement:
      'A form tutor asks eight students how many hours they revised for a test and looks up their ' +
      'marks.\n\n| Hours revised | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |\n' +
      '| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n' +
      '| Mark (%) | 32 | 41 | 45 | 58 | 60 | 71 | 74 | 85 |\n\n' +
      'She wants one sentence for the newsletter describing what the figures show about the two ' +
      'quantities. What should that sentence say about them — and be careful to claim only what ' +
      'the figures can support?',
    answer: {
      type: 'exact',
      value: 'strong positive correlation',
      accepts: ['positive correlation', 'strong positive', 'positive', 'a strong positive correlation', 'strong, positive', 'strongly positive', 'strong positive linear correlation'],
    },
    cpaPrompts: {
      concrete:
        'Put a sticker for each student on a wall chart, hours across and mark up. Stand back. Do ' +
        'the stickers climb steadily, or wander?',
      pictorial:
        'Plot the eight points and draw a corridor around them. It slopes upwards and it is narrow ' +
        '— every point is close to the same straight line.',
      abstract:
        'Describe direction and strength, and stop there. The data cannot show that revision ' +
        '*caused* the higher marks; students who revise more may also attend more, or find the ' +
        'subject easier already.',
    },
    hints: [
      'Plot the pairs, or just read across the table: as the hours go up, what do the marks do?',
      'Every extra hour comes with a higher mark, and the rise is steady — about 7 or 8 marks an hour. That is both a direction and a strength.',
      'Say what the figures show about the two quantities together, without saying that one produced the other.',
    ],
    solution:
      'Plotted, the eight points climb steadily and lie close to a straight line, so the figures ' +
      'show a **strong positive correlation** between hours revised and mark.\n\nWhat the sentence ' +
      'must *not* say is that revising caused the marks. The tutor did not control who revised for ' +
      'how long: a student who revises for 8 hours may also be the student who pays attention in ' +
      'class, has a quiet place to work, or already understood the topic. Those would raise the ' +
      'mark too, and the plot cannot separate them.\n\nA safe newsletter sentence: "Students who ' +
      'revised for longer tended to score higher."',
    misconceptionCodes: ['data-analysis.correlation-as-causation'],
  },

  // ---- Tier 4: the lurking variable ---------------------------------------
  {
    id: 'data-analysis.fire-engines-lurking',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 4,
    statement:
      'A city recorded, for each of 20 house fires last year, how many fire engines attended and ' +
      'what the damage cost. The scatter plot rises steeply: the more engines attended, the greater ' +
      'the damage. A councillor reads it and proposes sending fewer engines to each fire "so that ' +
      'less damage is done".\n\nThe line of best fit passes through $(2, 60)$ and $(8, 240)$, with ' +
      'engines across and damage in thousands of dollars up.\n\n(a) Use the line to estimate the ' +
      'damage at a fire attended by 5 engines, in thousands of dollars. (b) Then decide whether the ' +
      'councillor\'s proposal would work, and be ready to say what is really driving both figures.',
    answer: { type: 'number', value: 150, tolerance: 5, unit: 'thousand dollars' },
    cpaPrompts: {
      concrete:
        'Picture two fires: a smouldering bin, one engine, small bill; a house alight from end to ' +
        'end, eight engines, huge bill. What decided the number of engines sent — and what decided ' +
        'the bill? Would sending one engine to the second fire have made the bill smaller?',
      pictorial:
        'Draw the line through $(2, 60)$ and $(8, 240)$ and read off the value above 5. Then imagine ' +
        'a third axis you cannot see on the plot: the size of the fire. Both plotted quantities ' +
        'climb as that hidden quantity climbs.',
      abstract:
        'Gradient $= \\frac{240 - 60}{8 - 2} = 30$ thousand dollars per engine, so at 5 engines the ' +
        'line gives $60 + 30 \\times 3$. A strong correlation between two variables is equally well ' +
        'explained by a third variable driving both — here, the size of the fire.',
    },
    hints: [
      'For part (a), find the gradient of the line first: how much does the predicted damage rise per extra engine?',
      'From $(2, 60)$ to $(8, 240)$ is 180 over 6, so 30 per engine. Five engines is three more than two.',
      'For part (b), ask what determines how many engines the control room sends in the first place. Is that same thing also pushing the damage up?',
    ],
    solution:
      '**(a)** Gradient $= \\frac{240 - 60}{8 - 2} = \\frac{180}{6} = 30$ thousand dollars per ' +
      'engine. From $(2, 60)$:\n\n$$60 + 30 \\times (5 - 2) = 60 + 90 = 150 \\text{ thousand ' +
      'dollars}.$$\n\n**(b)** The proposal would not work, and could be lethal.\n\nThe correlation ' +
      'is real, but neither variable is causing the other. A third, unrecorded quantity — **the ' +
      'size of the fire** — drives both: a big fire makes the control room send many engines, *and* ' +
      'a big fire destroys more of the house. That hidden quantity is called a lurking variable.\n\n' +
      'Sending fewer engines would not shrink the fire; it would leave a large fire under-fought, ' +
      'and the damage would rise, not fall. Notice what that does to the line: the relationship the ' +
      'councillor wants to exploit would not survive the intervention, which is the practical test ' +
      'of whether a correlation is causal.\n\nTo settle a question of cause you need something the ' +
      'scatter plot cannot give you — comparing fires of the *same* size that happened to receive ' +
      'different numbers of engines.',
    misconceptionCodes: ['data-analysis.correlation-as-causation'],
  },

  // ---- Diagnostic ---------------------------------------------------------
  {
    id: 'data-analysis.dx-correlation-as-causation',
    skillIds: ['data-analysis.identify-scatter-plot'],
    tier: 'diagnostic',
    statement:
      'Across 30 summer weeks in a seaside town, weekly ice-cream sales were plotted against the ' +
      'number of people treated for sunburn. The points rise clearly from left to right, though ' +
      'three of the thirty weeks sit well off the trend. What does the scatter plot show?',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: 'That eating ice cream causes sunburn.', misconceptionCode: 'data-analysis.correlation-as-causation' },
        { label: 'B', value: 'That the two rise and fall together; hot, sunny weather is a likely cause of both.' },
        { label: 'C', value: 'Nothing at all, because three of the weeks do not fit the trend.', misconceptionCode: 'data-analysis.unweighted-midpoints' },
      ],
    },
    cpaPrompts: {
      concrete:
        'Picture the two things being counted each week: tubs sold at the kiosk and people at the ' +
        'clinic. Now ask what else changes from a cool cloudy week to a hot sunny one. Would ' +
        'closing the kiosk empty the clinic?',
      pictorial:
        'The plot has two axes. Imagine a third quantity, hours of sunshine, that is not drawn ' +
        'anywhere on it. Sketch how both plotted quantities would move as that hidden one goes up.',
      abstract:
        'A correlation says two variables move together. It leaves three possibilities open: $x$ ' +
        'causes $y$, $y$ causes $x$, or a third variable drives both. Choosing between them needs ' +
        'evidence a scatter plot does not contain.',
    },
    hints: [
      'Suppose the town banned ice cream tomorrow. Would fewer people be treated for sunburn?',
      'Think about what is happening in the town during the weeks at the right-hand end of the plot. What is true of the weather then, and what does that do to *both* counts?',
    ],
    solution:
      'The right answer is **B**. The two counts rise and fall together — a real, strong ' +
      'correlation — and the obvious explanation is that hot sunny weather drives both: it sells ' +
      'ice cream and it burns skin. A quantity like that, driving both variables but not plotted on ' +
      'either axis, is called a lurking variable.\n\n**A** reads the correlation as causation. Ice ' +
      'cream is eaten, not worn; there is no mechanism, and banning it would not empty the burns ' +
      'clinic. A plot showing that two things move together can never, on its own, say which (if ' +
      'either) produces the other.\n\n**C** throws the whole plot away because 3 of the 30 weeks ' +
      'sit off the trend. Those three weeks are outnumbered nine to one, and a correlation has ' +
      'never meant "every single point obeys the rule" — it means the tendency across all thirty. ' +
      'Letting three weeks outvote twenty-seven is refusing to weight the evidence by how much of it there is.',
    misconceptionCodes: ['data-analysis.correlation-as-causation', 'data-analysis.unweighted-midpoints'],
  },

  // =========================================================================
  // Tier 4 — the unit's SSDD set: one week of rainfall, three questions
  // =========================================================================
  {
    id: 'data-analysis.rainfall-ssdd-median',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    tier: 4,
    sequence: { family: 'data-analysis.rainfall-ssdd', position: 1 },
    statement:
      'A weather station recorded the daily rainfall, in mm, on eleven days in a row:\n\n' +
      '$$0, \\; 0, \\; 2, \\; 3, \\; 5, \\; 6, \\; 8, \\; 9, \\; 12, \\; 15, \\; 40.$$\n\n' +
      'Find the median daily rainfall.',
    answer: { type: 'number', value: 6, tolerance: 0, unit: 'mm' },
    cpaPrompts: {
      concrete:
        'Eleven strips, already in order, one per day. Fold the row in half. Which day\'s strip does ' +
        'the fold land on, and how much rain fell that day?',
      pictorial:
        'Eleven dots on a number line running to 40. Ten of them huddle below 15 and one sits far ' +
        'out. Count in from both ends until you meet.',
      abstract:
        'The data is already sorted and $n = 11$, so the median is the value in position ' +
        '$\\frac{11 + 1}{2} = 6$.',
    },
    hints: [
      'The readings are already in order and there are eleven of them. Which position is the middle?',
      'Position 6. Count along: 0, 0, 2, 3, 5, then the sixth.',
    ],
    solution:
      'With $n = 11$ the median is the 6th value:\n\n$$Q_2 = 6 \\text{ mm}.$$\n\nFive days were ' +
      'drier than this and five were wetter. Note how little the 40 mm storm day matters here: it ' +
      'is only one of the five days above the median, and moving it to 400 mm would not change the ' +
      'answer by a drop.',
    misconceptionCodes: ['data-analysis.median-of-unsorted'],
  },
  {
    id: 'data-analysis.rainfall-ssdd-summary',
    skillIds: ['data-analysis.construct-interpret-five-number'],
    tier: 4,
    sequence: { family: 'data-analysis.rainfall-ssdd', position: 2 },
    statement:
      'The same eleven days of rainfall, in mm:\n\n' +
      '$$0, \\; 0, \\; 2, \\; 3, \\; 5, \\; 6, \\; 8, \\; 9, \\; 12, \\; 15, \\; 40.$$\n\n' +
      'Write down the five-number summary.',
    answer: { type: 'set', values: [0, 2, 6, 12, 40], tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Fold the row of eleven strips in half, lift out the middle strip as the divider, then fold ' +
        'each remaining group of five in half. Five folds and ends, five numbers.',
      pictorial:
        'Sketch the box plot on an axis running from 0 to 40. The box will be squashed to the left ' +
        'and the right whisker enormously long — draw it and see.',
      abstract:
        'Sorted already. $Q_2$ is the 6th value; the lower half is the first five and the upper ' +
        'half the last five, so $Q_1$ is the 3rd value and $Q_3$ is the 9th.',
    },
    hints: [
      'Start from the median you already found, and remember it belongs to neither half.',
      'Lower half $0, 0, 2, 3, 5$; upper half $8, 9, 12, 15, 40$. Each has five values, so each quartile is the middle one of its five.',
      'The minimum and maximum are simply the two ends of the whole list.',
    ],
    solution:
      '- $\\min = 0$\n- lower half $0, 0, 2, 3, 5$, so $Q_1 = 2$\n- $Q_2 = 6$ (the 6th of eleven)\n' +
      '- upper half $8, 9, 12, 15, 40$, so $Q_3 = 12$\n- $\\max = 40$\n\nSummary: ' +
      '$0, \\; 2, \\; 6, \\; 12, \\; 40$, with $\\text{IQR} = 12 - 2 = 10$ mm.\n\nThe box plot this ' +
      'draws is worth picturing: a box only 10 mm wide, with a right whisker 28 mm long. The range ' +
      'of 40 mm is almost entirely the work of one storm; the IQR describes what an ordinary day ' +
      'was like.',
    misconceptionCodes: ['data-analysis.quartile-includes-median'],
  },
  {
    id: 'data-analysis.rainfall-ssdd-grouped',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    tier: 4,
    sequence: { family: 'data-analysis.rainfall-ssdd', position: 3 },
    statement:
      'The same eleven days of rainfall are sent to head office grouped, and the daily figures are ' +
      'then thrown away.\n\n' +
      '| Rainfall $r$ (mm) | $0 \\le r < 5$ | $5 \\le r < 10$ | $10 \\le r < 20$ | $20 \\le r < 50$ |\n' +
      '| --- | --- | --- | --- | --- |\n| Number of days | 4 | 4 | 2 | 1 |\n\n' +
      'Head office calculates an estimate of the mean daily rainfall from this table. What figure ' +
      'do they get, in mm, to 2 decimal places?',
    answer: { type: 'number', value: 9.55, tolerance: 0.02, unit: 'mm' },
    cpaPrompts: {
      concrete:
        'Head office has four boxes of slips and no numbers on the slips. They must treat the four ' +
        'days in the first box as 2.5 mm each, and the single day in the last box as 35 mm. How ' +
        'much rain is that altogether, shared between eleven days?',
      pictorial:
        'Draw the four bars, of heights 4, 4, 2, 1, over bands of widths 5, 5, 10 and 30. The lone ' +
        'day in the widest band sits at 35 and drags the balance point a long way right.',
      abstract:
        'Midpoints $2.5, 7.5, 15, 35$ and frequencies $4, 4, 2, 1$; ' +
        '$\\bar{r} \\approx \\frac{\\sum fr}{\\sum f}$ with $\\sum f = 11$.',
    },
    hints: [
      'Work out each band\'s midpoint from its own two ends — the bands are not all the same width.',
      'Midpoints: 2.5, 7.5, 15 and 35. Multiply each by its number of days.',
      '$\\sum fr = 10 + 30 + 30 + 35 = 105$, over 11 days.',
    ],
    solution:
      'Midpoints: $2.5$, $7.5$, $15$, $35$ mm.\n\n$\\sum fr = (2.5)(4) + (7.5)(4) + (15)(2) + ' +
      '(35)(1) = 10 + 30 + 30 + 35 = 105$ mm over $\\sum f = 11$ days.\n\n' +
      '$$\\bar{r} \\approx \\frac{105}{11} = 9.55 \\text{ mm (2 d.p.)}.$$\n\nThe true mean, from ' +
      'the raw readings, is $\\frac{100}{11} = 9.09$ mm — the grouping has cost head office about ' +
      'half a millimetre. The culprit is the storm day: the table only records that it fell ' +
      'somewhere in $20 \\le r < 50$, so the midpoint puts it at 35 mm when it was really 40.\n\n' +
      '**Compare all three questions on this one week.** The median said 6 mm, the grouped estimate ' +
      'says 9.55 mm, and the true mean is 9.09 mm. Same eleven days, three different figures, none ' +
      'of them wrong — they answer different questions, and only the median is untouched by the ' +
      'storm.',
    misconceptionCodes: ['data-analysis.unweighted-midpoints'],
  },
];
