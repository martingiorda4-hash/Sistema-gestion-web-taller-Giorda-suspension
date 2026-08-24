<?php
require_once "Controllers/ClienteController.php";

$controller = new ClienteController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

$resultado = match($method){
    'GET' => $controller->ObtenerTodos(),
    'POST' => $controller->CrearCliente($datos),
    'PUT' => $controller->ModificarCliente($datos),
    'DELETE' => $controller->EliminarCliente($datos["id"])
};

if($method === 'GET'){
    echo json_encode($resultado);
}