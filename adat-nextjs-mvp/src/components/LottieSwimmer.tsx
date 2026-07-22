"use client";

import Lottie from "lottie-react";
import swimmerData from "@/assets/swimmer-lottie.json";

type LottieSwimmerProps = {
  className?: string;
};

/**
 * Nadador en formato Lottie (bodymovin). Reproduce el JSON incluido
 * en /src/assets/swimmer-lottie.json.
 *
 * Para usar una animación profesional de LottieFiles:
 * 1. Descarga el archivo en formato "Lottie JSON" desde lottiefiles.com
 * 2. Guárdalo como src/assets/swimmer-lottie.json (o cambia el import)
 *
 * Requiere: npm install lottie-react
 */
export function LottieSwimmer({ className }: LottieSwimmerProps) {
  return (
    <Lottie
      animationData={swimmerData}
      loop
      autoplay
      className={className ? `lottie-swimmer ${className}` : "lottie-swimmer"}
    />
  );
}
