import Button from '../ui/Button';
import Icon from '../ui/Icon';
import useShare from '../../hooks/useShare';
import { asset } from '../../lib/asset';
import { useSite } from '../../context/SiteContext';

// Encabezado con logo y botón a la derecha. Sin menú de navegación.
// En la página de taquerías el botón regresa al inicio; en el inicio, compartir.
export default function Header() {
  const { homeHref, page } = useSite();
  const share = useShare();

  return (
    <header className="site-header">
      <div className="wrap bar">
        <a className="brand" href={homeHref} aria-label="Feria del Taco Autlán, ir al inicio">
          <img src={asset('assets/img/logo.png')} alt="Feria del Taco Autlán" width="620" height="433" />
        </a>

        {page === 'participa' ? (
          <Button href={homeHref} variant="red" size="sm" className="header__mobile-cta">
            <Icon name="chevron-left" />
            Regresar
          </Button>
        ) : (
          <Button
            variant="red"
            size="sm"
            className="header__mobile-cta"
            onClick={share}
          >
            <Icon name="share" />
            Invita a la taquiza
          </Button>
        )}
      </div>
    </header>
  );
}
