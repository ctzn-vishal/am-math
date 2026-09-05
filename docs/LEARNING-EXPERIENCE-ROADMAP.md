# Math Sage: learning experience improvement roadmap

## Purpose

Math Sage should feel like a calm, perceptive tutor sitting beside the student—not a chat
window attached to a worksheet. The student should always be able to answer three questions:

1. What am I working on?
2. Why does this step make sense?
3. What should I do next?

An enjoyable experience does not mean making every question effortless. It means making
productive struggle feel safe, purposeful and recoverable. The app should give the student
agency without abandoning them, celebrate understanding without becoming noisy, and make
progress visible without pretending that learning is a percentage bar.

This document covers the complete experience: curriculum, tutoring, interaction design,
visuals, practice, feedback, motivation, accessibility, reliability, privacy and evaluation.

## Current foundation

The app already has unusually strong foundations:

- A complete Secondary 2 curriculum: 14 units, 49 skills and 748 problems.
- Concrete–Pictorial–Abstract teaching notes for every skill.
- Structured misconceptions with Socratic probes and conceptual corrections.
- Deterministic answer checking rather than model-based marking.
- One problem at a time, progressive hints, resumable lessons and suggested next skills.
- A mastery estimate based on evidence, hint use, CPA stage and time since practice.
- Eight mathematically validated figure types.
- A responsive lesson layout, dark mode and reduced-motion support.
- Honest failure states: an unavailable tutor is not replaced by canned encouragement.

The next stage is not primarily “more content.” It is making the existing content easier to
enter, manipulate, revisit and remember.

## Product principles

### 1. Understanding before speed

Do not reward fast answers by default. Reward a useful representation, a corrected mistake,
a clear explanation and successful recall after time has passed.

### 2. One clear action at a time

The student should never have to infer whether they are expected to answer, explain, drag a
figure, request a hint or move on. The interface and tutor should agree on the next action.

### 3. Agency with a safety net

Let the student choose a representation, ask for a smaller step, open a reference or return
to an earlier CPA stage. Keep recommendations prominent, but never trap the student inside
one path.

### 4. Errors are information

A wrong answer should produce a useful next move, not a red wall of text. Distinguish an
arithmetic slip, an unreadable answer, a correct answer in the wrong form and a genuine
misconception.

### 5. Visuals must carry thought

A diagram earns its place when it reveals a relationship or lets the student test an idea.
Decorative diagrams and answer-revealing diagrams both weaken the lesson.

### 6. Progress must be believable

Do not show false precision. Explain why a skill is being suggested and what evidence would
make it secure. A student should be able to disagree with the app and practise anyway.

### 7. Delight should be quiet and earned

Use warmth, satisfying motion and small moments of recognition. Avoid streak pressure,
leaderboards, random badges, confetti after routine answers and anything that turns maths
into a slot machine.

## The ideal student journey

```text
Arrive
  → choose Continue, Today's plan, Review, or Explore the course
  → see the lesson goal and a short readiness check
  → predict or represent before calculating
  → work with the tutor and canvas
  → commit an answer explicitly
  → receive precise feedback and retry if needed
  → explain the key idea in one sentence
  → see a short lesson recap and the next useful action
  → revisit the idea later in mixed review
```

The student should be able to complete this loop with a keyboard, touch, screen reader or
voice input, on a phone or a large screen, without losing their place.

## 1. Home and course navigation

### Problems to solve

- The home page leads with the whole course rather than a small, achievable plan.
- “Started,” “Shaky,” “Getting there” and “Secure” do not explain what changed or what the
  student should do about it.
- A skill shows its problem count, but not its purpose, estimated lesson length or prerequisite.
- Review material, new material and resumed work are presented as similar kinds of cards.
- There is no search, unit overview or route for a student who knows the topic but not the
  curriculum name.

### Improvements

- Add a **Today** section with at most three choices:
  - Continue the current lesson.
  - Complete a 5–10 minute mixed review.
  - Start one recommended new skill.
- Give every recommendation a plain reason: “Review this because it has been four weeks,”
  “This prepares you for quadratics,” or “You were close after one hint last time.”
- Add an **Explore course** view with search and filters for unit, strand and mastery state.
- Give each unit a short overview: the big idea, what it unlocks and a realistic time range.
- Show prerequisites as helpful links, not locks. Use “This will be easier after…” rather
  than “Blocked.”
