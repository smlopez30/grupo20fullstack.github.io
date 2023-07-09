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
    new Vue({
        el: '#app',
        data() {
            return {
                productos: productos,
                sortOption: 'nombre' // Opción de ordenamiento inicial
            };
        },
        computed: {
            sortedProductos() {
                if (this.sortOption === 'nombre') {
                    return this.productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
                } else if (this.sortOption === 'precio') {
                    return this.productos.sort((a, b) => a.precio - b.precio);
                }
                return this.productos;
            }
        },
        methods: {
            setFilter(categoria) {
                this.filter = categoria;
            }
        },
        mounted() {
            Vue.config.productionTip = false;
        }
    });
}
