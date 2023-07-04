data() {
    return {
        currentPage: 1,
        pageSize: 5, // Número de productos por página
        // Resto de las propiedades existentes
    }
},
computed: {
    paginatedProductos() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = this.currentPage * this.pageSize;
        return this.productos.slice(startIndex, endIndex);
    },
    totalPages() {
        return Math.ceil(this.productos.length / this.pageSize);
    },
},
methods: {
    changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    },
    // Resto de los métodos existentes
}
