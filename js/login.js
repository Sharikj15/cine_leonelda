// Validación de login con credenciales quemadas
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Credenciales quemadas (solo para fines educativos)
    if (username === 'admin' && password === 'admin') {
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Usuario o contraseña incorrectos.';
    }
});