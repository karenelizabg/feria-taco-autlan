import { asset } from '../lib/asset';

// Cierre de la página: la imagen "Te esperamos" ocupa casi todo el espacio.
export default function Espera() {
  return (
    <section className="section section--green section--espera" aria-label="Te esperamos">
      <div className="wrap">
        <img
          className="espera__img reveal"
          src={asset('assets/img/te-esperamos.jpg')}
          alt="Te esperamos en la Feria del Taco Autlán, con la mascota frente al letrero de Autlán"
          width="1600"
          height="608"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
