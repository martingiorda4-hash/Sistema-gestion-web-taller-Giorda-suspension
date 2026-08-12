fetch("sidebar.html")
    .then(Response=>Response.text())
    .then(data=>{
        document.getElementById("sidebar").innerHTML = data
        
        let paginaActual = window.location.pathname.split("/").pop();

        let botones = document.querySelectorAll(".botones");

        botones.forEach(boton =>{
            if(boton.getAttribute("href") === paginaActual){
                boton.classList.add("activo");
            }
        });
    
        
        const btnAceptarCerrarSesion = document.getElementById("btnAceptarCerrarSesion");
        const btnCancelarCerrarSesion = document.getElementById("btnCancelarCerrarSesion");
        const cerrarSesion = document.getElementById("cerrarSesion");
        const modalCerrarSesion = document.getElementById("modalCerrarSesion");
        
        function abrirModal(){
            modalCerrarSesion.classList.remove("oculto");
        }
        function cerrarModal(){
            modalCerrarSesion.classList.add("oculto");
        }
        cerrarSesion.addEventListener("click", abrirModal);
        btnCancelarCerrarSesion.addEventListener("click", cerrarModal);
        
        btnAceptarCerrarSesion.addEventListener("click", () =>{
            window.location.href = "login.html";
        })
        
    });

