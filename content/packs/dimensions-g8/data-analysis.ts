import type { Problem, SkillNode } from '@/lib/content/schema';

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
    title: 'Calculate estimated mean for grouped frequency data (\\bar{x} = \\frac{\\sum fx}{\\sum f})',
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

export const dataAnalysisProblems: Problem[] = [
  {
    id: 'data-analysis.median-nine-values',
    skillIds: ['data-analysis.calculate-interpret-measures'],
    difficulty: 'basic',
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
    id: 'data-analysis.iqr-nine-values',
    skillIds: ['data-analysis.construct-interpret-five-number', 'data-analysis.calculate-interpret-measures'],
    difficulty: 'basic',
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
    id: 'data-analysis.grouped-mean-scores',
    skillIds: ['data-analysis.calculate-estimated-mean'],
    difficulty: 'advanced',
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
    id: 'data-analysis.correlation-direction',
    skillIds: ['data-analysis.identify-scatter-plot'],
    difficulty: 'basic',
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
];
