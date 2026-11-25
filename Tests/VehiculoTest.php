<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '../../BackEnd/API/Models/Vehiculo.php';
require_once __DIR__ . '../../BackEnd/API/Models/Cliente.php';

class VehiculoTest extends TestCase {
    private $pdo;
    private $vehiculo;
    private $idsVehiculosCreados = [];
    private $idsClientesCreados = [];
    private $idsTrabajosCreados = [];

    protected function setUp(): void
    {
        require __DIR__ . '/../BackEnd/PDO/database.php';

        $this->pdo = $pdo;
        $this->vehiculo = new Vehiculo($this->pdo);
    }

    protected function tearDown(): void
    {
        foreach ($this->idsVehiculosCreados as $id) {
            $consulta = $this->pdo->prepare(
                "DELETE FROM vehiculos WHERE id = :id"
            );

            $consulta->execute([":id" => $id]);
        }

        foreach ($this->idsClientesCreados as $id) {
            $consulta = $this->pdo->prepare(
                "DELETE FROM clientes WHERE id = :id"
            );

            $consulta->execute([":id" => $id]);
        }

        foreach ($this->idsTrabajosCreados as $id){
            $consulta = $this->pdo->prepare(
                "DELETE FROM trabajos WHERE id = :id"
            );

            $consulta->execute([":id" => $id]);
        }
    }

    public function testRegistrarVehiculo(): void {
        $cliente = new Cliente($this->pdo);

        $telefono = 'TEST' . uniqid();

        $idCliente = $cliente->CrearCliente(
            'particular',
            'Cliente',
            'Vehiculo',
            $telefono,
            null,
            null
        );

        $this->assertNotEmpty($idCliente);

        $this->idsClientesCreados[] = $idCliente;

        $patente = 'TEST' . uniqid();

        $idVehiculo = $this->vehiculo->CrearVehiculo(
            $idCliente,
            $patente,
            'Toyota',
            'Corolla',
            2020
        );

         $this->assertNotEmpty($idVehiculo);

        $this->idsVehiculosCreados[] = $idVehiculo;

        $vehiculo = $this->vehiculo->ObtenerVehiculoPorId($idVehiculo);

        $this->assertNotFalse($vehiculo);
        $this->assertSame($patente, $vehiculo['patente']);
    }

    public function testModificarVehiculo(): void {
        $cliente = new Cliente($this->pdo);

        $telefono = 'TEST' . uniqid();

        $idCliente = $cliente->CrearCliente(
            'particular',
            'Cliente',
            'Vehiculo',
            $telefono,
            null,
            null
        );

        $this->assertNotEmpty($idCliente);

        $this->idsClientesCreados[] = $idCliente;

        $patente = 'TEST' .uniqid();

        $idVehiculo = $this->vehiculo->CrearVehiculo(
            $idCliente,
            $patente,
            'Toyota',
            'Corolla',
            2020
        );

        $this->assertNotEmpty($idVehiculo);
        $this->idsVehiculosCreados[] = $idVehiculo;

        $this->vehiculo->ModificarVehiculo(
            $idVehiculo,
            $idCliente,
            $patente,
            'Ford',
            'Focus',
            2022
        );
        $vehiculo = $this->vehiculo->ObtenerVehiculoPorId($idVehiculo);

        $this->assertSame('Ford', $vehiculo['marca']);
        $this->assertSame('Focus', $vehiculo['modelo']);
        $this->assertSame('2022', (string) $vehiculo['anio']);

    }

    public function testConsultarVehiculo(): void {
        $cliente = new Cliente($this->pdo);

        $telefono = 'TEST' . uniqid();

        $idCliente = $cliente->CrearCliente(
            'particular',
            'Cliente',
            'Consulta',
            $telefono,
            null,
            null
        );

        $this->assertNotEmpty($idCliente);

        $this->idsClientesCreados[] = $idCliente;

        $patente = 'TEST' . uniqid();

        $idVehiculo = $this->vehiculo->CrearVehiculo(
            $idCliente,
            $patente,
            'Toyota',
            'Corolla',
            2020
        );

        $this->assertNotEmpty($idVehiculo);

        $this->idsVehiculosCreados[] = $idVehiculo;

        $vehiculo = $this->vehiculo->ObtenerVehiculoPorId($idVehiculo);

        $this->assertNotFalse($vehiculo);
        $this->assertSame($patente, $vehiculo['patente']);
        $this->assertSame('Toyota', $vehiculo['marca']);
        $this->assertSame('Corolla', $vehiculo['modelo']);
    }

    public function testEliminarVehiculoSinTrabajo():void {
        $cliente = new Cliente($this->pdo);

        $telefono = 'TEST' . uniqid();

        $idCliente = $cliente->CrearCliente(
            'particular',
            'Cliente',
            'Eliminacion',
            $telefono,
            null,
            null
        );

        $this->assertNotEmpty($idCliente);

        $this->idsClientesCreados[] = $idCliente;

        $patente = 'TEST' . uniqid();

        $idVehiculo = $this->vehiculo->CrearVehiculo(
            $idCliente,
            $patente,
            'Toyota',
            'Corolla',
            2020
        );

        $this->assertNotEmpty($idVehiculo);

        $this->idsVehiculosCreados[] = $idVehiculo;

        $resultado = $this->vehiculo->EliminarVehiculo($idVehiculo);

        $this->assertTrue($resultado);

        $vehiculo = $this->vehiculo->ObtenervehiculoPorId($idVehiculo);

        $this->assertFalse($vehiculo);
    }

    public function testNoEliminarVehiculoConTrabajos(): void {
        $cliente = new Cliente($this->pdo);

        $telefono = 'TEST' . uniqid();

        $idCliente = $cliente->CrearCliente(
            'particular',
            'Cliente',
            'ConTrabajo',
            $telefono,
            null,
            null
        );

        $this->assertNotEmpty($idCliente);

        $this->idsClientesCreados[] = $idCliente;

        $patente = 'TEST' . uniqid();

        $idVehiculo = $this->vehiculo->CrearVehiculo(
            $idCliente,
            $patente,
            'Toyota',
            'Corolla',
            2020
        );

        $this->assertNotEmpty($idVehiculo);

        $this->idsVehiculosCreados[] = $idVehiculo;

        // Creamos un trabajo asociado al vehículo.
        $consulta = $this->pdo->prepare(
            "INSERT INTO trabajos
            (id_cliente, id_vehiculo, estado, observaciones)
            VALUES (:id_cliente, :id_vehiculo, :estado, :observaciones)"
        );

        $consulta->execute([
            ":id_cliente" => $idCliente,
            ":id_vehiculo" => $idVehiculo,
            ":estado" => "Pendiente",
            ":observaciones" => "Trabajo de prueba"
        ]);

        $idTrabajo = $this->pdo->lastInsertId();

        $this->idsTrabajosCreados[] = $idTrabajo;

        // Intentamos eliminar el vehículo.
        $resultado = $this->vehiculo->EliminarVehiculo($idVehiculo);

        $this->assertFalse($resultado);

        $vehiculo = $this->vehiculo->ObtenerVehiculoPorId($idVehiculo);

        $this->assertNotFalse($vehiculo);
    }
}