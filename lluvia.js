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
 *
 * ── QUÉ HACE QUE ESTO SE LEA COMO AGUA Y NO COMO RAYAS ─────────────────
 * Tres cosas, en orden de peso visual:
 *  1. La silueta. Un hilo de agua bajo tensión superficial no es un cilindro:
 *     es un huso — punta fina arriba, panza abajo del medio, cabeza redonda.
 *     Eso se resuelve en el sprite (ver `crearSprite`), no por gota.
 *  2. El brillo especular. El ojo lee "transparente" cuando ve un reflejo
 *     duro y desplazado del eje sobre un cuerpo translúcido. Sin ese punto
 *     blanco, cualquier trazo claro se lee como pintura, no como agua.
 *  3. El movimiento errático. Líneas paralelas perfectas = artificio. Una
 *     oscilación senoidal por gota, con fase y frecuencia propias, basta.
 *
 * ── COLOR ───────────────────────────────────────────────────────────────
 * La escena es cobre a contraluz cálido. El agua no es blanca: el cuerpo
 * toma el ámbar del ambiente y solo el especular llega a blanco puro. Un
 * agua neutra sobre esta foto se ve pegada encima, como un calco.
 */

/** El borde del ala de la regadera, en coordenadas normalizadas de la foto. */
const REGADERA = { y: 0.388, xIzq: 0.45, xDer: 0.80 };

/** Unidades por segundo, en alturas de foto. Es gravedad "de cine", no real:
 *  la real (9,8 m/s²) a esta escala cruza el encuadre en un parpadeo. */
const GRAVEDAD = 1.55;

/** Línea de impacto, en coordenadas de foto: donde el chorro "choca" y
 *  levanta salpicadura. Está debajo del pie de la foto vertical, así que en
 *  pantallas anchas (que recortan arriba y abajo) el splash cae fuera del
 *  encuadre y simplemente no se ve — que es el comportamiento correcto. */
const IMPACTO = 1.02;

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
      this.grosor = azar(1.8, 3.2);
      this.alfa = azar(0.34, 0.66);
    } else {
      // Sesgo al centro: en el borde del cono el agua sale más rala. Promediar
      // dos aleatorios concentra el reparto en el medio sin cortar los bordes.
      const t = (Math.random() + Math.random()) / 2;
      this.x = REGADERA.xIzq + t * (REGADERA.xDer - REGADERA.xIzq);
      this.v = azar(0.30, 0.55);
      this.grosor = azar(0.7, 1.7);
      this.alfa = azar(0.10, 0.30);
    }

    // Profundidad: las de adelante van más rápido, más gruesas y más nítidas.
    // Es lo que impide que la cortina se lea como una sola lámina plana.
    this.z = azar(0.45, 1.40);
    this.v *= this.z;
    this.grosor *= this.z;
    // Exponente > 1: la caída de opacidad con la distancia ahora es mucho más
    // agresiva que un simple 1/z. Las gotas del fondo quedan casi como niebla,
    // que es lo que separa los planos de verdad.
    this.alfa /= Math.pow(this.z, 1.9);

    // El plano de fondo usa el sprite desenfocado (ver `SPRITES`); el de
    // adelante, el nítido. Decidirlo aquí y no por cuadro evita una rama y
    // una comparación por gota en el bucle de pintado.
    this.lejana = this.z < 0.80;

    // Cuánto brillo especular le toca. Las finas del velo casi no reflejan:
    // darles el mismo highlight que a las gordas las convierte en chispas.
    this.brillo = this.deBorde ? azar(0.55, 1.0) : azar(0.10, 0.35);

    this.y = dispersa ? azar(REGADERA.y, 1.1) : REGADERA.y - azar(0, 0.03);
    if (dispersa) this.v += GRAVEDAD * (this.y - REGADERA.y) * 0.5;

    // Deriva lateral mínima: el agua no cae en un riel perfecto.
    this.deriva = azar(-0.010, 0.010);

    // Turbulencia: además de la deriva constante, un vaivén propio. Con fase
    // y frecuencia distintas por gota el chorro deja de ser un peine de
    // líneas paralelas y empieza a "respirar". La amplitud es minúscula a
    // propósito — pasado cierto punto el agua se ve como serpentinas.
    this.tAmp = azar(0.0010, 0.0055);
    this.tFrec = azar(2.4, 6.8);
    this.tFase = azar(0, Math.PI * 2);
    this.t = 0;

    // Las gotas gordas se estiran un poco más que las finas al acelerar.
    this.estira = this.deBorde ? azar(0.048, 0.062) : azar(0.052, 0.070);
  }

  avanzar(dt) {
    this.t += dt;
    this.v += GRAVEDAD * dt;
    this.y += this.v * dt;
    // La turbulencia se aplica como velocidad, no como desplazamiento
    // absoluto: sumarla a la posición haría que la gota "saltara" de vuelta
    // al eje al reciclarse la fase.
    this.x += (this.deriva + this.tAmp * this.tFrec
      * Math.cos(this.t * this.tFrec + this.tFase)) * dt;
    // 1.15 y no 1.0: si se reciclaran justo en el borde, las gotas
    // desaparecerían a la vista en pantallas donde la foto se recorta poco.
    if (this.y > 1.15) { this.reiniciar(); return true; }
    return false;
  }
}

