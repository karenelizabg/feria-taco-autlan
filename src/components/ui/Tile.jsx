import Icon from './Icon';

// Tarjeta horizontal con icono, título, etiqueta opcional ("Por anunciar") y texto.
export default function Tile({ icon, title, tag, children }) {
  return (
    <article className="tile tile--row reveal">
      <span className="tile__icon tile__icon--red"><Icon name={icon} /></span>
      <div className="tile__head">
        <h3>{title}</h3>
        {tag && <p className="tile__tag">{tag}</p>}
      </div>
      <p>{children}</p>
    </article>
  );
}
