import { Channel, ConsumeMessage } from "amqplib";

const MAX_RETRIES = 3;

export const consumeOrderCreated = async (channel: Channel) => {
  const MAIN_QUEUE = "payment-service";
  const RETRY_QUEUE = "payment-retry";
  const DLQ_QUEUE = "payment-dlq";

  await channel.assertExchange("ORDER_EVENTS", "topic", { durable: true });

  await channel.assertQueue(RETRY_QUEUE, {
    durable: true,
    messageTtl: 5000, // 5s delay
    deadLetterExchange: "ORDER_EVENTS",
    deadLetterRoutingKey: "order.created",
  });

  await channel.assertQueue(DLQ_QUEUE, { durable: true });

  await channel.assertQueue(MAIN_QUEUE, { durable: true });
  await channel.bindQueue(MAIN_QUEUE, "ORDER_EVENTS", "order.created");

  console.log("💳 Payment Service listening for order.created");

  channel.consume(MAIN_QUEUE, async (msg: ConsumeMessage | null) => {
    if (!msg) return;

    const order = JSON.parse(msg.content.toString());
    const retries = msg.properties.headers?.["x-retry"] ?? 0;

    console.log(
      `💳 Processing payment for order ${order._id} (retry ${retries})`
    );

    try {
      const success = Math.random() > 0.2;

      if (!success) {
        throw new Error("Payment failed");
      }

      channel.publish(
        "ORDER_EVENTS",
        "order.paid",
        Buffer.from(
          JSON.stringify({
            orderId: order._id,
            status: "PAID",
          })
        ),
        { persistent: true }
      );

      console.log("✅ Payment successful for order:", order._id);

      channel.ack(msg);
    } catch (err) {
      if (retries >= MAX_RETRIES) {
        console.log("☠️ Payment failed, sending to DLQ:", order._id);

        channel.sendToQueue(DLQ_QUEUE, msg.content, {
          persistent: true,
        });

        channel.ack(msg);
      } else {
        console.log("🔁 Retrying payment:", order._id);

        channel.sendToQueue(RETRY_QUEUE, msg.content, {
          headers: { "x-retry": retries + 1 },
          persistent: true,
        });

        channel.ack(msg);
      }
    }
  });
};
