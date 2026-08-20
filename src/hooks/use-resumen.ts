import { useQuery } from "@tanstack/react-query";
import type { ResumenNacional } from "@/domain/types";
import { fetchJSON } from "@/lib/api-client";
import { queryKeys } from "./query-keys";

export function useResumen() {
  return useQuery({
    queryKey: queryKeys.resumen(),
    queryFn: () => fetchJSON<ResumenNacional>("/api/resumen"),
  });
}
