    //IMPORTA FUNCIONES DE ARCHIVO CLIENTEAPI.JS
    import{
        ObtenerClientes,
        CrearCliente,
        ModificarCliente,
        EliminarCliente,
        ObtenerPorId
    }from "./API/clienteAPI.js";
    
    const botonNuevoCliente = document.getElementById("btnNuevoCliente");
    const botonCancelarModalCliente = document.getElementById("btnCancelarCliente");
    const modalCliente = document.getElementById("modalCliente");


    const parametros = new URLSearchParams(window.location.search);

    const tipoCliente = document.getElementById("tipoCliente");
    const campoParticular = document.getElementById("camposParticular");
    const campoEmpresa = document.getElementById("camposEmpresa");

    //const btnVerClientes = document.getElementById("verCliente");

    const clienteIdInput = document.getElementById("clienteId");
    const tituloModalCliente = document.querySelector(".modal h2");

    const modalEliminarCliente = document.getElementById("modalEliminarCliente");

    const btnCancelar = document.getElementById("btnCancelarEliminar");

    const formNuevoCliente = document.getElementById("formCliente");
    const tablaClientes = document.getElementById("tablaClientes");

    

    //LOGICA ABRIR MODAL PARA CREAR Y EDITAR CLIENTE

    //Validaciones
    function ValidarClientes(){
        const tipoCliente = document.getElementById("tipoCliente").value;

        const nombre = document.getElementById("nombreCliente").value;
        const apellido = document.getElementById("apellidoCliente").value;
        const telefonoParticular = document.getElementById("telefonoParticular").value;

        const razonSocial = document.getElementById("razonSocialCliente").value;
        const cuit = document.getElementById("cuitCliente").value;
        const telefonoEmpresa = document.getElementById("telefonoEmpresa").value;

        if(tipoCliente === ""){
            alert("Debe seleccionar el tipo de cliente");
            return false;
        }
        if(tipoCliente === "particular"){
            
            if(nombre === ""){
                alert("Debe ingresar un nombre");
                return false;
            }
            if(apellido === ""){
                alert("Debe ingresar un apellido");
                return false;
            }
            if(telefonoParticular === ""){
                alert("Debe ingresar un teléfono");
                return false;
            }
        }

        if(tipoCliente === "empresa"){
            
            if(razonSocial === ""){
                alert("Debe ingresar una razón social");
                return false;
            }
            if(cuit === ""){
                alert("Debe ingresar un CUIT");
                return false;
            }
            if(telefonoEmpresa === ""){
                alert("Debe ingresar un teléfono");
                return false;
            }
        }
        return true;
    }

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
    }

    //MODAL ELIMINACION DE CLIENTE
    function abrirModalEliminar(){
        modalEliminarCliente.classList.remove("oculto");
    }
    function cerrarModalEliminar(){
        modalEliminarCliente.classList.add("oculto");
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

    /*btnVerClientes.addEventListener("click", () =>{
        window.location.href = "historialClientes.html"
    });
    */


//logica para consumir api

async function CargarClientes() {
    
    const clientes = await ObtenerClientes();

    tablaClientes.innerHTML = "";

    clientes.forEach(cliente => {
        let nombreCliente;

        if(cliente.tipo_cliente === "particular"){
            nombreCliente = `${cliente.nombre} ${cliente.apellido}`;
        }else{
            nombreCliente = cliente.razon_social;
        }
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${nombreCliente}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.cantidad_vehiculos}</td>
            <td>${cliente.estado}</td>
            <td>
                <div class="acciones">
                        <i class="fa-solid fa-eye" data-id="${cliente.id}" title="Ver detalle"></i>
                        <i class="fa-solid fa-pen" data-id="${cliente.id}" title="Editar"></i>
                        <i class="fa-solid fa-trash" data-id="${cliente.id}" title="Eliminar"></i>
                </div>
            </td>
        `;
        tablaClientes.appendChild(fila);
    });
}
CargarClientes();

tablaClientes.addEventListener("click", async (e)=>{
    if(e.target.classList.contains("fa-trash")){
        const id = e.target.dataset.id;

        console.log("Eliminar cliente: ", id);

        abrirModalEliminar();
    }

    if(e.target.classList.contains("fa-pen")){
        const id = e.target.dataset.id;

        const cliente = await ObtenerPorId(id);

        abrirModalEditar(cliente);

    }
    if(e.target.classList.contains("fa-eye")){
        const id = e.target.dataset.id;

        console.log("Ver cliente" , id);

        window.location.href = `historialClientes.html?id=${id}`;
    }
})
let modoEdicion = false;
let clienteEditando = null;

async function EditarCliente(cliente) {
    
    await ModificarCliente(cliente);

}

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
        await CrearCliente(cliente);
        alert("Cliente cargado con éxito");
    }
    cerrarModal();
    await CargarClientes();
})