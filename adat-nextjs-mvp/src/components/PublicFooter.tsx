import { Icon } from "@/components/icons";

export function PublicFooter() {
  return (
    <footer className="footer">
      <strong>ADAT · Asociación de Deportes Acuáticos de Tlaxcala</strong>

      <div className="contact-row">
        <span>
          <Icon name="map" />
          Av. Juárez 6, Col. Centro San Esteban Tizatlán, Tlaxcala
        </span>

        <span>
          <Icon name="phone" />
          246 125 3315
        </span>

        <span>
          <Icon name="mail" />
          www.adat.com.mx
        </span>
      </div>
    </footer>
  );
}
