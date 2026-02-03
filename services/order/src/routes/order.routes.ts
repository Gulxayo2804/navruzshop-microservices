import { Router } from "express";
import { createOrder, getMyOrders } from "../controllers/order.controller";

const router = Router();

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [productId, quantity, price]
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Validation error
 */
router.post("/", createOrder);

/**
 * @openapi
 * /orders/me:
 *   get:
 *     summary: Get current user's orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of user orders
 */
router.get("/me", getMyOrders);


export default router;
