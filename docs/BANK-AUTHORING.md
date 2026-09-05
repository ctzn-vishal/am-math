# Authoring the problem bank: the working brief

Read this with [PROBLEM-SET-GUIDE.md](PROBLEM-SET-GUIDE.md), which has the research and
the per-skill specifications (§5). This file is the mechanics: the schema as it now exists,
the answer types the checker can mark, and the tests that hold a unit to the standard.

## Where things live

- One file per unit in `content/packs/dimensions-g8/<unit>.ts`, exporting `<unit>Skills`
  and `<unit>Problems`. Problems go in the `Problems` array; the skills, CPA notes and
  misconceptions are already authored and should be left as they are unless the guide
  says a code is missing.
- The schema is `lib/content/schema.ts` (`problemSchema`, `answerSchema`). Zod validates
  every problem at load, so a malformed one fails every test with a clear path.
- The tests are `lib/content/content.test.ts`, section `problem bank`. Run one unit with:

```bash
npx vitest run lib/content -t "<unit-id>"
```

  and the checker's own tests with `npx vitest run lib/tutor`.

## A problem

```ts
{
  id: 'expansion.brackets-a-3',              // must start with "<unit>."
  skillIds: ['expansion.expand-products-algebraic'],   // first id = the skill it is evidence for
  tier: 1,                                   // 1 | 2 | 3 | 4 | 'diagnostic'
  sequence: { family: 'expansion.brackets-a', position: 3 },   // tier 1 (and SSDD sets)
  expect: 'Only the 4 became a 5. Before you expand — which terms of the answer change, and which stay?',
  statement: 'Expand $(x + 2)(x + 5)$.',
  answer: { type: 'expression', value: 'x^2+7x+10', variables: ['x'], form: 'expanded' },
  cpaPrompts: { concrete: '…', pictorial: '…', abstract: '…' },   // each > 30 chars
  hints: ['…', '…'],                         // 2–3, strictly progressive
  solution: '…',                             // full working, > 40 chars
  misconceptionCodes: ['expansion.partial-distribution'],   // ≥ 1
  figure: { kind: 'area_grid', columns: ['x', '+5'], rows: ['x', '+2'], cells: ['', '', '', ''] },  // optional
}
```

### Tiers and what the tests require per skill

| Tier | Minimum | Rule |
| --- | --- | --- |
| 1 | 5 items in **one** `sequence` family, positions 1..n with no gaps | one thing changes per item; every item after the first has an `expect` prompt (> 20 chars) that names what changed and asks for a prediction; end with the rule/pattern payoff the guide names |
| 2 | 2 | same skill, unfamiliar surface: rearranged, reversed ("the answer is …, find the missing part"), fractions/decimals/negatives |
| 3 | 1 (aim for 2–3) | a real context that must be *formulated* before it can be solved; no cue words that name the method ("hypotenuse", "expand", "simultaneous") |
| 4 | 1 per unit (aim for one per skill) | reasoning, multi-skill, or an SSDD set: 3–4 problems with the same context and numbers in one `sequence` family, each asking for different mathematics |
| diagnostic | exactly 1 per misconception code of the skill | see below |

Where the guide lists two or three tier-1 sequences for a skill, write them all; the test
only demands that the longest has five items.

Existing problems in the file are already tiered (1, 2 or 4 from the old `difficulty`).
Re-tier them honestly, slot them into a sequence where the guide says so, and convert
their `exact` algebra answers to `expression` / `equation` answers. Do not delete them;
their ids may be referenced by recorded attempts.

### Diagnostics (Barton's rules)

```ts
{
  id: 'expansion.dx-freshmans-dream',
  skillIds: ['expansion.special-algebraic-identities'],
  tier: 'diagnostic',
  statement: 'Expand $(x + 3)^2$.',
  answer: {
    type: 'choice',
    correct: 'B',
    options: [
      { label: 'A', value: '$x^2 + 9$', misconceptionCode: 'expansion.freshmans-dream' },
      { label: 'B', value: '$x^2 + 6x + 9$' },
      { label: 'C', value: '$x^2 + 3x + 9$', misconceptionCode: 'expansion.middle-term-once' },
    ],
  },
  misconceptionCodes: ['expansion.freshmans-dream', 'expansion.middle-term-once'],  // detected code FIRST
  …
}
```

