const url = "http://giordasuspension/BackEnd/API/dashboard.php";

export async function ObtenerDatos() {
    const response = await fetch(url);

    return response.json();
}