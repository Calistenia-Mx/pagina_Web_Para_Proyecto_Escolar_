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
    localStorage.setItem('kivy_cart', JSON.stringify(carrito)); // PERSISTENCIA
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

// 3. PAYPAL
if(document.getElementById('paypal-button-container')) {
    paypal.Buttons({
        style: { color: 'black', shape: 'rect' },
        createOrder: function(data, actions) {
            const totalVal = cartTotal.innerText.replace('$', '');
            if(parseFloat(totalVal) <= 0) {
                mostrarNotificacion('El carrito está vacío', 'error');
                return;
            }
            return actions.order.create({
                purchase_units: [{ amount: { value: totalVal, currency_code: 'USD' } }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(async (details) => {
                mostrarNotificacion('¡Compra Exitosa!', 'success');
                const orderData = {
                    paypal_order_id: details.id,
                    total: cartTotal.innerText.replace('$', ''),
                    items: carrito
                };
                await fetch('guardar_orden.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });
                carrito = [];
                renderCart();
                closeCart();
            });
        }
    }).render('#paypal-button-container');
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
            userDropdown.innerHTML = `
                <a href="admin.php" class="dropdown-item">Panel Admin</a>
                <a href="#" class="dropdown-item" onclick="logout()">Cerrar Sesión</a>
            `;
        }
    } catch(e) {}
}

async function logout() {
    await fetch('logout.php');
    location.reload();
}

// Init Core
document.addEventListener('DOMContentLoaded', () => {
    // Cargar carrito persistente
    const savedCart = localStorage.getItem('kivy_cart');
    if(savedCart) {
        carrito = JSON.parse(savedCart);
        renderCart();
    }

    if(closeCartBtn) closeCartBtn.onclick = closeCart;
    if(cartOverlay) cartOverlay.onclick = closeCart;
    if(document.getElementById('cart-icon')) document.getElementById('cart-icon').onclick = openCart;
    checkSession();
});
