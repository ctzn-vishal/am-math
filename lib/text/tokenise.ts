/**
 * Splits the tutor's replies into prose and maths.
 *
 * Kept separate from the renderer so it can be tested as pure text handling, which matters:
 * this is where a word problem's currency ("$\$48$") either survives or eats the rest of
 * the sentence.
 */

export interface Token {
  type: 'text' | 'inline-math' | 'display-math';
  value: string;
}

/**
 * Split maths from prose.
 *
 * Scanned rather than matched with a regex because `\$` is a legitimate escape *inside*
 * maths — currency in a word problem is written `$\$48$` — and a regex looking for the next
 * `$` closes the span on the escape, swallowing the sentence after it into a formula.
 */
export function tokenise(input: string): Token[] {
  const tokens: Token[] = [];
  let text = '';
  let i = 0;

  const flushText = () => {
    if (text.length > 0) {
      tokens.push({ type: 'text', value: text });
      text = '';
    }
  };

  /** Index of the next unescaped `delimiter`, or -1. */
  const findClose = (from: number, delimiter: '$' | '$$', stopAtNewline: boolean): number => {
    for (let j = from; j < input.length; j++) {
      const ch = input[j];
      if (ch === '\\') {
        j++; // Skip whatever is escaped, including a dollar.
        continue;
      }
      if (stopAtNewline && ch === '\n') return -1;
      if (ch !== '$') continue;
      if (delimiter === '$') return j;
      if (input[j + 1] === '$') return j;
    }
    return -1;
  };

  while (i < input.length) {
    const ch = input[i];

    if (ch === '\\' && input[i + 1] === '$') {
      // An escaped dollar in prose is just a dollar sign.
      text += '$';
      i += 2;
      continue;
    }

    if (ch !== '$') {
      text += ch;
      i++;
      continue;
    }

    if (input[i + 1] === '$') {
      const close = findClose(i + 2, '$$', false);
      if (close !== -1) {
        flushText();
        tokens.push({ type: 'display-math', value: input.slice(i + 2, close) });
        i = close + 2;
        continue;
      }
    } else {
      const close = findClose(i + 1, '$', true);
      if (close !== -1 && close > i + 1) {
        flushText();
        tokens.push({ type: 'inline-math', value: input.slice(i + 1, close) });
        i = close + 1;
        continue;
      }
    }

    // An unmatched delimiter is a literal dollar, not the start of a formula.
    text += '$';
    i++;
  }

  flushText();
  return tokens;
}
