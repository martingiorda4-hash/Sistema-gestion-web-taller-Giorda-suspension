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
            $datos["importe"],
            $datos["metodo_pago"]
        );
        echo json_encode("Pago creado correctamente");
    }
}