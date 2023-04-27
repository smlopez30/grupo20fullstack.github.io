function showPopup(img) {
  var popup = img.nextElementSibling;
  popup.style.display = "block";
}

function hidePopup(img) {
  var popup = img.nextElementSibling;
  popup.style.display = "none";
}

var popups = document.querySelectorAll(".popup");
for (var i = 0; i < popups.length; i++) {
  popups[i].addEventListener("click", function () {
      this.style.display = "none";
  });
}

// Agregar evento de click o touch a la imagen
document.querySelectorAll(".product-img").forEach(img => {
  img.addEventListener("click", function(event) {
    event.stopPropagation();
    togglePopup(this);
  });
  
  img.addEventListener("touchstart", function(event) {
    // evita el doble click en dispositivos móviles
    if (event.touches.length === 1) {
      togglePopup(this);
    }
  });
});

// funcion para mostrar u ocultar el detalle
function togglePopup(img) {
  // Verificar si el detalle está visible
  if (img.nextElementSibling.style.display === "block") {
    hidePopup(img);
  } else {
    showPopup(img);
  }
}

// Agregar evento de click a otras partes de la pantalla para ocultar el detalle
document.addEventListener("click", function(event) {
  if (!event.target.classList.contains("product-img") && 
      !event.target.classList.contains("popup")) {
    popups.forEach(popup => {
      popup.style.display = "none";
    });
  }
});

// Agregar evento de touchend para ocultar el detalle en dispositivos táctiles
document.addEventListener("touchend", function(event) {
  if (!event.target.classList.contains("product-img") && 
      !event.target.classList.contains("popup")) {
    popups.forEach(popup => {
      popup.style.display = "none";
    });
  }
});