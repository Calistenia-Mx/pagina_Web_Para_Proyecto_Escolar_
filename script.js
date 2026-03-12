// ============================================
// KIVY STREET - HOME SCRIPT (INDEX)
// ============================================

let heroImages = [
    "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=2000",
    "https://images.unsplash.com/photo-1620799140188-3b2a0c66ab80?q=80&w=2000",
    "https://images.unsplash.com/photo-1620799140384-ce45cece1066?q=80&w=2000"
];

let index = 0;
let heroIndex = 0;
let productosHome = [];

const track = document.getElementById('track');
const heroCarousel = document.getElementById('hero-carousel');

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

function updateCarousel() {
    const card = document.querySelector('.card');
    if(!card || !track) return;
    const cardWidth = card.offsetWidth + 20;
    track.style.transform = `translateX(${-index * cardWidth}px)`;
}

if(document.getElementById('nextBtn')) {
    document.getElementById('nextBtn').onclick = () => { 
        index = (index < productosHome.length-1) ? index+1 : 0; 
        updateCarousel(); 
    };
}

if(document.getElementById('prevBtn')) {
    document.getElementById('prevBtn').onclick = () => { 
        index = (index > 0) ? index-1 : productosHome.length-1; 
        updateCarousel(); 
    };
}

function renderizarProductosHome(list) {
    if(!track) return;
    track.innerHTML = '';
    list.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}" onclick="showQuickViewHome(${p.id})">
            <h3>${p.nombre}</h3>
            <p>$${parseFloat(p.precio).toFixed(2)}</p>
            <div class="card-buttons">
                <button class="add-btn" onclick="addToCart(${p.id}, productosHome)"> Añadir</button>
            </div>
        `;
        track.appendChild(div);
    });
    updateCarousel();
}

async function loadHomeProducts() {
    const res = await fetch('obtener_productos.php');
    productosHome = await res.json();
    renderizarProductosHome(productosHome);
}

document.addEventListener('DOMContentLoaded', () => {
    initHero();
    loadHomeProducts();
});