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

function create() {
  const url = process.env.DATABASE_URL ?? 'file:./sage.db';
  const client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });
  return drizzle(client, { schema });
}

export const db = globalForDb.__sageDb ?? create();

if (process.env.NODE_ENV !== 'production') globalForDb.__sageDb = db;

export { schema };
export * from './schema';
