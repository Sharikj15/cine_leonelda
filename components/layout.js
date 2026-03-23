// Lógica principal de layout (para todas las páginas autenticadas)
async function CargarComponente(url, elementId) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        document.getElementById(elementId).innerHTML = data;
        return data;
    } catch (error) {
        console.error('Error cargando componente:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    // Verificar autenticación
    if (typeof authManager !== 'undefined' && !authManager.isAuthenticated()) {
        window.location.href = '/login/';
        return;
    }

    try {
        // Cargar componentes principales
        await Promise.all([
            CargarComponente('../components/header/header.html', 'header'),
            CargarComponente('../components/footer/footer.html', 'footer'),
            CargarComponente('../components/sidebar/sidebar.html', 'sidebar')
        ]);

        if (typeof authManager !== 'undefined' && authManager.isAuthenticated()) {
            const user = authManager.getCurrentUser();
            console.log('Usuario autenticado:', user.username);
        }

        // Configurar toggle del menú
        const menuToggle = document.getElementById('menuToggle');
        const closeMenu = document.getElementById('closeMenu');
        const overlay = document.getElementById('overlay');
        const sidebar = document.getElementById('sidebar').querySelector('.sidebar');

        function toggleMenu() {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('show');
        }

        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', toggleMenu);
        }

        if (closeMenu) {
            closeMenu.addEventListener('click', toggleMenu);
        }

        if (overlay) {
            overlay.addEventListener('click', toggleMenu);
        }

        // Configurar botón de logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                if (typeof authManager !== 'undefined') {
                    await authManager.logout();
                    window.location.href = '/login/';
                } else {
                    window.location.href = '/login/';
                }
            });
        }
    } catch (error) {
        console.error('Error en inicialización:', error);
    }
});
