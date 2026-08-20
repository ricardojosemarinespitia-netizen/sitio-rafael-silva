/**
 * app.js — arma la portada desde `datos.js` y `catalogo.js`.
 *
 * El HTML no lleva ni un dato ni una ruta de foto escrita a mano: todo se
 * genera aquí. Cambiar el catálogo es editar datos, no maquetado.
 * Las utilidades de pintado que también usa la ficha viven en `vista.js`.
 */

import {
  NEGOCIO, ARTESANO, DURABILIDAD, ENVIOS, PAGOS, POLITICAS, CATEGORIAS,
  COBRE, esPendiente,
} from './datos.js';
import { PRODUCTOS, AMBIENTES } from './catalogo.js';
import {
  $, $$, esc, aviso, valor, fila, picture, precioBreve, notaPrecioTarjeta,
  ctaWhatsapp, pintarWspFlotante, activarNav, pintarNegocio,
} from './vista.js';

/* ── Iconos que se dibujan solos ─────────────────────────────────────────
   Misma firma que exige el sistema de trazado (técnica de Vegas del Verde):
   viewBox de 24, sin relleno, trazo heredado, y CADA forma con
   `pathLength="1"` para que todas terminen de dibujarse a la vez. Las marcas
   que no son trazo continuo van con `data-traza="detalle"` y se posan al
   final. El CSS que los anima vive en estilo.css; el disparador, abajo en
   `activarTraza()`. */
const RASGOS = 'fill="none" stroke="currentColor" stroke-width="1.5" ' +
  'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

const ICONOS_COMPRA = {
  envios: `<svg class="icono-traza" viewBox="0 0 24 24" ${RASGOS}>
    <path pathLength="1" d="M2.2 6.8h11.6v9H2.2Z"/>
    <path pathLength="1" d="M13.8 9.8h4.1l2.9 3.4v2.6h-7"/>
    <circle pathLength="1" cx="6.4" cy="17.6" r="1.7"/>
    <circle pathLength="1" cx="17.2" cy="17.6" r="1.7"/>
    <path pathLength="1" data-traza="detalle" d="M5 9.9h4.4"/>
  </svg>`,
  pagos: `<svg class="icono-traza" viewBox="0 0 24 24" ${RASGOS}>
    <rect pathLength="1" x="2.4" y="6.4" width="14.6" height="9.6" rx="1.8"/>
    <circle pathLength="1" cx="9.7" cy="11.2" r="2.5"/>
    <circle pathLength="1" cx="18.2" cy="16.4" r="3.3"/>
    <path pathLength="1" data-traza="detalle" d="M18.2 14.9v3"/>
  </svg>`,
  politicas: `<svg class="icono-traza" viewBox="0 0 24 24" ${RASGOS}>
    <path pathLength="1" d="M12 3.2 19.4 6v5.4c0 4.6-2.9 7.8-7.4 9.4-4.5-1.6-7.4-4.8-7.4-9.4V6Z"/>
    <path pathLength="1" d="m8.7 12 2.3 2.4 4.5-4.8"/>
  </svg>`,
};

/* Marcas de transportadoras y medios de pago, como glifos de trazo propio en
   el mismo lenguaje cobre del sitio — el mismo criterio del ícono de
   WhatsApp: se evoca la marca, no se pega su logo a color. Si Rafael pide
   los logos oficiales, se reemplazan aquí sin tocar nada más. */
