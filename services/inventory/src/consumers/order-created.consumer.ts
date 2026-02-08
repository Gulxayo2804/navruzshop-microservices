import { Channel, ConsumeMessage } from "amqplib";
import mongoose from "mongoose";

const MAX_RETRIES = 3;

// Minimal Product model (shared DB with Product Service)
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    stock: Number,
  })
);

export const consumeOrderCreated = async (channel: Channel) => {
  const MAIN_QUEUE = "inventory-service";
  const RETRY_QUEUE = "inventory-retry";
  const DLQ_QUEUE = "inventory-dlq";

  await channel.assertExchange("ORDER_EVENTS", "topic", { durable: true });

  // Retry queue
  await channel.assertQueue(RETRY_QUEUE, {
    durable: true,
    messageTtl: 5000,
    deadLetterExchange: "ORDER_EVENTS",
    deadLetterRoutingKey: "order.created",
  });

  // DLQ
  await channel.assertQueue(DLQ_QUEUE, { durable: true });

  // Main queue
  await channel.assertQueue(MAIN_QUEUE, { durable: true });
  await channel.bindQueue(MAIN_QUEUE, "ORDER_EVENTS", "order.created");

  console.log("📦 Inventory Service listening for order.created");

  channel.consume(MAIN_QUEUE, async (msg: ConsumeMessage | null) => {
    if (!msg) return;

    const order = JSON.parse(msg.content.toString());
    const retries = msg.properties.headers?.["x-retry"] ?? 0;

    console.log(
      `📦 Updating inventory for order ${order._id} (retry ${retries})`
    );

    try {
      for (const item of order.items) {
        const result = await Product.updateOne(
          { _id: item.productId, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } }
        );

        if (result.modifiedCount === 0) {
          throw new Error("Insufficient stock");
        }
      }

      console.log("✅ Inventory updated for order:", order._id);
      channel.ack(msg);
    } catch (err) {
      if (retries >= MAX_RETRIES) {
        console.log("☠️ Inventory failed, sending to DLQ:", order._id);

        channel.sendToQueue(DLQ_QUEUE, msg.content, {
          persistent: true,
        });

        channel.ack(msg);
      } else {
        console.log("🔁 Retrying inventory update:", order._id);

        channel.sendToQueue(RETRY_QUEUE, msg.content, {
          headers: { "x-retry": retries + 1 },
          persistent: true,
        });

        channel.ack(msg);
      }
    }
  });
};
