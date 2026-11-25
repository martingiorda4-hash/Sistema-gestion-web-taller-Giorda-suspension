<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../BackEnd/API/Models/Cliente.php';

class ClienteTest extends TestCase{
    private $pdo;
    private $cliente;
    private $idsCreados = [];
    
    protected function setUp():void{
        require __DIR__ . '/../BackEnd/PDO/database.php';
        


        $this->pdo = $pdo;
        $this->cliente = new Cliente($this->pdo);
    }

    protected function tearDown(): void
    {
        foreach($this->idsCreados as $id){
            $consulta = $this->pdo->prepare(
                "DELETE FROM clientes WHERE id = :id"
            );
            $consulta->execute([":id" => $id]);
        }
    }
    private function crearClientePrueba(string $apellido = 'Prueba'): int {
        $telefono = 'TEST' . uniqid();

        $id = $this->cliente->CrearCliente(
            'particular',
            'Cliente',
            $apellido,
            $telefono,
            null,
            null
        );

        $this->assertNotEmpty($id);

        $this->idsCreados[] = $id;

        return $id;
    }
    public function testCrearCliente(): void{
        $id = $this->crearClientePrueba();

        $cliente = $this->cliente->ObtenerPorId($id);

        $this->assertNotFalse($cliente);
        $this->assertSame('Cliente', $cliente['nombre']);
        $this->assertSame('Activo', $cliente['estado']);

    }

    //TEST MODIFICAR CLIENTE

    public function testModificarCliente():void {
        $id = $this->crearClientePrueba('Original');

        $this->cliente->ModificarCliente(
            $id,
            'particular',
            'Cliente',
            'Modificado',
            $this->cliente->ObtenerPorId($id)['telefono'],
            null,
            null
        );

        $cliente = $this->cliente->ObtenerPorId($id);

        $this->assertSame('Cliente', $cliente['nombre']);
        $this->assertSame('Modificado', $cliente['apellido']);
    }

    //TEST CONSULTAR CLIENTE
    public function testConsultarCliente():void {
        $id = $this->crearClientePrueba('Consulta');

        $cliente = $this->cliente->ObtenerPorId($id);

        $this->assertNotFalse($cliente);
        $this->assertSame('Cliente', $cliente['nombre']);
        $this->assertSame('Consulta', $cliente['apellido']);
            
    }

    //TEST RECHAZAR CLIENTE DUPLICADO
    public function testRechazarClienteDuplicado(): void {
        
        $id = $this->crearClientePrueba('Duplicado');

        $cliente = $this->cliente->ObtenerPorId($id);

        $resultado = $this->cliente->CrearCliente(
            'particular',
            'Cliente',
            'Duplicado',
            $cliente['telefono'],
            null,
            null
        );

        $this->assertNull($resultado);
    }

    //TEST DAR DE BAJA CLIENTE
    public function testDarDeBajaCliente():void {

        $id = $this->crearClientePrueba('Baja');

        $resultado = $this->cliente->EliminarCliente($id);

        $this->assertTrue($resultado);

        $cliente = $this->cliente->ObtenerPorId($id);

        $this->assertSame('Inactivo', $cliente['estado']);

    }
}

