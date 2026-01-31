import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authProxy, userProxy, productProxy } from "../middleware/proxy";
import { requireAdmin } from "../middleware/role.middleware";

const router = Router();

// PUBLIC — no auth
router.use("/auth", authProxy);

router.use("/users", authenticate, userProxy);

// Public product read
router.get("/products", productProxy);

// Admin-only product creation
router.post("/products", authenticate, requireAdmin, productProxy);

export default router;
