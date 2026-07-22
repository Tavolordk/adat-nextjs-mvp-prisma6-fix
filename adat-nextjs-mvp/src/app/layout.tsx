import type { Metadata } from "next";
import "./globals.css";
import { RouteLoader } from "@/components/RouteLoader";

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
      <body>
        <RouteLoader />
        {children}
      </body>
    </html>
  );
}
