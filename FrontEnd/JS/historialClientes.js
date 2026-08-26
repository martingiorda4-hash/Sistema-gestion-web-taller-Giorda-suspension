import { ObtenerPorId } from "./API/clienteAPI.js";
import {
    ObtenerVehiculoPorCliente,
    CrearVehiculo,
    ModificarVehiculo,
    ObtenerVehiculoId,
    EliminarVehiculo
} from "./API/vehiculoAPI.js";

const btnVolver = document.getElementById("btnVolver");
//const clienteNombre = document.getElementById("cliente");

const abrirModalNuevoVehiculo = document.getElementById("modalNuevoVehiculo");
const modalNuevoVehiculo = document.getElementById("btnAgregarVehiculo");
const btnCancelar = document.getElementById("btnCancelar");

const modalEliminar = document.getElementById("modalEliminarVehiculo");
const btnCancelarEliminar = document.getElementById("btnCancelarEliminarVehiculo");
const btnConfirmarEliminar = document.getElementById("btnAceptarEliminarVehiculo");

const vehiculoPatente = document.getElementById("patenteVehiculoNuevo");
const vehiculoMarca = document.getElementById("marcaVehiculoNuevo");
const vehiculoModelo = document.getElementById("modeloVehiculoNuevo");
const vehiculoAnio = document.getElementById("anioVehiculoNuevo");
const formNuevoVehiculo = document.getElementById("formNuevoVehiculo");
const tablaVehiculos = document.getElementById("tablaVehiculos");
const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

const cliente = await ObtenerPorId(id);

const campoNombre = document.getElementById("campoNombre");
const campoApellido = document.getElementById("campoApellido");
const campoCuit = document.getElementById("campoCuit");
const campoRazonSocial = document.getElementById("campoRazonSocial");

if(cliente.tipo_cliente === "particular"){
    document.getElementById("cliente").textContent = cliente.nombre + " " + cliente.apellido;

    campoNombre.classList.remove("oculto");
    campoApellido.classList.remove("oculto");

    campoCuit.classList.add("oculto");
    campoRazonSocial.classList.add("oculto");
}else{
    document.getElementById("cliente").textContent = cliente.razon_social;
    campoCuit.classList.remove("oculto");
    campoRazonSocial.classList.remove("oculto");

    campoNombre.classList.add("oculto");
    campoApellido.classList.add("oculto");

}

document.getElementById("tipoCliente").textContent = cliente.tipo_cliente;
document.getElementById("nombreCliente").textContent = cliente.nombre;
document.getElementById("apellidoCliente").textContent = cliente.apellido;
document.getElementById("telefonoCliente").textContent = cliente.telefono;
document.getElementById("cuitCliente").textContent = cliente.cuit;
document.getElementById("razonSocialCliente").textContent = cliente.razon_social;


btnVolver.addEventListener("click", () =>{
    window.location.href = "clientes.html"
});

function abrirModalVehiculo(){
    modoEdicion = false;
    vehiculoEditando = null;
    formNuevoVehiculo.reset();

    abrirModalNuevoVehiculo.classList.remove("oculto");
}
function cerrarModalVehiculo(){
    abrirModalNuevoVehiculo.classList.add("oculto");
}
modalNuevoVehiculo.addEventListener("click", abrirModalVehiculo);
btnCancelar.addEventListener("click", cerrarModalVehiculo);

function abrirModalEliminar(){
    modalEliminar.classList.remove("oculto");
}
function cerrarModalEliminar(){
    modalEliminar.classList.add("oculto");
}

btnCancelarEliminar.addEventListener("click", cerrarModalEliminar);

function ValidarInputVehiculo(){
    if(vehiculoPatente.value.trim() === ""){
        alert("Debe ingresar la patente");
        vehiculoPatente.focus();
        return false;
    }
    if(vehiculoMarca.value.trim() === ""){
        alert("Debe ingresar la marca");
        vehiculoMarca.focus();
        return false;
    }
    if(vehiculoModelo.value.trim() === ""){
        alert("Debe ingresar el modelo");
        vehiculoModelo.focus();
        return false;
    }
    if(vehiculoAnio.value.trim() === ""){
        alert("Debe ingresar el año");
        vehiculoAnio.focus();
        return false;
    }
    return true;
}

function abrirModalEditarVehiculo(vehiculo){
    modoEdicion = true;
    vehiculoEditando = vehiculo;

    vehiculoPatente.value = vehiculo.patente;
    vehiculoMarca.value = vehiculo.marca;
    vehiculoModelo.value = vehiculo.modelo;
    vehiculoAnio.value = vehiculo.anio;

    abrirModalNuevoVehiculo.classList.remove("oculto");
}


//CONSUMO DE API DE VEHICULOS Y CARGA EN LA TABLA

async function CargarVehiculos() {
    const clienteId = parametros.get("id");

    const vehiculos = await ObtenerVehiculoPorCliente(clienteId);

    tablaVehiculos.innerHTML = "";

    vehiculos.forEach(vehiculo => {
        
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${vehiculo.patente}</td>
            <td>${vehiculo.marca}</td>
            <td>${vehiculo.modelo}</td>
            <td>${vehiculo.anio}</td>
            <td>
                <div class="acciones">
                    <i class="fa-solid fa-pen" data-id="${vehiculo.id}" title="Editar"></i>
                    <i class="fa-solid fa-trash" data-id="${vehiculo.id}" title="Eliminar"></i>
                </div>
            </td>
            `;

        tablaVehiculos.appendChild(fila);
    });
}
CargarVehiculos();
let vehiculoAEliminar = null;
tablaVehiculos.addEventListener("click", async (e)=>{
    if(e.target.classList.contains("fa-trash")){
        vehiculoAEliminar = e.target.dataset.id;

        abrirModalEliminar();
    }

    if(e.target.classList.contains("fa-pen")){
        const id = e.target.dataset.id;

        const vehiculo = await ObtenerVehiculoId(id);

        abrirModalEditarVehiculo(vehiculo);

    }
})
btnConfirmarEliminar.addEventListener("click", async () => {
        await EliminarVehiculo(vehiculoAEliminar);

        alert("Vehiculo eliminado correctamente");

        cerrarModalEliminar();
        await CargarVehiculos();
})
let modoEdicion = false;
let vehiculoEditando = null;

formNuevoVehiculo.addEventListener("submit", async function (event) {
    event.preventDefault();

    if(!ValidarInputVehiculo()){
        return;
    }

    const vehiculo = {
        patente: vehiculoPatente.value,
        modelo: vehiculoModelo.value,
        marca: vehiculoMarca.value,
        anio: vehiculoAnio.value,
        cliente_id: id
    };

    if(modoEdicion){
        vehiculo.id = vehiculoEditando.id;
        await ModificarVehiculo(vehiculo);
        alert("Vehiculo modificado correctamente");
    }else{
        await CrearVehiculo(vehiculo);
        alert("Vehiculo creado correctamente");
    }
    cerrarModalVehiculo();
    await CargarVehiculos();
})