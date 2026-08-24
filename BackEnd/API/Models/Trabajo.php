<?php

class Trabajo {
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function ObtenerTodos(){
        $sql = "SELECT * FROM trabajos";

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_ASSOC);

    }

    public function CrearTrabajo($idCliente, $idVehiculo, $idServicio, $estado, $importe, $observaciones){
        $sql = "INSERT INTO trabajos
                (id_cliente, id_vehiculo, id_servicio, estado, importe, observaciones)
                VALUES
                (:id_cliente, :id_vehiculo, :id_servicio, :estado, :importe, :observaciones)";

        $consulta = $this->pdo->prepare($sql);

        $consulta->execute([
            ":id_cliente" => $idCliente,
            ":id_vehiculo" => $idVehiculo,
            ":id_servicio" => $idServicio,
            ":estado" => $estado,
            ":importe" => $importe,
            ":observaciones" => $observaciones
        ]);

        return $this->pdo->lastInsertId();
    }

    public function ModificarTrabajo($id, $idCliente, $idVehiculo, $idServicio, $estado, $importe, $observaciones){
        $sql = "UPDATE trabajos
                SET id_cliente = :id_cliente,
                    id_vehiculo = :id_vehiculo,
                    id_servicio = :id_servicio,
                    estado = :estado,
                    importe = :importe,
                    observaciones = :observaciones
                WHERE id = :id";
        
        $consulta = $this->pdo->prepare($sql);

        $consulta->execute([
            ":id" => $id,
            ":id_cliente" => $idCliente,
            ":id_vehiculo" => $idVehiculo,
            ":id_servicio" => $idServicio,
            ":estado" => $estado,
            ":importe" => $importe,
            ":observaciones" => $observaciones
        ]);

    }
    public function EliminarTrabajo($id){
        $sql = "DELETE FROM trabajos WHERE id = :id";

        $consulta = $this->pdo->prepare($sql);

        return $consulta->execute([
            ":id" => $id
        ]);
    }
}