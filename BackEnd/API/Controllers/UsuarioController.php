<?php
include_once __DIR__ . "../../Models/Usuario.php";
include_once __DIR__ . "../../../PDO/database.php";

class UsuarioController{
    private $usuario;

    public function __construct()
    {
        global $pdo;

        $this->usuario = new Usuario($pdo);
    }
    public function BuscarUsuario($usuario){
        return $this->usuario->BuscarUsuario($usuario);
    }
    public function IniciarSesion($datos){
        $usuario = $this->usuario->BuscarUsuario($datos["usuario"]);

        if(!$usuario){
            return false;
        }
        $contraseniaCorrecta = password_verify($datos["contrasenia"], $usuario["contrasenia"]);
        
        if($contraseniaCorrecta === false){
            return false;
        }

        unset($usuario["contrasenia"]);
        
        return $usuario;
    }
}