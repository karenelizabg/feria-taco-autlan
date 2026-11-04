import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

// Convocatoria de la página para taquerías: título y botón a la izquierda, beneficios a la derecha.
// En celular el orden del DOM es el que se quiere: etiqueta, título, texto, fecha, botón y beneficios.
export default function ParticipaHero() {
  return (
    <section className="hero hero--clean hero--join" id="inicio">
      <div className="wrap join">
        <div className="join__copy">
          <p className="join__tag">Convocatoria abierta</p>

          <h1 className="join__title">
            Que tu taquería sea parte de la <span className="hl">primera feria del taco</span>
          </h1>

          <p className="join__lead">
            Invitamos a las taquerías de Autlán y la región a compartir sus especialidades y darse a conocer en este gran encuentro.
          </p>

          <div className="hero-pill">
            <span className="hero-pill__item">
              <Icon name="calendar" />
              <span>Domingo 29 de noviembre de 2026</span>
            </span>
            <span className="hero-pill__sep" aria-hidden="true">·</span>
            <span className="hero-pill__item">
              <Icon name="pin" />
              <span>Jardín Las Montañas</span>
            </span>
          </div>

          <div className="join__cta">
            <Button
              href="https://wa.me/523223785479?text=Hola%2C%20quiero%20reservar%20mi%20espacio%20en%20la%20Feria%20del%20Taco%20Autl%C3%A1n%202026."
              variant="red"
              size="lg"
              className="btn--hero-join"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quiero participar
              <Icon name="arrow" className="icon--arrow" />
            </Button>
          </div>

          <p className="join__help">
            ¿Tienes dudas? <a href="https://wa.me/523223785479?text=Hola%2C%20tengo%20dudas%20sobre%20la%20Feria%20del%20Taco%20Autl%C3%A1n%202026." target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>
          </p>
        </div>

        <aside className="perk" aria-labelledby="perk-titulo">
          <div className="perk__head">
            <h2 id="perk-titulo">¿Qué incluye tu espacio?</h2>
          </div>
          <ul className="perk__list">
            <li>
              <span className="perk__icon"><Icon name="utensils" /></span>
              <span>Espacio para tu taquería</span>
            </li>
            <li>
              <span className="perk__icon"><Icon name="tent" /></span>
              <span>Toldo incluido <em className="tag-soon">Por confirmar</em></span>
            </li>
            <li>
              <span className="perk__icon"><Icon name="zap" /></span>
              <span>Conexión eléctrica <em className="tag-soon">Por confirmar</em></span>
            </li>
            <li>
              <span className="perk__icon"><Icon name="megaphone" /></span>
              <span>Promoción en redes</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