/**
 * Partícula de salpicadura. Pool fijo y reciclado, igual que las gotas: el
 * splash es un adorno, no puede costar asignaciones por cuadro. Si el pool
 * está lleno el impacto simplemente no genera nada — degrada en silencio en
 * vez de degradar el framerate.
 */
class Chispa {
  constructor() { this.vida = 0; }

  lanzar(x, y, fuerza) {
    this.x = x;
    this.y = y;
    // Abanico bajo y ancho: el agua al chocar rebota casi horizontal, no
    // hacia arriba como una fuente.
    this.vx = azar(-0.30, 0.30) * fuerza;
    this.vy = -azar(0.10, 0.42) * fuerza;
    this.r = azar(0.5, 1.5) * fuerza;
    this.vida = this.maxVida = azar(0.22, 0.46);
  }

  avanzar(dt) {
    if (this.vida <= 0) return;
    this.vida -= dt;
    this.vy += GRAVEDAD * 1.5 * dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vx *= 1 - 1.6 * dt; // el aire frena la salpicadura enseguida
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

  // ── LOS SPRITES ────────────────────────────────────────────────────────
  // Todo el "detalle milimétrico" de la gota (huso, cuerpo ámbar, especular
  // blanco desplazado) se pinta UNA vez aquí y luego se estira con
  // `drawImage`. Hacerlo por gota —gradientes, paths, `ctx.filter`— crearía
  // cientos de objetos por cuadro solo para tirarlos: cuesta ~20% más de CPU
  // y le deja basura que recoger al móvil en cada cuadro.
  //
  // El sprite se dibuja fila por fila con `fillRect` de 1px de alto. Son 256
  // rectángulos, una sola vez en toda la sesión: irrelevante. A cambio se
  // puede modular ancho, color y brillo con total libertad a lo largo del
  // recorrido, cosa que un `createLinearGradient` no permite.
  const SPR_W = 24, SPR_H = 256;

  function crearSprite() {
    const cv = document.createElement('canvas');
    cv.width = SPR_W;
    cv.height = SPR_H;
    const c = cv.getContext('2d');
    const cx = SPR_W / 2;
    const maxMedio = SPR_W / 2 - 1;

    for (let i = 0; i < SPR_H; i++) {
      const t = i / (SPR_H - 1); // 0 = cola (arriba), 1 = cabeza (abajo)

      // Perfil del huso. `sin(pi*t)^0.42` da una panza ancha y sostenida;
      // el segundo término la corre hacia abajo para que la punta fina quede
      // arriba (por donde la gota "viene estirándose") y la cabeza redonda
      // abajo — que es la asimetría real de una gota en caída.
      const base = Math.pow(Math.sin(Math.PI * (0.06 + t * 0.94)), 0.42);
      const cabeza = Math.pow(t, 2.2) * 0.34;
      const medio = Math.min(1, base * 0.86 + cabeza) * maxMedio;
      if (medio <= 0) continue;

      // Densidad del cuerpo: casi nula en la cola, plena en la cabeza. Es lo
      // que hace que el rastro se desvanezca hacia arriba sin un corte seco.
      const cuerpo = Math.pow(t, 1.35);

      // Cuerpo translúcido, ámbar cálido: refleja el cobre de la escena.
      // Nótese que el rojo va lleno y el azul se queda corto — esa diferencia
      // es todo el "ambiente" que necesita para no verse como agua de grifo.
      c.fillStyle = `rgba(255, ${Math.round(222 + 26 * cuerpo)}, ${Math.round(178 + 44 * cuerpo)}, ${(0.50 * cuerpo).toFixed(3)})`;
      c.fillRect(cx - medio, i, medio * 2, 1);

      // Borde de tensión superficial: el filo de la gota concentra luz.
      // Dos hilos de 1px, uno a cada lado, apenas más brillantes.
      c.fillStyle = `rgba(255, 240, 214, ${(0.28 * cuerpo).toFixed(3)})`;
      c.fillRect(cx - medio, i, 1, 1);
      c.fillRect(cx + medio - 1, i, 1, 1);
    }

    // ── ESPECULAR ────────────────────────────────────────────────────────
    // Se pinta después y encima, en una pasada aparte, para que no lo tape
    // ninguna fila del cuerpo. Va DESPLAZADO del eje (a la izquierda, hacia
    // donde entra la luz en la foto) y no cubre toda la altura: un reflejo
    // que recorre la gota entera se lee como tubo de neón, no como agua.
    for (let i = 0; i < SPR_H; i++) {
      const t = i / (SPR_H - 1);
      if (t < 0.30) continue;
      // Ventana suave entre t=0.30 y t=1: máxima sobre la panza-cabeza.
      const u = (t - 0.30) / 0.70;
      const fuerza = Math.pow(Math.sin(Math.PI * u), 1.5);
      if (fuerza < 0.02) continue;
      const base = Math.pow(Math.sin(Math.PI * (0.06 + t * 0.94)), 0.42);
      const medio = Math.min(1, base * 0.86 + Math.pow(t, 2.2) * 0.34) * (SPR_W / 2 - 1);
      const ancho = Math.max(1, medio * 0.34);
      const eje = SPR_W / 2 - medio * 0.38; // luz desde arriba-izquierda
      c.fillStyle = `rgba(255, 255, 255, ${(0.85 * fuerza).toFixed(3)})`;
      c.fillRect(eje - ancho / 2, i, ancho, 1);
    }

    // Punto caliente en la cabeza: el reflejo duro de la fuente de luz sobre
    // la esfera del extremo. Es el detalle que "cierra" la lectura de agua.
    const yCab = SPR_H * 0.90;
    const rCab = SPR_W * 0.13;
    const gc = c.createRadialGradient(SPR_W / 2 - rCab * 0.5, yCab, 0,
                                      SPR_W / 2 - rCab * 0.5, yCab, rCab * 2.2);
    gc.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    gc.addColorStop(0.45, 'rgba(255, 248, 232, 0.35)');
    gc.addColorStop(1, 'rgba(255, 240, 214, 0)');
    c.fillStyle = gc;
    c.fillRect(0, yCab - rCab * 2.4, SPR_W, rCab * 4.8);

    return cv;
  }

  /**
   * Copia desenfocada del sprite, para el plano de fondo. `ctx.filter` es
   * carísimo por cuadro pero gratis una sola vez: aquí se paga el blur una
   * vez y después las gotas lejanas salen fuera de foco sin costo alguno.
   * Es profundidad de campo de verdad, no solo menos opacidad.
   */
  function desenfocar(origen) {
    const cv = document.createElement('canvas');
    cv.width = SPR_W;
    cv.height = SPR_H;
    const c = cv.getContext('2d');
    if ('filter' in c) c.filter = 'blur(2.2px)';
    c.drawImage(origen, 0, 0);
    return cv;
  }

  const SPRITES = { cerca: crearSprite() };
  SPRITES.lejos = desenfocar(SPRITES.cerca);

  // Menos gotas en pantallas chicas: es donde más barato tiene que salir el
  // cuadro y donde menos se nota la densidad.
  const movil = window.innerWidth < 640;
  const cantidad = movil ? 170 : 320;
  const gotas = Array.from({ length: cantidad }, () => new Gota());

  // Pool de salpicadura, dimensionado para el peor caso razonable. Se llena
  // solo con impactos de gota gorda (las del velo no salpican visiblemente).
  const chispas = Array.from({ length: movil ? 24 : 48 }, () => new Chispa());
  let cursorChispa = 0;

  function salpicar(x, fuerza) {
    // Ráfaga corta: 2-3 chispas por impacto. Más que eso y el pie del chorro
    // se convierte en espuma, que es justo lo que no se ve en la foto.
    const n = 2 + (Math.random() < 0.5 ? 1 : 0);
    for (let i = 0; i < n; i++) {
      const c = chispas[cursorChispa];
      cursorChispa = (cursorChispa + 1) % chispas.length;
      if (c.vida > 0) continue; // pool ocupado: se omite, no se encola
      c.lanzar(x + azar(-0.004, 0.004), IMPACTO, fuerza);
    }
  }

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

    for (const g of gotas) {
      const yAntes = g.y;
      g.avanzar(dt);

      // Impacto: cruzó la línea de suelo en este cuadro. Se comprueba con el
      // "antes y después" en vez de con un rango, porque a alta velocidad la
      // gota puede saltarse la línea entera en un solo paso de integración.
      if (g.deBorde && yAntes <= IMPACTO && g.y > IMPACTO) {
        salpicar(g.x, Math.min(1.2, g.v * 0.55) * g.z);
      }

      const px = aPantallaX(g.x);
      const py = aPantallaY(g.y);
      // El rastro ES la velocidad: así se estira sola al acelerar, que es
      // justo lo que hace una gota real ante un obturador lento.
      const largo = g.v * medir.altoFoto * g.estira;
      const y0 = py - largo;

      if (py < despY || y0 > altoCss) continue;

      // Entra desvaneciéndose bajo el ala: el agua no aparece de golpe, sale
      // de la sombra del cono.
      const asomo = Math.min(1, (g.y - REGADERA.y) / 0.05);

      // El sprite se estira más ancho que el grosor nominal porque el huso
      // solo ocupa de verdad el centro del bitmap; el resto es el margen que
      // deja el blur del plano de fondo sin recortarse.
      const ancho = g.grosor * 2.2;

      ctx.globalAlpha = g.alfa * asomo;
      ctx.drawImage(g.lejana ? SPRITES.lejos : SPRITES.cerca,
                    px - ancho / 2, y0, ancho, largo);

      // Realce especular extra en las gordas del primer plano: un punto duro
      // sobre la cabeza, desplazado hacia la luz. Es un solo `fillRect` — un
      // arco con `beginPath` por gota costaría bastante más.
      if (g.deBorde && !g.lejana) {
        ctx.globalAlpha = Math.min(1, g.alfa * asomo * g.brillo * 1.6);
        ctx.fillStyle = '#fff';
        const r = Math.max(0.6, g.grosor * 0.30);
        ctx.fillRect(px - g.grosor * 0.30 - r / 2, py - g.grosor * 0.75, r, r * 1.4);
      }
    }

    // ── SALPICADURA ──────────────────────────────────────────────────────
    // Se pinta al final para que quede sobre el chorro. Cada chispa es un
    // `fillRect` diminuto; con el pool tope de 48 el costo es despreciable.
    ctx.fillStyle = 'rgba(255, 246, 228, 1)';
    for (const c of chispas) {
      if (c.vida <= 0) continue;
      c.avanzar(dt);
      if (c.vida <= 0) continue;
      const px = aPantallaX(c.x);
      const py = aPantallaY(c.y);
      if (py < despY || py > altoCss) continue;
      const k = c.vida / c.maxVida;
      ctx.globalAlpha = 0.55 * k * k;
      const s = Math.max(0.7, c.r * k);
      ctx.fillRect(px - s / 2, py - s / 2, s, s);
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
