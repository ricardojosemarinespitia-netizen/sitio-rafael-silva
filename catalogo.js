/**
 * catalogo.js — las 10 piezas, con las medidas REALES de las fichas técnicas.
 *
 * ── DE DÓNDE SALE CADA DATO ────────────────────────────────────────────
 * · `medidas`  → transcritas de las fichas técnicas del cliente. Son las
 *                únicas cifras que existen. No se redondeó ni se completó nada.
 * · `precio`   → PENDIENTE en las 10. No hay ni un precio en el material.
 * · `material`, `valvula`, `incluye` → PENDIENTE salvo en Arco Colonial.
 *                Ninguna ficha los declara: el cobre solo se infiere de la foto.
 *
 * ── LO QUE FALTA PREGUNTARLE A RAFAEL ──────────────────────────────────
 * Está listado en PENDIENTES.md. Lo crítico: precios, material declarado,
 * tipo de válvula, diámetro de tubería y qué incluye cada kit.
 */

import { PENDIENTE } from './datos.js';

/** Ruta a la imagen optimizada. Los nombres son los UUID del material original. */
const img = (uuid) => uuid;

export const PRODUCTOS = [
  /* ═══════════════════ DUCHAS ═══════════════════ */
  {
    slug: 'arco-colonial',
    nombre: 'Arco Colonial',
    categoria: 'duchas',
    destacado: true,
    resumen: 'Un arco de gran radio que lleva el agua al centro del espacio.',
    descripcion:
      'Columna en tubo de cobre que sube desde el piso y remata en un arco amplio, ' +
      'tipo báculo, del que cuelga la regadera. Va sujeta al muro con abrazaderas y ' +
      'lleva llave de paso sobre la columna. En la versión con mezclador suma un ' +
      'segundo arco bajo, en U invertida, con dos llaves independientes.',
    fotoPrincipal: img('01b9503d-cdbd-4791-a529-48255ad63aaa'),
    fotos: [
      img('01b9503d-cdbd-4791-a529-48255ad63aaa'),
      img('020fd13c-1ca9-4799-bb22-ccce6932b6d8'),
      img('632aabba-371f-4a34-9261-0e25a6368d4a'),
      img('63295635-580b-4133-b0a7-0c8194db9fc8'),
      img('72272e7e-5670-4433-b7b3-288dbc6f8f30'),
      img('87b03756-100c-4850-87a2-c167d6010cba'),
    ],
    // Estas medidas vienen de la ficha "DUCHA MEZCLADOR EN COBRE · MODELO ARCO".
    // Es la única ficha completa del material. Falta confirmar con Rafael que
    // "Modelo Arco" y "Arco Colonial" son la misma pieza.
    porConfirmar: 'Confirmar que la ficha "Modelo Arco" corresponde a esta pieza',
    medidas: {
      'Altura total': '240 cm (aprox.)',
      'Altura a la salida de la regadera': '210 cm (aprox.)',
      'Diámetro de la regadera': '24 cm',
      'Diámetro de la tubería': '5/8"',
    },
    material: 'Cobre natural',
    valvula: 'Válvula Grival reguladora de agua, color cobre',
    incluye: '4 abrazaderas en cobre para sostener la regadera en la instalación',
    caracteristicas: [
      'Fabricación artesanal',
      'Diseño exclusivo',
      'Apta para uso en exteriores e interiores',
      'Resistente a la intemperie',
      'Acabado natural en cobre que envejece con el tiempo',
    ],
    precio: PENDIENTE('precio de venta'),
  },

  {
    slug: 'camino-real',
    nombre: 'Camino Real',
    categoria: 'duchas',
    destacado: true,
    resumen: 'Brazo en cuello de cisne y regadera cónica, de línea limpia.',
    descripcion:
      'Ducha de pared con brazo curvo en cuello de cisne que sostiene una regadera ' +
      'cónica lisa, con las boquillas ocultas bajo el ala. El brazo se une a una ' +
      'columna vertical pegada al muro, con llave de paso lateral.',
    fotoPrincipal: img('b522a0d6-9d53-4733-be85-48c1388c75ca'),
    fotos: [
      img('b522a0d6-9d53-4733-be85-48c1388c75ca'),
      img('41763037-e53e-455a-b1f8-e55c4339bb60'),
    ],
    medidas: {},   // ninguna ficha cota este modelo
    material: PENDIENTE('material declarado'),
    valvula: PENDIENTE('tipo de válvula'),
    incluye: PENDIENTE('qué incluye el kit'),
    caracteristicas: [
      'Brazo curvo en cuello de cisne',
      'Regadera cónica lisa tipo campana',
      'Columna a muro con llave de paso lateral',
    ],
    precio: PENDIENTE('precio de venta'),
  },

  {
    slug: 'tradicion-centenaria',
    nombre: 'Tradición Centenaria',
    categoria: 'duchas',
    destacado: true,
    resumen: 'Brazo en escuadra y regadera de ala ancha. La pieza insignia.',
    descripcion:
      'Columna con brazo superior en ángulo recto que proyecta la regadera hacia ' +
      'adelante. La regadera es un cono ancho de perfil bajo con las boquillas a la ' +
      'vista. La columna lleva un collarín a media altura y, abajo, cuerpo de válvula ' +
      'con manija de palanca.',
    fotoPrincipal: img('9df2e8c8-1518-44a6-a2a2-bbb965bb0076'),
    fotos: [
      img('9df2e8c8-1518-44a6-a2a2-bbb965bb0076'),
      img('591c83f4-a968-4924-a1da-155af2652a21'),
      img('0eecdb9d-157d-4afb-b64e-3038bb9c761d'),
      img('b4dc22fb-a372-4fdc-8a2c-29470c4869bb'),
      img('bd8725be-b680-417e-9a28-41281e37a4b8'),
      img('91eb6ba5-238d-47b2-b43c-625834949ad7'),
    ],
    porConfirmar:
      'La ficha cota 50 cm sobre una variante de PARED con regadera plana; ' +
      'las fotos muestran columna con regadera cónica. ¿Son dos variantes del mismo modelo?',
    medidas: { 'Proyección desde el muro': '50 cm' },
    material: PENDIENTE('material declarado'),
    valvula: PENDIENTE('tipo de válvula'),
    incluye: PENDIENTE('qué incluye el kit'),
    caracteristicas: [
      'Brazo superior en ángulo recto',
      'Regadera cónica de ala ancha',
      'Manija de palanca en la base de la columna',
    ],
    precio: PENDIENTE('precio de venta'),
  },

  /* ═══════════════════ GRIFOS ═══════════════════ */
  {
    slug: 'cuello-de-cisne',
    nombre: 'Grifo Cuello de Cisne',
    categoria: 'grifos',
    destacado: true,
    resumen: 'Arco alto sobre cubierta, con manija de palanca.',
    descripcion:
      'Grifo alto de cuerpo vertical recto y boca en arco cerrado con salida hacia ' +
      'abajo. Monomando de palanca cilíndrica montada al costado, sobre cuerpo con ' +
      'anillos torneados y base acampanada que apoya en la cubierta.',
    fotoPrincipal: img('d7a7a3e9-2af1-473d-992b-901dad375d43'),
    fotos: [
      img('d7a7a3e9-2af1-473d-992b-901dad375d43'),
      img('27df146b-e0e9-42bd-930a-0c066e05ceca'),
    ],
    medidas: { 'Altura total': '38 cm', 'Alcance': '20 cm' },
    montaje: 'Sobre cubierta, perforación única',
    material: PENDIENTE('material declarado'),
    valvula: PENDIENTE('tipo de válvula'),
    incluye: PENDIENTE('qué incluye el kit'),
    caracteristicas: [
      'Boca en arco alto tipo cuello de cisne',
      'Manija de palanca lateral',
      'Base acampanada tipo pedestal',
    ],
    precio: PENDIENTE('precio de venta'),
  },

  {
    slug: 'grifo-de-muro',
    nombre: 'Grifo de Muro',
    categoria: 'grifos',
    destacado: true,
    resumen: 'Boca curva a 90°, estética de tubería soldada a la vista.',
    descripcion:
      'Grifo de pared con roseta circular, cuerpo horizontal de anillos torneados y ' +
      'boca que baja en curva de 90°. La llave es una palanca cilíndrica en codo. ' +
      'Uniones soldadas a la vista, de estética de fontanería artesanal.',
    fotoPrincipal: img('24dc10b1-2666-43f4-8507-5eca7bde46d8'),
    fotos: [
      img('24dc10b1-2666-43f4-8507-5eca7bde46d8'),
      img('0052143a-7adb-44c8-8e77-d9858a229ab5'),
      img('2dbc5343-fd4a-49cf-bed3-e50fb0689d3f'),
      img('df925cd9-98ed-48e3-8531-a0fda12efb40'),
    ],
    medidas: { 'Alcance desde el muro': '26 cm' },
    montaje: 'A muro, con roseta circular',
    material: PENDIENTE('material declarado'),
    valvula: PENDIENTE('tipo de válvula'),
    incluye: PENDIENTE('qué incluye el kit'),
    caracteristicas: [
      'Boca curva a 90° con salida vertical',
      'Llave de palanca cilíndrica',
      'Roseta de muro circular',
    ],
    precio: PENDIENTE('precio de venta'),
  },

  {
    slug: 'grifo-de-arco',
    nombre: 'Grifo de Arco',
    categoria: 'grifos',
    // Sin fotos de producto: hay 3 fichas con medidas pero ninguna imagen usable.
    sinFotos: true,
    resumen: 'Conjunto de dos piezas: boca en arco y llave independiente.',
    descripcion:
      'Grifo de muro en dos piezas separadas: la boca en arco y la llave de palanca, ' +
      'montadas de forma independiente sobre la pared.',
    fotoPrincipal: null,
    fotos: [],
    porConfirmar:
      'Los 26 cm van de la punta de la boca al eje de la roseta de la llave ' +
      '(ancho total del conjunto), NO es alcance desde el muro. Confirmar antes de publicar.',
    medidas: { 'Ancho total del conjunto': '26 cm' },
    montaje: 'A muro, dos piezas independientes',
    material: PENDIENTE('material declarado'),
    valvula: PENDIENTE('tipo de válvula'),
    incluye: PENDIENTE('qué incluye el kit'),
    caracteristicas: ['Boca en arco', 'Llave de palanca independiente'],
    precio: PENDIENTE('precio de venta'),
    faltaFoto: PENDIENTE('fotos de producto de este modelo — hay medidas pero ninguna imagen'),
  },

  /* ═══════════════════ TOALLEROS ═══════════════════ */
  {
    slug: 'toallero-tradicional',
    nombre: 'Toallero Tradicional',
    categoria: 'toalleros',
    resumen: 'Barra de 41 cm sobre dos bases con moldura.',
    descripcion:
      'Barra horizontal de tubo de cobre sostenida por dos bases circulares con ' +
      'moldura concéntrica. La barra desciende en leve curva desde cada base y corre ' +
      'recta en el centro.',
    fotoPrincipal: img('acc378cd-9b6c-4e69-aea7-ef20033b4ba4'),
    fotos: [
      img('acc378cd-9b6c-4e69-aea7-ef20033b4ba4'),
      img('2e12d1a1-7f30-4d30-af5e-b088e8653461'),
      img('d4254363-e3d1-42c4-ae1f-e5c85009c7b6'),
    ],
    medidas: { 'Largo total': '41 cm (de borde a borde de las bases)' },
    montaje: 'A pared, dos bases circulares atornilladas',
    material: PENDIENTE('material declarado'),
    incluye: PENDIENTE('¿incluye tornillería?'),
    caracteristicas: [
      'Dos bases circulares con moldura concéntrica',
      'Barra con leve curvatura en los extremos',
    ],
    precio: PENDIENTE('precio de venta'),
  },

  {
    slug: 'toallero-ovalado',
    nombre: 'Toallero Ovalado',
    categoria: 'toalleros',
    resumen: 'Aro de 24 × 17 cm colgado de una base cónica.',
    descripcion:
      'Aro ovalado de tubo de cobre de sección gruesa, colgado de una base cónica ' +
      'torneada fijada a la pared. Los manguitos de unión quedan a la vista y delatan ' +
      'el ensamble artesanal.',
    fotoPrincipal: img('3cad3780-6bc7-49e1-8008-eb4611c5ae24'),
    fotos: [
      img('3cad3780-6bc7-49e1-8008-eb4611c5ae24'),
      img('33b39bd5-1c87-4605-9fd2-90fe2d28bf78'),
    ],
    medidas: { 'Ancho del aro': '24 cm', 'Alto del aro': '17 cm' },
    montaje: 'A pared, base cónica torneada',
    material: PENDIENTE('material declarado'),
    incluye: PENDIENTE('¿incluye tornillería?'),
    caracteristicas: ['Manguitos de unión visibles', 'Base cónica torneada'],
    precio: PENDIENTE('precio de venta'),
  },

  {
    slug: 'toallero-de-punto',
    nombre: 'Toallero de Punto',
    categoria: 'toalleros',
    resumen: 'Percha individual de 8 cm. Pensada para colgarse en grupo.',
    descripcion:
      'Percha de tubo de cobre con base circular acampanada, tramo recto corto y ' +
      'codo de 90° que sube en vertical, rematado en tapón cilíndrico. Se ve mejor ' +
      'instalada en fila de dos o tres.',
    fotoPrincipal: img('659ac747-d6ab-4f29-aa2a-aa3e3de3f97b'),
    fotos: [
      img('659ac747-d6ab-4f29-aa2a-aa3e3de3f97b'),
      img('16ce2158-2ed1-41a2-b241-8010383be0e2'),
    ],
    medidas: { 'Saliente desde la pared': '8 cm' },
    montaje: 'A pared, base circular atornillada',
    material: PENDIENTE('material declarado'),
    incluye: PENDIENTE('¿incluye tornillería?'),
    caracteristicas: ['Codo de 90° con remate en tapón', 'Dos argollas bajo la base'],
    precio: PENDIENTE('precio de venta'),
  },

  /* ═══════════════════ ACCESORIOS ═══════════════════ */
  {
    slug: 'porta-papel',
    nombre: 'Porta Papel',
    categoria: 'accesorios',
    resumen: 'Brazo abierto: el rollo se cambia sin desmontar nada.',
    descripcion:
      'Brazo en L de tubo de cobre con base circular, tramo horizontal con manguitos ' +
      'de unión y codo final que sube en un tope corto rematado en tapón. Al ser ' +
      'abierto por un extremo, el rollo entra y sale sin herramientas.',
    fotoPrincipal: img('f41cbff2-6ed3-4f43-8457-65f5a9256261'),
    fotos: [img('f41cbff2-6ed3-4f43-8457-65f5a9256261')],
    medidas: { 'Largo del brazo': '11 cm', 'Saliente desde la pared': '8 cm' },
    montaje: 'A pared, base circular atornillada',
    material: PENDIENTE('material declarado'),
    incluye: PENDIENTE('¿incluye tornillería?'),
    caracteristicas: [
      'Extremo abierto con tope vertical',
      'Dos manguitos de unión a la vista',
    ],
    precio: PENDIENTE('precio de venta'),
  },
];

/**
 * Fotos de ambiente para el héroe y las secciones.
 * De la carpeta CONTEXTO: instalaciones reales, no fichas.
 */
export const AMBIENTES = [
  img('0052143a-7adb-44c8-8e77-d9858a229ab5'),
  img('01eaf8b2-a3d2-48a3-a215-868f5aa13f6b'),
  img('2c52ee67-0d64-4a9e-8f74-5e9c5c6dd754'),
  img('4479acca-55aa-4a14-a8b8-fdb447f17244'),
];
