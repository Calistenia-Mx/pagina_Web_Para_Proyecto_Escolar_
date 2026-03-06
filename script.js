// ============================================
// KIVY STREET - SCRIPT PRINCIPAL
// CON FUNCIONALIDADES DE LOGIN + MERCADO PAGO
// ============================================

const productos = [
    { id: 1, nombre: "Gorra Dandy Hats", precio: 35.00, img: "imagenes/images 4.jpg" },
    { id: 2, nombre: "Gorra Thirty One", precio: 29.00, img: "imagenes/images 6.jpg" },
    { id: 3, nombre: "Gorra la ultima cena", precio: 40.00, img: "imagenes/images 5.jpg" },
    { id: 4, nombre: "Rude Awakenings Rude", precio: 22.00, img: "imagenes/images 7.jpg" },
    { id: 5, nombre: "Gorra Barbas Hats X Aleman", precio: 25.00, img: "imagenes/images 2.jpg" },
    { id: 6, nombre: "Barbas hats Chrome CT", precio: 45.00, img: "imagenes/images 3.jpg" },
    { id: 7, nombre: "Gorra Dandy Hats Clave Ali", precio: 45.00, img: "imagenes/imagen8.jpg" },
    { id: 8, nombre: "Gorra New era New York Yankees", precio: 45.00, img: "imagenes/images.jpg" },
    // NUEVOS PRODUCTOS AGREGADOS
    { id: 9, nombre: "Dandy Hats x Junior H", precio: 39.00, img: "imagenes/imagen11.jpg" },
    { id: 10, nombre: "Barbas Hats Ba", precio: 42.00, img: "imagenes/imagen12.jpg" },
    { id: 11, nombre: "Gorra Jc Hats", precio: 48.00, img: "imagenes/imagen13.jpg" },
];
const heroImages = [
    "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=2000",
    "https://images.unsplash.com/photo-1620799140188-3b2a0c66ab80?q=80&w=2000",
    "https://images.unsplash.com/photo-1620799140384-ce45cece1066?q=80&w=2000",
];

let carrito = [];
let index = 0;
let heroIndex = 0;
let currentQuickViewId = null;

// 2. ELEMENTOS DEL DOM
const track = document.getElementById('track');
const heroCarousel = document.getElementById('hero-carousel');
const cartSidebar = document.getElementById('cart-sidebar');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const userIcon = document.getElementById('user-icon');
const userDropdown = document.getElementById('user-dropdown');

// 3. CARRUSEL HERO 
function initHero() {
    heroImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "KIVY STREET";
        heroCarousel.appendChild(img);
    });
    setInterval(() => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        heroCarousel.style.transform = `translateX(${-heroIndex * 100}%)`;
    }, 5000);
}

// 4. FUNCIÓN PARA ACTUALIZAR CARRUSEL 
function updateCarousel() {
    const card = document.querySelector('.card');
    if(!card) return;
    const cardWidth = card.offsetWidth + 20;
    track.style.transform = `translateX(${-index * cardWidth}px)`;
}

document.getElementById('nextBtn').onclick = () => { 
    index = (index < productos.length-1) ? index+1 : 0; 
    updateCarousel(); 
};

