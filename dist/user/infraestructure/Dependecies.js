"use strict";
// infraestructure/dependencies/Dependencies.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationNewUser = exports.bcryptHasherPassword = exports.databaseClient = void 0;
const databaseClient_1 = require("../../config/databaseClient");
const BcryptHasher_1 = require("./util/BcryptHasher");
const NotificacionNewUser_1 = require("../infraestructure/servicesRabbit/NotificacionNewUser"); // Importamos la clase de notificación de usuario
// Creamos una instancia del cliente de base de datos
const databaseClient = databaseClient_1.DatabaseClient.getInstance();
exports.databaseClient = databaseClient;
// Creamos una instancia del hasher de contraseñas
const bcryptHasherPassword = new BcryptHasher_1.BcryptHasher();
exports.bcryptHasherPassword = bcryptHasherPassword;
// Creamos una instancia del manejador de notificaciones de usuario
const notificationNewUser = new NotificacionNewUser_1.NotificacionNewUser();
exports.notificationNewUser = notificationNewUser;
