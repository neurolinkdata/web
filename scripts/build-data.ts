/**
 * scripts/build-data.ts
 * ---------------------------------------------------------------------
 * Adaptador ETL: convierte data/source/resultado_datoGeneral.xlsx (el
 * padrón real de organizaciones políticas inscritas por tipo de elección
 * y ubigeo) en JSON pre-agregado que la app consume vía API routes.
 *
 * Por qué un paso de build en vez de leer el Excel en cada request:
 *  - El Excel es un insumo que cambia por publicación (no por request),
 *    así que agregarlo en build time evita parsear ~11k filas en cada
 *    llamada y deja listo el shape exacto que necesita cada endpoint.
 *  - Si el día de mañana el dato llega por API en vez de Excel, este
 *    script se reemplaza por un fetch + el mismo `buildDatasets()`;
 *    el resto del pipeline (tipos, API routes, hooks) no cambia.
 *
 * Uso: npm run build:data
 * ---------------------------------------------------------------------
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import ExcelJS from "exceljs";
import type {
  DatoGeneralRow,
  DepartamentoNode,
  OrganizacionPolitica,
  ResumenNacional,
  TipoEleccion,
  UbigeoTree,
} from "../src/domain/types";
import { TIPOS_ELECCION } from "../src/domain/types";

const ROOT = path.resolve(__dirname, "..");
const SOURCE_PATH = path.join(ROOT, "data/source/resultado_datoGeneral.xlsx");
const OUT_DIR = path.join(ROOT, "src/data/generated");

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita tildes tras normalizar a NFD
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function titleCase(value: string): string {
  return value
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

async function readRows(): Promise<DatoGeneralRow[]> {
  if (!existsSync(SOURCE_PATH)) {
    throw new Error(
      `No se encontró el Excel fuente en ${SOURCE_PATH}. ` +
        `Copia resultado_datoGeneral.xlsx dentro de data/source/ antes de ejecutar build:data.`
    );
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(SOURCE_PATH);
  const sheet = workbook.getWorksheet("datoGeneral");
  if (!sheet) {
    throw new Error('No se encontró la hoja "datoGeneral" en el Excel fuente.');
  }

  const rows: DatoGeneralRow[] = [];
  const header = (sheet.getRow(1).values as unknown[]).map((v) => String(v ?? "").trim());
  const col = (name: string) => header.indexOf(name);

  const idxTipo = col("tipoEleccion");
  const idxEstadoExped = col("estadoExped");
  const idxEstadoLista = col("estadoLista");
  const idxDepartamento = col("departamento");
  const idxProvincia = col("provincia");
  const idxDistrito = col("distrito");
  const idxOrg = col("organizacionPolitica");
  const idxOrgId = col("idOrganizacionPolitica");

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // encabezado
    const values = row.values as unknown[];
    const tipoEleccion = String(values[idxTipo] ?? "").trim() as TipoEleccion;
    if (!TIPOS_ELECCION.includes(tipoEleccion)) return; // fila vacía / inesperada

    rows.push({
      tipoEleccion,
      estadoExped: String(values[idxEstadoExped] ?? "").trim(),
      estadoLista: String(values[idxEstadoLista] ?? "").trim(),
      departamento: titleCase(String(values[idxDepartamento] ?? "").trim()),
      provincia: titleCase(String(values[idxProvincia] ?? "").trim()),
      distrito: titleCase(String(values[idxDistrito] ?? "").trim()),
      organizacionPolitica: String(values[idxOrg] ?? "").trim(),
      idOrganizacionPolitica: Number(values[idxOrgId] ?? 0),
    });
  });

  return rows;
}

function buildUbigeoTree(rows: DatoGeneralRow[]): UbigeoTree {
  const deptos = new Map<string, DepartamentoNode>();

  for (const r of rows) {
    if (!deptos.has(r.departamento)) {
      deptos.set(r.departamento, {
        nombre: r.departamento,
        slug: slugify(r.departamento),
        postulaciones: 0,
        provincias: [],
      });
    }
    const depto = deptos.get(r.departamento)!;
    depto.postulaciones++;

    let provincia = depto.provincias.find((p) => p.nombre === r.provincia);
    if (!provincia) {
      provincia = { nombre: r.provincia, slug: slugify(r.provincia), postulaciones: 0, distritos: [] };
      depto.provincias.push(provincia);
    }
    provincia.postulaciones++;

    let distrito = provincia.distritos.find((d) => d.nombre === r.distrito);
    if (!distrito) {
      distrito = { nombre: r.distrito, slug: slugify(r.distrito), postulaciones: 0 };
      provincia.distritos.push(distrito);
    }
    distrito.postulaciones++;
  }

  const tree = [...deptos.values()].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  for (const d of tree) {
    d.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    for (const p of d.provincias) {
      p.distritos.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    }
  }
  return tree;
}

function buildOrganizaciones(rows: DatoGeneralRow[]): OrganizacionPolitica[] {
  const orgs = new Map<number, OrganizacionPolitica>();

  for (const r of rows) {
    if (!orgs.has(r.idOrganizacionPolitica)) {
      orgs.set(r.idOrganizacionPolitica, {
        id: r.idOrganizacionPolitica,
        nombre: r.organizacionPolitica,
        totalPostulaciones: 0,
        porTipoEleccion: { REGIONAL: 0, "MUNICIPAL PROVINCIAL": 0, "MUNICIPAL DISTRITAL": 0 },
      });
    }
    const org = orgs.get(r.idOrganizacionPolitica)!;
    org.totalPostulaciones++;
    org.porTipoEleccion[r.tipoEleccion]++;
  }

  return [...orgs.values()].sort((a, b) => b.totalPostulaciones - a.totalPostulaciones);
}

function buildResumen(rows: DatoGeneralRow[], tree: UbigeoTree, orgs: OrganizacionPolitica[]): ResumenNacional {
  const postulacionesPorTipo: Record<TipoEleccion, number> = {
    REGIONAL: 0,
    "MUNICIPAL PROVINCIAL": 0,
    "MUNICIPAL DISTRITAL": 0,
  };
  for (const r of rows) postulacionesPorTipo[r.tipoEleccion]++;

  const totalProvincias = tree.reduce((acc, d) => acc + d.provincias.length, 0);
  const totalDistritos = tree.reduce(
    (acc, d) => acc + d.provincias.reduce((a, p) => a + p.distritos.length, 0),
    0
  );

  return {
    totalDepartamentos: tree.length,
    totalProvincias,
    totalDistritos,
    totalOrganizaciones: orgs.length,
    totalPostulaciones: rows.length,
    postulacionesPorTipo,
    generadoEn: new Date().toISOString(),
    fuente: "resultado_datoGeneral.xlsx",
  };
}

/**
 * Índice organizaciones-por-ubigeo. Se guarda "aplanado" (una entrada por
 * combinación tipoEleccion+ubigeo) para que la API route de participación
 * pueda resolver una consulta con una sola búsqueda en un Map, sin tener
 * que recorrer 11k filas en cada request.
 */
