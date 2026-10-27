/* Zori Delivery · app.js
 * Datos (Google Sheets o CSV) + inicio, listado de locales, página de local, carrito y pedido por WhatsApp.
 * Lo único que normalmente se toca es ZORI_CONFIG.
 */
const ZORI_CONFIG = {
  // Pegá acá el ID de tu Google Sheet (lo que está entre /d/ y /edit en la URL).
  // Vacío = usa los archivos locales.csv y productos.csv del sitio.
  SHEET_ID: "1SykSOH61COs6gVVO1yLHw69l074qPx6eSABYk3xfcF8",
  // Nombres de las pestañas en la hoja de Google
  TAB_LOCALES: "Locales",
  TAB_PRODUCTOS: "Productos",
  // Minutos que se guardan los datos en el navegador antes de volver a pedirlos
  CACHE_MIN: 5,
  WHATSAPP_DEFAULT: "595982309464",
  FIREBASE: {
    apiKey: "AIzaSyCoIVVXK3csLvtg9E7wDCjGt--fam_szzQ",
    authDomain: "admin-de-zory.firebaseapp.com",
    projectId: "admin-de-zory",
    storageBucket: "admin-de-zory.firebasestorage.app",
    messagingSenderId: "199468715480",
    appId: "1:199468715480:web:2a7a188258237c0b5db6ad",
    measurementId: "G-WKGL0G4WK4",
  },
};

/* ---------- utilidades ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const gs = (n) => "Gs. " + Number(n).toLocaleString("es-PY");
const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const si = (v) => !["no", "n", "0", "false", "agotado"].includes(norm(v));
const LOGO = "logo png.png"; // el zorro de Zori

function imgUrl(v) {
  v = String(v || "").trim();
  if (!v) return "";
  if (/^(https?:)?\/\//.test(v) || v.startsWith("data:")) return v;
  return encodeURI(v);
}

// Si una foto no carga, se muestra el zorro de Zori en su lugar
window.zph = () => {
  const d = document.createElement("div");
  d.className = "zph";
  d.innerHTML = `<img src="${LOGO}" alt="">`;
  return d;
};

/* ---------- CSV ---------- */
function parseCSV(text) {
  const rows = [];
  let row = [], cur = "", q = false;
  text = text.replace(/^﻿/, "");
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cur); cur = "";
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
    } else cur += c;
  }
  row.push(cur);
  if (row.some((x) => x.trim() !== "")) rows.push(row);
  if (!rows.length) return [];
  const head = rows[0].map((h) => norm(h).replace(/\s+/g, "_"));
  return rows.slice(1).map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] ?? "").trim()])));
}

/* ---------- carga de datos ---------- */
async function fetchCSV(url) {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error("HTTP " + r.status);
  return parseCSV(await r.text());
}

async function cargarDatos() {
  const KEY = "zori-datos-v2";
  const ahora = Date.now();
  let cache = null;
  try { cache = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}
  if (cache && ahora - cache.t < ZORI_CONFIG.CACHE_MIN * 60000 && cache.fuente === (ZORI_CONFIG.SHEET_ID || "local")) {
    return cache.d;
  }
  let datos;
  try {
    if (ZORI_CONFIG.SHEET_ID) {
      const base = `https://docs.google.com/spreadsheets/d/${ZORI_CONFIG.SHEET_ID}/gviz/tq?tqx=out:csv&headers=1&sheet=`;
      const [l, p] = await Promise.all([
        fetchCSV(base + encodeURIComponent(ZORI_CONFIG.TAB_LOCALES)),
        fetchCSV(base + encodeURIComponent(ZORI_CONFIG.TAB_PRODUCTOS)),
      ]);
      if (!l.length || !("id" in l[0]) || !("nombre" in l[0])) {
        throw new Error("Google no devolvió bien la pestaña '" + ZORI_CONFIG.TAB_LOCALES + "'. Columnas recibidas: " + (l.length ? Object.keys(l[0]).join(", ") : "(ninguna)"));
      }
      if (!p.length || !("local" in p[0]) || !("nombre" in p[0])) {
        throw new Error("Google no devolvió bien la pestaña '" + ZORI_CONFIG.TAB_PRODUCTOS + "'. Filas: " + p.length +
          ". Columnas recibidas: " + (p.length ? Object.keys(p[0]).join(", ") : "(ninguna)"));
      }
      datos = { locales: l, productos: p };
      window.ZORI_FUENTE = "Google Sheets";
    } else throw new Error("sin sheet");
  } catch (e) {
    if (ZORI_CONFIG.SHEET_ID) {
      console.warn("No se pudo leer Google Sheets, uso los CSV del sitio.", e);
      window.ZORI_MOTIVO = String(e.message || e);
    }
    window.ZORI_FUENTE = "CSV de respaldo";
    try {
      const [l, p] = await Promise.all([fetchCSV("locales.csv"), fetchCSV("productos.csv")]);
      datos = { locales: l, productos: p };
    } catch (e2) {
      if (cache) return cache.d; // último dato bueno
      throw e2;
    }
  }
  datos = normalizar(datos);
  try { localStorage.setItem(KEY, JSON.stringify({ t: ahora, fuente: ZORI_CONFIG.SHEET_ID || "local", d: datos })); } catch (e) {}
  return datos;
}

