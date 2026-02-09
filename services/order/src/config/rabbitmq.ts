import amqp, { Channel } from "amqplib";

let channel: Channel;

export const connectRabbitMQ = async (): Promise<Channel> => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL!);
  channel = await connection.createChannel();

  await channel.assertExchange("ORDER_EVENTS", "topic", { durable: true });

  console.log("RabbitMQ connected (Order Service)");

  return channel; 
};

export const getChannel = (): Channel => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  return channel;
};
