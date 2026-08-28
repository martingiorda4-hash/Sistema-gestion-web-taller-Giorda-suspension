import { ObtenerClientes } from "./API/clienteAPI";
import {ObtenerVehiculoPorCliente} from "./API/vehiculoAPI";
import { 
    ObtenerTrabajos,
    ObtenerPorId,
    ModificarTrabajo,
    EliminarTrabajo,
    CrearTrabajo
} from "./API/trabajoAPI";
import { ObtenerTodosServicios } from "./API/serviciosAPI";

const fechaDesde = document.getElementById("fechaDesde");
const fechaHasta = document.getElementById("fechaHasta");

const textoDesde = fechaDesde.closest(".campo-fecha").querySelector("span");
const textoHasta = fechaHasta.closest(".campo-fecha").querySelector("span");

const botonNuevoTrabajo = document.getElementById("btnNuevoTrabajo");
const botonCancelar = document.getElementById("btnCancelarTrabajo");
const modalTrabajo = document.getElementById("modalTrabajo");

const tituloModalTrabajo = document.querySelector(".modal-trabajo .modal h2");
const trabajoIdInput = document.getElementById("trabajoId");

const modalEliminarTrabajo = document.getElementById("modalEliminarTrabajo");
//const eliminarTrabajo = document.getElementById("eliminar");
const btnCancelarEliminar = document.getElementById("btnCancelarEliminarTrabajo");
const btnAceptarEliminar = document.getElementById("btnAceptarEliminarTrabajo");

const modalDetalleTrabajo = document.getElementById("modalDetalleTrabajo");
const btnCerrarModalDetalle = document.getElementById("btnCerrarModalDetalle");
const btnCerrarModalNuevo = document.getElementById("btnCerrarModalNuevoTrabajo");

const formNuevoTrabajo = document.getElementById("formTrabajo");
const tablaTrabajos = document.getElementById("tablaTrabajos");

const parametros = new URLSearchParams(window.location.search);

const selectCliente = document.getElementById("cliente");
const selectVehiculo = document.getElementById("vehiculoCliente");
const selectServicios = document.getElementById("servicio");

fechaDesde.addEventListener("change", function() {
    if(this.value !== ""){
        textoDesde.style.display = "none";
        this.classList.add("tiene-valor");
    }else{
        textoDesde.style.display = "block";
        this.classList.remove("tiene-valor");
    }
})

fechaHasta.addEventListener("change", function() {
    if(this.value !== ""){
        textoHasta.style.display = "none";
        this.classList.add("tiene-valor");
    }else{
        textoHasta.style.display = "block";
        this.classList.remove("tiene-valor");
    }
})

let modoEdicion = false;
let trabajoEditando = null;

async function abrirModalCrear(){
    modoEdicion = false;
    trabajoEditando = null;


    trabajoIdInput.value = "";
    tituloModalTrabajo.textContent = "Nuevo trabajo";
    document.getElementById("formTrabajo").reset();

    //Cargar clientes en select
    const clientes = await ObtenerClientes();
    const selectCliente = document.getElementById("cliente");

    selectCliente.innerHTML = ` <option value="">Seleccione un cliente</option>`;

    clientes.forEach(cliente => {
        let nombreCliente;

        if(cliente.tipo_cliente === "particular"){
            nombreCliente = `${cliente.nombre} ${cliente.apellido}`;
        }else{
            nombreCliente = `${cliente.razon_social}`;
        }

        selectCliente.innerHTML += `
            <option value="${cliente.id}">${nombreCliente}</option>;
        `;
    });

    //Cargar servicios en select
    selectServicios.innerHTML = `<option value="">Seleccione un servicio</option>`;

    const servicios = await ObtenerTodosServicios();

    servicios.forEach(servicio => {

        selectServicios.innerHTML += `
            <option value="${servicio.id}">
                ${servicio.nombre}
            </option>
        `;
    });
    modalTrabajo.classList.remove("oculto");
}
selectCliente.addEventListener("change", async () => {
    const clienteId = selectCliente.value;

    selectVehiculo.innerHTML = `<option value="">Seleccione un vehiculo respecto al cliente</option>`;

    if(clienteId === ""){
        return;
    }
    const vehiculos = await ObtenerVehiculoPorCliente(clienteId);

    vehiculos.forEach(vehiculo => {
        selectVehiculo.innerHTML += `
            <option value="${vehiculo.id}">
                ${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.patente}
            </option>
        `;
    });
});


function abrirModalEditar(trabajo){
    modoEdicion = true;
    trabajoEditando = trabajo;

    trabajoIdInput.value = trabajo.id;
    tituloModalTrabajo.textContent = "Editar trabajo";

    document.getElementById("fecha").value = trabajo.fecha;
    document.getElementById("cliente").value = trabajo.clienteId;
    document.getElementById("vehiculoCliente").value = trabajo.vehiculoId;
    document.getElementById("estadoModal").value = trabajo.estado;
    document.getElementById("servicio").value = trabajo.servicioId;
    document.getElementById("observaciones").value = trabajo.observaciones;

    modalTrabajo.classList.remove("oculto");
}


