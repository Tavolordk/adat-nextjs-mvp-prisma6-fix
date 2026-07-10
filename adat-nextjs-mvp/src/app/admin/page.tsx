'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Stats = {
  total: number;
  nuevo: number;
  revisado: number;
  aceptado: number;
  rechazado: number;
};

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function load() {
      const response = await fetch('/api/admin/stats');
      if (response.status === 401) {
        router.replace('/login');
        return;
      }
      setStats(await response.json());
    }
    load();
  }, [router]);

  return (
    <section>
      <div className="admin-topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Resumen de solicitudes recibidas por el formulario público.</p>
        </div>
        <Link href="/admin/registros" className="btn-primary">Ver registros</Link>
      </div>

      {!stats ? (
        <div className="loading">Cargando indicadores...</div>
      ) : (
        <div className="stats-grid">
          <div className="stat-card"><span>Total</span><strong>{stats.total}</strong></div>
          <div className="stat-card"><span>Nuevos</span><strong>{stats.nuevo}</strong></div>
          <div className="stat-card"><span>Revisados</span><strong>{stats.revisado}</strong></div>
          <div className="stat-card"><span>Aceptados</span><strong>{stats.aceptado}</strong></div>
        </div>
      )}
    </section>
  );
}
