import { useQuery } from "@tanstack/react-query";
import type { OrganizacionPolitica } from "@/domain/types";
import { fetchJSON } from "@/lib/api-client";
import { queryKeys } from "./query-keys";

export function useOrganizaciones() {
  return useQuery({
    queryKey: queryKeys.organizaciones(),
    queryFn: () => fetchJSON<OrganizacionPolitica[]>("/api/organizaciones"),
    staleTime: Infinity,
  });
}
