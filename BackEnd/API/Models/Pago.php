<?php
class Pago{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function ObtenerTodos(){
        $sql = "SELECT * FROM pagos";

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public function CrearPago($id_cliente,$id_trabajo, $importe, $metodo_pago){
        $sql = "INSERT INTO pagos 
                (id_cliente, id_trabajo, fecha, importe, metodo_pago)
                VALUES 
                (:id_cliente, :id_trabajo, NOW(), :importe, :metodo_pago)";

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute([
            ":id_cliente" => $id_cliente,
            ":id_trabajo" => $id_trabajo,
            ":importe" => $importe,
            ":metodo_pago" => $metodo_pago
        ]);

        return $this->pdo->lastInsertId();
    }
    public function ObtenerPagoPorCliente($idCliente){
        $sql = "SELECT *
                FROM pagos
                WHERE id_cliente = :id_cliente
                ORDER BY fecha DESC";
        
        $consulta = $this->pdo->prepare($sql);
        $consulta->execute([
            ":id_cliente" => $idCliente
        ]);
        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }
    public function ObtenerPagoPorTrabajo($idTrabajo){
        $sql = "SELECT *
                FROM pagos
                WHERE id_trabajo = :id_trabajo
                ORDER BY fecha DESC";
        
        $consulta = $this->pdo->prepare($sql);
        $consulta->execute([
            ":id_trabajo" => $idTrabajo
        ]);
        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }
}
