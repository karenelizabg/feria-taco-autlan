import SiteLayout from '../components/layout/SiteLayout';
import Button from '../components/ui/Button';

// Página 404: la sirve el servidor cuando la ruta no existe (ErrorDocument en .htaccess).
export default function NotFound() {
  return (
    <SiteLayout page="404">
      <section className="section section--sand section--notfound">
        <div className="wrap empty">
          <p className="eyebrow">Error 404</p>
          <h1>Esta página no está aquí</h1>
          <p>Quizá el enlace cambió. Regresa al inicio para ver la feria, las taquerías y cómo llegar.</p>
          <Button href="/" variant="red">Volver al inicio</Button>
        </div>
      </section>
    </SiteLayout>
  );
}
