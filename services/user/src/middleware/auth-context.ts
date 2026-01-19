import { Request, Response, NextFunction } from "express";

export interface UserContextRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const userContext = (
  req: UserContextRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.headers["x-user-id"] as string;
  const role = req.headers["x-user-role"] as string;

  if (userId && role) {
    req.user = { userId, role };
  }

  next();
};
