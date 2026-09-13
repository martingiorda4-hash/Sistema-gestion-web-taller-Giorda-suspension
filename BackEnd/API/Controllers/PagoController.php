<?php
require_once __DIR__ . "/../Models/Pago.php";
require_once __DIR__ . "/../../PDO/database.php";

class PagoController{

    private $pago;

    public function __construct()
    {
        global $pdo;

        $this->pago = new Pago($pdo);
    }

    public function ObtenerTodos(){
        return  $this->pago->ObtenerTodos();
    }

    public function CrearPago($datos){
        $this->pago->CrearPago(
            $datos["id_cliente"],
            $datos["id_trabajo"],
            $datos["importe"],
            $datos["metodo_pago"]
        );
        return "Pago creado correctamente";
    }
    public function ObtenerPagoPorCliente($idCliente){
        return $this->pago->ObtenerPagoPorCliente($idCliente);
    }
    public function ObtenerPagoPorTrabajo($idTrabajo){
        return $this->pago->ObtenerPagoPorTrabajo($idTrabajo);
    }
}