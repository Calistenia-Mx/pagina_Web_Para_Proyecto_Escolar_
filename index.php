<!DOCTYPE html>
<html lang="es"> <!--proyecto de prueba3 para que no equivoques-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KIVY STREET | Premium Headwear</title>
    <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Inter:wght@300;400;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="estiloss.css">
</head>
<body>
    <?php include 'navbar.php'; ?>

    <section class="hero" id="home">
        <div class="hero-image-carousel" id="hero-carousel"></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1>KIVY<span>STREET</span></h1>
            <p>No es solo una gorra, es tu <span>identidad</span></p>
        </div>
    </section>

    <section id="central" class="about-section">
        <div class="imagencentral">
     
            <img src="data:image/jpeg;base64,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" alt="New era 2026">
         </div>
         <div class="valores">
            <p>Autenticidad</p>
            <p>Integridad</p>
            <p>Libertad</p>
            <p>Comunidad</p>
         </div>
    </section>

    <section id="productos" class="carousel-container">
        <h2 class="section-title">Nuevos Ingresos</h2>
        <div class="carousel-viewport">
            <div class="carousel-track" id="track"></div>
        </div>
        <div class="carousel-controls">
            <button id="prevBtn" class="control-btn">PREV</button>
            <button id="nextBtn" class="control-btn">NEXT</button>
        </div>
    </section>

    <footer>
         <div class="footer-content">
            <div class="social-footer">
                <a href="https://www.facebook.com/share/184PPRmMjH/" target="_blank" class="social-icon-footer" title="Facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/kivystreet?igsh=MTM1enhpdGRrZ3FjOA==" target="_blank" class="social-icon-footer" title="Instagram">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.tiktok.com/@kivystreet?_r=1&_t=ZS-94JrFsV4gfl" target="_blank" class="social-icon-footer" title="TikTok">
                    <i class="fab fa-tiktok"></i>
                </a>
            </div>
            <p class="copyright">&copy; 2026 KIVY STREET - Authentic Headwear.</p>
        </div>
    </footer>
    <!-- Overlay (fondo oscuro) -->
<div class="cart-overlay" id="cart-overlay"></div>
    <div id="cart-sidebar" class="cart-sidebar">
        <div class="cart-header">
            <h2>Tu Carrito</h2>
            <button id="close-cart">×</button>
        </div>
        <div id="cart-items" class="cart-items"></div>
        <div class="cart-footer">
            <div class="total-container">
                <span>Total:</span>
                <span id="cart-total">$0.00</span>
            </div>
            <div id="wallet_container"></div>
        </div>
    </div>

    <script src="core.js"></script>
    <script src="script.js"></script>
</body>
</html>