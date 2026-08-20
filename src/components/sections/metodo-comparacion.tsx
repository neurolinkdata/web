import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { COLUMNAS_COMPARACION, FILAS_COMPARACION, VENTAJAS_PVT } from "@/domain/constants";

/**
 * Explica la PVT (Parallel Vote Tabulation / Tabulación de Votos en
 * Paralelo) frente a boca de urna y conteo rápido, campo por campo, y
 * cierra con las ventajas concretas de la variante "por cobertura" que
 * usa NeuroLink Data: sin muestreo, sin extrapolación, trazable acta por
 * acta.
 */
export function MetodoComparacion() {
  return (
    <div className="mt-14">
      <h3 className="font-display mb-1 text-lg font-bold text-ink">
        Qué es la PVT y en qué se diferencia de una encuesta
      </h3>
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-ink-soft">
        La técnica de NeuroLink Data se llama <strong className="text-ink">Tabulación de Votos en Paralelo</strong>{" "}
        (<em>Parallel Vote Tabulation</em>, PVT): un registro independiente del resultado real de cada acta,
        construido por una red de personeros que reporta mesa por mesa apenas culmina el escrutinio. No
        es una encuesta a boca de urna —no se le pregunta nada a nadie— ni un conteo rápido en el sentido
        técnico del término —no se diseña una muestra de mesas ni se proyecta el resto—: es la suma del
        dato real que efectivamente se cubrió, ni más ni menos.
      </p>

      <div className="custom-scroll -mx-1 overflow-x-auto px-1">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="w-[22%] p-0" />
              {COLUMNAS_COMPARACION.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "border-b px-4 py-3 text-left align-bottom font-display text-sm font-bold",
                    col.key === "pvt" ? "border-b-brand-red text-brand-red" : "border-b-border text-ink"
                  )}
                >
                  {col.titulo}
                  <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-widest text-ink-mute">
                    {col.subtitulo}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FILAS_COMPARACION.map((fila) => (
              <tr key={fila.campo}>
                <th
                  scope="row"
                  className="border-b border-border px-2 py-3 text-left text-xs font-bold uppercase tracking-wide text-ink-mute"
                >
                  {fila.campo}
                </th>
                {COLUMNAS_COMPARACION.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "border-b border-border px-4 py-3 align-top leading-relaxed",
                      col.key === "pvt" ? "bg-brand-red/5 font-medium text-ink" : "text-ink-soft"
                    )}
                  >
                    {fila[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-bold uppercase tracking-wide text-ink">Ventajas de la PVT por cobertura</h4>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {VENTAJAS_PVT.map((v) => (
            <Card key={v.titulo} className="p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0 text-brand-cyan" />
                <span className="text-sm font-bold text-ink">{v.titulo}</span>
              </div>
              <p className="text-xs leading-relaxed text-ink-soft">{v.detalle}</p>
            </Card>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-ink-mute">
        La cobertura real depende de cuántas mesas alcanza la red de personeros acreditados: el panel
        siempre muestra el porcentaje de actas ya registradas, para leer cada cifra junto a su respaldo.
        El proceso opera dentro del marco normativo que rige la jornada electoral: no sustituye el
        cómputo oficial, no vulnera el secreto del voto y sus resultados son de carácter referencial.
      </p>
    </div>
  );
}
