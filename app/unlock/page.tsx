import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { UNLOCK_COOKIE, UNLOCK_MAX_AGE, gateState, passphraseMatches, unlockToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function unlock(formData: FormData): Promise<void> {
  'use server';

  const secret = process.env.TUTOR_ACCESS_SECRET;
  if (!secret) redirect('/');

  const given = String(formData.get('passphrase') ?? '');

  if (!passphraseMatches(given, secret)) {
    // typedRoutes does not model query strings, so build the URL as a plain string.
    redirect(`/unlock?wrong=1` as Parameters<typeof redirect>[0]);
  }

  const jar = await cookies();
  jar.set(UNLOCK_COOKIE, await unlockToken(secret), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: UNLOCK_MAX_AGE,
  });

  redirect('/');
}

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ wrong?: string }>;
}) {
  if (gateState() === 'off') redirect('/');

  const { wrong } = await searchParams;

  return (
    <main className="flex min-h-dvh items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">Math Sage</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
          Enter the passphrase to continue.
        </p>

        <form action={unlock} className="mt-7">
          <label htmlFor="passphrase" className="sr-only">
            Passphrase
          </label>
          <input
            id="passphrase"
            name="passphrase"
            type="password"
            autoFocus
            autoComplete="current-password"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-sage-400"
          />

          {wrong && (
            <p className="mt-2.5 text-[13px] text-fault">That is not the passphrase.</p>
          )}

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-sage-500 px-4 py-3 text-[15px] font-medium text-paper transition-opacity hover:opacity-90"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
