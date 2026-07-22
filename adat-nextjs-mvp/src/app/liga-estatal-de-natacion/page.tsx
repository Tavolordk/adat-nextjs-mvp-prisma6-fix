import Link from "next/link";
import { Icon } from "@/components/icons";
import { PublicFooter } from "@/components/PublicFooter";
import { PublicNav } from "@/components/PublicNav";
import { PublicPageHero } from "@/components/PublicPageHero";

export const metadata = {
  title: "Liga Estatal de Natación | ADAT",
  description:
    "Jornadas, resultados y comunidad de la Liga Estatal de Natación de Tlaxcala organizada por ADAT.",
};

const pilares = [
  {
    icon: "calendar" as const,
    title: "Jornadas y calendario",
    text: "Un solo espacio para consultar las jornadas, convocatorias y avisos de la temporada.",
  },
  {
    icon: "medal" as const,
    title: "Resultados oficiales",
    text: "Seguimiento claro de marcas, resultados y avances de las y los nadadores participantes.",
  },
  {
    icon: "users" as const,
    title: "Comunidad estatal",
    text: "Clubes, entrenadores, atletas y familias conectados alrededor de la natación tlaxcalteca.",
  },
];

export default function LigaEstatalDeNatacionPage() {
  return (
    <main className="public-page content-page">
      <PublicNav />

      <PublicPageHero
        eyebrow={
          <>
            <Icon name="wave" /> Liga Estatal de Natación
          </>
        }
        title={
          <>
            La competencia estatal{" "}
            <span className="gradient-text">empieza aquí.</span>
          </>
        }
        description="La Liga Estatal de Natación reúne el esfuerzo de atletas, clubes y entrenadores para impulsar una temporada organizada, competitiva y con identidad tlaxcalteca."
        actions={
          <>
            <Link
              href="/proximos-eventos-y-competencias"
              className="btn-primary"
            >
              Ver calendario
            </Link>

            <Link href="/afiliacion" className="btn-secondary">
              Afíliate a ADAT
            </Link>
          </>
        }
      />

      <section className="section content-section">
        <div className="section-head">
          <span className="eyebrow">
            <Icon name="shield" /> Una liga para crecer
          </span>

          <h2>Más orden, más seguimiento y más oportunidades para competir.</h2>

          <p>
            Esta sección concentra la información clave para acompañar el
            desarrollo de cada temporada y facilitar la participación de la
            comunidad acuática.
          </p>
        </div>

        <div className="cards-grid three-columns">
          {pilares.map((item) => (
            <article className="card" key={item.title}>
              <div className="icon-wrap">
                <Icon name={item.icon} />
              </div>

              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section page-split-section">
        <div className="blue-panel">
          <span className="eyebrow">Participación deportiva</span>

          <h2>Una ruta visible para cada atleta.</h2>

          <p>
            La afiliación a ADAT permite mantener la información de contacto y
            disciplina lista para recibir comunicación de la asociación.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-card">
            <strong>01 · Afiliación</strong>
            <h3>Forma parte de la comunidad</h3>
            <p>
              Comparte tus datos deportivos y de contacto mediante la solicitud
              pública.
            </p>
          </div>

          <div className="timeline-card">
            <strong>02 · Calendario</strong>
            <h3>Consulta lo que sigue</h3>
            <p>
              Revisa próximos eventos, competencias y avisos publicados por
              ADAT.
            </p>
          </div>

          <div className="timeline-card">
            <strong>03 · Seguimiento</strong>
            <h3>Conoce tus marcas</h3>
            <p>
              Consulta los tiempos tope y el ranking estatal cuando se
              actualicen.
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
