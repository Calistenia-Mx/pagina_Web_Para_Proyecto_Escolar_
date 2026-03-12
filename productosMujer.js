(() => {
// ============================================
// FUNCIONALIDADES DEL HEADER + CARRITO (KIVY STREET)
// ============================================

const STORAGE_KEY = 'kivystreet_cart';
const SHIPPING_COST = 0;

const userIcon = document.getElementById('user-icon');
const userDropdown = document.getElementById('user-dropdown');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const closeCart = document.getElementById('close-cart');
const coleccionLink = document.getElementById('coleccion-link');
const coleccionMenu = document.getElementById('coleccion-menu');

let carrito = loadCartFromStorage();
let paypalRendered = false;

function toggleColeccionMenu(event) {
    event.preventDefault();
    coleccionMenu.classList.toggle('show');
}

if (coleccionLink && coleccionMenu) {
    coleccionLink.addEventListener('click', toggleColeccionMenu);

    document.addEventListener('click', (event) => {
        if (!coleccionLink.contains(event.target) && !coleccionMenu.contains(event.target)) {
            coleccionMenu.classList.remove('show');
        }
    });

    coleccionMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => coleccionMenu.classList.remove('show'));
    });
}

function toggleUserMenu() {
    if (userDropdown) userDropdown.classList.toggle('show');
}

if (userIcon && userDropdown) {
    userIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleUserMenu();
    });

    document.addEventListener('click', (e) => {
        if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('show');
        }
    });
}

function showLoginModal() {
    if (!loginModal) return;
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (userDropdown) userDropdown.classList.remove('show');
}

function showRegisterModal() {
    if (!registerModal) return;
    registerModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (userDropdown) userDropdown.classList.remove('show');
}

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

function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return [];

        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.filter((item) => item.quantity > 0) : [];
    } catch (error) {
        console.error('Error al cargar carrito:', error);
        return [];
    }
}

function saveCartToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}

function getCartCount() {
    return carrito.reduce((acc, item) => acc + item.quantity, 0);
}

function calculateSubtotal() {
    return carrito.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
}

function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}

function updateCartTotals() {
    const subtotal = calculateSubtotal();
    const total = subtotal + SHIPPING_COST;

    if (cartSubtotal) cartSubtotal.textContent = formatCurrency(subtotal);
    if (cartTotal) cartTotal.textContent = formatCurrency(total);
    if (cartCount) cartCount.textContent = String(getCartCount());
}

function renderCart() {
    if (!cartItemsContainer) return;

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío.</p>';
    } else {
        cartItemsContainer.innerHTML = carrito.map((item) => `
            <article class="cart-item">
                <img src="${item.img}" alt="${item.nombre}">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <p>${formatCurrency(item.precio)}</p>
                    <div class="quantity-controls">
                        <button type="button" onclick="changeQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button type="button" onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" type="button" onclick="removeFromCart(${item.id})">Eliminar</button>
            </article>
        `).join('');
    }

    updateCartTotals();
    ensurePayPalButton();
}

function addToCart(id) {
    const catalogo = Array.isArray(window.productosMujer) ? window.productosMujer : [];
    const producto = catalogo.find((p) => p.id === id);
    if (!producto) return;

    const existingItem = carrito.find((item) => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        carrito.push({ ...producto, quantity: 1 });
    }

    saveCartToStorage();
    renderCart();
    openCart();
    mostrarNotificacion(`${producto.nombre} añadido al carrito`, 'success');
}

function changeQuantity(id, delta) {
    carrito = carrito
        .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter((item) => item.quantity > 0);

    saveCartToStorage();
    renderCart();
}

function removeFromCart(id) {
    carrito = carrito.filter((item) => item.id !== id);
    saveCartToStorage();
    renderCart();
}

function openCart() {
    if (cartSidebar) cartSidebar.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('open');
}

function closeCartSidebar() {
    if (cartSidebar) cartSidebar.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerHTML = `
        <span>${mensaje}</span>
        <button type="button" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        if (notificacion.parentElement) notificacion.remove();
    }, 3000);
}

function ensurePayPalButton() {
    const paypalContainer = document.getElementById('paypal-button-container');
    if (!paypalContainer || typeof paypal === 'undefined' || paypalRendered) return;

    paypal.Buttons({
        style: { color: 'black', shape: 'rect' },
        createOrder(data, actions) {
            const total = calculateSubtotal() + SHIPPING_COST;
            return actions.order.create({
                purchase_units: [{ amount: { value: total.toFixed(2), currency_code: 'USD' } }]
            });
        },
        onApprove(data, actions) {
            return actions.order.capture().then(() => {
                carrito = [];
                saveCartToStorage();
                renderCart();
                closeCartSidebar();
                mostrarNotificacion('¡Compra exitosa! Gracias por tu compra.', 'success');
            });
        }
    }).render('#paypal-button-container');

    paypalRendered = true;
}

if (cartIcon) cartIcon.addEventListener('click', openCart);
if (closeCart) closeCart.addEventListener('click', closeCartSidebar);
if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCartSidebar();
});

window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.addToCart = addToCart;
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;
window.renderCart = renderCart;

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

})();
