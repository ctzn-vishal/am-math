import type { Answer } from '@/lib/content/schema';

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
  | { status: 'correct' }
  | { status: 'incorrect'; got: string }
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

function checkNumber(response: string, answer: Extract<Answer, { type: 'number' }>): CheckResult {
  const assignments = extractAssignments(response);
  const numbers = extractNumbers(response);

  // A single assignment is unambiguous; otherwise fall back to the last bare number, which
  // is where a worked solution puts its conclusion.
  const candidates = assignments.size === 1 ? [...assignments.values()] : numbers.slice(-1);

  if (candidates.length === 0) {
    return { status: 'unparseable', reason: 'No number found in the response.' };
  }

  const got = candidates[0] as number;
  return within(got, answer.value, answer.tolerance)
    ? { status: 'correct' }
    : { status: 'incorrect', got: String(got) };
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

function checkExact(response: string, answer: Extract<Answer, { type: 'exact' }>): CheckResult {
  const canonical = (s: string) => normalise(s).toLowerCase().replace(/\s+/g, '');
  const got = canonical(response);

  if (got.length === 0) {
    return { status: 'unparseable', reason: 'Empty response.' };
  }

  const accepted = [answer.value, ...answer.accepts].map(canonical);
  return accepted.includes(got)
    ? { status: 'correct' }
    : { status: 'incorrect', got: response.trim().slice(0, 80) };
}

// ---------------------------------------------------------------------------

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
  }
}
