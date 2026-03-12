<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KIVY STREET | Premium Headwear</title>
    <link
        href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Inter:wght@300;400;900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <link rel="stylesheet" href="nosotros.css">
    <script src="https://www.paypal.com/sdk/js?client-id=test&currency=USD"></script>
</head>

<body>
    <?php include 'navbar.php'; ?>
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



    <section id="nosotros" class="about-section">


        <h2 class="section-title">QUIENES SOMOS</h2>
        <p>Nacidos en el corazón de la cultura urbana, <strong>KIVY STREET</strong> es un manifiesto de estilo y
            resistencia.</p>
        <p>
            Somos una marca creada por 4 jovenes emprendedores que buscan llevar el estilo urbano a otro nivel. Nuestro
            proyecto nace de la pasion por las gorras y tenis combinando moda, identidad y cultura.
        </p>
        <p>En KYVI street creemos que la ropa no solo se usa, se representa.</p>
        <h2 class="section-title">MISIÓN</h2>
        <p>
            Ofrecer gorras de calidad con un estilo urbano auténtico, accesible y moderno,
            que permita a nuestros clientes expresar su personalidad y confianza.
        </p>
        <h2 class="section-title">VISIÓN</h2>
        <p>
            Convertirnos en una marca reconocida a nivel local y nacional por nuestro
            gran catálogo de venta y el servicio al cliente.
        </p>
        <h2 class="section-title">VALORES</h2>
        <ul class="valores-lista">
            <li>Calidad</li>
            <li>Autenticidad</li>
            <li>Innovación</li>
            <li>Compromiso</li>
            <li>Pasión</li>
        </ul>




    </section>

    <footer>
        <div class="footer-content">
            <div class="social-footer">
                <a href="https://www.facebook.com/share/184PPRmMjH/" target="_blank" class="social-icon-footer"
                    title="Facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/kivystreet?igsh=MTM1enhpdGRrZ3FjOA==" target="_blank"
                    class="social-icon-footer" title="Instagram">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.tiktok.com/@kivystreet?_r=1&_t=ZS-94JrFsV4gfl" target="_blank"
                    class="social-icon-footer" title="TikTok">
                    <i class="fab fa-tiktok"></i>
                </a>
            </div>
            <p class="copyright">&copy; 2026 KIVY STREET - Authentic Headwear.</p>
        </div>
    </footer>


    <script src="core.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // No hay productos que cargar aquí, pero core.js inicializa el carrito y sesión
        });
    </script>
</body>

</html>