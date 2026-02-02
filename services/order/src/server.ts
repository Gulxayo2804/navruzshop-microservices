import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";
import { connectRabbitMQ } from "./config/rabbitmq";

const PORT = process.env.PORT || 4004;

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("MongoDB connected (Order Service)");

  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
  });
};

start();
