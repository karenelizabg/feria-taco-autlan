import { useEffect } from 'react';
import confetti from 'canvas-confetti';

// Colores del proyecto: verde, rojo, amarillo y crema
const COLORS = ['#10432a', '#c0392b', '#f5c842', '#fbf9ee'];

// Lanza confeti al abrir la página: dos ráfagas desde las esquinas inferiores.
export default function Confetti() {
  useEffect(() => {
    // Sin confeti si el sistema pide menos movimiento.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    // Pequeño delay para que el navegador haya pintado la página antes de disparar
    const timer = setTimeout(() => {
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

      // Ráfaga izquierda
      confetti({ ...shared, origin: { x: 0.1, y: 1 }, angle: 65 });
      // Ráfaga derecha
      confetti({ ...shared, origin: { x: 0.9, y: 1 }, angle: 115 });

      // Segunda oleada más suave al centro, con un poco de retraso
      setTimeout(() => {
        confetti({
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
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // No renderiza ningún elemento visible — solo lanza la animación en canvas
  return null;
}
