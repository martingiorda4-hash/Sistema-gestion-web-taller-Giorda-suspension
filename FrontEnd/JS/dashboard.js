import { ObtenerDatos, ObtenerPagosPendientes } from "./API/dashboardAPI";
import{ObtenerTrabajos} from "./API/trabajoAPI";
import { VerificarSesion } from "./API/sesionAPI";

const sesionActiva = await VerificarSesion();

if(!sesionActiva){
    window.location.href = "login.html";
}

const btnNuevoCliente = document.getElementById("btnClienteNuevo");
const btnNuevoTrabajo = document.getElementById("btnTrabajoNuevo");

const cardTrabajos = document.getElementById("cardTrabajos");
const cardTrabajosPendientes = document.getElementById("cardTrabajosPendientes");
const cardTrabajosEntrega = document.getElementById("cardTrabajosParaEntrega");
const cardTrabajosEntregados = document.getElementById("resumenEntregados");
const cardTerminados = document.getElementById("resumenTerminados");
const cardPagos = document.getElementById("cardPagos");

const tablaTrabajos = document.getElementById("tablaTrabajos");

const nombreAdmin = document.getElementById("nombreAdmin");


const btnVerPagos = document.getElementById("btnVerPendientes");
const modalPagosPendientes = document.getElementById("modalPagosPendientes");
const btnCerrarModal = document.getElementById("cerrarModalPagosPendientes");
const tablaPagosPendientes = document.getElementById("tablaPagosPendientes");

btnNuevoCliente.addEventListener("click", () => {
    window.location.href = "clientes.html?abrirModal=true"
});

btnNuevoTrabajo.addEventListener("click", () => {
    window.location.href = "trabajos.html?abrirModal=true"
});

async function abrirModal(){
    await CargarTablaPendientes();
    modalPagosPendientes.classList.remove("oculto");
}
function cerrarModal(){
    modalPagosPendientes.classList.add("oculto");
}
btnVerPagos.addEventListener("click", abrirModal);
btnCerrarModal.addEventListener("click", cerrarModal);

//LOGICA CARGAR DESDE LA API LOS VALORES

async function CargarDashboard() {
    const datos = await ObtenerDatos();


    cardTrabajos.textContent = datos.trabajosEnCurso;

    cardTrabajosPendientes.textContent = datos.trabajosPendientes;

    cardTrabajosEntrega.textContent = datos.trabajosTerminados;

    cardTrabajosEntregados.textContent = datos.trabajosEntregados;

    cardTerminados.textContent = datos.trabajosTerminados;

    cardPagos.textContent = `$${Number(datos.pagosPendientes).toLocaleString("es-AR")}`;
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
function MostrarNombreUsuario() {

    nombreAdmin.textContent = localStorage.getItem("usuario"); 
}
async function CargarTablaPendientes(){
    const pagosPendientes =  await ObtenerPagosPendientes();

    console.log(pagosPendientes);

    tablaPagosPendientes.innerHTML = "";

    pagosPendientes.forEach(pendientes => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>#${pendientes.id}</td>
            <td>${pendientes.tipo_cliente === "particular"
                ? pendientes.nombre + " " + pendientes.apellido
                : pendientes.razon_social}</td>
            <td>${pendientes.marca} ${pendientes.modelo} ${pendientes.patente}</td>
            <td>$${Number(pendientes.total).toLocaleString("es-AR")}</td>
            <td>$${Number(pendientes.pendiente).toLocaleString("es-AR")}</td>
        `;

        tablaPagosPendientes.appendChild(fila);
    });

}
CargarDashboard();
cargarTablaTrabajos();
MostrarNombreUsuario();
