import { Suscripcion } from "../entities/Suscripcion";

export interface INotificationNewSuscripcion {
    sendNotification(subs:Suscripcion):Promise<boolean>;
}