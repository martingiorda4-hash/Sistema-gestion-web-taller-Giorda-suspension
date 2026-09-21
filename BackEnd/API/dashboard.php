<?php
require_once "Controllers/DashboardController.php";

$controller = new DashboardController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$resultado = match($method){
    'GET' => isset($_GET["pendientes"])
        ? $controller->ObtenerPagosPendientes()
        : $controller->ObtenerDatos()
};

echo json_encode($resultado);