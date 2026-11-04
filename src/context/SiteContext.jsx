import { createContext, useContext } from 'react';

// Datos de la página actual (enlaces, textos de compartir) y el aviso breve (toast).
const SiteContext = createContext(null);

export function SiteProvider({ value, children }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  return useContext(SiteContext);
}
