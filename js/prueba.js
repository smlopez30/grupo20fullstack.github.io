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
            imagenesDisponibles: []
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
    nuevoProducto: {
        nombre: '',
        precio: '',
        stock: '',
        categoria: '',
        mostrar: false
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
        fetchImagenesDisponibles() {
            fetch('/img')
                .then(response => response.json())
                .then(data => {
                    this.imagenesDisponibles = data;
                })
                .catch(err => {
                    console.error(err);
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
                    this.fetchData(this.url);
                    alert("El producto se ha eliminado correctamente.");
                });
        },
        actualizarProducto(producto) {
            if (producto.imagen.startsWith('http')) {
                // Si la imagen es una URL, guardarla en la carpeta ../img
                const extension = producto.imagen.substring(producto.imagen.lastIndexOf('.'));
                const nombreArchivo = `${producto.id}${extension}`;
                const urlImagen = `../img/${nombreArchivo}`;

                fetch(producto.imagen)
                    .then(response => response.blob())
                    .then(blob => {
                        const file = new File([blob], nombreArchivo, { type: blob.type });
                        const formData = new FormData();
                        formData.append('file', file);

                        fetch(urlImagen, {
                            method: 'POST',
                            body: formData
                        })
                            .then(() => {
                                // Actualizar la imagen en el producto y la base de datos
                                producto.imagen = urlImagen;
                                this.actualizarProductoEnBaseDeDatos(producto);
                            })
                            .catch(err => {
                                console.error(err);
                                alert("Error al cargar la imagen desde la URL.");
                            });
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Error al obtener la imagen desde la URL.");
                    });
            } else {
                // La imagen es una ruta de archivo local o una URL personalizada
                this.actualizarProductoEnBaseDeDatos(producto);
            }
        },
        actualizarProductoEnBaseDeDatos(producto) {
            const url = this.url + '/' + producto.id;
            const data = {
                nombre: producto.nombre,
                precio: producto.precio,
                stock: producto.stock,
                imagen: producto.imagen,
                categoria: producto.categoria,
                mostrar: producto.mostrar
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
                    alert("El producto se ha actualizado correctamente.");
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al actualizar el producto.");
                });
        },
        actualizarNombre(producto) {
            this.actualizarProducto(producto);
        },
        agregarNuevo() {
            if (this.nuevoProducto.nombre && this.nuevoProducto.precio && this.nuevoProducto.stock) {
                const data = {
                    nombre: this.nuevoProducto.nombre,
                    precio: this.nuevoProducto.precio,
                    stock: this.nuevoProducto.stock,
                    imagen: this.nuevoProducto.imagen,
                    categoria: this.nuevoProducto.categoria,
                    mostrar: this.nuevoProducto.mostrar
                };

                fetch(this.url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow',
                })
                    .then(() => {
                        this.fetchData(this.url);
                        alert("El artículo se ha guardado correctamente.");
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
        this.fetchImagenesDisponibles();
    },
}).mount('#app');
