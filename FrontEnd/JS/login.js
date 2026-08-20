const usuario = document.getElementById("usuario");
const contrasenia = document.getElementById("contraseña");
const btnIngresar = document.getElementById("btnIngresar");
const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", function(event){

    event.preventDefault();

    if(usuario.value.trim() === ""){
        alert("Debe ingresar el usuario para acceder!");
        usuario.focus();
        return;
    }
    if(contrasenia.value.trim() === ""){
        alert("Debe ingresar una contraseña para acceder!");
        contrasenia.focus();
        return;
    }
    window.location.href = "dashboard.html";
});
