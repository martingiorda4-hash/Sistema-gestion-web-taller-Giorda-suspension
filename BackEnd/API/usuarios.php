<?php
include_once "Controllers/UsuarioController.php";

$controller = new UsuarioController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"),true);

$resultado = match($method){
    'GET' => $controller->BuscarUsuario($_GET['usuario']),
    'POST' => $controller->IniciarSesion($datos)
};
echo json_encode($resultado);