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
  { label: "Fuente del padrón", value: "resultado_datoGeneral.xlsx — JNE, ERM2026" },
  { label: "Técnica de recolección", value: "Actas de mesa reportadas por los propios personeros al cierre del escrutinio" },
  { label: "Unidad de registro", value: "Mesa de sufragio, por tipo de elección" },
  { label: "Cobertura del padrón", value: "25 departamentos · 221 provincias · 1,917 distritos" },
  { label: "Activación del conteo en vivo", value: "4 de octubre de 2026, cierre de la jornada electoral" },
  { label: "Frecuencia de actualización", value: "Continua durante la jornada electoral" },
];
