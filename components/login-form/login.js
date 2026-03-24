document.addEventListener('DOMContentLoaded', function() {
    const formularioLogin = document.getElementById('loginForm');
    const entradaUsuario = document.getElementById('username');
    const entradaContrasena = document.getElementById('password');
    const botonEnviar = document.getElementById('submitBtn');
    const mensajeError = document.getElementById('errorMessage');
    const mensajeExito = document.getElementById('successMessage');
    const mensajeSesionExpirada = document.getElementById('sessionExpiredMessage');
    const botonAlternadorContrasena = document.querySelector('.toggle-password');

    let validadorFormulario;
    
    inicializarLogin();

    function inicializarLogin() {
        validadorFormulario = new ValidadorFormulario(formularioLogin);
        verificarEstadoSesion();
        formularioLogin.addEventListener('submit', gestionarLogin);
        botonAlternadorContrasena?.addEventListener('click', alternarVisibilidadContrasena);

        if (localStorage.getItem('lastUsername')) {
            entradaUsuario.value = localStorage.getItem('lastUsername');
            entradaUsuario.focus();
        } else {
            entradaUsuario.focus();
        }
    }

    function verificarEstadoSesion() {
        const parametros = new URLSearchParams(window.location.search);
        if (parametros.get('session') === 'expired') {
            mostrarSesionExpirada();
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    function mostrarSesionExpirada() {
        mensajeSesionExpirada.style.display = 'block';
        setTimeout(() => {
            mensajeSesionExpirada.style.display = 'none';
        }, 5000);
    }

    async function gestionarLogin(e) {
        e.preventDefault();
        ocultarTodosMensajes();
        if (!validadorFormulario.validarFormulario()) {
            return;
        }

        const usuario = entradaUsuario.value.trim();
        const contrasena = entradaContrasena.value;
        mostrarCargando();

        try {
            const resultado = await gestorAutenticacion.iniciarSesion(usuario, contrasena);

            if (resultado.success) {
                mostrarExito(`¡Bienvenido, ${resultado.user.name}!`);
                localStorage.setItem('lastUsername', usuario);

                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            }
        } catch (error) {
            mostrarError(error.error || 'Error al iniciar sesión. Intenta de nuevo.');
        } finally {
            ocultarCargando();
        }
    }

    function alternarVisibilidadContrasena(e) {
        e.preventDefault();
        const tipo = entradaContrasena.type === 'password' ? 'text' : 'password';
        entradaContrasena.type = tipo;
        const icono = botonAlternadorContrasena.querySelector('i');
        if (tipo === 'password') {
            icono.className = 'fas fa-eye';
        } else {
            icono.className = 'fas fa-eye-slash';
        }
    }

    function mostrarError(mensaje) {
        mensajeError.textContent = mensaje;
        mensajeError.style.display = 'block';
        mensajeError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => {
            mensajeError.style.display = 'none';
        }, 5000);
    }

    function mostrarExito(mensaje) {
        mensajeExito.textContent = mensaje;
        mensajeExito.style.display = 'block';
    }

    function mostrarCargando() {
        botonEnviar.disabled = true;
        botonEnviar.querySelector('.button-text').style.display = 'none';
        botonEnviar.querySelector('.button-loader').style.display = 'inline-block';
    }

    function ocultarCargando() {
        botonEnviar.disabled = false;
        botonEnviar.querySelector('.button-text').style.display = 'inline';
        botonEnviar.querySelector('.button-loader').style.display = 'none';
    }

    function ocultarTodosMensajes() {
        mensajeError.style.display = 'none';
        mensajeExito.style.display = 'none';
        mensajeSesionExpirada.style.display = 'none';
    }
});