const MARCAS = {
  servientrega: `<svg class="icono-traza" viewBox="0 0 24 24" ${RASGOS}>
    <path pathLength="1" d="M14.8 5.7 A3.56 3.56 0 1 0 12.25 11.75 A3.94 3.94 0 1 1 9.5 18.5"/>
    <path pathLength="1" data-traza="detalle" d="M15.9 16.9l2.6-1.1-.4 2.8"/>
  </svg>`,
  interrapidisimo: `<svg class="icono-traza" viewBox="0 0 24 24" ${RASGOS}>
    <path pathLength="1" d="M14.3 9.8 12.2 19.6"/>
    <path pathLength="1" d="M5.4 12.4h4.2"/>
    <path pathLength="1" d="M4.2 15.4h4.2"/>
    <path pathLength="1" d="M5.8 18.4h3.4"/>
    <circle pathLength="1" data-traza="detalle" cx="15.2" cy="5.9" r="0.8"/>
  </svg>`,
  bancolombia: `<svg class="icono-traza" viewBox="0 0 24 24" ${RASGOS}>
    <path pathLength="1" d="M6 9.6 17.8 7"/>
    <path pathLength="1" d="M6 13.8 18.4 11.9"/>
    <path pathLength="1" d="M6 18 16.6 16.6"/>
  </svg>`,
  nequi: `<svg class="icono-traza" viewBox="0 0 24 24" ${RASGOS}>
    <path pathLength="1" d="M7.9 19.5v-7.2a4.1 4.1 0 0 1 8.2 0v7.2"/>
    <circle pathLength="1" data-traza="detalle" cx="17.8" cy="6.4" r="0.8"/>
  </svg>`,
};

const ICONOS_CANAL = {
  whatsapp: `<svg class="icono-traza" viewBox="0 0 24 24" ${RASGOS}>
    <path pathLength="1" d="M12 3.6a8.4 8.4 0 1 1-4.2 15.7l-4.2 1.1 1.1-4A8.4 8.4 0 0 1 12 3.6Z"/>
    <path pathLength="1" d="M8.9 8.8c-.5 1.6.2 3.4 1.6 4.7 1.3 1.4 3.1 2.1 4.7 1.6.5-.2.8-.7.6-1.2l-.4-1c-.2-.4-.6-.6-1-.4l-1 .3a5.6 5.6 0 0 1-2.2-2.2l.3-1c.2-.4 0-.8-.4-1l-1-.4c-.5-.2-1 .1-1.2.6Z"/>
  </svg>`,
  correo: `<svg class="icono-traza" viewBox="0 0 24 24" ${RASGOS}>
    <rect pathLength="1" x="3" y="5.6" width="18" height="12.8" rx="2"/>
    <path pathLength="1" d="m3.6 7.2 8.4 5.9 8.4-5.9"/>
  </svg>`,
  instagram: `<svg class="icono-traza" viewBox="0 0 24 24" ${RASGOS}>
    <rect pathLength="1" x="3.6" y="3.6" width="16.8" height="16.8" rx="4.8"/>
    <circle pathLength="1" cx="12" cy="12" r="4.1"/>
    <circle pathLength="1" data-traza="detalle" cx="17.1" cy="6.9" r="0.7"/>
  </svg>`,
  origen: `<svg class="icono-traza" viewBox="0 0 24 24" ${RASGOS}>
    <path pathLength="1" d="M12 21c4.6-4.5 7-7.9 7-11.1a7 7 0 1 0-14 0C5 13.1 7.4 16.5 12 21Z"/>
    <circle pathLength="1" cx="12" cy="9.7" r="2.6"/>
  </svg>`,
};

/* ── Portadas de colección ───────────────────────────────────────────────
   Un panel a pantalla casi completa por categoría, con la foto que eligió
   el cliente. El panel entero es un enlace a su categoría del catálogo. */
function pintarPortadas() {
  const cont = $('#colecciones');
  if (!cont) return;

  cont.innerHTML = CATEGORIAS.filter((c) => c.portada).map((c, i) => `
    <a class="portada" href="#${c.slug}" style="--foco:${c.portada.foco ?? '50% 50%'}"
       aria-label="Ver la colección de ${esc(c.nombre.toLowerCase())}">
      ${picture(c.portada.base, c.portada.alt, {
        ratio: '2 / 3', sizes: '100vw', prioridad: i === 0,
      })}
      <div class="portada__contenido">
        <p class="portada__etiqueta" data-revelar>Colección</p>
        <h2 class="portada__nombre" data-revelar style="--retardo:90ms">${esc(c.nombre)}</h2>
        <p class="portada__bajada" data-revelar style="--retardo:180ms">${esc(c.descripcion)}</p>
        <span class="boton boton--fantasma" data-revelar style="--retardo:260ms">Descubrir</span>
      </div>
    </a>`).join('');
}

