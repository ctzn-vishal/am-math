/**
 * Wipe every session, transcript, attempt and mastery estimate, leaving the curriculum and
 * the student row intact. For clearing trial runs before a real student starts.
 *
 *   node --env-file=.env.local scripts/reset-progress.mjs --yes
 *
 * Reads the same variables the app does, so it points at whatever the app points at —
 * which, with Turso credentials in .env.local, is the live database. Hence the flag.
 */

import { createClient } from '@libsql/client';

if (!process.argv.includes('--yes')) {
  console.error('This deletes all progress in the database the app is configured for.');
  console.error('Re-run with --yes to confirm.');
  process.exit(1);
}

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || 'file:./sage.db';
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN || undefined;
const db = createClient({ url, ...(authToken ? { authToken } : {}) });

const tables = ['attempts', 'turns', 'sessions', 'skill_state'];
for (const table of tables) {
  const result = await db.execute(`delete from ${table}`);
  console.log(`${table}: removed ${result.rowsAffected}`);
}
console.log(`Progress cleared on ${url.replace(/\/\/.*@/, '//…@')}.`);
