<?php
require_once "Controllers/ServicioController.php";

$controller = new ServicioController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$resultado = match($method){
    'GET' => $controller->ObtenerTodos()

};
echo json_encode($resultado);