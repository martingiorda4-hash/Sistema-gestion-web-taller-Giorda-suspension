<?php
require_once "Controllers/PagoController.php";

$controller = new PagoController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

$resultado = match($method){
    'GET' => $controller->ObtenerTodos(),
    'POST' => $controller->CrearPago($datos)
};

if($method === "GET"){
    echo json_encode($resultado);
}
