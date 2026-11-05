import { useState, useRef, useEffect, useCallback } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import TaqueriaCard from '../components/taquerias/TaqueriaCard';
import TaqueriaSkeleton from '../components/taquerias/TaqueriaSkeleton';
import useTaquerias from '../hooks/useTaquerias';
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import { asset } from '../lib/asset';

const pad = (n) => String(n).padStart(2, '0');

// Mide el carrusel: `paso` es lo que mide una tarjeta más su separación y `porVista` cuántas caben a la vez
// (3 en escritorio, 2 en tablet, 1 en celular). Se mide en vez de fijarse para respetar los cortes del CSS.
function medir(el, total) {
  const slides = el.children;
  const ancho = slides[0].offsetWidth;
  const paso = total > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : ancho;
  const porVista = Math.max(1, Math.round((el.clientWidth + (paso - ancho)) / paso));
  return { paso, porVista };
}

export default function Taquerias() {
  const { status, items, reintentar } = useTaquerias();
  // Las tarjetas llegan después del primer render: hay que observarlas para que aparezcan al entrar en pantalla.
  useRevealOnScroll([status, items.length]);
  const trackRef = useRef(null);
  // Rango de taquerías visibles en el carrusel (base 1), p. ej. 04–06 en escritorio o 02 en celular.
  const [rango, setRango] = useState({ primera: 1, ultima: 1, porVista: 1 });
  const total = items.length;
  // Huecos al final para que la última página avance igual que las demás (con 5 taquerías: 1–3 y luego 4–5),
  // en lugar de recorrerse hacia atrás y repetir tarjetas ya vistas (3–5).
  const relleno = (rango.porVista - (total % rango.porVista)) % rango.porVista;
  // Solo hay flechas y contador cuando las taquerías no caben todas en pantalla.
  const hayNavegacion = status === 'ok' && total > rango.porVista;

  // Calcula el rango visible solo una vez por frame y solo actualiza el estado si cambió,
  // para no re-renderizar la sección en cada evento de scroll mientras se desliza.
  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el || total === 0 || el.children.length === 0) return;

    const { paso, porVista } = medir(el, total);
    const indice = Math.min(Math.round(el.scrollLeft / paso), total - 1);
    const primera = indice + 1;
    const ultima = Math.min(total, primera + porVista - 1);
    setRango((prev) => (
      prev.primera === primera && prev.ultima === ultima && prev.porVista === porVista
        ? prev
        : { primera, ultima, porVista }
    ));
  }, [total]);

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
  }, [updateScrollState, total]);

  // Avanza o retrocede una página completa (3 tarjetas en escritorio: 1–3, 4–6, 7–9…) y salta a la tarjeta exacta
  // donde empieza esa página. Es infinito: pasando de la última vuelve a la primera y viceversa.
  const irAPagina = (direccion) => {
    const el = trackRef.current;
    if (!el || total === 0) return;

    const { paso, porVista } = medir(el, total);
    const indice = Math.round(el.scrollLeft / paso);
    let destino;
    if (direccion > 0) {
      destino = (Math.floor(indice / porVista) + 1) * porVista;
      if (destino >= total) destino = 0;
    } else {
      destino = (Math.ceil(indice / porVista) - 1) * porVista;
      if (destino < 0) destino = Math.floor((total - 1) / porVista) * porVista;
    }
    el.scrollTo({ left: destino * paso, behavior: 'smooth' });
  };

  const scrollPrev = () => irAPagina(-1);
  const scrollNext = () => irAPagina(1);

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

          {/* Contador del carrusel; las flechas van en las orillas, junto a las tarjetas */}
          {hayNavegacion && (
            <div className="taquerias-head__controls">
              <span className="carousel-counter" aria-live="polite">
                <span className="carousel-counter__current">
                  {rango.primera === rango.ultima
                    ? pad(rango.primera)
                    : `${pad(rango.primera)}–${pad(rango.ultima)}`}
                </span>
                <span className="carousel-counter__sep"> de </span>
                <span className="carousel-counter__total">{pad(total)}</span>
              </span>
            </div>
          )}
        </div>

        <div className="taquerias-stage">
        {hayNavegacion && (
          <>
            <button
              type="button"
              className="carousel-nav-btn carousel-nav-btn--edge carousel-nav-btn--prev"
              onClick={scrollPrev}
              aria-label="Ver taquerías anteriores"
              aria-controls="taquerias-collection"
            >
              <Icon name="chevron-left" />
            </button>
            <button
              type="button"
              className="carousel-nav-btn carousel-nav-btn--edge carousel-nav-btn--next"
              onClick={scrollNext}
              aria-label="Ver taquerías siguientes"
              aria-controls="taquerias-collection"
            >
              <Icon name="chevron-right" />
            </button>
          </>
        )}

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
              {Array.from({ length: relleno }, (_, i) => (
                <div className="taquerias-slide taquerias-slide--relleno" key={`relleno-${i}`} aria-hidden="true" />
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
