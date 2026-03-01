document.addEventListener("DOMContentLoaded", function() {

    if (!document.querySelector('.carousel-container')) {
        return;
    }

    console.log("Home cargado");

    // aquí va todo tu código del carrusel
    // ============================================
// KIVY STREET - HOME
// Carrusel productos / filtros / quick view / navegación hover
// ============================================

// 4. FUNCIÓN PARA ACTUALIZAR CARRUSEL
function updateCarousel() {
    const card = document.querySelector('.card');
    if (!card || !track) return;
    const cardWidth = card.offsetWidth + 20;
    track.style.transform = `translateX(${-index * cardWidth}px)`;
}

// Botones originales (si existen)
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (nextBtn) {
    nextBtn.onclick = () => {
        index = (index < productos.length - 1) ? index + 1 : 0;
        updateCarousel();
    };
}

if (prevBtn) {
    prevBtn.onclick = () => {
        index = (index > 0) ? index - 1 : productos.length - 1;
        updateCarousel();
    };
}

// ============================================
// NUEVAS MEJORAS DINÁMICAS (SIN AFECTAR LO ANTERIOR)
// ============================================

// 9. ESTILOS DINÁMICOS
function agregarEstilosDinamicos() {
    const estilosMejorados = `
        /* FILTROS */
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

        /* CARDS ANIMADAS */
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

        /* BOTONES DE CARD */
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

        /* VISTA RÁPIDA MODAL */
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

        /* NO RESULTADOS */
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

        /* RESPONSIVE */
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

// 10. RENDERIZAR PRODUCTOS CON MEJORAS
function renderizarProductosMejorado(productosAMostrar) {
    if (!track) return;
    track.innerHTML = '';

    productosAMostrar.forEach((p, indexLocal) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.style.animationDelay = `${indexLocal * 0.05}s`;

        div.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}" loading="lazy" onclick="showQuickViewMejorado(${p.id})">
            <h3>${p.nombre}</h3>
            <p>$${p.precio.toFixed(2)}</p>
            <div class="card-buttons">
                <button class="add-btn" onclick="addToCart(${p.id})">🛒 Añadir</button>
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

// 11. FILTROS MEJORADOS
function crearFiltrosMejorados() {
    // Verificar si ya existen filtros
    if (document.querySelector('.filtros-container')) return;

    const filtrosHTML = `
        <div class="filtros-container">
            <input type="text" id="busqueda" class="filtro-input" placeholder="🔍 Buscar por nombre...">
            <select id="filtro-precio" class="filtro-select">
                <option value="0">Todos los precios</option>
                <option value="25">💵 Hasta $25</option>
                <option value="35">💵 Hasta $35</option>
                <option value="50">💵 Hasta $50</option>
                <option value="100">💵 Hasta $100</option>
            </select>
            <select id="ordenar" class="filtro-select">
                <option value="default">Ordenar por</option>
                <option value="menor">💰 Menor precio</option>
                <option value="mayor">💰 Mayor precio</option>
                <option value="az">📝 A-Z</option>
                <option value="za">📝 Z-A</option>
            </select>
        </div>
    `;

    const carruselContainer = document.querySelector('.carousel-container');
    if (!carruselContainer) return;

    carruselContainer.insertAdjacentHTML('afterbegin', filtrosHTML);

    // Event listeners
    document.getElementById('busqueda').addEventListener('input', aplicarFiltrosMejorados);
    document.getElementById('filtro-precio').addEventListener('change', aplicarFiltrosMejorados);
    document.getElementById('ordenar').addEventListener('change', aplicarFiltrosMejorados);
}

// 12. APLICAR FILTROS
function aplicarFiltrosMejorados() {
    const busquedaEl = document.getElementById('busqueda');
    const precioEl = document.getElementById('filtro-precio');
    const ordenarEl = document.getElementById('ordenar');

    if (!busquedaEl || !precioEl || !ordenarEl) return;

    const busqueda = busquedaEl.value.toLowerCase();
    const precio = parseFloat(precioEl.value);
    const orden = ordenarEl.value;

    let productosFiltrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(busqueda)
    );

    if (precio > 0) {
        productosFiltrados = productosFiltrados.filter(p => p.precio <= precio);
    }

    // Ordenar
    switch (orden) {
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

// 13. VISTA RÁPIDA MEJORADA
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

    // Event listeners para cerrar
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

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('quick-view-modal');
            if (modal && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
}

function showQuickViewMejorado(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    currentQuickViewId = id;

    document.getElementById('quick-view-img').src = producto.img;
    document.getElementById('quick-view-title').textContent = producto.nombre;
    document.getElementById('quick-view-price').textContent = `$${producto.precio.toFixed(2)}`;

    document.getElementById('quick-view-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ============================================
// NUEVA NAVEGACIÓN POR HOVER EN LOS BORDES
// ============================================

function crearNavegacionHover() {
    const carouselContainer = document.querySelector('.carousel-viewport');
    if (!carouselContainer) return;

    // Crear los indicadores visuales de navegación
    const navLeft = document.createElement('div');
    const navRight = document.createElement('div');

    navLeft.className = 'nav-hover-left';
    navRight.className = 'nav-hover-right';

    navLeft.innerHTML = '‹';
    navRight.innerHTML = '›';

    // Agregar al contenedor del carrusel
    carouselContainer.style.position = 'relative';
    carouselContainer.appendChild(navLeft);
    carouselContainer.appendChild(navRight);

    // Variables para controlar el hover
    let hoverInterval;

    // Función para mover el carrusel
    function moverCarrusel(direccion) {
        if (direccion === 'izquierda') {
            index = (index > 0) ? index - 1 : productos.length - 1;
        } else {
            index = (index < productos.length - 1) ? index + 1 : 0;
        }
        updateCarousel();
    }

    // Eventos para la zona izquierda
    navLeft.addEventListener('mouseenter', () => {
        moverCarrusel('izquierda'); // Movimiento inmediato al entrar
        hoverInterval = setInterval(() => {
            moverCarrusel('izquierda');
        }, 800); // Movimiento cada 800ms mientras mantenga el cursor
    });

    navLeft.addEventListener('mouseleave', () => {
        clearInterval(hoverInterval);
    });

    // Eventos para la zona derecha
    navRight.addEventListener('mouseenter', () => {
        moverCarrusel('derecha'); // Movimiento inmediato al entrar
        hoverInterval = setInterval(() => {
            moverCarrusel('derecha');
        }, 800);
    });

    navRight.addEventListener('mouseleave', () => {
        clearInterval(hoverInterval);
    });

    // También permitir clic como alternativa
    navLeft.addEventListener('click', () => moverCarrusel('izquierda'));
    navRight.addEventListener('click', () => moverCarrusel('derecha'));
}

// Agregar los estilos para las zonas de navegación
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

        /* Animación de pulso para indicar que pueden hacer clic/hover */
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

        /* Responsive */
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

// OCULTAR LOS BOTONES PREV Y NEXT ORIGINALES
function ocultarBotonesOriginales() {
    const prevBtnLocal = document.getElementById('prevBtn');
    const nextBtnLocal = document.getElementById('nextBtn');

    if (prevBtnLocal && nextBtnLocal) {
        prevBtnLocal.style.display = 'none';
        nextBtnLocal.style.display = 'none';
    }
}

// 14. INICIALIZACIÓN (se queda igual, solo que ya está en home.js)
window.onload = function () {
    // Tus funciones originales
    initHero();

    // Carrito
    const cartIcon = document.getElementById('cart-icon');
    const closeCart = document.getElementById('close-cart');

    if (cartIcon && cartSidebar) cartIcon.onclick = () => cartSidebar.classList.add('open');
    if (closeCart && cartSidebar) closeCart.onclick = () => cartSidebar.classList.remove('open');

    // Usuario
    if (userIcon) {
        userIcon.onclick = (e) => {
            e.stopPropagation();
            toggleUserMenu();
        };
    }

    // Verificar sesión
    checkSession();

    // NUEVAS MEJORAS
    agregarEstilosDinamicos();
    crearVistaRapidaMejorado();
    crearFiltrosMejorados();
    renderizarProductosMejorado(productos); // Reemplaza a loadProducts()

    // Asegurar scroll
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";

    // Nueva navegación hover
    ocultarBotonesOriginales();
    agregarEstilosNavegacionHover();
    crearNavegacionHover();

    console.log('KIVY STREET - Versión Mejorada cargada!');
};

});