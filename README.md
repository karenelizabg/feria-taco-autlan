# Feria del Taco Autlán 2026 — Landing

Sitio de la **Feria del Taco Autlán** (domingo 29 de noviembre de 2026, 1:00 a 11:00 pm, Jardín Las Montañas, Autlán de Navarro, Jalisco). Hecho con **React + Vite**; el diseño, los estilos y la identidad son los mismos de la versión anterior en HTML.

Dos públicos, dos páginas: **visitantes** (`index.html`: hero, la feria, qué habrá, directorio, ubicación) y **taquerías** (`participa.html`: qué incluye el lugar y botón a WhatsApp). El inicio enlaza a esa página desde "Soy taquero" (encabezado) y "Quiero participar" (sección de taquerías).

## Ver el sitio en local

```bash
npm install
npm run dev
```

Abrir <http://localhost:4173>. Para revisar la versión de producción: `npm run build` y luego `npm run preview`.

## Estructura

```
index.html                  Entrada de la página principal (<head>, metas, JSON-LD)
participa.html              Entrada de la página para taquerías
vite.config.js              Configuración de Vite (las dos páginas)
public/assets/img/          Imágenes, logo, favicons, og.jpg, fondo de tacos y decorativos (rutas sin cambios)
src/
├── main.jsx                Monta la página principal
├── App.jsx                 Orden de las secciones de la página principal
├── participa-main.jsx      Monta la página para taquerías
├── pages/Participa.jsx     Página para taquerías
├── sections/               Una sección por archivo: Hero, Presentacion (la feria), Actividades (qué habrá),
│                           Taquerias, Sede (ubicación e información del evento), ParticipaHero
├── components/
│   ├── layout/             SiteLayout (esqueleto de página), Header (menú), Footer
│   ├── ui/                 Button, SectionHead, Sticker, Tile, Marquee, Toast, Icon (sprite de iconos)
│   ├── taquerias/          TaqueriaCard (tarjeta de una taquería), PendingCard ("Próximamente")
│   └── event/              Countdown (cuenta regresiva), EventFacts (fecha, horario, entrada)
├── data/
│   ├── taquerias.js        Lista de taquerías participantes
│   ├── evento.js           Fecha y horario de inicio y fin de la feria
│   └── site.js             Textos de compartir y enlaces de cada página
├── hooks/                  useCountdown, useRevealOnScroll, useShare
├── context/SiteContext.jsx Datos de la página actual y aviso breve (toast)
├── lib/                    asset (rutas), cx (clases), share (enlaces para compartir)
└── styles/styles.css       Estilos de ambas páginas (tokens de color y tipografía al inicio)
```

El encabezado, el pie y el sprite de iconos viven en `components/layout` y se usan en las dos páginas: si cambias un enlace del menú, cámbialo una sola vez en `data/site.js` o en `Header.jsx`.

## Cómo agregar una taquería

Solo hay que tocar [src/data/taquerias.js](src/data/taquerias.js). Se agrega un objeto al arreglo `taquerias` y la tarjeta aparece sola en el directorio:

```js
{
  nombre: 'Taquería El Ejemplo',
  logo: 'assets/img/taquerias/ejemplo.webp',   // archivo en public/assets/img/taquerias/
  vende: ['Tacos al pastor', 'Gringas'],
  mapa: 'https://www.google.com/maps/dir/?api=1&destination=...',
  colonia: 'Centro',
  instagram: 'taqueria.ejemplo',
  telefono: '3171234567',
},
```

Solo `nombre` es obligatorio; los demás campos se describen al inicio del archivo. Para una taquería aún sin confirmar, deja una entrada `{ pendiente: true }`: se muestra como tarjeta "Próximamente". Al confirmarla, reemplaza esa entrada por los datos reales.

## Cómo actualizar el contenido

- **Taquerías participantes:** [src/data/taquerias.js](src/data/taquerias.js). Con el arreglo vacío, la página muestra "Lista por anunciar".
- **Fecha y horario:** [src/data/evento.js](src/data/evento.js) (cuenta regresiva). El JSON-LD del `<head>` de [index.html](index.html) también lleva la fecha.
- **Textos de la página:** en la sección correspondiente de `src/sections/`.
- **Colores y tipografías:** variables CSS al inicio de [src/styles/styles.css](src/styles/styles.css).
- **WhatsApp de la organización:** en [src/sections/ParticipaHero.jsx](src/sections/ParticipaHero.jsx), el enlace `wa.me` del botón "Quiero participar" (`523223785479`).

