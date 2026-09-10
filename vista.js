/**
 * vista.js — las piezas de pintado que comparten la portada y la ficha.
 *
 * Antes cada página traía su propia copia de `esc`, `valor` y `picture`, y las
 * copias ya habían empezado a divergir (la ficha no sabía formatear precios ni
 * distinguir un dato de EJEMPLO). Aquí hay una sola versión de cada una.
 *
 * Dos marcadores conviven y se pintan distinto a propósito:
 *   · PENDIENTE → recuadro ámbar "Falta: …". El dato no existe.
 *   · EJEMPLO   → el valor falso se muestra, rotulado "EJEMPLO — falta …",
 *                 y NUNCA se convierte en enlace (`wa.me`, `mailto:`, `tel:`,
 *                 perfiles de redes). Ver la nota de cabecera de `datos.js`.
 */

import { NEGOCIO, esPendiente, esEjemplo, sinDatoReal } from './datos.js';

export const $ = (s, c = document) => c.querySelector(s);
export const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/** Escapa texto antes de meterlo en innerHTML. */
export const esc = (s) => String(s).replace(/[&<>"']/g, (m) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

/**
 * Formato de precio colombiano: $850.000. Se hace a mano y no con
 * Intl.NumberFormat porque el separador y el espacio tras el símbolo cambian
 * según la implementación del navegador, y el precio es el dato que peor
 * tolera verse distinto en cada equipo.
 */
export const cop = (n) => '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/* ── Marcadores ──────────────────────────────────────────────────────── */

/** El aviso que acompaña a un dato que falta o es de relleno. */
export function aviso(v) {
  if (esPendiente(v)) return `<span class="pendiente">Falta: ${esc(v.que)}</span>`;
  if (esEjemplo(v)) return `<span class="ejemplo__nota">EJEMPLO — falta ${esc(v.que)}</span>`;
  return '';
}

/**
 * Pinta un valor. Si falta, muestra el recuadro ámbar en vez de un hueco
 * silencioso; si es de ejemplo, muestra el valor falso con su rótulo pegado.
 */
export function valor(v, { comoTexto = false } = {}) {
  if (esPendiente(v)) return comoTexto ? `[falta: ${esc(v.que)}]` : aviso(v);
  if (esEjemplo(v)) {
    return comoTexto
      ? `${v.valor} [EJEMPLO]`
      : `<span class="ejemplo"><span class="ejemplo__dato">${esc(v.valor)}</span>${aviso(v)}</span>`;
  }
  return esc(v ?? '');
}

/** Una fila clave/valor de las listas de datos. */
export const fila = (clave, v) => `
  <div class="lista-datos__fila">
    <dt class="lista-datos__clave">${esc(clave)}</dt>
    <dd class="lista-datos__valor">${Array.isArray(v)
      ? v.map((x) => `<span>${esc(x)}</span>`).join('')
      : valor(v)}</dd>
  </div>`;

/* ── Sello de autenticidad ───────────────────────────────────────────
 * Pedido del cliente: un sello circular estilo medalla de cobre, en
 * relieve, "100%" arriba y "COBRE" abajo separados por una línea, en
 * la esquina inferior derecha de TODA foto del sitio. Antes era un SVG
 * inline; ahora es la foto/render original que diseñó el cliente
 * (WhatsApp Image 2026-09-10), recortada a círculo y con el fondo
 * fuera del anillo hecho transparente (sharp, máscara radial con
 * feather) para que no arrastre el fondo oscuro cuadrado de la toma
 * original sobre las fotos de producto. 3 tamaños (64/128/192, el
 * doble/triple para pantallas de alta densidad ya que en pantalla se
 * ve entre 26px y 64px) en WebP con alfa + PNG de respaldo. Igual que
 * el pipeline de fotos del catálogo, va dentro de un <picture> propio.
 */
export const SELLO_COBRE = `
<picture class="sello-cobre">
  <source type="image/webp" srcset="img/sello-100-cobre-64.webp 64w, img/sello-100-cobre-128.webp 128w, img/sello-100-cobre-192.webp 192w" sizes="64px">
  <img src="img/sello-100-cobre-128.png"
       srcset="img/sello-100-cobre-64.png 64w, img/sello-100-cobre-128.png 128w, img/sello-100-cobre-192.png 192w"
       sizes="64px" alt="Sello 100% cobre" width="64" height="64" loading="lazy" decoding="async">
</picture>`;

/* ── Imágenes responsive ─────────────────────────────────────────────── */
const ANCHOS = [480, 720, 1080, 1440];

// El ancho REAL de una tarjeta de catálogo, no el del viewport. Sin esto un
// celular con pantalla de alta densidad (dpr 3) pide la variante de 1440px
// para una tarjeta que mide ~340px — el navegador solo sabe elegir bien si
// el `sizes` refleja el layout de verdad, no "ocupa toda la pantalla".
// Contenedor: min(76rem, 100% - 2×24px). Grid: columnas de mín. 304px.
export const SIZES_TARJETA =
  '(max-width: 620px) calc(100vw - 48px), ' +   // 1 columna, con el padding del contenedor
  '(max-width: 960px) calc(50vw - 36px), ' +    // 2 columnas
  '380px';                                       // 3+ columnas: el ancho ya no crece más

export function picture(base, alt, {
  clase = '', prioridad = false, ratio = '4 / 5', sizes = SIZES_TARJETA, foco = null,
  entera = false,
} = {}) {
  if (!base) {
    return `<div class="${clase}" style="aspect-ratio:${ratio};display:grid;place-items:center">
      <span class="pendiente">Falta la foto</span></div>`;
  }
  // width/height coherentes con el recorte que aplica el CSS: reservan la caja
  // exacta antes de que baje la imagen, que es lo que evita el salto de layout.
  const [rw, rh] = ratio.split('/').map(parseFloat);
  const alto = Math.round(1080 * rh / rw);
  const set = (fmt) => ANCHOS.map((w) => `img/${base}-${w}.${fmt} ${w}w`).join(', ');
  // `foco` reubica el recorte de `object-fit: cover` cuando el centro por
  // defecto (50% 50%) deja fuera lo importante — una regadera que queda
  // arriba en una foto muy vertical. `entera` va más allá: la imagen se ve
  // COMPLETA (contain), para las fichas técnicas con cotas impresas donde
  // cualquier recorte corta una medida. El fondo de la franja sobrante lo
  // pone la clase .foto-entera en CSS.
  const estilo = [
    foco && !entera ? `object-position:${foco}` : '',
    entera ? 'object-fit:contain' : '',
  ].filter(Boolean).join(';');
  // El sello va en TODA foto pintada por picture(), fichas técnicas
  // `entera: true` incluidas: el cliente lo pidió así y, al ir en la
  // esquina, no cae sobre las cotas impresas (que quedan centradas en
  // el área "contain"). Las miniaturas de la galería de producto no
  // pasan por aquí (son <img> sueltos, ver producto.html), así que
  // quedan excluidas de forma natural sin tener que casuísticas.
  return `<picture class="${clase}${entera ? ' foto-entera' : ''}">
    <source type="image/avif" srcset="${set('avif')}" sizes="${sizes}">
    <source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">
    <img src="img/${base}-1080.jpg" alt="${esc(alt)}"
         loading="${prioridad ? 'eager' : 'lazy'}"
         ${prioridad ? 'fetchpriority="high"' : 'decoding="async"'}
         ${estilo ? `style="${estilo}"` : ''}
         width="1080" height="${alto}">
    ${SELLO_COBRE}
  </picture>`;
}

/**
 * Una foto del catálogo es normalmente un uuid (string). Cuando hace falta
 * distinguir dos versiones en la misma toma o corregir el recorte, la
 * entrada es `{ base, nota, foco }`: `nota` se pinta como pie de foto,
 * `foco` es el `object-position` que reemplaza el centrado por defecto.
 */
export const fotoBase = (f) => (typeof f === 'string' ? f : f.base);
export const fotoNota = (f) => (typeof f === 'string' ? null : (f.nota ?? null));
export const fotoFoco = (f) => (typeof f === 'string' ? null : (f.foco ?? null));
export const fotoEntera = (f) => (typeof f === 'string' ? false : Boolean(f.entera));

/* ── Precio ──────────────────────────────────────────────────────────── */

/** El precio de la tarjeta y del encabezado de la ficha. */
export function precioBreve(precio, { grande = false } = {}) {
  if (esPendiente(precio)) return aviso(precio);
  const hayVariantes = precio.variantes?.length > 1;
  return `<p class="precio ${grande ? 'precio--grande' : ''}">
    ${hayVariantes ? '<span class="precio__desde">Desde</span>' : ''}
    <span class="precio__cifra">${cop(precio.valor)}</span>
  </p>`;
}

/**
 * Las líneas que matizan el precio: versiones con precio propio, sobrecostos
 * y la regla de diámetro de regadera. Las versiones NO se funden en una sola
 * cifra: $850.000 y $950.000 son dos productos distintos, no un promedio.
 */
export function precioLineas(p) {
  const lineas = [];
  if (!esPendiente(p.precio)) {
    for (const v of p.precio.variantes ?? []) lineas.push([v.nombre, cop(v.valor)]);
    for (const e of p.precio.extras ?? []) lineas.push([e.nombre, `+ ${cop(e.valor)}`]);
  }
  if (p.regadera) {
    lineas.push(['Regadera', `${p.regadera.base} de diámetro`]);
  }
  return lineas;
}

/** Resumen de una línea para la tarjeta: la medida que no cambia el precio. */
export function notaPrecioTarjeta(p) {
  if (!p.regadera) return '';
  return `<p class="pieza__opcion">Regadera de ${esc(p.regadera.base)} de diámetro</p>`;
}

/* ── WhatsApp ────────────────────────────────────────────────────────── */

/**
 * El botón de pedido. Mientras el número no sea real NO se construye un
 * `wa.me`: se muestra el botón completo, inerte y rotulado, para que nadie
 * escriba a un número inventado creyendo que es el del taller.
 */
export function ctaWhatsapp(texto, mensaje = '') {
  const w = NEGOCIO.whatsapp;
  if (sinDatoReal(w)) {
    return `<p class="cta">
      <button type="button" class="boton boton--principal boton--inerte" disabled>${esc(texto)}</button>
      ${aviso(w)}
    </p>`;
  }
  const numero = String(w).replace(/\D/g, '');
  const q = mensaje ? `?text=${encodeURIComponent(mensaje)}` : '';
  return `<p class="cta">
    <a class="boton boton--principal" href="https://wa.me/${numero}${q}">${esc(texto)}</a>
  </p>`;
}

const ICONO_WSP = `<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.01-1.04 2.47 1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/>
  <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.02-.2-.31A8.2 8.2 0 1 1 12 20.2z"/>
</svg>`;

/** El botón flotante. Mismo criterio que el CTA: sin número real, no enlaza. */
export function pintarWspFlotante(destino = '#contacto') {
  const nodo = $('#wsp');
  if (!nodo) return;
  const w = NEGOCIO.whatsapp;

  if (sinDatoReal(w)) {
    // Lleva a los datos de contacto, que sí es una acción honesta, y avisa en
    // el propio botón que el número todavía no es el de verdad.
    nodo.innerHTML = `
      <span class="wsp__tag">${esEjemplo(w) ? 'Ejemplo' : 'Falta'}</span>
      <a class="wsp__boton" href="${destino}"
         aria-label="Ir a los datos de contacto — falta ${esc(w.que)}">${ICONO_WSP}</a>`;
    return;
  }
  const numero = String(w).replace(/\D/g, '');
  nodo.innerHTML = `<a class="wsp__boton" href="https://wa.me/${numero}"
      aria-label="Escribir por WhatsApp">${ICONO_WSP}</a>`;
}

/* ── Navegación ──────────────────────────────────────────────────────── */
export function activarNav() {
  const nav = $('.nav');
  const boton = $('.nav__menu');
  const enlaces = $('.nav__enlaces');

  if (nav && !nav.classList.contains('desplazado')) {
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

  activarVolver();
}

const ICONO_VOLVER = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M19 12H5"/>
  <path d="M11 18 5 12l6-6"/>
</svg>`;

/**
 * La página principal no tiene "atrás" dentro del sitio: es el punto de
 * entrada. `pathname` puede llegar como '/', '' (dominio pelado) o
 * '/index.html' según cómo se sirva — las tres cuentan como principal.
 */
function esPaginaPrincipal() {
  const p = location.pathname.replace(/\/+$/, '').split('/').pop() || '';
  return p === '' || p === 'index.html';
}

/**
 * El botón de volver, flotante, en `producto.html` y `galeria.html` — NUNCA
 * en `index.html` (no hay a dónde volver desde el punto de entrada). Se
 * inyecta una sola vez desde `activarNav()`, que ya se llama en las tres.
 * Vuelve por el historial real del navegador cuando hay una página anterior
 * DENTRO del sitio; si se entró directo (enlace externo, WhatsApp, pestaña
 * nueva) no hay a dónde volver, y manda al inicio en su lugar — nunca deja
 * el botón sin hacer nada al tocarlo.
 *
 * Además del botón, el control trae affordance de arrastre: un tirador en
 * el borde izquierdo con una animación sutil de "desliza", y el gesto de
 * swipe-back real — arrastrar desde el borde izquierdo hacia la derecha
 * navega hacia atrás igual que el botón, como el swipe-back nativo de las
 * apps móviles.
 */
export function activarVolver() {
  if (esPaginaPrincipal()) return;   // en el inicio no hay "volver"
  if ($('.volver')) return;   // ya está pintado (evita duplicar en recargas del módulo)

  const navegarAtras = () => {
    const hayHistorialPropio = window.history.length > 1 &&
      document.referrer && new URL(document.referrer).origin === location.origin;
    if (hayHistorialPropio) window.history.back();
    else location.href = 'index.html';
  };

  const envoltorio = document.createElement('div');
  envoltorio.className = 'volver';
  envoltorio.innerHTML = `
    <button class="volver__boton" aria-label="Volver a la página anterior">${ICONO_VOLVER}</button>
    <span class="volver__pista" aria-hidden="true">
      <span class="volver__pista-manija"></span>
      <span class="volver__pista-texto">Desliza para volver</span>
    </span>`;
  document.body.appendChild(envoltorio);

  envoltorio.querySelector('.volver__boton').addEventListener('click', navegarAtras);

  /* Swipe-back: solo cuenta un arrastre que ARRANCA cerca del borde
     izquierdo (zona de 28px, el ancho típico del gesto nativo de iOS/
     Android) y que se mueve más a lo horizontal que a lo vertical, para no
     robarle el gesto al scroll vertical de la página. */
  const ZONA_BORDE = 28;
  const UMBRAL_ARRASTRE = 70;
  let inicioX = null, inicioY = null, arrastrando = false;

  document.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    if (t.clientX > ZONA_BORDE) { inicioX = null; return; }
    inicioX = t.clientX;
    inicioY = t.clientY;
    arrastrando = false;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (inicioX === null) return;
    const t = e.touches[0];
    const dx = t.clientX - inicioX;
    const dy = Math.abs(t.clientY - inicioY);
    if (dx > 12 && dx > dy) {
      arrastrando = true;
      envoltorio.classList.add('volver--arrastrando');
    }
  }, { passive: true });

  const terminarArrastre = (e) => {
    if (inicioX === null) return;
    envoltorio.classList.remove('volver--arrastrando');
    const dx = (e.changedTouches?.[0]?.clientX ?? inicioX) - inicioX;
    if (arrastrando && dx > UMBRAL_ARRASTRE) navegarAtras();
    inicioX = null;
    arrastrando = false;
  };
  document.addEventListener('touchend', terminarArrastre);
  document.addEventListener('touchcancel', terminarArrastre);
}

/** Rellena los textos del negocio marcados con `data-negocio`. */
export function pintarNegocio() {
  for (const el of $$('[data-negocio]')) {
    const v = NEGOCIO[el.dataset.negocio];
    if (v === undefined) continue;
    el.innerHTML = valor(v);
  }
}
