<?php
require_once 'conexion.php';

header('Content-Type: application/json');

try {
    $categoria = isset($_GET['categoria']) ? $_GET['categoria'] : null;
    
    if ($categoria) {
        $stmt = $conexion->prepare("SELECT * FROM productos WHERE stock > 0 AND categoria = ?");
        $stmt->execute([$categoria]);
    } else {
        $stmt = $conexion->query("SELECT * FROM productos WHERE stock > 0");
    }
    
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($productos);
} catch(PDOException $e) {
    echo json_encode(['error' => 'Error al obtener productos: ' . $e->getMessage()]);
}
?>
