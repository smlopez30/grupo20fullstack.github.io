const { createApp } = Vue;
createApp({
    data() {
        return {
            productos: [],
            url: 'https://slopez.pythonanywhere.com/productos',
            error: false,
            cargando: true,
            pageSize: 5,
        };
    },
    computed: {
        totalItems() {
            return this.productos.length;
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.pageSize);
        },
        paginatedProductos() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.productos.slice(startIndex, endIndex);
        },
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        eliminar(producto) {
            const url = this.url + '/' + producto.id;
            var options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    this.fetchData(this.url);
                });
        },
        actualizar(producto) {
            const url = this.url + '/' + producto.id;
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
            };
            fetch(url, options)
                .then(() => {
                    alert("El artículo se ha actualizado correctamente.");
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al actualizar el artículo.");
                });
        },
        changePage(page) {
            this.currentPage = page;
        },
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
