/**
 * galeria.js — el archivo de fotos del taller.
 *
 * Son las fotos que Rafael fue mandando y que no ilustran una ficha de
 * producto: ambientes ya instalados, detalle de piezas, el taller por dentro
 * y las láminas con cotas. Viven aparte del catálogo a propósito — el
 * catálogo vende, esto muestra el oficio — y se pintan en `galeria.html`.
 *
 * Cada entrada es { base, ratio, alt }: `base` es el
 * nombre del archivo sin ancho ni formato (el sitio sirve 4 anchos × 3
 * formatos de cada una), `ratio` es su proporción REAL — la rejilla es de
 * mampostería y respeta el alto de cada foto, así que sin la proporción
 * exacta la página daría un salto al terminar de cargar cada imagen — y
 * `alt` describe la foto para quien no la ve.
 *
 * Lo que NO entró (a propósito): capturas de pantalla de WhatsApp, empaques
 * de repuestos de proveedor y las tarjetas de marca con el teléfono impreso
 * — el teléfono ya vive en Contacto y no tiene por qué repetirse aquí.
 */

export const GRUPOS_GALERIA = [
  { slug: 'ambiente', nombre: 'Instaladas', bajada: 'Piezas viviendo en su sitio: patios, baños, jardines.' },
  { slug: 'pieza', nombre: 'Las piezas', bajada: 'Detalle de lo que sale del taller, pieza por pieza.' },
  { slug: 'taller', nombre: 'El taller', bajada: 'Cómo se hace: el cobre antes de llegar al muro.' },
  { slug: 'ficha', nombre: 'Medidas y láminas', bajada: 'Las cotas y las láminas del taller, para comparar antes de encargar.' },
];

