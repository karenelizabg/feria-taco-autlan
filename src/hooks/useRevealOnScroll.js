import { useEffect } from 'react';

// Anima cada `.reveal` la primera vez que entra en pantalla (agrega la clase `is-in`).
// Se llama una vez al montar la página: todas las secciones y tarjetas ya existen en ese momento.
export default function useRevealOnScroll() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-in'));
      return undefined;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);
}
