/**
 * Ejemplo de Integración de Route Guard en main.js
 * Descomentar la línea: <script src="../js/route-guard.js"></script>
 * en el index.html para activar la protección de rutas
 */

// Cargar fragmentos dinámicamente
function loadFragment(url, elementId) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            return data;
        })
        .catch(error => console.error('Error cargando fragmento:', error));
}

// Verificar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Proteger la página si el usuario no está autenticado
    // Si está en index.html raíz, asegúrate de que auth.js esté cargado
    if (typeof authManager !== 'undefined' && !authManager.isAuthenticated()) {
        window.location.href = './login/';
        return;
    }

    // Cargar header, footer y sidebar
    Promise.all([
        loadFragment('../components/header.html', 'header'),
        loadFragment('../components/footer.html', 'footer'),
        loadFragment('../components/sidebar.html', 'sidebar')
    ]).then(() => {
        // Mostrar información del usuario autenticado
        if (typeof authManager !== 'undefined' && authManager.isAuthenticated()) {
            const user = authManager.getCurrentUser();
            console.log('Usuario autenticado:', user);
            
            // Puedes mostrar el nombre del usuario en el header
            const userNameElement = document.querySelector('.user-name');
            if (userNameElement) {
                userNameElement.textContent = user.name;
            }
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

        // Event listener para logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                authManager.logout().then(() => {
                    window.location.href = './login/';
                });
            });
        }
    });
});

// Definir Web Component para productos
class MovieProduct extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Sin título';
        const description = this.getAttribute('description') || 'Sin descripción';
        const price = this.getAttribute('price') || '$0';
        
        this.innerHTML = `
            <div class="product">
                <img src="${this.getAttribute('image')}" alt="Poster de ${title}" class="product-image">
                <h3 class="product-title">${title}</h3>
                <p class="product-description">${description}</p>
                <p class="product-price">${price}</p>
            </div>
        `;
    }
}

customElements.define('movie-product', MovieProduct);

// Cargar productos desde JSON
async function loadProducts() {
    try {
        const response = await fetch('../data/products.json');
        const products = await response.json();
        const container = document.getElementById('productsContainer');
        const template = document.getElementById('productTemplate');

        if (!container || !template) return;

        products.forEach((product, index) => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.product-image').src = product.image;
            clone.querySelector('.product-image').alt = product.title;
            clone.querySelector('.product-title').textContent = product.title;
            clone.querySelector('.product-description').textContent = product.description;
            clone.querySelector('.product-price').textContent = `$${product.price}`;
            
            const productDiv = clone.querySelector('.product');
            productDiv.classList.add('animate');
            productDiv.style.animationDelay = `${index * 0.1}s`;

            container.appendChild(clone);
        });

        // Ocultar loading
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }
    } catch (error) {
        console.error('Error cargando productos:', error);
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = '<p>Error cargando películas. Intenta más tarde.</p>';
        }
    }
}

// Cargar menú desde JSON
async function loadMenu() {
    try {
        const response = await fetch('../data/menu.json');
        const menu = await response.json();
        const container = document.getElementById('menuContainer');

        if (!container) return;

        menu.items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.style.animationDelay = `${index * 0.1}s`;
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width:100%; height:150px; object-fit:cover; border-radius:8px;">
                <h3 style="margin: 10px 0; color: #ff9800;">${item.name}</h3>
                <p style="margin: 5px 0; font-size: 0.9rem; color: #666;">${item.description}</p>
                <p style="margin: 10px 0; font-weight: bold; color: #f57c00;">$${item.price}</p>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error cargando menú:', error);
    }
}

// Ejecutar funciones cuando esté listo
window.addEventListener('load', function() {
    loadProducts();
    if (document.getElementById('menuContainer')) {
        loadMenu();
    }
});
