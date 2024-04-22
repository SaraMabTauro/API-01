import { Suscripcion } from "../entities/Suscripcion";

export interface SuscripcionRepository {
    createSuscripcion(suscripcion: Suscripcion): Promise<Suscripcion | null>;
}

