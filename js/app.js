function mostrarNotificacion(mensaje) {

    const notificacion =
        document.createElement("div");


    notificacion.className =
        "store-notification";


    notificacion.innerHTML = `

        <i class="bi bi-check-circle"></i>

        ${mensaje}

    `;


    document.body.appendChild(
        notificacion
    );


    setTimeout(() => {

        notificacion.classList.add(
            "show"
        );

    }, 10);


    setTimeout(() => {

        notificacion.classList.remove(
            "show"
        );

        setTimeout(() => {

            notificacion.remove();

        }, 300);

    }, 2500);

}


function agregarFavorito(id) {

    let favoritos =
        JSON.parse(
            localStorage.getItem(
                "favoritos"
            ) || "[]"
        );


    if (favoritos.includes(id)) {

        favoritos =
            favoritos.filter(
                favorito => favorito !== id
            );

        mostrarNotificacion(
            "Eliminado de favoritos"
        );

    } else {

        favoritos.push(id);

        mostrarNotificacion(
            "Añadido a favoritos"
        );

    }


    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const destacados =
            document.getElementById(
                "productosDestacados"
            );


        if (!destacados) return;


        const productosMostrar =
            productos.slice(0, 4);


        destacados.innerHTML =
            productosMostrar.map(
                producto => `

                <div class="col-sm-6 col-lg-3">

                    <div class="product-card h-100">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            class="product-image">

                        <div class="p-3">

                            <h3 class="h5">
                                ${producto.nombre}
                            </h3>

                            <p>
                                ${formatoPrecio(
                                    producto.precio
                                )}
                            </p>

                            <button
                                class="btn btn-dark w-100"
                                onclick="agregarCarrito(${producto.id})">

                                Añadir al carrito

                            </button>

                        </div>

                    </div>

                </div>

            `
            ).join("");

    }
);
