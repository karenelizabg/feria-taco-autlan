import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import EventFacts from '../components/event/EventFacts';
import { asset } from '../lib/asset';

export default function Sede() {
  return (
    <section className="section section--venue" id="ubicacion">
      <div className="wrap venue">
        <div className="venue__info">
          <div className="venue__text reveal">
            <p className="eyebrow">Ubicación</p>
            <h2>Jardín Las Montañas</h2>
            <p className="venue__tagline">Donde comienza la primera Feria del Taco de Autlán.</p>
          </div>

          {/* Tres bloques separados por líneas punteadas, como el talón del boleto del hero */}
          <EventFacts className="reveal" />
        </div>

        <div className="venue__media reveal">
          <p className="venue__tag"><Icon name="pin" />Encuéntranos aquí</p>
          <img
            className="venue__photo"
            src={asset('assets/img/sede.webp')}
            srcSet={`${asset('assets/img/sede-800.webp')} 800w, ${asset('assets/img/sede.webp')} 1400w`}
            sizes="(min-width: 900px) 600px, 100vw"
            alt="Jardín Las Montañas: la fuente de talavera rodeada de árboles"
            width="1400"
            height="1050"
            loading="lazy"
            decoding="async"
          />

          <Button
            href="https://www.google.com/maps/search/?api=1&query=Jard%C3%ADn%20Las%20Monta%C3%B1as%2C%20Autl%C3%A1n%20de%20Navarro%2C%20Jalisco"
            variant="green"
            target="_blank"
            rel="noopener"
          >
            <Icon name="pin" />
            Abrir en Google Maps
          </Button>
        </div>
      </div>
    </section>
  );
}
