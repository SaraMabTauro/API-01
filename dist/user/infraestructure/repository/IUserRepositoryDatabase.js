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
exports.UserRepositoryDatabase = void 0;
// user/repository/userRepositoryDatabase.ts
const user_1 = require("../../domain/user");
class UserRepositoryDatabase {
    constructor(databaseClient, passwordHasher) {
        this.databaseClient = databaseClient;
        this.passwordHasher = passwordHasher;
    }
    agregarUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield this.passwordHasher.hashContraseña(user.contraseña);
                const sql = 'INSERT INTO user (id, nombre, email, contraseña) VALUES (?, ?, ?, ?)';
                const values = [user.id, user.nombre, user.email, hashedPassword];
                yield this.databaseClient.executeQuery(sql, values);
                return true;
            }
            catch (error) {
                console.error('Error al agregar el usuario:', error);
                return false;
            }
        });
    }
    obtenerTodosUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM user';
                const rows = yield this.databaseClient.executeQuery(sql);
                const usuarios = rows.map((row) => {
                    return new user_1.User(row.id, row.nombre, row.email, row.contraseña);
                });
                return usuarios;
            }
            catch (error) {
                console.error('Error al obtener todos los usuarios:', error);
                return [];
            }
        });
    }
}
exports.UserRepositoryDatabase = UserRepositoryDatabase;