function cerrarModal(){
    modalTrabajo.classList.add("oculto")
}

function abrirModalEliminar(){
    modalEliminarTrabajo.classList.remove("oculto");
}
function cerrarModalEliminar(){
    modalEliminarTrabajo.classList.add("oculto");
}

function abrirModalDetalle(){
    modalDetalleTrabajo.classList.remove("oculto");
}
function cerrarModalDetalle(){
    modalDetalleTrabajo.classList.add("oculto");
}


btnCerrarModalDetalle.addEventListener("click", cerrarModalDetalle);
btnCerrarModalNuevo.addEventListener("click", cerrarModal);

//eliminarTrabajo.addEventListener("click", abrirModalEliminar);
btnCancelarEliminar.addEventListener("click", cerrarModalEliminar);


botonNuevoTrabajo.addEventListener("click", abrirModalCrear);


if(parametros.get("abrirModal") === "true"){
    abrirModalCrear();
}


botonCancelar.addEventListener("click", () => {

    if(parametros.get("abrirModal") === "true"){
        window.location.href = "dashboard.html";
    }else{
        modalTrabajo.classList.add("oculto");
    }

});

//LOGICA PARA CONSUMIR API, OBTENER VALORES DEL FORMULARIO Y MOSTRARLOS EN LA TABLA

function ValidarTrabajos(){
    const cliente = document.getElementById("cliente").value;
    const vehiculo = document.getElementById("vehiculoCliente").value;
    const servicio = document.getElementById("servicio").value;
    const estado = document.getElementById("estadoModal").value;
    
    if(cliente === ""){
        alert("Debe seleccionar un cliente");
        return false;
    }
    if(vehiculo === ""){
        alert("Debe seleccionar un vehículo");
        return false;
    }
    if(servicio === ""){
        alert("Debe seleccionar un servicio");
        return false;
    }
    if(estado === ""){
        alert("Debe seleccionar un estado");
        return false;
    }
    return true;
}

function MostrarTrabajos(trabajos){
    //LOGICA PAGINACION

    tablaTrabajos.innerHTML = "";

    trabajos.forEach(trabajo => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${trabajo.nombre_cliente}</td>
            <td>${trabajo.marca} ${trabajo.modelo} ${trabajo.patente}</td>
            <td>${trabajo.servicio}</td>
            <td>${trabajo.estado}</td>
            <td>${trabajo.fecha}</td>
            <td>
                <div class="acciones">
                        <i class="fa-solid fa-eye" data-id="${trabajo.id}" title="Ver detalle"></i>
                        <i class="fa-solid fa-pen" data-id="${trabajo.id}" title="Editar"></i>
                        <i class="fa-solid fa-trash" data-id="${trabajo.id}" title="Eliminar"></i>
                </div>
            </td>
        `
        tablaTrabajos.appendChild(fila);
    });
}
async function CargarTrabajos(){
    const trabajos = await ObtenerTrabajos();
    console.log(trabajos);
    MostrarTrabajos(trabajos);
}

let trabajoAEliminar = null;
tablaTrabajos.addEventListener("click", async (e)=>{
    if(e.target.classList.contains("fa-trash")){
        trabajoAEliminar = e.target.dataset.id;

        
        abrirModalEliminar();
    }

    if(e.target.classList.contains("fa-pen")){
        const id = e.target.dataset.id;

        const trabajo = await ObtenerPorId(id);

        abrirModalEditar(trabajo);

    }
    if(e.target.classList.contains("fa-eye")){
        const id = e.target.dataset.id;

        abrirModalDetalle(id);
    }
})
async function EditarTrabajo(trabajo) {
    await ModificarTrabajo(trabajo);
}
btnAceptarEliminar.addEventListener("click", async() =>{
    await EliminarTrabajo(trabajoAEliminar);

    alert("Trabajo eliminado");
    trabajoAEliminar = null;

    cerrarModalEliminar();

    await CargarTrabajos();
})
formNuevoTrabajo.addEventListener("submit", async function (event) {
    event.preventDefault();

    if(!ValidarTrabajos()){
        return;
    }

        const trabajo ={
            id_cliente: document.getElementById("cliente").value,
            id_vehiculo: document.getElementById("vehiculoCliente").value,
            id_servicio: document.getElementById("servicio").value,
            estado: document.getElementById("estadoModal").value,
            observaciones: document.getElementById("observaciones").value
        };


    if(modoEdicion){
        trabajo.id = trabajoEditando.id;
        await EditarTrabajo(trabajo);
        alert("Trabajo modificado con éxito");
        
    }else{
        await CrearTrabajo(trabajo);
        alert("Trabajo cargado con éxito");
    }
    cerrarModal();
    await CargarTrabajos();
})
CargarTrabajos();

