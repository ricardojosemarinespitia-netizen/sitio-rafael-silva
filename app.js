/**
 * app.js — arma la página desde `datos.js` y `catalogo.js`.
 *
 * El HTML no lleva ni un texto ni una ruta de foto escrita a mano: todo se
 * genera aquí. Cambiar el catálogo es editar datos, no maquetado.
 */

import { NEGOCIO, ARTESANO, DURABILIDAD, TALLER, ENVIOS, POLITICAS, CATEGORIAS, esPendiente } from './datos.js';
import { PRODUCTOS, AMBIENTES } from './catalogo.js';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/** Escapa texto antes de meterlo en innerHTML. */
const esc = (s) => String(s).replace(/[&<>"']/g, (m) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

/**
 * Pinta un valor. Si está pendiente, muestra el recuadro ámbar con lo que
 * falta en vez de un hueco silencioso.
 */
function valor(v, { comoTexto = false } = {}) {
  if (esPendiente(v)) {
    return comoTexto
      ? `[falta: ${esc(v.que)}]`
      : `<span class="pendiente">Falta: ${esc(v.que)}</span>`;
  }
  return esc(v ?? '');
}

/* ── Imágenes responsive ─────────────────────────────────────────────── */
const ANCHOS = [480, 960, 1440];

function picture(base, alt, { clase = '', prioridad = false, ratio = '4 / 5' } = {}) {
  if (!base) {
    return `<div class="${clase}" style="aspect-ratio:${ratio}">
      <span class="pendiente">Falta la foto</span></div>`;
  }
  const set = (fmt) => ANCHOS.map((w) => `img/${base}-${w}.${fmt} ${w}w`).join(', ');
  const sizes = '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw';
  return `<picture class="${clase}">
    <source type="image/avif" srcset="${set('avif')}" sizes="${sizes}">
    <source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">
    <img src="img/${base}-960.jpg" alt="${esc(alt)}"
         loading="${prioridad ? 'eager' : 'lazy'}"
         ${prioridad ? 'fetchpriority="high"' : 'decoding="async"'}
         width="960" height="1200">
  </picture>`;
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
            <p class="pieza__precio">${valor(p.precio)}</p>
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

/* ── Secciones que dependen de información pendiente ─────────────────── */
function pintarSeccionesPendientes() {
  const bloques = [
    { el: '#taller', datos: TALLER, titulo: TALLER.titulo, campos: ['descripcion', 'fotos'] },
    { el: '#durabilidad', datos: DURABILIDAD, titulo: DURABILIDAD.titulo, campos: ['relato', 'aniosPrueba', 'fotoAntes', 'fotoDespues'] },
    { el: '#artesano', datos: ARTESANO, titulo: 'Quién está detrás', campos: ['nombre', 'rol', 'aniosOficio', 'bio', 'foto'] },
    { el: '#envios', datos: ENVIOS, titulo: 'Envíos', campos: ['cobertura', 'tiempo', 'gestion', 'costoTipo', 'envioGratisDesde'] },
    { el: '#politicas', datos: POLITICAS, titulo: 'Políticas', campos: ['cambiosDevoluciones', 'garantia', 'envios', 'datos'] },
  ];

  for (const { el, datos, titulo, campos } of bloques) {
    const nodo = $(el);
    if (!nodo) continue;

    const faltantes = campos.filter((c) => esPendiente(datos[c]));

    // Si ya está todo lleno y marcado visible, se pinta como sección normal.
    if (datos.visible && !faltantes.length) {
      nodo.innerHTML = `
        <div class="contenedor">
          <h2 class="seccion__titulo" data-revelar>${esc(titulo)}</h2>
          <p class="seccion__bajada" data-revelar>${esc(datos.descripcion ?? datos.relato ?? datos.bio ?? '')}</p>
        </div>`;
      continue;
    }

    // Si falta información, se muestra el recuadro con la lista exacta.
    nodo.innerHTML = `
      <div class="contenedor">
        <div class="seccion--pendiente" data-revelar>
          <h2 class="seccion__titulo" style="font-size:var(--paso-2)">${esc(titulo)}</h2>
          <p class="seccion__bajada">Esta sección aparecerá cuando llegue la información. Falta:</p>
          <ul style="display:grid;gap:var(--e-2);list-style:none;padding:0">
            ${faltantes.map((c) => `<li><span class="pendiente">${esc(datos[c].que)}</span></li>`).join('')}
          </ul>
        </div>
      </div>`;
  }
}

/* ── Contacto y pie ──────────────────────────────────────────────────── */
function pintarContacto() {
  const wsp = $('#wsp');
  if (wsp) {
    if (esPendiente(NEGOCIO.whatsapp)) {
      wsp.setAttribute('aria-disabled', 'true');
      wsp.href = '#contacto';
      wsp.title = 'Falta el número de WhatsApp';
    } else {
      wsp.href = `https://wa.me/${NEGOCIO.whatsapp}`;
    }
  }

  const datos = $('#datos-contacto');
  if (datos) {
    const filas = [
      ['WhatsApp', NEGOCIO.whatsapp],
      ['Correo', NEGOCIO.email],
      ['Teléfono', NEGOCIO.telefono],
      ['Ciudad', NEGOCIO.ciudad],
      ['Dirección', NEGOCIO.direccion],
    ];
    datos.innerHTML = filas.map(([k, v]) =>
      `<li><span class="pie__titulo" style="margin:0">${k}</span> ${valor(v)}</li>`).join('');
  }

  for (const el of $$('[data-negocio]')) {
    const v = NEGOCIO[el.dataset.negocio];
    // En sitios estrechos (la nav) el recuadro completo desborda: se usa una
    // versión breve y el detalle se deja en el title.
    if (esPendiente(v) && el.hasAttribute('data-breve')) {
      el.innerHTML = `<span class="pendiente--breve">falta el nombre</span>`;
      el.title = v.que;
    } else {
      el.innerHTML = valor(v);
    }
  }
}

/* ── Héroe ───────────────────────────────────────────────────────────── */
function pintarHeroe() {
  const fondo = $('#heroe-fondo');
  if (fondo && AMBIENTES.length) {
    fondo.innerHTML = picture(AMBIENTES[0], 'Grifería de cobre instalada', {
      prioridad: true, ratio: '16 / 9',
    });
  }
}

/* ── Interacción ─────────────────────────────────────────────────────── */
function activarNav() {
  const nav = $('.nav');
  const boton = $('.nav__menu');
  const enlaces = $('.nav__enlaces');

  if (nav) {
    const alScroll = () => nav.classList.toggle('desplazado', window.scrollY > 40);
    window.addEventListener('scroll', alScroll, { passive: true });
    alScroll();
  }

  if (boton && enlaces) {
    boton.addEventListener('click', () => {
      const abierto = enlaces.classList.toggle('abierto');
      boton.setAttribute('aria-expanded', String(abierto));
    });
    // Cerrar al navegar: en móvil el panel tapa la página.
    enlaces.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        enlaces.classList.remove('abierto');
        boton.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

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

/* ── Arranque ────────────────────────────────────────────────────────── */
document.documentElement.classList.remove('sin-js');

// ?limpio en la URL oculta todo lo pendiente, para enseñarle al cliente
// cómo se verá el sitio ya terminado.
if (new URLSearchParams(location.search).has('limpio')) {
  document.body.classList.add('limpio');
}

pintarHeroe();
pintarCatalogo();
pintarSeccionesPendientes();
pintarContacto();
activarNav();
activarRevelado();
