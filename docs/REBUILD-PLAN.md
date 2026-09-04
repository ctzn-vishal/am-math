# Singapore Math Sage — Rebuild Plan

Supersedes the AI Studio scaffold at commit `d7e2ac3`. Building on branch `rebuild`.

## Progress

| Phase | State |
| --- | --- |
| 0 — Foundation | Done. Next.js 16, Turso (libsql) + Drizzle with auto-migration, skill-graph content layer. |
| 1 — Vertical slice | Done and verified live. Streaming tutor loop, interactive bar model, student → tutor spec round trip, unit 2 authored, evidence recorded end to end. |
| 2 — Breadth | **Renderers done** — all eight kinds draw, verified live. **Authoring outstanding** — 13 units still mechanically ported. |
| 3 — Student model | Model and estimator done and tested; no progress UI beyond the dashboard bands. |
| 4 — Multimodal | Photo upload path is wired end to end but unexercised. Voice not started. |
| 5 — Polish | Not started. |

160 tests.

## Deployment

Vercel, from `main`. Three environment variables have to be set there:

- `GEMINI_API_KEY`
- `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` — a local SQLite file cannot work on a
  serverless host, and the app refuses to start rather than losing progress silently
- `TUTOR_ACCESS_SECRET` — without it the deployment serves a 503 rather than an open door
  that spends the Gemini quota for anyone who finds the URL

## What the live runs showed

The tutoring loop worked on the first turn against a real key: the model drew a validated
figure and asked what the leftover strip was made of rather than answering. At the concrete
stage it reached for the balance scale from the authored CPA notes rather than inventing its
own metaphor. Given the new renderers, it drew `(a+b)²` as a proportional area grid and
asked which regions get left out.

Four fixes came out of running it rather than reading it:

- **`check_answer` was handed whole paragraphs.** Told to pass the student "verbatim", the
  model forwarded their working along with their answer, and four numbers cannot be told
  apart. Fixed in the tool contract, not the parser.
- **Mastery bands were knife-edged.** One correct answer landed exactly on a threshold that
  seconds of decay tipped across, so the dashboard called a skill "shaky" right after the
  student got it right.
- **A line silently did not draw.** Clipping dropped out-of-range samples instead of
  interpolating to the boundary, so `y = 2x + 1` on a ±4 view kept one point and vanished.
- **Gemini rejected every turn** once the new specs landed. Its function-calling schema is
  an OpenAPI 3.0 subset with no `oneOf`, `const` or tuple `items`, and it names nothing in
  the error. `assertGeminiCompatible` now fails a test instead.

## Still unverified

- `log_misconception` and `advance_stage` have not fired in a live session.
- The multi-round tool loop has only run at one round trip per turn.
- The photo-of-working vision path has never been given a real photo.

## 1. Why rebuild rather than repair

The current app has never executed its own tutoring loop. Three client/server contract
breaks mean `/api/chat` returns 400 on every request, and both the client catch block and
the server's own error handler substitute hardcoded prose. Repairing the contract is a
20-minute job, but it surfaces the deeper problems rather than fixing them:

- Ten hand-built studio components (~3,400 LOC) cover 10 of 14 chapters. Each new topic
  costs a new bespoke component.
- The tutor cannot drive a visual. State flows student → model as prose only.
- Mastery is self-graded checkboxes in `localStorage`; there is no evidence model.
- The model in use (`gemini-2.5-flash`) is deprecated, and `generateContent` has been
  superseded by the Interactions API.

Carry forward: `src/data/curriculumData.ts`, the CPA system prompt, the sage/olive visual
identity, and the studio concepts. Discard the wiring.

## 2. Core architectural bet: spec-driven visuals

The model does not draw. The model emits a **typed spec**; the app renders it.

```
Gemini (tool call / structured output)
  → VisualSpec  { kind: "bar_model", rows: [...] }
  → Zod validation + numeric assertion (do the bars actually sum to the total?)
  → <VisualRenderer spec={...} />   SVG, one renderer per kind
  → student manipulates → new VisualSpec → back to Gemini as the next turn's input
```

