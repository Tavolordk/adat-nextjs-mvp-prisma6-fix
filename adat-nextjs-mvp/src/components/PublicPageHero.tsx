import type { ReactNode } from "react";
import { Swimmer } from "@/components/WaterFx";

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

        <div className="pool-swimmer">
          <Swimmer />
        </div>

        <div className="pool-swimmer">
          <Swimmer />
        </div>
      </div>
    </section>
  );
}
