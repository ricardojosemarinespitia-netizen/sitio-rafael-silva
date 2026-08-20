/**
 * lluvia.js — el agua del héroe, animada sobre la foto.
 *
 * La foto ya trae el chorro congelado por el obturador. Esto NO lo reemplaza:
 * le suma el movimiento que la foto no puede tener, respetando lo que ya se ve.
 *
 * ── POR QUÉ EN COORDENADAS DE LA FOTO Y NO DEL CANVAS ──────────────────
 * El héroe pinta la imagen con `object-fit: cover`, así que en pantalla ancha
 * la foto (vertical) se recorta arriba y abajo, y en móvil se recorta a los
 * lados. Si las gotas se posicionaran en porcentajes del canvas, se
 * despegarían de la regadera en cuanto cambiara el tamaño de la ventana.
 *
 * Por eso todo el sistema vive en coordenadas normalizadas de la FOTO
 * (0..1 sobre la imagen original) y `aPantalla()` replica el mismo encuadre
 * que hace el CSS. Resultado: el agua sale del borde real de la regadera en
 * cualquier viewport.
 *
 * ── DE DÓNDE SALEN LAS CIFRAS DE `REGADERA` ────────────────────────────
 * Medidas sobre la foto original con una cuadrícula superpuesta: el ala del
 * cono va de x=0.45 a x=0.80 y su borde inferior —por donde asoma el agua—
 * está en y=0.388. Si algún día se cambia la foto del héroe, hay que volver
 * a medir estos tres números o el agua nacerá en el aire.
 */

/** El borde del ala de la regadera, en coordenadas normalizadas de la foto. */
const REGADERA = { y: 0.388, xIzq: 0.45, xDer: 0.80 };

/** Unidades por segundo, en alturas de foto. Es gravedad "de cine", no real:
 *  la real (9,8 m/s²) a esta escala cruza el encuadre en un parpadeo. */
const GRAVEDAD = 1.55;

const azar = (a, b) => a + Math.random() * (b - a);

/**
 * Una gota. Se recicla en vez de recrearse: son cientos por segundo y crear
 * objetos a ese ritmo le da trabajo innecesario al recolector de basura.
 */
class Gota {
  constructor() { this.reiniciar(true); }

  /**
   * `dispersa` reparte las gotas por toda la caída en el primer cuadro. Sin
   * esto el héroe abre con una franja de agua bajando en bloque, como un
   * telón — se nota artificial justo en el primer segundo, que es el que
   * más se mira.
   */
  reiniciar(dispersa = false) {
    // El goteo del ala nace en los bordes del cono y cae más lento y más
    // gordo; el velo es la cortina central, fina y rápida. Son los dos
    // comportamientos que se ven en una regadera de verdad.
    this.deBorde = Math.random() < 0.14;

    if (this.deBorde) {
      const izq = Math.random() < 0.5;
      this.x = izq ? azar(REGADERA.xIzq - 0.012, REGADERA.xIzq + 0.03)
                   : azar(REGADERA.xDer - 0.03, REGADERA.xDer + 0.012);
      this.v = azar(0.04, 0.10);
      this.grosor = azar(1.5, 2.6);
      this.alfa = azar(0.30, 0.60);
    } else {
      // Sesgo al centro: en el borde del cono el agua sale más rala. Promediar
      // dos aleatorios concentra el reparto en el medio sin cortar los bordes.
      const t = (Math.random() + Math.random()) / 2;
      this.x = REGADERA.xIzq + t * (REGADERA.xDer - REGADERA.xIzq);
      this.v = azar(0.30, 0.55);
      this.grosor = azar(0.6, 1.5);
      this.alfa = azar(0.10, 0.30);
    }

    // Profundidad: las de adelante van más rápido, más gruesas y más difusas.
    // Es lo que impide que la cortina se lea como una sola lámina plana.
    this.z = azar(0.55, 1.35);
    this.v *= this.z;
    this.grosor *= this.z;
    this.alfa /= this.z;

    this.y = dispersa ? azar(REGADERA.y, 1.1) : REGADERA.y - azar(0, 0.03);
    if (dispersa) this.v += GRAVEDAD * (this.y - REGADERA.y) * 0.5;

    // Deriva lateral mínima: el agua no cae en un riel perfecto.
    this.deriva = azar(-0.012, 0.012);
  }

  avanzar(dt) {
    this.v += GRAVEDAD * dt;
    this.y += this.v * dt;
    this.x += this.deriva * dt;
    // 1.15 y no 1.0: si se reciclaran justo en el borde, las gotas
    // desaparecerían a la vista en pantallas donde la foto se recorta poco.
    if (this.y > 1.15) this.reiniciar();
  }
}

/**
 * Monta la animación sobre un contenedor. Devuelve una función para
 * desmontarla (hoy no se usa: el héroe vive toda la sesión, pero deja el
 * módulo cerrado sobre sí mismo en vez de dejar oyentes sueltos).
 */
