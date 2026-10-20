<?php

session_set_cookie_params([
    "lifetime" => 28800,
    "path" => "/"
]);

session_start();

include_once "Controllers/UsuarioController.php";

$controller = new UsuarioController();

$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"),true);

try{

    $resultado = match($method){
        'GET' => $controller->BuscarUsuario($_GET['usuario']),
        'POST' => $controller->IniciarSesion($datos)
        };
        echo json_encode($resultado);
}catch(Exception $e){
    http_response_code(500);

    echo json_encode([
        "error" => $e->getMessage()
    ]);
}