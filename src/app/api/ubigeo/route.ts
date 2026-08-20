import { NextResponse } from "next/server";
import { getUbigeoTree } from "@/lib/data-access";

export async function GET() {
  return NextResponse.json(getUbigeoTree());
}