- Replace “Shaky” with a less judgmental label such as **Needs practice**. Reserve colour for
  meaning and pair every colour with text or an icon.
- Let the student pin a skill or say “I need this for school this week.” Recommendations can
  then respect both learning evidence and immediate goals.

## 2. Onboarding and placement

### Goal

The first session should produce a useful recommendation without feeling like an exam.

### Improvements

- Ask only what changes the experience:
  - preferred name;
  - current course or unit;
  - near-term goal;
  - whether the student prefers to type, speak or work mostly with diagrams.
- Offer three starts: **Start from the beginning**, **Tell me where to begin**, and
  **Choose a topic myself**.
- Build two short placement routes from the existing diagnostics: algebra/number and
  geometry/graphs/data. Allow “I have not learned this yet” as a non-penalised response.
- Explain the outcome in human terms: “You are ready to begin linear systems. I have also
  saved two exponent questions for review.”
- Make placement optional and resumable. Never force a long test before the student can see
  the product.

## 3. Lesson orientation

### Problems to solve

- The opening asks the student to restate every problem, even deep into a variation sequence.
- The CPA rail names the stages but does not explain the current purpose or allow a learner to
  request a step back.
- “Finish lesson” is always present, but there is no visible lesson goal or expected size.

### Improvements

- Start each lesson with a compact orientation card:
  - **Goal:** what the student will be able to do.
  - **Why it matters:** one concrete use or connection.
  - **Plan:** approximately how many questions or minutes.
- Make the opening depend on the problem:
  - First problem: ask the student to describe the situation.
  - Variation item: use its authored prediction prompt immediately.
  - Review item: ask for recall before showing a representation.
  - Diagnostic: ask for an unaided answer first.
- Rename the visible CPA stages for students while retaining the formal terms in help text:
  **Handle it → See it → Symbolise it**.
- Add **Go back to a picture** and **Show me with objects** actions. The tutor still decides
  when to advance, but the student can request more support without framing it as failure.
- Show progress as “Question 2 of 5 in this lesson,” not “2 of 23 in the bank.” End a lesson
  when the learning goal has enough evidence; do not exhaust the bank by default.

## 4. Conversation and answer entry

### Problems to solve

- One composer currently handles questions, working and final answers. The student cannot
  always tell when the tutor will treat a message as a committed answer.
- Hints are controlled through conversation, so their existence and progression are obscure.
- A long transcript can bury the current task and the useful feedback.

### Improvements

- Separate two intents while keeping one friendly composer:
  - **Ask / explain my thinking** sends ordinary conversation.
  - **Check my answer** marks the response as a commitment and invokes deterministic checking.
- Provide a maths-aware answer field for common structures:
  - a single number and unit;
  - coordinate pair;
  - unordered roots;
  - expression or equation;
  - multiple-choice diagnostic.
  Plain text remains available, but the expected shape is visible before submission.
- Add a dedicated **Hint** button showing the next level without revealing its content:
  **small nudge**, **method clue**, **nearly there**. Spend one only after confirmation.
- Add quick support actions: **Ask a smaller question**, **Draw it**, **Show a similar example**,
  and **Explain this word**.
- Keep tutor replies brief and visually separate the question the student should answer next.
- Pin the current problem and latest tutor question while the transcript scrolls.
- Add **Undo my last message** before a response begins, and **Retry** after a network failure.
- Preserve unsent text and attached work through navigation, reconnects and accidental reloads.

## 5. Tutor behaviour

### Keep

- One question at a time.
- Deterministic marking through the checking tool.
- No praise before an answer is checked.
- Socratic narrowing before spending a hint.
- Movement between concrete, pictorial and abstract representations.

### Improve

- Use the student's previous attempt and misconception history explicitly but naturally:
  “Last time the sign changed when you divided. What can keep it visible here?”
- Distinguish four recovery paths:
  - **Slip:** point to the exact line and ask for a check.
  - **Wrong form:** affirm equivalence, then ask for the requested form.
  - **Misconception:** use the authored probe and return to a representation.
  - **Unreadable:** ask for only the final value; never count it as wrong.
- After a correct answer, ask one short transfer or explanation question only when it adds
  evidence. Do not make every success pay a conversational tax.
- Use a worked example only after an attempt, on request, or when repeated scaffolding has not
  helped. Pair it with a new but closely related question.
