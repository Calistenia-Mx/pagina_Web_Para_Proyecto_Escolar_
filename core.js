// ============================================
// KIVY STREET - CORE (GLOBAL)
// Login / sesión / carrito / usuario / hero / PayPal / notificaciones
// ============================================

// 1. DATOS DE PRODUCTOS
const productos = [
    { id: 1, nombre: "Gorra Dandy Hats", precio: 35.00, img: "imagenes/images 4.jpg" },
    { id: 2, nombre: "Gorra Thirty One", precio: 29.00, img: "imagenes/images 6.jpg" },
    { id: 3, nombre: "Gorra la ultima cena", precio: 40.00, img: "imagenes/images 5.jpg" },
    { id: 4, nombre: "Rude Awakenings Rude", precio: 22.00, img: "imagenes/images 7.jpg" },
    { id: 5, nombre: "Gorra Barbas Hats X Aleman", precio: 25.00, img: "imagenes/images 2.jpg" },
    { id: 6, nombre: "Barbas hats Chrome CT", precio: 45.00, img: "imagenes/images 3.jpg" },
    { id: 7, nombre: "Gorra 31 Hats", precio: 45.00, img: "imagenes/images 8.jpg" },
    { id: 8, nombre: "Gorra New era New York Yankees", precio: 45.00, img: "imagenes/images.jpg" },
];

const heroImages = [
    "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=2000",
    "https://images.unsplash.com/photo-1620799140188-3b2a0c66ab80?q=80&w=2000",
    "https://images.unsplash.com/photo-1620799140384-ce45cece1066?q=80&w=2000"
];

let carrito = [];
let index = 0;
let heroIndex = 0;
let currentQuickViewId = null; // Para vista rápida

// 2. ELEMENTOS DEL DOM (GLOBAL)
const track = document.getElementById('track');
const heroCarousel = document.getElementById('hero-carousel');
const cartSidebar = document.getElementById('cart-sidebar');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const userIcon = document.getElementById('user-icon');
const userDropdown = document.getElementById('user-dropdown');

// 3. CARRUSEL HERO
function initHero() {
    if (!heroCarousel) return;

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

// 5. FUNCIONALIDAD DEL CARRITO
function addToCart(id) {
    const p = productos.find(item => item.id === id);
    if (!p) return;

    carrito.push(p);
    renderCart();

    if (cartSidebar) cartSidebar.classList.add('open');
    mostrarNotificacion(`${p.nombre} añadido al carrito`, 'info');

    // Efecto visual en el icono del carrito
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }
}

function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;

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

    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    if (cartCount) cartCount.innerText = carrito.length;
    if (cartTotal) cartTotal.innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(i) {
    const item = carrito[i];
    carrito.splice(i, 1);
    renderCart();

    if (item) {
        mostrarNotificacion(`${item.nombre} removido del carrito`, 'error');
    }
}

// 6. PAYPAL
// Nota: esto requiere que el script de PayPal ya esté cargado en tu HTML.
if (typeof paypal !== 'undefined') {
    paypal.Buttons({
        style: { color: 'black', shape: 'rect' },
        createOrder: function (data, actions) {
            const totalText = document.getElementById('cart-total')?.innerText || '$0';
            const total = totalText.replace('$', '');
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total,
                        currency_code: 'USD'
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(() => {
                mostrarNotificacion('¡Compra Exitosa! Gracias por tu compra.', 'success');
                carrito = [];
                renderCart();
                if (cartSidebar) cartSidebar.classList.remove('open');
            });
        }
    }).render('#paypal-button-container');
}

// 7. SISTEMA DE USUARIOS

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Remover notificaciones existentes
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

// Menú desplegable de usuario
function toggleUserMenu() {
    if (!userDropdown) return;
    userDropdown.classList.toggle('show');
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!userIcon || !userDropdown) return;
    if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove('show');
    }
});

// Mostrar modal de login
function showLoginModal() {
    if (!loginModal) return;
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (userDropdown) userDropdown.classList.remove('show');
}

// Mostrar modal de registro
function showRegisterModal() {
    if (!registerModal) return;
    registerModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (userDropdown) userDropdown.classList.remove('show');
}

// Cerrar modales
function closeLoginModal() {
    if (!loginModal) return;
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closeRegisterModal() {
    if (!registerModal) return;
    registerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera
if (loginModal) {
    loginModal.onclick = (e) => {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    };
}

if (registerModal) {
    registerModal.onclick = (e) => {
        if (e.target === registerModal) {
            closeRegisterModal();
        }
    };
}

// 8. FUNCIONES PARA CONECTAR CON PHP

// Registrar usuario
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.onsubmit = async (e) => {
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

                // Mostrar login después de 1 segundo
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
}

// Iniciar sesión
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.onsubmit = async (e) => {
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

                // Actualizar ícono de usuario
                if (userIcon) {
                    userIcon.innerHTML = `👋`;
                    userIcon.title = `Hola, ${result.usuario.nombre}`;
                }

                // Cambiar opciones del menú
                if (userDropdown) {
                    userDropdown.innerHTML = `
                        <a href="#" class="dropdown-item">Mi Perfil</a>
                        <a href="#" class="dropdown-item">Mis Pedidos</a>
                        <a href="#" class="dropdown-item" onclick="logout()">Cerrar Sesión</a>
                    `;
                }
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
}

// Cerrar sesión
function logout() {
    fetch('logout.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (userIcon) {
                    userIcon.innerHTML = `👤`;
                    userIcon.title = 'Usuario';
                }
                if (userDropdown) {
                    userDropdown.innerHTML = `
                        <a href="#" class="dropdown-item" onclick="showLoginModal()">Iniciar Sesión</a>
                        <a href="#" class="dropdown-item" onclick="showRegisterModal()">Crear Cuenta</a>
                    `;
                }
                mostrarNotificacion('Sesión cerrada exitosamente', 'info');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarNotificacion('Error al cerrar sesión', 'error');
        });
}

// Verificar si hay sesión activa
function checkSession() {
    fetch('check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                if (userIcon) {
                    userIcon.innerHTML = `👋`;
                    userIcon.title = `Hola, ${data.usuario.nombre}`;
                }
                if (userDropdown) {
                    userDropdown.innerHTML = `
                        <a href="#" class="dropdown-item">Mi Perfil</a>
                        <a href="#" class="dropdown-item">Mis Pedidos</a>
                        <a href="#" class="dropdown-item" onclick="logout()">Cerrar Sesión</a>
                    `;
                }
            }
        })
        .catch(error => console.error('Error checking session:', error));
}

document.addEventListener("DOMContentLoaded", function () {
    initHero();
    checkSession();
});