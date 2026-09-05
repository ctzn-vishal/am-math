import type { Answer } from '@/lib/content/schema';
import { equivalent, evaluate, hasForm, normaliseAlgebra, parseExpression, proportional } from './expression';

/**
 * Marking runs in code, never in the model.
 *
 * An LLM asked to mark its own student's arithmetic produces both false praise and false
 * failure, and mastery evidence built on either is worthless. The model decides *what to
 * say*; this decides *whether they were right*.
 *
 * The third outcome matters as much as the other two: when we cannot read what the student
 * wrote, that is our failure, not theirs, and it must not be recorded as a wrong answer.
 * The tutor asks them to restate it instead.
 */

export type CheckResult =
  | { status: 'correct'; note?: string }
  | { status: 'incorrect'; got: string; misconceptionCode?: string }
  /**
   * Equivalent to the reference but not in the form the question asked for — an expanded
   * product left in brackets, a fraction with a factor still to cancel. Not wrong, and not
   * evidence of mastery either: the tutor is told, and no attempt is recorded.
   */
  | { status: 'wrong-form'; got: string; form: string }
  | { status: 'unparseable'; reason: string };

/** Matches integers, decimals and simple fractions, with optional sign. */
const NUMBER_PATTERN = /-?\d+(?:\.\d+)?(?:\s*\/\s*-?\d+(?:\.\d+)?)?/g;

/** Strip the decoration students and LaTeX both add around the actual value. */
function normalise(input: string): string {
  return input
    .replace(/\\[a-zA-Z]+/g, ' ')            // LaTeX commands
    .replace(/[$\\{}]/g, ' ')                 // delimiters and braces
    .replace(/[£€]/g, ' ')
    .replace(/(\d),(\d{3})\b/g, '$1$2')       // thousands separators
    .replace(/\s+/g, ' ')
    .trim();
}

function toNumber(token: string): number | null {
  const cleaned = token.replace(/\s+/g, '');
  const slash = cleaned.indexOf('/');
  if (slash > 0) {
    const numerator = Number(cleaned.slice(0, slash));
    const denominator = Number(cleaned.slice(slash + 1));
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return null;
    return numerator / denominator;
  }
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

function extractNumbers(input: string): number[] {
  const matches = normalise(input).match(NUMBER_PATTERN) ?? [];
  return matches.map(toNumber).filter((n): n is number => n !== null);
}

/**
 * Pull out `name = value` assignments. Preferred over positional extraction because a
 * student who restates the question ("3 adults and 4 children cost 48, so a = 8, c = 6")
 * leaves a trail of decoy numbers that positional reading would get wrong.
 */
function extractAssignments(input: string): Map<string, number> {
  const out = new Map<string, number>();
  const pattern = /([a-zA-Z][a-zA-Z0-9_]{0,20})\s*(?:=|:)\s*(-?\d+(?:\.\d+)?(?:\s*\/\s*-?\d+(?:\.\d+)?)?)/g;
  for (const match of normalise(input).matchAll(pattern)) {
    const name = (match[1] ?? '').toLowerCase();
    const value = toNumber(match[2] ?? '');
    if (value !== null && !out.has(name)) out.set(name, value);
  }
  return out;
}

function within(a: number, b: number, tolerance: number): boolean {
  if (tolerance > 0) return Math.abs(a - b) <= tolerance;
  // Exact answers still need a float guard: 1/16 never equals 0.0625 bit-for-bit.
  return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
}

// ---------------------------------------------------------------------------

/** Round to `n` significant figures, the way a student with a calculator would. */
export function roundSigFigs(value: number, n: number): number {
  if (value === 0) return 0;
  const magnitude = Math.floor(Math.log10(Math.abs(value)));
  const scale = Math.pow(10, n - 1 - magnitude);
  return Math.round(value * scale) / scale;
}

/**
 * Standard form as a student types it — `5.56 x 10^5`, `5.56 × 10⁵`, `5.56e5`, `4.8 * 10^-5`
 * — rewritten as a plain decimal so the number reader can take it from there.
 */
export function expandStandardForm(input: string): string {
  const superscripts: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };
  const plain = input.replace(/10([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)/g, (_, sup: string) =>
    `10^${[...sup].map((c) => superscripts[c] ?? c).join('')}`,
  );
  return plain
    .replace(
      /(-?\d+(?:\.\d+)?)\s*(?:x|X|×|\*|\times|\cdot)\s*10\s*\^\s*\{?\(?\s*(-?\d+)\s*\)?\}?/g,
      (_, mantissa: string, exponent: string) => formatPlain(Number(mantissa) * Math.pow(10, Number(exponent))),
    )
    .replace(/(-?\d+(?:\.\d+)?)[eE](-?\d+)/g, (_, mantissa: string, exponent: string) =>
      formatPlain(Number(mantissa) * Math.pow(10, Number(exponent))),
    );
}

function formatPlain(value: number): string {
  // Avoid re-introducing exponent notation for very large or small values.
  return value.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 20 });
}

