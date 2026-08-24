<?php
class Vehiculo{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function ObtenerTodos(){
        $sql = "SELECT * FROM vehiculos";

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public function CrearVehiculo($clienteId, $patente, $marca, $modelo, $anio){
        $sql = "INSERT INTO vehiculos
                (cliente_id, patente, marca, modelo, anio)
                VALUES 
                (:cliente_id, :patente, :marca, :modelo, :anio)";

        $consulta = $this->pdo->prepare($sql);

        $consulta->execute([
            ":cliente_id" => $clienteId,
            ":patente" => $patente,
            ":marca" => $marca,
            ":modelo" => $modelo,
            ":anio" => $anio
        ]);

        return $this->pdo->lastInsertId();
    }

    public function ModificarVehiculo($id, $clienteId, $patente, $marca, $modelo, $anio){
        $sql = "UPDATE vehiculos
                SET cliente_id = :cliente_id, 
                    patente = :patente,
                    marca = :marca,
                    modelo = :modelo,
                    anio = :anio 
                WHERE id = :id";
        
        $consulta = $this->pdo->prepare($sql);

        $consulta->execute([
            ":id" => $id,
            ":cliente_id" => $clienteId,
            ":patente" => $patente,
            ":marca" => $marca,
            ":modelo" => $modelo,
            ":anio" => $anio
        ]);

    }
    public function EliminarVehiculo($id){
        $sql = "DELETE FROM vehiculos WHERE id = :id";

        $consulta = $this->pdo->prepare($sql);

       return $consulta->execute([
            ":id" => $id
        ]);
    }

}