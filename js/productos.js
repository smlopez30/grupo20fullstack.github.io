const { createApp } = Vue;
createApp({
    data() {
        return {
            productos: [],
            url: 'https://slopez.pythonanywhere.com/productos',
            error: false,
            cargando: true,
            pageSize: 5,
            currentPage: 1,
            nuevoProducto: {
                nombre: '',
                precio: 0,
                stock: 0,
                imagen: ''
            },
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
        fetchData() {
            fetch(this.url)
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
        eliminar(productoId) {
            const url = this.url + '/' + productoId;
            var options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text())
                .then(() => {
                    this.fetchData();
                });
        },
        actualizar(event, producto) {
            const campo = event.target.getAttribute('data-campo');
            const url = this.url + '/' + producto.id;
            var options = {
                body: JSON.stringify({ [campo]: producto[campo] }),
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
        agregarNuevo() {
            if (this.nuevoProducto.nombre && this.nuevoProducto.precio && this.nuevoProducto.stock) {
                var options = {
                    body: JSON.stringify(this.nuevoProducto),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow',
                };
                fetch(this.url, options)
                    .then(() => {
                        alert("El artículo se ha guardado correctamente.");
                        this.nuevoProducto = {
                            nombre: '',
                            precio: 0,
                            stock: 0,
                            imagen: ''
                        };
                        this.fetchData();
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Error al guardar el artículo.");
                    });
            } else {
                alert("Por favor, complete todos los campos obligatorios.");
            }
        },
        changePage(page) {
            this.currentPage = page;
        },
    },
    created() {
        this.fetchData();
    },
}).mount('#app');
