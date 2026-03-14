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

// Cargar header, footer y sidebar
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

// Definir Web Component para productos
class MovieProduct extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || '';
        const description = this.getAttribute('description') || '';
        const price = this.getAttribute('price') || '';
        const image = this.getAttribute('image') || '';

        this.shadowRoot.innerHTML = `
            <style>
                .product {
                    display: inline-block;
                    width: 300px;
                    margin: 10px;
                    padding: 10px;
                    background-color: #fff;
                    border-radius: 8px;
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
            <div class="product">
                <img src="${image}" alt="Poster de la película" class="product-image">
                <h3 class="product-title">${title}</h3>
                <p class="product-description">${description}</p>
                <p class="product-price">${price}</p>
            </div>
        `;
    }
}

customElements.define('movie-product', MovieProduct);

// Cargar productos desde JSON
fetch('../data/products.json')
    .then(response => response.json())
    .then(products => {
        const container = document.getElementById('productsContainer');
        const template = document.getElementById('productTemplate');

        products.forEach(product => {
            // Usar template para algunos productos
            if (product.useTemplate) {
                const clone = template.content.cloneNode(true);
                clone.querySelector('.product-image').src = product.image;
                clone.querySelector('.product-title').textContent = product.title;
                clone.querySelector('.product-description').textContent = product.description;
                clone.querySelector('.product-price').textContent = `Precio: $${product.price}`;
                container.appendChild(clone);
            } else {
                // Usar Web Component para otros
                const movieElement = document.createElement('movie-product');
                movieElement.setAttribute('title', product.title);
                movieElement.setAttribute('description', product.description);
                movieElement.setAttribute('price', `Precio: $${product.price}`);
                movieElement.setAttribute('image', product.image);
                container.appendChild(movieElement);
            }
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