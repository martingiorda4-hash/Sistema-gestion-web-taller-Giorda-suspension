    //IMPORTA FUNCIONES DE ARCHIVO CLIENTEAPI.JS
    import{
        ObtenerClientes,
        CrearCliente,
        ModificarCliente,
        EliminarCliente,
        ObtenerPorId,
        BuscarCliente
    }from "./API/clienteAPI.js";
    
    import { VerificarSesion } from "./API/sesionAPI";

    const sesionActiva = await VerificarSesion();

    if(!sesionActiva){
        window.location.href = "login.html";
    }

    const botonNuevoCliente = document.getElementById("btnNuevoCliente");
    const botonCancelarModalCliente = document.getElementById("btnCancelarCliente");
    const modalCliente = document.getElementById("modalCliente");
    
    const tipo = document.getElementById("tipoCliente");

    const nombre = document.getElementById("nombreCliente");
    const apellido = document.getElementById("apellidoCliente");
    const telefonoParticular = document.getElementById("telefonoParticular");

    const razonSocial = document.getElementById("razonSocialCliente");
    const cuitCliente = document.getElementById("cuitCliente");
    const telefonoEmpresa = document.getElementById("telefonoEmpresa");
    
    const parametros = new URLSearchParams(window.location.search);
    

    const tipoCliente = document.getElementById("tipoCliente");
    const campoParticular = document.getElementById("camposParticular");
    const campoEmpresa = document.getElementById("camposEmpresa");

    //const btnVerClientes = document.getElementById("verCliente");

    const clienteIdInput = document.getElementById("clienteId");
    const tituloModalCliente = document.querySelector(".modal h2");

    const modalEliminarCliente = document.getElementById("modalEliminarCliente");

    const btnCancelar = document.getElementById("btnCancelarEliminar");
    const btnAceptarEliminar = document.getElementById("btnAceptarEliminar");

    const formNuevoCliente = document.getElementById("formCliente");
    const tablaClientes = document.getElementById("tablaClientes");

    const buscarCliente = document.getElementById("inputBuscarCliente");

    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");
    const botonesPagina = document.querySelectorAll(".numero-pagina");

    const infoPagina = document.getElementById("infoPagina");

    let paginaActual = 1;
    const clientesPorPagina = 20;
    let clientesActuales = [];

    //LOGICA ABRIR MODAL PARA CREAR Y EDITAR CLIENTE

    //Validaciones
    function ValidarClientes(){

        if(tipo.value === ""){
            alert("Debe seleccionar el tipo de cliente");
            return false;
        }
        if(tipo.value === "particular"){
            
            if(nombre.value.trim() === ""){
                alert("Debe ingresar un nombre");
                nombre.focus();
                return false;
            }
            if(apellido.value.trim() === ""){
                alert("Debe ingresar un apellido");
                apellido.focus();
                return false;
            }
            if(telefonoParticular.value.trim() === ""){
                alert("Debe ingresar un teléfono");
                telefonoParticular.focus();
                return false;
            }
            const numeroTelefono = telefonoParticular.replace(/\D/g, "");
            if(numeroTelefono.length < 10 || numeroTelefono.length > 11){
                alert("Ingrese un teléfono válido con característica");
                numeroTelefono.focus();
                return false;
            }
        }

        if(tipo.value === "empresa"){
            
            if(razonSocial.value.trim() === ""){
                alert("Debe ingresar una razón social");
                razonSocial.focus();
                return false;
            }
            if(cuitCliente.value.trim() === ""){
                alert("Debe ingresar un CUIT");
                cuitCliente.focus();
                return false;
            }
            if(telefonoEmpresa.value.trim() === ""){
                alert("Debe ingresar un teléfono");
                telefonoEmpresa.focus();
                return false;
            }
            const numeroTelefono = telefonoEmpresa.replace(/\D/g, "");
            if(numeroTelefono.length < 10 || numeroTelefono.length > 11){
                alert("Ingrese un teléfono válido con característica");
                numeroTelefono.focus();
                return false;
            }

        }
        return true;
    }

    let modoEdicion = false;
    let clienteEditando = null;
    function abrirModalCrear(){
        modoEdicion = false;
        clienteEditando = null;

        clienteIdInput.value = "";
        tituloModalCliente.textContent = "Nuevo cliente";
        document.getElementById("formCliente").reset();
        campoParticular.classList.add("oculto");
        campoEmpresa.classList.add("oculto");
        modalCliente.classList.remove("oculto");
    }

    function abrirModalEditar(cliente){

        modoEdicion = true;
        clienteEditando = cliente;

        clienteIdInput.value = cliente.id;
        tituloModalCliente.textContent = "Editar cliente";

        tipoCliente.value = cliente.tipo_cliente;

        tipoCliente.dispatchEvent(new Event("change"));

        if(cliente.tipo_cliente === "empresa"){
            document.getElementById("razonSocialCliente").value = cliente.razon_social;
            document.getElementById("cuitCliente").value = cliente.cuit;
            document.getElementById("telefonoEmpresa").value = cliente.telefono;
        }else{
            document.getElementById("nombreCliente").value = cliente.nombre;
            document.getElementById("apellidoCliente").value = cliente.apellido;
            document.getElementById("telefonoParticular").value = cliente.telefono;
        }
        modalCliente.classList.remove("oculto");
    }

    function cerrarModal(){
        modalCliente.classList.add("oculto");

        if(idEditar){
            window.location.href = `historialClientes.html?id=${idEditar}`;
        }
    }

    //MODAL ELIMINACION DE CLIENTE
    function abrirModalEliminar(){
        modalEliminarCliente.classList.remove("oculto");
    }
    function cerrarModalEliminar(){
        modalEliminarCliente.classList.add("oculto");

        if(idEliminar){
            
            window.location.href = `historialClientes.html?id=${idEliminar}`;
        }
    }

    btnCancelar.addEventListener("click", cerrarModalEliminar);

    
    botonNuevoCliente.addEventListener("click", abrirModalCrear);
    botonCancelarModalCliente.addEventListener("click", cerrarModal);




    if(parametros.get("abrirModal") === "true"){
        abrirModalCrear();
    }

    botonCancelarModalCliente.addEventListener("click", () => {
        if(parametros.get("abrirModal") === "true"){
            window.location.href = "dashboard.html";
        }else{
            modalCliente.classList.add("oculto");
        }
    });

    tipoCliente.addEventListener("change", () =>{

        if(tipoCliente.value === "empresa"){
            campoParticular.classList.add("oculto");
            campoEmpresa.classList.remove("oculto");
        }else{
            campoParticular.classList.remove("oculto");
            campoEmpresa.classList.add("oculto");
        }
    });