- Vary tone and openings while keeping language stable and concise. Avoid “obviously,” “easy,”
  excessive enthusiasm and repeated praise phrases.
- Give the student a graceful escape: “I need to stop,” “I have not learned this,” and
  “Show the solution and let me practise another.” Record these accurately rather than as
  incorrect attempts.

## 6. Canvas and mathematical interaction

### Goal

The canvas should become the student's workspace, not a display panel owned by the tutor.

### Improvements by figure type

| Figure | Useful student action | Learning evidence returned |
| --- | --- | --- |
| Bar model | Resize, regroup and label parts | relationships the student believes are equal |
| Algebra tiles | Drag, combine zero pairs and form rectangles | expansion or factors represented |
| Area grid | Fill products and headers | missing distribution steps |
| Cross frame | Place factors and test cross-products | candidate factor pairs and sign choices |
| Angle diagram | Mark equal/supplementary angles and add reasons | chosen angle fact and dependency chain |
| Coordinate plane | Plot points, draw lines and move slope triangles | coordinates, gradients and intercepts |
| Solid/net | Fold/unfold, select exposed faces and mark dimensions | surface versus hidden faces; chosen height |
| Statistical plot | Place quartiles, fit a line and classify points | summaries, trend and outlier judgment |

Add missing primitives used throughout the authored content: number line, fraction strips,
two-pan balance, piecewise motion graph, histogram with class midpoints, and scatter plot with
a movable best-fit line.

For every interaction:

- Make handles large enough for touch.
- Offer keyboard controls and a textual alternative.
- Announce changes to assistive technology.
- Include reset, undo and “show tutor my version.”
- Permit mathematically inconsistent intermediate states, but explain the inconsistency in
  student language.
- Never reveal the answer through a default label, scale or snapped position.

## 7. Scratch work and multimodal input

- Add a lightweight scratchpad beside the structured canvas: pen, eraser, straight line,
  text and clear/undo. It is working space, not a drawing application.
- Let students crop and rotate a photo before sending it. Show what will be uploaded and allow
  deletion from the lesson history.
- When reading handwriting, quote the line the system believes it saw and ask for confirmation
  before judging it.
- Verify the current photo path with real handwriting, poor lighting, rotated images, multiple
  lines and common notation such as fractions, roots and indices.
- Add voice only when turn-taking is clear: visible listening state, transcript before send,
  interruptible playback and an immediate mute control.
- Keep all essential functionality available without a camera or microphone.

## 8. Problems, examples and reference material

- Add a per-skill **Reference** panel containing:
  - the big idea in one paragraph;
  - a labelled representation;
  - key formulas with the meaning of each symbol;
  - one complete worked example;
  - two common mistakes and checks.
- Add multi-part problem support so connected tasks remain connected: graph, vertex, roots and
  interpretation should not become unrelated cards.
- Add a reasoning rubric for proofs and explanations. Record claims, evidence and logical links
  separately from the numeric by-product.
- Add form-aware checking for standard form, significant figures and required algebraic form.
- Tag each problem with estimated time, calculator policy, reading demand, representation and
  prerequisite—not only difficulty tier.
- Audit contexts for cultural familiarity, realistic numbers, unnecessary reading load and
  accidental stereotypes.
- Keep variation sequences intact. Show what changed and ask for a prediction before calculation.
- Give challenge problems an explicit invitation: “This may take several attempts; partial
  progress counts.”

## 9. Feedback and recovery

### Correct

- State that it is correct without fanfare.
- Highlight the decisive idea, not only the final value.
- Offer the next action: explain, try a variation, or finish.

### Incorrect

- Preserve the student's work on screen.
- Identify the earliest useful place to look, without rewriting the solution.
- Ask for one repair at a time.
- Allow immediate retry without duplicating the whole problem.
- After repeated attempts, offer a representation change before a fuller hint.

### After the problem

- Provide a collapsible comparison between the student's route and a concise worked solution.
- Let the student mark “I guessed,” “I understand now,” or “Still unsure.” This is
  metacognitive context, not self-grading, and should not override correctness evidence.
- Save the misconception and successful correction so future review can test the corrected idea.

## 10. Review, spacing and durable learning

- Create a **Quick review** session of 5–8 mixed questions drawn from decayed skills and recent
  misconceptions.
- Prefer retrieval before reteaching. Begin with the abstract form; move back to pictures when
  recall fails.
