# Problem-set guide: how to build the full exercise bank

Written 2026-09-05 after studying the Dimensions Math 8A/8B structure, the Singapore MOE
2020 G2/G3 syllabus, and the research on exercise design (variation theory, diagnostic
questions, interleaved and spaced practice, knowledge tracing). This is the working brief for
authoring the 300–500 problems the course needs, and for the app features that have to
exist to use them. Companion to [COURSE-NOTES.md](COURSE-NOTES.md), which lists the gaps.

---

## 1. What the sources say

### 1.1 Dimensions Math 8 (the textbook we mirror)

The two books have **14 chapters, 47 numbered sections**. Our 49 skills map onto those
sections roughly one-to-one; §5 lists the mapping. Every section follows the same arc:

| Textbook element | What it is | Our equivalent |
| --- | --- | --- |
| Chapter Opener | Real-world hook | Concrete CPA note |
| Class Activity | Cooperative discovery of the concept | Tutor's concrete stage with a figure |
| Worked Example + **Try It!** | One modelled problem, one matching problem | *Not yet built* — the per-skill reference panel |
| **Basic Practice** | Direct application, drills comprehension | Tier 1 (fluency) |
| **Further Practice** | Harder direct application | Tier 2 (application) |
| **Math@Work** | Integrated concepts in practical situations | Tier 3 (applied / word problems) |
| **Brainworks** | Open-ended, higher-order | Tier 4 (challenge / reasoning) |
| In a Nutshell | Summary of rules | Reference panel |
| Review Exercise | Mixed, chapter-wide | Interleaved review session |
| Extend Your Learning Curve | Investigation | Out of scope for now |

The workbook adds a fourth tier, **Challenging Practice** and **Enrichment** (synthesis;
analysis and reasoning). The lesson counts on the Singapore Math Live course (96 lessons for
8A alone) show the expected pace: roughly two lessons per section, with a workbook exercise
of 10–30 problems per section.

**Implication.** A skill is "covered" in the textbook by something like 20–40 problems across
four tiers, not by one. Our target of 6–10 per skill is the minimum for mastery evidence;
matching the book is 15–25.

### 1.2 The MOE syllabus (what Singapore actually examines at Sec 2)

Dimensions Math 8 is *not* the Sec 2 syllabus. It is a Grade 8 course assembled from
Singapore material, and it pulls forward several Sec 3 topics. From the 2020 G3 syllabus:

**In Dimensions 8 and in MOE Sec 2:** expansion of products, the three identities,
factorisation of ax²+bx+c and by grouping, multiplication/division of simple algebraic
fractions, quadratic functions and their graphs (sign of a, max/min, symmetry), linear
graphs and gradient, simultaneous equations (substitution, elimination, graphical),
quadratics by factorisation, formulating equations from word problems, congruence and
similarity (properties, enlargement), Pythagoras and its converse, mensuration of
pyramid/cone/sphere, dot diagrams/histograms/stem-and-leaf, mean/median/mode, grouped mean.

**In Dimensions 8 but MOE Sec 3/4:** standard form, zero/negative/fractional indices and
the index laws, addition/subtraction of algebraic fractions with quadratic denominators,
changing the subject of a formula, completing the square, the quadratic formula,
coordinate geometry (distance, midpoint, gradient, equation of a line, parallel and
perpendicular conditions).

**In MOE Sec 2 but not in Dimensions 8 (and not in our pack):** direct and inverse
proportion, map scales, linear inequalities and their number-line representation, stem-and-
leaf diagrams, misleading statistical diagrams, **probability of single events**, and
trigonometric ratios of acute angles (G3 only).

**Implication.** For a Singapore student the pack over-reaches in algebra and under-reaches
on proportion, inequalities, probability and trigonometry. Adding a *Unit 15: Proportion and
inequalities* and *Unit 16: Probability* (about 8 skills) would make it a true Sec 2 course;
that is a content decision for the owner, noted here and not made.

The syllabus framework is also worth keeping in view: five components — concepts, skills,
processes, metacognition, attitudes — and problems in real-world contexts as a required
strand. Its assessment objectives (recall/use, apply in familiar and unfamiliar contexts,
reason and communicate) map onto our four tiers.

### 1.3 Variation theory and intelligent practice (Barton, Watson & Mason)

The strongest evidence-based rule for *sequencing* a fluency set: **change one thing at a
time**, so the student notices what the change did. Barton's expanding-brackets example is
(x+2)(x+3), (x+2)(x+4), (x+2)(x+5) — only the second constant moves. The routine the
sequence supports is **Reflect, Expect, Check, Explain**: what changed, what do I expect the
answer to do, work it, explain why.

Four sequence types: **practice** (procedural variation), **rule** (the sequence leads to a
generalisation), **pattern** (the answers form a pattern the student should notice),
**demonstration** (a worked pair to contrast). Conceptual variation — the same idea shown as
object, picture and symbol — is exactly CPA.

**Implication.** Tier 1 for every skill is a *variation sequence* of 5–8 items, not 5–8
random items. The item order is content. The tutor's "Expect" prompt ("before you work it —
what will change from last time?") is the pedagogical move that makes it work.

### 1.4 Diagnostic questions (Barton / Eedi)

Rules for an item whose purpose is to *detect* a misconception:

1. Every distractor reveals one specific, identifiable error.
2. It must not be possible to get the item right while holding the misconception.
3. One step only — multi-step items hide where the error is.
4. Unambiguous wording, no grammatical cues.
5. Three options (one correct, two distractors) is the research optimum.

**Implication.** Each misconception code in the pack gets **one diagnostic item** whose
distractors are the misconception's own output. We already have 62 codes with a probe and a
correction; the diagnostic item is the missing third piece. It needs a new answer type
(`choice`) and it should be the item the tutor reaches for when it *suspects* a
misconception, and the item a review session uses to check the misconception is gone.

### 1.5 Interleaving and spacing (Rohrer, Dedrick, Hartwig)

The randomised trial with 787 students: mostly-interleaved practice produced **61% vs 38%**
on a test a month later (d = 0.83). Mechanism: blocked practice tells the student which
strategy to use before they start; interleaved practice makes them *choose* the strategy from
the problem, which is what an exam demands. Their guide is explicit that some blocked
practice is fine when a skill is new, but that **most** of the problems for a skill should be
spread across later assignments with expanding gaps, and that the mixing costs nothing —
same problems, different order. Their example assignment: 4 problems on the new lesson, 1
each on 8 earlier lessons.

