'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay tier (0–3), matching the template's `data-d` levels. */
  delay?: 0 | 1 | 2 | 3;
  /** Render as a different element (e.g. "article", "li"). Defaults to "div". */
  as?: 'div' | 'article' | 'li' | 'span';
  className?: string;
}

/**
 * Viewport-triggered fade + upward-slide reveal (build spec §6).
 *
 * A lightweight IntersectionObserver toggles the `.wd-reveal-in` class (the
 * transition itself lives in globals.css) the first time the element enters the
 * viewport — no animation library in the bundle. When `prefers-reduced-motion`
 * is set the CSS snaps the content visible, so it is never trapped hidden, and
 * browsers without IntersectionObserver fall back to immediately visible.
 */
export function Reveal({ children, delay = 0, as = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as ElementType;
  return (
    <Tag
      ref={ref}
      data-reveal={delay}
      className={cn('wd-reveal', shown && 'wd-reveal-in', className)}
    >
      {children}
    </Tag>
  );
}
