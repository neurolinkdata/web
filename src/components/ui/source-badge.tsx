import { CheckCircle2 } from "lucide-react";
import { Badge } from "./badge";

/** Indica que el bloque que acompaña se alimenta de datos reales del
 *  padrón (resultado_datoGeneral.xlsx), no de una simulación. */
export function SourceBadge() {
  return (
    <Badge color="#0ca30c">
      <CheckCircle2 size={12} strokeWidth={2.5} />
      PADRÓN DE CANDIDATURAS ERM2026
    </Badge>
  );
}
