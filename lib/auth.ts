import { UNLOCK_COOKIE, UNLOCK_MAX_AGE, safeEqual, unlockToken } from './auth-shared';

/**
 * Server-side half of the unlock gate.
 *
 * This is a gate, not an identity system. There is one student; nothing here needs to know
 * *who* is asking, only that a public URL cannot spend the Gemini quota for whoever finds
 * it. Anything more would be building an auth system for a user base of one.
 *
 * The edge-safe primitives live in `auth-shared` — see the note there on why.
 */

export { UNLOCK_COOKIE, UNLOCK_MAX_AGE, unlockToken, safeEqual };

export async function tokenMatches(candidate: string | undefined, secret: string): Promise<boolean> {
  return safeEqual(candidate, await unlockToken(secret));
}

export function passphraseMatches(candidate: string, secret: string): boolean {
  return safeEqual(candidate, secret);
}

/**
 * Whether the gate is switched on at all.
 *
 * Unset in development means no gate — the app is not reachable from outside. Unset in
 * production is a misconfiguration, and the app refuses rather than serving an open door.
 */
export function gateState(): 'off' | 'on' | 'misconfigured' {
  const secret = process.env.TUTOR_ACCESS_SECRET;
  if (secret && secret.length > 0) return 'on';
  return process.env.NODE_ENV === 'production' ? 'misconfigured' : 'off';
}
