'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { disciplineLabels, formatDate, levelLabels, statusLabels } from '@/lib/format';

type Registration = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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

const statuses = ['NUEVO', 'REVISADO', 'ACEPTADO', 'RECHAZADO'];

export default function RegistrosPage() {
  const router = useRouter();
  const [records, setRecords] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (status) params.set('status', status);
    return params.toString();
  }, [q, status]);

  async function loadRecords() {
    setLoading(true);
    const response = await fetch(`/api/registrations${query ? `?${query}` : ''}`);
    if (response.status === 401) {
      router.replace('/login');
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

  async function changeStatus(id: string, nextStatus: string) {
    const response = await fetch(`/api/registrations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus })
    });
    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.message || 'No fue posible actualizar.');
      return;
    }
    setMessage('Registro actualizado correctamente.');
    await loadRecords();
  }

  async function deleteRecord(id: string) {
    const ok = window.confirm('¿Eliminar este registro?');
    if (!ok) return;
    const response = await fetch(`/api/registrations/${id}`, { method: 'DELETE' });
    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.message || 'No fue posible eliminar.');
      return;
    }
    setMessage('Registro eliminado.');
    await loadRecords();
  }

  return (
    <section>
      <div className="admin-topbar">
        <div>
          <h1>Registros</h1>
          <p>Solicitudes recibidas desde la página pública de ADAT.</p>
        </div>
        <a href="/api/admin/export/registrations" className="btn-primary">Exportar CSV</a>
      </div>

      <div className="form-card" style={{ marginBottom: '1rem' }}>
        <div className="form-grid">
          <div className="form-field">
            <label>Buscar</label>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nombre, correo, teléfono o municipio" />
          </div>
          <div className="form-field">
            <label>Estatus</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Todos</option>
              {statuses.map((item) => <option key={item} value={item}>{statusLabels[item]}</option>)}
            </select>
          </div>
        </div>
      </div>

      {message && <div className="alert ok">{message}</div>}

      <div className="table-card">
        {loading ? (
          <div className="loading">Cargando registros...</div>
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
                    <strong>{item.firstName} {item.lastName}</strong><br />
                    <small>{item.clubOrSchool || 'Sin club/escuela'}</small>
                  </td>
                  <td>
                    {item.email}<br />
                    <small>{item.phone}</small>
                  </td>
                  <td>
                    {disciplineLabels[item.discipline] || item.discipline}<br />
                    <small>{levelLabels[item.level] || item.level}</small>
                  </td>
                  <td>{item.municipality}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td><span className={`badge ${item.status}`}>{statusLabels[item.status] || item.status}</span></td>
                  <td>
                    <div className="table-actions">
                      <select value={item.status} onChange={(e) => changeStatus(item.id, e.target.value)}>
                        {statuses.map((statusItem) => <option key={statusItem} value={statusItem}>{statusLabels[statusItem]}</option>)}
                      </select>
                      <button className="small-button danger" onClick={() => deleteRecord(item.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!records.length && (
                <tr>
                  <td colSpan={7}>No hay registros con esos filtros.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
