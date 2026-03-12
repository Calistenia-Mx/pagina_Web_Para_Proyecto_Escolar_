// ============================================
// DATOS DE PRODUCTOS (para la página de mujer)
// ============================================
const productosMujer = [
    {
        id: 101,
        nombre: "New York Yankees Authentic Collection 59FIFTY Cerrada",
        precio: 999.00,
        img: "https://www.newera.mx/cdn/shop/files/60565238_W9FORTY_WMN_MLB_LEAGUEESSENTIAL_LOSDOD_PRPL_3QL_720x.jpg?v=1727718008", // Reemplaza con URLs reales
        descripcion: "Los Angeles Dodgers MLB League Essentials 9FORTY Strapback Morada para Mujer"
    },
    {
        id: 102,
        nombre: "Los Angeles Dodgers MLB League Essentials 9FORTY Strapback Amarilla para Mujer",
        precio: 799.00,
        img: "", // Reemplaza con URLs reales
        img: "http://newera.mx/cdn/shop/files/60565240_W9FORTY_WMN_MLB_LEAGUEESSENTIAL_LOSDOD_MRRN_YLLW_3QL_720x.jpg?v=1727718257",
        descripcion: "Replica oficial con ajuste snapback."
    },
    {
        id: 103,
        nombre: "Los Angeles Dodgers MLB Classics 9FORTY Strapback para Mujer",
        precio: 999.00,
        img: "", // Reemplaza con URLs reales
        img: "https://www.newera.mx/cdn/shop/files/13774090_9FORTYW_MLB_ESSMX_LOADOD_BL_3QL_720x.png?v=1692055773",
        descripcion: "Gorra de los Dodgers, edición coleccionista."
    },
    {
        id: 104,
        nombre: "Los Angeles Dodgers MLB Metallic ",
        precio: 699.00,
        img: "https://www.newera.mx/cdn/shop/files/60565487_W9FORTY_AF_WMN_MLB_LOSDOD_PCH_3QL_720x.jpg?v=1727393489",
        descripcion: "Los Angeles Dodgers MLB Metallic Logo 9FORTY AF Snapback para Mujer Rosa."
    },
    {
        id: 105,
        nombre: "New York Yankees MLB Velour 9FORTY ",
        precio: 749.00,
        img: "https://www.newera.mx/cdn/shop/files/60292435_3QL_720x.png?v=1772125776",
        descripcion: "New York Yankees MLB Velour 9FORTY Strapback Negra para Mujer."
    },
    {
        id: 106,
        nombre: "Liverpool FC 9FORTY Strapback ",
        precio: 899.00,
        img: "https://www.newera.mx/cdn/shop/files/60852600_9FORTY_SS26_LIVPOL_YELLOW_3QL_720x.png?v=1770135920",
        descripcion: "Liverpool FC 9FORTY Strapback para Mujer."
    },
    {
        id: 107,
        nombre: "New York Yankees MLB Cord 9FORTY ",
        precio: 849.00,
        img: "https://www.newera.mx/cdn/shop/files/60691365_W9FORTY_WMN_MLB_CORD_NEYYAN_BLK_3QL_720x.jpg?v=1753069140",
        descripcion: "New York Yankees MLB Cord 9FORTY Strapback para Mujer."
    },
    {
        id: 108,
        nombre: "New York Yankees MLB Women's Metallic 9FORTY Strapback",
        precio: 899.00,
        img: "https://www.newera.mx/cdn/shop/files/60435263_WMN_9FORTY_WOMEN_MLB_NEWYAN_SND_3QL_720x.jpg?v=1718660492",
        descripcion: "New York Yankees MLB Women's Metallic 9FORTY Strapback Beige para Mujer"
    },
    {
        id: 109,
        nombre: "Los Angeles Dodgers MLB Women's Metallic 9FORTY",
        precio: 799.00,
        img: "https://www.newera.mx/cdn/shop/files/60435262_W9FORTY_WMN_MLB_METALICLOGO_NEYYAN_PRPL_3QL_720x.jpg?v=1718660469",
        descripcion: "Los Angeles Dodgers MLB Women's Metallic 9FORTY Strapback Morada para Mujer."
    },
    {
        id: 110,
        nombre: "New York Mets MLB Floral Pack 9FORTY Strapback",
        precio: 799.00,
        img: "https://www.newera.mx/cdn/shop/files/60916326_9FORTY_NEYMET_CHRM_3QL_720x.png?v=1771403166",
        descripcion: "New York Mets MLB Floral Pack 9FORTY Strapback."
    },
    {
        id: 111,
        nombre: "New Era Floral Pack 9FORTY Strapback ",
        precio: 699.00,
        img: "https://www.newera.mx/cdn/shop/files/60916334_9FORTY_NE_NEWERA_CHRM_BRWN_3QL_720x.png?v=1771403167",
        descripcion: "New Era Floral Pack 9FORTY Strapback para Mujer."
    },
    {
        id: 112,
        nombre: "Los Angeles Dodgers MLB Floral Pack 9FORTY Strapback",
        precio: 999.00,
        img: "https://www.newera.mx/cdn/shop/files/60916325_W9FORTY_WMN_MLB_LOSDOD_CHRM_SKY_3QL_720x.png?v=1771403167",
        descripcion: "Los Angeles Dodgers MLB Floral Pack 9FORTY Strapback para Mujer."
    },
    {
        id: 113,
        nombre: "New York Yankees MLB Floral Pack 9FORTY Strapback ",
        precio: 849.00,
        img: "https://www.newera.mx/cdn/shop/files/60916330_9FORTY_MLB_NEYYAN_CHRM_YLLW_3QL_720x.png?v=1771428780",
        descripcion: "New York Yankees MLB Floral Pack 9FORTY Strapback para Mujer."
    },
    {
        id: 114,
        nombre: "New York Yankees MLB Metallic Logo 9FORTY A-Frame Trucker Snapback Negra ",
        precio: 899.00,
        img: "https://www.newera.mx/cdn/shop/files/60691369_9FORTYAF_MLB_NEYYAN_BLK_3QL_720x.png?v=1768848622",
        descripcion: "New York Yankees MLB Metallic Logo 9FORTY A-Frame Trucker Snapback Negra para Mujer."
    },
    {
        id: 115,
        nombre: "Los Angeles Dodgers MLB Cord 9FORTY Strapback ",
        precio: 749.00,
        img: "https://www.newera.mx/cdn/shop/files/60691358_W9FORTY_WMN_MLB_LOSDOD_GRN_3QL_720x.jpg?v=1753069532",
        descripcion: "Los Angeles Dodgers MLB Cord 9FORTY Strapback para Mujer."
    }
];

