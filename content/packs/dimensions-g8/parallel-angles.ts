import type { ProblemInput as Problem, SkillNodeInput as SkillNode } from '@/lib/content/schema';
import type { AngleDiagramSpec } from '@/lib/visual/spec';

/**
 * Unit 7 — Parallel Lines and Angles in Triangles and Polygons. Hand-authored.
 *
 * Source: docs/Implementation Manual (angle rotators, torn paper corners) and the Chapter 7
 * worked examples in the content spec.
 *
 * The through-line: every angle fact here is a fact about *turning*. Walking round any
 * polygon turns you through one full revolution, which is where $360°$ comes from; a
 * straight line is half a turn, which is where $180°$ comes from; and parallel lines are
 * lines that face the same way, which is why a transversal meets them at the same angle.
 */

export const parallelAnglesSkills: SkillNode[] = [
  {
    id: 'parallel-angles.angle-properties-parallel',
    title: 'Use angle facts for parallel lines and transversals',
    summary:
      'Spot corresponding, alternate and co-interior angle pairs by the letter shape they make, ' +
      'and know which pairs are equal and which add to $180°$.',
    prerequisites: [],
    cpa: {
      concrete:
        'Two rulers laid parallel on the desk and a pencil laid across both. Slide the pencil ' +
        'along without turning it: the angle it makes with the first ruler is carried unchanged ' +
        'to the second, because the rulers face the same way. Turn the pencil and *both* angles ' +
        'change together.',
      pictorial:
        'The transversal diagram with one letter highlighted at a time: an F for corresponding ' +
        'angles, a Z for alternate angles, a C (or U) for co-interior angles. Colour the two ' +
        'angles of the pair before writing anything.',
      abstract:
        'Corresponding angles equal; alternate angles equal; co-interior angles supplementary. ' +
        'Each is written with its reason: "alt. $\\angle$s, $AB \\parallel CD$". The reason is ' +
        'part of the answer.',
    },
    formulas: [
      '\\text{corr. } \\angle\\text{s equal}',
      '\\text{alt. } \\angle\\text{s equal}',
      '\\text{co-int. } \\angle\\text{s sum to } 180°',
    ],
    misconceptions: [
      {
        code: 'parallel-angles.alternate-as-supplementary',
        description:
          'Sets two alternate angles to add to $180°$, confusing the Z-shape of alternate angles ' +
          'with the C-shape of co-interior ones.',
        probe:
          'Check the letter shape. Trace the two angles with your finger — do they sit on the ' +
          'same side of the transversal like a C, or on opposite sides like a Z?',
        correction:
          'Co-interior angles (a C-shape, same side of the transversal) sum to $180°$. Alternate ' +
          'angles (a Z-shape, opposite sides) are equal, because sliding along parallel lines ' +
          'carries an angle across unchanged.',
      },
      {
        code: 'parallel-angles.co-interior-as-equal',
        description:
          'Sets two co-interior angles equal to each other, treating "parallel lines" as a ' +
          'licence for every marked angle to be the same, so the C-shape is read like a Z or an F.',
        probe:
          'The two angles sit on the same side of the transversal, between the parallels. If one ' +
          'of them is small, what does that force the other one to be — small as well, or large?',
        correction:
          'Co-interior angles are the two angles inside a C-shape; slide one parallel line onto ' +
          'the other and the pair becomes a straight line, so they sum to $180°$. Only the Z ' +
          '(alternate) and F (corresponding) pairs are equal.',
      },
    ],
    suggestedVisual: 'angle_diagram',
  },
  {
    id: 'parallel-angles.calculate-interior-exterior',
    title: 'Find interior and exterior angles of triangles and polygons',
    summary:
      'Use that the exterior angles of any polygon add to one full turn, and that interior ' +
      'and exterior angles at a vertex add to a straight line, to find any polygon angle.',
    prerequisites: ['parallel-angles.angle-properties-parallel'],
    cpa: {
      concrete:
        'Tear the three corners off a paper triangle and fit them together along a ruler: they ' +
        'make a straight line, so the interior angles sum to $180°$. Then walk round a polygon ' +
        'drawn on the floor, turning at each corner by the exterior angle. When you are back at ' +
        'the start you face the way you began: one full turn, $360°$, no matter how many sides.',
      pictorial:
        'A polygon with one side extended at each vertex so the exterior angle is drawn as a ' +
        'turn. Alongside, the same polygon cut into triangles from one vertex — $n - 2$ of them.',
      abstract:
        'Interior sum $(n-2) \\times 180°$; exterior sum $360°$; at each vertex interior + ' +
        'exterior $= 180°$. For a regular polygon each exterior angle is $\\frac{360°}{n}$, ' +
        'which is usually the quickest route to $n$.',
    },
    formulas: [
      'S_n = (n - 2) \\times 180°',
      '\\text{exterior angles sum to } 360°',
      '\\text{exterior angle of regular } n\\text{-gon} = \\frac{360°}{n}',
    ],
    misconceptions: [
      {
        code: 'parallel-angles.interior-formula-detour',
        description:
          'Reaches for the interior-angle formula $\\frac{(n-2) \\times 180°}{n}$ and sets up an ' +
          'equation in $n$ that they then cannot solve cleanly, when the exterior angle gives ' +
          '$n$ in one step.',
        probe:
          'What do an interior angle and the exterior angle next to it add up to? If the ' +
          'interior is five times the exterior, what is the exterior angle on its own?',
        correction:
          'Interior + exterior $= 180°$ at every vertex, so a ratio between them fixes the ' +
          'exterior angle immediately. Then $n = \\frac{360°}{\\text{exterior}}$, because the ' +
          'exterior angles of any polygon add to one full turn.',
      },
      {
        code: 'parallel-angles.sum-of-exterior-as-180n',
        description:
          'Takes the exterior angles of a polygon to add to $180°$ (or to grow with $n$ like the ' +
          'interior sum), so divides $180°$ rather than $360°$ by $n$ for a regular polygon.',
        probe:
          'Walk round the polygon and turn at every corner by its exterior angle. When you are ' +
          'back at the start, which way are you facing — and how far have you turned in total?',
        correction:
          'The exterior angles are the turns you make walking round the shape, and one lap is ' +
          'one full turn: $360°$ for every polygon, whatever $n$ is. It is the *interior* sum ' +
          '$(n - 2) \\times 180°$ that grows with $n$.',
      },
    ],
    suggestedVisual: 'angle_diagram',
  },
  {
    id: 'parallel-angles.solve-multi-step-geometric',
    title: 'Build multi-step geometric arguments',
    summary:
      'Chain angle facts across a figure, writing a reason for every step, until the unknown ' +
      'is reached.',
    prerequisites: ['parallel-angles.calculate-interior-exterior'],
    cpa: {
      concrete:
        'A figure built from rulers and pencils on the desk. Each fact used is a physical move — ' +
        'slide this along the parallels, tear these three corners and line them up — so every ' +
        'step in the deduction corresponds to something that was actually done.',
      pictorial:
        'The figure with angles filled in one at a time in order, each new one written with a ' +
        'short reason next to it. Highlight the letter shape or triangle being used for each ' +
        'step before writing the number.',
      abstract:
        'A two-column argument: statement, reason. Reasons are the named facts — alt. $\\angle$s, ' +
        'co-int. $\\angle$s, $\\angle$ sum of triangle, ext. $\\angle$ of triangle — and the ' +
        'chain must be checkable line by line.',
    },
    formulas: ['\\text{ext. } \\angle \\text{ of triangle} = \\text{sum of interior opposite } \\angle\\text{s}'],
    misconceptions: [
      {
        code: 'parallel-angles.unstated-reason',
        description:
          'Writes a correct sequence of angle values with no reasons, so an assumed fact — ' +
          'often that two lines are parallel when nothing says so — passes unnoticed.',
        probe:
          'You used the Z-shape between those two lines. Point to where the question says they ' +
          'are parallel — or if it does not, what tells you the alternate angles are equal?',
        correction:
          'Each angle fact is only true under a condition: alternate angles are equal *because* ' +
          'the lines are parallel. Writing the reason is what forces you to check the condition ' +
          'holds, which is why it is required and not decoration.',
      },
    ],
    suggestedVisual: 'angle_diagram',
  },
];

// ---------------------------------------------------------------------------
// Figures. Coordinates are computed so every labelled `value` matches the drawn geometry.
// ---------------------------------------------------------------------------

const DEG = Math.PI / 180;
const round = (v: number) => Math.round(v * 100) / 100;

type Pt = { id: string; x: number; y: number; label?: string };
type Seg = AngleDiagramSpec['segments'][number];
type Ang = AngleDiagramSpec['angles'][number];

const pt = (id: string, x: number, y: number, label = id): Pt => ({ id, x: round(x), y: round(y), label });
const seg = (from: string, to: string, opts: Partial<Seg> = {}): Seg => ({
  from,
  to,
  style: 'solid',
  ticks: 0,
  arrows: 0,
  ...opts,
});
const ang = (from: string, vertex: string, to: string, label: string, value?: number, highlight = false): Ang =>
  value === undefined ? { from, vertex, to, label, highlight } : { from, vertex, to, label, value, highlight };

/**
 * Two lines $AB$ and $CD$ (arrows mark them parallel unless `parallel` is false) cut by the
 * transversal $EF$ at $P$ (on $AB$) and $Q$ (on $CD$). The transversal makes `angle`° with
 * the lines, so $\angle BPQ = \angle DQF =$ `angle` and $\angle APQ = \angle PQD = 180 -$ `angle`.
 */
function transversal(angle: number, angles: Ang[], caption?: string, parallel = true): AngleDiagramSpec {
  const dx = 40 / Math.tan(angle * DEG);
  const len = Math.hypot(dx, 40);
  const ux = dx / len;
  const uy = 40 / len;
  const spec: AngleDiagramSpec = {
    kind: 'angle_diagram',
    points: [
      pt('A', -40, 0),
      pt('B', 60, 0),
      pt('C', -40, 40),
      pt('D', 60, 40),
      pt('P', 0, 0),
      pt('Q', dx, 40),
      pt('E', -15 * ux, -15 * uy),
      pt('F', dx + 15 * ux, 40 + 15 * uy),
    ],
    segments: [seg('A', 'B', { arrows: parallel ? 1 : 0 }), seg('C', 'D', { arrows: parallel ? 1 : 0 }), seg('E', 'F')],
    angles,
  };
  if (caption) spec.caption = caption;
  return spec;
}

/** $AB \parallel CD$ with a point $E$ between them joined to $A$ and $C$: the zig-zag. */
function zigzag(angleAtA: number, angleAtC: number, angles: Ang[]): AngleDiagramSpec {
  const t = Math.cos(angleAtC * DEG) / Math.cos(angleAtA * DEG);
  const s = 40 / (Math.sin(angleAtC * DEG) + t * Math.sin(angleAtA * DEG));
  return {
    kind: 'angle_diagram',
    points: [
      pt('A', 0, 40),
      pt('B', 60, 40),
      pt('C', 0, 0),
      pt('D', 60, 0),
      pt('E', s * Math.cos(angleAtC * DEG), s * Math.sin(angleAtC * DEG)),
    ],
    segments: [seg('A', 'B', { arrows: 1 }), seg('C', 'D', { arrows: 1 }), seg('A', 'E'), seg('E', 'C')],
    angles,
  };
}

/**
 * $AB \parallel CD$; $P$ on $AB$, $Q$ and $R$ on $CD$; triangle $PQR$. $\angle APQ =$ `atQ`
 * (so $\angle PQR =$ `atQ` too) and $\angle PRQ =$ `atR`. Ticks mark $PQ = PR$ when asked.
 */
function chain(atQ: number, atR: number, angles: Ang[], isosceles = false): AngleDiagramSpec {
  return {
    kind: 'angle_diagram',
    points: [
      pt('A', -40, 40),
      pt('B', 70, 40),
      pt('C', -40, 0),
      pt('D', 70, 0),
      pt('P', 20, 40),
      pt('Q', 20 - 40 / Math.tan(atQ * DEG), 0),
      pt('R', 20 + 40 / Math.tan(atR * DEG), 0),
    ],
    segments: [
      seg('A', 'B', { arrows: 1 }),
      seg('C', 'D', { arrows: 1 }),
      seg('P', 'Q', { ticks: isosceles ? 1 : 0 }),
      seg('P', 'R', { ticks: isosceles ? 1 : 0 }),
    ],
    angles,
  };
}

