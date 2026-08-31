<?php
require_once "Controllers/TrabajoController.php";

$controller = new TrabajoController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

$resultado = match($method){
    'GET' => isset($_GET["id"]) //ISSET-> SI LA URL VIENE CON UN PARAMETRO ID
                ?$controller->ObtenerPorId($_GET["id"])// -> OBTIENE POR ID
                :(isset($_GET["buscar"])
                    ?$controller->BuscarTrabajo(
                        $_GET["buscar"] ?? "",
                        $_GET["estado"] ?? "todos",
                        $_GET["fechaDesde"] ?? "",
                        $_GET["fechaHasta"] ?? ""
                    )
                    :$controller->ObtenerTodos()),  //: SINO, OBTIENE TODOS
                    
    'POST' => $controller->CrearTrabajo($datos),
    'PUT' => $controller->ModificarTrabajo($datos),
    'DELETE' => $controller->EliminarTrabajo($datos["id"])
};

echo json_encode($resultado);