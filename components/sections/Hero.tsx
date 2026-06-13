'use client';

import { motion, useReducedMotion } from 'framer-motion';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wesdev.co.za';

/** ProfessionalService structured data injected into the hero (build spec §8). */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'WesDev',
  description:
    'Custom web development and design — fast, reliable web software built from scratch.',
  url: SITE_URL,
  email: 'wesleydeanabrahams@gmail.com',
  telephone: '+27614947771',
  founder: { '@type': 'Person', name: 'Wesley Dean Abrahams' },
  areaServed: 'Worldwide',
  knowsAbout: [
    'Web Development',
    'Next.js',
    'TypeScript',
    'UI/UX Design',
    'SEO',
    'Web Performance',
  ],
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * Hero section (build spec §3.2). Layered masked grid + top-right accent glow
 * behind a staggered fade-up reveal: status pill → headline → sub → CTAs.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const animateProps = reduceMotion
    ? {}
    : { variants: container, initial: 'hidden' as const, animate: 'show' as const };
  const childProps = reduceMotion ? {} : { variants: item };

  return (
    <header id="top" className="relative overflow-hidden pb-24 pt-[168px]">
      {/* Masked 64px grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-50 [background-image:linear-gradient(to_right,var(--line-soft)_1px,transparent_1px),linear-gradient(to_bottom,var(--line-soft)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_90%_70%_at_60%_0%,#000_0%,transparent_78%)] [-webkit-mask-image:radial-gradient(ellipse_90%_70%_at_60%_0%,#000_0%,transparent_78%)]"
      />
      {/* Top-right accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[120px] -top-[180px] z-0 h-[620px] w-[620px] [background:radial-gradient(circle,color-mix(in_oklch,var(--accent)_22%,transparent)_0%,transparent_62%)]"
      />

      <motion.div className="wrap relative z-10" {...animateProps}>
        <motion.div
          {...childProps}
          className="mb-[30px] inline-flex items-center gap-[9px] rounded-pill border border-line bg-[color-mix(in_oklch,var(--surface)_50%,transparent)] px-3.5 py-1.5 font-mono text-[12.5px] text-muted"
        >
          <span className="h-[7px] w-[7px] rounded-full bg-accent" />
          Available for new projects — Q3 2026
        </motion.div>

        <motion.h1
          {...childProps}
          className="mb-7 max-w-[14ch] text-balance text-[clamp(40px,7.2vw,92px)] font-semibold leading-[0.98] tracking-[-0.03em]"
        >
          Building <span className="text-accent">fast</span>, reliable{' '}
          <span className="text-transparent [-webkit-text-stroke:1.4px_var(--faint)]">
            web
          </span>{' '}
          software.
        </motion.h1>

        <motion.p
          {...childProps}
          className="mb-10 max-w-[56ch] text-pretty text-[clamp(17px,2vw,20px)] text-muted"
        >
          I&apos;m Wesley — I design and build custom websites and web apps from scratch.
          Clean architecture, sharp interfaces, fast load times, shipped on time.
        </motion.p>

        <motion.div {...childProps} className="flex flex-wrap items-center gap-3.5">
          <a href="#work" className="btn btn-accent">
            View selected work →
          </a>
          <a href="#contact" className="btn btn-ghost">
            Let&apos;s talk
          </a>
        </motion.div>
      </motion.div>

      <script
        type="application/ld+json"
        // JSON-LD is static and trusted — safe to inline.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
    </header>
  );
}
