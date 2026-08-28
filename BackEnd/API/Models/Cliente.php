<?php

class Cliente {
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function ObtenerTodos(){
        $sql = "SELECT 
                    c.*,
                    COUNT(v.id) AS cantidad_vehiculos
                FROM clientes c
                LEFT JOIN vehiculos v ON v.cliente_id = c.id
                GROUP BY c.id";

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_ASSOC);

    }

    public function CrearCliente($tipoCliente, $nombre, $apellido, $telefono, $razonSocial, $cuit){
        $sql = "INSERT INTO clientes
                (tipo_cliente, nombre, apellido, telefono, razon_social, cuit)
                VALUES
                (:tipo_cliente, :nombre, :apellido, :telefono, :razon_social, :cuit)";

        $consulta = $this->pdo->prepare($sql);

        $consulta->execute([
            ":tipo_cliente" => $tipoCliente,
            ":nombre" => $nombre,
            ":apellido" => $apellido,
            ":telefono" => $telefono,
            ":razon_social" => $razonSocial,
            ":cuit" => $cuit
        ]);

        return $this->pdo->lastInsertId();
    }

    public function ModificarCliente($id, $tipoCliente, $nombre, $apellido, $telefono, $razonSocial, $cuit){
        $sql = "UPDATE clientes
                SET tipo_cliente = :tipo_cliente,
                    nombre = :nombre,
                    apellido = :apellido,
                    telefono = :telefono,
                    razon_social = :razon_social,
                    cuit = :cuit
                WHERE id = :id";
        
        $consulta = $this->pdo->prepare($sql);

        $consulta->execute([
            ":id" => $id,
            ":tipo_cliente" => $tipoCliente,
            ":nombre" => $nombre,
            ":apellido" => $apellido,
            ":telefono" => $telefono,
            ":razon_social" => $razonSocial,
            ":cuit" => $cuit
        ]);

    }
    public function EliminarCliente($id){
        $sql = "UPDATE clientes 
                SET estado = 'Inactivo'
                WHERE id = :id";

        $consulta = $this->pdo->prepare($sql);

        return $consulta->execute([
            ":id" => $id
        ]);

        
    }

    public function ObtenerPorId($id){
        $sql = "SELECT * FROM clientes WHERE id = :id";

        $consulta = $this->pdo->prepare($sql);
        $consulta->bindParam(":id", $id);

        $consulta->execute();

        return $consulta->fetch(PDO::FETCH_ASSOC);
    }

    public function BuscarCliente($txt){
        $sql = "SELECT 
                    c.*,
                    COUNT(v.id) AS cantidad_vehiculos
                FROM clientes c
                LEFT JOIN vehiculos v ON v.cliente_id = c.id
                WHERE c.nombre LIKE :txt
                    OR c.apellido LIKE :txt
                    OR c.razon_social LIKE :txt
                GROUP BY c.id";

        $consulta = $this->pdo->prepare($sql);

        $consulta->execute([
            ":txt" => "%" . $txt . "%"
        ]);

        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }
}