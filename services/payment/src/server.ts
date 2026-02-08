import dotenv from "dotenv";
dotenv.config();

import { connectRabbitMQ } from "./config/rabbitmq";
import { consumeOrderCreated } from "./consumers/order-created.consumer";

const start = async () => {
  const channel = await connectRabbitMQ();
  await consumeOrderCreated(channel);

  console.log("Payment Service listening for order.created");
};

start();