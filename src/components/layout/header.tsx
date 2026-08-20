"use client";

import { useState } from "react";
import { Clock, Menu, X } from "lucide-react";
import { useClock } from "@/hooks/use-clock";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#panel", label: "Panel" },
  { href: "#metodologia", label: "Metodología" },
  { href: "#cobertura", label: "Cobertura" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const now = useClock();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="var(--surface)" stroke="var(--border-strong)" />
            <path
              d="M5 18h4l2.5-7 4 14 3-10 2 3h6.5"
              stroke="var(--brand-red)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <div className="leading-none">
            <div className="font-display text-sm font-bold tracking-tight text-ink md:text-base">
              NEUROLINK <span className="text-brand-red">DATA</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-cyan">
              ERM2026 · Encuestadora digital
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 font-mono text-xs font-medium text-brand-cyan md:flex" suppressHydrationWarning>
          <Clock size={13} />
          {now ? now.toLocaleTimeString("es-PE", { hour12: false }) : "--:--:--"}
        </div>

        <button
          className="p-2 text-ink md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-3 border-t border-border px-5 pb-4 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm font-semibold text-ink-soft"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
