function obtenerUsuarios() {

    return JSON.parse(
        localStorage.getItem("usuarios") || "[]"
    );

}


function guardarUsuarios(usuarios) {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}


document.addEventListener(
    "DOMContentLoaded",
    () => {


        const registroForm =
            document.getElementById(
                "registroForm"
            );


        if (registroForm) {

            registroForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const nombre =
                        document.getElementById(
                            "registroNombre"
                        ).value.trim();


                    const email =
                        document.getElementById(
                            "registroEmail"
                        ).value.trim();


                    const password =
                        document.getElementById(
                            "registroPassword"
                        ).value;


                    const usuarios =
                        obtenerUsuarios();


                    const existe =
                        usuarios.some(
                            usuario =>
                                usuario.email === email
                        );


                    if (existe) {

                        alert(
                            "Este correo ya está registrado."
                        );

                        return;

                    }


                    usuarios.push({

                        nombre,

                        email,

                        password

                    });


                    guardarUsuarios(usuarios);


                    alert(
                        "Cuenta creada correctamente."
                    );


                    window.location.href =
                        "iniciosesion.html";

                }
            );

        }


        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const email =
                        document.getElementById(
                            "loginEmail"
                        ).value.trim();


                    const password =
                        document.getElementById(
                            "loginPassword"
                        ).value;


                    const usuarios =
                        obtenerUsuarios();


                    const usuario =
                        usuarios.find(
                            user =>
                                user.email === email &&
                                user.password === password
                        );


                    if (!usuario) {

                        alert(
                            "Correo o contraseña incorrectos."
                        );

                        return;

                    }


                    localStorage.setItem(
                        "usuarioActivo",
                        JSON.stringify(usuario)
                    );


                    alert(
                        `Bienvenido ${usuario.nombre}`
                    );


                    window.location.href =
                        "perfil.html";

                }
            );

        }

    }
);


function cerrarSesion() {

    localStorage.removeItem(
        "usuarioActivo"
    );

    window.location.href =
        "index.html";

}
