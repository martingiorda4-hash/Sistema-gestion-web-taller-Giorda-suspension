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

const modalDetalleTrabajo = document.getElementById("modalDetalleTrabajo");
const modalDetalle = document.getElementById("verTrabajo");
const btnCerrarModalDetalle = document.getElementById("btnCerrarModalDetalle");

const formNuevoTrabajo = document.getElementById("formTrabajo");
const tablaTrabajos = document.getElementById("tablaTrabajos");

const parametros = new URLSearchParams(window.location.search);

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

function abrirModalCrear(){
    trabajoIdInput.value = "";
    tituloModalTrabajo.textContent = "Nuevo trabajo";
    document.getElementById("formTrabajo").reset();
    modalTrabajo.classList.remove("oculto");
}

function abrirModalEditar(trabajo){
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

modalDetalle.addEventListener("click", abrirModalDetalle);
btnCerrarModalDetalle.addEventListener("click", cerrarModalDetalle);

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


// OBTENER VALORES DEL FORMULARIO Y MOSTRARLOS EN LA TABLA

function ValidarTrabajos(){
    const cliente = document.getElementById("cliente").value;
    const vehiculo = document.getElementById("vehiculoCliente").value;
    const servicio = document.getElementById("servicio").value;
    const estado = document.getElementById("estadoModal").value;
    const fecha = document.getElementById("fecha").value;

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
    if(fecha === ""){
        alert("Debe seleccionar una fecha");
        return false;
    }
    return true;
}

formNuevoTrabajo.addEventListener("submit", (e) =>{
    e.preventDefault();

    if(!ValidarTrabajos()){
        return;
    }
    const cliente = document.getElementById("cliente").value;
    const vehiculo = document.getElementById("vehiculoCliente").value;
    const servicio = document.getElementById("servicio").value;
    const estado = document.getElementById("estadoModal").value;
    const fecha = document.getElementById("fecha").value;
    const observaciones = document.getElementById("observaciones").value;

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${cliente}</td>
        <td>${vehiculo}</td>
        <td>${servicio}</td>
        <td>${estado}</td>
        <td>${fecha}</td>
    `;
    tablaTrabajos.appendChild(fila);
    formNuevoTrabajo.reset();

})

