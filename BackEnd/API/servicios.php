<?php
require_once "verificarSesion.php";
require_once "Controllers/ServicioController.php";

$controller = new ServicioController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

try{

    $resultado = match($method){
        'GET' => $controller->ObtenerTodos(),
        'POST' => $controller->CrearServicio($datos),
        'PUT' => $controller->ModificarServicio($datos)
        };
        echo json_encode($resultado);
}catch(Exception $e){
    http_response_code(500);

    json_encode([
        "error" => $e->getMessage()
    ]);
}