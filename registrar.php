<?php
require_once 'conexion.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos
    $nombre = trim($_POST['nombre']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    
    $errores = [];
    
    // Validaciones
    if (empty($nombre)) {
        $errores[] = "El nombre es obligatorio";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errores[] = "Email inválido";
    }
    
    if (strlen($password) < 6) {
        $errores[] = "La contraseña debe tener al menos 6 caracteres";
    }
    
    if ($password !== $confirm_password) {
        $errores[] = "Las contraseñas no coinciden";
    }
    
    // Si no hay errores
    if (empty($errores)) {
        try {
            // Verificar si el email ya existe
            $stmt = $conexion->prepare("SELECT id FROM usuarios WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->rowCount() > 0) {
                $errores[] = "Este email ya está registrado";
            } else {
                // Hash de la contraseña
                $password_hash = password_hash($password, PASSWORD_DEFAULT);
                
                // Insertar usuario
                $stmt = $conexion->prepare("INSERT INTO usuarios (nombre_completo, email, password, rol) VALUES (?, ?, ?, 'cliente')");
                $stmt->execute([$nombre, $email, $password_hash]);
                
                echo json_encode([
                    'success' => true,
                    'message' => '¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.'
                ]);
                exit();
            }
        } catch(PDOException $e) {
            $errores[] = "Error en el servidor. Intenta nuevamente.";
        }
    }
    
    // Si hay errores
    echo json_encode([
        'success' => false,
        'errors' => $errores
    ]);
} else {
    echo json_encode([
        'success' => false,
        'errors' => ['Método no permitido']
    ]);
}
?>