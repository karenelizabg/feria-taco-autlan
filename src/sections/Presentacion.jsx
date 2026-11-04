import { asset } from '../lib/asset';

// Primera edición: texto a la izquierda; la mascota a la derecha.
// En el celular, una columna.
export default function Presentacion() {
  return (
    <section className="section section--feria" id="la-feria">
      <div className="wrap">
        <div className="feria">
          <div className="feria__copy">
            <p className="eyebrow reveal">La feria</p>
            <h2 className="reveal">Reúne a tu familia.<br /> Invita a tus amigos.</h2>
            <p className="feria__lead reveal">Este 29 de noviembre, Autlán tiene una cita con el sabor. Ven a disfrutar de una celebración donde los tacos, la salsa y la buena compañía serán los protagonistas.</p>
            <p className="feria__lead reveal">Sé parte de esta primera edición y vive el inicio de una tradición.</p>
            <p className="feria__lead reveal"><strong>¡Nos vemos en la feria!</strong></p>
          </div>

          <div className="feria__art reveal">
            <img
              className="feria-mascot"
              src={asset('assets/img/mascota-guitarra.webp')}
              alt="Mascota de la feria: un taco con sombrero tocando la guitarra"
              width="381"
              height="480"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
