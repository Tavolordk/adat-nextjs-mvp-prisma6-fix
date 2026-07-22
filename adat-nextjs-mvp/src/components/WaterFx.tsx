type SwimmerProps = {
  className?: string;
};

/**
 * Silueta minimalista de nadador de crol vista desde arriba,
 * apuntando a la derecha. Se anima desde CSS (.pool-swimmer).
 */
export function Swimmer({ className }: SwimmerProps) {
  return (
    <svg
      viewBox="0 0 64 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* torso */}
      <ellipse cx="36" cy="16" rx="11" ry="4.2" fill="currentColor" />
      {/* cabeza */}
      <circle cx="51" cy="16" r="4.4" fill="currentColor" />
      {/* brazo extendido al frente */}
      <path
        d="M44 13 Q53 7 61 9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* brazo en recobro */}
      <path
        d="M43 19 Q38 27 29 26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* patada */}
      <path
        d="M26 14 Q17 11 10 13"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M26 18 Q17 21 10 19"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
