// =====================================================
// FS STORE - AUTENTICACIÓN DEL PANEL DE ADMIN
//
// ⚠️ IMPORTANTE - ESTO ES UNA PROTECCIÓN PROVISIONAL:
// Estas credenciales viven en el navegador y son
// visibles para cualquiera que revise el código fuente
// (Ctrl+U o F12). NO es seguridad real, solo evita que
// un visitante casual entre al panel por accidente.
//
// Cuando conectes un backend real, reemplaza todo esto
// por autenticación con usuario/contraseña verificados
// en el servidor (con sesiones o tokens).
// =====================================================
 
const ADMIN_USUARIO = "admin";
const ADMIN_CLAVE = "fsstore2026";
 
 
// =====================================================
// VERIFICAR SESIÓN
// (se llama al inicio de admin.html, antes de mostrar
// nada, para redirigir si no hay sesión activa)
// =====================================================
 
function verificarSesionAdmin() {
 
    const sesionActiva =
        sessionStorage.getItem("fsAdminSesion");
 
    if (sesionActiva !== "activa") {
 
        window.location.href = "login.html";
 
    }
 
}
 
 
// =====================================================
// CERRAR SESIÓN
// =====================================================
 
function cerrarSesionAdmin() {
 
    sessionStorage.removeItem("fsAdminSesion");
 
    window.location.href = "login.html";
 
}
 
 
// NOTA: este archivo NO ejecuta la verificación
// automáticamente. Eso se hace explícitamente en
// admin.html (llamando a verificarSesionAdmin()
// justo después de cargar este script), para que
// login.html pueda reutilizar las constantes de
// arriba sin quedar en un bucle de redirección.
 
