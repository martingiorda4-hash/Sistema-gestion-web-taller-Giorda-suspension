const url = "http://giordasuspension/BackEnd/API/trabajoServicio.php";

export async function ObtenerServicioPorTrabajo(idTrabajo) {
    const response = await fetch(`${url}?id_trabajo=${idTrabajo}`);

    return await response.json();
}

export async function AgregarServicio(idTrabajo, idServicio) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({

            id_servicio: idServicio,
            id_trabajo: idTrabajo
        })
    });
    return await response.json();
}
export async function EliminarServicio(idServicio) {
    const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            id_servicio:idServicio
        })
    });
    return await response.json();
}