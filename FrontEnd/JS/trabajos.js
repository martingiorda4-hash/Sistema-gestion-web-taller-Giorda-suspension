import { ObtenerClientes } from "./API/clienteAPI";
import {ObtenerVehiculoPorCliente} from "./API/vehiculoAPI";
import { 
    ObtenerTrabajos,
    ObtenerPorId,
    ModificarTrabajo,
    EliminarTrabajo,
    CrearTrabajo,
    BuscarTrabajo
} from "./API/trabajoAPI";
import { ObtenerTodosServicios } from "./API/serviciosAPI";
import { 
    ObtenerServicioPorTrabajo,
    AgregarServicio,
    EliminarServicio
} from "./API/trabajoServicioAPI";
import { CrearPago } from "./API/pagoAPI";

import { VerificarSesion } from "./API/sesionAPI";

const sesionActiva = await VerificarSesion();

if(!sesionActiva){
    window.location.href = "login.html";
}


let serviciosOriginales = [];
let serviciosSeleccionados = [];

const fechaDesde = document.getElementById("fechaDesde");
const fechaHasta = document.getElementById("fechaHasta");
const buscadorTrabajos = document.getElementById("inputBuscarTrabajos");

const textoDesde = fechaDesde.closest(".campo-fecha").querySelector("span");
const textoHasta = fechaHasta.closest(".campo-fecha").querySelector("span");

const botonNuevoTrabajo = document.getElementById("btnNuevoTrabajo");
const botonCancelar = document.getElementById("btnCancelarTrabajo");
const modalTrabajo = document.getElementById("modalTrabajo");
const btnGuardar = document.getElementById("btnGuardarTrabajo");

const tituloModalTrabajo = document.querySelector(".modal-trabajo .modal h2");
const trabajoIdInput = document.getElementById("trabajoId");

const modalEliminarTrabajo = document.getElementById("modalEliminarTrabajo");
const btnCancelarEliminar = document.getElementById("btnCancelarEliminarTrabajo");
const btnAceptarEliminar = document.getElementById("btnAceptarEliminarTrabajo");


const btnCerrarModalNuevo = document.getElementById("btnCerrarModalNuevoTrabajo");
const btnAgregarServicio = document.getElementById("btnAgregarServicio");
const contenedorServiciosSeleccionados = document.getElementById("serviciosSeleccionados");

const formNuevoTrabajo = document.getElementById("formTrabajo");
const tablaTrabajos = document.getElementById("tablaTrabajos");

const parametros = new URLSearchParams(window.location.search);

const selectCliente = document.getElementById("cliente");
const selectVehiculo = document.getElementById("vehiculoCliente");
const selectServicios = document.getElementById("servicio");
const estado = document.getElementById("estadoModal");

const infoPagina = document.getElementById("infoPagina");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnAnterior = document.getElementById("btnAnterior");
const botonesPagina = document.querySelectorAll(".numero-pagina");

const btnRegistrarPago = document.getElementById("registrarNuevoPago");
const modalPago = document.getElementById("modalNuevoPago");
const btnCerrarModalPago = document.getElementById("btnCerrarModalPago");
const btnCancelarPago = document.getElementById("btnCancelarPago");
const btnGuardarPago = document.getElementById("btnGuardarPago");
const importePago = document.getElementById("importePago");
const metodoPago = document.getElementById("metodoPago");
const pagoSeleccionado = document.getElementById("pagoSeleccionado");

const idClienteURL = parametros.get("cliente");

let ArrayPagos = []; 
let paginaActual = 1;
const trabajosporPagina = 20;
let trabajosActuales = [];

let modoEdicion = false;
let trabajoEditando = null;
let trabajoOriginal = null;

let trabajoAEliminar = null;

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


async function abrirModalCrear(){
    modoEdicion = false;
    trabajoEditando = null;
    trabajoOriginal = null;

    serviciosOriginales = [];
    serviciosSeleccionados = [];

    ArrayPagos = [];
    pagoSeleccionado.innerHTML = "";
    mostrarServiciosSeleccionados();

    trabajoIdInput.value = "";
    tituloModalTrabajo.textContent = "Nuevo trabajo";
    document.getElementById("formTrabajo").reset();
    btnGuardar.disabled = false; 

    //Cargar clientes en select
    await cargarClienteSelect();
    //Cargar servicios en select
    await cargarServiciosSelect();

    modalTrabajo.classList.remove("oculto");
}
selectCliente.addEventListener("change", async () => {
    const clienteId = selectCliente.value;

    await cargarVehiculosSelect(clienteId);
});

