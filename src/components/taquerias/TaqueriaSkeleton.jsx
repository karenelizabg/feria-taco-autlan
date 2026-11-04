// Tarjeta de carga con la misma forma que TaqueriaCard. Se muestra mientras llega el Sheet.
export default function TaqueriaSkeleton() {
  return (
    <article className="tcard tcard--editorial tcard--skeleton" aria-hidden="true">
      <div className="tcard__gallery tcard__gallery--skeleton" />

      <div className="tcard__content">
        <span className="tcard__bar tcard__bar--title skeleton-pulse" />
        <span className="tcard__bar sk-line skeleton-pulse" />
        <span className="tcard__bar sk-line sk-line--short skeleton-pulse" />
        <div className="tcard__soon-pills">
          <span className="tcard__bar tcard__bar--pill skeleton-pulse" />
          <span className="tcard__bar tcard__bar--pill tcard__bar--pill-sm skeleton-pulse" />
        </div>
        <div className="tcard__action-wrap">
          <span className="tcard__bar sk-btn skeleton-pulse" />
        </div>
      </div>
    </article>
  );
}
