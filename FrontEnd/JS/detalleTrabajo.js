import { ObtenerPagoPorTrabajo } from "./API/pagoAPI";
import { ObtenerPorId } from "./API/trabajoAPI";
import { ObtenerServicioPorTrabajo } from "./API/trabajoServicioAPI";


const parametros = new URLSearchParams(window.location.search);
const idTrabajo = parametros.get("id");

const clienteDetalle = document.getElementById("clienteDetalle");
const marcaVehiculoDetalle = document.getElementById("marcaDetalle");
const modeloVehiculoDetalle = document.getElementById("modeloDetalle");
const patenteVehiculoDetalle = document.getElementById("patenteDetalle");
const fechaDetalle = document.getElementById("fechaDetalleTrabajo");
const estadoDetalle = document.getElementById("estadoDetalle");

const tablaServicios = document.getElementById("tablaServiciosDetalleTrabajo");
const totalServicios = document.getElementById("totalServiciosDetalleTrabajo");

const tablaPagos = document.getElementById("tablaPagosDetalleTrabajo");

const observacionesDetalle = document.getElementById("observacionesDetalleTrabajo");

const btnVolver = document.getElementById("btnVolver");
const btnModificar = document.getElementById("modificarTrabajo");
const btnEliminar = document.getElementById("eliminarTrabajo");


async function CargarDatosDetalle() {
    const trabajo = await ObtenerPorId(idTrabajo);

    const servicios = await ObtenerServicioPorTrabajo(idTrabajo);

    const pagos = await ObtenerPagoPorTrabajo(idTrabajo);

    if(trabajo.tipo_cliente === "particular"){
        clienteDetalle.textContent = trabajo.nombre + " " + trabajo.apellido; 
    }else{
        clienteDetalle.textContent = trabajo.razon_social;
    }

    marcaVehiculoDetalle.textContent = trabajo.marca;
    modeloVehiculoDetalle.textContent = trabajo.modelo;
    patenteVehiculoDetalle.textContent = trabajo.patente;

    fechaDetalle.textContent = new Date(trabajo.fecha + "T00:00:00").toLocaleDateString("es-AR");


    observacionesDetalle.textContent = trabajo.observaciones;

    let total = 0;

    tablaServicios.innerHTML = "";

    servicios.forEach((servicio, index)  => {
        total += Number(servicio.precio);

        tablaServicios.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${servicio.nombre}</td>
                <td>$${Number(servicio.precio).toLocaleString("es-AR")}</td>
            </tr>
        `;

    });

    tablaPagos.innerHTML = "";

    pagos.forEach(pago => {

        tablaPagos.innerHTML += `
            <tr>
                <td>${new Date(pago.fecha).toLocaleDateString("es-AR")}</td>
                <td>${pago.metodo_pago}</td>
                <td>$${Number(pago.importe).toLocaleString("es-AR")}</td>
            </tr>
        `;
    });

    const claseEstado = obtenerClaseEstados(trabajo.estado);
    estadoDetalle.innerHTML += `

            <span class="estado ${claseEstado}">
                ${trabajo.estado}
            </span>
        `;
    totalServicios.textContent = "$" + total.toLocaleString("es-AR");
}
function obtenerClaseEstados(estado){
    if(estado === "Pendiente"){
        return "estado-pendiente";
    }
    if(estado === "En progreso"){
        return "estado-en-progreso";
    }
    if(estado === "Terminado"){
        return "estado-terminado";
    }
    if(estado === "Entregado"){
        return "estado-entregado";
    }
}
btnVolver.addEventListener("click", () =>{
    window.location.href = "trabajos.html";
})
btnModificar.addEventListener("click", () =>{
    window.location.href = `trabajos.html?editar=${idTrabajo}`;
});
btnEliminar.addEventListener("click", () => {
    window.location.href = `trabajos.html?eliminar=${idTrabajo}`;
});
CargarDatosDetalle();