async function abrirModalEditar(trabajo){
    modoEdicion = true;
    trabajoEditando = trabajo;
    
    trabajoOriginal = {
        idCliente: trabajo.id_cliente,
        idVehiculo: trabajo.id_vehiculo,
        estado: trabajo.estado,
        observaciones: trabajo.observaciones
    };

    trabajoIdInput.value = trabajo.id;
    tituloModalTrabajo.textContent = "Editar trabajo";
    btnGuardar.disabled = true;
    
    await cargarClienteSelect();
    
    selectCliente.value = trabajo.id_cliente;
    
    await cargarVehiculosSelect(trabajo.id_cliente);
    

    selectVehiculo.value = trabajo.id_vehiculo;

    await cargarServiciosSelect();

    const servicios = await ObtenerServicioPorTrabajo(trabajo.id);

    serviciosOriginales = [];
    serviciosSeleccionados = [];

    servicios.forEach(servicio => {
        serviciosOriginales.push(String(servicio.id_servicio));
        serviciosSeleccionados.push(String(servicio.id_servicio));
    })
    mostrarServiciosSeleccionados();

    document.getElementById("estadoModal").value = trabajo.estado;
    document.getElementById("observaciones").value = trabajo.observaciones;

    modalTrabajo.classList.remove("oculto");
}
function VerificarCambiosTrabajo(){
    if(!trabajoEditando){
        return;
    }
    const cambio = 
        selectCliente.value != trabajoOriginal.idCliente ||
        selectVehiculo.value != trabajoOriginal.idVehiculo||
        estado.value != trabajoOriginal.estado ||
        observaciones.value.trim() != (trabajoOriginal.observaciones || "").trim() ||
        JSON.stringify(serviciosSeleccionados) != JSON.stringify(serviciosOriginales);
    
    btnGuardar.disabled = !cambio;
}
selectCliente.addEventListener("change", VerificarCambiosTrabajo);
selectVehiculo.addEventListener("change", VerificarCambiosTrabajo);
estado.addEventListener("change", VerificarCambiosTrabajo);
observaciones.addEventListener("input", VerificarCambiosTrabajo);

async function cargarClienteSelect() {
     //Cargar clientes en select
    const clientes = await ObtenerClientes();
    const selectCliente = document.getElementById("cliente");


    selectCliente.innerHTML = ` <option value="">Seleccione un cliente</option>`;

    const clientesActivos = clientes.filter(
        cliente=>cliente.estado === "Activo"
    );

    clientesActivos.forEach(cliente => {
        let nombreCliente;

        if(cliente.tipo_cliente === "particular"){
            nombreCliente = `${cliente.nombre} ${cliente.apellido}`;
        }else{
            nombreCliente = `${cliente.razon_social}`;
        }

        selectCliente.innerHTML += `
            <option value="${cliente.id}">${nombreCliente}</option>
        `;
    });

    if(idClienteURL){
        selectCliente.value = idClienteURL;
        selectCliente.dispatchEvent(new Event("change"));
    }
}
async function cargarVehiculosSelect(clienteId) {
    selectVehiculo.innerHTML = `<option value="">Seleccione un vehiculo respecto al cliente</option>`;

    if(clienteId === ""){
        return;
    }
    const vehiculos = await ObtenerVehiculoPorCliente(clienteId);
    console.log(vehiculos);

    vehiculos.forEach(vehiculo => {
        selectVehiculo.innerHTML += `
            <option value="${vehiculo.id}">
                ${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.patente}
            </option>
        `;
    });
}
async function cargarServiciosSelect() {
    //Cargar servicios en select
    selectServicios.innerHTML = `<option value="">Seleccione un servicio</option>`;

    const servicios = await ObtenerTodosServicios();

    servicios.forEach(servicio => {

        selectServicios.innerHTML += `
            <option value="${servicio.id}" data-precio="${servicio.precio_base}">
                ${servicio.nombre}
            </option>
        `;
    });
}

function cerrarModal(){
    if(parametros.get("abrirModal") === "true"){
        window.location.href = "dashboard.html";
        return;
    }
    modalTrabajo.classList.add("oculto")
}

function abrirModalEliminar(){
    modalEliminarTrabajo.classList.remove("oculto");
}
function cerrarModalEliminar(){
    modalEliminarTrabajo.classList.add("oculto");
}


btnCerrarModalNuevo.addEventListener("click", cerrarModal);

btnCancelarEliminar.addEventListener("click", cerrarModalEliminar);

botonNuevoTrabajo.addEventListener("click", abrirModalCrear);

if(parametros.get("abrirModal") === "true" || idClienteURL){
    abrirModalCrear();

    window.history.replaceState({}, document.title, "trabajos.html");
}

