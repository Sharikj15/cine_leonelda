async function CargarComponente(url, idElemento) {
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.text();
        document.getElementById(idElemento).innerHTML = datos;
        return datos;
    } catch (error) {
        console.error('Error cargando componente:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    if (typeof gestorAutenticacion !== 'undefined' && !gestorAutenticacion.estaAutenticado()) {
        window.location.href = '/login/';
        return;
    }

    try {
        await Promise.all([
            CargarComponente('../components/header/header.html', 'header'),
            CargarComponente('../components/footer/footer.html', 'footer'),
            CargarComponente('../components/sidebar/sidebar.html', 'sidebar')
        ]);

        if (typeof gestorAutenticacion !== 'undefined' && gestorAutenticacion.estaAutenticado()) {
            const usuario = gestorAutenticacion.obtenerUsuarioActual();
            console.log('Usuario autenticado:', usuario.username);
        }

        const botonAlternador = document.getElementById('menuToggle');
        const botonCerrar = document.getElementById('closeMenu');
        const sobreposicion = document.getElementById('overlay');
        const barraSuspensiva = document.getElementById('sidebar').querySelector('.sidebar');

        function alternarMenu() {
            barraSuspensiva.classList.toggle('open');
            sobreposicion.classList.toggle('show');
        }

        if (botonAlternador && barraSuspensiva) {
            botonAlternador.addEventListener('click', alternarMenu);
        }

        if (botonCerrar) {
            botonCerrar.addEventListener('click', alternarMenu);
        }

        if (sobreposicion) {
            sobreposicion.addEventListener('click', alternarMenu);
        }

        const botonCerrarSesion = document.getElementById('logoutBtn');
        if (botonCerrarSesion) {
            botonCerrarSesion.addEventListener('click', async () => {
                if (typeof gestorAutenticacion !== 'undefined') {
                    await gestorAutenticacion.cerrarSesion();
                    window.location.href = '/login/';
                } else {
                    window.location.href = '/login/';
                }
            });
        }
    } catch (error) {
        console.error('Error en inicializacion:', error);
    }
});