/* ── Catálogo ────────────────────────────────────────────────────────── */
function pintarCatalogo() {
  const cont = $('#catalogo');
  if (!cont) return;

  cont.innerHTML = CATEGORIAS.map((cat) => {
    const piezas = PRODUCTOS.filter((p) => p.categoria === cat.slug);
    if (!piezas.length) return '';

    const tarjetas = piezas.map((p, i) => {
      const medida = Object.entries(p.medidas ?? {})[0];
      return `
        <a class="pieza" href="producto.html?id=${p.slug}" data-revelar style="--retardo:${i * 70}ms">
          ${picture(p.fotoPrincipal, `${p.nombre} en cobre`, { clase: 'pieza__foto' })}
          <div class="pieza__cuerpo">
            <h3 class="pieza__nombre">${esc(p.nombre)}</h3>
            <p class="pieza__medida">${medida ? esc(`${medida[0]}: ${medida[1]}`) : ''}</p>
            ${precioBreve(p.precio)}
            ${notaPrecioTarjeta(p)}
          </div>
        </a>`;
    }).join('');

    return `
      <section class="categoria" id="${cat.slug}">
        <header class="categoria__cabecera">
          <div>
            <h2 class="categoria__nombre">${esc(cat.nombre)}</h2>
            <p class="pieza__medida">${esc(cat.descripcion)}</p>
          </div>
          <span class="categoria__conteo">${piezas.length} ${piezas.length === 1 ? 'pieza' : 'piezas'}</span>
        </header>
        <div class="rejilla">${tarjetas}</div>
      </section>`;
  }).join('');
}

/* ── Secciones de contenido ──────────────────────────────────────────── */

/** El recuadro que ocupa el lugar de una sección todavía sin información. */
function seccionFaltante(titulo, faltantes) {
  return `
    <div class="contenedor">
      <div class="seccion--pendiente" data-revelar>
        <h2 class="seccion__titulo" style="font-size:var(--paso-2)">${esc(titulo)}</h2>
        <p class="seccion__bajada">Esta sección aparecerá cuando llegue la información. Falta:</p>
        <ul class="lista-simple">
          ${faltantes.map((v) => `<li>${aviso(v)}</li>`).join('')}
        </ul>
      </div>
    </div>`;
}

function pintarDurabilidad() {
  const nodo = $('#durabilidad');
  if (!nodo) return;

  const faltan = [DURABILIDAD.relato, DURABILIDAD.aniosPrueba].filter(esPendiente);
  if (!DURABILIDAD.visible || faltan.length) {
    nodo.innerHTML = seccionFaltante(DURABILIDAD.titulo, faltan);
    return;
  }

  const f = DURABILIDAD.foto;
  nodo.innerHTML = `
    <div class="contenedor">
      <div class="durabilidad">
        <figure class="durabilidad__figura" data-revelar>
          ${picture(f.base, f.alt, {
            ratio: '3 / 4',
            sizes: '(max-width: 900px) calc(100vw - 48px), min(32rem, 44vw)',
          })}
          <figcaption class="pie-foto">${esc(f.pie)}</figcaption>
        </figure>

        <div class="durabilidad__texto" data-revelar>
          <p class="seccion__etiqueta">La prueba</p>
          <h2 class="seccion__titulo">${esc(DURABILIDAD.titulo)}</h2>
          <p class="cifra">
            <span class="cifra__numero">${esc(DURABILIDAD.aniosPrueba)}</span>
            <span class="cifra__unidad">años a la intemperie</span>
          </p>
          <p class="seccion__bajada">${esc(DURABILIDAD.relato)}</p>
        </div>
      </div>
    </div>`;
}

