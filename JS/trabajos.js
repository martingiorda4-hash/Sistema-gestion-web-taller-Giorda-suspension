const fechaDesde = document.getElementById("fechaDesde");
const fechaHasta = document.getElementById("fechaHasta");

const textoDesde = fechaDesde.closest(".campo-fecha").querySelector("span");
const textoHasta = fechaHasta.closest(".campo-fecha").querySelector("span");

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