/** Triangle $XYZ$ with base $XY$ and the given base angles; $W$ extends $XY$ beyond $Y$. */
function triangle(atX: number, atY: number, angles: Ang[], opts: { ticks?: boolean; extend?: boolean } = {}): AngleDiagramSpec {
  const t = 60 / (Math.cos(atX * DEG) + (Math.sin(atX * DEG) / Math.sin(atY * DEG)) * Math.cos(atY * DEG));
  const z = { x: t * Math.cos(atX * DEG), y: t * Math.sin(atX * DEG) };
  const points = [pt('X', 0, 0), pt('Y', 60, 0), pt('Z', z.x, z.y)];
  const segments = [seg('X', 'Y'), seg('Y', 'Z', { ticks: opts.ticks ? 1 : 0 }), seg('Z', 'X', { ticks: opts.ticks ? 1 : 0 })];
  if (opts.extend) {
    points.push(pt('W', 85, 0));
    segments.push(seg('Y', 'W', { style: 'dashed' }));
  }
  return { kind: 'angle_diagram', points, segments, angles };
}

const S1 = 'parallel-angles.angle-properties-parallel';
const S2 = 'parallel-angles.calculate-interior-exterior';
const S3 = 'parallel-angles.solve-multi-step-geometric';

const RELATIONSHIP_HINT =
  'Name the pair first (F, Z or C), then write the fact that pair obeys, then the number.';

