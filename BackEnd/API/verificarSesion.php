<?php

session_start();

if(!isset($_SESSION["usuario"])){
    http_response_code(401);

    echo json_encode(["error" => "No autorizado"]);

    exit;
}