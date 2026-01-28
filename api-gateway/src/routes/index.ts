import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authProxy, userProxy, productProxy } from "../middleware/proxy";

const router = Router();

// PUBLIC — no auth
router.use("/auth", authProxy);

router.use("/users", authenticate, userProxy);

router.use("/products", productProxy);

export default router;