- Schedule reviews with expanding gaps and adapt the interval using correctness, hints and
  confidence.
- Interleave skills only after each has been learned separately. Early practice should preserve
  authored variation sequences.
- Include cumulative checks at unit boundaries and a short “Can you still do it?” check several
  weeks later.
- Stop routine fluency practice when evidence is sufficient. Keep unused bank items for review,
  not as a completion requirement.
- Explain review timing: “You learned this three weeks ago; recalling it now will make it last.”

## 11. Progress and reflection

- Add a skill detail page showing:
  - what the skill means;
  - recent attempts and representations used;
  - misconceptions encountered and corrected;
  - last practised and next suggested review;
  - related prerequisite and next skills.
- Show evidence in plain language rather than a probability: **New**, **Building**, **Nearly
  secure**, **Secure**, **Ready to review**.
- At lesson end, show a three-line recap:
  - “You learned…”
  - “The idea that unlocked it was…”
  - “Next, I recommend…”
- Let the student write one takeaway or save one worked problem.
- Celebrate milestones tied to learning: first independent solution, returning after a mistake,
  explaining a misconception, and recalling a skill after a delay.
- Do not punish missed days or reset progress streaks.

## 12. Visual and interaction design

- Preserve the warm paper-and-sage identity; it suits sustained study and avoids a corporate
  dashboard feel.
- Increase the visual hierarchy of the active question and primary action. Secondary metadata
  such as unit, problem count and hint count should stay quiet.
- Make interactive objects look interactive through handles, hover/touch states and a one-time
  demonstration—not permanent instructional clutter.
- Let the student resize the canvas and conversation on larger screens.
- On phones, use clear **Problem**, **Canvas** and **Tutor** tabs with a persistent answer action;
  do not force two cramped vertical panes.
- Use motion to explain state changes: a term moving across an equation, a bar regrouping or a
  net folding. Respect reduced-motion settings with an immediate-state alternative.
- Provide explicit light, dark and system themes. Do not rely only on operating-system state.
- Test mathematical notation at 200% zoom and on narrow screens; formulas must scroll without
  hiding surrounding prose.

## 13. Accessibility and inclusion

Target WCAG 2.2 AA as a baseline.

- Complete every workflow with keyboard only.
- Give all canvas interactions equivalent buttons or structured fields.
- Maintain visible focus styles and logical focus order after tutor replies and problem changes.
- Announce streamed responses, answer verdicts, hint use and canvas changes without reading every
  token as it arrives.
- Use meaningful figure descriptions that state relationships without leaking answers.
- Never encode mastery, correctness or graph series by colour alone.
- Check contrast in light and dark themes, including faint text and disabled controls.
- Use 44-by-44 CSS-pixel touch targets for primary mobile controls.
- Let students enlarge text without losing the problem, answer button or navigation.
- Avoid idioms that create extra language difficulty. Define curriculum terms on demand.
- Offer a low-reading mode that shortens context while preserving the mathematics.
- Do not assume precise dragging, colour vision, hearing, speech or camera access.

## 14. Performance, reliability and offline behaviour

- Render the problem, prior transcript and local tools immediately; the model should only delay
  the tutor response.
- Set experience budgets:
  - page interaction ready within 2 seconds on an ordinary phone connection;
  - visible response acknowledgement within 150 ms;
  - first streamed tutor text within 2 seconds for most turns;
  - canvas interaction at 60 fps where the device permits.
- Preserve the student's pending answer locally until the server confirms receipt.
- Make tutor turns idempotent so retries cannot duplicate messages, attempts or mastery evidence.
- Add reconnect/resume behaviour for interrupted streams.
- Distinguish service failure, invalid diagram, unreadable answer and expired access in the UI.
- Cache static curriculum and renderers. Consider offline reference pages and scratch work even if
  AI tutoring still requires a connection.
- Add end-to-end tests for a complete two-problem lesson, retry after a dropped stream, image
  upload, misconception logging, mobile navigation and keyboard-only canvas use.

## 15. Privacy, safety and trust

- Explain what is stored: answers, hints, lesson messages, figures and uploaded images.
- Let the student delete a photo, a lesson transcript or all learning data.
- Avoid retaining image data longer than its learning purpose requires.
- Do not infer sensitive traits from handwriting, voice, pace or mistakes.
- Make it clear that mastery labels are recommendations, not judgments or school grades.
- Keep model responses constrained to the current maths task and show a calm boundary for
  unrelated or unsafe requests.
