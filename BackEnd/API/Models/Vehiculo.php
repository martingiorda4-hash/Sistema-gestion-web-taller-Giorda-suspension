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
        //VERIFICO SI EL VEHICULO TIENE TRABAJOS
        $sqlVehiculo = "SELECT COUNT(*) FROM trabajos WHERE id_vehiculo = :id";
        $consultaVehiculo =$this->pdo->prepare($sqlVehiculo);

        $consultaVehiculo->execute([
            ":id" => $id
        ]);

        $cantidad = $consultaVehiculo->fetchColumn();

        if($cantidad > 0){
            return false;
        }

        // si no tiene trabajos, elimina
        $sql = "DELETE FROM vehiculos WHERE id = :id";

        $consulta = $this->pdo->prepare($sql);

    return $consulta->execute([
            ":id" => $id
        ]);
    }

    public function ObtenerVehiculoPorId($id){
        $sql = "SELECT * FROM vehiculos WHERE id = :id";
        
        $consulta = $this->pdo->prepare($sql);
        $consulta->bindParam(":id", $id);

        $consulta->execute();

        return $consulta->fetch(PDO::FETCH_ASSOC);
    }
    public function ObtenerVehiculoPorCliente($cliente_id){
        $sql = "SELECT * FROM vehiculos WHERE cliente_id = :cliente_id";
        
        $consulta = $this->pdo->prepare($sql);
        $consulta->bindParam(":cliente_id", $cliente_id);

        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }
}