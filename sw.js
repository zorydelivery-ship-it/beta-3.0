/* Zori Delivery · service worker
 * - Páginas, JS y CSS: primero la red (siempre ves la última versión) y, si no hay internet, lo guardado.
 * - Imágenes: primero lo guardado (rápido) y se actualizan en segundo plano.
 * - Google Sheets y Firebase NO pasan por acá (los datos ya se guardan 5 min en el navegador).
 * Si algún día cambiás mucho el sitio, subí el número de VERSION para limpiar lo guardado.
 */
const VERSION = "zori-v1";
const SHELL = [
  "index.html", "locales.html", "local.html", "zori-app.css", "app.js",
  "logo%20png.png", "manifest.webmanifest", "icon-192.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => Promise.allSettled(SHELL.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // Sheets, Firebase, fuentes, etc.

  const esImagen = /\.(png|jpe?g|webp|gif|svg|ico)$/i.test(url.pathname);
  if (esImagen) {
    e.respondWith(
      caches.open(VERSION).then(async (c) => {
        const guardado = await c.match(req);
        const red = fetch(req).then((r) => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => guardado);
        return guardado || red;
      })
    );
    return;
  }

  e.respondWith(
    fetch(req)
      .then((r) => {
        if (r.ok) { const copia = r.clone(); caches.open(VERSION).then((c) => c.put(req, copia)); }
        return r;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match("index.html")))
  );
});
