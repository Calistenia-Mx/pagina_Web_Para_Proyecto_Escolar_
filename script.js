// 1. DATOS (CAMBIA ESTOS LINKS POR TUS IMÁGENES)
const productos = [
    { id: 1, nombre: "KIVY Black Snapback", precio: 35.00, img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500" },
    { id: 2, nombre: "Urban Crimson", precio: 29.00, img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500" },
    { id: 3, nombre: "Street Ghost", precio: 40.00, img: "images 5.jpg" },
    { id: 4, nombre: "Night Vibe Beanie", precio: 22.00, img: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500" },
    { id: 5, nombre: "KIVY Logo Tee", precio: 25.00, img: "images 2.jpg" },
    { id: 6, nombre: "Streetwear", precio: 45.00, img: "images 3.jpg" }
];

const heroImages = [
    "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=2000",
    "https://images.unsplash.com/photo-1620799140188-3b2a0c66ab80?q=80&w=2000",
    "https://images.unsplash.com/photo-1620799140384-ce45cece1066?q=80&w=2000"
];

let carrito = [];
let index = 0;
let heroIndex = 0;

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
        img.alt = "KIVY STREET Hero Image";
        heroCarousel.appendChild(img);
    });
    setInterval(() => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        heroCarousel.style.transform = `translateX(${-heroIndex * 100}%)`;
    }, 5000);
}

// 4. CARGAR PRODUCTOS
function loadProducts() {
    productos.forEach(p => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio.toFixed(2)}</p>
            <button class="add-btn" onclick="addToCart(${p.id})">Añadir al Carrito</button>
        `;
        track.appendChild(div);
    });
}

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
};

// 5. FUNCIONALIDAD DEL CARRITO
function addToCart(id) {
    const p = productos.find(item => item.id === id);
    carrito.push(p);
    renderCart();
    cartSidebar.classList.add('open');
    mostrarNotificacion(`${p.nombre} añadido al carrito`, 'info');
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
}

function removeFromCart(i) { 
    const item = carrito[i];
    carrito.splice(i, 1); 
    renderCart(); 
    mostrarNotificacion(`${item.nombre} removido del carrito`, 'error');
}

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

// 7. SISTEMA DE USUARIOS Y PHP

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
    userDropdown.classList.toggle('show');
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove('show');
    }
});

// Mostrar modal de login
function showLoginModal() {
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    userDropdown.classList.remove('show');
}

// Mostrar modal de registro
function showRegisterModal() {
    registerModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    userDropdown.classList.remove('show');
}

// Cerrar modales
function closeLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closeRegisterModal() {
    registerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera
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

// 8. FUNCIONES PARA CONECTAR CON PHP

// Registrar usuario
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

// Iniciar sesión
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
            
            // Actualizar ícono de usuario
            userIcon.innerHTML = `👋`;
            userIcon.title = `Hola, ${result.usuario.nombre}`;
            
            // Cambiar opciones del menú
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

// Cerrar sesión
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

// 9. INICIALIZACIÓN
window.onload = () => {
    // Cargar productos y hero
    loadProducts();
    initHero();
    
    // Carrito
    document.getElementById('cart-icon').onclick = () => cartSidebar.classList.add('open');
    document.getElementById('close-cart').onclick = () => cartSidebar.classList.remove('open');
    
    // Usuario
    userIcon.onclick = (e) => {
        e.stopPropagation();
        toggleUserMenu();
    };
    
    // Verificar sesión al cargar
    checkSession();
    
    // Asegurar que el body tenga scroll
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
};

// Verificar si hay sesión activa
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