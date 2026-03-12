<?php
require_once 'conexion.php';
session_start();

// Verificación de sesión estricta para administradores
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true || $_SESSION['usuario_rol'] !== 'admin') {
    header('Location: index.php'); // Redirigir a la tienda si no es admin
    exit;
}

// Lógica para cambiar roles
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['cambiar_rol'])) {
    $uid = (int)$_POST['user_id'];
    $nuevo_rol = $_POST['nuevo_rol'];
    
    // Evitar que el admin se quite el rol a sí mismo accidentalmente (opcional pero seguro)
    if ($uid !== $_SESSION['usuario_id']) {
        $stmt = $conexion->prepare("UPDATE usuarios SET rol = ? WHERE id = ?");
        $stmt->execute([$nuevo_rol, $uid]);
        $mensaje_rol = "Rol actualizado correctamente.";
    }
}

// Obtener datos para el panel
$stmt_ventas = $conexion->query("SELECT o.*, u.nombre_completo as cliente FROM ordenes o LEFT JOIN usuarios u ON o.usuario_id = u.id ORDER BY o.fecha DESC");
$ventas = $stmt_ventas->fetchAll(PDO::FETCH_ASSOC);

$stmt_productos = $conexion->query("SELECT * FROM productos");
$productos = $stmt_productos->fetchAll(PDO::FETCH_ASSOC);

// Obtener lista de usuarios para gestión de roles
$stmt_usuarios = $conexion->query("SELECT id, nombre_completo, email, rol FROM usuarios ORDER BY rol, nombre_completo");
$lista_usuarios = $stmt_usuarios->fetchAll(PDO::FETCH_ASSOC);
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
        .status-pill.admin { background: #ffebee; color: #d32f2f; }
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

        <h2 id="usuarios">👥 Gestión de Usuarios y Roles</h2>
        <?php if(isset($mensaje_rol)): ?>
            <p style="color: green; font-weight: bold;"><?php echo $mensaje_rol; ?></p>
        <?php endif; ?>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol Actual</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($lista_usuarios as $u): ?>
                <tr>
                    <td><?php echo $u['nombre_completo']; ?></td>
                    <td><?php echo $u['email']; ?></td>
                    <td><span class="status-pill <?php echo $u['rol'] === 'admin' ? 'admin' : ''; ?>"><?php echo strtoupper($u['rol'] ?? 'cliente'); ?></span></td>
                    <td>
                        <?php if ($u['id'] !== $_SESSION['usuario_id']): ?>
                        <form method="POST" style="display: flex; gap: 5px;">
                            <input type="hidden" name="user_id" value="<?php echo $u['id']; ?>">
                            <select name="nuevo_rol">
                                <option value="cliente" <?php echo ($u['rol'] ?? 'cliente') === 'cliente' ? 'selected' : ''; ?>>Cliente</option>
                                <option value="admin" <?php echo ($u['rol'] ?? '') === 'admin' ? 'selected' : ''; ?>>Admin</option>
                            </select>
                            <button type="submit" name="cambiar_rol" style="background: #333; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">Cambiar</button>
                        </form>
                        <?php else: ?>
                            <em>(Tú - Admin)</em>
                        <?php endif; ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        
        <p><a href="index.php">← Volver a la tienda</a></p>
    </div>
</body>
</html>
