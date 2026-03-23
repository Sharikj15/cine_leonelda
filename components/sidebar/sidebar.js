// Cargar componentes del layout
function loadFragment(url, elementId) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            return data;
        })
        .catch(error => console.error('Error cargando fragmento:', error));
}

// Cargar header, footer y sidebar
Promise.all([
    loadFragment('../components/header/header.html', 'header'),
    loadFragment('../components/footer/footer.html', 'footer'),
    loadFragment('../components/sidebar/sidebar.html', 'sidebar')
]).then(() => {
    // Configurar toggle del menú
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const overlay = document.getElementById('overlay');
    const sidebar = document.getElementById('sidebar').querySelector('.sidebar');

    function toggleMenu() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
    }
 
    menuToggle?.addEventListener('click', toggleMenu);
    closeMenu?.addEventListener('click', toggleMenu);
    overlay?.addEventListener('click', toggleMenu);

    // Configurar botón de logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = '../login/';
        });
    }
});
