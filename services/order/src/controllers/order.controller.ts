import { Response } from "express";
import { OrderModel } from "../models/order.model";
import { OrderRequest } from "../middleware/auth-context";
import { publishOrderCreated } from "../events/order.publisher";
import { createOrderSchema } from "../validators/order.validator";

export const createOrder = async (req: OrderRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { error } = createOrderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { items } = req.body;

  const totalAmount = items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0
  );

  const order = await OrderModel.create({
    userId: req.user.userId,
    items,
    totalAmount,
  });

  publishOrderCreated(order);

  res.status(201).json(order);
};

export const getMyOrders = async (req: OrderRequest, res: Response) => {
  const orders = await OrderModel.find({ userId: req.user?.userId });
  res.json(orders);
};