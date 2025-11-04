var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var view;
(function (view) {
    class Registro {
        getPersona() {
            console.log(this.persona);
        }
        constructor(wrapper, onBienvenida, onAtras) {
            // Arreglo privado para guardar persona capturadas poco a poco
            this.persona = {
                Nombre: "Josmar",
                ApellidoPaterno: "Bautista",
                ApellidoMaterno: "Saavedra",
                CorreoElectronico: "josmar050110@gmail.com",
                NumeroTelefono: "7712194196",
                Sexo: "",
                FechaNacimiento: "",
                HuellaDactilar: null,
                FaceID: null,
                PasswordHash: ""
            };
            this.contenedor = wrapper.contenedor;
            this.onBienvenida = onBienvenida || null;
            this.onAtras = onAtras || null;
            this.control = new controller.ControlBuilder();
            this.texto = new controller.TextBuilder();
            this.render();
        }
        render() {
            this.contenedor.html("");
            this.texto.titulo1(this.contenedor, "Registro - Información Personal");
            const inputNombre = this.control.input(this.contenedor, {
                type: "text",
                value: this.persona.Nombre,
                placeholder: "Nombre",
                marginBottom: "18px"
            });
            const inputApellidoPaterno = this.control.input(this.contenedor, {
                type: "text",
                value: this.persona.ApellidoPaterno,
                placeholder: "Apellido Paterno",
                marginBottom: "18px"
            });
            const inputApellidoMaterno = this.control.input(this.contenedor, {
                type: "text",
                value: this.persona.ApellidoMaterno,
                placeholder: "Apellido Materno",
                marginBottom: "18px"
            });
            const nav = this.contenedor.append("div")
                .style("display", "flex")
                .style("justify-content", "space-between")
                .style("width", "80%")
                .style("margin", "0 auto");
            // Botón Atrás: aquí puedes definir la navegación que quieras
            const btnAtras = this.control.button(nav, {
                label: "Atrás",
                onClick: () => {
                    this.contenedor.html(""); // Limpia el login
                    if (typeof this.onAtras === "function")
                        this.onAtras();
                }
            });
            btnAtras.style("margin-right", "10px");
            // Botón Siguiente
            const btnSiguiente = this.control.button(nav, {
                label: "Siguiente",
                onClick: () => {
                    var _a, _b, _c;
                    const nombre = ((_a = inputNombre.node()) === null || _a === void 0 ? void 0 : _a.value) || "";
                    const apellidoPaterno = ((_b = inputApellidoPaterno.node()) === null || _b === void 0 ? void 0 : _b.value) || "";
                    const apellidoMaterno = ((_c = inputApellidoMaterno.node()) === null || _c === void 0 ? void 0 : _c.value) || "";
                    if (!utils.Validator.imputarValidaciones("nombre", nombre)) {
                        alert("Por favor, ingresa un nombre válido.");
                        return;
                    }
                    if (!utils.Validator.imputarValidaciones("apellido", apellidoPaterno)) {
                        alert("Por favor, ingresa un apellido paterno válido.");
                        return;
                    }
                    if (!utils.Validator.imputarValidaciones("apellido", apellidoMaterno)) {
                        alert("Por favor, ingresa un apellido materno válido.");
                        return;
                    }
                    this.persona.Nombre = nombre;
                    this.persona.ApellidoPaterno = apellidoPaterno;
                    this.persona.ApellidoMaterno = apellidoMaterno;
                    this.renderFechaNacimientoYSexo();
                }
            });
            btnSiguiente.style("margin-left", "10px");
        }
        renderFechaNacimientoYSexo() {
            this.contenedor.html("");
            this.texto.titulo1(this.contenedor, "Fecha de Nacimiento");
            this.control.select(this.contenedor, {
                id: "birth-day",
                placeholder: "Día",
                options: Array.from({ length: 31 }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() })),
                marginBottom: "18px"
            });
            this.control.select(this.contenedor, {
                id: "birth-month",
                placeholder: "Mes",
                options: [
                    { value: "1", label: "Enero" },
                    { value: "2", label: "Febrero" },
                    { value: "3", label: "Marzo" },
                    { value: "4", label: "Abril" },
                    { value: "5", label: "Mayo" },
                    { value: "6", label: "Junio" },
                    { value: "7", label: "Julio" },
                    { value: "8", label: "Agosto" },
                    { value: "9", label: "Septiembre" },
                    { value: "10", label: "Octubre" },
                    { value: "11", label: "Noviembre" },
                    { value: "12", label: "Diciembre" },
                ],
                marginBottom: "18px"
            });
            const opcionesAño = Array.from({ length: 2025 - 1940 + 1 }, (_, i) => {
                const año = 2025 - i;
                return { value: año.toString(), label: año.toString() };
            });
            this.control.select(this.contenedor, {
                id: "birth-year",
                placeholder: "Año",
                options: opcionesAño,
                marginBottom: "18px"
            });
            this.control.select(this.contenedor, {
                id: "gender",
                placeholder: "Selecciona tu sexo",
                options: [
                    { value: "male", label: "Masculino" },
                    { value: "female", label: "Femenino" },
                    { value: "other", label: "Otro" }
                ],
                marginBottom: "18px"
            });
            const nav = this.contenedor.append("div")
                .style("display", "flex")
                .style("justify-content", "space-between")
                .style("width", "80%");
            const btnAtras = this.control.button(nav, {
                label: "Atrás",
                onClick: () => this.render()
            });
            btnAtras.style("margin-right", "10px");
            const btnSiguiente = this.control.button(nav, {
                label: "Siguiente",
                onClick: () => {
                    const dia = document.getElementById("birth-day").value;
                    const mes = document.getElementById("birth-month").value;
                    const año = document.getElementById("birth-year").value;
                    const sexo = document.getElementById("gender").value;
                    this.persona.FechaNacimiento = `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
                    this.persona.Sexo = sexo;
                    this.renderContacto();
                }
            });
            btnSiguiente.style("margin-left", "10px");
        }
        renderContacto() {
            this.contenedor.html("");
            this.texto.titulo1(this.contenedor, "Información de Contacto");
            const inputTelefono = this.control.input(this.contenedor, {
                type: "tel",
                value: this.persona.NumeroTelefono,
                placeholder: "Número de Teléfono",
                marginBottom: "18px"
            });
            const inputCorreo = this.control.input(this.contenedor, {
                type: "email",
                value: this.persona.CorreoElectronico,
                placeholder: "Correo Electrónico",
                marginBottom: "18px"
            });
            this.contenedor.append("p")
                .style("font-size", "0.8rem")
                .style("margin-bottom", "20px")
                .html('<i class="bx bx-info-circle"></i> Este número se utilizará también para enviar mensajes por WhatsApp');
            const nav = this.contenedor.append("div")
                .style("display", "flex")
                .style("justify-content", "space-between")
                .style("width", "80%");
            const btnAtras = this.control.button(nav, {
                label: "Atrás",
                onClick: () => this.renderFechaNacimientoYSexo()
            });
            btnAtras.style("margin-right", "10px");
            const btnSiguiente = this.control.button(nav, {
                label: "Siguiente",
                onClick: () => {
                    var _a, _b;
                    const telefono = ((_a = inputTelefono.node()) === null || _a === void 0 ? void 0 : _a.value) || "";
                    const correo = ((_b = inputCorreo.node()) === null || _b === void 0 ? void 0 : _b.value) || "";
                    const phoneRegex = /^\d{10}$/;
                    const emailRegex = /^[^\s@]+@[^\s@]+$/;
                    if (!telefono || !correo) {
                        alert("Por favor, completa todos los campos");
                        return;
                    }
                    if (!phoneRegex.test(telefono)) {
                        alert("Por favor, ingresa un número de teléfono válido (10 dígitos)");
                        return;
                    }
                    if (!emailRegex.test(correo)) {
                        alert("Por favor, ingresa un correo electrónico válido");
                        return;
                    }
                    this.persona.NumeroTelefono = telefono;
                    this.persona.CorreoElectronico = correo;
                    this.enviarToken(correo, telefono);
                    this.renderVerificacion();
                }
            });
            btnSiguiente.style("margin-left", "10px");
        }
        enviarToken(correo, telefono) {
            controller.ApiService.enviarTokenVerificacion(correo, telefono, "Verificacion")
                .then(response => {
                if (response.ok && response.data.exists === false) {
                    this.renderVerificacion();
                }
                else if (response.data.exists) {
                    alert("El correo ya está registrado. Ingresa uno diferente.");
                }
                else {
                    alert("Hubo un error en la verificación del correo.");
                }
            })
                .catch(() => {
                alert("Error de conexión con el servicio de verificación.");
            });
        }
        renderVerificacion() {
            this.contenedor.html("");
            this.texto.titulo1(this.contenedor, "Verificación");
            const inputSMS = this.control.input(this.contenedor, {
                type: "text",
                placeholder: "Código de verificación (SMS)",
                marginBottom: "18px",
                onInput: (event) => {
                    const input = event.target;
                    input.value = input.value.replace(/[^0-9]/g, "").slice(0, 6);
                }
            });
            inputSMS.attr("maxlength", "6");
            const inputEmailCode = this.control.input(this.contenedor, {
                type: "text",
                placeholder: "Código de verificación (Correo)",
                marginBottom: "18px",
                onInput: (event) => {
                    const input = event.target;
                    input.value = input.value.replace(/[^0-9]/g, "").slice(0, 6);
                }
            });
            inputEmailCode.attr("maxlength", "6");
            const nav = this.contenedor.append("div")
                .style("display", "flex")
                .style("justify-content", "space-between")
                .style("width", "80%");
            const btnAtras = this.control.button(nav, {
                label: "Atrás",
                onClick: () => this.renderContacto()
            });
            btnAtras.style("margin-right", "10px");
            const btnSiguiente = this.control.button(nav, {
                label: "Siguiente",
                onClick: () => {
                    var _a, _b;
                    const smsCode = ((_a = inputSMS.node()) === null || _a === void 0 ? void 0 : _a.value) || "";
                    const emailCode = ((_b = inputEmailCode.node()) === null || _b === void 0 ? void 0 : _b.value) || "";
                    if (!smsCode || !emailCode) {
                        alert("Por favor, ingresa ambos códigos de verificación");
                        return;
                    }
                    if (smsCode.length !== 6 || emailCode.length !== 6) {
                        alert("Los códigos deben tener 6 dígitos");
                        return;
                    }
                    controller.ApiService.verificarTokens(-1, "verificacion", emailCode, smsCode)
                        .then(response => {
                        if (response.ok && response.data.message && response.data.message.includes("válido")) {
                            this.renderBiometricos();
                        }
                        else {
                            alert("Código de verificación incorrecto");
                        }
                    })
                        .catch(() => {
                        alert("Error en comunicación con el servidor");
                    });
                }
            });
            btnSiguiente.style("margin-left", "10px");
        }
        renderBiometricos() {
            this.contenedor.html("");
            this.texto.titulo1(this.contenedor, "Datos Biométricos");
            const faceRow = this.contenedor.append("div")
                .style("display", "flex")
                .style("align-items", "center")
                .style("justify-content", "space-between")
                .style("margin-bottom", "32px")
                .style("background", "rgba(255,255,255,0.07)")
                .style("border-radius", "40px")
                .style("padding", "16px 24px");
            const faceLeft = faceRow.append("div")
                .style("display", "flex")
                .style("flex-direction", "column")
                .style("align-items", "center")
                .style("width", "160px");
            const iconFace = faceLeft.append("i")
                .attr("id", "icon-faceid-biom")
                .attr("class", "bx bx-face")
                .style("font-size", "4rem")
                .style("color", "rgba(255,255,255,0.8)");
            faceLeft.append("div")
                .style("font-size", "1.1rem")
                .style("font-weight", "500")
                .style("margin-top", "8px")
                .style("text-align", "center")
                .text("Escaneo Facial");
            const faceRight = faceRow.append("div")
                .style("flex", "1")
                .style("text-align", "right");
            const btnFace = this.control.button(faceRight, {
                label: "Capturar rostro",
                onClick: () => {
                    this.ventanaFaceID(() => {
                        iconFace.attr("class", "bx bx-check-circle").style("color", "#00ff85");
                        btnSiguiente.attr("disabled", null);
                    });
                }
            });
            btnFace.style("width", "190px");
            const fingerRow = this.contenedor.append("div")
                .style("display", "flex")
                .style("align-items", "center")
                .style("justify-content", "space-between")
                .style("margin-bottom", "32px")
                .style("background", "rgba(255,255,255,0.07)")
                .style("border-radius", "40px")
                .style("padding", "16px 24px");
            const fingerLeft = fingerRow.append("div")
                .style("display", "flex")
                .style("flex-direction", "column")
                .style("align-items", "center")
                .style("width", "160px");
            fingerLeft.append("i")
                .attr("class", "bx bx-fingerprint")
                .style("font-size", "4rem")
                .style("color", "#bbb")
                .style("opacity", "0.6");
            fingerLeft.append("div")
                .style("font-size", "1.1rem")
                .style("font-weight", "500")
                .style("margin-top", "8px")
                .style("text-align", "center")
                .text("Huella Dactilar");
            const fingerRight = fingerRow.append("div")
                .style("flex", "1")
                .style("text-align", "right");
            const btnFinger = this.control.button(fingerRight, {
                label: "Capturar huella"
            });
            btnFinger
                .attr("disabled", true)
                .style("width", "190px")
                .style("background", "rgba(200,200,200,0.15)")
                .style("color", "#bbb")
                .style("cursor", "not-allowed");
            const nav = this.contenedor.append("div")
                .style("display", "flex")
                .style("justify-content", "space-between")
                .style("width", "80%");
            this.control.button(nav, {
                label: "Atrás",
                onClick: () => this.renderVerificacion()
            }).style("margin-right", "10px");
            const btnSiguiente = this.control.button(nav, {
                label: "Siguiente",
                onClick: () => this.renderContraseña()
            }).style("margin-left", "10px").attr("disabled", true);
        }
        ventanaFaceID(callback) {
            const modal = d3.select("body").append("div")
                .attr("id", "faceID-modal")
                .style("position", "fixed")
                .style("top", "0").style("left", "0")
                .style("width", "100vw").style("height", "100vh")
                .style("background", "rgba(0,0,0,0.6)")
                .style("z-index", "9999")
                .style("display", "flex")
                .style("align-items", "center")
                .style("justify-content", "center");
            const box = modal.append("div")
                .style("background", "rgba(255,255,255,0.20)")
                .style("border-radius", "12px")
                .style("padding", "36px 32px")
                .style("text-align", "center")
                .style("max-width", "480px")
                .style("width", "100%");
            const icon = box.append("div")
                .attr("class", "face-icon")
                .style("font-size", "7rem")
                .style("margin", "0 auto 18px auto")
                .html("<i class='bx bx-face'></i>");
            const video = box.append("video")
                .attr("width", "320")
                .attr("height", "240")
                .style("border-radius", "10px")
                .style("border", "2px solid #fff")
                .property("autoplay", true)
                .property("muted", true);
            box.append("p")
                .style("font-size", "1.1rem")
                .style("margin", "16px 0 24px 0")
                .text("Posiciona tu rostro frente a la cámara");
            const status = box.append("div")
                .style("margin", "14px 0 8px 0")
                .style("font-weight", "bold");
            let intentos = 0;
            const maxIntentos = 5;
            let videoStream = null;
            // Carga los modelos faceapi desde ruta correcta
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('lib/modelsFaceID'),
                faceapi.nets.faceLandmark68Net.loadFromUri('lib/modelsFaceID'),
                faceapi.nets.faceRecognitionNet.loadFromUri('lib/modelsFaceID')
            ]).then(() => navigator.mediaDevices.getUserMedia({ video: true }))
                .then(stream => {
                video.node().srcObject = stream;
                videoStream = stream;
                video.node().onloadedmetadata = () => scanFace();
            }).catch(() => status.text("No se pudo acceder a la cámara."));
            const scanFace = () => __awaiter(this, void 0, void 0, function* () {
                status.text(`Analizando rostro... intento ${intentos + 1} de ${maxIntentos}`);
                const detection = yield faceapi.detectSingleFace(video.node(), new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceDescriptor();
                if (!detection) {
                    intentos++;
                    if (intentos < maxIntentos) {
                        setTimeout(scanFace, 1000);
                    }
                    else {
                        status.text("No se detectó rostro. Por favor intenta nuevamente.");
                    }
                    return;
                }
                const descriptor = Array.from(detection.descriptor);
                this.persona.FaceID = descriptor;
                if (videoStream) {
                    videoStream.getTracks().forEach(track => track.stop());
                }
                icon.html("<i class='bx bx-check-circle'></i>").style("color", "#00ff85");
                status.text("Rostro autenticado correctamente");
                setTimeout(() => {
                    modal.remove();
                    callback(descriptor); // Aquí devuelves solo el vector 128 float
                }, 1200);
            });
            box.append("button")
                .text("Cancelar")
                .attr("class", "btn")
                .style("margin-top", "18px")
                .on("click", () => {
                if (videoStream)
                    videoStream.getTracks().forEach(track => track.stop());
                modal.remove();
                callback(null);
            });
        }
        renderContraseña() {
            this.contenedor.html(""); // Limpia el contenido anterior
            this.texto.titulo1(this.contenedor, "Contraseña de Acceso");
            // Input contraseña
            const inputPassword = this.control.input(this.contenedor, {
                type: "password",
                placeholder: "Tu contraseña (mínimo 8 caracteres)",
                marginBottom: "18px"
            });
            // Input verificar contraseña
            const inputConfirm = this.control.input(this.contenedor, {
                type: "password",
                placeholder: "Verifica tu contraseña",
                marginBottom: "18px"
            });
            // Mensaje de error
            const errorDiv = this.contenedor.append("div")
                .attr("id", "passwordError")
                .style("font-size", "0.95rem")
                .style("color", "#ff6767")
                .style("margin-bottom", "16px");
            // Botones de navegación
            const nav = this.contenedor.append("div")
                .style("display", "flex")
                .style("justify-content", "space-between")
                .style("width", "80%")
                .style("margin", "0 auto");
            // Botón atrás
            this.control.button(nav, {
                label: "Atrás",
                onClick: () => this.renderBiometricos()
            }).style("margin-right", "10px");
            // Botón siguiente con validaciones
            this.control.button(nav, {
                label: "Siguiente",
                onClick: () => {
                    var _a, _b, _c, _d;
                    const password = (_b = (_a = inputPassword.node()) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
                    const confirm = (_d = (_c = inputConfirm.node()) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : "";
                    // Validaciones
                    const minLength = 8;
                    const uppercase = /[A-Z]/;
                    const lowercase = /[a-z]/;
                    const number = /\d/;
                    if (password.length < minLength) {
                        errorDiv.text("La contraseña debe tener al menos 8 caracteres.");
                        return;
                    }
                    if (!uppercase.test(password)) {
                        errorDiv.text("La contraseña debe contener al menos una mayúscula.");
                        return;
                    }
                    if (!lowercase.test(password)) {
                        errorDiv.text("La contraseña debe contener al menos una minúscula.");
                        return;
                    }
                    if (!number.test(password)) {
                        errorDiv.text("La contraseña debe contener al menos un número.");
                        return;
                    }
                    if (password !== confirm) {
                        errorDiv.text("Las contraseñas no coinciden.");
                        return;
                    }
                    // Si pasa todas las validaciones
                    errorDiv.text("");
                    this.persona.PasswordHash = password; // O encripta si necesitas
                    this.renderTerminos(); // Continúa al siguiente paso
                }
            }).style("margin-left", "10px");
        }
        // Método modificado para incluir callback onContinuar
        renderTerminos(onContinuar) {
            this.contenedor.html("");
            this.texto.titulo1(this.contenedor, "Términos y Condiciones");
            const box = this.contenedor.append("div")
                .attr("id", "terms-text")
                .style("max-height", "200px")
                .style("overflow-y", "auto")
                .style("background-color", "rgba(255, 255, 255, 0.1)")
                .style("padding", "15px")
                .style("border-radius", "10px")
                .style("margin-bottom", "20px");
            box.append("p")
                .text("Al continuar, aceptas los términos y condiciones de uso de nuestra plataforma... ")
                .append("a")
                .text("Ver términos completos")
                .attr("href", "terminos&condiciones.html")
                .attr("target", "_blank")
                .style("color", "#00f")
                .style("text-decoration", "underline")
                .style("cursor", "pointer");
            const checkboxContainer = this.contenedor.append("div")
                .attr("class", "checkbox-container")
                .style("display", "flex")
                .style("align-items", "center")
                .style("margin-top", "20px");
            const check = checkboxContainer.append("input")
                .attr("type", "checkbox")
                .attr("id", "accept-terms")
                .property("required", true);
            checkboxContainer.append("label")
                .attr("for", "accept-terms")
                .text("Acepto los términos y condiciones");
            const nav = this.contenedor.append("div")
                .attr("class", "navigation-buttons")
                .style("display", "flex")
                .style("justify-content", "space-between")
                .style("width", "80%")
                .style("margin", "0 auto");
            const btnAtras = this.control.button(nav, {
                label: "Atrás",
                onClick: () => this.renderContraseña()
            });
            btnAtras.style("margin-right", "10px");
            const btnContinuar = this.control.button(nav, {
                label: "Continuar",
                onClick: () => {
                    const aceptado = check.node().checked;
                    if (!aceptado) {
                        alert("Debes aceptar los términos y condiciones");
                        return;
                    }
                    if (this.onBienvenida)
                        this.onBienvenida();
                }
            });
            btnContinuar.style("margin-left", "10px");
        }
    }
    view.Registro = Registro;
})(view || (view = {}));
