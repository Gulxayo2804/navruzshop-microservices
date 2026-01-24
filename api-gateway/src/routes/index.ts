import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authProxy, userProxy } from "../middleware/proxy";

const router = Router();

// PUBLIC — no auth
router.use("/auth", authProxy);

// PROTECTED — auth FIRST, then proxy
router.use("/users", authenticate, userProxy);

export default router;
