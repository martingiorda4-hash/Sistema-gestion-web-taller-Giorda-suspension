<?php
require_once "Controllers/ClienteController.php";

$controller = new ClienteController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

$resultado = match($method){ 
    'GET' => isset($_GET["id"]) //ISSET-> SI LA URL VIENE CON UN PARAMETRO ID
            ? $controller->ObtenerPorId($_GET["id"]) // -> OBTIENE POR ID
            : $controller->ObtenerTodos(),          // -> : SINO, OBTIENE TODOS
    'POST' => $controller->CrearCliente($datos),
    'PUT' => $controller->ModificarCliente($datos),
    'DELETE' => $controller->EliminarCliente($datos["id"])
};
echo json_encode($resultado);