import { useCallback } from 'react';
import { useSite } from '../context/SiteContext';
import { pageUrl } from '../lib/share';
import { launchConfetti } from '../lib/confetti';

// Devuelve la función de compartir: usa el menú nativo si existe; si no, copia el enlace.
export default function useShare() {
  const { shareText, toast } = useSite();

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pageUrl());
      toast('Enlace copiado');
    } catch {
      toast('No pudimos copiar el enlace');
    }
  }, [toast]);

  return useCallback(async () => {
    // Confeti al tocar "Invita a la taquiza", "Compartir la feria" o "Copiar enlace".
    // Se lanza antes de abrir el menú nativo de compartir, que en celular tapa la pantalla.
    launchConfetti();
    if (!navigator.share) {
      copyLink();
      return;
    }
    try {
      await navigator.share({ title: document.title, text: shareText, url: pageUrl() });
    } catch (err) {
      // Cancelar no es un error; si el sistema rechaza compartir, se copia el enlace.
      if (err?.name !== 'AbortError') copyLink();
    }
  }, [copyLink, shareText]);
}
