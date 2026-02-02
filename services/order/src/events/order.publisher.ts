import { getChannel } from "../config/rabbitmq";

export const publishOrderCreated = (order: any) => {
    const channel = getChannel();

    channel.publish(
        "ORDER_EVENTS",
        "order.created",
        Buffer.from(JSON.stringify(order)),
        { persistent: true }
    )
}