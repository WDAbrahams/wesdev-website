'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useInView, useReducedMotion } from 'framer-motion';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Reveal } from '@/components/shared/Reveal';
import type { AboutContent, AboutStat } from '@/types';

/**
 * Render a paragraph string, converting `**bold**` markers into accented
 * `<strong>` (key phrases in `--text`).
 */
function renderParagraph(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-medium text-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/** Single stat cell whose digits count up once scrolled into view. */
function StatCell({ stat }: { stat: AboutStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(reduceMotion ? stat.value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) {
      if (reduceMotion) setN(stat.value);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * stat.value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduceMotion, stat.value]);

  return (
    <div ref={ref} className="bg-bg px-[18px] py-5">
      <div className="text-[30px] font-semibold tracking-[-0.02em]">
        <span className="text-accent">{n}</span>
        {stat.suffix}
      </div>
      <div className="mt-1 font-mono text-[11.5px] uppercase tracking-[0.08em] text-faint">
        {stat.label}
      </div>
    </div>
  );
}

/**
 * About section (build spec §3.3). Two-column grid: a bordered portrait frame
 * with accent corner ticks on the left, body copy + a count-up stat strip on
 * the right. Stacks at ≤820px.
 */
export function About({ about }: { about: AboutContent }) {
  return (
    <section id="about" className="py-[clamp(70px,9vw,128px)]">
      <div className="wrap grid items-center gap-[clamp(36px,5vw,80px)] min-[821px]:grid-cols-[0.85fr_1.15fr]">
        {/* Portrait frame */}
        <Reveal className="min-[821px]:max-w-none max-w-[360px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded border border-line bg-bg-2 [background-image:repeating-linear-gradient(135deg,var(--line-soft)_0_1px,transparent_1px_13px)]">
            {about.image && (
              <Image
                src={about.image}
                alt={about.imageAlt}
                fill
                priority
                sizes="(max-width: 820px) 360px, 40vw"
                className="object-cover object-right-top"
              />
            )}
            <span className="absolute left-3 top-3 h-[18px] w-[18px] border-[1.5px] border-b-0 border-r-0 border-accent" />
            <span className="absolute bottom-3 right-3 h-[18px] w-[18px] border-[1.5px] border-l-0 border-t-0 border-accent" />
            {!about.image && (
              <span className="absolute bottom-3.5 left-3.5 rounded-sm border border-line bg-bg px-2.5 py-1.5 font-mono text-[11.5px] text-faint">
                {about.imagePlaceholder}
              </span>
            )}
          </div>
        </Reveal>

        {/* Body */}
        <Reveal delay={1}>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 className="my-6 max-w-[20ch] text-[clamp(26px,3.6vw,40px)] font-semibold leading-[1.08] tracking-[-0.02em]">
            {about.heading}
          </h2>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="mb-[18px] max-w-[54ch] text-[17.5px] text-muted">
              {renderParagraph(p)}
            </p>
          ))}

          <div className="mt-[34px] grid grid-cols-3 gap-px overflow-hidden rounded border border-line-soft bg-line-soft">
            {about.stats.map((stat) => (
              <StatCell key={stat.label} stat={stat} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
