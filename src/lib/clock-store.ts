"use client";

/**
 * Fuente externa de "ahora" compartida por useClock y useCountdown, vía
 * useSyncExternalStore — evita el patrón "setState síncrono dentro de un
 * effect" (que dispara renders en cascada) y resuelve de forma nativa el
 * problema de hidratación: el snapshot de servidor es `null` (no hay hora
 * de servidor confiable que mostrar) y el snapshot de cliente es el
 * epoch real, sincronizado con un único `setInterval` compartido entre
 * todos los hooks suscritos.
 */
type Listener = () => void;

const listeners = new Set<Listener>();
let intervalId: ReturnType<typeof setInterval> | null = null;
let nowMs = Date.now();

function tick() {
  nowMs = Date.now();
  listeners.forEach((l) => l());
}

function ensureRunning() {
  if (intervalId === null) intervalId = setInterval(tick, 1000);
}

function maybeStop() {
  if (listeners.size === 0 && intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

export function subscribeClock(listener: Listener): () => void {
  listeners.add(listener);
  ensureRunning();
  return () => {
    listeners.delete(listener);
    maybeStop();
  };
}

export function getClockSnapshot(): number {
  return nowMs;
}

export function getClockServerSnapshot(): number | null {
  return null;
}
