// Une nombres de clase, ignorando los valores vacíos o falsos.
// cx('btn', esRojo && 'btn--red') → 'btn btn--red' o 'btn'
export const cx = (...names) => names.filter(Boolean).join(' ');
