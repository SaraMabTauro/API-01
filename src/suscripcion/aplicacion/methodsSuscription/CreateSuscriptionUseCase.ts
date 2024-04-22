import { Suscripcion } from "../../domain/entities/Suscripcion";
import { SuscripcionRepository } from "../../domain/interface/SuscripcionRepository";
import { NotificacionSuscripcionUseCase } from "../../aplicacion/services/NotificacionNewSuscripcion";

export class CreateSuscripcionUseCase {
    constructor(
        readonly suscripcionRepository: SuscripcionRepository,
        readonly notification: NotificacionSuscripcionUseCase
    ) {}

    async run(
        idSub: string,
        nombre: string,
        contraseña: string
    ): Promise<Suscripcion | null> {
        try {
            const suscripcion = new Suscripcion(idSub, nombre, contraseña);
            const createdSuscripcion = await this.suscripcionRepository.createSuscripcion(suscripcion);
            
            if (createdSuscripcion) {
                this.notification.run(createdSuscripcion);
            }

            return createdSuscripcion;
        } catch (error) {
            console.error("Error al crear la suscripción:", error);
            return null;
        }
    }
}
