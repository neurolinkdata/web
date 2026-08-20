import { NextResponse } from "next/server";
import { getResumenNacional } from "@/lib/data-access";

export async function GET() {
  return NextResponse.json(getResumenNacional());
}
