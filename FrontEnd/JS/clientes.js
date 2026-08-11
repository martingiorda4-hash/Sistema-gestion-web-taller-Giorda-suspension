const botonNuevoCliente = document.getElementById("btnNuevoCliente");
const botonCancelarModalCliente = document.getElementById("btnCancelarCliente");
const modalCliente = document.getElementById("modalNuevoCliente");

const parametros = new URLSearchParams(window.location.search);


function abrirModal(){
    modalCliente.classList.remove("oculto");
}
function cerrarModal(){
    modalCliente.classList.add("oculto");
}

botonNuevoCliente.addEventListener("click", abrirModal);
botonCancelarModalCliente.addEventListener("click", cerrarModal);

if(parametros.get("abrirModal") === "true"){
    modalCliente.classList.remove("oculto");
}

botonCancelarModalCliente.addEventListener("click", () => {
    if(parametros.get("abrirModal") === "true"){
        window.location.href = "dashboard.html";
    }else{
        modalCliente.classList.add("oculto");
    }
});


