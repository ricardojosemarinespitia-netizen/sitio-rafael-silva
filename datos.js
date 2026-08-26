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
 * `EJEMPLO(...)` es el segundo marcador: un dato de relleno visible y rotulado
 * que NUNCA construye un enlace funcional. Hoy (ago-2026) ya no queda ninguno
 * en uso — el contacto real llegó — pero el mecanismo se conserva por si un
 * dato nuevo tiene que enseñarse antes de confirmarse.
 *
 * Fuera de eso NO se inventa nada: lo que falta va en PENDIENTE.
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
  marcaGrafica: 'R.SILVA',                             // el wordmark de img/logo/
  lema: 'Hecho para durar. Creado para distinguir.',   // tomado de la ficha técnica
  // Redactada únicamente a partir de la historia de marca de Rafael (ver ARTESANO.bio).
  descripcion:
    'Taller de cobre en Bucaramanga. Desde hace quince años, Rafael Enrique Silva ' +
    'Gómez fabrica duchas, griferías y accesorios de forma completamente ' +
    'artesanal, cuidando cada detalle del proceso para lograr acabados ' +
    'impecables y piezas pensadas para durar por generaciones.',

  // — Contacto —
  // Solo los canales reales. El teléfono fijo y la dirección se retiraron a
  // pedido del cliente: la venta es 100% virtual y el canal es WhatsApp.
  whatsapp: '573213485046',
  email: 'rafaelsilvagomez@gmail.com',
  // No es un dato de contacto: es dónde fabrica HOY. La historia empezó en
  // Barichara (ver ARTESANO.bio, palabras textuales de Rafael); el taller
  // actual está en Bucaramanga. Son dos hechos distintos, no contradictorios.
  origen: 'Bucaramanga, Santander',

  // — Redes —
  // El único perfil activo es Instagram (link confirmado por el cliente).
  instagram: '@accesorios_en_cobre',
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
  // El retrato sale del material gráfico del propio taller (la lámina
  // "Tradición Centenaria" con su nota manuscrita): la misma pieza lo
  // presenta con nombre y letra propia, que es la confirmación que faltaba.
  foto: {
    base: 'rafael-retrato',
    alt: 'Rafael Silva soldando con soplete una unión de cobre en su taller, ' +
         'con camisa de cuadros, delantal de mezclilla y el estaño en la otra mano.',
  },
  // La nota manuscrita de esa misma lámina, literal, con su letra de molde.
  // Es la voz de Rafael, no redacción del sitio.
  notaManuscrita: [
    'Todo comenzó hace más de 15 años en Barichara.',
    'Hoy en día, esto es un hobby para mí. Todas las piezas las elaboro por ' +
    'encargo desde mi taller, buscando siempre entregar un producto de muy ' +
    'buena calidad y que perdure por muchos años.',
  ],
  // Las fotos que orbitan el retrato: dos del taller ya publicadas y el
  // fundido de las bases de regadera. Verticales las tres.
  satelites: [
    {
      base: 'taller-soldadura',
      alt: 'Soldadura con soplete de una pieza de cobre en arco sujeta en una prensa de banco.',
    },
    {
      base: 'taller-fundido',
      alt: 'Soplete fundiendo la rosca central de una base de regadera de cobre, ' +
           'con las regaderas de martillado circular al fondo.',
    },
    {
      base: 'taller-elaboracion-manijas',
      alt: 'Perforación de un taco de madera en la prensa, con manijas de cobre terminadas sobre la mesa.',
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   EL COBRE
   Historia breve del material, integrada en la sección de
   Rafael. Cultura general verificable — datos del METAL, no
   afirmaciones sobre el negocio (esas siguen su regla dura).
   ═══════════════════════════════════════════════════════════ */
export const COBRE = {
  titulo: '¿Sabías que el cobre fue el primer metal?',
  relato: [
    'La humanidad aprendió a martillar cobre hace más de diez mil años, antes ' +
    'que cualquier otro metal: hay piezas de esa época que existen todavía.',
    'Y su color nunca se detiene: con los años la superficie se apaga, se dora ' +
    'en tonos tierra y puede llegar al verde. Esa pátina no es daño — es una ' +
    'capa que protege el metal que tiene debajo. Una pieza de cobre no se ' +
    'gasta: cambia de piel.',
  ],
  // Las tres etapas de la pátina, de menos a más oxidada. No se funden por
  // reloj: la escena las cruza según lo que se ha deslizado, así que el metal
  // envejece bajo el dedo de quien lee (ver `activarMaterial()` en app.js).
  patinas: ['patina-3', 'patina-2', 'patina-1'],
  // Rótulos de esas tres fotos, con las palabras del propio relato de arriba
  // ("se apaga, se dora en tonos tierra y puede llegar al verde"). Describen
  // lo que se ve en cada imagen; no son un dato del negocio ni una escala de
  // tiempo — cuánto tarda cada etapa depende del clima y no se afirma aquí.
  etapas: ['Cobre nuevo', 'Tonos tierra', 'Verde'],
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
  // Costo de envío, tarifas y envío gratis: Rafael aún no los define. Se
  // retiraron del sitio a pedido del cliente; la lista de lo que falta
  // sigue viva en PENDIENTES.md para no perderla.
};

/* ═══════════════════════════════════════════════════════════
   PAGOS Y POLÍTICAS
   ═══════════════════════════════════════════════════════════ */
export const PAGOS = {
  visible: true,
  // Wompi está en los planes de Rafael pero no está activa: no se monta
  // pasarela ni se anuncia (retirado del sitio; queda en PENDIENTES.md).
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
  // Cambios/devoluciones, garantía y tratamiento de datos: Rafael los tiene
  // que pensar. Retirados del sitio a pedido del cliente (ver PENDIENTES.md).
};

/* ═══════════════════════════════════════════════════════════
   CATÁLOGO
   Las medidas salen de las fichas técnicas reales del cliente.
   ═══════════════════════════════════════════════════════════ */
export const CATEGORIAS = [
  // `portada` es el panel a pantalla completa que presenta la categoría antes
  // del catálogo (fotos elegidas por el cliente, una por una). `foco` es el
  // object-position del recorte: dónde está lo importante de esa foto.
  //
  // `focoInicio` y `zoom` alimentan el efecto de scroll (ver `initFotoFocus()`
  // en app.js, portado del sitio de Felipe): en móvil el encuadre VIAJA de
  // `focoInicio` (al entrar el panel) a `foco` (con el panel centrado), y el
  // zoom sube de 0 a `zoom` en ese mismo trayecto. `zoom` se sube donde la
  // pieza es pequeña dentro del cuadro.
  {
    slug: 'duchas', nombre: 'Duchas',
    descripcion: 'Columnas de ducha en cobre para exterior e interior.',
    portada: {
      base: '01b9503d-cdbd-4791-a529-48255ad63aaa',
      alt: 'Ducha de cobre en arco montada sobre muro de piedra, dentro de una ' +
           'caseta de guadua, junto a un jardinera con flores rojas y rosadas ' +
           'y piso de mosaico floral azul y ocre.',
      foco: '38% 66%',
      focoInicio: '38% 76%',
      zoom: 0.18,
    },
  },
  {
    slug: 'grifos', nombre: 'Grifos',
    descripcion: 'Grifería de muro y de cubierta.',
    portada: {
      base: 'grifo-de-muro-05-limpia',
      alt: 'Grifo de muro en cobre con caño curvo sobre un lavamanos ovalado de piedra.',
      foco: '50% 45%',
      focoInicio: '50% 33%',
      zoom: 0.16,
    },
  },
  {
    slug: 'toalleros', nombre: 'Toalleros',
    descripcion: 'Toalleros en tubo de cobre, de línea sobria.',
    // Portada cambiada (25-ago-2026, a pedido del cliente): la foto anterior
    // (acc378cd..., el toallero bajo la repisa de piedra) pasó al catálogo
    // completo del Toallero Tradicional. Esta es su foto principal.
    portada: {
      base: '2e12d1a1-7f30-4d30-af5e-b088e8653461',
      alt: 'Toallero de cobre con una toalla blanca colgada, montado sobre un ' +
           'muro de piedra travertino.',
      foco: '50% 46%',
      focoInicio: '50% 32%',
      zoom: 0.16,
    },
  },
  { slug: 'accesorios', nombre: 'Accesorios', descripcion: 'Complementos para completar el baño.' },
];

/**
 * El catálogo vive en `catalogo.js` y se importa desde allí directamente.
 *
 * No se reexporta aquí a propósito: `catalogo.js` necesita `PENDIENTE` de este
 * archivo, así que reexportarlo cerraría el ciclo y `PENDIENTE` quedaría sin
 * inicializar cuando `catalogo.js` la usa ("Cannot access before initialization").
 */
