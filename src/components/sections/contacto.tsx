"use client";

import { ArrowRight, ChevronRight, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eyebrow, SectionTitle } from "@/components/ui/typography";
import { StatIcon } from "@/components/ui/stat-icon";

const PHONE_DIGITS = "51931982633";

export function Contacto() {
  return (
    <section id="contacto" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="grid gap-14 md:grid-cols-2">
        <div>
          <Eyebrow color="var(--brand-cyan)">Contacto</Eyebrow>
          <SectionTitle>Escríbenos</SectionTitle>
          <p className="my-5 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
            ¿Eres medio de comunicación, partido político u organización y quieres acceso al panel
            completo el día de la elección? Conversemos.
          </p>

          <div className="space-y-4">
            <a
              href={`https://wa.me/${PHONE_DIGITS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:bg-surface-hover"
            >
              <StatIcon icon={Phone} color="var(--brand-red)" />
              <div>
                <div className="text-xs font-medium text-ink-mute">Celular / WhatsApp</div>
                <div className="text-sm font-bold text-ink">+51 931 982 633</div>
              </div>
              <ChevronRight size={16} className="ml-auto text-ink-mute" />
            </a>

            <a
              href="mailto:neurolink.data@gmail.com"
              className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:bg-surface-hover"
            >
              <StatIcon icon={Mail} color="var(--brand-cyan)" />
              <div>
                <div className="text-xs font-medium text-ink-mute">Correo</div>
                <div className="text-sm font-bold text-ink">neurolink.data@gmail.com</div>
              </div>
              <ChevronRight size={16} className="ml-auto text-ink-mute" />
            </a>
          </div>
        </div>

        <Card className="p-6 md:p-8">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-ink">Formulario rápido</h3>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const body = encodeURIComponent(
                `Nombre: ${data.get("nombre")}\nOrganización: ${data.get("org")}\nMensaje: ${data.get("mensaje")}`
              );
              window.location.href = `mailto:neurolink.data@gmail.com?subject=Contacto%20desde%20la%20web&body=${body}`;
            }}
          >
            <input
              name="nombre"
              required
              placeholder="Nombre completo"
              className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-ink outline-none focus-visible:border-brand-cyan"
            />
            <input
              name="org"
              placeholder="Organización (opcional)"
              className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-ink outline-none focus-visible:border-brand-cyan"
            />
            <textarea
              name="mensaje"
              required
              rows={4}
              placeholder="Cuéntanos qué necesitas"
              className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-ink outline-none focus-visible:border-brand-cyan"
            />
            <Button type="submit" className="w-full">
              Enviar mensaje <ArrowRight size={16} />
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
