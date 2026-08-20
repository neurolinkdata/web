import { useQuery } from "@tanstack/react-query";
import type { UbigeoTree } from "@/domain/types";
import { fetchJSON } from "@/lib/api-client";
import { queryKeys } from "./query-keys";

export function useUbigeoTree() {
  return useQuery({
    queryKey: queryKeys.ubigeo(),
    queryFn: () => fetchJSON<UbigeoTree>("/api/ubigeo"),
    staleTime: Infinity, // el árbol de ubigeo no cambia durante la sesión
  });
}
