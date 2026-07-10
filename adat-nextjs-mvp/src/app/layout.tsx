import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ADAT | Asociación de Deportes Acuáticos de Tlaxcala',
  description: 'Registro, formación y administración deportiva de ADAT Tlaxcala.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
