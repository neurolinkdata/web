"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
  animate?: boolean;
  className?: string;
}

/** Barra de magnitud (0-100). Usa Radix Progress por accesibilidad
 *  (role="progressbar", aria-valuenow) con estilos propios de marca. */
export function ProgressBar({ value, color = "var(--brand-cyan)", height = 8, animate = true, className }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <ProgressPrimitive.Root
      value={pct}
      className={cn("overflow-hidden rounded-full bg-background", className)}
      style={{ height }}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full rounded-full", animate && "bar-grow")}
        style={{
          width: `${pct}%`,
          background: color,
          boxShadow: `0 0 12px color-mix(in srgb, ${color} 55%, transparent)`,
          transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </ProgressPrimitive.Root>
  );
}