SSDD problems (Same Surface, Different Deep structure) are the sharpest form of this: 3–4
problems that look alike (same diagram, same numbers) but need different mathematics.

**Implication.** A *review session* feature: 8–12 items, a third from the skill just taught
and the rest drawn from earlier skills with expanding spacing, ordered so no two adjacent
items use the same strategy. And one SSDD set per unit as its Brainworks-level item.

### 1.6 Knowledge tracing (Corbett & Anderson, Koedinger)

Our Beta posterior per skill is a simplified Bayesian knowledge tracing. What the ITS
literature adds: **mastery is declared at a threshold and practice stops** (avoid over-
practice), problems are selected on the *least-mastered prerequisite first*, and evidence
should be per knowledge component, not per problem — a two-skill problem is evidence on both.

**Implication.** Keep the estimator; add a mastery threshold (e.g. estimate ≥ 0.85 with
strength ≥ 4) that ends tier-1 practice and moves the skill to spaced review, and record
attempts against *every* skill a problem lists.

### 1.7 Automated marking of expressions

Numeric-evaluation equivalence (evaluate both expressions at several random points; equal
everywhere → equivalent) has no false negatives and vanishingly rare false positives, and is
the industry-standard shortcut. A CAS canonical-form comparison (e.g. the Cortex Compute
Engine: `isSame` for structural match, `isIdenticallyEqual` for semantic match after
`simplify`) adds "right answer but not simplified" as a distinguishable outcome, which is
pedagogically useful for algebraic fractions and expansion.

**Implication.** Add an `expression` answer type marked by random evaluation, with an
optional `form` requirement (expanded / factorised / single fraction / simplified) checked
structurally. Details in §4.

---

## 2. The problem-set architecture

Every skill gets the same shape. Counts are minimum → textbook-parity.

| Tier | Name | Items | Purpose | Source pattern |
| --- | --- | --- | --- | --- |
| 1 | **Fluency** (variation sequence) | 5–8 | One procedure, one thing changes per item; ends with a *rule* or *pattern* payoff | Basic Practice |
| 2 | **Application** | 3–5 | Same skill, unfamiliar surface: rearranged form, mixed signs, decimals/fractions, "find the missing part" reversals | Further Practice |
| 3 | **Applied** (word / context) | 2–4 | Real situation, the student must formulate before solving | Math@Work |
| 4 | **Challenge** | 1–2 | Reasoning, "show that", multi-skill, SSDD member, or open-ended | Brainworks / Enrichment |
| D | **Diagnostic** | 1 per misconception code | Single-step, three options, distractors are the misconception's output | Eedi rules |

So a typical skill has 12–20 items plus one diagnostic per misconception. Across 49 skills
that is 600–1000 items at parity; **the first milestone is tier 1 + one diagnostic for
every skill (≈400 items)**, because that is what mastery evidence and review need.

### 2.1 Writing a tier-1 variation sequence

1. Choose the *one* procedure the skill is about. If there are two (e.g. substitution and
   elimination), that is two sequences.
2. Write the first item at the easiest non-trivial instance, positive integers, no distractors.
3. Each next item changes exactly one thing: a constant, a sign, the position of the unknown,
   a coefficient from 1 to non-1, an integer to a fraction. Never two changes.
4. Somewhere in the middle put a *reversal*: the answer given, a part missing.
5. End with the payoff: an item whose answer makes the pattern visible, or that breaks it
   (e.g. after (x+2)(x+3), (x+2)(x+4), … put (x+2)(x−3) so the sign of the middle term flips).
6. Write the "expect" prompt for each item after the first: what should the student predict
   changes? This goes in the problem's `cpaPrompts.abstract` or a new `expect` field.

### 2.2 Writing tier-2 and tier-3 items

Tier 2 varies the *surface*: the same skill hidden in a different form. The checklist of
surfaces per skill is in §5. Tier 3 items must require formulation — the student writes the
equation, chooses the theorem, decides what the area under a graph means — and they should
strip the cue words (Rohrer's bug that crawls east then north: no "triangle", no
"hypotenuse"). Every tier-3 item must have a *checkable* final value even when the working
is the point; multi-part items are split into parts with shared context (§4.4).

### 2.3 Writing a diagnostic item

For misconception code M with description "does X instead of Y":

- Stem: the smallest instance where X and Y give different answers.
- Correct option: Y's result.
- Distractor 1: X's result (the code being detected).
- Distractor 2: the next most common error for that skill (another code if one exists).
- Check rule 2: can a student holding X land on the correct option? If yes, change the numbers.

The pack already stores probe and correction per code; the diagnostic item goes in the
problem bank with `kind: 'diagnostic'` and `misconceptionCodes: [M]`, and the tutor is told
to use it *without* the options first (answer-then-reveal improves retention), then show them.

### 2.4 Review sessions and SSDD sets

- **Review session** (feature): choose a target skill; draw 4 items from it (tiers 1–2), then
  4–8 items from skills whose mastery is `secure` or `approaching` and whose last attempt was
  ≥ 3 days ago, favouring the oldest; shuffle so no two adjacent items share a skill; expanding
  spacing means a skill appears in the next 2 sessions, then every 3rd, then every 6th.
- **SSDD set** (content): one per unit, 3–4 items with an identical stem context (the same
  diagram, the same numbers) but different questions — e.g. the cone with r = 5, h = 12:
  volume; curved surface area; slant height; a cylinder of the same base holding three cones.
  Marked as separate problems sharing a `family` id so the app can present them together.

### 2.5 Parameterised templates (later)

Most tier-1 and tier-2 items are templates: (x+a)(x+b) with a, b in a range, constraints
(a ≠ b, a·b ≠ 0). A template with a generator function gives unlimited fresh instances, which
is what re-practice and review need. Design rule from the literature: **templates cannot
guarantee equal difficulty**, so a template carries its own tier and its own constraints, and
the answer is computed, never stored. Start with hand-written items (they are the spec) and
convert the tier-1 sequences to templates once the app has a `generate` path.

---

## 3. Authoring standard for one problem

Extends the existing `problemSchema`. New fields marked ★.

