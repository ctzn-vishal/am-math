import { describe, it, expect } from 'vitest';
import { renderRichText } from './richtext';

/**
 * Replace each KaTeX root with `[math]` so assertions read against the document structure
 * rather than KaTeX's internals. Spans nest, so this balances rather than regex-matches.
 */
function structure(html: string): string {
  let out = '';
  let i = 0;

  while (i < html.length) {
    const start = html.indexOf('<span class="katex', i);
    if (start === -1) {
      out += html.slice(i);
      break;
    }

    out += html.slice(i, start) + '[math]';

    let depth = 0;
    let j = start;
    while (j < html.length) {
      if (html.startsWith('<span', j)) {
        depth++;
        j = html.indexOf('>', j) + 1;
      } else if (html.startsWith('</span>', j)) {
        depth--;
        j += '</span>'.length;
        if (depth === 0) break;
      } else {
        j++;
      }
    }
    i = j;
  }

  return out;
}

describe('paragraphs and inline maths', () => {
  it('keeps inline maths inside its sentence', () => {
    // The regression: token-per-block assembly split one sentence into three stacked
    // paragraphs whenever it contained a formula.
    const html = renderRichText('The cost is $\\$48$ in total.');
    const paragraphs = html.match(/<p>/g) ?? [];
    expect(paragraphs).toHaveLength(1);
    expect(html).toContain('The cost is ');
    expect(html).toContain(' in total.');
  });

  it('renders the ticket problem as two sentences, not six fragments', () => {
    const html = renderRichText(
      '3 adult tickets and 4 child tickets cost $\\$48$. 5 adult tickets and 2 child tickets ' +
        'cost $\\$52$. Find the cost of one adult ticket and one child ticket.',
    );
    expect(html.match(/<p>/g)).toHaveLength(1);
  });

  it('breaks paragraphs on newlines', () => {
    const html = renderRichText('First line.\nSecond line.');
    expect(html.match(/<p>/g)).toHaveLength(2);
  });

  it('drops blank lines rather than emitting empty paragraphs', () => {
    const html = renderRichText('One.\n\n\nTwo.');
    expect(html.match(/<p>/g)).toHaveLength(2);
    expect(html).not.toContain('<p></p>');
  });

  it('gives display maths its own block', () => {
    const html = structure(renderRichText('Solve:\n$$y = 2x + 1$$\nThen substitute.'));
    expect(html).toBe('<p>Solve:</p>[math]<p>Then substitute.</p>');
  });
});

describe('markdown subset', () => {
  it('renders bold and inline code', () => {
    const html = renderRichText('Use the **product law** and `a^m`.');
    expect(html).toContain('<strong>product law</strong>');
    expect(html).toContain('<code>a^m</code>');
  });

  it('gathers consecutive bullets into one list', () => {
    const html = renderRichText('Steps:\n- First\n- Second\n- Third');
    expect(html.match(/<ul>/g)).toHaveLength(1);
    expect(html.match(/<li>/g)).toHaveLength(3);
  });

  it('keeps numbered and bulleted lists separate', () => {
    const html = renderRichText('1. One\n2. Two\n- Bullet');
    expect(html).toContain('<ol>');
    expect(html).toContain('<ul>');
  });

  it('allows maths inside a list item', () => {
    const html = structure(renderRichText('- Apply $a^m$ first'));
    expect(html).toBe('<ul><li>Apply [math] first</li></ul>');
  });

  it('does not treat a minus sign mid-sentence as a bullet', () => {
    const html = renderRichText('The value 7 - 3 is 4.');
    expect(html).not.toContain('<ul>');
  });
});

describe('escaping', () => {
  it('neutralises HTML in prose', () => {
    const html = renderRichText('Consider <script>alert(1)</script> here.');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('does not let a model-supplied attribute break out', () => {
    const html = renderRichText('An "onerror=alert(1)" string.');
    expect(html).toContain('&quot;onerror');
  });

  it('renders a malformed formula as its own source instead of blanking the message', () => {
    const html = renderRichText('Before $\\frac{1$ after');
    expect(html).toContain('Before');
    expect(html).toContain('after');
  });
});
