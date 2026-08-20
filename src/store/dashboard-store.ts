import { create } from "zustand";
import type { TipoEleccion } from "@/domain/types";

/**
 * Estado de UI del panel de resultados (filtros de navegación).
 *
 * Deliberadamente NO vive aquí ningún dato traído del servidor
 * (organizaciones, árbol de ubigeo, participación): eso es "server state"
 * y lo gestiona TanStack Query (ver src/hooks). Zustand solo guarda qué
 * está eligiendo el usuario en este momento — estado de cliente, efímero,
 * que no necesita caché, revalidación ni sincronización con el backend.
 */
interface DashboardState {
  tipoEleccion: TipoEleccion;
  departamentoSlug: string;
  provinciaSlug: string | null;
  distritoSlug: string | null;
  query: string;

  setTipoEleccion: (tipo: TipoEleccion) => void;
  setDepartamento: (slug: string) => void;
  setProvincia: (slug: string | null) => void;
  setDistrito: (slug: string | null) => void;
  setQuery: (q: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  tipoEleccion: "REGIONAL",
  departamentoSlug: "lima",
  provinciaSlug: null,
  distritoSlug: null,
  query: "",

  setTipoEleccion: (tipoEleccion) =>
    set({ tipoEleccion, provinciaSlug: null, distritoSlug: null }),
  setDepartamento: (departamentoSlug) =>
    set({ departamentoSlug, provinciaSlug: null, distritoSlug: null }),
  setProvincia: (provinciaSlug) => set({ provinciaSlug, distritoSlug: null }),
  setDistrito: (distritoSlug) => set({ distritoSlug }),
  setQuery: (query) => set({ query }),
}));
