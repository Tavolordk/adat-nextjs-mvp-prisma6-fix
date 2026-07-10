'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  municipality: '',
  discipline: 'NATACION',
  level: 'PRINCIPIANTE',
  clubOrSchool: '',
  guardianName: '',
  guardianPhone: '',
  comments: ''
};

export default function RegistroPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  function updateField(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch('/api/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const payload = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage({ type: 'error', text: payload.message || 'No fue posible guardar el registro.' });
      return;
    }

    setForm(initialForm);
    setMessage({ type: 'ok', text: payload.message || 'Registro recibido correctamente.' });
  }

  return (
    <main className="form-page">
      <PublicNav />
      <section className="form-shell">
        <div className="form-card">
          <Link href="/" className="btn-ghost">← Volver al inicio</Link>
          <h1>Registro ADAT</h1>
          <p>
            Completa tus datos para que la Asociación de Deportes Acuáticos de Tlaxcala pueda revisar tu solicitud.
          </p>

          {message && <div className={`alert ${message.type}`}>{message.text}</div>}

          <form className="form-grid" onSubmit={submit}>
            <div className="form-field">
              <label>Nombre</label>
              <input required value={form.firstName} onChange={(e) => updateField('firstName', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Apellidos</label>
              <input required value={form.lastName} onChange={(e) => updateField('lastName', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Correo</label>
              <input required type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Teléfono</label>
              <input required value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Fecha de nacimiento</label>
              <input type="date" value={form.birthDate} onChange={(e) => updateField('birthDate', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Municipio</label>
              <input required value={form.municipality} onChange={(e) => updateField('municipality', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Disciplina</label>
              <select value={form.discipline} onChange={(e) => updateField('discipline', e.target.value)}>
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
              <select value={form.level} onChange={(e) => updateField('level', e.target.value)}>
                <option value="PRINCIPIANTE">Principiante</option>
                <option value="INTERMEDIO">Intermedio</option>
                <option value="AVANZADO">Avanzado</option>
                <option value="ALTO_RENDIMIENTO">Alto rendimiento</option>
              </select>
            </div>
            <div className="form-field">
              <label>Club o escuela</label>
              <input value={form.clubOrSchool} onChange={(e) => updateField('clubOrSchool', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Nombre del tutor</label>
              <input value={form.guardianName} onChange={(e) => updateField('guardianName', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Teléfono del tutor</label>
              <input value={form.guardianPhone} onChange={(e) => updateField('guardianPhone', e.target.value)} />
            </div>
            <div className="form-field full">
              <label>Comentarios</label>
              <textarea value={form.comments} onChange={(e) => updateField('comments', e.target.value)} />
            </div>
            <div className="form-field full">
              <button className="btn-primary" disabled={loading} type="submit">
                {loading ? 'Guardando...' : 'Enviar registro'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
