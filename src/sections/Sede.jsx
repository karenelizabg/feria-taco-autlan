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
            <p className="venue__tagline">Donde comienza la primera Feria del Taco Autlán.</p>
          </div>

          {/* Tres bloques separados por líneas punteadas, como el talón del boleto del hero */}
          <EventFacts className="reveal" />

          {/* En escritorio queda bajo la tira de datos; en celular va al final, centrado */}
          <Button
            href="https://maps.app.goo.gl/1xTpajkpjDYfH3fy6"
            variant="green"
            className="venue__cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="pin" />
            Abrir en Google Maps
          </Button>
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
        </div>
      </div>
    </section>
  );
}