function checkNumber(rawResponse: string, answer: Extract<Answer, { type: 'number' }>): CheckResult {
  const response = expandStandardForm(rawResponse);
  const assignments = extractAssignments(response);
  const numbers = extractNumbers(response);

  // A single assignment is unambiguous; otherwise fall back to the last bare number, which
  // is where a worked solution puts its conclusion.
  let candidates = assignments.size === 1 ? [...assignments.values()] : numbers.slice(-1);

  // "3√11", "2π", "5/2" — an exact form the number pattern cannot read. Try it as algebra.
  if (candidates.length === 0 || /sqrt|√|\\pi|π|\^/.test(response)) {
    try {
      const value = Number(evaluateConstant(response));
      if (Number.isFinite(value)) candidates = [value];
    } catch {
      // fall through to the plain reading
    }
  }

  if (candidates.length === 0) {
    return { status: 'unparseable', reason: 'No number found in the response.' };
  }

  const got = candidates[0] as number;
  if (within(got, answer.value, answer.tolerance)) {
    if (answer.sigfigs !== undefined && roundSigFigs(got, answer.sigfigs) !== got) {
      return {
        status: 'correct',
        note: `Right, but not rounded to ${answer.sigfigs} significant figures as asked.`,
      };
    }
    return { status: 'correct' };
  }
  if (answer.sigfigs !== undefined) {
    const rounded = roundSigFigs(answer.value, answer.sigfigs);
    // Accept the correctly rounded value, and any value that rounds to it (a student who
    // kept one more figure than asked has not made an error of understanding).
    if (within(got, rounded, 0) || roundSigFigs(got, answer.sigfigs) === rounded) {
      return { status: 'correct' };
    }
  }
  return { status: 'incorrect', got: String(got) };
}

/** Evaluate a constant expression such as `3*sqrt(11)`, `2\\pi` or `\\frac{5}{2}`. */
function evaluateConstant(text: string): number {
  // Take what follows the last "=" — a student writes "x = 3√2", and the algebra is on the right.
  const raw = text.includes('=') ? (text.split('=').pop() as string) : text;
  const expr = normaliseAlgebra(raw.replace(/[$]/g, ''));
  if (/[a-zA-Z]/.test(expr.replace(/sqrt|pi/g, ''))) throw new Error('Not a constant.');
  return evaluate(parseExpression(expr), {});
}

