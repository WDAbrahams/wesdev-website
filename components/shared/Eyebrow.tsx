import { cn } from '@/lib/utils';

interface EyebrowProps {
  /** Label text (rendered uppercase via CSS). */
  children: React.ReactNode;
  /** Center the eyebrow (used in the Contact section). */
  centered?: boolean;
  className?: string;
}

/**
 * Mono eyebrow label with a leading accent rule — introduces every section.
 * Styling lives in the `.eyebrow` component class (see `globals.css`).
 */
export function Eyebrow({ children, centered = false, className }: EyebrowProps) {
  return (
    <span className={cn('eyebrow', centered && 'justify-center', className)}>
      {children}
    </span>
  );
}
