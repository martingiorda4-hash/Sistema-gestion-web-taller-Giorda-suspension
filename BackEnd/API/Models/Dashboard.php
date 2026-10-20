<?php
class Dashboard{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
    public function ObtenerDatos(){
        $sql = "SELECT
                    SUM(CASE WHEN estado = 'En progreso' THEN 1 ELSE 0 END) AS trabajosEnCurso,
                    SUM(CASE WHEN estado = 'Pendiente' THEN 1 ELSE 0 END) AS trabajosPendientes,
                    SUM(CASE WHEN estado = 'Terminado' THEN 1 ELSE 0 END) AS trabajosTerminados,
                    SUM(CASE WHEN estado = 'Entregado' THEN 1 ELSE 0 END) AS trabajosEntregados
                FROM trabajos
                WHERE eliminado = FALSE";

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute();

        $datos = $consulta->fetch(PDO::FETCH_ASSOC);

        $sql = "SELECT 
                    t.id,
                    SUM(ts.precio) AS total,
                    (
                        SELECT SUM(p.importe)
                        FROM pagos p
                        WHERE p.id_trabajo = t.id
                    ) AS pagado
                FROM trabajos t
                INNER JOIN trabajo_servicio ts ON ts.id_trabajo = t.id
                WHERE t.eliminado = FALSE
                GROUP BY t.id";
        
        $consulta = $this->pdo->prepare($sql);
        $consulta->execute();

        $trabajos = $consulta->fetchAll(PDO::FETCH_ASSOC);

        $pagosPendientes = 0;

        foreach($trabajos as $trabajo){

            $pagado = $trabajo["pagado"] ?? 0;

            $pendiente = $trabajo["total"] - $pagado;


            $pagosPendientes += $pendiente;
        }
        $datos["pagosPendientes"] = $pagosPendientes;

        return $datos;
    }

    public function ObtenerPagosPendientes(){
        $sql = "SELECT 
                    t.id,
                    c.nombre,
                    c.apellido,
                    c.razon_social,
                    c.tipo_cliente,
                    v.marca,
                    v.modelo,
                    v.patente,
                    SUM(ts.precio) AS total,
                    (
                        SELECT SUM(p.importe)
                        FROM pagos p
                        WHERE p.id_trabajo = t.id
                    ) AS pagado
                FROM trabajos t
                INNER JOIN clientes c ON t.id_cliente = c.id
                INNER JOIN vehiculos v ON t.id_vehiculo = v.id
                INNER JOIN trabajo_servicio ts ON ts.id_trabajo = t.id
                WHERE t.eliminado = FALSE
                GROUP BY t.id";
        
        $consulta = $this->pdo->prepare($sql);
        $consulta ->execute();

        $trabajos = $consulta->fetchAll(PDO::FETCH_ASSOC);

        $pagosPendientes = [];

        foreach($trabajos as $trabajo){

            $pagado = $trabajo["pagado"] ?? 0;

            $pendiente = $trabajo["total"] - $pagado;


            if($pendiente > 0){
                $trabajo["pendiente"]= $pendiente;

                $pagosPendientes[] = $trabajo;
            }
        }
        return $pagosPendientes;

        

    }

}