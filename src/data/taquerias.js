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
  {
    nombre: 'Taquería Autlán',
    logo: 'assets/img/taquerias/taqueria-autlan.webp',
    especialidad: 'Taquería de pastor y arrachera',
    vende: ['Tacos al pastor', 'Tacos de arrachera'],
    mapa: 'https://www.google.com/maps/place/Donato+Guerra+83,+Centro,+48900+Autlán+de+Navarro,+Jal./@19.7651874,-104.3709574,17z/data=!3m1!4b1!4m6!3m5!1s0x842455e632a5c69b:0xf77eb7f0e8f9a025!8m2!3d19.7651824!4d-104.3683825!16s%2Fg%2F11c210v875',
  },
  {
    nombre: 'Tacos Chabety',
    logo: 'assets/img/taquerias/tacos-chabety.webp',
    especialidad: 'Tacos de guisados',
    mapa: 'https://www.google.com/maps/place/Mercado+Juàrez+Autlàn/@19.7713891,-104.3704283,17z/data=!3m2!4b1!5s0x842455c222cecbe1:0xc86ac4e824c30293!4m6!3m5!1s0x842455dcd3f68d9b:0xfbe2620e4bfd040f!8m2!3d19.7713841!4d-104.3678534!16s%2Fg%2F119tpy5xt',
  },
  {
    nombre: 'Quesabirrias las buenisimas',
    logo: 'assets/img/taquerias/quesabirrias-las-buenisimas.webp',
    especialidad: 'Discada, birria y adobada',
    vende: ['Quesabirrias', 'Discada', 'Adobada'],
    mapa: 'https://www.google.com/maps/place/Av.+Reforma+294,+Centro,+48900+Autlán+de+Navarro,+Jal./@19.7675547,-104.3743358,17z/data=!3m1!4b1!4m6!3m5!1s0x842455e760e4a4cb:0xbbc50ac9d417d5fa!8m2!3d19.7675497!4d-104.3717609!16s%2Fg%2F11qb8bz5_b',
  },
  {
    nombre: 'Santo Pecado',
    logo: 'assets/img/taquerias/santo-pecado.webp',
    especialidad: 'Banquetería, carnes asadas, taquizas y desayunos',
  },
  // TODO: reemplazar cada "Próximamente" por los datos de la taquería confirmada.
  { pendiente: true },
];
