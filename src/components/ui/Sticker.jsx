import { cx } from '../../lib/cx';

// Sello redondo que se apoya en el boleto o en el panel del hero.
export default function Sticker({ tone, children }) {
  return <p className={cx('sticker', tone && `sticker--${tone}`)}>{children}</p>;
}
