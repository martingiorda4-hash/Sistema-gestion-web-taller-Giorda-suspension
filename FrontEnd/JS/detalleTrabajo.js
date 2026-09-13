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

    if(trabajo.tipo_cliente === "particular"){
        clienteDetalle.textContent = trabajo.nombre + " " + trabajo.apellido; 
    }else{
        clienteDetalle.textContent = trabajo.razon_social;
    }

    marcaVehiculoDetalle.textContent = trabajo.marca;
    modeloVehiculoDetalle.textContent = trabajo.modelo;
    patenteVehiculoDetalle.textContent = trabajo.patente;

    fechaDetalle.textContent = new Date(trabajo.fecha + "T00:00:00").toLocaleDateString("es-AR");

    estadoDetalle.textContent = trabajo.estado;

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
    totalServicios.textContent = "$" + total.toLocaleString("es-AR");
}
CargarDatosDetalle();