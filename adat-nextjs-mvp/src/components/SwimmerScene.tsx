/**
 * ============================================================
 * PEGA AQUÍ LA URL DE TU GIF Y LISTO.
 * Reemplaza la escena animada de la alberca en TODAS las páginas
 * que usan PublicPageHero (liga, disciplinas, competencias,
 * tiempos tope, próximos eventos).
 * Puede ser URL externa ("https://...") o archivo local en /public
 * (recomendado: /public/assets/alberca.gif -> "/assets/alberca.gif").
 * Si lo dejas vacío (""), se usa la escena SVG integrada.
 * ============================================================
 */
const SCENE_GIF = "/assets/nadador2.gif";

type SwimmerFigureProps = {
  /** Desfase del ciclo de brazada, ej. "-0.7s" */
  phase?: string;
  /** Prefijo de clase para variantes (fg / bg) */
  variant: "fg" | "bg";
};

const STROKE_DUR = "1.6s";

/**
 * Nadador de crol en vista lateral, apuntando a la derecha.
 * Rig de dos huesos: el brazo rota 360° por ciclo alrededor del hombro
 * (recobro por arriba + tracción bajo el agua) y el antebrazo se dobla
 * en el codo con su propia curva — el codo alto del recobro es la pose
 * clave. Las rotaciones usan SMIL (animateTransform) porque define el
 * pivote exacto sin pelear con transform-origin de CSS.
 *
 * La parte del brazo que baja de la línea de agua queda oculta porque
 * la capa de agua frontal se pinta encima (enmascarado por orden de capas).
 */
function SwimmerFigure({ phase = "0s", variant }: SwimmerFigureProps) {
  return (
    <g className={`sw2 sw2--${variant}`}>
      <g className="sw2-bob">
        {/* espuma de la patada */}
        <g className="sw2-foam" transform="translate(-252 -4)">
          <ellipse className="foam foam-1" cx="0" cy="0" rx="17" ry="9" />
          <ellipse className="foam foam-2" cx="22" cy="4" rx="12" ry="7" />
          <ellipse className="foam foam-3" cx="-16" cy="6" rx="9" ry="6" />
        </g>

        {/* torso: lomo sobre la línea de agua */}
        <path
          className="sw2-skin-fill"
          d="M-240 6 C-190 -22 -130 -32 -60 -30 C-25 -29 15 -24 45 -10 L45 12 L-240 12 Z"
        />

        {/* cuello */}
        <rect
          className="sw2-skin-fill"
          x="28"
          y="-30"
          width="40"
          height="26"
          rx="9"
        />

        {/* cabeza con gorra */}
        <circle className="sw2-skin-fill" cx="92" cy="-16" r="30" />
        <path className="sw2-cap-fill" d="M62 -16 A30 30 0 0 1 122 -16 Z" />

        {/* brazo: hombro -> codo -> mano */}
        <g transform="translate(0 -8)">
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="45 0 0; 155 0 0; 240 0 0; 315 0 0; 405 0 0"
              keyTimes="0; 0.18; 0.38; 0.52; 1"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
              dur={STROKE_DUR}
              begin={phase}
              repeatCount="indefinite"
            />
            {/* brazo superior */}
            <line
              className="sw2-limb sw2-limb--upper"
              x1="0"
              y1="0"
              x2="0"
              y2="92"
            />

            {/* antebrazo + mano, pivote en el codo */}
            <g transform="translate(0 92)">
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="-15 0 0; -115 0 0; -55 0 0; -5 0 0; -35 0 0; -15 0 0"
                  keyTimes="0; 0.18; 0.38; 0.52; 0.7; 1"
                  calcMode="spline"
                  keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
                  dur={STROKE_DUR}
                  begin={phase}
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

        {/* salpicadura de salida (mano saliendo atrás) */}
        <g className="splash-a" transform="translate(-70 -8)">
          <circle cx="0" cy="0" r="6" />
          <circle cx="14" cy="-8" r="4" />
          <circle cx="-12" cy="-10" r="3.5" />
        </g>

        {/* salpicadura de entrada (mano clavándose al frente) */}
        <g className="splash-b" transform="translate(152 -8)">
          <circle cx="0" cy="0" r="7" />
          <circle cx="-14" cy="-9" r="4.5" />
          <circle cx="13" cy="-11" r="4" />
          <circle cx="2" cy="-18" r="3" />
        </g>
      </g>
    </g>
  );
}

function RopeRow({
  y,
  w,
  h,
  gap,
  className,
}: {
  y: number;
  w: number;
  h: number;
  gap: number;
  className: string;
}) {
  const floats = [];
  for (let x = -160; x <= 1060; x += gap) {
    floats.push(
      <rect
        key={x}
        x={x}
        y={y}
        width={w}
        height={h}
        rx={h * 0.38}
        className="rope-float"
      />,
    );
  }
  return <g className={className}>{floats}</g>;
}

/**
 * Escena de alberca en vista lateral: dos nadadores de crol en
 * carriles distintos, cuerdas de flotadores con paralaje y agua
 * en capas que enmascara lo que va bajo la superficie.
 */
export function SwimmerScene() {
  if (SCENE_GIF) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={SCENE_GIF} alt="" className="swimmer-scene-gif" />
    );
  }

  return (
    <svg
      className="swimmer-scene"
      viewBox="0 0 800 480"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {/* cuerda lejana */}
      <RopeRow y={234} w={16} h={12} gap={26} className="rope rope--far" />

      {/* nadador de fondo */}
      <g transform="translate(200 262) scale(0.55)">
        <SwimmerFigure variant="bg" phase="-0.7s" />
      </g>

      {/* agua media: tapa al nadador de fondo bajo la superficie */}
      <path
        className="water water--mid"
        d="M-160 262 Q-120 254 -80 262 T0 262 T80 262 T160 262 T240 262 T320 262 T400 262 T480 262 T560 262 T640 262 T720 262 T800 262 T880 262 T960 262 T1040 262 L1040 480 L-160 480 Z"
      />

      {/* cuerda media (pasa detrás del nadador cercano) */}
      <RopeRow y={292} w={26} h={20} gap={40} className="rope rope--mid" />

      {/* nadador principal */}
      <g transform="translate(470 312) scale(1.02)">
        <SwimmerFigure variant="fg" />
      </g>

      {/* agua frontal: tapa el brazo en la fase de tracción */}
      <path
        className="water water--front"
        d="M-200 312 Q-150 302 -100 312 T0 312 T100 312 T200 312 T300 312 T400 312 T500 312 T600 312 T700 312 T800 312 T900 312 T1000 312 L1000 480 L-200 480 Z"
      />
      <rect className="water-deep" x="-200" y="402" width="1240" height="80" />

      {/* cuerda frontal (pasa por delante de todo) */}
      <RopeRow y={372} w={40} h={30} gap={60} className="rope rope--front" />
    </svg>
  );
}
