import { useEffect } from 'react';
import { launchConfetti, resetConfetti } from '../../lib/confetti';

// Lanza confeti al abrir la página (ver lib/confetti.js).
export default function Confetti() {
  useEffect(() => {
    let cancel = () => {};
    // Pequeño delay para que el navegador haya pintado la página antes de disparar
    const timer = setTimeout(() => { cancel = launchConfetti(); }, 400);

    return () => {
      clearTimeout(timer);
      cancel();
      resetConfetti();
    };
  }, []);

  // No renderiza ningún elemento visible — solo lanza la animación en canvas
  return null;
}
