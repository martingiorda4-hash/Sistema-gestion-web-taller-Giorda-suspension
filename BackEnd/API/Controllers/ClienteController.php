<?php
require_once __DIR__ . "/../Models/Cliente.php";
require_once __DIR__ . "/../../PDO/database.php";

class ClienteController{
    private $cliente;

    public function __construct()
    {
        global $pdo;

        $this->cliente = new Cliente($pdo);
    }
    public function ObtenerTodos(){
        return $this->cliente->ObtenerTodos();
    }
    
    public function CrearCliente($datos){
        $this->cliente->CrearCliente(
            $datos["tipo_cliente"],
            $datos["nombre"],
            $datos["apellido"],
            $datos["telefono"],
            $datos["razon_social"],
            $datos["cuit"]
        );
        echo json_encode("Cliente creado correctamente");
    }

    public function ModificarCliente($datos){
        $this->cliente->ModificarCliente(
            $datos["id"],
            $datos["tipo_cliente"],
            $datos["nombre"],
            $datos["apellido"],
            $datos["telefono"],
            $datos["razon_social"],
            $datos["cuit"]
        );
        echo json_encode("Cliente modificado correctamente");
    }

    public function EliminarCliente($id){
        $this->cliente->EliminarCliente($id);
        echo json_encode("Cliente eliminado correctamente");
    }

    public function ObtenerPorId($id){
        return $this->cliente->ObtenerPorId($id);
    }

}