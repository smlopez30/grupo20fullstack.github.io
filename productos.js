// Mostrar el detalle
function showPopup(img) {
  var popup = img.nextElementSibling;
  popup.style.display = "block";
  // Mostrar el popup durante 10 segundos
  setTimeout(function() {
    popup.style.display = "none";
  }, 10000);
}

// Ocultar el detalle
function hidePopup(img) {
  var popup = img.nextElementSibling;
  popup.style.display = "none";
}

// Agregar evento de click o touch a la imagen
document.querySelectorAll(".product-img").forEach(img => {
  // variable para verificar si el detalle está abierto
  var isOpen = false;
  
  img.addEventListener("click", function(event) {
    event.stopPropagation();
    
    // Mostrar/ocultar el detalle según el estado actual
    if (isOpen) {
      hidePopup(this);
      isOpen = false;
    } else {
      showPopup(this);
      isOpen = true;
    }
  });
  
  img.addEventListener("touchstart", function(event) {
    // evita el doble click en dispositivos móviles
    if (event.touches.length === 1) {
      event.stopPropagation();
      
      // Mostrar/ocultar el detalle según el estado actual
      if (isOpen) {
        hidePopup(this);
        isOpen = false;
      } else {
        showPopup(this);
        isOpen = true;
      }
    }
  });
});

// Agregar evento de click a otras partes de la pantalla para ocultar el detalle
document.addEventListener("click", function(event) {
  if (!event.target.classList.contains("product-img") && 
      !event.target.classList.contains("popup")) {
    document.querySelectorAll(".popup").forEach(popup => {
      popup.style.display = "none";
    });
    isOpen = false;
  }
});

// Agregar evento de touchend para ocultar el detalle en dispositivos táctiles
document.addEventListener("touchend", function(event) {
  if (!event.target.classList.contains("product-img") && 
      !event.target.classList.contains("popup")) {
    document.querySelectorAll(".popup").forEach(popup => {
      popup.style.display = "none";
    });
    isOpen = false;
  }
});
// seleccionar todos los botones de categoría
const categoryButtons = document.querySelectorAll('.category');

// agregar evento click a cada botón
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    // obtener el valor del atributo data-filter del botón
    const filterValue = button.getAttribute('data-filter');

    // seleccionar todos los elementos con la clase 'item'
    const items = document.querySelectorAll('.item');

    // ocultar todos los elementos
    items.forEach(item => item.classList.add('hidden'));

    // mostrar solo los elementos que pertenecen a la categoría seleccionada
    const filteredItems = document.querySelectorAll(`.${filterValue}`);
    filteredItems.forEach(item => item.classList.remove('hidden'));
  });
});
