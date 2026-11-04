// URL de la página sin el #ancla, para compartir.
export const pageUrl = () => window.location.href.split('#')[0];

// Enlace de WhatsApp con el texto de la página y su URL.
export const whatsappShareHref = (text) =>
  'https://wa.me/?text=' + encodeURIComponent(`${text} ${pageUrl()}`);