function parseVariantes(txt) {
  return String(txt || "")
    .split("|")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => {
      const i = x.lastIndexOf(":");
      if (i < 0) return null;
      const precio = parseInt(x.slice(i + 1).replace(/\D/g, ""), 10);
      return isNaN(precio) ? null : { etiqueta: x.slice(0, i).trim(), precio };
    })
    .filter(Boolean);
}

function normalizar(d) {
  const locales = d.locales
    .filter((l) => l.id && l.nombre && si(l.activo || "si"))
    .map((l) => ({
      id: slug(l.id),
      nombre: l.nombre,
      categorias: (l.categoria || "restaurantes").split(/[,;]/).map((c) => slug(c)).filter(Boolean),
      destacado: l.destacado ? !["no", "", "0"].includes(norm(l.destacado)) : false,
      logo: l.logo || "",
      banner: l.banner || l.logo || "",
      whatsapp: String(l.whatsapp || "").replace(/\D/g, "") || ZORI_CONFIG.WHATSAPP_DEFAULT,
      ciudad: l.ciudad || "",
      horario: l.horario || "",
      // Columnas opcionales: si las agregás en la hoja "Locales", aparecen solas en las tarjetas
      tiempo: l.tiempo || "",           // ej: 25-35 min
      envio: l.envio || "",             // ej: Gs. 5.000  /  Gratis
      calificacion: l.calificacion || "", // ej: 4.8
    }));
  const ids = new Set(locales.map((l) => l.id));
  const productos = d.productos
    .filter((p) => p.local && p.nombre && ids.has(slug(p.local)))
    .map((p, i) => {
      const variantes = parseVariantes(p.variantes);
      const precio = parseInt(String(p.precio || "").replace(/\D/g, ""), 10);
      return {
        key: slug(p.local) + "#" + i,
        local: slug(p.local),
        categoria: p.categoria || "Menú",
        nombre: p.nombre,
        descripcion: p.descripcion || "",
        precio: isNaN(precio) ? null : precio,
        variantes,
        imagen: p.imagen || "",
        disponible: si(p.disponible || "si"),
        nombrePedido: p.nombre_pedido || "",
      };
    })
    .filter((p) => p.variantes.length || p.precio !== null);
  return { locales, productos };
}

