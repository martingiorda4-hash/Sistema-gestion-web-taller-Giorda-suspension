<?php
require_once "verificarSesion.php";
require_once "Controllers/DashboardController.php";

$controller = new DashboardController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

try{

    $resultado = match($method){
        'GET' => isset($_GET["pendientes"])
        ? $controller->ObtenerPagosPendientes()
        : $controller->ObtenerDatos()
        };
        echo json_encode($resultado);
}catch(Exception $e){
    http_response_code(500);

    json_encode([
        "error" => $e->getMessage()
    ]);
}