// Función para renderizar el grid
function renderProductosGrid() {
    const grid = document.getElementById('productos-grid');
    if (!grid) return;

    grid.innerHTML = '';
    productosMujer.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}" loading="lazy" onclick="showQuickView(${p.id})">
            <h3>${p.nombre}</h3>
            <div class="product-price">$${p.precio.toFixed(2)}</div>
            <p class="product-description">${p.descripcion}</p>
            <div class="card-buttons">
                <button class="add-btn" onclick="addToCart(${p.id})">🛒 Añadir</button>
                <button class="quick-view-btn" onclick="showQuickView(${p.id})" title="Vista rápida">👁️</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Función de vista rápida (puedes reutilizar la que ya tienes o crear una simple)
function showQuickView(id) {
    const producto = productosMujer.find(p => p.id === id);
    if (!producto) return;
    // Aquí podrías implementar un modal de vista rápida, o simplemente mostrar una alerta
    // Por ahora, solo haremos un console.log
    console.log('Vista rápida de:', producto.nombre);
    // También podrías abrir un modal con los detalles
    alert(`Vista rápida:\n${producto.nombre}\nPrecio: $${producto.precio}\n${producto.descripcion}`);
}

// Función addToCart mejorada (necesitas integrar con tu carrito existente)
// Nota: tu carrito actual es un array vacío. Debes modificar addToCart para que agregue el producto.
// Voy a redefinir addToCart para que use el array global carrito y actualice la vista.
// Asegúrate de que tu carrito y funciones de render estén disponibles.

// Si ya tienes un carrito definido arriba, lo usamos. Si no, lo creamos.
if (typeof carrito === 'undefined') {
    var carrito = [];
}

// Sobrescribimos addToCart para que funcione con productosMujer
function addToCart(id) {
    const producto = productosMujer.find(p => p.id === id);
    if (!producto) return;
    
    carrito.push(producto);
    
    // Actualizar contador
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = carrito.length;
    }
    
    // Mostrar sidebar
    if (cartSidebar) {
        cartSidebar.classList.add('open');
    }
    
    // Actualizar items del carrito (si tienes función renderCart, llámala)
    if (typeof renderCart === 'function') {
        renderCart();
    } else {
        // Si no, al menos mostrar notificación
        mostrarNotificacion(`${producto.nombre} añadido al carrito`, 'info');
    }
}

// Llamar a renderizar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    renderProductosGrid();
});