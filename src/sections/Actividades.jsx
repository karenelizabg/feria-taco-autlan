import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import SectionHead from '../components/ui/SectionHead';
import Tile from '../components/ui/Tile';
import { asset } from '../lib/asset';

const SERVICIOS = [
  { icon: 'car', label: 'Estacionamiento' },
  { icon: 'restroom', label: 'Servicio de baños' },
  { icon: 'shield', label: 'Seguridad y Protección Civil' },
];

// La comida es la protagonista (tarjeta grande); música, danza y eventos la acompañan.
export default function Actividades() {
  return (
    <section className="section section--green section--fiesta" id="que-habra">
      <div className="wrap">
        <SectionHead
          eyebrow="Qué habrá"
          title={<>¡Aquí se arma <span>la fiesta!</span></>}
        />

        <div className="fiesta-grid">
          <article className="food-card reveal">
            <img
              className="food-card__photo"
              src={asset('assets/img/tacos-pastor.webp')}
              srcSet={`${asset('assets/img/tacos-pastor-720.webp')} 720w, ${asset('assets/img/tacos-pastor.webp')} 1200w`}
              sizes="(min-width: 1024px) 680px, 100vw"
              alt="Tacos al pastor con cebolla y cilantro"
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
            />
            <div className="food-card__body">
              <span className="tile__icon tile__icon--red food-card__icon"><Icon name="utensils" /></span>
              <p className="card-eyebrow">Lo principal</p>
              <h3>Área de comida</h3>
              <p>Las taquerías de Autlán y la región, reunidas en un mismo lugar. ¿Con cuál empiezas?</p>
              <Button href="#taquerias" variant="ghost">
                Ver taquerías participantes
                <Icon name="arrow" className="icon--arrow" />
              </Button>
            </div>
          </article>

          <div className="fiesta-side">
            <Tile icon="music" title="Música en vivo" tag="Por anunciar">
              Grupos musicales invitados para ambientar la feria.
            </Tile>
            <Tile icon="dance" title="Danza tradicional">
              Disfruta de bailes tradicionales
            </Tile>
            <Tile icon="calendar" title="Eventos y actividades" tag="Por anunciar">
              Dinámicas y actividades para disfrutar durante el evento.
            </Tile>
          </div>
        </div>

        <div className="services reveal">
          <ul aria-label="Servicios">
            {SERVICIOS.map((s) => (
              <li key={s.icon}>
                <span className="tile__icon tile__icon--red"><Icon name={s.icon} /></span>
                {s.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
