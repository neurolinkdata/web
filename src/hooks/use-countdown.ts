"use client";

import { useSyncExternalStore } from "react";
import { getClockServerSnapshot, getClockSnapshot, subscribeClock } from "@/lib/clock-store";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const ZERO: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

function diffToCountdown(targetMs: number, nowMs: number): Countdown {
  const left = Math.max(targetMs - nowMs, 0);
  return {
    days: Math.floor(left / 86_400_000),
    hours: Math.floor((left % 86_400_000) / 3_600_000),
    minutes: Math.floor((left % 3_600_000) / 60_000),
    seconds: Math.floor((left % 60_000) / 1_000),
    done: targetMs - nowMs <= 0,
  };
}

/** Cuenta regresiva hacia `target`, derivada del mismo reloj compartido
 *  que useClock. Devuelve un valor "cero" en servidor y en el primer
 *  render de hidratación, para no desajustar el HTML del servidor. */
export function useCountdown(target: Date): Countdown {
  const nowMs = useSyncExternalStore(subscribeClock, getClockSnapshot, getClockServerSnapshot);
  if (nowMs === null) return ZERO;
  return diffToCountdown(target.getTime(), nowMs);
}
