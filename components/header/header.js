// Lógica del header (actualmente vacía pero disponible para futuras funcionalidades)
// Ejemplo: cerrar sesión, notificaciones, etc.

document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function() {
            if (typeof authManager !== 'undefined') {
                await authManager.logout();
                window.location.href = '/login/';
            }
        });
    }
});
