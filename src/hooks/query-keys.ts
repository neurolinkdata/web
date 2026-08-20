import type { TipoEleccion } from "@/domain/types";

/**
 * Factory de query keys centralizada (patrón recomendado por TanStack
 * Query): evita strings mágicos repetidos y hace explícitas las
 * dependencias de cada consulta para la invalidación de caché.
 */
export const queryKeys = {
  resumen: () => ["resumen-nacional"] as const,
  ubigeo: () => ["ubigeo-tree"] as const,
  organizaciones: () => ["organizaciones"] as const,
  participacion: (params: {
    tipoEleccion: TipoEleccion;
    departamentoSlug: string;
    provinciaSlug: string | null;
    distritoSlug: string | null;
  }) =>
    [
      "participacion",
      params.tipoEleccion,
      params.departamentoSlug,
      params.provinciaSlug,
      params.distritoSlug,
    ] as const,
};
