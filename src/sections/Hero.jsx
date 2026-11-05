import { useEffect, useRef, useState } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Countdown from '../components/event/Countdown';
import useShare from '../hooks/useShare';
import { asset } from '../lib/asset';
import { EVENTO } from '../data/evento';

// En celular la ilustración no se ve al abrir la página: aparece solo cuando el usuario
// hace scroll (no al cargar, aunque ya esté en pantalla). En escritorio no se oculta nada
// (la clase solo tiene efecto en móvil, vía CSS).
function useShownOnScrollMobile(ref) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const isMobile = window.matchMedia('(max-width: 599px)').matches;
    if (!isMobile || !el) {
      setShown(true);
      return undefined;
    }
    const check = () => {
      // Solo cuenta como "scroll" si la página ya se movió y la ilustración está en pantalla
      if (window.scrollY > 0 && el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        setShown(true);
        window.removeEventListener('scroll', check);
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [ref]);

  return shown;
}

export default function Hero() {
  const share = useShare();
  const artRef = useRef(null);
  const artShown = useShownOnScrollMobile(artRef);

  return (
    <section className="hero hero--clean hero--home" id="inicio">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1>
            {/* Solo para buscadores y lectores de pantalla: no se ve (ver .hero__name en styles.css) */}
            <span className="hero__name">Feria del Taco Autlán 2026</span>
            {/* Desktop: 3 líneas calibradas al ancho de la columna */}
            <span className="hero__line hero__line--lg">En Autlán,</span>
            <span className="hero__line hero__line--lg">el próximo plan</span>
            <span className="hero__line hero__line--lg">se pide <span className="hl">con todo</span></span>
            {/* Móvil: 4 líneas fijas tal como las pide el diseño */}
            <span className="hero__line hero__line--sm">En Autlán,</span>
            <span className="hero__line hero__line--sm">el próximo</span>
            <span className="hero__line hero__line--sm">plan se pide</span>
            <span className="hero__line hero__line--sm"><span className="hl">con todo</span></span>
          </h1>

          <div className="cta">
            <Button
              href="https://maps.app.goo.gl/1xTpajkpjDYfH3fy6"
              variant="red"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo llegar
              <Icon name="arrow" className="icon--arrow" />
            </Button>
            <Button variant="ghost" onClick={share}>
              <Icon name="share" />
              Compartir la feria
            </Button>
          </div>
        </div>

        <div ref={artRef} className={`hero__art scroll-reveal${artShown ? ' is-shown' : ''}`}>
          <div className="ticket-wrap">
            {/* Mascota asomándose: fuera de .ticket porque su máscara (muescas) la recortaría */}
            <img className="mascot" src={asset('assets/img/mascota-asomandose.webp')} alt="" width="520" height="497" decoding="async" fetchPriority="high" />
            <div className="ticket">
              <div className="ticket__top">
                <p className="ticket__dow">Domingo</p>
                <p className="ticket__day">29</p>
                <p className="ticket__mon">Noviembre</p>
              </div>

              <div className="ticket__bottom">
                <Countdown start={EVENTO.inicio} end={EVENTO.fin} />
              </div>
            </div>
            <p className="sticker sticker--red">Entrada<br />gratuita</p>
          </div>
        </div>
      </div>
    </section>
  );
}
