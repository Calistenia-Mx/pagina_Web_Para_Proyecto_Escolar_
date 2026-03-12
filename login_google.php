<?php
// login_google.php
require_once 'conexion.php';

header('Content-Type: application/json');

// Recibir el ID Token de Google (JWT)
$data = json_decode(file_get_contents('php://input'), true);
$id_token = $data['credential'] ?? null;

if (!$id_token) {
    echo json_encode(['success' => false, 'message' => 'Token no recibido']);
    exit;
}

// En un entorno de producción real, deberías verificar el token usando la librería de Google
// Por simplicidad en este entorno escolar, decodificaremos la carga útil (payload) del JWT
// NOTA: Esto NO es seguro para producción real sin verificación de firma.

$parts = explode('.', $id_token);
if (count($parts) < 2) {
    echo json_encode(['success' => false, 'message' => 'Token inválido']);
    exit;
}

$payload = json_decode(base64_decode($parts[1]), true);

if (!$payload || !isset($payload['email'])) {
    echo json_encode(['success' => false, 'message' => 'No se pudo obtener el email']);
    exit;
}

$email = $payload['email'];
$nombre = $payload['name'] ?? 'Usuario Google';

try {
    // Buscar si el usuario ya existe
    $stmt = $conexion->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $usuario = $stmt->fetch();

    if (!$usuario) {
        // Crear usuario si no existe (con contraseña aleatoria ya que usa Google)
        $password_rand = password_hash(bin2hex(random_bytes(10)), PASSWORD_DEFAULT);
        $stmt = $conexion->prepare("INSERT INTO usuarios (nombre_completo, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$nombre, $email, $password_rand]);
        
        $userId = $conexion->lastInsertId();
    } else {
        $userId = $usuario['id'];
        $nombre = $usuario['nombre_completo'];
    }

    // Iniciar sesión
    session_start();
    $_SESSION['usuario_id'] = $userId;
    $_SESSION['usuario_nombre'] = $nombre;
    $_SESSION['usuario_email'] = $email;
    $_SESSION['usuario_rol'] = $usuario['rol'] ?? 'cliente';
    $_SESSION['logged_in'] = true;

    echo json_encode([
        'success' => true,
        'message' => 'Inicio de sesión con Google exitoso',
        'usuario' => [
            'nombre' => $nombre,
            'email' => $email,
            'rol' => $_SESSION['usuario_rol']
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error en el servidor: ' . $e->getMessage()]);
}
?>
