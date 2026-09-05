/**
 * A small algebra parser and evaluator for marking expressions by equivalence.
 *
 * The marking rule is numeric: evaluate the student's expression and the reference at
 * several random rational points; equal everywhere means equivalent. This has no false
 * negatives and a vanishingly small chance of a false positive, and it does not care which
 * of the many correct forms the student chose. A structural check on top (`formOf`) is what
 * tells "correct" from "correct but not in the form asked for".
 *
 * Accepted syntax: `+ - * / ^`, brackets, implicit multiplication (`2x`, `3(x+1)`, `xy`),
 * `sqrt(...)`, `pi`, decimals and fractions, and the LaTeX the tutor or a student is likely
 * to paste: `\frac{a}{b}`, `\sqrt{a}`, `\cdot`, `\times`, `x^{2}`, `\left(`, `\right)`.
 */

export type Node =
  | { kind: 'num'; value: number }
  | { kind: 'var'; name: string }
  | { kind: 'neg'; arg: Node }
  | { kind: 'bin'; op: '+' | '-' | '*' | '/' | '^'; left: Node; right: Node }
  | { kind: 'sqrt'; arg: Node };

export class ParseError extends Error {}

/** Turn LaTeX and typographic decoration into plain algebra before tokenising. */
export function normaliseAlgebra(input: string): string {
  let s = input.trim();
  // Both passes run in one loop, innermost-first.
  //
  // Their braces nest in either order — a root inside a fraction, a fraction inside a root —
  // and each pattern only matches a brace group with no braces of its own. Running one to
  // exhaustion before starting the other therefore left `\frac{\sqrt{A}}{\pi}` unparseable,
  // because the outer fraction never became brace-free until the root had been rewritten.
  for (let i = 0; i < 8; i++) {
    const next = s
      .replace(/\\sqrt\s*\{([^{}]*)\}/g, 'sqrt($1)')
      .replace(/\\(?:d|t)?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '(($1)/($2))');
    if (next === s) break;
    s = next;
  }

  return s
    .replace(/\\sqrt\s*(\d+|[a-zA-Z])/g, 'sqrt($1)')
    .replace(/\\left|\\right/g, '')
    .replace(/\\(?:cdot|times)/g, '*')
    .replace(/\\pi/g, 'pi')
    .replace(/π/g, 'pi')
    .replace(/[·×]/g, '*')
    .replace(/÷/g, '/')
    .replace(/√\s*\(/g, 'sqrt(')
    .replace(/√\s*(\d+(?:\.\d+)?|[a-zA-Z])/g, 'sqrt($1)')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/−|–/g, '-')
    .replace(/\^\s*\{([^{}]*)\}/g, '^($1)')
    .replace(/[{}$]/g, '')
    .replace(/\s+/g, '');
}

type Token =
  | { t: 'num'; v: number }
  | { t: 'id'; v: string }
  | { t: 'op'; v: string }
  | { t: '('; v: '(' }
  | { t: ')'; v: ')' };

function tokenise(s: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i] as string;
    if (/\d|\./.test(ch)) {
      const m = /^\d*\.?\d+|^\d+\.?/.exec(s.slice(i));
      if (!m) throw new ParseError(`Bad number at ${i}.`);
      out.push({ t: 'num', v: Number(m[0]) });
      i += m[0].length;
      continue;
    }
    if (/[a-zA-Z]/.test(ch)) {
      if (s.startsWith('sqrt', i)) {
        out.push({ t: 'id', v: 'sqrt' });
        i += 4;
        continue;
      }
      if (s.startsWith('pi', i) && !/[a-zA-Z]/.test(s[i + 2] ?? '')) {
        out.push({ t: 'id', v: 'pi' });
        i += 2;
        continue;
      }
      // Single-letter variables: `xy` is x times y, never a variable called xy.
      out.push({ t: 'id', v: ch });
      i += 1;
      continue;
    }
    if ('+-*/^'.includes(ch)) {
      out.push({ t: 'op', v: ch });
      i += 1;
      continue;
    }
    if (ch === '(' || ch === '[') {
      out.push({ t: '(', v: '(' });
      i += 1;
      continue;
    }
    if (ch === ')' || ch === ']') {
      out.push({ t: ')', v: ')' });
      i += 1;
      continue;
    }
    throw new ParseError(`Unexpected character "${ch}".`);
  }
  return out;
}

/**
 * Recursive descent. Precedence, lowest to highest: `+ -`, `* /` and implicit
 * multiplication, unary minus, `^` (right-associative). `-x^2` is `-(x^2)`, as in maths.
 */
