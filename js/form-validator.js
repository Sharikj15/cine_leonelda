class ValidadorFormulario {
    constructor(elementoFormulario) {
        this.formulario = elementoFormulario;
        this.errores = {};
        this.configurarOyentesEventos();
    }

    configurarOyentesEventos() {
        const entradas = this.formulario.querySelectorAll('input, textarea, select');
        
        entradas.forEach(entrada => {
            entrada.addEventListener('blur', (e) => this.validarCampo(e.target));
            entrada.addEventListener('input', (e) => {
                if (this.errores[e.target.name]) {
                    this.validarCampo(e.target);
                }
            });
        });
    }

    validarCampo(campo) {
        const valor = campo.value.trim();
        const nombre = campo.name;
        const tipo = campo.type;
        const reglas = campo.dataset.rules?.split(',') || [];

        this.errores[nombre] = [];

        if (campo.required && !valor) {
            this.errores[nombre].push(`${this.obtenerEtiquetaCampo(campo)} es requerido`);
            this.mostrarErrorCampo(campo);
            return false;
        }

        for (const regla of reglas) {
            const reglaFormateada = regla.trim();
            
            if (reglaFormateada === 'email' && valor && !this.esCorreoValido(valor)) {
                this.errores[nombre].push('Correo electronico invalido');
            } else if (reglaFormateada.startsWith('minlength:')) {
                const largoMinimo = parseInt(reglaFormateada.split(':')[1]);
                if (valor && valor.length < largoMinimo) {
                    this.errores[nombre].push(`Minimo ${largoMinimo} caracteres`);
                }
            } else if (reglaFormateada.startsWith('maxlength:')) {
                const largoMaximo = parseInt(reglaFormateada.split(':')[1]);
                if (valor && valor.length > largoMaximo) {
                    this.errores[nombre].push(`Maximo ${largoMaximo} caracteres`);
                }
            } else if (reglaFormateada === 'username' && valor) {
                if (!this.esUsuarioValido(valor)) {
                    this.errores[nombre].push('Usuario solo puede contener letras, numeros y guiones');
                }
            } else if (reglaFormateada === 'phone' && valor && !this.esTelefonoValido(valor)) {
                this.errores[nombre].push('Telefono invalido');
            }
        }

        if (this.errores[nombre].length > 0) {
            this.mostrarErrorCampo(campo);
            return false;
        } else {
            this.limpiarErrorCampo(campo);
            return true;
        }
    }

    validarFormulario() {
        const entradas = this.formulario.querySelectorAll('input, textarea, select');
        let esValido = true;

        entradas.forEach(entrada => {
            if (!this.validarCampo(entrada)) {
                esValido = false;
            }
        });

        return esValido;
    }

    mostrarErrorCampo(campo) {
        campo.classList.add('field-error');
        
        let contenedorError = campo.parentElement.querySelector('.field-error-message');
        if (!contenedorError) {
            contenedorError = document.createElement('span');
            contenedorError.className = 'field-error-message';
            campo.parentElement.appendChild(contenedorError);
        }

        contenedorError.textContent = this.errores[campo.name] ? this.errores[campo.name][0] : '';
        contenedorError.style.display = 'block';
    }

    limpiarErrorCampo(campo) {
        campo.classList.remove('field-error');
        
        const contenedorError = campo.parentElement.querySelector('.field-error-message');
        if (contenedorError) {
            contenedorError.style.display = 'none';
        }

        delete this.errores[campo.name];
    }

    esCorreoValido(correo) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
    }

    esUsuarioValido(usuario) {
        const regex = /^[a-zA-Z0-9_-]{3,20}$/;
        return regex.test(usuario);
    }

    esTelefonoValido(telefono) {
        const regex = /^[\d\s\-\+\(\)]{10,}$/;
        return regex.test(telefono);
    }

    obtenerEtiquetaCampo(campo) {
        const etiqueta = this.formulario.querySelector(`label[for="${campo.id}"]`);
        return etiqueta ? etiqueta.textContent : campo.name;
    }

    obtenerErrores() {
        return this.errores;
    }

    limpiarTodosLosErrores() {
        this.errores = {};
        const campos = this.formulario.querySelectorAll('input, textarea, select');
        campos.forEach(campo => this.limpiarErrorCampo(campo));
    }
}
