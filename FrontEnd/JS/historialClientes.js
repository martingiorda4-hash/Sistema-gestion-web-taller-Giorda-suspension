const btnVolver = document.getElementById("btnVolver");

const abrirModalNuevoVehiculo = document.getElementById("modalNuevoVehiculo");
const modalNuevoVehiculo = document.getElementById("btnAgregarVehiculo");
const btnCancelar = document.getElementById("btnCancelar");

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