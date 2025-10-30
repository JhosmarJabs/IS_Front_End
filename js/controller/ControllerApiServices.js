var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var controller;
(function (controller) {
    class ApiService {
        static enviarCorreoVerificacion(email) {
            return fetch(config.ApiConfig.API_BASE_URL, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(email)
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                return { ok: res.ok, data };
            }));
        }
    }
    controller.ApiService = ApiService;
})(controller || (controller = {}));
