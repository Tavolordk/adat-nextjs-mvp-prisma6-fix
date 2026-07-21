"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { PublicFooter } from "@/components/PublicFooter";
import { PublicNav } from "@/components/PublicNav";
import { PublicPageHero } from "@/components/PublicPageHero";

const disciplinas = [
  {
    id: "natacion-juveniles",
    title: "Natación juveniles",
    type: "Natación competitiva",
    tone: "blue",
    icon: "wave" as const,
    description:
      "Formación deportiva para nadadoras y nadadores juveniles que buscan desarrollarse dentro de la natación competitiva.",
    audience:
      "Atletas juveniles que desean fortalecer su técnica, disciplina y experiencia competitiva.",
    focus: [
      "Técnica por estilos",
      "Preparación física",
      "Calendario competitivo",
    ],
    sections: [
      "Entrenamientos y calendario",
      "Convocatorias",
      "Marcas y resultados",
      "Comunicados oficiales",
    ],
  },
  {
    id: "seleccion-estatal-juveniles",
    title: "Selección estatal juveniles",
    type: "Representación estatal",
    tone: "navy",
    icon: "medal" as const,
    description:
      "Espacio de información para atletas que forman parte o buscan integrarse a los procesos de representación estatal.",
    audience:
      "Atletas juveniles en proceso de selección y familias que siguen su preparación representativa.",
    focus: [
      "Procesos selectivos",
      "Concentraciones",
      "Representación de Tlaxcala",
    ],
    sections: [
      "Convocatorias oficiales",
      "Concentraciones",
      "Competencias representativas",
      "Resultados de selección",
    ],
  },
  {
    id: "natacion-master",
    title: "Natación Master",
    type: "Natación competitiva",
    tone: "aqua",
    icon: "target" as const,
    description:
      "Comunidad para nadadoras y nadadores Master que desean mantenerse activos y participar en encuentros competitivos.",
    audience:
      "Personas adultas que entrenan, compiten o desean incorporarse a la comunidad Master.",
    focus: [
      "Entrenamiento continuo",
      "Eventos Master",
      "Convivencia deportiva",
    ],
    sections: [
      "Calendario Master",
      "Convocatorias",
      "Resultados",
      "Comunicados",
    ],
  },
  {
    id: "aguas-abiertas-juveniles",
    title: "Aguas abiertas juveniles",
    type: "Aguas abiertas",
    tone: "teal",
    icon: "wave" as const,
    description:
      "Información enfocada en la preparación, seguridad y participación de atletas juveniles de aguas abiertas.",
    audience:
      "Atletas juveniles interesados en competir y prepararse para pruebas fuera de alberca.",
    focus: [
      "Preparación en aguas abiertas",
      "Seguridad y logística",
      "Eventos por sede",
    ],
    sections: [
      "Eventos y sedes",
      "Convocatorias",
      "Recomendaciones",
      "Resultados",
    ],
  },
  {
    id: "aguas-abiertas-master",
    title: "Aguas abiertas Master",
    type: "Aguas abiertas",
    tone: "violet",
    icon: "wave" as const,
    description:
      "Un punto de encuentro para compartir actividades, avisos y resultados de aguas abiertas en categoría Master.",
    audience:
      "Nadadoras y nadadores Master que participan o se preparan para eventos de aguas abiertas.",
    focus: ["Eventos Master", "Logística de viaje", "Preparación segura"],
    sections: [
      "Eventos Master",
      "Convocatorias",
      "Información logística",
      "Resultados",
    ],
  },
  {
    id: "triatlon",
    title: "Triatlón",
    type: "Triatlón",
    tone: "orange",
    icon: "target" as const,
    description:
      "Contenido para la comunidad de triatlón: preparación acuática, convocatorias, eventos y comunicación deportiva.",
    audience:
      "Atletas que practican triatlón o desean complementar su preparación con el componente acuático.",
    focus: [
      "Preparación multidisciplinaria",
      "Eventos y rutas",
      "Convocatorias",
    ],
    sections: [
      "Calendario de eventos",
      "Convocatorias",
      "Preparación",
      "Resultados",
    ],
  },
  {
    id: "waterpolo",
    title: "Waterpolo",
    type: "Deporte de conjunto",
    tone: "red",
    icon: "users" as const,
    description:
      "Canal para equipos, atletas y familias que siguen el desarrollo de waterpolo en Tlaxcala.",
    audience:
      "Jugadoras, jugadores, entrenadores y familias vinculadas a equipos de waterpolo.",
    focus: ["Equipos y torneos", "Partidos", "Trabajo colectivo"],
    sections: [
      "Equipos y torneos",
      "Convocatorias",
      "Calendario de partidos",
      "Resultados",
    ],
  },
];

