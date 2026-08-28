const url = "http://giordasuspension/BackEnd/API/servicios.php";

export async function ObtenerTodosServicios() {
    const response = await fetch(url);

    return response.json();
}