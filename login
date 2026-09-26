<!DOCTYPE html>
<html lang="es">
 
<head>
 
    <meta charset="UTF-8">
 
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0">
 
    <meta
        name="description"
        content="Acceso al panel de administración de FS STORE">
 
    <title>FS STORE | Iniciar sesión</title>
 
    <link
        rel="icon"
        href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🛍️%3C/text%3E%3C/svg%3E">
 
 
    <!-- BOOTSTRAP -->
 
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet">
 
 
    <!-- BOOTSTRAP ICONS -->
 
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
 
 
    <!-- CSS PROPIO -->
 
    <link
        rel="stylesheet"
        href="css/estilos.css">
 
</head>
 
 
<body>
 
 
<div class="auth-page">
 
    <div class="auth-container">
 
 
        <!-- VOLVER -->
 
        <div class="auth-back">
 
            <a href="index.html">
 
                <i class="bi bi-arrow-left"></i>
                Volver a la tienda
 
            </a>
 
        </div>
 
 
        <!-- TARJETA -->
 
        <div class="auth-card">
 
            <div class="auth-logo text-center">
 
                <div class="logo-circle">
                    FS
                </div>
 
                <h1>
                    STORE
                </h1>
 
            </div>
 
 
            <h2>
                Acceso administrativo
            </h2>
 
            <p class="text-muted mb-4">
                Ingresa tus credenciales para entrar al panel.
            </p>
 
 
            <form id="formLogin">
 
 
                <!-- USUARIO -->
 
                <div class="mb-3">
 
                    <label
                        for="usuario"
                        class="form-label">
 
                        Usuario
 
                    </label>
 
                    <div class="input-group">
 
                        <span class="input-group-text">
                            <i class="bi bi-person"></i>
                        </span>
 
                        <input
                            type="text"
                            id="usuario"
                            class="form-control"
                            placeholder="admin"
                            autocomplete="username"
                            required>
 
                    </div>
 
                </div>
 
 
                <!-- CONTRASEÑA -->
 
                <div class="mb-3">
 
                    <label
                        for="clave"
                        class="form-label">
 
                        Contraseña
 
                    </label>
 
                    <div class="input-group">
 
                        <span class="input-group-text">
                            <i class="bi bi-lock"></i>
                        </span>
 
                        <input
                            type="password"
                            id="clave"
                            class="form-control"
                            placeholder="••••••••"
                            autocomplete="current-password"
                            required>
 
                        <button
                            id="togglePassword"
                            class="btn"
                            type="button"
                            aria-label="Mostrar contraseña">
 
                            <i class="bi bi-eye"></i>
 
                        </button>
 
                    </div>
 
                </div>
 
 
                <!-- ERROR -->
 
                <div
                    id="errorLogin"
                    class="text-danger small mb-3"
                    style="display: none;">
 
                    Usuario o contraseña incorrectos.
 
                </div>
 
 
                <!-- BOTÓN -->
 
                <button
                    type="submit"
                    class="btn btn-dark auth-button w-100">
 
                    Iniciar sesión
 
                </button>
 
 
            </form>
 
        </div>
 
 
        <div class="auth-footer">
 
            <p>
                Acceso restringido — solo personal autorizado.
            </p>
 
        </div>
 
    </div>
 
</div>
 
 
<script src="js/auth.js"></script>
 
<script>
 
// =====================================================
// SI YA HAY SESIÓN ACTIVA, IR DIRECTO AL ADMIN
// =====================================================
 
if (sessionStorage.getItem("fsAdminSesion") === "activa") {
 
    window.location.href = "admin.html";
 
}
 
 
// =====================================================
// MOSTRAR / OCULTAR CONTRASEÑA
// =====================================================
 
document
    .getElementById("togglePassword")
    .addEventListener("click", function () {
 
        const clave =
            document.getElementById("clave");
 
        const icono =
            this.querySelector("i");
 
        const visible =
            clave.type === "text";
 
        clave.type =
            visible ? "password" : "text";
 
        icono.className =
            visible ? "bi bi-eye" : "bi bi-eye-slash";
 
    });
 
 
// =====================================================
// ENVIAR FORMULARIO
// =====================================================
 
document
    .getElementById("formLogin")
    .addEventListener("submit", function (event) {
 
        event.preventDefault();
 
        const usuario =
            document.getElementById("usuario")
                .value.trim();
 
        const clave =
            document.getElementById("clave")
                .value;
 
        const error =
            document.getElementById("errorLogin");
 
        if (
            usuario === ADMIN_USUARIO &&
            clave === ADMIN_CLAVE
        ) {
 
            sessionStorage.setItem(
                "fsAdminSesion",
                "activa"
            );
 
            window.location.href = "admin.html";
 
        } else {
 
            error.style.display = "block";
 
        }
 
    });
 
</script>
 
 
</body>
 
</html>
