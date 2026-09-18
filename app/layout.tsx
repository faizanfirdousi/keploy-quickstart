import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://keploy-quickstart.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Keploy Go Quickstart Tutorial',
    template: '%s | Keploy Go Quickstart',
  },
  description:
    'Hands-on tutorial: record and replay API tests with Keploy on a Go Echo URL shortener with PostgreSQL.',
  openGraph: {
    title: 'Keploy Go Quickstart Tutorial',
    description:
      'Record real interactions from a Go app and replay them as integration tests with Keploy.',
    url: siteUrl,
    siteName: 'Keploy Go Quickstart',
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keploy Go Quickstart Tutorial',
    description:
      'Record and replay API tests with Keploy on a Go Echo + PostgreSQL sample app.',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
