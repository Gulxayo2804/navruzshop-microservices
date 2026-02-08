import { Channel, ConsumeMessage } from "amqplib";
import { OrderModel } from "../models/order.model";

export const consumePaymentEvents = async (channel: Channel) => {
  const QUEUE = "order-payment-events";

  await channel.assertExchange("ORDER_EVENTS", "topic", { durable: true });
  await channel.assertQueue(QUEUE, { durable: true });

  await channel.bindQueue(QUEUE, "ORDER_EVENTS", "order.paid");
  await channel.bindQueue(QUEUE, "ORDER_EVENTS", "order.failed");

  console.log("📥 Order Service listening for payment events");

  channel.consume(QUEUE, async (msg: ConsumeMessage | null) => {
    if (!msg) return;

    const event = JSON.parse(msg.content.toString());
    const { orderId, status } = event;

    console.log(`📥 Order ${orderId} payment result: ${status}`);

    if (status === "PAID") {
      await OrderModel.findByIdAndUpdate(orderId, {
        status: "PAID",
      });
    }

    if (status === "FAILED") {
      await OrderModel.findByIdAndUpdate(orderId, {
        status: "CANCELLED",
      });
    }

    channel.ack(msg);
  });
};
