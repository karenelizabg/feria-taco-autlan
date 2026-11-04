import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { asset } from '../../lib/asset';
import { cx } from '../../lib/cx';

// Tarjeta gastronómica con el logo como protagonista visual, nombre, especialidades y botón «Visitar taquería».
export default function TaqueriaCard({ taqueria: t }) {
  const vende = (t.vende ?? []).filter(Boolean);

  return (
    <article
      className={cx('tcard', 'tcard--editorial', 'reveal', t.logo && 'tcard--with-logo')}
      aria-label={`Taquería ${t.nombre}`}
    >
      <div className="tcard__gallery">
        {t.logo ? (
          <img
            className="tcard__gallery-img"
            src={asset(t.logo)}
            alt={`Logo de ${t.nombre}`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="tcard__gallery-placeholder" aria-hidden="true">
            <Icon name="utensils" />
          </div>
        )}
      </div>

      <div className="tcard__content">
        <h3 className="tcard__title">{t.nombre}</h3>

        {t.especialidad && <p className="tcard__desc">{t.especialidad}</p>}

        {vende.length > 0 && (
          <ul className="tcard__menu" aria-label="Vende">
            {vende.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {t.colonia && <p className="tcard__colonia">{t.colonia}</p>}

        {t.mapa && (
          <div className="tcard__action-wrap">
            <Button
              href={t.mapa}
              variant="red"
              size="sm"
              className="tcard__btn"
              target="_blank"
              rel="noopener"
              aria-label={`Visitar taquería ${t.nombre} en Google Maps`}
            >
              Visitar taquería
              <Icon name="arrow" className="icon--arrow" />
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
