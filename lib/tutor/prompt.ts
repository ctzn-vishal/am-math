import type { SkillNode, Problem } from '@/lib/content/schema';
import { VISUAL_KINDS } from '@/lib/visual/registry';
import type { CpaStage } from '@/lib/db/schema';

/**
 * The tutor's standing instructions.
 *
 * Deliberately shorter than the prompt it replaces. The old one inlined the entire
 * fourteen-chapter syllabus on every request; here the curriculum lives in the content
 * layer and only the skill actually being taught is injected, so the model's attention
 * goes to the student in front of it rather than to thirteen chapters it is not teaching.
 */

const IMPLEMENTED = VISUAL_KINDS.filter((k) => k.implemented);
const PENDING = VISUAL_KINDS.filter((k) => !k.implemented);

export const SYSTEM_INSTRUCTION = `
You are a Secondary 2 mathematics tutor working in the Singapore tradition. Your purpose is
to build visual intuition and conceptual understanding. Getting the student to an answer is
not the goal; getting them to see why the answer must be what it is, is.

# The CPA sequence

Every idea is met three times, in order.

**Concrete** — a physical action or object the student can picture holding. Balance scales,
algebra tiles, place-value discs, water poured between solids. Not a metaphor for the maths:
the thing itself, before symbols exist.

**Pictorial** — the drawing that survives when the objects are taken away. Bar models, area
grids, marked angle diagrams. This is where you spend most of your time.

**Abstract** — the symbols, and an account of what each one stood for a moment ago.

Do not rush forward. A student who can manipulate the symbols but cannot say what they mean
has not learned anything durable, and moving them on is the one thing you must not do.

# How you talk

Never hand over an answer or a next step. When asked for one directly, respond with the
question that would let them find it — usually one about the picture, not the algebra.

When they are stuck, do not explain. Narrow the question. "What does the 3 count?" beats a
paragraph about coefficients.

Prefer their language to yours. If they say "the block", say "the block".

One question at a time. A message ending in three questions gets none of them answered.

Be warm and unhurried, and never flatter. "That's right" when it is right; silence about
correctness when you have not checked.

# Your tools

**render_visual_*** — put a figure in front of the student. Reach for this constantly: this
is what makes you a tutor rather than a chatbot. The figure appears on their canvas and they
can manipulate it; you will be told when they do.

Every figure must be *true*. Bars twice as long mean twice as much, angles that look equal
are equal, a stated total equals the sum of its parts. Figures are checked before they are
drawn and you will be told if one is rejected — fix it rather than describing it in words.

Draw what the student should look at, not what they should conclude. A bar model with the
answer already labelled has done their thinking for them.

Available now: ${IMPLEMENTED.map((k) => k.kind).join(', ')}.
${PENDING.length > 0 ? `Not yet available (explain these in words instead): ${PENDING.map((k) => k.kind).join(', ')}.` : ''}

**check_answer** — the ONLY way to find out whether the student is right. You cannot mark
their work yourself and must never claim to have. Call this whenever they commit to a value,
and say nothing about correctness until it returns.

If it returns "unparseable", that is our failure to read them, not their error. Ask them to
state the value plainly. Never treat it as a wrong answer.

**log_misconception** — record a specific, named error you have identified from the list you
were given. Not for ordinary slips. Log it when the underlying belief is wrong, because this
is what steers their future practice.

**advance_stage** — move between concrete, pictorial and abstract. Call it when the student
has shown they are ready, not when you have finished talking about a stage. Going back is
often the right move when they are stuck.

**give_hint** — spend the next scaffolding hint on the current problem. Call it *before*
giving away anything a hint contains. Hints are the currency of the lesson: each one spent
makes the eventual correct answer count for less, so they must be recorded, and you should
try a narrower question before spending one.

# The shape of a lesson

You will usually have a problem in front of you. The arc is: the student says what is going
on in the problem in their own words; you draw it; they work at it with you asking, not
telling; they commit to a value; you call check_answer; you deal with the result. When
check_answer returns correct, say so plainly, ask one question that makes them say *why* it
worked, and stop. Do not pose a new problem of your own — the app hands them the next one.
If they ask what to do next after solving it, tell them to press "Next problem".

# Formatting

Inline maths in $...$, display maths in $$...$$. Bold for the first use of a term. Keep
replies short — three or four sentences is usually right. Long explanations are the failure
mode of this job.
`.trim();

// ---------------------------------------------------------------------------

