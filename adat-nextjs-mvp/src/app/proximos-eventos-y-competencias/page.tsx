import Link from "next/link";
import { Icon } from "@/components/icons";
import { PublicFooter } from "@/components/PublicFooter";
import { PublicNav } from "@/components/PublicNav";
import { PublicPageHero } from "@/components/PublicPageHero";

const tiposDePublicacion = [
  {
    tag: "Liga estatal",
    title: "Jornadas y fechas de la temporada",
    text: "Las próximas jornadas de la Liga Estatal de Natación aparecerán en este espacio con su información correspondiente.",
  },
  {
    tag: "Competencias",
    title: "Convocatorias y eventos deportivos",
    text: "Aquí se concentrarán los avisos de competencias para que atletas, clubes y familias puedan planear su participación.",
  },
  {
    tag: "Comunidad ADAT",
    title: "Actividades y comunicados",
    text: "También podrás encontrar actividades acuáticas, actualizaciones y comunicados relevantes de la asociación.",
  },
];

export default function ProximosEventosYCompetenciasPage() {
  return (
    <main className="public-page content-page">
      <PublicNav />

      <PublicPageHero
        eyebrow={
          <>
            <Icon name="calendar" /> Próximos eventos y competencias
          </>
        }
        title={
          <>
            Todo lo que viene,{" "}
            <span className="gradient-text">en un solo calendario.</span>
          </>
        }
        description="Revisa las próximas actividades, jornadas y competencias que ADAT comunique para la comunidad acuática de Tlaxcala."
        actions={
          <>
            <Link href="/liga-estatal-de-natacion" className="btn-primary">
              Conocer la liga
            </Link>

            <Link href="/afiliacion" className="btn-secondary">
              Afiliarme
            </Link>
          </>
        }
      />

      <section className="section content-section">
        <div className="section-head">
          <span className="eyebrow">
            <Icon name="calendar" /> Calendario oficial
          </span>

          <h2>Un espacio para planear la siguiente brazada.</h2>

          <p>
            Las publicaciones de cada evento podrán incluir fechas, sede,
            categorías, pruebas, documentos y avisos importantes.
          </p>
        </div>

        <div className="event-grid">
          {tiposDePublicacion.map((item) => (
            <article className="event-card" key={item.title}>
              <span className="event-status">{item.tag}</span>

              <div className="icon-wrap">
                <Icon name="calendar" />
              </div>

              <h3>{item.title}</h3>
              <p>{item.text}</p>

              <span className="event-pending">Información por publicar</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section page-split-section">
        <div className="blue-panel">
          <span className="eyebrow">Mantente informado</span>

          <h2>Consulta este calendario antes de cada etapa.</h2>

          <p>
            La información de las competencias se actualizará aquí conforme sea
            comunicada por ADAT.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-card">
            <strong>Antes del evento</strong>
            <h3>Consulta los detalles</h3>
            <p>
              Revisa convocatoria, sede, categorías, pruebas y requisitos
              aplicables.
            </p>
          </div>

          <div className="timeline-card">
            <strong>Durante la competencia</strong>
            <h3>Participa preparado</h3>
            <p>
              Coordina con tu club o entrenador la información necesaria para tu
              participación.
            </p>
          </div>

          <div className="timeline-card">
            <strong>Después</strong>
            <h3>Da seguimiento a tus resultados</h3>
            <p>
              Consulta las publicaciones de marcas y ranking estatal cuando
              estén disponibles.
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
