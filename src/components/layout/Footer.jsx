import Button from '../ui/Button';
import useShare from '../../hooks/useShare';
import { SECTION_LINKS } from '../../data/site';
import { useSite } from '../../context/SiteContext';
import { whatsappShareHref } from '../../lib/share';
import { asset } from '../../lib/asset';

export default function Footer() {
  const { page, homeHref, sectionsHref, shareLabel, shareText } = useSite();
  const share = useShare();

  return (
    <footer className="site-footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <a className="brand-plate" href={homeHref} aria-label="Volver al inicio">
            <img src={asset('assets/img/logo.png')} alt="Feria del Taco Autlán" width="620" height="433" />
          </a>
          <p>Domingo 29 de noviembre de 2026<br />Jardín Las Montañas, Autlán de Navarro, Jalisco</p>
        </div>

        <nav className="footer__nav" aria-label="Secciones">
          {SECTION_LINKS.map((s) => (
            <a key={s.id} href={`${sectionsHref}#${s.id}`}>{s.label}</a>
          ))}
          <a href="participa.html" aria-current={page === 'participa' ? 'page' : undefined}>Soy taquero</a>
        </nav>

        <div className="footer__share">
          <p>{shareLabel}</p>
          <a className="btn btn--yellow btn--sm" href={whatsappShareHref(shareText)} target="_blank" rel="noopener noreferrer">
            Compartir por WhatsApp
          </a>
          <Button variant="ghost-light" size="sm" onClick={share}>Copiar enlace</Button>
        </div>
      </div>

      <div className="wrap footer__legal">
        <p>© 2026 Feria del Taco Autlán</p>
      </div>
    </footer>
  );
}
