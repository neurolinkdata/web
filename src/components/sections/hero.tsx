"use client";

import { useMemo } from "react";
import { ArrowRight, Radio } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";
import { SourceBadge } from "@/components/ui/source-badge";
import { ProgressBar } from "@/components/ui/progress";
import { useCountdown } from "@/hooks/use-countdown";
import { useUbigeoTree } from "@/hooks/use-ubigeo";
import { pad } from "@/lib/utils";

const ELECTION_DAY = new Date("2026-10-04T08:00:00-05:00");

export function Hero() {
  const cd = useCountdown(ELECTION_DAY);
  const { data: tree } = useUbigeoTree();

  const topDepartamentos = useMemo(() => {
    if (!tree) return [];
    const sorted = [...tree].sort((a, b) => b.postulaciones - a.postulaciones).slice(0, 4);
    const max = sorted[0]?.postulaciones ?? 1;
    return sorted.map((d) => ({ ...d, pct: Math.round((d.postulaciones / max) * 100) }));
  }, [tree]);

  const units = [
    { v: cd.days, l: "días" },
    { v: cd.hours, l: "horas" },
    { v: cd.minutes, l: "min" },
    { v: cd.seconds, l: "seg" },
  ];

  return (
    <section id="inicio" className="relative overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-[560px] w-[560px] rounded-full"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--brand-red) 24%, transparent) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute top-52 -left-40 h-[460px] w-[460px] rounded-full"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--brand-cyan) 19%, transparent) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <Eyebrow color="var(--brand-cyan)">Elecciones Regionales y Municipales · Perú</Eyebrow>
          <h1 className="font-display mb-6 text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
            Conteo instantáneo.
            <br />
            <span className="text-brand-red">Resultados en tiempo real.</span>
          </h1>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            NeuroLink Data monitorea la jornada electoral ERM2026 región por región, con
            actualización continua y trazabilidad de cada acta procesada apenas se escrutan los
            votos en la mesa de sufragio. Un solo panel para seguir gobernaciones regionales y
            alcaldías en todo el país.
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#panel">
                Ver panel de participación <ArrowRight size={16} />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="#metodologia">Cómo trabajamos</a>
            </Button>
          </div>

          <div>
            <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-amber">
              {cd.done
                ? "Jornada electoral en curso"
                : "Faltan para la jornada electoral · 4 de octubre de 2026"}
            </div>
            <div className="flex gap-3 md:gap-4" suppressHydrationWarning>
              {units.map((u) => (
                <div
                  key={u.l}
                  className="min-w-[68px] rounded-md border border-border-strong bg-surface px-3 py-2.5 text-center md:px-4 md:py-3"
                >
                  <div className="font-mono text-2xl font-bold tabular-nums text-ink md:text-3xl">
                    {pad(u.v)}
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-wide text-ink-mute">{u.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card glow="color-mix(in srgb, var(--brand-red) 25%, transparent)">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-ink">
              <Radio size={16} className="text-brand-red" />
              Departamentos con más candidaturas inscritas
            </div>
            <SourceBadge />
          </div>

          <div className="space-y-4">
            {topDepartamentos.map((d) => (
              <div key={d.slug}>
                <div className="mb-1.5 flex justify-between text-sm font-medium text-ink-soft">
                  <span>{d.nombre}</span>
                  <span className="font-mono font-bold text-brand-cyan">{d.postulaciones}</span>
                </div>
                <ProgressBar value={d.pct} color="var(--series-1)" />
              </div>
            ))}
            {topDepartamentos.length === 0 && (
              <div className="h-24 animate-pulse rounded-md bg-surface-hover" />
            )}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4 font-mono text-xs font-medium text-ink-mute">
            <span>Candidaturas inscritas a nivel nacional</span>
            <span className="font-bold text-brand-cyan">
              {tree ? tree.reduce((acc, d) => acc + d.postulaciones, 0).toLocaleString("es-PE") : "…"}
            </span>
          </div>
        </Card>
      </div>
    </section>
  );
}
