<?php

$host = "localhost";
$user = 'root';
$password = "";
$dbname = "db_giorda_suspension";

try {
    $pdo = new PDO("mysql:host=$host;port=3306;dbname=$dbname", $user, $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (PDOException $e) {
    die("Error al conectar la base de datos: ". $e->getMessage());
}