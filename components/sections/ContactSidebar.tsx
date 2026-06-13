import { Mail, Phone } from 'lucide-react';
import { SITE } from '@/lib/site';

/**
 * Contact details panel (build spec §3.6) — business name, email, phone, and
 * social links. Rendered inside {@link Contact} alongside the form.
 */
export function ContactSidebar() {
  return (
    <aside className="self-start rounded border border-line bg-surface p-6 text-left">
      <h3 className="font-mono text-[13px] uppercase tracking-[0.1em] text-faint">
        {SITE.name}
      </h3>

      <dl className="mt-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Mail size={16} className="flex-none text-accent" />
          <a
            href={`mailto:${SITE.email}`}
            className="text-[15px] text-text transition-colors hover:text-accent"
          >
            {SITE.email}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={16} className="flex-none text-accent" />
          <a
            href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}
            className="text-[15px] text-text transition-colors hover:text-accent"
          >
            {SITE.phone}
          </a>
        </div>
      </dl>

      {SITE.socials.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3 border-t border-line-soft pt-5">
          {SITE.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] text-muted transition-colors hover:text-accent"
            >
              {social.label}
            </a>
          ))}
        </div>
      )}
    </aside>
  );
}
