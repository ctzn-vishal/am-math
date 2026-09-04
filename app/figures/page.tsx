import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { parseVisualSpec } from '@/lib/visual/registry';
import { VisualCanvas } from '@/components/visual/VisualCanvas';
import { FIGURE_GALLERY } from '@/lib/visual/gallery';

/**
 * Every figure kind, drawn from a real spec, on one page.
 *
 * Development only. Renderers are the one part of this codebase that tests cannot fully
 * judge — a chart can pass every assertion and still be unreadable — so there needs to be
 * somewhere to look at all eight together and see whether they hold as one family.
 *
 * Each entry goes through `parseVisualSpec` rather than straight to the renderer, so the
 * gallery doubles as a check that every showcase spec is one the tutor could legally emit.
 */
export const dynamic = 'force-static';

export default function FigureGallery() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-[13px] text-ink-faint transition-colors hover:text-ink"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Back
      </Link>

      <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">Figure gallery</h1>
      <p className="mt-2 mb-12 text-[14px] leading-relaxed text-ink-soft">
        Every kind the tutor can draw, from a spec that has passed validation.
      </p>

      <div className="space-y-14">
        {FIGURE_GALLERY.map((entry) => {
          const outcome = parseVisualSpec(entry.spec);

          return (
            <section key={entry.name}>
              <div className="mb-4 border-b border-line pb-2">
                <h2 className="font-mono text-[12px] font-medium tracking-tight text-ink-soft">
                  {entry.name}
                </h2>
                <p className="mt-1 text-[13px] text-ink-faint">{entry.note}</p>
              </div>

              {outcome.ok ? (
                <>
                  <VisualCanvas spec={outcome.spec} />
                  {outcome.warnings.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {outcome.warnings.map((w, i) => (
                        <li key={i} className="text-[12px] text-query">
                          warning — {w.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <ul className="space-y-1 rounded-lg border border-fault/30 bg-fault-soft p-4">
                  {outcome.issues.map((issue, i) => (
                    <li key={i} className="text-[13px] text-fault">
                      {issue.path}: {issue.message}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