document.getElementById('prevBtn').onclick = () => { 
    index = (index > 0) ? index-1 : productos.length-1; 
    updateCarousel(); 
    // MEJORA: CARRUSEL INFINITO CON MÁS PRODUCTOS
function mejorarCarruselInfinito() {
    // Hacer que el carrusel sea infinito
    const track = document.getElementById('track');
    const totalProductos = productos.length;
    
    // Clonar primeros y últimos productos para efecto infinito
    const primerosProductos = productos.slice(0, 3);
    const ultimosProductos = productos.slice(-3);
    
    primerosProductos.forEach(p => {
        const clone = document.createElement('div');
        clone.className = 'card clone';
        clone.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}" loading="lazy">
            <h3>${p.nombre}</h3>
            <p>$${p.precio.toFixed(2)}</p>
            <div class="card-buttons">
                <button class="add-btn" onclick="addToCart(${p.id})">🛒 Añadir</button>
                <button class="quick-view-btn" onclick="showQuickViewMejorado(${p.id})">👁️</button>
            </div>
        `;
        track.appendChild(clone);
    });
    
    // Agregar indicador de página
    const indicador = document.createElement('div');
    indicador.className = 'carrusel-indicador';
    indicador.innerHTML = `<span class="producto-actual">1</span> / <span class="producto-total">${totalProductos}</span>`;
    
    const controles = document.querySelector('.carousel-controls');
    controles.appendChild(indicador);
    
    // Estilos para el indicador
    const estiloIndicador = `
        .carrusel-indicador {
            color: #888;
            font-size: 0.9rem;
            margin-left: 20px;
            padding: 10px 15px;
            background: #1a1a1a;
            border-radius: 20px;
            border: 1px solid #333;
        }
        
        .producto-actual {
            color: var(--primary);
            font-weight: bold;
        }
        
        .producto-total {
            color: #666;
        }
        
        .clone {
            opacity: 0.7;
        }
        
        .clone:hover {
            opacity: 1;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = estiloIndicador;
    document.head.appendChild(style);
}

// ACTUALIZAR EL INDICADOR CUANDO CAMBIA EL CARRUSEL
function actualizarIndicador() {
    const indicadorActual = document.querySelector('.producto-actual');
    if (indicadorActual) {
        let posActual = index + 1;
        if (posActual > productos.length) posActual = 1;
        if (posActual < 1) posActual = productos.length;
        indicadorActual.textContent = posActual;
    }
}

// Modificar la función updateCarousel existente para actualizar el indicador
const updateCarouselOriginal = updateCarousel;
updateCarousel = function() {
    updateCarouselOriginal();
    actualizarIndicador();
};
};

// 5. FUNCIONALIDAD DEL CARRITO 
function addToCart(id) {
    const p = productos.find(item => item.id === id);
    carrito.push(p);
    renderCart();
    cartSidebar.classList.add('open');
    mostrarNotificacion(`${p.nombre} añadido al carrito`, 'info');
    
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

function renderCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    let total = 0;
    carrito.forEach((p, i) => {
        total += p.precio;
        container.innerHTML += `
            <div class="cart-item">
                <img src="${p.img}" width="40" alt="${p.nombre}">
                <div>
                    <h4 style="font-size:0.7rem">${p.nombre}</h4>
                    <p>$${p.precio.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${i})" style="color:red; background:none; border:none; cursor:pointer">×</button>
            </div>`;
    });
    document.getElementById('cart-count').innerText = carrito.length;
    document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;

    // Inicializar Mercado Pago después de renderizar el carrito
    setTimeout(() => {
        inicializarMercadoPago();
    }, 100);
}

function removeFromCart(i) { 
    const item = carrito[i];
    carrito.splice(i, 1); 
    renderCart(); 
    mostrarNotificacion(`${item.nombre} removido del carrito`, 'error');
}

//pago paypal 
// 6. PAYPAL 
paypal.Buttons({
    style: { color: 'black', shape: 'rect' },
    createOrder: function(data, actions) {
        const total = document.getElementById('cart-total').innerText.replace('$', '');
        return actions.order.create({ 
            purchase_units: [{ 
                amount: { 
                    value: total,
                    currency_code: 'USD'
                } 
            }] 
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(() => { 
            mostrarNotificacion('¡Compra Exitosa! Gracias por tu compra.', 'success'); 
            carrito = []; 
            renderCart(); 
            cartSidebar.classList.remove('open'); 
        });
    }
}).render('#paypal-button-container');

// 6. SISTEMA DE USUARIOS 

function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacionesExistentes = document.querySelectorAll('.notificacion');
    notificacionesExistentes.forEach(n => n.remove());
    
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerHTML = `
        <span>${mensaje}</span>
        <button onclick="this.parentElement.remove()" style="background:none; border:none; color:white; cursor:pointer; margin-left: 10px;">×</button>
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        if (notificacion.parentElement) {
            notificacion.remove();
        }
    }, 5000);
}

function toggleUserMenu() {
    userDropdown.classList.toggle('show');
}

document.addEventListener('click', (e) => {
    if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove('show');
    }
});

function showLoginModal() {
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    userDropdown.classList.remove('show');
}

function showRegisterModal() {
    registerModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    userDropdown.classList.remove('show');
}

function closeLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closeRegisterModal() {
    registerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

loginModal.onclick = (e) => {
    if (e.target === loginModal) {
        closeLoginModal();
    }
};

registerModal.onclick = (e) => {
    if (e.target === registerModal) {
        closeRegisterModal();
    }
};

// 7. FUNCIONES PARA CONECTAR CON PHP 
document.getElementById('register-form').onsubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('registrar.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            mostrarNotificacion(result.message, 'success');
            closeRegisterModal();
            e.target.reset();
            
            setTimeout(() => {
                showLoginModal();
            }, 1000);
        } else {
            result.errors.forEach(error => {
                mostrarNotificacion(error, 'error');
            });
        }
    } catch (error) {
        mostrarNotificacion('Error de conexión con el servidor', 'error');
        console.error('Error:', error);
    }
};

document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('login.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            mostrarNotificacion(`¡Bienvenido ${result.usuario.nombre}!`, 'success');
            closeLoginModal();
            
            userIcon.innerHTML = `👋`;
            userIcon.title = `Hola, ${result.usuario.nombre}`;
            
            userDropdown.innerHTML = `
                <a href="#" class="dropdown-item">Mi Perfil</a>
                <a href="#" class="dropdown-item">Mis Pedidos</a>
                <a href="#" class="dropdown-item" onclick="logout()">Cerrar Sesión</a>
            `;
        } else {
            result.errors.forEach(error => {
                mostrarNotificacion(error, 'error');
            });
        }
    } catch (error) {
        mostrarNotificacion('Error de conexión con el servidor', 'error');
        console.error('Error:', error);
    }
};

function logout() {
    fetch('logout.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                userIcon.innerHTML = `👤`;
                userIcon.title = 'Usuario';
                userDropdown.innerHTML = `
                    <a href="#" class="dropdown-item" onclick="showLoginModal()">Iniciar Sesión</a>
                    <a href="#" class="dropdown-item" onclick="showRegisterModal()">Crear Cuenta</a>
                `;
                mostrarNotificacion('Sesión cerrada exitosamente', 'info');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarNotificacion('Error al cerrar sesión', 'error');
        });
}

function checkSession() {
    fetch('check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                userIcon.innerHTML = `👋`;
                userIcon.title = `Hola, ${data.usuario.nombre}`;
                userDropdown.innerHTML = `
                    <a href="#" class="dropdown-item">Mi Perfil</a>
                    <a href="#" class="dropdown-item">Mis Pedidos</a>
                    <a href="#" class="dropdown-item" onclick="logout()">Cerrar Sesión</a>
                `;
            }
        })
        .catch(error => console.error('Error checking session:', error));
}

// ============================================
// NUEVAS MEJORAS DINÁMICAS
// ============================================

function agregarEstilosDinamicos() {
    const estilosMejorados = `
        .filtros-container {
            display: flex;
            gap: 15px;
            margin: 30px auto 50px;
            max-width: 1200px;
            padding: 0 20px;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .filtro-input, .filtro-select {
            padding: 12px 20px;
            background: #1a1a1a;
            border: 2px solid #333;
            border-radius: 30px;
            font-size: 14px;
            color: white;
            transition: all 0.3s ease;
            flex: 1;
            min-width: 200px;
            font-family: 'Inter', sans-serif;
            cursor: pointer;
        }
        
        .filtro-input:focus, .filtro-select:focus {
            border-color: #ff3e3e;
            outline: none;
            box-shadow: 0 0 0 3px rgba(255, 62, 62, 0.2);
        }
        
        .filtro-input::placeholder {
            color: #666;
        }
        
        .card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            animation: fadeInScale 0.5s ease forwards;
            position: relative;
            overflow: hidden;
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        .card:hover {
            transform: translateY(-10px);
            border-color: #ff3e3e;
            box-shadow: 0 20px 30px rgba(255, 62, 62, 0.15);
        }
        
        .card img {
            transition: transform 0.5s ease;
            cursor: pointer;
        }
        
        .card:hover img {
            transform: scale(1.08);
        }
        
        .card-buttons {
            display: flex;
            gap: 8px;
            margin-top: 15px;
        }
        
        .card-buttons .add-btn {
            flex: 1;
        }
        
        .quick-view-btn {
            background: transparent;
            border: 1px solid #444;
            color: white;
            padding: 10px 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 4px;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .quick-view-btn:hover {
            background: #ff3e3e;
            border-color: #ff3e3e;
            transform: scale(1.05);
        }
        
        #quick-view-modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            justify-content: center;
            align-items: center;
        }
        
        .quick-view-content {
            background: #1a1a1a;
            padding: 40px;
            border: 2px solid #ff3e3e;
            border-radius: 8px;
            width: 90%;
            max-width: 900px;
            position: relative;
            animation: modalPop 0.3s ease;
        }
        
        @keyframes modalPop {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .quick-view-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 20px;
        }
        
        .quick-view-image {
            border-radius: 8px;
            overflow: hidden;
            background: #000;
        }
        
        .quick-view-image img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .quick-view-details {
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .quick-view-details h2 {
            font-family: 'Syncopate', sans-serif;
            font-size: 2rem;
            margin-bottom: 15px;
            color: #ff3e3e;
        }
        
        .quick-view-price {
            font-size: 1.8rem;
            font-weight: bold;
            margin: 20px 0;
            color: white;
        }
        
        .quick-view-description {
            color: #aaa;
            line-height: 1.6;
            margin: 20px 0;
            font-size: 1rem;
        }
        
        .close-quick-view {
            position: absolute;
            right: 20px;
            top: 10px;
            font-size: 35px;
            color: #666;
            cursor: pointer;
            transition: color 0.3s ease;
            line-height: 1;
        }
        
        .close-quick-view:hover {
            color: #ff3e3e;
        }
        
        .no-resultados {
            text-align: center;
            padding: 60px;
            font-size: 1.2rem;
            color: #666;
            width: 100%;
            background: #1a1a1a;
            border-radius: 8px;
            border: 1px solid #333;
        }
        
        /* Estilos para el botón de Mercado Pago */
        #mercado-pago-container {
            margin-top: 15px;
            width: 100%;
        }
        
        .mercado-pago-button {
            background: #009ee3 !important;
            color: white !important;
            border: none !important;
            padding: 12px !important;
            border-radius: 4px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            width: 100% !important;
            transition: background 0.3s !important;
        }
        
        .mercado-pago-button:hover {
            background: #0083c7 !important;
        }
        
        @media (max-width: 768px) {
            .quick-view-grid {
                grid-template-columns: 1fr;
            }
            
            .quick-view-details h2 {
                font-size: 1.5rem;
            }
            
            .quick-view-price {
                font-size: 1.5rem;
            }
            
            .filtros-container {
                flex-direction: column;
            }
            
            .filtro-input, .filtro-select {
                width: 100%;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = estilosMejorados;
    document.head.appendChild(style);
}

function renderizarProductosMejorado(productosAMostrar) {
    track.innerHTML = '';
    
    productosAMostrar.forEach((p, index) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.style.animationDelay = `${index * 0.05}s`;
        
        div.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}" loading="lazy" onclick="showQuickViewMejorado(${p.id})">
            <h3>${p.nombre}</h3>
            <p>$${p.precio.toFixed(2)}</p>
            <div class="card-buttons">
                <button class="add-btn" onclick="addToCart(${p.id})"> Añadir</button>
                <button class="quick-view-btn" onclick="showQuickViewMejorado(${p.id})" title="Vista rápida">👁️</button>
            </div>
        `;
        track.appendChild(div);
    });
    
    if (productosAMostrar.length === 0) {
        track.innerHTML = '<div class="no-resultados">😕 No se encontraron productos</div>';
    }
    
    updateCarousel();
}

function crearFiltrosMejorados() {
    if (document.querySelector('.filtros-container')) return;
    
    const filtrosHTML = `
        <div class="filtros-container">
            <input type="text" id="busqueda" class="filtro-input" placeholder="🔍 Buscar por nombre...">
            <select id="filtro-precio" class="filtro-select">
                <option value="0">Todos los precios</option>
                <option value="25">Hasta $25</option>
                <option value="35"> Hasta $35</option>
                <option value="50">Hasta $50</option>
                <option value="100">Hasta $100</option>
            </select>
            <select id="ordenar" class="filtro-select">
                <option value="default">Ordenar por</option>
                <option value="menor">Menor precio</option>
                <option value="mayor"> Mayor precio</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
            </select>
        </div>
    `;
    
    const carruselContainer = document.querySelector('.carousel-container');
    carruselContainer.insertAdjacentHTML('afterbegin', filtrosHTML);
    
    document.getElementById('busqueda').addEventListener('input', aplicarFiltrosMejorados);
    document.getElementById('filtro-precio').addEventListener('change', aplicarFiltrosMejorados);
    document.getElementById('ordenar').addEventListener('change', aplicarFiltrosMejorados);
}

function aplicarFiltrosMejorados() {
    const busqueda = document.getElementById('busqueda').value.toLowerCase();
    const precio = parseFloat(document.getElementById('filtro-precio').value);
    const orden = document.getElementById('ordenar').value;
    
    let productosFiltrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(busqueda)
    );
    
    if (precio > 0) {
        productosFiltrados = productosFiltrados.filter(p => p.precio <= precio);
    }
    
    switch(orden) {
        case 'menor':
            productosFiltrados.sort((a, b) => a.precio - b.precio);
            break;
        case 'mayor':
            productosFiltrados.sort((a, b) => b.precio - a.precio);
            break;
        case 'az':
            productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'za':
            productosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
    }
    
    renderizarProductosMejorado(productosFiltrados);
}

function crearVistaRapidaMejorado() {
    if (document.getElementById('quick-view-modal')) return;
    
    const modalHTML = `
        <div id="quick-view-modal">
            <div class="quick-view-content">
                <span class="close-quick-view">&times;</span>
                <div class="quick-view-grid">
                    <div class="quick-view-image">
                        <img id="quick-view-img" src="" alt="Vista rápida">
                    </div>
                    <div class="quick-view-details">
                        <h2 id="quick-view-title"></h2>
                        <div class="quick-view-price" id="quick-view-price"></div>
                        <p class="quick-view-description">
                            Gorra de edición limitada KIVY STREET. Material de alta calidad, 
                            diseño exclusivo y ajuste cómodo para uso diario.
                        </p>
                        <button class="add-btn" onclick="addToCart(currentQuickViewId)">🛒 Añadir al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    document.querySelector('.close-quick-view').onclick = () => {
        document.getElementById('quick-view-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('quick-view-modal')) {
            document.getElementById('quick-view-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('quick-view-modal');
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
}

function showQuickViewMejorado(id) {
    const producto = productos.find(p => p.id === id);
    currentQuickViewId = id;
    
    document.getElementById('quick-view-img').src = producto.img;
    document.getElementById('quick-view-title').textContent = producto.nombre;
    document.getElementById('quick-view-price').textContent = `$${producto.precio.toFixed(2)}`;
    
    document.getElementById('quick-view-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ============================================
// FUNCIÓN: INICIALIZAR MERCADO PAGO (CORREGIDA)
// ============================================
function inicializarMercadoPago() {
    // Verificar si hay productos en el carrito
    if (carrito.length === 0) {
        document.getElementById('mercado-pago-container').innerHTML = '<p style="color:#666; text-align:center;">Agrega productos al carrito</p>';
        return;
    }

    // Obtener el total del carrito
    const totalElement = document.getElementById('cart-total');
    const totalTexto = totalElement.innerText.replace('$', '');
    const total = parseFloat(totalTexto);

    if (isNaN(total) || total <= 0) {
        return;
    }

    // Limpiar el contenedor
    const container = document.getElementById('mercado-pago-container');
    container.innerHTML = '';

    try {
        // IMPORTANTE: Reemplaza este token con el tuyo REAL de Mercado Pago
        // Para pruebas, puedes usar: TEST-123456789-123456 (ejemplo)
        const mp = new MercadoPago('TEST-123456789-123456', {
            locale: 'es-AR'
        });

        // Crear el botón de checkout
        mp.checkout({
            preference: preference,
            render: {
                container: '#mercado-pago-container',
                label: 'Pagar con Mercado Pago',
                type: 'wallet'
            }
        });

        console.log('Mercado Pago inicializado correctamente');
    } catch (error) {
        console.error('Error al inicializar Mercado Pago:', error);
        container.innerHTML = '<p style="color:#ff3e3e; text-align:center;">Error al cargar Mercado Pago</p>';
    }
}

// 13. INICIALIZACIÓN
window.onload = function() {
    initHero();
    
    document.getElementById('cart-icon').onclick = () => cartSidebar.classList.add('open');
    document.getElementById('close-cart').onclick = () => cartSidebar.classList.remove('open');
    
    userIcon.onclick = (e) => {
        e.stopPropagation();
        toggleUserMenu();
    };
    
    checkSession();
    
    agregarEstilosDinamicos();
    crearVistaRapidaMejorado();
    crearFiltrosMejorados();
    renderizarProductosMejorado(productos);
    
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";

    ocultarBotonesOriginales();
    agregarEstilosNavegacionHover();
    crearNavegacionHover();
    
    console.log('KIVY STREET - Versión con Mercado Pago cargada!');
};

// ============================================
// NUEVA NAVEGACIÓN POR HOVER EN LOS BORDES
// ============================================

function crearNavegacionHover() {
    const navLeft = document.createElement('div');
    const navRight = document.createElement('div');
    
    navLeft.className = 'nav-hover-left';
    navRight.className = 'nav-hover-right';
    
    navLeft.innerHTML = '‹';
    navRight.innerHTML = '›';
    
    const carouselContainer = document.querySelector('.carousel-viewport');
    carouselContainer.style.position = 'relative';
    carouselContainer.appendChild(navLeft);
    carouselContainer.appendChild(navRight);
    
    let hoverInterval;
    
    function moverCarrusel(direccion) {
        if (direccion === 'izquierda') {
            index = (index > 0) ? index-1 : productos.length-1;
        } else {
            index = (index < productos.length-1) ? index+1 : 0;
        }
        updateCarousel();
    }
    
    navLeft.addEventListener('mouseenter', () => {
        moverCarrusel('izquierda');
        hoverInterval = setInterval(() => {
            moverCarrusel('izquierda');
        }, 800);
    });
    
    navLeft.addEventListener('mouseleave', () => {
        clearInterval(hoverInterval);
    });
    
    navRight.addEventListener('mouseenter', () => {
        moverCarrusel('derecha');
        hoverInterval = setInterval(() => {
            moverCarrusel('derecha');
        }, 800);
    });
    
    navRight.addEventListener('mouseleave', () => {
        clearInterval(hoverInterval);
    });
    
    navLeft.addEventListener('click', () => moverCarrusel('izquierda'));
    navRight.addEventListener('click', () => moverCarrusel('derecha'));
}

function agregarEstilosNavegacionHover() {
    const estilosNavegacion = `
        .nav-hover-left, .nav-hover-right {
            position: absolute;
            top: 0;
            width: 100px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: white;
            background: linear-gradient(to right, rgba(0,0,0,0.5), transparent);
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10;
            user-select: none;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(255,62,62,0.5);
        }
        
        .nav-hover-right {
            right: 0;
            background: linear-gradient(to left, rgba(0,0,0,0.5), transparent);
        }
        
        .carousel-viewport:hover .nav-hover-left,
        .carousel-viewport:hover .nav-hover-right {
            opacity: 1;
        }
        
        .nav-hover-left:hover, .nav-hover-right:hover {
            background: linear-gradient(to right, rgba(255,62,62,0.3), transparent);
            color: var(--primary);
            opacity: 1;
        }
        
        .nav-hover-right:hover {
            background: linear-gradient(to left, rgba(255,62,62,0.3), transparent);
        }
        
        @keyframes pulseNav {
            0% { opacity: 0.3; }
            50% { opacity: 0.7; }
            100% { opacity: 0.3; }
        }
        
        .carousel-viewport:not(:hover) .nav-hover-left,
        .carousel-viewport:not(:hover) .nav-hover-right {
            animation: pulseNav 2s infinite;
            opacity: 0.3;
        }
        
        @media (max-width: 768px) {
            .nav-hover-left, .nav-hover-right {
                width: 60px;
                font-size: 2rem;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = estilosNavegacion;
    document.head.appendChild(style);
}

function ocultarBotonesOriginales() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
}
// ============================================
// MEJORAS INTERACTIVAS KIVY STREET (SIN INSTAGRAM)
// ============================================

// 1. EFECTO PARALLAX EN HERO
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImages = document.querySelectorAll('.hero-image-carousel img');
        heroImages.forEach(img => {
            img.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.001})`;
        });
    });
}

// 2. PARTÍCULAS FLOTANTES
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.background = `rgba(255, 62, 62, ${Math.random() * 0.3})`;
        particlesContainer.appendChild(particle);
    }
}

// 3. BARRA DE PROGRESO
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 4. EFECTO DE ESCRITURA EN HERO
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerText;
    heroTitle.innerHTML = '';
    heroTitle.className = 'typing-effect';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// 5. SKELETON LOADING PARA PRODUCTOS
function showSkeletonLoading() {
    const track = document.getElementById('track');
    track.innerHTML = '';
    
    for (let i = 0; i < 6; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'card skeleton';
        skeleton.innerHTML = `
            <div style="height: 200px; width: 100%; background: #2a2a2a;"></div>
            <div style="height: 20px; width: 80%; margin: 10px auto; background: #2a2a2a;"></div>
            <div style="height: 20px; width: 50%; margin: 10px auto; background: #2a2a2a;"></div>
        `;
        track.appendChild(skeleton);
    }
    
    setTimeout(() => {
        renderizarProductosMejorado(productos);
    }, 2000);
}






// 9. EFECTO DE MOUSEOVER EN TARJETAS
function initCardHoverEffect() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// 10. INICIALIZAR TODAS LAS MEJORAS
function initAllEnhancements() {
    initParallax();
    createParticles();
    createScrollProgress();
    
    showSkeletonLoading();
    
    setTimeout(() => {
        createWelcomeModal();
    }, 2000);
    
    createCountdownTimer();
    createWhatsAppButton();
    
    setTimeout(() => {
        initCardHoverEffect();
    }, 2000);
    
    setTimeout(initTypingEffect, 3000);
    
    console.log('🎨 Todas las mejoras visuales activadas!');
}

// MODIFICAR EL window.onload EXISTENTE
const originalOnload = window.onload;
window.onload = function() {
    if (originalOnload) originalOnload();
    
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.classList.add('glitch');
        heroTitle.setAttribute('data-text', heroTitle.innerText);
    }
    
    initAllEnhancements();
};