export function montarLluvia(contenedor, img) {
  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Con movimiento reducido no se monta nada: la foto ya comunica el producto
  // por su cuenta, así que la ausencia de animación no deja un hueco.
  if (reducido.matches) return () => {};

  const lienzo = document.createElement('canvas');
  lienzo.className = 'heroe__agua';
  lienzo.setAttribute('aria-hidden', 'true');
  contenedor.appendChild(lienzo);
  const ctx = lienzo.getContext('2d', { alpha: true });

  // El rastro de la gota se pinta una sola vez aquí y luego se estira con
  // `drawImage`. La versión obvia —un `createLinearGradient` por gota— crea
  // cientos de objetos por cuadro solo para tirarlos: cuesta ~20% más de CPU
  // y, sobre todo, le deja basura que recoger al móvil en cada cuadro.
  const RASTRO = document.createElement('canvas');
  RASTRO.width = 8;
  RASTRO.height = 128;
  {
    const c = RASTRO.getContext('2d');
    const g = c.createLinearGradient(0, 0, 0, 128);
    g.addColorStop(0, 'rgba(255, 244, 228, 0)');
    g.addColorStop(1, 'rgba(255, 246, 232, 1)');
    c.fillStyle = g;
    c.fillRect(0, 0, 8, 128);
  }

  // Menos gotas en pantallas chicas: es donde más barato tiene que salir el
  // cuadro y donde menos se nota la densidad.
  const cantidad = window.innerWidth < 640 ? 170 : 320;
  const gotas = Array.from({ length: cantidad }, () => new Gota());

  let anchoCss = 0, altoCss = 0;
  let escala = 1, despX = 0, despY = 0;

  /** Replica `object-fit: cover` con `object-position: center`. */
  function medir() {
    const r = contenedor.getBoundingClientRect();
    if (!r.width || !r.height) return false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    anchoCss = r.width;
    altoCss = r.height;
    lienzo.width = Math.round(anchoCss * dpr);
    lienzo.height = Math.round(altoCss * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const iw = img.naturalWidth || 1072;
    const ih = img.naturalHeight || 1467;
    escala = Math.max(anchoCss / iw, altoCss / ih);
    despX = (anchoCss - iw * escala) / 2;
    despY = (altoCss - ih * escala) / 2;
    // Guardadas ya multiplicadas: se usan en cada gota de cada cuadro.
    medir.anchoFoto = iw * escala;
    medir.altoFoto = ih * escala;
    return true;
  }

  const aPantallaX = (u) => despX + u * medir.anchoFoto;
  const aPantallaY = (v) => despY + v * medir.altoFoto;

  function pintar(dt) {
    ctx.clearRect(0, 0, anchoCss, altoCss);
    // El agua a contraluz SUMA luz sobre la escena, no la tapa: `lighter`
    // es lo que hace que se lea como agua iluminada y no como rayas grises.
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';

    for (const g of gotas) {
      g.avanzar(dt);

      const px = aPantallaX(g.x);
      const py = aPantallaY(g.y);
      // El rastro ES la velocidad: así se estira sola al acelerar, que es
      // justo lo que hace una gota real ante un obturador lento.
      const largo = g.v * medir.altoFoto * 0.055;
      const y0 = py - largo;

      if (py < despY || y0 > altoCss) continue;

      // Entra desvaneciéndose bajo el ala: el agua no aparece de golpe, sale
      // de la sombra del cono.
      const asomo = Math.min(1, (g.y - REGADERA.y) / 0.05);

      ctx.globalAlpha = g.alfa * asomo;
      ctx.drawImage(RASTRO, px - g.grosor / 2, y0, g.grosor, largo);

      // Solo las gotas gordas del ala tienen cabeza visible; ponérsela a las
      // finas del velo las convertiría en un collar de perlas.
      if (g.deBorde) {
        ctx.globalAlpha = g.alfa * asomo * 0.9;
        ctx.fillStyle = 'rgba(255, 252, 245, 1)';
        ctx.beginPath();
        ctx.ellipse(px, py, g.grosor * 0.62, g.grosor * 1.05, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  let anterior = 0;
  let animando = false;
  let cuadro = 0;

  function bucle(ahora) {
    if (!animando) return;
    // Al volver de una pestaña en segundo plano el delta es enorme y las
    // gotas darían un salto; se recorta a ~3 cuadros de 60 Hz.
    const dt = anterior ? Math.min((ahora - anterior) / 1000, 0.05) : 0.016;
    anterior = ahora;
    pintar(dt);
    cuadro = requestAnimationFrame(bucle);
  }

  function arrancar() {
    if (animando) return;
    animando = true;
    anterior = 0;
    cuadro = requestAnimationFrame(bucle);
  }

  function parar() {
    animando = false;
    cancelAnimationFrame(cuadro);
  }

  if (!medir()) return () => {};

  // Fuera de pantalla no se pinta: el héroe queda arriba del todo y el resto
  // de la página es larga, no tiene sentido gastar cuadros ahí.
  const io = new IntersectionObserver(
    ([e]) => (e.isIntersecting ? arrancar() : parar()),
    { threshold: 0 },
  );
  io.observe(contenedor);

  const alCambiarVisibilidad = () => (document.hidden ? parar() : arrancar());
  document.addEventListener('visibilitychange', alCambiarVisibilidad);

  const ro = new ResizeObserver(() => medir());
  ro.observe(contenedor);

  // Si el visitante activa "reducir movimiento" con la página abierta.
  const alCambiarPreferencia = () => reducido.matches && desmontar();
  reducido.addEventListener('change', alCambiarPreferencia);

  function desmontar() {
    parar();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', alCambiarVisibilidad);
    reducido.removeEventListener('change', alCambiarPreferencia);
    lienzo.remove();
  }

  return desmontar;
}