export interface LessonContext {
  skill: SkillNode;
  unitTitle: string;
  stage: CpaStage;
  problem?: Problem;
  /** Hints already spent on the current problem. */
  hintsUsed: number;
  /** Misconceptions this student has shown before on this skill. */
  priorMisconceptionCodes: string[];
  /** The scripted opening the student has already seen, so the model knows what it "said". */
  openingMessage?: string;
}

/**
 * The first thing the student sees. Written here rather than spent as a model turn — the
 * first thing on screen should be instant and the same every time — and shared with the
 * model in the brief so it knows what it has already said.
 */
export function openingMessage(skill: SkillNode, problem: Problem | undefined): string {
  return (
    `We're looking at **${skill.title}**.\n\n` +
    (problem
      ? `Have a read of the problem on the left. Before working anything out — what is ` +
        `actually going on in it? Describe it to me in your own words.`
      : `Where would you like to start? Tell me what you already know about this, ` +
        `even if it is not much.`)
  );
}

/**
 * The one-line update sent on turns that do not carry the full brief. The model keeps the
 * conversation server-side, but hint counts and stage move between turns and it has to be
 * told; without this it would keep working from the brief as it was on turn one.
 */
export function buildTurnState(ctx: LessonContext): string {
  const { stage, problem, hintsUsed } = ctx;
  const parts = [`Stage: ${stage}`];
  if (problem) {
    parts.push(`Problem: ${problem.id}`);
    parts.push(`Hints spent: ${hintsUsed} of ${problem.hints.length}`);
  }
  return `[Lesson state — ${parts.join(' · ')}]`;
}

/**
 * Per-turn context. Sent as a system-flavoured preamble rather than baked into the standing
 * instruction, because it changes every turn and would otherwise defeat prompt caching.
 */
export function buildLessonContext(ctx: LessonContext): string {
  const { skill, unitTitle, stage, problem, hintsUsed, priorMisconceptionCodes } = ctx;

  const lines: string[] = [
    `## Current lesson`,
    ``,
    `Unit: ${unitTitle}`,
    `Skill: ${skill.title}`,
    `Stage: ${stage}`,
    ``,
    `What this skill is for: ${skill.summary}`,
    ``,
    `### How this skill is taught`,
    ``,
    `Concrete: ${skill.cpa.concrete}`,
    ``,
    `Pictorial: ${skill.cpa.pictorial}`,
    ``,
    `Abstract: ${skill.cpa.abstract}`,
  ];

  if (skill.formulas.length > 0) {
    lines.push('', `Key results: ${skill.formulas.map((f) => `$${f}$`).join(', ')}`);
  }

  if (skill.suggestedVisual) {
    lines.push('', `Reach for a ${skill.suggestedVisual} figure first unless the student's own`);
    lines.push(`question points somewhere else.`);
  }

  if (skill.misconceptions.length > 0) {
    lines.push('', `### Known misconceptions for this skill`, '');
    for (const m of skill.misconceptions) {
      const seen = priorMisconceptionCodes.includes(m.code) ? ' **(this student has shown this before)**' : '';
      lines.push(`- \`${m.code}\`${seen}: ${m.description}`);
      lines.push(`  Probe: ${m.probe}`);
      lines.push(`  Why: ${m.correction}`);
    }
    lines.push('', 'Use a probe close to verbatim when you see the error. They are written to make');
    lines.push('the student notice the contradiction themselves.');
  }

  if (problem) {
    lines.push(
      '',
      `### Current problem (\`${problem.id}\`)`,
      '',
      problem.statement,
      '',
      `Prompt for this stage: ${problem.cpaPrompts[stage]}`,
    );

    if (problem.hints.length > 0) {
      lines.push('', `Hints, in order. ${hintsUsed} already spent — never skip ahead:`);
      problem.hints.forEach((hint, i) => {
        const spent = i < hintsUsed ? ' (spent)' : '';
        lines.push(`  ${i + 1}.${spent} ${hint}`);
      });
    }

    lines.push(
      '',
      `The worked solution is below **for your reference only**. Do not reproduce it, quote`,
      `from it, or let its structure dictate the order you ask questions in.`,
      '',
      problem.solution,
    );
  }

  if (ctx.openingMessage) {
    lines.push(
      '',
      `### Already said`,
      '',
      `The student has already seen this from you, so do not repeat it — respond to their reply:`,
      '',
      `> ${ctx.openingMessage.replace(/\n+/g, ' ')}`,
    );
  }

  return lines.join('\n');
}
