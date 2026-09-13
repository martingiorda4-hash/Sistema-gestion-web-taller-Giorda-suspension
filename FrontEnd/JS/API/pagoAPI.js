const url = "http://giordasuspension/BackEnd/API/pagos.php";

export async function ObtenerTodos() {
    const response = await fetch(url);
    return response.json();
}
export async function ObtenerPagoPorCliente(idCliente) {
    const response = await fetch(`${url}?id_cliente=${idCliente}`);
    return response.json();
}
export async function ObtenerPagoPorTrabajo(idTrabajo) {
    const response = await fetch(`${url}?id_trabajo=${idTrabajo}`);
    return response.json();
}
export async function CrearPago(pago) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(pago)
    });
    return response.json();
}