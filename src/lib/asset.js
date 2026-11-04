// Ruta de un recurso de public/ (por ejemplo "assets/img/logo.png").
// Usa BASE_URL de Vite, así funciona aunque el sitio se publique en una subcarpeta.
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
