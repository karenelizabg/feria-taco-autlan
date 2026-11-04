import Icon from '../ui/Icon';

// Fecha, horario y entrada de la feria, en bloques separados por líneas punteadas.
export default function EventFacts({ className = '' }) {
  return (
    <dl className={`venue__facts ${className}`.trim()}>
      <div>
        <dt><Icon name="calendar" />Fecha</dt>
        <dd><strong><time dateTime="2026-11-29">29 nov</time></strong></dd>
      </div>
      <div>
        <dt><Icon name="clock" />Horario</dt>
        <dd><strong>1 – 11 pm</strong></dd>
      </div>
      <div>
        <dt><Icon name="ticket" />Entrada</dt>
        <dd><strong>Gratuita</strong></dd>
      </div>
    </dl>
  );
}
