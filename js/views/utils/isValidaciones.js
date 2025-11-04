var utils;
(function (utils) {
    class Validator {
        // Validar si nombre o texto solo contenga letras y espacios
        static validarNombre(nombre) {
            const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            return regex.test(nombre.trim());
        }
        // Validar correo electrónico
        static validarCorreo(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email.trim());
        }
        // Validar teléfono (solo dígitos, longitud 10)
        static validarTelefono(telefono) {
            const regex = /^\d{10}$/;
            return regex.test(telefono.trim());
        }
        // Validar token (ejemplo formatos alfanuméricos, longitud variable)
        static validarToken(token) {
            const regex = /^[a-zA-Z0-9\-_.]+$/;
            return regex.test(token.trim());
        }
        static imputarValidaciones(type, value) {
            switch (type) {
                case "nombre":
                case "apellido":
                    return this.validarNombre(value);
                case "correo":
                    return this.validarCorreo(value);
                case "telefono":
                    return this.validarTelefono(value);
                case "token":
                    return this.validarToken(value);
                default:
                    return value.trim().length > 0;
            }
        }
    }
    utils.Validator = Validator;
})(utils || (utils = {}));
