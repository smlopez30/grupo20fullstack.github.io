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
  if (!camposCompletos) {
    e.preventDefault();
    const mensajeError = document.getElementById('mensaje-error');
    mensajeError.style.display = 'block';
    mensajeError.innerHTML = 'Completa todos los campos obligatorios.';
  }
});

const camposCompletos = () => {
  return Object.values(campos).every((campo) => campo === true);
};
