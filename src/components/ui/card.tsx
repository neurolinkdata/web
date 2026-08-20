import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  padded = true,
  glow,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { padded?: boolean; glow?: string }) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-surface", padded && "p-5 md:p-6", className)}
      style={{
        boxShadow: glow
          ? `0 1px 2px rgba(15,23,42,0.04), 0 20px 40px -24px ${glow}`
          : `0 1px 2px rgba(15,23,42,0.04), 0 1px 8px rgba(15,23,42,0.04)`,
      }}
      {...props}
    />
  );
}