/* ---------- pantalla de carga / sin conexión ---------- */
function crearLoader() {
  if ($("#zory-loader")) return;
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div id="zory-loader"><img src="${LOGO}" alt="Zori"><h2 id="loader-text">Cargando Zori...</h2><p id="loader-sub">Preparando experiencia</p><div class="zbar"><i></i></div></div>`
  );
}
function ocultarLoader() {
  const l = $("#zory-loader");
  if (!l) return;
  l.style.opacity = "0";
  setTimeout(() => (l.style.display = "none"), 500);
}
window.addEventListener("offline", () => {
  const l = $("#zory-loader");
  if (!l) return;
  $("#loader-text").textContent = "¡Sin conexión!";
  $("#loader-sub").textContent = "Revisá tu internet";
  l.style.display = "flex"; l.style.opacity = "1";
});
window.addEventListener("online", ocultarLoader);

/* ---------- selector de ciudad ---------- */
function initCiudad() {
  const btn = $("#btnUbicacion"), dd = $("#dropdownUbicacion"), txt = $("#textoUbicacion");
  if (!btn || !dd) return;
  try { const c = localStorage.getItem("zori-ciudad"); if (c && txt) txt.textContent = c; } catch (e) {}
  btn.addEventListener("click", (e) => { e.stopPropagation(); dd.style.display = dd.style.display === "block" ? "none" : "block"; });
  document.addEventListener("click", () => (dd.style.display = "none"));
  window.cambiarUbicacion = (ciudad) => {
    if (txt) txt.textContent = ciudad;
    try { localStorage.setItem("zori-ciudad", ciudad); } catch (e) {}
    dd.style.display = "none";
  };
}

/* ---------- Firebase (pedidos) ---------- */
let db = null;
function initFirebase() {
  if (typeof firebase === "undefined") return;
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(ZORI_CONFIG.FIREBASE);
      if (firebase.analytics) firebase.analytics();
    }
    if (firebase.firestore) db = firebase.firestore();
  } catch (e) { console.error(e); }
}

/* ---------- app instalable (PWA) ---------- */
let eventoInstalar = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  eventoInstalar = e;
  const b = $("#btnInstalar");
  if (b) b.hidden = false;
});
function initInstalar() {
  const b = $("#btnInstalar");
  if (!b) return;
  if (eventoInstalar) b.hidden = false;
  b.addEventListener("click", async () => {
    if (!eventoInstalar) return;
    eventoInstalar.prompt();
    try { await eventoInstalar.userChoice; } catch (e) {}
    eventoInstalar = null;
    b.hidden = true;
  });
}
if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

/* ---------- barra inferior + reseña (inicio y locales) ---------- */
function montarNav(activo) {
  const it = (id, href, ic, txt, extra = "") =>
    `<a href="${href}" class="nav-item${activo === id ? " active" : ""}" ${extra}><i class="${ic}"></i><span>${txt}</span></a>`;
  document.body.insertAdjacentHTML("beforeend", `
    <nav class="bottom-nav">
      ${it("home", "index.html", "fa-solid fa-house", "Inicio")}
      ${it("locales", "locales.html", "fa-solid fa-store", "Locales")}
      <button class="nav-item" onclick="abrirModalReseña()"><i class="fa-solid fa-comment-dots"></i><span>Reseña</span></button>
      ${it("ruleta", "ruleta.html", "fa-solid fa-dharmachakra", "Ruleta")}
      ${it("ayuda", "https://wa.me/" + ZORI_CONFIG.WHATSAPP_DEFAULT, "fa-brands fa-whatsapp", "Ayuda", 'target="_blank" rel="noopener"')}
    </nav>`);
}
function montarResena() {
  document.body.insertAdjacentHTML("beforeend", `
    <div id="modalReseña">
      <div class="zrev">
        <div id="formContainer">
          <h3>Dejanos tu reseña</h3>
          <p>100% anónima</p>
          <form id="reseñaForm" onsubmit="enviarReseñaAnonima(event)">
            <input type="hidden" name="_subject" value="💬 Nueva Reseña Anónima - Zory Delivery">
            <textarea id="mensajeReseña" name="mensaje" rows="4" placeholder="Escribe tu comentario aquí..." required></textarea>
            <div class="row">
              <button type="button" class="cancel" onclick="cerrarModalReseña()">Cancelar</button>
              <button type="submit" class="ok" id="btnEnviar">Enviar</button>
            </div>
          </form>
        </div>
        <div id="mensajeExito">
          <div class="check">✓</div>
          <h3>¡Reseña enviada con éxito!</h3>
          <div class="row" style="justify-content:center;margin-top:12px"><button class="ok" onclick="cerrarModalReseña()">Aceptar</button></div>
        </div>
        <button class="x" onclick="cerrarModalReseña()" aria-label="Cerrar">&times;</button>
      </div>
    </div>`);
}

/* =====================================================================
 *  TARJETA DE LOCAL (se usa en inicio y en el listado)
 * ===================================================================== */
function metaLocal(l) {
  const m = [];
  if (l.calificacion) m.push(`<span class="zrate"><i class="fa-solid fa-star"></i>${esc(l.calificacion)}</span>`);
  if (l.tiempo) m.push(`<span><i class="fa-regular fa-clock"></i>${esc(l.tiempo)}</span>`);
  else if (l.horario) m.push(`<span><i class="fa-regular fa-clock"></i>${esc(l.horario)}</span>`);
  m.push(`<span><i class="fa-solid fa-motorcycle"></i>${l.envio ? esc(l.envio) : "Delivery"}</span>`);
  if (l.ciudad) m.push(`<span><i class="fa-solid fa-location-dot"></i>${esc(l.ciudad)}</span>`);
  return m.join("");
}
function tarjetaLocal(l, hint = "") {
  const foto = imgUrl(l.banner || l.logo);
  const media = foto
    ? `<img src="${esc(foto)}" alt="${esc(l.nombre)}" loading="lazy" onerror="this.replaceWith(zph())">`
    : `<div class="zph"><img src="${LOGO}" alt=""></div>`;
  return `<a class="zstore" href="local.html?id=${encodeURIComponent(l.id)}">
    <div class="zstore-media">${media}${l.destacado ? '<span class="zbadge-hot"><i class="fa-solid fa-fire"></i> Más pedido</span>' : ""}</div>
    <div class="zstore-body">
      <h3>${esc(l.nombre)}</h3>
      <div class="zstore-meta">${metaLocal(l)}</div>
      ${hint ? `<p class="zstore-hint">${esc(hint)}</p>` : ""}
    </div>
  </a>`;
}
const tarjetaAgregarLocal = () => `<div class="zadd-store" data-wa="1"><i class="fa-solid fa-store"></i><div><b>¡Agregá tu local!</b><small>Sumate a Zori Delivery</small></div></div>`;
function abrirWhatsAppLocal() {
  const m = "¡Hola Zori Delivery! 📱 Me interesa agregar mi local a la plataforma. ¿Me podrían dar info sobre cómo funciona?";
  window.open(`https://wa.me/${ZORI_CONFIG.WHATSAPP_DEFAULT}?text=${encodeURIComponent(m)}`, "_blank");
}

/* =====================================================================
 *  INICIO (index.html)
 * ===================================================================== */
