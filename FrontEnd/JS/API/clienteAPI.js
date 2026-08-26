const url = "http://giordasuspension/BackEnd/API/clientes.php";

export async function ObtenerClientes() {
    const response = await fetch(url);

    return await response.json();
}

export async function CrearCliente(cliente) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    });

    return await response.json();
}

export async function ModificarCliente(cliente) {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    });
    return await response.json();

}

export async function EliminarCliente(id) {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id:id})
    })
    return await response.json();
}

export async function ObtenerPorId(id) {
    const response = await fetch(`${url}?id=${id}`);

    return await response.json();
}