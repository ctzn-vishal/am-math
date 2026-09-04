import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

type Database = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as { __sageDb?: Database };

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

function create(): Database {
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

function connection(): Database {
  const existing = globalForDb.__sageDb;
  if (existing) return existing;

  const created = create();
  // Cached in both environments, but for different reasons: in development because Next
  // re-evaluates modules on every edit and would otherwise leak a client per save, and in
  // production because a warm lambda should reuse its connection.
  globalForDb.__sageDb = created;
  return created;
}

/**
 * Connects on first use, not at import.
 *
 * This is lazy for a specific reason. Next's build collects page data by importing every
 * route in a production environment, with none of the runtime environment variables set —
 * so an eager connection made the guard above fire during `next build` and failed the
 * deploy before it could ever read its own configuration. A missing database should be a
 * request-time error, not a build-time one.
 */
export const db = new Proxy({} as Database, {
  get(_target, property, receiver) {
    return Reflect.get(connection() as object, property, receiver);
  },
  has(_target, property) {
    return Reflect.has(connection() as object, property);
  },
});

export { schema };
export * from './schema';
