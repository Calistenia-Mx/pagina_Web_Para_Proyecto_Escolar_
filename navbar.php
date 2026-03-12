<!-- SDKs de Autenticación y Pago -->
<script src="https://accounts.google.com/gsi/client" async defer></script>
<script src="https://sdk.mercadopago.com/js/v2"></script>

<nav class="navbar">
    <div class="logo">KIVY<span>STREET</span></div>
    <ul class="nav-links">
        <li><a href="index.php">Home</a></li>
        <li><a href="acercadenosotros.php">Nosotros</a></li>
        <li class="dropdown">
            <a href="index.php#productos" id="coleccion-link">Colección</a>
            <ul class="dropdown-menu" id="coleccion-menu">
                <li><a href="productosHombre.php">Productos Hombre</a></li>
                <li><a href="productosMujer.php">Productos Mujer</a></li>
                <li><a href="productosJovenes.php">Productos Joven</a></li>
                <li><a href="nuevosModelos.php">Nuevos Modelos</a></li>
            </ul>
        </li>
    </ul>
    <div class="nav-icons">
        <div class="user-menu-container">
            <div id="user-icon" class="user-icon" title="Usuario">
                <i class="fas fa-user"></i>
            </div>
            <div id="user-dropdown" class="user-dropdown">
                <a href="#" class="dropdown-item" onclick="showLoginModal()">Iniciar Sesión</a>
                <a href="#" class="dropdown-item" onclick="showRegisterModal()">Crear Cuenta</a>
            </div>
        </div>
        
        <div id="cart-icon" class="cart-icon">
            <i class="fas fa-shopping-cart"></i>
            <small id="cart-count" class="cart-count">0</small>
        </div>
    </div>
</nav>

<!-- Modal de Login -->
<div id="login-modal" class="modal">
    <div class="modal-content">
        <div class="logo" style="margin-bottom: 20px;">KIVY<span>STREET</span></div>
        <h2 class="section-title" style="font-size: 1.2rem; margin-bottom: 10px;">INICIAR SESIÓN</h2>
        <form id="login-form">
            <input type="email" name="email" placeholder="Correo Electrónico" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit" class="checkout-btn">ENTRAR A LA WEB</button>
        </form>
        <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="font-size: 0.8rem; color: #888; margin-bottom: 10px;">O inicia sesión con:</p>
            <div id="g_id_onload"
                 data-client_id="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
                 data-callback="handleCredentialResponse">
            </div>
            <div class="g_id_signin" data-type="standard"></div>
        </div>
    </div>
</div>

<!-- Modal de Registro -->
<div id="register-modal" class="modal">
    <div class="register-content">
        <div class="logo" style="margin-bottom: 20px;">KIVY<span>STREET</span></div>
        <h2 class="section-title" style="font-size: 1.2rem; margin-bottom: 10px;">CREAR CUENTA</h2>
        <form id="register-form">
            <input type="text" name="nombre" placeholder="Nombre Completo" required>
            <input type="email" name="email" placeholder="Correo Electrónico" required>
            <input type="password" name="password" placeholder="Contraseña (mínimo 6 caracteres)" required>
            <input type="password" name="confirm_password" placeholder="Confirmar Contraseña" required>
            <button type="submit" class="checkout-btn">CREAR CUENTA</button>
        </form>
    </div>
</div>
