<?php

class Usuario{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
    public function BuscarUsuario($usuario){
        $sql = "SELECT * FROM usuarios WHERE usuario = :usuario";

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute([":usuario" => $usuario]);

        return $consulta->fetch(PDO::FETCH_ASSOC);
    }
}