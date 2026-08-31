<?php

class Trabajo {
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function ObtenerTodos(){
        $sql = "SELECT 
                    t.id,
                    t.id_cliente,
                    t.id_vehiculo,
                    c.tipo_cliente,
                    c.nombre,
                    c.apellido,
                    c.razon_social,
                    v.marca,
                    v.modelo,
                    v.patente,
                    s.nombre AS servicio,
                    t.estado,
                    t.fecha,
                    t.observaciones
                FROM trabajos t
                INNER JOIN clientes c ON t.id_cliente = c.id
                INNER JOIN vehiculos v ON t.id_vehiculo = v.id
                INNER JOIN servicios s ON t.id_servicio = s.id";

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute();

        $trabajos = $consulta->fetchAll(PDO::FETCH_ASSOC);

        for($i = 0; $i < count($trabajos); $i++){
            if($trabajos[$i]["tipo_cliente"] === "particular"){
                $trabajos[$i]["nombre_cliente"] = $trabajos[$i]["nombre"] . " " . $trabajos[$i]["apellido"];
            }else{
                $trabajos[$i]["nombre_cliente"] = $trabajos[$i]["razon_social"];
            }
        }
        return $trabajos;

    }

    public function CrearTrabajo($idCliente, $idVehiculo, $idServicio, $estado, $observaciones){
        $sql = "INSERT INTO trabajos
                (id_cliente, id_vehiculo, id_servicio, estado, importe, observaciones)
                SELECT
                :id_cliente, :id_vehiculo, :id_servicio, :estado, precio_base, :observaciones
                
                FROM servicios 
                WHERE id = :id_servicio_busqueda";

        $consulta = $this->pdo->prepare($sql);

        $consulta->execute([
            ":id_cliente" => $idCliente,
            ":id_vehiculo" => $idVehiculo,
            ":id_servicio" => $idServicio,
            ":estado" => $estado,
            ":observaciones" => $observaciones,
            ":id_servicio_busqueda" => $idServicio
        ]);

        return $this->pdo->lastInsertId();
    }

    public function ModificarTrabajo($id, $idCliente, $idVehiculo, $idServicio, $estado, $observaciones){
        $sql = "UPDATE trabajos
                SET id_cliente = :id_cliente,
                    id_vehiculo = :id_vehiculo,
                    id_servicio = :id_servicio,
                    estado = :estado,
                    observaciones = :observaciones
                WHERE id = :id";
        
        $consulta = $this->pdo->prepare($sql);

        $consulta->execute([
            ":id" => $id,
            ":id_cliente" => $idCliente,
            ":id_vehiculo" => $idVehiculo,
            ":id_servicio" => $idServicio,
            ":estado" => $estado,
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
    public function ObtenerPorId($id){
        $sql = $sql = "SELECT 
                            t.id,
                            t.id_cliente,
                            t.id_vehiculo,
                            c.tipo_cliente,
                            c.nombre,
                            c.apellido,
                            c.razon_social,
                            v.marca,
                            v.modelo,
                            v.patente,
                            t.estado,
                            t.fecha,
                            t.observaciones
                        FROM trabajos t
                        INNER JOIN clientes c ON t.id_cliente = c.id
                        INNER JOIN vehiculos v ON t.id_vehiculo = v.id
                        WHERE t.id = :id";
        
        $consulta = $this->pdo->prepare($sql);

        $consulta->bindParam(":id", $id);
        $consulta->execute();

        return $consulta->fetch(PDO::FETCH_ASSOC);
    }
    public function BuscarTrabajo($txt, $estado, $fechaDesde, $fechaHasta){
        $sql = "SELECT 
                    t.*,
                    c.tipo_cliente,
                    c.nombre,
                    c.apellido,
                    c.razon_social,
                    v.marca,
                    v.modelo,
                    v.patente
                FROM trabajos t
                INNER JOIN clientes c ON t.id_cliente = c.id
                INNER JOIN vehiculos v ON t.id_vehiculo = v.id
                WHERE (c.nombre LIKE :txt
                    OR c.apellido LIKE :txt
                    OR c.razon_social LIKE :txt
                    OR v.marca LIKE :txt
                    OR v.modelo LIKE :txt
                    OR v.patente LIKE :txt
                )
                AND (:estado = 'todos' OR t.estado = :estado)";
                
                $parametros  = [
                    ":txt" => "%" . $txt . "%",
                    ":estado" => $estado
                ];

                if($fechaDesde !== null){
                    $sql .= " AND t.fecha >= :fechaDesde";
                    $parametros[":fechaDesde"] = $fechaDesde;
                }
                if($fechaHasta !== null){
                    $sql .= " AND t.fecha <= :fechaHasta";
                    $parametros[":fechaHasta"] = $fechaHasta;
                }
    
        $consulta = $this->pdo->prepare($sql);

        $consulta->execute($parametros);
        $trabajos = $consulta->fetchAll(PDO::FETCH_ASSOC);

        for($i = 0; $i < count($trabajos); $i++){
            if($trabajos[$i]["tipo_cliente"] === "particular"){
                $trabajos[$i]["nombre_cliente"] = $trabajos[$i]["nombre"] . " " . $trabajos[$i]["apellido"];
            }else{
                $trabajos[$i]["nombre_cliente"] = $trabajos[$i]["razon_social"];
            }
        }
        return $trabajos;
    }
}