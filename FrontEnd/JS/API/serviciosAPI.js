const url = "http://giordasuspension/BackEnd/API/servicios.php";

export async function ObtenerTodosServicios() {
    const response = await fetch(url);

    return response.json();
}
export async function CrearServicio(servicio) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(servicio)
    });
    return await response.json();
}
export async function ModificarServicio(servicio) {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(servicio)
    });
    return await response.json();
}