/**
 * datos.js — la única fuente de verdad del sitio.
 *
 * Todo el contenido vive aquí. El HTML no lleva textos ni rutas de foto
 * escritos a mano: se genera desde este archivo. Así se cambia el catálogo
 * sin tocar el maquetado.
 *
 * ── CÓMO LLENAR LO QUE FALTA ───────────────────────────────────────────
 * Los campos con `PENDIENTE(...)` aparecen marcados en el sitio con un
 * recuadro ámbar visible, para que se vea de un vistazo qué falta y no se
 * publique nada a medias por descuido.
 *
 * Para llenar un campo: reemplaza  PENDIENTE("lo que sea")  por el texto
 * real entre comillas. Así:
 *
 *     tiempo: PENDIENTE("tiempo de entrega"),      ← antes
 *     tiempo: "De 15 a 20 días",                   ← después
 *
 * (El ejemplo va con un campo de texto a propósito: en este archivo no se
 * escribe ni de muestra un número de teléfono que pudiera existir.)
 *
 * Para ocultar una sección entera mientras no haya información, pon su
 * `visible: false`.
 *
 * ── DATOS DE EJEMPLO ───────────────────────────────────────────────────
 * `EJEMPLO(...)` es el segundo marcador. Se usa SOLO en los siete campos de
 * contacto operativo que Rafael todavía no ha dado, para que el sitio pueda
 * enseñarse completo sin huecos. Los valores son inconfundiblemente falsos
 * (todo ceros, "ejemplo"), el sitio los rotula "EJEMPLO — falta el dato real"
 * y NUNCA se construye con ellos un enlace funcional (`wa.me`, `mailto:`,
 * `tel:`, perfiles de redes). Al llegar el dato real se reemplaza
 * `EJEMPLO("…", "…")` por el texto entre comillas y el enlace se activa solo.
 *
 * Fuera de esos siete campos NO se inventa nada: lo que falta va en PENDIENTE.
 */

/** Marca un dato que aún no se tiene. El sitio lo resalta en vez de mentir. */
export const PENDIENTE = (que) => ({ __pendiente: true, que });

export const esPendiente = (v) => v && typeof v === 'object' && v.__pendiente === true;

/**
 * Marca un dato de relleno visible como tal.
 * @param valor  el texto falso que se muestra (debe ser evidentemente falso)
 * @param que    el dato real que falta, para el rótulo y el aviso
 */
export const EJEMPLO = (valor, que) => ({ __ejemplo: true, valor, que });

export const esEjemplo = (v) => v && typeof v === 'object' && v.__ejemplo === true;

/** True si el valor no se puede usar para construir un enlace real. */
export const sinDatoReal = (v) => esPendiente(v) || esEjemplo(v);

/* ═══════════════════════════════════════════════════════════
   NEGOCIO
   ═══════════════════════════════════════════════════════════ */
export const NEGOCIO = {
  nombre: 'Accesorios en Cobre',
  marcaGrafica: 'RSILVA',                              // el wordmark de img/logo/
  lema: 'Hecho para durar. Creado para distinguir.',   // tomado de la ficha técnica
  // Redactada únicamente a partir de la historia de marca de Rafael (ver ARTESANO.bio).
  descripcion:
    'Taller de cobre en Barichara. Desde hace quince años, Rafael Enrique Silva ' +
    'Gómez fabrica duchas, griferías y accesorios de forma completamente ' +
    'artesanal, cuidando cada detalle del proceso para lograr acabados ' +
    'impecables y piezas pensadas para durar por generaciones.',

  // — Contacto —
  // Datos de EJEMPLO mientras Rafael no entregue los reales. Ver la nota de
  // cabecera: se muestran rotulados y jamás generan un enlace funcional.
  whatsapp: EJEMPLO('+57 300 000 0000', 'el número real de WhatsApp'),
  telefono: EJEMPLO('+57 601 000 0000', 'el teléfono real'),
  email: EJEMPLO('correo@ejemplo.com', 'el correo real del comercio'),
  ciudad: EJEMPLO('Ciudad de ejemplo', 'la ciudad y el departamento'),
  direccion: EJEMPLO('Dirección de ejemplo', 'la dirección del taller'),

  // — Redes —
  instagram: EJEMPLO('@ejemplo', 'el perfil real de Instagram'),
  facebook: EJEMPLO('facebook.com/ejemplo', 'el perfil real de Facebook'),
  mostrarRedes: true,

  // — Dominio —
  dominio: 'accesoriosencobre.co',   // Spaceship + GitHub Pages; ver CNAME
};

