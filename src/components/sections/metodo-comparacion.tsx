import { Scale, Sprout } from "lucide-react";
import { Card } from "@/components/ui/card";
import { COMPARACION_METODOLOGICA } from "@/domain/constants";

/**
 * Explica, campo por campo, por qué la técnica de NeuroLink Data no
 * arrastra margen de error muestral: no proyecta un resultado a partir de
 * una muestra de mesas, suma el resultado real de cada acta a medida que
 * el personero la registra.
 */
export function MetodoComparacion() {
  const { tradicional, neurolinkData } = COMPARACION_METODOLOGICA;

  return (
    <div className="mt-14">
      <h3 className="font-display mb-1 text-lg font-bold text-ink">No es una encuesta ni una proyección</h3>
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-ink-soft">
        Una encuesta a boca de urna o un conteo rápido estiman el resultado a partir de una muestra de
        mesas y cargan, por diseño, un margen de error estadístico. La técnica de NeuroLink Data es otra:
        un registro exhaustivo, mesa por mesa, del acta real apenas culmina el escrutinio — un trabajo
        minucioso que no proyecta ni infiere, y que por eso permite ensamblar el consolidado casi al
        instante conforme crece la cobertura de personeros.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border-strong">
          <div className="mb-4 flex items-center gap-2">
            <Scale size={18} className="text-ink-mute" />
            <h4 className="text-sm font-bold text-ink">{tradicional.titulo}</h4>
          </div>
          <dl className="space-y-3">
            {tradicional.filas.map((f) => (
              <div key={f.campo}>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-ink-mute">{f.campo}</dt>
                <dd className="text-sm text-ink-soft">{f.valor}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card glow="color-mix(in srgb, var(--brand-red) 22%, transparent)" className="border-brand-red/30">
          <div className="mb-4 flex items-center gap-2">
            <Sprout size={18} className="text-brand-red" />
            <h4 className="text-sm font-bold text-ink">{neurolinkData.titulo}</h4>
          </div>
          <dl className="space-y-3">
            {neurolinkData.filas.map((f) => (
              <div key={f.campo}>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-brand-red">{f.campo}</dt>
                <dd className="text-sm font-medium text-ink">{f.valor}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-mute">
        La cobertura real depende de cuántas mesas alcanza la red de personeros acreditados: el panel
        siempre muestra el porcentaje de actas ya registradas, para leer cada cifra junto a su respaldo.
        El proceso opera dentro del marco normativo que rige la jornada electoral: no sustituye el
        cómputo oficial, no vulnera el secreto del voto y sus resultados son de carácter referencial.
      </p>
    </div>
  );
}
