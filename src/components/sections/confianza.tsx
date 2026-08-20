import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Eyebrow, SectionTitle } from "@/components/ui/typography";

export function Confianza() {
  return (
    <section className="border-y border-border bg-surface-hover">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:px-8">
        <Card glow="color-mix(in srgb, var(--brand-cyan) 30%, transparent)">
          <ShieldCheck size={28} className="mb-4 text-brand-cyan" />
          <h3 className="font-display mb-1 text-lg font-bold text-ink">NeuroLink Data</h3>
          <p className="mb-4 text-xs font-semibold text-brand-amber">Persona natural con negocio · RUC 10413539175</p>
          <p className="text-sm leading-relaxed text-ink-soft">
            Somos una plataforma independiente de Tabulación de Votos en Paralelo (PVT). No formamos
            parte del JNE, la ONPE ni el RENIEC: nuestros datos son un servicio informativo privado,
            complementario a las fuentes oficiales.
          </p>
        </Card>

        <div>
          <Eyebrow color="var(--brand-amber)">Transparencia</Eyebrow>
          <SectionTitle>Independientes, verificables y a tiempo</SectionTitle>
          <p className="my-4 text-sm leading-relaxed text-ink-soft md:text-base">
            Cada cifra de este panel indica de dónde viene: el padrón de organizaciones políticas y la
            participación por ubigeo se generan directamente desde las candidaturas inscritas para
            ERM2026, sin datos inventados ni proyecciones propias.
          </p>
          <p className="text-sm leading-relaxed text-ink-soft md:text-base">
            El 4 de octubre de 2026, el panel se activa para el escrutinio en vivo con las actas
            reportadas por nuestra red de personeros, verificadas por nuestro equipo antes de publicarse.
          </p>
        </div>
      </div>
    </section>
  );
}
