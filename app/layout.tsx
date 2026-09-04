import type { Metadata, Viewport } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import './globals.css';

const ui = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});

/**
 * A serif for the tutor's own words. A person explaining something reads differently from
 * a system emitting output, and the typeface is most of that difference.
 */
const reading = Newsreader({
  subsets: ['latin'],
  variable: '--font-reading',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Math Sage',
  description:
    'A Secondary 2 mathematics tutor that teaches through the Concrete–Pictorial–Abstract sequence.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f4' },
    { media: '(prefers-color-scheme: dark)', color: '#14140f' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ui.variable} ${reading.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
