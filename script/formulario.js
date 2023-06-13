const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
  apellido: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};

const campos = {
  nombre: false,
  apellido: false,
  correo: false,
  telefono: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, 'nombre');
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target, 'apellido');
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, 'correo');
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, 'telefono');
      break;
  }
  const camposCompletos = Object.values(campos).every((campo) => campo === true);
  const botonEnviar = document.querySelector('.formulario__btn');
  const mensajeError = document.getElementById('mensaje-error');

  if (camposCompletos) {
    botonEnviar.removeAttribute('disabled');
    mensajeError.style.display = 'none';
  } else {
    botonEnviar.setAttribute('disabled', true);
    mensajeError.style.display = 'block';
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    campos[campo] = true;
  } else {
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  if (campos.nombre && campos.apellido && campos.correo && campos.telefono) {
    const formData = new FormData(formulario);
    const url = 'https://formspree.io/f/xrgvvpdy'; // Reemplaza con la URL proporcionada por Formspree

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta de Formspree aquí
        console.log(data);
        formulario.reset(); // Limpiar el formulario si la solicitud fue exitosa
        document.getElementById('formulario__mensaje-exito').style.display = 'block'; // Mostrar mensaje de éxito al usuario
      })
      .catch(error => {
        // Manejar el error en caso de que ocurra
        console.error('Error:', error);
        document.getElementById('mensaje-error').innerHTML = 'Error en el envío del formulario. Por favor, inténtalo nuevamente.'; // Mostrar mensaje de error al usuario
        document.getElementById('mensaje-error').style.display = 'block';
      });
  } else {
    document.getElementById('formulario__mensaje').style.display = 'block'; // Mostrar mensaje de error al usuario si los campos no son válidos
  }
});

