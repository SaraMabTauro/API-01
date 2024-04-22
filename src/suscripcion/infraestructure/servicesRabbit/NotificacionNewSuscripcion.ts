import amqplib from 'amqplib'
import { INotificationNewSuscripcion } from '../../domain/services/INotificationNewSuscripcion'
import { Suscripcion } from '../../domain/entities/Suscripcion'
import { buffer } from 'stream/consumers';


export class NotificationNewSuscripcion implements INotificationNewSuscripcion{
    private options: any;
    private url: any;
    private exch: any;
    private server: any;
    constructor() {
        this.options = {
          protocol:'amqp',
          username: 'guest',
          password:'guest',
          port: 5672,
            
        };
        this.url = 'amqp://guest:guest@107.23.187.32';
        this.exch = 'Prueba';
        //Options solo para cloudamqp
       // this.server = process.env.AMQP_SERVER;
      }
      async  sendNotification(subs: Suscripcion): Promise<boolean> {
          try {
          const conn = await amqplib.connect(this.url);
          const ch =await conn.createChannel();
          
          const status = ch.publish(this.exch,"", Buffer.from(JSON.stringify(subs)))
          console.log(subs);
         
          return status;
          } catch (error) {
            return false;
          }

      }
}