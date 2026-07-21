import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";

const programas = [
  {
    icon: "wave" as const,
    title: "Natación competitiva",
    text: "Entrenamiento progresivo para atletas que buscan competir a nivel estatal, nacional e internacional.",
  },
  {
    icon: "target" as const,
    title: "Alto rendimiento",
    text: "Formación con disciplina, medición de avances y objetivos deportivos claros por temporada.",
  },
  {
    icon: "users" as const,
    title: "Comunidad acuática",
    text: "Vinculación entre atletas, entrenadores, familias, clubes e instituciones deportivas.",
  },
  {
    icon: "medal" as const,
    title: "Competencias",
    text: "Organización y participación constante en eventos deportivos para impulsar el talento tlaxcalteca.",
  },
];

const valores = [
  ["Disciplina", "Base de todo resultado."],
  ["Compromiso", "Cumplir incluso cuando no hay motivación."],
  ["Respeto", "Entre atletas, entrenadores y rivales."],
  ["Trabajo en equipo", "El éxito es colectivo."],
  ["Orgullo tlaxcalteca", "Representar con identidad."],
];

export default function Home() {
  return (
    <main className="public-page">
      <PublicNav />

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <Icon name="wave" /> Asociación de Deportes Acuáticos de Tlaxcala
          </span>

          <h1>
            Nacidos en Tlaxcala,
            <br />
            <span className="gradient-text">hechos en el agua.</span>
          </h1>

          <p>
            ADAT impulsa la formación de atletas acuáticos con disciplina,
            compromiso y excelencia deportiva para representar con orgullo a
            Tlaxcala.
          </p>

          <div className="hero-actions">
            <Link href="/afiliacion" className="btn-primary">
              Afiliarme ahora
            </Link>

            <Link href="/liga-estatal-de-natacion" className="btn-secondary">
              Conocer la liga
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="logo-panel">
            <Image
              src="/assets/adat-logo.png"
              alt="Logo ADAT"
              width={530}
              height={300}
              priority
            />
          </div>

          <div className="stat-strip">
            <div className="stat">
              <strong>2026</strong>
              <span>temporada de impulso</span>
            </div>

            <div className="stat">
              <strong>2450m</strong>
              <span>identidad competitiva</span>
            </div>

            <div className="stat">
              <strong>ADAT</strong>
              <span>Tlaxcala en el agua</span>
            </div>
          </div>
        </div>
      </section>

      <div className="search-band" aria-label="Accesos rápidos">
        <Link
          href="/disciplinas"
          className="search-field search-link"
          aria-label="Explorar disciplinas deportivas"
        >
          <small>Disciplinas</small>
          <strong>7 categorías deportivas</strong>
        </Link>

        <div className="search-field">
          <small>Sede</small>
          <strong>Tlaxcala</strong>
        </div>

        <div className="search-field">
          <small>Estatus</small>
          <strong>Afiliación abierta</strong>
        </div>

        <Link href="/afiliacion" className="btn-primary">
          Afiliarme
        </Link>
      </div>

      <section className="section" id="programas">
        <div className="section-head">
          <span className="eyebrow">
            <Icon name="shield" /> Formación deportiva
          </span>

          <h2>Una estructura acuática seria para talento tlaxcalteca.</h2>

          <p>
            Conoce la liga estatal, consulta competencias, revisa los tiempos
            tope y sigue el calendario oficial de ADAT.
          </p>
        </div>

        <div className="cards-grid">
          {programas.map((item) => (
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

      <section className="section split-section" id="objetivos">
        <div className="blue-panel">
          <span className="eyebrow">Misión y visión</span>

          <h2>Competidores capaces de destacar.</h2>

          <p>
            Desarrollar, formar y potenciar atletas en disciplinas acuáticas
            mediante programas de entrenamiento de alto nivel.
          </p>

          <p>
            La meta es consolidar a ADAT como asociación líder en Tlaxcala y
            referente nacional en desarrollo de talento acuático.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-card">
            <strong>Corto plazo</strong>
            <h3>Captación y posicionamiento</h3>

            <ul>
              <li>Incrementar número de atletas activos.</li>
              <li>Posicionar ADAT en redes sociales.</li>
              <li>Conseguir patrocinadores estratégicos.</li>
            </ul>
          </div>

          <div className="timeline-card">
            <strong>Mediano plazo</strong>
            <h3>Competencia y alianzas</h3>

            <ul>
              <li>
                Participación constante en competencias estatales y nacionales.
              </li>
              <li>Desarrollo de talentos destacados.</li>
              <li>Alianzas con instituciones deportivas.</li>
            </ul>
          </div>

          <div className="timeline-card">
            <strong>Largo plazo</strong>
            <h3>Referencia nacional</h3>

            <ul>
              <li>Ser referencia nacional.</li>
              <li>Exportar atletas a nivel competitivo alto.</li>
              <li>Consolidar estructura profesional.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="eyebrow">
            <Icon name="check" /> Valores ADAT
          </span>

          <h2>La cultura deportiva que sostiene el rendimiento.</h2>
        </div>

        <div className="cards-grid">
          {valores.map(([title, text]) => (
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

      <section className="cta-section">
        <div>
          <h2>Afíliate a ADAT.</h2>

          <p>
            Inicia tu solicitud de afiliación para formar parte de la comunidad
            acuática de Tlaxcala.
          </p>
        </div>

        <Link href="/afiliacion" className="btn-secondary">
          Ir a afiliación
        </Link>
      </section>

      <PublicFooter />
    </main>
  );
}
