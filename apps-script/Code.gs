/**
 * Feria del Taco Autlán · Taquerías participantes desde Google Sheets
 * ====================================================================
 *
 * Este script vive en el Google Sheet que genera el Google Form de registro.
 * Devuelve (en JSON) solo las taquerías con la casilla "Aprobado" marcada.
 *
 * PASOS PARA PONERLO EN FUNCIONAMIENTO
 * ------------------------------------
 * 1. Abre el Google Sheet de respuestas del formulario.
 *    Extensiones → Apps Script.
 *
 * 2. Borra el código de ejemplo que aparece, pega TODO este archivo y guarda
 *    (Ctrl/Cmd + S). Puedes ponerle nombre al proyecto, por ejemplo "Taquerías API".
 *
 * 3. Autorizar permisos: en el menú superior elige la función "hacerFotosPublicas"
 *    y dale Ejecutar. Google pedirá permisos (acceso al Sheet y a Drive).
 *    Acepta con tu cuenta. Si aparece "Google no verificó esta aplicación":
 *    Configuración avanzada → Ir a (nombre del proyecto) → Permitir.
 *    (Esta primera ejecución también sirve para autorizar; el paso 6 hace el resto.)
 *
 * 4. Crear el activador "Al enviar formulario":
 *    icono de reloj (Activadores) → Agregar activador →
 *      Función: onFormSubmit
 *      Origen del evento: De la hoja de cálculo
 *      Tipo de evento: Al enviar formulario
 *    → Guardar. Te pedirá autorizar de nuevo; acepta.
 *    (onEdit NO necesita activador: Apps Script lo detecta solo por el nombre.)
 *
 * 5. Correr hacerFotosPublicas() una vez: selecciónala en el menú, dale Ejecutar
 *    y revisa el "Registro de ejecución". Esto pone públicas las fotos que ya
 *    existían en el Sheet (las de respuestas anteriores al activador).
 *
 * 6. Implementar como aplicación web:
 *    Implementar → Nueva implementación → Tipo: Aplicación web.
 *      Descripción: "Taquerías v1" (lo que quieras)
 *      Ejecutar como: Yo (tu cuenta)
 *      Quién tiene acceso: Cualquier persona
 *    → Implementar → Autorizar si lo pide → COPIA la "URL de la aplicación web"
 *    (termina en /exec).
 *
 * 7. Pega esa URL en la landing: src/data/taquerias.js, en la constante
 *    TAQUERIAS_API_URL (reemplaza el texto "PEGA_AQUI_LA_URL_DE_TU_APLICACION_WEB").
 *
 * CUANDO CAMBIES ESTE CÓDIGO
 * --------------------------
 * Los cambios en el código NO se aplican solo con guardar. Debes volver a implementar:
 *    Implementar → Administrar implementaciones → icono de lápiz →
 *    Versión: "Nueva versión" → Implementar.
 * La URL se conserva, así que no hay que tocar la landing.
 * Si cambias el código, también conviene correr de nuevo hacerFotosPublicas().
 *
 * COLUMNAS QUE ESPERA (se buscan por el texto del encabezado, fila 1;
 * no importa el orden ni mayúsculas/acentos)
 * ------------------------------------------------------------------
 *   "Marca temporal"                      (obligatoria; define el orden de llegada)
 *   "Dirección de correo electrónico"     (opcional; si existe, NUNCA se publica)
 *   contiene "nombre"                     (obligatoria)
 *   contiene "descrip"                    (obligatoria)
 *   contiene "venden"                     (obligatoria; etiquetas separadas por comas)
 *   contiene "foto"                       (obligatoria; link de Drive, si hay varios usa el primero)
 *   "Aprobado"                            (obligatoria; casilla TRUE/FALSE, agregada a mano)
 *   contiene "facebook"                   (opcional)
 *   contiene "instagram"                  (opcional)
 *   contiene "maps"                       (opcional)
 *
 * Si falta una obligatoria, la URL responde { "error": "..." } indicando cuál falta.
 *
 * FORMATO DE RESPUESTA (doGet)
 * ----------------------------
 * [{ "id": 2, "nombre": "...", "descripcion": "...", "etiquetas": ["Pastor", "Tortas"],
 *    "facebook": "https://...", "instagram": "https://...", "maps": "https://...",
 *    "foto": "https://drive.google.com/thumbnail?id=ID&sz=w800" }]
 */

const CACHE_KEY = 'taquerias_aprobadas_v1';
const CACHE_SEGUNDOS = 5 * 60;      // 5 minutos
const CACHE_MAX_CARACTERES = 95000; // CacheService acepta ~100 KB por valor
const MAX_DESCRIPCION = 80;
const MAX_ETIQUETAS = 5;

