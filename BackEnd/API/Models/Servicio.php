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
    
    
    public function CrearServicio($nombre, $precio_base){
        $sql = "INSERT INTO servicios 
                (nombre, precio_base)
                VALUES
                (:nombre, :precio_base)";

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute([
            ":nombre" => $nombre,
            ":precio_base" => $precio_base
        ]);
        return $this->pdo->lastInsertId();
    }
    public function ModificarServicio($id, $nombre, $precio_base){
        $sql = "UPDATE servicios
                SET nombre = :nombre,
                    precio_base = :precio_base
                WHERE id = :id";
        
        $consulta = $this->pdo->prepare($sql);
        $consulta->execute([
            ":id" => $id,
            ":nombre" => $nombre,
            ":precio_base" => $precio_base
        ]);

    }
    // public function EliminarServicio($id){
    //     $sql = "UPDATE servicios 
    //             SET activo = 0
    //             WHERE id = :id";

    //     $consulta = $this->pdo->prepare($sql);

    //     return $consulta->execute([
    //         ":id" => $id
    //     ]);
    // }
}