/* ═══════════════════════════════════════════════════════════
   PERSONA A CARGO
   ═══════════════════════════════════════════════════════════ */
export const ARTESANO = {
  visible: true,
  nombre: 'Rafael Enrique Silva Gómez',
  rol: 'Fundador y maestro artesano',
  aniosOficio: 15,
  // Texto de Rafael, literal. Solo se partió en párrafos para poder leerlo.
  bio: [
    'Hace 15 años encontré, casi por casualidad, el camino que transformó mi ' +
    'vida. En ese momento trabajaba como administrador de una ladrillera, hasta ' +
    'que un día, en una reunión con un amigo, vi una regadera de cobre. Le pedí ' +
    'que me la prestara con el reto de fabricar una igual.',

    'Lo conseguí, y esa primera pieza marcó el inicio de mi taller en Barichara. ' +
    'Desde entonces me he dedicado a perfeccionar el trabajo del cobre de forma ' +
    'completamente artesanal.',

    'Mi mayor satisfacción está en lograr acabados impecables y cuidar cada ' +
    'detalle del proceso, para crear duchas, griferías y accesorios que ' +
    'conservan la belleza del trabajo hecho a mano y están pensados para durar ' +
    'por generaciones.',
  ],
  // Hay un retrato candidato en el material, pero nadie ha confirmado que sea
  // Rafael. Publicarlo con su nombre sería afirmar algo que no consta.
  foto: PENDIENTE('foto de Rafael confirmada por él mismo'),
};

/* ═══════════════════════════════════════════════════════════
   HISTORIA DE DURABILIDAD
   El argumento de venta más fuerte del producto: cobre a la
   intemperie que envejece sin degradarse.
   ═══════════════════════════════════════════════════════════ */
export const DURABILIDAD = {
  visible: true,
  titulo: 'A la intemperie, el cobre no se rinde: madura.',
  // Texto de Rafael, literal.
  relato:
    'Duchas en cobre instaladas a la intemperie hace 14 años en el Hotel Terra ' +
    'Barichara, conservando su funcionabilidad y durabilidad del material.',
  aniosPrueba: 14,
  // Existe UNA foto, la de hoy: no hay un "antes", así que no se finge una
  // comparación. Los campos fotoAntes/fotoDespues del esquema anterior se
  // reemplazan por una sola foto con su pie.
  foto: {
    base: 'hotel-terra-barichara',
    alt: 'Dos duchas de cobre con brazo en arco, montadas sobre columnas de ' +
         'piedra en un patio empedrado, junto a un muro ocre con teja de barro ' +
         'y setos amarillos.',
    pie: 'Hotel Terra Barichara. Las mismas piezas, catorce años después.',
  },
};

/* ═══════════════════════════════════════════════════════════
   TALLER Y PROCESO
   ═══════════════════════════════════════════════════════════ */
export const TALLER = {
  visible: true,
  titulo: 'Cada pieza se dobla, suelda y pule a mano.',
  // Solo lo que sostienen los pies de foto de Rafael. Sin paso a paso inventado.
  descripcion:
    'Las uniones se sueldan con soplete, pieza por pieza, y las manijas de ' +
    'control de agua se elaboran a mano cuidando cada detalle de su fabricación.',
  // Pies de foto: texto de Rafael, literal. El `alt` describe la foto para
  // quien no la ve; no repite el pie ni persigue palabras clave.
  fotos: [
    {
      base: 'taller-soldadura',
      alt: 'Artesano con delantal de mezclilla soldando con soplete de propano ' +
           'una pieza de cobre en arco sujeta en una prensa de banco, con el ' +
           'alambre de estaño en la otra mano.',
      pie: 'Aplicación de soldadura para lograr uniones fuertes, en los trabajos que se entregan.',
    },
    {
      base: 'taller-elaboracion-manijas',
      alt: 'El artesano perfora un taco de madera sujeto en la prensa, con tres ' +
           'grupos de manijas de cobre terminadas sobre la mesa oscura.',
      pie: 'Elaboración manual de las manijas en cobre, cuidando cada detalle de su fabricación.',
    },
    {
      base: 'taller-manijas-valvula',
      alt: 'Dos hileras de manijas de cobre en codo dispuestas en abanico sobre ' +
           'fondo negro, con una válvula Grival en color cobre al frente.',
      pie: 'Manijas para control de agua. Válvula Grival, color cobre.',
    },
  ],
  // Venta 100% virtual: no hay showroom. Los subcampos de local se retiran
  // en vez de dejarlos como pendientes de algo que no existe.
  puntoFisico: { existe: false },
};

