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
                    if (this.hayCambios(producto)) {
                        // Mostrar notificación de actualización exitosa
                        this.mostrarNotificacion(esImagen ? "La imagen se ha actualizado correctamente." : "El producto se ha actualizado correctamente.");
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

        hayCambios(producto) {
            // Verificar si ha habido cambios en los campos del producto
            // Puedes agregar condiciones adicionales si hay más campos a tener en cuenta
            return producto.nombre !== this.nombreInicial ||
                producto.precio !== this.precioInicial ||
                producto.stock !== this.stockInicial ||
                producto.imagen !== this.imagenInicial ||
                producto.categoria !== this.categoriaInicial ||
                producto.mostrar !== this.mostrarInicial;
        },

        mostrarNotificacion(mensaje) {
            // Mostrar la alerta emergente utilizando SweetAlert2
            Swal.fire({
                title: 'Notificación',
                text: mensaje,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000  // Ocultar después de 3 segundos
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
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