```
id                unit.slug
skillIds          every skill it gives evidence on (usually 1, applied items 2)
tier ★            1 | 2 | 3 | 4 | 'diagnostic'      (replaces `difficulty`)
sequence ★        { family: 'exp.brackets-a', position: 3 }   tier-1 only
expect ★          "What changes from the last one?" prompt      tier-1 only
statement         LaTeX-bearing markdown, plain-text safe title elsewhere
answer            see §4
options ★         [{ label, value, misconceptionCode? }]        diagnostic only
cpaPrompts        concrete / pictorial / abstract — one each, > 30 chars
hints             2–3, strictly progressive
solution          full working, reference only
misconceptionCodes at least one; the diagnostic's is the one it detects
figure ★          suggested VisualSpec kind and, ideally, the spec itself
```

Rules the test suite should enforce: every skill has ≥ 5 tier-1 items forming one sequence
with consecutive positions; every misconception code has exactly one diagnostic; every tier-3
item lists ≥ 1 skill and has no cue word from a banned list per skill (e.g. "hypotenuse" for
tier-3 Pythagoras); every `figure` parses.

---

## 4. Answer types the checker needs

Existing: `number` (with tolerance and unit), `coordinates`, `set`, `exact`. Needed:

### 4.1 `expression` — algebraic equivalence
`{ type: 'expression', value: '(x-3)/(2x)', variables: ['x'], form?: 'simplified' | 'expanded' | 'factorised' | 'single-fraction' }`
Mark by evaluating student and reference at 6 random rational points avoiding the excluded
values; equal within 1e-9 relative → equivalent. Then, if `form` is set, check structurally:
`expanded` = no brackets and no repeated variable powers; `factorised` = a product of
brackets with no common factor left; `single-fraction` = exactly one `/` at top level;
`simplified` = numerator and denominator share no factor (test by evaluating the gcd at
random points, or via CAS). Outcome set becomes correct / equivalent-but-wrong-form /
incorrect / unparseable, and the tutor is told which. Parser: accept `^`, `*`, implicit
multiplication, `sqrt`, fractions, LaTeX `\frac`. The Cortex Compute Engine parses LaTeX to
MathJSON and can do the structural checks; a 200-line hand parser plus random evaluation
covers 95% without a dependency.

### 4.2 `equation` — a line or curve
`{ type: 'equation', lhs: 'y', rhs: '-x/2 + 5' }` or general form. Mark by solving for the
named variable where possible and comparing as an `expression`; otherwise compare the
implicit form up to a scalar multiple (evaluate lhs−rhs at random points, check the ratio is
constant). Accepts `y = -0.5x + 5`, `2y = 10 - x`, `x + 2y - 10 = 0`.

### 4.3 `choice` — diagnostic
`{ type: 'choice', correct: 'B' }` with `options` on the problem. The student answers in
words or by letter; map either. Record the chosen misconception code on the attempt.

### 4.4 Multi-part
Rather than a compound answer type, a `parts` array on the problem: each part has its own
answer and its own hints, shares the statement, and is marked separately. The lesson UI
shows "Part (a) of 3". Evidence: one attempt per part.

### 4.5 Units, significant figures, exact forms
`number` gains `sigfigs?: number` (mark against the rounded reference; also accept the
unrounded value and tell the tutor "right but not rounded"), `requireUnit?: boolean`, and
`exactForm?: 'surd' | 'pi' | 'fraction'` so "3 ± √11" can be marked as a `set` of two exact
expressions rather than decimals. Surd matching: parse `a ± √b` and `a ± b√c`.

### 4.6 Reasoning ("show that", "explain why")
Not machine-markable as a value. Two options, both to be tried: (a) the item has a checkable
*by-product* (the value of x that the "show that" needs) and the tutor asks for the reason
conversationally, unmarked; (b) a rubric of 2–3 required facts, and the tutor calls a
`check_reasoning` tool that returns which facts the student's message contains, with the
model doing the matching against a fixed rubric rather than free grading. Start with (a).

---

## 5. Per-skill specifications

For each skill: the textbook section it mirrors; **T1** the variation sequence(s) and what
varies; **T2** surfaces to cover; **T3** contexts; **T4** the challenge; **Dx** diagnostics
per existing code (code → distractor); **Ans** answer types; **Fig** figure kind. Counts are
the minimum. Existing problems are noted so they are slotted, not rewritten.

### Unit 1 — Exponents and Scientific Notation (§1.1–1.7)

**exponents.index-laws-positive** (§1.1–1.3)
- T1 (three sequences, 6 each): product law with a fixed base and one exponent moving, then
  a negative exponent entering; quotient law with the answer crossing zero into negatives
  (2⁵/2³, 2⁵/2⁴, 2⁵/2⁵, 2⁵/2⁶ — the *rule* payoff is a⁰ = 1 and a⁻¹); power of a power.
- T2: numeric bases with mixed laws in one expression (existing simplify-index-expression);
  fractional exponents 8^(2/3), 16^(−3/4); variables with coefficients (3a²)³.
- T3: doubling/halving contexts (paper folding, bacteria), "how many folds to exceed 1000".
- T4: SSDD on 2^x: solve 2^x = 64, simplify 2^x·2^3, evaluate 2^−x at x = 3.
- Dx: multiply-the-bases → 4³; exponent-as-multiplier → 6; negative-index-negative-value → −16.
- Ans: number (fractions accepted), expression for variable results. Fig: none / algebra_tiles for a² patterns.

**exponents.compare-orders-magnitude** (§1.4)
- T1 (5): ratios of powers of ten with coefficients 1, then coefficients that push the
  ratio over/under a power of ten (6×10²⁴ / 7.3×10²² is existing).
- T2: order three numbers in standard form; "how many times" as a power of ten to 1 s.f.
- T3: planet masses, populations, atom sizes; "is it closer to a thousand or a million times".
- Dx: linear-magnitude → "3 times".
- Ans: number with tolerance, exact ("10^3"). Fig: coordinate_plane as a log scale (needs a `numberLine` figure, see §6).

**exponents.numbers-standard-scientific** (§1.5)
- T1 (6): convert 4800, 48 000, 0.048, 0.00048 (one digit position moves each time), then a
  number needing a decimal coefficient, then back from standard form.
