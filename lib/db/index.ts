import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

/**
 * One connection, reused across hot reloads. Next.js re-evaluates modules on every edit in
 * development, so without the global cache each save would open another libsql client and
 * leak file handles until the dev server fell over.
 */

const globalForDb = globalThis as unknown as {
  __sageDb?: ReturnType<typeof drizzle<typeof schema>>;
};

/**
 * Resolve the database connection.
 *
 * `TURSO_*` is checked first because those are the names Turso's own CLI and dashboard
 * emit, and a copy-pasted credential pair should just work. `DATABASE_*` stays supported
 * for anything else that speaks libsql, and a bare local file is the development fallback.
 */
export function resolveDatabaseConfig(env: NodeJS.ProcessEnv = process.env): {
  url: string;
  authToken: string | undefined;
  isLocalFile: boolean;
} {
  const url = env['TURSO_DATABASE_URL'] || env['DATABASE_URL'] || 'file:./sage.db';
  const authToken = env['TURSO_AUTH_TOKEN'] || env['DATABASE_AUTH_TOKEN'] || undefined;

  return { url, authToken, isLocalFile: url.startsWith('file:') };
}

function create() {
  const { url, authToken, isLocalFile } = resolveDatabaseConfig();

  // A serverless filesystem is ephemeral and mostly read-only, so a `file:` database on a
  // deployed instance either fails to migrate or silently discards every write when the
  // container recycles. Losing a student's progress quietly is worse than not starting.
  if (isLocalFile && process.env.NODE_ENV === 'production') {
    throw new Error(
      'DATABASE_URL points at a local file, which cannot work on a serverless host — the ' +
        'filesystem is ephemeral and progress would be silently discarded. Set ' +
        'TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in the deployment environment.',
    );
  }

  return drizzle(createClient({ url, ...(authToken ? { authToken } : {}) }), { schema });
}

export const db = globalForDb.__sageDb ?? create();

if (process.env.NODE_ENV !== 'production') globalForDb.__sageDb = db;

export { schema };
export * from './schema';