function pintarArtesano() {
  const nodo = $('#artesano');
  if (!nodo) return;

  const faltan = [ARTESANO.nombre, ARTESANO.rol, ARTESANO.aniosOficio, ARTESANO.bio]
    .filter(esPendiente);
  if (!ARTESANO.visible || faltan.length) {
    nodo.innerHTML = seccionFaltante('Quién está detrás', faltan);
    return;
  }

  // El texto a máquina (ARTESANO.bio) se dejó de mostrar a pedido directo:
  // la nota manuscrita ya cuenta la misma historia, con su propia voz.
  const nota = (ARTESANO.notaManuscrita ?? []).map((t) => `<p>${esc(t)}</p>`).join('');

  // El retrato primero y los satélites después: el orden del DOM es el orden
  // de pintado, y las fotos pequeñas deben posarse SOBRE los bordes del
  // retrato, no debajo. El vuelo lo dispara `activarEscena()`.
  //
  // El `__cuerpo` de adentro no es decoración: son DOS movimientos distintos
  // sobre el mismo satélite y una sola caja no puede con los dos. La figura
  // lleva el vuelo de entrada (una transición de `transform`) y el cuerpo
  // lleva la órbita perpetua (una animación de `transform`); si compartieran
  // elemento, la animación le ganaría a la transición y las fotos aparecerían
  // ya puestas, sin volar. Separados, las transformaciones se componen.
  const satelites = (ARTESANO.satelites ?? []).map((s, i) => `
    <figure class="satelite satelite--${i + 1}">
      <span class="satelite__cuerpo">
        ${picture(s.base, s.alt, { ratio: '3 / 4', sizes: '(max-width: 900px) 34vw, 12rem' })}
      </span>
    </figure>`).join('');

  // Las tres etapas de la pátina, capas del fondo del bloque del cobre.
  // Decorativas: alt vacío y ocultas al lector de pantalla.
  const patinas = (COBRE.patinas ?? []).map((base) => `
    <img src="img/${base}-1080.jpg"
         srcset="img/${base}-720.jpg 720w, img/${base}-1080.jpg 1080w, img/${base}-1440.jpg 1440w"
         sizes="(max-width: 900px) 100vw, 76rem"
         alt="" loading="lazy" decoding="async">`).join('');

  nodo.innerHTML = `
    <div class="contenedor">
      <div class="artesano">
        <div class="artesano__escena" data-revelar>
          <figure class="artesano__retrato">
            ${picture(ARTESANO.foto.base, ARTESANO.foto.alt, {
              ratio: '3 / 4',
              sizes: '(max-width: 900px) 72vw, 24rem',
            })}
          </figure>
          ${satelites}
        </div>
        <div class="artesano__lado">
          <div class="artesano__ficha" data-revelar>
            <p class="seccion__etiqueta">Quién está detrás</p>
            <h2 class="artesano__nombre">${esc(ARTESANO.nombre)}</h2>
            <p class="artesano__rol">${esc(ARTESANO.rol)}</p>
            <p class="cifra cifra--menor">
              <span class="cifra__numero">${esc(ARTESANO.aniosOficio)}</span>
              <span class="cifra__unidad">años de oficio</span>
            </p>
          </div>
          ${nota ? `
          <div class="manuscrita" data-revelar>
            <p class="seccion__etiqueta">De su puño y letra</p>
            ${nota}
          </div>` : ''}
        </div>
      </div>

      <aside class="cobre" data-revelar>
        <div class="cobre__patinas" aria-hidden="true">${patinas}</div>
        <p class="seccion__etiqueta">El material</p>
        <h3 class="cobre__titulo">${esc(COBRE.titulo)}</h3>
        <div class="cobre__relato">
          ${COBRE.relato.map((t) => `<p>${esc(t)}</p>`).join('')}
        </div>
      </aside>
    </div>`;
}

