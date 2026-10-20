<?php
require_once "verificarSesion.php";
require_once "Controllers/TrabajoServicioController.php";

$controller = new TrabajoServicioController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

try{

    $resultado = match($method){
        'GET' => $controller->ObtenerPorTrabajo($_GET["id_trabajo"]),
        'POST' => $controller->AgregarServicio($datos),
        'DELETE' => $controller->EliminarServicio($datos["id_servicio"])
        };
        echo json_encode($resultado);
}catch(Exception $e){
    http_response_code(500);

    echo json_encode([
        "error" => $e->getMessage()
    ]);
}
