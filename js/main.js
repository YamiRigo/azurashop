//PRODUCTOS
const productos = [
    //ABRIGOS
    {
        id: "abrigo-01",
        titulo: "Chaquera Overcoat",
        imagen: "./img/abrigos/01.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-02",
        titulo: "Campera Puffer",
        imagen: "./img/abrigos/02.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 2000
    },
    {
        id: "abrigo-03",
        titulo: "Campera de Jean",
        imagen: "./img/abrigos/03.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 3000
    },
    {
        id: "abrigo-04",
        titulo: "Campera de Cuero",
        imagen: "./img/abrigos/04.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 4000
    },
    {
        id: "abrigo-05",
        titulo: "Tapado",
        imagen: "./img/abrigos/05.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 5000
    },

    //REMERAS
    {
        id: "remera-01",
        titulo: "Remera 'Mariposa'",
        imagen: "./img/remeras/01.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 1000
    },
    {
        id: "remera-02",
        titulo: "Remera 'Heart'",
        imagen: "./img/remeras/02.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 2000
    },
    {
        id: "remera-03",
        titulo: "Remera Vintage",
        imagen: "./img/remeras/03.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 3000
    },
    {
        id: "remera-04",
        titulo: "Remera 'Yourself'",
        imagen: "./img/remeras/04.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 1000
    },
    {
        id: "remera-05",
        titulo: "Remera sin mangas",
        imagen: "./img/remeras/05.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 2000
    },
    {
        id: "remera-06",
        titulo: "Remera 'Love'",
        imagen: "./img/remeras/06.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 3000
    },
    {
        id: "remera-07",
        titulo: "Remera Anime",
        imagen: "./img/remeras/07.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 2000
    },
    {
        id: "remera-08",
        titulo: "Remera Tie Dye",
        imagen: "./img/remeras/08.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 3000
    },

    //PANTALONES
    {
        id: "pantalon-01",
        titulo: "Pantalon de Bengalina",
        imagen: "./img/pantalones/01.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-02",
        titulo: "Pantalon de Gabardina",
        imagen: "./img/pantalones/02.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 2000
    },
    {
        id: "pantalon-03",
        titulo: "Pantalon Pockets",
        imagen: "./img/pantalones/03.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 3000
    },
    {
        id: "pantalon-04",
        titulo: "Jean Boyfriend",
        imagen: "./img/pantalones/04.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 4000
    },
    {
        id: "pantalon-05",
        titulo: "Jean con Roturas",
        imagen: "./img/pantalones/05.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 5000
    }
];

const containerProductos = document.querySelector("#container_productos");
const botonesCategorias = document.querySelectorAll(".boton_categoria");
const tituloPrincipal = document.querySelector("#titulo_principal");
let botonesAgregar = document.querySelectorAll(".producto_agregar");
const numero = document.querySelector("#numero");

function cargarProductos(productosElegidos) {
    containerProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto_imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto_detalles">
                <h3 class="producto_titulo">${producto.titulo}</h3>
                <p class="producto_precio">$${producto.precio}</p>
                <button class="producto_agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        containerProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerHTML = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerHTML = "Todos los productos";
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto_agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos_en_carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumero();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumero();

    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumero() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}