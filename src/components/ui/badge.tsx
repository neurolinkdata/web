import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  variant?: "soft" | "solid";
}

export function Badge({ color = "var(--brand-amber)", variant = "soft", className, style, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide",
        className
      )}
      style={
        variant === "solid"
          ? { background: color, color: "var(--background)", ...style }
          : { background: `color-mix(in srgb, ${color} 15%, transparent)`, color, border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`, ...style }
      }
      {...props}
    />
  );
}
