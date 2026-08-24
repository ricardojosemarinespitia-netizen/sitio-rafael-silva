/**
 * galeria-app.js — pinta el archivo de fotos y su visor.
 *
 * La rejilla es de mampostería (columnas verticales): las fotos del taller
 * vienen en proporciones distintas — verticales de ambiente, apaisadas de
 * lámina — y forzarlas todas al mismo recorte cuadrado sería recortar cotas
 * y cortar duchas por la mitad. Aquí cada foto se ve completa, con su
 * proporción real.
 */

import { GALERIA, GRUPOS_GALERIA } from './galeria.js';
import {
  $, $$, esc, picture, pintarWspFlotante, activarNav, pintarNegocio,
} from './vista.js';

// El ancho real de una columna de la rejilla, no el del viewport: sin esto un
// celular con dpr alto pide la variante de 1440px para una foto que nunca se
// ve a más de ~360px. Contenedor de hasta 90rem, columnas de mínimo 15rem.
const SIZES_GALERIA = '(max-width: 640px) calc(50vw - 32px), ' +
                      '(max-width: 1100px) calc(33vw - 28px), 300px';

let filtro = 'todas';

function pintarFiltros() {
  const cont = $('#filtros');
  if (!cont) return;

  const grupos = [
    { slug: 'todas', nombre: 'Todas', conteo: GALERIA.length },
    ...GRUPOS_GALERIA.map((g) => ({
      ...g, conteo: GALERIA.filter((f) => f.grupo === g.slug).length,
    })).filter((g) => g.conteo > 0),
  ];

  cont.innerHTML = grupos.map((g) => `
    <button class="filtro" data-grupo="${g.slug}" aria-pressed="${g.slug === filtro}">
      ${esc(g.nombre)} <span class="filtro__conteo">${g.conteo}</span>
    </button>`).join('');

  cont.addEventListener('click', (e) => {
    const b = e.target.closest('.filtro');
    if (!b) return;
    filtro = b.dataset.grupo;
    for (const otro of $$('.filtro')) {
      otro.setAttribute('aria-pressed', String(otro.dataset.grupo === filtro));
    }
    pintarRejilla();
  });
}

function pintarRejilla() {
  const cont = $('#galeria-rejilla');
  if (!cont) return;

  const fotos = filtro === 'todas' ? GALERIA : GALERIA.filter((f) => f.grupo === filtro);

  // Las 6 primeras se cargan de una: son las que se ven sin desplazar. El
  // resto queda perezoso, que es lo que salva la conexión en un celular.
  cont.innerHTML = `
    <div class="galeria__rejilla">
      ${fotos.map((f, i) => `
        <button class="galeria__celda" data-i="${i}"
                aria-label="Ver en grande: ${esc(f.alt)}">
          ${picture(f.base, f.alt, {
            clase: 'galeria__foto', ratio: f.ratio ?? '4 / 5',
            sizes: SIZES_GALERIA, prioridad: i < 6,
          })}
        </button>`).join('')}
    </div>`;

  cont.querySelector('.galeria__rejilla').addEventListener('click', (e) => {
    const celda = e.target.closest('.galeria__celda');
    if (celda) abrirVisor(fotos, Number(celda.dataset.i));
  });
}

/* ── El visor a pantalla completa ────────────────────────────────────────
   Un <dialog> nativo y no un div propio: trae gratis el foco atrapado
   dentro, el cierre con Escape y el fondo inerte para el lector de
   pantalla. Lo que sí se agrega a mano es la navegación con flechas, el
   deslizamiento con el dedo y el contador. */
function abrirVisor(fotos, inicio) {
  let i = inicio;
  const visor = document.createElement('dialog');
  visor.className = 'visor';
  visor.innerHTML = `
    <button class="visor__cerrar" aria-label="Cerrar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18"/>
      </svg>
    </button>
    <button class="visor__paso visor__paso--antes" aria-label="Foto anterior">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M15 5l-7 7 7 7"/>
      </svg>
    </button>
    <figure class="visor__marco">
      <div class="visor__foto" id="visor-foto"></div>
      <figcaption class="visor__pie">
        <span id="visor-alt"></span>
        <span class="visor__conteo" id="visor-conteo"></span>
      </figcaption>
    </figure>
    <button class="visor__paso visor__paso--despues" aria-label="Foto siguiente">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 5l7 7-7 7"/>
      </svg>
    </button>`;
  document.body.appendChild(visor);

  const mostrar = () => {
    const f = fotos[i];
    // En el visor la foto manda: se pide la variante grande y se muestra
    // entera (contain), sin recortar nada.
    $('#visor-foto', visor).innerHTML = picture(f.base, f.alt, {
      clase: 'visor__picture', ratio: f.ratio ?? '4 / 5', sizes: '100vw',
      prioridad: true, entera: true,
    });
    $('#visor-alt', visor).textContent = f.alt;
    $('#visor-conteo', visor).textContent = `${i + 1} / ${fotos.length}`;
  };

  const paso = (d) => { i = (i + d + fotos.length) % fotos.length; mostrar(); };

  // Mientras el visor está abierto la página de atrás no se desplaza: si no,
  // el dedo mueve la rejilla por debajo y al cerrar uno aparece en otro sitio.
  const scrollY = window.scrollY;
  document.body.style.cssText = `position:fixed;top:${-scrollY}px;left:0;right:0`;

  // La limpieza va aquí y no colgada del evento `close` del <dialog>: ese
  // evento no se dispara en todos los navegadores (verificado: en uno de
  // ellos el diálogo se cierra pero el evento nunca llega, y el visor
  // quedaba muerto en el DOM con la página congelada detrás). Cerrar es una
  // sola función y todos los caminos pasan por ella.
  const cerrar = () => {
    if (visor.open) visor.close();
    document.body.style.cssText = '';
    window.scrollTo(0, scrollY);
    visor.remove();
  };

  visor.querySelector('.visor__paso--antes').addEventListener('click', () => paso(-1));
  visor.querySelector('.visor__paso--despues').addEventListener('click', () => paso(1));
  visor.querySelector('.visor__cerrar').addEventListener('click', cerrar);

  visor.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); paso(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); paso(1); }
    // Escape: se atiende a mano por lo mismo que arriba — el cierre nativo
    // dejaría el elemento puesto y el cuerpo trabado.
    if (e.key === 'Escape') { e.preventDefault(); cerrar(); }
  });

  // Tocar el fondo cierra; tocar la foto o los botones, no.
  visor.addEventListener('click', (e) => { if (e.target === visor) cerrar(); });

  // Deslizar con el dedo para cambiar de foto. Mismo criterio que en el
  // resto del sitio: por debajo del umbral fue un toque, no un arrastre.
  let x0 = null;
  visor.addEventListener('touchstart', (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
  visor.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) paso(dx < 0 ? 1 : -1);
    x0 = null;
  }, { passive: true });

  mostrar();
  visor.showModal();
}

/* ── Arranque ────────────────────────────────────────────────────────── */
document.documentElement.classList.remove('sin-js');

pintarFiltros();
pintarRejilla();
pintarWspFlotante('index.html#contacto');
pintarNegocio();
activarNav();
for (const el of $$('[data-revelar]')) el.classList.add('visible');
