import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-slate-200/60 bg-white/90 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/70",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };
