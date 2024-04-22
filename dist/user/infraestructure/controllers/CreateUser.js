"use strict";
// infraestructure/controllers/CreateController.ts, asi como se encuentra funciona al 100%
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
exports.createUserController = void 0;
const createUser_1 = require("../../aplicacion/createUser");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nombre, email, contraseña } = req.body;
        const created = yield (0, createUser_1.createUser)(id, nombre, email, contraseña);
        if (created) {
            res.status(201).json({ mensaje: 'Usuario creado correctamente' });
        }
        else {
            res.status(500).json({ error: 'Error al crear el Usuario' });
        }
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.createUserController = createUserController;
