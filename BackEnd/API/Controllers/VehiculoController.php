<?php
require __DIR__ . "/../Models/Vehiculo.php";
require __DIR__ . "/../../PDO/database.php";

class VehiculoController{
    private $vehiculo;

    public function __construct()
    {
        global $pdo;
        $this->vehiculo = new Vehiculo($pdo);
    }

    public function ObtenerTodos(){
        return $this->vehiculo->ObtenerTodos();
    }

    public function CrearVehiculo($datos){
        $this->vehiculo->CrearVehiculo(
            $datos["cliente_id"],
            $datos["patente"],
            $datos["marca"],
            $datos["modelo"],
            $datos["anio"]
        );
        echo json_encode("Vehiculo creado correctamente");
    }

    public function ModificarVehiculo($datos){
        $this->vehiculo->ModificarVehiculo(
            $datos["id"],
            $datos["cliente_id"],
            $datos["patente"],
            $datos["marca"],
            $datos["modelo"],
            $datos["anio"]
        );
        echo json_encode("Vehiculo modificado correctamente");
    }

    public function EliminarVehiculo($id){
        $this->vehiculo->EliminarVehiculo($id);

        echo json_encode("Vehiculo eliminado correctamente");
    }
}