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

            // Clonar el objeto producto original para comparar los cambios
            const productoOriginal = JSON.parse(JSON.stringify(producto));

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
                    // Verificar si ha habido cambios en los campos del producto
                    if (this.hayCambios(producto, productoOriginal)) {
                        // Mostrar ventana emergente con los datos modificados en formato JSON
                        this.mostrarVentanaEmergente(producto, productoOriginal, esImagen);
                    }

                    this.fetchData(this.url);
                    this.actualizando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.actualizando = false;
                });
        },

        hayCambios(producto, productoOriginal) {
            // Verificar si ha habido cambios en los campos del producto
            // Puedes agregar condiciones adicionales si hay más campos a tener en cuenta
            return (
                producto.nombre !== productoOriginal.nombre ||
                producto.precio !== productoOriginal.precio ||
                producto.stock !== productoOriginal.stock ||
                producto.imagen !== productoOriginal.imagen ||
                producto.categoria !== productoOriginal.categoria ||
                producto.mostrar !== productoOriginal.mostrar
            );
        },

        mostrarVentanaEmergente(producto, productoOriginal, esImagen) {
            const cambios = [];
            if (producto.nombre !== productoOriginal.nombre) {
                cambios.push(`Nombre: ${JSON.stringify(productoOriginal.nombre)} -> ${JSON.stringify(producto.nombre)}`);
            }
            if (producto.precio !== productoOriginal.precio) {
                cambios.push(`Precio: ${JSON.stringify(productoOriginal.precio)} -> ${JSON.stringify(producto.precio)}`);
            }
            if (producto.stock !== productoOriginal.stock) {
                cambios.push(`Stock: ${JSON.stringify(productoOriginal.stock)} -> ${JSON.stringify(producto.stock)}`);
            }
            if (producto.imagen !== productoOriginal.imagen) {
                cambios.push(`Imagen: ${JSON.stringify(productoOriginal.imagen)} -> ${JSON.stringify(producto.imagen)}`);
            }
            if (producto.categoria !== productoOriginal.categoria) {
                cambios.push(`Categoría: ${JSON.stringify(productoOriginal.categoria)} -> ${JSON.stringify(producto.categoria)}`);
            }
            if (producto.mostrar !== productoOriginal.mostrar) {
                cambios.push(`Mostrar: ${JSON.stringify(productoOriginal.mostrar)} -> ${JSON.stringify(producto.mostrar)}`);
            }

            // Mostrar ventana emergente con los cambios en formato JSON
            Swal.fire({
                title: 'Datos modificados',
                html: `<pre>${cambios.join('\n')}</pre>`,
                icon: 'info',
                showConfirmButton: true,
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
