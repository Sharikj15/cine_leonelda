document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const sessionExpiredMessage = document.getElementById('sessionExpiredMessage');
    const togglePasswordBtn = document.querySelector('.toggle-password');

    let formValidator;
    
    initializeLogin();

    function initializeLogin() {
        formValidator = new FormValidator(loginForm);
        checkSessionStatus();
        loginForm.addEventListener('submit', handleLogin);
        togglePasswordBtn?.addEventListener('click', togglePasswordVisibility);

        if (localStorage.getItem('lastUsername')) {
            usernameInput.value = localStorage.getItem('lastUsername');
            usernameInput.focus();
        } else {
            usernameInput.focus();
        }
    }

    function checkSessionStatus() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('session') === 'expired') {
            showSessionExpired();
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    function showSessionExpired() {
        sessionExpiredMessage.style.display = 'block';
        setTimeout(() => {
            sessionExpiredMessage.style.display = 'none';
        }, 5000);
    }

    async function handleLogin(e) {
        e.preventDefault();
        hideAllMessages();
        if (!formValidator.validateForm()) {
            return;
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        showLoading();

        try {
            const result = await authManager.login(username, password);

            if (result.success) {
                showSuccess(`¡Bienvenido, ${result.user.name}!`);
                localStorage.setItem('lastUsername', username);

                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            }
        } catch (error) {
            showError(error.error || 'Error al iniciar sesión. Intenta de nuevo.');
        } finally {
            hideLoading();
        }
    }

    function togglePasswordVisibility(e) {
        e.preventDefault();
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        const icon = togglePasswordBtn.querySelector('i');
        if (type === 'password') {
            icon.className = 'fas fa-eye';
        } else {
            icon.className = 'fas fa-eye-slash';
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
    }

    function showLoading() {
        submitBtn.disabled = true;
        submitBtn.querySelector('.button-text').style.display = 'none';
        submitBtn.querySelector('.button-loader').style.display = 'inline-block';
    }

    function hideLoading() {
        submitBtn.disabled = false;
        submitBtn.querySelector('.button-text').style.display = 'inline';
        submitBtn.querySelector('.button-loader').style.display = 'none';
    }

    function hideAllMessages() {
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
        sessionExpiredMessage.style.display = 'none';
    }
});
