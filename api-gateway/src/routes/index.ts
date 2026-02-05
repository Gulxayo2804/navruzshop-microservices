import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authProxy, userProxy, productProxy, orderProxy } from "../middleware/proxy";
import { requireAdmin } from "../middleware/role.middleware";
import { authLimiter, orderLimiter } from "../middleware/rate-limit";

const router = Router();

// PUBLIC — no auth
router.use("/auth", authLimiter, authProxy);

router.use("/users", authenticate, orderLimiter, userProxy);

// Public product read
router.get("/products", productProxy);

// Admin-only product creation
router.post("/products", authenticate, requireAdmin, productProxy);

router.use("/orders", authenticate, orderProxy);
export default router;