- T2: numbers given as 48×10⁴ to be normalised; negative exponents with several leading zeros.
- T3: read a value off a science table and rewrite; compare two measurements.
- Dx: coefficient-out-of-range → 48×10⁴; sign-of-index → 4.8×10⁵ for 0.000048.
- Ans: exact with accepts (`4.8 x 10^5`, `4.8e5`, `4.8×10^5`) — add a `standardForm` normaliser to `exact`.

**exponents.operations-scientific-notation** (§1.5 computation, §1.6 rounding)
- T1 (6): add two numbers with equal exponents, then exponents differing by 1, then by 2;
  multiply (coefficients then exponents) with the product needing renormalising (7×10³ × 3×10⁴).
- T2: subtraction that reduces the exponent; division with a coefficient < 1; round to 3 s.f.
- T3: total mass, distance = speed × time in standard form, light-years.
- T4: significant-figures reasoning: which of two measurements is more precise and why.
- Dx: add-without-matching-powers → 12.4×10⁹; round-before-finishing → the prematurely rounded value.
- Ans: exact standard form; number with `sigfigs`. **Rounding to s.f. needs 5 tier-1 items of its own** (§1.6 has no skill in our pack; attach to this skill).

### Unit 2 — Linear Equations in Two Variables (§2.1–2.5)

**linear-systems.model-real-world-relationships** (§2.1)
- T1 (6): write ax + by = c from a sentence, varying which quantity has coefficient 1, then
  a "total of items" plus "total cost" pair, then a difference statement.
- T2: given the equation, write a story; complete a table of (x, y) solutions; check whether a pair satisfies.
- T3: existing bakery item; tickets; mixtures. Fig: bar_model.
- Dx: variable-as-label → "3 adults + 4 children = 48".
- Ans: coordinates (coefficient pair), number, set of solution pairs.

**linear-systems.solve-simultaneous-linear** (§2.2–2.4)
- T1 (three sequences, 6 each): substitution with y = … given, then x = …, then needing one
  rearrangement; elimination with equal coefficients (subtract), then opposite signs (add —
  the *rule* payoff), then one equation scaled, then both; graphical: read the intersection
  off two drawn lines, then plot both from tables.
- T2: fractions/decimals in coefficients; a system with no solution / infinitely many (parallel lines) as a *pattern* item; solution with negative values.
- T3: existing tickets item; speed/boat; money.
- T4: SSDD on "3x + 2y = 16": solve with y = 2x + 1; find y when x = 2; find the gradient; find where it meets the axes.
- Dx: partial-distribution → 7x+1=16; one-sided-elimination → 7a = 104; sign-on-elimination → −24y.
- Ans: coordinates. Fig: bar_model (elimination), coordinate_plane (graphical).

**linear-systems.formulate-solve-applied** (§2.5)
- T1 (5): two-sentence problems where only the numbers vary (same tickets story with changing totals) so the *structure* is seen as constant.
- T2: three-quantity stories reducible to two variables; percent and age problems.
- T3: 4 varied contexts (digits of a number, perimeter with unknown sides, rates, mixtures).
- T4: a problem with an extraneous solution (negative count) to be rejected.
- Dx: unchecked-answer → a pair satisfying only the first equation.
- Ans: coordinates; number.

### Unit 3 — Expansion and Factorization (§3.1–3.3)

**expansion.expand-products-algebraic** (§3.1)
- T1 (8): Barton's sequence (x+2)(x+3), (x+2)(x+4), (x+2)(x+5), (x+2)(x−5), (x−2)(x−5), (2x+2)(x+5), (2x+3)(x−5), then a monomial times a bracket to contrast.
- T2: three-term brackets; (x+a)(x+b)(x+c) once; subtract a product from another.
- T3: area of a frame/border, garden with a path (leads to unit 4).
- Dx: partial-distribution → 2x²−8x−12 missing the 3x; coefficient-not-squared → (2x)² as 2x².
- Ans: expression with `form: 'expanded'`; number for a named coefficient (existing). Fig: area_grid.

**expansion.special-algebraic-identities** (§3.2)
- T1 (7): (x+1)², (x+2)², (x+3)² — *pattern* on the middle term; then (x−3)²; then (2x+3)²; then (x+3)(x−3) as the contrast; then 103² by (100+3)².
- T2: (a+b)² with two variables; (3x−2y)²; 998×1002 mentally.
- T3: area of a square with an extended side; a numeric shortcut task.
- Dx: freshmans-dream → x²+9; middle-term-once → x²+3x+9.
- Ans: expression `expanded`; number. Fig: algebra_tiles then area_grid.

**expansion.factorize-expressions-grouping** (§3.3)
- T1 (7): common factor 3x+6, 3x²+6x, 3x²y+6xy²; then difference of squares x²−9, x²−16, 4x²−9, then 9−4x²; then grouping ax+ay+bx+by with the pairing varying.
- T2: perfect-square trinomials to recognise; factorise completely (common factor first, then DOTS); 2-variable grouping.
- T3: numeric DOTS (51²−49²); a "show it is divisible by" item.
- Dx: group-in-pairs-blindly → a non-factorised grouping; factorise-incompletely → 2(x²−4).
- Ans: expression `factorised`. Fig: area_grid.

### Unit 4 — Quadratic Factorization and Equations (§4.1–4.3)

**quadratic-factorisation.factorize-quadratic-trinomials** (§4.1)
- T1 (8): monic x²+5x+6, x²+7x+6, x²−5x+6, x²+x−6, x²−x−6 (sign pattern *rule*); then non-monic 2x²+7x+3, 2x²+5x−3, 3x²−7x+2.
- T2: with a common factor first (2x²+10x+12); leading coefficient negative; two variables.
- T3: a rectangle whose area is a trinomial — find its sides.
- Dx: existing codes (cross-method sign, non-monic direct) → the wrong-first-term product.
- Ans: expression `factorised`. Fig: cross_frame, algebra_tiles.

**quadratic-factorisation.solve-quadratic-equations** (§4.2)
- T1 (6): (x−3)(x−4)=0, then x²−7x+12=0 (existing), then x²−7x=−12 (rearrange first), then x²=7x (no constant — the zero root), then 2x²−7x+3=0.
- T2: equations needing expansion first; a repeated root; x² = 25 by DOTS vs by root.
- T3: projectile / area contexts with one root to reject.
- Dx: zero-product misuse (dividing by x) → loses x = 0; "x² = 25 so x = 5" → missing −5.
- Ans: set. Fig: coordinate_plane (roots as intercepts).

