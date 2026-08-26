<?php

class Usuario{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
    public function BuscarUsuario($usuario){
        $sql = "SELECT * FROM usuarios WHERE usuario = ?";

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute([$usuario]);

        return $consulta->fetch();
    }
}