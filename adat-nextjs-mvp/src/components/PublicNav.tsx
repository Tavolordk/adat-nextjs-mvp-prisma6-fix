"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function PublicNav() {
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

  return (
    <header className={`public-nav${menuOpen ? " is-open" : ""}`}>
      <Link
        href="/"
        className="brand"
        aria-label="ADAT inicio"
        onClick={closeMenu}
      >
        <Image
          src="/assets/adat-logo.png"
          alt="ADAT"
          width={146}
          height={76}
          priority
        />
        <span>ADAT</span>
      </Link>

      <button
        type="button"
        className="nav-toggle public-nav-toggle"
        aria-label={
          menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
        }
        aria-expanded={menuOpen}
        aria-controls="public-navigation-menu"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span className="hamburger-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <nav
        id="public-navigation-menu"
        className="public-nav-menu"
        aria-label="Navegación principal"
      >
        <Link href="/#programas" onClick={closeMenu}>
          Programas
        </Link>
        <Link href="/#objetivos" onClick={closeMenu}>
          Objetivos
        </Link>
        <Link href="/registro" className="nav-cta" onClick={closeMenu}>
          Registro
        </Link>
        <Link href="/login" onClick={closeMenu}>
          Admin
        </Link>
      </nav>
    </header>
  );
}
