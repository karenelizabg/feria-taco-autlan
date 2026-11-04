import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IconSprite } from '../ui/Icon';
import Toast from '../ui/Toast';
import Header from './Header';
import Footer from './Footer';
import { SiteProvider } from '../../context/SiteContext';
import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import { SITE } from '../../data/site';

const TOAST_MS = 2600;

// Esqueleto de cada página: sprite de iconos, encabezado, contenido y pie.
// `page` es la clave de SITE ("inicio" o "participa").
export default function SiteLayout({ page, children }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef(0);

  const toast = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), TOAST_MS);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);
  useRevealOnScroll();

  const site = useMemo(() => ({ ...SITE[page], page, toast }), [page, toast]);

  return (
    <SiteProvider value={site}>
      <IconSprite />
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <Toast message={message} visible={visible} />
    </SiteProvider>
  );
}
