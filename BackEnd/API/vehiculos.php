<?php
require_once "Controllers/VehiculoController.php";

$controller = new VehiculoController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

$resultado = match($method){
    'GET' => isset($_GET["id"])
            ? $controller->ObtenerVehiculoPorId($_GET["id"])
            : (isset($_GET["cliente_id"])
                ? $controller->ObtenerVehiculoPorCliente($_GET["cliente_id"])
                :$controller->ObtenerTodos()),
    'POST' => $controller->CrearVehiculo($datos),
    'PUT' => $controller->ModificarVehiculo($datos),
    'DELETE' => $controller->EliminarVehiculo($datos["id"])
};

echo json_encode($resultado);
