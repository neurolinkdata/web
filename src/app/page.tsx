import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/hooks/query-keys";
import { getOrganizaciones, getResumenNacional, getUbigeoTree } from "@/lib/data-access";

import { Header } from "@/components/layout/header";
import { Ticker } from "@/components/layout/ticker";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { DashboardPanel } from "@/components/sections/dashboard/dashboard-panel";
import { Cobertura } from "@/components/sections/cobertura";
import { Metodologia } from "@/components/sections/metodologia";
import { Confianza } from "@/components/sections/confianza";
import { Contacto } from "@/components/sections/contacto";

// Server Component: precarga en el servidor los datos que no dependen de
// filtros de usuario (resumen, árbol de ubigeo, organizaciones) y los
// deshidrata hacia el cliente. Los hooks de TanStack Query en los
// componentes hijos (useResumen, useUbigeoTree, useOrganizaciones) leen
// esa caché ya tibia en el primer render, sin esperar un round-trip.
export default async function Home() {
  const queryClient = makeQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: queryKeys.resumen(), queryFn: async () => getResumenNacional() }),
    queryClient.prefetchQuery({ queryKey: queryKeys.ubigeo(), queryFn: async () => getUbigeoTree() }),
    queryClient.prefetchQuery({ queryKey: queryKeys.organizaciones(), queryFn: async () => getOrganizaciones() }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <Ticker />
        <main className="flex-1">
          <Hero />
          <StatsBar />
          <DashboardPanel />
          <Cobertura />
          <Metodologia />
          <Confianza />
          <Contacto />
        </main>
        <Footer />
      </div>
    </HydrationBoundary>
  );
}
