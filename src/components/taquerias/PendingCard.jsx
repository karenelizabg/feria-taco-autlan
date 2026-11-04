import Icon from '../ui/Icon';
import { cx } from '../../lib/cx';

// Tarjeta "Próximamente" con la misma estructura y proporciones que las taquerías confirmadas.
export default function PendingCard() {
  return (
    <article
      className={cx('tcard', 'tcard--editorial', 'tcard--pending', 'reveal')}
      aria-label="Taquería próximamente"
    >
      <div className="tcard__gallery tcard__gallery--pending" aria-hidden="true">
        <Icon name="utensils" className="tcard__placeholder-icon" />
      </div>

      <div className="tcard__content">
        <span className="tcard__bar tcard__bar--loading tcard__bar--sello" />
        <span className="tcard__bar tcard__bar--loading tcard__bar--title" />
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