function checkCoordinates(
  response: string,
  answer: Extract<Answer, { type: 'coordinates' }>,
): CheckResult {
  const assignments = extractAssignments(response);

  // Named form: "x = 2, y = 5", or any two distinct names given in order ("a = 8, c = 6").
  if (assignments.size >= 2) {
    const x = assignments.get('x');
    const y = assignments.get('y');
    if (x !== undefined && y !== undefined) {
      return within(x, answer.x, answer.tolerance) && within(y, answer.y, answer.tolerance)
        ? { status: 'correct' }
        : { status: 'incorrect', got: `(${x}, ${y})` };
    }
    const [first, second] = [...assignments.values()];
    if (first !== undefined && second !== undefined) {
      return within(first, answer.x, answer.tolerance) && within(second, answer.y, answer.tolerance)
        ? { status: 'correct' }
        : { status: 'incorrect', got: `(${first}, ${second})` };
    }
  }

  // Positional form: "(2, 5)" or "2, 5".
  const numbers = extractNumbers(response);
  if (numbers.length === 2) {
    const [x, y] = numbers as [number, number];
    return within(x, answer.x, answer.tolerance) && within(y, answer.y, answer.tolerance)
      ? { status: 'correct' }
      : { status: 'incorrect', got: `(${x}, ${y})` };
  }

  if (numbers.length === 0) {
    return { status: 'unparseable', reason: 'No numbers found in the response.' };
  }

  return {
    status: 'unparseable',
    reason: `Expected two values but found ${numbers.length}. Ask the student to state them as "x = ..., y = ...".`,
  };
}

function checkSet(response: string, answer: Extract<Answer, { type: 'set' }>): CheckResult {
  const numbers = extractNumbers(response);

  if (numbers.length === 0) {
    return { status: 'unparseable', reason: 'No numbers found in the response.' };
  }

  if (numbers.length !== answer.values.length) {
    return {
      status: 'unparseable',
      reason: `Expected ${answer.values.length} values but found ${numbers.length}.`,
    };
  }

  // Unordered: roots of a quadratic are a set, not a sequence.
  const remaining = [...answer.values];
  for (const got of numbers) {
    const index = remaining.findIndex((want) => within(got, want, answer.tolerance));
    if (index === -1) {
      return { status: 'incorrect', got: numbers.join(', ') };
    }
    remaining.splice(index, 1);
  }

  return { status: 'correct' };
}

/**
 * Canonical form for an exact-match answer.
 *
 * LaTeX fractions become `(a)/(b)` before the generic normaliser strips the command names,
 * so `\frac{x-3}{2x}` and `(x-3)/(2x)` meet in the middle. Multiplication dots and the
 * various stars all become nothing, since `2x` and `2*x` are the same claim.
 */
