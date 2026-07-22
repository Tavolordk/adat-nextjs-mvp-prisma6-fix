"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";

/**
 * Intro de salpicadura: anillos de onda + gotas + logo, y la cortina
 * de agua se drena hacia arriba con borde de ola revelando la página.
 * - Se muestra una vez por sesión (sessionStorage).
 * - Se omite con prefers-reduced-motion.
 * - Un clic la salta.
 */

type Drop = { dx: number; dy: number; s: number; d: number };

const DROPS: Drop[] = [
  { dx: -150, dy: -95, s: 1, d: 0.16 },
  { dx: 150, dy: -105, s: 0.85, d: 0.2 },
  { dx: -95, dy: -150, s: 0.7, d: 0.24 },
  { dx: 105, dy: -145, s: 1.1, d: 0.18 },
  { dx: -190, dy: -40, s: 0.8, d: 0.26 },
  { dx: 195, dy: -35, s: 0.9, d: 0.22 },
  { dx: -55, dy: -180, s: 0.6, d: 0.3 },
  { dx: 45, dy: -190, s: 0.75, d: 0.28 },
  { dx: -135, dy: -135, s: 0.55, d: 0.34 },
  { dx: 165, dy: -70, s: 0.65, d: 0.32 },
];

const INTRO_KEY = "adat-intro-shown";
const INTRO_DURATION = 2600;

export function SplashIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced || sessionStorage.getItem(INTRO_KEY)) {
      return;
    }

    sessionStorage.setItem(INTRO_KEY, "1");
    setShow(true);

    const timer = setTimeout(() => setShow(false), INTRO_DURATION);
    return () => clearTimeout(timer);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div
      className="splash-intro"
      role="presentation"
      onClick={() => setShow(false)}
    >
      <div className="splash-stage">
        <span className="splash-ring" />
        <span className="splash-ring" />
        <span className="splash-ring" />

        {DROPS.map((drop, index) => (
          <span
            key={index}
            className="splash-drop"
            style={
              {
                "--dx": `${drop.dx}px`,
                "--dy": `${drop.dy}px`,
                "--s": drop.s,
                animationDelay: `${drop.d}s`,
              } as CSSProperties
            }
          />
        ))}

        <div className="splash-logo">
          <Image
            src="/assets/adat-logo.png"
            alt="ADAT"
            width={300}
            height={170}
            priority
          />
        </div>
      </div>
    </div>
  );
}
