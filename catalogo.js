/**
 * catalogo.js — las 10 piezas, con las medidas REALES de las fichas técnicas.
 *
 * ── DE DÓNDE SALE CADA DATO ────────────────────────────────────────────
 * · `fotos`    → del drive de Rafael, que YA viene organizado en una carpeta
 *                por producto: esa carpeta es la fuente de verdad de a qué
 *                pieza pertenece cada toma, no la intuición sobre la imagen.
 *                Los nombres `<slug>-NN-<qué es>` se asignaron al procesarlas
 *                porque el drive repite nombres entre carpetas (había cinco
 *                `PHOTO-2026-07-26-04-08-20.jpg` distintos) y `img/` es plana.
 *                El sufijo `-med` marca las que traen cotas o rótulos quemados
 *                en la imagen: van al final de `fotos` y con `nota`, para que
 *                no se lean como foto de galería.
 * · `medidas`  → transcritas de las fichas técnicas del cliente. Son las
 *                únicas cifras que existen. No se redondeó ni se completó nada.
 * · `precio`   → los que dio Rafael (agosto 2026). El Grifo de Arco sigue
 *                PENDIENTE: es el único que no ha puesto precio.
 * · `material`, `valvula`, `incluye` → PENDIENTE salvo en Arco Colonial.
 *                Ninguna ficha los declara: el cobre solo se infiere de la foto.
 *
 * ── LO QUE FALTA PREGUNTARLE A RAFAEL ──────────────────────────────────
 * Está listado en PENDIENTES.md. Lo crítico que queda: precio del Grifo de
 * Arco, material declarado, tipo de válvula, diámetro de tubería y qué
 * incluye cada kit.
 *
 * ── NOTA INTERNA · "Mezclador Grival $140.000" ─────────────────────────
 * En la lista de necesidades de Rafael aparece un "Mezclador Grival" a
 * $140.000 que HOY no corresponde a ninguna ficha ni a ninguna foto del
 * material. No se crea una entrada de catálogo con eso: no hay descripción,
 * medidas ni fotos que la sostengan, y tampoco consta que sea el mismo
 * mezclador de la versión doble del Arco Colonial (que ya está tarifada en
 * $950.000). Queda pendiente de definir con Rafael: ¿es una pieza suelta que
 * se vende aparte, o el sobrecosto de una variante?
 */

import { PENDIENTE } from './datos.js';

/** Ruta a la imagen optimizada. Los nombres son los UUID del material original. */
const img = (uuid) => uuid;

/**
 * Precio en pesos colombianos, siempre como número: el formateo ($850.000) lo
 * hace la vista, no el dato.
 *
 * · `valor`     — el precio que se muestra grande. Con variantes, el menor.
 * · `variantes` — versiones de la misma pieza con precio propio. No se
 *                 fusionan en una sola cifra: se listan las dos.
 * · `extras`    — sobrecostos opcionales sobre el precio base.
 */
const PRECIO = (valor, { variantes = null, extras = null } = {}) =>
  ({ valor, variantes, extras });

/**
 * Regla de diámetro de regadera, común a las duchas: 24 cm de serie, 29 cm con
 * sobrecosto. Solo existen esas dos referencias.
 */
