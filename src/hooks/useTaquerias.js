import { useCallback, useEffect, useState } from 'react';
import { cargarTaquerias } from '../data/taquerias';

// Estados: loading (cargando) · ok (hay taquerías) · empty (ninguna aprobada) · error (falló la carga).
export default function useTaquerias() {
  const [estado, setEstado] = useState({ status: 'loading', items: [] });
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    cargarTaquerias(controlador.signal)
      .then((items) => {
        setEstado(items.length ? { status: 'ok', items } : { status: 'empty', items: [] });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.warn('[taquerias] No se pudieron cargar:', err);
        setEstado({ status: 'error', items: [] });
      });

    return () => controlador.abort();
  }, [intento]);

  const reintentar = useCallback(() => {
    setEstado({ status: 'loading', items: [] });
    setIntento((n) => n + 1);
  }, []);

  return { ...estado, reintentar };
}
