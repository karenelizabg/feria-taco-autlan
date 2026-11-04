import SiteLayout from './components/layout/SiteLayout';
import Marquee from './components/ui/Marquee';
import Confetti from './components/ui/Confetti';
import Hero from './sections/Hero';
import Presentacion from './sections/Presentacion';
import Actividades from './sections/Actividades';
import Taquerias from './sections/Taquerias';
import Sede from './sections/Sede';

// Página principal (visitantes): cada sección vive en su propio archivo dentro de src/sections.
export default function App() {
  return (
    <SiteLayout page="inicio">
      <Confetti />
      <Hero />
      <Marquee />
      <Presentacion />
      <Actividades />
      <Taquerias />
      <Sede />
    </SiteLayout>
  );
}
