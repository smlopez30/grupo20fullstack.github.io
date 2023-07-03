const { createApp } = Vue;
createApp({
    data() {
        return {
            productos: [],
            url: 'https://slopez.pythonanywhere.com/productos',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
            currentPage: 1,
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
            const url = this.url + '/' + producto;
            var options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    this.fetchData(this.url);
                });
        },
        agregar() {
            if (!this.nombre || this.precio === 0 || this.stock === 0) {
                alert("Por favor, completa todos los campos obligatorios.");
                return;
            }

            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen,
            };
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
            };
            fetch(this.url, options)
                .then(() => {
                    alert("El artículo se ha guardado correctamente.");
                    this.nombre = "";
                    this.precio = 0;
                    this.stock = 0;
                    this.imagen = "";
                    this.fetchData(this.url);
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al guardar el artículo.");
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
