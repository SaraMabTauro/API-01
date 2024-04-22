import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 
import { Signale } from 'signale';
import * as dotenv from 'dotenv';

import { suscripcionesRouter } from './suscripcion/infraestructure/routes/SuscripcionRouter';

const app = express();
dotenv.config();

const port: number = parseInt(process.env.PORT || "3000");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/suscripciones", suscripcionesRouter);

const signale = new Signale();

app.listen(port, () => {
    signale.success("Servidor corriendo en el puerto:", port);
});
