# Pendientes del sitio · Accesorios en Cobre (Rafael Silva)

Todo lo que falta, ordenado por lo que más bloquea.
Cada punto dice **dónde se llena** en el código.

> El sitio ya funciona con lo que hay. **Desde el 20-ago-2026, a pedido del
> cliente, ningún dato faltante se muestra en la página pública**: los campos
> pendientes de Envíos, Pagos y Políticas se retiraron de `datos.js` y el
> aviso "por confirmar" del Arco Colonial se retiró de `catalogo.js`. Lo que
> falta ya NO estorba a la vista — por eso **este archivo es ahora la única
> lista viva de lo que hay que preguntarle a Rafael**. El mecanismo
> `PENDIENTE()`/`EJEMPLO()` sigue existiendo en el código por si un dato
> nuevo tiene que enseñarse marcado antes de confirmarse.

**Dos marcas distintas en el código:**
- `PENDIENTE('…')` — el dato no existe. Sale en ámbar y no se inventa nada.
- `EJEMPLO('valor', '…')` — hay un valor **falso de muestra** puesto a propósito
  para ver el sitio terminado. Sale rotulado como EJEMPLO **siempre**, incluso
  con `?limpio`, y nunca genera un enlace real. Reemplazar en cuanto llegue el
  dato de verdad.

---

## 🔴 Bloquea la publicación real

### 0. Confirmar con Rafael si varias fotos son renders o IA
**Dónde:** `catalogo.js` → `fotos` de los tres grifos y dos duchas.
Al integrar el lote de fotos del drive (16-ago-2026) se revisó imagen por
imagen. **Las 11 fotos de grifos** (Cuello de Cisne, Grifo de Arco, Grifo de
Muro) y dos de duchas (`arco-colonial-doble-03-set`,
`tradicion-centenaria-07-med-altura`) tienen aspecto de render 3D o de imagen
generada: luz y texturas demasiado perfectas, chorros de agua idealizados,
decorados genéricos.

Están integradas porque se pidió procesar todo el material. Antes hay que
preguntarle a Rafael si son fotografías de piezas suyas o imágenes de
referencia. Un sitio que vende "artesanal, hecho a mano, 14 años a la
intemperie" no puede ilustrarse con renders: es el riesgo reputacional más
grande del proyecto. Enlaza con el punto ya abierto sobre las dos duchas
sospechosas del `PLAN_PENDIENTES_TOTAL.md` (sección 1.3).

**Actualización 20-ago-2026:** el cliente eligió `grifo-de-muro-05-limpia`
como **portada de la categoría Grifos** (la posición más visible del sitio
después del héroe) y ya está publicada por orden suya. Confirmar con Rafael
sube de urgencia. La portada de Duchas y la de Toalleros sí son fotografía
real verificada.

### 1. Contacto — resuelto (20-ago-2026)
**Dónde:** `datos.js` → objeto `NEGOCIO`.
Ya son reales y enlazan: WhatsApp (`573213485046`), correo
(`rafaelsilvagomez@gmail.com`) e **Instagram (`@accesorios_en_cobre`**, del
link que mandó el cliente). **Facebook se quitó del sitio a pedido del
cliente** ("quita facebook y pon instagram"). El teléfono fijo y la
dirección se retiraron antes (venta 100% virtual). La línea de origen
cambió a **"Se fabrica en Bucaramanga, Santander"** — dato nuevo del
cliente; la historia de Rafael empezó en Barichara (su bio literal no se
tocó: son dos hechos distintos y compatibles).

### 2. Precio del Grifo de Arco
**Dónde:** `catalogo.js` → `grifo-de-arco`, campo `precio`.
**El producto entero está retirado temporalmente del sitio** (18-ago-2026, a
pedido del cliente): quedó comentado en el código. Cuando vuelva, sigue sin
precio.

### 3. Material declarado
**Dónde:** `catalogo.js` → campo `material`.
**Ninguna ficha técnica dice de qué material es la pieza.** El cobre solo se
deduce de las fotos. Para publicar hace falta la declaración real: ¿cobre puro?
¿calibre? ¿acabado natural o con protección?

---

## 🟡 Importante, no bloquea

### 4. Garantía, tratamiento de datos y cambios/devoluciones
**Dónde:** iban en `datos.js` → `POLITICAS`; **retirados del sitio el
20-ago-2026 a pedido del cliente** (ya no aparecen ni como pendiente).
Rafael dijo que los tiene que pensar después. No se redacta nada hasta que
los defina. Siguen faltando de verdad: garantía de las piezas, política de
cambios y devoluciones (plazos, condiciones, quién paga el envío) y
tratamiento de datos personales. Cuando lleguen, se agregan los campos de
vuelta en `POLITICAS` y `pintarCompra()` los muestra solo.

