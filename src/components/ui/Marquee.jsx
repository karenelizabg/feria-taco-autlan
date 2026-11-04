import { Fragment } from 'react';

const WORDS = ['Tacos', 'Salsa', 'Buena compañía'];
const REPEATS = 4;

// Franja decorativa con las palabras de la feria, en bucle (oculta para lectores de pantalla).
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {Array.from({ length: REPEATS }, (_, n) =>
          WORDS.map((word) => (
            <Fragment key={`${n}-${word}`}>
              <span>{word}</span><i />
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}
