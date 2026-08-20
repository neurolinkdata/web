import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Eyebrow, SectionTitle } from "@/components/ui/typography";
import { FICHA_TECNICA } from "@/domain/constants";

const PUNTOS = [
  "Cada acta es reportada por el personero de mesa al cierre del escrutinio, mesa por mesa",
  "El registro se organiza por tipo de elección: regional, provincial y distrital",
  "El padrón de organizaciones políticas y su participación por ubigeo se valida contra las candidaturas publicadas por el JNE",
];

export function Metodologia() {
  return (
    <section id="metodologia" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="grid gap-14 md:grid-cols-2">
        <div>
          <Eyebrow color="var(--brand-red)">Metodología</Eyebrow>
          <SectionTitle>Cómo construimos cada cifra</SectionTitle>
          <p className="my-5 text-sm leading-relaxed text-ink-soft md:text-base">
            La técnica de NeuroLink Data es la recolección del escrutinio por mesa de sufragio y por tipo
            de elección al cierre de la votación, registrado por los mismos personeros de mesa. Ese
            registro se agrega en tiempo real el día de la jornada electoral. Antes de esa fecha, el
            panel muestra el padrón de organizaciones políticas y su participación por ubigeo
            electoral (regional, provincial o distrital), construido a partir de las candidaturas
            publicadas por el JNE.
          </p>
          <ul className="space-y-3">
            {PUNTOS.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm font-medium text-ink-soft">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand-cyan" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {FICHA_TECNICA.map((f) => (
            <Card key={f.label} className="p-4">
              <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-cyan">{f.label}</div>
              <div className="text-sm font-semibold text-ink">{f.value}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