/* ═══════════════════════════════════════════════════════════
   ENVÍOS
   ═══════════════════════════════════════════════════════════ */
export const ENVIOS = {
  visible: true,
  cobertura: 'Cobertura nacional.',
  tiempo: 'De 15 a 20 días de producción antes del despacho.',
  gestion:
    'Envío tercerizado con Servientrega o Interrapidísimo. Se envía el número ' +
    'de guía para rastrear el pedido.',
  costoTipo: PENDIENTE('¿el costo de envío es fijo o variable?'),
  tarifas: PENDIENTE('tabla de tarifas de envío'),
  envioGratisDesde: PENDIENTE('¿hay monto de envío gratis? ¿desde cuánto?'),
};

/* ═══════════════════════════════════════════════════════════
   PAGOS Y POLÍTICAS
   ═══════════════════════════════════════════════════════════ */
export const PAGOS = {
  visible: true,
  // Wompi está en los planes de Rafael pero no está activa: no se monta pasarela.
  pasarela: PENDIENTE('pasarela de pagos activa (Wompi está prevista, aún no funciona)'),
  metodos: [
    '50% de anticipo para iniciar la fabricación y 50% contra envío.',
    'Transferencia a Bancolombia (cuenta de ahorros) o a Nequi.',
  ],
  // Mientras no haya pasarela, el sitio cierra la venta por WhatsApp.
  modoVenta: 'whatsapp',   // 'whatsapp' | 'pasarela'
};

export const POLITICAS = {
  visible: true,
  cuidado:
    'Las piezas son aptas para interior y exterior. La instalación requiere ' +
    'conocimiento previo. No las limpies con Clorox: solo jabones suaves.',
  defectos:
    'Si la pieza llega defectuosa, el taller la repone. Si el daño lo causa un ' +
    'procedimiento mal hecho por el técnico instalador, el taller no responde ' +
    'por él.',
  cambiosDevoluciones: PENDIENTE('política de cambios y devoluciones: plazos, condiciones, quién paga el envío'),
  // Rafael dijo que estas dos las tiene que pensar después. No se redactan.
  garantia: PENDIENTE('garantía de las piezas'),
  datos: PENDIENTE('tratamiento de datos personales'),
};

/* ═══════════════════════════════════════════════════════════
   CATÁLOGO
   Las medidas salen de las fichas técnicas reales del cliente.
   ═══════════════════════════════════════════════════════════ */
export const CATEGORIAS = [
  { slug: 'duchas',     nombre: 'Duchas',     descripcion: 'Columnas de ducha en cobre para exterior e interior.' },
  { slug: 'grifos',     nombre: 'Grifos',     descripcion: 'Grifería de muro y de cubierta, doblada a mano.' },
  { slug: 'toalleros',  nombre: 'Toalleros',  descripcion: 'Toalleros en tubo de cobre, de línea sobria.' },
  { slug: 'accesorios', nombre: 'Accesorios', descripcion: 'Complementos para completar el baño.' },
];

/**
 * El catálogo vive en `catalogo.js` y se importa desde allí directamente.
 *
 * No se reexporta aquí a propósito: `catalogo.js` necesita `PENDIENTE` de este
 * archivo, así que reexportarlo cerraría el ciclo y `PENDIENTE` quedaría sin
 * inicializar cuando `catalogo.js` la usa ("Cannot access before initialization").
 */
