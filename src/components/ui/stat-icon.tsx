import type { LucideIcon } from "lucide-react";

export function StatIcon({ icon: Icon, color }: { icon: LucideIcon; color: string }) {
  return (
    <div
      className="shrink-0 rounded-lg p-2.5"
      style={{ background: `color-mix(in srgb, ${color} 13%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 27%, transparent)` }}
    >
      <Icon size={20} style={{ color }} />
    </div>
  );
}
