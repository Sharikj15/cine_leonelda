async function cargarComponentes() {
    try {
        const cargarFragmento = async (url, idElemento) => {
            const respuesta = await fetch(url);
            const datos = await respuesta.text();
            document.getElementById(idElemento).innerHTML = datos;
            return datos;
        };

        await Promise.all([
            cargarFragmento('../components/header/header.html', 'header'),
            cargarFragmento('../components/footer/footer.html', 'footer'),
            cargarFragmento('../components/sidebar/sidebar.html', 'sidebar')
        ]);

        const botonAlternador = document.getElementById('menuToggle');
        const botonCerrar = document.getElementById('closeMenu');
        const sobreposicion = document.getElementById('overlay');
        const barraSuspensiva = document.getElementById('sidebar').querySelector('.sidebar');

        function alternarMenu() {
            barraSuspensiva.classList.toggle('open');
            sobreposicion.classList.toggle('show');
        }
 
        botonAlternador?.addEventListener('click', alternarMenu);
        botonCerrar?.addEventListener('click', alternarMenu);
        sobreposicion?.addEventListener('click', alternarMenu);

        const botonCerrarSesion = document.getElementById('logoutBtn');
        if (botonCerrarSesion) {
            botonCerrarSesion.addEventListener('click', () => {
                window.location.href = '../login/';
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function cargarMenu() {
    try {
        const respuesta = await fetch('/data/menu.json');
        const elementosDelMenu = await respuesta.json();
        const contenedor = document.getElementById('menuContainer');
        const plantilla = document.getElementById('menuItemTemplate');

        elementosDelMenu.forEach(elemento => {
            const clon = plantilla.content.cloneNode(true);
            clon.querySelector('.product-image').src = elemento.image;
            clon.querySelector('.product-image').alt = elemento.name;
            clon.querySelector('.product-title').textContent = elemento.name;
            clon.querySelector('.product-description').textContent = elemento.description;
            clon.querySelector('.product-price').textContent = `Precio: ${elemento.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}`;
            contenedor.appendChild(clon);
        });

        document.querySelectorAll('.menu-item').forEach(elemento => {
            observador.observe(elemento);
        });

        const cargando = document.getElementById('loading');
        if (cargando) cargando.style.display = 'none';
    } catch (error) {
        console.error('Error cargando menu:', error);
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

document.addEventListener('DOMContentLoaded', () => {
    cargarComponentes();
    cargarMenu();
});
