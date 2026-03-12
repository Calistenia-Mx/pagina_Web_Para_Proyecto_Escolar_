<?php
require_once 'conexion.php';
session_start();

// Verificación de sesión simple (puedes mejorar esto con roles si lo deseas)
if (!isset($_SESSION['logged_in'])) {
    header('Location: index.html');
    exit;
}

$stmt_ventas = $conexion->query("SELECT o.*, u.nombre_completo as cliente FROM ordenes o LEFT JOIN usuarios u ON o.usuario_id = u.id ORDER BY o.fecha DESC");
$ventas = $stmt_ventas->fetchAll(PDO::FETCH_ASSOC);

$stmt_productos = $conexion->query("SELECT * FROM productos");
$productos = $stmt_productos->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel Admin - KIVY STREET</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background: #f4f7f6; margin: 0; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1, h2 { color: #1a1a1a; }
        table { width: 100%; border-collapse: collapse; background: #fff; margin-bottom: 30px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        th, td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #ff3e3e; color: white; }
        .status-pill { padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; background: #e3f2fd; color: #1976d2; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Admin Panel - KIVY STREET</h1>
        
        <h2>📦 Inventario de Productos</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($productos as $p): ?>
                <tr>
                    <td>#<?php echo $p['id']; ?></td>
                    <td><?php echo $p['nombre']; ?></td>
                    <td>$<?php echo number_format($p['precio'], 2); ?></td>
                    <td><strong><?php echo $p['stock']; ?></strong></td>
                    <td><?php echo $p['categoria']; ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <h2>💰 Registro de Ventas</h2>
        <table>
            <thead>
                <tr>
                    <th>ID Orden</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Fecha</th>
                    <th>PayPal ID</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($ventas as $v): ?>
                <tr>
                    <td>#<?php echo $v['id']; ?></td>
                    <td><?php echo $v['cliente'] ? $v['cliente'] : 'Invitado'; ?></td>
                    <td>$<?php echo number_format($v['total'], 2); ?></td>
                    <td><?php echo $v['fecha']; ?></td>
                    <td><span class="status-pill"><?php echo $v['paypal_order_id']; ?></span></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        
        <p><a href="index.html">← Volver a la tienda</a></p>
    </div>
</body>
</html>
