import { IniciarSesion } from "./API/loginAPI";
import { VerificarSesion } from "./API/sesionAPI";

const sesionActiva = await VerificarSesion();

if(sesionActiva){
    window.location.replace("dashboard.html");
}

const usuario = document.getElementById("usuario");
const contrasenia = document.getElementById("contraseña");
const formLogin = document.getElementById("form-login");
const btnMostrarContrasenia = document.getElementById("btnMostrarContraseña");

formLogin.addEventListener("submit", async function(event){

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
    const datos = {
        usuario: usuario.value,
        contrasenia: contrasenia.value
    };

    const resultado = await IniciarSesion(datos);   
    if(resultado){
        localStorage.setItem("usuario", resultado.usuario);
        alert(`¡Bienvenido al sistema, ${resultado.usuario}!`);
        window.location.replace("dashboard.html");
    }else{
        alert("Usuario o contraseña incorrectos");
    }

});
btnMostrarContrasenia.addEventListener("click", function(){
    if(contrasenia.type === "password"){
        contrasenia.type = "text";
    }else{
        contrasenia.type = "password";
    }
});