export function parseExpression(input: string): Node {
  const tokens = tokenise(normaliseAlgebra(input));
  if (tokens.length === 0) throw new ParseError('Empty expression.');
  let pos = 0;

  const peek = (): Token | undefined => tokens[pos];
  const take = (): Token => {
    const tok = tokens[pos];
    if (!tok) throw new ParseError('Unexpected end of expression.');
    pos += 1;
    return tok;
  };

  const startsFactor = (tok: Token | undefined): boolean =>
    tok !== undefined && (tok.t === 'num' || tok.t === 'id' || tok.t === '(');

  function sum(): Node {
    let left = term();
    while (peek()?.t === 'op' && (peek()?.v === '+' || peek()?.v === '-')) {
      const op = take().v as '+' | '-';
      left = { kind: 'bin', op, left, right: term() };
    }
    return left;
  }

  function term(): Node {
    let left = unary();
    for (;;) {
      const tok = peek();
      if (tok?.t === 'op' && (tok.v === '*' || tok.v === '/')) {
        take();
        left = { kind: 'bin', op: tok.v as '*' | '/', left, right: unary() };
      } else if (startsFactor(tok)) {
        // Implicit multiplication binds like `*`, so `2x/3y` is `(2x/3)y` — the usual
        // reading in a linear string, and consistent with how the reference is written.
        left = { kind: 'bin', op: '*', left, right: power() };
      } else {
        return left;
      }
    }
  }

  function unary(): Node {
    if (peek()?.t === 'op' && peek()?.v === '-') {
      take();
      return { kind: 'neg', arg: unary() };
    }
    if (peek()?.t === 'op' && peek()?.v === '+') {
      take();
      return unary();
    }
    return power();
  }

  function power(): Node {
    const base = atom();
    if (peek()?.t === 'op' && peek()?.v === '^') {
      take();
      // Right-associative, and the exponent may carry its own sign: x^-1.
      const exponent = peek()?.t === 'op' && peek()?.v === '-' ? unary() : power();
      return { kind: 'bin', op: '^', left: base, right: exponent };
    }
    return base;
  }

  function atom(): Node {
    const tok = take();
    if (tok.t === 'num') return { kind: 'num', value: tok.v };
    if (tok.t === 'id') {
      if (tok.v === 'sqrt') {
        const next = peek();
        if (next?.t === '(') {
          take();
          const arg = sum();
          if (take().t !== ')') throw new ParseError('Expected ")" after sqrt argument.');
          return { kind: 'sqrt', arg };
        }
        // sqrt2, sqrt x: the argument is the next atom.
        return { kind: 'sqrt', arg: atom() };
      }
      if (tok.v === 'pi') return { kind: 'num', value: Math.PI };
      return { kind: 'var', name: tok.v };
    }
    if (tok.t === '(') {
      const inner = sum();
      const close = take();
      if (close.t !== ')') throw new ParseError('Expected ")".');
      return inner;
    }
    throw new ParseError(`Unexpected "${tok.v}".`);
  }

  const node = sum();
  if (pos !== tokens.length) throw new ParseError(`Unexpected "${tokens[pos]?.v}" after expression.`);
  return node;
}

export function evaluate(node: Node, env: Record<string, number>): number {
  switch (node.kind) {
    case 'num':
      return node.value;
    case 'var': {
      const v = env[node.name];
      if (v === undefined) throw new ParseError(`Unknown variable "${node.name}".`);
      return v;
    }
    case 'neg':
      return -evaluate(node.arg, env);
    case 'sqrt':
      return Math.sqrt(evaluate(node.arg, env));
    case 'bin': {
      const l = evaluate(node.left, env);
      const r = evaluate(node.right, env);
      switch (node.op) {
        case '+':
          return l + r;
        case '-':
          return l - r;
        case '*':
          return l * r;
        case '/':
          return l / r;
        case '^':
          return Math.pow(l, r);
      }
    }
  }
}

export function variablesIn(node: Node, out = new Set<string>()): Set<string> {
  if (node.kind === 'var') out.add(node.name);
  else if (node.kind === 'neg' || node.kind === 'sqrt') variablesIn(node.arg, out);
  else if (node.kind === 'bin') {
    variablesIn(node.left, out);
    variablesIn(node.right, out);
  }
  return out;
}

/** Deterministic pseudo-random points, so a marking result is reproducible. */
function samplePoints(variables: string[], count: number): Record<string, number>[] {
  let seed = 2463534242;
  const next = (): number => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return ((seed >>> 0) % 10000) / 10000;
  };
  const points: Record<string, number>[] = [];
  for (let i = 0; i < count; i++) {
    const env: Record<string, number> = {};
    for (const v of variables) {
      // Avoid 0, ±1 and small integers, where distinct expressions most often coincide.
      env[v] = 1.7 + next() * 3.1 + i * 0.37;
    }
    points.push(env);
  }
  return points;
}

export type Equivalence = 'equivalent' | 'different' | 'unparseable';

/**
 * Are two expressions the same function of `variables`? Points where either side is
 * undefined (a zero denominator, a root of a negative) are skipped; an expression that is
 * undefined at every sample point is reported as different rather than as a match.
 */
