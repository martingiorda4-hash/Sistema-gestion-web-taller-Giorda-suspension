    const botonNuevoCliente = document.getElementById("btnNuevoCliente");
    const botonCancelarModalCliente = document.getElementById("btnCancelarCliente");
    const modalCliente = document.getElementById("modalCliente");


    const parametros = new URLSearchParams(window.location.search);

    const tipoCliente = document.getElementById("tipoCliente");
    const campoParticular = document.getElementById("camposParticular");
    const campoEmpresa = document.getElementById("camposEmpresa");

    const btnVerClientes = document.getElementById("verCliente");

    const clienteIdInput = document.getElementById("clienteId");
    const tituloModalCliente = document.querySelector(".modal h2")

    const modalEliminarCliente = document.getElementById("modalEliminarCliente");
    const eliminarCliente = document.getElementById("eliminarCliente");
    const btnCancelar = document.getElementById("btnCancelarEliminar");


    //LOGICA ABRIR MODAL PARA CREAR Y EDITAR CLIENTE
    function abrirModalCrear(){
        clienteIdInput.value = "";
        tituloModalCliente.textContent = "Nuevo cliente";
        document.getElementById("formCliente").reset();
        campoParticular.classList.add("oculto");
        campoEmpresa.classList.add("oculto");
        modalCliente.classList.remove("oculto");
    }

    function abrirModalEditar(cliente){
        clienteIdInput.value = cliente.id;
        tituloModalCliente.textContent = "Editar cliente";

        tipoCliente.value = cliente.tipo;

        tipoCliente.dispatchEvent(new Event("change"));

        if(cliente.tipo === "empresa"){
            document.getElementById("razonSocialCliente").value = cliente.razonSocial;
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
    eliminarCliente.addEventListener("click", abrirModalEliminar);
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

    btnVerClientes.addEventListener("click", () =>{
        window.location.href = "historialClientes.html"
    });
