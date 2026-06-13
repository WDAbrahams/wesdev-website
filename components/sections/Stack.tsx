import { Eyebrow } from '@/components/shared/Eyebrow';
import { Reveal } from '@/components/shared/Reveal';
import type { Service } from '@/types';

/**
 * Stack / Services section (build spec §3.4). A 4-column grid of hairline-
 * separated cells inside one bordered container. Each cell has a mono index,
 * a category title, and a bulleted capability list; bullets turn accent and the
 * background lifts to `--bg-2` on hover. Collapses 4→2→1 cols on small screens.
 *
 * Server Component — content is read at build time from `content/services/*.md`.
 */
export function Stack({ services }: { services: Service[] }) {
  return (
    <section id="stack" className="py-[clamp(70px,9vw,128px)]">
      <div className="wrap">
        <Reveal className="mb-14">
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-4 max-w-[20ch] text-balance text-[clamp(28px,4vw,46px)] font-semibold leading-[1.05] tracking-[-0.02em]">
            What WesDev does.
          </h2>
          <p className="mt-4 max-w-[52ch] text-[17px] text-muted">
            A focused set of capabilities — design, build, and the care that keeps a
            site fast and findable long after launch.
          </p>
        </Reveal>

        <Reveal delay={1} className="grid grid-cols-1 gap-px overflow-hidden rounded border border-line bg-line-soft min-[461px]:grid-cols-2 min-[861px]:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.slug}
              className="group relative bg-bg px-6 pb-[30px] pt-[26px] transition-colors duration-300 hover:bg-bg-2"
            >
              <span className="font-mono text-xs text-accent">
                {String(service.order).padStart(2, '0')}
              </span>
              <h3 className="my-3.5 text-[18px] font-semibold tracking-[-0.01em]">
                {service.title}
              </h3>
              <ul className="flex flex-col gap-[9px]">
                {service.items.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-center gap-[9px] font-mono text-[13px] text-muted"
                  >
                    <span className="h-1 w-1 flex-none rounded-full bg-faint transition-colors group-hover:bg-accent" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