### 5. Costo de los envíos
**Dónde:** iban en `datos.js` → `ENVIOS` (`costoTipo`, `tarifas`,
`envioGratisDesde`); **retirados del sitio el 20-ago-2026 a pedido del
cliente**. Ya está publicado que es nacional, tercerizado (Servientrega o
Interrapidísimo), con 15–20 días de producción y número de guía. Sigue
faltando de verdad: cuánto cuesta el envío (¿fijo o variable?, tarifas) y
si hay monto de envío gratis.

### 6. Datos técnicos que faltan en casi todas las fichas
**Dónde:** `catalogo.js` → `valvula`, `incluye`, y `medidas`.

Las fichas del cliente solo traen cotas. No dicen:
- Tipo de válvula (cerámica, compresión, marca)
- Diámetro de la tubería
- Qué incluye el kit (¿tornillería? ¿abrazaderas?)

**Excepción:** el Arco Colonial sí tiene ficha completa (240 cm de alto,
regadera de 24 cm, tubería de 5/8", válvula Grival, 4 abrazaderas).

**Actualización 20-ago-2026:** por pedido del cliente, el diámetro de
tubería (5/8") de esa ficha también se publicó en Tradición Centenaria,
Grifo Cuello de Cisne y Grifo de Muro, como dato confirmado — no viene de
una medición propia de esas piezas, sino de asumir el mismo calibre en
toda la línea. Si Rafael usa un calibre distinto en alguna, corregir ahí.

### 7. Medidas que faltan por modelo

| Pieza | Lo que hay | Lo que falta |
|---|---|---|
| Arco Colonial | completo ✓ | — |
| Tradición Centenaria | proyección 50 cm | altura, diámetro de regadera y tubería |
| Cuello de Cisne | alto 38, alcance 20 | diámetro de tubería |
| Grifo de Muro | alcance 26 | altura, diámetro |
| Grifo de Arco | ancho total 26 | altura, alcance real |
| Toallero Tradicional | largo 41 | diámetro del tubo |
| Toallero Ovalado | 24 × 17 | diámetro del tubo, saliente |
| Toallero de Punto | saliente 8 | alto, diámetro |
| Porta Papel | 11 × 8 | diámetro del tubo |

### 7b. Dos piezas del drive que hoy no tienen producto propio
Salieron al integrar el lote del 16-ago-2026 y ya están procesadas en `img/`,
listas para usarse en cuanto Rafael defina qué son:

- **`grifo-de-arco-mezclador-01/02/03`** — grifo de arco con **dos** llaves en
  vez de una. Rafael lo guarda en la misma carpeta que el de una llave, pero es
  otra pieza. Hoy están dentro de `grifo-de-arco` marcadas como variante en el
  pie de foto. Falta saber si se vende aparte y a qué precio.
- **`mezclador-cuerpo-01`** — el cuerpo mezclador de dos llaves suelto, en latón
  sin acabado. **No está referenciado en el catálogo**, solo procesado. Podría
  ser el "Mezclador Grival $140.000" que quedó sin resolver (ver nota interna en
  la cabecera de `catalogo.js`). Confirmar antes de crearle entrada.

### 7c. Fotos integradas con reserva de calidad
Van al final de la galería de su pieza para que no la encabecen. Si Rafael manda
mejores tomas de esos mismos ambientes, se reemplazan sin tocar nada más:
- `tradicion-centenaria-06-nicho` — vira fuerte a naranja, falsea el color del cobre.
- `tradicion-centenaria-08-bano-beige` — foco blando.
- `porta-papel-03-nicho` — tomada con celular, pared manchada, encuadre torcido.

También quedó pendiente pedirle a Rafael las **versiones sin rótulo** de las
fotos que hoy solo existen con texto quemado (`arco-colonial-doble-02-med`,
`grifo-de-arco-mezclador-01-rotulo`).

### 8. Tres cosas por confirmar con Rafael
1. **¿"Modelo Arco" y "Arco Colonial" son la misma pieza?** La única ficha
   completa se titula "Modelo Arco"; le asignamos sus medidas al Arco Colonial.
   El aviso ámbar que lo decía en la ficha pública **se retiró el 20-ago-2026
   a pedido del cliente** — la duda sigue abierta, pero solo aquí.
2. **Tradición Centenaria parece tener dos variantes.** La ficha cota 50 cm
   sobre una versión de **pared con regadera plana**, pero las fotos muestran
   una **columna con regadera cónica**. ¿Son dos productos? Además: el precio
   de $450.000 es solo el cuerpo + regadera; falta confirmar con cuántas
   manijas se instala de serie (en las fotos aparecen 2, a $90.000 c/u).
3. **Grifo de Arco: los 26 cm no son alcance.** Van de la punta de la boca al
   eje de la llave, o sea el ancho total del conjunto. Confirmar antes de publicar.

### 9. El Mezclador Grival ($140.000)
Rafael lo dio en la lista de precios pero no existe como pieza del catálogo: no
hay foto ni ficha. Falta saber si es una pieza suelta que se vende aparte o si
es el sobrecosto de la versión doble del Arco Colonial. Queda anotado como
comentario en `catalogo.js`, sin ficha propia.

---

## 📷 Fotos

### 10. La foto del torno — falta
El texto existe ("Los escudos y regaderas se trabajan en un torno, para lograr
un acabado preciso y uniforme") pero **el archivo que se recibió no corresponde**:
es una ducha instalada en un baño, no un torno. La sección TALLER quedó con
3 fotos (soldadura, elaboración de manijas, manijas terminadas) y su texto no
menciona el torneado.

### 11. Dos fotos sin confirmar
`WhatsApp Image 2026-08-09 at 21.02.05.jpeg` (ducha sobre muro de troncos) y
`WhatsApp Image 2026-08-10 at 04.15.08.jpeg` (ducha con vista a montaña) tienen
pinta de render o stock. **No se publican** hasta saber si son trabajo real de
Rafael o referencias de inspiración. Misma duda sobre la ducha en baño de piedra
del punto 10.

### 12. Foto de Rafael — resuelto (20-ago-2026)
**Dónde:** `datos.js` → `ARTESANO.foto`.
Publicada: el retrato sale de la lámina "Tradición Centenaria" del propio
taller (`rafael.jpeg`), que lo presenta con su nota manuscrita — esa nota
también se publicó, literal, en la sección del artesano. La sección quedó con
retrato central + 3 fotos satélite del oficio.

### 13. Otras observaciones de fotos
- Tres fichas de grifos son **capturas de pantalla de Google Fotos** con la
  interfaz encima: sirven para leer la medida, no para publicar.
- El Toallero Tradicional aparece con **dos acabados distintos** (espejo y
  satinado). ¿Son dos acabados o solo diferencia de luz?

---

## 🟢 Más adelante

### 14. Pasarela de pagos
Rafael quiere Wompi pero todavía no está activa. El campo `PAGOS.pasarela`
(que salía como pendiente en el bloque de Pagos) **se retiró del sitio el
20-ago-2026 a pedido del cliente**. Mientras tanto el sitio cierra la venta
por WhatsApp, que es lo correcto para empezar. Hoy se paga con 50% de
anticipo (Bancolombia ahorros o Nequi) y 50% contra envío. En el bloque de
Pagos ahora aparecen las marcas Bancolombia y Nequi como glifos de trazo
propio (igual que Servientrega e Interrapidísimo en Envíos); si Rafael pide
los logos oficiales a color, se reemplazan en `MARCAS` de `app.js`.

### 15. Punto físico
`TALLER.puntoFisico.existe` está en `false`: la venta es 100% virtual. Si algún
día hay showroom, se activa ahí con dirección, horario y fotos.


### 16. Lo que salió del lote "Fotos extra" (24-ago-2026)
Al integrar las 174 fotos de ese zip aparecieron cosas que no estaban en el
catálogo y que hay que consultarle a Rafael:

- **Dos nombres de modelo nuevos.** Una lámina dice **"Camino Real"** con una
  cota de 50 cm de proyección, y otra **"Ducha, piscina, sencilla"**. Ninguno
  existe como producto en `catalogo.js`. ¿Son modelos vigentes, nombres
  viejos de piezas que ya están, o versiones de las que sí están?
- **Una lámina compara "Ducha con mezclador" contra "Ducha sencilla"**: sirve
  para explicar la diferencia de precio, si Rafael confirma que corresponde a
  las versiones que hoy se venden.
- **Medidas que aparecen impresas en foto** y que conviene confirmar antes de
  publicarlas como dato: 25 cm entre centros de las dos salidas de un
  lavamanos, y 26 cm de alcance en un grifo de muro (coincide con la medida
  que ya tiene el Grifo de Muro en el catálogo).
- **La tarjeta de presentación del taller dice "Bucaramanga · Colombia"**, lo
  que respalda el cambio de ciudad que ya se publicó (ver punto 1).

De ese lote se publicaron 84 fotos en la nueva página `galeria.html`. Se
dejaron fuera 14 a propósito: 3 capturas de pantalla de WhatsApp, 4 fotos de
empaques de cartuchos Grival (repuesto de proveedor, no pieza de Rafael),
4 copias exactas de otras y 3 tarjetas de marca con el teléfono impreso. Las
74 restantes del zip ya estaban publicadas en el sitio.

**Sobre la duda de renders/IA del punto 0:** de las 98 fotos inéditas, solo 16
tenían proporciones típicas de generador de imagen, y casi todas eran las
láminas de marca diseñadas (Arco Colonial, Serie Artesanal, la tarjeta de
presentación), no los ambientes. No prueba nada en ninguna dirección, pero la
sospecha sobre los ambientes no se agrava con este lote.

---

## Cómo llenar un dato

En `datos.js` y `catalogo.js`, reemplaza la marca por el texto real:

```js
whatsapp: EJEMPLO('+57 300 000 0000', 'el número real de WhatsApp'),  // antes
whatsapp: "573001234567",                                              // después
```

Lo mismo con `PENDIENTE('…')`. Para activar una sección completa, pon su
`visible: true`.
