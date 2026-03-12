<?php
require_once 'conexion.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    $errores = [];
    
    if (empty($email) || empty($password)) {
        $errores[] = "Todos los campos son obligatorios";
    }
    
    if (empty($errores)) {
        try {
            // Buscar usuario
            $stmt = $conexion->prepare("SELECT * FROM usuarios WHERE email = ?");
            $stmt->execute([$email]);
            $usuario = $stmt->fetch();
            
            if ($usuario && password_verify($password, $usuario['password'])) {
                // Iniciar sesión
                session_start();
                $_SESSION['usuario_id'] = $usuario['id'];
                $_SESSION['usuario_nombre'] = $usuario['nombre_completo'];
                $_SESSION['usuario_email'] = $usuario['email'];
                $_SESSION['usuario_rol'] = $usuario['rol'] ?? 'cliente';
                $_SESSION['logged_in'] = true;
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Inicio de sesión exitoso',
                    'usuario' => [
                        'nombre' => $usuario['nombre_completo'],
                        'email' => $usuario['email'],
                        'rol' => $_SESSION['usuario_rol']
                    ]
                ]);
            } else {
                $errores[] = "Email o contraseña incorrectos";
            }
        } catch(PDOException $e) {
            $errores[] = "Error en el servidor";
        }
    }
    
    if (!empty($errores)) {
        echo json_encode([
            'success' => false,
            'errors' => $errores
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'errors' => ['Método no permitido']
    ]);
}
?>