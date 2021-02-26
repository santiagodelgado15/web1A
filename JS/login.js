function mensaje(){
    alert('Datos Guardados');
}

function validarSesion(){
    if(validarCorreo()==true && validarPasswordSesion()==true){
        alert("Bienvenido");
        redireccionar();
    }
    else{
        alert("Datos incorrectos")
    }
}

    function redireccionar(){
        location.href="../inicio.html";
    }

    
function validarCorreo(){
    var elemento = document.getElementById("usuario");
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(elemento.value == ''){
        alert("El campo Correo no puede estar vacio ");
        return false;
    }
    if(emailRegex.test(elemento.value)){
        return true;
    }
    
}

function validarPasswordSesion(){
    var elemento = document.getElementById("password");
    if(elemento.value == ""){
        alert("Los campos de Contraseña deben completarse");
        return false;
    }
    if(elemento.value.length!=8){
        alert ("Contraseña inválida");
        return false;
    }
    return true;
}