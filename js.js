const database = {
    "burgerland": {
        nombre: "Burgerland",
        banner: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "b1", nombre: "Cheddar Burger", descripcion: "Doble carne, cheddar y aderezo especial.", precio: 5500, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200" },
            { id: "b2", nombre: "Bacon Monster", descripcion: "Triple carne, triple cheddar y mucha panceta.", precio: 6800, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200" }
        ]
    },
    "bacoa burger": {
        nombre: "Bacoa",
        banner: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "bac1", nombre: "Bacoa Clásica", descripcion: "Medallón de carne, queso cheddar, lechuga y tomate.", precio: 28000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200" },
            { id: "bac2", nombre: "Bacoa Doble Bacon", descripcion: "Doble carne, doble cheddar y abundante panceta crujiente.", precio: 35000, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200" }
        ]
    },
    "porkys": {
        nombre: "Porkys",
        banner: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "pork1", nombre: "Burger de Cerdo Porkys", descripcion: "Medallón de cerdo desmenuzado con barbacoa y cheddar.", precio: 32000, img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200" },
            { id: "pork2", nombre: "Costillar Porkis", descripcion: "Porción de costicitas de cerdo con salsa especial.", precio: 45000, img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200" }
        ]
    },
    "acai berry": {
        nombre: "Açaí Berry",
        banner: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "ac1", nombre: "Bowl Tradicional", descripcion: "Açaí puro, banana, granolas y miel.", precio: 25000, img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=200" },
            { id: "ac2", nombre: "Berry Explosion", descripcion: "Açaí, frutillas, arándanos y leche condensada.", precio: 30000, img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=200" }
        ]
    },
    "absoluto": {
        nombre: "Absoluto",
        banner: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "abs1", nombre: "Pizza Mozzarella", descripcion: "Salsa casera, abundante mozzarella y orégano.", precio: 40000, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200" }
        ]
    },
    "mainumby": {
        nombre: "Gastronomía Mainumby",
        banner: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
        whatsapp: "595983488641",
        productos: [
            { id: "mai1", nombre: "Pizza Muzzarella", descripcion: "Clásica, con abundante muzzarella y salsa de la casa.", precio: 30000, img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200" },
            { id: "mai2", nombre: "Pizza Jamón", descripcion: "Muzzarella y finas fetas de jamón.", precio: 35000, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200" },
            { id: "mai3", nombre: "Pizza Peperoni", descripcion: "Muzzarella con rodajas de peperoni.", precio: 35000, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200" },
            { id: "mai4", nombre: "Pizza Palmito", descripcion: "Muzzarella y tiernos palmitos seleccionados.", precio: 35000, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200" },
            { id: "mai5", nombre: "Pizza Choclo", descripcion: "Muzzarella y granos de choclo tierno.", precio: 35000, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200" },
            { id: "mai6", nombre: "Pizza Mixto", descripcion: "Combinación especial de la casa.", precio: 35000, img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=200" },
            { id: "mai7", nombre: "Pizza Catupiri", descripcion: "Exquisita capa de queso catupiri.", precio: 35000, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200" },
            { id: "mai8", nombre: "Pizza Primavera", descripcion: "Con ingredientes frescos y coloridos.", precio: 35000, img: "https://images.unsplash.com/photo-1595731343162-8114674724b0?w=200" },
            { id: "mai9", nombre: "Pizza Napolitana", descripcion: "Muzzarella, rodajas de tomate fresco y ajos tiernos.", precio: 35000, img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200" },
            { id: "mai10", nombre: "Carne Catupiri", descripcion: "Carne seleccionada y cremoso catupiri.", precio: 35000, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200" },
            { id: "mai11", nombre: "Pollo Catupiri", descripcion: "Trocitos de pollo jugoso con catupiri.", precio: 35000, img: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=200" },
            { id: "mai12", nombre: "Peperoni - Muzzarella", descripcion: "Doble intensidad de muzzarella y peperoni.", precio: 35000, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200" }
        ]
    },
    "home of burger": {
        nombre: "Home Of Burger",
        banner: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "hb1", nombre: "Kids", descripcion: "Pan, carne, queso y salsa.", precio: 13000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200" },
            { id: "hb2", nombre: "Classic", descripcion: "Pan, carne, huevo, lechuga, tomate y salsa.", precio: 15000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200" },
            { id: "hb3", nombre: "Classic Max", descripcion: "Pan, medallón de carne, queso, tomate, lechuga, huevo y salsa.", precio: 17000, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200" },
            { id: "hb4", nombre: "Classic de Pollo", descripcion: "Pan, carne de pollo, huevo, queso mozzarella, lechuga, tomate y salsa.", precio: 15000, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200" },
            { id: "hb5", nombre: "Doble Classic", descripcion: "Pan, doble carne, queso, tomate, lechuga, huevo y salsa.", precio: 20000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200" },
            { id: "hb6", nombre: "Barbacoa", descripcion: "Pan, medallón de carne, queso, huevo, tomate, pepinillo y salsa barbacoa.", precio: 18000, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200" }
        ]
    },
    "valhalla": {
        nombre: "Valhalla",
        banner: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "v1", nombre: "Valquiria Burger", descripcion: "Medallón de vacío, provoleta y cebolla caramelizada.", precio: 36000, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200" }
        ]
    },
    "rolling cook": {
        nombre: "Rolling Cook",
        banner: "https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "rc1", nombre: "Rolling Burger", descripcion: "Medallón smash, cheddar, pepinillos y aderezo especial.", precio: 28000, img: "https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?w=200" }
        ]
    },
    "los abuelos": {
        nombre: "Los Abuelos",
        banner: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "ab1", nombre: "Especial Los Abuelos", descripcion: "Plato o producto destacado de la casa.", precio: 35000, img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200" }
        ]
    },
    "la estacion": {
        nombre: "La Estación",
        banner: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "est1", nombre: "Plato de la Estación", descripcion: "Especialidad de la casa.", precio: 35000, img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200" }
        ]
    },
    "la peña": {
        nombre: "La Peña",
        banner: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "pen1", nombre: "Plato Típico La Peña", descripcion: "Especialidad tradicional.", precio: 40000, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200" }
        ]
    },
    "acai francol": {
        nombre: "Açai Francol",
        banner: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "acai1", nombre: "Bowl Acai Franco", descripcion: "Açaí puro, banana, granolas y miel.", precio: 25000, img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=200" }
        ]
    },
    "restaurant mysko": {
        nombre: "Posada Mysko",
        banner: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "mys1", nombre: "Plato Especial Mysko", descripcion: "Especialidad de la casa.", precio: 35000, img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200" }
        ]
    },
    "lo de capi": {
        nombre: "Lo De Capi",
        banner: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "capi1", nombre: "Especial Lo De Capi", descripcion: "Plato o hamburguesa destacada de la casa.", precio: 35000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200" },
            { id: "capi2", nombre: "Lomito Lo De Capi", descripcion: "Lomito completo con pan casero y papas fritas.", precio: 40000, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200" }
        ]
    },
    "milu": {
        nombre: "Hamburguesería Milu",
        banner: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "milu1", nombre: "Hamburguesa", descripcion: "Hamburguesa clásica de la casa.", precio: 15000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200" },
            { id: "milu2", nombre: "Hamburguesa doble", descripcion: "Doble porción de carne y sabor.", precio: 25000, img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200" },
            { id: "milu3", nombre: "Sandwich", descripcion: "Sandwich especial con ingredientes frescos.", precio: 20000, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200" },
            { id: "milu4", nombre: "Doble", descripcion: "Opción doble especial.", precio: 30000, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200" },
            { id: "milu5", nombre: "Arabe", descripcion: "Sándwich estilo árabe.", precio: 25000, img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=200" },
            { id: "milu6", nombre: "Solo carne", descripcion: "Porción especial de carne.", precio: 35000, img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200" }
        ]
    },
    "amandau": {
        nombre: "Amandau",
        banner: "https://images.unsplash.com/photo-1560008511-11c63416e52d?w=600",
        whatsapp: "595982309464",
        productos: [
            { id: "amandau1", nombre: "Vasito Chico", descripcion: "Helado artesanal en vasito de una porción.", precio: 12000, img: "https://images.unsplash.com/photo-1560008511-11c63416e52d?w=200" }
        ]
    }
}; // <- Único cierre correcto

let cart = {};

// --- COMIENZO DEL ARCHIVO JS.JS ---

const firebaseConfig = {
    apiKey: "AIzaSyCoIVVXK3csLvtg9E7wDCjGt--fam_szzQ",
    authDomain: "admin-de-zory.firebaseapp.com",
    projectId: "admin-de-zory",
    storageBucket: "admin-de-zory.firebasestorage.app",
    messagingSenderId: "199468715480",
    appId: "1:199468715480:web:2a7a188258237c0b5db6ad",
    measurementId: "G-WKGL0G4WK4"
};

// Inicialización compatible con los scripts del HTML
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
        firebase.analytics(); // Esto es lo que activa el mapa en tiempo real
    } catch (e) { 
        console.error(e); 
    }
}

const db = (typeof firebase !== 'undefined' && firebase.firestore) ? firebase.firestore() : null;

// ... (y debajo de esto, deja todo el resto de funciones que ya tenías: obtenerStoreActual, initStore, etc.)

function obtenerStoreActual() {
    let tituloPage = document.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    let rawPath = window.location.pathname.split("/").pop().toLowerCase().replace(".html", "").replace(/[-_]/g, " ");

    for (let key in database) {
        let normalizedKey = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
        if (tituloPage.includes(normalizedKey) || rawPath.includes(normalizedKey)) {
            return database[key];
        }
    }

    for (let key in database) {
        let nombreTienda = database[key].nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (tituloPage.includes(nombreTienda) || rawPath.includes(nombreTienda)) {
            return database[key];
        }
    }

    return database["burgerland"];
}

function initStore() {
    crearEstructuraCarritoUI();

    const store = obtenerStoreActual();

    if (store) {
        const titleElem = document.getElementById('storeTitle');
        if (titleElem) titleElem.innerText = store.nombre;

        const bannerElem = document.getElementById('storeBanner');
        if (bannerElem && store.banner) bannerElem.src = store.banner;

        const menuContainer = document.getElementById('menuContainer');
        if (menuContainer && store.productos) {
            let html = '';
            store.productos.forEach(prod => {
                const qty = cart[prod.nombre] ? cart[prod.nombre].qty : 0;
                html += `
                    <div class="item">
                        <img src="${prod.img}" alt="${prod.nombre}" class="item-img" />
                        <div class="item-info">
                            <div class="item-title">${prod.nombre}</div>
                            <div class="item-desc">${prod.descripcion}</div>
                            <div class="item-price">Gs. ${prod.precio.toLocaleString('es-PY')}</div>
                        </div>
                        <div class="controls">
                            <button class="btn-qty" onclick="updateQty('${prod.nombre}', ${prod.precio}, -1)">-</button>
                            <span class="qty-count" id="qty-${prod.nombre}">${qty}</span>
                            <button class="btn-qty" onclick="updateQty('${prod.nombre}', ${prod.precio}, 1)">+</button>
                            <button class="btn-pedir" onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio})" style="margin-left: 8px; background: #F85800; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">PEDIR</button>
                        </div>
                    </div>
                `;
            });
            menuContainer.innerHTML = html;
        }
    }

    renderCart();
}

function crearEstructuraCarritoUI() {
    if (!document.getElementById('cartBar')) {
        const cartBarHTML = `
            <div id="cartBar" onclick="abrirModalCarrito()" style="position: fixed; bottom: 20px; right: 20px; background: rgba(16, 124, 65, 0.90); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); color: #ffffff; padding: 14px 22px; border-radius: 50px; font-weight: bold; cursor: pointer; display: none; box-shadow: 0 10px 30px rgba(0,0,0,0.35); z-index: 1000; align-items: center; gap: 10px; font-family: 'Poppins', sans-serif; border: 1px solid rgba(255, 255, 255, 0.35);">
                🛒 <span id="cartCount">0</span> • <span id="cartTotal">Gs. 0</span>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', cartBarHTML);
    }

    if (!document.getElementById('modalCarritoZori')) {
        const modalHTML = `
            <div id="modalCarritoZori" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display: none; justify-content: center; align-items: center; z-index: 2000; font-family: 'Poppins', sans-serif; padding: 16px; box-sizing: border-box;">
                <div style="background: #ffffff; width: 100%; max-width: 500px; max-height: 90vh; border-radius: 20px; padding: 24px; box-sizing: border-box; color: #1e293b; overflow-y: auto; box-shadow: 0 20px 50px rgba(0,0,0,0.3); position: relative;">
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h3 id="modalStoreTitle" style="margin:0; font-size: 20px; font-weight: 700; color: #0f172a;">Tu Pedido</h3>
                        <button onclick="cerrarModalCarrito()" style="background: transparent; border: none; color: #64748b; width: 32px; height: 32px; border-radius: 50%; font-size: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold;">&times;</button>
                    </div>

                    <div style="border-bottom: 1px solid #e2e8f0; margin-bottom: 16px;"></div>
                    
                    <div id="listaModalCarrito"></div>

                    <div style="border-bottom: 1px solid #e2e8f0; margin: 16px 0;"></div>

                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 14px; font-weight: 600; color: #334155; margin-bottom: 6px;">Tu Nombre:</label>
                        <input type="text" id="inputNombreCliente" placeholder="Nombre" style="width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid #cbd5e1; background: #ffffff; color: #0f172a; box-sizing: border-box; font-family: 'Poppins', sans-serif; outline: none; font-size: 15px;">
                    </div>
                    
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 10px; font-size: 13px; color: #475569; text-align: center; margin-bottom: 20px; font-family: 'Poppins', sans-serif;">
                        📍 <strong>Recordatorio:</strong> Envía tu ubicación actual desde el chat
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <span style="font-weight:700; font-size: 18px; color: #0f172a;">Total:</span>
                        <span id="totalModalCarrito" style="font-weight:700; font-size: 20px; color: #0f172a;">Gs. 0</span>
                    </div>

                    <button onclick="sendWhatsApp()" style="background: #22c55e; color: white; border: none; padding: 14px; width: 100%; border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 16px; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); display: flex; align-items: center; justify-content: center; gap: 8px;">
                        💬 Pedir Ahora
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

function updateQty(name, price, change) {
    if (!cart[name]) {
        cart[name] = { price: price, qty: 0 };
    }

    cart[name].qty += change;

    if (cart[name].qty <= 0) {
        delete cart[name];
    }

    const qtyElement = document.getElementById(`qty-${name}`);
    if (qtyElement) {
        qtyElement.innerText = cart[name] ? cart[name].qty : 0;
    }

    renderCart();
}

function agregarAlCarrito(nombre, precio) {
    updateQty(nombre, precio, 1);
}

function renderCart() {
    let totalItems = 0;
    let totalPrice = 0;

    for (let item in cart) {
        totalItems += cart[item].qty;
        totalPrice += cart[item].qty * cart[item].price;
    }

    const cartBar = document.getElementById('cartBar');
    if (!cartBar) return;

    if (totalItems > 0) {
        cartBar.style.display = 'flex';
        const countElem = document.getElementById('cartCount');
        const totalElem = document.getElementById('cartTotal');
        
        const textoPedido = totalItems === 1 ? 'pedido' : 'pedidos';
        if (countElem) countElem.innerText = `${totalItems} ${textoPedido}`;
        if (totalElem) totalElem.innerText = `Gs. ${totalPrice.toLocaleString('es-PY')}`;
    } else {
        cartBar.style.display = 'none';
        cerrarModalCarrito();
    }
}

function abrirModalCarrito() {
    const modal = document.getElementById('modalCarritoZori');
    const listaDiv = document.getElementById('listaModalCarrito');
    const totalP = document.getElementById('totalModalCarrito');
    const titleModal = document.getElementById('modalStoreTitle');

    if (!modal || !listaDiv) return;

    const store = obtenerStoreActual();
    if (titleModal) titleModal.innerText = `Tu Pedido`;

    listaDiv.innerHTML = '';
    let totalPrecio = 0;

    for (let nombre in cart) {
        let item = cart[nombre];
        let subtotal = item.price * item.qty;
        totalPrecio += subtotal;

        listaDiv.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                <div>
                    <span style="font-weight: 600; font-size: 14px; color: #0f172a;">${nombre}</span><br>
                    <small style="color: #64748b;">${item.qty} x Gs. ${item.price.toLocaleString('es-PY')} = <strong style="color: #0f172a;">Gs. ${subtotal.toLocaleString('es-PY')}</strong></small>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button onclick="updateQty('${nombre}', ${item.price}, -1); abrirModalCarrito();" style="background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; border-radius:6px; width:28px; height:28px; cursor:pointer; font-weight:bold;">-</button>
                    <span style="font-weight: 600; font-size: 14px;">${item.qty}</span>
                    <button onclick="updateQty('${nombre}', ${item.price}, 1); abrirModalCarrito();" style="background:#F85800; color:white; border:none; border-radius:6px; width:28px; height:28px; cursor:pointer; font-weight:bold;">+</button>
                </div>
            </div>
        `;
    }

    if (totalP) {
        totalP.innerText = `Gs. ${totalPrecio.toLocaleString('es-PY')}`;
    }

    modal.style.display = 'flex';
}

function cerrarModalCarrito() {
    const modal = document.getElementById('modalCarritoZori');
    if (modal) modal.style.display = 'none';
}

function sendWhatsApp() {
    const nombreCliente = document.getElementById('inputNombreCliente').value.trim();

    if (!nombreCliente) {
        alert("Por favor, ingresá tu nombre y apellido para continuar.");
        document.getElementById('inputNombreCliente').focus();
        return;
    }

    const store = obtenerStoreActual();

    let productosArray = [];
    let totalPrice = 0;

    for (let item in cart) {
        let itemTotal = cart[item].qty * cart[item].price;
        totalPrice += itemTotal;
        productosArray.push({
            cantidad: cart[item].qty,
            nombre: item
        });
    }

    if (db) {
        db.collection("pedidos").add({
            cliente: nombreCliente,
            tienda: store.nombre,
            productos: productosArray,
            total: totalPrice,
            estado: "pendiente",
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })
        .then(() => {
            console.log("Pedido sincronizado con éxito al panel Admin de Zory");
        })
        .catch((error) => {
            console.error("Error al registrar pedido en Firebase:", error);
        });
    }

    let message = `Nuevo Pedido\n\n`;
    message += `Hola Zory, quiero hacer un pedido de *${store.nombre}*:\n\n`;
    
    productosArray.forEach(p => {
        message += `- ${p.cantidad}: ${p.nombre}\n`;
    });

    message += `\nTotal: Gs. ${totalPrice.toLocaleString('es-PY')}\n\n`;
    message += `A nombre de: ${nombreCliente}\n`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${store.whatsapp}?text=${encodedMessage}`, '_blank');
}

function crearPantallaCarga() {
    if (!document.getElementById('zory-loader')) {
        const loaderHTML = `
            <div id="zory-loader" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #ffffff; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 99999; transition: opacity 0.5s ease; font-family: 'Poppins', sans-serif;">
                <img src="logo png.png" alt="Zory Logo" style="width: 100px; height: 100px; object-fit: contain; margin-bottom: 20px; animation: pulse 1.5s infinite;">
                <h2 id="loader-text" style="font-size: 18px; color: #0f172a; font-weight: 600; margin-bottom: 8px;">Cargando Zori...</h2>
                <p id="loader-sub" style="font-size: 13px; color: #64748b;">Preparando experiencia</p>
            </div>
            <style>
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.08); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.8; }
                }
            </style>
        `;
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    }
}

window.addEventListener('load', () => {
    const loader = document.getElementById('zory-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 600);
    }
});

window.addEventListener('offline', () => {
    const loader = document.getElementById('zory-loader');
    const titleText = document.getElementById('loader-text');
    const subText = document.getElementById('loader-sub');
    
    if (loader && titleText && subText) {
        titleText.innerText = "¡Sin conexión!";
        subText.innerText = "OOPS.";
        loader.style.display = 'flex';
        loader.style.opacity = '1';
    }
});

window.addEventListener('online', () => {
    const loader = document.getElementById('zory-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    crearPantallaCarga(); 
    initStore();
});

function crearModalResenaUI() {
    if (!document.getElementById('modalResenaAnonima')) {
        const modalResenaHTML = `
            <div id="modalResenaAnonima" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display: none; justify-content: center; align-items: center; z-index: 2000; font-family: 'Poppins', sans-serif; padding: 16px; box-sizing: border-box;">
                <div style="background: #ffffff; width: 100%; max-width: 450px; border-radius: 20px; padding: 24px; box-sizing: border-box; color: #1e293b; box-shadow: 0 20px 50px rgba(0,0,0,0.3); position: relative;">
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h3 style="margin:0; font-size: 18px; font-weight: 700; color: #0f172a;">Dejanos tu Reseña Anónima 🤫</h3>
                        <button onclick="cerrarModalResena()" style="background: transparent; border: none; color: #64748b; width: 32px; height: 32px; border-radius: 50%; font-size: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold;">&times;</button>
                    </div>

                    <div style="border-bottom: 1px solid #e2e8f0; margin-bottom: 16px;"></div>

                    <form id="formResenaAnonima" onsubmit="enviarResenaEmail(event)">
                        <input type="hidden" name="to_email" value="zorydelivery@gmail.com">
                        
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;">Tu mensaje o sugerencia:</label>
                            <textarea id="inputTextoResena" name="mensaje" placeholder="Escribí aquí de forma anónima..." rows="4" style="width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid #cbd5e1; background: #ffffff; color: #0f172a; box-sizing: border-box; font-family: 'Poppins', sans-serif; outline: none; font-size: 14px; resize: none;" required></textarea>
                        </div>

                        <button type="submit" id="btnEnviarResena" style="background: #F85800; color: white; border: none; padding: 14px; width: 100%; border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 15px; box-shadow: 0 4px 15px rgba(248, 88, 0,0.3); display: flex; align-items: center; justify-content: center; gap: 8px;">
                            ✉️ Enviar Reseña Anónima
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalResenaHTML);
    }
}

function abrirModalResena() {
    crearModalResenaUI();
    const modal = document.getElementById('modalResenaAnonima');
    if (modal) modal.style.display = 'flex';
}

function cerrarModalResena() {
    const modal = document.getElementById('modalResenaAnonima');
    if (modal) modal.style.display = 'none';
}

async function enviarResenaEmail(event) {
    event.preventDefault();
    const texto = document.getElementById('inputTextoResena').value.trim();
    const boton = document.getElementById('btnEnviarResena');

    if (!texto) return;

    boton.innerText = "Enviando...";
    boton.disabled = true;

    try {
        const response = await fetch("https://formsubmit.co/ajax/zorydelivery@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: "🤫 Nueva Reseña Anónima - Zory Delivery",
                mensaje: texto
            })
        });

        if (response.ok) {
            alert("¡Muchas gracias! Tu reseña anónima fue enviada con éxito.");
            document.getElementById('inputTextoResena').value = '';
            cerrarModalResena();
        } else {
            alert("Hubo un error al enviar. Intentá de nuevo.");
        }
    } catch (error) {
        alert("Error de conexión. Verificá tu internet.");
    } finally {
        boton.innerText = "✉️ Enviar Reseña Anónima";
        boton.disabled = false;
    }
}