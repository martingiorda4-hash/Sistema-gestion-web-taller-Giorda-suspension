const botonNuevoPago = document.getElementById("btnNuevoPago");
const botonCancelar = document.getElementById("btnCancelarPago");
const ModalPago = document.getElementById("modalPagoNuevo");

const formNuevoPago = document.getElementById("formPagoNuevo");
const tablaPagos = document.getElementById("tablaPagos");


function abrirModalPago(){
    ModalPago.classList.remove("oculto");
}
function cerrarModalPago(){
    ModalPago.classList.add("oculto")
}

botonNuevoPago.addEventListener("click", abrirModalPago);
botonCancelar.addEventListener("click", cerrarModalPago);


function ValidarPagos(){
    const cliente = document.getElementById("cliente").value;
    const fecha = document.getElementById("fecha").value;
    const importe = document.getElementById("importe").value;
    const metodoDePago = document.getElementById("metodoDePago").value;

    if(cliente === ""){
        alert("Debe ingresar un cliente");
        return false;
    }
    if(fecha === ""){
        alert("Debe ingresar una fecha");
        return false;
    }
    if(importe === ""){
        alert("Debe ingresar un importe");
        return false;
    }
    if(metodoDePago === ""){

        alert("Debe ingresar un metodo de pago");
        return false;
    }

        return true;
}

formNuevoPago.addEventListener("submit", (e) =>{
    e.preventDefault();

    if(!ValidarPagos()){
        return;
    }
    const cliente = document.getElementById("cliente").value;
    const fecha = document.getElementById("fecha").value;
    const importe = document.getElementById("importe").value;
    const metodoDePago = document.getElementById("metodoDePago").value;

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${cliente}</td>
        <td>${fecha}</td>
        <td>1000</td>
        <td></td>
        <td>efectivo</td>
        <td></td>
    `;
    tablaPagos.appendChild(fila);
    formNuevoPago.reset();

    cerrarModalPago();
})