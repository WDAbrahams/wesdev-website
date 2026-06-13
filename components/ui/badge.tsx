import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/** Pill badge (tech chips, tags) — mono label, 100px pill border. */
const badgeVariants = cva(
  'inline-flex items-center font-mono text-[11.5px] border px-2.5 py-1 rounded-pill',
  {
    variants: {
      variant: {
        outline: 'border-line text-muted',
        accent: 'border-accent text-accent',
      },
    },
    defaultVariants: { variant: 'outline' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/** Token-styled pill badge. */
function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