function canonicalExact(s: string): string {
  return normalise(
    s
      .replace(/\\(?:d|t)?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '($1)/($2)')
      .replace(/\\(?:cdot|times)/g, '')
      .replace(/[*·×]/g, '')
      .replace(/\\circ|°/g, ''),
  )
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/^["'`]+|["'`]+$/g, '')
    .replace(/\.$/, '');
}

/** A looser reading with the brackets gone: `(x-3)/(2x)` and `x-3/2x` are one intent here. */
function unbracketed(s: string): string {
  return s.replace(/[()\[\]]/g, '');
}

function checkExact(response: string, answer: Extract<Answer, { type: 'exact' }>): CheckResult {
  const got = canonicalExact(response);
  // Standard-form strings meet as plain decimals: "5.56 x 10^5" and "556000" are one claim.
  const gotPlain = canonicalExact(expandStandardForm(response));

  if (got.length === 0) {
    return { status: 'unparseable', reason: 'Empty response.' };
  }

  const accepted = [answer.value, ...answer.accepts].map(canonicalExact);
  if (accepted.includes(got)) return { status: 'correct' };
  const acceptedPlain = [answer.value, ...answer.accepts].map((a) => canonicalExact(expandStandardForm(a)));
  if (acceptedPlain.includes(gotPlain)) return { status: 'correct' };

  const loose = unbracketed(got);
  if (accepted.some((a) => unbracketed(a) === loose)) return { status: 'correct' };

  return { status: 'incorrect', got: response.trim().slice(0, 80) };
}

// ---------------------------------------------------------------------------

/** The algebra in a response: whatever follows the last "=", with prose and LaTeX delimiters gone. */
function algebraOf(response: string): string {
  const trimmed = response.replace(/[$]/g, '').trim();
  // "y = 2x + 1" → keep the whole thing for equations; expressions take the right of "=".
  return trimmed;
}

function checkExpression(
  response: string,
  answer: Extract<Answer, { type: 'expression' }>,
): CheckResult {
  const text = algebraOf(response);
  const candidate = text.includes('=') ? (text.split('=').pop() as string).trim() : text;
  if (candidate.length === 0) return { status: 'unparseable', reason: 'Empty response.' };

  const verdict = equivalent(candidate, answer.value, answer.variables);
  if (verdict === 'unparseable') {
    return {
      status: 'unparseable',
      reason: `Could not read "${candidate.slice(0, 60)}" as an expression in ${answer.variables.join(', ')}.`,
    };
  }
  if (verdict === 'different') return { status: 'incorrect', got: candidate.slice(0, 80) };

  if (answer.form && !hasForm(candidate, answer.value, answer.form)) {
    return { status: 'wrong-form', got: candidate.slice(0, 80), form: answer.form };
  }
  return { status: 'correct' };
}

function checkEquation(
  response: string,
  answer: Extract<Answer, { type: 'equation' }>,
): CheckResult {
  const text = algebraOf(response).replace(/\\?[Ll]et\b|so|is|,/g, ' ').trim();
  const sides = text.split('=').map((s) => s.trim()).filter((s) => s.length > 0);

  let studentLhs: string;
  let studentRhs: string;
  if (sides.length === 2) {
    [studentLhs, studentRhs] = sides as [string, string];
  } else if (sides.length === 1 && /^[a-zA-Z]$/.test(answer.lhs.trim())) {
    // A bare expression for a "y = ..." question is read as the right-hand side.
    studentLhs = answer.lhs;
    studentRhs = sides[0] as string;
  } else {
    return {
      status: 'unparseable',
      reason: 'Expected an equation with one "=" sign.',
    };
  }

  const student = `(${studentLhs})-(${studentRhs})`;
  const reference = `(${answer.lhs})-(${answer.rhs})`;
  const verdict = proportional(student, reference, answer.variables);
  if (verdict === 'unparseable') {
    return { status: 'unparseable', reason: `Could not read "${text.slice(0, 60)}" as an equation.` };
  }
  return verdict === 'equivalent'
    ? { status: 'correct' }
    : { status: 'incorrect', got: text.slice(0, 80) };
}

function checkChoice(response: string, answer: Extract<Answer, { type: 'choice' }>): CheckResult {
  const trimmed = response.trim();
  const letter = /^\(?([A-Da-d])\)?[.:)]?$/.exec(trimmed)?.[1]?.toUpperCase();
  let chosen = letter
    ? answer.options.find((o) => o.label === letter)
    : undefined;

  if (!chosen) {
    const got = canonicalExact(trimmed);
    chosen = answer.options.find((o) => {
      const value = canonicalExact(o.value);
      return value === got || unbracketed(value) === unbracketed(got);
    });
  }
  if (!chosen) {
    // "option B", "I think it's C", "the answer is a"
    const loose = /\b([A-Da-d])\b/.exec(trimmed.replace(/\b(a|an)\s/gi, ' '));
    if (loose) {
      const l = (loose[1] as string).toUpperCase();
      chosen = answer.options.find((o) => o.label === l);
    }
  }
  if (!chosen) {
    return {
      status: 'unparseable',
      reason: `Could not match the response to one of the options ${answer.options.map((o) => o.label).join(', ')}.`,
    };
  }
  if (chosen.label === answer.correct) return { status: 'correct' };
  return {
    status: 'incorrect',
    got: `${chosen.label}: ${chosen.value}`,
    ...(chosen.misconceptionCode ? { misconceptionCode: chosen.misconceptionCode } : {}),
  };
}

export function checkAnswer(response: string, answer: Answer): CheckResult {
  if (response.trim().length === 0) {
    return { status: 'unparseable', reason: 'Empty response.' };
  }

  switch (answer.type) {
    case 'number':
      return checkNumber(response, answer);
    case 'coordinates':
      return checkCoordinates(response, answer);
    case 'set':
      return checkSet(response, answer);
    case 'exact':
      return checkExact(response, answer);
    case 'expression':
      return checkExpression(response, answer);
    case 'equation':
      return checkEquation(response, answer);
    case 'choice':
      return checkChoice(response, answer);
  }
}
