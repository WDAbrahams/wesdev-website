import Image from 'next/image';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Reveal } from '@/components/shared/Reveal';
import { Badge } from '@/components/ui/badge';
import type { WorkProject } from '@/types';

/**
 * Selected Work section (build spec §3.5). A 2-column card grid (1-col ≤760px).
 * Each card: a 16/9 thumbnail with a mono tag chip and a circular ↗ arrow that
 * fills with accent and rotates -45° on hover; meta with title, year, copy, and
 * tech chips. The whole card lifts -6px and gains an accent border on hover.
 *
 * Server Component — content is read at build time from `content/work/*.md`.
 */
export function Work({ projects }: { projects: WorkProject[] }) {
  return (
    <section id="work" className="py-[clamp(70px,9vw,128px)]">
      <div className="wrap">
        <Reveal className="mb-14">
          <Eyebrow>Selected Work</Eyebrow>
          <h2 className="mt-4 max-w-[20ch] text-balance text-[clamp(28px,4vw,46px)] font-semibold leading-[1.05] tracking-[-0.02em]">
            A few things I&apos;ve been building.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 min-[761px]:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} as="article" delay={(i % 2) as 0 | 1}>
              <a
                href={project.url ?? '#'}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded border border-line bg-surface transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent motion-reduce:hover:translate-y-0"
                aria-label={`${project.title} — ${project.description}`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden border-b border-line bg-bg-2 [background-image:repeating-linear-gradient(135deg,var(--line-soft)_0_1px,transparent_1px_14px)]">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 760px) 100vw, 50vw"
                      className="object-cover"
                    />
                  )}
                  <span className="absolute left-3.5 top-3.5 rounded-sm border border-line bg-bg px-2 py-1 font-mono text-[11px] text-faint">
                    {project.tag}
                  </span>
                  <span
                    aria-hidden
                    className="absolute right-3.5 top-3.5 grid h-[34px] w-[34px] place-items-center rounded-full border border-line bg-bg text-muted transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-accent group-hover:bg-accent group-hover:text-bg motion-reduce:group-hover:rotate-0"
                  >
                    ↗
                  </span>
                </div>

                {/* Meta */}
                <div className="px-6 pb-[26px] pt-[22px]">
                  <div className="text-[21px] font-semibold tracking-[-0.01em]">
                    {project.title}
                    <span className="float-right mt-[5px] font-mono text-xs text-faint">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-2 max-w-[42ch] text-[15px] text-muted">
                    {project.description}
                  </p>
                  <div className="mt-[18px] flex flex-wrap gap-[7px]">
                    {project.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
