import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Eyebrow, SectionTitle } from "@/components/ui/typography";
import { FICHA_TECNICA } from "@/domain/constants";
import { MetodoComparacion } from "./metodo-comparacion";

const PUNTOS = [
  "Cada acta es reportada por el personero de mesa al culminar el escrutinio, mesa por mesa",
  "No es una encuesta ni una proyección: es la suma de actas reales, sin muestreo estadístico",
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
            La técnica de NeuroLink Data es el registro directo del escrutinio, mesa por mesa y por
            tipo de elección, en el momento en que el personero culmina el conteo de votos en su mesa
            de sufragio. Ese registro se agrega casi al instante conforme avanza la jornada electoral,
            dentro del marco normativo que rige ese día. Antes de esa fecha, el panel muestra el padrón
            de organizaciones políticas y su participación por ubigeo electoral (regional, provincial o
            distrital), construido a partir de las candidaturas publicadas por el JNE.
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

      <MetodoComparacion />
    </section>
  );
}
