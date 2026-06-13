'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay tier (0–3), matching the template's `data-d` levels. */
  delay?: 0 | 1 | 2 | 3;
  /** Render as a different element (e.g. "article", "li"). Defaults to "div". */
  as?: 'div' | 'article' | 'li' | 'span';
  className?: string;
}

const DELAY_MAP: Record<number, number> = { 0: 0, 1: 0.08, 2: 0.16, 3: 0.24 };

/**
 * Viewport-triggered fade + upward-slide reveal (build spec §6).
 *
 * Nothing animates off-screen — the effect fires once when the element enters
 * the viewport. When `prefers-reduced-motion` is set the content renders
 * immediately in its visible state, so it is never trapped hidden.
 */
export function Reveal({ children, delay = 0, as = 'div', className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: DELAY_MAP[delay],
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
