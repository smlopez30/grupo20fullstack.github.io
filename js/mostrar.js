function mostrarProductos(productos) {
    // Filtrar los productos en los que mostrar es verdadero
    const productosMostrados = productos.filter(producto => producto.mostrar);

    new Vue({
        el: '#app',
        data() {
            return {
                productos: productosMostrados,
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
