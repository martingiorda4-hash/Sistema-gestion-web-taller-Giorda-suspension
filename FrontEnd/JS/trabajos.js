const fechaDesde = document.getElementById("fechaDesde");
const fechaHasta = document.getElementById("fechaHasta");

const textoDesde = fechaDesde.closest(".campo-fecha").querySelector("span");
const textoHasta = fechaHasta.closest(".campo-fecha").querySelector("span");

const botonNuevoTrabajo = document.getElementById("btnNuevoTrabajo");
const botonCancelar = document.getElementById("btnCancelarTrabajo");
const modalTrabajo = document.getElementById("modalNuevoTrabajo");


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

function abrirModal(){
    modalTrabajo.classList.remove("oculto");
}
function cerrarModal(){
    modalTrabajo.classList.add("oculto")
}

botonNuevoTrabajo.addEventListener("click", abrirModal);
botonCancelar.addEventListener("click", cerrarModal);

if(parametros.get("abrirModal") === "true"){
    modalTrabajo.classList.remove("oculto");
}


botonCancelar.addEventListener("click", () => {

    if(parametros.get("abrirModal") === "true"){
        window.location.href = "dashboard.html";
    }else{
        modalTrabajo.classList.add("oculto");
    }

});





