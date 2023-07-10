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
    // Filtrar los productos en los que mostrar es verdadero
    const productosMostrados = productos.filter(producto => producto.mostrar);

    new Vue({
        el: '#app',
        data() {
            return {
                productos: productosMostrados,
                sortOption: 'nombre', // Opción de ordenamiento inicial
                categoriaSeleccionada: null
            };
        },
        computed: {
            sortedProductos() {
                let productosFiltrados = this.productos;
                if (this.categoriaSeleccionada !== null) {
                    productosFiltrados = productosFiltrados.filter(producto => producto.categoria === this.categoriaSeleccionada);
                }
                if (this.sortOption === 'nombre') {
                    return productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
                } else if (this.sortOption === 'precio') {
                    return productosFiltrados.sort((a, b) => a.precio - b.precio);
                }
                return productosFiltrados;
            }
        },
        methods: {
            setFilter(categoria) {
                this.categoriaSeleccionada = categoria;
            }
        },
        mounted() {
            Vue.config.productionTip = false;
        }
    });
}
