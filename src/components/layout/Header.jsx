import { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import useShare from '../../hooks/useShare';
import { SECTION_LINKS } from '../../data/site';
import { useSite } from '../../context/SiteContext';
import { cx } from '../../lib/cx';

// Encabezado con logo y menú.
// En escritorio: nav con links + botón "Soy taquero".
// En celular: se oculta el hamburguesa y se muestra directamente el botón "Compartir la feria".
export default function Header() {
  const { page, homeHref, sectionsHref } = useSite();
  const share = useShare();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef(null);

  // Con el menú abierto: tocar fuera del encabezado lo cierra y Escape lo cierra devolviendo el foco.
  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => { if (!e.target.closest('.site-header')) setOpen(false); };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap bar">
        <a className="brand" href={homeHref} aria-label="Feria del Taco Autlán, ir al inicio">
          <img src="/assets/img/logo.png" alt="Feria del Taco Autlán" width="247" height="176" />
        </a>

        {/* Botón visible solo en móvil: reemplaza al hamburguesa */}
        <Button
          variant="red"
          size="sm"
          className="header__mobile-cta"
          onClick={share}
        >
          <Icon name="share" />
          Invita a la taquiza
        </Button>

        {/* Hamburguesa: solo visible en desktop-medio / tablet */}
        <button
          ref={menuBtn}
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="menu-btn__bars" aria-hidden="true" />
          <span className="menu-btn__label">Menú</span>
        </button>

        <nav
          id="menu"
          className={cx('nav', open && 'is-open')}
          aria-label="Principal"
          onClick={(e) => { if (e.target.closest('a')) setOpen(false); }}
        >
          {SECTION_LINKS.map((s) => (
            <a key={s.id} href={`${sectionsHref}#${s.id}`}>{s.label}</a>
          ))}
          <Button
            href="participa.html"
            variant="red"
            size="sm"
            aria-current={page === 'participa' ? 'page' : undefined}
          >
            Soy taquero
          </Button>
        </nav>
      </div>
    </header>
  );
}
