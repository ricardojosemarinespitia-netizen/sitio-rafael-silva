/**
 * app.js — arma la portada desde `datos.js` y `catalogo.js`.
 *
 * El HTML no lleva ni un dato ni una ruta de foto escrita a mano: todo se
 * genera aquí. Cambiar el catálogo es editar datos, no maquetado.
 * Las utilidades de pintado que también usa la ficha viven en `vista.js`.
 */

import {
  NEGOCIO, ARTESANO, DURABILIDAD, TALLER, ENVIOS, PAGOS, POLITICAS, CATEGORIAS,
  esPendiente,
} from './datos.js';
import { PRODUCTOS, AMBIENTES } from './catalogo.js';
import {
  $, $$, esc, aviso, valor, fila, picture, precioBreve, notaPrecioTarjeta,
  ctaWhatsapp, pintarWspFlotante, activarNav, pintarNegocio,
} from './vista.js';

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

function pintarTaller() {
  const nodo = $('#taller');
  if (!nodo) return;

  const faltan = [TALLER.descripcion, TALLER.fotos].filter(esPendiente);
  if (!TALLER.visible || faltan.length) {
    nodo.innerHTML = seccionFaltante(TALLER.titulo, faltan);
    return;
  }

  // Todas las fotos del taller son verticales, así que todas conservan el 3/4:
  // recortarlas a apaisado para "destacar" una le cortaría la cabeza al
  // artesano. La jerarquía la da el ancho de columna, no el recorte.
  const sizes = (i) =>
    '(max-width: 620px) calc(100vw - 48px), ' +
    '(max-width: 900px) calc(50vw - 36px), ' +
    (i === 0 ? '470px' : '350px');

  const fotos = TALLER.fotos.map((f, i) => `
    <figure class="taller__foto" data-revelar style="--retardo:${i * 90}ms">
      ${picture(f.base, f.alt, { ratio: '3 / 4', sizes: sizes(i) })}
      <figcaption class="pie-foto">${esc(f.pie)}</figcaption>
    </figure>`).join('');

  nodo.innerHTML = `
    <div class="contenedor">
      <p class="seccion__etiqueta" data-revelar>El oficio</p>
      <h2 class="seccion__titulo" data-revelar>${esc(TALLER.titulo)}</h2>
      <p class="seccion__bajada" data-revelar>${esc(TALLER.descripcion)}</p>
      <div class="taller__fotos">${fotos}</div>
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

  const parrafos = [].concat(ARTESANO.bio).map((t) => `<p>${esc(t)}</p>`).join('');

  // Sin retrato confirmado la sección se sostiene sola: la firma en display
  // hace el trabajo que haría la foto. El pendiente queda como nota al pie,
  // no como un hueco gris en mitad del bloque.
  nodo.innerHTML = `
    <div class="contenedor">
      <div class="artesano">
        <div class="artesano__ficha" data-revelar>
          <p class="seccion__etiqueta">Quién está detrás</p>
          <h2 class="artesano__nombre">${esc(ARTESANO.nombre)}</h2>
          <p class="artesano__rol">${esc(ARTESANO.rol)}</p>
          <p class="cifra cifra--menor">
            <span class="cifra__numero">${esc(ARTESANO.aniosOficio)}</span>
            <span class="cifra__unidad">años de oficio</span>
          </p>
          ${esPendiente(ARTESANO.foto) ? aviso(ARTESANO.foto) : ''}
        </div>
        <div class="artesano__relato" data-revelar>${parrafos}</div>
      </div>
    </div>`;
}

function pintarCompra() {
  const nodo = $('#compra');
  if (!nodo) return;

  // Los ids viven en los bloques, no en la sección: el pie enlaza a #envios y
  // a #politicas por separado y esos anclajes no se pueden perder.
  const bloques = [
    ['envios', 'Envíos', [
      ['Cobertura', ENVIOS.cobertura],
      ['Tiempo', ENVIOS.tiempo],
      ['Transportadora', ENVIOS.gestion],
      ['Costo', ENVIOS.costoTipo],
      ['Envío gratis', ENVIOS.envioGratisDesde],
    ]],
    ['pagos', 'Pagos', [
      ['Forma de pago', PAGOS.metodos],
      ['Pago en línea', PAGOS.pasarela],
    ]],
    ['politicas', 'Políticas', [
      ['Cuidado de la pieza', POLITICAS.cuidado],
      ['Piezas defectuosas', POLITICAS.defectos],
      ['Cambios y devoluciones', POLITICAS.cambiosDevoluciones],
      ['Garantía', POLITICAS.garantia],
      ['Tratamiento de datos', POLITICAS.datos],
    ]],
  ].map(([id, titulo, filas], i) => `
    <div class="bloque" id="${id}" data-revelar style="--retardo:${i * 90}ms">
      <h3 class="bloque__titulo">${esc(titulo)}</h3>
      <dl class="lista-datos">${filas.map(([k, v]) => fila(k, v)).join('')}</dl>
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
    const filas = [
      ['WhatsApp', NEGOCIO.whatsapp],
      ['Correo', NEGOCIO.email],
      ['Teléfono', NEGOCIO.telefono],
      ['Ciudad', NEGOCIO.ciudad],
      ['Dirección', NEGOCIO.direccion],
    ];
    const redes = NEGOCIO.mostrarRedes
      ? `<dl class="lista-datos">
           ${fila('Instagram', NEGOCIO.instagram)}
           ${fila('Facebook', NEGOCIO.facebook)}
         </dl>` : '';

    bloque.innerHTML = `
      <div class="contacto">
        <dl class="lista-datos">${filas.map(([k, v]) => fila(k, v)).join('')}</dl>
        <div class="contacto__accion">
          ${ctaWhatsapp('Pedir por WhatsApp')}
          ${redes}
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
  if (fondo && AMBIENTES.length) {
    // El héroe sí ocupa toda la pantalla de verdad: aquí 100vw es correcto.
    fondo.innerHTML = picture(AMBIENTES[0], 'Grifería de cobre instalada', {
      prioridad: true, ratio: '16 / 9', sizes: '100vw',
    });
  }
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

/* ── Arranque ────────────────────────────────────────────────────────── */
document.documentElement.classList.remove('sin-js');

// ?limpio en la URL oculta lo pendiente, para enseñarle al cliente cómo se
// verá el sitio ya terminado. Los rótulos de EJEMPLO NO se ocultan: si se
// ocultaran, un número inventado quedaría indistinguible de uno real.
if (new URLSearchParams(location.search).has('limpio')) {
  document.body.classList.add('limpio');
}

pintarHeroe();
pintarDurabilidad();
pintarCatalogo();
pintarTaller();
pintarArtesano();
pintarCompra();
pintarContacto();
pintarWspFlotante();
activarNav();
activarRevelado();
