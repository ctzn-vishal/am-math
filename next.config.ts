import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  // The Drizzle migrator reads ./drizzle at request time. Output file tracing cannot see
  // that read, so without this the folder is left out of every serverless bundle and the
  // first request on each cold instance fails with ENOENT before it reaches the database.
  outputFileTracingIncludes: {
    '/**': ['./drizzle/**/*'],
  },
};

export default config;
