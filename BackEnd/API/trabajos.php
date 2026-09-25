<?php
require_once "verificarSesion.php";
require_once "Controllers/TrabajoController.php";

$controller = new TrabajoController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

function cargarGet($controller){
    if(isset($_GET["id"])){
        return $controller->ObtenerPorId($_GET["id"]);
    }
    if(isset($_GET["id_cliente"])){
        return $controller->ObtenerTrabajosPorCliente($_GET["id_cliente"]);
    }
    if(isset($_GET["buscar"])){
        return $controller->BuscarTrabajo(
                        $_GET["buscar"] ?? "",
                        $_GET["estado"] ?? "todos",
                        $_GET["fechaDesde"] ?? "",
                        $_GET["fechaHasta"] ?? ""
        );
    }
    return $controller->ObtenerTodos();
}

$resultado = match($method){
    'GET' => cargarGet($controller),
    'POST' => $controller->CrearTrabajo($datos),
    'PUT' => $controller->ModificarTrabajo($datos),
    'DELETE' => $controller->EliminarTrabajo($datos["id"])
};

echo json_encode($resultado);