import { cn } from '@/lib/utils';

interface SectionProps {
  /** Anchor id for smooth-scroll navigation. */
  id?: string;
  children: React.ReactNode;
  /** Extra classes applied to the `<section>` element. */
  className?: string;
  /** Extra classes applied to the inner `.wrap` container. */
  innerClassName?: string;
}

/**
 * Reusable section wrapper providing consistent vertical rhythm
 * (`padding-block: clamp(70px, 9vw, 128px)`) and the centered, gutter-padded
 * container. Reveal behavior is composed per-section via {@link Reveal}.
 */
export function Section({ id, children, className, innerClassName }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-[clamp(70px,9vw,128px)]', className)}
    >
      <div className={cn('wrap', innerClassName)}>{children}</div>
    </section>
  );
}
