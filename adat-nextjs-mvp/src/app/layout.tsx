import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADAT | Asociación de Deportes Acuáticos de Tlaxcala",
  description:
    "Afiliación, liga estatal, competencias, tiempos tope, ranking y calendario deportivo de ADAT Tlaxcala.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
