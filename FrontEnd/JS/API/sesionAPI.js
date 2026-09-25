export async function VerificarSesion(){
    const response = await fetch("http://giordasuspension/Backend/API/sesion.php");

    return await response.json();
}

export async function CerrarSesion(){
    const response = await fetch("http://giordasuspension/Backend/API/logout.php");

    return await response.json();
}