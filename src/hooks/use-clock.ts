"use client";

import { useSyncExternalStore } from "react";
import { getClockServerSnapshot, getClockSnapshot, subscribeClock } from "@/lib/clock-store";

/** Reloj en vivo, actualizado cada segundo. Usado en el header.
 *  Devuelve `null` en servidor y en el primer render de hidratación. */
export function useClock(): Date | null {
  const ms = useSyncExternalStore(subscribeClock, getClockSnapshot, getClockServerSnapshot);
  return ms === null ? null : new Date(ms);
}
