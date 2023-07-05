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
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    const productosFiltrados = productos.filter(producto => producto.mostrar === 1);

    productosFiltrados.forEach(producto => {
        if (producto.categoria) and producto.mostrar === 1 {
            const item = document.createElement('div');
            item.classList.add('item');
            item.setAttribute('data-filter', producto.categoria);

            const column = document.createElement('div');
            column.classList.add('column');

            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;

            const nombre = document.createElement('h3');
            nombre.textContent = producto.nombre;

            const precio = document.createElement('p');
            precio.innerHTML = `<span class="currency">$</span>${producto.precio.toFixed(2)}`;

            column.appendChild(img);
            column.appendChild(nombre);
            column.appendChild(precio);
            item.appendChild(column);
            productGrid.appendChild(item);
        }
    });
}
