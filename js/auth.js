class GestorAutenticacion {
    constructor() {
        this.usuarioActual = this.cargarUsuarioDelAlmacenamiento();
        this.tiempoEsperaSession = 30 * 60 * 1000;
        this.inicializarTiempoEsperaSession();
    }

    static CREDENCIALES_VALIDAS = [
        { username: 'admin', password: 'admin123', role: 'admin', name: 'Administrador' },
        { username: 'user', password: 'user123', role: 'user', name: 'Usuario' }
    ];

    validarCredenciales(usuario, contrasena) {
        const user = GestorAutenticacion.CREDENCIALES_VALIDAS.find(
            cred => cred.username === usuario && cred.password === contrasena
        );
        return user || null;
    }

    iniciarSesion(usuario, contrasena) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.validarCredenciales(usuario, contrasena);
                
                if (user) {
                    this.usuarioActual = {
                        ...user,
                        tiempoLogin: new Date().toISOString(),
                        tiempoUltimaActividad: new Date().getTime()
                    };
                    this.guardarUsuarioEnAlmacenamiento(this.usuarioActual);
                    resolve({ success: true, user: this.usuarioActual });
                } else {
                    reject({ success: false, error: 'Usuario o contraseña incorrectos' });
                }
            }, 500);
        });
    }

    cerrarSesion() {
        this.usuarioActual = null;
        localStorage.removeItem('currentUser');
        sessionStorage.clear();
        return Promise.resolve();
    }

    estaAutenticado() {
        return this.usuarioActual !== null;
    }

    obtenerUsuarioActual() {
        return this.usuarioActual;
    }

    guardarUsuarioEnAlmacenamiento(usuario) {
        localStorage.setItem('currentUser', JSON.stringify(usuario));
    }

    cargarUsuarioDelAlmacenamiento() {
        try {
            const usuario = localStorage.getItem('currentUser');
            return usuario ? JSON.parse(usuario) : null;
        } catch (error) {
            console.error('Error cargando usuario de storage:', error);
            return null;
        }
    }

    inicializarTiempoEsperaSession() {
        if (this.usuarioActual) {
            this.restablecerTiempoEsperaSession();
        }
    }

    restablecerTiempoEsperaSession() {
        if (this.idTiempoEsperaSession) {
            clearTimeout(this.idTiempoEsperaSession);
        }

        this.idTiempoEsperaSession = setTimeout(() => {
            this.cerrarSesion();
            window.location.href = '../login/?session=expired';
        }, this.tiempoEsperaSession);
    }

    actualizarActividad() {
        if (this.usuarioActual) {
            this.usuarioActual.tiempoUltimaActividad = new Date().getTime();
            this.restablecerTiempoEsperaSession();
        }
    }
}

const gestorAutenticacion = new GestorAutenticacion();

document.addEventListener('click', () => gestorAutenticacion.actualizarActividad());
document.addEventListener('keypress', () => gestorAutenticacion.actualizarActividad());
