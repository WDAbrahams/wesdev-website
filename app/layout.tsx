import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

/** Display / heading / body face — exposed as `--font-space-grotesk`. */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

/** Eyebrow / label / mono face — exposed as `--font-jetbrains-mono`. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wesdev.co.za';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'WesDev — Custom Web Development & Design',
    template: '%s · WesDev',
  },
  description:
    'WesDev builds fast, reliable, custom web software — design, Next.js development, SEO, and performance, all built from scratch with no templates.',
  keywords: [
    'web development',
    'Next.js developer',
    'web design',
    'SEO',
    'TypeScript',
    'Tailwind CSS',
    'freelance web developer',
    'WesDev',
  ],
  authors: [{ name: 'Wesley Dean Abrahams', url: SITE_URL }],
  creator: 'Wesley Dean Abrahams',
  publisher: 'WesDev',
  category: 'technology',
  applicationName: 'WesDev',
  formatDetection: { email: false, address: false, telephone: false },
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'WesDev — Custom Web Development & Design',
    description:
      'Fast, reliable, custom web software — designed and shipped end to end. Built from scratch, no templates.',
    siteName: 'WesDev',
    images: [
      {
        url: '/og-image.png',
        width: 2760,
        height: 1400,
        alt: 'WesDev — Custom Web Development & Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WesDev — Custom Web Development & Design',
    description:
      'Fast, reliable, custom web software — designed and shipped end to end.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

/** Browser UI / theme color — matches the dark base background of the brand. */
export const viewport: Viewport = {
  themeColor: '#13141c',
  colorScheme: 'dark',
};

/** Root layout — applies font variables, base metadata, and Vercel Analytics. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
