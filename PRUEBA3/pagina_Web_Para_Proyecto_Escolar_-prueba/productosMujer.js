// ============================================
// FUNCIONALIDADES DEL HEADER (KIVY STREET)
// ============================================

// Elementos del DOM
const userIcon = document.getElementById('user-icon');
const userDropdown = document.getElementById('user-dropdown');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar'); // Si existe
const coleccionLink = document.getElementById('coleccion-link');
const coleccionMenu = document.getElementById('coleccion-menu');

// 1. DROPDOWN DE COLECCIÓN
function toggleColeccionMenu(event) {
    event.preventDefault();
    coleccionMenu.classList.toggle('show');
}

coleccionLink.addEventListener('click', toggleColeccionMenu);

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
    if (!coleccionLink.contains(event.target) && !coleccionMenu.contains(event.target)) {
        coleccionMenu.classList.remove('show');
    }
});

// Cerrar al hacer clic en una opción
coleccionMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
        coleccionMenu.classList.remove('show');
    });
});

// 2. MENÚ DE USUARIO
function toggleUserMenu() {
    userDropdown.classList.toggle('show');
}

userIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleUserMenu();
});

// Cerrar menú de usuario al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove('show');
    }
});

// 3. MODALES (login/registro)
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

// Cerrar modales al hacer clic fuera del contenido
if (loginModal) {
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) closeLoginModal();
    });
}

if (registerModal) {
    registerModal.addEventListener('click', (e) => {
        if (e.target === registerModal) closeRegisterModal();
    });
}

// 4. CARRITO (básico)
let carrito = [];

function addToCart(id) {
    // Aquí deberías tener tu lógica de productos
    // Por ahora solo actualizamos el contador de ejemplo
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = carrito.length;
    }
    // Mostrar sidebar si existe
    if (cartSidebar) {
        cartSidebar.classList.add('open');
    }
    // Aquí podrías llamar a una función de notificación
    console.log('Producto añadido');
}

// Abrir/cerrar sidebar del carrito (si existe)
if (cartIcon && cartSidebar) {
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });
    
    const closeCart = document.getElementById('close-cart');
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
        });
    }
}

// 5. NOTIFICACIONES (opcional, si quieres usarlas)
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerHTML = `
        <span>${mensaje}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        if (notificacion.parentElement) notificacion.remove();
    }, 5000);
}