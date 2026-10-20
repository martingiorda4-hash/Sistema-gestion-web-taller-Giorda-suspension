import {CrearServicio, ModificarServicio, ObtenerTodosServicios} from "./API/serviciosAPI.js";

const contenedorServicios = document.getElementById("contenedorServicios");

const btnNuevoServicio = document.getElementById("nuevoServicio");
const formServicio = document.getElementById("formNuevoServicio");
const btnCancelar = document.getElementById("cancelarServicio");
const modalServicio = document.getElementById("modalNuevoServicio");
const nombreServicio = document.getElementById("nombreServicio");
const precioServicio = document.getElementById("precioServicio");
const tituloModal = document.getElementById("titulo");
const btnGuardar = document.getElementById("guardarServicio");

let servicioEditando = null;
let servicioOriginal = null;


const iconosServicios = {
    "Alineado y balanceado": "fa-solid fa-car",
    "Tren delantero": "fa-solid fa-gears",
    "Reparación de amortiguadores": "fa-solid fa-wrench",
    "Cambio de pastillas de freno": "fa-solid fa-circle-dot",
    "Suspensión": "fa-solid fa-car-side",
    "Reparación de ejes traseros": "fa-solid fa-screwdriver-wrench"
};

async function CargarServicios() {
    
    const servicios = await ObtenerTodosServicios();

    
    contenedorServicios.innerHTML = "";
    
    servicios.forEach(servicio => {
        
        const card = document.createElement("div");
        card.classList.add("servicio-card");
        const icono = iconosServicios[servicio.nombre] || "fa-solid fa-wrench";

        card.innerHTML = `
            <div class="icono-servicio">
                <i class="${icono}"></i>
            </div>

            <h2>${servicio.nombre}</h2>

            <p>$${Number(servicio.precio_base).toLocaleString("es-AR")}</p>
        `;
        const btnModificar = document.createElement("button");
        btnModificar.type = "button";
        btnModificar.innerHTML = `
            <i class="fa-solid fa-pen"></i>
            Modificar
        `;

        btnModificar.addEventListener("click", function(){
            abrirModalModificar(servicio);
        });
        card.appendChild(btnModificar);

        contenedorServicios.appendChild(card);
    });
}
function abrirModalServicio(){
    servicioEditando = null;
    servicioOriginal = null;

    formServicio.reset();

    btnGuardar.disabled = false;    
    modalServicio.classList.remove("oculto");
}
function cerrarModalServicio(){
    formServicio.reset();
    servicioEditando = null;
    modalServicio.classList.add("oculto");
}
btnNuevoServicio.addEventListener("click", abrirModalServicio);
btnCancelar.addEventListener("click", cerrarModalServicio);

formServicio.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    if(!ValidarCampos()) return;

    const servicio = {
        nombre: nombreServicio.value,
        precio_base: precioServicio.value
    };

    if(servicioEditando){
        servicio.id = servicioEditando.id;

        await ModificarServicio(servicio);
        alert("Servicio modificado correctamente");
    }else{
        await CrearServicio(servicio);
        alert("Servicio creado correctamente");
    }



    formServicio.reset();
    modalServicio.classList.add("oculto");

    servicioEditando = null;

    await CargarServicios();
})
function abrirModalModificar(servicio){

    servicioEditando = servicio;

    servicioOriginal = {
        nombre: servicio.nombre,
        precio_base: servicio.precio_base
    };
    
    nombreServicio.value = servicio.nombre;
    precioServicio.value = servicio.precio_base;

    tituloModal.textContent = "Modificar servicio";
    btnGuardar.disabled = true; 

    modalServicio.classList.remove("oculto");
}
function VerificarCambios(){
    if(!servicioEditando){
        return;
    }

    const nombreCambio = nombreServicio.value.trim() !== servicioOriginal.nombre;

    const precioCambio = precioServicio.value !== String(servicioOriginal.precio_base);
    
    btnGuardar.disabled = !(nombreCambio || precioCambio);
}
nombreServicio.addEventListener("input", VerificarCambios);
precioServicio.addEventListener("input", VerificarCambios);
function ValidarCampos(){

    if(nombreServicio.value.trim() === ""){
        alert("Debe ingresar el nombre del servicio");
        nombreServicio.focus();
        return false;
    }
    if(precioServicio.value === ""){
        alert("Debe ingresar el precio del servicio");
        precioServicio.focus();
        return false;
    }
    return true;
}
CargarServicios();