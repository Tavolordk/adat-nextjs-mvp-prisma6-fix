import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";

const associationLinks = [
  { href: "/liga-estatal-de-natacion", label: "Liga Estatal de Natación" },
  { href: "/disciplinas", label: "Disciplinas" },
  { href: "/competencias", label: "Competencias" },
  { href: "/tiempos-tope-y-ranking-estatal", label: "Tiempos tope y ranking" },
];

const participationLinks = [
  { href: "/afiliacion", label: "Solicitar afiliación" },
  { href: "/proximos-eventos-y-competencias", label: "Próximos eventos" },
  { href: "/login", label: "Acceso administrativo" },
];

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label="ADAT inicio">
            <Image
              src="/assets/adat-logo.png"
              alt="ADAT"
              width={146}
              height={76}
            />
            <span>ADAT</span>
          </Link>
          <p>
            Asociación de Deportes Acuáticos de Tlaxcala. Formamos y
            potenciamos atletas en disciplinas acuáticas en todo el estado.
          </p>
        </div>

        <nav className="footer-col" aria-label="Asociación">
          <h4>Asociación</h4>
          <ul>
            {associationLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Participa">
          <h4>Participa</h4>
          <ul>
            {participationLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h4>Contacto</h4>
          <div className="contact-row">
            <span>
              <Icon name="mail" className="icon" />
              <a href="mailto:contacto@adat.mx">contacto@adat.mx</a>
            </span>
            <span>
              <Icon name="phone" className="icon" />
              <a href="tel:+522460000000">+52 246 000 0000</a>
            </span>
            <span>
              <Icon name="map" className="icon" />
              Tlaxcala de Xicohténcatl, Tlaxcala
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {year} ADAT · Asociación de Deportes Acuáticos de Tlaxcala
        </span>
        <nav aria-label="Legal">
          <Link href="/afiliacion">Afíliate</Link>
          <Link href="/login">Admin</Link>
        </nav>
      </div>
    </footer>
  );
}
