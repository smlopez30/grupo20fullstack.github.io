function showDetails(productName) {
    var details = document.getElementById(productName + '-details');
    details.style.display = 'block';
}

function hideDetails(productName) {
    var details = document.getElementById(productName + '-details');
    details.style.display = 'none';
}
