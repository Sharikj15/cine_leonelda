class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.errors = {};
        this.setupEventListeners();
    }

    setupEventListeners() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => this.validateField(e.target));
            input.addEventListener('input', (e) => {
                if (this.errors[e.target.name]) {
                    this.validateField(e.target);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        const type = field.type;
        const rules = field.dataset.rules?.split(',') || [];

        this.errors[name] = [];

        if (field.required && !value) {
            this.errors[name].push(`${this.getFieldLabel(field)} es requerido`);
            this.showFieldError(field);
            return false;
        }

        for (const rule of rules) {
            const trimmedRule = rule.trim();
            
            if (trimmedRule === 'email' && value && !this.isValidEmail(value)) {
                this.errors[name].push('Correo electrónico inválido');
            } else if (trimmedRule.startsWith('minlength:')) {
                const minLength = parseInt(trimmedRule.split(':')[1]);
                if (value && value.length < minLength) {
                    this.errors[name].push(`Mínimo ${minLength} caracteres`);
                }
            } else if (trimmedRule.startsWith('maxlength:')) {
                const maxLength = parseInt(trimmedRule.split(':')[1]);
                if (value && value.length > maxLength) {
                    this.errors[name].push(`Máximo ${maxLength} caracteres`);
                }
            } else if (trimmedRule === 'username' && value) {
                if (!this.isValidUsername(value)) {
                    this.errors[name].push('Usuario solo puede contener letras, números y guiones');
                }
            } else if (trimmedRule === 'phone' && value && !this.isValidPhone(value)) {
                this.errors[name].push('Teléfono inválido');
            }
        }

        if (this.errors[name].length > 0) {
            this.showFieldError(field);
            return false;
        } else {
            this.clearFieldError(field);
            return true;
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showFieldError(field) {
        field.classList.add('field-error');
        
        let errorContainer = field.parentElement.querySelector('.field-error-message');
        if (!errorContainer) {
            errorContainer = document.createElement('span');
            errorContainer.className = 'field-error-message';
            field.parentElement.appendChild(errorContainer);
        }

        errorContainer.textContent = this.errors[field.name] ? this.errors[field.name][0] : '';
        errorContainer.style.display = 'block';
    }

    clearFieldError(field) {
        field.classList.remove('field-error');
        
        const errorContainer = field.parentElement.querySelector('.field-error-message');
        if (errorContainer) {
            errorContainer.style.display = 'none';
        }

        delete this.errors[field.name];
    }

    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    isValidUsername(username) {
        const regex = /^[a-zA-Z0-9_-]{3,20}$/;
        return regex.test(username);
    }

    isValidPhone(phone) {
        const regex = /^[\d\s\-\+\(\)]{10,}$/;
        return regex.test(phone);
    }

    getFieldLabel(field) {
        const label = this.form.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent : field.name;
    }

    getErrors() {
        return this.errors;
    }

    clearAllErrors() {
        this.errors = {};
        const fields = this.form.querySelectorAll('input, textarea, select');
        fields.forEach(field => this.clearFieldError(field));
    }
}
