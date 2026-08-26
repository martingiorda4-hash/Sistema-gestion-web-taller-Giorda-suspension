import { ObtenerPorId } from "./API/clienteAPI.js";

const btnVolver = document.getElementById("btnVolver");
//const clienteNombre = document.getElementById("cliente");

const abrirModalNuevoVehiculo = document.getElementById("modalNuevoVehiculo");
const modalNuevoVehiculo = document.getElementById("btnAgregarVehiculo");
const btnCancelar = document.getElementById("btnCancelar");

const vehiculoPatente = document.getElementById("patenteVehiculoNuevo");
const vehiculoMarca = document.getElementById("marcaVehiculoNuevo");
const vehiculoModelo = document.getElementById("modeloVehiculoNuevo");
const vehiculoAnio = document.getElementById("anioVehiculoNuevo");
const formNuevoVehiculo = document.getElementById("formNuevoVehiculo");

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
    document.getElementById("clente").textContent = cliente.razon_social;
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
    abrirModalNuevoVehiculo.classList.remove("oculto");
}
function cerrarModalVehiculo(){
    abrirModalNuevoVehiculo.classList.add("oculto");
}
modalNuevoVehiculo.addEventListener("click", abrirModalVehiculo);
btnCancelar.addEventListener("click", cerrarModalVehiculo);

formNuevoVehiculo.addEventListener("submit", function(event){

    event.preventDefault();

    if(vehiculoPatente.value.trim() === ""){
        alert("Debe ingresar la patente");
        vehiculoPatente.focus();
        return;
    }
    if(vehiculoMarca.value.trim() === ""){
        alert("Debe ingresar la marca");
        vehiculoMarca.focus();
        return;
    }
    if(vehiculoModelo.value.trim() === ""){
        alert("Debe ingresar el modelo");
        vehiculoModelo.focus();
        return;
    }
    if(vehiculoAnio.value.trim() === ""){
        alert("Debe ingresar el año");
        vehiculoAnio.focus();
        return;
    }

})


