import type { MetadataRoute } from 'next';

/**
 * Web app manifest (served at `/manifest.webmanifest`). Provides install
 * metadata and brand colors for browsers, search engines, and mobile homescreens.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WesDev — Custom Web Development & Design',
    short_name: 'WesDev',
    description:
      'WesDev builds fast, reliable, custom web software — design, Next.js development, SEO, and performance, all built from scratch with no templates.',
    start_url: '/',
    display: 'standalone',
    background_color: '#13141c',
    theme_color: '#13141c',
    icons: [
      { src: '/icon.png', sizes: 'any', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
