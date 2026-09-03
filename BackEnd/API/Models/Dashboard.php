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
                FROM trabajos";

        $consulta = $this->pdo->prepare($sql);
        $consulta->execute();

        return $consulta->fetch(PDO::FETCH_ASSOC);
    }
}