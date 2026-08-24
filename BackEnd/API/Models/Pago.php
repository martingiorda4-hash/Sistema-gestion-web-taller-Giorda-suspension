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

    public function CrearPago($id_cliente, $importe, $metodo_pago){
        $sql = "INSERT INTO pagos 
                (id_cliente, fecha, importe, metodo_pago)
                VALUES 
                (:id_cliente, NOW(), :importe, :metodo_pago)";

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute([
            ":id_cliente" => $id_cliente,
            ":importe" => $importe,
            ":metodo_pago" => $metodo_pago
        ]);

        return $this->pdo->lastInsertId();
    }
}
