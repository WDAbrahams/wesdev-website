'use client';

import { useState } from 'react';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Reveal } from '@/components/shared/Reveal';
import { Footer } from '@/components/layout/Footer';
import { ContactSidebar } from '@/components/sections/ContactSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SITE } from '@/lib/site';
import type { ContactFormPayload } from '@/types';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Contact + Footer section (build spec §3.6). Centered CTA headline with an
 * accent-underlined link, a social/contact button row, a functional contact
 * form (posts to `/api/contact`, delivered via Web3Forms), the
 * {@link ContactSidebar}, and the {@link Footer}. A large soft accent glow rises
 * from the bottom center.
 */
export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: ContactFormPayload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? 'Something went wrong. Please try again.');
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      {/* Bottom-center accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[260px] left-1/2 h-[520px] w-[760px] -translate-x-1/2 [background:radial-gradient(ellipse,color-mix(in_oklch,var(--accent)_16%,transparent)_0%,transparent_65%)]"
      />

      <div className="wrap relative z-10">
        <Reveal className="py-[clamp(80px,11vw,150px)] text-center">
          <Eyebrow centered>Get in touch</Eyebrow>
          <h2 className="mx-auto mt-[22px] max-w-[16ch] text-balance text-[clamp(34px,6vw,74px)] font-semibold leading-none tracking-[-0.03em]">
            Have a project in mind?
            <br />
            Let&apos;s{' '}
            <a href={`mailto:${SITE.email}`} className="contact-link whitespace-nowrap">
              make it real
            </a>
            .
          </h2>

          {/* Social / contact button row */}
          <div className="mt-11 flex flex-wrap justify-center gap-3.5">
            <a href={`mailto:${SITE.email}`} className="btn btn-accent">
              {SITE.email}
            </a>
            {SITE.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Form + sidebar */}
          <div className="mx-auto mt-16 grid max-w-4xl gap-6 text-left min-[821px]:grid-cols-[1.4fr_1fr]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="grid gap-4 min-[541px]:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-faint">
                    Name
                  </span>
                  <Input name="name" type="text" required placeholder="Your name" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-faint">
                    Email
                  </span>
                  <Input name="email" type="email" required placeholder="you@email.com" />
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-faint">
                  Phone <span className="normal-case">(optional)</span>
                </span>
                <Input name="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-faint">
                  Message
                </span>
                <Textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project…"
                />
              </label>

              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Send message →'}
                </Button>
                {status === 'success' && (
                  <span role="status" className="font-mono text-[13px] text-accent">
                    Thanks — I&apos;ll be in touch soon.
                  </span>
                )}
                {status === 'error' && (
                  <span role="alert" className="font-mono text-[13px] text-muted">
                    {error}
                  </span>
                )}
              </div>
            </form>

            <ContactSidebar />
          </div>
        </Reveal>
      </div>

      <div className="wrap relative z-10">
        <Footer />
      </div>
    </section>
  );
}
