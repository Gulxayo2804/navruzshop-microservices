import amqp from 'amqplib';

let channel: amqp.Channel;

export const connectRabbitmq = async () => {
    const connectiom = await amqp.connect(process.env.RABBITMQ_URL!);
    channel = await connectiom.createChannel();

    await channel.assertExchange('ORDER_EVENTS', 'topic', { durable: true })
    console.log("RabbitMQ connected (Order Service)");
}
export const getChannel = () => channel;