botonCancelar.addEventListener("click",  function(event){
    event.preventDefault();

    if(modoEdicion && !btnGuardar.disabled){
            const confirmar = confirm("Tienes cambios sin guardar. ¿Deseas salir sin guardar?");

            if(!confirmar){
                return;
            }

    }

    if(parametros.get("abrirModal") === "true"){
        window.location.href = "dashboard.html";
    }else{
        modalTrabajo.classList.add("oculto");
    }

});

btnRegistrarPago.addEventListener("click", function () {
    modalPago.classList.remove("oculto");
});
btnCerrarModalPago.addEventListener("click", function () {
    modalPago.classList.add("oculto");
})
btnCancelarPago.addEventListener("click", function () {
    modalPago.classList.add("oculto");
})
btnGuardarPago.addEventListener("click", function(){
    const importe = importePago.value;
    const metodo = metodoPago.value;

    if(importe === "" || metodo === ""){
        alert("Complete todos los campos");
        return;
    }

    ArrayPagos.push({
        importe: importe,
        metodo_pago: metodo
    });  

    pagoSeleccionado.innerHTML = "";

    ArrayPagos.forEach(pago => {
        pagoSeleccionado.innerHTML += `
            <div class="pago-registrado">
                <strong>✓ Pago registrado</strong>
                Pago: $${Number(pago.importe).toLocaleString("es-AR")} - ${pago.metodo_pago}
            </div>
        `;
    })
    importePago.value = "";
    metodoPago.value = "";
    modalPago.classList.add("oculto");
})


//LOGICA PARA CONSUMIR API, OBTENER VALORES DEL FORMULARIO Y MOSTRARLOS EN LA TABLA

