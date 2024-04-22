import { NotificationNewSuscripcion } from "../../infraestructure/servicesRabbit/NotificacionNewSuscripcion";
import { Suscripcion } from "../../domain/entities/Suscripcion";

export class NotificacionSuscripcionUseCase{
    constructor(readonly serviceNotification:NotificationNewSuscripcion){}
    async run(subs:Suscripcion){
        await this.serviceNotification.sendNotification(subs)
    }
}