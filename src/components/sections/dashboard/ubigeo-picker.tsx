"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUbigeoTree } from "@/hooks/use-ubigeo";
import { useDashboardStore } from "@/store/dashboard-store";
import { NIVEL_POR_TIPO_ELECCION } from "@/domain/types";
import { cn, formatNumber } from "@/lib/utils";

interface Row {
  slug: string;
  nombre: string;
  postulaciones: number;
}

/** Lista buscable de una tira de ubigeo (departamentos, provincias o
 *  distritos), con selección resaltada y conteo real de postulaciones. */
function UbigeoLevelList({
  title,
  rows,
  activeSlug,
  onPick,
  placeholder,
  emptyHint,
}: {
  title: string;
  rows: Row[] | null;
  activeSlug: string | null;
  onPick: (slug: string) => void;
  placeholder: string;
  emptyHint?: string;
}) {
  const [query, setQuery] = useState("");
  const filtered = (rows ?? []).filter((r) => r.nombre.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="border-b border-border last:border-b-0">
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ink-mute">{title}</span>
      </div>
      {rows === null ? (
        <p className="px-4 py-4 text-xs text-ink-mute">{emptyHint}</p>
      ) : (
        <>
          <div className="p-3 pt-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} className="py-2 pl-8 text-xs" />
            </div>
          </div>
          <div className="custom-scroll max-h-40 overflow-y-auto">
            {filtered.map((r) => (
              <button
                key={r.slug}
                onClick={() => onPick(r.slug)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 border-l-[3px] border-transparent px-4 py-2 text-left transition-colors",
                  r.slug === activeSlug && "border-l-brand-red bg-surface-hover"
                )}
              >
                <span className={cn("truncate text-sm font-medium", r.slug === activeSlug ? "text-ink" : "text-ink-soft")}>
                  {r.nombre}
                </span>
                <span className="shrink-0 font-mono text-xs font-bold text-brand-cyan">{formatNumber(r.postulaciones)}</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="px-4 py-3 text-xs text-ink-mute">Sin resultados.</p>}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Navegador de ubigeo: departamento → provincia → distrito, acotado al
 * nivel que corresponde al tipo de elección activo (una gobernación
 * regional se disputa por departamento; una alcaldía distrital, por
 * distrito). Los conteos de cada fila son postulaciones reales del
 * padrón, no un valor de ejemplo.
 */
export function UbigeoPicker() {
  const { data: tree } = useUbigeoTree();

  const tipoEleccion = useDashboardStore((s) => s.tipoEleccion);
  const departamentoSlug = useDashboardStore((s) => s.departamentoSlug);
  const provinciaSlug = useDashboardStore((s) => s.provinciaSlug);
  const distritoSlug = useDashboardStore((s) => s.distritoSlug);
  const setDepartamento = useDashboardStore((s) => s.setDepartamento);
  const setProvincia = useDashboardStore((s) => s.setProvincia);
  const setDistrito = useDashboardStore((s) => s.setDistrito);

  const nivel = NIVEL_POR_TIPO_ELECCION[tipoEleccion];

  const departamento = useMemo(() => tree?.find((d) => d.slug === departamentoSlug) ?? null, [tree, departamentoSlug]);
  const provincia = useMemo(
    () => departamento?.provincias.find((p) => p.slug === provinciaSlug) ?? null,
    [departamento, provinciaSlug]
  );

  const departamentoRows: Row[] | null = tree ? tree.map((d) => ({ slug: d.slug, nombre: d.nombre, postulaciones: d.postulaciones })) : null;
  const provinciaRows: Row[] | null = departamento
    ? departamento.provincias.map((p) => ({ slug: p.slug, nombre: p.nombre, postulaciones: p.postulaciones }))
    : null;
  const distritoRows: Row[] | null = provincia
    ? provincia.distritos.map((d) => ({ slug: d.slug, nombre: d.nombre, postulaciones: d.postulaciones }))
    : null;

  return (
    <Card padded={false}>
      <UbigeoLevelList
        title="Departamento"
        rows={departamentoRows}
        activeSlug={departamentoSlug}
        onPick={setDepartamento}
        placeholder="Buscar departamento…"
      />
      {nivel !== "REGIONAL" && (
        <UbigeoLevelList
          title="Provincia"
          rows={provinciaRows}
          activeSlug={provinciaSlug}
          onPick={setProvincia}
          placeholder="Buscar provincia…"
        />
      )}
      {nivel === "DISTRITAL" && (
        <UbigeoLevelList
          title="Distrito"
          rows={distritoRows}
          activeSlug={distritoSlug}
          onPick={setDistrito}
          placeholder="Buscar distrito…"
          emptyHint="Elige una provincia para ver sus distritos."
        />
      )}
    </Card>
  );
}
