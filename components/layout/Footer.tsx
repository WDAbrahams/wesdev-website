import { SITE } from '@/lib/site';

/**
 * Footer (build spec §3.6). Mono, faint, space-between — copyright on the left,
 * tagline on the right. Rendered within the Contact section.
 */
export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line-soft py-[26px] font-mono text-[12.5px] text-faint">
      <span>© {new Date().getFullYear()} {SITE.name}</span>
      <span>{SITE.tagline}</span>
    </footer>
  );
}
