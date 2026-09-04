import { NextResponse, type NextRequest } from 'next/server';
import { UNLOCK_COOKIE, safeEqual, unlockToken } from '@/lib/auth-shared';

/**
 * Gates every page and API route behind the unlock cookie.
 *
 * Doing it here rather than per-route means a new page cannot accidentally ship
 * unprotected — the default is closed, and `/unlock` is the one deliberate exception.
 *
 * This is Next 16's `proxy` convention, which replaced `middleware`. Same behaviour, and
 * the old name is deprecated.
 *
 * Imports from `auth-shared`, not `auth`: this runs on the edge runtime, where pulling in
 * anything that touches `node:crypto` fails the whole file at module load.
 */

export const config = {
  // Everything except Next's own assets and the favicon.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export default async function proxy(request: NextRequest) {
  const secret = process.env.TUTOR_ACCESS_SECRET;

  // No secret set. Locally that means no gate; in production it is a misconfiguration, and
  // an open door on a public URL is the one failure worth refusing outright.
  if (!secret) {
    if (process.env.NODE_ENV !== 'production') return NextResponse.next();

    return new NextResponse(
      'TUTOR_ACCESS_SECRET is not set on this deployment, so the app is closed. Set it in the ' +
        'environment to open it.',
      { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );
  }

  const { pathname } = request.nextUrl;
  if (pathname === '/unlock') return NextResponse.next();

  const given = request.cookies.get(UNLOCK_COOKIE)?.value;
  if (safeEqual(given, await unlockToken(secret))) return NextResponse.next();

  // An API call gets a status it can render, not a redirect to an HTML page.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Locked. Reload the page and enter the passphrase.' }, { status: 401 });
  }

  const url = request.nextUrl.clone();
  url.pathname = '/unlock';
  url.search = '';
  return NextResponse.redirect(url);
}