export const GALERIA = [
  // ── ambiente (21) ──
  { base: 'g-ambiente-01', grupo: 'ambiente', ratio: '0.664 / 1', alt: 'Dos salidas de agua en cobre instaladas sobre una pared gris de textura estriada.' },
  { base: 'g-ambiente-02', grupo: 'ambiente', ratio: '0.685 / 1', alt: 'Tres ganchos de cobre en un muro de ladrillo, con una toalla blanca colgada.' },
  { base: 'g-ambiente-03', grupo: 'ambiente', ratio: '0.695 / 1', alt: 'Ducha de cobre instalada en un baño de teja negra, con las manijas a media altura.' },
  { base: 'g-ambiente-04', grupo: 'ambiente', ratio: '0.662 / 1', alt: 'Lavamanos de piedra con grifo de muro en cobre, sobre pared de ladrillo.' },
  { base: 'g-ambiente-05', grupo: 'ambiente', ratio: '0.533 / 1', alt: 'Ducha de cobre en un patio exterior, sobre muro de piedra bajo la teja.' },
  { base: 'g-ambiente-06', grupo: 'ambiente', ratio: '0.667 / 1', alt: 'Lavamanos de piedra con grifo alto de cobre y el agua cayendo.' },
  { base: 'g-ambiente-07', grupo: 'ambiente', ratio: '0.768 / 1', alt: 'Baño claro con lavamanos de piedra y grifería de cobre en el muro.' },
  { base: 'g-ambiente-08', grupo: 'ambiente', ratio: '0.750 / 1', alt: 'Ducha de cobre en un nicho de piedra, con la ventana abierta a la montaña.' },
  { base: 'g-ambiente-09', grupo: 'ambiente', ratio: '0.667 / 1', alt: 'Ducha de cobre contra un muro de piedra, a cielo abierto.' },
  { base: 'g-ambiente-10', grupo: 'ambiente', ratio: '0.714 / 1', alt: 'Ducha de cobre abierta, con el agua cayendo sobre piedra y plantas.' },
  { base: 'g-ambiente-11', grupo: 'ambiente', ratio: '0.563 / 1', alt: 'Ducha de cobre en una esquina de piedra, junto a macetas de barro.' },
  { base: 'g-ambiente-12', grupo: 'ambiente', ratio: '0.546 / 1', alt: 'Ducha de cobre junto a un espejo alargado, sobre muro de piedra.' },
  { base: 'g-ambiente-13', grupo: 'ambiente', ratio: '0.729 / 1', alt: 'Ducha de cobre de noche, sobre un muro rematado en teja de barro.' },
  { base: 'g-ambiente-14', grupo: 'ambiente', ratio: '1.778 / 1', alt: 'Ducha de cobre en un patio con jardinera iluminada.' },
  { base: 'g-ambiente-15', grupo: 'ambiente', ratio: '0.667 / 1', alt: 'Ducha de cobre contra un muro de piedra, bajo el alero de teja, con jardín al lado.' },
  { base: 'g-ambiente-16', grupo: 'ambiente', ratio: '0.911 / 1', alt: 'Ducha de cobre sobre una piscina de piedra rodeada de flores.' },
  { base: 'g-ambiente-17', grupo: 'ambiente', ratio: '0.604 / 1', alt: 'Ducha de cobre con el agua abierta, contra un muro de troncos.' },
  { base: 'g-ambiente-18', grupo: 'ambiente', ratio: '0.750 / 1', alt: 'Ducha de cobre en un jardín tropical, con el agua cayendo.' },
  { base: 'g-ambiente-19', grupo: 'ambiente', ratio: '1.432 / 1', alt: 'Doble lavamanos de piedra con dos grifos de muro en cobre.' },
  { base: 'g-ambiente-20', grupo: 'ambiente', ratio: '0.574 / 1', alt: 'Ducha de cobre en un muro de piedra, con jardín y piso de canto rodado.' },
  { base: 'g-ambiente-21', grupo: 'ambiente', ratio: '0.750 / 1', alt: 'Baño con lavamanos de piedra, toallero de cobre y piso de mosaico.' },
  // ── pieza (33) ──
  { base: 'g-pieza-01', grupo: 'pieza', ratio: '0.671 / 1', alt: 'Porta papel de cobre montado en un muro de piedra, con el rollo puesto.' },
  { base: 'g-pieza-02', grupo: 'pieza', ratio: '1.466 / 1', alt: 'Manijas de cobre y una llave de paso agrupadas sobre fondo negro.' },
  { base: 'g-pieza-03', grupo: 'pieza', ratio: '0.750 / 1', alt: 'Salida de muro en T, de tubo de cobre, sobre un tablón de madera oscura.' },
  { base: 'g-pieza-04', grupo: 'pieza', ratio: '1.137 / 1', alt: 'Dos salidas de muro en cobre montadas sobre un panel negro estriado.' },
  { base: 'g-pieza-05', grupo: 'pieza', ratio: '0.666 / 1', alt: 'Abrazaderas de cobre para sujetar tubería, agrupadas sobre fondo negro.' },
  { base: 'g-pieza-06', grupo: 'pieza', ratio: '1.236 / 1', alt: 'Escudos de cobre apilados en pirámide sobre fondo negro.' },
  { base: 'g-pieza-07', grupo: 'pieza', ratio: '0.748 / 1', alt: 'Detalle del vástago estriado y el cuerpo de una válvula en cobre y bronce.' },
  { base: 'g-pieza-08', grupo: 'pieza', ratio: '1.439 / 1', alt: 'Cartuchos cerámicos de agua fría y caliente junto a dos tees de bronce, sobre madera.' },
  { base: 'g-pieza-09', grupo: 'pieza', ratio: '0.750 / 1', alt: 'Salida de muro en T sobre un tablón de madera envejecida.' },
  { base: 'g-pieza-10', grupo: 'pieza', ratio: '1.440 / 1', alt: 'Cuerpo mezclador de dos llaves, en bronce y cobre, visto de frente.' },
  { base: 'g-pieza-11', grupo: 'pieza', ratio: '0.750 / 1', alt: 'Vástago de bronce de una válvula, de pie sobre fondo oscuro.' },
  { base: 'g-pieza-12', grupo: 'pieza', ratio: '0.703 / 1', alt: 'Dos cartuchos cerámicos, de fría y caliente, sobre madera oscura.' },
  { base: 'g-pieza-13', grupo: 'pieza', ratio: '0.750 / 1', alt: 'Tee de bronce roscada, vista de frente sobre fondo oscuro.' },
  { base: 'g-pieza-14', grupo: 'pieza', ratio: '0.750 / 1', alt: 'Tee de bronce con la marca Grival grabada.' },
  { base: 'g-pieza-15', grupo: 'pieza', ratio: '0.769 / 1', alt: 'Salida de muro en cobre montada sobre un panel negro de relieve geométrico.' },
  { base: 'g-pieza-16', grupo: 'pieza', ratio: '0.628 / 1', alt: 'Desagüe de lavamanos en cobre, con su tapa y el cuerpo desarmados.' },
  { base: 'g-pieza-17', grupo: 'pieza', ratio: '0.787 / 1', alt: 'Tubo de cobre con abrazaderas soldadas a lo largo.' },
  { base: 'g-pieza-18', grupo: 'pieza', ratio: '0.754 / 1', alt: 'Dos vástagos de válvula sobre un tablón de madera envejecida.' },
  { base: 'g-pieza-19', grupo: 'pieza', ratio: '1.333 / 1', alt: 'Cuatro abrazaderas de cobre alineadas sobre fondo oscuro.' },
  { base: 'g-pieza-20', grupo: 'pieza', ratio: '1.333 / 1', alt: 'Dos salidas de muro en cobre, en T y en codo, sobre madera envejecida.' },
  { base: 'g-pieza-21', grupo: 'pieza', ratio: '0.750 / 1', alt: 'Dos tees de bronce Grival, una sobre otra.' },
  { base: 'g-pieza-22', grupo: 'pieza', ratio: '1.221 / 1', alt: 'Manija de cobre con su escudo, sobre fondo negro.' },
  { base: 'g-pieza-23', grupo: 'pieza', ratio: '0.750 / 1', alt: 'Detalle macro del vástago estriado de una válvula.' },
  { base: 'g-pieza-24', grupo: 'pieza', ratio: '1.333 / 1', alt: 'Tres abrazaderas de cobre alineadas sobre fondo negro.' },
  { base: 'g-pieza-25', grupo: 'pieza', ratio: '0.879 / 1', alt: 'Cuerpos de válvula y cartuchos de agua fría y caliente sobre madera oscura.' },
  { base: 'g-pieza-26', grupo: 'pieza', ratio: '0.750 / 1', alt: 'Grifo de línea industrial en cobre y tubo blanco, montado sobre pared oscura.' },
  { base: 'g-pieza-27', grupo: 'pieza', ratio: '0.750 / 1', alt: 'Codo con escudo de cobre junto al vástago y el buje desarmados.' },
  { base: 'g-pieza-28', grupo: 'pieza', ratio: '0.701 / 1', alt: 'Grifo de cuello curvo en cobre montado sobre una pared oscura.' },
  { base: 'g-pieza-29', grupo: 'pieza', ratio: '0.667 / 1', alt: 'Tornillo y buje plásticos del kit de montaje, sobre madera oscura.' },
  { base: 'g-pieza-30', grupo: 'pieza', ratio: '1.333 / 1', alt: 'Grifo de cuello curvo desarmado, con sus escudos y el empaque de repuesto.' },
  { base: 'g-pieza-31', grupo: 'pieza', ratio: '0.885 / 1', alt: 'Grifería de línea industrial en cobre y tubo blanco sobre piso de mosaico.' },
  { base: 'g-pieza-32', grupo: 'pieza', ratio: '1.439 / 1', alt: 'Toallero de aros en cobre y un doble lavamanos con grifería de muro.' },
  { base: 'g-pieza-33', grupo: 'pieza', ratio: '1.333 / 1', alt: 'Tornillo y buje del kit de montaje, sobre fondo oscuro.' },
  // ── taller (14) ──
  { base: 'g-taller-01', grupo: 'taller', ratio: '0.667 / 1', alt: 'Dos hileras de codos de cobre terminados, dispuestos en abanico sobre una mesa de madera.' },
  { base: 'g-taller-02', grupo: 'taller', ratio: '0.466 / 1', alt: 'Rafael Silva trabajando una pieza de cobre en su mesa de taller, frente a un muro de ladrillo.' },
  { base: 'g-taller-03', grupo: 'taller', ratio: '1.330 / 1', alt: 'Brazos de ducha con regadera cónica, recién terminados, sobre el banco del taller.' },
  { base: 'g-taller-04', grupo: 'taller', ratio: '0.556 / 1', alt: 'Aplicación del acabado con pistola sobre un brazo de cobre sujeto en el soporte.' },
  { base: 'g-taller-05', grupo: 'taller', ratio: '0.800 / 1', alt: 'Tubos de cobre cortados y escudos empacados, listos para armar.' },
  { base: 'g-taller-06', grupo: 'taller', ratio: '1.336 / 1', alt: 'Decenas de regaderas de cobre, cónicas y de martillado circular, en la mesa de producción.' },
  { base: 'g-taller-07', grupo: 'taller', ratio: '0.490 / 1', alt: 'Exhibidor del taller con duchas, grifos y accesorios de cobre colgados.' },
  { base: 'g-taller-08', grupo: 'taller', ratio: '0.575 / 1', alt: 'Pistola de pintura aplicando el acabado a un brazo curvo de cobre.' },
  { base: 'g-taller-09', grupo: 'taller', ratio: '0.568 / 1', alt: 'Brazos de ducha alineados en el banco de trabajo durante el armado.' },
  { base: 'g-taller-10', grupo: 'taller', ratio: '1.778 / 1', alt: 'Regaderas terminadas y escudos apilados: dos vistas de la producción.' },
  { base: 'g-taller-11', grupo: 'taller', ratio: '0.800 / 1', alt: 'Regaderas planas y brazos curvos de cobre agrupados durante la producción.' },
  { base: 'g-taller-12', grupo: 'taller', ratio: '1.439 / 1', alt: 'Regaderas cónicas y de martillado circular sobre la mesa del taller.' },
  { base: 'g-taller-13', grupo: 'taller', ratio: '0.765 / 1', alt: 'Cinco brazos curvos de cobre alineados, listos para montar la regadera.' },
  { base: 'g-taller-14', grupo: 'taller', ratio: '1.446 / 1', alt: 'Varias duchas de cobre exhibidas sobre paneles de madera.' },
  // ── ficha (16) ──
  { base: 'g-ficha-01', grupo: 'ficha', ratio: '0.666 / 1', alt: 'Dos manijas de cobre en codo, rotuladas a mano: manijas para regular el paso de agua.' },
  { base: 'g-ficha-02', grupo: 'ficha', ratio: '0.667 / 1', alt: 'Dos manijas instaladas en un muro beige, rotuladas: manijas para regular el paso de agua.' },
  { base: 'g-ficha-03', grupo: 'ficha', ratio: '1.080 / 1', alt: 'Lámina del Toallero de Punto con la cota de 8 cm de saliente.' },
  { base: 'g-ficha-04', grupo: 'ficha', ratio: '1.500 / 1', alt: 'Lámina del modelo Arco Colonial: el arco de cobre completo sobre fondo oscuro.' },
  { base: 'g-ficha-05', grupo: 'ficha', ratio: '0.667 / 1', alt: 'Lámina de marca: duchas y accesorios en cobre para baños, hechos a mano.' },
  { base: 'g-ficha-06', grupo: 'ficha', ratio: '0.749 / 1', alt: 'Vástago y manija de cobre con las partes señaladas: vástago estriado y manija.' },
  { base: 'g-ficha-07', grupo: 'ficha', ratio: '1.453 / 1', alt: 'Medición entre centros de un mezclador de dos llaves, sobre papel milimetrado.' },
  { base: 'g-ficha-08', grupo: 'ficha', ratio: '0.665 / 1', alt: 'Lámina de diámetros de regadera: 29 cm y 24 cm, una sobre otra.' },
  { base: 'g-ficha-09', grupo: 'ficha', ratio: '0.750 / 1', alt: 'Codo de cobre con el tornillo de ajuste señalado en la placa.' },
  { base: 'g-ficha-10', grupo: 'ficha', ratio: '0.667 / 1', alt: 'Manija de cobre para el paso de agua, con el tornillo de ajuste señalado.' },
  { base: 'g-ficha-11', grupo: 'ficha', ratio: '1.500 / 1', alt: 'Cuerpo mezclador de cobre medido con cinta métrica.' },
  { base: 'g-ficha-12', grupo: 'ficha', ratio: '1.032 / 1', alt: 'Distancia de 25 cm entre las dos salidas de agua de un lavamanos.' },
  { base: 'g-ficha-13', grupo: 'ficha', ratio: '1.435 / 1', alt: 'Lámina del modelo Camino Real con la cota de 50 cm de proyección.' },
  { base: 'g-ficha-14', grupo: 'ficha', ratio: '0.811 / 1', alt: 'Lámina de la ducha sencilla para piscina, con el agua abierta.' },
  { base: 'g-ficha-15', grupo: 'ficha', ratio: '0.846 / 1', alt: 'Comparación de las dos versiones: ducha con mezclador y ducha sencilla.' },
  { base: 'g-ficha-16', grupo: 'ficha', ratio: '0.665 / 1', alt: 'Grifo de muro en cobre con el agua abierta y la cota de 26 cm de alcance.' },
];
