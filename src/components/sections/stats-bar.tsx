"use client";

import { Landmark, Building2, MapPin, Users } from "lucide-react";
import { StatIcon } from "@/components/ui/stat-icon";
import { useResumen } from "@/hooks/use-resumen";
import { formatNumber } from "@/lib/utils";

export function StatsBar() {
  const { data } = useResumen();

  const stats = [
    {
      icon: Landmark,
      value: data ? formatNumber(data.totalDepartamentos) : "—",
      label: "Departamentos con gobernación regional en disputa",
      color: "var(--brand-red)",
    },
    {
      icon: Building2,
      value: data ? formatNumber(data.totalProvincias) : "—",
      label: "Provincias con alcaldía en disputa",
      color: "var(--brand-cyan)",
    },
    {
      icon: MapPin,
      value: data ? formatNumber(data.totalDistritos) : "—",
      label: "Distritos con alcaldía en disputa",
      color: "var(--brand-amber)",
    },
    {
      icon: Users,
      value: data ? formatNumber(data.totalOrganizaciones) : "—",
      label: "Organizaciones políticas con candidaturas inscritas",
      color: "var(--brand-violet)",
    },
  ];

  return (
    <section className="border-y border-border bg-surface-hover">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4 md:px-8">
        {stats.map((s) => (
          <div key={s.label} className="flex items-start gap-3">
            <StatIcon icon={s.icon} color={s.color} />
            <div>
              <div className="font-display text-xl font-bold text-ink md:text-2xl">{s.value}</div>
              <div className="text-xs font-medium leading-snug text-ink-soft">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
