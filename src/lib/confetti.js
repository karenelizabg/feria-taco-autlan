import confetti from 'canvas-confetti';

// Colores del proyecto: verde, rojo, amarillo y crema
const COLORS = ['#10432a', '#c0392b', '#f5c842', '#fbf9ee'];

let fire = null;

// El `confetti()` por defecto dibuja en un Web Worker creado desde un blob:. El sitio publicado lo
// bloquea con su Content-Security-Policy (script-src sin blob:) y no sale nada, pero en local (sin ese
// encabezado) sí funcionaba. Esta instancia propia dibuja en el hilo principal (useWorker: false), así
// que no depende de la política del servidor. Se crea una sola vez y se reutiliza.
const getFire = () => {
  fire ??= confetti.create(undefined, { resize: true, useWorker: false });
  return fire;
};

const prefersReducedMotion = () =>
  Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

// Lanza el confeti: dos ráfagas desde las esquinas inferiores y una oleada más suave al centro.
// Sin confeti si el sistema pide menos movimiento. Devuelve una función que cancela la oleada del centro.
export function launchConfetti() {
  if (prefersReducedMotion()) return () => {};
  const shoot = getFire();

  const shared = {
    particleCount: 80,
    spread: 70,
    startVelocity: 45,
    gravity: 0.9,
    ticks: 200,
    colors: COLORS,
    shapes: ['square', 'circle'],
    scalar: 0.9,
  };

  // Ráfaga izquierda y derecha
  shoot({ ...shared, origin: { x: 0.1, y: 1 }, angle: 65 });
  shoot({ ...shared, origin: { x: 0.9, y: 1 }, angle: 115 });

  // Segunda oleada al centro, con un poco de retraso
  const timer = setTimeout(() => {
    shoot({
      particleCount: 50,
      spread: 100,
      startVelocity: 30,
      gravity: 1,
      ticks: 180,
      colors: COLORS,
      origin: { x: 0.5, y: 0.9 },
      scalar: 0.8,
    });
  }, 350);

  return () => clearTimeout(timer);
}

// Quita el confeti que siga en pantalla.
export const resetConfetti = () => fire?.reset();
