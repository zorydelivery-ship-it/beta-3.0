# Zori Delivery · app de pedidos

Diseño estilo app de pedidos, en el naranja del zorro (`#F85800`). Todo se arma solo desde tu Google Sheets.

## Archivos (todos en la raíz del repo, junto a `index.html`)
| Archivo | Qué hace |
|---|---|
| `index.html` | Inicio: ciudad, buscador, categorías, promos, "Los más pedidos" y locales. |
| `locales.html` | Listado de locales con buscador y filtros por categoría. |
| `local.html` | UNA página para todos los locales (`local.html?id=bacoa`): portada, menú por categorías, buscador, carrito. |
| `app.js` | Toda la lógica (Sheets/CSV, carrito, pedido a WhatsApp, Firebase). Arriba está `ZORI_CONFIG`. |
| `zori-app.css` | Todo el diseño. El color de marca está en `--zori-orange`. |
| `manifest.webmanifest`, `sw.js`, `icon-*.png` | Hacen que se pueda **instalar como app** en el celular. |
| `locales.csv`, `productos.csv` | Respaldo si Google Sheets no responde. |
| `css.css`, `bodega.html`, `supermercados.html`, `Farmacias.html`, `ruleta.html`, `js.js` | Siguen igual, solo con el naranja unificado. |

## Cómo actualizar precios / productos / imágenes (Google Sheets)
La hoja ya está conectada (`SHEET_ID` en `app.js`). Editás la hoja y la web se actualiza sola (hasta 5 minutos por la caché del navegador). Si la hoja falla, usa los CSV.

- **Pestaña `Locales`**: `id, nombre, categoria, destacado, logo, banner, whatsapp, ciudad, activo, horario`
- **Pestaña `Productos`**: `local, categoria, nombre, descripcion, precio, variantes, imagen, disponible, nombre_pedido`
- `variantes` se escribe así: `Personal:25000|Fam. sin borde:45000`
- `destacado = si` → el local sale en "Los más pedidos" del inicio.
- Imágenes: subí el archivo al repo y escribí solo el nombre en la hoja (`carnivora.jpg`), o pegá un link `https://...`.

### Columnas opcionales en `Locales` (si las agregás, aparecen solas en las tarjetas)
- `tiempo` → ej. `25-35 min`
- `envio` → ej. `Gs. 5.000` o `Gratis`
- `calificacion` → ej. `4.8`

## Instalar como app
- **Android (Chrome):** aparece un botón de descarga arriba en el inicio, o menú ⋮ → "Instalar app".
- **iPhone (Safari):** Compartir → "Agregar a pantalla de inicio".
- Necesita que el sitio esté en `https` (GitHub Pages ya lo está).
- Si algún día cambiás mucho el sitio y alguien ve una versión vieja, subí el número `VERSION` en `sw.js`.

## Notas
- El carrito se guarda en el celular por local; sigue ahí aunque cierren la app.
- Los pedidos se guardan en Firestore (colección `pedidos`) y se abren en WhatsApp; ahora incluyen el campo opcional "Comentarios".
- Las fotos con link `images.unsplash.com` son de ejemplo: conviene reemplazarlas por fotos reales.
- Falta la imagen de El Rey Pelé (`el-rey-pele`): mientras tanto muestra el zorro de Zori.
- Todavía no hay inicio de sesión de usuarios (Firebase Authentication): es el siguiente paso.
