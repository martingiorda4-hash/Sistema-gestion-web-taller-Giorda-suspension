<?php
require_once __DIR__ . "../../Models/Dashboard.php";
require_once __DIR__ . "../../../PDO/database.php";

class DashboardController{
    private $dashboard;

    public function __construct()
    {
        global $pdo;
        $this->dashboard = new Dashboard($pdo);
    }
    public function ObtenerDatos(){
        return $this->dashboard->ObtenerDatos();
    }
    public function ObtenerPagosPendientes(){
        return $this->dashboard->ObtenerPagosPendientes();
    }
}