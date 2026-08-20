"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboardStore } from "@/store/dashboard-store";
import { TIPOS_ELECCION, type TipoEleccion } from "@/domain/types";
import { TIPO_ELECCION_TAB_LABEL } from "@/domain/constants";

export function TipoEleccionTabs() {
  const tipoEleccion = useDashboardStore((s) => s.tipoEleccion);
  const setTipoEleccion = useDashboardStore((s) => s.setTipoEleccion);

  return (
    <Tabs value={tipoEleccion} onValueChange={(v) => setTipoEleccion(v as TipoEleccion)}>
      <TabsList>
        {TIPOS_ELECCION.map((tipo) => (
          <TabsTrigger key={tipo} value={tipo}>
            {TIPO_ELECCION_TAB_LABEL[tipo]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
