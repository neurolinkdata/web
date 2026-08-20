import { QueryClient, defaultShouldDehydrateQuery } from "@tanstack/react-query";

/**
 * Factory de QueryClient compartida entre servidor y cliente.
 *
 * - En el servidor (Server Components) se crea uno nuevo por request:
 *   evita que datos de un usuario terminen en la caché de otro.
 * - En el cliente se reutiliza una única instancia (ver query-provider.tsx)
 *   para que la navegación entre secciones no vuelva a pedir datos que
 *   ya están en caché.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // El padrón de organizaciones políticas es estático durante la
        // sesión (se regenera por build, no por request), así que no
        // tiene sentido revalidarlo agresivamente en el cliente.
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}
