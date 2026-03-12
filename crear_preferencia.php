<?php
// crear_preferencia.php
header('Content-Type: application/json');

// Recibir datos del frontend
$data = json_decode(file_get_contents('php://input'), true);
$items_carrito = $data['items'] ?? [];
$total = $data['total'] ?? 0;

if (empty($items_carrito)) {
    echo json_encode(['error' => 'Carrito vacío']);
    exit;
}

// En una integración real usaríamos el SDK de Mercado Pago:
// require_once 'vendor/autoload.php';
// MercadoPago\SDK::setAccessToken("YOUR_ACCESS_TOKEN");
// $preference = new MercadoPago\Preference();
// ...

// Por simplicidad en este entorno, devolveremos un ID ficticio o simularemos el proceso
// Para que sea funcional, el usuario debería instalar el SDK de Mercado Pago via composer

echo json_encode([
    'id' => 'PREF_SIMULADA_' . bin2hex(random_bytes(8)),
    'message' => 'Preferencia creada exitosamente (modo simulación)'
]);
?>
