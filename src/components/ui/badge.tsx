import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-yellow-700 dark:text-primary",
        secondary: "bg-secondary/10 text-secondary-foreground",
        accent: "bg-accent/10 text-accent-foreground",
        outline: "border border-border text-muted-foreground",
        measure: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        column: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        dax: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
