"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { PublicNav } from "@/components/PublicNav";
import { Icon } from "@/components/icons";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
  municipality: "",
  discipline: "NATACION",
  level: "PRINCIPIANTE",
  clubOrSchool: "",
  guardianName: "",
  guardianPhone: "",
  comments: "",
};

export default function AfiliacionPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "ok" | "error";
    text: string;
  } | null>(null);

  function updateField(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const payload = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage({
        type: "error",
        text:
          payload.message ||
          "No fue posible guardar la solicitud de afiliación.",
      });
      return;
    }

    setForm(initialForm);
    setMessage({
      type: "ok",
      text: `Solicitud de afiliación recibida correctamente. Folio: ${
        payload.registration?.id ?? "generado"
      }`,
    });
  }

  return (
    <main className="form-page">
      <PublicNav />

      <section className="form-shell">
        <div className="form-card">
          <Link href="/" className="btn-ghost">
            ← Volver al inicio
          </Link>

          <h1>Afiliación ADAT</h1>

          <p>
            Completa tus datos para que la Asociación de Deportes Acuáticos de
            Tlaxcala revise tu solicitud de afiliación.
          </p>

          {message && (
            <div className={`alert ${message.type}`}>{message.text}</div>
          )}

          <form className="form-grid" onSubmit={submit}>
            <h2 className="form-section-title">Datos del atleta</h2>

            <div className="form-field">
              <label htmlFor="af-nombre">Nombre</label>
              <input
                id="af-nombre"
                autoComplete="given-name"
                required
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="af-apellidos">Apellidos</label>
              <input
                id="af-apellidos"
                autoComplete="family-name"
                required
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="af-correo">Correo</label>
              <input
                id="af-correo"
                autoComplete="email"
                required
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="af-telefono">Teléfono</label>
              <input
                id="af-telefono"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                required
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="af-nacimiento">Fecha de nacimiento</label>
              <input
                id="af-nacimiento"
                type="date"
                value={form.birthDate}
                onChange={(e) => updateField("birthDate", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="af-municipio">Municipio</label>
              <input
                id="af-municipio"
                placeholder="p. ej. Apizaco"
                required
                value={form.municipality}
                onChange={(e) => updateField("municipality", e.target.value)}
              />
            </div>

            <h2 className="form-section-title">Perfil deportivo</h2>

            <div className="form-field">
              <label htmlFor="af-disciplina">Disciplina</label>
              <select
                id="af-disciplina"
                value={form.discipline}
                onChange={(e) => updateField("discipline", e.target.value)}
              >
                <option value="NATACION">Natación</option>
                <option value="AGUAS_ABIERTAS">Aguas abiertas</option>
                <option value="CLAVADOS">Clavados</option>
                <option value="WATERPOLO">Waterpolo</option>
                <option value="NADO_ARTISTICO">Nado artístico</option>
                <option value="OTRO">Otro</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="af-nivel">Nivel</label>
              <select
                id="af-nivel"
                value={form.level}
                onChange={(e) => updateField("level", e.target.value)}
              >
                <option value="PRINCIPIANTE">Principiante</option>
                <option value="INTERMEDIO">Intermedio</option>
                <option value="AVANZADO">Avanzado</option>
                <option value="ALTO_RENDIMIENTO">Alto rendimiento</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="af-club">Club o escuela</label>
              <input
                id="af-club"
                placeholder="Opcional"
                value={form.clubOrSchool}
                onChange={(e) => updateField("clubOrSchool", e.target.value)}
              />
            </div>

            <h2 className="form-section-title">Tutor o responsable</h2>
            <p className="form-hint">
              Obligatorio si el atleta es menor de edad.
            </p>

            <div className="form-field">
              <label htmlFor="af-tutor-nombre">Nombre del tutor</label>
              <input
                id="af-tutor-nombre"
                autoComplete="name"
                value={form.guardianName}
                onChange={(e) => updateField("guardianName", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="af-tutor-telefono">Teléfono del tutor</label>
              <input
                id="af-tutor-telefono"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={form.guardianPhone}
                onChange={(e) => updateField("guardianPhone", e.target.value)}
              />
            </div>

            <h2 className="form-section-title">Comentarios</h2>

            <div className="form-field full">
              <label htmlFor="af-comentarios">
                ¿Algo más que debamos saber?
              </label>
              <textarea
                id="af-comentarios"
                placeholder="Opcional: experiencia previa, horarios, dudas..."
                value={form.comments}
                onChange={(e) => updateField("comments", e.target.value)}
              />
            </div>

            <div className="form-privacy">
              <Icon name="shield" className="icon" />
              <span>
                Tus datos se usan únicamente para revisar tu solicitud de
                afiliación y contactarte sobre actividades de ADAT.
              </span>
            </div>

            <div className="form-field full">
              <button className="btn-primary" disabled={loading} type="submit">
                {loading
                  ? "Enviando solicitud..."
                  : "Enviar solicitud de afiliación"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
