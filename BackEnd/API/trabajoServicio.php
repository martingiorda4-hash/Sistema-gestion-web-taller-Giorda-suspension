<?php
require_once "Controllers/TrabajoServicioController.php";

$controller = new TrabajoServicioController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

$resultado = match($method){
    'GET' => $controller->ObtenerPorTrabajo($_GET["id_trabajo"]),
    'POST' => $controller->AgregarServicio($datos)
};

echo json_encode($resultado);