const REGADERA = {
  base: '24 cm',
  opcion: { diametro: '29 cm', recargo: 150000 },
};

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
    // Galería recortada a 5 fotos (18-ago-2026): se quitaron las 8 restantes
    // del lote nuevo por pedido directo, sin más criterio que reducir volumen.
    // Se conservó la comparación lado a lado porque es la ÚNICA foto que
    // queda mostrando la versión Doble — sin ella el catálogo tendría precio
    // y ficha de la Doble pero cero fotos de esa variante.
    fotoPrincipal: img('arco-colonial-03-exterior'),
    fotos: [
      img('arco-colonial-03-exterior'),
      img('01b9503d-cdbd-4791-a529-48255ad63aaa'),
      img('63295635-580b-4133-b0a7-0c8194db9fc8'),
      {
        base: img('arco-colonial-05-bano-rustico'),
        nota: 'Instalación en baño interior. Esta unidad monta regadera cónica ' +
          'en vez de la plana de las demás fotos.',
      },
      // Las dos versiones lado a lado: para que no se confundan a simple vista,
      // el pie de foto dice cuál es cuál (derecha = sencilla, izquierda = doble).
      {
        base: img('87b03756-100c-4850-87a2-c167d6010cba'),
        nota: 'A la derecha, la Sencilla: una sola columna. A la izquierda, la ' +
          'Doble con mezclador: dos columnas desde la base, con dos llaves.',
      },
    ],
    // Estas medidas vienen de la ficha "DUCHA MEZCLADOR EN COBRE · MODELO ARCO".
    // Es la única ficha completa del material. Sigue sin confirmarse con
    // Rafael que "Modelo Arco" y "Arco Colonial" sean la misma pieza, pero
    // el aviso se retiró del sitio público a pedido del cliente — la duda
    // vive en PENDIENTES.md, no en la ficha.
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
    regadera: REGADERA,
    precio: PRECIO(850000, {
      variantes: [
        { nombre: 'Sencilla', valor: 850000 },
        { nombre: 'Doble, con mezclador', valor: 950000 },
      ],
    }),
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
      'con manija de palanca. El precio de $450.000 cubre solo el cuerpo y la ' +
      'regadera — por donde sale el agua —; la manija que abre y cierra el paso se ' +
      'cobra aparte, a $90.000 la unidad.',
    // Recortado (18-ago-2026): se quitaron 4 fotos por pedido directo,
    // incluida la que era fotoPrincipal — pasa a serlo la siguiente en orden.
    fotoPrincipal: img('tradicion-centenaria-09-detalle-regadera'),
    fotos: [
      img('tradicion-centenaria-09-detalle-regadera'),
      img('tradicion-centenaria-03-jardin'),
      img('b4dc22fb-a372-4fdc-8a2c-29470c4869bb'),
      // Entra con reserva: vira fuerte a naranja y falsea el color del cobre.
      // Si Rafael manda mejor toma de ese ambiente, se reemplaza.
      // Foto muy vertical (nicho angosto): sin `foco` el recorte 4/5 de la
      // ficha centraba la caída de agua y dejaba la regadera fuera arriba.
      // foco en 30% (no 50%, no 12%): con centrado se perdía la regadera
      // arriba; muy alto se perdían las manijas abajo. 30% muestra las dos.
      { base: img('tradicion-centenaria-06-nicho'), foco: '50% 30%' },
      {
        base: img('tradicion-centenaria-05-med'),
        nota: 'Ficha técnica: la imagen trae las cotas y el rótulo impresos.',
        // Ficha con cotas impresas: cualquier recorte corta una medida (el
        // `foco` de antes salvaba el "50 cm" pero cortaba la cota izquierda).
        // Se muestra ENTERA, sin recorte.
        entera: true,
      },
      {
        base: img('tradicion-centenaria-07-med-altura'),
        nota: 'Ficha de altura de instalación (2,20 m), con la cota impresa.',
        // Misma regla que la otra ficha: las cotas impresas no se recortan.
        entera: true,
      },
    ],
    medidas: { 'Proyección desde el muro': '50 cm', 'Diámetro de la tubería': '5/8"' },
    material: 'Cobre natural',
    caracteristicas: [
      'Brazo superior en ángulo recto',
      'Regadera cónica de ala ancha',
      'Manija de palanca en la base de la columna',
    ],
    regadera: REGADERA,
    precio: PRECIO(450000, {
      extras: [{ nombre: 'Manija (unidad, no incluida en el precio base)', valor: 90000 }],
    }),
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
    fotoPrincipal: img('cuello-de-cisne-04-agua'),
    fotos: [
      img('cuello-de-cisne-04-agua'),
      img('d7a7a3e9-2af1-473d-992b-901dad375d43'),
      img('27df146b-e0e9-42bd-930a-0c066e05ceca'),
      img('cuello-de-cisne-05-ambiente'),
      {
        base: img('cuello-de-cisne-03-med'),
        nota: 'Ficha técnica: la imagen trae las cotas (38 cm de alto, 20 cm de ' +
          'alcance) impresas.',
      },
    ],
    medidas: { 'Altura total': '38 cm', 'Alcance': '20 cm', 'Diámetro de la tubería': '5/8"' },
    montaje: 'Sobre cubierta, perforación única',
    material: 'Cobre natural',
    caracteristicas: [
      'Boca en arco alto tipo cuello de cisne',
      'Manija de palanca lateral',
      'Base acampanada tipo pedestal',
    ],
    precio: PRECIO(350000),
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
    // Se puso primera la foto del lavamanos completo (18-ago-2026, pedido
    // directo): antes encabezaba el detalle solo del grifo sobre pared negra.
    fotoPrincipal: img('df925cd9-98ed-48e3-8531-a0fda12efb40'),
    fotos: [
      img('df925cd9-98ed-48e3-8531-a0fda12efb40'),
      img('grifo-de-muro-05-limpia'),
      img('24dc10b1-2666-43f4-8507-5eca7bde46d8'),
      img('2dbc5343-fd4a-49cf-bed3-e50fb0689d3f'),
      {
        base: img('grifo-de-muro-04-med'),
        nota: 'Ficha técnica: la imagen trae la cota (26 cm) y el rótulo impresos.',
      },
    ],
    medidas: { 'Alcance desde el muro': '26 cm', 'Diámetro de la tubería': '5/8"' },
    montaje: 'A muro, con roseta circular',
    material: 'Cobre natural',
    caracteristicas: [
      'Boca curva a 90° con salida vertical',
      'Llave de palanca cilíndrica',
      'Roseta de muro circular',
    ],
    precio: PRECIO(300000),
  },

  /* ── Grifo de Arco: retirado temporalmente del sitio (18-ago-2026) ──────
   * Pedido directo. Nada cambió sobre el fondo: seguía sin precio (era el
   * único PENDIENTE de los 10) y con el `porConfirmar` sobre si el de una
   * llave y el de mezclador son una referencia o dos. Para reactivarlo,
   * quitar el comentario del bloque y su entrada volvería en su posición.
   *
  {
    slug: 'grifo-de-arco',
    nombre: 'Grifo de Arco',
    categoria: 'grifos',
    resumen: 'Conjunto de dos piezas: boca en arco y llave independiente.',
    descripcion:
      'Grifo de muro en dos piezas separadas: la boca en arco y la llave de palanca, ' +
      'montadas de forma independiente sobre la pared.',
    fotoPrincipal: img('grifo-de-arco-03-limpia'),
    fotos: [
      img('grifo-de-arco-03-limpia'),
      img('copia-de-c3a1b802-d40a-4109-9314-98cec7ba633e'),
      img('f5738268-363d-494d-bcdf-c86710bc5cd4'),
      {
        base: img('grifo-de-arco-02-med'),
        nota: 'Ficha técnica: la imagen trae la cota (26 cm) y el rótulo impresos.',
      },
      // ── Variante con mezclador (boca + DOS llaves) ──
      // Rafael la guarda en la misma carpeta que el de una llave, pero es otra
      // pieza: tres cuerpos en vez de dos. Hasta que confirme si se vende como
      // referencia aparte y a qué precio, va aquí anotada como variante.
      {
        base: img('grifo-de-arco-mezclador-02-producto'),
        nota: 'Variante con mezclador: boca en arco y DOS llaves independientes. ' +
          'Pendiente confirmar con Rafael si se vende como referencia aparte.',
      },
      { base: img('grifo-de-arco-mezclador-03-agua'), nota: 'Variante con mezclador, dos llaves.' },
      {
        base: img('grifo-de-arco-mezclador-01-rotulo'),
        nota: 'Variante con mezclador. La imagen trae el rótulo impreso.',
      },
    ],
    porConfirmar:
      'Los 26 cm van de la punta de la boca al eje de la roseta de la llave ' +
      '(ancho total del conjunto), NO es alcance desde el muro. Confirmar antes de publicar. ' +
      'Además: la carpeta del drive mezcla el grifo de UNA llave con el de DOS ' +
      '(con mezclador). Definir si son una sola referencia o dos.',
    medidas: { 'Ancho total del conjunto': '26 cm' },
    montaje: 'A muro, dos piezas independientes',
    material: 'Cobre natural',
    caracteristicas: ['Boca en arco', 'Llave de palanca independiente'],
    // El único que Rafael no ha tarifado. No se deduce del resto de la lista.
    precio: PENDIENTE('precio de venta'),
  },
  */

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
    // Pedido directo (20-ago-2026): pasa a encabezar la foto de la barra
    // sola con la toalla, en vez de la del grupo de piezas.
    fotoPrincipal: img('2e12d1a1-7f30-4d30-af5e-b088e8653461'),
    fotos: [
      img('2e12d1a1-7f30-4d30-af5e-b088e8653461'),
      img('toallero-tradicional-03-grupo'),
      img('d4254363-e3d1-42c4-ae1f-e5c85009c7b6'),
      {
        base: img('toallero-tradicional-04-med'),
        nota: 'Ficha técnica: la imagen trae la cota (41 cm) impresa.',
      },
    ],
    medidas: { 'Largo total': '41 cm (de borde a borde de las bases)' },
    montaje: 'A pared, dos bases circulares atornilladas',
    material: 'Cobre natural',
    caracteristicas: [
      'Dos bases circulares con moldura concéntrica',
      'Barra con leve curvatura en los extremos',
    ],
    precio: PRECIO(180000),
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
    // Pedido directo (20-ago-2026): pasa a encabezar la foto del aro con
    // la toalla, en vez del bodegón general.
    fotoPrincipal: img('3cad3780-6bc7-49e1-8008-eb4611c5ae24'),
    fotos: [
      img('3cad3780-6bc7-49e1-8008-eb4611c5ae24'),
      img('toallero-ovalado-04-bodegon'),
      img('33b39bd5-1c87-4605-9fd2-90fe2d28bf78'),
      {
        base: img('toallero-ovalado-03-med'),
        nota: 'Ficha técnica: la imagen trae las cotas (24 × 17 cm) impresas.',
      },
    ],
    medidas: { 'Ancho del aro': '24 cm', 'Alto del aro': '17 cm' },
    montaje: 'A pared, base cónica torneada',
    material: 'Cobre natural',
    caracteristicas: ['Manguitos de unión visibles', 'Base cónica torneada'],
    precio: PRECIO(180000),
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
    // Pedido directo (20-ago-2026): pasa a encabezar el detalle de una
    // sola percha, en vez del bodegón en grupo.
    fotoPrincipal: img('16ce2158-2ed1-41a2-b241-8010383be0e2'),
    fotos: [
      img('16ce2158-2ed1-41a2-b241-8010383be0e2'),
      // La percha suelta se lee pequeña y sin escala; en grupo se entiende de
      // una, que es justo como la vende Rafael ("se ve mejor en fila de dos o tres").
      img('toallero-de-punto-04-bodegon'),
      img('659ac747-d6ab-4f29-aa2a-aa3e3de3f97b'),
      {
        base: img('toallero-de-punto-03-med'),
        nota: 'Ficha técnica: la imagen trae la cota (8 cm) impresa.',
      },
    ],
    medidas: { 'Saliente desde la pared': '8 cm' },
    montaje: 'A pared, base circular atornillada',
    material: 'Cobre natural',
    caracteristicas: ['Codo de 90° con remate en tapón', 'Dos argollas bajo la base'],
    precio: PRECIO(100000),
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
    // Recortado a 2 fotos (18-ago-2026), por pedido directo: la de producto
    // en fondo neutro y la ficha de medidas. fotoPrincipal pasa a la primera
    // que queda.
    fotoPrincipal: img('f41cbff2-6ed3-4f43-8457-65f5a9256261'),
    fotos: [
      img('f41cbff2-6ed3-4f43-8457-65f5a9256261'),
      {
        base: img('8ecdf008-7b64-481b-be35-0cf9c3ee2cb9'),
        nota: 'Ficha técnica: la imagen trae las cotas (11 y 8 cm) impresas.',
      },
    ],
    medidas: { 'Largo del brazo': '11 cm', 'Saliente desde la pared': '8 cm' },
    montaje: 'A pared, base circular atornillada',
    material: 'Cobre natural',
    caracteristicas: [
      'Extremo abierto con tope vertical',
      'Dos manguitos de unión a la vista',
    ],
    precio: PRECIO(150000),
  },
];

/**
 * Fotos de ambiente para el héroe.
 * De la carpeta CONTEXTO: instalaciones reales, no fichas técnicas.
 * Solo se listan las que tienen archivo optimizado en img/.
 *
 * OJO al cambiar la primera: `lluvia.js` anima el agua saliendo del borde de
 * la regadera y tiene esas coordenadas medidas sobre `hero-ducha`. Si entra
 * otra foto de héroe hay que volver a medirlas allá, o el agua caerá del aire.
 */
export const AMBIENTES = [
  img('hero-ducha'),
  img('0052143a-7adb-44c8-8e77-d9858a229ab5'),
];
