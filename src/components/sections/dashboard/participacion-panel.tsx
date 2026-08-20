"use client";

import { Building2, ListChecks, Vote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useParticipacion } from "@/hooks/use-participacion";
import { useDashboardStore } from "@/store/dashboard-store";
import { NIVEL_POR_TIPO_ELECCION } from "@/domain/types";
import { TIPO_ELECCION_LABEL } from "@/domain/constants";
import { formatNumber } from "@/lib/utils";

const SERIES = [
  "var(--series-1)",
  "var(--series-2)",
  "var(--series-3)",
  "var(--series-4)",
  "var(--series-5)",
  "var(--series-6)",
  "var(--series-7)",
  "var(--series-8)",
];

const FALTA_SELECCION_TEXT = {
  PROVINCIAL: "una provincia",
  DISTRITAL: "una provincia y un distrito",
} as const;

export function ParticipacionPanel() {
  const tipoEleccion = useDashboardStore((s) => s.tipoEleccion);
  const provinciaSlug = useDashboardStore((s) => s.provinciaSlug);
  const distritoSlug = useDashboardStore((s) => s.distritoSlug);
  const { data, isLoading, isError, error } = useParticipacion();

  const nivel = NIVEL_POR_TIPO_ELECCION[tipoEleccion];
  const faltaSeleccion =
    (nivel === "PROVINCIAL" && !provinciaSlug) || (nivel === "DISTRITAL" && !(provinciaSlug && distritoSlug));
  const ubicacion = data ? [data.departamento, data.provincia, data.distrito].filter(Boolean).join(" · ") : "";

  return (
    <Card>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-ink-mute">
            {data ? `Elección ${TIPO_ELECCION_LABEL[tipoEleccion]}` : "Participación por ubigeo"}
          </div>
          <h3 className="font-display text-xl font-bold text-ink">{ubicacion || "Selecciona un ubigeo"}</h3>
        </div>
        {data && (
          <div className="text-right">
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-ink-mute">
              Organizaciones inscritas
            </div>
            <div className="font-mono text-lg font-bold text-brand-cyan">{formatNumber(data.organizaciones.length)}</div>
          </div>
        )}
      </div>

      {faltaSeleccion && (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <Vote size={26} className="text-brand-red" />
          <p className="text-sm font-medium text-ink-soft">
            Elige <strong className="text-ink">{FALTA_SELECCION_TEXT[nivel as "PROVINCIAL" | "DISTRITAL"]}</strong> en
            el panel de la izquierda para ver las organizaciones políticas que compiten ahí.
          </p>
        </div>
      )}

      {!faltaSeleccion && isLoading && (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 animate-pulse rounded-md bg-surface-hover" />
          ))}
        </div>
      )}

      {!faltaSeleccion && isError && (
        <p className="rounded-md border border-brand-red/40 bg-brand-red/10 p-4 text-sm text-brand-red-dim">
          No se pudo cargar la participación: {error instanceof Error ? error.message : "error desconocido"}.
        </p>
      )}

      {!faltaSeleccion && data && data.organizaciones.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <Building2 size={26} className="text-ink-mute" />
          <p className="text-sm font-medium text-ink-soft">
            No hay organizaciones políticas inscritas para esta elección en el ubigeo seleccionado.
          </p>
        </div>
      )}

      {!faltaSeleccion && data && data.organizaciones.length > 0 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {data.organizaciones.map((org, i) => (
            <div key={org.id} className="flex items-center gap-2.5 rounded-md border border-border px-3 py-2.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: SERIES[i % SERIES.length] }} />
              <span className="truncate text-sm font-medium text-ink" title={org.nombre}>
                {org.nombre}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs font-medium text-ink-mute">
        <ListChecks size={14} className="text-brand-cyan" />
        Fuente: Información de Portales Públicos.
      </div>
    </Card>
  );
}
