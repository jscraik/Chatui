import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-foundation text-body-small font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-foundation-bg-light-1 dark:focus-visible:ring-offset-foundation-bg-dark-1 aria-invalid:ring-2 aria-invalid:ring-foundation-accent-red aria-invalid:ring-offset-2 aria-invalid:ring-offset-foundation-bg-light-1 dark:aria-invalid:ring-offset-foundation-bg-dark-1",
  {
    variants: {
      variant: {
        default:
          "bg-foundation-accent-blue text-foundation-text-light-primary hover:bg-foundation-accent-blue/90",
        destructive:
          "bg-foundation-accent-red text-foundation-text-light-primary hover:bg-foundation-accent-red/90 focus-visible:ring-foundation-accent-red/50",
        outline:
          "border border-foundation-bg-light-3 bg-transparent text-foundation-text-light-primary hover:bg-foundation-bg-light-2 focus-visible:ring-foundation-accent-blue/50 dark:border-foundation-bg-dark-3 dark:text-foundation-text-dark-primary dark:hover:bg-foundation-bg-dark-3",
        secondary:
          "bg-foundation-bg-light-2 text-foundation-text-light-primary hover:bg-foundation-bg-light-3 dark:bg-foundation-bg-dark-2 dark:text-foundation-text-dark-primary dark:hover:bg-foundation-bg-dark-3",
        ghost:
          "bg-transparent text-foundation-text-light-primary hover:bg-foundation-bg-light-2 hover:text-foundation-text-light-primary dark:text-foundation-text-dark-secondary dark:hover:bg-foundation-bg-dark-3 dark:hover:text-foundation-text-dark-primary",
        link: "text-foundation-text-dark-primary underline decoration-foundation-accent-blue underline-offset-4 hover:decoration-foundation-accent-blue/70",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-caption",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4 text-body",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