**Mascota:** el taco con sombrero se asoma sobre el boleto del hero (`public/assets/img/mascota-asomandose.webp`, 520 × 497, fondo transparente). Va fuera de `.ticket` porque la máscara del boleto la recortaría, y su posición depende de dónde cae la línea de abajo del taco en la imagen (comentario en la sección 5 de styles.css): si se cambia la imagen, hay que ajustar esos números.

Las animaciones son sobrias y viven en [styles.css](src/styles/styles.css) (secciones 10 y 11): entrada escalonada del hero, aparición al hacer scroll y hover en cards y botones (solo en dispositivos con cursor). Todo se desactiva con `prefers-reduced-motion`.

Estados de carga (sección 12 de styles.css): las tarjetas de carga del directorio de taquerías ya no se usan (la lista se pinta al montar React); los dígitos de la cuenta regresiva siguen ocultos hasta la primera lectura del reloj.

**Celular primero:** la mayoría de las visitas serán desde el celular. Los ajustes para pantallas de hasta 599 px viven juntos en la sección 13 de styles.css (boleto compacto, botones a todo el ancho, tarjetas con icono a la izquierda, datos apilados, pie en dos columnas); hay un ajuste extra para 320–359 px. Los `:hover` solo se aplican en dispositivos con cursor para que no se queden "pegados" al tocar. Revisar cualquier cambio a 320, 375 y 414 px antes que en escritorio.

## Publicar

Ejecuta `npm run build`: genera la carpeta `dist/` con las dos páginas y sus recursos. Se puede subir a Netlify, Cloudflare Pages, Vercel o GitHub Pages (gratis) como sitio estático. Al tener dominio:

1. Poner `og:image` como URL absoluta y agregar `og:url` y `canonical` en el `<head>` de ambas páginas (hay un `TODO(dominio)` marcado).
2. Agregar `image` y `url` al JSON-LD del evento.

## Pendientes y decisiones abiertas

- **Logo:** se usa un recorte del flyer (247 × 176 px), suficiente para encabezado y pie. Falta el archivo original (SVG o PNG grande con fondo transparente). Además hay **dos versiones del logo** (flyers: wordmark plano; PDF: letras de brocha con mascota) — confirmar cuál es la oficial. El SVG que se recibió (`Diseño sin título.svg`) es un trazo de un solo color y le faltan letras (R, C y O), así que no sirve como logo.
- **Mascota:** la imagen actual se generó con IA (Gemini) y llegó como JPG con un cuadriculado falso en lugar de transparencia; se le quitó el fondo en local. Confirmar con el cliente si será la mascota oficial; para eso conviene que un ilustrador haga la versión final (vector) y las demás poses.
- **Tipografías:** aproximadas con Google Fonts (Chonburi, Lexend, Anton). Reemplazar por las de la marca cuando lleguen los archivos.
- **Fotos:** no hay material propio. Las imágenes del PDF traen marcas de agua (Unsplash+, Dreamstime), por eso no se usaron. La **galería** quedó fuera hasta tener fotos.
- **Ubicación:** la sección "Nuestra sede" muestra una foto del jardín (`assets/img/sede.webp`, de la fuente de talavera) en lugar del mapa; el botón "Abrir en Google Maps" sigue abajo. Confirmar el punto exacto. La búsqueda "Jardín Las Montañas, Autlán de Navarro" en Google Maps cae en la colonia Las Montañas, junto a un negocio llamado "Montañas Garden" (Antonio Borbón 175). Ideal: enlace de Google Maps del lugar real para fijar el pin.
- **Contenido por completar:** lista de taquerías confirmadas, grupos musicales invitados y programa por horas.
- **Registro de asistentes:** se marcó en el brief, pero la entrada es gratuita y no se definió cómo gestionarlo. No está implementado.
- **A confirmar antes de publicar:** número de WhatsApp (`32 23 78 54 79`) y los créditos del pie ("Box Marketing · Gobierno Municipal de Autlán 2024–2027"). El precio por espacio estaba en blanco en la propuesta, así que no aparece.
- **Redes sociales:** el brief no incluyó cuentas; no hay enlaces a redes.