export const parallelAnglesProblems: Problem[] = [
  // =========================================================================
  // Skill 1 — angle properties of parallel lines
  // =========================================================================

  // --- Tier 1: one transversal, one angle of 62°, every pair in turn ---------------------
  {
    id: 'parallel-angles.transversal-62-corresponding',
    skillIds: [S1],
    tier: 1,
    sequence: { family: 'parallel-angles.transversal-62', position: 1 },
    statement:
      'In the figure, $AB \\parallel CD$. The transversal $EF$ meets $AB$ at $P$ and $CD$ at $Q$, ' +
      'and $\\angle BPQ = 62°$. Find $\\angle DQF$.',
    answer: { type: 'number', value: 62, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay a pencil across two parallel rulers at $62°$ to the first ruler. Slide it up to the ' +
        'second ruler without turning it. What angle does it make there?',
      pictorial:
        'Colour $\\angle BPQ$ and $\\angle DQF$. They sit in the same position at each crossing — ' +
        'what letter do the two lines and the transversal make around them?',
      abstract:
        'Corresponding angles on parallel lines are equal. Write the value with its reason: ' +
        'corr. $\\angle$s, $AB \\parallel CD$.',
    },
    hints: [
      'Both angles are on the right of the transversal and above their own parallel line. Trace an F.',
      'Corresponding angles are equal when the lines are parallel.',
    ],
    solution:
      '$\\angle BPQ$ and $\\angle DQF$ are corresponding angles (F-shape) and $AB \\parallel CD$, ' +
      'so $\\angle DQF = \\angle BPQ = 62°$ (corr. $\\angle$s).',
    misconceptionCodes: ['parallel-angles.co-interior-as-equal'],
    figure: transversal(62, [ang('B', 'P', 'Q', '62°', 62, true), ang('D', 'Q', 'F', '?', 62)]),
  },
  {
    id: 'parallel-angles.transversal-62-alternate',
    skillIds: [S1],
    tier: 1,
    sequence: { family: 'parallel-angles.transversal-62', position: 2 },
    expect:
      'Still $62°$ at $P$, but now the angle asked for is on the *other* side of the transversal ' +
      'at $Q$, between the parallels. Z-shape: will it be equal to $62°$, or different?',
    statement:
      'In the figure, $AB \\parallel CD$ and the transversal $EF$ meets them at $P$ and $Q$. ' +
      '$\\angle BPQ = 62°$. Find $\\angle CQP$.',
    answer: { type: 'number', value: 62, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Slide the pencil up to the second ruler. The angle it makes on the left of the second ' +
        'ruler and the angle on the right of the first ruler — are they the same size?',
      pictorial:
        'Colour $\\angle BPQ$ and $\\angle CQP$. One is right of the transversal, one is left; both ' +
        'are between the parallels. Which letter is that?',
      abstract: 'Alternate angles on parallel lines are equal: alt. $\\angle$s, $AB \\parallel CD$.',
    },
    hints: [
      'The two angles are on opposite sides of the transversal and both between the parallels.',
      'That is a Z-shape: alternate angles, which are equal.',
    ],
    solution:
      '$\\angle BPQ$ and $\\angle CQP$ are alternate angles (Z-shape) and $AB \\parallel CD$, so ' +
      '$\\angle CQP = 62°$ (alt. $\\angle$s).',
    misconceptionCodes: ['parallel-angles.alternate-as-supplementary'],
    figure: transversal(62, [ang('B', 'P', 'Q', '62°', 62, true), ang('C', 'Q', 'P', '?', 62)]),
  },
  {
    id: 'parallel-angles.transversal-62-co-interior',
    skillIds: [S1],
    tier: 1,
    sequence: { family: 'parallel-angles.transversal-62', position: 3 },
    expect:
      'Same $62°$. The unknown has moved to the *same* side of the transversal as it, still ' +
      'between the parallels — a C-shape. Will it still be $62°$?',
    statement:
      'In the figure, $AB \\parallel CD$ and the transversal $EF$ meets them at $P$ and $Q$. ' +
      '$\\angle BPQ = 62°$. Find $\\angle PQD$.',
    answer: { type: 'number', value: 118, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Slide the second ruler down onto the first. The two angles now sit side by side on one ' +
        'straight line. What must they add up to?',
      pictorial:
        'Colour $\\angle BPQ$ and $\\angle PQD$: both on the right of the transversal, both between ' +
        'the parallels. Which letter is that — and is it an "equal" letter?',
      abstract: 'Co-interior angles sum to $180°$: $\\angle PQD = 180° - 62°$ (co-int. $\\angle$s).',
    },
    hints: [
      'Both angles are on the same side of the transversal, between the parallels: a C-shape.',
      'Co-interior angles add to $180°$. Subtract $62°$ from $180°$.',
    ],
    solution:
      '$\\angle BPQ$ and $\\angle PQD$ are co-interior angles (C-shape) and $AB \\parallel CD$, so ' +
      '$\\angle PQD = 180° - 62° = 118°$ (co-int. $\\angle$s).\n\nCheck: $\\angle PQD$ and ' +
      '$\\angle CQP$ lie on the straight line $CD$, and $118° + 62° = 180°$.',
    misconceptionCodes: ['parallel-angles.co-interior-as-equal'],
    figure: transversal(62, [ang('B', 'P', 'Q', '62°', 62, true), ang('P', 'Q', 'D', '?', 118)]),
  },
  {
    id: 'parallel-angles.transversal-62-vertically-opposite',
    skillIds: [S1],
    tier: 1,
    sequence: { family: 'parallel-angles.transversal-62', position: 4 },
    expect:
      'This time the unknown is at $P$ itself, across the crossing from the $62°$. Do you need ' +
      'the parallel lines at all for this one?',
    statement:
      'In the figure, $AB \\parallel CD$ and the transversal $EF$ meets them at $P$ and $Q$. ' +
      '$\\angle BPQ = 62°$. Find $\\angle APE$.',
    answer: { type: 'number', value: 62, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two pencils crossing make four angles. Rotate the whole crossing half a turn about the ' +
        'crossing point: which angle lands on which?',
      pictorial: 'Colour $\\angle BPQ$ and $\\angle APE$. They share only the vertex $P$ and form an X.',
      abstract: 'Vertically opposite angles are equal: $\\angle APE = \\angle BPQ$ (vert. opp. $\\angle$s).',
    },
    hints: [
      'Look only at the crossing at $P$. $\\angle APE$ is opposite $\\angle BPQ$ across the X.',
      'Vertically opposite angles are equal — the second ruler is not needed here.',
    ],
    solution:
      '$\\angle APE$ and $\\angle BPQ$ are vertically opposite angles at $P$, so $\\angle APE = 62°$ ' +
      '(vert. opp. $\\angle$s). The parallel lines play no part in this step.',
    misconceptionCodes: ['parallel-angles.unstated-reason'],
    figure: transversal(62, [ang('B', 'P', 'Q', '62°', 62, true), ang('A', 'P', 'E', '?', 62)]),
  },
  {
    id: 'parallel-angles.alternate-angles-x',
    skillIds: [S1, S3],
    tier: 1,
    sequence: { family: 'parallel-angles.transversal-62', position: 5 },
    expect:
      'The numbers have become expressions in $x$, and the pair is alternate. What equation ' +
      'does "alternate angles are equal" give you before you touch any algebra?',
    statement:
      'In the figure, $AB \\parallel CD$. A transversal meets $AB$ at $P$ and $CD$ at $Q$. ' +
      '$\\angle APQ = (3x + 20)°$ and $\\angle PQD = (5x - 40)°$. Find the value of $x$.',
    answer: { type: 'number', value: 30, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay two parallel rulers down with a pencil across them. Slide the pencil from $P$ to ' +
        '$Q$ without turning it. Which angle at $Q$ matches the angle at $P$?',
      pictorial:
        'Draw the two parallel lines and the transversal. Colour $\\angle APQ$ and $\\angle PQD$. ' +
        'Which letter do they make together — an F, a Z or a C?',
      abstract:
        'Identify the pair as alternate angles, set the expressions equal with the reason, and ' +
        'solve the linear equation.',
    },
    hints: [
      'Look at the positions of $\\angle APQ$ and $\\angle PQD$. Do they form a Z-shape between ' +
        'the parallel lines?',
      'Because they are alternate angles, they are equal. Set the two expressions equal to each ' +
        'other.',
      'Solve $3x + 20 = 5x - 40$: collect the $x$ terms on one side and the numbers on the other.',
    ],
    solution:
      '$\\angle APQ$ and $\\angle PQD$ are alternate angles (Z-shape), so they are equal because ' +
      '$AB \\parallel CD$.\n\n$$3x + 20 = 5x - 40 \\implies 60 = 2x \\implies x = 30.$$\n\n' +
      'Then $\\angle APQ = 3(30) + 20 = 110°$.',
    misconceptionCodes: ['parallel-angles.alternate-as-supplementary', 'parallel-angles.unstated-reason'],
    figure: transversal(70, [ang('A', 'P', 'Q', '(3x+20)°', 110, true), ang('P', 'Q', 'D', '(5x−40)°', 110, true)]),
  },
  {
    id: 'parallel-angles.transversal-corresponding-x',
    skillIds: [S1],
    tier: 1,
    sequence: { family: 'parallel-angles.transversal-62', position: 6 },
    expect:
      'Expressions again, but the pair has moved from a Z to an F. Does the equation you write ' +
      'change its shape, or only its letters?',
    statement:
      'In the figure, $AB \\parallel CD$ and the transversal $EF$ meets them at $P$ and $Q$. ' +
      '$\\angle BPQ = (4x - 6)°$ and $\\angle DQF = (2x + 50)°$. Find the value of $x$.',
    answer: { type: 'number', value: 28, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Slide the pencil from the first ruler to the second without turning it. The angle it ' +
        'carries is the same at both — so the two expressions describe one angle.',
      pictorial: 'Colour $\\angle BPQ$ and $\\angle DQF$ and trace the F that contains them both.',
      abstract: 'Corresponding angles are equal: $4x - 6 = 2x + 50$, then solve for $x$.',
    },
    hints: [
      'Both angles are on the right of the transversal, each just above its own line: an F-shape.',
      'Corresponding angles are equal. Set $4x - 6 = 2x + 50$.',
      'Take $2x$ from both sides and add $6$ to both sides.',
    ],
    solution:
      '$\\angle BPQ$ and $\\angle DQF$ are corresponding angles and $AB \\parallel CD$, so\n\n' +
      '$$4x - 6 = 2x + 50 \\implies 2x = 56 \\implies x = 28.$$\n\nCheck: both angles equal ' +
      '$4(28) - 6 = 106°$ and $2(28) + 50 = 106°$.',
    misconceptionCodes: ['parallel-angles.co-interior-as-equal'],
    figure: transversal(106, [ang('B', 'P', 'Q', '(4x−6)°', 106, true), ang('D', 'Q', 'F', '(2x+50)°', 106, true)]),
  },
  {
    id: 'parallel-angles.transversal-co-interior-x',
    skillIds: [S1],
    tier: 1,
    sequence: { family: 'parallel-angles.transversal-62', position: 7 },
    expect:
      'Now the two expressions sit in a C-shape. The last two items gave "$=$" equations; what ' +
      'kind of equation does a C give, and what number appears in it?',
    statement:
      'In the figure, $AB \\parallel CD$ and the transversal $EF$ meets them at $P$ and $Q$. ' +
      '$\\angle BPQ = (2x + 14)°$ and $\\angle PQD = (3x + 11)°$. Find the value of $x$.',
    answer: { type: 'number', value: 31, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Slide the second ruler down onto the first. The two angles now sit together on one ' +
        'straight line — what do they add up to?',
      pictorial:
        'Colour $\\angle BPQ$ and $\\angle PQD$: same side of the transversal, between the parallels. ' +
        'That is a C, and a C is a "sum" letter, not an "equal" letter.',
      abstract: 'Co-interior angles sum to $180°$: $(2x + 14) + (3x + 11) = 180$, then solve.',
    },
    hints: [
      'The pair is co-interior (C-shape). Co-interior angles are not equal — they add to $180°$.',
      'Write $(2x + 14) + (3x + 11) = 180$ and collect like terms.',
      '$5x + 25 = 180$, so $5x = 155$.',
    ],
    solution:
      '$\\angle BPQ$ and $\\angle PQD$ are co-interior angles and $AB \\parallel CD$, so they sum ' +
      'to $180°$:\n\n$$2x + 14 + 3x + 11 = 180 \\implies 5x = 155 \\implies x = 31.$$\n\n' +
      'Check: $2(31) + 14 = 76°$ and $3(31) + 11 = 104°$, and $76° + 104° = 180°$.',
    misconceptionCodes: ['parallel-angles.co-interior-as-equal', 'parallel-angles.alternate-as-supplementary'],
    figure: transversal(76, [ang('B', 'P', 'Q', '(2x+14)°', 76, true), ang('P', 'Q', 'D', '(3x+11)°', 104, true)]),
  },

  // --- Tier 2: unfamiliar surfaces --------------------------------------------------------
  {
    id: 'parallel-angles.two-transversals',
    skillIds: [S1],
    tier: 2,
    statement:
      'In the figure, $AB \\parallel CD$. Two lines from $P$ and $S$ on $AB$ meet at $R$ on $CD$. ' +
      '$\\angle BPR = 54°$ and $\\angle ASR = 61°$. Find $\\angle PRS$.',
    answer: { type: 'number', value: 65, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two pencils lean across the rulers and meet at the top ruler. Slide each pencil up its ' +
        'own path: each carries its own angle to the top ruler.',
      pictorial:
        'Mark the three angles at $R$ along the line $CD$. Two of them are alternate to angles ' +
        'you already know; the third is $\\angle PRS$.',
      abstract:
        'Find $\\angle CRP$ and $\\angle DRS$ by alternate angles, then use angles on the straight ' +
        'line $CD$ at $R$.',
    },
    hints: [
      '$\\angle BPR$ and $\\angle CRP$ make a Z. So do $\\angle ASR$ and $\\angle DRS$.',
      'At $R$ the three angles $\\angle CRP$, $\\angle PRS$ and $\\angle SRD$ lie along the straight line $CD$.',
      '$\\angle PRS = 180° - 54° - 61°$.',
    ],
    solution:
      '$\\angle CRP = \\angle BPR = 54°$ (alt. $\\angle$s, $AB \\parallel CD$).\n\n' +
      '$\\angle DRS = \\angle ASR = 61°$ (alt. $\\angle$s, $AB \\parallel CD$).\n\n' +
      'Angles on the straight line $CD$ at $R$: $\\angle PRS = 180° - 54° - 61° = 65°$.',
    misconceptionCodes: ['parallel-angles.alternate-as-supplementary', 'parallel-angles.unstated-reason'],
    figure: {
      kind: 'angle_diagram',
      points: [pt('A', -30, 0), pt('B', 80, 0), pt('C', -30, 40), pt('D', 80, 40), pt('P', 0, 0), pt('S', 51.23, 0), pt('R', 29.06, 40)],
      segments: [seg('A', 'B', { arrows: 1 }), seg('C', 'D', { arrows: 1 }), seg('P', 'R'), seg('S', 'R')],
      angles: [ang('B', 'P', 'R', '54°', 54), ang('A', 'S', 'R', '61°', 61), ang('P', 'R', 'S', '?', 65, true)],
    },
  },
  {
    id: 'parallel-angles.zigzag-added-parallel',
    skillIds: [S1],
    tier: 2,
    statement:
      'In the figure, $AB \\parallel CD$. The point $E$ lies between the two lines, with ' +
      '$\\angle BAE = 35°$ and $\\angle ECD = 48°$. Find $\\angle AEC$.',
    answer: { type: 'number', value: 83, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Lay a third ruler through $E$, parallel to the other two. The bent path $A$–$E$–$C$ is ' +
        'now two separate crossings, each with its own Z.',
      pictorial:
        'Draw a dashed line through $E$ parallel to $AB$. It splits $\\angle AEC$ into an upper ' +
        'part and a lower part. Which known angle is alternate to each part?',
      abstract:
        'With the auxiliary parallel through $E$: upper part $= 35°$ (alt. $\\angle$s), lower part ' +
        '$= 48°$ (alt. $\\angle$s), so $\\angle AEC = 35° + 48°$.',
    },
    hints: [
      'There is no single transversal crossing both lines. Add one more parallel line, through $E$.',
      'The new line splits $\\angle AEC$ into two angles, each alternate to a given angle.',
      '$\\angle AEC = 35° + 48°$.',
    ],
    solution:
      'Draw $EX$ through $E$ parallel to $AB$ and $CD$. Then $\\angle AEX = \\angle BAE = 35°$ ' +
      '(alt. $\\angle$s, $AB \\parallel EX$) and $\\angle XEC = \\angle ECD = 48°$ (alt. $\\angle$s, ' +
      '$EX \\parallel CD$).\n\n$$\\angle AEC = 35° + 48° = 83°.$$',
    misconceptionCodes: ['parallel-angles.alternate-as-supplementary', 'parallel-angles.unstated-reason'],
    figure: zigzag(35, 48, [ang('B', 'A', 'E', '35°', 35), ang('E', 'C', 'D', '48°', 48), ang('A', 'E', 'C', '?', 83, true)]),
  },
  {
    id: 'parallel-angles.name-the-pair-alternate',
    skillIds: [S1],
    tier: 2,
    statement:
      'In the figure, $AB \\parallel CD$ and the transversal $EF$ meets them at $P$ and $Q$. No ' +
      'angles are given. What is the relationship between $\\angle APQ$ and $\\angle PQD$? Give ' +
      'its name.',
    answer: {
      type: 'exact',
      value: 'alternate',
      accepts: ['alternate angles', 'Z angles', 'alt', 'alt angles', 'alternate interior angles', 'alternate (equal)', 'equal alternate angles', 'z'],
    },
    cpaPrompts: {
      concrete:
        'Without any numbers, slide the pencil from $P$ to $Q$. Which angle at $Q$ is the one the ' +
        'pencil carried, and on which side of the pencil does it sit?',
      pictorial: 'Shade $\\angle APQ$ and $\\angle PQD$. Trace the letter their arms make: F, Z or C?',
      abstract:
        'Opposite sides of the transversal, both between the parallels: alternate angles, and ' +
        'therefore equal.',
    },
    hints: [
      '$A$ is on one side of the transversal and $D$ is on the other. Both angles are between the parallels.',
      'Opposite sides, inside the parallels: that letter is a Z.',
    ],
    solution:
      '$\\angle APQ$ and $\\angle PQD$ lie on opposite sides of the transversal $PQ$ and between the ' +
      'parallel lines, forming a Z-shape. They are **alternate angles**, so they are equal.',
    misconceptionCodes: ['parallel-angles.alternate-as-supplementary'],
    figure: transversal(65, [ang('A', 'P', 'Q', 'a', 115, true), ang('P', 'Q', 'D', 'b', 115, true)]),
  },
  {
    id: 'parallel-angles.name-the-pair-co-interior',
    skillIds: [S1],
    tier: 2,
    statement:
      'In the figure, $AB \\parallel CD$ and the transversal $EF$ meets them at $P$ and $Q$. ' +
      'Are $\\angle BPQ$ and $\\angle PQD$ equal, or do they add to $180°$? Answer "equal" or ' +
      '"supplementary".',
    answer: {
      type: 'exact',
      value: 'supplementary',
      accepts: ['add to 180', 'sum to 180', 'they add to 180', '180', 'co-interior', 'co interior', 'add up to 180', 'supplementary (180)'],
    },
    cpaPrompts: {
      concrete:
        'Slide the top ruler down onto the bottom one. Where do the two angles end up — one on ' +
        'top of the other, or side by side along the ruler?',
      pictorial: 'Shade $\\angle BPQ$ and $\\angle PQD$. Same side of the transversal, inside: a C.',
      abstract: 'Co-interior angles (C-shape) are supplementary: they sum to $180°$.',
    },
    hints: [
      '$B$ and $D$ are on the same side of the transversal. Both angles are between the parallels.',
      'Same side, inside: a C-shape. The C is the one letter whose pair is *not* equal.',
    ],
    solution:
      '$\\angle BPQ$ and $\\angle PQD$ are on the same side of the transversal and between the ' +
      'parallels: co-interior angles. They are **supplementary** — they add to $180°$ — not equal.',
    misconceptionCodes: ['parallel-angles.co-interior-as-equal'],
    figure: transversal(65, [ang('B', 'P', 'Q', 'a', 65, true), ang('P', 'Q', 'D', 'b', 115, true)]),
  },

  // --- Tier 3: contexts --------------------------------------------------------------------
  {
    id: 'parallel-angles.railway-footpath',
    skillIds: [S1],
    tier: 3,
    statement:
      'Two straight railway rails run side by side, the same distance apart everywhere. A straight ' +
      'footpath crosses both. Where it crosses the first rail, the path makes an angle of $38°$ ' +
      'with that rail. What obtuse angle does the path make with the second rail?',
    answer: { type: 'number', value: 142, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two rulers for the rails, a pencil for the path. Slide the pencil from the first rail to ' +
        'the second without turning it. Does the angle it makes change?',
      pictorial:
        'Sketch the two rails as parallel lines and the path as a transversal. Mark $38°$ at the ' +
        'first crossing, then mark every angle at the second crossing.',
      abstract:
        'Rails a constant distance apart are parallel. The path meets the second rail at $38°$ and ' +
        '$180° - 38°$; the obtuse one is asked for.',
    },
    hints: [
      'Rails that stay the same distance apart are parallel lines, and the path is a transversal.',
      'The path meets the second rail at the same $38°$ (corresponding angles), and at $180° - 38°$ on the other side.',
    ],
    solution:
      'The rails are parallel, so the path makes the same $38°$ with the second rail ' +
      '(corr. $\\angle$s). The other angle at that crossing lies on a straight line with it, so it ' +
      'is $180° - 38° = 142°$. The obtuse angle is $142°$.',
    misconceptionCodes: ['parallel-angles.co-interior-as-equal'],
  },
  {
    id: 'parallel-angles.ladder-scaffold-bar',
    skillIds: [S1],
    tier: 3,
    statement:
      'A ladder leans against a wall, making $70°$ with the level ground. Higher up, a horizontal ' +
      'scaffolding bar crosses in front of the ladder. Find the acute angle between the bar and ' +
      'the ladder.',
    answer: { type: 'number', value: 70, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The ground is one ruler and the bar is another, both horizontal, so they face the same ' +
        'way. The ladder is a pencil lying across both.',
      pictorial:
        'Draw the ground and the bar as two horizontal lines and the ladder as a slanted line ' +
        'across them. Mark $70°$ at the ground crossing and find its match at the bar.',
      abstract:
        'Horizontal bar $\\parallel$ level ground; the ladder is a transversal. The acute angle at ' +
        'the bar corresponds to the $70°$ at the ground.',
    },
    hints: [
      'What is true of the ground and the bar? Both are horizontal — so what are they to each other?',
      'The ladder crosses two parallel lines. Its angle with one is carried to the other.',
    ],
    solution:
      'The bar and the ground are both horizontal, so they are parallel and the ladder is a ' +
      'transversal. The acute angle between the ladder and the bar is corresponding to the $70°$ ' +
      'at the ground, so it is $70°$ (corr. $\\angle$s). The obtuse angle on the other side of the ' +
      'ladder is $110°$.',
    misconceptionCodes: ['parallel-angles.alternate-as-supplementary'],
  },

  // --- Diagnostics -------------------------------------------------------------------------
  {
    id: 'parallel-angles.dx-alternate-as-supplementary',
    skillIds: [S1],
    tier: 'diagnostic',
    statement:
      'In the figure, $AB \\parallel CD$ and the transversal meets them at $P$ and $Q$. ' +
      '$\\angle APQ = (3x + 20)°$ and $\\angle PQD = (5x - 40)°$. Find $\\angle APQ$.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$95°$', misconceptionCode: 'parallel-angles.alternate-as-supplementary' },
        { label: 'B', value: '$110°$' },
        { label: 'C', value: '$30°$', misconceptionCode: 'quadratic.answers-the-variable-not-the-question' },
      ],
    },
    cpaPrompts: {
      concrete: 'Slide the pencil from $P$ to $Q$. Is the angle it carries the same size, or its supplement?',
      pictorial: 'Shade the two angles. They are on opposite sides of the transversal: which letter?',
      abstract: 'Alternate angles are equal, so $3x + 20 = 5x - 40$; then evaluate $\\angle APQ$, not just $x$.',
    },
    hints: [
      'Decide first whether the pair is a Z or a C. A Z gives an "equals" equation.',
      'After finding $x$, the question asks for the angle: substitute back into $3x + 20$.',
    ],
    solution:
      'Alternate angles: $3x + 20 = 5x - 40 \\implies x = 30$, so $\\angle APQ = 3(30) + 20 = 110°$.\n\n' +
      'Setting the pair to sum to $180°$ gives $8x - 20 = 180$, $x = 25$ and $95°$ — that treats a ' +
      'Z as a C. Answering $30$ gives $x$ rather than the angle asked for.',
    misconceptionCodes: ['parallel-angles.alternate-as-supplementary', 'quadratic.answers-the-variable-not-the-question'],
    figure: transversal(70, [ang('A', 'P', 'Q', '(3x+20)°', 110, true), ang('P', 'Q', 'D', '(5x−40)°', 110, true)]),
  },
  {
    id: 'parallel-angles.dx-co-interior-as-equal',
    skillIds: [S1],
    tier: 'diagnostic',
    statement:
      'In the figure, $AB \\parallel CD$ and the transversal meets them at $P$ and $Q$. ' +
      '$\\angle BPQ = (2x + 14)°$ and $\\angle PQD = (3x + 11)°$. Find $\\angle PQD$.',
    answer: {
      type: 'choice',
      correct: 'C',
      options: [
        { label: 'A', value: '$20°$', misconceptionCode: 'parallel-angles.co-interior-as-equal' },
        { label: 'B', value: '$31°$', misconceptionCode: 'quadratic.answers-the-variable-not-the-question' },
        { label: 'C', value: '$104°$' },
      ],
    },
    cpaPrompts: {
      concrete: 'Slide the top ruler down onto the bottom one. Do the two angles land side by side on a line?',
      pictorial: 'Shade the two angles: same side of the transversal, inside the parallels. That is a C.',
      abstract: 'Co-interior angles sum to $180°$: $(2x + 14) + (3x + 11) = 180$, then evaluate $3x + 11$.',
    },
    hints: [
      'Same side of the transversal, between the parallels: is that an "equal" letter or a "sum" letter?',
      'Solve $5x + 25 = 180$, then substitute into $3x + 11$ for the angle.',
    ],
    solution:
      'Co-interior angles sum to $180°$: $5x + 25 = 180 \\implies x = 31$, so ' +
      '$\\angle PQD = 3(31) + 11 = 104°$.\n\nSetting the pair *equal* gives $2x + 14 = 3x + 11$, ' +
      '$x = 3$ and $20°$ — but two angles of $20°$ cannot be co-interior on parallel lines. ' +
      'Answering $31$ gives $x$ rather than the angle.',
    misconceptionCodes: ['parallel-angles.co-interior-as-equal', 'quadratic.answers-the-variable-not-the-question'],
    figure: transversal(76, [ang('B', 'P', 'Q', '(2x+14)°', 76, true), ang('P', 'Q', 'D', '(3x+11)°', 104, true)]),
  },

  // =========================================================================
  // Skill 2 — interior and exterior angles of triangles and polygons
  // =========================================================================

  // --- Tier 1a: triangle angles --------------------------------------------------------------
  {
    id: 'parallel-angles.triangle-two-known',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.triangle-angles', position: 1 },
    statement: 'In triangle $XYZ$, $\\angle X = 50°$ and $\\angle Y = 60°$. Find $\\angle Z$.',
    answer: { type: 'number', value: 70, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Tear the three corners off a paper triangle and fit them together along a ruler. What ' +
        'shape do the three corners make when they meet?',
      pictorial: 'Draw the triangle and write $50°$ and $60°$ in their corners. How much of $180°$ is left for $Z$?',
      abstract: 'Angle sum of a triangle: $\\angle Z = 180° - 50° - 60°$.',
    },
    hints: ['The three angles of any triangle add to $180°$.', '$\\angle Z = 180° - (50° + 60°)$.'],
    solution: 'Angle sum of a triangle: $\\angle Z = 180° - 50° - 60° = 70°$.\n\nCheck: $50° + 60° + 70° = 180°$.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
    figure: triangle(50, 60, [ang('Y', 'X', 'Z', '50°', 50), ang('Z', 'Y', 'X', '60°', 60), ang('X', 'Z', 'Y', '?', 70, true)]),
  },
  {
    id: 'parallel-angles.triangle-exterior-angle',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.triangle-angles', position: 2 },
    expect:
      'Same triangle, but now $XY$ is extended past $Y$ to $W$ and the angle asked for is *outside* ' +
      'the triangle. Will it be bigger or smaller than $\\angle Z$?',
    statement:
      'In triangle $XYZ$, $\\angle X = 50°$ and $\\angle Y = 60°$. The side $XY$ is extended to $W$. ' +
      'Find the exterior angle $\\angle ZYW$.',
    answer: { type: 'number', value: 120, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Walk along $XY$ and turn at $Y$ to face along $YZ$. The turn you make is the exterior ' +
        'angle. It is the corner you did *not* stand on, plus the corner behind you.',
      pictorial: 'Mark $\\angle XYZ$ and $\\angle ZYW$ on the straight line $XW$. Together they make a straight line.',
      abstract:
        'Exterior angle $=$ sum of the two interior opposite angles: $\\angle ZYW = 50° + 70°$, or ' +
        '$180° - 60°$ on the straight line.',
    },
    hints: [
      '$\\angle XYZ$ and $\\angle ZYW$ lie on the straight line $XW$.',
      'Either use $180° - 60°$, or add the two interior angles not at $Y$: $50° + 70°$.',
    ],
    solution:
      '$\\angle XYZ = 60°$, so on the straight line $XW$: $\\angle ZYW = 180° - 60° = 120°$.\n\n' +
      'Equivalently, the exterior angle equals the sum of the interior opposite angles: $50° + 70° = 120°$.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
    figure: triangle(50, 60, [ang('Y', 'X', 'Z', '50°', 50), ang('Z', 'Y', 'X', '60°', 60), ang('Z', 'Y', 'W', '?', 120, true)], { extend: true }),
  },
  {
    id: 'parallel-angles.triangle-exterior-reversed',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.triangle-angles', position: 3 },
    expect:
      'Reversed: the exterior angle $120°$ is given and $\\angle Y$ is hidden. Which interior angle ' +
      'is *not* part of the exterior angle at $Y$?',
    statement:
      'In triangle $XYZ$, the side $XY$ is extended to $W$ and the exterior angle $\\angle ZYW = 120°$. ' +
      '$\\angle X = 50°$. Find $\\angle Z$.',
    answer: { type: 'number', value: 70, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The turn at $Y$ is $120°$. It is made up of the two corners you have not visited yet: the ' +
        'one at $X$ and the one at $Z$. One of them is $50°$.',
      pictorial: 'Write $120°$ outside at $Y$. Either find $\\angle Y$ first, or split $120°$ into $50°$ and the rest.',
      abstract: 'Exterior angle $=$ sum of interior opposite angles: $120° = 50° + \\angle Z$.',
    },
    hints: [
      'The exterior angle at $Y$ equals the two interior angles at $X$ and $Z$ added together.',
      '$\\angle Z = 120° - 50°$. Check it by finding $\\angle Y = 60°$ and using the angle sum.',
    ],
    solution:
      'Exterior angle of a triangle: $\\angle ZYW = \\angle X + \\angle Z$, so $\\angle Z = 120° - 50° = 70°$.\n\n' +
      'Check: $\\angle Y = 180° - 120° = 60°$ and $50° + 60° + 70° = 180°$.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
    figure: triangle(50, 60, [ang('Y', 'X', 'Z', '50°', 50), ang('Z', 'Y', 'W', '120°', 120), ang('X', 'Z', 'Y', '?', 70, true)], { extend: true }),
  },
  {
    id: 'parallel-angles.isosceles-apex-given',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.triangle-angles', position: 4 },
    expect:
      'Only one angle is given now, but two sides are marked equal. What extra fact does "two ' +
      'equal sides" give you about the angles?',
    statement:
      'In triangle $XYZ$, $ZX = ZY$ and $\\angle Z = 40°$. Find $\\angle X$.',
    answer: { type: 'number', value: 70, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Fold the paper triangle along the line from $Z$ to the middle of $XY$. Corner $X$ lands ' +
        'exactly on corner $Y$: they are the same size.',
      pictorial: 'Mark the two equal sides with ticks and the two equal base angles with the same arc.',
      abstract: 'Base angles of an isosceles triangle are equal: $2\\angle X + 40° = 180°$.',
    },
    hints: [
      'Equal sides face equal angles: $\\angle X = \\angle Y$.',
      'The two base angles share $180° - 40°$ equally.',
    ],
    solution:
      '$ZX = ZY$, so $\\angle X = \\angle Y$ (base $\\angle$s of isos. triangle). Then\n\n' +
      '$$\\angle X = \\frac{180° - 40°}{2} = 70°.$$',
    misconceptionCodes: ['parallel-angles.unstated-reason'],
    figure: triangle(70, 70, [ang('X', 'Z', 'Y', '40°', 40), ang('Y', 'X', 'Z', '?', 70, true)], { ticks: true }),
  },
  {
    id: 'parallel-angles.isosceles-exterior-apex',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.triangle-angles', position: 5 },
    expect:
      'Same isosceles triangle, but the given angle has moved *outside* at the apex: $140°$. ' +
      'Predict the base angle before working it out — what is $140°$ made of?',
    statement:
      'In triangle $XYZ$, $ZX = ZY$. The side $XZ$ is extended past $Z$ to $V$, and the exterior angle ' +
      '$\\angle VZY = 140°$. Find $\\angle X$.',
    answer: { type: 'number', value: 70, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'The turn at the apex is $140°$. It is made of the two base corners — and in an isosceles ' +
        'triangle those two corners are copies of each other.',
      pictorial: 'Write $140°$ outside at $Z$ and give the two base angles the same letter $b$.',
      abstract: 'Exterior angle $=$ sum of interior opposite angles, and the two are equal: $2b = 140°$.',
    },
    hints: [
      'The exterior angle at $Z$ equals $\\angle X + \\angle Y$.',
      '$\\angle X = \\angle Y$, so $2\\angle X = 140°$.',
    ],
    solution:
      'Exterior angle of a triangle: $\\angle X + \\angle Y = 140°$. Since $ZX = ZY$, $\\angle X = \\angle Y$, ' +
      'so $\\angle X = 70°$.\n\nPattern: the exterior angle at the apex of an isosceles triangle is ' +
      'always **twice** a base angle.',
    misconceptionCodes: ['parallel-angles.unstated-reason'],
    figure: {
      kind: 'angle_diagram',
      points: [pt('X', 0, 0), pt('Y', 40, 0), pt('Z', 20, 54.95), pt('V', 30.26, 83.14)],
      segments: [seg('X', 'Y'), seg('Y', 'Z', { ticks: 1 }), seg('Z', 'X', { ticks: 1 }), seg('Z', 'V', { style: 'dashed' })],
      angles: [ang('V', 'Z', 'Y', '140°', 140), ang('Y', 'X', 'Z', '?', 70, true)],
    },
  },

  // --- Tier 1b: quadrilaterals -----------------------------------------------------------
  {
    id: 'parallel-angles.quadrilateral-three-known',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.quadrilateral-angles', position: 1 },
    statement: 'A quadrilateral has angles $80°$, $95°$ and $110°$. Find the fourth angle.',
    answer: { type: 'number', value: 75, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Cut a paper quadrilateral along one diagonal. How many triangles do you get, and what does each contribute?',
      pictorial: 'Draw the quadrilateral with one diagonal. Two triangles: $2 \\times 180°$.',
      abstract: 'Angle sum of a quadrilateral is $360°$: fourth angle $= 360° - (80° + 95° + 110°)$.',
    },
    hints: ['A diagonal cuts any quadrilateral into two triangles, so its angles sum to $360°$.', '$360° - 285°$.'],
    solution: 'Angles of a quadrilateral sum to $360°$: $360° - 80° - 95° - 110° = 75°$.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
  },
  {
    id: 'parallel-angles.kite-equal-pair',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.quadrilateral-angles', position: 2 },
    expect:
      'Still four angles adding to $360°$, but only two are given and the shape is a kite. What does ' +
      'a kite tell you about the other two?',
    statement:
      'A kite has angles $110°$ and $80°$ at the two ends of its line of symmetry. Find each of the ' +
      'other two angles.',
    answer: { type: 'number', value: 85, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Fold the kite along its line of symmetry. The two side corners land on each other, so they are equal.',
      pictorial: 'Sketch the kite, mark the fold line, and give the two side angles the same letter.',
      abstract:
        'The four angles of the kite sum to $360°$, and the two you were not given are equal. That gives $110° + 80° + 2a = 360°$ — solve it for $a$.',
    },
    hints: [
      'The two angles *not* on the line of symmetry are equal.',
      '$2a = 360° - 110° - 80°$.',
    ],
    solution:
      'The angles on either side of the line of symmetry are equal. $2a = 360° - 110° - 80° = 170°$, so ' +
      'each is $85°$.',
    misconceptionCodes: ['parallel-angles.unstated-reason'],
  },
  {
    id: 'parallel-angles.parallelogram-adjacent',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.quadrilateral-angles', position: 3 },
    expect:
      'Now a parallelogram with one angle. One angle is enough here — which of the parallel-line ' +
      'letters gives you the angle next to it?',
    statement: 'In parallelogram $PQRS$, $\\angle SPQ = 70°$. Find $\\angle PQR$.',
    answer: { type: 'number', value: 110, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Two pairs of parallel rulers make a parallelogram. Side $PQ$ is a transversal across $PS$ and $QR$.',
      pictorial: 'Shade $\\angle SPQ$ and $\\angle PQR$. They sit between the parallels $PS$ and $QR$ on the same side of $PQ$.',
      abstract: 'Co-interior angles between $PS \\parallel QR$: $\\angle PQR = 180° - 70°$.',
    },
    hints: [
      '$PS \\parallel QR$, and $PQ$ crosses both. The two angles make a C-shape.',
      'Co-interior angles sum to $180°$.',
    ],
    solution:
      '$PS \\parallel QR$ and $PQ$ is a transversal, so $\\angle SPQ + \\angle PQR = 180°$ (co-int. $\\angle$s). ' +
      '$\\angle PQR = 110°$.\n\nCheck: the four angles $70°, 110°, 70°, 110°$ sum to $360°$.',
    misconceptionCodes: ['parallel-angles.co-interior-as-equal'],
    figure: {
      kind: 'angle_diagram',
      points: [pt('P', 0, 0), pt('Q', 50, 0), pt('R', 60.26, 28.19), pt('S', 10.26, 28.19)],
      segments: [seg('P', 'Q', { arrows: 1 }), seg('Q', 'R', { arrows: 2 }), seg('R', 'S', { arrows: 1 }), seg('S', 'P', { arrows: 2 })],
      angles: [ang('S', 'P', 'Q', '70°', 70), ang('P', 'Q', 'R', '?', 110, true)],
    },
  },
  {
    id: 'parallel-angles.trapezium-co-interior',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.quadrilateral-angles', position: 4 },
    expect:
      'Only one pair of sides is parallel now. Does the C-shape still work along the sloping side ' +
      '$AD$ — and would it work along $AB$?',
    statement: 'In trapezium $ABCD$, $AB \\parallel DC$ and $\\angle DAB = 70°$. Find $\\angle ADC$.',
    answer: { type: 'number', value: 110, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Only two of the rulers are parallel. Lay the pencil $AD$ across those two.',
      pictorial: 'Shade $\\angle DAB$ and $\\angle ADC$: they are inside the parallels $AB$ and $DC$ on the same side of $AD$.',
      abstract: 'Co-interior angles between $AB \\parallel DC$: $\\angle ADC = 180° - 70°$.',
    },
    hints: [
      '$AD$ is a transversal across the parallel sides $AB$ and $DC$.',
      'The two angles at $A$ and $D$ are co-interior, so they sum to $180°$.',
    ],
    solution:
      '$AB \\parallel DC$ and $AD$ is a transversal, so $\\angle DAB + \\angle ADC = 180°$ (co-int. $\\angle$s). ' +
      '$\\angle ADC = 110°$. The angles at $B$ and $C$ also sum to $180°$, but neither is known alone.',
    misconceptionCodes: ['parallel-angles.co-interior-as-equal'],
    figure: {
      kind: 'angle_diagram',
      points: [pt('A', 0, 0), pt('B', 60, 0), pt('C', 45, 30), pt('D', 10.92, 30)],
      segments: [seg('A', 'B', { arrows: 1 }), seg('B', 'C'), seg('C', 'D', { arrows: 1 }), seg('D', 'A')],
      angles: [ang('D', 'A', 'B', '70°', 70), ang('A', 'D', 'C', '?', 110, true)],
    },
  },
  {
    id: 'parallel-angles.quadrilateral-ratio',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.quadrilateral-angles', position: 5 },
    expect:
      'No angle is given at all — only that the four are in the ratio $1 : 2 : 3 : 4$. What single ' +
      'fact about every quadrilateral turns that into an equation?',
    statement: 'The angles of a quadrilateral are $x°$, $2x°$, $3x°$ and $4x°$. Find the largest angle.',
    answer: { type: 'number', value: 144, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Ten equal "angle pieces" fill the four corners between them. All four corners together make two triangles.',
      pictorial: 'Draw a bar of $10$ equal parts labelled $360°$. Each part is one $x$.',
      abstract: '$x + 2x + 3x + 4x = 360$, so $x = 36$ and the largest is $4x$.',
    },
    hints: ['The four angles of a quadrilateral sum to $360°$: $10x = 360$.', 'The largest angle is $4x$, not $x$.'],
    solution: '$10x = 360 \\implies x = 36$. The largest angle is $4 \\times 36° = 144°$.\n\nCheck: $36 + 72 + 108 + 144 = 360$.',
    misconceptionCodes: ['quadratic.answers-the-variable-not-the-question'],
  },

  // --- Tier 1c: polygon sums, the pattern, and the regular polygon -----------------------
  {
    id: 'parallel-angles.polygon-sum-5',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.polygon-sum', position: 1 },
    statement: 'Find the sum of the interior angles of a pentagon (a polygon with $5$ sides).',
    answer: { type: 'number', value: 540, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Draw a pentagon and cut it into triangles by drawing lines from one corner. How many triangles?',
      pictorial: 'From one vertex, draw diagonals to every non-adjacent vertex: $3$ triangles.',
      abstract: 'Interior sum $= (n - 2) \\times 180° = 3 \\times 180°$.',
    },
    hints: ['From one vertex a pentagon splits into $5 - 2 = 3$ triangles.', 'Each triangle contributes $180°$.'],
    solution: 'A pentagon splits into $3$ triangles from one vertex, so the interior angles sum to $3 \\times 180° = 540°$.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
  },
  {
    id: 'parallel-angles.polygon-sum-6',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.polygon-sum', position: 2 },
    expect: 'One more side than the pentagon. How many more triangles does that add, and how much more to the sum?',
    statement: 'Find the sum of the interior angles of a hexagon ($6$ sides).',
    answer: { type: 'number', value: 720, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Cut the hexagon from one corner: one more triangle than the pentagon had.',
      pictorial: 'Diagonals from one vertex of a hexagon: $4$ triangles.',
      abstract:
        'A hexagon splits into $6 - 2 = 4$ triangles, so the angles sum to $(6 - 2) \\times 180° = 720°$. Where does the $-2$ come from?',
    },
    hints: ['$6 - 2 = 4$ triangles.', '$4 \\times 180°$.'],
    solution: 'A hexagon splits into $4$ triangles from one vertex: $4 \\times 180° = 720°$. That is $180°$ more than the pentagon.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
  },
  {
    id: 'parallel-angles.polygon-sum-8',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.polygon-sum', position: 3 },
    expect: 'A jump of two sides this time, $6$ to $8$. If one extra side adds $180°$, what should two add?',
    statement: 'Find the sum of the interior angles of an octagon ($8$ sides).',
    answer: { type: 'number', value: 1080, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Cut the octagon from one corner. Count the triangles before you multiply.',
      pictorial: 'Diagonals from one vertex of an octagon: $6$ triangles.',
      abstract: 'An octagon splits into $8 - 2 = 6$ triangles, so the sum is $(8 - 2) \\times 180° = 1080°$. Compare that with the hexagon you just did.',
    },
    hints: ['$8 - 2 = 6$ triangles.', '$6 \\times 180°$, which should be $720° + 2 \\times 180°$.'],
    solution: 'An octagon splits into $6$ triangles: $6 \\times 180° = 1080°$. Two sides more than the hexagon, $360°$ more in the sum.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
  },
  {
    id: 'parallel-angles.polygon-sum-10',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.polygon-sum', position: 4 },
    expect: 'From $8$ sides to $10$. Predict the sum from the pattern first, then check it with the triangles.',
    statement: 'Find the sum of the interior angles of a decagon ($10$ sides).',
    answer: { type: 'number', value: 1440, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Ten sides, one corner chosen, eight triangles fanning out from it.',
      pictorial: 'Diagonals from one vertex: $10 - 2 = 8$ triangles.',
      abstract: '$(10 - 2) \\times 180° = 1440°$.',
    },
    hints: ['$10 - 2 = 8$ triangles.', '$8 \\times 180°$.'],
    solution: 'A decagon splits into $8$ triangles: $8 \\times 180° = 1440°$.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
  },
  {
    id: 'parallel-angles.polygon-sum-12',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.polygon-sum', position: 5 },
    expect:
      'Sums so far: $540°, 720°, 1080°, 1440°$ for $n = 5, 6, 8, 10$. What is the rule in $n$ — and ' +
      'does it give $1800°$ for $n = 12$?',
    statement: 'Find the sum of the interior angles of a $12$-sided polygon.',
    answer: { type: 'number', value: 1800, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Every extra side adds one triangle to the fan from one corner: $n - 2$ triangles for $n$ sides.',
      pictorial: 'A table of $n$ against the sum. Each row is $180°$ more than the row before.',
      abstract: 'Sum $= (n - 2) \\times 180°$; for $n = 12$ that is $10 \\times 180°$.',
    },
    hints: ['$12 - 2 = 10$ triangles.', 'The general rule is $(n - 2) \\times 180°$.'],
    solution:
      'A $12$-gon splits into $10$ triangles: $10 \\times 180° = 1800°$.\n\nPattern: the interior sum is ' +
      '$(n - 2) \\times 180°$, growing by $180°$ per side, because each new side adds one triangle.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
  },
  {
    id: 'parallel-angles.regular-exterior-12',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.polygon-sum', position: 6 },
    expect:
      'Same $12$ sides, but now the polygon is *regular* and the question is about the exterior ' +
      'angle. Exterior angles do not grow with $n$ — what do they always add to?',
    statement: 'Find the size of each exterior angle of a regular $12$-sided polygon.',
    answer: { type: 'number', value: 30, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Walk round the polygon, turning at each of the $12$ corners by the same amount. One lap is one full turn.',
      pictorial: 'Twelve equal turns arranged round a point make a full circle.',
      abstract: 'Exterior angle of a regular $n$-gon $= \\frac{360°}{n} = \\frac{360°}{12}$.',
    },
    hints: ['The exterior angles of *any* polygon add to $360°$.', 'Twelve equal exterior angles: $360° \\div 12$.'],
    solution: 'Exterior angles sum to $360°$, and a regular $12$-gon has $12$ equal ones: $360° \\div 12 = 30°$.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
  },
  {
    id: 'parallel-angles.regular-interior-12',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.polygon-sum', position: 7 },
    expect:
      'Exterior angle $30°$ from the last item. The interior angle sits next to it on a straight ' +
      'line — so you can find it two ways. Do both agree?',
    statement: 'Find the size of each interior angle of a regular $12$-sided polygon.',
    answer: { type: 'number', value: 150, tolerance: 0 },
    cpaPrompts: {
      concrete: 'At one corner, the interior angle and the turn you make together fill a straight line.',
      pictorial: 'One vertex with its side extended: interior and exterior side by side on a line.',
      abstract: 'Interior $= 180° - 30°$, or $\\frac{1800°}{12}$.',
    },
    hints: ['Interior $+$ exterior $= 180°$ at every vertex.', 'Or divide the interior sum $1800°$ by $12$.'],
    solution: 'Interior $= 180° - 30° = 150°$. Check: $1800° \\div 12 = 150°$ as well.',
    misconceptionCodes: ['parallel-angles.interior-formula-detour'],
  },
  {
    id: 'parallel-angles.regular-polygon-sides',
    skillIds: [S2],
    tier: 1,
    sequence: { family: 'parallel-angles.polygon-sum', position: 8 },
    expect:
      'Reversed: the number of sides is hidden, and interior and exterior are related by a ratio. ' +
      'Which of the two angles can you pin down on its own from the ratio?',
    statement:
      'The interior angle of a regular polygon is five times its exterior angle. How many ' +
      'sides does the polygon have?',
    answer: { type: 'number', value: 12, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Walk round the polygon, turning at each corner by the exterior angle. By the time you ' +
        'are back where you started, how far have you turned in total? What does that make each ' +
        'turn, if there are $n$ equal ones?',
      pictorial:
        'Draw one vertex with its side extended: the interior angle and the exterior angle sit ' +
        'together on a straight line. If one is five times the other, how is the $180°$ shared?',
      abstract:
        'Let the exterior angle be $e$. Use $e + 5e = 180°$ to find $e$, then $n = 360° / e$.',
    },
    hints: [
      'What is the sum of an interior angle and its adjacent exterior angle at any vertex?',
      'Let the exterior angle be $e$, so the interior is $5e$. Set up $e + 5e = 180°$ and find $e$.',
      'The exterior angles of any polygon add to $360°$. Divide $360°$ by your exterior angle to ' +
        'get the number of sides.',
    ],
    solution:
      'At any vertex, interior + exterior $= 180°$. Let the exterior angle be $e$; the interior ' +
      'is $5e$.\n\n$$6e = 180° \\implies e = 30°.$$\n\nExterior angles sum to $360°$, so\n\n' +
      '$$n = \\frac{360°}{30°} = 12.$$',
    misconceptionCodes: ['parallel-angles.interior-formula-detour'],
  },

  // --- Tier 2 --------------------------------------------------------------------------------
  {
    id: 'parallel-angles.sides-from-interior-144',
    skillIds: [S2],
    tier: 2,
    statement: 'Each interior angle of a regular polygon is $144°$. How many sides does it have?',
    answer: { type: 'number', value: 10, tolerance: 0 },
    cpaPrompts: {
      concrete: 'At each corner you turn by whatever is left of the straight line after the $144°$. How many such turns make a lap?',
      pictorial: 'One vertex, side extended: $144°$ inside, the exterior angle outside, together $180°$.',
      abstract: 'Exterior $= 180° - 144° = 36°$; $n = 360° \\div 36°$.',
    },
    hints: [
      'Find the exterior angle first: $180° - 144°$.',
      'Exterior angles sum to $360°$, so $n = 360° \\div$ exterior angle.',
    ],
    solution: 'Exterior angle $= 180° - 144° = 36°$. Then $n = 360° \\div 36° = 10$: a regular decagon.',
    misconceptionCodes: ['parallel-angles.interior-formula-detour', 'parallel-angles.sum-of-exterior-as-180n'],
  },
  {
    id: 'parallel-angles.pentagon-angle-expressions',
    skillIds: [S2],
    tier: 2,
    statement:
      'The angles of a pentagon are $100°$, $110°$, $120°$, $2x°$ and $(3x + 10)°$. Find the value of $x$.',
    answer: { type: 'number', value: 40, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Five corners; three are known. The two unknown corners share whatever is left of the pentagon sum.',
      pictorial: 'A bar of $540°$ with $100$, $110$, $120$ marked off; the remainder is $2x + 3x + 10$.',
      abstract: '$100 + 110 + 120 + 2x + 3x + 10 = 540$.',
    },
    hints: ['A pentagon has interior sum $(5 - 2) \\times 180° = 540°$.', '$5x + 340 = 540$.'],
    solution: 'Pentagon sum $= 540°$: $330 + 5x + 10 = 540 \\implies 5x = 200 \\implies x = 40$.\n\nCheck: $80° + 130°$ with the others gives $540°$.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n', 'quadratic.answers-the-variable-not-the-question'],
  },
  {
    id: 'parallel-angles.hexagon-missing-angle',
    skillIds: [S2],
    tier: 2,
    statement: 'Five angles of a hexagon are $130°$, $120°$, $110°$, $140°$ and $100°$. Find the sixth angle.',
    answer: { type: 'number', value: 120, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Four triangles fan out from one corner of the hexagon: the sum before subtracting anything.',
      pictorial: 'A bar of $720°$ with five pieces marked off.',
      abstract: '$720° - (130° + 120° + 110° + 140° + 100°)$.',
    },
    hints: ['Hexagon sum $= (6 - 2) \\times 180° = 720°$.', 'The five known angles add to $600°$.'],
    solution: 'Hexagon sum $= 720°$. Known angles sum to $600°$, so the sixth is $720° - 600° = 120°$.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
  },
  {
    id: 'parallel-angles.exterior-angles-missing',
    skillIds: [S2],
    tier: 2,
    statement: 'Four of the exterior angles of a pentagon are $60°$, $70°$, $80°$ and $90°$. Find the fifth exterior angle.',
    answer: { type: 'number', value: 60, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Walk round the pentagon making these four turns. How much more must you turn to face the way you started?',
      pictorial: 'Five turns arranged round a point make a full circle.',
      abstract: 'Exterior angles sum to $360°$: $360° - (60° + 70° + 80° + 90°)$.',
    },
    hints: ['Exterior angles of any polygon sum to $360°$ — not to something that depends on $n$.', '$360° - 300°$.'],
    solution: 'The exterior angles sum to $360°$: $360° - 300° = 60°$.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
  },

  // --- Tier 3 --------------------------------------------------------------------------------
  {
    id: 'parallel-angles.pentagon-tiles-gap',
    skillIds: [S2],
    tier: 3,
    statement:
      'A tiler tries to cover a floor with identical tiles shaped like regular pentagons. She fits ' +
      'three of them together at one point, corner to corner, and finds a gap. How many degrees ' +
      'is the gap?',
    answer: { type: 'number', value: 36, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Cut three regular pentagons from card and push their corners together at one point. The gap is what will not close.',
      pictorial: 'Three equal corner angles round a point, and a wedge left over that makes up $360°$.',
      abstract: 'Each corner is $540° \\div 5 = 108°$; the gap is $360° - 3 \\times 108°$.',
    },
    hints: [
      'First find one corner of the tile: the interior sum of a pentagon shared among five equal corners.',
      'Angles round a point make $360°$. Three corners of $108°$ leave how much?',
    ],
    solution:
      'Interior angle of a regular pentagon $= \\frac{(5 - 2) \\times 180°}{5} = 108°$. Three corners at a point: ' +
      '$3 \\times 108° = 324°$, leaving a gap of $360° - 324° = 36°$. A fourth tile would need $108°$ and ' +
      'does not fit, which is why regular pentagons never tile a floor.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
  },
  {
    id: 'parallel-angles.stop-sign-corner',
    skillIds: [S2],
    tier: 3,
    statement:
      'A stop sign is a flat plate with $8$ straight edges, all the same length, and all its corners ' +
      'the same shape. Find the angle at each corner of the sign.',
    answer: { type: 'number', value: 135, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Walk round the edge of the sign. At each of the $8$ corners you turn by the same amount, and after a lap you face the way you began.',
      pictorial: 'One corner with its edge extended: the turn outside and the corner angle inside share a straight line.',
      abstract: 'Exterior $= 360° \\div 8 = 45°$, corner $= 180° - 45°$.',
    },
    hints: [
      'Eight equal edges and equal corners: a regular octagon. Start with the turn at each corner.',
      'Turns round a lap add to $360°$; the corner angle is $180°$ minus the turn.',
    ],
    solution:
      'The sign is a regular octagon. Each exterior angle is $360° \\div 8 = 45°$, so each corner is ' +
      '$180° - 45° = 135°$.\n\nCheck: $(8 - 2) \\times 180° \\div 8 = 1080° \\div 8 = 135°$.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n', 'parallel-angles.interior-formula-detour'],
  },
  {
    id: 'parallel-angles.football-vertex',
    skillIds: [S2],
    tier: 3,
    statement:
      'A football is stitched from flat panels: some with $5$ equal edges and some with $6$ equal ' +
      'edges. At every stitching point one $5$-edged panel meets two $6$-edged panels. Find the total ' +
      'of the three panel angles that meet at one stitching point.',
    answer: { type: 'number', value: 348, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Lay a regular pentagon and two regular hexagons corner to corner on the desk. They do not quite go flat round the point.',
      pictorial: 'Three angles round a point: one pentagon corner and two hexagon corners.',
      abstract: 'At the vertex the three faces fill $108° + 2 \\times 120°$. Work it out, and say why the answer being under $360°$ is what lets the ball curve.',
    },
    hints: [
      'Find one corner of each panel: pentagon $540° \\div 5$, hexagon $720° \\div 6$.',
      'Add one pentagon corner and two hexagon corners.',
    ],
    solution:
      'Regular pentagon corner $= 540° \\div 5 = 108°$; regular hexagon corner $= 720° \\div 6 = 120°$. ' +
      'At a stitching point: $108° + 120° + 120° = 348°$. The missing $12°$ is why the panels do not ' +
      'lie flat and the ball curves.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n'],
  },

  // --- Diagnostics -------------------------------------------------------------------------
  {
    id: 'parallel-angles.dx-interior-formula-detour',
    skillIds: [S2],
    tier: 'diagnostic',
    statement: 'Each interior angle of a regular polygon is $150°$. How many sides does it have?',
    answer: {
      type: 'choice',
      correct: 'A',
      options: [
        { label: 'A', value: '$12$' },
        { label: 'B', value: '$6$', misconceptionCode: 'parallel-angles.sum-of-exterior-as-180n' },
        { label: 'C', value: '$n = 2.83$ (not a whole number)', misconceptionCode: 'parallel-angles.interior-formula-detour' },
      ],
    },
    cpaPrompts: {
      concrete: 'At each corner you turn by what is left of the straight line after $150°$. How many turns make a lap?',
      pictorial: 'One vertex with its side extended: $150°$ inside, $30°$ outside.',
      abstract: 'Exterior $= 30°$; $n = 360° \\div 30°$. No equation in $n$ is needed.',
    },
    hints: [
      'Find the exterior angle first. It is one step: $180° - 150°$.',
      'Exterior angles of any polygon sum to $360°$, so divide $360°$ by the exterior angle.',
    ],
    solution:
      'Exterior $= 180° - 150° = 30°$, so $n = 360° \\div 30° = 12$.\n\nDividing $180°$ by $30°$ gives $6$: ' +
      'that takes the exterior angles to add to $180°$. Writing $(n - 2) \\times 180 = 150$ from the ' +
      'interior-sum formula gives $n = 2.83$, which is not a polygon at all.',
    misconceptionCodes: ['parallel-angles.interior-formula-detour', 'parallel-angles.sum-of-exterior-as-180n'],
  },
  {
    id: 'parallel-angles.dx-sum-of-exterior-as-180n',
    skillIds: [S2],
    tier: 'diagnostic',
    statement: 'A regular polygon has $9$ sides. Find the size of each exterior angle.',
    answer: {
      type: 'choice',
      correct: 'B',
      options: [
        { label: 'A', value: '$20°$', misconceptionCode: 'parallel-angles.sum-of-exterior-as-180n' },
        { label: 'B', value: '$40°$' },
        { label: 'C', value: '$140°$', misconceptionCode: 'parallel-angles.interior-formula-detour' },
      ],
    },
    cpaPrompts: {
      concrete: 'Walk round the nine-sided shape, turning at every corner by the same amount. After one lap, how far have you turned?',
      pictorial: 'Nine equal turns arranged round a point make a full circle.',
      abstract: 'Exterior angle $= 360° \\div 9$.',
    },
    hints: ['The exterior angles are the turns of one lap. What does one lap add to?', 'Divide that total by $9$.'],
    solution:
      'Exterior angles sum to $360°$: $360° \\div 9 = 40°$.\n\n$180° \\div 9 = 20°$ takes the exterior ' +
      'angles to add to $180°$. $140°$ is the *interior* angle, from $(9 - 2) \\times 180° \\div 9$ — the ' +
      'long way round, and the wrong angle.',
    misconceptionCodes: ['parallel-angles.sum-of-exterior-as-180n', 'parallel-angles.interior-formula-detour'],
  },

  // =========================================================================
  // Skill 3 — multi-step deduction
  // =========================================================================

  // --- Tier 1: chains, one step longer each time ----------------------------------------
  {
    id: 'parallel-angles.chain-alternate-then-triangle',
    skillIds: [S3],
    tier: 1,
    sequence: { family: 'parallel-angles.chain', position: 1 },
    statement:
      'In the figure, $AB \\parallel CD$. $P$ lies on $AB$; $Q$ and $R$ lie on $CD$. $\\angle APQ = 55°$ ' +
      'and $\\angle PRQ = 60°$. Find $\\angle QPR$.',
    answer: { type: 'number', value: 65, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Slide the $55°$ at $P$ down the pencil $PQ$ to $Q$. Now the triangle $PQR$ has two corners you know.',
      pictorial: 'Fill in $\\angle PQR$ first, with its reason written next to it. Then the triangle.',
      abstract: 'Step 1: $\\angle PQR = 55°$ (alt. $\\angle$s). Step 2: angle sum of triangle $PQR$.',
    },
    hints: [
      'Which angle in the triangle is alternate to $\\angle APQ$?',
      '$\\angle PQR = 55°$. Now use the angle sum of triangle $PQR$.',
    ],
    solution:
      '$\\angle PQR = \\angle APQ = 55°$ (alt. $\\angle$s, $AB \\parallel CD$).\n\n' +
      '$\\angle QPR = 180° - 55° - 60° = 65°$ ($\\angle$ sum of triangle).',
    misconceptionCodes: ['parallel-angles.unstated-reason'],
    figure: chain(55, 60, [ang('A', 'P', 'Q', '55°', 55), ang('P', 'R', 'Q', '60°', 60), ang('Q', 'P', 'R', '?', 65, true)]),
  },
  {
    id: 'parallel-angles.chain-three-steps',
    skillIds: [S3],
    tier: 1,
    sequence: { family: 'parallel-angles.chain', position: 2 },
    expect:
      'Same figure and numbers; the unknown has moved to $\\angle BPR$, on the line $AB$. One more ' +
      'step than before — which fact gets you from $\\angle QPR$ to $\\angle BPR$?',
    statement:
      'In the figure, $AB \\parallel CD$. $P$ lies on $AB$; $Q$ and $R$ lie on $CD$. $\\angle APQ = 55°$ ' +
      'and $\\angle PRQ = 60°$. Find $\\angle BPR$.',
    answer: { type: 'number', value: 60, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Three angles at $P$ fill the straight ruler $AB$: $55°$, the triangle corner, and the one you want.',
      pictorial: 'Write $55°$, then $65°$ at $P$, each with a reason. What is left of the straight line?',
      abstract: 'Alt. $\\angle$s, then $\\angle$ sum of triangle, then $\\angle$s on a straight line at $P$.',
    },
    hints: [
      'Find $\\angle QPR$ as before: $65°$.',
      '$\\angle APQ$, $\\angle QPR$ and $\\angle BPR$ lie along the straight line $AB$.',
      'Notice the answer equals $\\angle PRQ$. Which letter shape explains that in one step?',
    ],
    solution:
      '$\\angle PQR = 55°$ (alt. $\\angle$s), $\\angle QPR = 65°$ ($\\angle$ sum of triangle), so ' +
      '$\\angle BPR = 180° - 55° - 65° = 60°$ ($\\angle$s on a straight line).\n\nShortcut: $\\angle BPR$ ' +
      'and $\\angle PRQ$ are alternate angles, so $\\angle BPR = 60°$ directly.',
    misconceptionCodes: ['parallel-angles.unstated-reason'],
    figure: chain(55, 60, [ang('A', 'P', 'Q', '55°', 55), ang('P', 'R', 'Q', '60°', 60), ang('B', 'P', 'R', '?', 60, true)]),
  },
  {
    id: 'parallel-angles.chain-exterior-given',
    skillIds: [S3],
    tier: 1,
    sequence: { family: 'parallel-angles.chain', position: 3 },
    expect:
      'The $60°$ at $R$ has been replaced by the angle *outside* the triangle, $\\angle PRD = 120°$. ' +
      'Which fact turns that back into the triangle corner?',
    statement:
      'In the figure, $AB \\parallel CD$. $P$ lies on $AB$; $Q$ and $R$ lie on $CD$. $\\angle APQ = 55°$ ' +
      'and $\\angle PRD = 120°$. Find $\\angle QPR$.',
    answer: { type: 'number', value: 65, tolerance: 0 },
    cpaPrompts: {
      concrete: 'At $R$ the triangle corner and the $120°$ sit side by side along the ruler $CD$.',
      pictorial: 'Fill in $\\angle PRQ$ from the straight line, then $\\angle PQR$ from the Z, then the triangle.',
      abstract: '$\\angle$s on a straight line, alt. $\\angle$s, $\\angle$ sum of triangle: three steps.',
    },
    hints: [
      '$\\angle PRQ$ and $\\angle PRD$ lie on the straight line $CD$.',
      '$\\angle PRQ = 60°$ and $\\angle PQR = 55°$ (alternate). Finish with the triangle.',
    ],
    solution:
      '$\\angle PRQ = 180° - 120° = 60°$ ($\\angle$s on a straight line). $\\angle PQR = 55°$ (alt. $\\angle$s, ' +
      '$AB \\parallel CD$). $\\angle QPR = 180° - 55° - 60° = 65°$ ($\\angle$ sum of triangle).',
    misconceptionCodes: ['parallel-angles.unstated-reason'],
    figure: chain(55, 60, [ang('A', 'P', 'Q', '55°', 55), ang('P', 'R', 'D', '120°', 120), ang('Q', 'P', 'R', '?', 65, true)]),
  },
  {
    id: 'parallel-angles.chain-four-steps',
    skillIds: [S3],
    tier: 1,
    sequence: { family: 'parallel-angles.chain', position: 4 },
    expect:
      'Same givens as last time, but the unknown is $\\angle BPR$ again. Count the steps before you ' +
      'start — and look for the Z that does it in one.',
    statement:
      'In the figure, $AB \\parallel CD$. $P$ lies on $AB$; $Q$ and $R$ lie on $CD$. $\\angle APQ = 55°$ ' +
      'and $\\angle PRD = 120°$. Find $\\angle BPR$.',
    answer: { type: 'number', value: 60, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Slide the $120°$ at $R$ up the pencil $PR$ to $P$: it lands on the *other* side of $PR$ from $\\angle BPR$.',
      pictorial: 'Write every angle you find with its reason. Four steps the long way; one step by the C or Z at $P$ and $R$.',
      abstract: '$\\angle BPR + \\angle PRD = 180°$ (co-int. $\\angle$s), or the long chain through the triangle.',
    },
    hints: [
      'The long way: $\\angle PRQ = 60°$, $\\angle PQR = 55°$, $\\angle QPR = 65°$, then the straight line at $P$.',
      'The short way: $\\angle BPR$ and $\\angle PRD$ are co-interior between the parallels.',
    ],
    solution:
      'Short: $\\angle BPR = 180° - 120° = 60°$ (co-int. $\\angle$s, $AB \\parallel CD$).\n\nLong: ' +
      '$\\angle PRQ = 60°$ (straight line), $\\angle PQR = 55°$ (alt. $\\angle$s), $\\angle QPR = 65°$ ' +
      '($\\angle$ sum), $\\angle BPR = 180° - 55° - 65° = 60°$ (straight line). Both routes agree.',
    misconceptionCodes: ['parallel-angles.unstated-reason', 'parallel-angles.co-interior-as-equal'],
    figure: chain(55, 60, [ang('A', 'P', 'Q', '55°', 55), ang('P', 'R', 'D', '120°', 120), ang('B', 'P', 'R', '?', 60, true)]),
  },
  {
    id: 'parallel-angles.chain-isosceles',
    skillIds: [S3],
    tier: 1,
    sequence: { family: 'parallel-angles.chain', position: 5 },
    expect:
      'The $60°$ is gone; instead $PQ = PR$. One given angle, one equal-sides fact. What replaces ' +
      'the missing number in the chain?',
    statement:
      'In the figure, $AB \\parallel CD$. $P$ lies on $AB$; $Q$ and $R$ lie on $CD$, with $PQ = PR$. ' +
      '$\\angle APQ = 55°$. Find $\\angle QPR$.',
    answer: { type: 'number', value: 70, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Slide $55°$ down to $Q$. The triangle has two equal sides, so its base corners are copies.',
      pictorial: 'Mark the ticks on $PQ$ and $PR$; give $\\angle PQR$ and $\\angle PRQ$ the same arc.',
      abstract: 'Alt. $\\angle$s gives $\\angle PQR = 55°$; isosceles gives $\\angle PRQ = 55°$; then the angle sum.',
    },
    hints: [
      '$\\angle PQR = 55°$ (alternate). What does $PQ = PR$ say about $\\angle PRQ$?',
      'Two base angles of $55°$; the apex is $180° - 2 \\times 55°$.',
    ],
    solution:
      '$\\angle PQR = 55°$ (alt. $\\angle$s, $AB \\parallel CD$). $\\angle PRQ = \\angle PQR = 55°$ (base $\\angle$s ' +
      'of isos. triangle, $PQ = PR$). $\\angle QPR = 180° - 110° = 70°$ ($\\angle$ sum of triangle).',
    misconceptionCodes: ['parallel-angles.unstated-reason'],
    figure: chain(55, 55, [ang('A', 'P', 'Q', '55°', 55), ang('Q', 'P', 'R', '?', 70, true)], true),
  },

  // --- Tier 2 --------------------------------------------------------------------------------
  {
    id: 'parallel-angles.zigzag-reversed',
    skillIds: [S3],
    tier: 2,
    statement:
      'In the figure, $AB \\parallel CD$ and $E$ lies between the lines. $\\angle BAE = 40°$ and ' +
      '$\\angle AEC = 95°$. Find $\\angle ECD$.',
    answer: { type: 'number', value: 55, tolerance: 0 },
    cpaPrompts: {
      concrete: 'No pencil crosses both rulers. Lay a third ruler through $E$ parallel to the others, and the bend becomes two crossings.',
      pictorial: 'Draw the dashed parallel through $E$. It splits $95°$ into a top part and a bottom part.',
      abstract: 'Top part $= 40°$ (alt. $\\angle$s); bottom part $= 95° - 40°$; then alt. $\\angle$s again to $C$.',
    },
    hints: [
      'Add a line through $E$ parallel to $AB$ and $CD$.',
      'The top part of $\\angle AEC$ equals $40°$. The bottom part is what remains of $95°$.',
      'The bottom part is alternate to $\\angle ECD$.',
    ],
    solution:
      'Draw $EX \\parallel AB$. $\\angle AEX = 40°$ (alt. $\\angle$s, $AB \\parallel EX$), so ' +
      '$\\angle XEC = 95° - 40° = 55°$. Then $\\angle ECD = \\angle XEC = 55°$ (alt. $\\angle$s, $EX \\parallel CD$).',
    misconceptionCodes: ['parallel-angles.unstated-reason', 'parallel-angles.alternate-as-supplementary'],
    figure: zigzag(40, 55, [ang('B', 'A', 'E', '40°', 40), ang('A', 'E', 'C', '95°', 95), ang('E', 'C', 'D', '?', 55, true)]),
  },
  {
    id: 'parallel-angles.isosceles-between-parallels',
    skillIds: [S3],
    tier: 2,
    statement:
      'In the figure, $AB \\parallel CD$. $P$ lies on $AB$, $Q$ and $R$ lie on $CD$, and $PQ = PR$. ' +
      '$\\angle APQ = 65°$. Find $\\angle QPR$.',
    answer: { type: 'number', value: 50, tolerance: 0 },
    cpaPrompts: {
      concrete: 'The $65°$ slides down to $Q$; the equal sides copy it across to $R$.',
      pictorial: 'Mark ticks on $PQ$ and $PR$ and the two equal base angles. Only the apex is unknown.',
      abstract: 'Alt. $\\angle$s, base $\\angle$s of isos. triangle, $\\angle$ sum of triangle.',
    },
    hints: [
      '$\\angle PQR$ is alternate to $\\angle APQ$.',
      'The base angles at $Q$ and $R$ are equal; subtract both from $180°$.',
    ],
    solution:
      '$\\angle PQR = 65°$ (alt. $\\angle$s, $AB \\parallel CD$); $\\angle PRQ = 65°$ (base $\\angle$s of isos. ' +
      'triangle); $\\angle QPR = 180° - 130° = 50°$ ($\\angle$ sum of triangle).',
    misconceptionCodes: ['parallel-angles.unstated-reason'],
    figure: chain(65, 65, [ang('A', 'P', 'Q', '65°', 65), ang('Q', 'P', 'R', '?', 50, true)], true),
  },

  // --- Tier 3 --------------------------------------------------------------------------------
  {
    id: 'parallel-angles.garden-beams',
    skillIds: [S3],
    tier: 3,
    statement:
      'A straight path runs between two straight fences that stay the same distance apart. A beam ' +
      'is laid from a post on the north fence across to the south fence, and a second beam from ' +
      'that same point on the south fence back to another post on the north fence. The first beam ' +
      'makes $50°$ with the north fence, measured inside the triangle the beams form, and the two ' +
      'beams meet at $75°$. Find the angle the second beam makes with the south fence, measured ' +
      'inside the triangle.',
    answer: { type: 'number', value: 55, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Two parallel rulers for the fences, two pencils for the beams meeting at the south ruler. Which corners of the triangle do you know?',
      pictorial: 'Sketch the two fences as parallel lines and the beams as a triangle with its base on the north fence and its point on the south fence.',
      abstract: 'The triangle has angles $50°$, $75°$ and $55°$. The angle at the south fence is alternate to the $55°$ at the north post.',
    },
    hints: [
      'Draw it: the triangle has two corners on the north fence and one on the south fence. Which two angles of the triangle are given?',
      'The third angle of the triangle is $180° - 50° - 75°$. It sits at the second north post.',
      'The angle between the second beam and the south fence is alternate to that third angle.',
    ],
    solution:
      'The fences are parallel. In the triangle, the angle at the second north post is $180° - 50° - 75° = 55°$ ' +
      '($\\angle$ sum). The second beam is a transversal across the two fences, so the angle it makes with the ' +
      'south fence inside the triangle is alternate to $55°$ and equals $55°$ (alt. $\\angle$s).',
    misconceptionCodes: ['parallel-angles.unstated-reason'],
  },
  {
    id: 'parallel-angles.ramp-struts',
    skillIds: [S3],
    tier: 3,
    statement:
      'A skate ramp has a flat deck that is level with the ground. Two straight struts run from one ' +
      'point on the ground up to two points on the underside of the deck. One strut makes $62°$ with ' +
      'the ground, and the two struts are $48°$ apart where they meet the ground. Find the angle ' +
      'between the second strut and the deck, measured inside the triangle the struts form.',
    answer: { type: 'number', value: 70, tolerance: 0 },
    cpaPrompts: {
      concrete: 'Ground and deck are two parallel rulers; the struts are two pencils from one point on the lower ruler.',
      pictorial: 'Sketch the triangle: one corner on the ground with $48°$, two corners on the deck. Mark $62°$ between the first strut and the ground.',
      abstract: 'The $62°$ crosses to the deck as an alternate angle; then the triangle angle sum gives the angle at the second strut.',
    },
    hints: [
      'The deck is level, so it is parallel to the ground. Each strut crosses both.',
      'The angle between the first strut and the deck, inside the triangle, equals $62°$ (alternate angles).',
      'Now the triangle has $62°$ and $48°$; find the third angle.',
    ],
    solution:
      'Deck $\\parallel$ ground. The first strut makes $62°$ with the ground, so inside the triangle it makes ' +
      '$62°$ with the deck (alt. $\\angle$s). The triangle then has angles $62°$ and $48°$, so the angle at the ' +
      'second strut is $180° - 62° - 48° = 70°$ ($\\angle$ sum of triangle).',
    misconceptionCodes: ['parallel-angles.unstated-reason'],
  },

  // --- Tier 4: show that AB ∥ CD, with x as the checkable by-product ---------------------
  {
    id: 'parallel-angles.show-parallel',
    skillIds: [S3, S1],
    tier: 4,
    statement:
      'In the figure, the lines $AB$ and $CD$ are cut by the transversal $EF$ at $P$ and $Q$. ' +
      '$\\angle BPQ = 3x°$, $\\angle APQ = (x + 20)°$ and $\\angle PQD = 60°$. Find the value of $x$, ' +
      'and use it to show that $AB \\parallel CD$.',
    answer: { type: 'number', value: 40, tolerance: 0 },
    cpaPrompts: {
      concrete:
        'Two rulers and a pencil across them, but this time nobody has said the rulers are parallel. ' +
        'What would you measure to convince yourself that they are?',
      pictorial:
        'At $P$, the two angles fill a straight line. Once you know them, colour $\\angle APQ$ and ' +
        '$\\angle PQD$: if they were on parallel lines, which letter would they be, and what would that require?',
      abstract:
        'Angles on a straight line at $P$ give $x$. Then $\\angle APQ = \\angle PQD$ are alternate angles; ' +
        'equal alternate angles *imply* the lines are parallel (the converse of the alternate-angle fact).',
    },
    hints: [
      'You cannot use any parallel-line fact yet — that is what you are trying to prove. Start at $P$ alone: $3x + (x + 20) = 180$.',
      'With $x = 40$, $\\angle APQ = 60°$. Compare it with $\\angle PQD$.',
      'Two equal alternate angles can only happen when the lines are parallel. State this as the reason.',
    ],
    solution:
      'At $P$: $3x + x + 20 = 180$ ($\\angle$s on a straight line), so $4x = 160$ and $x = 40$.\n\n' +
      'Then $\\angle APQ = 40 + 20 = 60° = \\angle PQD$. These are alternate angles, and alternate angles are ' +
      'equal only when the lines are parallel, so $AB \\parallel CD$ (converse of alt. $\\angle$s).\n\n' +
      'Note that "alt. $\\angle$s" cannot be used *before* this — it needs the parallel lines that are being shown.',
    misconceptionCodes: ['parallel-angles.unstated-reason', 'parallel-angles.alternate-as-supplementary'],
    figure: transversal(
      120,
      [ang('B', 'P', 'Q', '3x°', 120), ang('A', 'P', 'Q', '(x+20)°', 60, true), ang('P', 'Q', 'D', '60°', 60, true)],
      'No arrows: the lines are not marked parallel, because that is what you must show.',
      false,
    ),
  },

  // --- Diagnostic --------------------------------------------------------------------------
  {
    id: 'parallel-angles.dx-unstated-reason',
    skillIds: [S3],
    tier: 'diagnostic',
    statement:
      'In the figure, the lines $EA$ and $ED$ meet at $E$, with $\\angle AED = 20°$. $P$ lies on $EA$ ' +
      'and $Q$ lies on $ED$, and $\\angle APQ = 70°$. Find $\\angle PQD$.',
    answer: {
      type: 'choice',
      correct: 'C',
      options: [
        { label: 'A', value: '$70°$', misconceptionCode: 'parallel-angles.unstated-reason' },
        { label: 'B', value: '$110°$', misconceptionCode: 'parallel-angles.alternate-as-supplementary' },
        { label: 'C', value: '$130°$' },
      ],
    },
    cpaPrompts: {
      concrete: 'The two rulers meet at $E$ — they are not parallel. Can the pencil carry its angle from one to the other unchanged?',
      pictorial: 'Shade triangle $EPQ$. Its three corners are what you actually know something about.',
      abstract: 'No parallel lines, so no Z or C. Use $\\angle$s on a straight line at $P$ and the $\\angle$ sum of triangle $EPQ$.',
    },
    hints: [
      'Before using a Z-shape, check: does the question say $EA \\parallel ED$? They meet at $E$, so they cannot be.',
      '$\\angle EPQ = 180° - 70° = 110°$. Then the triangle $EPQ$ gives $\\angle EQP$.',
    ],
    solution:
      '$EA$ and $ED$ meet at $E$, so they are not parallel and alternate angles do not apply. ' +
      '$\\angle EPQ = 110°$ ($\\angle$s on a straight line); $\\angle EQP = 180° - 20° - 110° = 50°$ ' +
      '($\\angle$ sum of triangle); $\\angle PQD = 180° - 50° = 130°$ ($\\angle$s on a straight line).\n\n' +
      '$70°$ assumes the lines are parallel with no reason; $110°$ treats the false Z as a C.',
    misconceptionCodes: ['parallel-angles.unstated-reason', 'parallel-angles.alternate-as-supplementary'],
    figure: {
      kind: 'angle_diagram',
      caption: 'The lines EA and ED meet at E. Nothing here is parallel.',
      points: [pt('E', 0, 0), pt('D', 70, 0), pt('Q', 40, 0), pt('A', 56.38, 20.52), pt('P', 30.63, 11.15)],
      segments: [seg('E', 'A'), seg('E', 'D'), seg('P', 'Q')],
      angles: [ang('A', 'E', 'D', '20°', 20), ang('A', 'P', 'Q', '70°', 70), ang('P', 'Q', 'D', '?', 130, true)],
    },
  },
];
