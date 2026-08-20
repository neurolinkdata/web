import * as React from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, color = "var(--brand-cyan)" }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.15em]"
      style={{ color }}
    >
      <span className="h-[2px] w-7 rounded-full" style={{ background: color }} />
      {children}
    </div>
  );
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("font-display text-2xl font-bold leading-tight tracking-tight text-ink md:text-4xl", className)}>
      {children}
    </h2>
  );
}

export function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  eyebrowColor,
  title,
  subtitle,
  right,
}: {
  eyebrow: string;
  eyebrowColor?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
        <SectionTitle>{title}</SectionTitle>
        {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
      </div>
      {right}
    </div>
  );
}
