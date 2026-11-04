import Icon from './Icon';

// Tarjeta horizontal con icono, título y texto. La etiqueta opcional ("Por anunciar")
// va afuera, como una pestaña pequeña sobre la tarjeta.
export default function Tile({ icon, title, tag, children }) {
  return (
    <div className="tile-wrap reveal">
      {tag && <span className="tile__tab">{tag}</span>}
      <article className="tile tile--row">
        <span className="tile__icon tile__icon--red"><Icon name={icon} /></span>
        <div className="tile__head">
          <h3>{title}</h3>
        </div>
        <p>{children}</p>
      </article>
    </div>
  );
}