**quadratic-factorisation.model-real-world-scenarios** (§4.3)
- T1 (5): the same garden story with numbers varying so the equation shape stays constant.
- T2: consecutive integers; number puzzles; frame/border.
- T3: existing garden item; a right-triangle-with-Pythagoras crossover (unit 10).
- T4: "which root and why" reasoning item.
- Dx: keeps-negative-length → reports both roots.
- Ans: number, coordinates (dimensions). Fig: area_grid.

### Unit 5 — Simple Algebraic Fractions (§5.1–5.5)

**algebraic-fractions.simplify-algebraic-fractions** (§5.1)
- T1 (7): 6x/9x², then (x+3)/(x²+3x), then (x²−9)/(2x²+6x) (existing), then (x²−9)/(9−x²)
  (the −1 *payoff*), then trinomial over trinomial.
- T2: three-term numerator needing grouping; cancel a common numeric factor after factorising.
- Dx: cancel-terms-not-factors → −9/(2+6x).
- Ans: expression `simplified`; set for excluded values. Fig: bar_model as a tape diagram.

**algebraic-fractions.four-operations-rational** (§5.2–5.3)
- T1 (two sequences, 6 each): multiply/divide with monomials, then with one binomial factor,
  then with cancellation across; add with denominators 2 and 3 (numeric), x and 2x, x and
  x+1, (x−2) and (x+1) (existing), (x−2) and (x−2)² (the LCD is not the product — *rule*).
- T2: subtraction with a leading minus (sign discipline); three fractions; mixed number and fraction.
- T3: total time for two legs at speeds x and x+10; combined work rates.
- Dx: add-tops-and-bottoms → 5/(2x−1); LCD-as-product when a factor repeats → the oversized denominator.
- Ans: expression `single-fraction`. Fig: area_grid.

**algebraic-fractions.solve-fractional-equations** (§5.4)
- T1 (6): 3/x = 6, then 3/(x−2) = 6, then x/3 + x/4 = 7, then 3/(x−2) − 2/(x+1) = 5/(x²−x−2) (existing), then one reducing to a quadratic (unit 14 crossover).
- T2: unknown in both numerator and denominator; equation with a constant term.
- T3: rate problems (pipes filling a tank), average speed round trips.
- Dx: sign-lost-in-bracket → −2x−4; multiply-only-one-side → the unbalanced result.
- Ans: number, set. Fig: bar_model as balance.

**algebraic-fractions.identify-restrictions-extraneous** (§5.4, §5.5)
- T1 (5): excluded values for denominators x, x−2, x²−9, x²+3x, (x−2)²; then an equation whose only root is excluded (*payoff*: no solution).
- T2 (**changing the subject**, §5.5, currently unhoused — attach here): make x the subject of y = 3x + 2, v = u + at, A = ½bh, s = ut + ½at², then with x in a denominator, then under a root.
- T3: rearrange a formula then substitute (unit 12 crossover with cone slant height).
- Dx: unchecked-root → reports the excluded root; subject-change sign error.
- Ans: set; expression (subject changed); number. Fig: coordinate_plane number line.

### Unit 6 — Congruence and Reflections (§6.1–6.4)

**congruence.identify-establish-congruence** (§6.1)
- T1 (6): name the test from marked diagrams: SSS, SAS, ASA, AAS, RHS, then a non-included angle (*payoff*: not enough). Each item changes one marking.
- T2: find a missing side/angle from a congruence; match corresponding vertices in the right order.
- T3: bridge/roof truss contexts; "explain why the two supports are the same length".
- T4: a two-column proof with reasons (answer type 4.6).
- Dx: angle-not-included → "SAS" for an SSA diagram.
- Ans: exact (test name), number, exact (vertex correspondence "ABC ↔ PQR"). Fig: angle_diagram with ticks.

**congruence.reflection-transformations-across** (§6.1–6.2)
- T1 (7): reflect a point in the x-axis, y-axis, y = x, y = −x, x = 2, y = −1, then two reflections in turn.
- T2: reflect a triangle and state the image; find the mirror line from a point and its image; translation and rotation by 90°/180° about the origin (the section includes them).
- T3: mirror-image design, kaleidoscope, "where does the ball bounce".
- Dx: negate-instead-of-swap → (−1, 4); rotation-as-reflection confusion (the Luneta finding) → (−y, −x) for a 180° rotation.
- Ans: coordinates; set of coordinates; exact (mirror line "x = 2"). Fig: coordinate_plane.

**congruence.understand-similarity-coordinate** (§6.3–6.4)
- T1 (6): scale factor from two similar rectangles (2, 3, ½, 1.5), then find a missing side, then a missing angle (unchanged), then area ratio (k² — *rule* payoff).
- T2: enlargement from a centre on a grid; negative/fractional scale factors; nested triangles.
- T3: map scales (MOE Sec 2 content — this is where it belongs), photo enlargement, model cars.
- Dx: reflection-changes-length → recomputes a different length; adds instead of scales (k+…) → the additive error; area-scales-by-k → k not k².
- Ans: number; coordinates. Fig: coordinate_plane, angle_diagram.

### Unit 7 — Parallel Lines and Angles (§7.1–7.4)

**parallel-angles.angle-properties-parallel** (§7.1)
- T1 (7): a transversal with one angle 62°: find the corresponding, the alternate, the co-interior, the vertically opposite; then with expressions in x for equal pairs (existing), then a supplementary pair.
- T2: two transversals; a zig-zag needing an added parallel line; identify which pairs are equal from a diagram with no numbers.
- T3: railway tracks, ladders on a wall, parallel rulers.
- Dx: alternate-as-supplementary → x from 3x+20+5x−40 = 180.
- Ans: number; exact (relationship name). Fig: angle_diagram with arrows.

**parallel-angles.calculate-interior-exterior** (§7.2–7.4)
- T1 (three short sequences): triangle angle sum with two known, exterior angle = sum of opposites, isosceles; quadrilateral sums (§7.3, unhoused — attach here): kite, parallelogram, trapezium; polygon sums for n = 5, 6, 8, 10, 12 (*pattern*), regular exterior angle 360/n, then the existing interior = 5×exterior.
- T2: find n from an interior angle; a polygon with one angle given as an expression; irregular polygon with all but one angle known.
- T3: tiling (which regular polygons tile and why), a stop sign, a football's pentagons and hexagons.
- Dx: interior-formula-detour → the wrong n from a botched equation; sum-of-exterior-as-180n → the wrong sum.
- Ans: number. Fig: angle_diagram.

