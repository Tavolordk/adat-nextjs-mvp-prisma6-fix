"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";
import {
  disciplineLabels,
  formatDate,
  levelLabels,
  statusLabels,
} from "@/lib/format";

type Registration = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate?: string | null;
  municipality: string;
  discipline: string;
  level: string;
  status: string;
  clubOrSchool?: string | null;
  guardianName?: string | null;
  guardianPhone?: string | null;
  comments?: string | null;
  createdAt: string;
};

type DetailForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  municipality: string;
  discipline: string;
  level: string;
  status: string;
  clubOrSchool: string;
  guardianName: string;
  guardianPhone: string;
  comments: string;
};

const statuses = ["NUEVO", "REVISADO", "ACEPTADO", "RECHAZADO"];

function toDetailForm(registration: Registration): DetailForm {
  return {
    firstName: registration.firstName,
    lastName: registration.lastName,
    email: registration.email,
    phone: registration.phone,
    birthDate: registration.birthDate?.slice(0, 10) ?? "",
    municipality: registration.municipality,
    discipline: registration.discipline,
    level: registration.level,
    status: registration.status,
    clubOrSchool: registration.clubOrSchool ?? "",
    guardianName: registration.guardianName ?? "",
    guardianPhone: registration.guardianPhone ?? "",
    comments: registration.comments ?? "",
  };
}

