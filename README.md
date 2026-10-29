# Feria del Taco Autlán 2026 — Landing

Sitio estático para la **Feria del Taco Autlán** (domingo 29 de noviembre de 2026, 1:00 a 11:00 pm, Jardín Las Montañas, Autlán de Navarro, Jalisco). Sin dependencias ni paso de compilación: HTML + CSS + JavaScript.

Dos públicos, dos páginas: **visitantes** (`index.html`: hero, la feria, qué habrá, directorio, ubicación) y **taquerías** (`participa.html`: qué incluye el lugar, por qué participar y formulario). El inicio solo trae una franja que invita a las taquerías a esa página.

## Ver el sitio en local

```bash
python3 -m http.server 4173
```

Abrir <http://localhost:4173>. (También funciona abriendo `index.html` directo en el navegador.)

## Estructura

```
index.html              Página principal (público)
participa.html          Página para taquerías, con el formulario de registro
assets/css/styles.css   Estilos de ambas páginas (tokens de color y tipografía al inicio)
assets/js/main.js       Cuenta regresiva, menú, compartir, directorio y formulario
assets/img/             Logo, favicons, imagen para redes (og.jpg), papel picado y textura
data/taquerias.js       Lista de taquerías participantes (se llena sola en index.html)
```

El encabezado y el pie están repetidos en las dos páginas (no hay paso de compilación): si cambias un enlace del menú, cámbialo en ambas.

## Cómo actualizar el contenido

- **Taquerías participantes:** agregar objetos en [data/taquerias.js](data/taquerias.js). Mientras esté vacío, la página muestra "Muy pronto anunciaremos la lista".
- **Textos, fecha y horario:** editar [index.html](index.html). La fecha y hora de la cuenta regresiva viven en `data-start` / `data-end` del bloque `data-countdown`; el JSON-LD del `<head>` también lleva la fecha.
- **Colores y tipografías:** variables CSS al inicio de [styles.css](assets/css/styles.css).
- **WhatsApp de la organización:** en [participa.html](participa.html), el atributo `data-whatsapp` del formulario (`523223785479`) y los enlaces `wa.me` y `tel:`.

### Formulario de taquerías

No hay servidor: al enviar, se abre WhatsApp con el mensaje ya redactado hacia el número de la organización. El sitio no guarda datos. Si más adelante se quiere una base de registros, habría que conectar un servicio de formularios (Formspree, Google Forms, etc.).

## Publicar

Es una carpeta estática, se puede subir tal cual a Netlify, Cloudflare Pages, Vercel o GitHub Pages (gratis). Al tener dominio:

1. Poner `og:image` como URL absoluta y agregar `og:url` y `canonical` en el `<head>` de ambas páginas (hay un `TODO(dominio)` marcado).
2. Agregar `image` y `url` al JSON-LD del evento.

## Pendientes y decisiones abiertas

- **Logo:** se usa un recorte del flyer (247 × 176 px), suficiente para encabezado y pie. Falta el archivo original (SVG o PNG grande con fondo transparente). Además hay **dos versiones del logo** (flyers: wordmark plano; PDF: letras de brocha con mascota) — confirmar cuál es la oficial.
- **Tipografías:** aproximadas con Google Fonts (Chonburi, Lexend, Anton). Reemplazar por las de la marca cuando lleguen los archivos.
- **Fotos:** no hay material propio. Las imágenes del PDF traen marcas de agua (Unsplash+, Dreamstime), por eso no se usaron. La **galería** quedó fuera hasta tener fotos.
- **Ubicación:** confirmar el punto exacto. La búsqueda "Jardín Las Montañas, Autlán de Navarro" en Google Maps cae en la colonia Las Montañas, junto a un negocio llamado "Montañas Garden" (Antonio Borbón 175). Ideal: enlace de Google Maps del lugar real para fijar el pin.
- **Contenido por completar:** lista de taquerías confirmadas, grupos musicales invitados y programa por horas.
- **Registro de asistentes:** se marcó en el brief, pero la entrada es gratuita y no se definió cómo gestionarlo. No está implementado.
- **A confirmar antes de publicar:** número de WhatsApp (`32 23 78 54 79`), la cifra "visita estimada 2,600 personas" (viene de la propuesta para taquerías), y los créditos del pie ("Box Marketing · Gobierno Municipal de Autlán 2024–2027"). El precio por espacio estaba en blanco en la propuesta, así que no aparece.
- **Redes sociales:** el brief no incluyó cuentas; no hay enlaces a redes.
