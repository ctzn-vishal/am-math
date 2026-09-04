/**
 * The parts of the unlock gate that must run on the edge runtime.
 *
 * Kept apart from `lib/auth` because `proxy.ts` runs on the edge, where `node:crypto`
 * does not exist — and importing a module is enough to pull it in, even if only a constant
 * is used. Everything here is Web Crypto and plain constants, so it loads anywhere.
 */

export const UNLOCK_COOKIE = 'sage_unlock';

/** A year: the point is to enter it once per device, not to expire people out. */
export const UNLOCK_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Derive the cookie value from the passphrase.
 *
 * The cookie holds this hash rather than the passphrase, so a cookie read off the wire
 * cannot be turned back into the secret. It is replayable by design — a long-lived "you may
 * use this app" token — which is the right trade for one student behind one passphrase, and
 * would not be for a real multi-user product.
 */
export async function unlockToken(secret: string): Promise<string> {
  const data = new TextEncoder().encode(`math-sage:${secret}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Constant-time-ish string comparison.
 *
 * `node:crypto.timingSafeEqual` is unavailable here, so this compares every character
 * regardless of where the first difference is. It still leaks length, which for a hex
 * digest of fixed length tells an attacker nothing.
 */
export function safeEqual(a: string | undefined, b: string): boolean {
  if (!a || a.length !== b.length) return false;

  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