function ValidarTrabajos(){
    const cliente = document.getElementById("cliente").value;
    const vehiculo = document.getElementById("vehiculoCliente").value;
    const estado = document.getElementById("estadoModal").value;
    
    if(cliente === ""){
        alert("Debe seleccionar un cliente");
        return false;
    }
    if(vehiculo === ""){
        alert("Debe seleccionar un vehículo");
        return false;
    }
    if(serviciosSeleccionados.length === 0){
        alert("Debe seleccionar al menos un servicio");
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
    trabajosActuales = trabajos;

    const inicio = (paginaActual -1) * trabajosporPagina;
    const fin = inicio + trabajosporPagina;

    const trabajosPagina = trabajos.slice(inicio, fin);

    const desde = inicio + 1;
    const hasta = Math.min(fin, trabajos.length);

    infoPagina.textContent = `Mostrando ${desde} a ${hasta} de ${trabajos.length} trabajos`

    tablaTrabajos.innerHTML = "";

    trabajosPagina.forEach(trabajo => {

        const claseEstado = obtenerClaseEstados(trabajo.estado);
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${new Date(trabajo.fecha + "T00:00:00").toLocaleDateString("es-AR")}</td>
            <td>${trabajo.nombre_cliente}</td>
            <td>${trabajo.marca} ${trabajo.modelo}</td>
            <td>
                <span class="estado ${claseEstado}">
                    ${trabajo.estado}
                </span>
            </td>
            `
        fila.addEventListener("click", async () => {
            //const servicios = await ObtenerServicioPorTrabajo(trabajo.id);
            window.location.href = `detalleTrabajo.html?id=${trabajo.id}`
            //abrirModalDetalle(trabajo, servicios);
        });

        tablaTrabajos.appendChild(fila);
    });
}
//BOTONES PAGINACION
btnSiguiente.addEventListener("click", () => {


    const totalPaginas = Math.ceil(trabajosActuales.length / trabajosporPagina);

    if(paginaActual < totalPaginas){
        paginaActual++;

        MostrarTrabajos(trabajosActuales);
        ActualizarBotonActivo();
    }
})

btnAnterior.addEventListener("click", () => {
    if(paginaActual > 1){
        paginaActual--;

        MostrarTrabajos(trabajosActuales);
        ActualizarBotonActivo();
    }
})
botonesPagina.forEach(boton => {

    boton.addEventListener("click", () => {
        paginaActual = Number(boton.dataset.pagina);
    
        MostrarTrabajos(trabajosActuales);
    
        botonesPagina.forEach(botones => {
            botones.classList.remove("activo");
        });
        boton.classList.add("activo");
    });
});
function ActualizarBotonActivo(){
    botonesPagina.forEach(boton => {
        boton.classList.remove("activo");

        if(Number(boton.dataset.pagina) === paginaActual){
            boton.classList.add("activo");
        }
    });
}
async function CargarTrabajos(){
    const trabajos = await ObtenerTrabajos();

    MostrarTrabajos(trabajos);
}

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
btnAgregarServicio.addEventListener("click", () =>{
    const idServicio = selectServicios.value;

    if(idServicio === ""){
        return;
    }
    serviciosSeleccionados.push(idServicio);

    
    mostrarServiciosSeleccionados();

    VerificarCambiosTrabajo();
})
function eliminarServicio(idServicio) {
    serviciosSeleccionados.forEach((id, indice) => {
        if(id === idServicio){
            serviciosSeleccionados.splice(indice, 1) // desde la posicion indice, elimina 1 elemento
        }
    });
    mostrarServiciosSeleccionados();
    VerificarCambiosTrabajo();
}
function mostrarServiciosSeleccionados(){
    contenedorServiciosSeleccionados.innerHTML = "";

    if(serviciosSeleccionados.length === 0){
        contenedorServiciosSeleccionados.textContent = "Todavía no hay servicios seleccionados.";
        return;
    }
    let total = 0;

    serviciosSeleccionados.forEach(idServicio => {
        const opcion = selectServicios.querySelector(
            `option[value="${idServicio}"]`
        );
        const nombre = opcion.textContent;
        const precio = Number(opcion.dataset.precio);

        total += precio;

        const servicio = document.createElement("div");

        servicio.classList.add("servicio-seleccionado");

        servicio.innerHTML = `
            <span>${nombre}</span>
            <span>$${precio.toLocaleString("es-AR")}</span>
        `

        const btnEliminar = document.createElement("button");

        btnEliminar.type = "button";
        btnEliminar.textContent = "X";

        btnEliminar.addEventListener("click", () => {
            eliminarServicio(idServicio)
        })

        servicio.appendChild(btnEliminar);

        contenedorServiciosSeleccionados.appendChild(servicio);
    });
    const totalDiv = document.createElement("div");

    totalDiv.classList.add("total-servicios");

    totalDiv.innerHTML = `
        <strong>Total:</strong>
        <span>$${total.toLocaleString("es-AR")}</span>
    `;

    contenedorServiciosSeleccionados.appendChild(totalDiv);
}
formNuevoTrabajo.addEventListener("submit", async function (event) {
    event.preventDefault();

    if(!ValidarTrabajos()){
        return;
    }

        const trabajo ={
            id_cliente: document.getElementById("cliente").value,
            id_vehiculo: document.getElementById("vehiculoCliente").value,
            estado: document.getElementById("estadoModal").value,
            observaciones: document.getElementById("observaciones").value
        };


    if(modoEdicion){
        trabajo.id = trabajoEditando.id;
        await EditarTrabajo(trabajo);

        //Eliminar servicios quitados
        for(const servicio of serviciosOriginales){
            if(!serviciosSeleccionados.includes(String(servicio.id_servicio))){
                await EliminarServicio(servicio.id);
            }
        }

        //Agregar servicios nuevos
        for(const idServicio of serviciosSeleccionados){
            if(!serviciosOriginales.some(servicio => String(servicio.id_servicio) === idServicio)){
                await AgregarServicio(trabajo.id, idServicio);
            }
        }
        alert("Trabajo modificado con éxito");
        
    }else{
        const idTrabajo = await CrearTrabajo(trabajo);

        for(const idServicio of serviciosSeleccionados){
            await AgregarServicio(idTrabajo, idServicio);
        }
        
        //Registrar pago
        for(const pago of ArrayPagos){
            
            const nuevoPago = {
                id_cliente: trabajo.id_cliente,
                id_trabajo: idTrabajo,
                importe: pago.importe,
                metodo_pago: pago.metodo_pago
            };
            await CrearPago(nuevoPago);
        }
        
        
        

        alert("Trabajo cargado con éxito");
    }
    cerrarModal();
    await CargarTrabajos();
})
async function FiltrarTrabajos() {
    paginaActual = 1;

    const texto = buscadorTrabajos.value.trim();
    const estado = document.getElementById("estado").value;
    const fechaDesde = document.getElementById("fechaDesde").value;
    const fechaHasta = document.getElementById("fechaHasta").value;



    const trabajos = await BuscarTrabajo(
        texto,
        estado,
        fechaDesde,
        fechaHasta
    );
    MostrarTrabajos(trabajos);
}
buscadorTrabajos.addEventListener("input", FiltrarTrabajos);
document.getElementById("estado").addEventListener("change", FiltrarTrabajos);
document.getElementById("fechaDesde").addEventListener("change", FiltrarTrabajos);
document.getElementById("fechaHasta").addEventListener("change", FiltrarTrabajos);

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
await CargarTrabajos();
const idEditar = parametros.get("editar");
const idEliminar = parametros.get("eliminar");

if(idEditar){
    const trabajo = await ObtenerPorId(idEditar);
    await abrirModalEditar(trabajo);

    window.history.replaceState({}, document.title, "trabajos.html");
}

if(idEliminar){
    trabajoAEliminar = idEliminar;
    abrirModalEliminar();

    window.history.replaceState({}, document.title, "trabajos.html");
}


