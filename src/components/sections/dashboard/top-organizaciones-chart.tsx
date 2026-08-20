"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useOrganizaciones } from "@/hooks/use-organizaciones";
import { formatNumber } from "@/lib/utils";

const TOP_N = 8;

/** Serie única (magnitud): cuántas candidaturas presenta cada organización
 *  política a nivel nacional. Un solo color porque es un único indicador
 *  comparado entre categorías, no varias series por punto. */
export function TopOrganizacionesChart() {
  const { data: organizaciones, isLoading } = useOrganizaciones();

  const top = useMemo(() => {
    if (!organizaciones) return [];
    return organizaciones.slice(0, TOP_N).map((o) => ({
      nombre: o.nombre.length > 28 ? `${o.nombre.slice(0, 26)}…` : o.nombre,
      nombreCompleto: o.nombre,
      postulaciones: o.totalPostulaciones,
    }));
  }, [organizaciones]);

  return (
    <Card className="mt-6">
      <div className="mb-1 flex items-center gap-2">
        <BarChart3 size={17} className="text-brand-red" />
        <h4 className="text-sm font-bold uppercase tracking-wide text-ink">
          Organizaciones políticas con más candidaturas inscritas
        </h4>
      </div>
      <p className="mb-4 text-xs font-medium text-ink-mute">
        Total de postulaciones a nivel nacional (regional + provincial + distrital), padrón de candidaturas ERM2026.
      </p>
      <div className="h-80">
        {isLoading || top.length === 0 ? (
          <div className="h-full animate-pulse rounded-md bg-surface-hover" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={top} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "var(--text-secondary)", fontSize: 11 }} axisLine={{ stroke: "var(--chart-axis)" }} tickLine={false} />
              <YAxis
                dataKey="nombre"
                type="category"
                width={190}
                tick={{ fill: "var(--text-secondary)", fontSize: 11, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(15,23,42,0.04)" }}
                contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }}
                labelStyle={{ color: "var(--text-primary)", fontWeight: 700 }}
                formatter={(value) => [formatNumber(Number(value ?? 0)), "Postulaciones"]}
                labelFormatter={(_, payload) => payload?.[0]?.payload?.nombreCompleto ?? ""}
              />
              <Bar dataKey="postulaciones" fill="var(--series-1)" radius={[0, 4, 4, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
