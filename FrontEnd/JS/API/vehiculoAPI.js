const url = "http://giordasuspension/BackEnd/API/vehiculos.php";

export async function ObtenerVehiculoPorCliente(clienteId) {
    const response = await fetch(`${url}?cliente_id=${clienteId}`);

    return await response.json();
}

export async function CrearVehiculo(vehiculo) {
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            "Content-Type":"application/json"

        },
        body: JSON.stringify(vehiculo)
    });
    return await response.json();
}

export async function ModificarVehiculo(vehiculo) {
    const response = await fetch(url,{
        method: 'PUT',
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify(vehiculo)
    });
    return await response.json();
}

export async function ObtenerVehiculoId(id) {
    const response = await fetch(`${url}?id=${id}`);

    return await response.json();
}

export async function EliminarVehiculo(id) {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({id:id})
    });
    return await response.json();
}
