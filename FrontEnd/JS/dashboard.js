const btnNuevoCliente = document.getElementById("btnClienteNuevo");
const btnNuevoTrabajo = document.getElementById("btnTrabajoNuevo");

btnNuevoCliente.addEventListener("click", () => {
    window.location.href = "clientes.html?abrirModal=true"
});

btnNuevoTrabajo.addEventListener("click", () => {
    window.location.href = "trabajos.html?abrirModal=true"
});

