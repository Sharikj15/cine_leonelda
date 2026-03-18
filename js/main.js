function loadFragment(url, elementId) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            return data;
        })
        .catch(error => console.error('Error cargando fragmento:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    if (typeof authManager !== 'undefined' && !authManager.isAuthenticated()) {
        window.location.href = './login/';
        return;
    }

    Promise.all([
        loadFragment('../components/header.html', 'header'),
        loadFragment('../components/footer.html', 'footer'),
        loadFragment('../components/sidebar.html', 'sidebar')
    ]).then(() => {
        if (typeof authManager !== 'undefined' && authManager.isAuthenticated()) {
            const user = authManager.getCurrentUser();
            console.log('Usuario autenticado:', user.username);
        }

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

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (typeof authManager !== 'undefined') {
                    authManager.logout().then(() => {
                        window.location.href = './login/';
                    });
                } else {
                    window.location.href = './login/';
                }
            });
        }
    });
});



// Cargar productos desde JSON
fetch('../data/products.json')
    .then(response => response.json())
    .then(products => {
        const container = document.getElementById('productsContainer');
        const template = document.getElementById('productTemplate');

        products.forEach(product => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.product-image').src = product.image;
            clone.querySelector('.product-title').textContent = product.title;
            clone.querySelector('.product-description').textContent = product.description;
            clone.querySelector('.product-price').textContent = `Precio: ${product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}`;
            container.appendChild(clone);
        });

        // Animaciones de scroll después de cargar productos
        document.querySelectorAll('.product').forEach(item => {
            observer.observe(item);
        });

        // Ocultar loading
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';
    })
    .catch(error => console.error('Error cargando productos:', error));

// Animaciones de scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);