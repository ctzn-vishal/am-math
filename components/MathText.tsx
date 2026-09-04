'use client';

import { useMemo } from 'react';
import { renderRichText } from '@/lib/text/richtext';

/**
 * Renders one block of the tutor's prose. All the parsing lives in `lib/text/richtext`; this
 * is only the React seam.
 */
export function MathText({ children, className }: { children: string; className?: string }) {
  const html = useMemo(() => renderRichText(children), [children]);
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
