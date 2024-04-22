import express from 'express'
import { createSuscripcionController } from "../Dependecies";
export const suscripcionesRouter = express.Router()

suscripcionesRouter.post(
    "/",
    createSuscripcionController.run.bind(createSuscripcionController)
)