function initHome(datos) {
  const { locales } = datos;
  const dest = locales.filter((l) => l.destacado);
  const lista = dest.length ? dest : locales.slice(0, 5);
  $("#featured").innerHTML = lista.map((l) => tarjetaLocal(l)).join("");
  $("#featTitle").textContent = dest.length ? "Los más pedidos 🔥" : "Locales para vos";
  $("#storesHome").innerHTML = locales.slice(0, 5).map((l) => tarjetaLocal(l)).join("");
  $("#verTodos").hidden = locales.length <= 5;
  $("#storesHome").addEventListener("click", (e) => { if (e.target.closest("[data-wa]")) abrirWhatsAppLocal(); });
}

/* =====================================================================
 *  LISTADO DE LOCALES (locales.html)
 * ===================================================================== */
const CAT_INFO = {
  restaurantes: ["Restaurantes", "fa-utensils", "Restaurantes 🍽️"],
  bodega: ["Bodega", "fa-wine-bottle", "Bodegas 🍷"],
  farmacia: ["Farmacia", "fa-pills", "Farmacias 💊"],
  supermercados: ["Supermercados", "fa-cart-shopping", "Supermercados 🛒"],
  postres: ["Postres", "fa-ice-cream", "Postres 🍨"],
};
const catInfo = (c) => CAT_INFO[c] || [c.charAt(0).toUpperCase() + c.slice(1), "fa-tag", c];

function initListado(datos) {
  const grid = $("#stores-container");
  const titulo = $("#titulo-seccion");
  const cuenta = $("#contador");
  const chips = $("#chips");
  const buscador = $("#search-input");
  const { locales, productos } = datos;

  // índice de búsqueda: nombre del local + nombres de sus productos
  const idx = {};
  productos.forEach((p) => { (idx[p.local] = idx[p.local] || []).push({ n: norm(p.nombre), t: p.nombre }); });

  const cats = [];
  locales.forEach((l) => l.categorias.forEach((c) => { if (!cats.includes(c)) cats.push(c); }));
  const hayDestacados = locales.some((l) => l.destacado);
  const chipDefs = [["todos", "Todos", "fa-store"]];
  if (hayDestacados) chipDefs.push(["vendidos", "Más pedidos", "fa-fire"]);
  cats.forEach((c) => chipDefs.push([c, catInfo(c)[0], catInfo(c)[1]]));
  chips.innerHTML = chipDefs.map(([k, n, ic], i) =>
    `<div class="category-chip${i === 0 ? " active" : ""}" data-cat="${esc(k)}"><i class="fa-solid ${ic}"></i> ${esc(n)}</div>`).join("");

  function render(lista, termino = "") {
    cuenta.textContent = lista.length ? `${lista.length} ${lista.length === 1 ? "local" : "locales"}` : "";
    if (!lista.length) {
      grid.innerHTML = `<p class="zmsg">No encontramos resultados${termino ? ` para “${esc(termino)}”` : " en esta categoría"}.</p>`;
    } else {
      grid.innerHTML = lista.map((l) => {
        let hint = "";
        if (termino) {
          const t = norm(termino);
          const hits = (idx[l.id] || []).filter((x) => x.n.includes(t)).slice(0, 2).map((x) => x.t);
          if (hits.length) hint = hits.join(" · ");
        }
        return tarjetaLocal(l, hint);
      }).join("");
    }
    grid.insertAdjacentHTML("beforeend", tarjetaAgregarLocal());
  }
  function filtrar(cat) {
    if (cat === "todos") { titulo.textContent = "Locales disponibles"; return render(locales); }
    if (cat === "vendidos") { titulo.textContent = "Los más pedidos 🔥"; return render(locales.filter((l) => l.destacado)); }
    titulo.textContent = catInfo(cat)[2];
    render(locales.filter((l) => l.categorias.includes(cat)));
  }
  function buscar(texto) {
    const t = norm(texto);
    if (!t) { chips.querySelector(".category-chip.active").click(); return; }
    titulo.textContent = "Resultados";
    render(locales.filter((l) => norm(l.nombre).includes(t) || (idx[l.id] || []).some((x) => x.n.includes(t))), texto.trim());
  }
  chips.addEventListener("click", (e) => {
    const c = e.target.closest(".category-chip");
    if (!c) return;
    chips.querySelectorAll(".category-chip").forEach((x) => x.classList.remove("active"));
    c.classList.add("active");
    buscador.value = "";
    filtrar(c.dataset.cat);
  });
  grid.addEventListener("click", (e) => { if (e.target.closest("[data-wa]")) abrirWhatsAppLocal(); });
  buscador.addEventListener("input", () => buscar(buscador.value));

  const params = new URLSearchParams(location.search);
  const q = params.get("q");
  const cat = params.get("cat");
  const chip = cat && [...chips.children].find((c) => c.dataset.cat === cat);
  if (q) { buscador.value = q; buscar(q); }
  else if (chip) chip.click();
  else render(locales);
}

/* =====================================================================
 *  PÁGINA DE LOCAL (local.html?id=bacoa)
 * ===================================================================== */
