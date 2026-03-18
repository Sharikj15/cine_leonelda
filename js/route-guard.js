class RouteGuard {
    constructor(options = {}) {
        this.redirectUrl = options.redirectUrl || '../login/';
        this.requireAuth = options.requireAuth !== false;
    }

    checkAccess() {
        const isAuthenticated = authManager.isAuthenticated();
        if (this.requireAuth && !isAuthenticated) {
            window.location.href = this.redirectUrl;
            return false;
        }
        return true;
    }

    getAuthenticatedUser() {
        if (!authManager.isAuthenticated()) {
            throw new Error('Usuario no autenticado');
        }
        return authManager.getCurrentUser();
    }
}

const routeGuard = new RouteGuard();

document.addEventListener('DOMContentLoaded', function() {
    routeGuard.checkAccess();
});
