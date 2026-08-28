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
            $datos["nombre"] ?? null,
            $datos["apellido"] ?? null,
            $datos["telefono"],
            $datos["razon_social"] ?? null,
            $datos["cuit"] ?? null
        );
        return "Cliente creado correctamente";
    }

    public function ModificarCliente($datos){
        $this->cliente->ModificarCliente(
            $datos["id"],
            $datos["tipo_cliente"],
            $datos["nombre"] ?? null,
            $datos["apellido"] ?? null,
            $datos["telefono"],
            $datos["razon_social"] ?? null,
            $datos["cuit"] ?? null
        );
        return "Cliente modificado correctamente";
    }

    public function EliminarCliente($id){
        $this->cliente->EliminarCliente($id);
        return "Cliente eliminado correctamente";
    }

    public function ObtenerPorId($id){
        return $this->cliente->ObtenerPorId($id);
    }
    public function BuscarCliente($txt){
        return $this->cliente->BuscarCliente($txt);
    }
}