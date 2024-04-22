import { query } from "../../../config/databaseClient";
import { Suscripcion } from "../../domain/entities/Suscripcion";
import { SuscripcionRepository } from "../../domain/interface/SuscripcionRepository";

export class MysqlSuscripcionRepository implements SuscripcionRepository {

    async createSuscripcion(
        suscripcion: Suscripcion
    ): Promise<Suscripcion | null> {
        const { idSub, nombre, contraseña } = suscripcion;
        const sql = "INSERT INTO suscripciones(idSub, nombre, contraseña) VALUES (?, ?, ?)";
        const params: any[] = [idSub, nombre, contraseña];
        try {
            const [result]: any = await query(sql, params);
            return suscripcion;
        } catch (error) {
            console.error("Error creating subscription:", error);
            return null;
        }
    }
}