- Provide a visible report action for an incorrect solution, misleading diagram or uncomfortable
  tutor response.
- Log enough context to reproduce content failures without exposing more student data than needed.

## 16. Measurement and evaluation

Optimise for learning and confidence, not message volume or time in app.

### Learning outcomes

- Independent correctness on the next variation.
- Correctness on delayed mixed review.
- Reduction in repeated misconception codes.
- Ability to explain or represent the key relationship after solving.
- Transfer from pictorial support to abstract work.

### Experience outcomes

- Time from opening a lesson to the first meaningful action.
- Percentage of students who know how to submit an answer without help.
- Hint use followed by a successful retry.
- Lesson completion and voluntary return to review.
- Abandonment immediately after an incorrect answer or service failure.
- Student response to: “I knew what to do next,” “Mistakes felt recoverable,” and “The
  pictures helped me think.”

### Guardrails

- Unparseable answers must never count as incorrect.
- Tutor or diagram answer leakage must not increase.
- Faster completion must not reduce delayed retention.
- Recommendation changes must remain explainable.
- Accessibility checks must pass before a feature is considered complete.

Use short observed sessions with real learners throughout development. Analytics can show where
students stop; observation reveals why. For each major change, ask the learner to narrate what
they believe the current task is and what they expect each control to do.

## Prioritised delivery plan

### P0 — clarity, control and trust

1. Add explicit **Check my answer**, **Ask**, **Hint** and **Retry** actions.
2. Replace repetitive openings with problem-aware openings and variation predictions.
3. Add a real lesson goal, bounded lesson size and end-of-lesson recap.
4. Improve mobile navigation between problem, canvas and tutor.
5. Make network retries idempotent and preserve unsent work.
6. Verify the complete two-problem flow, misconception logging and photo upload live.
7. Fix keyboard focus, streamed-response announcements and colour-only states.

### P1 — complete the learning loop

1. Add per-skill reference pages and one worked example per skill.
2. Build mixed review sessions with expanding spacing.
3. Add skill history and explainable recommendation details.
4. Assemble optional placement from existing diagnostics.
5. Add multi-part problems and reasoning rubrics.
6. Stop fluency sessions when sufficient evidence has been collected.

### P2 — make representations active

1. Make algebra tiles, area grids, cross frames and coordinate planes interactive.
2. Add number lines, fraction strips and balances.
3. Add interactive motion and statistical graphs.
4. Add scratch work, undo/reset and robust touch/keyboard equivalents.
5. Return structured student actions to the tutor as evidence.

### P3 — delight and multimodal polish

1. Add quiet, insight-based celebrations and saved takeaways.
2. Add verified handwriting support with confirmation before marking.
3. Add optional voice with transcript-first control.
4. Add a small library of reviewed physical-demonstration clips where motion teaches something
   a static diagram cannot.
5. Add explicit themes and personal learning preferences.

## Recommended first release slice

The highest-value slice is a redesigned five-question lesson using one existing skill. It should
include:

- a clear goal and expected duration;
- a variation-aware opening;
- explicit answer commitment and hint controls;
- one interactive representation;
- precise retry feedback;
- a short explanation after one strategically chosen problem;
- an end recap and scheduled review;
- keyboard, touch and screen-reader paths;
- recovery from a dropped tutor response.

Test this slice with learners before applying it to all 49 skills. The objective is not whether
they like the colours. It is whether they can begin without instruction, recover from a mistake,
explain the visual relationship and know what to do when the lesson ends.

## Definition of an intuitive and enjoyable lesson

A lesson is ready when:

- the student can identify the goal and next action within five seconds;
- the problem, tutor and canvas never give conflicting instructions;
- submitting an answer is deliberate and its result is unambiguous;
- every wrong-answer state offers a specific, manageable recovery;
- the representation helps the student reason and is accessible without dragging;
- the student can request more or less support without penalty;
- progress is saved across refreshes and recoverable after failures;
- the lesson ends with closure rather than simply returning to the course list;
- the next recommendation explains itself;
- a delayed review checks whether the learning lasted.

That is the standard: not a student who merely reaches the answer, but one who leaves knowing
why it worked, feeling capable of trying again, and wanting to come back.
