import Icon from './Icon';
import { cx } from '../../lib/cx';

// Encabezado de sección: etiqueta, título y, si hace falta, un texto de introducción.
export default function SectionHead({ eyebrow, icon, title, lead }) {
  return (
    <header className="section__head reveal">
      <p className={cx('eyebrow', icon && 'eyebrow--icon')}>
        {icon && <Icon name={icon} />}
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {lead && <p className="section__lead">{lead}</p>}
    </header>
  );
}