const Carrito = {
  local: null,   // objeto local
  items: {},     // key -> { nombre, precio, qty }
  guardar() { try { localStorage.setItem("zori-cart-" + this.local.id, JSON.stringify(this.items)); } catch (e) {} },
  cargar() { try { this.items = JSON.parse(localStorage.getItem("zori-cart-" + this.local.id) || "{}"); } catch (e) { this.items = {}; } },
  cambiar(key, nombre, precio, delta) {
    const it = this.items[key] || (this.items[key] = { nombre, precio, qty: 0 });
    it.qty += delta;
    if (it.qty <= 0) delete this.items[key];
    this.guardar();
    pintarCantidades();
    pintarBarra();
  },
  vaciar() { this.items = {}; this.guardar(); pintarCantidades(); pintarBarra(); },
  totales() {
    let n = 0, t = 0;
    for (const k in this.items) { n += this.items[k].qty; t += this.items[k].qty * this.items[k].precio; }
    return { n, t };
  },
};
let PRODS = {}; // key -> producto del local actual

function nombrePedido(p, v) {
  const base = p.nombrePedido || p.nombre;
  return v ? `${base} (${v.etiqueta})` : base;
}

function tarjetaProducto(p) {
  const img = imgUrl(p.imagen);
  const agotado = !p.disponible;
  const conVar = p.variantes.length > 0;
  const desde = conVar ? Math.min(...p.variantes.map((v) => v.precio)) : p.precio;
  let accion;
  if (agotado) accion = `<span class="zp-off">Agotado</span>`;
  else if (conVar) accion = `<span class="zp-vslot" data-pkey="${esc(p.key)}"></span>`;
  else accion = `<span class="zp-slot" data-key="${esc(p.key)}" data-nombre="${esc(nombrePedido(p))}" data-precio="${p.precio}"></span>`;
  return `<article class="zprod${agotado ? " zp-agotado" : ""}" data-pkey="${esc(p.key)}" data-q="${esc(norm(p.nombre + " " + p.descripcion))}">
    <div class="zprod-body">
      <h4>${esc(p.nombre)}</h4>
      ${p.descripcion ? `<p class="zprod-desc">${esc(p.descripcion)}</p>` : ""}
      <div class="zprod-price">${conVar ? "Desde " : ""}${gs(desde)}</div>
    </div>
    <div class="zprod-media${img ? "" : " noimg"}">
      ${img ? `<img src="${esc(img)}" alt="${esc(p.nombre)}" loading="lazy" onerror="this.parentNode.classList.add('noimg');this.remove()">` : ""}
      <div class="zprod-act">${accion}</div>
    </div>
  </article>`;
}

const pildora = (q) => `<span class="zpill"><button data-act="menos" aria-label="Quitar">−</button><span>${q}</span><button data-act="mas" aria-label="Agregar">+</button></span>`;
function cantidadProducto(pkey) {
  let n = 0;
  for (const k in Carrito.items) if (k.startsWith(pkey + ":")) n += Carrito.items[k].qty;
  return n;
}
function pintarCantidades() {
  document.querySelectorAll(".zp-slot").forEach((s) => {
    const qty = Carrito.items[s.dataset.key] ? Carrito.items[s.dataset.key].qty : 0;
    s.innerHTML = qty ? pildora(qty) : `<button class="zbtn-add" data-act="mas" aria-label="Agregar">+</button>`;
  });
  document.querySelectorAll(".zp-vslot").forEach((s) => {
    const n = cantidadProducto(s.dataset.pkey);
    s.innerHTML = n
      ? `<button class="zbtn-n" data-open="1" aria-label="Ver opciones">${n}</button>`
      : `<button class="zbtn-add" data-open="1" aria-label="Elegir opciones">+</button>`;
  });
}

function pintarBarra() {
  const { n, t } = Carrito.totales();
  const bar = $("#zcartBar");
  if (!bar) return;
  if (!n) { bar.style.display = "none"; cerrarCarrito(); return; }
  bar.style.display = "flex";
  $("#zcartCount").textContent = n;
  $("#zcartTotal").textContent = gs(t);
  if ($("#zmodal").style.display === "flex") pintarModal();
}

function pintarModal() {
  const lista = $("#zlista");
  lista.innerHTML = Object.entries(Carrito.items).map(([k, it]) => `
    <div class="zrow">
      <div><strong>${esc(it.nombre)}</strong><br><small>${it.qty} × ${gs(it.precio)} = <b>${gs(it.qty * it.precio)}</b></small></div>
      <span class="controls" data-key="${esc(k)}"><button class="btn-qty" data-m="menos" aria-label="Quitar">−</button><span class="qty-count">${it.qty}</span><button class="btn-qty" data-m="mas" aria-label="Agregar">+</button></span>
    </div>`).join("");
  $("#ztotal").textContent = gs(Carrito.totales().t);
}
function abrirCarrito() { pintarModal(); $("#zmodal").style.display = "flex"; document.body.classList.add("zlock"); }
function cerrarCarrito() {
  const m = $("#zmodal");
  if (m) m.style.display = "none";
  if (!$("#zvsheet") || !$("#zvsheet").classList.contains("open")) document.body.classList.remove("zlock");
}