// Texto que se busca en el encabezado (ya normalizado: minúsculas, sin acentos).
// "exacto": true → el encabezado debe ser igual; si no, basta con que lo contenga.
const COLUMNAS = {
  marca:      { buscar: 'marca temporal', obligatoria: true,  etiqueta: 'Marca temporal' },
  correo:     { buscar: 'direccion de correo', obligatoria: false, etiqueta: 'Dirección de correo electrónico' },
  nombre:     { buscar: 'nombre',    obligatoria: true,  etiqueta: 'nombre' },
  descripcion:{ buscar: 'descrip',   obligatoria: true,  etiqueta: 'descripción' },
  venden:     { buscar: 'venden',    obligatoria: true,  etiqueta: 'venden (especialidades)' },
  foto:       { buscar: 'foto',      obligatoria: true,  etiqueta: 'foto' },
  aprobado:   { buscar: 'aprobado',  obligatoria: true,  etiqueta: 'Aprobado', exacto: true },
  facebook:   { buscar: 'facebook',  obligatoria: false },
  instagram:  { buscar: 'instagram', obligatoria: false },
  maps:       { buscar: 'maps',      obligatoria: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// Endpoint público
// ─────────────────────────────────────────────────────────────────────────────

function doGet() {
  const cache = CacheService.getScriptCache();
  const enCache = cache.get(CACHE_KEY);
  if (enCache) return respuestaJson_(enCache);

  let salida;
  try {
    const lista = leerTaquerias_();
    salida = JSON.stringify(lista);
    // Solo se guardan respuestas válidas: un error nunca queda en caché.
    if (salida.length < CACHE_MAX_CARACTERES) {
      cache.put(CACHE_KEY, salida, CACHE_SEGUNDOS);
    }
  } catch (err) {
    salida = JSON.stringify({ error: err.message || String(err) });
  }
  return respuestaJson_(salida);
}

function respuestaJson_(texto) {
  return ContentService.createTextOutput(texto).setMimeType(ContentService.MimeType.JSON);
}

// ─────────────────────────────────────────────────────────────────────────────
// Lectura de la hoja
// ─────────────────────────────────────────────────────────────────────────────

function leerTaquerias_() {
  const hoja = obtenerHoja_();
  const datos = hoja.getDataRange().getValues();
  const mapa = mapearColumnas_(datos[0]);

  const filas = [];
  for (let i = 1; i < datos.length; i++) {
    const fila = datos[i];
    if (!esAprobado_(fila[mapa.aprobado])) continue;
    const taq = filaATaqueria_(fila, i + 1, mapa);
    if (taq) {
      filas.push({ orden: marcaATiempo_(fila[mapa.marca]), indice: i, taq: taq });
    }
  }

  // Orden de llegada: por marca temporal y, si empatan, por posición en la hoja.
  filas.sort((a, b) => (a.orden - b.orden) || (a.indice - b.indice));
  return filas.map((f) => f.taq);
}

// Solo se expone esta lista de campos. El correo y cualquier otra columna nunca salen.
function filaATaqueria_(fila, numeroFila, mapa) {
  // Obligatorios para publicar: nombre, foto y especialidades. Si falta alguno, la fila no sale.
  const nombre = texto_(fila[mapa.nombre]);
  const descripcion = texto_(fila[mapa.descripcion]).slice(0, MAX_DESCRIPCION).trim();
  const foto = fotoUrl_(extraerIdDrive_(fila[mapa.foto]));
  const etiquetas = parsearEtiquetas_(fila[mapa.venden]);
  if (!nombre || !descripcion || !foto || etiquetas.length === 0) return null;

  return {
    id: numeroFila,
    nombre: nombre,
    descripcion: descripcion,
    etiquetas: etiquetas,
    facebook: normalizarLink_(valorOpcional_(fila, mapa.facebook)),
    instagram: normalizarLink_(valorOpcional_(fila, mapa.instagram)),
    maps: normalizarLink_(valorOpcional_(fila, mapa.maps)),
    foto: foto,
  };
}

function obtenerHoja_() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojas = libro.getSheets();
  // La hoja que crea Google Forms se llama "Respuestas de formulario 1" (o similar).
  return hojas.find((h) => normalizar_(h.getName()).indexOf('respuestas') === 0) || hojas[0];
}

// Devuelve { clave: indice } según el texto del encabezado. Lanza error si falta una obligatoria.
function mapearColumnas_(encabezados) {
  const mapa = {};
  const faltan = [];
  const normalizados = encabezados.map(normalizar_);

  Object.keys(COLUMNAS).forEach((clave) => {
    const col = COLUMNAS[clave];
    const indice = buscarIndice_(normalizados, col);
    if (indice === -1) {
      if (col.obligatoria) faltan.push(col.etiqueta);
    } else {
      mapa[clave] = indice;
    }
  });

  if (faltan.length) {
    throw new Error(
      'Falta(n) columna(s) obligatoria(s) en la hoja de respuestas: ' + faltan.join(', ') +
      '. Revisa que la fila 1 tenga esos encabezados.'
    );
  }
  return mapa;
}

function buscarIndice_(normalizados, col) {
  if (col.exacto) return normalizados.indexOf(col.buscar);
  for (let i = 0; i < normalizados.length; i++) {
    if (normalizados[i].indexOf(col.buscar) !== -1) return i;
  }
  return -1;
}

// ─────────────────────────────────────────────────────────────────────────────
// Transformaciones
// ─────────────────────────────────────────────────────────────────────────────

// Google Forms guarda las casillas como TRUE/FALSE (booleano en Apps Script).
function esAprobado_(valor) {
  return valor === true || texto_(valor).toUpperCase() === 'TRUE';
}

// "pastor, tortas,, Birria  " → ["Pastor", "Tortas", "Birria"]
function parsearEtiquetas_(valor) {
  const vistas = new Set();
  const lista = [];
  texto_(valor).split(',').forEach((parte) => {
    const limpio = parte.replace(/\s+/g, ' ').trim();
    if (!limpio) return;
    const etiqueta = limpio.charAt(0).toUpperCase() + limpio.slice(1);
    const clave = etiqueta.toLowerCase();
    if (vistas.has(clave)) return;
    vistas.add(clave);
    lista.push(etiqueta);
  });
  return lista.slice(0, MAX_ETIQUETAS);
}

// Acepta "https://drive.google.com/open?id=ID", "/file/d/ID/view", o el ID suelto.
// Si vienen varios links separados por comas, usa solo el primero.
function extraerIdDrive_(valor) {
  const primero = texto_(valor).split(',')[0].trim();
  if (!primero) return null;
  const coincidencia =
    primero.match(/[?&]id=([A-Za-z0-9_-]+)/) ||
    primero.match(/\/d\/([A-Za-z0-9_-]+)/) ||
    primero.match(/^([A-Za-z0-9_-]{20,})$/);
  return coincidencia ? coincidencia[1] : null;
}

function fotoUrl_(id) {
  return id ? 'https://drive.google.com/thumbnail?id=' + id + '&sz=w800' : null;
}

// Agrega https:// si el link no lo trae. Vacío → null.
function normalizarLink_(valor) {
  const url = texto_(valor);
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return 'https://' + url.replace(/^\/+/, '');
}

// Convierte la marca temporal (Date o texto) en milisegundos para ordenar.
function marcaATiempo_(valor) {
  const ms = valor instanceof Date ? valor.getTime() : new Date(valor).getTime();
  return isNaN(ms) ? Number.MAX_SAFE_INTEGER : ms;
}

function valorOpcional_(fila, indice) {
  return indice === undefined ? '' : fila[indice];
}

function texto_(valor) {
  return valor === null || valor === undefined ? '' : String(valor).trim();
}

function normalizar_(valor) {
  return texto_(valor)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Permisos de Drive (fotos)
// ─────────────────────────────────────────────────────────────────────────────

// Pone el archivo como "Cualquier persona con el enlace puede ver".
function hacerPublicoArchivo_(id) {
  try {
    DriveApp.getFileById(id).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return true;
  } catch (err) {
    console.warn('No se pudo compartir la foto ' + id + ': ' + err);
    return false;
  }
}

// Activador "Al enviar formulario". Con "Permitir edición", una respuesta editada
// también dispara este activador, así que la foto nueva también queda pública.
function onFormSubmit(e) {
  try {
    if (e && e.range) {
      const hoja = e.range.getSheet();
      const fila = e.range.getRow();
      if (fila > 1) {
        const encabezados = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];
        const mapa = mapearColumnas_(encabezados);
        const id = extraerIdDrive_(hoja.getRange(fila, mapa.foto + 1).getValue());
        if (id) hacerPublicoArchivo_(id);
      }
    } else {
      hacerFotosPublicas();
    }
  } finally {
    limpiarCache_();
  }
}

// Correr UNA vez a mano (ver paso 5). Recorre todas las filas y pone públicas sus fotos.
function hacerFotosPublicas() {
  const hoja = obtenerHoja_();
  const datos = hoja.getDataRange().getValues();
  const mapa = mapearColumnas_(datos[0]);

  let total = 0;
  let fallidas = 0;
  for (let i = 1; i < datos.length; i++) {
    const id = extraerIdDrive_(datos[i][mapa.foto]);
    if (!id) continue;
    total++;
    if (!hacerPublicoArchivo_(id)) fallidas++;
  }

  limpiarCache_();
  const resumen = 'Fotos revisadas: ' + total + ' · no se pudieron compartir: ' + fallidas;
  console.log(resumen);
  return resumen;
}

// ─────────────────────────────────────────────────────────────────────────────
// Caché
// ─────────────────────────────────────────────────────────────────────────────

function limpiarCache_() {
  CacheService.getScriptCache().remove(CACHE_KEY);
}

// Activador simple (no requiere configurarlo): limpia el caché cuando cambia
// "Aprobado" para que la landing muestre el cambio de inmediato.
// Si se edita una foto a mano, también la hace pública.
function onEdit(e) {
  try {
    if (!e || !e.range) return;
    const hoja = e.range.getSheet();
    const fila = e.range.getRow();
    if (fila <= 1) return;

    const encabezado = normalizar_(hoja.getRange(1, e.range.getColumn()).getValue());
    if (encabezado === 'aprobado') {
      limpiarCache_();
    } else if (encabezado.indexOf('foto') !== -1) {
      const id = extraerIdDrive_(e.range.getValue());
      if (id) hacerPublicoArchivo_(id);
      limpiarCache_();
    }
  } catch (err) {
    console.warn('onEdit: ' + err);
  }
}
