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

Promise.all([
    loadFragment('../components/header.html', 'header'),
    loadFragment('../components/footer.html', 'footer'),
    loadFragment('../components/sidebar.html', 'sidebar')
]).then(() => {
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
});

// Web Component para el menú
class MenuItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const name = this.getAttribute('name') || '';
        const description = this.getAttribute('description') || '';
        const price = this.getAttribute('price') || '';
        const image = this.getAttribute('image') || '';

        this.shadowRoot.innerHTML = `
            <style>
                .menu-item {
                    display: inline-block;
                    width: 300px;
                    margin: 10px;
                    padding: 10px;
                    background-color: #fff3e0;
                    border: 2px solid #ff9800;
                    border-radius: 12px;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                }
                .product-image {
                    width: 100%;
                    height: auto;
                    border-radius: 4px;
                }
                .product-title {
                    margin: 10px 0;
                    color: #d32f2f;
                }
                .product-description {
                    margin: 5px 0;
                }
                .product-price {
                    font-weight: bold;
                    color: #333;
                }
            </style>
            <div class="menu-item">
                <img src="${image}" alt="${name}" class="product-image">
                <h3 class="product-title">${name}</h3>
                <p class="product-description">${description}</p>
                <p class="product-price">${price}</p>
            </div>
        `;
    }
}

customElements.define('menu-item', MenuItem);

// Cargar menú desde JSON
fetch('/data/menu.json')
    .then(response => response.json())
    .then(menuItems => {
        const container = document.getElementById('menuContainer');
        const template = document.getElementById('menuItemTemplate');

        menuItems.forEach(item => {
            if (item.useTemplate) {
                const clone = template.content.cloneNode(true);
                clone.querySelector('.menu-item .product-image').src = item.image;
                clone.querySelector('.menu-item .product-image').alt = item.name;
                clone.querySelector('.menu-item .product-title').textContent = item.name;
                clone.querySelector('.menu-item .product-description').textContent = item.description;
                clone.querySelector('.menu-item .product-price').textContent = `Precio: $${item.price.toFixed(2)}`;
                container.appendChild(clone);
            } else {
                const element = document.createElement('menu-item');
                element.setAttribute('name', item.name);
                element.setAttribute('description', item.description);
                element.setAttribute('price', `Precio: $${item.price.toFixed(2)}`);
                element.setAttribute('image', item.image);
                container.appendChild(element);
            }
        });

        // Animaciones de scroll después de cargar items
        document.querySelectorAll('.menu-item').forEach(item => {
            observer.observe(item);
        });
    })
    .catch(error => console.error('Error cargando menú:', error));

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