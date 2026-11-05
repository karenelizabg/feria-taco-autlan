import { useState, useRef, useEffect, useCallback } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import TaqueriaCard from '../components/taquerias/TaqueriaCard';
import TaqueriaSkeleton from '../components/taquerias/TaqueriaSkeleton';
import useTaquerias from '../hooks/useTaquerias';
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import { asset } from '../lib/asset';

const pad = (n) => String(n).padStart(2, '0');

export default function Taquerias() {
  const { status, items, reintentar } = useTaquerias();
  // Las tarjetas llegan después del primer render: hay que observarlas para que aparezcan al entrar en pantalla.
  useRevealOnScroll([status, items.length]);
  const trackRef = useRef(null);
  // Rango de taquerías visibles en el carrusel (base 1), p. ej. 04–06 en escritorio o 02 en celular.
  const [rango, setRango] = useState({ primera: 1, ultima: 1 });

  // Calcula el rango visible solo una vez por frame y solo actualiza el estado si cambió,
  // para no re-renderizar la sección en cada evento de scroll mientras se desliza.
  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    const slides = el?.children;
    if (!el || !slides || slides.length === 0) return;

    const total = slides.length;
    const ancho = slides[0].offsetWidth;
    const paso = total > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : ancho;
    const separacion = paso - ancho;
    const porVista = Math.max(1, Math.round((el.clientWidth + separacion) / paso));

    const indice = Math.min(Math.round(el.scrollLeft / paso), Math.max(0, total - porVista));
    const primera = indice + 1;
    const ultima = Math.min(total, primera + porVista - 1);
    setRango((prev) => (prev.primera === primera && prev.ultima === ultima ? prev : { primera, ultima }));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateScrollState();
      });
    };

    updateScrollState();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [updateScrollState, items.length]);

  // Carrusel infinito: al pasar de la última página vuelve a la primera, y al retroceder desde la primera va a la última.
  const scrollPrev = () => {
    const el = trackRef.current;
    if (!el) return;
    if (el.scrollLeft <= 15) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    const el = trackRef.current;
    if (!el) return;
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 15) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollNext();
    }
  };

  return (
    <section className="section section--sand section--taquerias" id="taquerias">
      <div className="wrap">
        {/* Encabezado original con textos restaurados */}
        <div className="taquerias-head reveal">
          <div className="taquerias-head__copy">
            <p className="eyebrow">TAQUERÍAS PARTICIPANTES</p>
            <h2 className="taquerias-head__title">¿CUÁL SERÁ TU FAVORITO?</h2>
            <p className="section__lead">
              Los sabores de Autlán y la región se encuentran en un mismo lugar.
            </p>
          </div>

          {/* Controles discretos del carrusel en escritorio */}
          {items.length > 3 && (
            <div className="taquerias-head__controls" aria-label="Controles del carrusel">
              <>
              <span className="carousel-counter" aria-live="polite">
                <span className="carousel-counter__current">
                  {rango.primera === rango.ultima
                    ? pad(rango.primera)
                    : `${pad(rango.primera)}–${pad(rango.ultima)}`}
                </span>
                <span className="carousel-counter__sep"> de </span>
                <span className="carousel-counter__total">{pad(items.length)}</span>
              </span>
              <div className="carousel-nav-group">
                <button
                  type="button"
                  className="carousel-nav-btn carousel-nav-btn--prev"
                  onClick={scrollPrev}
                  aria-label="Ver taquerías anteriores"
                >
                  <Icon name="chevron-left" />
                </button>
                <button
                  type="button"
                  className="carousel-nav-btn carousel-nav-btn--next"
                  onClick={scrollNext}
                  aria-label="Ver taquerías siguientes"
                >
                  <Icon name="chevron-right" />
                </button>
              </div>
              </>
            </div>
          )}
        </div>

        {/* Contenedor persistente: no desmonta nodos para evitar pérdida de opacidad o estado */}
        {/* La animación de entrada va en el contenedor, no en cada tarjeta: así las tarjetas
            que llegan al deslizar el carrusel no se animan a mitad del movimiento. */}
        <div className="taquerias-viewport reveal">
          {status === 'loading' ? (
            <div
              className="taquerias-track taquerias-track--carousel"
              aria-busy="true"
              aria-label="Cargando taquerías"
            >
              {[0, 1, 2].map((i) => (
                <div className="taquerias-slide" key={`sk-${i}`}>
                  <TaqueriaSkeleton />
                </div>
              ))}
            </div>
          ) : status === 'ok' ? (
            <div
              className="taquerias-track taquerias-track--carousel"
              id="taquerias-collection"
              ref={trackRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              role="region"
              aria-roledescription="carrusel"
              aria-label="Taquerías participantes"
            >
              {items.map((t, i) => (
                <div
                  className="taquerias-slide"
                  key={`slide-${t.id}`}
                  role="group"
                  aria-roledescription="diapositiva"
                  aria-label={`${t.nombre} (${i + 1} de ${items.length})`}
                >
                  <TaqueriaCard taqueria={t} />
                </div>
              ))}
            </div>
          ) : status === 'error' ? (
            <div className="empty" role="status">
              <p className="empty__title">No pudimos cargar las taquerías</p>
              <p>Revisa tu conexión e intenta de nuevo en un momento.</p>
              <Button variant="ghost" size="sm" onClick={reintentar}>Reintentar</Button>
            </div>
          ) : (
            <div className="empty">
              <p className="empty__title">Muy pronto anunciaremos las taquerías</p>
              <p>Estamos confirmando a las taquerías participantes. Vuelve pronto para conocerlas.</p>
              <Button href="participa.html" variant="red" size="sm">Registrar mi taquería</Button>
            </div>
          )}
        </div>

        {/* Invitación a taquerías */}
        <div className="taquerias__cta-wrap">
          <div className="taquerias__cta-card">
            <img
              className="taquerias__cta-bg"
              src={asset('assets/img/taqueros-cta.jpg')}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <div className="taquerias__cta-content">
              <p className="taquerias__cta-lead">¿Tienes una taquería y quieres ser parte del cartel oficial?</p>
              <Button href="participa.html" variant="red" className="taquerias__cta">
                Registrar mi taquería
                <Icon name="arrow" className="icon--arrow" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
