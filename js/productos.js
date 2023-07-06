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
            showAlert: false,
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
        eliminar(id) {
            const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
            if (confirmacion) {
                const url = this.url + '/' + id;
                var options = {
                    method: 'DELETE',
                };
                fetch(url, options)
                    .then(res => res.text())
                    .then(res => {
                        this.fetchData(this.url);
                        alert("El producto se ha eliminado correctamente.");
                    });
            }
        },


        actualizarProducto(producto, esImagen = false) {
            this.actualizando = true;
            const url = this.url + '/' + producto.id;
            const data = esImagen ? { imagen: producto.imagen } : producto;
            const options = {
                body: JSON.stringify(data),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
            };

            fetch(url, options)
                .then(() => {
                    if (esImagen) {
                        // Mostrar notificación de actualización exitosa de la imagen
                        this.mostrarNotificacion("La imagen se ha actualizado correctamente.");
                    } else {
                        // Mostrar notificación de actualización exitosa del producto
                        this.mostrarNotificacion("El producto se ha actualizado correctamente.");
                    }
                    this.fetchData(this.url);
                    this.actualizando = false;
                })
                .catch(err => {
                    console.error(err);
                    // Mostrar notificación de error al actualizar la imagen o el producto
                    this.mostrarNotificacion("Error al actualizar " + (esImagen ? "la imagen." : "el producto."));
                    this.actualizando = false;
                });
        },

        mostrarNotificacion(mensaje) {
            // Mostrar notificación en la interfaz de usuario
            this.showAlert = true;
            this.notificacionMensaje = mensaje;

            // Ocultar la notificación después de un tiempo determinado (opcional)
            setTimeout(() => {
                this.showAlert = false;
            }, 3000); // Ocultar después de 3 segundos (ajusta el tiempo según tus necesidades)
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
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
