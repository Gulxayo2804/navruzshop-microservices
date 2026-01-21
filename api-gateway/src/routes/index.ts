import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authProxy, userProxy } from "../middleware/proxy";

const router = Router();

// public
router.use("/auth", authProxy);

// protected
router.use("/users", authenticate, userProxy);

router.get("/health", authenticate, (_req, res) => {
  res.json({ status: "Gateway protected route OK" });
});

export default router;
