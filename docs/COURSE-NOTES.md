# Course notes: what is here, and what a full course still needs

State as of 2026-09-05, after the problem-bank pass. The audience is whoever decides what
to build next.

## What the student gets today

- **The syllabus.** Dimensions Math Grade 8 (Secondary 2), all 14 units, 49 skills. Each
  skill has its own concrete / pictorial / abstract teaching notes written from the two
  source PDFs, a summary, and named misconceptions with a Socratic probe and a correction.
- **A problem bank the app can mark.** 748 problems, 11 to 31 per skill, built to the four
  tiers of [PROBLEM-SET-GUIDE.md](PROBLEM-SET-GUIDE.md): 374 fluency items arranged into 70
  variation sequences, 161 application, 103 applied, 40 challenge, and 70 diagnostics — one
  for every misconception code in the pack. 202 items carry a figure. Answers are numbers
  (with significant figures, surds, pi and standard form), coordinate pairs, unordered sets,
  exact strings, algebraic expressions, equations, or diagnostic choices.
- **A lesson shape.** One problem at a time, hints spent through a tool and counted
  exactly, a verdict on each committed answer, *Next problem*, *Finish lesson*, resume
  cards on the dashboard.
- **Eight figure kinds**, validated before they are drawn. Bar model, algebra tiles, area
  grid, cross frame, angle diagram, coordinate plane, solid net, stat plot.
- **A mastery estimate per skill** that decays and drives the suggestions.

## Where the content is thin

Ranked by how much a student would notice.

1. **Reasoning items are still marked on a by-product.** "Show that", "explain why" and
   the two-column proofs of units 6 and 7 are not machine-markable as a value. Every such
   item carries a checkable number instead — the length the argument needs — and the
   reasoning happens in conversation, unrecorded. §4.6 of the guide sets out the rubric
   approach that would fix this; it breaks the "model never marks" rule and needs thought.

2. **Multi-part problems** (find the vertex *and* the intercepts) are still separate
   problems. The `parts` array of guide §4.4 is designed but not built.

3. **Standard form cannot be enforced as a form.** The checker expands `4.8 x 10^3` and
   `4800` to the same value, so "write this in standard form" cannot be marked on the dress.
   Unit 1 works around it by asking for the index. A `standardForm` flag on `number` would
   close it.

4. **Worked examples the student can *read*.** The tutor never shows a full solution, by
   design. But Dimensions Math relies on "In a Nutshell" summaries and worked examples
   between practice. A per-skill *Reference* panel (the formulas, one fully worked example,
   the common mistakes) that the student can open without asking the tutor would cover the
   revision use case, which the app currently does not serve at all.

5. **Review and spacing.** Mastery decays, and decayed skills are suggested for review, but
   there is no *review session* — a short mixed set drawn from several decayed skills. The
   estimator supports it; the UI and a problem bank deep enough to draw from do not.

6. **Diagnostics.** Nothing places a new student. A ten-question placement per semester
   (8A algebra, 8B geometry/graphs/data) that seeds the mastery estimates would make the
   first suggestions meaningful instead of "start at unit 1".

## Where the tutor is thin

- **Only the bar model is interactive.** The other seven figures are read-only. The
  concrete stage is supposed to be manipulated: algebra tiles the student can drag into a
  rectangle, a coordinate plane they can plot points on, a balance they can load. Each is
  a renderer change plus the round trip that already exists for bar models.
- **Figure kinds that are missing** for the concrete notes as written: a number line
  (exponents, negatives, excluded values), fraction strips / tape diagrams (unit 5), a
  two-pan balance (units 2, 5, 14), a distance–time or speed–time profile with shaded
  area (unit 9 — the coordinate plane can draw the line but not the area), a histogram
  with class midpoints marked (unit 13), a scatter plot with a fitted line (unit 13).
- **Unverified live:** `log_misconception`, the photo-of-working path, voice. The photo
  path in particular is where the "identify the sign error in their working" promise of
  the CPA manual would be delivered.
- **The opening turn is scripted** and always asks the student to restate the problem.
  Good on the first problem, tiresome by the fifth, and now that a skill runs to twenty
  items it is the fifth rather often. Within a variation sequence the opening should be
  the item's own `expect` prompt instead — the student has already met the procedure and
  what they need is the prediction, not a restatement.

## What "a full course" would mean, concretely

For one student to work through Secondary 2 with this and nothing else:

| Area | Now | Target |
| --- | --- | --- |
| Problems per skill | 11–31 | done |
| Skills with a problem | 49/49 | done |
| Answer types | number (sf, surds, pi, standard form), pair, set, exact, expression, equation, choice | + multi-part, reasoning rubric |
| Interactive figures | 1 of 8 | all 8, plus number line, strips, balance |
| Reference material | none | per-skill formulas + worked example + mistakes |
| Review | suggestion only | mixed review sessions from decayed skills |
| Placement | 70 diagnostics exist, nothing assembles them | per-semester placement test |
| Progress view | dashboard bands | per-skill history, attempts, misconceptions seen |

The bank is no longer the bottleneck. What is left is using it: a review session that draws
across skills with expanding spacing, a placement test assembled from the diagnostics, a
mastery threshold that stops fluency practice once a skill is secure, and the per-skill
reference panel. Each is a week or less. The features are specified in guide §6.

## The full authoring brief

The per-skill problem-set specifications, the tier structure and the research behind them
are in [PROBLEM-SET-GUIDE.md](PROBLEM-SET-GUIDE.md).

## How to author against this

The reference unit is `content/packs/dimensions-g8/linear-systems.ts`. The standard is
enforced by `lib/content/content.test.ts`: per-skill CPA notes, descriptive misconception
codes with a probe that is a question, problems with at least two hints, a solution, a
misconception code, and a prompt for each CPA stage. Titles must be plain text — they are
shown where maths cannot be rendered. Add the unit to `AUTHORED_UNITS` and the tests hold
it to the standard from then on.
