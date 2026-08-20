import "server-only";
import type {
  OrganizacionPolitica,
  ResumenNacional,
  TipoEleccion,
  UbigeoTree,
} from "@/domain/types";
import { NIVEL_POR_TIPO_ELECCION } from "@/domain/types";

import ubigeoTree from "@/data/generated/ubigeo-tree.json";
import organizaciones from "@/data/generated/organizaciones.json";
import resumenNacional from "@/data/generated/resumen-nacional.json";
import participacionIndex from "@/data/generated/participacion-index.json";

/**
 * Capa de acceso a datos (server-only). Hoy lee JSON pre-agregado por
 * scripts/build-data.ts; el día que exista una fuente en vivo (API del
 * JNE/ONPE, base de datos propia), solo se reescriben estas funciones —
 * las API routes y todo lo que está río abajo no se entera del cambio.
 */

export function getUbigeoTree(): UbigeoTree {
  return ubigeoTree as UbigeoTree;
}

export function getOrganizaciones(): OrganizacionPolitica[] {
  return organizaciones as OrganizacionPolitica[];
}

export function getResumenNacional(): ResumenNacional {
  return resumenNacional as ResumenNacional;
}

export interface ParticipacionQuery {
  tipoEleccion: TipoEleccion;
  departamentoSlug: string;
  provinciaSlug?: string;
  distritoSlug?: string;
}

export interface ParticipacionResult {
  nivel: "REGIONAL" | "PROVINCIAL" | "DISTRITAL";
  tipoEleccion: TipoEleccion;
  departamento: string | null;
  provincia: string | null;
  distrito: string | null;
  organizaciones: Array<{ id: number; nombre: string }>;
}

/** Resuelve la participación (organizaciones inscritas) para un ubigeo puntual. */
export function getParticipacion(q: ParticipacionQuery): ParticipacionResult {
  const nivel = NIVEL_POR_TIPO_ELECCION[q.tipoEleccion];
  const index = participacionIndex as Record<string, Array<{ id: number; nombre: string }>>;

  const key =
    nivel === "REGIONAL"
      ? `REGIONAL::${q.departamentoSlug}`
      : nivel === "PROVINCIAL"
        ? `PROVINCIAL::${q.departamentoSlug}::${q.provinciaSlug ?? ""}`
        : `DISTRITAL::${q.departamentoSlug}::${q.provinciaSlug ?? ""}::${q.distritoSlug ?? ""}`;

  const tree = getUbigeoTree();
  const depto = tree.find((d) => d.slug === q.departamentoSlug);
  const provincia = depto?.provincias.find((p) => p.slug === q.provinciaSlug);
  const distrito = provincia?.distritos.find((d) => d.slug === q.distritoSlug);

  return {
    nivel,
    tipoEleccion: q.tipoEleccion,
    departamento: depto?.nombre ?? null,
    provincia: nivel !== "REGIONAL" ? (provincia?.nombre ?? null) : null,
    distrito: nivel === "DISTRITAL" ? (distrito?.nombre ?? null) : null,
    organizaciones: index[key] ?? [],
  };
}
