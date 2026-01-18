import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authProxy } from "../middleware/proxy";

const router = Router();

// public routes
router.use("/auth", authProxy);

// protected example (future services)
router.get("/health", authenticate, (_req, res) => {
  res.json({ status: "Gateway protected route OK" });
});

export default router;