Properties this buys:

| Property | Generated video/image | VisualSpec |
| --- | --- | --- |
| Numeric correctness | not guaranteed | verified before render |
| Latency | seconds to minutes | sub-millisecond |
| Marginal cost | high per clip | ~zero |
| Student can manipulate | no | yes |
| Tutor sees student's state | no | yes, structurally |
| Testable / replayable | no | yes |

### Spec types (8, covering all 14 chapters)

| kind | Chapters served |
| --- | --- |
| `bar_model` | 2 (simultaneous eq.), 5 (algebraic fractions), ratio work |
| `algebra_tiles` | 3, 4, 14 (expansion, factorisation, completing the square) |
| `area_grid` | 3, 4 (special products, 2×2 expansion) |
| `cross_frame` | 4, 14 (non-monic factorisation) |
| `angle_diagram` | 6, 7 (congruence, parallel lines, polygons) |
| `coordinate_plane` | 8, 9, 11 (linear/quadratic graphs, coordinate geometry) |
| `solid_net` | 10, 12 (Pythagoras 3D, mensuration) |
| `stat_plot` | 13 (box plots, grouped data) |

Each is a discriminated-union member of one Zod schema. One renderer per kind, one
interaction handler per kind. This replaces all ten studios.

## 3. Stack

| Layer | Choice | Note |
| --- | --- | --- |
| App | Next.js 15 App Router + TypeScript | server actions for the tutor loop; deploys to Vercel |
| Styling | Tailwind v4 | keep the existing palette and type scale |
| Model | `gemini-3.8-flash` via Interactions API, streaming | `gemini-3.1-pro-preview` for problem authoring only |
| SDK | `@google/genai` ≥ 2.3.0 | `client.interactions.create`, not `generateContent` |
| Validation | Zod | VisualSpec, curriculum content, tool arguments |
| DB | Postgres (Neon) + Drizzle | student model must be server-side |
| Auth | Auth.js, email link | gates the API key spend |
| Math | KaTeX | already in place, keep |
| Tests | Vitest + Playwright | spec validation and the tutor loop are both testable |

Install the Gemini skills so API shapes come from the source of truth:

```bash
npx skills add google-gemini/gemini-skills
```

## 4. Tutor loop

The system prompt keeps the CPA + Socratic framing from `server.ts` — it is good. Add tools:

- `render_visual(spec: VisualSpec)` — put a picture in front of the student
- `check_answer(problem_id, student_response)` — server-side, deterministic where possible
- `advance_stage(chapter_id, stage: concrete | pictorial | abstract)`
- `log_misconception(code)` — the PDF's misconception taxonomy becomes an enum

Rules:

- Stream every turn. No blocking spinner on a tutoring exchange.
- **No silent fallback.** If Gemini fails, surface it. The current design makes an outage
  indistinguishable from a working tutor.
- Rate limit per authenticated session. Never expose the key path unauthenticated.
- Validate every `render_visual` spec numerically before it reaches the DOM. A rejected
  spec goes back to the model as a tool error, not to the student.

## 5. Student model

Replace self-graded checkboxes with inferred mastery over a skill graph.

- Skill nodes derived from the chapter objectives already in `curriculumData.ts`.
- Evidence: problems attempted, hints consumed before success, misconception codes fired,
  time-to-first-correct, and the CPA stage at which the student succeeded.
- Estimator: per-node Beta posterior updated on each attempt. Simple, explainable,
  sufficient. Not IRT — the item pool is far too small to calibrate.
- Surface it as "what to work on next," not as a completion percentage.

## 6. Where Gemini's other modalities go

