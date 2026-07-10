import { AdminNav } from '@/components/AdminNav';

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-content">{children}</main>
    </div>
  );
}
