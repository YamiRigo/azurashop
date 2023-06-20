/* Retrieving the value of the "productos_en_carrito" key from the browser's local storage and parsing
it from a JSON string to a JavaScript object. The resulting object is stored in the
`productosEnCarrito` variable. */
let productosEnCarrito = localStorage.getItem("productos_en_carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

/* These lines of code are selecting HTML elements from the DOM using their respective IDs or class
names and storing them in variables. These variables are then used to manipulate the elements and
their properties later in the code. */
const containerCarritoVacio = document.querySelector("#carrito_vacio");
const containerCarritoProductos = document.querySelector("#carrito_productos");
const containerCarritoAcciones = document.querySelector("#carrito_acciones");
const containerCarritoComprado = document.querySelector("#carrito_comprado");
let botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");
const botonVaciar = document.querySelector("#carrito_acciones_vaciar");
const containerTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito_acciones_comprar");

/**
 * This function loads the products in the shopping cart and displays them in the HTML.
 */
function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        containerCarritoVacio.classList.add("disabled");
        containerCarritoProductos.classList.remove("disabled");
        containerCarritoAcciones.classList.remove("disabled");
        containerCarritoComprado.classList.add("disabled");

        containerCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito_producto");
            div.innerHTML = `
                <img class="carrito_producto_imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito_producto_titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito_producto_cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito_producto_precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito_producto_subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito_producto_eliminar" id="${producto.id}">
                    <i class="bi bi-trash-fill"></i>
                </button> 
            `;

            containerCarritoProductos.append(div);
        })

        actualizarBotonesEliminar();
        actualizarTotal();

    }else{
        containerCarritoVacio.classList.remove("disabled");
        containerCarritoProductos.classList.add("disabled");
        containerCarritoAcciones.classList.add("disabled");
        containerCarritoComprado.classList.add("disabled");
    }
}

/* `cargarProductosCarrito();` is a function that loads the products in the shopping cart and displays
them in the HTML. It checks if there are any products in the cart by checking the
`productosEnCarrito` variable, and if there are, it removes the "disabled" class from the HTML
containers that display the cart products and actions, and adds the "disabled" class to the
container that displays the message for an empty cart. It then loops through each product in the
`productosEnCarrito` array and creates an HTML element for each one, displaying the product image,
title, quantity, price, subtotal, and a delete button. Finally, it updates the total price of the
cart and adds event listeners to the delete buttons. */
cargarProductosCarrito();

/**
 * The function updates the event listeners for all "eliminar" buttons in the shopping cart.
 */
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

/**
 * This function removes a product from the shopping cart and updates the cart's contents in local
 * storage.
 * @param e - The parameter "e" is an event object that represents the event that triggered the
 * function. It is usually passed as an argument to event handler functions and contains information
 * about the event, such as the target element, the type of event, and any additional data related to
 * the event.
 */
function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));

}

/**
 * The function vaciarCarrito empties the shopping cart and updates the local storage.
 */
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

/**
 * The function calculates the total price of products in a shopping cart and updates the total
 * displayed on the webpage.
 */
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerHTML = `$${totalCalculado}`;
}

/**
 * The function clears the shopping cart, saves the changes to local storage, and displays a message
 * indicating that the cart has been purchased.
 */
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("producto_en_carrito", JSON.stringify(productosEnCarrito));

    containerCarritoVacio.classList.add("disabled");
    containerCarritoProductos.classList.add("disabled");
    containerCarritoAcciones.classList.add("disabled");
    containerCarritoComprado.classList.remove("disabled");
}