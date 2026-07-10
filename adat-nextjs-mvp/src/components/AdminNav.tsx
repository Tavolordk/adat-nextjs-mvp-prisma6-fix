'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from './icons';

export function AdminNav() {
  const router = useRouter();

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/login');
  }

  return (
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-brand">
        <Image src="/assets/adat-logo.png" alt="ADAT" width={110} height={58} />
        <span>Panel ADAT</span>
      </Link>
      <Link href="/admin" className="admin-link"><Icon name="dashboard" /> Dashboard</Link>
      <Link href="/admin/registros" className="admin-link"><Icon name="users" /> Registros</Link>
      <Link href="/" className="admin-link"><Icon name="wave" /> Sitio público</Link>
      <button className="admin-link admin-button" onClick={logout}><Icon name="logout" /> Cerrar sesión</button>
    </aside>
  );
}
