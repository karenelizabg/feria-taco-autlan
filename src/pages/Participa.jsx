import SiteLayout from '../components/layout/SiteLayout';
import ParticipaHero from '../sections/ParticipaHero';

// Página para taquerías: qué incluye el lugar y el botón a WhatsApp.
export default function Participa() {
  return (
    <SiteLayout page="participa">
      <ParticipaHero />
    </SiteLayout>
  );
}
