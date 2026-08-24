<?php
include_once __DIR__ . "../../Models/CuentaCorriente.php";
include_once __DIR__ . "../../../PDO/database.php";

class CuentaCorrienteController{

    private $cuentaCorriente;

    public function __construct()
    {
        global $pdo;
        $this->cuentaCorriente = new CuentaCorriente($pdo);
    }

    public function ObtenerTodos(){
        return $this->cuentaCorriente->ObtenerTodos();
    }
}