function pintarCompra() {
  const nodo = $('#compra');
  if (!nodo) return;

  // Los ids viven en los bloques, no en la sección: el pie enlaza a #envios y
  // a #politicas por separado y esos anclajes no se pueden perder.
  // La cuarta pieza de cada bloque son las marcas con las que se trabaja
  // (transportadoras, medios de pago): glifos sutiles de trazo, con nombre.
  const bloques = [
    ['envios', 'Envíos', [
      ['Cobertura', ENVIOS.cobertura],
      ['Tiempo', ENVIOS.tiempo],
      ['Transportadora', ENVIOS.gestion],
    ], [
      ['Servientrega', MARCAS.servientrega],
      ['Interrapidísimo', MARCAS.interrapidisimo],
    ]],
    ['pagos', 'Pagos', [
      ['Forma de pago', PAGOS.metodos],
    ], [
      ['Bancolombia', MARCAS.bancolombia],
      ['Nequi', MARCAS.nequi],
    ]],
    ['politicas', 'Políticas', [
      ['Cuidado de la pieza', POLITICAS.cuidado],
      ['Piezas defectuosas', POLITICAS.defectos],
    ], null],
  ].map(([id, titulo, filas, marcas], i) => `
    <div class="bloque" id="${id}" data-revelar style="--retardo:${i * 90}ms">
      <div class="bloque__icono">${ICONOS_COMPRA[id] ?? ''}</div>
      <h3 class="bloque__titulo">${esc(titulo)}</h3>
      <dl class="lista-datos">${filas.map(([k, v]) => fila(k, v)).join('')}</dl>
      ${marcas ? `
      <div class="bloque__marcas">
        ${marcas.map(([nombre, glifo]) => `
          <span class="marca">${glifo}<span>${esc(nombre)}</span></span>`).join('')}
      </div>` : ''}
    </div>`).join('');

  nodo.innerHTML = `
    <div class="contenedor">
      <p class="seccion__etiqueta" data-revelar>Cómo se compra</p>
      <h2 class="seccion__titulo" data-revelar>Encargo, pago y envío</h2>
      <p class="seccion__bajada" data-revelar>
        Todo se fabrica por pedido: no hay inventario en bodega ni punto de
        exhibición. La venta se cierra por WhatsApp.
      </p>
      <div class="bloques">${bloques}</div>
    </div>`;
}

