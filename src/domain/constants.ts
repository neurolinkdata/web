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
  { label: "Naturaleza del dato", value: "Registro directo de actas — no una encuesta ni una proyección por muestreo" },
  { label: "Técnica de recolección", value: "Acta de cada mesa, reportada por el propio personero al culminar el escrutinio" },
  { label: "Unidad de registro", value: "Mesa de sufragio, por tipo de elección" },
  { label: "Fuente del padrón", value: "resultado_datoGeneral.xlsx — candidaturas ERM2026 publicadas por el JNE" },
  { label: "Cobertura del padrón", value: "25 departamentos · 221 provincias · 1,917 distritos" },
  { label: "Activación del conteo en vivo", value: "4 de octubre de 2026, al cierre de cada mesa" },
];

/**
 * Comparación metodológica: cómo se obtiene el dato en cada enfoque.
 * No es una tabla de resultados — es la explicación de por qué la técnica
 * de NeuroLink Data no está sujeta a margen de error muestral.
 */
export const COMPARACION_METODOLOGICA = {
  tradicional: {
    titulo: "Encuesta a boca de urna / conteo rápido",
    filas: [
      { campo: "Método", valor: "Proyección estadística calculada sobre una muestra de mesas" },
      { campo: "Cobertura", valor: "Un conjunto de mesas seleccionadas para representar al universo" },
      { campo: "Margen de error", valor: "Sí — inherente a toda estimación por muestreo" },
      { campo: "Disponibilidad", valor: "Minutos u horas después del cierre, como estimación" },
    ],
  },
  neurolinkData: {
    titulo: "NeuroLink Data",
    filas: [
      { campo: "Método", valor: "Registro directo del acta, mesa por mesa, sin muestreo ni proyección" },
      { campo: "Cobertura", valor: "Todas las mesas alcanzadas por la red de personeros, sumadas una por una" },
      { campo: "Margen de error", valor: "No aplica un margen muestral: es la suma de actas reales" },
      { campo: "Disponibilidad", valor: "Cada acta se suma al consolidado apenas el personero la registra" },
    ],
  },
};
