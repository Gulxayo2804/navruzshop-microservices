import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
    userId: string,
    items: {
        productId: String,
        quantity: number,
        price: number
    }[],
    totalAmount: number,
    status: "PENDING" | "PAID" | "FAILED" | "CANCELLED"
}

const OrderSchema = new Schema<IOrder>(
    {
        userId: { type: String, required: true },
        items: [
            {
                productId: String,
                quantity: Number,
                price: Number,
            },
        ],
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["PENDING", "PAID", "CANCELLED"],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);