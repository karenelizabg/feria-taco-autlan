import { useState } from 'react';
import Icon from '../ui/Icon';

// Tarjeta de taquería con los datos del Google Sheet (ver src/data/taquerias.js).
// Mantiene el estilo editorial de siempre. La foto llena el marco de arriba con proporción fija;
// si no hay foto, o no carga, se muestra un placeholder con el estilo de la feria.
// Todo el texto va como texto de React (sin innerHTML), así que no se ejecuta código del Sheet.
export default function TaqueriaCard({ taqueria: t }) {
  const [fotoFallida, setFotoFallida] = useState(false);
  const tieneFoto = Boolean(t.foto) && !fotoFallida;

  const enlaces = [
    t.facebook && { clave: 'facebook', href: t.facebook, icono: 'facebook', etiqueta: `Facebook de ${t.nombre}` },
    t.instagram && { clave: 'instagram', href: t.instagram, icono: 'instagram', etiqueta: `Instagram de ${t.nombre}` },
    t.maps && { clave: 'maps', href: t.maps, icono: 'pin', etiqueta: `Ubicación de ${t.nombre} en Google Maps` },
  ].filter(Boolean);

  return (
    <article className="tcard tcard--editorial reveal" aria-label={`Taquería ${t.nombre}`}>
      <div
        className={tieneFoto ? 'tcard__gallery tcard__gallery--photo' : 'tcard__gallery tcard__gallery--pending'}
        aria-hidden={!tieneFoto}
      >
        {tieneFoto ? (
          <img
            className="tcard__gallery-img"
            src={t.foto}
            alt={`Foto de ${t.nombre}`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setFotoFallida(true)}
          />
        ) : (
          <>
            <Icon name="utensils" className="tcard__placeholder-icon" />
            <span className="tcard__gallery-placeholder-text">Foto próximamente</span>
          </>
        )}
      </div>

      <div className="tcard__content">
        <h3 className="tcard__title">{t.nombre}</h3>

        {t.descripcion && <p className="tcard__desc">{t.descripcion}</p>}

        {t.etiquetas.length > 0 && (
          <ul className="tcard__menu" aria-label="Vende">
            {t.etiquetas.map((etiqueta, i) => (
              <li key={`${etiqueta}-${i}`}>{etiqueta}</li>
            ))}
          </ul>
        )}

        {enlaces.length > 0 && (
          <div className="tcard__action-wrap">
            <ul className="tcard__links" aria-label={`Redes y ubicación de ${t.nombre}`}>
              {enlaces.map((enlace) => (
                <li key={enlace.clave}>
                  <a
                    className="tcard__link"
                    href={enlace.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={enlace.etiqueta}
                    title={enlace.etiqueta}
                  >
                    <Icon name={enlace.icono} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
