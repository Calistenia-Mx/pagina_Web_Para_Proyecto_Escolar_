<?php
$host = 'localhost';
$dbname = 'registro_usua';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa a la base de datos: $dbname";
} catch(PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>