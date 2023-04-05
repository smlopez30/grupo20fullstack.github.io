function validarFormulario() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let mensaje = document.getElementById("mensaje").value;
    let error = "";
  
    if (nombre == "") {
      error += "El nombre es obligatorio.\n";
    }
  
    if (email == "" || !email.includes("@")) {
      error += "El email es obligatorio y debe tener un formato válido.\n";
    }
  
    if (mensaje == "") {
      error += "El mensaje es obligatorio.\n";
    }
  
    if (error != "") {
      alert(error);
      return false;
    }
  
    return true;
  }
  