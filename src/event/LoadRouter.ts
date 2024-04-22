//src/event/LoudRouter.ts

import amqp from "amqplib";
import express from "express";

const config = {
  protocol: "amqp",
  hostname: "107.23.187.32",
  port: 5672,
  username: "guest",
  password: "guest",
};

export const loadRouter = express.Router();

loadRouter.get("/", async function loadEvent(req, res) {
  const conn = await amqp.connect(config);
  console.log("Conexión exitosa");
  const channel = await conn.createChannel();
  console.log("Canal creado exitosamente");
  await channel.sendToQueue("InitialEvent", Buffer.from("Mensaje"));
  console.log("Mensaje enviado");
  await channel.close();
  await conn.close();
  res.status(200).send("OK");
});

/// Ruta POST para manejar las solicitudes en /
loadRouter.post("/", async function handlePostRequest(req, res) {
  try {
    // Conectarse a RabbitMQ
    const conn = await amqp.connect(config);
    console.log("Conexión exitosa con RabbitMQ");

    // Crear un canal en la conexión
    const channel = await conn.createChannel();
    console.log("Canal creado exitosamente");

    // Enviar un mensaje a la cola en RabbitMQ
    await channel.sendToQueue("InitialEvent", Buffer.from("Mensaje"));
    console.log("Mensaje enviado a la cola en RabbitMQ");

    // Cerrar el canal y la conexión con RabbitMQ
    await channel.close();
    await conn.close();

    // Enviar una respuesta al cliente indicando que el mensaje se procesó correctamente
    res.status(200).send("Mensaje recibido correctamente y procesado");
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send("Error interno del servidor");
  }
});