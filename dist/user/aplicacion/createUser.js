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
exports.createUser = void 0;
const IUserRepositoryDatabase_1 = require("../infraestructure/repository/IUserRepositoryDatabase");
const user_1 = require("../domain/user");
const Dependecies_1 = require("../infraestructure/Dependecies");
const NotificacionNewUser_1 = require("../infraestructure/servicesRabbit/NotificacionNewUser"); // Importa la clase NotificacionNewUser
const NotificacionUserCase_1 = require("./services/NotificacionUserCase");
const passwordHasher = Dependecies_1.bcryptHasherPassword;
const createUser = (id, nombre, email, contraseña) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = new IUserRepositoryDatabase_1.UserRepositoryDatabase(Dependecies_1.databaseClient, passwordHasher);
        const nuevaUser = new user_1.User(id, nombre, email, contraseña);
        const success = yield userRepository.agregarUser(nuevaUser);
        // Crea una instancia de NotificacionNewUser
        const notificacionNewUser = new NotificacionNewUser_1.NotificacionNewUser();
        // Pasa la instancia de NotificacionNewUser al crear NotificationUserUseCase
        const notificationUseCase = new NotificacionUserCase_1.NotificationUserUseCase(notificacionNewUser);
        yield notificationUseCase.run(nuevaUser);
        return success;
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        return false;
    }
});
exports.createUser = createUser;
