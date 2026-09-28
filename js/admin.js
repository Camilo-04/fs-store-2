document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("formProducto");

    const inputImagen =
        document.getElementById("imagen");

    const preview =
        document.getElementById("preview");

    const listaAdmin =
        document.getElementById("listaAdmin");


    // =====================================
    // PRODUCTOS
    // =====================================

    function obtenerProductos() {

        const guardados =
            localStorage.getItem("productosFS");

        if (guardados) {

            return JSON.parse(guardados);

        }

        return [];

    }


    // =====================================
    // VISTA PREVIA
    // =====================================

    inputImagen.addEventListener(
        "change",
        () => {

            const archivo =
                inputImagen.files[0];

            if (!archivo) {

                preview.style.display = "none";

                return;

            }


            const lector =
                new FileReader();


            lector.onload = function(e) {

                preview.src =
                    e.target.result;

                preview.style.display =
                    "block";

            };


            lector.readAsDataURL(archivo);

        }
    );


    // =====================================
    // MOSTRAR PRODUCTOS
    // =====================================

    function mostrarProductosAdmin() {

        const productos =
            obtenerProductos();


        if (productos.length === 0) {

            listaAdmin.innerHTML = `

                <div class="text-center py-4">

                    <i class="bi bi-box fs-1"></i>

                    <p class="mt-3">
                        No hay productos registrados.
                    </p>

                </div>

            `;

            return;

        }


        listaAdmin.innerHTML = `

            <table class="admin-table">

                <thead>

                    <tr>

                        <th>Imagen</th>

                        <th>Producto</th>

                        <th>Categoría</th>

                        <th>Precio</th>

                        <th>Acción</th>

                    </tr>

                </thead>


                <tbody>

                    ${productos.map(producto => `

                        <tr>

                            <td>

                                <img
                                    src="${producto.imagen}"
                                    class="admin-product-image"
                                    alt="${producto.nombre}">

                            </td>


                            <td>

                                <strong>
                                    ${producto.nombre}
                                </strong>

                            </td>


                            <td>

                                ${producto.categoria}

                            </td>


                            <td>

                                ${formatearPrecio(producto.precio)}

                            </td>


                            <td>

                                <button
                                    class="btn btn-danger btn-sm"
                                    onclick="eliminarProducto(${producto.id})">

                                    <i class="bi bi-trash"></i>

                                    Eliminar

                                </button>

                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        `;

    }


    // =====================================
    // AGREGAR PRODUCTO
    // =====================================

    form.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();


            const nombre =
                document.getElementById("nombre")
                .value
                .trim();


            const precio =
                Number(
                    document.getElementById("precio")
                    .value
                );


            const categoria =
                document.getElementById("categoria")
                .value;


            const descripcion =
                document.getElementById("descripcion")
                .value
                .trim();


            const archivo =
                inputImagen.files[0];


            if (!archivo) {

                alert(
                    "Debes seleccionar una imagen."
                );

                return;

            }
function actualizarEstadisticas() {
    const totalProductos =
        document.getElementById("totalProductos");

    if (totalProductos) {
        totalProductos.textContent =
            obtenerProductos().length;
    }
}


            const lector =
                new FileReader();


            lector.onload = function(e) {

                const productos =
                    obtenerProductos();


                const nuevoProducto = {

                    id:
                        Date.now(),

                    nombre:
                        nombre,

                    categoria:
                        categoria,

                    precio:
                        precio,

                    imagen:
                        e.target.result,

                    descripcion:
                        descripcion

                };


                productos.push(
                    nuevoProducto
                );


                localStorage.setItem(
                    "productosFS",
                    JSON.stringify(productos)
                );


                alert(
                    "Producto agregado correctamente."
                );


                form.reset();


                preview.src = "";

                preview.style.display =
                    "none";


                mostrarProductosAdmin();

            };


            lector.readAsDataURL(archivo);

        }
    );


    // =====================================
    // ELIMINAR PRODUCTO
    // =====================================

    window.eliminarProducto =
        function(id) {

            const confirmar =
                confirm(
                    "¿Seguro que deseas eliminar este producto?"
                );


            if (!confirmar) return;


            let productos =
                obtenerProductos();


            productos =
                productos.filter(
                    producto =>
                        producto.id !== id
                );


            localStorage.setItem(
                "productosFS",
                JSON.stringify(productos)
            );


            mostrarProductosAdmin();

        };


    // =====================================
    // PRECIO
    // =====================================

    function formatearPrecio(precio) {

        return new Intl.NumberFormat(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0
            }
        ).format(precio);

    }


    // =====================================
    // CARGAR
    // =====================================

    mostrarProductosAdmin();

});
