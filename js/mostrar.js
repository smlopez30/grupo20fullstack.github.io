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
    const app = new Vue({
        el: '#app',
        data() {
            return {
                productos: productos,
                filter: 'all'
            };
        },
        methods: {
            setFilter(categoria) {
                this.filter = categoria;
            }
        },
        computed: {
            filteredProductos() {
                if (this.filter === 'all') {
                    return this.productos;
                } else {
                    return this.productos.filter(producto => producto.categoria === this.filter);
                }
            }
        }
    });
}
