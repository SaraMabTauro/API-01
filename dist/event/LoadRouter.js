"use strict";
//src/event/LoudRouter.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRouter = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const express_1 = __importDefault(require("express"));
const config = {
    protocol: "amqp",
    hostname: "107.23.187.32",
    port: 5672,
    username: "guest",
    password: "guest",
};
exports.loadRouter = express_1.default.Router();
exports.loadRouter.get("/", function loadEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield amqplib_1.default.connect(config);
        console.log("Conexión exitosa");
        const channel = yield conn.createChannel();
        console.log("Canal creado exitosamente");
        yield channel.sendToQueue("InitialEvent", Buffer.from("Mensaje"));
        console.log("Mensaje enviado");
        yield channel.close();
        yield conn.close();
        res.status(200).send("OK");
    });
});
/// Ruta POST para manejar las solicitudes en /
exports.loadRouter.post("/", function handlePostRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Conectarse a RabbitMQ
            const conn = yield amqplib_1.default.connect(config);
            console.log("Conexión exitosa con RabbitMQ");
            // Crear un canal en la conexión
            const channel = yield conn.createChannel();
            console.log("Canal creado exitosamente");
            // Enviar un mensaje a la cola en RabbitMQ
            yield channel.sendToQueue("InitialEvent", Buffer.from("Mensaje"));
            console.log("Mensaje enviado a la cola en RabbitMQ");
            // Cerrar el canal y la conexión con RabbitMQ
            yield channel.close();
            yield conn.close();
            // Enviar una respuesta al cliente indicando que el mensaje se procesó correctamente
            res.status(200).send("Mensaje recibido correctamente y procesado");
        }
        catch (error) {
            // Manejar cualquier error que ocurra durante el proceso
            console.error("Error al procesar la solicitud:", error);
            res.status(500).send("Error interno del servidor");
        }
    });
});
