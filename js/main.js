
document.addEventListener("DOMContentLoaded", function () {
    var header = document.getElementById("header");
    header.innerHTML = `
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="producto.html">Proyecto Final</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="index.html">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="productos.html">Productos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="quienesSomos.html">Quienes Somos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contacto.html">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
});

// Agrega el enlace a la hoja de estilos CSS
var linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = "../css/crud.css";
document.head.appendChild(linkElement);

// Agrega el enlace al archivo de íconos de Font Awesome
var scriptElement = document.createElement("script");
scriptElement.src = "https://kit.fontawesome.com/3ac8045f2b.js";
scriptElement.crossOrigin = "anonymous";
document.head.appendChild(scriptElement);

// Agrega el enlace a la hoja de estilos de Bootstrap
var bootstrapLinkElement = document.createElement("link");
bootstrapLinkElement.rel = "stylesheet";
bootstrapLinkElement.href =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css";
bootstrapLinkElement.integrity =
    "sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT";
bootstrapLinkElement.crossOrigin = "anonymous";
document.head.appendChild(bootstrapLinkElement);
