// ============================================
// KIVY STREET - HOME SCRIPT (VERSION MEJORADA + CORE)
// ============================================

let heroImages = [
    "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=2000",
    "https://images.unsplash.com/photo-1620799140188-3b2a0c66ab80?q=80&w=2000",
    "https://images.unsplash.com/photo-1620799140384-ce45cece1066?q=80&w=2000"
];

let index = 0;
let heroIndex = 0;
let productosBase = []; // Datos crudos de la BD

const track = document.getElementById('track');
const heroCarousel = document.getElementById('hero-carousel');

// 1. HERO CAROUSEL
function initHero() {
    if(!heroCarousel) return;
    heroImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "KIVY STREET Hero Image";
        heroCarousel.appendChild(img);
    });
    setInterval(() => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        heroCarousel.style.transform = `translateX(${-heroIndex * 100}%)`;
    }, 5000);
}

// 2. NAVEGACION CARRUSEL
function updateCarousel() {
    const card = document.querySelector('.card');
    if(!card || !track) return;
    const cardWidth = card.offsetWidth + 20;
    track.style.transform = `translateX(${-index * cardWidth}px)`;
}

document.getElementById('nextBtn').onclick = () => { 
    index = (index < (track.children.length - 1)) ? index+1 : 0; 
    updateCarousel(); 
};

document.getElementById('prevBtn').onclick = () => { 
    index = (index > 0) ? index-1 : (track.children.length - 1); 
    updateCarousel(); 
};

// 3. RENDERIZADO MEJORADO
function renderizarProductosDinamico(lista) {
    if(!track) return;
    track.innerHTML = '';
    
    if(lista.length === 0) {
        track.innerHTML = '<div class="no-resultados"> No se encontraron productos</div>';
        return;
    }

    lista.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = 'card fade-in-scale';
        div.style.animationDelay = `${i * 0.1}s`;
        div.innerHTML = `
            <div class="card-img-container">
                <img src="${p.imagen}" alt="${p.nombre}" onclick="showQuickViewMejorado(${p.id})">
            </div>
            <h3>${p.nombre}</h3>
            <p class="product-price">$${parseFloat(p.precio).toFixed(2)}</p>
            <div class="card-buttons">
                <button class="add-btn" onclick="addToCart(${p.id}, productosBase)"> <i class="fas fa-shopping-bag"></i> Añadir</button>
                <button class="quick-view-btn" onclick="showQuickViewMejorado(${p.id})"> <i class="fas fa-eye"></i></button>
            </div>
        `;
        track.appendChild(div);
    });
    index = 0;
    updateCarousel();
}

// 4. VISTA RAPIDA
function showQuickViewMejorado(id) {
    const p = productosBase.find(item => item.id == id);
    if(!p) return;
    
    // Si no existe el modal en el DOM, core.js debería manejarlo o lo creamos aquí
    // Para simplificar, usamos una función de core si existe, o implementamos una rápida
    if(typeof window.setupQuickViewModal === 'function') {
        window.openQuickView(p);
    } else {
        // Implementación rápida si core no la tiene
        mostrarNotificacion(`Detalles de: ${p.nombre}`, 'info');
    }
}

// 5. FILTROS
async function loadAndInit() {
    try {
        const res = await fetch('obtener_productos.php');
        productosBase = await res.json();
        renderizarProductosDinamico(productosBase);
        crearFiltrosHome();
    } catch (e) {
        console.error("Error cargando productos:", e);
    }
}

function crearFiltrosHome() {
    const busqueda = document.getElementById('busqueda');
    if(busqueda) {
        busqueda.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtrados = productosBase.filter(p => p.nombre.toLowerCase().includes(term));
            renderizarProductosDinamico(filtrados);
        });
    }
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
    initHero();
    loadAndInit();
});