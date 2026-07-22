import type { ReactNode } from "react";
import { Swimmer } from "@/components/WaterFx";
import { LottieSwimmer } from "@/components/LottieSwimmer";

type PublicPageHeroProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
};

export function PublicPageHero({
  eyebrow,
  title,
  description,
  actions,
}: PublicPageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <span className="eyebrow">{eyebrow}</span>

        <h1>{title}</h1>

        <p>{description}</p>

        {actions && <div className="hero-actions">{actions}</div>}
      </div>

      <div className="page-hero-water" aria-hidden="true">
        <span />
        <span />
        <span />

        {/* carril 1: rig CSS */}
        <div className="pool-swimmer">
          <Swimmer />
        </div>

        {/* carril 2: Lottie, para comparar */}
        <div className="pool-swimmer">
          <LottieSwimmer />
        </div>
      </div>
    </section>
  );
}
