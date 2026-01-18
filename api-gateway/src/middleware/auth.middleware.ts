import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface GatewayRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authenticate = (
  req: GatewayRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as { userId: string; role: string };

    req.user = decoded;

    req.headers["x-user-id"] = decoded.userId;
    req.headers["x-user-role"] = decoded.role;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