function abrirOpciones(pkey) {
  const p = PRODS[pkey];
  if (!p) return;
  const img = imgUrl(p.imagen);
  $("#zvbody").innerHTML = `
    ${img ? `<img class="zv-img" src="${esc(img)}" alt="" onerror="this.remove()">` : ""}
    <h3>${esc(p.nombre)}</h3>
    ${p.descripcion ? `<p class="zv-desc">${esc(p.descripcion)}</p>` : ""}
    <div class="zv-list">${p.variantes.map((v, i) => {
      const key = `${p.key}:${i}`;
      return `<div class="zv-row"><div><b>${esc(v.etiqueta)}</b><small>${gs(v.precio)}</small></div>
        <span class="zp-slot" data-key="${esc(key)}" data-nombre="${esc(nombrePedido(p, v))}" data-precio="${v.precio}"></span></div>`;
    }).join("")}</div>`;
  $("#zvsheet").classList.add("open");
  document.body.classList.add("zlock");
  pintarCantidades();
}
function cerrarOpciones() {
  $("#zvsheet").classList.remove("open");
  if ($("#zmodal").style.display !== "flex") document.body.classList.remove("zlock");
}

function enviarPedido() {
  const nombre = $("#znombre").value.trim();
  if (!nombre) { alert("Por favor, ingresá tu nombre para continuar."); $("#znombre").focus(); return; }
  const notas = $("#znotas").value.trim();
  try { localStorage.setItem("zori-nombre", nombre); } catch (e) {}
  const lista = Object.values(Carrito.items);
  if (!lista.length) return;
  const total = lista.reduce((a, i) => a + i.qty * i.precio, 0);
  const local = Carrito.local;
  if (db) {
    db.collection("pedidos").add({
      cliente: nombre,
      tienda: local.nombre,
      productos: lista.map((i) => ({ cantidad: i.qty, nombre: i.nombre })),
      total,
      notas,
      estado: "pendiente",
      hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      creado: firebase.firestore.FieldValue.serverTimestamp(),
    }).catch((e) => console.error("Error al registrar pedido en Firebase:", e));
  }
  let msg = `Nuevo Pedido\n\nHola Zory, quiero hacer un pedido de *${local.nombre}*:\n\n`;
  lista.forEach((i) => (msg += `- ${i.qty}: ${i.nombre}\n`));
  msg += `\nTotal: ${gs(total)}\n\nA nombre de: ${nombre}\n`;
  if (notas) msg += `\nComentarios: ${notas}\n`;
  iniciarPreparando(`https://wa.me/${local.whatsapp}?text=${encodeURIComponent(msg)}`);
}

/* ---------- animación "preparando tu pedido" (3 s) y luego WhatsApp ---------- */
const PREP_MS = 3000;
let prepTimers = [];
// Se navega en la misma pestaña (no con window.open): después de una espera el navegador
// bloquearía la ventana nueva, y así también funciona dentro de la app instalada.
function abrirWhatsApp(url) { window.location.href = url; }
function cerrarPreparando() {
  prepTimers.forEach(clearTimeout);
  prepTimers = [];
  const o = $("#zprep");
  if (o) o.classList.remove("on");
  if ($("#zmodal").style.display !== "flex" && !$("#zvsheet").classList.contains("open")) document.body.classList.remove("zlock");
}
function iniciarPreparando(url) {
  const o = $("#zprep");
  if (!o || o.classList.contains("on")) return;
  cerrarCarrito();
  document.body.classList.add("zlock");
  const t = $("#zprepTitulo"), s = $("#zprepSub");
  t.textContent = "Enviando tu pedido…"; s.textContent = "Un momento";
  o.classList.remove("on"); void o.offsetWidth; // reinicia la barra de progreso
  o.classList.add("on");
  const pasos = [
    [PREP_MS / 3, "¡Preparando tu pedido!", "El local ya se está encargando"],
    [(PREP_MS * 2) / 3, "Abriendo WhatsApp…", "Confirmá el mensaje para terminar"],
  ];
  prepTimers = pasos.map(([ms, a, b]) => setTimeout(() => { t.textContent = a; s.textContent = b; }, ms));
  prepTimers.push(setTimeout(() => { cerrarPreparando(); abrirWhatsApp(url); }, PREP_MS));
}
// si vuelven desde WhatsApp con el botón "atrás", la pantalla no debe quedar abierta
window.addEventListener("pageshow", () => { if ($("#zprep")) cerrarPreparando(); });

