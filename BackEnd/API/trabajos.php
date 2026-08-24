<?php
require_once "Controllers/TrabajoController.php";

$controller = new TrabajoController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

$resultado = match($method){
    'GET' => $controller->ObtenerTodos(),
    'POST' => $controller->CrearTrabajo($datos),
    'PUT' => $controller->ModificarTrabajo($datos),
    'DELETE' => $controller->EliminarTrabajo($datos["id"])
};

if($method === "GET"){
    echo json_encode($resultado);
}