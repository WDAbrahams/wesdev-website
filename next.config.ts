import type { NextConfig } from 'next';

/**
 * Next.js configuration for WesDev.
 *
 * - Enables modern image formats (AVIF/WebP) for `next/image`.
 * - `reactStrictMode` surfaces side-effect bugs early in development.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