function montarCarritoUI() {
  document.body.insertAdjacentHTML("beforeend", `
    <div id="zcartBar" role="button" tabindex="0"><span class="zc-n" id="zcartCount">0</span><span class="zc-l">Ver pedido</span><span id="zcartTotal">Gs. 0</span></div>
    <div id="zmodal">
      <div class="zbox">
        <div class="zhead"><h3>Tu pedido</h3><button id="zclose" aria-label="Cerrar">&times;</button></div>
        <div class="zstore-line">${esc(Carrito.local.nombre)}</div>
        <div id="zlista"></div>
        <label for="znombre" class="zlabel">Tu nombre</label>
        <input id="znombre" type="text" placeholder="Nombre" autocomplete="name">
        <label for="znotas" class="zlabel">Comentarios (opcional)</label>
        <textarea id="znotas" rows="2" placeholder="Ej: sin cebolla, referencia de tu casa..."></textarea>
        <div class="znota">📍 <strong>Recordatorio:</strong> enviá tu ubicación actual desde el chat</div>
        <div class="ztot"><span>Total</span><span id="ztotal">Gs. 0</span></div>
        <button id="zsend"><i class="fa-brands fa-whatsapp"></i> Pedir por WhatsApp</button>
      </div>
    </div>
    <div id="zvsheet">
      <div class="zv-back" data-close="1"></div>
      <div class="zv-box">
        <button class="zv-x" data-close="1" aria-label="Cerrar">&times;</button>
        <div id="zvbody"></div>
        <button class="zv-done" data-close="1">Listo</button>
      </div>
    </div>
    <div id="zprep" role="status" aria-live="polite">
      <div class="zprep-box">
        <div class="zprep-fox"><img src="${LOGO}" alt=""></div>
        <h3 id="zprepTitulo">Enviando tu pedido…</h3>
        <p id="zprepSub">Un momento</p>
        <div class="zprep-bar"><i></i></div>
        <button id="zprepCancel" type="button">Cancelar</button>
      </div>
    </div>`);
  $("#zprepCancel").addEventListener("click", cerrarPreparando);
  try { const n = localStorage.getItem("zori-nombre"); if (n) $("#znombre").value = n; } catch (e) {}
  $("#zcartBar").addEventListener("click", abrirCarrito);
  $("#zclose").addEventListener("click", cerrarCarrito);
  $("#zmodal").addEventListener("click", (e) => { if (e.target.id === "zmodal") cerrarCarrito(); });
  $("#zvsheet").addEventListener("click", (e) => { if (e.target.closest("[data-close]")) cerrarOpciones(); });
  $("#zsend").addEventListener("click", enviarPedido);
  $("#zlista").addEventListener("click", (e) => {
    const b = e.target.closest("[data-m]");
    if (!b) return;
    const key = b.parentElement.dataset.key;
    const it = Carrito.items[key];
    if (it) Carrito.cambiar(key, it.nombre, it.precio, b.dataset.m === "mas" ? 1 : -1);
  });
}

