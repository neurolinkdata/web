import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const CONTACT_EMAIL = "neurolinkdata@gmail.com";

const ContactoSchema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre completo.").max(120),
  organizacion: z.string().trim().max(160).optional().or(z.literal("")),
  correo: z.string().trim().email("Ingresa un correo válido.").max(160),
  mensaje: z.string().trim().min(5, "Cuéntanos un poco más.").max(4000),
  // Honeypot: un campo oculto para el usuario, que solo un bot rellenaría.
  sitio: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = ContactoSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue?.message ?? "Revisa los campos del formulario." },
      { status: 400 }
    );
  }

  const { nombre, organizacion, correo, mensaje, sitio } = parsed.data;

  // Si el honeypot viene lleno, es un bot: respondemos éxito sin enviar nada.
  if (sitio) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[/api/contacto] Falta la variable de entorno RESEND_API_KEY.");
    return NextResponse.json(
      { error: "El envío de correo no está configurado todavía. Escríbenos directo a " + CONTACT_EMAIL + "." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "NeuroLink Data <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: correo,
      subject: `Contacto desde la web — ${nombre}`,
      text: [
        `Nombre: ${nombre}`,
        organizacion ? `Organización: ${organizacion}` : null,
        `Correo: ${correo}`,
        "",
        mensaje,
      ]
        .filter((line): line is string => Boolean(line))
        .join("\n"),
    });

    if (error) {
      console.error("[/api/contacto] Error de Resend:", error);
      return NextResponse.json({ error: "No se pudo enviar el mensaje. Intenta de nuevo en un momento." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contacto] Error inesperado:", err);
    return NextResponse.json({ error: "No se pudo enviar el mensaje. Intenta de nuevo en un momento." }, { status: 500 });
  }
}