**parallel-angles.solve-multi-step-geometric** (§7 Further/Brainworks)
- T1 (5): two-step chains (alternate then triangle sum) with one step added per item.
- T2: figures needing an auxiliary line; combining isosceles with parallel lines.
- T3/T4: proof-style items with reasons (4.6): "show that AB ∥ CD".
- Dx: unstated-reason → a diagram where the lines are *not* parallel and the alternate-angle claim is false.
- Ans: number; reasoning rubric later. Fig: angle_diagram.

### Unit 8 — Graphs of Linear and Quadratic Functions (§8.1–8.2)

**function-graphs.graph-linear-functions** (§8.1A–B)
- T1 (7): read m and c from y = 2x+1, y = 2x−1, y = −2x+1, y = ½x+1, then 2y = x + 2 (divide), then 3x + 2y = 8 (existing), then x = 3 (undefined gradient — *payoff*).
- T2: from a graph read the equation; from two points; complete a table and plot; does a point lie on the line (existing).
- T3: taxi fare, phone plan, temperature conversion.
- Dx: gradient-before-isolating-y → −3.
- Ans: number; equation; coordinates. Fig: coordinate_plane with slopeTriangle.

**function-graphs.interpret-rate-change** (§8.1C)
- T1 (5): gradient from two points with rise positive, then negative, then zero, then run negative (order discipline), then fractional.
- T2: rate with units from a graph; compare two rates; which line is steeper.
- T3: cost per km, litres per minute, "how much does y change when x changes by 5".
- Dx: rise-run-inverted → ⅓ for gradient 3.
- Ans: number with unit. Fig: coordinate_plane.

**function-graphs.graph-quadratic-functions** (§8.2)
- T1 (6): table and plot y = x², y = x²+1, y = x²−4, y = −x², y = 2x², y = −x²+4x+5 (existing vertex item is on the next skill).
- T2: match equations to sketches; state orientation from a; y-intercept from c; evaluate at a negative x.
- T3: a thrown ball's height; profit curves.
- Dx: negate-then-square → y = 17.
- Ans: number; exact (orientation "maximum"); coordinates. Fig: coordinate_plane.

**function-graphs.identify-vertices-axes** (§8.2)
- T1 (6): axis from −b/2a for b = 2, 4, 6, −4, then a = −1, then a = 2; then substitute for the vertex.
- T2: intercepts by factorising (existing); vertex from symmetry of the two intercepts (midpoint); sketch from the four features.
- T3: maximum height / minimum cost; range of x where y > 0.
- T4: SSDD on y = −x²+4x+5: vertex, intercepts, value at x = 1, solve = 5.
- Dx: vertex-x-only → "x = 2"; intercept-sign error → (−5, 0), (1, 0).
- Ans: coordinates; set; number. Fig: coordinate_plane.

### Unit 9 — Graphs in Practical Situations (§9.1–9.2)

**practical-graphs.construct-interpret-distance-time** (§9.2)
- T1 (6): read speed off one segment; identify the stationary segment; the fastest segment; a return journey (negative gradient); total distance vs displacement; a speed–time graph's flat section (*payoff*: steady speed, not rest).
- T2: draw a graph from a story; write the story from a graph; two travellers meeting.
- T3: bus timetable, a race, a cyclist and a car.
- Dx: flat-means-stopped-on-speed-graph → "at rest".
- Ans: number; exact (segment label). Fig: coordinate_plane (needs piecewise segments — §6).

**practical-graphs.calculate-speed-average** (§9.2)
- T1 (6): average speed with no rest, then a rest, then unequal legs, then units conversion (30 min), then acceleration from 0 to v, then from u to v.
- T2: find the time for a given average; a missing leg's distance.
- T3: existing cyclist and car items; a train with stops.
- Dx: rest-dropped-from-total-time → 20; average-of-speeds → 20.
- Ans: number with tolerance and unit. Fig: coordinate_plane.

**practical-graphs.interpret-conversion-practical** (§9.1 + area under speed–time)
- T1 (6): area under a rectangle (constant speed), a triangle (from rest), a trapezium (existing), two pieces summed, then a conversion graph read both ways (km↔miles, °C↔°F, currency).
- T2: find the time given the distance; a graph with deceleration to a stop and beyond.
- T3: fuel gauge, exchange rates, pay-per-hour charts.
- Dx: constant-speed-assumed → 576.
- Ans: number with unit. Fig: coordinate_plane with shaded area (§6).

### Unit 10 — Pythagorean Theorem (§10.1–10.3)

**pythagoras.state-prove-pythagorean** (§10.1)
- T1 (5): identify the hypotenuse in triangles drawn in different orientations (one rotation per item); check 3-4-5 with tile counts; complete the area of the third square.
- T2: the proof by rearrangement (four triangles in a square) — state the areas.
- Dx: hypotenuse-misidentified → the wrong side named.
- Ans: exact (side name); number. Fig: angle_diagram; needs a "squares on sides" figure (§6).

**pythagoras.calculate-unknown-side** (§10.1)
- T1 (7): hypotenuse from 3,4; 6,8; 5,12; then a leg from 13,5 (existing); 10,6; then non-integer answer (√13, keep exact); then decimals.
- T2: isosceles triangle height; rectangle diagonal; a triangle with an expression side.
- T3: ladder against a wall, TV screen size, shortest path across a field (no cue words).
- Dx: add-squares-for-leg → √194.
- Ans: number (exact surd via 4.5). Fig: angle_diagram.

