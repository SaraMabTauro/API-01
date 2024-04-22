"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSuscripcionUseCase = void 0;
const Suscripcion_1 = require("../../domain/entities/Suscripcion");
class CreateSuscripcionUseCase {
    constructor(suscripcionRepository, notification) {
        this.suscripcionRepository = suscripcionRepository;
        this.notification = notification;
    }
    run(idSub, nombre, contraseña) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const suscripcion = new Suscripcion_1.Suscripcion(idSub, nombre, contraseña);
                const createdSuscripcion = yield this.suscripcionRepository.createSuscripcion(suscripcion);
                if (createdSuscripcion) {
                    this.notification.run(createdSuscripcion);
                }
                return createdSuscripcion;
            }
            catch (error) {
                console.error("Error al crear la suscripción:", error);
                return null;
            }
        });
    }
}
exports.CreateSuscripcionUseCase = CreateSuscripcionUseCase;
