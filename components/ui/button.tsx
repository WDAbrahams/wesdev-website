import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button style variants restyled to the WesDev tokens — mono labels, sharp 4px
 * corners, lime accent. `accent` lifts on hover; `ghost` gains an accent border.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-mono text-[13px] font-medium rounded border cursor-pointer transition-[transform,background,color,border-color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 motion-reduce:transform-none',
  {
    variants: {
      variant: {
        accent:
          'bg-accent text-bg border-accent hover:bg-accent-dim hover:-translate-y-0.5',
        ghost:
          'bg-transparent text-text border-line hover:border-accent hover:text-accent hover:-translate-y-0.5',
      },
      size: {
        default: 'px-[18px] py-[9px]',
        lg: 'px-6 py-3 text-sm',
      },
    },
    defaultVariants: {
      variant: 'accent',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element (e.g. an anchor) instead of a `<button>`. */
  asChild?: boolean;
}

/**
 * Token-styled button. Pass `asChild` to render an `<a>` while keeping styles.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
