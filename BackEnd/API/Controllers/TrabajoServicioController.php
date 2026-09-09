<?php
include_once __DIR__ . "../../Models/TrabajoServicio.php";
include_once __DIR__ . "../../../PDO/database.php";

class TrabajoServicioController{

    private $trabajoServicio;

    public function __construct()
    {
        global $pdo;
        $this->trabajoServicio = new TrabajoServicio($pdo);
    }

    public function ObtenerPorTrabajo($idTrabajo){
        return $this->trabajoServicio->ObtenerPorTrabajo($idTrabajo);
    }
    
    public function AgregarServicio($datos){
        
        $this->trabajoServicio->AgregarServicio(
            $datos["id_trabajo"],
            $datos["id_servicio"]
        );

        return "Servicio agregado correctamente";
    }
    public function EliminarServicio($id){
        return $this->trabajoServicio->EliminarServicio($id);
    }
}