import { describe, it, expect } from 'vitest';
import { checkAnswer } from './check';
import { equivalent, hasForm, normaliseAlgebra, parseExpression, proportional } from './expression';
import type { Answer } from '@/lib/content/schema';

describe('expression parser', () => {
  it('reads implicit multiplication and powers', () => {
    expect(equivalent('2x(x+3)', '2x^2 + 6x', ['x'])).toBe('equivalent');
    expect(equivalent('(x+2)(x+3)', 'x^2+5x+6', ['x'])).toBe('equivalent');
    expect(equivalent('(x+2)(x+3)', 'x^2+6x+6', ['x'])).toBe('different');
  });

  it('reads LaTeX fractions, roots and dots', () => {
    expect(equivalent('\\frac{x-3}{2x}', '(x-3)/(2*x)', ['x'])).toBe('equivalent');
    expect(equivalent('\\sqrt{x^2}', 'x', ['x'])).toBe('equivalent');
    expect(equivalent('2 \\cdot x \\times 3', '6x', ['x'])).toBe('equivalent');
    expect(normaliseAlgebra('x^{2} − 3')).toBe('x^(2)-3');
  });

  it('treats -x^2 as -(x^2)', () => {
    expect(equivalent('-x^2', '-(x^2)', ['x'])).toBe('equivalent');
    expect(equivalent('-x^2', '(-x)^2', ['x'])).toBe('different');
  });

  it('handles two variables', () => {
    expect(equivalent('(a+b)^2', 'a^2+2ab+b^2', ['a', 'b'])).toBe('equivalent');
    expect(equivalent('(a+b)^2', 'a^2+b^2', ['a', 'b'])).toBe('different');
  });

  it('refuses an unknown variable rather than guessing', () => {
    expect(equivalent('2y+1', '2x+1', ['x'])).toBe('unparseable');
    expect(() => parseExpression('2x +')).toThrow();
  });

  it('compares equations up to a constant multiple', () => {
    expect(proportional('(y)-(-x/2+5)', '(2y)-(10-x)', ['x', 'y'])).toBe('equivalent');
    expect(proportional('(x+2y-10)-(0)', '(y)-(-x/2+5)', ['x', 'y'])).toBe('equivalent');
    expect(proportional('(y)-(x/2+5)', '(y)-(-x/2+5)', ['x', 'y'])).toBe('different');
  });
});

describe('form checks', () => {
  it('expanded means no brackets', () => {
    expect(hasForm('x^2+5x+6', 'x^2+5x+6', 'expanded')).toBe(true);
    expect(hasForm('(x+2)(x+3)', 'x^2+5x+6', 'expanded')).toBe(false);
  });

  it('factorised means a product with nothing left to add', () => {
    expect(hasForm('(x+2)(x+3)', '(x+2)(x+3)', 'factorised')).toBe(true);
    expect(hasForm('3(x+2)', '3(x+2)', 'factorised')).toBe(true);
    expect(hasForm('x^2+5x+6', '(x+2)(x+3)', 'factorised')).toBe(false);
    expect(hasForm('x(x+5)+6', '(x+2)(x+3)', 'factorised')).toBe(false);
  });

  it('single-fraction means one top-level division', () => {
    expect(hasForm('(5x-2)/(x(x-2))', '(5x-2)/(x(x-2))', 'single-fraction')).toBe(true);
    expect(hasForm('\\frac{5x-2}{x(x-2)}', '(5x-2)/(x(x-2))', 'single-fraction')).toBe(true);
    expect(hasForm('3/x + 2/(x-2)', '(5x-2)/(x(x-2))', 'single-fraction')).toBe(false);
  });

  it('simplified rejects a fraction with an uncancelled factor', () => {
    expect(hasForm('(x-3)/(2x)', '(x-3)/(2x)', 'simplified')).toBe(true);
    expect(hasForm('(x^2-9)/(2x^2+6x)', '(x-3)/(2x)', 'simplified')).toBe(false);
  });
});

describe('expression answers', () => {
  const expanded: Answer = { type: 'expression', value: 'x^2+5x+6', variables: ['x'], form: 'expanded' };
  const factorised: Answer = { type: 'expression', value: '(x+2)(x+3)', variables: ['x'], form: 'factorised' };

  it('marks any equivalent form correct when no form is required', () => {
    const free: Answer = { type: 'expression', value: 'x^2+5x+6', variables: ['x'] };
    expect(checkAnswer('(x+2)(x+3)', free).status).toBe('correct');
    expect(checkAnswer('$x^2 + 5x + 6$', free).status).toBe('correct');
  });

  it('reports wrong-form for an unexpanded product', () => {
    const result = checkAnswer('(x+2)(x+3)', expanded);
    expect(result.status).toBe('wrong-form');
    expect(checkAnswer('x^2+5x+6', expanded).status).toBe('correct');
  });

  it('reports wrong-form for an unfactorised trinomial', () => {
    expect(checkAnswer('x^2+5x+6', factorised).status).toBe('wrong-form');
    expect(checkAnswer('(x+3)(x+2)', factorised).status).toBe('correct');
  });

  it('marks a genuinely different expression incorrect', () => {
    expect(checkAnswer('x^2+6x+6', expanded).status).toBe('incorrect');
  });

  it('takes the right-hand side when the student writes "= ..."', () => {
    expect(checkAnswer('(x+2)(x+3) = x^2+5x+6', expanded).status).toBe('correct');
  });
});