export default function RegistrosPage() {
  const router = useRouter();
  const [records, setRecords] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [detailForm, setDetailForm] = useState<DetailForm | null>(null);
  const [detailError, setDetailError] = useState("");
  const [savingDetails, setSavingDetails] = useState(false);

  const query = useMemo(() => {
    const params = new URLSearchParams();

    if (q.trim()) {
      params.set("q", q.trim());
    }

    if (status) {
      params.set("status", status);
    }

    return params.toString();
  }, [q, status]);

  async function loadRecords() {
    setLoading(true);

    const response = await fetch(
      `/api/registrations${query ? `?${query}` : ""}`,
    );

    if (response.status === 401) {
      router.replace("/login");
      return;
    }

    const payload = await response.json();
    setRecords(payload.registrations || []);
    setLoading(false);
  }

  useEffect(() => {
    loadRecords();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (!selectedRegistration) {
      return;
    }

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && !savingDetails) {
        setSelectedRegistration(null);
        setDetailForm(null);
        setDetailError("");
      }
    }

    document.addEventListener("keydown", closeWithEscape);

    return () => {
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [selectedRegistration, savingDetails]);

  async function changeStatus(id: string, nextStatus: string) {
    const response = await fetch(`/api/registrations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "No fue posible actualizar.");
      return;
    }

    setMessage("Afiliación actualizada correctamente.");
    await loadRecords();
  }

  function openDetails(registration: Registration) {
    setSelectedRegistration(registration);
    setDetailForm(toDetailForm(registration));
    setDetailError("");
  }

  function closeDetails() {
    if (savingDetails) {
      return;
    }

    setSelectedRegistration(null);
    setDetailForm(null);
    setDetailError("");
  }

  function updateDetailField(field: keyof DetailForm, value: string) {
    setDetailForm((current) =>
      current ? { ...current, [field]: value } : current,
    );
  }

  async function saveDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedRegistration || !detailForm) {
      return;
    }

    setSavingDetails(true);
    setDetailError("");

    const response = await fetch(
      `/api/registrations/${selectedRegistration.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...detailForm,
          birthDate: detailForm.birthDate || null,
        }),
      },
    );

    const payload = await response.json();
    setSavingDetails(false);

    if (!response.ok) {
      setDetailError(payload.message || "No fue posible guardar los cambios.");
      return;
    }

    setMessage("Afiliación actualizada correctamente.");
    closeDetails();
    await loadRecords();
  }

  async function deleteRecord(id: string) {
    const ok = window.confirm("¿Eliminar esta afiliación?");

    if (!ok) {
      return;
    }

    const response = await fetch(`/api/registrations/${id}`, {
      method: "DELETE",
    });

    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "No fue posible eliminar.");
      return;
    }

    setMessage("Afiliación eliminada.");
    await loadRecords();
  }

  return (
    <section>
      <div className="admin-topbar">
        <div>
          <h1>Afiliaciones</h1>
          <p>
            Solicitudes de afiliación recibidas desde la página pública de ADAT.
          </p>
        </div>

        <a href="/api/admin/export/registrations" className="btn-primary">
          Exportar CSV
        </a>
      </div>

      <div className="form-card" style={{ marginBottom: "1rem" }}>
        <div className="form-grid">
          <div className="form-field">
            <label>Buscar</label>

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Nombre, correo, teléfono o municipio"
            />
          </div>

          <div className="form-field">
            <label>Estatus</label>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Todos</option>

              {statuses.map((item) => (
                <option key={item} value={item}>
                  {statusLabels[item]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {message && <div className="alert ok">{message}</div>}

      <div className="table-card">
        {loading ? (
          <div className="loading">Cargando afiliaciones...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Atleta</th>
                <th>Contacto</th>
                <th>Disciplina</th>
                <th>Municipio</th>
                <th>Fecha</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {records.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>
                      {item.firstName} {item.lastName}
                    </strong>
                    <br />
                    <small>{item.clubOrSchool || "Sin club/escuela"}</small>
                  </td>

                  <td>
                    {item.email}
                    <br />
                    <small>{item.phone}</small>
                  </td>

                  <td>
                    {disciplineLabels[item.discipline] || item.discipline}
                    <br />
                    <small>{levelLabels[item.level] || item.level}</small>
                  </td>

                  <td>{item.municipality}</td>

                  <td>{formatDate(item.createdAt)}</td>

                  <td>
                    <span className={`badge ${item.status}`}>
                      {statusLabels[item.status] || item.status}
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="small-button view-button"
                        onClick={() => openDetails(item)}
                        aria-label={`Ver detalle de ${item.firstName} ${item.lastName}`}
                        title="Ver y editar afiliación"
                      >
                        <Icon name="eye" /> Ver
                      </button>

                      <select
                        value={item.status}
                        onChange={(e) => changeStatus(item.id, e.target.value)}
                      >
                        {statuses.map((statusItem) => (
                          <option key={statusItem} value={statusItem}>
                            {statusLabels[statusItem]}
                          </option>
                        ))}
                      </select>

                      <button
                        className="small-button danger"
                        onClick={() => deleteRecord(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!records.length && (
                <tr>
                  <td colSpan={7}>No hay afiliaciones con esos filtros.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {selectedRegistration && detailForm && (
        <div
          className="detail-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDetails();
            }
          }}
        >
          <section
            className="detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-modal-title"
          >
            <div className="detail-modal-header">
              <div>
                <span className="detail-modal-folio">
                  Folio: {selectedRegistration.id}
                </span>

                <h2 id="detail-modal-title">Detalle de afiliación</h2>

                <p>Consulta y corrige los datos cuando sea necesario.</p>
              </div>

              <button
                type="button"
                className="detail-modal-close"
                onClick={closeDetails}
                aria-label="Cerrar detalle"
                disabled={savingDetails}
              >
                ×
              </button>
            </div>

            {detailError && <div className="alert error">{detailError}</div>}

            <form className="form-grid detail-form" onSubmit={saveDetails}>
              <div className="form-field">
                <label>Nombre</label>
                <input
                  required
                  value={detailForm.firstName}
                  onChange={(e) =>
                    updateDetailField("firstName", e.target.value)
                  }
                />
              </div>

              <div className="form-field">
                <label>Apellidos</label>
                <input
                  required
                  value={detailForm.lastName}
                  onChange={(e) =>
                    updateDetailField("lastName", e.target.value)
                  }
                />
              </div>

              <div className="form-field">
                <label>Correo</label>
                <input
                  required
                  type="email"
                  value={detailForm.email}
                  onChange={(e) => updateDetailField("email", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Teléfono</label>
                <input
                  required
                  value={detailForm.phone}
                  onChange={(e) => updateDetailField("phone", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Fecha de nacimiento</label>
                <input
                  type="date"
                  value={detailForm.birthDate}
                  onChange={(e) =>
                    updateDetailField("birthDate", e.target.value)
                  }
                />
              </div>

              <div className="form-field">
                <label>Municipio</label>
                <input
                  required
                  value={detailForm.municipality}
                  onChange={(e) =>
                    updateDetailField("municipality", e.target.value)
                  }
                />
              </div>

              <div className="form-field">
                <label>Disciplina</label>
                <select
                  value={detailForm.discipline}
                  onChange={(e) =>
                    updateDetailField("discipline", e.target.value)
                  }
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
                <label>Nivel</label>
                <select
                  value={detailForm.level}
                  onChange={(e) => updateDetailField("level", e.target.value)}
                >
                  <option value="PRINCIPIANTE">Principiante</option>
                  <option value="INTERMEDIO">Intermedio</option>
                  <option value="AVANZADO">Avanzado</option>
                  <option value="ALTO_RENDIMIENTO">Alto rendimiento</option>
                </select>
              </div>

              <div className="form-field">
                <label>Club o escuela</label>
                <input
                  value={detailForm.clubOrSchool}
                  onChange={(e) =>
                    updateDetailField("clubOrSchool", e.target.value)
                  }
                />
              </div>

              <div className="form-field">
                <label>Estatus</label>
                <select
                  value={detailForm.status}
                  onChange={(e) => updateDetailField("status", e.target.value)}
                >
                  {statuses.map((statusItem) => (
                    <option key={statusItem} value={statusItem}>
                      {statusLabels[statusItem]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Nombre del tutor</label>
                <input
                  value={detailForm.guardianName}
                  onChange={(e) =>
                    updateDetailField("guardianName", e.target.value)
                  }
                />
              </div>

              <div className="form-field">
                <label>Teléfono del tutor</label>
                <input
                  value={detailForm.guardianPhone}
                  onChange={(e) =>
                    updateDetailField("guardianPhone", e.target.value)
                  }
                />
              </div>

              <div className="form-field full">
                <label>Comentarios</label>
                <textarea
                  value={detailForm.comments}
                  onChange={(e) =>
                    updateDetailField("comments", e.target.value)
                  }
                />
              </div>

              <div className="detail-modal-actions form-field full">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={closeDetails}
                  disabled={savingDetails}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={savingDetails}
                >
                  {savingDetails ? "Guardando cambios..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
