/**
 * next-sitemap configuration.
 *
 * Generates `sitemap.xml` and `robots.txt` (allowing all crawlers) after each
 * production build via the `postbuild` script. The site URL falls back to a
 * placeholder when `NEXT_PUBLIC_SITE_URL` is not set.
 *
 * @type {import('next-sitemap').IConfig}
 */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://wesdev.co.za',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};

export default config;
