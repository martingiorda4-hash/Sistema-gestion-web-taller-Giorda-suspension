export async function IniciarSesion(datos) {
    const response = await fetch("http://giordasuspension/BackEnd/API/usuarios.php", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        }
    );
    return response.json();
}