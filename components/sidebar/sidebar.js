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

document.addEventListener('DOMContentLoaded', cargarComponentes);
