<?php
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    echo json_encode([
        'loggedIn' => true,
        'usuario' => [
            'nombre' => $_SESSION['usuario_nombre'],
            'email' => $_SESSION['usuario_email']
        ]
    ]);
} else {
    echo json_encode(['loggedIn' => false]);
}
?>