function buildParticipacionIndex(rows: DatoGeneralRow[]) {
  const index: Record<string, Array<{ id: number; nombre: string }>> = {};

  const keyFor = (r: DatoGeneralRow) => {
    if (r.tipoEleccion === "REGIONAL") return `REGIONAL::${slugify(r.departamento)}`;
    if (r.tipoEleccion === "MUNICIPAL PROVINCIAL")
      return `PROVINCIAL::${slugify(r.departamento)}::${slugify(r.provincia)}`;
    return `DISTRITAL::${slugify(r.departamento)}::${slugify(r.provincia)}::${slugify(r.distrito)}`;
  };

  for (const r of rows) {
    const key = keyFor(r);
    if (!index[key]) index[key] = [];
    index[key].push({ id: r.idOrganizacionPolitica, nombre: r.organizacionPolitica });
  }

  for (const key of Object.keys(index)) {
    index[key].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  }

  return index;
}

async function main() {
  console.log("→ Leyendo", SOURCE_PATH);
  const rows = await readRows();
  console.log(`→ ${rows.length} filas válidas leídas de la hoja "datoGeneral"`);

  const tree = buildUbigeoTree(rows);
  const orgs = buildOrganizaciones(rows);
  const resumen = buildResumen(rows, tree, orgs);
  const participacionIndex = buildParticipacionIndex(rows);

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(path.join(OUT_DIR, "ubigeo-tree.json"), JSON.stringify(tree));
  writeFileSync(path.join(OUT_DIR, "organizaciones.json"), JSON.stringify(orgs));
  writeFileSync(path.join(OUT_DIR, "resumen-nacional.json"), JSON.stringify(resumen));
  writeFileSync(path.join(OUT_DIR, "participacion-index.json"), JSON.stringify(participacionIndex));

  console.log("→ Generado en", path.relative(ROOT, OUT_DIR));
  console.log(
    `  · ${resumen.totalDepartamentos} departamentos · ${resumen.totalProvincias} provincias · ${resumen.totalDistritos} distritos`
  );
  console.log(`  · ${resumen.totalOrganizaciones} organizaciones políticas · ${resumen.totalPostulaciones} postulaciones`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
