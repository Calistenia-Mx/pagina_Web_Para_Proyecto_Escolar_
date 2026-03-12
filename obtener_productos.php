<?php
require_once 'conexion.php';

header('Content-Type: application/json');

try {
    $stmt = $conexion->query("SELECT * FROM productos WHERE stock > 0");
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($productos);
} catch(PDOException $e) {
    echo json_encode(['error' => 'Error al obtener productos: ' . $e->getMessage()]);
}
?>
