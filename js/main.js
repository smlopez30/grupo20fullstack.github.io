window.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    header.innerHTML = `
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <div class="container">
        <!-- Aquí puedes colocar el contenido deseado para el encabezado -->
        <!-- Por ejemplo, puedes agregar el logo y el título -->
        <a class="navbar-brand" href="#">
          <img src="../imagenes/Logo.jpeg" width="50" height="50" alt="Logo">
          Tu Tabaqueria
        </a>

        <!-- Aquí puedes agregar los enlaces de navegación -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="producto.html">Proyecto Final</a>
          </li>
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
    </nav>
  `;
});

