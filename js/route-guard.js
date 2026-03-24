class ProtectorRuta {
    constructor(opciones = {}) {
        this.urlRedireccion = opciones.urlRedireccion || '../login/';
        this.requiereAutenticacion = opciones.requiereAutenticacion !== false;
    }

    verificarAcceso() {
        const estaAutenticado = gestorAutenticacion.estaAutenticado();
        if (this.requiereAutenticacion && !estaAutenticado) {
            window.location.href = this.urlRedireccion;
            return false;
        }
        return true;
    }

    obtenerUsuarioAutenticado() {
        if (!gestorAutenticacion.estaAutenticado()) {
            throw new Error('Usuario no autenticado');
        }
        return gestorAutenticacion.obtenerUsuarioActual();
    }
}

const protectorRuta = new ProtectorRuta();

document.addEventListener('DOMContentLoaded', function() {
    protectorRuta.verificarAcceso();
});
