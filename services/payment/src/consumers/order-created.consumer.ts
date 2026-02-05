export const consumeOrderCreated = async (channel: any) => {
  const queue = "payment-service";

  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, "ORDER_EVENTS", "order.created");

  channel.consume(queue, (msg: any) => {
    if (!msg) return;

    const order = JSON.parse(msg.content.toString());

    console.log("💳 Processing payment for order:", order._id);

    // simulate payment
    setTimeout(() => {
      console.log("✅ Payment successful for order:", order._id);
      channel.ack(msg);
    }, 1000);
  });
};
