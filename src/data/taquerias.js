// Taquerías participantes: se leen en vivo desde el Google Sheet (ver apps-script/Code.gs).
// Para cambiar taquerías se edita el Sheet, no este archivo.

// Pega aquí la URL de la aplicación web de Apps Script (termina en /exec).
// Ver los pasos en apps-script/Code.gs.
export const TAQUERIAS_API_URL = 'PEGA_AQUI_LA_URL_DE_TU_APLICACION_WEB';

const CONFIGURADA = /^https:\/\/script\.google\.com\//.test(TAQUERIAS_API_URL);
const MAX_ETIQUETAS = 5;

// Solo se aceptan enlaces http(s); cualquier otra cosa se descarta.
function enlaceSeguro(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url) ? url : null;
}

function normalizar(t) {
  return {
    id: t.id ?? t.nombre,
    nombre: String(t.nombre).trim(),
    descripcion: typeof t.descripcion === 'string' ? t.descripcion : '',
    etiquetas: Array.isArray(t.etiquetas)
      ? t.etiquetas.map(String).filter(Boolean).slice(0, MAX_ETIQUETAS)
      : [],
    facebook: enlaceSeguro(t.facebook),
    instagram: enlaceSeguro(t.instagram),
    maps: enlaceSeguro(t.maps),
    foto: enlaceSeguro(t.foto),
  };
}

// Descarga las taquerías aprobadas. Lanza error si la respuesta no es una lista válida.
export async function cargarTaquerias(signal) {
  if (!CONFIGURADA) {
    if (import.meta.env.DEV) {
      console.warn('[taquerias] Falta pegar la URL de Apps Script en TAQUERIAS_API_URL (src/data/taquerias.js).');
    }
    return [];
  }

  // Sin headers personalizados: así no hay preflight de CORS que Apps Script no responde.
  const respuesta = await fetch(TAQUERIAS_API_URL, { signal });
  if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

  const datos = await respuesta.json();
  if (!Array.isArray(datos)) {
    throw new Error(datos && datos.error ? datos.error : 'Respuesta inesperada');
  }

  return datos
    .filter((t) => t && typeof t.nombre === 'string' && t.nombre.trim())
    .map(normalizar);
}
