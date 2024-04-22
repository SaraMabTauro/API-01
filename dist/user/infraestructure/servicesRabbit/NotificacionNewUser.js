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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacionNewUser = void 0;
// infraestructure/servicesRabbit/NotificationNewUser
const amqplib_1 = __importDefault(require("amqplib"));
class NotificacionNewUser {
    //private server: any;
    constructor() {
        this.options = {
            vhost: process.env.AMQP_VHOST,
            username: process.env.AMQP_USERNAME,
            password: process.env.AMQP_PASSWORD,
            port: process.env.AMQP_PORT,
        };
        this.url = process.env.AMQP_URL;
        this.exch = process.env.AMQP_EXCH;
        //Options solo para cloudamqp
        //this.server = process.env.AMQP_SERVER;
    }
    sendNotificacion(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = user.id;
                //Opción de conexión para instancia EC2
                const conn = yield amqplib_1.default.connect(this.url, this.options);
                const ch = yield conn.createChannel();
                const ex = "amq.direct";
                const routingKey = "key initial";
                const status = yield ch.publish(ex, routingKey, Buffer.from(message));
                return status; // status es un booleano que indica si se pudo enviar la notificación correctamente
            }
            catch (error) {
                console.error('Error al enviar notificación:', error);
                return false; // Devolvemos false en caso de error
            }
        });
    }
}
exports.NotificacionNewUser = NotificacionNewUser;
