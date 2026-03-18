class AuthManager {
    constructor() {
        this.currentUser = this.loadUserFromStorage();
        this.sessionTimeout = 30 * 60 * 1000;
        this.initializeSessionTimeout();
    }

    static VALID_CREDENTIALS = [
        { username: 'admin', password: 'admin123', role: 'admin', name: 'Administrador' },
        { username: 'user', password: 'user123', role: 'user', name: 'Usuario' }
    ];

    validateCredentials(username, password) {
        const user = AuthManager.VALID_CREDENTIALS.find(
            cred => cred.username === username && cred.password === password
        );
        return user || null;
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.validateCredentials(username, password);
                
                if (user) {
                    this.currentUser = {
                        ...user,
                        loginTime: new Date().toISOString(),
                        lastActivityTime: new Date().getTime()
                    };
                    this.saveUserToStorage(this.currentUser);
                    resolve({ success: true, user: this.currentUser });
                } else {
                    reject({ success: false, error: 'Usuario o contraseña incorrectos' });
                }
            }, 500);
        });
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        sessionStorage.clear();
        return Promise.resolve();
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    saveUserToStorage(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    loadUserFromStorage() {
        try {
            const user = localStorage.getItem('currentUser');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error cargando usuario de storage:', error);
            return null;
        }
    }

    initializeSessionTimeout() {
        if (this.currentUser) {
            this.resetSessionTimeout();
        }
    }

    resetSessionTimeout() {
        if (this.sessionTimeoutId) {
            clearTimeout(this.sessionTimeoutId);
        }

        this.sessionTimeoutId = setTimeout(() => {
            this.logout();
            window.location.href = '../login/?session=expired';
        }, this.sessionTimeout);
    }

    updateActivity() {
        if (this.currentUser) {
            this.currentUser.lastActivityTime = new Date().getTime();
            this.resetSessionTimeout();
        }
    }
}

const authManager = new AuthManager();

document.addEventListener('click', () => authManager.updateActivity());
document.addEventListener('keypress', () => authManager.updateActivity());
