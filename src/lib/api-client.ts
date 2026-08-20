/**
 * Fetchers usados por los hooks de TanStack Query en el cliente. Hablan
 * contra las API routes (src/app/api/**), nunca contra data-access.ts
 * directamente: así el cliente solo conoce un contrato HTTP, no la
 * implementación (hoy JSON generado desde Excel, mañana una base de datos).
 */
export async function fetchJSON<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Error ${res.status} al consultar ${input}`);
  }
  return res.json() as Promise<T>;
}
