import type { TipoEleccion } from "./types";

/** Etiqueta legible para cada tipo de elección del padrón. */
export const TIPO_ELECCION_LABEL: Record<TipoEleccion, string> = {
  REGIONAL: "Gobernación regional",
  "MUNICIPAL PROVINCIAL": "Alcaldía provincial",
  "MUNICIPAL DISTRITAL": "Alcaldía distrital",
};

/** Etiqueta corta, usada en tabs y filtros. */
export const TIPO_ELECCION_TAB_LABEL: Record<TipoEleccion, string> = {
  REGIONAL: "Regional",
  "MUNICIPAL PROVINCIAL": "Provincial",
  "MUNICIPAL DISTRITAL": "Distrital",
};

export const FICHA_TECNICA = [
  { label: "Naturaleza del dato", value: "Tabulación de Votos en Paralelo (PVT) por cobertura — no es encuesta ni proyección muestral" },
  { label: "Técnica de recolección", value: "Acta de cada mesa, reportada por el propio personero al culminar el escrutinio" },
  { label: "Unidad de registro", value: "Mesa de sufragio, por tipo de elección" },
  { label: "Fuente del padrón", value: "Información de Portales Públicos" },
  { label: "Cobertura del padrón", value: "25 departamentos · 221 provincias · 1,917 distritos" },
  { label: "Activación del conteo en vivo", value: "4 de octubre de 2026, al cierre de cada mesa" },
];

/**
 * Comparación metodológica entre los tres mecanismos con los que suele
 * confundirse la PVT (Parallel Vote Tabulation / Tabulación de Votos en
 * Paralelo). Cada fila responde la misma pregunta para los tres métodos,
 * para que la diferencia se lea de un vistazo: qué mide, de dónde sale el
 * dato, si muestrea o extrapola, si carga margen de error y cuándo está
 * disponible.
 */
export const COLUMNAS_COMPARACION = [
  { key: "bocaDeUrna", titulo: "Boca de urna", subtitulo: "Encuesta de salida" },
  { key: "conteoRapido", titulo: "Conteo rápido", subtitulo: "Proyección muestral" },
  { key: "pvt", titulo: "PVT — NeuroLink Data", subtitulo: "Tabulación por cobertura" },
] as const;

export const FILAS_COMPARACION = [
  {
    campo: "Qué mide",
    bocaDeUrna: "La intención de voto que declara el elector al salir del local",
    conteoRapido: "El resultado ya escrutado, leído en una muestra de mesas",
    pvt: "El resultado real de cada acta cubierta por la red de personeros",
  },
  {
    campo: "Fuente del dato",
    bocaDeUrna: "Respuesta verbal del votante",
    conteoRapido: "Actas reales, pero de un subconjunto de mesas",
    pvt: "Acta real de la mesa, registrada por el personero al cierre",
  },
  {
    campo: "¿Muestrea o extrapola?",
    bocaDeUrna: "Sí — muestra de electores, proyectada al universo",
    conteoRapido: "Sí — muestra de mesas, proyectada al 100%",
    pvt: "No — se suma cada acta que llega, sin seleccionar ni extrapolar",
  },
  {
    campo: "Margen de error",
    bocaDeUrna: "Sí, propio de toda encuesta de opinión",
    conteoRapido: "Sí, conservador, propio de la proyección",
    pvt: "No aplica un margen muestral: es cobertura real, mostrada como tal",
  },
  {
    campo: "Disponibilidad",
    bocaDeUrna: "Desde el cierre de la votación, como proyección",
    conteoRapido: "Un par de horas después del cierre, como proyección",
    pvt: "Cada acta se integra al consolidado apenas el personero la registra",
  },
] as const;

export const VENTAJAS_PVT = [
  {
    titulo: "Sin sesgo de respuesta",
    detalle: "No depende de que el elector recuerde o esté dispuesto a decir por quién votó: usa el dato ya escrutado en el acta, no una declaración.",
  },
  {
    titulo: "Sin margen de error muestral",
    detalle: "No hay estimación que administrar: el número que se muestra es exactamente lo cubierto, con el porcentaje de cobertura siempre visible junto a la cifra.",
  },
  {
    titulo: "Trazable acta por acta",
    detalle: "Cada cifra del consolidado es reconducible a la mesa y al personero que la registró — no es una caja negra estadística.",
  },
  {
    titulo: "Disponible el mismo día",
    detalle: "El consolidado crece apenas culmina el escrutinio en cada mesa, sin esperar cortes de reporte ni el cómputo oficial, que avanza por lotes en los días siguientes.",
  },
  {
    titulo: "Gana precisión con cobertura real",
    detalle: "A más mesas reportadas, el consolidado se acerca más al resultado final — no por inferencia estadística, sino porque efectivamente se sumó más dato real.",
  },
];

/**
 * Control de calidad aplicado a cada registro de escrutinio, antes de
 * integrarse al consolidado. No es un filtro estadístico sobre una
 * muestra: son validaciones sobre el dato real de cada mesa.
 */
export const CONTROL_CALIDAD = [
  {
    titulo: "Reglas de negocio del acta",
    detalle: "Cada registro se valida contra la estructura del acta electoral: blancos, nulos, votos válidos y el total de votos emitidos deben cuadrar antes de integrarse al consolidado.",
  },
  {
    titulo: "Discriminación de valores atípicos",
    detalle: "Una cifra que se aparta del patrón esperado para su mesa queda marcada y separada para revisión, en vez de sumarse al consolidado sin control.",
  },
  {
    titulo: "Consenso de mayoría",
    detalle: "Cuando más de una fuente reporta la misma mesa, se integra el resultado que coincide entre la mayoría de los reportes, y se documenta la diferencia si no hay coincidencia.",
  },
];
