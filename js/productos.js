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
            actualizando: false, // Agrega esta propiedad
            eliminarId: null,
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
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error de respuesta del servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    this.productos = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        mostrarConfirmacion(id) {
            this.eliminarId = id; // Almacena el ID del producto a eliminar
            $('#confirmacionModal').modal('show'); // Muestra el modal de confirmación
        },
        cancelarEliminacion() {
            this.eliminarId = null; // Restablece el ID del producto a eliminar
        },
        confirmarEliminacion() {
            const id = this.eliminarId; // Obtiene el ID del producto a eliminar
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    this.fetchData(this.url);
                    alert("El producto se ha eliminado correctamente.");
                    this.eliminarId = null; // Restablece el ID del producto a eliminar
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
                mostrar: Boolean(producto.mostrar)  // Conversión explícita a booleano
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
            const retryInterval = 1000; // Intervalo de reintento en milisegundos (1 segundo)
            const maxRetryCount = 10; // Número máximo de reintentos

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
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
