import { useEffect, useState } from 'react';

const pad = (n) => String(n).padStart(2, '0');

// Cuenta regresiva hacia `startIso`; `endIso` marca el fin de la feria.
// Antes de la primera lectura del reloj (`now` null) no hay cifras que mostrar.
export default function useCountdown(startIso, endIso) {
  const start = Date.parse(startIso);
  const end = Date.parse(endIso);
  const [now, setNow] = useState(null);

  useEffect(() => {
    // Devuelve false cuando la feria ya terminó y el reloj puede dejar de correr.
    const update = () => {
      const t = Date.now();
      setNow(t);
      return t < end;
    };
    if (!update()) return undefined;
    const id = setInterval(() => { if (!update()) clearInterval(id); }, 1000);
    return () => clearInterval(id);
  }, [end]);

  if (now === null) {
    return { ready: false, state: 'idle', parts: { d: '00', h: '00', m: '00', s: '00' } };
  }

  const state = now >= end ? 'over' : now >= start ? 'live' : 'before';
  const left = Math.max(0, Math.floor((start - now) / 1000));
  return {
    ready: true,
    state,
    parts: {
      d: pad(Math.floor(left / 86400)),
      h: pad(Math.floor((left % 86400) / 3600)),
      m: pad(Math.floor((left % 3600) / 60)),
      s: pad(left % 60),
    },
  };
}
