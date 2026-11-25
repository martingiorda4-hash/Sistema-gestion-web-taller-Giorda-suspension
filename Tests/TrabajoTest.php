<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../BackEnd/API/Models/Trabajo.php';
require_once __DIR__ . '/../BackEnd/API/Models/Cliente.php';
require_once __DIR__ . '/../BackEnd/API/Models/Vehiculo.php';
require_once __DIR__ . '/../BackEnd/API/Models/TrabajoServicio.php';
require_once __DIR__ . '/../BackEnd/API/Models/Servicio.php';

class TrabajoTest extends TestCase {
    private $pdo;
    private $trabajo;
    private $vehiculo;
    private $trabajoServicio;
    private $servicio;
    private $idsServiciosCreados = [];
    private $idsTrabajosCreados = [];
    private $idsClientesCreados = [];
    private $idsVehiculosCreados = [];

    protected function setUp(): void
    {
        require __DIR__ . '/../BackEnd/PDO/database.php';

        $this->pdo = $pdo;
        $this->trabajo = new Trabajo($this->pdo);
        $this->vehiculo = new Vehiculo($this->pdo);
        $this->trabajoServicio = new TrabajoServicio($this->pdo);
        $this->servicio = new Servicio($this->pdo);
    }
    protected function tearDown(): void {
        foreach ($this->idsTrabajosCreados as $id) {
            $consulta = $this->pdo->prepare(
                "DELETE FROM trabajo_servicio WHERE id_trabajo = :id"
            );
            $consulta->execute([":id" => $id]);
        }
        // eliminamos los trabajos de prueba.
        foreach ($this->idsTrabajosCreados as $id) {
            $consulta = $this->pdo->prepare(
                "DELETE FROM trabajos WHERE id = :id"
            );

            $consulta->execute([":id" => $id]);
        }

        // eliminamos los vehículos.
        foreach ($this->idsVehiculosCreados as $id) {
            $consulta = $this->pdo->prepare(
                "DELETE FROM vehiculos WHERE id = :id"
            );

            $consulta->execute([":id" => $id]);
        }

        // eliminamos los clientes.
        foreach ($this->idsClientesCreados as $id) {
            $consulta = $this->pdo->prepare(
                "DELETE FROM clientes WHERE id = :id"
            );

            $consulta->execute([":id" => $id]);
        }
        // eliminar servicios 
        foreach ($this->idsServiciosCreados as $id) {
            $consulta = $this->pdo->prepare(
                "DELETE FROM servicios WHERE id = :id"
            );
            $consulta->execute([":id" => $id]);
        }
        
    }
    private function crearVehiculoYCliente(): array {
         $cliente = new Cliente($this->pdo);

        $telefono = 'TEST' . uniqid();

        $idCliente = $cliente->CrearCliente(
            'particular',
            'Cliente',
            'Trabajo',
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
            'FORD',
            'FOCUS',
            2020
        );
        $this->assertNotEmpty($idVehiculo);
        $this->idsVehiculosCreados[] = $idVehiculo;

        return [
            'idCliente' => $idCliente,
            'idVehiculo' => $idVehiculo
        ];
    }
    private function crearTrabajoPrueba(): int{
        $datos = $this->crearVehiculoYCliente();

        $idTrabajo = $this->trabajo->CrearTrabajo(
            $datos['idCliente'],
            $datos['idVehiculo'],
            'Pendiente',
            'Trabajo de prueba'
        );
        $this->assertNotEmpty($idTrabajo);
        $this->idsTrabajosCreados[] = $idTrabajo;

        return $idTrabajo;
    }
    public function testModificarTrabajo(): void {
       $idTrabajo = $this->crearTrabajoPrueba();

       $trabajo = $this->trabajo->ObtenerPorId($idTrabajo);

       $resultado = $this->trabajo->ModificarTrabajo(
            $idTrabajo,
            $trabajo['id_cliente'],
            $trabajo['id_vehiculo'],
            'En progreso',
            'Trabajo modificado'
       );
       $this->assertTrue($resultado);

       $trabajoModificado = $this->trabajo->ObtenerPorId($idTrabajo);

        $this->assertSame('En progreso', $trabajoModificado['estado']);
        $this->assertSame('Trabajo modificado', $trabajoModificado['observaciones']);
    }
    public function testConsultarTrabajo(): void {
        $idTrabajo = $this->crearTrabajoPrueba();

        $trabajo = $this->trabajo->ObtenerPorId($idTrabajo);

        $this->assertNotFalse($trabajo);
        $this->assertSame((int) $idTrabajo, (int) $trabajo['id']);
        $this->assertSame('Pendiente', $trabajo['estado']);
        $this->assertSame('Trabajo de prueba', $trabajo['observaciones']);
    }
    public function testEliminarTrabajo(): void {
        $idTrabajo = $this->crearTrabajoPrueba();

        $resultado = $this->trabajo->EliminarTrabajo($idTrabajo);

        $this->assertTrue($resultado);

        $trabajo = $this->trabajo->ObtenerPorId($idTrabajo);

        $this->assertFalse($trabajo);
    }
    public function testCrearTrabajoConServicio(): void {
        $idTrabajo = $this->crearTrabajoPrueba();

        $idServicio = $this->servicio->CrearServicio(
            'Servicio de prueba ' . uniqid(),
            25000
        );

        $this->assertNotEmpty($idServicio);
        $this->idsServiciosCreados[] = $idServicio;

        $this->trabajoServicio->AgregarServicio(
            $idTrabajo,
            $idServicio
        );

        $servicios = $this->trabajoServicio->ObtenerPorTrabajo($idTrabajo);

        $this->assertCount(1, $servicios);
        $this->assertSame((int) $idServicio, (int) $servicios[0]['id_servicio']);
        $this->assertEquals(25000, $servicios[0]['precio']);
    }
} 