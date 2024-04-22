import { Request,Response } from "express";
import { CreateSuscripcionUseCase } from "../../aplicacion/methodsSuscription/CreateSuscriptionUseCase";

export class CreateSuscripcionController{
    constructor(readonly createSuscripcionUseCase : CreateSuscripcionUseCase){}
    async run(req: Request, res:Response):Promise<void>{
        const data = req.body;
        try {
            const subs = await this.createSuscripcionUseCase.run(
                data.idSub,
                data.nombre,
                data.contraseña
            )
            if(subs) console.log(subs)
            res.status(201).send({
                status:"succes",
                data:{
                    idPago: subs?.idSub,
                    cantidad:subs?.nombre,
                    concepto: subs?.contraseña
                }
               
        })
           
        } catch (error) {
            res.status(204).send({
                status:"error",
                data:"Ocurrio un error",
                mesagges:error
            })
        }
    }
}