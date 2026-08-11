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
    
    });

