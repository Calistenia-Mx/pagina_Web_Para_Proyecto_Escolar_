// ============================================
// KIVY STREET - CORE LOGIC (CART, USER, PAYPAL)
// ============================================

let carrito = [];
let currentQuickViewId = null;

// ELEMENTOS COMUNES
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const userIcon = document.getElementById('user-icon');
const userDropdown = document.getElementById('user-dropdown');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartItemsContainer = document.getElementById('cart-items');

// 1. NOTIFICACIONES
function mostrarNotificacion(mensaje, tipo = 'success') {
    const existing = document.querySelectorAll('.notificacion');
    existing.forEach(n => n.remove());
    
    const div = document.createElement('div');
    div.className = `notificacion ${tipo}`;
    div.innerHTML = `<span>${mensaje}</span><button onclick="this.parentElement.remove()">×</button>`;
    document.body.appendChild(div);
    setTimeout(() => { if(div.parentElement) div.remove(); }, 5000);
}

// 2. CARRITO
function addToCart(id, productosArray) {
    const p = productosArray.find(item => item.id == id);
    if(!p) return;
    carrito.push(p);
    renderCart();
    openCart();
    mostrarNotificacion(`${p.nombre} añadido`, 'info');
}

function renderCart() {
    if(!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    let total = 0;
    carrito.forEach((p, i) => {
        total += parseFloat(p.precio);
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${p.imagen || p.img}" alt="${p.nombre}">
                <div>
                    <h4>${p.nombre}</h4>
                    <p>$${parseFloat(p.precio).toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${i})">×</button>
            </div>`;
    });
    if(cartCount) cartCount.innerText = carrito.length;
    if(cartTotal) cartTotal.innerText = `$${total.toFixed(2)}`;
    renderMercadoPago();
}

function removeFromCart(i) {
    carrito.splice(i, 1);
    renderCart();
}

function openCart() {
    cartSidebar.classList.add('open');
    if(cartOverlay) cartOverlay.classList.add('active');
}

function closeCart() {
    cartSidebar.classList.remove('open');
    if(cartOverlay) cartOverlay.classList.remove('active');
}

// 3. MERCADO PAGO
const mp = new MercadoPago('APP_USR-f2d11c81-8b2b-4d44-9c8a-7889e49a8b9e'); // Public Key de prueba o real

function renderMercadoPago() {
    const container = document.getElementById('wallet_container');
    if(!container) return;
    container.innerHTML = '';
    
    const totalVal = cartTotal.innerText.replace('$', '');
    if(parseFloat(totalVal) <= 0) return;

    // Crear botón de Mercado Pago
    const btn = document.createElement('button');
    btn.className = 'checkout-btn';
    btn.innerText = 'PAGAR CON MERCADO PAGO';
    btn.onclick = async () => {
        const res = await fetch('crear_preferencia.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: carrito, total: totalVal })
        });
        const preference = await res.json();
        if(preference.id) {
            mp.checkout({
                preference: { id: preference.id },
                autoOpen: true
            });
        }
    };
    container.appendChild(btn);
}

// 4. USUARIOS
function toggleUserMenu() { userDropdown.classList.toggle('show'); }
function showLoginModal() { loginModal.style.display = 'flex'; userDropdown.classList.remove('show'); }
function showRegisterModal() { registerModal.style.display = 'flex'; userDropdown.classList.remove('show'); }
function closeModals() { loginModal.style.display = 'none'; registerModal.style.display = 'none'; document.body.style.overflow = 'auto'; }

if(userIcon) userIcon.onclick = (e) => { e.stopPropagation(); toggleUserMenu(); };
window.onclick = (e) => {
    if(e.target == loginModal || e.target == registerModal) closeModals();
    if(userDropdown && !userIcon.contains(e.target) && !userDropdown.contains(e.target)) userDropdown.classList.remove('show');
};

// Check Session
async function checkSession() {
    try {
        const res = await fetch('check_session.php');
        const data = await res.json();
        if(data.loggedIn) {
            userIcon.innerHTML = `👋`;
            let dropdownHTML = '';
            
            // Si es admin, mostrar link al panel
            if(data.usuario.rol === 'admin') {
                dropdownHTML += `<a href="admin.php" class="dropdown-item">Panel Admin</a>`;
            }
            
            dropdownHTML += `<a href="#" class="dropdown-item" onclick="logout()">Cerrar Sesión</a>`;
            userDropdown.innerHTML = dropdownHTML;
        }
    } catch(e) {}
}

async function logout() {
    await fetch('logout.php');
    location.reload();
}

// Init Core
document.addEventListener('DOMContentLoaded', () => {
    if(closeCartBtn) closeCartBtn.onclick = closeCart;
    if(cartOverlay) cartOverlay.onclick = closeCart;
    if(document.getElementById('cart-icon')) document.getElementById('cart-icon').onclick = openCart;
    checkSession();

    // HANDLERS DE FORMULARIOS
    const loginForm = document.getElementById('login-form');
    if(loginForm) {
        loginForm.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const res = await fetch('login.php', { method: 'POST', body: formData });
            const data = await res.json();
            if(data.success) {
                mostrarNotificacion(data.message, 'success');
                setTimeout(() => location.reload(), 1000);
            } else {
                mostrarNotificacion(data.errors.join(', '), 'error');
            }
        };
    }

    const registerForm = document.getElementById('register-form');
    if(registerForm) {
        registerForm.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const res = await fetch('registrar.php', { method: 'POST', body: formData });
            const data = await res.json();
            if(data.success) {
                mostrarNotificacion(data.message, 'success');
                closeModals();
            } else {
                mostrarNotificacion(data.errors.join(', '), 'error');
            }
        };
    }
});

// Google Login Callback
async function handleCredentialResponse(response) {
    const res = await fetch('login_google.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
    });
    const data = await res.json();
    if(data.success) {
        mostrarNotificacion(data.message, 'success');
        setTimeout(() => location.reload(), 1500);
    } else {
        mostrarNotificacion(data.message, 'error');
    }
}
