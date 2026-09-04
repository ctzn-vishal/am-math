import type { Config } from 'drizzle-kit';

/**
 * Reads the same variables the app does, so `db:studio` and `db:push` point at whatever
 * the running app points at rather than quietly at a stale local file.
 */
export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL ?? 'file:./sage.db',
    authToken: process.env.TURSO_AUTH_TOKEN ?? process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
