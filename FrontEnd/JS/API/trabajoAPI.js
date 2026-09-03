const url = "http://giordasuspension/BackEnd/API/trabajos.php";

export async function ObtenerTrabajos(){
    const response = await fetch(url);

    return await response.json();
}

export async function CrearTrabajo(trabajo) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trabajo)
    });

    return await response.json();
}

export async function ModificarTrabajo(trabajo) {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trabajo)
    });
    return await response.json();
}



export async function EliminarTrabajo(id) {
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

export async function BuscarTrabajo(txt, estado, fechaDesde, fechaHasta) {
    const response = await fetch(`${url}?buscar=${encodeURIComponent(txt)}&estado=${encodeURIComponent(estado)}&fechaDesde=${encodeURIComponent(fechaDesde)}&fechaHasta=${encodeURIComponent(fechaHasta)}`); 
                                        //URI COMPONENT CONVIERTE EL TEXTO EN FORMATO CORRECTO PARA LA URL.

    return await response.json();
}
export async function ObtenerTrabajoPorCliente(idCliente) {
    const response = await fetch(`${url}?id_cliente=${idCliente}`);
    return response.json();
}