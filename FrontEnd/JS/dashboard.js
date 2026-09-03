import { ObtenerDatos } from "./API/dashboardAPI";
import{ObtenerTrabajos} from "./API/trabajoAPI";

const btnNuevoCliente = document.getElementById("btnClienteNuevo");
const btnNuevoTrabajo = document.getElementById("btnTrabajoNuevo");

const cardTrabajos = document.getElementById("cardTrabajos");
const cardTrabajosPendientes = document.getElementById("cardTrabajosPendientes");
const cardTrabajosEntrega = document.getElementById("cardTrabajosParaEntrega");
const cardTrabajosEntregados = document.getElementById("resumenEntregados");
const cardTerminados = document.getElementById("resumenTerminados");

const tablaTrabajos = document.getElementById("tablaTrabajos");

btnNuevoCliente.addEventListener("click", () => {
    window.location.href = "clientes.html?abrirModal=true"
});

btnNuevoTrabajo.addEventListener("click", () => {
    window.location.href = "trabajos.html?abrirModal=true"
});

//LOGICA CARGAR DESDE LA API LOS VALORES

async function CargarDashboard() {
    const datos = await ObtenerDatos();

    console.log(datos);

    cardTrabajos.textContent = datos.trabajosEnCurso;

    cardTrabajosPendientes.textContent = datos.trabajosPendientes;

    cardTrabajosEntrega.textContent = datos.trabajosTerminados;

    cardTrabajosEntregados.textContent = datos.trabajosEntregados;

    cardTerminados.textContent = datos.trabajosTerminados;
}
async function cargarTablaTrabajos() {
    
    const trabajos = await ObtenerTrabajos();
    const ultimosTrabajos = trabajos.slice(0, 5);
    tablaTrabajos.innerHTML = "";
    
    ultimosTrabajos.forEach(trabajo => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${trabajo.id}</td>
            <td>${trabajo.nombre_cliente}</td>
            <td>${trabajo.marca} ${trabajo.modelo} ${trabajo.patente}</td>
            <td>${trabajo.estado}</td>
            <td>${new Date(trabajo.fecha + "T00:00:00").toLocaleDateString("es-AR")}</td>
        `;

        tablaTrabajos.appendChild(fila);
    });
}
CargarDashboard();
cargarTablaTrabajos();
