<?php
require_once __DIR__ . "/../Models/Trabajo.php";
require_once __DIR__ . "/../../PDO/database.php";

class TrabajoController{
    private $trabajo;

    public function __construct()
    {
        global $pdo;

        $this->trabajo = new Trabajo($pdo);
    }
    public function ObtenerTodos(){
        return $this->trabajo->ObtenerTodos();
    }
    
    public function CrearTrabajo($datos){
        $idTrabajo =  $this->trabajo->CrearTrabajo(
            $datos["id_cliente"],
            $datos["id_vehiculo"],
            $datos["id_servicio"],
            $datos["estado"],
            $datos["observaciones"]
        );
        return $idTrabajo;
    }

    public function ModificarTrabajo($datos){
        $this->trabajo->ModificarTrabajo(
            $datos["id"],
            $datos["id_cliente"],
            $datos["id_vehiculo"],
            $datos["id_servicio"],
            $datos["estado"],
            $datos["observaciones"]
        );
        return "Trabajo modificado correctamente";
    }

    public function EliminarTrabajo($id){
        $this->trabajo->EliminarTrabajo($id);
        return "Trabajo eliminado correctamente";
    }
    public function ObtenerPorId($id){
        return $this->trabajo->ObtenerPorId($id);
    }
    public function BuscarTrabajo($txt, $estado, $fechaDesde, $fechaHasta){
        $txt = trim($txt);
        $estado = trim($estado);
        $fechaDesde = trim($fechaDesde);
        $fechaHasta = trim($fechaHasta);

        $fechaDesde = $fechaDesde === "" ? null :$fechaDesde;
        $fechaHasta = $fechaHasta === ""? null :$fechaHasta;
        
        return $this->trabajo->BuscarTrabajo($txt, $estado, $fechaDesde, $fechaHasta);
    }
}