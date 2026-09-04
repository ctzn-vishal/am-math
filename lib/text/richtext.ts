import katex from 'katex';
import { tokenise, type Token } from './tokenise';

/**
 * Turns the tutor's reply dialect — LaTeX in $...$ and $$...$$, plus bold, italic, inline
 * code and simple lists — into HTML.
 *
 * Hand-rolled rather than react-markdown + remark-math because the output is a narrow,
 * known dialect and a full markdown pipeline costs ~180KB to parse text that never contains
 * a table or an image. It also keeps maths and prose in one pass, so a broken formula
 * degrades to its own source instead of blanking the message around it.
 *
 * Assembly is line-based rather than token-based: a sentence containing inline maths is one
 * line with a formula in the middle of it, not three blocks stacked vertically. Paragraph
 * breaks come from newlines in the source, and nowhere else.
 */

function renderMath(latex: string, display: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode: display,
      throwOnError: false,
      strict: false,
      trust: false,
    });
  } catch {
    // Show the source rather than swallowing the message around it.
    return escapeHtml(display ? `$$${latex}$$` : `$${latex}$`);
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** The markdown subset the tutor is instructed to use: bold, italic, inline code. */
function renderInline(text: string): string {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');
}

type Block =
  | { kind: 'line'; html: string }
  | { kind: 'display'; html: string };

/**
 * Flatten tokens into lines, so inline maths stays inside the sentence it belongs to.
 */
function toBlocks(tokens: Token[]): Block[] {
  const blocks: Block[] = [];
  let line = '';

  const endLine = () => {
    blocks.push({ kind: 'line', html: line });
    line = '';
  };

  for (const token of tokens) {
    if (token.type === 'display-math') {
      if (line.trim().length > 0) endLine();
      else line = '';
      blocks.push({ kind: 'display', html: renderMath(token.value, true) });
      continue;
    }

    if (token.type === 'inline-math') {
      line += renderMath(token.value, false);
      continue;
    }

    const parts = token.value.split('\n');
    parts.forEach((part, index) => {
      if (index > 0) endLine();
      line += renderInline(part);
    });
  }

  if (line.trim().length > 0) endLine();
  return blocks;
}

/** Wrap lines in paragraphs, gathering consecutive bullets or numbers into one list. */
function assemble(blocks: Block[]): string {
  const out: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const closeList = () => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };

  for (const block of blocks) {
    if (block.kind === 'display') {
      closeList();
      out.push(block.html);
      continue;
    }

    const html = block.html;
    if (html.trim().length === 0) {
      closeList();
      continue;
    }

    // List markers only count at the very start of a line, before any maths.
    const bullet = /^\s*[-*]\s+([\s\S]*)$/.exec(html);
    const numbered = /^\s*\d+\.\s+([\s\S]*)$/.exec(html);

    if (bullet || numbered) {
      const wanted = bullet ? 'ul' : 'ol';
      if (listType !== wanted) {
        closeList();
        out.push(`<${wanted}>`);
        listType = wanted;
      }
      out.push(`<li>${(bullet ?? numbered)?.[1] ?? ''}</li>`);
      continue;
    }

    closeList();
    out.push(`<p>${html}</p>`);
  }

  closeList();
  return out.join('');
}

export function renderRichText(source: string): string {
  // Prose is escaped and maths goes through KaTeX with trust disabled, so nothing the model
  // emits reaches the DOM as live markup.
  return assemble(toBlocks(tokenise(source)));
}
