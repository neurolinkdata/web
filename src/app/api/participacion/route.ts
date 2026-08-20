import { NextResponse } from "next/server";
import { getParticipacion } from "@/lib/data-access";
import { TIPOS_ELECCION, type TipoEleccion } from "@/domain/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tipoEleccion = searchParams.get("tipoEleccion") as TipoEleccion | null;
  const departamento = searchParams.get("departamento");

  if (!tipoEleccion || !TIPOS_ELECCION.includes(tipoEleccion)) {
    return NextResponse.json(
      { error: `tipoEleccion inválido o ausente. Valores válidos: ${TIPOS_ELECCION.join(", ")}` },
      { status: 400 }
    );
  }
  if (!departamento) {
    return NextResponse.json({ error: "El parámetro 'departamento' (slug) es obligatorio." }, { status: 400 });
  }

  const result = getParticipacion({
    tipoEleccion,
    departamentoSlug: departamento,
    provinciaSlug: searchParams.get("provincia") ?? undefined,
    distritoSlug: searchParams.get("distrito") ?? undefined,
  });

  return NextResponse.json(result);
}
