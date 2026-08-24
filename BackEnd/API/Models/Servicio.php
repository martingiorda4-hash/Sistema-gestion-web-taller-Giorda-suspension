<?php

class Servicio{
    private $pdo;

    public function __construct($pdo)
    {
        $this-> pdo = $pdo;
    }

    public function ObtenerTodos(){
        $sql = "SELECT * FROM servicios";
        
        $consulta = $this->pdo->prepare($sql);
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }
}