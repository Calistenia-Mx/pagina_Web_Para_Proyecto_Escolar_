<?php
require_once 'conexion.php';
session_start();

// PROTECCIÓN: Solo administradores pueden entrar
if (!isset($_SESSION['logged_in']) || $_SESSION['usuario_rol'] !== 'admin') {
    die("Acceso denegado. Se requieren permisos de administrador. <a href='index.html'>Volver</a>");
}

// Obtener estadísticas rápidas
$total_ventas = $conexion->query("SELECT SUM(total) FROM ordenes")->fetchColumn();
$count_ordenes = $conexion->query("SELECT COUNT(*) FROM ordenes")->fetchColumn();
$count_usuarios = $conexion->query("SELECT COUNT(*) FROM usuarios")->fetchColumn();

// Obtener Ventas Recientes
$stmt_ventas = $conexion->query("SELECT o.*, u.nombre_completo as cliente FROM ordenes o LEFT JOIN usuarios u ON o.usuario_id = u.id ORDER BY o.fecha DESC LIMIT 10");
$ventas = $stmt_ventas->fetchAll(PDO::FETCH_ASSOC);

// Obtener Usuarios
$stmt_usuarios = $conexion->query("SELECT id, nombre_completo, email, rol, fecha_registro FROM usuarios ORDER BY fecha_registro DESC");
$usuarios = $stmt_usuarios->fetchAll(PDO::FETCH_ASSOC);

// Obtener Productos con poco stock
$stmt_stock = $conexion->query("SELECT * FROM productos WHERE stock < 5");
$alerta_stock = $stmt_stock->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard POS - KIVY STREET</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        :root { --primary: #ff3e3e; --dark: #1a1a1a; --light: #f8f9fa; --success: #2ecc71; }
        body { font-family: 'Inter', sans-serif; background: #f0f2f5; margin: 0; display: flex; }
        
        /* Sidebar */
        .sidebar { width: 260px; height: 100vh; background: var(--dark); color: white; padding: 30px 20px; position: fixed; }
        .sidebar h2 { font-size: 1.2rem; margin-bottom: 40px; color: var(--primary); letter-spacing: 2px; }
        .nav-item { padding: 15px; display: block; color: #aaa; text-decoration: none; border-radius: 8px; margin-bottom: 5px; transition: 0.3s; }
        .nav-item:hover, .nav-item.active { background: rgba(255,62,62,0.1); color: white; }
        .nav-item i { margin-right: 10px; }

        /* Main Content */
        .main-content { margin-left: 260px; flex: 1; padding: 40px; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        
        /* Stats Cards */
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .stat-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .stat-card h3 { font-size: 0.9rem; color: #888; margin: 0 0 10px 0; }
        .stat-card p { font-size: 1.8rem; font-weight: 700; margin: 0; color: var(--dark); }

        /* Tables */
        .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; font-size: 0.9rem; }
        th { color: #888; font-weight: 600; }
        .pill { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
        .pill-admin { background: #fee2e2; color: #ef4444; }
        .pill-user { background: #dcfce7; color: #22c55e; }
        
        .alert-box { background: #fff5f5; border-left: 4px solid var(--primary); padding: 15px; margin-bottom: 20px; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="sidebar">
        <h2>KIVY STREET</h2>
        <a href="#" class="nav-item active"><i class="fas fa-chart-pie"></i> Dashboard</a>
        <a href="admin.php" class="nav-item"><i class="fas fa-boxes"></i> Inventario</a>
        <a href="index.html" class="nav-item"><i class="fas fa-store"></i> Ver Tienda</a>
        <a href="logout.php" class="nav-item" style="margin-top: 50px;"><i class="fas fa-sign-out-alt"></i> Salir</a>
    </div>

    <div class="main-content">
        <div class="header">
            <h1>Panel de Control (POS)</h1>
            <div class="user-info">Hola, <strong><?php echo $_SESSION['usuario_nombre']; ?></strong> (Admin)</div>
        </div>

        <?php if (!empty($alerta_stock)): ?>
        <div class="alert-box">
            <strong>⚠️ Alerta de Stock:</strong> Tienes <?php echo count($alerta_stock); ?> productos con existencias bajas.
        </div>
        <?php endif; ?>

        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Ventas</h3>
                <p>$<?php echo number_format($total_ventas, 2); ?></p>
            </div>
            <div class="stat-card">
                <h3>Ventas Realizadas</h3>
                <p><?php echo $count_ordenes; ?></p>
            </div>
            <div class="stat-card">
                <h3>Usuarios Registrados</h3>
                <p><?php echo $count_usuarios; ?></p>
            </div>
        </div>

        <div class="card">
            <h2>Ventas Recientes</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($ventas as $v): ?>
                    <tr>
                        <td>#<?php echo $v['id']; ?></td>
                        <td><?php echo $v['cliente'] ?: 'Invitado'; ?></td>
                        <td>$<?php echo number_format($v['total'], 2); ?></td>
                        <td><?php echo date('d/m/Y H:i', strtotime($v['fecha'])); ?></td>
                        <td><span class="pill pill-user">Completado</span></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <div class="card">
            <h2>Gestión de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Registro</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($usuarios as $u): ?>
                    <tr>
                        <td>#<?php echo $u['id']; ?></td>
                        <td><?php echo $u['nombre_completo']; ?></td>
                        <td><?php echo $u['email']; ?></td>
                        <td>
                            <span class="pill <?php echo $u['rol'] == 'admin' ? 'pill-admin' : 'pill-user'; ?>">
                                <?php echo strtoupper($u['rol']); ?>
                            </span>
                        </td>
                        <td><?php echo date('d/m/Y', strtotime($u['fecha_registro'])); ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
