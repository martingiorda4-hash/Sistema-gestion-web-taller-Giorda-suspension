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

    public function testCrearCliente(): void{
        $telefono = 'TEST' . uniqid();

        $id = $this->cliente->CrearCliente(
            'particular',
            'Cliente',
            'Prueba',
            $telefono,
            null,
            null
        );

        $this->assertNotEmpty($id);

        $this->idsCreados[] = $id;

        $cliente = $this->cliente->ObtenerPorId($id);

        $this->assertSame($telefono, $cliente['telefono']);
        $this->assertSame('Activo', $cliente['estado']);

    }

    //TEST MODIFICAR CLIENTE

    public function testModificarCliente():void {
        $telefono = 'TEST' . uniqid();

        $id= $this->cliente->CrearCliente(
            'Particular',
            'Cliente',
            'Original',
            $telefono,
            null,
            null
        );
        $this->assertNotEmpty($id);

        $this->cliente->ModificarCliente(
            $id,
            'particular',
            'Cliente',
            'Modificado',
            $telefono,
            null,
            null
        );

        $cliente = $this->cliente->ObtenerPorId($id);

        $this->assertSame('Cliente', $cliente['nombre']);
        $this->assertSame('Modificado', $cliente['apellido']);
        $this->assertSame($telefono, $cliente['telefono']);
    }

    //TEST CONSULTAR CLIENTE
    public function testConsultarCliente():void {
        $telefono = 'TEST' . uniqid();

        $id = $this->cliente->CrearCliente(
            'particular',
            'Cliente',
            'Consulta',
            $telefono,
            null,
            null
        );
        $this->assertNotEmpty($id);

        $this->idsCreados[] = $id;

        $cliente = $this->cliente->ObtenerPorId($id);

        $this->assertNotFalse($cliente);
        $this->assertSame('Cliente', $cliente['nombre']);
        $this->assertSame('Consulta', $cliente['apellido']);
        $this->assertSame($telefono, $cliente['telefono']);
        
    }

    //TEST RECHAZAR CLIENTE DUPLICADO
    public function testRechazarClienteDuplicado(): void {
        
        $telefono = 'TEST' . uniqid();

        $id = $this->cliente->CrearCliente(
            'particular',
            'Cliente',
            'Duplicado',
            $telefono,
            null,
            null
        );

        $this->assertNotEmpty($id);

        $this->idsCreados[] = $id;

        $resultado = $this->cliente->CrearCliente(
            'particular',
            'Cliente',
            'Duplicado',
            $telefono,
            null,
            null
        );

        $this->assertNull($resultado);
    }

    //TEST DAR DE BAJA CLIENTE
    public function testDarDeBajaCliente():void {

        $telefono = 'TEST' . uniqid();

        $id = $this->cliente->CrearCliente(
            'particular',
            'Cliente',
            'Baja',
            $telefono,
            null,
            null
        );

        $this->assertNotEmpty($id);

        $this->idsCreados[] = $id;

        $resultado = $this->cliente->EliminarCliente($id);

        $this->assertTrue($resultado);

        $cliente = $this->cliente->ObtenerPorId($id);

        $this->assertSame('Inactivo', $cliente['estado']);

    }
}

