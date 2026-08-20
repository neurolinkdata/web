"use client";

import { useState, type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/query-client";

/**
 * QueryClientProvider en el borde cliente/servidor.
 *
 * `useState(() => makeQueryClient())` garantiza una única instancia por
 * montaje del árbol de React en el navegador (no se recrea en cada
 * render), evitando perder la caché hidratada desde el servidor.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
