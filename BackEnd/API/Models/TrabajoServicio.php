<?php
class TrabajoServicio{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function ObtenerPorTrabajo($idTrabajo){
        $sql = "SELECT 
                    ts.id,
                    ts.id_trabajo,
                    ts.id_servicio,
                    s.nombre,
                    ts.precio
                FROM trabajo_servicio ts
                INNER JOIN servicios s
                    ON ts.id_servicio = s.id
                WHERE ts.id_trabajo = :id_trabajo";
        
        $consulta = $this->pdo->prepare($sql);

        $consulta->execute([
            ":id_trabajo" => $idTrabajo
        ]);

        return $consulta->fetchAll(PDO::FETCH_ASSOC);

    }

    public function AgregarServicio($idTrabajo, $idServicio){

        //OBTENGO EL PRECIO DEL SERVICIO
        $sql = "SELECT precio_base
                FROM servicios
                WHERE id = :id_servicio";
        $consulta = $this->pdo->prepare($sql);

        $consulta->execute([
            ":id_servicio" => $idServicio
        ]);
        $servicio = $consulta->fetch(PDO::FETCH_ASSOC);


        $sql = "INSERT INTO trabajo_servicio
                (id_trabajo, id_servicio, precio)
                VALUES
                (:id_trabajo, :id_servicio, :precio)";

        $consulta = $this->pdo->prepare($sql);

        $consulta->execute([
            ":id_trabajo" => $idTrabajo,
            ":id_servicio" => $idServicio,
            ":precio" => $servicio["precio_base"]
        ]);
    }
}