// Mostrar el detalle
function showPopup(img) {
  var popup = img.nextElementSibling;
  popup.style.display = "block";
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
    
    // Si el detalle está abierto, cerrarlo
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
      
      // Si el detalle está abierto, cerrarlo
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
  }
});

// Agregar evento de touchend para ocultar el detalle en dispositivos táctiles
document.addEventListener("touchend", function(event) {
  if (!event.target.classList.contains("product-img") && 
      !event.target.classList.contains("popup")) {
    document.querySelectorAll(".popup").forEach(popup => {
      popup.style.display = "none";
    });
  }
});
