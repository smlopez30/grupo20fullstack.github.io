function showPopup(img) {
  var popup = img.nextElementSibling;
  popup.style.display = "block";
}

function hidePopup(img) {
  var popup = img.nextElementSibling;
  popup.style.display = "none";
  img.nextSibling.style.display = "none";
}

var popups = document.querySelectorAll(".popup");
for (var i = 0; i < popups.length; i++) {
  popups[i].addEventListener("click", function () {
      this.style.display = "none";
  });
}

// Agregar evento de click adicional a la imagen
document.querySelectorAll(".product-img").forEach(img => {
  img.addEventListener("click", function() {
    // Verificar si el detalle está visible
    if (this.nextSibling.style.display === "block") {
      hidePopup(this);
    } else {
      showPopup(this);
    }
  });
});
  
