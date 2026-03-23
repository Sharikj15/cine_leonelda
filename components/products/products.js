// Lógica para cargar y mostrar productos
async function loadProducts() {
    try {
        const response = await fetch('../data/products.json');
        const products = await response.json();
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

        // Animar elementos con Intersection Observer
        document.querySelectorAll('.product').forEach(item => {
            observer.observe(item);
        });

        // Ocultar loading
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

// Intersection Observer para animaciones
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

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadProducts);
