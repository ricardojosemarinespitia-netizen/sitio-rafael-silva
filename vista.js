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
  clase = '', prioridad = false, ratio = '4 / 5', sizes = SIZES_TARJETA,
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
  return `<picture class="${clase}">
    <source type="image/avif" srcset="${set('avif')}" sizes="${sizes}">
    <source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">
    <img src="img/${base}-1080.jpg" alt="${esc(alt)}"
         loading="${prioridad ? 'eager' : 'lazy'}"
         ${prioridad ? 'fetchpriority="high"' : 'decoding="async"'}
         width="1080" height="${alto}">
  </picture>`;
}

/**
 * Una foto del catálogo es normalmente un uuid (string). Cuando dos versiones
 * de la pieza salen juntas en la misma foto y se pueden confundir, la entrada
 * es `{ base, nota }` y `nota` se pinta como pie de foto para distinguirlas.
 */
export const fotoBase = (f) => (typeof f === 'string' ? f : f.base);
export const fotoNota = (f) => (typeof f === 'string' ? null : (f.nota ?? null));

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
    lineas.push([`Regadera de ${p.regadera.base}`, 'De serie']);
    lineas.push([`Regadera de ${p.regadera.opcion.diametro}`, `+ ${cop(p.regadera.opcion.recargo)}`]);
  }
  return lineas;
}

/** Resumen de una línea para la tarjeta: solo lo que cambia el precio. */
export function notaPrecioTarjeta(p) {
  if (!p.regadera) return '';
  return `<p class="pieza__opcion">Regadera ${esc(p.regadera.base)} de serie ·
    ${esc(p.regadera.opcion.diametro)} + ${cop(p.regadera.opcion.recargo)}</p>`;
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
}

/** Rellena los textos del negocio marcados con `data-negocio`. */
export function pintarNegocio() {
  for (const el of $$('[data-negocio]')) {
    const v = NEGOCIO[el.dataset.negocio];
    if (v === undefined) continue;
    el.innerHTML = valor(v);
  }
}
