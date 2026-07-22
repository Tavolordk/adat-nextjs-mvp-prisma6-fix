import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
export function PublicFooter() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <img src="/assets/adat-logo.png" alt="ADAT" />
            <span>ADAT</span>
          </div>
          <p>
            Asociación de Deportes Acuáticos de Tlaxcala. Formamos y potenciamos
            atletas en disciplinas acuáticas en todo el estado.
          </p>
        </div>

        <div className="footer-col">
          <h4>Asociación</h4>
          <ul>
            <li>
              <a href="/nosotros">Quiénes somos</a>
            </li>
            <li>
              <a href="/disciplinas">Disciplinas</a>
            </li>
            <li>
              <a href="/calendario">Calendario</a>
            </li>
            <li>
              <a href="/ranking">Ranking</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Afiliación</h4>
          <ul>
            <li>
              <a href="/afiliacion">Solicitar afiliación</a>
            </li>
            <li>
              <a href="/afiliacion/requisitos">Requisitos</a>
            </li>
            <li>
              <a href="/clubes">Clubes registrados</a>
            </li>
            <li>
              <a href="/admin">Acceso administrativo</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <div className="contact-row">
            <span>
              <MailIcon className="icon" /> contacto@adat.mx
            </span>
            <span>
              <PhoneIcon className="icon" /> +52 246 000 0000
            </span>
            <span>
              <MapPinIcon className="icon" /> Tlaxcala de Xicohténcatl, Tlax.
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 ADAT · Asociación de Deportes Acuáticos de Tlaxcala</span>
        <nav>
          <a href="/privacidad">Aviso de privacidad</a>
          <a href="/terminos">Términos de uso</a>
        </nav>
      </div>
    </footer>
  );
}
