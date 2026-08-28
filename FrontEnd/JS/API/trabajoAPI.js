const url = "http://giordasuspension/BackEnd/API/trabajos.php";

export async function ObtenerTrabajos(trabajos){
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

export async function BuscarTrabajo(txt) {
    const response = await fetch(`${url}?buscar=${encodeURIComponent(txt)}`); //URI COMPONENT CONVIERTE EL TEXTO EN FORMATO CORRECTO PAR LA URL.

    return await response.json();
}