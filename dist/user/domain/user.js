"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// domain/user.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User {
    constructor(id, nombre, email, contraseña) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.contraseña = bcryptjs_1.default.hashSync(contraseña, 10);
    }
    validarContraseña(contraseña) {
        return bcryptjs_1.default.compareSync(contraseña, this.contraseña);
    }
}
exports.User = User;
