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

const tituloModalTrabajo = document.querySelector(".modal-trabajo .modal h2");
const trabajoIdInput = document.getElementById("trabajoId");

const modalEliminarTrabajo = document.getElementById("modalEliminarTrabajo");
const btnCancelarEliminar = document.getElementById("btnCancelarEliminarTrabajo");
const btnAceptarEliminar = document.getElementById("btnAceptarEliminarTrabajo");

const modalDetalleTrabajo = document.getElementById("modalDetalleTrabajo");
const btnCerrarModalDetalle = document.getElementById("btnCerrarModalDetalle");
const btnCerrarModalNuevo = document.getElementById("btnCerrarModalNuevoTrabajo");
const btnAgregarServicio = document.getElementById("btnAgregarServicio");
const contenedorServiciosSeleccionados = document.getElementById("serviciosSeleccionados");

const formNuevoTrabajo = document.getElementById("formTrabajo");
const tablaTrabajos = document.getElementById("tablaTrabajos");

const parametros = new URLSearchParams(window.location.search);

const selectCliente = document.getElementById("cliente");
const selectVehiculo = document.getElementById("vehiculoCliente");
const selectServicios = document.getElementById("servicio");
const totalServicios = document.getElementById("totalServicios");

const contenedorServiciosDetalle = document.getElementById("serviciosDetalle");

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

let pagoTemporal = null;
let paginaActual = 1;
const trabajosporPagina = 20;
let trabajosActuales = [];

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

    serviciosOriginales = [];
    serviciosSeleccionados = [];

    trabajoIdInput.value = "";
    tituloModalTrabajo.textContent = "Nuevo trabajo";
    document.getElementById("formTrabajo").reset();

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
    
    trabajoIdInput.value = trabajo.id;
    tituloModalTrabajo.textContent = "Editar trabajo";
    
    await cargarClienteSelect();
    
    selectCliente.value = trabajo.id_cliente;
    
    await cargarVehiculosSelect(trabajo.id_cliente);
    

    selectVehiculo.value = trabajo.id_vehiculo;

    await cargarServiciosSelect();

    const servicios = await ObtenerServicioPorTrabajo(trabajo.id);

    serviciosOriginales = [];
    serviciosSeleccionados = [];

    servicios.forEach(servicio => {
        serviciosOriginales.push({
            id: servicio.id,
            id_servicio: servicio.id_servicio
        });
        serviciosSeleccionados.push(String(servicio.id_servicio));
    })
    mostrarServiciosSeleccionados();

    document.getElementById("estadoModal").value = trabajo.estado;
    document.getElementById("observaciones").value = trabajo.observaciones;

    modalTrabajo.classList.remove("oculto");
}

async function cargarClienteSelect() {
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

function abrirModalDetalle(trabajo, servicios){
    CargarDatosDetalle(trabajo, servicios);
    
    modalDetalleTrabajo.classList.remove("oculto");
}
function cerrarModalDetalle(){
    modalDetalleTrabajo.classList.add("oculto");
}


btnCerrarModalDetalle.addEventListener("click", cerrarModalDetalle);
btnCerrarModalNuevo.addEventListener("click", cerrarModal);


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

    pagoTemporal = {
        importe: importe,
        metodo_pago: metodo
    };

    pagoSeleccionado.innerHTML = `
        <div class="pago-registrado">
            <strong>✓ Pago registrado</strong>
            Pago: $${importe} - ${metodo}
        </div>
    `;
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
            <td>${trabajo.marca} ${trabajo.modelo} ${trabajo.patente}</td>
            <td>
                <span class="estado ${claseEstado}">
                    ${trabajo.estado}
                </span>
            </td>
            </td>
            `
            // <td>
            //     <div class="acciones">
            //             <i class="fa-solid fa-eye" data-id="${trabajo.id}" title="Ver detalle"></i>
            //             <i class="fa-solid fa-pen" data-id="${trabajo.id}" title="Editar"></i>  
            //             <i class="fa-solid fa-trash" data-id="${trabajo.id}" title="Eliminar"></i>
            //     </div>
            // </td>
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
function CargarDatosDetalle(trabajo, servicios){
    if(trabajo.tipo_cliente === "particular"){
        
        document.getElementById("clienteDetalle").textContent = trabajo.nombre + " " + trabajo.apellido;
    }else{
        document.getElementById("clienteDetalle").textContent = trabajo.razon_social;
    }
    document.getElementById("vehiculoDetalle").textContent = trabajo.marca + " " + trabajo.modelo + " " + trabajo.patente;
    document.getElementById("fechaDetalle").textContent = trabajo.fecha;
    document.getElementById("estadoDetalle").textContent = trabajo.estado;

    let total = 0;
    contenedorServiciosDetalle.innerHTML = "";
    servicios.forEach(servicio => {
        total += Number(servicio.precio);
        const fila = document.createElement("div");
        fila.classList.add("servicio-detalle");

        const nombre = document.createElement("p");
        const precio = document.createElement("p");

        nombre.textContent = servicio.nombre;
        precio.textContent = "$" + Number(servicio.precio).toLocaleString("es-AR");

        fila.appendChild(nombre);
        fila.appendChild(precio);

        contenedorServiciosDetalle.appendChild(fila);
    })

    const totalTexto = document.createElement("div");
    totalTexto.classList.add("total-detalle");

    const totalPrecio = document.createElement("p");
    totalPrecio.textContent = "Total:";

    const precioTotal = document.createElement("p");
    precioTotal.textContent = "$" + total.toLocaleString("es-AR");   

    totalTexto.appendChild(totalPrecio);
    totalTexto.appendChild(precioTotal);

    contenedorServiciosDetalle.appendChild(totalTexto);

    document.getElementById("observacionesDetalle").textContent = trabajo.observaciones;
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

        
        const trabajos = await ObtenerPorId(id)
        const servicios = await ObtenerServicioPorTrabajo(id);


        abrirModalDetalle(trabajos, servicios);
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
btnAgregarServicio.addEventListener("click", () =>{
    const idServicio = selectServicios.value;

    if(idServicio === ""){
        return;
    }
    serviciosSeleccionados.push(idServicio);

    
    mostrarServiciosSeleccionados();
})
function eliminarServicio(idServicio) {
    serviciosSeleccionados.forEach((id, indice) => {
        if(id === idServicio){
            serviciosSeleccionados.splice(indice, 1) // desde la posicion indice, elimina 1 elemento
        }
    });
    mostrarServiciosSeleccionados();
}
function mostrarServiciosSeleccionados(){
    contenedorServiciosSeleccionados.innerHTML = "";
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
        if(pagoTemporal !== null){

            const pago = {
                id_cliente: trabajo.id_cliente,
                id_trabajo: idTrabajo,
                importe: pagoTemporal.importe,
                metodo_pago: pagoTemporal.metodo_pago
            };
            await CrearPago(pago);
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

CargarTrabajos();

