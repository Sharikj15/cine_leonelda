async function cargarProductos() {
    try {
        const respuesta = await fetch('../data/products.json');
        const productos = await respuesta.json();
        const contenedor = document.getElementById('productsContainer');
        const plantilla = document.getElementById('productTemplate');

        productos.forEach(producto => {
            const clon = plantilla.content.cloneNode(true);
            clon.querySelector('.product-image').src = producto.image;
            clon.querySelector('.product-title').textContent = producto.title;
            clon.querySelector('.product-description').textContent = producto.description;
            clon.querySelector('.product-price').textContent = `Precio: ${producto.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}`;
            contenedor.appendChild(clon);
        });

        document.querySelectorAll('.product').forEach(elemento => {
            observador.observe(elemento);
        });

        const cargando = document.getElementById('loading');
        if (cargando) cargando.style.display = 'none';
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

const opcionesObservador = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('animate');
        }
    });
}, opcionesObservador);

document.addEventListener('DOMContentLoaded', cargarProductos);
