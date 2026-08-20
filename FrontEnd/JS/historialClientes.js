const btnVolver = document.getElementById("btnVolver");

const abrirModalNuevoVehiculo = document.getElementById("modalNuevoVehiculo");
const modalNuevoVehiculo = document.getElementById("btnAgregarVehiculo");
const btnCancelar = document.getElementById("btnCancelar");

const vehiculoPatente = document.getElementById("patenteVehiculoNuevo");
const vehiculoMarca = document.getElementById("marcaVehiculoNuevo");
const vehiculoModelo = document.getElementById("modeloVehiculoNuevo");
const vehiculoAnio = document.getElementById("anioVehiculoNuevo");
const formNuevoVehiculo = document.getElementById("formNuevoVehiculo");

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
