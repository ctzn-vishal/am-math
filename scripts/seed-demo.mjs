/**
 * Seeds a lesson containing a tutor turn with a bar model, so the renderer can be exercised
 * without spending an API call. Development only.
 *
 *   node scripts/seed-demo.mjs
 */

import { createClient } from '@libsql/client';
import { randomUUID } from 'node:crypto';

const db = createClient({ url: process.env.DATABASE_URL ?? 'file:./sage.db' });

// The elimination example from unit 2: 3a + 4c = 48 against a doubled 10a + 4c = 104.
// The leftover 7a strip is the whole argument, so it is coloured as a difference.
const spec = {
  kind: 'bar_model',
  title: 'Two receipts, lined up',
  caption:
    'Both rows contain the same four child tickets. Whatever is left over must account for the ' +
    'difference in price.',
  rows: [
    {
      id: 'r1',
      label: 'Group A',
      segments: [
        { id: 's1', label: '3 adult', units: 3, role: 'unknown' },
        { id: 's2', label: '4 child', units: 4, role: 'known' },
      ],
      total: { label: '$48', value: 48 },
    },
    {
      id: 'r2',
      label: '2 × Group B',
      segments: [
        { id: 's3', label: '3 adult', units: 3, role: 'unknown' },
        { id: 's4', label: '7 more adult', units: 7, role: 'difference' },
        { id: 's5', label: '4 child', units: 4, role: 'known' },
      ],
      total: { label: '$104', value: 104 },
    },
  ],
};

const studentId = 'solo';
const sessionId = randomUUID();

await db.execute({
  sql: 'INSERT OR IGNORE INTO students (id, name, pack_id) VALUES (?, ?, ?)',
  args: [studentId, 'Student', 'dimensions-g8'],
});

await db.execute({
  sql: 'INSERT INTO sessions (id, student_id, skill_id, problem_id, cpa_stage) VALUES (?, ?, ?, ?, ?)',
  args: [
    sessionId,
    studentId,
    'linear-systems.solve-simultaneous-linear',
    'linear-systems.elimination-tickets',
    'pictorial',
  ],
});

const turns = [
  ['student', "I doubled the second one but I'm not sure what to do next.", null],
  [
    'tutor',
    'Good — doubling was the right instinct. Look at what the two rows now have in common.\n\n' +
      'Both contain **four child tickets**. If you set those aside, what is left, and what is it worth?',
    JSON.stringify(spec),
  ],
];

for (const [role, text, visualSpec] of turns) {
  await db.execute({
    sql: 'INSERT INTO turns (id, session_id, role, text, visual_spec) VALUES (?, ?, ?, ?, ?)',
    args: [randomUUID(), sessionId, role, text, visualSpec],
  });
}

console.log(`http://localhost:3000/lesson/${sessionId}`);
