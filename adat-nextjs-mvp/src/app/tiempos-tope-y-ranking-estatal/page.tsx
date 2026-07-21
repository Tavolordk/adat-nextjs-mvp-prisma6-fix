import Link from "next/link";
import { Icon } from "@/components/icons";
import { PublicFooter } from "@/components/PublicFooter";
import { PublicNav } from "@/components/PublicNav";
import { PublicPageHero } from "@/components/PublicPageHero";

const consultas = [
  [
    "Tiempos tope",
    "Marcas de referencia por prueba, categoría y rama para orientar la preparación deportiva.",
  ],
  [
    "Ranking estatal",
    "Clasificación de resultados conforme a las publicaciones y criterios de la temporada.",
  ],
  [
    "Actualizaciones",
    "Cada publicación podrá indicar la fecha de corte y el evento considerado para los resultados.",
  ],
];

export default function TiemposTopeYRankingEstatalPage() {
  return (
    <main className="public-page content-page">
      <PublicNav />

      <PublicPageHero
        eyebrow={
          <>
            <Icon name="target" /> Tiempos tope y ranking estatal
          </>
        }
        title={
          <>
            Tus marcas también cuentan{" "}
            <span className="gradient-text">una historia.</span>
          </>
        }
        description="Consulta en un mismo lugar los tiempos de referencia y el ranking estatal que ADAT publique durante la temporada."
        actions={
          <>
            <Link href="/competencias" className="btn-primary">
              Ver competencias
            </Link>

            <Link
              href="/proximos-eventos-y-competencias"
              className="btn-secondary"
            >
              Ver próximos eventos
            </Link>
          </>
        }
      />

      <section className="section content-section">
        <div className="section-head">
          <span className="eyebrow">
            <Icon name="medal" /> Seguimiento competitivo
          </span>

          <h2>Información por prueba, categoría, rama y periodo.</h2>

          <p>
            Esta pestaña está preparada para mostrar las referencias y
            resultados estatales de manera ordenada, fácil de consultar y
            transparente.
          </p>
        </div>

        <div className="cards-grid three-columns">
          {consultas.map(([title, text]) => (
            <article className="card" key={title}>
              <div className="icon-wrap">
                <Icon name="check" />
              </div>

              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section content-section ranking-section">
        <div className="ranking-panel">
          <div>
            <span className="eyebrow">
              <Icon name="calendar" /> Publicaciones de la temporada
            </span>

            <h2>
              Próximamente se mostrarán aquí los tiempos tope y el ranking
              estatal.
            </h2>

            <p>
              Cuando ADAT publique una actualización, podrás consultar los
              resultados aplicando los filtros de categoría, rama, prueba y
              fecha de corte correspondientes.
            </p>
          </div>

          <div
            className="ranking-filters"
            aria-label="Filtros disponibles próximamente"
          >
            <span>Categoría</span>
            <span>Rama</span>
            <span>Prueba</span>
            <span>Fecha de corte</span>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
