export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-hover">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <div className="font-display text-sm font-bold text-ink">
            NEUROLINK <span className="text-brand-red">DATA</span>
          </div>
          <div className="mt-1 text-xs font-medium text-ink-mute">
            Persona natural con negocio · RUC 10413539175 · Perú
          </div>
        </div>
        <p className="max-w-xl text-xs font-medium leading-relaxed text-ink-mute">
          Las organizaciones políticas y la participación por ubigeo mostradas en este panel provienen
          del padrón de candidaturas ERM2026. El escrutinio por mesa de sufragio se activa el
          4 de octubre de 2026. NeuroLink Data es independiente y no representa al JNE, la ONPE ni al RENIEC.
        </p>
      </div>
      <div className="border-t border-border py-4 text-center text-[11px] font-medium text-ink-mute">
        © 2026 NeuroLink Data. Todos los derechos reservados.
      </div>
    </footer>
  );
}
