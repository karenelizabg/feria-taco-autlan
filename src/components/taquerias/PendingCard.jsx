import Icon from '../ui/Icon';
import { cx } from '../../lib/cx';

// Tarjeta "Próximamente" homogénea: misma estructura y proporciones que las taquerías confirmadas.
export default function PendingCard() {
  return (
    <article
      className={cx('tcard', 'tcard--editorial', 'tcard--pending', 'reveal')}
      aria-label="Taquería próximamente"
    >
      <div className="tcard__gallery tcard__gallery--pending" aria-hidden="true">
        <Icon name="utensils" className="tcard__placeholder-icon" />
        <span className="tcard__gallery-placeholder-text">Próximamente</span>
      </div>

      <div className="tcard__content">
        <span className="tcard__sello">Próximamente</span>
        <h3 className="visually-hidden">Taquería por anunciar</h3>
        <span className="tcard__bar tcard__bar--title" />
        <div className="tcard__soon-pills">
          <span className="tcard__bar tcard__bar--pill" />
          <span className="tcard__bar tcard__bar--pill tcard__bar--pill-sm" />
        </div>
        <div className="tcard__action-wrap">
          <span className="tcard__status-btn" aria-disabled="true">
            Próximamente
          </span>
        </div>
      </div>
    </article>
  );
}