| Capability | Model | Use | Phase |
| --- | --- | --- | --- |
| Vision input | `gemini-3.8-flash` | read a photo of handwritten working, locate the error | 4 |
| Voice tutoring | Live API | talk the student through while they manipulate the canvas | 4 |
| TTS | `gemini-3.1-flash-tts-preview` | replace browser `speechSynthesis` | 4 |
| Scene imagery | `gemini-3.1-flash-image` | concrete-stage context art (water tank, ticket booth). **Not diagrams.** | 5 |
| Concrete clips | `gemini-omni-1.1-flash` | ~15 pre-rendered, human-reviewed hook videos, build-time only | 5 |

### On Omni specifically

Omni 1.1 Flash generates video. It is the wrong tool for runtime math visuals: it cannot
guarantee correct numerals, labels or proportions; it takes minutes per clip; it costs
orders of magnitude more than a text turn; and a video cannot be manipulated, which is the
entire point of the concrete stage. Video-to-video editing is additionally unavailable in
the EEA, UK, Switzerland and some US states.

It is the *right* tool for a small, curated library of physical-world demonstrations that
need no numeric precision: three cones filling a cylinder (justifying the ⅓ coefficient in
Ch. 12), paper folding for 2ⁿ (Ch. 1), the two-pan balance (Ch. 2), unfolding a cone's net
(Ch. 12). Generate once, review each one by hand, commit as static assets. Never generate
at runtime, never inside the tutoring loop.

## 7. Phasing

**Phase 0 — Foundation (~1 week).** Next.js skeleton, auth, Postgres + Drizzle schema,
curriculum migrated from the TS array into validated content files, CI running typecheck
and tests.

**Phase 1 — Vertical slice (~2 weeks).** One chapter (Ch. 2, simultaneous equations) end to
end: streaming tutor on `gemini-3.8-flash`, `render_visual` wired, the `bar_model` spec and
renderer complete and interactive, student manipulation flowing back as a spec. Success
criterion: a student solves a Ch. 2 problem entirely through the CPA sequence with the
tutor driving the visuals.

**Phase 2 — Breadth (~3 weeks).** Remaining 7 spec types and renderers. All 14 chapters
ingested. Problem bank built out from the 27-page content PDF.

**Phase 3 — Student model (~2 weeks).** Skill graph, evidence capture, Beta estimator,
next-best-activity surface, cross-device progress.

**Phase 4 — Multimodal (~2 weeks).** Photo-of-work vision path. Live API voice tutoring.
TTS replacing the browser hack.

**Phase 5 — Polish (~2 weeks).** Omni concrete-clip library. Scene imagery. Accessibility
pass. Performance.

## 8. Decisions

Settled 2026-09-04.

1. **Audience: one or two students.** Personal tool. Phase 0 drops Auth.js, multi-tenancy
   and per-user spend caps; a single local student profile in Postgres is enough. The API
   route still gets a shared-secret guard and a rate limit so a leaked URL cannot burn the
   key. Revisit if this ever goes wider — the schema below stays compatible.
2. **Content layer is curriculum-agnostic from day one.** Content is keyed on skill nodes,
   not on `Chapter 1..14`. Dimensions Math Grade 8 becomes the first *curriculum pack*
   loaded against that schema, not the schema itself. Costs ~2 days now; avoids a migration
   when Sec 3 or another syllabus arrives.
3. **Rebuild on a clean branch in this repo.** `rebuild/` branch off `main`.
   `curriculumData.ts` and the CPA system prompt get ported across; `main` stays untouched
   as a reference for the ten studio components until Phase 2 has replaced them all. Git
   history and `docs/` are preserved.

### Consequences for the phasing above

- **Phase 0** shrinks to roughly half a week: Next.js skeleton, Postgres + Drizzle with a
  single-profile schema, curriculum-pack loader and Zod content schema, CI.
- **Phase 3** simplifies — one student's evidence stream, no cross-tenant isolation — but
  the skill graph and Beta estimator are unchanged, since they were always per-skill-node
  rather than per-chapter.
- Auth, billing and teacher views are explicitly out of scope. Do not build seams for them
  beyond what the skill-node schema already provides.
