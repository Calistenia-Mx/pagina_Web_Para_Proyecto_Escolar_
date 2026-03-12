<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KIVY STREET | Productos Hombre</title>
    <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Inter:wght@300;400;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="estiloss.css">
    <style>
        .productos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
            padding: 40px 8%;
        }
        .header-section {
            background: #000;
            color: #fff;
            padding: 120px 8% 60px;
            text-align: center;
        }
    </style>
</head>
<body>
    <?php include 'navbar.php'; ?>

    <div class="header-section">
        <h1 class="section-title" style="color: white;">Productos Hombre</h1>
        <p>Estilo y calidad para caballero.</p>
    </div>

    <div class="productos-grid" id="productos-grid">
        <!-- Se cargará dinámicamente -->
    </div>

    <!-- Carrito Sidebar -->
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
    <script>
        let productosList = [];
        async function loadProductsByCategory() {
            const res = await fetch('obtener_productos.php?categoria=Hombre');
            productosList = await res.json();
            const grid = document.getElementById('productos-grid');
            grid.innerHTML = '';
            if(productosList.length === 0) {
                grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No hay productos disponibles en esta categoría.</p>';
                return;
            }
            productosList.forEach(p => {
                grid.innerHTML += `
                    <div class="card">
                        <img src="${p.imagen}" alt="${p.nombre}">
                        <h3>${p.nombre}</h3>
                        <p>$${parseFloat(p.precio).toFixed(2)}</p>
                        <button class="add-btn" onclick="addToCart(${p.id}, productosList)">Añadir al Carrito</button>
                    </div>
                `;
            });
        }
        document.addEventListener('DOMContentLoaded', loadProductsByCategory);
    </script>
</body>
</html>
