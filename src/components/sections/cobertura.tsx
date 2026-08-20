"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { SectionHeading } from "@/components/ui/typography";
import { useUbigeoTree } from "@/hooks/use-ubigeo";
import { formatNumber } from "@/lib/utils";

/** Intensidad secuencial (un solo hue) proporcional a cuántas candidaturas
 *  tiene inscritas cada departamento: es magnitud, no identidad, así que
 *  usa un único color en vez de una paleta categórica. */
export function Cobertura() {
  const { data: tree } = useUbigeoTree();

  const departamentos = useMemo(() => {
    if (!tree) return [];
    const max = Math.max(...tree.map((d) => d.postulaciones), 1);
    return [...tree]
      .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
      .map((d) => ({ ...d, pct: Math.round((d.postulaciones / max) * 100) }));
  }, [tree]);

  return (
    <section id="cobertura" className="border-y border-border bg-surface-hover">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeading
          eyebrow="Cobertura nacional"
          eyebrowColor="var(--brand-cyan)"
          title="25 departamentos, un mismo padrón"
          subtitle="Candidaturas inscritas por departamento, consolidadas desde el padrón de candidaturas ERM2026. A más intensidad, más organizaciones políticas compiten en ese territorio."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {departamentos.map((d) => (
            <Card key={d.slug} padded={false} className="p-3">
              <div className="mb-2 truncate text-xs font-bold text-ink">{d.nombre}</div>
              <ProgressBar value={d.pct} color="var(--series-1)" height={6} animate={false} />
              <div className="mt-2 flex justify-between font-mono text-[10px] font-medium text-ink-mute">
                <span>{d.provincias.length} provincias</span>
                <span className="font-bold text-brand-cyan">{formatNumber(d.postulaciones)}</span>
              </div>
            </Card>
          ))}
          {departamentos.length === 0 &&
            Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-surface" />
            ))}
        </div>
      </div>
    </section>
  );
}
