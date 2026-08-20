/**
 * Capa de dominio — tipos compartidos entre el script de preparación de
 * datos (scripts/build-data.ts), las API routes y el cliente.
 *
 * Estos tipos son el "contrato" entre el Excel fuente (resultado_datoGeneral.xlsx)
 * y todo lo que consume esos datos. Si mañana el dato deja de venir de un
 * Excel y pasa a venir de una API del JNE/ONPE, solo cambia el adaptador en
 * scripts/build-data.ts (o su equivalente en runtime): el resto de la app
 * sigue funcionando porque habla contra estos mismos tipos.
 */

/** Tipos de elección presentes en el padrón de organizaciones políticas. */
export type TipoEleccion = "REGIONAL" | "MUNICIPAL PROVINCIAL" | "MUNICIPAL DISTRITAL";

export const TIPOS_ELECCION: TipoEleccion[] = [
  "REGIONAL",
  "MUNICIPAL PROVINCIAL",
  "MUNICIPAL DISTRITAL",
];

/** Nivel de ubigeo electoral sobre el que se agrupa la participación. */
export type NivelUbigeo = "REGIONAL" | "PROVINCIAL" | "DISTRITAL";

/** Mapea cada tipo de elección al nivel de ubigeo que le corresponde. */
export const NIVEL_POR_TIPO_ELECCION: Record<TipoEleccion, NivelUbigeo> = {
  REGIONAL: "REGIONAL",
  "MUNICIPAL PROVINCIAL": "PROVINCIAL",
  "MUNICIPAL DISTRITAL": "DISTRITAL",
};

/** Fila cruda tal como aparece en la hoja `datoGeneral` del Excel fuente. */
export interface DatoGeneralRow {
  tipoEleccion: TipoEleccion;
  estadoExped: string;
  estadoLista: string;
  departamento: string;
  provincia: string;
  distrito: string;
  organizacionPolitica: string;
  idOrganizacionPolitica: number;
}

/** Organización política participante, agregada a nivel nacional. */
export interface OrganizacionPolitica {
  id: number;
  nombre: string;
  totalPostulaciones: number;
  porTipoEleccion: Record<TipoEleccion, number>;
}

/** Nodo distrital dentro del árbol de ubigeo. */
export interface DistritoNode {
  nombre: string;
  slug: string;
  postulaciones: number;
}

/** Nodo provincial dentro del árbol de ubigeo. */
export interface ProvinciaNode {
  nombre: string;
  slug: string;
  postulaciones: number;
  distritos: DistritoNode[];
}

/** Nodo departamental (región) dentro del árbol de ubigeo. */
export interface DepartamentoNode {
  nombre: string;
  slug: string;
  postulaciones: number;
  provincias: ProvinciaNode[];
}

/** Árbol completo departamento → provincia → distrito. */
export type UbigeoTree = DepartamentoNode[];

/** Participación (organizaciones políticas inscritas) para un ubigeo puntual. */
export interface ParticipacionUbigeo {
  nivel: NivelUbigeo;
  tipoEleccion: TipoEleccion;
  departamento: string;
  provincia: string | null;
  distrito: string | null;
  organizaciones: Array<{
    id: number;
    nombre: string;
  }>;
}

/** Resumen nacional: totales para la barra de estadísticas y la ficha técnica. */
export interface ResumenNacional {
  totalDepartamentos: number;
  totalProvincias: number;
  totalDistritos: number;
  totalOrganizaciones: number;
  totalPostulaciones: number;
  postulacionesPorTipo: Record<TipoEleccion, number>;
  generadoEn: string;
  fuente: string;
}
