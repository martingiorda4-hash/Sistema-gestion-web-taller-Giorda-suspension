<?php
require_once "Controllers/PagoController.php";

$controller = new PagoController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

function CargarGet($controller){
    if(isset($_GET["id_cliente"])){
        return $controller->ObtenerPagoPorCliente($_GET["id_cliente"]);
    }
    if(isset($_GET["id_trabajo"])){
        return $controller->ObtenerPagoPorTrabajo($_GET["id_trabajo"]);
    }
    return $controller->ObtenerTodos();
}

$resultado = match($method){
    'GET' => CargarGet($controller),
    'POST' => $controller->CrearPago($datos)
};

echo json_encode($resultado);