export function equivalent(a: string, b: string, variables: string[]): Equivalence {
  let left: Node;
  let right: Node;
  try {
    left = parseExpression(a);
    right = parseExpression(b);
  } catch {
    return 'unparseable';
  }

  const known = new Set(variables);
  for (const v of variablesIn(left)) if (!known.has(v)) return 'unparseable';
  for (const v of variablesIn(right)) if (!known.has(v)) return 'unparseable';

  let compared = 0;
  for (const env of samplePoints(variables, 8)) {
    const l = evaluate(left, env);
    const r = evaluate(right, env);
    if (!Number.isFinite(l) || !Number.isFinite(r)) continue;
    compared += 1;
    if (Math.abs(l - r) > 1e-7 * Math.max(1, Math.abs(l), Math.abs(r))) return 'different';
  }
  return compared >= 3 ? 'equivalent' : 'different';
}

/**
 * Is `a` a constant multiple of `b` as a function of `variables`? This is how two
 * equations are compared once each is written as `lhs - rhs`.
 */
export function proportional(a: string, b: string, variables: string[]): Equivalence {
  let left: Node;
  let right: Node;
  try {
    left = parseExpression(a);
    right = parseExpression(b);
  } catch {
    return 'unparseable';
  }

  const known = new Set(variables);
  for (const v of variablesIn(left)) if (!known.has(v)) return 'unparseable';
  for (const v of variablesIn(right)) if (!known.has(v)) return 'unparseable';

  let ratio: number | null = null;
  let compared = 0;
  for (const env of samplePoints(variables, 8)) {
    const l = evaluate(left, env);
    const r = evaluate(right, env);
    if (!Number.isFinite(l) || !Number.isFinite(r)) continue;
    if (Math.abs(r) < 1e-12) {
      if (Math.abs(l) > 1e-9) return 'different';
      continue;
    }
    const k = l / r;
    if (Math.abs(k) < 1e-12) return 'different';
    if (ratio === null) ratio = k;
    else if (Math.abs(k - ratio) > 1e-7 * Math.max(1, Math.abs(ratio))) return 'different';
    compared += 1;
  }
  return compared >= 3 ? 'equivalent' : 'different';
}

// ---------------------------------------------------------------------------
// Structural form checks
// ---------------------------------------------------------------------------

export type ExpressionForm = 'simplified' | 'expanded' | 'factorised' | 'single-fraction';

/** Split a normalised string at its top-level (bracket depth 0) occurrences of `ops`. */
function topLevelSplit(s: string, ops: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i] as string;
    if (ch === '(') depth += 1;
    if (ch === ')') depth -= 1;
    // A leading sign or a sign after an operator is unary, not a split point.
    const unary = (ch === '-' || ch === '+') && (i === 0 || '+-*/^('.includes(s[i - 1] as string));
    if (depth === 0 && ops.includes(ch) && !unary) {
      parts.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  parts.push(current);
  return parts;
}

/** Strip one pair of outer brackets wrapping the whole string, repeatedly. */
function unwrap(s: string): string {
  let out = s;
  for (;;) {
    if (!out.startsWith('(') || !out.endsWith(')')) return out;
    let depth = 0;
    for (let i = 0; i < out.length; i++) {
      if (out[i] === '(') depth += 1;
      if (out[i] === ')') depth -= 1;
      if (depth === 0 && i < out.length - 1) return out;
    }
    out = out.slice(1, -1);
  }
}

/**
 * Does the student's (already normalised) expression satisfy the requested form? These are
 * structural tests on the string, deliberately simple: they are only consulted *after*
 * equivalence has been established, so all they must decide is whether a right answer is
 * in the shape the question asked for.
 */
export function hasForm(student: string, reference: string, form: ExpressionForm): boolean {
  const s = unwrap(normaliseAlgebra(student));
  const r = unwrap(normaliseAlgebra(reference));

  switch (form) {
    case 'expanded':
      // No brackets at all, apart from those a sqrt needs.
      return !/\((?!.*sqrt)/.test(s.replace(/sqrt\([^()]*\)/g, ''));
    case 'factorised': {
      // A product: at least one bracket, and no top-level + or -.
      const terms = topLevelSplit(s, '+-');
      return terms.length === 1 && s.includes('(');
    }
    case 'single-fraction': {
      // Exactly one top-level division, and no top-level + or - around it.
      const terms = topLevelSplit(s, '+-');
      if (terms.length !== 1) return false;
      return topLevelSplit(s, '/').length === 2;
    }
    case 'simplified':
      // The simplest correct form is the shortest one. Allow a little slack for
      // different but equally simple spellings (`2*x` vs `2x`, `x^2` vs `x*x`).
      return s.replace(/\*/g, '').length <= r.replace(/\*/g, '').length + 2;
  }
}
