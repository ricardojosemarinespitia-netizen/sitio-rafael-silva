# Pendientes del sitio · Rafael Silva

Todo lo que falta para publicar, ordenado por lo que más bloquea.
Cada punto dice **dónde se llena** en el código.

> El sitio ya funciona con lo que hay. Los datos que faltan salen marcados en
> ámbar sobre la propia página, así que se ve de un vistazo qué queda.
> Para ver cómo quedará terminado (sin las marcas), abre el sitio con `?limpio`
> al final de la URL.

---

## 🔴 Bloquea la publicación

### 1. Precios de las 10 piezas
**Dónde:** `catalogo.js` → campo `precio` de cada producto.
No hay ni un precio en todo el material recibido. Sin esto el catálogo no
puede funcionar como catálogo.

| Pieza | Precio |
|---|---|
| Arco Colonial | |
| Camino Real | |
| Tradición Centenaria | |
| Grifo Cuello de Cisne | |
| Grifo de Muro | |
| Grifo de Arco | |
| Toallero Tradicional | |
| Toallero Ovalado | |
| Toallero de Punto | |
| Porta Papel | |

### 2. Datos de contacto
**Dónde:** `datos.js` → objeto `NEGOCIO`.
- Nombre comercial exacto (¿es "Rafael Silva"? ¿hay otra marca?)
- WhatsApp con indicativo (ej. `573001234567`)
- Correo del comercio
- Ciudad y departamento
- Dominio: ¿ya lo tienen o hay que comprarlo?

Sin el WhatsApp, el botón de pedido queda desactivado en todas las fichas.

### 3. Material declarado
**Dónde:** `catalogo.js` → campo `material`.
**Ninguna ficha técnica dice de qué material es la pieza.** El cobre solo se
deduce de las fotos. Para publicar hace falta la declaración real: ¿cobre puro?
¿calibre? ¿acabado natural o con protección?

---

## 🟡 Importante, no bloquea

### 4. Datos técnicos que faltan en TODAS las fichas
**Dónde:** `catalogo.js` → `valvula`, `incluye`, y `medidas`.

Las fichas del cliente solo traen cotas. No dicen:
- Tipo de válvula (cerámica, compresión, marca)
- Diámetro de la tubería
- Qué incluye el kit (¿tornillería? ¿abrazaderas?)

**Excepción:** el Arco Colonial sí tiene ficha completa (240 cm de alto,
regadera de 24 cm, tubería de 5/8", válvula Grival, 4 abrazaderas).

### 5. Medidas que faltan por modelo

| Pieza | Lo que hay | Lo que falta |
|---|---|---|
| Arco Colonial | completo ✓ | — |
| Camino Real | **nada** | todas las medidas |
| Tradición Centenaria | proyección 50 cm | altura, diámetro de regadera y tubería |
| Cuello de Cisne | alto 38, alcance 20 | diámetro de tubería |
| Grifo de Muro | alcance 26 | altura, diámetro |
| Grifo de Arco | ancho total 26 | altura, alcance real |
| Toallero Tradicional | largo 41 | diámetro del tubo |
| Toallero Ovalado | 24 × 17 | diámetro del tubo, saliente |
| Toallero de Punto | saliente 8 | alto, diámetro |
| Porta Papel | 11 × 8 | diámetro del tubo |

### 6. Tres cosas por confirmar con Rafael
1. **¿"Modelo Arco" y "Arco Colonial" son la misma pieza?** La única ficha
   completa se titula "Modelo Arco"; le asignamos sus medidas al Arco Colonial.
2. **Tradición Centenaria parece tener dos variantes.** La ficha cota 50 cm
   sobre una versión de **pared con regadera plana**, pero las fotos muestran
   una **columna con regadera cónica**. ¿Son dos productos?
3. **Grifo de Arco: los 26 cm no son alcance.** Van de la punta de la boca al
   eje de la llave, o sea el ancho total del conjunto. Confirmar antes de publicar.

### 7. Fotos que faltan o están mal
- **Grifo de Arco no tiene ninguna foto de producto** (solo fichas con medidas).
- En `GRIFO DE MURO/` hay una foto (`Copia de c3a1b802…`) que **no es ese
  producto**: es un mezclador de muro de 3 piezas. ¿Es un modelo aparte que
  falta en el catálogo?
- Tres fichas de grifos son **capturas de pantalla de Google Fotos** con la
  interfaz encima: sirven para leer la medida, no para publicar.
- El Toallero Tradicional aparece con **dos acabados distintos** (espejo y
  satinado). ¿Son dos acabados o solo diferencia de luz?

---

## 🟢 Contenido que enriquece el sitio

Las secciones ya están creadas y aparecerán solas cuando se llene la
información. Se activan poniendo `visible: true` en `datos.js`.

### 8. El taller y el proceso · `TALLER`
Cómo se dobla, suelda y pule cada pieza. **Fotos del taller trabajando.**
Es lo que justifica el precio de una pieza artesanal.

### 9. La historia de la intemperie · `DURABILIDAD`
Lo que pediste desde el principio y sigue siendo el mejor argumento de venta:
- ¿Cuántos años lleva instalada la ducha más antigua?
- ¿En qué clima?
- **Foto de recién instalada + foto de la misma hoy, con pátina.**

### 10. La persona · `ARTESANO`
Nombre, rol, años de oficio, y una foto trabajando. Una marca artesanal sin
cara detrás pierde la mitad de su fuerza.

### 11. Envíos · `ENVIOS`
Cobertura, tiempos, si el costo es fijo o variable (por distancia, cantidad o
valor), y si hay envío gratis desde algún monto.

### 12. Políticas · `POLITICAS`
Cambios y devoluciones, garantía, responsabilidad en el envío, tratamiento de
datos.

### 13. Punto físico · `TALLER.puntoFisico`
¿Hay showroom? Dirección, horario y fotos.

### 14. Pagos · `PAGOS`
¿Tienen pasarela registrada (Wompi, PayU, Mercado Pago)? Mientras no la haya,
el sitio cierra la venta por WhatsApp, que es lo correcto para empezar.

### 15. Redes
Instagram y Facebook, y si quieren que aparezcan enlazadas.
Hoy están en `mostrarRedes: false`.

---

## Cómo llenar un dato

En `datos.js` y `catalogo.js`, reemplaza la marca por el texto real:

```js
whatsapp: PENDIENTE('número de WhatsApp con indicativo'),   // antes
whatsapp: "573001234567",                                    // después
```

Para activar una sección completa, pon su `visible: true`.
