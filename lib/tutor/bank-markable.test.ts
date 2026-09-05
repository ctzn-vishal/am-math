import { describe, it, expect } from 'vitest';
import { getPack } from '@/lib/content';
import { checkAnswer } from './check';
import { parseExpression, variablesIn } from './expression';

/**
 * Every authored answer must be markable by the code that will mark it.
 *
 * The failure this catches is the one static checking cannot: an answer that satisfies the
 * schema, reads correctly to a human, and is then rejected by the checker at the moment a
 * student types it — a reference expression with a stray character, a `set` whose values
 * the number reader cannot recover, an `exact` string that normalises to nothing. The test
 * is simply: feed each reference answer back in as if the student had written it perfectly,
 * and require a verdict of "correct".
 */
describe('every authored answer is markable', () => {
  const pack = getPack();

  for (const problem of pack.problems) {
    const answer = problem.answer;

    it(`${problem.id} (${answer.type})`, () => {
      switch (answer.type) {
        case 'number': {
          const written = answer.sigfigs !== undefined ? String(answer.value) : String(answer.value);
          expect(checkAnswer(written, answer).status, `"${written}" should mark correct`).toBe('correct');
          break;
        }
        case 'coordinates': {
          const written = `(${answer.x}, ${answer.y})`;
          expect(checkAnswer(written, answer).status, written).toBe('correct');
          break;
        }
        case 'set': {
          const written = answer.values.join(', ');
          expect(checkAnswer(written, answer).status, written).toBe('correct');
          break;
        }
        case 'exact': {
          expect(checkAnswer(answer.value, answer).status, answer.value).toBe('correct');
          for (const accepted of answer.accepts) {
            expect(checkAnswer(accepted, answer).status, `accepts: ${accepted}`).toBe('correct');
          }
          break;
        }
        case 'expression': {
          // The reference must parse, use only its declared variables, and mark itself correct
          // — including satisfying its own `form` requirement, which is the common authoring
          // slip: asking for a factorised answer and writing the expanded one as the reference.
          const node = parseExpression(answer.value);
          const declared = new Set(answer.variables);
          for (const v of variablesIn(node)) {
            expect(declared.has(v), `${problem.id}: "${v}" is not in variables`).toBe(true);
          }
          const result = checkAnswer(answer.value, answer);
          expect(result.status, `"${answer.value}" should mark correct, got ${result.status}`).toBe(
            'correct',
          );
          break;
        }
        case 'equation': {
          const written = `${answer.lhs} = ${answer.rhs}`;
          expect(checkAnswer(written, answer).status, written).toBe('correct');
          break;
        }
        case 'choice': {
          const correct = answer.options.find((o) => o.label === answer.correct);
          expect(correct, `${problem.id}: no option matches "${answer.correct}"`).toBeDefined();
          expect(checkAnswer(answer.correct, answer).status, 'by letter').toBe('correct');
          for (const option of answer.options) {
            if (option.label === answer.correct) continue;
            const verdict = checkAnswer(option.label, answer);
            expect(verdict.status, `distractor ${option.label} should mark incorrect`).toBe('incorrect');
            if (verdict.status === 'incorrect') {
              expect(verdict.misconceptionCode, `distractor ${option.label} names no code`).toBe(
                option.misconceptionCode,
              );
            }
          }
          break;
        }
      }
    });
  }
});
