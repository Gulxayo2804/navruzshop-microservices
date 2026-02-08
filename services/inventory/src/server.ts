import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db";
import { connectRabbitMQ } from "./config/rabbitmq";
import { consumeOrderCreated } from "./consumers/order-created.consumer";

const start = async () => {
  await connectDB();
  const channel = await connectRabbitMQ();
  await consumeOrderCreated(channel);

  console.log("Inventory Service listening for order.created");
};

start();
