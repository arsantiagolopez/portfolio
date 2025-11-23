import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";
import { LiquidGlass } from "./liquid-glass";

const cardVariants = cva("flex flex-col p-5 rounded-3xl shadow-sm", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      glass: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Card({
  className,
  variant,
  children,
}: ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean;
  }) {
  if (variant === "glass") {
    return (
      <LiquidGlass className={cn(cardVariants({ variant, className }))}>
        {children}
      </LiquidGlass>
    );
  }

  return (
    <div className={cn(cardVariants({ variant, className }))}>{children}</div>
  );
}
