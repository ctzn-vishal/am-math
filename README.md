# Math Sage

A Secondary 2 / Grade 8 mathematics tutor that teaches through the Concrete–Pictorial–Abstract
sequence, and that **draws**.

The tutor does not describe a bar model in prose. It emits a typed figure spec, the app
validates it mathematically and renders it, and the student can rearrange it — which goes
back to the tutor as a figure, not as a description of one.

## Setup

```bash
npm install
```

```bash
cp .env.example .env.local
```

Fill in three things:

| Variable | Where from |
| --- | --- |
| `GEMINI_API_KEY` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` | `turso db create math-sage`, then `turso db show --url` and `turso db tokens create` |
| `TUTOR_ACCESS_SECRET` | Any passphrase. Gates the whole app. |

Paste each value on **one line** — a wrapped token reads as empty.

```bash
npm run dev
```

Migrations run automatically on the first request. There is no separate database step.

Without Turso credentials it falls back to a local SQLite file, which is fine for
development and **cannot** work on Vercel — the filesystem there is ephemeral, so the app
refuses to start rather than silently discarding a student's progress.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build |
| `npm test` | Vitest |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:studio` | Drizzle Studio against whatever the app is pointed at |

## How it fits together

```
lib/visual/      VisualSpec — the contract between the tutor and the canvas
lib/content/     Skill-graph curriculum layer (curriculum-agnostic)
lib/tutor/       Prompt, tool declarations, streaming engine, answer marking
lib/mastery/     Beta posterior per skill, and what to work on next
lib/session/     Persistence and the evidence trail
lib/text/        The tutor's reply dialect: LaTeX + a markdown subset
content/packs/   Curriculum packs. Dimensions Math G8 is the first.
components/      UI, including the figure renderers
```

### Three things worth knowing

**Figures are validated before they are drawn.** `lib/visual/validate.ts` holds a bar model
to a single shared scale across the whole diagram, checks that a cone's slant height agrees
with Pythagoras, and refuses a five-number summary that contradicts its own data. A figure
that fails goes back to the model with the specific defect — *"Scale break: '20' is worth 20,
so to match '10' it has to be 4 wide, but it is 3"* — so it corrects the diagram rather than
giving up and reverting to prose. A wrong diagram teaches something false with the full
authority of a picture, so this is the load-bearing part of the design.

**The model never marks work.** `lib/tutor/check.ts` does, in code. It has three outcomes,
not two: `unparseable` means *we* could not read the student, is never recorded as a wrong
answer, and the model is told so explicitly.

**There is no fallback path.** If the API fails, the failure is shown. The app this replaced
answered errors with canned encouragement, which made an outage indistinguishable from a
working tutor.

### Adding a figure type

1. Add the schema to `lib/visual/spec.ts`
2. Add its soundness checks to `lib/visual/validate.ts`
3. Write the renderer in `components/visual/`
4. Flip `implemented: true` in `lib/visual/registry.ts`
5. Add a spec to `lib/visual/gallery.ts` and look at it on `/figures`

The tool declarations sent to Gemini are generated from that registry, so the tutor gains the
new figure with no prompt change — and can never be offered one the app cannot draw.

**Keep the schema flat.** Gemini's function-calling schema is an OpenAPI 3.0 subset: no
`oneOf`, no `const`, no tuple-form `items`. A spec that emits any of those gets the *entire*
request rejected with `Invalid JSON payload: syntax error in request body`, naming no field
and no tool — the tutor simply stops working. `assertGeminiCompatible` catches it in a test
instead; see the note on `curveSchema` for how to flatten a union.

`/figures` renders every kind from a real spec. It is development-only, and it is the only
way to judge a renderer — a chart can pass every assertion and still be unreadable. Two bugs
that no test caught were found by looking at it: a line that silently did not draw at all,
and a cone captioned `r = 3, h = 4` drawn at 2.45:1.

### Adding a curriculum

Content is keyed on **skill nodes**, not chapters. A unit is presentation only; the
prerequisite graph is what sequences learning. Write a pack against
`lib/content/schema.ts`, register it in `lib/content/index.ts`, and the tutor, the mastery
model and the UI all pick it up. Packs are integrity-checked at load: dangling skill ids,
prerequisite cycles and unreachable skills fail loudly at startup rather than as a blank
panel mid-lesson.

## State of the build

**All eight figure kinds are drawable.** Bar models are draggable; the rest are read-only for
now.

**Content is the remaining gap.** Unit 2 (`linear-systems`) is fully authored: per-skill CPA
notes, real misconception probes, and problems with structured answers that code can mark.
The other thirteen units are mechanically ported from the syllabus outline — the tutor can
teach them, and does so competently, but they share one set of CPA notes per unit and have
no marked problems, so `check_answer` has nothing to check there. The dashboard labels which
units are which.

See [docs/REBUILD-PLAN.md](docs/REBUILD-PLAN.md) for the full plan and phasing.
