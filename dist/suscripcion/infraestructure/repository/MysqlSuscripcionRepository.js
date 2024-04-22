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
exports.MysqlSuscripcionRepository = void 0;
const databaseClient_1 = require("../../../config/databaseClient");
class MysqlSuscripcionRepository {
    createSuscripcion(suscripcion) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idSub, nombre, contraseña } = suscripcion;
            const sql = "INSERT INTO suscripciones(idSub, nombre, contraseña) VALUES (?, ?, ?)";
            const params = [idSub, nombre, contraseña];
            try {
                const [result] = yield (0, databaseClient_1.query)(sql, params);
                return suscripcion;
            }
            catch (error) {
                console.error("Error creating subscription:", error);
                return null;
            }
        });
    }
}
exports.MysqlSuscripcionRepository = MysqlSuscripcionRepository;
