import { useState, useRef, useEffect, useCallback } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import TaqueriaCard from '../components/taquerias/TaqueriaCard';
import PendingCard from '../components/taquerias/PendingCard';
import { taquerias } from '../data/taquerias';
import { cx } from '../lib/cx';

export default function Taquerias() {
  const items = taquerias.filter((t) => t && (t.nombre || t.pendiente));
  const [isExpanded, setIsExpanded] = useState(false);

  const trackRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el || isExpanded) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;

    const pages = Math.max(1, Math.round(scrollWidth / clientWidth));
    const current = Math.min(pages, Math.max(1, Math.round(scrollLeft / clientWidth) + 1));
    setTotalPages(pages);
    setCurrentPage(current);
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded) return;
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [isExpanded, updateScrollState, items.length]);

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

  const toggleExpand = () => {
    setIsExpanded((prev) => {
      const next = !prev;
      if (!next && trackRef.current) {
        trackRef.current.scrollLeft = 0;
      }
      return next;
    });
  };

  const handleKeyDown = (e) => {
    if (isExpanded) return;
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
          {!isExpanded && items.length > 3 && (
            <div className="taquerias-head__controls" aria-label="Controles del carrusel">
              <span className="carousel-counter" aria-live="polite">
                <span className="carousel-counter__current">{String(currentPage).padStart(2, '0')}</span>
                <span className="carousel-counter__sep"> / </span>
                <span className="carousel-counter__total">{String(totalPages).padStart(2, '0')}</span>
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
            </div>
          )}
        </div>

        {/* Contenedor persistente: no desmonta nodos para evitar pérdida de opacidad o estado */}
        <div className="taquerias-viewport">
          {items.length > 0 ? (
            <div
              className={cx(
                'taquerias-track',
                isExpanded ? 'taquerias-track--grid' : 'taquerias-track--carousel'
              )}
              id="taquerias-collection"
              ref={trackRef}
              tabIndex={isExpanded ? -1 : 0}
              onKeyDown={handleKeyDown}
              role={isExpanded ? undefined : 'region'}
              aria-roledescription={isExpanded ? undefined : 'carrusel'}
              aria-label="Taquerías participantes"
            >
              {items.map((t, i) => (
                <div
                  className="taquerias-slide"
                  key={t.pendiente ? `slide-pendiente-${i}` : `slide-${t.nombre}-${i}`}
                  role={isExpanded ? undefined : 'group'}
                  aria-roledescription={isExpanded ? undefined : 'diapositiva'}
                  aria-label={t.nombre ? `${t.nombre} (${i + 1} de ${items.length})` : `Taquería por anunciar (${i + 1} de ${items.length})`}
                >
                  {t.pendiente ? <PendingCard /> : <TaqueriaCard taqueria={t} />}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">
              <p className="empty__title">Lista por anunciar</p>
              <p>Estamos confirmando a las taquerías participantes. Vuelve pronto para conocerlas.</p>
              <Button href="participa.html" variant="red" size="sm">Registrar mi taquería</Button>
            </div>
          )}
        </div>

        {/* Botón «Ver todas las taquerías» / «Ver menos» */}
        {items.length > 3 && (
          <div className="taquerias__toggle-wrap">
            <Button
              type="button"
              variant="ghost"
              className="btn--toggle-view"
              onClick={toggleExpand}
              aria-expanded={isExpanded}
              aria-controls="taquerias-collection"
            >
              <span>{isExpanded ? 'Ver menos' : 'Ver todas las taquerías'}</span>
              <Icon
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                className="icon--toggle"
              />
            </Button>
          </div>
        )}

        {/* Invitación a taquerías */}
        <div className="taquerias__cta-wrap">
          <p className="taquerias__cta-lead">¿Tienes una taquería y quieres ser parte del cartel oficial?</p>
          <Button href="participa.html" variant="red" className="taquerias__cta">
            Registrar mi taquería
            <Icon name="arrow" className="icon--arrow" />
          </Button>
        </div>
      </div>
    </section>
  );
}
