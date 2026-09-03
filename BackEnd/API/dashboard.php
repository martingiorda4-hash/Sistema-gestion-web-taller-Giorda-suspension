<?php
require_once "Controllers/DashboardController.php";

$controller = new DashboardController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: applicaction/json");

$resultado = match($method){
    'GET' => $controller->ObtenerDatos()
};

echo json_encode($resultado);