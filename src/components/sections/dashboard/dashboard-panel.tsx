import { AlertTriangle } from "lucide-react";
import { SectionHeading } from "@/components/ui/typography";
import { SourceBadge } from "@/components/ui/source-badge";
import { TipoEleccionTabs } from "./tipo-eleccion-tabs";
import { UbigeoPicker } from "./ubigeo-picker";
import { ParticipacionPanel } from "./participacion-panel";
import { TopOrganizacionesChart } from "./top-organizaciones-chart";

export function DashboardPanel() {
  return (
    <section id="panel" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <SectionHeading
        eyebrow="Panel de participación"
        eyebrowColor="var(--brand-red)"
        title="Organizaciones políticas por ubigeo"
        right={<SourceBadge />}
      />

      <div className="mb-8 flex items-start gap-3 rounded-md border border-brand-amber/35 bg-brand-amber/10 px-4 py-3 text-sm text-ink-soft">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-brand-amber" />
        <p className="leading-relaxed">
          Este panel muestra el <strong className="text-ink">padrón oficial de candidaturas inscritas</strong> por
          región, provincia y distrito. No son resultados de votación: el escrutinio en vivo, mesa por mesa,
          se activa el <strong className="text-ink">4 de octubre de 2026</strong>, con actas reportadas por los
          personeros al cierre de cada mesa de sufragio.
        </p>
      </div>

      <div className="mb-6">
        <TipoEleccionTabs />
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <UbigeoPicker />
        <ParticipacionPanel />
      </div>

      <TopOrganizacionesChart />
    </section>
  );
}
