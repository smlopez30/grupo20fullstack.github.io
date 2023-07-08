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
                precio: '',
                stock: '',
                imagen: '',
                categoria: '',
                mostrar: false
            },
            actualizando: false,
            eliminarId: null,
            retryCount: 0,
            maxRetryCount: 10,
            retryInterval: 1000,
            filtro: '',
            filtroActivo: false
        };
    },
    computed: {
        totalItems() {
            const productosFiltrados = this.productos.filter(producto =>
                producto.nombre.toLowerCase().includes(this.filtro.toLowerCase())
            );
            return productosFiltrados.length;
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.pageSize);
        },
        paginatedProductos() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            const productosFiltrados = this.productos.filter(producto =>
                producto.nombre.toLowerCase().includes(this.filtro.toLowerCase())
            );

            return productosFiltrados.slice(startIndex, endIndex);
        },
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error de respuesta del servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    this.productos = data;
                    this.cargando = false;

                    // Verifica si hay un filtro de búsqueda activo
                    this.filtroActivo = this.filtro.trim().length > 0;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        mostrarConfirmacion(id) {
            this.eliminarId = id;
            $('#confirmacionModal').modal('show');
        },
        cancelarEliminacion() {
            this.eliminarId = null;
        },
        confirmarEliminacion() {
            const id = this.eliminarId;
            const url = this.url + '/' + id;
            const options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    this.fetchData(this.url);
                    alert("El producto se ha eliminado correctamente.");
                    this.eliminarId = null;
                });
        },
        actualizarProducto(producto) {
            this.actualizando = true;
            const url = this.url + '/' + producto.id;
            const data = {
                nombre: producto.nombre,
                precio: producto.precio,
                stock: producto.stock,
                imagen: producto.imagen,
                categoria: producto.categoria,
                mostrar: Boolean(producto.mostrar)
            };
            const options = {
                body: JSON.stringify(data),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
            };

            fetch(url, options)
                .then(() => {
                    this.fetchData(this.url);
                    this.actualizando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.actualizando = false;
                });
        },
        agregarNuevo() {
            if (this.nuevoProducto.categoria === undefined) {
                this.nuevoProducto.categoria = ""
            };
            if (this.nuevoProducto.nombre && this.nuevoProducto.precio && this.nuevoProducto.stock) {
                const options = {
                    body: JSON.stringify({
                        ...this.nuevoProducto, // Copia todas las propiedades de nuevoProducto
                        mostrar: Boolean(this.nuevoProducto.mostrar) // Utiliza el valor actualizado de mostrar
                    }),
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
                            imagen: '',
                            categoria: '',
                            mostrar: false
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
        retryFetchData() {
            const retryInterval = 1000;
            const maxRetryCount = 10;

            let retryCount = 0;

            const retryTimer = setInterval(() => {
                retryCount++;

                if (retryCount > maxRetryCount) {
                    clearInterval(retryTimer);
                    console.error("Error: No se pudo cargar los datos del backend después de varios intentos.");
                    return;
                }

                this.fetchData(this.url);

                if (!this.cargando) {
                    clearInterval(retryTimer);
                }
            }, retryInterval);
        },
        limpiarFiltro() {
            this.filtro = ''; // Restablece el filtro de búsqueda
            this.filtroActivo = false; // Marca el filtro como inactivo
            this.fetchData(this.url); // Vuelve a cargar todos los productos
        },
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
