// ===============================
// PRODUCTOS BASE
// ===============================

const productosBase = [

    {
        id: 1,
        nombre: "Camisa Clásica",
        categoria: "hombre",
        precio: 89900,
        imagen: "img/producto1.jpg",
        descripcion: "Camisa clásica de excelente calidad."
    },

    {
        id: 2,
        nombre: "Vestido Elegante",
        categoria: "mujer",
        precio: 129900,
        imagen: "img/producto2.jpg",
        descripcion: "Vestido elegante para ocasiones especiales."
    },

    {
        id: 3,
        nombre: "Chaqueta Urbana",
        categoria: "hombre",
        precio: 159900,
        imagen: "img/producto3.jpg",
        descripcion: "Chaqueta moderna para uso diario."
    },

    {
        id: 4,
        nombre: "Bolso Fashion",
        categoria: "accesorios",
        precio: 59900,
        imagen: "img/producto4.jpg",
        descripcion: "Bolso moderno y elegante."
    },

    {
        id: 5,
        nombre: "Camiseta Básica",
        categoria: "hombre",
        precio: 49900,
        imagen: "img/producto1.jpg",
        descripcion: "Camiseta cómoda para cualquier ocasión."
    },

    {
        id: 6,
        nombre: "Blusa Moderna",
        categoria: "mujer",
        precio: 74900,
        imagen: "img/producto2.jpg",
        descripcion: "Blusa moderna y ligera."
    },

    {
        id: 7,
        nombre: "Reloj Elegante",
        categoria: "accesorios",
        precio: 99900,
        imagen: "img/producto4.jpg",
        descripcion: "Reloj elegante para complementar tu estilo."
    },

    {
        id: 8,
        nombre: "Pantalón Casual",
        categoria: "hombre",
        precio: 109900,
        imagen: "img/producto3.jpg",
        descripcion: "Pantalón casual de excelente comodidad."
    }

];


// ===============================
// OBTENER PRODUCTOS
// ===============================

function obtenerProductos() {

    const productosGuardados =
        JSON.parse(localStorage.getItem("productosFS"));

    if (productosGuardados) {
        return productosGuardados;
    }

    localStorage.setItem(
        "productosFS",
        JSON.stringify(productosBase)
    );

    return productosBase;
}


const productos = obtenerProductos();


// ===============================
// NOMBRES DE CATEGORÍAS
// ===============================

const nombresCategoria = {

    hombre: "Hombres",

    mujer: "Mujeres",

    accesorios: "Accesorios"

};


// ===============================
// FORMATO DE PRECIO
// ===============================

function formatoPrecio(precio) {

    return new Intl.NumberFormat("es-CO", {

        style: "currency",

        currency: "COP",

        maximumFractionDigits: 0

    }).format(precio);

}


// ===============================
// CREAR PRODUCTO
// ===============================

function crearProductoHTML(producto) {

    return `

        <div class="col-sm-6 col-lg-3">

            <div class="product-card h-100">

                <div class="product-image-container">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        class="product-image"
                    >


                    <button
                        class="favorite-btn"
                        onclick="agregarFavorito(${producto.id})"
                        type="button"
                        aria-label="Agregar a favoritos"
                    >

                        <i class="bi bi-heart"></i>

                    </button>

                </div>


                <div class="p-3">


                    <small class="text-muted">

                        ${nombresCategoria[producto.categoria]
                            || producto.categoria}

                    </small>


                    <h3 class="h5 mt-2">

                        ${producto.nombre}

                    </h3>


                    <p class="text-muted">

                        ${producto.descripcion}

                    </p>


                    <div
                        class="d-flex justify-content-between align-items-center"
                    >

                        <strong>

                            ${formatoPrecio(producto.precio)}

                        </strong>


                        <button
                            class="btn btn-dark btn-sm"
                            onclick="agregarCarrito(${producto.id})"
                            type="button"
                            aria-label="Agregar al carrito"
                        >

                            <i class="bi bi-cart-plus"></i>

                        </button>

                    </div>


                    <a
                        href="producto.html?id=${producto.id}"
                        class="btn btn-outline-dark btn-sm w-100 mt-3"
                    >

                        Ver detalles

                    </a>

                </div>

            </div>

        </div>

    `;

}


// ===============================
// MOSTRAR PRODUCTOS
// ===============================

function mostrarProductos(lista) {

    const contenedor =
        document.getElementById("listaProductos");

    if (!contenedor) return;


    if (lista.length === 0) {

        contenedor.innerHTML = `

            <div class="col-12 text-center py-5">

                <i class="bi bi-search fs-1"></i>


                <h3 class="mt-3">

                    No encontramos productos

                </h3>


                <p class="text-muted">

                    Intenta cambiar tu búsqueda.

                </p>

            </div>

        `;

        return;
    }


    contenedor.innerHTML =
        lista.map(crearProductoHTML).join("");

}


// ===============================
// OBTENER CATEGORÍA DE LA PÁGINA
// ===============================

function obtenerCategoriaPagina() {

    return document.body.dataset.categoria || null;

}


// ===============================
// FILTRAR PRODUCTOS
// ===============================

function filtrarProductos() {

    let lista = [...productos];


    // ===========================
    // CATEGORÍA DE LA PÁGINA
    // ===========================

    const categoriaPagina =
        obtenerCategoriaPagina();


    if (categoriaPagina) {

        lista = lista.filter(producto =>

            producto.categoria === categoriaPagina

        );

    }


    // ===========================
    // BUSCADOR
    // ===========================

    const buscador =
        document.getElementById("buscador");


    const texto =
        buscador?.value
            .toLowerCase()
            .trim();


    if (texto) {

        lista = lista.filter(producto =>

            producto.nombre
                .toLowerCase()
                .includes(texto)

        );

    }


    // ===========================
    // FILTRO CATEGORÍA ANTIGUO
    // ===========================

    const categoria =
        document.getElementById("filtroCategoria")
            ?.value;


    if (
        categoria &&
        categoria !== "todos" &&
        !categoriaPagina
    ) {

        lista = lista.filter(producto =>

            producto.categoria === categoria

        );

    }


    // ===========================
    // ORDENAR
    // ===========================

    const ordenar =
        document.getElementById("ordenar")
            ?.value;


    if (ordenar === "menor") {

        lista.sort((a, b) =>

            a.precio - b.precio

        );

    }

    else if (ordenar === "mayor") {

        lista.sort((a, b) =>

            b.precio - a.precio

        );

    }

    else if (ordenar === "nombre") {

        lista.sort((a, b) =>

            a.nombre.localeCompare(b.nombre)

        );

    }


    mostrarProductos(lista);

}


// ===============================
// INICIO
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        const buscador =
            document.getElementById("buscador");


        const categoria =
            document.getElementById("filtroCategoria");


        const ordenar =
            document.getElementById("ordenar");


        // =========================
        // BUSCADOR
        // =========================

        if (buscador) {

            buscador.addEventListener(
                "input",
                filtrarProductos
            );

        }


        // =========================
        // CATEGORÍA
        // =========================

        if (categoria) {

            categoria.addEventListener(
                "change",
                filtrarProductos
            );

        }


        // =========================
        // ORDENAR
        // =========================

        if (ordenar) {

            ordenar.addEventListener(
                "change",
                filtrarProductos
            );

        }


        // =========================
        // MOSTRAR PRODUCTOS
        // =========================

        filtrarProductos();

    }
);