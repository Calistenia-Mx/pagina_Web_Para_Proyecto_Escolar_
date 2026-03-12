<?php
require_once 'conexion.php';
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
        exit;
    }

    $usuario_id = isset($_SESSION['usuario_id']) ? $_SESSION['usuario_id'] : null;
    $total = $data['total'];
    $detalles = json_encode($data['items']);
    $paypal_id = $data['paypal_order_id'];

    try {
        $stmt = $conexion->prepare("INSERT INTO ordenes (usuario_id, total, detalles_json, paypal_order_id) VALUES (?, ?, ?, ?)");
        $stmt->execute([$usuario_id, $total, $detalles, $paypal_id]);

        // Actualizar stock de productos
        foreach ($data['items'] as $item) {
            $update = $conexion->prepare("UPDATE productos SET stock = stock - 1 WHERE id = ?");
            $update->execute([$item['id']]);
        }

        echo json_encode(['success' => true, 'message' => 'Orden guardada correctamente']);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al guardar la orden: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
