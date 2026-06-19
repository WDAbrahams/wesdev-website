'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#stack', label: 'stack' },
  { href: '#work', label: 'work' },
] as const;

/**
 * Fixed navbar (build spec §3.1). Transparent until scrolled past ~24px, where
 * it gains a blurred translucent background + bottom hairline. Collapses into an
 * animated hamburger menu at ≤720px.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background,border-color,backdrop-filter] duration-300',
        scrolled &&
          'border-line-soft bg-[color-mix(in_oklch,var(--bg)_78%,transparent)] backdrop-blur-[14px]',
      )}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-[var(--gut)] py-[18px]">
        {/* Logo — full WesDev wordmark lockup */}
        <a
          href="#top"
          className="flex items-center transition-opacity hover:opacity-80"
          aria-label="WesDev — back to top"
        >
          <Image
            src="/images/wesdev-logo.png"
            alt="WesDev"
            width={201}
            height={56}
            sizes="201px"
            priority
            className="h-8 w-auto"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-[34px] min-[721px]:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navlink">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-accent">
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="text-text transition-colors hover:text-accent min-[721px]:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu — CSS grid-rows height transition (no animation library). */}
      <div
        id="mobile-menu"
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out min-[721px]:hidden',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div
          inert={!open || undefined}
          className="min-h-0 overflow-hidden border-t border-line-soft bg-[color-mix(in_oklch,var(--bg)_92%,transparent)] backdrop-blur-[14px]"
        >
          <div className="flex flex-col gap-1 px-[var(--gut)] py-5">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 font-mono text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn btn-accent mt-2 w-fit"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
