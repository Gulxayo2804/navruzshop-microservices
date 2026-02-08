import mongoose from "mongoose";

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({ stock: Number })
);

export const consumeOrderCreated = async (channel: any) => {
  const queue = "inventory-service";

  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, "ORDER_EVENTS", "order.created");

  channel.consume(queue, async (msg: any) => {
    if (!msg) return;

    const order = JSON.parse(msg.content.toString());

    console.log("📦 Updating inventory for order:", order._id);

    for (const item of order.items) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.quantity } }
      );
    }

    channel.ack(msg);
  });
};
