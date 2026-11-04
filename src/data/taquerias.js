// Taquerías participantes.
// Para agregar una taquería, copia un objeto y pégalo en el arreglo `taquerias`.
// La tarjeta se genera sola: no hay que tocar ningún componente.
// Las entradas con `pendiente: true` son tarjetas "Próximamente" (sin datos ni enlaces).
// Para publicar una taquería real, reemplaza su entrada pendiente por los datos y quita `pendiente`.
// Mientras el arreglo esté vacío se muestra el aviso "Lista por anunciar".
//
// Campos (solo `nombre` es obligatorio):
//   nombre        "Taquería El Ejemplo"
//   logo          "assets/img/taquerias/ejemplo.webp"   (ruta desde public/; horizontal o cuadrado, fondo blanco)
//   vende         ["Tacos al pastor", "Gringas"]       (resumen corto: se ve como lista horizontal)
//   mapa          "https://www.google.com/maps/dir/?api=1&destination=..."   (botón "conocerlos")
//   especialidad  "Tacos al pastor y gringas"           (texto libre, si no se usa `vende`)
//   colonia       "Centro"
//   instagram     "taqueria.ejemplo"     (solo el usuario, sin @ ni URL)
//   facebook      "taqueriaejemplo"      (solo el usuario o nombre de página)
//   telefono      "3171234567"

export const taquerias = [
  {
    nombre: 'Sutako',
    logo: 'assets/img/taquerias/sutako.webp',
    especialidad: 'Sabor desde Puebla, tacos al Pastor en Autlán',
    vende: ['Tacos al pastor', 'Burritos', 'Tortas'],
    mapa: 'https://www.google.com/maps/dir/?api=1&destination=Sutako%20Autl%C3%A1n%2C%20C.%20Zaragoza%20132%2C%20Centro%2C%2048900%20Autl%C3%A1n%20de%20Navarro%2C%20Jal.',
  },
  // TODO: reemplazar cada "Próximamente" por los datos de la taquería confirmada.
  { pendiente: true },
  { pendiente: true },
  { pendiente: true },
  { pendiente: true },
  { pendiente: true },
];