- One step only. Three options. The correct option carries no code; **every** distractor
  carries the code of the error that produces it (a second code from the same skill or
  unit if one fits, otherwise the detected code's neighbour from the guide's Dx line).
  If only one code exists for a skill, use a code from another skill in the unit whose
  error would also produce that distractor, and list it in `misconceptionCodes` too.
- Check rule 2: a student holding the misconception must not be able to land on the
  correct option. Change the numbers if they can.
- The tutor is told to ask for a free answer first and show the options afterwards, so
  write the statement as an open question, not "which of these".

## Answer types

| Type | Shape | Use for |
| --- | --- | --- |
| `number` | `{ type: 'number', value, tolerance?, unit?, sigfigs? }` | any single value; π-multiples and surds work (student may type `36π`, `√13`, `3 + √11` and it is evaluated); standard form works (`5.56 x 10^5` is read as 556000). `sigfigs: 3` accepts the value rounded to 3 s.f. and notes an unrounded one |
| `coordinates` | `{ type: 'coordinates', x, y, tolerance? }` | a point, or any ordered pair (adult price, child price) |
| `set` | `{ type: 'set', values: [3, -2], tolerance? }` | unordered numbers: roots, excluded values, a five-number summary |
| `exact` | `{ type: 'exact', value, accepts: [] }` | short words and names: "SAS", "negative", "yes", "x = 2" as a mirror line, "maximum". Never for algebra |
| `expression` | `{ type: 'expression', value: '(x-3)/(2x)', variables: ['x'], form?: 'expanded' \| 'factorised' \| 'single-fraction' \| 'simplified' }` | any algebraic result. Marked by evaluation at random points, so every equivalent form passes; `form` then returns "wrong-form" (not wrong, not evidence) if the shape is not what was asked. Write `value` in plain algebra: `^` for powers, `*` or juxtaposition, `sqrt(…)`, brackets for fractions |
| `equation` | `{ type: 'equation', lhs: 'y', rhs: '2x+1', variables: ['x','y'] }` | a line, a curve, a rearranged formula; `2y = 4x + 2` and `y - 2x - 1 = 0` both pass. For "make $v$ the subject", `lhs: 'v'`, variables all the letters present |
| `choice` | see diagnostics | diagnostics only |

Things the checker cannot mark: a proof, an explanation, a drawn graph. Give such items a
checkable by-product (the value the argument needs) and put the reasoning in the
`cpaPrompts` and hints, as §4.6 of the guide says.

For "solve" items with two roots use `set`. For "which root and why" use `number` for the
kept root. For a surd root pair, use `set` with the decimal values and a small tolerance, and
say "give your answers to 2 d.p. or in exact form" in the statement.

## Figures

`figure` takes any `VisualSpec` from `lib/visual/spec.ts` and is validated by
`lib/visual/validate.ts` at test time (an area grid's cells must match its rows × columns,
a bar model's known values must be consistent, a cone's slant must fit its radius and
height). Available kinds: `bar_model`, `algebra_tiles`, `area_grid`, `cross_frame`,
`angle_diagram`, `coordinate_plane`, `solid_net`, `stat_plot`. Leave cells the student
should fill as `''`. Add a figure where the guide's **Fig** line names one and it helps the
*concrete* or *pictorial* stage; do not add one that gives the answer away.

## Voice

Statements are for a 13–14 year old: short sentences, one question, LaTeX for every
mathematical object. CPA prompts are questions the tutor asks, in the second person, tied
to the specific numbers of the item. `expect` prompts point at exactly what changed:
"The $+5$ became $-5$. Which term of the answer will flip sign, and which will not?"
Hints reveal strictly more each time; the last one all but states the method. Solutions
are full working with a check where one exists.

Write from the guide's per-skill spec and the source PDFs in `docs/`; the existing problems
in each file show the register.
