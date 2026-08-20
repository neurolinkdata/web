"use client";

import { useState } from "react";
import { ArrowRight, ChevronRight, CircleCheck, Loader2, Mail, Phone, TriangleAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eyebrow, SectionTitle } from "@/components/ui/typography";
import { StatIcon } from "@/components/ui/stat-icon";

const PHONE_DIGITS = "51931982633";
const CONTACT_EMAIL = "neurolinkdata@gmail.com";

type EstadoEnvio = "inactivo" | "enviando" | "exito" | "error";

export function Contacto() {
  const [estado, setEstado] = useState<EstadoEnvio>("inactivo");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      nombre: String(data.get("nombre") ?? ""),
      organizacion: String(data.get("organizacion") ?? ""),
      correo: String(data.get("correo") ?? ""),
      mensaje: String(data.get("mensaje") ?? ""),
      sitio: String(data.get("sitio") ?? ""), // honeypot
    };

    setEstado("enviando");
    setError(null);

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body.error ?? "No se pudo enviar el mensaje.");
      }

      setEstado("exito");
      form.reset();
    } catch (err) {
      setEstado("error");
      setError(err instanceof Error ? err.message : "No se pudo enviar el mensaje.");
    }
  }

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
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:bg-surface-hover"
            >
              <StatIcon icon={Mail} color="var(--brand-cyan)" />
              <div>
                <div className="text-xs font-medium text-ink-mute">Correo</div>
                <div className="text-sm font-bold text-ink">{CONTACT_EMAIL}</div>
              </div>
              <ChevronRight size={16} className="ml-auto text-ink-mute" />
            </a>
          </div>
        </div>

        <Card className="p-6 md:p-8">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-ink">Formulario rápido</h3>

          {estado === "exito" ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <CircleCheck size={32} className="text-brand-cyan" />
              <p className="text-sm font-semibold text-ink">Mensaje enviado.</p>
              <p className="max-w-xs text-sm text-ink-soft">
                Te responderemos a la brevedad. Si prefieres, también puedes escribirnos directo a{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-cyan underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
              <Button type="button" variant="outline" size="sm" onClick={() => setEstado("inactivo")}>
                Enviar otro mensaje
              </Button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Honeypot anti-spam: invisible para personas, atractivo para bots. */}
              <input
                type="text"
                name="sitio"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute h-0 w-0 opacity-0"
              />

              <Input name="nombre" required placeholder="Nombre completo" maxLength={120} disabled={estado === "enviando"} />
              <Input
                name="correo"
                type="email"
                required
                placeholder="Tu correo, para responderte"
                maxLength={160}
                disabled={estado === "enviando"}
              />
              <Input name="organizacion" placeholder="Organización (opcional)" maxLength={160} disabled={estado === "enviando"} />
              <textarea
                name="mensaje"
                required
                rows={4}
                maxLength={4000}
                placeholder="Cuéntanos qué necesitas"
                disabled={estado === "enviando"}
                className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-ink outline-none focus-visible:border-brand-cyan disabled:opacity-60"
              />

              {estado === "error" && (
                <div className="flex items-start gap-2 rounded-md border border-brand-red/40 bg-brand-red/10 px-3 py-2.5 text-xs text-brand-red-dim">
                  <TriangleAlert size={15} className="mt-0.5 shrink-0" />
                  <span>
                    {error} Si el problema persiste, escríbenos directo a{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </span>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={estado === "enviando"}>
                {estado === "enviando" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Enviando…
                  </>
                ) : (
                  <>
                    Enviar mensaje <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}
