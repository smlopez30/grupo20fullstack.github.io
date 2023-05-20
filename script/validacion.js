function validarFormulario() {
    var nombres = document.getElementById("nombres").value;
    var apellidos = document.getElementById("apellidos").value;
    var correo = document.getElementById("correo").value;
    var telefono = document.getElementById("telefono").value;
    var comentario = document.getElementById("comentario").value;

    // Validar nombres
    if (nombres.trim() === "") {
        document.getElementById("error-nombres").innerHTML = "Debe ingresar sus nombres";
        return false;
    } else {
        document.getElementById("error-nombres").innerHTML = "";
    }

    // Validar apellidos
    if (apellidos.trim() === "") {
        document.getElementById("error-apellidos").innerHTML = "Debe ingresar sus apellidos";
        return false;
    } else {
        document.getElementById("error-apellidos").innerHTML = "";
    }

    // Validar correo electrónico
    var correoExpresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.match(correoExpresion)) {
        document.getElementById("error-correo").innerHTML = "Debe ingresar un correo electrónico válido";
        return false;
    } else {
        document.getElementById("error-correo").innerHTML = "";
    }

    // Validar teléfono
    var telefonoExpresion = /^\d{10}$/;
    if (!telefono.match(telefonoExpresion)) {
        document.getElementById("error-telefono").innerHTML = "Debe ingresar un teléfono válido (10 dígitos)";
        return false;
    } else {
        document.getElementById("error-telefono").innerHTML = "";
    }

    // Validar comentario
    if (comentario.trim() === "") {
        document.getElementById("error-comentario").innerHTML = "Debe ingresar un comentario";
        return false;
    } else {
        document.getElementById("error-comentario").innerHTML = "";
    }

    return true;
}
