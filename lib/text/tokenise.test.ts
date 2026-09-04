import { describe, it, expect } from 'vitest';
import { tokenise } from './tokenise';

describe('maths / prose splitting', () => {
  it('splits inline maths from prose', () => {
    expect(tokenise('Solve $x + 1 = 2$ for x.')).toEqual([
      { type: 'text', value: 'Solve ' },
      { type: 'inline-math', value: 'x + 1 = 2' },
      { type: 'text', value: ' for x.' },
    ]);
  });

  it('splits display maths', () => {
    expect(tokenise('Then:\n$$y = 2x + 1$$\nDone.')).toEqual([
      { type: 'text', value: 'Then:\n' },
      { type: 'display-math', value: 'y = 2x + 1' },
      { type: 'text', value: '\nDone.' },
    ]);
  });

  it('keeps an escaped dollar inside maths with the formula', () => {
    // The regression: currency in a word problem. A naive scan closes the span on the
    // escape and swallows the rest of the sentence into a formula.
    const tokens = tokenise('3 tickets cost $\\$48$. Find the price.');
    expect(tokens).toEqual([
      { type: 'text', value: '3 tickets cost ' },
      { type: 'inline-math', value: '\\$48' },
      { type: 'text', value: '. Find the price.' },
    ]);
  });

  it('handles two escaped-dollar amounts in one sentence', () => {
    const tokens = tokenise('A costs $\\$48$ and B costs $\\$52$ today.');
    expect(tokens.filter((t) => t.type === 'inline-math').map((t) => t.value)).toEqual([
      '\\$48',
      '\\$52',
    ]);
    expect(tokens.map((t) => t.value).join('')).toContain('and B costs ');
  });

  it('treats an escaped dollar in prose as a literal', () => {
    expect(tokenise('It cost \\$5 total.')).toEqual([
      { type: 'text', value: 'It cost $5 total.' },
    ]);
  });

  it('treats an unmatched dollar as a literal', () => {
    expect(tokenise('Costs $5 and change')).toEqual([
      { type: 'text', value: 'Costs $5 and change' },
    ]);
  });

  it('does not let inline maths run across a line break', () => {
    const tokens = tokenise('price $5\nand $6 more');
    expect(tokens.every((t) => t.type === 'text')).toBe(true);
  });

  it('leaves display maths free to span lines', () => {
    const tokens = tokenise('$$\\begin{aligned}\na &= 1\n\\end{aligned}$$');
    expect(tokens).toHaveLength(1);
    expect(tokens[0]?.type).toBe('display-math');
  });

  it('handles an empty pair of delimiters without hanging', () => {
    expect(tokenise('a $$ b')).toEqual([{ type: 'text', value: 'a $$ b' }]);
  });

  it('preserves LaTeX backslash commands untouched', () => {
    const tokens = tokenise('$\\frac{a}{b} \\cdot 2$');
    expect(tokens[0]).toEqual({ type: 'inline-math', value: '\\frac{a}{b} \\cdot 2' });
  });

  it('round-trips the authored ticket problem statement', () => {
    const statement =
      '3 adult tickets and 4 child tickets cost $\\$48$. 5 adult tickets and 2 child tickets ' +
      'cost $\\$52$. Find the cost of one adult ticket and one child ticket.';

    const tokens = tokenise(statement);
    const prose = tokens
      .filter((t) => t.type === 'text')
      .map((t) => t.value)
      .join('');

    expect(prose).toContain('5 adult tickets and 2 child tickets cost');
    expect(prose).toContain('Find the cost of one adult ticket');
    expect(tokens.filter((t) => t.type === 'inline-math')).toHaveLength(2);
  });
});
