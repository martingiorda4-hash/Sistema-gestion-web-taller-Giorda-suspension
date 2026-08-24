<?php
include_once "Controllers/CuentaCorrienteController.php";

$controller = new CuentaCorrienteController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

$resultado = match($method){
    'GET' => $controller->ObtenerTodos()
};
echo json_encode($resultado);