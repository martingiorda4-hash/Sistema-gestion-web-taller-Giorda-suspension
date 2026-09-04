import { IniciarSesion } from "./API/loginAPI";

const usuario = document.getElementById("usuario");
const contrasenia = document.getElementById("contraseña");
const btnIngresar = document.getElementById("btnIngresar");
const formLogin = document.getElementById("form-login");

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
        
        window.location.href = "dashboard.html";
    }else{
        alert("Usuario o contraseña incorrectos");
    }

});


