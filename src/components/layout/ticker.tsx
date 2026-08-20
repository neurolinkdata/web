const TICKER_ITEMS = [
  "Panel de participación electoral activo — el conteo de actas se habilita el 04/10/2026",
  "Cronograma de la jornada electoral ERM2026 confirmado",
  "25 regiones, 221 provincias y 1,917 distritos con candidaturas inscritas",
  "NeuroLink Data consolida el padrón de organizaciones políticas",
  "Cobertura nacional: 25 departamentos monitoreados en simultáneo",
  "El día de la elección, el panel se activa con el escrutinio reportado por personeros de mesa",
];

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="flex h-9 w-full items-center overflow-hidden bg-brand-red">
      <div className="ticker-track flex items-center gap-16 whitespace-nowrap px-6">
        {items.map((item, i) => (
          <span key={i} className="font-mono text-xs font-semibold text-white">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
