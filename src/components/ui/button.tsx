import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.14)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 disabled:pointer-events-none disabled:opacity-60 disabled:transform-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-primary text-white hover:bg-emerald-600 dark:hover:bg-emerald-500",
        secondary:
          "bg-transparent border border-slate-200 text-slate-900 hover:border-brand-primary hover:bg-emerald-50/70 hover:text-brand-primary dark:border-slate-700 dark:text-slate-100 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300",
        ghost:
          "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-12 px-6",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
