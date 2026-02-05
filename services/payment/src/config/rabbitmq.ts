import amqp from 'amqplib';

export const connectRabbitMQ = async () => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL!)
    const channel = await connection.createChannel();

    await channel.assertExchange("ORDER_EVENTS", "topic", { durable: true });

    return channel;
}