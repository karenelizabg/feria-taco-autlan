import { cx } from '../../lib/cx';

// Botón o enlace con los estilos de `.btn`.
// variant: red | green | yellow | ghost | ghost-light · size: sm | lg
// Con `href` se renderiza un <a>; sin él, un <button type="button">.
export default function Button({ variant, size, href, className, children, ...rest }) {
  const classes = cx('btn', variant && `btn--${variant}`, size && `btn--${size}`, className);
  if (href) {
    return <a className={classes} href={href} {...rest}>{children}</a>;
  }
  return <button className={classes} type="button" {...rest}>{children}</button>;
}