**pythagoras.converse-pythagorean-theorem** (§10.2)
- T1 (6): 3-4-5 yes; 5-12-13 yes; 4-5-6 no; 7-24-25 yes (existing); 8-15-16 no; then decimals 1.5-2-2.5.
- T2: is the angle acute or obtuse (a²+b² vs c²); which of four triples is right-angled.
- T3: check a corner is square (builders' 3-4-5), a set square.
- Dx: converse-wrong-side-squared → the wrong verdict from comparing the wrong sides.
- Ans: exact yes/no; exact (acute/obtuse). Fig: angle_diagram.

**pythagoras.solve-applied-spatial** (§10.3)
- T1 (5): cuboid face diagonal, then space diagonal (existing), then a cube, then a cylinder's internal rod, then a pyramid's slant edge.
- T2: distance on a grid (leads to unit 11); a folded rectangle.
- T3: a straw in a box, a bug on a room's walls (shortest path unfolded), a kite string.
- T4: SSDD on the 8×6×24 box: space diagonal, face diagonal, volume, surface area.
- Dx: space-diagonal-two-dimensions → √640.
- Ans: number. Fig: solid_net (cuboid).

### Unit 11 — Coordinate Geometry (§11.1–11.3)

**coordinate-geometry.calculate-length-midpoint** (§11.1)
- T1 (7): distance with both points positive; one negative coordinate; both; a vertical segment; then midpoint for the same pairs.
- T2: find an endpoint from the midpoint; is a triangle isosceles by lengths; perimeter of a plotted shape.
- T3: distance between towns on a map grid, a diagonal fence.
- Dx: double-negative-dropped → √(2²+8²).
- Ans: number; coordinates. Fig: coordinate_plane.

**coordinate-geometry.find-gradient-line** (§11.2–11.3)
- T1 (7): gradient from two points (signs varying one at a time), then equation from gradient and intercept, then from gradient and a point, then from two points.
- T2: rewrite between forms; find where a line meets the axes; find k so that a point lies on the line.
- T3: depreciation lines, hire charges.
- Dx: mixed-subtraction-order → −2.
- Ans: number; equation. Fig: coordinate_plane.

**coordinate-geometry.parallel-perpendicular-line** (§11.3)
- T1 (6): parallel to y = 2x + 1 through (0, 5); through (1, 4); perpendicular gradient for m = 2, −3, ½, −¾ (*rule*: negative reciprocal).
- T2: are two given lines parallel/perpendicular/neither; find k for perpendicularity; the manual's line through (−1, 2) ⟂ 3x + 4y = 12.
- T3: a road perpendicular to another at a junction; roof pitches.
- Dx: perpendicular-keeps-gradient → gradient 2.
- Ans: number; equation; exact (parallel/perpendicular/neither). Fig: coordinate_plane.

**coordinate-geometry.find-equations-perpendicular** (§11.3 Further)
- T1 (5): perpendicular bisector of horizontal segment, vertical, then diagonal (existing pair), then with fractional midpoint.
- T2: show a point is equidistant from two others; circumcentre of a triangle by two bisectors.
- T3: "the water pipe must be equally far from both houses".
- Dx: bisector-through-endpoint → the line through A.
- Ans: equation; coordinates. Fig: coordinate_plane.

### Unit 12 — Mensuration (§12.1–12.4)

**mensuration.calculate-surface-areas** (§12.1–12.4)
- T1 (four short sequences, one per solid): cylinder V and curved area with r or h changing one at a time; cone V (existing) and curved area; sphere V and A for r = 3, 6 (*pattern*: ×8, ×4); pyramid V for square base with h changing.
- T2: find r from V; hemisphere total area (3πr²); leave in π vs 3 s.f.; a cone from its net.
- T3: silos, ice-cream cones, tents, cans.
- Dx: r-squared-r-cubed-swapped → 4/3π·9 for a sphere of r = 3.
- Ans: number (π-multiple or `sigfigs`). Fig: solid_net.

**mensuration.solve-problems-involving** (§12 Math@Work)
- T1 (5): cylinder + hemisphere volume (existing), then its area (existing), then cone + hemisphere, then a cylinder with a cylindrical hole, then a cone cut from a cylinder.
- T2: hollow containers (thickness); water level rise when a sphere is dropped in (volume equivalence).
- T3: a capsule pill, a pencil, a lampshade (frustum as difference of cones — challenge).
- Dx: hidden-join-counted → the over-counted area.
- Ans: number. Fig: solid_net.

**mensuration.distinguish-vertical-height** (§12.3)
- T1 (5): slant from r, h for (3,4), (5,12), (8,15); then h from r, l; then r from h, l.
- T2: curved area given h not l (existing total area); a cone's net sector: arc = 2πr.
- T3: a conical tent's canvas, a paper party hat.
- Dx: vertical-height-in-curved-area → 60π.
- Ans: number. Fig: solid_net with showSlantTriangle.

### Unit 13 — Data Analysis (§13.1–13.3)

**data-analysis.calculate-interpret-measures** (§13.1)
- T1 (7): median of 5 values sorted, unsorted (existing), 6 values (average the middle two), with a repeated value; mean; mode; range; then add an outlier (*payoff*: mean moves, median does not).
- T2: find a missing value given the mean; which measure to use and why (exact); mean from a frequency table (ungrouped).
- T3: test scores, temperatures, shoe sizes (mode is the useful one).
- Dx: median-of-unsorted → the middle of the unsorted list.
- Ans: number; exact (measure name). Fig: stat_plot (dot).

**data-analysis.construct-interpret-five-number** (§13.2 box plots)
- T1 (6): five-number summary for n = 9 (existing IQR), n = 8, n = 10, n = 11; then read a box plot; then compare two box plots (which has larger spread).
- T2: identify an outlier by 1.5×IQR; draw the plot from the summary.
- T3: compare two classes' marks, two months' rainfall.
- Dx: quartile-includes-median → Q1 = 7, Q3 = 14.
- Ans: number; set (the five numbers); exact (comparison). Fig: stat_plot (box, highlightIqr).

**data-analysis.calculate-estimated-mean** (§13.1–13.2)
- T1 (6): grouped mean with 3 classes, 4 (existing), unequal class widths, then read the frequencies from a histogram, then find a missing frequency given the mean.
- T2: modal class; the class containing the median; why it is an estimate.
- T3: ages at a cinema, arm spans (the manual's activity), delivery times.
- Dx: unweighted-midpoints → 70.
- Ans: number; exact (class). Fig: stat_plot (histogram).

**data-analysis.identify-scatter-plot** (§13.3)
- T1 (5): describe correlation from five plots (strong +, weak +, none, weak −, strong −).
- T2: draw a line of best fit and predict; identify an outlier point; interpolation vs extrapolation.
- T3: height vs arm span, hours studied vs marks, ice cream vs temperature.
- T4: correlation vs causation reasoning (existing sleep item; add a lurking-variable item).
- Dx: correlation-as-causation → "more sleep causes lower marks".
- Ans: exact; number with tolerance (prediction). Fig: coordinate_plane with points (needs a fit line — §6).

### Unit 14 — More About Quadratic Equations (§14.1–14.5)

**quadratic-methods.solve-quadratic-equations** (§14.2)
- T1 (7): complete the square for x²+6x, x²+8x, x²−6x (existing solve), x²+5x (fraction), then 2x²+8x (factor a first), then solve each; end with a case with no real root (*payoff*).
- T2: vertex form y = (x+3)²−9 → sketch; minimum value of an expression.
- T3: maximising area, minimising cost via completed square.
- Dx: missing-plus-minus → 3+√11 only; half-b-squared error → adds 36.
- Ans: set (exact surds via 4.5 or 2 d.p.); expression (completed square form). Fig: algebra_tiles (square).

**quadratic-methods.derive-quadratic-formula** (§14.3)
- T1 (6): formula on x²+3x+1, x²−3x+1, 2x²−3x−3 (existing via fractions), −x²+4x+1, then one factorable (compare answers), then a = 1, b = 0.
- T2: 2 d.p. vs exact surd; a formula answer that simplifies (√8 = 2√2).
- T3: projectile time to land, break-even.
- Dx: sign-slip-in-formula → √(9−24) "no roots"; divides only the root by 2a → the half-divided answer.
- Ans: set. Fig: area_grid (general).

**quadratic-methods.determine-number-real** (§14.3–14.4)
- T1 (6): discriminant for c = 1, 2, 2.25 (=0), 3 for x²+3x+c (*pattern*: crosses zero); then a with a > 0/< 0; then find k for equal roots.
- T2: sketch position relative to the axis from Δ; how many x-intercepts; k for no real roots.
- T3: "can the ball reach 10 m" as a discriminant question.
- Dx: zero-discriminant-no-roots → 0 roots.
- Ans: number (count); number (k); set (k range as two numbers). Fig: coordinate_plane (three parabolas).

**quadratic-methods.solve-fractional-geometric** (§14.5)
- T1 (5): 2/(x+1) + 3/x = 2 (existing), then with one denominator, then a product form x(x+3) = 40, then a right triangle with sides x, x+1, x+2, then consecutive even integers.
- T2: a boat's two-leg journey (rates → quadratic); a frame of uniform width.
- T3/T4: a garden path (unit 4 crossover) solved by formula; reject the negative root with a reason.
- Dx: not-in-standard-form → wrong a, b, c.
- Ans: set; number. Fig: bar_model (balance), area_grid.

---

## 6. Features and components needed to use the bank

In the order they unblock content.

1. **Schema:** `tier`, `sequence`, `expect`, `options`, `parts`, `figure` on problems; the
   `expression`, `equation`, `choice` answer types; `sigfigs` / `exactForm` on `number`.
   Tests per §3.
2. **Checker:** random-evaluation expression equivalence with the `form` checks; surd
   parsing; standard-form normaliser; choice mapping. This is the gate for units 3, 5, 11, 14.
3. **Lesson flow for sequences:** when a problem has a `sequence`, the *Next problem* button
   follows the sequence order rather than "first unsolved", and the tutor gets the `expect`
   prompt in its turn state. After the last item, the "rule" or "pattern" question is asked.
4. **Diagnostic presentation:** show options only after a first free answer; record the
   chosen code on the attempt; `log_misconception` becomes mostly automatic.
5. **Mastery threshold and evidence per skill:** stop tier-1 practice at the threshold;
   credit every listed skill; show per-skill history (attempts, hints, misconceptions seen).
6. **Review session:** the §2.4 selector, a session type that carries several problems from
   several skills, and a dashboard entry "10-minute review" when anything is due.
7. **Reference panel** per skill: formulas, one worked example (Try It! pairing), the
   misconception list. Read-only, no tutor turn needed.
8. **Figure kinds:** number line (units 1, 5), tape/fraction strips (unit 5), two-pan
   balance (units 2, 5, 14), piecewise segments and shaded area on the coordinate plane
   (unit 9), squares-on-sides (unit 10), histogram with midpoints and a fitted line (unit
   13). Make algebra tiles, area grid and coordinate-plane points draggable.
9. **Templates:** a `generate(seed)` on tier-1 items so review never repeats an instance.
10. **Placement diagnostic** per semester from the diagnostic items, seeding the posteriors.

---

## Sources

- Dimensions Math Textbook 8A / 8B, Singapore Math Inc. — tables of contents and exercise structure: https://www.singaporemath.com/products/dimensions-math-textbook-8a , https://www.singaporemath.com/products/dimensions-math-textbook-8b
- Dimensions Math 8A course outline (96 lessons): https://singaporemathlive.com/courses/dimensions-math-8a/
- MOE 2020 G2 and G3 Mathematics Syllabuses (Secondary 1–4): https://www.moe.gov.sg/api/media/d415c25d-cf29-4b05-83da-9713f38edd14/2020-G2-and-G3-Mathematics-Syllabuses.pdf
- Craig Barton, variationtheory.com and "What makes practice intelligent": https://variationtheory.com/ , https://knowledgeforteachers.substack.com/p/what-makes-practice-intelligent-craig
- Craig Barton, diagnostic questions: https://tipsforteachers.co.uk/diagnostic-questions/
- SSDD Problems: https://ssddproblems.com/
- Rohrer, Dedrick, Hartwig & Cheung (2020), randomized trial of interleaved practice, d = 0.83: https://gwern.net/doc/psychology/spaced-repetition/2019-rohrer.pdf ; Rohrer & Hartwig, "Spaced and Interleaved Mathematics Practice": https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-spaced-and-interleaved-mathematics-practice-rohrer-hartwig.pdf
- Bayesian knowledge tracing / ITS mastery learning: https://en.wikipedia.org/wiki/Bayesian_knowledge_tracing
- Cortex Compute Engine, canonical forms and expression comparison: https://mathlive.io/compute-engine/guides/canonical-form/
- Misconception research: algebraic fractions (Grade 10 learners), histogram centre/variability misconceptions, Grade 12 geometry misconceptions: https://www.researchgate.net/publication/331299570 , https://www.tandfonline.com/doi/full/10.1080/10691898.2008.11889559 , https://pythagoras.org.za/index.php/pythagoras/article/view/261/432
