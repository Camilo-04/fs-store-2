function obtenerCarrito() {

    return JSON.parse(
        localStorage.getItem("carrito") || "[]"
    );

}


function guardarCarrito(carrito) {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


function agregarCarrito(id) {

    const carrito = obtenerCarrito();

    const producto = productos.find(
        producto => producto.id === id
    );

    if (!producto) return;


    const existente =
        carrito.find(item => item.id === id);


    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({

            id: producto.id,

            nombre: producto.nombre,

            precio: producto.precio,

            imagen: producto.imagen,

            cantidad: 1

        });

    }


    guardarCarrito(carrito);

    actualizarContador();

    mostrarNotificacion(
        "Producto añadido al carrito"
    );

}


function eliminarCarrito(id) {

    let carrito = obtenerCarrito();

    carrito = carrito.filter(
        producto => producto.id !== id
    );

    guardarCarrito(carrito);

    actualizarContador();

    mostrarCarrito();

}


function cambiarCantidad(id, cantidad) {

    const carrito = obtenerCarrito();

    const producto =
        carrito.find(item => item.id === id);

    if (!producto) return;


    producto.cantidad = parseInt(cantidad);


    if (producto.cantidad <= 0) {

        eliminarCarrito(id);
        return;

    }


    guardarCarrito(carrito);

    actualizarContador();

    mostrarCarrito();

}


function calcularTotal() {

    const carrito = obtenerCarrito();

    return carrito.reduce(
        (total, producto) =>
            total +
            producto.precio * producto.cantidad,
        0
    );

}


function cantidadProductos() {

    const carrito = obtenerCarrito();

    return carrito.reduce(
        (total, producto) =>
            total + producto.cantidad,
        0
    );

}


function actualizarContador() {

    const contador =
        document.getElementById("contadorCarrito");

    if (!contador) return;

    contador.textContent =
        cantidadProductos();

}


function mostrarCarrito() {

    const contenedor =
        document.getElementById("contenidoCarrito");

    const totalElement =
        document.getElementById("totalCarrito");

    if (!contenedor) return;


    const carrito = obtenerCarrito();


    if (carrito.length === 0) {

        contenedor.innerHTML = `

            <div class="text-center py-5">

                <i class="bi bi-cart-x fs-1"></i>

                <h3 class="mt-3">
                    Tu carrito está vacío
                </h3>

                <p class="text-muted">
                    Agrega algunos productos para continuar.
                </p>

                <a
                    href="productos.html"
                    class="btn btn-dark">

                    Ver productos

                </a>

            </div>

        `;

        if (totalElement) {

            totalElement.textContent = "$0";

        }

        return;

    }


    contenedor.innerHTML =
        carrito.map(producto => `

            <div class="cart-item">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}">

                <div class="cart-info">

                    <h5>
                        ${producto.nombre}
                    </h5>

                    <p>
                        ${formatoPrecio(producto.precio)}
                    </p>

                    <div class="quantity">

                        <button
                            onclick="cambiarCantidad(
                                ${producto.id},
                                ${producto.cantidad - 1}
                            )">
                            -
                        </button>

                        <span>
                            ${producto.cantidad}
                        </span>

                        <button
                            onclick="cambiarCantidad(
                                ${producto.id},
                                ${producto.cantidad + 1}
                            )">
                            +
                        </button>

                    </div>

                </div>

                <div class="text-end">

                    <strong>
                        ${formatoPrecio(
                            producto.precio *
                            producto.cantidad
                        )}
                    </strong>

                    <br>

                    <button
                        class="btn btn-sm btn-outline-danger mt-2"
                        onclick="eliminarCarrito(${producto.id})">

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </div>

        `).join("");


    if (totalElement) {

        totalElement.textContent =
            formatoPrecio(calcularTotal());

    }

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        actualizarContador();

        mostrarCarrito();

    }
);