import { CreateSuscripcionUseCase } from "../aplicacion/methodsSuscription/CreateSuscriptionUseCase";
import { CreateSuscripcionController } from "./controllers/CreateSuscipcionController";
import { NotificacionSuscripcionUseCase } from '../aplicacion/services/NotificacionNewSuscripcion'
import { NotificationNewSuscripcion } from './servicesRabbit/NotificacionNewSuscripcion';

import { MysqlSuscripcionRepository } from "./repository//MysqlSuscripcionRepository";
export const mysqlSuscripcionRepository = new MysqlSuscripcionRepository();


export const servicesNotification = new NotificationNewSuscripcion();
export const serviceNotificationUseCase = new NotificacionSuscripcionUseCase(
    servicesNotification
)


export const createSuscripcionUseCase = new CreateSuscripcionUseCase(
    mysqlSuscripcionRepository,serviceNotificationUseCase
)
export const createSuscripcionController = new CreateSuscripcionController(
    createSuscripcionUseCase
)