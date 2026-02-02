import { Router } from "express";
import { createOrder, getMyOrders } from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);
router.get("/me", getMyOrders);

export default router;
