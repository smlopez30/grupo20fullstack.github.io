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
  