describe('equation answers', () => {
  const line: Answer = { type: 'equation', lhs: 'y', rhs: '-x/2+5', variables: ['x', 'y'] };

  it('accepts every arrangement of the same line', () => {
    expect(checkAnswer('y = -0.5x + 5', line).status).toBe('correct');
    expect(checkAnswer('2y = 10 - x', line).status).toBe('correct');
    expect(checkAnswer('x + 2y - 10 = 0', line).status).toBe('correct');
    expect(checkAnswer('$y = -\\frac{1}{2}x + 5$', line).status).toBe('correct');
  });

  it('reads a bare expression as the right-hand side', () => {
    expect(checkAnswer('-x/2 + 5', line).status).toBe('correct');
  });

  it('rejects a different line', () => {
    expect(checkAnswer('y = x/2 + 5', line).status).toBe('incorrect');
    expect(checkAnswer('y = -x/2 + 4', line).status).toBe('incorrect');
  });
});

describe('choice answers', () => {
  const diagnostic: Answer = {
    type: 'choice',
    correct: 'B',
    options: [
      { label: 'A', value: '$x^2 + 9$', misconceptionCode: 'expansion.freshmans-dream' },
      { label: 'B', value: '$x^2 + 6x + 9$' },
      { label: 'C', value: '$x^2 + 3x + 9$', misconceptionCode: 'expansion.middle-term-once' },
    ],
  };

  it('accepts a letter in any dress', () => {
    expect(checkAnswer('B', diagnostic).status).toBe('correct');
    expect(checkAnswer('b)', diagnostic).status).toBe('correct');
    expect(checkAnswer('option B', diagnostic).status).toBe('correct');
  });

  it('accepts the option restated', () => {
    expect(checkAnswer('x^2 + 6x + 9', diagnostic).status).toBe('correct');
  });

  it('names the misconception behind a distractor', () => {
    const result = checkAnswer('A', diagnostic);
    expect(result.status).toBe('incorrect');
    if (result.status === 'incorrect') expect(result.misconceptionCode).toBe('expansion.freshmans-dream');
    const restated = checkAnswer('x^2 + 3x + 9', diagnostic);
    if (restated.status === 'incorrect') expect(restated.misconceptionCode).toBe('expansion.middle-term-once');
  });

  it('is unparseable when nothing matches', () => {
    expect(checkAnswer('not sure', diagnostic).status).toBe('unparseable');
  });
});

describe('number answers with exact forms and significant figures', () => {
  it('reads surds and pi', () => {
    const surd: Answer = { type: 'number', value: Math.sqrt(13), tolerance: 1e-6 };
    expect(checkAnswer('√13', surd).status).toBe('correct');
    expect(checkAnswer('$\\sqrt{13}$', surd).status).toBe('correct');
    expect(checkAnswer('x = sqrt(13)', surd).status).toBe('correct');
    const area: Answer = { type: 'number', value: 36 * Math.PI, tolerance: 1e-6 };
    expect(checkAnswer('36π', area).status).toBe('correct');
    // Typed in ASCII, which is what a keyboard makes easy.
    expect(checkAnswer('36 pi', area).status).toBe('correct');
    expect(checkAnswer('36pi', area).status).toBe('correct');
    // "pi" inside a word is not the constant.
    const plain: Answer = { type: 'number', value: 8, tolerance: 0 };
    expect(checkAnswer('the pipe is 8 m long', plain).status).toBe('correct');
    expect(checkAnswer('$36\\pi$', area).status).toBe('correct');
  });

  it('accepts the rounded value when sigfigs is set', () => {
    const sf: Answer = { type: 'number', value: 113.09733, tolerance: 0, sigfigs: 3 };
    expect(checkAnswer('113', sf).status).toBe('correct');
    expect(checkAnswer('113.1', sf).status).toBe('correct');
    expect(checkAnswer('114', sf).status).toBe('incorrect');
  });

  it('notes an unrounded exact value', () => {
    const sf: Answer = { type: 'number', value: 113.09733, tolerance: 1e-4, sigfigs: 3 };
    const result = checkAnswer('113.0973', sf);
    expect(result.status).toBe('correct');
    if (result.status === 'correct') expect(result.note).toMatch(/not rounded/);
  });

  it('reads standard form as a number', () => {
    const big: Answer = { type: 'number', value: 556000, tolerance: 0 };
    expect(checkAnswer('5.56 x 10^5', big).status).toBe('correct');
    expect(checkAnswer('$5.56 \times 10^{5}$', big).status).toBe('correct');
    expect(checkAnswer('5.56e5', big).status).toBe('correct');
    expect(checkAnswer('5.56 × 10⁵', big).status).toBe('correct');
    const small: Answer = { type: 'number', value: 0.000048, tolerance: 0 };
    expect(checkAnswer('4.8 x 10^-5', small).status).toBe('correct');
    expect(checkAnswer('4.8 x 10^5', small).status).toBe('incorrect');
    const exact: Answer = { type: 'exact', value: '5.56 x 10^5', accepts: [] };
    expect(checkAnswer('556000', exact).status).toBe('correct');
    expect(checkAnswer('5.56×10^5', exact).status).toBe('correct');
  });

  it('still reads plain numbers and fractions the old way', () => {
    const num: Answer = { type: 'number', value: 0.0625, tolerance: 0 };
    expect(checkAnswer('1/16', num).status).toBe('correct');
    expect(checkAnswer('the answer is 0.0625', num).status).toBe('correct');
  });
});
