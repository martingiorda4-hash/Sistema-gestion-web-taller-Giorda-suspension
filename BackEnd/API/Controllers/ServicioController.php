<?php
require_once __DIR__ . "/../Models/Servicio.php";
require_once __DIR__ . "/../../PDO/database.php";

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
    public function CrearServicio($datos){
        $this->servicio->CrearServicio(
            $datos["nombre"],
            $datos["precio_base"]
            );

        return "Servicio creado";
    }
    public function ModificarServicio($datos){
        $this->servicio->ModificarServicio(
            $datos["id"],
            $datos["nombre"],
            $datos["precio_base"]
        );
        return "Servicio modificado";
    }
}