type Discipline = (typeof disciplinas)[number];

export default function DisciplinasPage() {
  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalTop, setModalTop] = useState(0);

  const cardsPerPage = 3;
  const totalPages = Math.ceil(disciplinas.length / cardsPerPage);
  const firstDisciplineIndex = currentPage * cardsPerPage;

  const visibleDisciplinas = disciplinas.slice(
    firstDisciplineIndex,
    firstDisciplineIndex + cardsPerPage,
  );

  useEffect(() => {
    if (!selectedDiscipline) return;

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedDiscipline(null);
      }
    }

    document.addEventListener("keydown", closeWithEscape);

    return () => document.removeEventListener("keydown", closeWithEscape);
  }, [selectedDiscipline]);

  function moveCarousel(direction: number) {
    setCurrentPage((page) => (page + direction + totalPages) % totalPages);
  }
  function openDiscipline(discipline: Discipline) {
    setModalTop(window.scrollY);
    setSelectedDiscipline(discipline);
  }
  return (
    <main className="public-page content-page discipline-page">
      {" "}
      <PublicNav />
      <PublicPageHero
        eyebrow={
          <>
            <Icon name="wave" /> Disciplinas deportivas
          </>
        }
        title={
          <>
            Cada disciplina tiene su{" "}
            <span className="gradient-text">propio espacio.</span>
          </>
        }
        description="Explora las siete disciplinas de ADAT y abre la ficha de cada una para conocer su enfoque, información y próximos contenidos."
        actions={
          <>
            <Link href="/afiliacion" className="btn-primary">
              Afíliate a ADAT
            </Link>

            <Link
              href="/proximos-eventos-y-competencias"
              className="btn-secondary"
            >
              Ver calendario general
            </Link>
          </>
        }
      />
      <section className="section content-section discipline-section">
        <div className="discipline-showcase-heading">
          <div className="section-head">
            <span className="eyebrow">
              <Icon name="target" /> Explora las disciplinas
            </span>

            <h2>Una tarjeta, una comunidad, toda su información.</h2>

            <p>
              Consulta cada disciplina en grupos de tres tarjetas. Abre la ficha
              de la disciplina que deseas conocer.
            </p>
          </div>

          <div className="discipline-carousel-meta">
            <span className="discipline-carousel-count">07 disciplinas</span>
            <span>
              Vista {currentPage + 1} de {totalPages}
            </span>
          </div>
        </div>

        <div
          className="discipline-carousel-shell"
          aria-roledescription="carrusel"
        >
          <button
            type="button"
            className="carousel-side-control carousel-side-control-prev"
            onClick={() => moveCarousel(-1)}
            aria-label="Ver las tres disciplinas anteriores"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div className="discipline-carousel-viewport" aria-live="polite">
            <div
              className={`discipline-carousel-page cards-${visibleDisciplinas.length}`}
              key={currentPage}
            >
              {visibleDisciplinas.map((discipline, index) => (
                <button
                  type="button"
                  className={`discipline-carousel-card tone-${discipline.tone}`}
                  key={discipline.id}
                  onClick={() => openDiscipline(discipline)}
                  aria-label={`Ver información de ${discipline.title}`}
                >
                  <div className="discipline-card-visual">
                    <span className="discipline-card-index">
                      {String(firstDisciplineIndex + index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <div className="discipline-card-icon">
                      <Icon name={discipline.icon} />
                    </div>

                    <span className="discipline-card-type">
                      {discipline.type}
                    </span>
                  </div>

                  <div className="discipline-card-content">
                    <h3>{discipline.title}</h3>

                    <p>{discipline.description}</p>

                    <div className="discipline-card-focus" aria-hidden="true">
                      {discipline.focus.slice(0, 2).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    <span className="discipline-card-action">
                      Ver información completa <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="carousel-side-control carousel-side-control-next"
            onClick={() => moveCarousel(1)}
            aria-label="Ver las siguientes tres disciplinas"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div
          className="discipline-carousel-pagination"
          aria-label="Seleccionar vista de disciplinas"
        >
          {Array.from({ length: totalPages }, (_, page) => (
            <button
              key={page}
              type="button"
              className={page === currentPage ? "is-active" : ""}
              onClick={() => setCurrentPage(page)}
              aria-label={`Ir a la vista ${page + 1} de ${totalPages}`}
              aria-current={page === currentPage ? "true" : undefined}
            />
          ))}
        </div>
      </section>
      <section
        className="discipline-info-band"
        aria-label="Información sobre las disciplinas"
      >
        <div>
          <span className="eyebrow">
            <Icon name="calendar" /> Información actualizable
          </span>

          <h2>Cada disciplina tendrá contenido independiente.</h2>

          <p>
            Convocatorias, calendarios, resultados y avisos podrán publicarse
            dentro de la ficha correspondiente sin mezclar información.
          </p>
        </div>

        <Link href="/competencias" className="btn-secondary">
          Ver competencias
        </Link>
      </section>
      <PublicFooter />
      {selectedDiscipline && (
        <div
          className="discipline-modal-backdrop"
          role="presentation"
          style={{ top: modalTop }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedDiscipline(null);
            }
          }}
        >
          <section
            className={`discipline-modal tone-${selectedDiscipline.tone}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="discipline-modal-title"
          >
            <button
              type="button"
              className="discipline-modal-close"
              onClick={() => setSelectedDiscipline(null)}
              aria-label="Cerrar información de la disciplina"
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="discipline-modal-hero">
              <div className="discipline-modal-icon">
                <Icon name={selectedDiscipline.icon} />
              </div>

              <span>{selectedDiscipline.type}</span>

              <h2 id="discipline-modal-title">{selectedDiscipline.title}</h2>

              <p>{selectedDiscipline.description}</p>
            </div>

            <div className="discipline-modal-body">
              <aside className="discipline-audience-card">
                <span>Dirigido a</span>
                <p>{selectedDiscipline.audience}</p>
              </aside>

              <div className="discipline-modal-main">
                <div className="discipline-modal-section">
                  <span className="discipline-modal-kicker">
                    Enfoque deportivo
                  </span>

                  <h3>Qué encontrarás en esta disciplina</h3>

                  <div className="discipline-focus-list">
                    {selectedDiscipline.focus.map((item) => (
                      <span key={item}>
                        <Icon name="check" /> {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="discipline-modal-section">
                  <span className="discipline-modal-kicker">
                    Próximos contenidos
                  </span>

                  <div className="discipline-modal-content-grid">
                    {selectedDiscipline.sections.map((section, index) => (
                      <article key={section}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <h4>{section}</h4>
                        <p>
                          Las publicaciones específicas de esta disciplina
                          aparecerán aquí.
                        </p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="discipline-modal-actions">
                  <Link
                    href="/afiliacion"
                    className="btn-primary"
                    onClick={() => setSelectedDiscipline(null)}
                  >
                    Solicitar afiliación
                  </Link>

                  <Link
                    href="/proximos-eventos-y-competencias"
                    className="btn-secondary"
                    onClick={() => setSelectedDiscipline(null)}
                  >
                    Consultar calendario
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
