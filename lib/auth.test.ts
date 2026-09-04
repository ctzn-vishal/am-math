import { describe, it, expect } from 'vitest';
import { unlockToken, tokenMatches, passphraseMatches, gateState } from './auth';

describe('unlock token', () => {
  it('is stable for the same secret', async () => {
    expect(await unlockToken('hunter2')).toBe(await unlockToken('hunter2'));
  });

  it('differs for different secrets', async () => {
    expect(await unlockToken('hunter2')).not.toBe(await unlockToken('hunter3'));
  });

  it('does not contain the secret', async () => {
    expect(await unlockToken('correct-horse')).not.toContain('correct-horse');
  });

  it('is a 64-character hex digest', async () => {
    expect(await unlockToken('x')).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe('comparisons', () => {
  it('accepts the right token and rejects the wrong one', async () => {
    expect(await tokenMatches(await unlockToken('s3cret'), 's3cret')).toBe(true);
    expect(await tokenMatches(await unlockToken('other'), 's3cret')).toBe(false);
  });

  it('rejects a missing token', async () => {
    expect(await tokenMatches(undefined, 's3cret')).toBe(false);
    expect(await tokenMatches('', 's3cret')).toBe(false);
  });

  it('rejects a token of the wrong length without throwing', async () => {
    expect(await tokenMatches('abc', 's3cret')).toBe(false);
  });

  it('checks the passphrase itself', () => {
    expect(passphraseMatches('s3cret', 's3cret')).toBe(true);
    expect(passphraseMatches('s3crey', 's3cret')).toBe(false);
    expect(passphraseMatches('', 's3cret')).toBe(false);
    expect(passphraseMatches('s3cret-longer', 's3cret')).toBe(false);
  });
});

describe('gate state', () => {
  const withEnv = (env: Record<string, string | undefined>, run: () => void) => {
    const saved = { ...process.env };
    Object.assign(process.env, env);
    for (const [k, v] of Object.entries(env)) if (v === undefined) delete process.env[k];
    try {
      run();
    } finally {
      process.env = saved;
    }
  };

  it('is off locally with no secret', () => {
    withEnv({ TUTOR_ACCESS_SECRET: undefined, NODE_ENV: 'development' }, () => {
      expect(gateState()).toBe('off');
    });
  });

  it('is on when a secret is set', () => {
    withEnv({ TUTOR_ACCESS_SECRET: 'x', NODE_ENV: 'development' }, () => {
      expect(gateState()).toBe('on');
    });
  });

  it('is a misconfiguration in production with no secret', () => {
    // The one case that must never silently pass: a public deployment with an open door.
    withEnv({ TUTOR_ACCESS_SECRET: undefined, NODE_ENV: 'production' }, () => {
      expect(gateState()).toBe('misconfigured');
    });
  });
});
