import useCountdown from '../../hooks/useCountdown';
import { cx } from '../../lib/cx';

const LABELS = {
  idle: '29 de noviembre · 1:00 pm',
  before: 'Faltan',
  live: '¡La feria está en marcha! Te esperamos hasta las 11:00 pm.',
  over: '¡Gracias por venir a la feria!',
};

// Cuenta regresiva del boleto del hero. Los dígitos se ocultan hasta la primera lectura del reloj.
export default function Countdown({ start, end }) {
  const { ready, state, parts } = useCountdown(start, end);
  const started = state === 'live' || state === 'over';

  return (
    <div className={cx('count', ready && 'is-ready', started && 'is-live')}>
      <p className="count__label">{LABELS[state]}</p>
      <div className="count__grid" hidden={started}>
        <div><b>{parts.d}</b><span>días</span></div>
        <div><b>{parts.h}</b><span>horas</span></div>
        <div><b>{parts.m}</b><span>min</span></div>
        <div><b>{parts.s}</b><span>seg</span></div>
      </div>
    </div>
  );
}
