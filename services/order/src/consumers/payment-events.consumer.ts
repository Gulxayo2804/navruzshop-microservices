import { OrderModel } from "../models/order.model";

export const consumePaymentEvents = async (channel: any) => {
  const queue = "order-service-payment-events";

  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, "ORDER_EVENTS", "order.paid");
  await channel.bindQueue(queue, "ORDER_EVENTS", "order.failed");

  channel.consume(queue, async (msg: any) => {
    if (!msg) return;

    const event = JSON.parse(msg.content.toString());
    const { orderId, status } = event;

    console.log(`📥 Order Service received ${status} for`, orderId);

    await OrderModel.findByIdAndUpdate(orderId, { status });

    channel.ack(msg);
  });
};
