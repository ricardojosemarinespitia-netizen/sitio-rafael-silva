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
 * real entre comillas. Ejemplo:
 *
 *     telefono: PENDIENTE("número de WhatsApp"),
 *     telefono: "+57 300 123 4567",
 *
 * Para ocultar una sección entera mientras no haya información, pon su
 * `visible: false`.
 */

/** Marca un dato que aún no se tiene. El sitio lo resalta en vez de mentir. */
export const PENDIENTE = (que) => ({ __pendiente: true, que });

export const esPendiente = (v) => v && typeof v === 'object' && v.__pendiente === true;

/* ═══════════════════════════════════════════════════════════
   NEGOCIO
   ═══════════════════════════════════════════════════════════ */
export const NEGOCIO = {
  nombre: PENDIENTE('nombre comercial exacto (¿"Rafael Silva"? ¿otra marca?)'),
  lema: 'Hecho para durar. Creado para distinguir.',   // tomado de la ficha técnica
  descripcion: PENDIENTE('1 párrafo: qué hace el taller, desde cuándo, qué lo distingue'),

  // — Contacto —
  whatsapp: PENDIENTE('número de WhatsApp con indicativo, ej: 573001234567'),
  telefono: PENDIENTE('teléfono fijo o celular de contacto'),
  email: PENDIENTE('correo del comercio'),
  ciudad: PENDIENTE('ciudad y departamento'),
  direccion: PENDIENTE('dirección del taller o punto de exhibición'),

  // — Redes —
  instagram: PENDIENTE('URL del perfil de Instagram'),
  facebook: PENDIENTE('URL del perfil de Facebook'),
  mostrarRedes: false,   // ponlo en true cuando confirmen que quieren mostrarlas

  // — Dominio —
  dominio: PENDIENTE('dominio definitivo (¿ya lo tienen o hay que comprarlo?)'),
};

/* ═══════════════════════════════════════════════════════════
   PERSONA A CARGO
   ═══════════════════════════════════════════════════════════ */
export const ARTESANO = {
  visible: false,   // → true cuando llegue la información
  nombre: PENDIENTE('nombre de la persona encargada'),
  rol: PENDIENTE('cargo / rol (ej. maestro artesano, fundador)'),
  aniosOficio: PENDIENTE('años de experiencia en el oficio'),
  bio: PENDIENTE('2-3 párrafos: cómo empezó, qué lo mueve, qué domina'),
  foto: PENDIENTE('foto del artesano (idealmente trabajando)'),
};

/* ═══════════════════════════════════════════════════════════
   HISTORIA DE DURABILIDAD
   El argumento de venta más fuerte del producto: cobre a la
   intemperie que envejece sin degradarse.
   ═══════════════════════════════════════════════════════════ */
export const DURABILIDAD = {
  visible: false,
  titulo: 'A la intemperie, el cobre no se rinde: madura.',
  relato: PENDIENTE('la historia real: qué duchas llevan cuántos años instaladas afuera, en qué clima, cómo se ven hoy'),
  aniosPrueba: PENDIENTE('¿cuántos años lleva la instalación más antigua?'),
  fotoAntes: PENDIENTE('foto de una pieza recién instalada'),
  fotoDespues: PENDIENTE('foto de esa misma pieza (o similar) años después, con pátina'),
};

/* ═══════════════════════════════════════════════════════════
   TALLER Y PROCESO
   ═══════════════════════════════════════════════════════════ */
export const TALLER = {
  visible: false,
  titulo: 'Cada pieza se dobla, suelda y pule a mano.',
  descripcion: PENDIENTE('cómo es el proceso de fabricación, paso a paso'),
  fotos: PENDIENTE('fotos del taller y del proceso (doblado, soldadura, pulido)'),
  puntoFisico: {
    existe: PENDIENTE('¿tienen punto físico de exhibición? sí/no'),
    direccion: PENDIENTE('dirección del showroom'),
    horario: PENDIENTE('horario de atención'),
    fotos: PENDIENTE('fotos del local'),
  },
};

/* ═══════════════════════════════════════════════════════════
   ENVÍOS
   ═══════════════════════════════════════════════════════════ */
export const ENVIOS = {
  visible: false,
  cobertura: PENDIENTE('¿a qué ciudades/zonas envían?'),
  tiempo: PENDIENTE('tiempo de entrega estimado por zona'),
  gestion: PENDIENTE('¿transportadora propia, tercerizada, recogida en taller?'),
  costoTipo: PENDIENTE('¿costo fijo o variable? Si varía: ¿por distancia, cantidad o valor?'),
  tarifas: PENDIENTE('tabla de tarifas si existe'),
  envioGratisDesde: PENDIENTE('¿hay monto de envío gratis? ¿desde cuánto?'),
};

/* ═══════════════════════════════════════════════════════════
   PAGOS Y POLÍTICAS
   ═══════════════════════════════════════════════════════════ */
export const PAGOS = {
  pasarela: PENDIENTE('¿tienen pasarela registrada? (Wompi, PayU, Mercado Pago…)'),
  metodos: PENDIENTE('métodos que manejan hoy: transferencia, contraentrega, etc.'),
  // Mientras no haya pasarela, el sitio cierra la venta por WhatsApp.
  modoVenta: 'whatsapp',   // 'whatsapp' | 'pasarela'
};

export const POLITICAS = {
  visible: false,
  cambiosDevoluciones: PENDIENTE('política de cambios y devoluciones: plazos, condiciones, quién paga el envío'),
  garantia: PENDIENTE('garantía de las piezas'),
  envios: PENDIENTE('política de envíos: responsabilidad por daño o pérdida'),
  datos: PENDIENTE('tratamiento de datos personales'),
};

/* ═══════════════════════════════════════════════════════════
   CATÁLOGO
   Las medidas salen de las fichas técnicas reales del cliente.
   Los precios están PENDIENTES: no se inventa ninguno.
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