/* ── Contacto y pie ──────────────────────────────────────────────────── */
function pintarContacto() {
  const bloque = $('#bloque-contacto');
  if (bloque) {
    // Solo canales reales, cada uno con su ícono dibujado a mano. El número
    // se agrupa como se dicta en voz alta: +57 321 348 5046.
    const numero = String(NEGOCIO.whatsapp).replace(/\D/g, '');
    const bonito = `+${numero.slice(0, 2)} ${numero.slice(2, 5)} ` +
                   `${numero.slice(5, 8)} ${numero.slice(8)}`;

    const canal = (icono, tipo, dato, href) => `
      ${href ? `<a class="canal" href="${href}">` : '<div class="canal">'}
        <span class="canal__icono">${icono}</span>
        <span class="canal__texto">
          <span class="canal__tipo">${esc(tipo)}</span>
          <span class="canal__dato">${esc(dato)}</span>
        </span>
      ${href ? '</a>' : '</div>'}`;

    bloque.innerHTML = `
      <div class="contacto">
        <div class="canales">
          ${canal(ICONOS_CANAL.whatsapp, 'WhatsApp', bonito, `https://wa.me/${numero}`)}
          ${canal(ICONOS_CANAL.correo, 'Correo', NEGOCIO.email, `mailto:${NEGOCIO.email}`)}
          ${NEGOCIO.mostrarRedes && !esPendiente(NEGOCIO.instagram)
            ? canal(ICONOS_CANAL.instagram, 'Instagram', NEGOCIO.instagram,
                `https://www.instagram.com/${String(NEGOCIO.instagram).replace(/^@/, '')}`)
            : ''}
          ${canal(ICONOS_CANAL.origen, 'Se fabrica en', NEGOCIO.origen, null)}
        </div>
        <div class="contacto__accion">
          ${ctaWhatsapp('Pedir por WhatsApp')}
        </div>
      </div>`;
  }

  const pie = $('#pie-contacto');
  if (pie) {
    pie.innerHTML = `
      <li><a href="#contacto">Escríbenos</a></li>
      <li><a href="#compra">Envíos y pagos</a></li>`;
  }

  pintarNegocio();
}

/* ── Héroe ───────────────────────────────────────────────────────────── */
function pintarHeroe() {
  const fondo = $('#heroe-fondo');
  if (!fondo || !AMBIENTES.length) return;

  // El héroe sí ocupa toda la pantalla de verdad: aquí 100vw es correcto.
  fondo.innerHTML = picture(AMBIENTES[0], 'Ducha de cobre Arco Colonial instalada a la intemperie', {
    prioridad: true, ratio: '16 / 9', sizes: '100vw',
  });

  // El agua animada se monta sobre la foto, no en su lugar. Se espera a que
  // la imagen esté decodificada porque la animación necesita su proporción
  // real para alinear las gotas con la regadera; y si el módulo falla o el
  // navegador no lo soporta, el héroe se queda con la foto y ya.
  const img = fondo.querySelector('img');
  if (!img) return;
  const listo = img.complete ? Promise.resolve() : img.decode().catch(() => {});
  listo.then(() => import('./lluvia.js'))
    .then((m) => m?.montarLluvia(fondo, img))
    .catch(() => {});
}

/* ── Revelado al entrar en pantalla ──────────────────────────────────── */
function activarRevelado() {
  const objetivos = $$('[data-revelar]');
  if (!objetivos.length) return;

  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (const el of objetivos) el.classList.add('visible');
    return;
  }

  const io = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('visible');
      io.unobserve(e.target);   // una vez revelado, deja de observarse
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  for (const el of objetivos) io.observe(el);
}

/* ── Iconos que se dibujan al llegar a su sección ────────────────────────
   Portado de Vegas del Verde. El observador vigila la SECCIÓN, no cada
   ícono: al entrar esa parte, todos sus trazos arrancan a la vez. Y no se
   desobserva: al salir se rearma de golpe (transición apagada, reflow
   forzado) para que la próxima entrada dibuje desde cero, idéntica. */
function activarTraza() {
  const cajas = new Set();
  for (const svg of $$('.icono-traza')) {
    const caja = svg.closest('section, footer, header');
    if (caja) cajas.add(caja);
  }
  if (!cajas.size) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)) {
    for (const caja of cajas) caja.classList.add('traza-lista');
    return;
  }

  // Dos observadores y no uno: dibujar y rearmar necesitan bordes DISTINTOS.
  // Con un solo borde, en el celular la barra de URL que aparece y desaparece
  // cambia la altura del viewport a cada scroll, el límite salta de sitio y
  // la sección cruza de un lado a otro sin moverse: los íconos se resetean y
  // redibujan a mitad de lectura (la falla reportada en "Cómo se compra").
  // Separados y con 80px de holgura, el rearme solo pasa bien fuera de vista.
  const ioEntrada = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (e.isIntersecting) e.target.classList.add('traza-lista');
    }
  }, { threshold: 0, rootMargin: '0px 0px -15% 0px' });

  const ioSalida = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      const caja = e.target;
      if (e.isIntersecting || !caja.classList.contains('traza-lista')) continue;
      caja.classList.add('rearmando');
      caja.classList.remove('traza-lista');
      void caja.offsetHeight;   // reflow: aplica el estado inicial sin animar
      caja.classList.remove('rearmando');
    }
  }, { threshold: 0, rootMargin: '80px 0px 80px 0px' });

  for (const caja of cajas) { ioEntrada.observe(caja); ioSalida.observe(caja); }
}

/* ── El vuelo de los satélites de la escena del artesano ─────────────────
   Mismo contrato que la traza: se dispara al entrar, se rearma al salir
   para poder repetirse, y con movimiento reducido aparece ya resuelto. */
function activarEscena() {
  const escena = $('.artesano__escena');
  if (!escena) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)) {
    escena.classList.add('escena-lista');
    return;
  }

  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      escena.classList.add('escena-lista');
      return;
    }
    escena.classList.add('rearmando');
    escena.classList.remove('escena-lista');
    void escena.offsetHeight;
    escena.classList.remove('rearmando');
  }, { threshold: 0.35 });
  io.observe(escena);
}

/* ── Arranque ────────────────────────────────────────────────────────── */
document.documentElement.classList.remove('sin-js');

// ?limpio en la URL oculta lo pendiente, para enseñarle al cliente cómo se
// verá el sitio ya terminado. Los rótulos de EJEMPLO NO se ocultan: si se
// ocultaran, un número inventado quedaría indistinguible de uno real.
if (new URLSearchParams(location.search).has('limpio')) {
  document.body.classList.add('limpio');
}

pintarHeroe();
pintarPortadas();
pintarCatalogo();
pintarArtesano();
pintarDurabilidad();
pintarCompra();
pintarContacto();
pintarWspFlotante();
activarNav();
activarRevelado();
activarTraza();
activarEscena();
