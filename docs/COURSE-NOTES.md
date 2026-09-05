# Course notes: what is here, and what a full course still needs

State as of 2026-09-05. The audience is whoever decides what to build next.

## What the student gets today

- **The syllabus.** Dimensions Math Grade 8 (Secondary 2), all 14 units, 49 skills. Each
  skill has its own concrete / pictorial / abstract teaching notes written from the two
  source PDFs, a summary, and named misconceptions with a Socratic probe and a correction.
- **A problem bank the app can mark.** 46 problems, every skill has at least one. Answers
  are numbers, coordinate pairs, unordered sets, or exact strings; the checker reads
  fractions, LaTeX and loose bracketing.
- **A lesson shape.** One problem at a time, hints spent through a tool and counted
  exactly, a verdict on each committed answer, *Next problem*, *Finish lesson*, resume
  cards on the dashboard.
- **Eight figure kinds**, validated before they are drawn. Bar model, algebra tiles, area
  grid, cross frame, angle diagram, coordinate plane, solid net, stat plot.
- **A mastery estimate per skill** that decays and drives the suggestions.

## Where the content is thin

Ranked by how much a student would notice.

1. **Problem depth.** 46 problems across 49 skills is one problem per skill on average,
   and most of those come straight from the PDF's two worked examples per chapter. A
   student who solves the problem has finished the skill. A full course needs roughly
   **6 to 10 problems per skill** on a difficulty ladder (fluency → applied → challenge),
   so mastery is earned across several attempts, not one, and so a second sitting on a
   skill gets fresh material. That is 300 to 500 problems. The spec PDF gives the pattern;
   the Dimensions Math textbook exercises are the natural source.

2. **Answer types the checker cannot mark yet.** Several skills are really about producing
   an *expression* or an *argument*, and the current answer types dodge that:
   - Algebraic expressions in general (simplified fractions, expanded products, factorised
     forms). Today these are marked as exact strings with a few accepted spellings. A
     symbolic-equivalence check (evaluate both sides at several random points) would mark
     any correct form.
   - Equations of lines (`y = -x/2 + 5`, `x + 2y = 10`, `2y = 10 - x` are all right).
   - Geometric reasoning with stated reasons (unit 7 deductions, unit 6 congruence proofs).
     This is a rubric, not a value; the model could grade against a rubric if we hand it
     one, but that breaks the "model never marks" rule and needs thought.
   - Multi-part problems (find the vertex *and* the intercepts). Today each part is a
     separate problem.
   - Answers with units, significant figures and rounding as part of the mark.

3. **Skills the PDFs mention that have no problem of their own.** Rounding to significant
   figures (unit 1), formula rearrangement (unit 5), similarity and scale factor (unit 6),
   irregular polygon angles (unit 7), conversion graphs (unit 9), speed–time acceleration
   from a graph rather than from numbers (unit 9), pyramids and hollow containers (unit 12),
   histograms and lines of best fit (unit 13), geometric problems reducing to quadratics
   (unit 14). Each is a half-day of authoring against the reference pattern.

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
  Good on the first problem, tiresome by the fifth. The opening should vary with the
  stage and with what the student has already shown.

## What "a full course" would mean, concretely

For one student to work through Secondary 2 with this and nothing else:

| Area | Now | Target |
| --- | --- | --- |
| Problems per skill | ~1 | 6–10, on a ladder |
| Skills with a problem | 49/49 | 49/49, plus the 9 sub-skills above |
| Answer types | number, pair, set, exact | + expression equivalence, line equation, multi-part, units/sf |
| Interactive figures | 1 of 8 | all 8, plus number line, strips, balance |
| Reference material | none | per-skill formulas + worked example + mistakes |
| Review | suggestion only | mixed review sessions from decayed skills |
| Placement | none | per-semester diagnostic |
| Progress view | dashboard bands | per-skill history, attempts, misconceptions seen |

The largest single item, by far, is the problem bank. Everything else is a week or less;
the bank is the course.

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
