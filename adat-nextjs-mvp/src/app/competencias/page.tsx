import Link from "next/link";
import { Icon } from "@/components/icons";
import { PublicFooter } from "@/components/PublicFooter";
import { PublicNav } from "@/components/PublicNav";
import { PublicPageHero } from "@/components/PublicPageHero";

export const metadata = {
  title: "Competencias | ADAT",
  description:
    "Competencias oficiales de deportes acuáticos en Tlaxcala: convocatorias, sedes y participación.",
};

const modalidades = [
  {
    icon: "medal" as const,
    title: "Competencias estatales",
    text: "Encuentros que fortalecen la experiencia competitiva y el desarrollo dentro de Tlaxcala.",
  },
  {
    icon: "target" as const,
    title: "Selectivos y fogueos",
    text: "Espacios para medir avances, prepararse y representar al estado en escenarios de mayor nivel.",
  },
  {
    icon: "wave" as const,
    title: "Eventos acuáticos",
    text: "Actividades y competencias relacionadas con las disciplinas acuáticas que impulsa ADAT.",
  },
];

export default function CompetenciasPage() {
  return (
    <main className="public-page content-page">
      <PublicNav />

      <PublicPageHero
        eyebrow={
          <>
            <Icon name="medal" /> Competencias
          </>
        }
        title={
          <>
            Prepárate, compite y{" "}
            <span className="gradient-text">haz que cuente.</span>
          </>
        }
        description="Aquí encontrarás el espacio dedicado a las competencias impulsadas, acompañadas o comunicadas por ADAT durante la temporada."
        actions={
          <>
            <Link
              href="/proximos-eventos-y-competencias"
              className="btn-primary"
            >
              Próximos eventos
            </Link>

            <Link
              href="/tiempos-tope-y-ranking-estatal"
              className="btn-secondary"
            >
              Ver tiempos y ranking
            </Link>
          </>
        }
      />

      <section className="section content-section">
        <div className="section-head">
          <span className="eyebrow">
            <Icon name="target" /> Escenarios para destacar
          </span>

          <h2>Competir es convertir el entrenamiento en experiencia.</h2>

          <p>
            Las competencias permiten conocer el progreso, sumar experiencia y
            crear metas claras para cada etapa deportiva.
          </p>
        </div>

        <div className="cards-grid three-columns">
          {modalidades.map((item) => (
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

      <section className="section content-section">
        <div className="section-head">
          <span className="eyebrow">
            <Icon name="check" /> Ruta de participación
          </span>

          <h2>
            Información clara antes, durante y después de cada competencia.
          </h2>
        </div>

        <div className="steps-grid">
          <article className="step-card">
            <span>1</span>
            <h3>Consulta la convocatoria</h3>
            <p>
              Revisa sede, pruebas, categorías, requisitos y fechas publicadas.
            </p>
          </article>

          <article className="step-card">
            <span>2</span>
            <h3>Confirma con tu club</h3>
            <p>
              Coordina tu participación con tu entrenador o responsable
              deportivo.
            </p>
          </article>

          <article className="step-card">
            <span>3</span>
            <h3>Compite preparado</h3>
            <p>
              Llega con la información, documentos y preparación que
              correspondan al evento.
            </p>
          </article>

          <article className="step-card">
            <span>4</span>
            <h3>Revisa resultados</h3>
            <p>
              Da seguimiento a tus marcas y a las publicaciones oficiales
              posteriores.
            </p>
          </article>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <h2>
            Tu siguiente competencia empieza con una comunidad organizada.
          </h2>

          <p>
            Afíliate a ADAT y mantente cerca de la información que se publique
            para la temporada.
          </p>
        </div>

        <Link href="/afiliacion" className="btn-secondary">
          Afiliarme
        </Link>
      </section>

      <PublicFooter />
    </main>
  );
}
