
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

    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = '../login/';
        });
    }
});


fetch('/data/menu.json')
    .then(response => response.json())
    .then(menuItems => {
        const container = document.getElementById('menuContainer');
        const template = document.getElementById('menuItemTemplate');

        menuItems.forEach(item => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.product-image').src = item.image;
            clone.querySelector('.product-image').alt = item.name;
            clone.querySelector('.product-title').textContent = item.name;
            clone.querySelector('.product-description').textContent = item.description;
            clone.querySelector('.product-price').textContent = `Precio: ${item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}`;
            container.appendChild(clone);
        });

        
        document.querySelectorAll('.menu-item').forEach(item => {
            observer.observe(item);
        });

        
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';
    })
    .catch(error => console.error('Error cargando menú:', error));


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