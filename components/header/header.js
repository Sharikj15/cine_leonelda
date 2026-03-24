document.addEventListener('DOMContentLoaded', function() {
    const botonCerrarSesion = document.getElementById('logoutBtn');
    
    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener('click', async function() {
            if (typeof gestorAutenticacion !== 'undefined') {
                await gestorAutenticacion.cerrarSesion();
                window.location.href = '/login/';
            }
        });
    }
});