//logica para consumir api

function MostrarClientes(clientes){

    clientesActuales = clientes;

    const inicio = (paginaActual - 1) * clientesPorPagina;
    const fin = inicio + clientesPorPagina;

    const clientesPagina = clientes.slice(inicio, fin);

    const desde = inicio + 1;
    const hasta = Math.min(fin, clientes.length);

    infoPagina.textContent = `Mostrando ${desde} a ${hasta} de ${clientes.length} clientes`;


    tablaClientes.innerHTML = "";

    clientesPagina.forEach(cliente => {
        let nombreCliente;

        if(cliente.tipo_cliente === "particular"){
            nombreCliente = `${cliente.nombre} ${cliente.apellido}`;
        }else{
            nombreCliente = cliente.razon_social;
        }
        const claseEstado = obtenerClaseEstados(cliente.estado);
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${nombreCliente}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.cantidad_vehiculos}</td>
            <td>
                <span class="estado ${claseEstado}">
                    ${cliente.estado}
                </span>
            </td>
        `;
        fila.addEventListener("click", async () => {
            window.location.href = `historialClientes.html?id=${cliente.id}`;
        });
        tablaClientes.appendChild(fila);
    });
}
async function CargarClientes() {
    
    const clientes = await ObtenerClientes();
    MostrarClientes(clientes);
}
//BOTONES PAGINACION
btnSiguiente.addEventListener("click", () => {

    const totalPaginas = Math.ceil(clientesActuales.length / clientesPorPagina);

    if(paginaActual < totalPaginas){
        paginaActual++;

        MostrarClientes(clientesActuales);
        ActualizarBotonActivo();
    }
})

btnAnterior.addEventListener("click", () => {
    if(paginaActual > 1){
        paginaActual--;

        MostrarClientes(clientesActuales);
        ActualizarBotonActivo();
    }
})
botonesPagina.forEach(boton => {

    boton.addEventListener("click", () => {
        paginaActual = Number(boton.dataset.pagina);
    
        MostrarClientes(clientesActuales);
    
        botonesPagina.forEach(botones => {
            botones.classList.remove("activo");
        });
        boton.classList.add("activo");
    });
});
function ActualizarBotonActivo(){
    botonesPagina.forEach(boton => {
        boton.classList.remove("activo");

        if(Number(boton.dataset.pagina) === paginaActual){
            boton.classList.add("activo");
        }
    });
}

let clienteAEliminar = null;
tablaClientes.addEventListener("click", async (e)=>{
    if(e.target.classList.contains("fa-trash")){
        clienteAEliminar = e.target.dataset.id;

        
        abrirModalEliminar();
    }

    if(e.target.classList.contains("fa-pen")){
        const id = e.target.dataset.id;

        const cliente = await ObtenerPorId(id);

        abrirModalEditar(cliente);

    }
    if(e.target.classList.contains("fa-eye")){
        const id = e.target.dataset.id;

        window.location.href = `historialClientes.html?id=${id}`;
    }
})

async function EditarCliente(cliente) {
    
    await ModificarCliente(cliente);

}
btnAceptarEliminar.addEventListener("click", async() =>{
    await EliminarCliente(clienteAEliminar);

    alert("El cliente se a dado de baja");
    clienteAEliminar = null;

    cerrarModalEliminar();

    await CargarClientes();
})

formNuevoCliente.addEventListener("submit", async function (event) {
    event.preventDefault();

    if(!ValidarClientes()){
        return;
    }

    const tipoCliente = document.getElementById("tipoCliente").value;

    const cliente ={
        tipo_cliente: tipoCliente
    };

    if(tipoCliente === "particular"){
        cliente.nombre = document.getElementById("nombreCliente").value;
        cliente.apellido = document.getElementById("apellidoCliente").value;
        cliente.telefono = document.getElementById("telefonoParticular").value;
    }else{
        cliente.razon_social = document.getElementById("razonSocialCliente").value;
        cliente.cuit = document.getElementById("cuitCliente").value;
        cliente.telefono = document.getElementById("telefonoEmpresa").value;
    }

    if(modoEdicion){
        cliente.id = clienteEditando.id;
        await EditarCliente(cliente);
        alert("Cliente modificado con éxito");

        
    }else{
        const resultado = await CrearCliente(cliente);

        if(resultado === "El cliente ya existe"){
            alert(resultado);
            return;
        }

        alert("Cliente cargado con éxito");
    }
    cerrarModal();
    await CargarClientes();
})

buscarCliente.addEventListener("input", async () => {
    const texto = buscarCliente.value.trim();


    if(texto === ""){
        await CargarClientes();
        return;
    }

    const clientes  = await BuscarCliente(texto);

    const totalPaginas = Math.ceil(clientes.length / clientesPorPagina);

    if(paginaActual > totalPaginas && totalPaginas > 0){
        paginaActual = totalPaginas;
        ActualizarBotonActivo();
    }

    MostrarClientes(clientes);
})
cuitCliente.addEventListener("input", function(){

    let cuit = cuitCliente.value.replace(/\D/g, "");

    if(cuit.length > 2){
        cuit = cuit.slice(0, 2) + "-" + cuit.slice(2);
    }
    if(cuit.length > 11){
        cuit = cuit.slice(0, 11) + "-" + cuit.slice(11);
    } 
    cuitCliente.value = cuit;
});

function obtenerClaseEstados(estado){
    if(estado === "Activo"){
        return "estado-activo";
    }
    if(estado === "Inactivo"){
        return "estado-inactivo";
    }
}
await CargarClientes();

const idEditar = parametros.get("editar");
const idEliminar = parametros.get("eliminar");

if(idEditar){
    const cliente = await ObtenerPorId(idEditar);
    await abrirModalEditar(cliente);

    window.history.replaceState({}, document.title, "clientes.html");
}
if(idEliminar){
    clienteAEliminar = idEliminar;
    await abrirModalEliminar();

    window.history.replaceState({}, document.title, "clientes.html");
}