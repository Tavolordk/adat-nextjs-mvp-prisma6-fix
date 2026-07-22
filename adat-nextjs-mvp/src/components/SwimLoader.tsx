/**
 * ============================================================
 * PEGA AQUÍ LA URL DE TU GIF Y LISTO.
 * Puede ser una URL externa ("https://...") o un archivo local
 * en /public (recomendado: descárgalo a /public/assets/loader.gif
 * y usa "/assets/loader.gif" para no depender de servidores ajenos).
 * Si lo dejas vacío (""), se usa el nadador SVG integrado.
 * ============================================================
 */
const LOADER_GIF = "/assets/nadador.gif";

type SwimLoaderProps = {
  /** Texto bajo el nadador, ej. "Cargando afiliaciones..." */
  label?: string;
  /** Versión compacta para espacios reducidos (botones, modales) */
  compact?: boolean;
  /** URL de GIF para esta instancia (sobrescribe LOADER_GIF) */
  src?: string;
};

const DUR = "1.1s";

/**
 * Indicador de espera: nadador de crol braceando en su carril.
 * Mismo rig de dos huesos que la escena principal (SMIL para las
 * rotaciones con pivote exacto), en versión mini nadando en sitio
 * mientras el agua corre debajo — la espera se siente como avance.
 *
 * Uso: <SwimLoader label="Cargando afiliaciones..." />
 */
export function SwimLoader({ label, compact = false, src }: SwimLoaderProps) {
  const gif = src ?? LOADER_GIF;

  if (gif) {
    return (
      <div
        className={compact ? "swim-loader swim-loader--compact" : "swim-loader"}
        role="status"
        aria-live="polite"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={gif} alt="" className="swim-loader-gif" />
        {label && <span className="swim-loader-label">{label}</span>}
        <span className="sr-only">Cargando</span>
      </div>
    );
  }

  return (
    <div
      className={compact ? "swim-loader swim-loader--compact" : "swim-loader"}
      role="status"
      aria-live="polite"
    >
      <svg viewBox="0 0 260 110" aria-hidden="true">
        {/* nadador (waterline local y=0, colocada en y=62) */}
        <g transform="translate(118 62) scale(0.42)">
          <g className="sw2-bob">
            {/* espuma de patada */}
            <g transform="translate(-252 -4)">
              <ellipse className="foam foam-1" cx="0" cy="0" rx="17" ry="9" />
              <ellipse className="foam foam-2" cx="22" cy="4" rx="12" ry="7" />
            </g>

            {/* torso, cuello y cabeza con gorra */}
            <path
              className="sw2-skin-fill"
              d="M-240 6 C-190 -22 -130 -32 -60 -30 C-25 -29 15 -24 45 -10 L45 12 L-240 12 Z"
            />
            <rect
              className="sw2-skin-fill"
              x="28"
              y="-30"
              width="40"
              height="26"
              rx="9"
            />
            <circle className="sw2-skin-fill" cx="92" cy="-16" r="30" />
            <path className="sw2-cap-fill" d="M62 -16 A30 30 0 0 1 122 -16 Z" />

            {/* brazo de dos huesos */}
            <g transform="translate(0 -8)">
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="45 0 0; 155 0 0; 240 0 0; 315 0 0; 405 0 0"
                  keyTimes="0; 0.18; 0.38; 0.52; 1"
                  calcMode="spline"
                  keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
                  dur={DUR}
                  repeatCount="indefinite"
                />
                <line
                  className="sw2-limb sw2-limb--upper"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="92"
                />
                <g transform="translate(0 92)">
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="-15 0 0; -115 0 0; -55 0 0; -5 0 0; -35 0 0; -15 0 0"
                      keyTimes="0; 0.18; 0.38; 0.52; 0.7; 1"
                      calcMode="spline"
                      keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
                      dur={DUR}
                      repeatCount="indefinite"
                    />
                    <line
                      className="sw2-limb sw2-limb--fore"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="80"
                    />
                    <circle className="sw2-skin-fill" cx="0" cy="88" r="13" />
                  </g>
                </g>
              </g>
            </g>

            {/* salpicaduras del ciclo */}
            <g
              className="splash-a splash-a--fast"
              transform="translate(-70 -8)"
            >
              <circle cx="0" cy="0" r="6" />
              <circle cx="14" cy="-8" r="4" />
            </g>
            <g
              className="splash-b splash-b--fast"
              transform="translate(152 -8)"
            >
              <circle cx="0" cy="0" r="7" />
              <circle cx="-14" cy="-9" r="4.5" />
            </g>
          </g>
        </g>

        {/* agua frontal: enmascara la tracción y corre hacia atrás */}
        <path
          className="water water--front swim-loader-water"
          d="M-80 62 Q-60 56 -40 62 T0 62 T40 62 T80 62 T120 62 T160 62 T200 62 T240 62 T280 62 T320 62 L320 110 L-80 110 Z"
        />
      </svg>

      {label && <span className="swim-loader-label">{label}</span>}

      {/* respaldo textual cuando la animación está desactivada */}
      <span className="sr-only">Cargando</span>
    </div>
  );
}
