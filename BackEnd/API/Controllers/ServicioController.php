<?php
require __DIR__ . "/../Models/Servicio.php";
require __DIR__ . "/../../PDO/database.php";

class ServicioController{
    private $servicio;

    public function __construct()
    {
        global $pdo;

        $this->servicio = new Servicio($pdo);
    }

    public function ObtenerTodos(){
        return $this->servicio->ObtenerTodos();
    }
}