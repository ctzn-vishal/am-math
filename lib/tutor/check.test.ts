import { describe, it, expect } from 'vitest';
import { checkAnswer } from './check';
import type { Answer } from '@/lib/content/schema';

const coords: Answer = { type: 'coordinates', x: 2, y: 5, tolerance: 0 };
const tickets: Answer = { type: 'coordinates', x: 8, y: 6, tolerance: 0 };
const num: Answer = { type: 'number', value: 0.0625, tolerance: 0 };
const roots: Answer = { type: 'set', values: [3, -2], tolerance: 0 };

describe('coordinates', () => {
  it('accepts the named form', () => {
    expect(checkAnswer('x = 2, y = 5', coords).status).toBe('correct');
  });

  it('accepts the positional form', () => {
    expect(checkAnswer('(2, 5)', coords).status).toBe('correct');
    expect(checkAnswer('2, 5', coords).status).toBe('correct');
  });

  it('accepts LaTeX decoration', () => {
    expect(checkAnswer('$(x, y) = (2, 5)$', coords).status).toBe('correct');
  });

  it('reads domain-named variables in order', () => {
    expect(checkAnswer('a = 8, c = 6', tickets).status).toBe('correct');
    expect(checkAnswer('adult = 8 and child = 6', tickets).status).toBe('correct');
  });

  it('accepts currency formatting', () => {
    expect(checkAnswer('Adult $8, child $6', tickets).status).toBe('correct');
  });

  it('rejects a swapped pair', () => {
    const result = checkAnswer('x = 5, y = 2', coords);
    expect(result.status).toBe('incorrect');
    if (result.status === 'incorrect') expect(result.got).toBe('(5, 2)');
  });

  it('prefers assignments over decoy numbers when the student restates the problem', () => {
    // Positional reading of this would grab 3 and 4 and mark a correct answer wrong.
    const response = '3 adult and 4 child tickets cost 48, so a = 8 and c = 6';
    expect(checkAnswer(response, tickets).status).toBe('correct');
  });

  it('refuses to guess when the count is ambiguous', () => {
    const result = checkAnswer('somewhere between 1 2 3 4 5', coords);
    expect(result.status).toBe('unparseable');
  });
});

describe('number', () => {
  it('accepts a fraction', () => {
    expect(checkAnswer('1/16', num).status).toBe('correct');
  });

  it('accepts the decimal equivalent', () => {
    expect(checkAnswer('0.0625', num).status).toBe('correct');
  });

  it('takes the concluding number from a worked response', () => {
    expect(checkAnswer('2^-4 = 1/16', num).status).toBe('correct');
  });

  it('honours tolerance', () => {
    const approx: Answer = { type: 'number', value: 3.1416, tolerance: 0.001 };
    expect(checkAnswer('3.142', approx).status).toBe('correct');
    expect(checkAnswer('3.15', approx).status).toBe('incorrect');
  });

  it('strips thousands separators', () => {
    const big: Answer = { type: 'number', value: 556000, tolerance: 0 };
    expect(checkAnswer('556,000', big).status).toBe('correct');
  });
});

describe('set', () => {
  it('is order-independent', () => {
    expect(checkAnswer('x = 3 or x = -2', roots).status).toBe('correct');
    expect(checkAnswer('-2, 3', roots).status).toBe('correct');
  });

  it('rejects a wrong root', () => {
    expect(checkAnswer('3, 2', roots).status).toBe('incorrect');
  });

  it('flags the wrong number of roots as unparseable, not wrong', () => {
    // The student may have found both and written only one; that is a prompt to clarify,
    // not evidence of failure.
    expect(checkAnswer('3', roots).status).toBe('unparseable');
  });
});

describe('exact', () => {
  const exact: Answer = { type: 'exact', value: '5.56 x 10^5', accepts: ['556000'] };

  it('normalises whitespace and case', () => {
    expect(checkAnswer('  5.56 X 10^5 ', exact).status).toBe('correct');
  });

  it('accepts a listed alternative form', () => {
    expect(checkAnswer('556000', exact).status).toBe('correct');
  });
});

describe('unparseable is never recorded as wrong', () => {
  it('treats an empty response as unparseable', () => {
    expect(checkAnswer('   ', coords).status).toBe('unparseable');
  });

  it('treats a prose-only response as unparseable', () => {
    const result = checkAnswer('I think I need to substitute first', coords);
    expect(result.status).toBe('unparseable');
  });
});
