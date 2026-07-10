"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./icons";

export function AdminNav() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    function closeOnDesktop() {
      if (window.innerWidth > 980) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", closeWithEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.removeEventListener("keydown", closeWithEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  async function logout() {
    setMenuOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  }

  return (
    <aside className={`admin-sidebar${menuOpen ? " is-open" : ""}`}>
      <div className="admin-nav-header">
        <Link href="/admin" className="admin-brand" onClick={closeMenu}>
          <Image
            src="/assets/adat-logo.png"
            alt="ADAT"
            width={110}
            height={58}
          />
          <span>Panel ADAT</span>
        </Link>

        <button
          type="button"
          className="nav-toggle admin-nav-toggle"
          aria-label={
            menuOpen
              ? "Cerrar menú administrativo"
              : "Abrir menú administrativo"
          }
          aria-expanded={menuOpen}
          aria-controls="admin-navigation-menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="hamburger-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav
        id="admin-navigation-menu"
        className="admin-nav-menu"
        aria-label="Navegación administrativa"
      >
        <Link href="/admin" className="admin-link" onClick={closeMenu}>
          <Icon name="dashboard" /> Dashboard
        </Link>
        <Link
          href="/admin/registros"
          className="admin-link"
          onClick={closeMenu}
        >
          <Icon name="users" /> Registros
        </Link>
        <Link href="/" className="admin-link" onClick={closeMenu}>
          <Icon name="wave" /> Sitio público
        </Link>
        <button
          type="button"
          className="admin-link admin-button"
          onClick={logout}
        >
          <Icon name="logout" /> Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
