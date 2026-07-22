type SwimmerProps = {
  className?: string;
};

/**
 * Nadador de crol articulado, vista cenital, apuntando a la derecha.
 * Cada extremidad vive en un grupo con pivote en hombro/cadera y se
 * anima desde CSS (.sw-arm-u, .sw-arm-d, .sw-leg-u, .sw-leg-d):
 * brazada alternada de crol y patada de aleteo.
 */
export function Swimmer({ className }: SwimmerProps) {
  return (
    <svg
      viewBox="0 0 72 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* pierna superior (pivote en cadera) */}
      <g transform="translate(25 15.5)">
        <path
          className="sw-leg-u"
          d="M0 0 Q-8 -2.5 -15 -1.5"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </g>

      {/* pierna inferior */}
      <g transform="translate(25 20.5)">
        <path
          className="sw-leg-d"
          d="M0 0 Q-8 2.5 -15 1.5"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </g>

      {/* torso */}
      <ellipse cx="35" cy="18" rx="12" ry="5" fill="currentColor" />

      {/* cabeza con gorra */}
      <circle cx="53" cy="18" r="5" fill="currentColor" />
      <path
        d="M50.5 14.6 a5.4 5.4 0 0 1 0 6.8"
        stroke="rgba(0, 0, 0, 0.22)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* brazo superior (pivote en hombro) */}
      <g transform="translate(44 14.5)">
        <path
          className="sw-arm-u"
          d="M0 0 Q8 -5 16 -6"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </g>

      {/* brazo inferior */}
      <g transform="translate(44 21.5)">
        <path
          className="sw-arm-d"
          d="M0 0 Q8 5 16 6"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
