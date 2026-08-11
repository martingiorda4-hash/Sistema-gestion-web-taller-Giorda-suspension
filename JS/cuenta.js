const botonNuevoPago = document.getElementById("btnNuevoPago");
const botonCancelar = document.getElementById("btnCancelarPago");
const ModalPago = document.getElementById("modalPagoNuevo");

function abrirModalPago(){
    ModalPago.classList.remove("oculto");
}
function cerrarModalPago(){
    ModalPago.classList.add("oculto")
}

botonCancelar.addEventListener("click", cerrarModalPago);
botonNuevoPago.addEventListener("click", abrirModalPago);