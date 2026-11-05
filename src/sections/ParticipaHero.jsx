import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Sticker from '../components/ui/Sticker';
import { asset } from '../lib/asset';

// Hero de la página para taquerías: qué ofrece la feria y el botón a WhatsApp.
export default function ParticipaHero() {
  return (
    <section className="hero hero--clean hero--join" id="inicio">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1>
            Que tu taquería sea <span className="hl">parte de la primera feria del taco</span>
          </h1>
          <p className="lead">Lleva el sabor de tu taquería a nuevos clientes. Forma parte de la primera <strong>Feria del Taco Autlán</strong>, presenta tus especialidades y aprovecha esta oportunidad para dar a conocer tu negocio.</p>
          <p className="lead">¡Cupo limitado! Asegura tu lugar y sé parte de esta primera edición.</p>

          <div className="cta">
            <Button
              href="https://wa.me/523223785479?text=Hola%2C%20quiero%20reservar%20mi%20espacio%20en%20la%20Feria%20del%20Taco%20Autl%C3%A1n%202026."
              variant="red"
              size="lg"
              className="btn--hero-join"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reservar mi espacio
              <Icon name="arrow" className="icon--arrow" />
            </Button>
          </div>

          <p className="join__help">
            ¿Tienes dudas? <a href="https://wa.me/523223785479?text=Hola%2C%20tengo%20dudas%20sobre%20la%20Feria%20del%20Taco%20Autl%C3%A1n%202026." target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>
          </p>
        </div>

        <div className="hero__art">
          {/* Beneficios como boleto horizontal: encabezado y lista */}
          <div className="perk-wrap">
            <img className="perk__mascot" src={asset('assets/img/mascota-asomandose.webp')} alt="" width="520" height="497" decoding="async" />
            <Sticker tone="red">Lugares limitados</Sticker>
            <div className="perk">
              <div className="perk__head">
                <h2>Tu lugar incluye</h2>
              </div>
              <ul className="perk__list">
                <li>
                  <span className="perk__icon"><Icon name="utensils" /></span>
                  <span>Zona para tu taquería</span>
                </li>
                <li>
                  <span className="perk__icon"><Icon name="tent" /></span>
                  <span>Toldo incluido</span>
                </li>
                <li>
                  <span className="perk__icon"><Icon name="zap" /></span>
                  <span>Corriente eléctrica</span>
                </li>
                <li>
                  <span className="perk__icon"><Icon name="megaphone" /></span>
                  <span>Promoción en redes</span>
                </li>              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
