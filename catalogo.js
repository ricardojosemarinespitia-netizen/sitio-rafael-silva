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
 * Diámetro de regadera, común a todas las duchas: 24 cm, sin variante ni
 * sobrecosto por tamaño (el de 29 cm se retiró del catálogo — 25-ago-2026,
 * a pedido del cliente).
 */
const REGADERA = {
  base: '24 cm',
};

export const PRODUCTOS = [
  /* ═══════════════════ DUCHAS ═══════════════════ */
  {
    slug: 'arco-colonial',
    nombre: 'Arco Colonial',
    categoria: 'duchas',
    destacado: true,
    resumen: 'Un arco de gran radio que lleva el agua al centro del espacio.',
    // Texto de Rafael (25-ago-2026), tal cual lo redactó.
    descripcion:
      'Una ducha de diseño sencillo y funcional, su forma de arco se adapta muy ' +
      'bien a baños, zonas de piscina y espacios al aire libre, especialmente en ' +
      'ambientes donde la piedra, la madera y la naturaleza hacen parte del entorno.',
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
    // 3 en la Sencilla (una columna), 4 en la Doble (dos columnas) — antes
    // las dos variantes compartían este dato como si fueran una sola pieza.
    incluye: '3 abrazaderas en cobre para sostener la regadera en la instalación',
    regadera: REGADERA,
    precio: PRECIO(850000),
  },

  {
    // Separado de Arco Colonial (25-ago-2026, a pedido del cliente): antes
    // vivían como dos variantes de precio de un mismo producto, pero son dos
    // piezas distintas — esta suma un segundo arco bajo con su propia
    // columna — y cada una tiene fotos propias de sobra para tener ficha
    // aparte. El precio ya estaba confirmado (era la variante "Doble, con
    // mezclador"): $950.000.
    slug: 'arco-colonial-doble',
    nombre: 'Arco Colonial Doble',
    categoria: 'duchas',
    destacado: true,
    resumen: 'El Arco Colonial con un segundo arco bajo y mezclador de dos llaves.',
    // Texto de Rafael (25-ago-2026), tal cual lo redactó.
    descripcion:
      'La calidad del cobre con la comodidad de elegir la temperatura del agua. ' +
      'Su mezclador para agua fría y caliente hace de esta ducha una opción ' +
      'cómoda y funcional, su diseño de arco le da presencia en espacios ' +
      'interiores y exteriores.',
    fotoPrincipal: img('arco-colonial-doble-01-exterior'),
    fotos: [
      img('arco-colonial-doble-01-exterior'),
      img('arco-colonial-doble-04-piedra'),
      img('arco-colonial-doble-05-vano'),
      // Con reserva: vira fuerte a naranja bajo la luz de esa toma.
      img('arco-colonial-doble-03-set'),
      // Las dos versiones lado a lado, para quien compara antes de encargar.
      {
        base: img('87b03756-100c-4850-87a2-c167d6010cba'),
        nota: 'A la izquierda, esta Doble con mezclador: dos columnas desde la ' +
          'base, con dos llaves. A la derecha, la Sencilla: una sola columna.',
      },
    ],
    // Mismas medidas que la Sencilla: es la misma columna con el segundo
    // arco sumado. Sin ficha propia que las contradiga, se asume igual.
    medidas: {
      'Altura total': '240 cm (aprox.)',
      'Altura a la salida de la regadera': '210 cm (aprox.)',
      'Diámetro de la regadera': '24 cm',
      'Diámetro de la tubería': '5/8"',
    },
    material: 'Cobre natural',
    valvula: 'Válvula Grival reguladora de agua, color cobre',
    incluye: '4 abrazaderas en cobre para sostener la regadera en la instalación',
    regadera: REGADERA,
    precio: PRECIO(950000),
  },

  {
    slug: 'tradicion-centenaria',
    nombre: 'Tradición Centenaria',
    categoria: 'duchas',
    destacado: true,
    resumen: 'Brazo en escuadra y regadera de ala ancha. La pieza insignia.',
    // Texto de Rafael (25-ago-2026), tal cual lo redactó. La aclaración de
    // que la manija se cobra aparte ya no va en el párrafo — la fila de
    // precio de abajo (PRECIO → extras) la muestra sola.
    descripcion:
      'Ducha de pared, de diseño compacto y funcional, ideal para espacios ' +
      'pequeños y reducidos, su instalación puede ser para agua fría o mezclador.',
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
    // Texto de Rafael (25-ago-2026), tal cual lo redactó.
    descripcion:
      'Su forma alta y curva permite una salida de agua cómoda y amplia, ideal ' +
      'para lavamanos de sobreponer (mesón). Combina un diseño sencillo y ' +
      'funcional, se entrega con el accesorio de instalación.',
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
        entera: true,
      },
    ],
    medidas: { 'Altura total': '38 cm', 'Alcance': '20 cm', 'Diámetro de la tubería': '5/8"' },
    montaje: 'Sobre mesa',
    material: 'Cobre natural',
    precio: PRECIO(350000),
  },

  {
    slug: 'grifo-de-muro',
    nombre: 'Grifo de Muro',
    categoria: 'grifos',
    destacado: true,
    resumen: 'Boca curva a 90°, estética de tubería soldada a la vista.',
    // Texto de Rafael (25-ago-2026), tal cual lo redactó.
    descripcion:
      'Una alternativa práctica y diferente para el lavamanos, su salida curva ' +
      'acerca el agua al centro del lavamanos. El cobre hace de este grifo una ' +
      'pieza llamativa para su baño.',
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
        entera: true,
      },
    ],
    medidas: { 'Alcance desde el muro': '26 cm', 'Diámetro de la tubería': '5/8"' },
    montaje: 'A muro',
    material: 'Cobre natural',
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
        entera: true,
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
    // Texto de Rafael (25-ago-2026), tal cual lo redactó.
    descripcion:
      'Este toallero es una pieza práctica y funcional para el baño. Su forma ' +
      'permite que el cobre sea protagonista.',
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
        // Ficha con cota impresa: el recorte a proporción cortaba la
        // barra. Se muestra ENTERA, sin recorte (mismo caso que Tradición
        // Centenaria más arriba).
        entera: true,
      },
    ],
    medidas: { 'Largo total': '41 cm' },
    montaje: 'A pared, dos bases circulares atornilladas',
    material: 'Cobre natural',
    precio: PRECIO(180000),
  },

  {
    slug: 'toallero-ovalado',
    nombre: 'Toallero Ovalado',
    categoria: 'toalleros',
    resumen: 'Aro de 24 × 17 cm colgado de una base cónica.',
    // Texto de Rafael (25-ago-2026), tal cual lo redactó.
    descripcion:
      'Su forma ovalada ofrece una manera práctica y diferente de colocar la ' +
      'toalla. Una pieza funcional que, por su diseño, se convierte en un punto ' +
      'llamativo en el baño.',
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
        entera: true,
      },
    ],
    medidas: { 'Ancho del aro': '24 cm', 'Alto del aro': '17 cm' },
    montaje: 'A pared',
    material: 'Cobre natural',
    precio: PRECIO(180000),
  },

  {
    slug: 'toallero-de-punto',
    nombre: 'Toallero de Punto',
    categoria: 'toalleros',
    resumen: 'Percha individual de 8 cm. Pensada para colgarse en grupo.',
    // Texto de Rafael (25-ago-2026), tal cual lo redactó.
    descripcion:
      'Diseñado para colocar la toalla cerca de la salida de la ducha. Su ' +
      'diseño compacto facilita su instalación, incluso en espacios reducidos.',
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
        entera: true,
      },
    ],
    medidas: { 'Saliente desde la pared': '8 cm' },
    montaje: 'A pared',
    material: 'Cobre natural',
    precio: PRECIO(100000),
  },

  /* ═══════════════════ ACCESORIOS ═══════════════════ */
  {
    slug: 'porta-papel',
    nombre: 'Porta Papel',
    categoria: 'accesorios',
    resumen: 'Brazo abierto: el rollo se cambia sin desmontar nada.',
    // Texto de Rafael (25-ago-2026), tal cual lo redactó (lo llamó
    // "Portarrollo" al dictarlo; el nombre del producto no se cambió).
    descripcion:
      'Su forma abierta facilita el cambio de rollo y permite mantener el ' +
      'papel siempre a su alcance. Una pieza sencilla que complementa muy ' +
      'bien los demás accesorios del baño.',
    // Recortado a 2 fotos (18-ago-2026), por pedido directo: la de producto
    // en fondo neutro y la ficha de medidas. fotoPrincipal pasa a la primera
    // que queda.
    fotoPrincipal: img('f41cbff2-6ed3-4f43-8457-65f5a9256261'),
    fotos: [
      img('f41cbff2-6ed3-4f43-8457-65f5a9256261'),
      // Imagen de ambiente generada con IA (25-ago-2026), a partir de la foto
      // de producto anterior: mismo encuadre y misma pieza, se le agregó un
      // rollo de papel higiénico para mostrarla en contexto de uso.
      img('a6e2f9c1-porta-papel-ia-rollo'),
      {
        base: img('8ecdf008-7b64-481b-be35-0cf9c3ee2cb9'),
        nota: 'Ficha técnica: la imagen trae las cotas (11 y 8 cm) impresas.',
        entera: true,
      },
    ],
    medidas: { 'Largo del brazo': '11 cm', 'Saliente desde la pared': '8 cm' },
    montaje: 'A pared',
    material: 'Cobre natural',
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
