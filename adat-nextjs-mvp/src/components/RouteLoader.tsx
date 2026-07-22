"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SwimLoader } from "@/components/SwimLoader";

/**
 * ============================================================
 * PEGA AQUÍ LA URL DE TU GIF Y LISTO.
 * Es el GIF del modal de carga entre vistas (todo el sitio,
 * admin incluido). Si lo dejas vacío (""), usa el mismo GIF
 * configurado en SwimLoader, y si ese también está vacío,
 * el nadador SVG integrado.
 * ============================================================
 */
const ROUTE_GIF = "";

/** Tiempo máximo visible por seguridad (nunca se queda atorado) */
const SAFETY_MS = 6000;
/** Tiempo mínimo visible tras cambiar de ruta (evita parpadeo) */
const MIN_VISIBLE_MS = 300;
/** Duración del modal en la carga inicial */
const INITIAL_MS = 750;

/**
 * Modal de carga global:
 * - Aparece al cargar la página por primera vez (excepto en el home,
 *   donde ya vive el intro de salpicadura).
 * - Aparece al hacer clic en cualquier enlace interno y se oculta
 *   cuando la nueva vista terminó de renderizar.
 * Va montado en el layout raíz, así cubre público y admin.
 */
export function RouteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const isFirstRender = useRef(true);

  // carga inicial + fin de cada navegación
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      if (pathname !== "/") {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), INITIAL_MS);
        return () => clearTimeout(timer);
      }
      return;
    }

    // la ruta cambió: la vista nueva ya está montada
    const timer = setTimeout(() => setVisible(false), MIN_VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  // mostrar al hacer clic en enlaces internos
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const url = new URL(href, window.location.href);
      const samePath = url.pathname === window.location.pathname;
      if (samePath && url.hash) return; // ancla en la misma página
      if (samePath && url.search === window.location.search) return;

      setVisible(true);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // red de seguridad: nunca más de SAFETY_MS en pantalla
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), SAFETY_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className="route-loader" role="presentation">
      <div className="route-loader-card">
        <SwimLoader
          src={ROUTE_GIF || undefined}
          label="Cargando..."
          compact
        />
      </div>
    </div>
  );
}