async function initLocal() {
  const id = slug(new URLSearchParams(location.search).get("id") || "");
  const cont = $("#menuContainer");
  let datos;
  try { datos = await cargarDatos(); window.__datos = datos; }
  catch (e) {
    cont.innerHTML = `<p class="zmsg">No pudimos cargar el menú. Revisá tu conexión e intentá de nuevo.</p>`;
    ocultarLoader(); return;
  }
  const local = datos.locales.find((l) => l.id === id);
  if (!local) {
    cont.innerHTML = `<p class="zmsg">No encontramos ese local. <a href="locales.html">Ver todos los locales</a></p>`;
    ocultarLoader(); return;
  }
  Carrito.local = local;
  Carrito.cargar();
  document.title = `${local.nombre} · Zori Delivery`;

  // portada
  const portada = imgUrl(local.banner || local.logo);
  const cover = $("#zcover"), im = $("#storeBanner");
  const sinFoto = () => { im.remove(); cover.classList.add("sin-img"); cover.insertAdjacentHTML("beforeend", `<img class="zcover-logo" src="${LOGO}" alt="">`); };
  if (portada) { im.src = portada; im.alt = local.nombre; im.onerror = sinFoto; } else sinFoto();
  // logo redondo solo si el local tiene un logo distinto a la portada
  if (local.logo && local.banner && local.logo !== local.banner) {
    const b = $("#storeLogo");
    b.innerHTML = `<img src="${esc(imgUrl(local.logo))}" alt="" onerror="this.parentNode.hidden=true">`;
    b.hidden = false;
  }
  $("#storeTitle").textContent = local.nombre;
  $("#storeMeta").innerHTML = metaLocal(local) + `<span><i class="fa-brands fa-whatsapp"></i>Pedí por WhatsApp</span>`;

  // menú
  const prods = datos.productos.filter((p) => p.local === id);
  PRODS = Object.fromEntries(prods.map((p) => [p.key, p]));
  const cats = [];
  prods.forEach((p) => { if (!cats.includes(p.categoria)) cats.push(p.categoria); });
  const nav = $("#storeCats");
  nav.innerHTML = cats.length > 1 ? cats.map((c, i) => `<a href="#cat-${i}" data-i="${i}">${esc(c)}</a>`).join("") : "";
  cont.innerHTML = (cats.map((c, i) => `
    <section class="zsec" id="cat-${i}">
      <h2>${esc(c)}</h2>
      ${prods.filter((p) => p.categoria === c).map(tarjetaProducto).join("")}
    </section>`).join("")
    || `<p class="zmsg">Este local todavía no tiene productos cargados.</p>`) +
    `<p class="zmsg" id="zempty" hidden>No encontramos ese producto en este local.</p>`;

  montarCarritoUI();

  // agregar / quitar / abrir opciones
  document.body.addEventListener("click", (e) => {
    const act = e.target.closest("[data-act]");
    if (act && !act.disabled) {
      const s = act.closest(".zp-slot");
      if (s) Carrito.cambiar(s.dataset.key, s.dataset.nombre, Number(s.dataset.precio), act.dataset.act === "mas" ? 1 : -1);
      return;
    }
    const fila = e.target.closest(".zprod");
    if (fila && (e.target.closest("[data-open]") || (fila.querySelector(".zp-vslot") && !e.target.closest(".zprod-act")))) {
      abrirOpciones(fila.dataset.pkey);
    }
  });

  // buscador dentro del local
  const bs = $("#storeSearch");
  bs.addEventListener("input", () => {
    const t = norm(bs.value);
    const filas = [...document.querySelectorAll(".zprod")];
    filas.forEach((r) => (r.hidden = !!t && !r.dataset.q.includes(t)));
    document.querySelectorAll(".zsec").forEach((s) => (s.hidden = ![...s.querySelectorAll(".zprod")].some((r) => !r.hidden)));
    $("#zempty").hidden = !t || filas.some((r) => !r.hidden);
  });

  // pestaña de categoría activa mientras se desplaza
  const secs = [...document.querySelectorAll(".zsec")];
  const tabs = [...nav.querySelectorAll("a")];
  if (tabs.length && "IntersectionObserver" in window) {
    const marcar = (i) => {
      tabs.forEach((t, k) => t.classList.toggle("on", k === i));
      const t = tabs[i];
      if (t) nav.scrollTo({ left: t.offsetLeft - nav.clientWidth / 2 + t.clientWidth / 2, behavior: "smooth" });
    };
    marcar(0);
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) marcar(secs.indexOf(en.target)); });
    }, { rootMargin: "-110px 0px -65% 0px" });
    secs.forEach((s) => io.observe(s));
  }

  pintarCantidades();
  pintarBarra();
  ocultarLoader();
}

/* ---------- reseña anónima ---------- */
window.abrirModalReseña = () => {
  $("#formContainer").style.display = "block";
  $("#mensajeExito").style.display = "none";
  $("#mensajeReseña").value = "";
  $("#modalReseña").style.display = "flex";
};
window.cerrarModalReseña = () => ($("#modalReseña").style.display = "none");
window.enviarReseñaAnonima = (event) => {
  event.preventDefault();
  const btn = $("#btnEnviar");
  btn.textContent = "Enviando..."; btn.disabled = true;
  fetch("https://formsubmit.co/ajax/zorydelivery@gmail.com", { method: "POST", body: new FormData($("#reseñaForm")) })
    .then((r) => r.json())
    .then(() => { $("#formContainer").style.display = "none"; $("#mensajeExito").style.display = "block"; })
    .catch(() => alert("Error al enviar. Inténtalo de nuevo."))
    .finally(() => { btn.textContent = "Enviar"; btn.disabled = false; });
};

/* ---------- diagnóstico: agregá ?debug=1 a la URL ---------- */
function mostrarDebug(datos) {
  if (!/[?&]debug=1/.test(location.search)) return;
  const d = document.createElement("div");
  d.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:100000;background:#111;color:#fff;font:12px/1.4 monospace;padding:8px 12px;white-space:pre-wrap";
  d.textContent = `Fuente: ${window.ZORI_FUENTE || "caché"}\nLocales: ${datos ? datos.locales.length : "?"} · Productos: ${datos ? datos.productos.length : "?"}` +
    (window.ZORI_MOTIVO ? `\nMotivo del respaldo: ${window.ZORI_MOTIVO}` : "") + `\nSHEET_ID: ${ZORI_CONFIG.SHEET_ID || "(vacío)"}`;
  d.onclick = () => d.remove();
  document.body.appendChild(d);
}

/* ---------- arranque ---------- */
document.addEventListener("DOMContentLoaded", async () => {
  crearLoader();
  initCiudad();
  initFirebase();
  initInstalar();
  const page = document.body.dataset.page;
  if (page === "local") { await initLocal(); return mostrarDebug(window.__datos); }
  montarNav(page);
  montarResena();
  try {
    const d = await cargarDatos();
    window.__datos = d;
    if (page === "home") initHome(d); else initListado(d);
    mostrarDebug(d);
  } catch (e) {
    console.error(e);
    const c = $("#stores-container") || $("#storesHome");
    if (c) c.innerHTML = `<p class="zmsg">No pudimos cargar los locales. Revisá tu conexión.</p>`;
  }
  ocultarLoader();
});
