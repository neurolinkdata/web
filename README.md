# NeuroLink Data · ERM2026

Panel de cobertura electoral de NeuroLink Data para las Elecciones Regionales y
Municipales 2026 (Perú). Muestra qué organizaciones políticas están inscritas
y su participación por ubigeo electoral (regional, provincial o distrital),
a partir del padrón oficial de candidaturas. El día de la jornada electoral,
el mismo panel está pensado para activarse con el escrutinio reportado mesa
por mesa por los personeros — la técnica de recolección propia de NeuroLink
Data.

## Stack

| Capa | Elección | Por qué |
|---|---|---|
| Framework | **Next.js 16 (App Router, Turbopack)** | Server Components para precargar datos sin exponer un backend aparte, API routes propias, y una sola app desplegable. |
| Lenguaje | **TypeScript estricto** | El contrato entre el Excel fuente, las API routes y el cliente son tipos compartidos (`src/domain/types.ts`), no objetos sueltos. |
| Estilos | **Tailwind CSS v4** (CSS-first, `@theme`) | Tokens de marca como variables CSS, sin config JS aparte. |
| Componentes | **shadcn/ui-style + Radix UI** (`@radix-ui/react-tabs`, `@radix-ui/react-progress`, `@radix-ui/react-slot`) | Primitivas accesibles (roles ARIA, foco, teclado) con estilos propios encima. |
| Server state | **TanStack Query** | Cachea, deduplica y revalida las respuestas de las API routes; hidrata desde el servidor sin “parpadeo” inicial. |
| Client state | **Zustand** | Solo el estado de UI efímero (tipo de elección, ubigeo elegido, búsqueda) — nunca datos de servidor. |
| Datos | **Excel → JSON pre-agregado (ExcelJS)** | `resultado_datoGeneral.xlsx` se transforma en build time a JSON listo para servir; ver [Pipeline de datos](#pipeline-de-datos). |

## Arquitectura y patrones

```
scripts/build-data.ts        ETL: Excel fuente → JSON pre-agregado (build time)
src/domain/                  Tipos y constantes del dominio electoral (sin JSX, sin estado)
src/lib/
  data-access.ts             Repositorio server-only: única puerta de entrada a los datos
  api-client.ts              Fetchers del cliente contra las API routes (fetchJSON)
  query-client.ts            Factory de QueryClient (server + cliente)
  clock-store.ts             Store externo para useSyncExternalStore (reloj/cuenta regresiva)
  utils.ts                   cn(), formatNumber(), etc.
src/app/
  api/**/route.ts            API routes — el único contrato HTTP que conoce el cliente
  page.tsx                   Server Component: prefetch + dehydrate + composición de secciones
  providers.tsx               QueryClientProvider (borde cliente)
src/hooks/                   TanStack Query hooks (useResumen, useUbigeoTree, useOrganizaciones, useParticipacion)
                              + query-keys.ts (factory centralizada de keys)
src/store/dashboard-store.ts Zustand: estado de filtros del panel (UI, no servidor)
src/components/
  ui/                        Primitivas shadcn-style (Button, Card, Badge, Tabs, Progress, Input…)
  layout/                    Header, Ticker, Footer
  sections/                  Secciones de la página (Hero, StatsBar, Cobertura, Metodología…)
  sections/dashboard/        El panel interactivo: tabs, selector de ubigeo, roster de organizaciones, chart
```

Decisiones de diseño deliberadas:

- **Repository pattern (`data-access.ts`)**: es el único módulo que sabe que los
  datos vienen de un Excel. Si mañana llegan por una API del JNE o una base de
  datos propia, solo cambia este archivo — las API routes, los hooks y los
  componentes no se enteran.
- **Server state vs. client state, separados explícitamente**: TanStack Query
  gestiona todo lo que viene del backend (padrón, ubigeo, participación);
  Zustand solo gestiona qué eligió el usuario en pantalla. Mezclarlos en un
  mismo store es la fuente más común de bugs de caché en dashboards.
- **SSR + hydration**: `page.tsx` precarga `resumen`, `ubigeo` y
  `organizaciones` directamente contra `data-access.ts` (sin round-trip HTTP)
  y los deshidrata hacia el cliente con `HydrationBoundary`. Los hooks del
  cliente comparten la misma query key, así que leen la caché ya tibia en el
  primer render.
- **useSyncExternalStore para reloj y cuenta regresiva** (`clock-store.ts`):
  evita el antipatrón de `setState` síncrono dentro de un `useEffect` (renders
  en cascada) y resuelve la hidratación de forma nativa — el snapshot de
  servidor es `null`, el de cliente es la hora real, sin desajustes de HTML.
- **Sin datos inventados**: el panel de participación solo muestra lo que hay
  en el padrón. No se generan porcentajes de votación simulados — antes de la
  jornada electoral no existen, y mostrarlos podría confundirse con un
  resultado real.

## Pipeline de datos

`resultado_datoGeneral.xlsx` (hoja `datoGeneral`: `tipoEleccion`, `estadoExped`,
`estadoLista`, `departamento`, `provincia`, `distrito`, `organizacionPolitica`,
`idOrganizacionPolitica`) vive en `data/source/`. `npm run build:data` lo lee
con ExcelJS y genera en `src/data/generated/`:

- `ubigeo-tree.json` — árbol departamento → provincia → distrito, con
  postulaciones agregadas en cada nivel.
- `organizaciones.json` — cada organización política con su total de
  postulaciones a nivel nacional y su desagregado por tipo de elección.
- `resumen-nacional.json` — totales para la barra de estadísticas.
- `participacion-index.json` — índice `tipoEleccion + ubigeo → organizaciones`,
  resuelto en O(1) por la API route de participación.

Este paso corre automáticamente antes de `npm run dev` y `npm run build`
(hooks `predev` / `prebuild`), así que nunca hay que acordarse de ejecutarlo
a mano. Para actualizar el padrón, solo hay que reemplazar el Excel en
`data/source/resultado_datoGeneral.xlsx` y volver a levantar la app.

## Desarrollo

```bash
npm install
npm run dev      # regenera los datos y levanta http://localhost:3000
```

```bash
npm run build:data  # solo regenerar los JSON derivados del Excel
npm run lint         # ESLint (flat config, next/core-web-vitals + TypeScript)
npm run build         # type-check + build de producción
```

> `next/font/google` descarga las fuentes de marca (Space Grotesk, Inter,
> JetBrains Mono) durante el build — se necesita salida a internet hacia
> `fonts.googleapis.com`. Detrás de un proxy/firewall corporativo, configura
> `HTTPS_PROXY` o cambia a `next/font/local` con los archivos de fuente
> vendorizados.

## Alcance de esta iteración

Esta versión cubre la capa de visualización: organizaciones políticas y
participación por ubigeo, alimentadas por el Excel real. La captura de actas
por parte de los personeros de mesa (formulario, validación, almacenamiento)
queda fuera de este alcance y es el siguiente módulo natural a construir
sobre esta misma arquitectura — el repositorio en `data-access.ts` ya está
diseñado para aceptar una segunda fuente de datos sin tocar el resto de la app.
