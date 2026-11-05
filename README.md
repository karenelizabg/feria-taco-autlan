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
404.html                    Página de error 404 (entrada propia de Vite)
vite.config.js              Configuración de Vite (las dos páginas)
public/assets/img/          Imágenes, logo, favicons, og-2.jpg, fondo de tacos y decorativos
public/                     favicon.ico, robots.txt, sitemap.xml y .htaccess (se copian tal cual a dist/)
src/
├── main.jsx                Monta la página principal
├── not-found-main.jsx      Monta la página 404
├── App.jsx                 Orden de las secciones de la página principal
├── participa-main.jsx      Monta la página para taquerías
├── pages/Participa.jsx     Página para taquerías
├── pages/NotFound.jsx      Página 404
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

## Publicar (Hostinger)

El sitio va en la raíz de `https://feriadeltacoautlan.com/` (Apache / LiteSpeed, hosting compartido).

1. `npm run build`: genera `dist/` (index.html, participa.html, 404.html y `assets/`).
2. En hPanel → Archivos → Administrador de archivos → `public_html`, sube **el contenido** de `dist/` (no la carpeta `dist` en sí). Incluye `.htaccess`, que es un archivo oculto: activa "Mostrar archivos ocultos" si no aparece.
3. hPanel → Sitios web → Administrar → SSL: instalar el certificado gratuito y activar la redirección a HTTPS.
4. Verificar encabezados: `curl -sI https://feriadeltacoautlan.com/` debe mostrar `Content-Security-Policy`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` y `X-Content-Type-Options`. `curl -sI http://www.feriadeltacoautlan.com/` debe responder 301 a `https://feriadeltacoautlan.com/`.

El `.htaccess` incluye la CSP con el hash del script inline de `<head>`. Si cambias ese script, hay que recalcular el hash (sha256 en base64) y actualizarlo en `public/.htaccess`.

## Pendientes y decisiones abiertas

- **Logo:** se usa `logoo.jpg` (1296 × 831) limpiado del fondo de cuadrícula falsa, en `public/assets/img/logo.png` (620 × 433). El favicon sale del mismo logo: a 16–32 px el texto no se lee, conviene un icono solo con el taco. Falta el archivo vectorial (SVG) oficial.
- **Mascota:** la imagen se generó con IA y se mantiene como mascota oficial. Un ilustrador puede entregar la versión vectorial y las demás poses.
- **Tipografías:** Anton (títulos) y Lexend (cuerpo), desde Google Fonts. Reemplazar por las de la marca cuando lleguen los archivos.
- **Fotos:** las cuatro fotos del sitio están confirmadas. `te-esperamos.webp` trae horneado el logo y la mascota del flyer.
- **Ubicación:** "Cómo llegar" y "Abrir en Google Maps" apuntan al mismo enlace de Google Maps del jardín. `sede.webp` es el jardín.
- **Contenido por completar:** lista de taquerías confirmadas, artistas de la música en vivo (en la página figuran como "Por anunciar"), programa por horas.
- **Por confirmar:** danza tradicional, toldo incluido y corriente eléctrica (marcados en la página como "Por confirmar" y fuera de las metas y del JSON-LD).
- **Registro de asistentes:** la entrada es gratuita y no se definió cómo gestionarlo. No está implementado.
- **A confirmar antes de publicar:** número de WhatsApp (`32 23 78 54 79`). El sitio no muestra créditos de pie; si se requieren (por ejemplo, de Box Marketing o del gobierno municipal), agregarlos en `Footer.jsx`.
- **Redes sociales:** el brief no incluyó cuentas; no hay enlaces a redes.
- **HSTS:** pendiente. Activar `Strict-Transport-Security` en `.htaccess` cuando el SSL esté verificado.
- **Pre-renderizado:** no se hizo. Requeriría un build de servidor y hidratación de la cuenta regresiva y del carrusel; conviene evaluarlo si el SEO por texto resulta insuficiente.
