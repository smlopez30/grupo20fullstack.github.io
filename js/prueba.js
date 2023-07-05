const { createApp } = Vue;

createApp({
    data() {
        return {
            productos: [],
            productoSeleccionado: null,
            url: 'https://slopez.pythonanywhere.com/productos',
            error: false,
            cargando: true,
            pageSize: 5,
            currentPage: 1,
            nuevoProducto: {
                nombre: '',
                precio: '',
                stock: '',
                imagen: ''
            },
            filtroCategoria: 'all', // Agregar la propiedad para almacenar la categoría seleccionada
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
            const productosFiltrados = this.filtroCategoria === 'all'
                ? this.productos
                : this.productos.filter(producto => producto.categoria === this.filtroCategoria && producto.mostrar);
            return productosFiltrados.slice(startIndex, endIndex);
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
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    alert("El producto se ha eliminado correctamente.");
                    this.fetchData(this.url);
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al eliminar el producto.");
                });
        },
        modificarProducto(producto) {
            this.productoSeleccionado = { ...producto };
        },
        actualizarProducto(producto) {
            if (this.productoSeleccionado) {
                const url = this.url + '/' + this.productoSeleccionado.id;
                const options = {
                    body: JSON.stringify(this.productoSeleccionado),
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow',
                };

                fetch(url, options)
                    .then(() => {
                        alert("El producto se ha actualizado correctamente.");
                        this.productoSeleccionado = null;
                        this.fetchData(this.url);
                        this.currentPage = 1;
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Error al actualizar el producto.");
                    });
            }
        },

        actualizarImagen(producto) {
            const nuevaImagen = producto.imagen;

            const url = this.url + '/' + producto.id;
            const options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
            };

            fetch(url, options)
                .then(() => {
                    alert("La imagen se ha actualizado correctamente.");
                    this.fetchData(this.url); // Actualizar tabla
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al actualizar la imagen.");
                });
        },

        agregarNuevo() {
            if (this.nuevoProducto.nombre && this.nuevoProducto.precio && this.nuevoProducto.stock) {
                const options = {
                    body: JSON.stringify(this.nuevoProducto),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow',
                };

                fetch(this.url, options)
                    .then(() => {
                        alert("El artículo se ha guardado correctamente.");
                        this.fetchData(this.url);
                        this.nuevoProducto = {
                            nombre: '',
                            precio: '',
                            stock: '',
                            imagen: ''
                        };
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
        setFilter(categoria) {
            this.filtroCategoria = categoria;
            this.currentPage = 1;
        },
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
