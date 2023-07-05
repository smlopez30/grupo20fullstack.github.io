// Cargar los productos al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const url = 'https://slopez.pythonanywhere.com/productos';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            mostrarProductos(data);
        } else {
            throw new Error('Error al cargar los productos.');
        }
    } catch (error) {
        console.error(error);
    }
});

// Función para mostrar los productos en el HTML
function mostrarProductos(productos) {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        const categoria = item.getAttribute('data-filter');
        const categoriaProductos = productos.filter(producto => producto.categoria === categoria && producto.mostrar);
        const gridItemContainer = item.querySelector('.grid-container');
        gridItemContainer.innerHTML = '';
        categoriaProductos.forEach(producto => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = 'Producto';
            const nombre = document.createElement('h3');
            nombre.textContent = producto.nombre;
            const precio = document.createElement('p');
            precio.textContent = producto.precio;

            gridItem.appendChild(img);
            gridItem.appendChild(nombre);
            gridItem.appendChild(precio);
            gridItemContainer.appendChild(gridItem);
        });
    });
}
