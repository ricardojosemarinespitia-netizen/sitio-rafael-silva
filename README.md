# Sitio · Rafael Silva — duchas y grifería en cobre

Catálogo de piezas artesanales en cobre: duchas, grifos, toalleros y accesorios.

**En vivo:** https://ricardojosemarinespitia-netizen.github.io/sitio-rafael-silva/

Para verlo sin las marcas de datos pendientes (versión para enseñar al cliente):
https://ricardojosemarinespitia-netizen.github.io/sitio-rafael-silva/?limpio

---

## Estado

El sitio funciona con la información disponible. Lo que aún falta aparece
marcado en ámbar sobre la propia página, y está listado en
[PENDIENTES.md](PENDIENTES.md).

Lo que bloquea la publicación definitiva: **precios** (no hay ninguno en el
material recibido), **datos de contacto** y el **material declarado** de las
piezas.

## Cómo se edita

Todo el contenido vive en dos archivos. El HTML no lleva textos ni rutas de
foto escritas a mano.

| Archivo | Qué contiene |
|---|---|
| `datos.js` | Negocio, contacto, taller, envíos, políticas |
| `catalogo.js` | Las 10 piezas con sus medidas reales |

Para llenar un dato, reemplaza la marca por el texto:

```js
whatsapp: PENDIENTE('número de WhatsApp con indicativo'),   // antes
whatsapp: "573001234567",                                    // después
```

Para activar una sección completa, pon su `visible: true`.

## Estructura

```
├── index.html      catálogo
├── producto.html   ficha de pieza (?id=arco-colonial)
├── datos.js        contenido del negocio
├── catalogo.js     las 10 piezas
├── tokens.css      sistema de diseño (colores, escala, espaciado)
├── estilo.css      componentes
├── app.js          arma la página desde los datos
└── img/            fotos en AVIF + WebP + JPG, 3 anchos
```

## Verificado

| | index (móvil) | ficha de producto |
|---|---|---|
| WCAG 2.1 AA (axe-core) | 0 violaciones | 0 violaciones |
| Escala tipográfica | 8 tamaños | 4 tamaños |
| Áreas táctiles | todas ≥ 44px | todas ≥ 44px |
| Desborde horizontal | ninguno | ninguno |

Fotos optimizadas: 67 MB → 16 MB servidos (−76%).

## Desarrollo local

```bash
npx -y http-server . -p 8795 -c-1
```

Hace falta servidor: los módulos ES no cargan abriendo el archivo directamente.
