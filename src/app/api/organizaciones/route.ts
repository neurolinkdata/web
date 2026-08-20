import { NextResponse } from "next/server";
import { getOrganizaciones } from "@/lib/data-access";

export async function GET() {
  return NextResponse.json(getOrganizaciones());
}
