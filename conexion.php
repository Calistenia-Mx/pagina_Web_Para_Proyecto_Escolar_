<?php
// conexion.php

$host = 'localhost';
$dbname = 'registro_usua';
$username = 'root';
$password = '';

try {
    $conexion = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar si la tabla 'usuarios' existe, si no, crearla
    $sql = "CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre_completo VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        rol VARCHAR(20) DEFAULT 'cliente',
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $conexion->exec($sql);

    // Asegurar que la columna 'rol' existe (para bases de datos ya creadas)
    try {
        $conexion->exec("ALTER TABLE usuarios ADD COLUMN rol VARCHAR(20) DEFAULT 'cliente' AFTER password");
    } catch(PDOException $e) {
        // La columna ya existe, ignoramos el error
    }

    // Insertar admin por defecto si no existe
    $admin_email = 'admin@kivystreet.com';
    $check_admin = $conexion->prepare("SELECT id FROM usuarios WHERE email = ?");
    $check_admin->execute([$admin_email]);
    if ($check_admin->rowCount() == 0) {
        $admin_pass = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $conexion->prepare("INSERT INTO usuarios (nombre_completo, email, password, rol) VALUES (?, ?, ?, ?)");
        $stmt->execute(['Admin Kivy', $admin_email, $admin_pass, 'admin']);
    }

    // Crear tabla 'productos'
    $sql_productos = "CREATE TABLE IF NOT EXISTS productos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        precio DECIMAL(10,2) NOT NULL,
        imagen VARCHAR(255) NOT NULL,
        stock INT DEFAULT 10,
        categoria VARCHAR(50) DEFAULT 'General'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    $conexion->exec($sql_productos);

    // Crear tabla 'ordenes'
    $sql_ordenes = "CREATE TABLE IF NOT EXISTS ordenes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario_id INT,
        total DECIMAL(10,2) NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        detalles_json TEXT NOT NULL,
        paypal_order_id VARCHAR(100),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    $conexion->exec($sql_ordenes);

    // Insertar productos de prueba si la tabla está vacía
    $check_productos = $conexion->query("SELECT COUNT(*) FROM productos");
    if ($check_productos->fetchColumn() == 0) {
        $sql_seeds = "INSERT INTO productos (nombre, precio, imagen, stock, categoria) VALUES
            ('KIVY Black Snapback', 35.00, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500', 15, 'Hombre'),
            ('Urban Crimson', 29.00, 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500', 20, 'Hombre'),
            ('Street Ghost', 40.00, 'imagenes/images 5.jpg', 10, 'Nuevos'),
            ('Night Vibe Beanie', 22.00, 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500', 25, 'Jovenes'),
            ('KIVY Logo Tee', 25.00, 'imagenes/images 2.jpg', 30, 'Nuevos'),
            ('Streetwear Special', 45.00, 'imagenes/images 3.jpg', 5, 'Nuevos'),
            ('KIVY Pink Cap', 32.00, 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=500', 12, 'Mujer'),
            ('Urban Rose Beanie', 24.00, 'https://images.unsplash.com/photo-1629135017122-0e3181822c9f?w=500', 18, 'Mujer'),
            ('Street Chic Snapback', 38.00, 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500', 8, 'Mujer'),
            ('Young Spirit Cap', 28.00, 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500', 15, 'Jovenes'),
            ('Classic Executive', 45.00, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500', 10, 'Hombre')";
        $conexion->exec($sql_seeds);
    }

} catch(PDOException $e) {
    // Si hay un error, mostrar un mensaje claro
    die(json_encode([
        'success' => false,
        'message' => 'Error de conexión a la base de datos: ' . $e->getMessage()
    ]));
}
?>