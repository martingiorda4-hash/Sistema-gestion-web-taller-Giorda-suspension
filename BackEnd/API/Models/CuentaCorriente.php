<?php
class CuentaCorriente{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
    public function ObtenerTodos(){
        $sql = "SELECT 
                    cc.id,
                    cc.fecha,
                    cc.concepto,
                    cc.debito,
                    cc.credito,
                    c.tipo_cliente,
                    c.nombre,
                    c.apellido,
                    c.razon_social,
                    c.cuit,
                    c.telefono
                FROM cuenta_corriente cc
                INNER JOIN clientes c
                    ON cc.id_cliente = c.id";
                    

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

}