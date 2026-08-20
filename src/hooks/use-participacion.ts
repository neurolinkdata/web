import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "@/lib/api-client";
import { queryKeys } from "./query-keys";
import { useDashboardStore } from "@/store/dashboard-store";
import type { ParticipacionResult } from "@/lib/data-access";
import { NIVEL_POR_TIPO_ELECCION } from "@/domain/types";

/**
 * Trae las organizaciones políticas inscritas para el ubigeo + tipo de
 * elección actualmente seleccionados en el store de UI (Zustand).
 * Es la unión entre "estado de cliente" (qué filtro eligió el usuario)
 * y "estado de servidor" (qué organizaciones responde el backend).
 */
export function useParticipacion() {
  const tipoEleccion = useDashboardStore((s) => s.tipoEleccion);
  const departamentoSlug = useDashboardStore((s) => s.departamentoSlug);
  const provinciaSlug = useDashboardStore((s) => s.provinciaSlug);
  const distritoSlug = useDashboardStore((s) => s.distritoSlug);

  const params = { tipoEleccion, departamentoSlug, provinciaSlug, distritoSlug };
  const nivel = NIVEL_POR_TIPO_ELECCION[tipoEleccion];

  // Una elección distrital necesita provincia + distrito resueltos antes de
  // que la consulta tenga sentido; disparar el fetch antes solo generaría
  // una respuesta vacía y una llamada de red desperdiciada.
  const ready =
    nivel === "REGIONAL"
      ? Boolean(departamentoSlug)
      : nivel === "PROVINCIAL"
        ? Boolean(departamentoSlug && provinciaSlug)
        : Boolean(departamentoSlug && provinciaSlug && distritoSlug);

  return useQuery({
    queryKey: queryKeys.participacion(params),
    queryFn: () => {
      const search = new URLSearchParams({ tipoEleccion, departamento: departamentoSlug });
      if (provinciaSlug) search.set("provincia", provinciaSlug);
      if (distritoSlug) search.set("distrito", distritoSlug);
      return fetchJSON<ParticipacionResult>(`/api/participacion?${search.toString()}`);
    },
    enabled: ready,
  });
}
